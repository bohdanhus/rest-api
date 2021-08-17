import express from 'express'

const router = express.Router();

import tasks from './task.js'

router.use('/tasks', tasks);


export default router;