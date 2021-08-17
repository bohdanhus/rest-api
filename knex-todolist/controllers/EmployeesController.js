import {main} from '../models/EmployeesModel.js'
import kn from "../db.js";

class EmployeesController {
    async getEmployees(req, res) {
        const planning = req.params.planning;
        const employees = await kn.select().table('empl')
        res.end(main(employees, planning));
    }
}

export default new EmployeesController();

