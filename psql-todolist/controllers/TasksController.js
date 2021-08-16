import TaskModel from '../model/TasksModel'

class TodoController {

    getOpensTaskBylistId(listId, all) {
        return TaskModel.getOpensTaskBylistId(listId, all);
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

    getTasks(listId) {
        return TaskModel.getTasks(listId);
    }

    findTaskById(listId, taskId) {
        return TaskModel.getTaskById(listId, taskId);
    }

    deleteTaskById(listId, taskId) {
        return TaskModel.deleteTaskById(listId, taskId);
    }

    deleteAllTasks() {
        return TaskModel.deleteAllTasks()
    }
}

export default new TodoController();