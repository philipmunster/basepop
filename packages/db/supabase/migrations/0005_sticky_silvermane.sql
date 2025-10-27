CREATE TABLE "data_source" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "data_source_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "org_data_source_status" (
	"org_id" uuid NOT NULL,
	"data_source_id" uuid NOT NULL,
	"connected" boolean NOT NULL,
	CONSTRAINT "org_data_source_status_org_id_data_source_id_pk" PRIMARY KEY("org_id","data_source_id")
);
--> statement-breakpoint
CREATE TABLE "org_role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" uuid NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "org_role_org_id_name_unique" UNIQUE("org_id","name")
);
--> statement-breakpoint
CREATE TABLE "org_role_permissions" (
	"org_role_id" uuid NOT NULL,
	"data_source_id" uuid NOT NULL,
	"can_view" boolean NOT NULL,
	CONSTRAINT "org_role_permissions_org_role_id_data_source_id_pk" PRIMARY KEY("org_role_id","data_source_id")
);
--> statement-breakpoint
ALTER TABLE "org_member" DROP CONSTRAINT "org_member_org_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "org_member" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "org_member" ADD COLUMN "role_id" uuid;--> statement-breakpoint
ALTER TABLE "org_data_source_status" ADD CONSTRAINT "org_data_source_status_org_id_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."org"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_data_source_status" ADD CONSTRAINT "org_data_source_status_data_source_id_data_source_id_fk" FOREIGN KEY ("data_source_id") REFERENCES "public"."data_source"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_role" ADD CONSTRAINT "org_role_org_id_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."org"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_role_permissions" ADD CONSTRAINT "org_role_permissions_org_role_id_org_role_id_fk" FOREIGN KEY ("org_role_id") REFERENCES "public"."org_role"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_role_permissions" ADD CONSTRAINT "org_role_permissions_data_source_id_data_source_id_fk" FOREIGN KEY ("data_source_id") REFERENCES "public"."data_source"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_member" ADD CONSTRAINT "org_member_role_id_org_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."org_role"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_member" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "org_member" ADD CONSTRAINT "org_member_org_id_user_id_unique" UNIQUE("org_id","user_id");