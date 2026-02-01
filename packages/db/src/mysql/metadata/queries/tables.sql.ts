export const TABLES_QUERY = `
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = ?
    AND table_type = 'BASE TABLE'
  ORDER BY table_name
`
