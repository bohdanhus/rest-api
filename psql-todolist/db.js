import Pool from 'pg-pool'

const pool = new Pool({
    user: 'todolist_app',
    password: 'intern',
    host: 'localhost',
    port: 5432,
    database: 'employee',
})

export default pool;