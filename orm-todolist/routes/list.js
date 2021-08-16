
const Router = require('express');
const router = new Router();
const controller = require('../controllers/lists.controllers');

router.get('/', (req, res) => {
    controller.getLists(req, res);
})

router.post('/', (req, res) => {
    controller.createList(req, res);
});

router.patch('/:id', (req, res) => {
    controller.updateTask(req, res);
})

router.delete('/:id', (req, res) => {
    controller.deleteList(req, res);
})

router.post('/:listid/tasks', (res, req) => {
    controller.createTask(res, req);
})

router.get('/:listid/tasks', (res, req) => {
    controller.getTasks(res, req);
});


export default router;