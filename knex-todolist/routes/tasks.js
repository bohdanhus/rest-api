import express from 'express';
import TaskController from '../controllers/TasksController.js'

const router = express.Router({mergeParams: true});


router.get('/', async (req, res) => {
    TaskController.getOpensTaskListId(req.params.listId, req.query.all)
        .then(data => {
            if (data.length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data)
            }
        })
});
router.get('/:taskId', async (req, res) => {
    TaskController.findTaskById(req.params.listId, req.params.taskId)
        .then(data => {
            if (data.length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data)
            }
        })
});
router.post('/', async (req, res) => {
    TaskController.createTask(req.params.listId, req.body)
        .then(data => res.json(data.rows[0]))
        .catch(() => res.status(400))
});
router.patch('/:taskId', function (req, res) {
    TaskController.updateTaskById(req.params.listId, req.params.taskId, req.body)
        .then(data => {
            if (data.length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data)
            }
        })
});
router.put('/:taskId', async (req, res) => {
    TaskController.rewriteTaskById(req.params.listId, req.params.id, req.body)
        .then(data => {
            if (data.length !== 0) {
                res.json(data)
            } else {
                res.status(404).json('404 - Not found');
            }
        })
});
router.delete('/:taskId', async (req, res) => {
    TaskController.deleteTaskById(req.params.listId, req.params.taskId)
        .then(data => {
            if (data !== 0) {
                res.status(202).json(data)
            } else {
                res.status(404).json('404 - Not found');
            }
        })
});

export default router;
