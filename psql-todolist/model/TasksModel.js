import db from '../db.js';


class TaskModel {
    async getOpensTaskBylistId(listId, reqParameter) {
        if (this.checkRequestParameters(reqParameter) === 'boolean') {
            let result = await db.query('SELECT * FROM todo WHERE listId=$1', [listId]);
            return result
        } else {
            let result = await db.query(`SELECT *
                                       FROM todo
                                       WHERE done = false
                                         AND listId = $1`, [listId]);
            return result
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
        let result = {};
        result.overviewInformation = Promise.all([
            db.query(`SELECT count(*) AS tasks
                      FROM todo
                      WHERE DATE(due_date) BETWEEN current_date AND current_date`)
                .then(data => data.rows[0])    // .tasks
            db.query(`SELECT lists.title, count(*) AS tasks
                      FROM lists
                               LEFT JOIN todo ON lists.id = todo.list_id
                      GROUP BY lists.id;`)
                .then(data => data.rows)
        ]);
        return result;
    }

    async getCollectionOfTasksForToday() {
        const result = await db.query(`SELECT todo.id AS id,
                                                  todo.title  AS taskname,
                                                  lists_id    AS listId
                                           FROM todo
                                                   INNER JOIN lists ON todo.list_id = lists.id
                                           where todo.due_date = $1`, [new Date()]
        )
        return result;
    }


    async createTask(listId, body) {
        let result = await db.query('INSERT INTO todo (title, done, due_date, list_id) values ( $1, false, $2, $3) RETURNING *',
            [body.title, body.due_date, listId]);
        return result;
    }

    async deleteTaskById(taskId) {
        if (taskId) {
            return await db.query(`DELETE
                                       FROM todo
                                       where id = $1`, [taskId]);
        }
    }

    async deleteAllTasks() {
        return await db.query(`DELETE *
                                       FROM todo `);
    }

    async getTasks(listId) {
        return await db.query(`SELECT todo.id, title FROM todo INNER JOIN
         lists ON todo.lists_id=lists.id where lists.id=$1`, [listId]
            .then((result) => {
                return result.rows
            });
    }

    async getTaskById(listId, taskId) {
        return await db.query(`SELECT todo.id, title FROM todo INNER JOIN
         lists on todo.lists_id = lists.id where lists.id=$1 and todo.id=$2`, [listId, taskId]
            .then((result) => {
                return result.rows[0]
            });
    }

    async rewriteTaskById(listId, taskId, body) {
        return this.getTaskById(listId, taskId).then(wantedTask => {
            if (wantedTask) {
                return await db.query(`UPDATE todo SET  title=$1, done=$2 due_date=$3 where id=$5 AND list_id=$4 RETURNING *`,
                    [body.title, body.done, body.due_date, listId, taskId])

            } else {
                console.log('You cannot change a non-existent task')
            }
        })
    }

    async updateTask(listId, taskId, body) {
        return this.getTaskById(listId, taskId).then(wantedTask => {
            if (wantedTask) {
                return await db.query(`UPDATE todo SET  done=$1, due_date=$2 where id=$4 AND list_id=$3 RETURNING *`,
                    [body.done, body.due_date, listId, taskId])
            } else {
                console.log('You cannot change a non-existent task')
            }
        }
    }
}

export default new TaskModel()