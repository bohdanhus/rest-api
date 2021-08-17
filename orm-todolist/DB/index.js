import pkg from "sequelize";
const {DataTypes} = pkg;

import sequelize from "../db.js";

const models = sequelize.define('todo', {   // define используем для определени
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


export default models