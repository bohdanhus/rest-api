
class ListTodos {

    checkExistence(listId, id) {
        return tasks.findAll(
            {
                where: {
                    list_id: +listId,
                    id: +id
                }
            }).then(bool => {
            if (bool.length > 0) {
                return true;
            }
        });
    }

    displayAll(listId) {
        return tasks.findAll({ where: { list_id: +listId }, raw: true }, { attributes: ['id', 'name', 'done', 'due_date'] })
            .then(list => {
                return list;
            }).catch(err => console.log(err));
    }

    displaySingle(listId, id) {
        return this.checkExistence(listId, id).then(bool => {
            if (bool) {
                return tasks.findByPk(+id)
                    .then(res => {
                        return res;
                    }).catch(err => console.log(err));
            }
        });
    }

    createTask(listId, body) {
        return tasks.create({
            name: body.name,
            list_id: +listId,
            done: body.done,
            due_date: body.due_date
        }).then(res => {
            const task = { id: res.id, name: res.name, done: res.done, due_date: res.due_date };
            return task;
        }).catch(err => console.log(err));
    }

    updateTask(listId, id, body) {
        return this.checkExistence(listId, id).then(bool => {
            if (bool) {
                return tasks.update({ done: Boolean(body.done) }, {
                    where: { id: +id }
                }).then(() => {
                    return this.displaySingle(listId, id).then((res) => {
                        return res;
                    });
                });
            }
        });
    }

    rewriteTask(listId, id, body) {
        return this.checkExistence(listId, id).then(bool => {
            if (bool) {
                return tasks.update({ done: Boolean(body.done), name: body.name, due_date: body.due_date }, {
                    where: { id: +id }
                }).then(() => {
                    return this.displaySingle(listId, id).then((res) => {
                        return res;
                    });
                });
            }
        });
    }

    deleteTask(listId, id) {
        return this.checkExistence(listId, id).then(bool => {
            if (bool) {
                return tasks.destroy({
                    where: {
                        id: +id
                    }
                }).then(() => {
                    return this.displayAll(listId).then((res) => {
                        return res;
                    });
                });
            }
        });
    }

}

const List_orm = new ListTodos();

module.exports = List_orm;