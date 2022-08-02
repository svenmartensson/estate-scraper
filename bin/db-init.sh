#!/usr/bin/env sh

set -e

PGPASSWORD="$POSTGRES_PASSWORD" psql --username "$POSTGRES_USER" <<-EOSQL
   create database estates;
EOSQL

PGPASSWORD="$POSTGRES_PASSWORD" psql --username "$POSTGRES_USER" estates <<-EOSQL
   create table "estates" (
      "id" serial not null,
      "name" character varying(100) not null,
      "locality" character varying(100) not null,
      "order" integer not null,
      "thumbnail" character varying(100) not null,
      primary key ("id")
   );
EOSQL
