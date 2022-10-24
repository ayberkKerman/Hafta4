const sql = require("mssql/msnodesqlv8")





const config = {
    server: 'DESKTOP-LH3BSQ8\\MSSQLSERVER02',
    database: 'haftaDort',
    port: 5000,
    driver: "msnodesqlv8",
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }   
};


class urlSaveTransactions {
    constructor() {}
    
    
    async getNewUrl(body){

        try {
            await sql.connect(config)
            const result = await sql.query`select * from tbl_Url where original_Url = ${body.originalUrl}`
            if(result.recordset[0]==undefined){

                const resultHasASameShortUrl = await sql.query`select * from tbl_Url where short_Url = ${body.urlId}`
                if(resultHasASameShortUrl.recordset[0]==undefined){
                    const shortUrl = `${body.urlId}`;
                    await sql.query`insert into dbo.tbl_Url (original_Url,short_Url) VALUES (${body.originalUrl}, ${shortUrl})`
                    return shortUrl;
                }else{
                    
                    return "errorUrl"
                }
               
            }
            else{
                const selectedUrlShort = result.recordset[0]["short_Url"]
                return selectedUrlShort;
            }
            
        } catch (err) {        
            console.log(err);
        }
        
    }
}
  
module.exports = urlSaveTransactions;