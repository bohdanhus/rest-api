import express from 'express';
import ListController from '../controllers/ListController.js';
import tasks from './tasks.js';

const router = express.Router()

router.get('/:listId?', (req, res) => {
    ListController.findAllLists()
        .then(data => {
            if (data.severity === 'ERROR') res.status(404).json({error: 'Sorry, but lists was not found'})
            res.json(data)
        })
});

router.post('/:listId?', (req, res) => {
    ListController.createList(req.body.title)
        .then(data => {
            if (data.severity === 'ERROR') res.status(404).json({error: 'Sorry, but something oops'})
            res.json(data)
        })
});

router.delete('/:listId?', (req, res) => {
    ListController.removeListById(req.params.listId)
        .then(data => {
            if (data.severity === 'ERROR') res.status(404).json({error: 'Sorry, but requested list was not found'})
            res.json(data)
        })
});

router.use('/:listId/tasks', tasks);

export default router;