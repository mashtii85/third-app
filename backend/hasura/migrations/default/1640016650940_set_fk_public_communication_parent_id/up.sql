alter table "public"."communication"
  add constraint "communication_parent_id_fkey"
  foreign key ("parent_id")
  references "public"."communication"
  ("id") on update cascade on delete set null;
