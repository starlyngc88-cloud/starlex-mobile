-- Script para crear la tabla procesados en Supabase
-- Ejecuta esto en el SQL Editor de Supabase

create extension if not exists "uuid-ossp";

create schema if not exists legal;
create schema if not exists crm;

create table if not exists legal.procesados (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  nombre text not null,
  apellido text not null,
  cedula text unique,
  email text,
  telefono text,
  estado text default 'indagacion',
  fecha_inicio date,
  observaciones text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function legal.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on legal.procesados;
create trigger set_updated_at
before update on legal.procesados
for each row
execute function legal.set_updated_at();

alter table legal.procesados enable row level security;

drop policy if exists "procesados_select_own_only" on legal.procesados;
create policy "procesados_select_own_only"
  on legal.procesados
  for select
  using (auth.uid() = user_id);

drop policy if exists "procesados_insert_own_only" on legal.procesados;
create policy "procesados_insert_own_only"
  on legal.procesados
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "procesados_update_own_only" on legal.procesados;
create policy "procesados_update_own_only"
  on legal.procesados
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "procesados_delete_own_only" on legal.procesados;
create policy "procesados_delete_own_only"
  on legal.procesados
  for delete
  using (auth.uid() = user_id);
