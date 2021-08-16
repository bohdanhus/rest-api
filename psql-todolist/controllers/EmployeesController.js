import db from '../db.js';
import {main} from '../model/EmployeesModel.js'

class EmployeesController {
    async getEmployees(req, res) {
        const planning = req.params.planning;
        const employees = await db.query(`SELECT *
                                          FROM empl`);
        res.end(main(employees.rows, planning));
    }
}

export const employeeController = new EmployeesController();

