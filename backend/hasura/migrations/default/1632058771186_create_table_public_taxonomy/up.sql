CREATE TABLE "public"."taxonomy" ("id" serial NOT NULL, "client_id" integer NOT NULL, "parent_id" integer NOT NULL, "entity_id" integer, "entity" varchar, "type" varchar NOT NULL, "name" varchar NOT NULL, "is_group" boolean, "custom_fields" jsonb, "meta" jsonb, "ordering" integer, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("client_id") REFERENCES "public"."account"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_taxonomy_updated_at"
BEFORE UPDATE ON "public"."taxonomy"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_taxonomy_updated_at" ON "public"."taxonomy" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
