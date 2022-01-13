CREATE TABLE "public"."user" ("id" serial NOT NULL, "taxonomy_id" integer, "email" varchar NOT NULL, "name_first" varchar NOT NULL, "name_last" varchar NOT NULL, "is_verified" boolean, "custom_fields" jsonb, "meta" jsonb, "password" varchar, "password_token" uuid DEFAULT gen_random_uuid(), "password_token_expire" timestamptz DEFAULT (now() + '24:00:00'::interval), "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("email"));
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
CREATE TRIGGER "set_public_user_updated_at"
BEFORE UPDATE ON "public"."user"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_user_updated_at" ON "public"."user" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
