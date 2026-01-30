export const DATABASES_QUERY = `
    SELECT datname
    FROM pg_database
    WHERE datistemplate = false
    ORDER BY datname
`
