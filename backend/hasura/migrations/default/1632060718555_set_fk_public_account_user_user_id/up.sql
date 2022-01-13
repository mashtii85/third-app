alter table "public"."account_user"
  add constraint "account_user_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update cascade on delete cascade;
