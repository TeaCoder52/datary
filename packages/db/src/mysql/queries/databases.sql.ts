export const DATABASES_QUERY = `
  SELECT schema_name
  FROM information_schema.schemata
  ORDER BY schema_name
`
