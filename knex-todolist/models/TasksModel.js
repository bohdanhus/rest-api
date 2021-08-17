import kn from '../db.js';

class TaskModel {
    async getOpensTaskListId(listId, reqParameter) {
        function checkRequestParameters(p) {
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

        let parameters = checkRequestParameters(reqParameter);
        if (parameters === true) {
            return kn
                .select('*')
                .from('todo')
                .where('list_id', listId);
        } else {
            return kn
                .select('*')
                .from('todo')
                .where('list_id', listId)
                .andWhere('done', false);
        }
    }

    async getTasksForToday() {
        let nowDay = new Date(2021, 7, 11);
        let endDay = new Date(2021, 7, 11, 23, 59, 59);
        return await Promise.all([
            kn('todo')
                .count('*', {as: 'today_tasks'})
                .whereBetween('due_date', [nowDay, endDay]),
            kn('lists')
                .column({'title': 'lists'})
                .select()
                .count('*', {as: 'unfilled_tasks_in_list'})
                .leftJoin('todo', 'lists.id', 'todo.list_id')
                .where('todo.done', false)
                .groupBy('lists.id')

        ]);
    }


    async getCollectionOfTasksForToday() {
        return kn('todo')
            .column({'id': 'todo.id'}, {'title': 'todo.title'}, {'list': 'list_id'})
            .innerJoin('lists', 'todo.list_id', 'lists.id')
            .where('todo.due_date', new Date());
    }


    async createTask(listId, body) {
        return kn('todo')
            .insert({
                title: body.title,
                done: false,
                due_date: body.due_date,
                list_id: listId
            });
    }

    async deleteTaskById(listId, taskId) {
        return kn('todo')
            .where({list_id: listId, id: taskId})
            .delete();
    }

    async findTaskById(listId, taskId) {
        return kn('todo')
            .select('*')
            .where({list_id: listId, id: taskId});
    }

    async rewriteTaskById(listId, taskId, body) {
        return await this.findTaskById(listId, taskId).then(wantedTask => {
            if (wantedTask) {
                console.log(wantedTask)
                let result = kn('todo')
                    .where({id: taskId, list_id: listId})
                    .update({
                        title: body.title,
                        done: body.done,
                        due_date: body.due_date
                    });
                return result;
            } else {
                console.log('You cannot change a non-existent task')
            }
        })
    }

    async updateTaskById(listId, taskId, body) {
        return await this.findTaskById(listId, taskId)
            .then(async wantedTask => {
                if (wantedTask) {
                    let result = kn('todo')
                        .where({id: taskId, list_id: listId})
                        .update({
                            done: body.done,
                            due_date: body.due_date
                        })
                    return result;
                } else {
                    console.log('You cannot change a non-existent task')
                }
            })
    }
}

export default new TaskModel()