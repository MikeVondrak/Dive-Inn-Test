export const sqlQueries = {
  selectTestTable: 'SELECT * FROM test_table',
  
  // font table
  selectFontsTable: 'SELECT * FROM font',
  selectFontsFontFamily: 'SELECT family FROM font',
  insertFont: 'INSERT INTO font() VALUES($1)',
  removeFont: 'DELETE FROM font WHERE id = $1',

  // font types
  getFontTypes: 'SELECT * FROM font_type',

  // font weights
  getFontWeights: 'SELECT * FROM font_weight',

  // font instance table  
  getFontInstances:
    `SELECT font_instance.id, font_instance.family, font_instance.italic, font_instance.size, font_weight.weight FROM font_instance 
      INNER JOIN font_weight ON fk_font_weight_id = font_weight.id`,
  getFontInstanceById: 'SELECT * FROM font_instance WHERE id = $1',
  addFontInstance: 'INSERT INTO font_instance(family, italic, size, weight) VALUES($1, $2, $3, $4) RETURNING "id"', // not used currently
  addFontInstanceReturning: 'RETURNING id, family, italic, size, fk_font_weight_id',

  getFontInstanceApis:
    `SELECT font_instance.id, font_instance.family, font_instance.italic, font_instance.size, font_instance.fk_font_weight_id FROM font_instance`,

  // font sets
  getFontSets:
    `SELECT font_set.*, font_type.type FROM font_set
      INNER JOIN font_type ON fk_font_type_id = font_type.id`,
  getFontSetsApis: `SELECT * FROM font_set`,
  addFontSet: 'INSERT INTO font_set(set_id, set_name, fk_font_type_id, fk_font_instance_id) VALUES($1, $2, $3, $4)',
  addFontSetReturning: 'RETURNING id, set_id, set_name, fk_font_type_id, fk_font_instance_id',
  updateFontSetReturning: 'RETURNING id, v.set_id, v.set_name, v.fk_font_type_id, v.fk_font_instance_id',
  removeFontSet: 'DELETE FROM font_set WHERE set_id = $1'
}

// WHERE family = $1 AND italic = $2 AND size = $3 AND weight = $4
//





// MySql syntax queries
// export const sqlQueries_mysql = {
//   selectTestTable: 'SELECT * FROM test_table',

//   selectFontsTable: 'SELECT * FROM font',
  
//   selectFontsFontFamily: 'SELECT family FROM font',

//   //insertFont: 'INSERT INTO font(family, selectable, blacklisted) VALUES (?, ?, ?)',
//   insertFont: 'INSERT INTO font SET ?',

//   removeFont: 'DELETE FROM font WHERE id = ?',

//   selectTableColumn: 'SELECT ?? FROM ??',

//   // TODO - need to update for new data format
//   selectFontInstanceTable:
//     `SELECT font.*, font_weight.weight, font_category.category FROM font
//       INNER JOIN font_weight ON fk_font_weight_id = font_weight.id
//       INNER JOIN font_category ON fk_font_category_id = font_category.id`,
// };