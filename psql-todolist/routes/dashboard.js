import express from 'express';
import TasksController from '../controllers/TasksController.js';

const router = express.Router();

router.get('/', async (req, res) => {
    TasksController.getTasksForToday()
        .then(data => {
            if (data.lenght === 0) {
                res.json('There are no assignments for today')
            } else {
                res.json(data);
            }
        })
});

export default router;