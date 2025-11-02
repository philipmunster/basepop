CREATE TYPE "public"."organisation_size" AS ENUM('1-5', '6-20', '21-100', '+100');--> statement-breakpoint
ALTER TABLE "org" ADD COLUMN "organisation_size" "organisation_size";