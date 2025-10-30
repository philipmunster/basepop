ALTER TABLE "org" RENAME COLUMN "createdBy" TO "created_by";--> statement-breakpoint
ALTER TABLE "org" DROP CONSTRAINT "org_createdBy_user_id_fk";
--> statement-breakpoint
ALTER TABLE "org" ADD CONSTRAINT "org_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;