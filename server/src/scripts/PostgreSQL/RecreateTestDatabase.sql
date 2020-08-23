-- PostgreSQL v12

-- Recreate test table
DROP TABLE IF EXISTS test_table;
CREATE TABLE test_table (
    test_id         SERIAL          PRIMARY KEY,
    test_char       CHAR(1)         NOT NULL,
    test_null_char  CHAR(1),
    test_varchar    VARCHAR(100),
    test_text       TEXT,
    test_int        INTEGER,
    test_sm_int     SMALLINT,
    test_float      REAL,
    test_date       DATE,
    test_time       TIME,
    test_timestamp  TIMESTAMP,
    test_json       JSON
);

INSERT INTO test_table (test_char, test_null_char, test_varchar, test_text, test_int, test_sm_int, test_float, test_date, test_time, test_timestamp, test_json)
VALUES
    ('a', NULL, 'abc123', 'text value', 1, 1, 1.0001, '1000-01-01', '00:00:00', '1111-11-11 11:11:11', '{ "name": "testJson", "value": "object" }'),
    ('b', 'n', 'def456', 'text value number 2', 2, 2, 2.0002, '2000-02-02', '02:02:02', '2222-12-22 22:22:22', '["val1", "val2", "val3", "val4"]'),
    ('c', NULL, 'ghi789', 'text value number 3', 3, 3, 3.0003, '3000-03-03', '03:03:03', '3333-12-31 23:59:59', '{ "name": "testJson2", "value": ["val1", "val2", "val3"] }'),
    ('d', NULL, 'jklmno', 'text value number 4', 4, 4, 4.0004, CURRENT_DATE, CURRENT_TIME, NOW(), '{}'),
    ('e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
