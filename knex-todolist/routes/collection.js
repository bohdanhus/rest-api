import express from 'express';
import TasksController from '../controllers/TasksController.js';

const router = express.Router();

router.get('/today', async (req, res) => {
    TasksController.getCollectionOfTasksForToday()
        .then(data => {
            console.log(data)
            res.json(data);
        })
})

export default router;
