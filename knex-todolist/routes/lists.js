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
                if (data === false)
                    res.status(400).json({error: 'Bad request'})
                else {
                    res.json('You have created a new list')
                }
            });
    }
)
router.delete('/:listId?', (req, res) => {
    ListController.removeListById(req.params.listId)
        .then(data => {
            if (data === 0)
                res.status(404).json({error: 'Not found'})
            else {
                res.json('You have removed list. ')
            }
        })
});

router.use('/:listId/tasks', tasks);

export default router;