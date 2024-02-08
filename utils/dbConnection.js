const {Client} = require('pg');

const executeQuery=async(query)=>{
  const client=new Client({connectionString:"postgres://postgres:Passw0rd%23@database-1.cnbuzoinfyln.us-east-1.rds.amazonaws.com/postgres"});
  try{
    await client.connect();
    let res=await client.query(query);
    return res.rows;
  }catch(err){
    console.error("Error while executing query: ",err.message);
  }finally{
    await client.end();
  }
}

module.exports=executeQuery;