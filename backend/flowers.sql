\echo 'Delete and recreate flowers db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE flowers;
CREATE DATABASE flowers;
\connect flowers

\i flowers-schema.sql
\i flowers-seed.sql

\echo 'Delete and recreate flowers_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE flowers_test;
CREATE DATABASE flowers_test;
\connect flowers_test

\i flowers-schema.sql