import Router from 'express'
import controller from '../controllers/TaskController.js'

const router = new Router();


router.get('/', function (req, res) {
    controller.getTasks(req.params.listId)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
});
router.get('/:taskId', function (req, res) {
    controller.getTaskById(req.params.taskId)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        })
});

router.post('/', function (req, res) {
    controller.createTask(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        })
});
router.patch('/:taskId', function (req, res) {
    controller.updateTask(req.params.taskId, req.body).
    then((data) => {
        res.status(200).json({
            message: "Task updated successfully",
            gig: data
        })
    })
        .catch((error) => {
            console.log(error);
        });
});
router.put('/:taskId', function (req, res) {
    controller.rewriteTask(req.params.taskId, req.body).
    then((data) => {
        res.status(200).json({
            message: "Task rewrited successfully",
            gig: data
        })
    })
        .catch((error) => {
            console.log(error);
        });
});
router.delete('/:taskId', function (req, res) {
    controller.deleteTask(req.params.taskId)
    gigDao.deleteById(req.params.id).
    then((data) => {
        res.status(202).json({
            message: "Task deleted successfully",
            gig: data
        })
    })
        .catch((error) => {
            console.log(error);
        });
});


export default router;