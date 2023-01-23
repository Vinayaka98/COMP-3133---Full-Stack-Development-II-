const fs = require('fs');
const csv = require('csv-parser')

//deleting the file
try{
    if(fs.existsSync('canada.txt')){
        fs.unlinkSync('canada.txt');
        console.log('Deleted Successfully')
    }
}
catch(err){
    console.log('Canada doesnt exist');
}
try{
    if(fs.existsSync('usa.txt')){
        fs.unlinkSync('usa.txt');
        console.log('Deleted Successfully')
    }
}
catch(err){
    console.log('USA doesnt exist');
}

//filtering data and writing to specified file

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data',(data) => {
        if(data.country== 'Canada'){
            fs.appendFileSync('canada.txt',`${data.country},${data.year},${data.population}\n`)
        }
        if(data.country== 'United States'){
            fs.appendFileSync('usa.txt',`${data.country},${data.year},${data.population}\n`)
        }
    })