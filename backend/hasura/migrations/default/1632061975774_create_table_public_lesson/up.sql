CREATE TABLE "public"."lesson" ("id" serial NOT NULL, "course_id" integer NOT NULL, "module_id" integer NOT NULL, "taxonomy_id" integer, "type" varchar, "title" varchar NOT NULL, "description" text, "content" text, "custom_fields" jsonb, "meta" jsonb, "ordering" integer, "status" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON UPDATE cascade ON DELETE set null);
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
CREATE TRIGGER "set_public_lesson_updated_at"
BEFORE UPDATE ON "public"."lesson"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_lesson_updated_at" ON "public"."lesson" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
