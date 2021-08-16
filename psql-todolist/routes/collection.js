import express from 'express';
import TasksController from '../controllers/TasksController.js';

const router = express.Router();

router.get('/today', async (req, res) => {
    TasksController.getCollectionOfTasksForToday()
        .then(data => {
            if (data.rows.lenght === 0) {
                res.json('There are no assignments for today')
            } else {
                res.json(data.rows);
            }
        })
})

export default router;
