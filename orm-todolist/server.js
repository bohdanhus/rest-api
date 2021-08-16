import app from './app.js'
import sequalize from './db.js'
async function start() {
    try {
        await sequalize.authenticate();
        await sequalize.sync();
        app.listen(3000);
    } catch (e) {
        console.log(e)
    }
}

start ()
