export const COLUMNS_QUERY = `
  SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
  FROM information_schema.columns
  WHERE table_schema = ?
    AND table_name = ?
  ORDER BY ORDINAL_POSITION
`
