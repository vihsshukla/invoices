const express=require('express');
const executeQuery = require('../utils/dbConnection');

const router=express.Router();

router.use((req,res,next)=>{
  console.log(req.body);
  const {invoicenumber,customername,billingaddress,shippingaddress,gstin,totalamount}=req.body;
  executeQuery(`INSERT INTO dbo.invoiceheader
  (invoicenumber, customername, billingaddress, shippingaddress, gstin, totalamount)
  VALUES('${invoicenumber}','${customername}','${billingaddress}','${shippingaddress}','${gstin}',${totalamount}) returning id;`)
  .then((data)=>{
    req.body.invoiceid=data[0].id;
  })
  .catch((err)=>{
    console.error({err});
  });
  next();
})

router.post('/',(req,res)=>{
  console.log({invoiceid:req.body.invoiceid});
  let itemsQuery='';
  let billsundryQuery='';
  let {items,billsundry}=req.body;
  for(let i=0;i<items.length;i++){
    itemsQuery+=`INSERT INTO dbo.invoiceitems
    (itemname, quantity, price, amount, invoiceid)
    VALUES('${items[i].itemname}',${items[i].quantity},${items[i].price},${items[i].amount},'${req.body.invoiceid}');`
  }
  for(let i=0;i<billsundry.length;i++){
    billsundryQuery+=`INSERT INTO dbo.invoicebillsundry
    (billsundryname, amount, invoiceid)
    VALUES('${billsundry[i].billsundryname}',${billsundry[i].amount},'${req.body.invoiceid}');`
  }

  executeQuery(itemsQuery+billsundryQuery)
  .then((data)=>{
    res.status(200).json({"Success":true, "message":"Invoices created successfully."})
  })
})

module.exports=router;