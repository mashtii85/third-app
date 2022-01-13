CREATE TABLE "public"."account_user" ("id" serial NOT NULL, "account_id" integer NOT NULL, "user_id" integer NOT NULL, "taxonomy_id" integer, "is_owner" boolean, "is_contact" boolean, "last_signin_at" timestamptz, "custom_fields" jsonb, "meta" jsonb, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_account_user_updated_at"
BEFORE UPDATE ON "public"."account_user"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_account_user_updated_at" ON "public"."account_user" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
