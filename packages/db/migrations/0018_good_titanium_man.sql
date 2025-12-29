CREATE TABLE "shopify_sales_fact" (
	"org_id" uuid NOT NULL,
	"shop_id" text NOT NULL,
	"order_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"currency" text NOT NULL,
	"device" text,
	"country" text,
	"isNewCustomer" boolean,
	"revenue" numeric(12, 2) NOT NULL,
	"items_cnt" integer NOT NULL,
	CONSTRAINT "shopify_sales_fact_org_id_shop_id_order_id_pk" PRIMARY KEY("org_id","shop_id","order_id")
);
--> statement-breakpoint
DROP TABLE "shopify_order_fact" CASCADE;--> statement-breakpoint
ALTER TABLE "shopify_sales_fact" ADD CONSTRAINT "shopify_sales_fact_org_id_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."org"("id") ON DELETE cascade ON UPDATE no action;