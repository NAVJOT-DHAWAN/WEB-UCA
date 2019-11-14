var express = require("express");
const fs = require("fs");
var app = express();
var cors = require("cors");
var port = 5000;
var product = [];
var cart = [];


app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))

fs.readFile('file.txt',(err,data) =>{
	if(err)
	{   console.error(err);
	    return;
	}
	else
		console.log(data.toString());
        //product = JSON.parse(data);
	
})
/*app.get('/',function(req,res){
    res.sendFile(__dirname +'/Products.html');
})

app.get('/Styling.css',function(req,res){
    res.sendFile(__dirname +'/Styling.css');
})

app.get('/Products.js',function(req,res){
    res.sendFile(__dirname +'/Products.js');
})*/

app.get("/get",function(req,res) {
	var index = req.query.index
    for(var i=0;i<product.length;i++)
    {
    	if(i==index)
    	{
    		product.splice(index,1);
    		break;
    	}
    }
    console.log(index);
    console.log(product);
    res.send("true");
})

app.post("/post",function(req,res) {
	//arr = req.body
	fs.writeFile('file.txt',JSON.stringify(req.body),(err,data) =>{
		if(err)
			console.log(err);
		console.log("file has been saved")
	})
	console.log(product)
    res.send(req.body);
})

app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})