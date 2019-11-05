var productsArray = [];
var cartArray = [];
var cartProductId = 1;
var productId = 1;
var addProduct = document.getElementById("addProduct");
var AddingProduct = document.getElementById("AddingProduct");
var ListingProducts = document.getElementById("ListingProducts");
var cartDisplayButton = document.getElementById("cartDisplayButton");
var listingCartItems = document.getElementById("listingCartItems");

addProduct.addEventListener("click",function(event)
	                                { 
	                                	productsPanel();

	                                });

/*cartDisplayButton.addEventListener("click",function(event)
                                    {
                                    	AddtoStorage();
                                    });*/


    var retrievedProductData = JSON.parse(localStorage.getItem('products'));
	//console.log(retrievedProductData);
    
    if(retrievedProductData != null)
	{
	  for(var i=0;i<retrievedProductData.length;i++)
	  {
		var Productobject = new Object();
        Productobject.Id = retrievedProductData[i].Id;
        Productobject.NAME = retrievedProductData[i].NAME;
        Productobject.DESC = retrievedProductData[i].DESC;
        Productobject.PRICE = retrievedProductData[i].PRICE;
        Productobject.QUAN = retrievedProductData[i].QUAN;
        console.log(productId);
        productsArray.push(Productobject);
        addProducttoModel(Productobject);
        productId = retrievedProductData[i].Id;
	  }
	  productId++;
	}

    var retrievedCartData = JSON.parse(localStorage.getItem('cart'));
    console.log(retrievedCartData);
    
    if(retrievedCartData != null)
    for(var i=0;i<retrievedCartData.length;i++)
	{
		var Cartobject = new Object();
        Cartobject.Id = retrievedCartData[i].Id;
        Cartobject.NAME = retrievedCartData[i].NAME;
        Cartobject.DESC = retrievedCartData[i].DESC;
        Cartobject.PRICE = retrievedCartData[i].PRICE;
        Cartobject.QUAN = retrievedCartData[i].QUAN;
        
        cartArray.push(Cartobject);
        //addProducttoModel(Cartobject);
        //cartProductId++;
	}
	


function addProductToArray()
{
    var Productobject = new Object();
    Productobject.Id = productId;
    Productobject.NAME = document.getElementById("productname").value;
    Productobject.DESC = document.getElementById("productdesc").value;
    Productobject.PRICE = document.getElementById("productPrice").value;
    Productobject.QUAN = document.getElementById("productQuantity").value;

    productsArray.push(Productobject);
    localStorage.setItem('products',JSON.stringify(productsArray));
    addProducttoModel(Productobject);
    removeNewPanel();
    productId++;
}

function addProducttoModel(Object)
{
	var divProduct = document.createElement("div");
	divProduct.setAttribute("id",Object.Id);

	var pName = document.createElement("a");
	pName.setAttribute("href","#");
	//pName.setAttribute("class","pname");
	pName.innerHTML = Object.NAME;
	divProduct.appendChild(pName);
    insertBreakLine(divProduct); 

    var labelname = document.createElement("label");
    labelname.innerHTML = Object.DESC;
    //labelname.setAttribute("class","pDesc");
    divProduct.appendChild(labelname);
    insertBreakLine(divProduct);

    var edit = document.createElement("button");
    edit.innerHTML = "Edit";
    //edit.setAttribute("class","pEdit");
    divProduct.appendChild(edit);
    insertBreakLine(divProduct);

    var deleteProd = document.createElement("button");
	deleteProd.innerHTML = "Delete";
	//deleteProd.setAttribute("class","pDel");
	divProduct.appendChild(deleteProd);
    insertBreakLine(divProduct); 
 
    var cart = document.createElement("button");
	cart.innerHTML = "Add to Cart";
	cart.setAttribute("class","cartButton");
	divProduct.appendChild(cart);
    insertBreakLine(divProduct); 
    

    deleteProd.addEventListener("click",function(event)
    	                                { 
    	                                	var targetP = event.target.parentNode;
    	                                	var selectedIndex = getProductIndex(parseInt(targetP.id));
    	                                	removeFromproductsArray(selectedIndex);
    	                                	removeFromLocalStorage(selectedIndex);
    	                                	targetP.parentNode.removeChild(targetP);
                                            console.log(selectedIndex);
    	                                });

    pName.addEventListener("click",function(event)
    	                           { 
                                        // var target = event.target.parentNode;
    	                                 var selectedIndex = getProductIndex(parseInt(event.target.parentNode.id));
    	                                 //console.log(x);
    	                                 ProductDetails(selectedIndex);
    	                           });

    edit.addEventListener("click",function(event)
                                   {
                                        var edit_Target = event.target.parentNode;
                                        var indexOfItem = getProductIndex(parseInt(edit_Target.id));
                                        console.log(indexOfItem);  
                                        EditInPoductsPanel(indexOfItem);

                                   });

    cart.addEventListener("click",function(event)
    	                           {
    	                           	    
                                        var selectedId = parseInt(event.target.parentNode.id);
                                        addToCartArray(selectedId);
                                        
                                        //console.log(selectedIndex);
    	                           });

    ListingProducts.appendChild(divProduct);
    //insertBreakLine(divProduct);
    insertBreakLine(divProduct);

    unhidingAddingProductsLink();
}


