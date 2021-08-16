import {Sequelize} from "sequelize";


export default new Sequelize('employee', 'todolist_api', 'intern', {
    host: 'localhost',
    dialect: 'postgres'
});