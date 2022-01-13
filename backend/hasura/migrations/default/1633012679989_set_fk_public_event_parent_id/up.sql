alter table "public"."event"
  add constraint "event_parent_id_fkey"
  foreign key ("parent_id")
  references "public"."event"
  ("id") on update cascade on delete set null;
