import models from "../modelsDB/models";

class TaskModel {

    async createTask (task, done, due_date, todosListId) {
        return await models.Todo.create({task, done, due_date, todosListId});
    }

    async getTask (id) {
        const task = await models.Todo.findAll({
            where: { id: id }
        });
        return task;
    }

    async getTasks () {
        const tasks = await models.Todo.findAll();
        return tasks;
    }

    async updateTask(options, id) {
        const tasksField = ['task', 'done', 'due_date', 'todosListId'];
        let updatedField = {};

        tasksField.forEach(elem => {
            if (options[elem] !== undefined) {
                updatedField[elem] = options[elem];
            }
        })

        await models.Todo.update(
            updatedField,
            {
                where: {
                    id: id
                }
            }
        )
        return 200;
    }

    async deleteTask(id) {
        await models.Todo.destroy({
            where: {
                id: id
            }
        })
    }

}


export default new TaskModel();