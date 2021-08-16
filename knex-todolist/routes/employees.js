import Router from 'express';
import EmployeeController from '../controllers/EmployeesController.js'

const router = new Router();

router.get('/:planning', (req, res) => {
    EmployeeController.getEmployees(req, res);
});

export default router;