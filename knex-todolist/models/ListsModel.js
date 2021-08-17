import kn from '../db.js';

class ListModel {

    findAllLists() {
        const result = kn
            .select('*')
            .from('lists')
        return result;
    }

    async createList(title) {
        if (title === ""){
            return false
        }
        const result = await kn('lists')
            .insert({title})
        return result;
    }

    async removeListById(id) {
        const result = await kn('lists')
            .where('id', id)
            .delete()
        return result;
    }

}

export default new ListModel();