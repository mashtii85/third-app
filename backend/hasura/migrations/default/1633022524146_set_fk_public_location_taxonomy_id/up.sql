alter table "public"."location"
  add constraint "location_taxonomy_id_fkey"
  foreign key ("taxonomy_id")
  references "public"."taxonomy"
  ("id") on update cascade on delete set null;
