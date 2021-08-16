import Router from 'express'
import controller from '../controllers/todo.controller.js'

const router = new Router();


router.get('/:listId/tasks', function (req, res) {
    controller.getTasks(req.params.listId)
        .then(data => {
            res.send(data);
        });
});
router.get('/:listId/tasks/:id', function (req, res) {
    controller.getTask(req.params.listId, req.params.id)
        .then(data => {
            res.send(data);
        });
});

router.post('/:listId/tasks', function (req, res) {
    controller.createTask(req.params.listId, req.body)
        .then((data) => {
            res.send(data);
        });
});
router.patch('/:listId/tasks', function (req, res) {
    controller.updateTask(req.params.listId, req.body.id, req.body)
        .then(data => {
            res.send(data);
        });
});
router.put('/:listId/tasks', function (req, res) {
    controller.putTask(req.params.listId, req.body.id, req.body)
        .then(data => {
            res.send(data);
        });
});
router.delete('/:listId/tasks', function (req, res) {
    controller.deleteTask(req.params.listId, req.body.id)
        .then(data => {
            res.send(data);
        });
});


export default router;