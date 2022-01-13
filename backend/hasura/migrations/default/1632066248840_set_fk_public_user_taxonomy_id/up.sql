alter table "public"."user"
  add constraint "user_taxonomy_id_fkey"
  foreign key ("taxonomy_id")
  references "public"."taxonomy"
  ("id") on update cascade on delete set null;
