const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

//Setting Public Folder
app.use(express.static(path.join(__dirname,'public')));

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

//Getting single Article
app.get('/article/:id',function(req,res){
    Article.findById(req.params.id,function(err,article){
        res.render('article',{
            article:article
        });
    });
});

//Add Route
app.get('/articles/add',function(req,res){
    res.render('add_articles',{
        title:'Add Articles'
    });
});
app.post('/articles/add',function(req,res){
    let article=new Article();
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    article.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/');
        }
    });
    

});

app.listen(3000,function(){
    console.log("Server Started");
});