function itemQuant(idOfItem)
{
   for(var i=0;i<productsArray.length;i++)
   {
   	 if(idOfItem == productsArray[i].Id)
   	 {
   	 	productsArray[i].QUAN--;
   	 	break;
   	 }
   }

   localStorage.setItem('products',JSON.stringify(productsArray));
}

function addToCartArray(t)
{
	var i=0;
	for(i=0;i<productsArray.length;i++)
	{
		if(productsArray[i].Id==t){
			break;
		}
	}
	
    var s=new Object();
	s.Id=productsArray[i].Id;
	s.NAME=productsArray[i].NAME;
	s.DESC=productsArray[i].DESC;
	s.PRICE=productsArray[i].PRICE;
	s.QUAN=1;
	var l=productsArray[i].QUAN;
	if(l==0)
	{
		alert("ITEM IS OUT OF STOCK");
		return;
	}
	//alert(cart.length);
	for(var u=0;u<cartArray.length;u++)
	{
		if(cartArray[u].Id==t)
		{
			cartArray[u].QUAN=cartArray[u].QUAN+1;
            localStorage.setItem("cart",JSON.stringify(cartArray));
			itemQuant(t);
			return;
		}
	}
	cartArray.push(s);
    localStorage.setItem("cart",JSON.stringify(cartArray));
	alert(s.NAME+" added to cart");
	itemQuant(t);
}

function removeFromLocalStorage(selectedIndex)
{
	var del = JSON.parse(localStorage.getItem('products'));
	del.splice(selectedIndex,1);
	localStorage.setItem('products',JSON.stringify(del));
	console.log(del);
}

function removeNewPanel()
{
    var childs = AddingProduct.childNodes;
    var i=0;
    while(childs.length>0)
    	AddingProduct.removeChild(childs[i]);
    //console.log(childs);
}

function getProductIndex(id)
{
	for(var i=0;i<productsArray.length;i++)
	{
		if(productsArray[i].Id == id)
		{
			return i;
		}
	}
}

function ProductDetails(selectedProductIndex)
{
	alert( "Name : " + productsArray[selectedProductIndex].NAME + "  Desc : " + productsArray[selectedProductIndex].DESC + 
               "   Price : " + productsArray[selectedProductIndex].PRICE + "  Quantity : " + productsArray[selectedProductIndex].QUAN);	
               //console.log(selectedProductIndex);
}

function removeFromproductsArray(selectedIndex)
{
	productsArray.splice(selectedIndex,1);
	console.log(productsArray);
}

function hideAddingProductsLink()
{
	addProduct.setAttribute("style","visibility:hidden");
}

function unhidingAddingProductsLink()
{
	addProduct.setAttribute("style","visibility:visible");
}

function insertBreakLine(divAddProduct)
{
	var br = document.createElement("br");
	divAddProduct.appendChild(br);
}

