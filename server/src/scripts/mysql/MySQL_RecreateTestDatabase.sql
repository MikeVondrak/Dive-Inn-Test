-- Recreate test Dive Inn database

DROP DATABASE IF EXISTS dive_inn_test_db;

CREATE DATABASE dive_inn_test_db;
USE dive_inn_test_db;

-- Create default user if it doesn't exist
DROP USER IF EXISTS 'DiveMaster'@'localhost';
CREATE USER 'DiveMaster'@'localhost' IDENTIFIED WITH mysql_native_password BY 'D1v3M4st3r!!';
GRANT ALL PRIVILEGES ON *.* TO 'DiveMaster'@'localhost'; -- IDENTIFIED BY 'D1v3M4st3r!!';
FLUSH PRIVILEGES;

-- TODO - How TF to do IF statements
-- IF EXISTS USER 'DiveMaster'@localhost' THEN
--     \! echo 'exists';
-- ELSE
--     \! echo 'not exists';
-- END IF

-- Recreate test table
DROP TABLE IF EXISTS test_table;
CREATE TABLE test_table (
    PRIMARY KEY (test_id),
    test_id         INT             NOT NULL AUTO_INCREMENT,
    test_char       CHAR(1)         NOT NULL,
    test_null_char  CHAR(1),
    test_varchar    VARCHAR(100),
    test_text       TEXT,
    test_int        INTEGER,
    test_double     DOUBLE,
    test_decimal    DECIMAL(8,2),
    test_date       DATE,          -- 'YYYY-MM-DD'
    test_time       TIME,          -- 'HH:MM:SS'
    test_datetime   DATETIME,      -- 'YYYY-MM-DD HH:MM:SS'
    test_json       JSON
);

