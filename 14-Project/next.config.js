const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

module.exports =(phase)=>{

    if (phase === PHASE_DEVELOPMENT_SERVER){
        return{
            env : {
                mongodb_username : "om_db_user" ,
                mongodb_password: "jTdLNu2G6jqyxsVN", 
                mongodb_clustername: "cluster0" ,
                mongodb_database: "my-site" ,
            }
        }
    }
    return {
        env: {
            mongodb_username: "om_db_user",
            mongodb_password: "jTdLNu2G6jqyxsVN",
            mongodb_clustername: "cluster0",
            mongodb_database: "my-site",
        }
    }

}