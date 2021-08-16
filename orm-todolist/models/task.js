import models from "../DB/index.js";

class TaskModel {
    getTasks(listId) {
        return models.Todo.findAll({
                where: {list_id: listId},
                raw: true
            },
            {attributes: ['id', 'name', 'done', 'due_date']})
            .then(list => {
                return list;
            }).catch(err => console.log(err));
    }

    getTask(listId, id) {
        return models.Todo.findAll({
            where: {id: id}
        })
            .then(task => {
                return task;
            }).catch(err => console.log(err))
    }

    createTask(listId, body) {
        return models.Todo.create({
            id: body.id, title: body.title, done: body.done, due_date: body.due_date, list_id: body.list_id
        })
            .then(r => {
                let task;
                task = {id: r.id, title: r.title, done: r.done, due_date: r.due_date, list_id: r.list_id};
                return task;
            }).catch(err => console.log(err))
    }

    updateTask(listId, id, done) {
        return models.Todo.findAll(
            {
                where: {
                    list_id: listId,
                    id: id
                }
            }).then(bool => {
            if (bool > 0) {
                return models.Todo.update({done: Boolean(done.done)}, {
                    where: {id: id}
                }).then(() => {
                    return this.getTask(listId, id).then((res) => {
                        return res;
                    }).catch(err => console.log(err));
                });
            }
        });
    }

    async deleteTask(id) {
            return models.Todo.destroy({
                where: {
                    id: id
                }
            }).catch((err) => console.log(err))
    }

    putTask() {
        return Promise.resolve(undefined);
    }
}


export default new TaskModel();
//https://www.bezkoder.com/node-express-sequelize-postgresql/#Configure_PostgreSQL_database_038_Sequelize