import express from 'express'

const router = express.Router();

import tasks from './task.js'

router.use('/orm/lists', tasks);


export default router;