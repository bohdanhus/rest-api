import TaskModel from '../models/TasksModel.js'

class TodoController {

    getOpensTaskListId(listId, all) {
        return TaskModel.getOpensTaskListId(listId, all);
    }

    getTasksForToday() {
        return TaskModel.getTasksForToday();
    }

    getCollectionOfTasksForToday() {
        return TaskModel.getCollectionOfTasksForToday();
    }

    createTask(listId, title) {
        return TaskModel.createTask(listId, title);
    }

    updateTaskById(listId, taskId, body) {
        return TaskModel.updateTaskById(listId, taskId, body);
    }

    rewriteTaskById(listId, taskId, body) {
        return TaskModel.rewriteTaskById(listId, taskId, body);
    }

    findTaskById(listId, taskId) {
        return TaskModel.findTaskById(listId, taskId);
    }

    deleteTaskById(listId, taskId) {
        return TaskModel.deleteTaskById(listId, taskId);
    }

    deleteAllTasks() {
        return TaskModel.deleteAllTasks()
    }

    getTasks(listId) {
        return TaskModel.getTasks(listId);
    }
}

export default new TodoController();