import ListModel from '../models/ListsModel.js'


class ListController {
    findAllLists() {
        return ListModel.findAllLists()
    }
    createList(title) {
        return ListModel.createList(title);
    }
    removeListById(id) {
        return ListModel.removeListById(id);
    }
}

export default new ListController();