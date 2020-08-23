export interface ServerTestData{
  id: number;
  test_char: string;
  test_null_char: string;
  test_varchar: string;
  test_text: string;
  test_int: number;
  test_double: number;
  test_decimal: number;
  test_date: Date;
  test_time: Date;
  test_datetime: Date;
  test_json: object;

  // test_char        CHAR(1)         NOT NULL,
  // test_null_char   CHAR(1),
  // test_varchar     VARCHAR(100),
  // test_text        TEXT,
  // test_int         INTEGER,
  // test_double      DOUBLE,
  // test_decimal     DECIMAL(8,2),
  // test_date        DATE,          -- 'YYYY-MM-DD'
  // test_time        TIME,          -- 'HH:MM:SS'
  // test_datetime    DATETIME,      -- 'YYYY-MM-DD HH:MM:SS'
  // test_json        JSON
}