export const sqlQueries = {
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
}