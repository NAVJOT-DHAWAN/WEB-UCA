var fetch = JSON.parse(localStorage.getItem('cart'));
var parentDiv = document.getElementById("listingCartItems");

console.log(fetch);

for(var i=0;i<fetch.length;i++)
{
	DOMforCartItems(fetch[i]);
}

function DOMforCartItems(item)
{

	console.log(item);
    var div = document.createElement("div");
    div.setAttribute("id",item.Id);

    var labelname = document.createElement("label");
    labelname.innerHTML = item.NAME;				
    labelname.setAttribute("class","cartName");
    div.appendChild(labelname);

    var labelquan = document.createElement("label");
    labelquan.innerHTML = item.QUAN;
    labelquan.setAttribute("class","cartQuan");
    div.appendChild(labelquan);
    
    parentDiv.appendChild(div);

    console.log(parentDiv);
}