const express=require('express');
const path=require('path');
//init app
const app=express();

//Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Home Route
app.get('/',function(req,res){
    let articles=[
        {
            id:1,
            title:'Article One',
            body:'This is article one'
        },
        {
            id:2,
            title:'Article Two',
            body:'This is article Two'
        },
        {
            id:3,
            title:'Article Three',
            body:'This is article Three'
        },
    ];
    res.render('index',{
        title:'Articles',
        articles:articles
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