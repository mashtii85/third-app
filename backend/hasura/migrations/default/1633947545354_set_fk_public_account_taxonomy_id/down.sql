alter table "public"."account" drop constraint "account_taxonomy_id_fkey",
  add constraint "account_taxonomy_id_fkey"
  foreign key ("taxonomy_id")
  references "public"."taxonomy"
  ("id") on update cascade on delete restrict;
