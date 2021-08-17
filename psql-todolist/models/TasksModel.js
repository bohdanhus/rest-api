import db from '../db.js';

class TaskModel {
    async getOpensTaskListId(listId, reqParameter) { //done
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
            return false;
        }

        let parameters = checkRequestParameters(reqParameter);
        if (parameters === true) {
            let result = await db.query('SELECT * FROM todo WHERE list_id=$1', [listId]);
            return result
        } else if (parameters === false) {
            let result = await db.query(`SELECT *
                                         FROM todo
                                         WHERE done = false
                                           AND list_id = $1`, [listId]);
            return result
        }
    }

    async getTasksForToday() {
        let result = Promise.all([
            db.query(`SELECT count(*) AS today_tasks
                      FROM todo
                      WHERE DATE(due_date) BETWEEN current_date AND current_date`)
                .then(data => data.rows[0]),  // .tasks
            db.query(`SELECT lists.title as list, count(*) AS unfilled_tasks_in_list
                      FROM lists
                               LEFT JOIN todo ON lists.id = todo.list_id
                      WHERE done = false
                      GROUP BY lists.id;`)
                .then(data => data.rows)
        ])
        return result
    }

    async getCollectionOfTasksForToday() {
        const result = await db.query(`SELECT todo.id     AS id,
                                              todo.title  AS taskname,
                                              lists.title as list
                                       FROM todo
                                                INNER JOIN lists ON todo.list_id = lists.id
                                       where todo.due_date = current_date`,)
            .then(data => data.rows)
        return result;
    }


    async createTask(listId, body) {
        let result = await db.query('INSERT INTO todo (title, done, due_date, list_id) values ( $1, $2, $3, $4) RETURNING *',
            [body.title, false, body.due_date, listId]);
        return result;
    }

    async deleteTaskById(listId, taskId) {
        let result = await db.query(`DELETE
                                     FROM todo
                                     where id = $1
                                       AND list_id = $2
                                     RETURNING *`, [taskId, listId]);
        return result;
    }


    async deleteAllTasks() {
        return db.query(`DELETE *
                         FROM todo `);
    }

    async findTaskById(listId, taskId) {
        return await db.query('SELECT * FROM todo WHERE id=$1 AND list_id=$2', [taskId, listId])
            .then(data =>
                data.rows
            )
    }


    async rewriteTaskById(listId, taskId, body) {
        return await this.findTaskById(listId, taskId).then(wantedTask => {
            if (wantedTask) {
                return db.query(`UPDATE todo
                                 SET title=$1,
                                     done=$2,
                                     due_date=$3
                                 where id = $5
                                   AND list_id = $4
                                 RETURNING *`,
                    [body.title, body.done, body.due_date, listId, taskId])

            } else {
                console.log('You cannot change a non-existent task')
            }
        })
    }

    async updateTaskById(listId, taskId, body) {
        return await this.findTaskById(listId, taskId).then(wantedTask => {
            if (wantedTask) {
                return db.query(`UPDATE todo
                                 SET done=$1,
                                     due_date=$2
                                 where id = $4
                                   AND list_id = $3
                                 RETURNING *`,
                    [body.done, body.due_date, listId, taskId])
            } else {
                console.log('You cannot change a non-existent task')
            }
        })
    }
}

//
// async getTasks(listId) {
//     return await db.query(`SELECT *
//                                FROM todo
//                                         INNER JOIN
//                                     lists ON todo.lists_id = lists.id
//                                where lists.id = $1`, [listId])
//         .then((result) => {
//             return result.tows
//         });
// }


export default new TaskModel()