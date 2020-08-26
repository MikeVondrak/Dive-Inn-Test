-- PostgreSQL v12
-- TODO: Need to convert this to Postgres from MySQL

-- Type of objects the font will be applied to, e.g. main_nav for setting the main navigation sign posts font
DROP TABLE IF EXISTS font_type;
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
DROP TABLE IF EXISTS font_category;
CREATE TABLE font_category (    
    id          SERIAL          PRIMARY KEY,
    category    VARCHAR(20)     NOT NULL
);
INSERT INTO font_category (category)
VALUES
    ('header'), ('text'), ('nav'), ('title');


-- Create font weight table
DROP TABLE IF EXISTS font_weight;
CREATE TABLE font_weight (
    id          SERIAL          PRIMARY KEY,
    weight      VARCHAR(20)     NOT NULL
);
INSERT INTO font_weight (weight)
VALUES
    ('100'), ('200'), ('300'), ('regular'), ('500'), ('600'), ('700'), ('800'), ('900');


-- Create font table
DROP TABLE IF EXISTS font;
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

-- Create font properties? table - properties for a specific usage of a font
-- TODO: finish this
DROP TABLE IF EXISTS font_instance;
CREATE TABLE font_instance (
    id                  SERIAL          PRIMARY KEY,
    fk_font_id          INT,
    CONSTRAINT font_instance_font_id
        FOREIGN KEY (fk_font_id)
            REFERENCES font(id)
            ON DELETE SET NULL,
    ui_label            VARCHAR(50),
    href                VARCHAR(50),
    italic              BOOLEAN         NOT NULL,
    fk_font_weight_id   INT,
    CONSTRAINT font_instance_font_weight
        FOREIGN KEY (fk_font_weight_id)
            REFERENCES font_weight(id)
            ON DELETE SET NULL,
    fk_font_category_id INT,
    CONSTRAINT font_instance_font_category
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