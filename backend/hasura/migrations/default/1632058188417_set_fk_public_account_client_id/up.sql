alter table "public"."account"
  add constraint "account_client_id_fkey"
  foreign key ("client_id")
  references "public"."account"
  ("id") on update cascade on delete restrict;
