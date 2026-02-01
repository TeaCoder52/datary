export const VIEWS_QUERY = `
    SELECT table_name
    FROM information_schema.views
    WHERE table_schema = $1
    ORDER BY table_name
`
