-- PostgreSQL v12

--GRANT USAGE ON SCHEMA dive_inn_test_db TO postgres;
ALTER ROLE postgres SET search_path = "$user", dive_inn_test_db, public;
--ALTER DATABASE postgres SET search_path TO "$user", dive_inn_test_db, public;
--SET search_path TO "$user", dive_inn_test_db, public;

-- NOTE: Need to refresh browser window to see changes to ROLE
SHOW search_path;

-- Recreate test Dive Inn schema
DROP SCHEMA IF EXISTS dive_inn_test_db;
CREATE SCHEMA dive_inn_test_db;