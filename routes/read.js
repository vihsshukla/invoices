const express=require('express');
const executeQuery = require('../utils/dbConnection');
const { readQuery } = require('../utils/sql');

const router=express.Router();

router.get('/',(req,res)=>{
  executeQuery(readQuery)
  .then((data)=>{
    res.status(200).json({data});
  })
  .catch((err)=>{
    res.status(500).json({err});
  })
})

module.exports=router;