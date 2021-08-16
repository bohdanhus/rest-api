class TaskModel {
    async getOpensTaskBylistId(listId, reqParameter) {
        if (this.checkRequestParameters(reqParameter)) {
            let result = await kn
                .select('*')
                .from('todo')
                .where('list_id', listId);
            return result;
        } else {
            let result = await kn
                .select('*')
                .from('todo')
                .where('list_id', listId)
                .andWhere('done', false);
            return result;
        }
    }

    async checkRequestParameters(p) {
        if (typeof (p) === 'boolean') {
            return p
        } else if (typeof (p) === 'string') {
            if (p.toLowerCase() === 'true') {
                return true
            } else if (p.toLowerCase() === 'false') {
                return false
            }
        }
        return false
    }

    async getTasksForToday() {
        let nowDay = new Date(2021, 7, 11);
        let endDay = new Date(2021, 7, 11, 23, 59, 59);
        const result = {};
        result.overviewInformation = Promise.all([
            kn('todo')
                .count('*', 'tasks')
                .whereBetween('due_date', nowDay, endDay)
            kn('lists')
                .column({'lists.title': 'tasks'})
                .select()
                .count('*')
                .leftJoin('todo', 'lists.id', todo.list_id)
                .groupBy('lists.id')
        ]);
        return result;
    }


    async getCollectionOfTasksForToday() {
        let result = await kn('todo')
            .column([{'todo.id': 'id'},
                {'todo.title': 'taskname'},
                {'lists_id': 'listId'}])
            .innerJoin('lists', 'todo.list_id', 'lists.id')
            .where('todo.due_date', new Date());
        return result;
    }


    async createTask(listId, body) {
        let result = await kn('todo')
            .insert({
                title: body.title,
                due_date: body.due_date,
                list_id: listId
            });
        return result;
    }

    async deleteTaskById(taskId) {
        let result = await kn('todo')
            .where({id: taskId})
            .delete();
        return result;
    }

    async getTaskById(listId, taskId) {
        let result = await kn('todo')
            .select('id', 'title')
            .innerJoin('lists', 'todo.list_id', 'lists.id')
            .where({list_id: listId, id: taskId});
        return result;
    }

    async updateTask(listId, taskId, body) {
        return this.getTaskById(listId, taskId)
            .then(wantedTask => {
                if (wantedTask) {
                    return await kn('todo')
                        .where('todo.id = taskId', 'list_id = listId')
                        .update({
                            title: body.title,
                            done: body.done,
                            due_date: body.due_date
                        })
                } else {
                    console.log('You cannot change a non-existent task')
                }
            })
    }

    async updateTask(listId, taskId, body) {
        return this.getTaskById(listId, taskId)
            .then(wantedTask => {
                if (wantedTask) {
                    return await kn('todo')
                        .where('todo.id = taskId', 'list_id = listId')
                        .update({
                            done: body.done,
                            due_date: body.due_date
                        })
                } else {
                    console.log('You cannot change a non-existent task')
                }
            })
    }
}

export default new TaskModel()