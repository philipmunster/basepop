CREATE TYPE "public"."member_role" AS ENUM('owner', 'admin', 'viewer');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_member" (
	"org_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "member_role" DEFAULT 'owner' NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "org_member_org_id_user_id_pk" PRIMARY KEY("org_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopify_order_fact" (
	"org_id" uuid NOT NULL,
	"order_id" text NOT NULL,
	"shop_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"currency" text NOT NULL,
	"total_price" numeric(12, 2) NOT NULL,
	CONSTRAINT "shopify_order_fact_org_id_order_id_pk" PRIMARY KEY("org_id","order_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_member" ADD CONSTRAINT "org_member_org_id_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."org"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopify_order_fact" ADD CONSTRAINT "shopify_order_fact_org_id_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."org"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_shopify_order_org_created" ON "shopify_order_fact" USING btree ("org_id","created_at");