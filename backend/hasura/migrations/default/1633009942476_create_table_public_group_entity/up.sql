CREATE TABLE "public"."group_entity" ("id" serial NOT NULL, "group_id" integer NOT NULL, "entity_id" integer NOT NULL, "entity" varchar NOT NULL, "meta" jsonb, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("group_id", "entity_id", "entity"));
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
CREATE TRIGGER "set_public_group_entity_updated_at"
BEFORE UPDATE ON "public"."group_entity"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_group_entity_updated_at" ON "public"."group_entity" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
