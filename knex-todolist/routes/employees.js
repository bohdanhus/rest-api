import Router from 'express';
import EmployeesController from '../controllers/EmployeesController.js'

const router = new Router();

router.get('/:planning', (req, res) => {
    EmployeesController.getEmployees(req, res);
});

export default router;