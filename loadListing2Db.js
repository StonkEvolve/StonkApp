/*
Loads  data from ./listing_status.csv' file to DB.
'listing_status.csv' is taken from Listing & Delisting Status: 
https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=key
data will be loaded to stocks.stocks collection

*/
const fs        = require('fs')
const stocksDB  = require("./stocksDB") 

let fileName = 'listing_status.csv'
console.log("Reading file")
    
fs.readFile(fileName,'utf8', (err,data) => {
    if (err){
        console.error(`Error reading ${fileName} - ${err}`)
        return;
    }
    Save2DB(data).then(() => {console.log("Done !")});     
})


async function Save2DB(data){
    console.log("Deleting all!");
    let del = stocksDB.deleteAllStocks();

    console.log("Loading all!")
    let lines = data.split('\n')
    await del;
    for (let i = 1; i <= lines.length; i++){
        let line = lines[i-1];
        let words = line.split(',');
        
        if (words==''){
            continue
        }
        let stock   = words[3].trim();
        let status  = words[6].trim();
        if ( stock !='Stock' ||  status !='Active'){
            continue
        }
            
        let symbol  = words[0].trim();
        let name    = words[1].trim();
        let exchange= words[2].trim();

        await stocksDB.loadStock({symbol, name, exchange});
        //console.log(`${i}.   ${symbol}    ${name}  ${exchange}`)
    }
}