CREATE TABLE "public"."event" ("id" serial NOT NULL, "account_id" integer NOT NULL, "location_id" integer, "taxonomy_id" integer, "parent_id" integer, "title" varchar NOT NULL, "description" text, "start_at" timestamptz, "end_at" timestamptz, "custom_fields" jsonb, "meta" jsonb, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON UPDATE cascade ON DELETE set null, FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON UPDATE cascade ON DELETE set null);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_event_updated_at"
BEFORE UPDATE ON "public"."event"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_event_updated_at" ON "public"."event" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
