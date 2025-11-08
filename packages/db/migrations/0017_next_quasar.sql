ALTER TABLE "user_settings" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "org_role" ADD CONSTRAINT "org_role_id_org_id_unique" UNIQUE("id","org_id");--> statement-breakpoint
ALTER TABLE "org_member" ADD CONSTRAINT "org_member_role_id_org_id_org_role_id_org_id_fk" FOREIGN KEY ("role_id","org_id") REFERENCES "public"."org_role"("id","org_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_role_permissions" ADD CONSTRAINT "org_role_permissions_role_id_org_id_org_role_id_org_id_fk" FOREIGN KEY ("role_id","org_id") REFERENCES "public"."org_role"("id","org_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
DROP TYPE "public"."member_role";