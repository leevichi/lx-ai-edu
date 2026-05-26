-- 접수번호·연락처 조회 (선택: 성능 향상용, 없어도 앱은 최근 500건 스캔으로 동작)
create or replace function public.lookup_application_by_receipt(
  receipt_code text,
  phone_digits text
)
returns setof public.applications
language sql
stable
security definer
set search_path = public
as $$
  select a.*
  from public.applications a
  where upper(replace(a.id::text, '-', '')) like upper(replace(receipt_code, '-', '')) || '%'
    and regexp_replace(a.contact_phone, '[^0-9]', '', 'g') = phone_digits
  order by a.created_at desc
  limit 1;
$$;

grant execute on function public.lookup_application_by_receipt(text, text) to service_role;
