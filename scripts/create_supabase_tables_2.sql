-- Script para crear la segunda tabla en el esquema crm
-- Ejecuta esto en Supabase después del primer script

create schema if not exists crm;

create table if not exists crm.clientes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  nombre text not null,
  apellido text not null,
  cedula text unique,
  email text,
  telefono text,
  estado text default 'activo',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function crm.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on crm.clientes;
create trigger set_updated_at
before update on crm.clientes
for each row
execute function crm.set_updated_at();

alter table crm.clientes enable row level security;

drop policy if exists "clientes_select_own_only" on crm.clientes;
create policy "clientes_select_own_only"
  on crm.clientes
  for select
  using (auth.uid() = user_id);

drop policy if exists "clientes_insert_own_only" on crm.clientes;
create policy "clientes_insert_own_only"
  on crm.clientes
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "clientes_update_own_only" on crm.clientes;
create policy "clientes_update_own_only"
  on crm.clientes
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "clientes_delete_own_only" on crm.clientes;
create policy "clientes_delete_own_only"
  on crm.clientes
  for delete
  using (auth.uid() = user_id);
