const express=require('express');
const path=require('path');

const app=express();

const PORT=3000;

app.use(express.json());


app.use('/create',require((path.join(__dirname),'./routes/create.js')));
app.use('/update',require((path.join(__dirname),'./routes/update.js')));
app.use('/delete',require((path.join(__dirname),'./routes/delete.js')));
app.use('/read',require((path.join(__dirname),'./routes/read.js')));

app.listen(PORT,()=>{
  console.log(`Server Listening on port ${PORT}`)
})