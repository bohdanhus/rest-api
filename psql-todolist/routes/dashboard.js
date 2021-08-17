import express from 'express';
import TasksController from '../controllers/TasksController.js';

const router = express.Router();

router.get('/', async (req, res) => {
    TasksController.getTasksForToday()
        .then(data => {
            console.log(data);
            if (data.length === 0) {
                res.json('There are no assignments for today')
            } else {
                res.json(data);
            }
        })
});

export default router;