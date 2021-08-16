import knex from 'knex'
const kn = knex({
    client: 'pg',
    version: '6.14.14',
    connection: {
        host : 'localhost',
        user : 'todolist_app',
        password : 'intern',
        database : 'employee'
    }
});

export default kn;