CREATE TYPE "public"."date_preset" AS ENUM('Yesterday', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Last 90 days', 'Last 365 days', 'This week to yesterday', 'Last week', '2 weeks ago', 'This week last year', 'This week to yesterday last year', 'This month to yesterday', 'Last month', '2 months ago', 'This month last year', 'This month to yesterday last year', 'This quarter to yesterday', 'Last quarter', '2 quarters ago', 'This quarter last year', 'This quarter to yesterday last year', 'This year to yesterday', 'Last year', '2 years ago', 'Last year to yesterday');--> statement-breakpoint
CREATE TABLE "org_member_settings" (
	"org_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"date_preset" date_preset DEFAULT 'Last 30 days' NOT NULL,
	"timezone" text DEFAULT 'Europe/Copenhagen' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "org_member_settings_org_id_user_id_pk" PRIMARY KEY("org_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "org_settings" (
	"org_id" uuid PRIMARY KEY NOT NULL,
	"billing_email" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "org_member_settings" ADD CONSTRAINT "org_member_settings_org_member_fk" FOREIGN KEY ("org_id","user_id") REFERENCES "public"."org_member"("org_id","user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_settings" ADD CONSTRAINT "org_settings_org_id_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."org"("id") ON DELETE cascade ON UPDATE no action;