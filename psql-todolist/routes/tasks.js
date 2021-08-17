import express from 'express';
import TaskController from '../controllers/TasksController.js'

const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
    TaskController.getOpensTaskListId(req.params.listId, req.query.all)                                       //
        .then(data => {
            if (data.rows.length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data.rows)
            }
        })
});
router.post('/', async (req, res) => {
    TaskController.createTask(req.params.listId, req.body)
        .then(data => res.json(data.rows))
        .catch(() => res.status(400))
});
router.get('/:taskId', async (req, res) => {
    TaskController.findTaskById(req.params.listId, req.params.taskId)
        .then(data => {
            if (data.rows.length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data.rows[0])
            }
        })
});
router.patch('/:taskId', async (req, res) => {
    TaskController.updateTaskById(req.params.listId, req.params.taskId, req.body)
        .then(data => {
            if (data.rows.length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data.rows[0])
            }
        })
});
router.put('/:taskId', async (req, res) => {
    TaskController.rewriteTaskById(req.params.listId, req.params.taskId, req.body)
        .then(data => {
            if (data.rows.length === 0) {
                res.status(404).json('404 - Not found');
            } else {
                res.json(data.rows[0])
            }
        })
});
router.delete('/:taskId', async (req, res) => {
    TaskController.deleteTaskById(req.params.listId, req.params.taskId)
        .then(data => {
            if (data.rows.length === 0) {
                res.json(data.rows[0])
            } else {
                res.status(404).json('404 - Not found');
            }
        })

});
// router.get('/', (req, res) => { getAllOpenTaskById перебивает запрос и отображает невыполненые задачи
//     TaskController.getTasks(req.params.listId)
//         .then(data => {
//             if (data.rows.length === 0) {
//                 res.status(404).json('404 - Not found');
//             } else {
//                 res.json(data.rows)
//             }
//         })
// })

export default router;
