export const sqlQueries_mysql = {
  selectTestTable: 'SELECT * FROM test_table',

  selectFontsTable: 'SELECT * FROM font',
  
  selectFontsFontFamily: 'SELECT family FROM font',

  //insertFont: 'INSERT INTO font(family, selectable, blacklisted) VALUES (?, ?, ?)',
  insertFont: 'INSERT INTO font SET ?',

  removeFont: 'DELETE FROM font WHERE id = ?',

  selectTableColumn: 'SELECT ?? FROM ??',

  // TODO - need to update for new data format
  selectFontInstanceTable:
    `SELECT font.*, font_weight.weight, font_category.category FROM font
      INNER JOIN font_weight ON fk_font_weight_id = font_weight.id
      INNER JOIN font_category ON fk_font_category_id = font_category.id`,
};

export const sqlQueries = {
  selectTestTable: 'SELECT * FROM test_table',
  
  // font table
  selectFontsTable: 'SELECT * FROM font',
  selectFontsFontFamily: 'SELECT family FROM font',
  insertFont: 'INSERT INTO font() VALUES($1)',
  removeFont: 'DELETE FROM font WHERE id = $1',

  // font instance table  
  getFontInstances:
    `SELECT * FROM font_instance 
      INNER JOIN font_weight ON fk_font_weight_id = font_weight.id`,
  addFontInstance: 'INSERT INTO font_instance(family, italic, size, weight) VALUES($1,$2,$3,$4)',

  getFontSets:
    `SELECT * FROM font_set
      INNER JOIN font_type ON fk_font_type_id = font_type.id`,
  addFontSet: 'INSERT INTO font_set(set_id, set_name, fk_font_type_id, fk_font_instance_id) VALUES($1,$2,$3,$4)',
  removeFontSet: 'DELETE FROM font_set WHERE set_id = $1'
}

// WHERE family = $1 AND italic = $2 AND size = $3 AND weight = $4