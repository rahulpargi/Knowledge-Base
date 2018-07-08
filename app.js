const express=require('express');
const path=require('path');
//init app
const app=express();

//Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Home Route
app.get('/',function(req,res){
    res.render('index',{
        title:'Articles'
    });
});

//Add Route
app.get('/articles/add',function(req,res){
    res.render('add_articles',{
        title:'Add Articles'
    });
});

app.listen(3000,function(){
    console.log("Server Started");
});