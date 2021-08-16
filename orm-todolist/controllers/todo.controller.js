import taskModel from '../models/task.js'

class Tasks {
    async getTasks(listId) {
        return taskModel.getTasks(listId);
    }

    async getTask(listId, id) {
        return taskModel.getTask(listId, id);
    }

    async createTask(title, done, due_date, list_id) {
        return taskModel.createTask(title, done, due_date, list_id)
    }

    async updateTask(listId, id, done) {
        return taskModel.updateTask(id, options);
    }

    async deleteTask(listId, id) {
        return taskModel.deleteTask();
    }

    async putTask(listId, id, body) {
        return taskModel.putTask();
    }
}

export default new Tasks();