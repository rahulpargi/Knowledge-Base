const express=require('express');
const path=require('path');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/knowledgebase');
let db=mongoose.connection;

//checking connection
db.once('open',function(){
    console.log('Connected to mongoDB');
});
//Checking for db error
db.on('error',function(error){
    console.log(error);

});
//init app
const app=express();

//Fetching Models
const Article=require('./models/article');

//Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');


//Home Route
app.get('/',function(req,res){
    Article.find({},function(err,articles){
        if(err){
            console.log(err);
        }else{
            res.render('index',{
                title:'Articles',
                articles:articles
            });
        }   
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