import db from '../db.js';

class ListModel {

    findAllLists() {
        const result = db
            .query('SELECT * FROM lists')
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }

    createList(data) {
        return db.query('INSERT INTO lists (title) values($1) RETURNING *', [data]) // default
            .then(res => res.rows)
            .catch(err => err)
    }

    removeListById(id) {
        let listId = parseInt(id);
        let result = db
            .query('DELETE FROM lists where id=$1 RETURNING *', [listId])
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }
}

export default new ListModel();