function validate()
{
	var name_Val = document.getElementById("productname").value;
	var desc_Val = document.getElementById("productdesc").value;
	var price_Val = document.getElementById("productPrice").value;
	var quan_Val = document.getElementById("productQuantity").value;
	if(name_Val == "")
	{
		window.alert("Please Enter Product Name");
		//name_Val.focus();
		return false;
	}	
    
    if(desc_Val == "")
    {
    	window.alert("Please Enter Product Description");
		//desc_Val.focus();
		return false;
    }

    if(desc_Val.length >= 20)
    {
    	window.alert("Product Description cannot be much more");
		//desc_Val.focus();
		return false;
    }

    if(price_Val == "")
    {
    	window.alert("Please Enter Product Price");
		//desc_Val.focus();
		return false;
    }

    if(quan_Val == "")
    {
    	window.alert("Please Enter Product Quantity");
		//desc_Val.focus();
		return false;
    }

    if(quan_Val > 10)
    {
    	window.alert("Quantity cannot be more than 10Kg");
		//desc_Val.focus();
		return false;
    }

    return true;
}
function productsPanel()
{
	hideAddingProductsLink();

    var addProductHeading = document.createElement("label");
    addProductHeading.innerHTML = "Enter Product Details";
    addProductHeading.setAttribute("id","enterDetails");
    AddingProduct.appendChild(addProductHeading);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var productName = document.createElement("input");
    productName.setAttribute("type","text");
    productName.setAttribute("id","productname");
    productName.setAttribute("placeholder","Enter the Product Name");
    productName.setAttribute("style","width:250px");
    AddingProduct.appendChild(productName);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var productDesc = document.createElement("textarea");
    productDesc.setAttribute("type","text");
    productDesc.setAttribute("id","productdesc");
    productDesc.setAttribute("placeholder","Enter the Product Description");
    productDesc.setAttribute("style","width:250px ; height:50px");
    AddingProduct.appendChild(productDesc);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var price = document.createElement("input");
    price.setAttribute("type","text");
    price.setAttribute("id","productPrice");
    price.setAttribute("placeholder","Enter the Product Price");
    price.setAttribute("style","width:250px");
    AddingProduct.appendChild(price);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var quantity = document.createElement("input");
    quantity.setAttribute("type","text");
    quantity.setAttribute("id","productQuantity");
    quantity.setAttribute("placeholder","Enter the Product Quantity");
    quantity.setAttribute("style","width:250px");
    AddingProduct.appendChild(quantity);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var btn = document.createElement("button");
    btn.setAttribute("id","button");
    btn.innerHTML="Click to Add Product";
    AddingProduct.appendChild(btn);


    btn.addEventListener("click",function(event)
                                 {
                                 	  var x = validate();
                                 	  if(x == true)
                                      addProductToArray();
                                 });
}

function EditInPoductsPanel(index)
{
	hideAddingProductsLink();

    var addProductHeading = document.createElement("label");
    addProductHeading.innerHTML = "Edit the Contents";
    addProductHeading.setAttribute("id","editDetails");
    AddingProduct.appendChild(addProductHeading);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var editProdName = document.createElement("input");
    editProdName.setAttribute("type","text");
    editProdName.setAttribute("id","productname");
    //productName.setAttribute("placeholder","Enter the Product Name");
    editProdName.value = productsArray[index].NAME;
    editProdName.setAttribute("style","width:250px");
    AddingProduct.appendChild(editProdName);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var editProdDesc = document.createElement("textarea");
    editProdDesc.setAttribute("type","text");
    editProdDesc.setAttribute("id","productdesc");
    //productDesc.setAttribute("placeholder","Enter the Product Description");
    editProdDesc.value = productsArray[index].DESC;
    editProdDesc.setAttribute("style","width:250px ; height:50px");
    AddingProduct.appendChild(editProdDesc);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var editPrice = document.createElement("input");
    editPrice.setAttribute("type","text");
    editPrice.setAttribute("id","productPrice");
    //editPrice.setAttribute("placeholder","Enter the Product Price");
    editPrice.value = productsArray[index].PRICE;
    editPrice.setAttribute("style","width:250px");
    AddingProduct.appendChild(editPrice);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var editQuantity = document.createElement("input");
    editQuantity.setAttribute("type","text");
    editQuantity.setAttribute("id","productQuantity");
    //editQuantity.setAttribute("placeholder","Enter the Product Quantity");
    editQuantity.value = productsArray[index].QUAN;
    editQuantity.setAttribute("style","width:250px");
    AddingProduct.appendChild(editQuantity);

    insertBreakLine(AddingProduct);
    insertBreakLine(AddingProduct);

    var btn = document.createElement("button");
    btn.setAttribute("id","button");
    btn.innerHTML="Click to Make Changes";
    AddingProduct.appendChild(btn);

    btn.addEventListener("click",function(event)
                                {
                                    editContentInArray(index);  
                                });
}

function editContentInArray(index)
{
   productsArray[index].NAME = document.getElementById("productname").value;
   productsArray[index].DESC = document.getElementById("productdesc").value;
   productsArray[index].PRICE = document.getElementById("productPrice").value;
   productsArray[index].QUAN = document.getElementById("productQuantity").value;

   removeNewPanel();
   unhidingAddingProductsLink();
   console.log(productsArray[index]["Id"]);
   localStorage.setItem('products',JSON.stringify(productsArray));
   editDOMContent(productsArray[index].Id,index);
   
}

function editDOMContent(idOfContent,indexOfContent)
{
   var i=0;
   console.log(document.getElementById(idOfContent).childNodes);
   document.getElementById(idOfContent).childNodes[0].innerHTML = productsArray[indexOfContent].NAME;
   document.getElementById(idOfContent).childNodes[2].innerHTML = productsArray[indexOfContent].DESC;
   //console.log(x +" " +y);
}

/*function AddtoStorage()
{
   
   listingCartItems.setAttribute("style","color:red");
   
}*/