alter table "public"."taxonomy"
  add constraint "taxonomy_parent_id_fkey"
  foreign key ("parent_id")
  references "public"."taxonomy"
  ("id") on update cascade on delete cascade;
