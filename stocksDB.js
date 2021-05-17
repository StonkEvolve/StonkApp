const { ObjectId } = require('mongodb');
const db = require("./db");

function getStocksCollection(){
    return db.getCollection("stocks");
}


async function deleteAllStocks(){
    let collection = await getStocksCollection();
    return collection.deleteMany({});
}


async function loadStock(stock){
    let collection = await getStocksCollection();
    await collection.insertOne(stock);
    return stock;
}

async function listScenes(){
    let collection = await getStoredGameCollection();
    let cursor =  collection.find({});
    //console.log('cursor:',cursor);
    let p =cursor.toArray(); 
    //console.log('p:',p);
    return p;
}


module.exports = {getStocksCollection,
    deleteAllStocks,
    loadStock
}