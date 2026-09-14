CREATE TABLE "leads" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"customer_type" varchar(32) NOT NULL,
	"property_count" integer DEFAULT 1 NOT NULL,
	"company" varchar(120),
	"address" varchar(200) NOT NULL,
	"city" varchar(80) NOT NULL,
	"zip" varchar(5) NOT NULL,
	"year_built" smallint NOT NULL,
	"pre_1978" boolean NOT NULL,
	"occupancy" varchar(24) NOT NULL,
	"divisions" jsonb NOT NULL,
	"description" text NOT NULL,
	"urgency" varchar(16) NOT NULL,
	"access_notes" varchar(500),
	"access_notes_redacted" boolean DEFAULT false NOT NULL,
	"photo_urls" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(254) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"contact_preference" varchar(8) NOT NULL,
	"priority" varchar(16) NOT NULL,
	"notified_at" timestamp with time zone,
	"notify_error" text,
	"source" varchar(120),
	"referrer" varchar(500),
	"user_agent" varchar(500)
);
--> statement-breakpoint
CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_priority_idx" ON "leads" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "leads_email_idx" ON "leads" USING btree ("email");