const readQuery=`select json_build_object('invoiceid',i.id,
'invoicenumber',i.invoicenumber,
'customername',i.customername,
'billingaddress',i.billingaddress,
'shippingaddress',i.shippingaddress,
'totalamount',i.totalamount,
'items',json_agg(i2.*),
'billsundry',json_agg(i3.*))  from dbo.invoiceheader i 
join dbo.invoiceitems i2 on i.id=i2.invoiceid 
join dbo.invoicebillsundry i3 on i.id=i3.invoiceid 
group by i.id;`;

module.exports={
  readQuery
}