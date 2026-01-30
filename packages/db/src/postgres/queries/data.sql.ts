export const TABLE_DATA_QUERY = `
  SELECT *
  FROM %I.%I
  LIMIT $1 OFFSET $2
`
