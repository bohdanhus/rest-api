import Router from 'express'
import controller  from '../controllers/todo.controller.js'

const router = new Router();


router.get('/', (req, res) => {
    controller.getTasks(req, res);
});

router.get('/:id', (req, res) => {
    controller.getTask(req, res);
});

router.post('/', (req, res) => {
    controller.createTask(req, res);
});

router.patch('/:id', (req, res) => {
    controller.updateTask(req, res);
});

router.put('/:id', (req, res) => {
    controller.putTask(req, res);
})

router.delete('/:id', (req, res) => {
    controller.deleteTask(req, res);
});



export default router;