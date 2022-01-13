CREATE TABLE "public"."notification" ("id" serial NOT NULL, "communication_id" integer NOT NULL, "user_id" integer NOT NULL, "type" varchar NOT NULL, "content" text NOT NULL, "meta" jsonb, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("communication_id") REFERENCES "public"."communication"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_notification_updated_at"
BEFORE UPDATE ON "public"."notification"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_notification_updated_at" ON "public"."notification" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
