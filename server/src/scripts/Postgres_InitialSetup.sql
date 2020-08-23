--GRANT USAGE ON SCHEMA dive_inn_test_db TO postgres;
ALTER ROLE postgres SET search_path = "$user", dive_inn_test_db, public;
--ALTER DATABASE postgres SET search_path TO "$user", dive_inn_test_db, public;
--SET search_path TO "$user", dive_inn_test_db, public;
show search_path;