var express = require("express");
var app = express();
var cors = require("cors");
var port = 5000;
var arr = [];


app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
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
    for(var i=0;i<arr.length;i++)
    {
    	if(i==index)
    	{
    		arr.splice(index,1);
    		break;
    	}
    }
    console.log(index);
    console.log(arr);
    res.send("true");
})

app.post("/post",function(req,res) {
	arr = req.body
	console.log(arr)
    res.send(req.body);
})

app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})