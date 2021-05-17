const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017'
const databaseName = 'stocks'

let connectMongoClient = MongoClient.connect(dbUrl, { useUnifiedTopology: true })

let getDb = connectMongoClient.then((client) => {
    return client.db(databaseName)
})

function getCollection(name) {
    //console.log(getDb);
    return getDb.then((db) => { return db.collection(name)})
}

function close() {
    return connectMongoClient.then((client) => {
        return client.close()
    })
}

module.exports = {
    getDb,
    getCollection,
    close
}