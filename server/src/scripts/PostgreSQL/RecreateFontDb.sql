-- PostgreSQL v12

-- Type of objects the font will be applied to, e.g. main_nav for setting the main navigation sign posts font
DROP TABLE IF EXISTS font_type CASCADE;
CREATE TABLE font_type (
    id      SERIAL          PRIMARY KEY,
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
DROP TABLE IF EXISTS font_category CASCADE;
CREATE TABLE font_category (    
    id          SERIAL          PRIMARY KEY,
    category    VARCHAR(20)     NOT NULL
);
INSERT INTO font_category (category)
VALUES
    ('header'), ('text'), ('nav'), ('title');


-- Create font weight table
DROP TABLE IF EXISTS font_weight CASCADE;
CREATE TABLE font_weight (
    id          SERIAL          PRIMARY KEY,
    weight      VARCHAR(20)     NOT NULL
);
INSERT INTO font_weight (weight)
VALUES
    ('100'), ('200'), ('300'), ('regular'), ('500'), ('600'), ('700'), ('800'), ('900');


-- Create font table
DROP TABLE IF EXISTS font CASCADE;
CREATE TABLE font (
    id                  SERIAL          PRIMARY KEY,
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

-- Create font_instance table - properties for a specific usage of a font
DROP TABLE IF EXISTS font_instance CASCADE;
CREATE TABLE font_instance (
    id                  SERIAL          PRIMARY KEY,
    family              VARCHAR(20)     NOT NULL,
    italic              BOOLEAN         NOT NULL,
    size                INT             NOT NULL,
    fk_font_weight_id   INT,
    CONSTRAINT font_instance_font_weight
        FOREIGN KEY (fk_font_weight_id)
            REFERENCES font_weight(id)
            ON DELETE SET NULL
);
INSERT INTO font_instance (family, italic, size, fk_font_weight_id)
VALUES
    ('Roboto', false, 16, 4),
    ('Roboto', true, 16, 4),
    ('Roboto', true, 26, 4),
    ('Roboto Mono', false, 16, 4),
    ('Roboto Condensed', false, 16, 4);

-- create font_set table that maps a font and font_type to a font_set row, 
-- multiple font_set rows with the same set_id comprise a "font set" that can be applied to the mock site
DROP TABLE IF EXISTS font_set;
CREATE TABLE font_set (
    id                  SERIAL          PRIMARY KEY,
    set_id              SMALLINT,
    fk_font_type_id     INT,
    CONSTRAINT font_set_font_type_id
        FOREIGN KEY (fk_font_type_id) 
            REFERENCES font_type(id)
            ON DELETE CASCADE,
    fk_font_id          INT,
    CONSTRAINT font_set_font_id
    FOREIGN KEY (fk_font_id) 
        REFERENCES font(id)
        ON DELETE CASCADE
);
INSERT INTO font_set (set_id, fk_font_type_id, fk_font_id)
VALUES
    (1, 1, 1), (1, 2, 1), (1, 3, 2), (1, 4, 2), (1, 5, 6),
    (2, 1, 2), (2, 2, 3), (2, 3, 3), (2, 4, 2), (2, 5, 7);