CREATE TABLE "shopify_order_fact" (
	"org_id" uuid NOT NULL,
	"order_id" text NOT NULL,
	"shop_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"currency" text NOT NULL,
	"total_price" numeric(12, 2) NOT NULL,
	CONSTRAINT "shopify_order_fact_org_id_order_id_pk" PRIMARY KEY("org_id","order_id")
);
--> statement-breakpoint
ALTER TABLE "shopify_order_fact" ADD CONSTRAINT "shopify_order_fact_org_id_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."org"("id") ON DELETE cascade ON UPDATE no action;