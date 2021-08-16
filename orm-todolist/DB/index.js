import pkg from "sequelize";
const {DataTypes} = pkg;

import sequelize from "../db.js";

const Todo = sequelize.define('todo', {   // define используем для определени
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false},
    title: {
        type: DataTypes.STRING
    },
    done: {
        type: DataTypes.BOOLEAN
    },
    due_date: {
        type: DataTypes.DATE}
},{
    underscored: true,
    tableName: 'todo',
    createdAt: false,
    updatedAt: false
})
const Lists = sequelize.define('lists', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true, autoIncrement:true,
        allowNull: false},
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    underscored: true,
    tableName: 'lists',
    createdAt: false,
    updatedAt: false
})


Todo.belongsTo(Lists);
Lists.hasMany(Todo);


const models = {
    Lists, Todo
}
export default models;