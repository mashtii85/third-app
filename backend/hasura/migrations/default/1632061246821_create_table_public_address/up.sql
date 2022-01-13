CREATE TABLE "public"."address" ("id" serial NOT NULL, "taxonomy_id" integer, "entity_id" integer NOT NULL, "entity" varchar NOT NULL, "name" varchar, "line1" varchar NOT NULL, "line2" varchar, "line3" varchar, "postcode" varchar NOT NULL, "city" varchar NOT NULL, "county" varchar, "custom_fields" jsonb, "meta" jsonb, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON UPDATE cascade ON DELETE set null);
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
CREATE TRIGGER "set_public_address_updated_at"
BEFORE UPDATE ON "public"."address"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_address_updated_at" ON "public"."address" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
