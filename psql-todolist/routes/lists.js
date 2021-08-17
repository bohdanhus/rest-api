import express from 'express';
import ListController from '../controllers/ListsController.js';
import tasks from './tasks.js';

const router = express.Router()

router.get('/:listId?', (req, res) => {
    ListController.findAllLists()
        .then(data => {
            res.json(data)
        })
});

router.post('/:listId?', (req, res) => {
    ListController.createList(req.body.title)
        .then(data => {
            data.err = undefined;
            if (data.err === 'ERROR')
                res.status(404).json({error: 'Not found'})
            res.json(data)
        })
});

router.delete('/:listId?', (req, res) => {
    ListController.removeListById(req.params.listId)
        .then(data => {
            if (data.err === 'ERROR')
                res.status(404).json({error: 'Not found'})
            res.json(data)
        })
});

router.use('/:listId/tasks', tasks);

export default router;