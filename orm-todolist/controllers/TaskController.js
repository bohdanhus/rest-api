import Model from '../models/task.js'

class Tasks {
    async getTasks() {
        return Model.getTasks();
    }

    async getTaskById(taskId) {
        return Model.getTaskById(taskId);
    }

    async createTask(body) {
        return Model.createTask(body)
    }

    async updateTask(taskId, body) {
        return Model.updateTask(taskId, body);
    }

    async deleteTaskById(taskId) {
        return Model.deleteTaskById(taskId);
    }

    async rewriteTask(taskId, body) {
        return Model.rewriteTask(taskId, body);
    }
}

export default new Tasks();