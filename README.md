
# Audit Service
This service is responsible for storing all the audit logs of our different services.



# Strategy to migrate from Audit Trail to Audit Trail Archive

-> Audit Trail are stored in audit_trail.entity.ts from different service or applications,
-> After seven days records are moved from audit_trail to audit_trail_archive entity.
-> Records should be migrated at a night time
-> This configuration should be set to allow migration at a night time.