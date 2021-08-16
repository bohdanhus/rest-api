import {Sequelize} from "sequelize";

const sequelize = new Sequelize('employee', 'todolist_app', 'intern', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize
