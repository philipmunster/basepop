ALTER TABLE "org_role_permissions" RENAME COLUMN "org_role_id" TO "role_id";--> statement-breakpoint
ALTER TABLE "org_role_permissions" DROP CONSTRAINT "org_role_permissions_org_role_id_org_role_id_fk";
--> statement-breakpoint
ALTER TABLE "org_role_permissions" DROP CONSTRAINT "org_role_permissions_org_role_id_data_source_id_pk";--> statement-breakpoint
ALTER TABLE "org_role_permissions" ADD CONSTRAINT "org_role_permissions_role_id_data_source_id_pk" PRIMARY KEY("role_id","data_source_id");--> statement-breakpoint
ALTER TABLE "org_role_permissions" ADD CONSTRAINT "org_role_permissions_role_id_org_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."org_role"("id") ON DELETE cascade ON UPDATE no action;