INSERT INTO test_table (test_char, test_null_char, test_varchar, test_text, test_int, test_double, test_decimal, test_date, test_time, test_datetime, test_json)
VALUES
    ('a', NULL, 'abc123', 'text value', 1, 1.0001, 100000.01, '1000-01-01', '00:00:00', '1111-11-11 11:11:11', '{ "name": "testJson", "value": "object" }'),
    ('b', 'n', 'def456', 'text value number 2', 2, 2.0002, 200000.02, '2000-02-02', '02:02:02', '2222-12-22 22:22:22', '["val1", "val2", "val3", "val4"]'),
    ('c', NULL, 'ghi789', 'text value number 3', 3, 3.0003, 300000.03, '3000-03-03', '03:03:03', '3333-12-31 23:59:59', '{ "name": "testJson2", "value": ["val1", "val2", "val3"] }'),
    ('d', NULL, 'jklmno', 'text value number 4', 4, 4.0004, 400000.04, CURRENT_DATE(), CURRENT_TIME(), NOW(), '{}'),
    ('e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);


-- TType of objects the font will be applied to, e.g. main_nav for setting the main navigation sign posts font
DROP TABLE IF EXISTS font_type;
CREATE TABLE font_type (
    PRIMARY KEY (id),
    id      INT             NOT NULL AUTO_INCREMENT,
    type    VARCHAR(20)     NOT NULL
);
INSERT INTO font_type (type)
VALUES
    ('page_title'),
    ('main_nav'),
    ('section_title'),
    ('section_header'),
    ('section_text');


-- Category that a font is suggested for, e.g. arial-ish fonts for text, to apply categories within dropdowns
DROP TABLE IF EXISTS font_category;
CREATE TABLE font_category (
    PRIMARY KEY (id),
    id          INT             NOT NULL AUTO_INCREMENT,
    category    VARCHAR(20)     NOT NULL
);
INSERT INTO font_category (category)
VALUES
    ('header'), ('text'), ('nav'), ('title');


-- Create font weight table
DROP TABLE IF EXISTS font_weight;
CREATE TABLE font_weight (
    PRIMARY KEY (id),
    id          INT             NOT NULL AUTO_INCREMENT,
    weight      VARCHAR(20)     NOT NULL
);
INSERT INTO font_weight (weight)
VALUES
    ('100'), ('200'), ('300'), ('regular'), ('500'), ('600'), ('700'), ('800'), ('900');


-- Create font table
DROP TABLE IF EXISTS font;
CREATE TABLE font (
    PRIMARY KEY (id),
    id                  INT             NOT NULL AUTO_INCREMENT,
    family              VARCHAR(20)     NOT NULL,
    selectable          BOOLEAN         NOT NULL,
    blacklisted         BOOLEAN         NOT NULL
);
INSERT INTO font (family, selectable, blacklisted)
VALUES
    ('Roboto', true, false),
    ('Roboto Condensed', false, true),
    ('Montserrat', true, false),
    ('Lato', true, false),
    ('Oswald', false, true),
    ('Raleway', true, false),
    ('Source Sans Pro', false, true),
    ('Noto Sans JP', false, true),
    ('Open Sans', false, true);

-- Create font properties? table - properties for a specific usage of a font
-- TODO: finish this
DROP TABLE IF EXISTS font_instance;
CREATE TABLE font_instance (
    PRIMARY KEY (id),
    id                  INT             NOT NULL AUTO_INCREMENT,
    fk_font_id          INT,
    FOREIGN KEY (fk_font_id)
        REFERENCES font(id)
        ON DELETE SET NULL,
    ui_label            VARCHAR(50),
    href                VARCHAR(50),
    italic              BOOLEAN         NOT NULL,
    fk_font_weight_id   INT,
    FOREIGN KEY (fk_font_weight_id)
        REFERENCES font_weight(id)
        ON DELETE SET NULL,
    fk_font_category_id INT,
    FOREIGN KEY (fk_font_category_id)
        REFERENCES font_category(id)
        ON DELETE SET NULL
);
-- INSERT INTO font_props (fk_font_id, ui_label, href, italic, fk_font_weight_id, fk_font_category_id)
-- VALUES
--     ('Roboto', null, null, false, true, false, 4, 2),
--     ('Roboto Mono', null, null, true, false, true, 7, 2),
--     ('Alfa Slab One', null, null, false, true, false, 4, 1),
--     ('Anton', null, null, false, true, false, 4, 1),
--     ('Bevan', null, null, false, true, false, 4, 1),
--     ('Patua One', null, null, false, true, false, 4, 1),
--     ('Piedra', null, null, false, true, false, 4, 1),
--     ('PT Sans', null, null, false, true, false, 4, 2),
--     -- ('PT Sans', 'PT Sans Bold', 'PT+Sans:wght@700', false, true, false, 7, 2),
--     -- ('PT Sans', 'PT Sans Italic', 'PT+Sans:ital@1', true, true, false, 4, 2),
--     ('NOT A FONT ERROR', null, null, false, true, false, 4, 2),
--     ('PT Sans', 'PT Sans Invalid Weight', 'PT+Sans:wght@200', false, true, false, 2, 2);

-- create font_set table that maps a font and font_type to a font_set row, 
-- multiple font_set rows with the same set_id comprise a "font set" that can be applied to the mock site
DROP TABLE IF EXISTS font_set;
CREATE TABLE font_set (
    PRIMARY KEY (id),
    id                  INT         NOT NULL AUTO_INCREMENT,
    set_id              SMALLINT,
    fk_font_type_id     INT,
    FOREIGN KEY (fk_font_type_id) 
        REFERENCES font_type(id)
        ON DELETE CASCADE,
    fk_font_id          INT,
    FOREIGN KEY (fk_font_id) 
        REFERENCES font(id)
        ON DELETE CASCADE
);
INSERT INTO font_set (set_id, fk_font_type_id, fk_font_id)
VALUES
    (1, 1, 1), (1, 2, 1), (1, 3, 2), (1, 4, 2), (1, 5, 6),
    (2, 1, 2), (2, 2, 3), (2, 3, 3), (2, 4, 2), (2, 5, 7);