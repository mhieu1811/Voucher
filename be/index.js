var sql = require('mssql');
var dateFormat = require("dateformat");



var config = {
    server: 'oka2-hv.cwgk2dt0aiit.ap-southeast-1.rds.amazonaws.com',
    authentication: { type: 'default',options:{ userName: 'admin',password:'d18112000'}},
    database:"Test",
    options: { encrypt:false,"enableArithAbort": true, port: 1433 }
}

const date = Date.now();
let today= new Date(date);
var today_1 = dateFormat(today,"yyyy-mm-dd")


exports.handler =  (event) => {
    
    sql.connect(config,(err,result)=>{
        
        var ma
        var request=  new sql.Request();
        var loai="SELECT Dem=(Count(Ma)+1) From AAD"
        request.query(loai,function(err,database){ 
            ma = database.recordset[0].Dem
            console.log(database.recordset[0].Dem)
            var update ="INSERT INTO AAD (Ma) Values ('"+database.recordset[0].Dem+"')";
            request.query(update,function(err,database){ 
                console.log("A")
            })
        })
        
        
    })
}