CREATE TABLE "public"."lesson_progress" ("id" serial NOT NULL, "enrollment_id" integer NOT NULL, "lesson_id" integer NOT NULL, "points" integer NOT NULL DEFAULT 0, "meta" jsonb, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("enrollment_id") REFERENCES "public"."course_enrollment"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("lesson_id") REFERENCES "public"."lesson"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("enrollment_id", "lesson_id"));
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
CREATE TRIGGER "set_public_lesson_progress_updated_at"
BEFORE UPDATE ON "public"."lesson_progress"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_lesson_progress_updated_at" ON "public"."lesson_progress" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
