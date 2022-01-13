CREATE TABLE "public"."course_enrollment" ("id" serial NOT NULL, "course_id" integer NOT NULL, "account_id" integer NOT NULL, "user_id" integer, "taxonomy_id" integer, "custom_fields" jsonb, "meta" jsonb, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE cascade ON DELETE set null, FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON UPDATE cascade ON DELETE set null);
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
CREATE TRIGGER "set_public_course_enrollment_updated_at"
BEFORE UPDATE ON "public"."course_enrollment"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_course_enrollment_updated_at" ON "public"."course_enrollment" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
