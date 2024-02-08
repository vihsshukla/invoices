const express=require('express');

const router=express.Router();

router.post('/',(req,res)=>{
  res.send('update');
})

module.exports=router;