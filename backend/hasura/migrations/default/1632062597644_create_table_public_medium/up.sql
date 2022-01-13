CREATE TABLE "public"."medium" ("id" serial NOT NULL, "client_id" integer NOT NULL, "taxonomy_id" integer, "entity_id" integer NOT NULL, "entity" varchar NOT NULL, "type" varchar NOT NULL, "category" varchar, "filename" varchar, "extension" varchar, "caption" text, "custom_fields" jsonb, "meta" jsonb, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("client_id") REFERENCES "public"."account"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON UPDATE cascade ON DELETE set null);
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
CREATE TRIGGER "set_public_medium_updated_at"
BEFORE UPDATE ON "public"."medium"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_medium_updated_at" ON "public"."medium" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
