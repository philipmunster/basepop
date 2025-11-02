CREATE TYPE "public"."plans" AS ENUM('starter', 'basic', 'premium');--> statement-breakpoint
ALTER TABLE "org" ADD COLUMN "plan" "plans" DEFAULT 'basic' NOT NULL;