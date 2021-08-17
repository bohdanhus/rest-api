import models from "../DB/index.js";

class TaskModel {
    async createTask(body) {
        return await models.Todos.create({title.body, done.body, due_date.body, list_id.body});

    }

    async getTasks() {
        return await models.findAll()
    }

    async getTaskById(taskId) {
        return await models.findByPk(taskId)
    }

    async deleteTaskById(taskId) {
        return await models.destroy({where: {id: taskId}});
    }
    async updateTask(options, id) {
        const tasksField = ['task', 'done', 'due_date', 'todosListId'];
        let updatedField = {};

        tasksField.forEach(elem => {
            if (options[elem] !== undefined) {
                updatedField[elem] = options[elem];
            }
        })

        await models.Todos.update(
            updatedField,
            {
                where: {
                    id: id
                }
            }
        )
        return 200;
    }



    updateTask(listId, id, done) {
        return models.findAll(
            {
                where: {
                    list_id: listId,
                    id: id
                }
            }).then(bool => {
            if (bool > 0) {
                return models.update({done: Boolean(done.done)}, {
                    where: {id: id}
                }).then(() => {
                    return this.getTaskById(listId, id).then((res) => {
                        return res;
                    }).catch(err => console.log(err));
                });
            }
        });
    }


    rewriteTask() {
        return Promise.resolve(undefined);
    }
}


export default new TaskModel();
//https://www.bezkoder.com/node-express-sequelize-postgresql/#Configure_PostgreSQL_database_038_Sequelize