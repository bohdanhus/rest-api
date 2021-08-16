import express from "express";
import employees from './employees.js'
import lists from './lists.js'
import collection from './collection.js'
import dashboard from './dashboard.js'

const router = express.Router()

router.use('/employees', employees)
router.use('/collection/', collection)
router.use('/dashboard', dashboard)
router.use('/lists', lists)

export default router