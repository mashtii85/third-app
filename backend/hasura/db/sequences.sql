-- Reset sequences

SELECT SETVAL('public.account_id_seq', COALESCE(MAX(id), 1) ) FROM public.account;
SELECT SETVAL('public.account_user_id_seq', COALESCE(MAX(id), 1) ) FROM public.account_user;
SELECT SETVAL('public.address_id_seq', COALESCE(MAX(id), 1) ) FROM public.address;
SELECT SETVAL('public.course_id_seq', COALESCE(MAX(id), 1) ) FROM public.course;
SELECT SETVAL('public.course_enrollment_id_seq', COALESCE(MAX(id), 1) ) FROM public.course_enrollment;
SELECT SETVAL('public.event_id_seq', COALESCE(MAX(id), 1) ) FROM public.event;
SELECT SETVAL('public.event_entity_id_seq', COALESCE(MAX(id), 1) ) FROM public.event_entity;
SELECT SETVAL('public.group_id_seq', COALESCE(MAX(id), 1) ) FROM public.group;
SELECT SETVAL('public.group_entity_id_seq', COALESCE(MAX(id), 1) ) FROM public.group_entity;
SELECT SETVAL('public.lesson_id_seq', COALESCE(MAX(id), 1) ) FROM public.lesson;
SELECT SETVAL('public.lesson_progress_id_seq', COALESCE(MAX(id), 1) ) FROM public.lesson_progress;
SELECT SETVAL('public.location_id_seq', COALESCE(MAX(id), 1) ) FROM public.location;
SELECT SETVAL('public.medium_id_seq', COALESCE(MAX(id), 1) ) FROM public.medium;
SELECT SETVAL('public.module_id_seq', COALESCE(MAX(id), 1) ) FROM public.module;
SELECT SETVAL('public.post_id_seq', COALESCE(MAX(id), 1) ) FROM public.post;
SELECT SETVAL('public.status_log_id_seq', COALESCE(MAX(id), 1) ) FROM public.status_log;
SELECT SETVAL('public.taxonomy_id_seq', COALESCE(MAX(id), 1) ) FROM public.taxonomy;
SELECT SETVAL('public.taxonomy_entity_id_seq', COALESCE(MAX(id), 1) ) FROM public.taxonomy_entity;
SELECT SETVAL('public.user_id_seq', COALESCE(MAX(id), 1) ) FROM public.user;
