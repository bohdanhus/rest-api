import express from 'express';
import TaskController from '../controllers/TasksController.js'

const router = express.Router({mergeParams: true});

let length = data.rows.length;

router.get('/', async (req, res) => {
    TaskController.getOpensTaskBylistId(req.params.listId, req.query.all)
        .then(data => {
            if (length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data.rows)
            }
        })
});
router.get('/:taskId', async (req, res) => {
    TaskController.findTaskById(req.params.listId, req.params.taskId)
        .then(data => {
            if (length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data.rows[0])
            }
        })
});
router.post('/', async (req, res) => {
    TaskController.createTask(req.query.listId, req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400))
});
router.patch('/:taskId', function (req, res) {
    TaskController.updateTaskById(req.params.listId, req.params.taskId, req.body)
        .then(data => {
            if (length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data.rows[0])
            }
        })
});
router.put('/:taskId', async (req, res) => {
    TaskController.rewriteTaskById(req.query.listId, req.body.id, req.body)
        .then(data => {
            if (length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data.rows[0])
            }
        })
});
router.delete('/:id', async (req, res) => {
    TaskController.deleteTaskById(req.query.listId, req.body.id)
        .then(data => {
        if (length === 0) {
            res.status(404).json('404 - Not found');
        } else {
            res.json(data.rows[0])
        }
    })
});

export default router;
