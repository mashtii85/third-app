alter table "public"."location"
  add constraint "location_parent_id_fkey"
  foreign key ("parent_id")
  references "public"."location"
  ("id") on update cascade on delete set null;
