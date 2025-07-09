//

import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, } from "@nestjs/schedule";
import { AuditTrailArchiveEntity } from "src/modules/audit_trail/entities/audit-trail-archive.entity";
import { AuditTrailEntity } from "src/modules/audit_trail/entities/audit-trail.entity";
import { DataSource, SelectQueryBuilder } from "typeorm";


@Injectable()
export class ArchiveAuditLogsSchedular {
  private logger = new Logger(ArchiveAuditLogsSchedular.name)

  constructor(
    private datasource: DataSource,
    private readonly configService: ConfigService
  ) { }

  // find the night time of every seven days for running the cron job so that at that time
  // server will have less load
  @Cron("0 1 * * 0") // Runs at 1 am every sunday
  async handleCron() {
    const archiveBatchSize = +this.configService.get('ARCHIVE_BATCH_SIZE'), archiveCutOffDays = +this.configService.get('ARCHIVE_CUT_OFF_PERIOD')
    const { archived, failed } = await this.archiveAuditTrail(archiveBatchSize, (qb) => (
      qb.where('source.createdAt >= :date', { data: new Date(Date.now() - archiveCutOffDays * 24 * 60 * 60 * 1000) }) // Retrieves records where createdAt is within the last 7 days.
    ))
    this.logger.log(`Archived ${archived} audit trail records, Archiving  failed of ${failed} records`)
  }


  async archiveAuditTrail(
    batchSize = 1000,
    condition?: (qb: SelectQueryBuilder<AuditTrailEntity>) => SelectQueryBuilder<AuditTrailEntity>,
    deleteAfterArchive = true,
  ): Promise<{ archived: number; failed: number }> {
    let processed = 0;
    let archived = 0;
    let failed = 0;
    let hasMoreRecords = true;

    this.logger.log(`Starting archiving process with batch size: ${batchSize}`)

    // Process data in batches until no more records
    while (hasMoreRecords) {
      await this.datasource.manager.transaction(async (transactionEntityManager) => {
        try {
          // Build query for current batch
          let queryBuilder = transactionEntityManager
            .createQueryBuilder(AuditTrailEntity, 'source')
            .select('source') // select all from source entity eqv select *
            .take(batchSize);

          if (condition) {
            queryBuilder = condition(queryBuilder)
          }

          // Order by Id to ensure consistent batching
          queryBuilder = queryBuilder.orderBy('source.id', 'ASC')

          // Fetch batch
          const records = await queryBuilder.getMany()

          if (records.length === 0) {
            hasMoreRecords = false;
            return;
          }

          // Prepare data for archive table
          const archiveRecords = records.map((rec) => {
            const archiveRecord = new AuditTrailArchiveEntity()
            Object.assign(archiveRecord, rec);

            return archiveRecord
          })

          // Insert into archive table

          const insertResult = await transactionEntityManager
            .createQueryBuilder()
            .insert()
            .into(AuditTrailArchiveEntity)
            .values(archiveRecords)
            .execute();


          archived += insertResult.identifiers.length


          // Delete from source if required
          if (deleteAfterArchive) {
            const ids = records.map(record => record.id)
            await transactionEntityManager
              .createQueryBuilder()
              .delete()
              .from(AuditTrailEntity)
              .whereInIds(ids)
              .execute();
          }

          processed += records.length
          this.logger.log(`Archived batch: ${records.length} records. Total processed: ${processed}`);

          // Check if we got fewer records than batch size
          if (records.length < batchSize) {
            hasMoreRecords = false;
          }
        } catch (error) {
          this.logger.error(`Error during archiving batch:${error.message}`, error.stack)
          failed += batchSize;
          throw error

        }
      });

      if (hasMoreRecords) {
        await new Promise(resolve => setTimeout(resolve, 100))  // delaying the archive to prevent load in db
      }
      this.logger.log(`Archiving completed. Total archived: ${archived}, failed: ${failed}`);
      return { archived, failed };
    }
  }
}
