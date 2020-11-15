// function call_api(value){
//     //enter api
//     console.log('enter api call!');
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function(){
//         if (this.readyState ==4 && this.status == 200){
//             var response_json = JSON.parse(this.responseText);
//             console.log (response_json);
//             // stuff to do with api
//         }
//     }
//     var url = "https://asos2.p.rapidapi.com/products/v3/detail?store=US&sizeSchema=US&lang=en-US&currency=USD&id=9851612" // url
//     request.open('GET', url, true);
//     request.send();

// }

function bind_api(){
    call_api();
    
}

function api_database(){
    var cookie_id = document.cookie;
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(this.readyState ==4 && this.status ==200){
            //request!
            //console.log(this.responseText);
            var response_json = JSON.parse(this.responseText);
            console.log(response_json); //response from database on item
            //occupied(response_json);
            var response = response_json;
            var current_orders = response.current_orders;
            var total_required = response.total_required;
            var expiry = response.expiry;
            var progress =  (current_orders / total_required)*100;
            console.log('in occupied for progress');
            var occupied = document.getElementById('occupied');
            var timer = document.getElementById('timer');
            var date = document.getElementById('date');
            date.innerHTML= expiry;
            console.log(occupied);
            occupied.innerHTML = `
            
            
            <div class="skill_percentage" style='margin-top:10px; margin-bottom:0px;'>
              
              <div class="skill_level" style="width: ${progress}%; "></div>
              
            </div>
            <p class="progress-label" > ${current_orders} / ${total_required} </p> 
        
            `;

            timer.innerHTML =`
            <div class="count-down-container" style='margin-bottom:10px;' >
        
            <div class="count-down-box">
            <div class="count-down">
                <h1 id="days_{i}">00</h1>
                <p>Days</p>
            </div>
            </div>
    
            <div class="count-down-box">
            <div class="count-down">
                <h1 id="hours_{i}">00</h1>
                <p>Hours</p>
            </div>
            </div>
    
            <div class="count-down-box">
            <div class="count-down">
                <h1 id="minutes_{i}">00</h1>
                <p>Minutes</p>
            </div>
            </div>
    
            <div class="count-down-box">
            <div class="count-down">
                <h1 id="seconds_{i}">00</h1>
                <p>Seconds</p>
            </div>
            </div>
    
    
      
            </div>
            `;





        }
    }
    var url =`../api/items/show_one.php?item_id=20622707`;
    request.open('GET', url,true);
    request.send();
}





function call_api(){
    //console.log(document.cookie);
    var cookie_id = document.cookie;
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            //console.log(this.responseText);
            var response_json = JSON.parse(this.responseText);
            createProduct(response_json);
            //console.log(response_json);
            //console.log(response_json.alternateNames[0].title);
        }
    });
    
    xhr.open("GET", `https://asos2.p.rapidapi.com/products/v3/detail?store=US&sizeSchema=US&lang=en-US&currency=USD&id=20622707`);
    xhr.setRequestHeader("x-rapidapi-host", "asos2.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "9fd2e4fe08mshaebad2c1add2ab1p1ae36djsnebc50a98407d");
    
    xhr.send(data);
}

function createProduct(response){
    //console.log('entering create prod!!'); // pass

    var images = response.media.images;
    // get sizes array
    var sizesAvail_arr = response.variants;
    //console.log(sizesAvail_arr);
    var sizesAvail =[]
    for (var i=0 ; i< sizesAvail_arr.length ; i++){
        //console.log(sizesAvail_arr[i].brandSize);
        sizesAvail.push(sizesAvail_arr[i].brandSize);
    }
    //console.log(sizesAvail);

    var price = response.price.current.text; //ASSUMPTION: price is in sgd //*do not delete*
    //console.log(price);
    //console.log(images);
    var btm_img = document.getElementById('bottom_img');
    var str = '';
    var btm_str = '';
    var innerCarousel = document.getElementById('innerCarousel');
    //console.log(innerCarousel);
    var active = 'active';
    //side images
    var side_images = document.getElementById('side_images');
    var side_text='';
    for (var i=0 ; i< images.length; i++){
        //side images
        side_text += `
            <li class="nav-item">
                <img src="http://${images[i].url}" class="d-block w-100 mb-2 " alt="..." >
            </li>
        `;

        // carousel image
        if (i != 0){
            active ='';
        }

        //btm image
        btm_str += `
        <img src="http://${images[i].url}"  >
        `;

        //console.log(i);
        //console.log(images[i].url); //images url
        //str += `<img src = 'http://${images[i].url}' > <br>`;
        str += `
        <div class="carousel-item ${active}">
            <div class ='container'></div>
            <img src="http://${images[i].url}" class="d-block w-100" id = ${images[i].url} alt="...">
            </div>
        </div>        
        
        `;

        btm_img.innerHTML+= `
        <img src ='http://${images[i].url}'>
        `;
    }

    //prodImgs.innerHTML = str;

    side_images.innerHTML = side_text;
    innerCarousel.innerHTML +=str ;
    btm_img.innerHTML = btm_str;
    
 
    var title = response.alternateNames[0].title; // title from response

    var name = document.getElementById('prodname');
    //console.log(name);
    var details = `
    <div id='timer'></div>

    <h3 class ='title'>${title}</h3> 
    <h5 id='price'><b> SGD ${price}</b></h5>
    
    
    
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-white wordspace ml-0" data-toggle="modal" data-target="#exampleModal">
    <small><u>Free delivery and returns (Ts&Cs Apply)</u></small>
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content modalcontent">
        <div class="modal-header " style="background-color: #FED143">
            <h5 class="modal-title " id="exampleModalLabel"><b>SHIPPING OPTIONS</b></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body" style="text-align:center; font-weight:10px;">
            <table class>
                <tr>
                    DELIVER TO <img src="../images/singapore.svg"> SINGAPORE
                </tr>
                <tr>
                    <th>TYPE</th>
                    <th>WHEN?</th>
                    <th>HOW MUCH?</th>
                </tr>

                <tr>
                    <td class ='description' >Standard delivery</td>
                    <td id ='date' style='font-size: 13px;'></td>
                    <td class='price'> $12.01 <br> FREE - spend over SGD$65.00</td>
                </tr>
            
            
            
            </table>
        </div>
        <div class="modal-footer">
        </div>

        </div>
    </div>
    </div>

    <div id='occupied' ></div>

   
    
    <p class ='wordspace' style='font-weight:700; font-size:14px; margin-top:30px; margin-bottom:0px;'>SIZE: </p>
    <select id='size_selected' class="form-control form-control-sm" style= 'height: 40px;'>
        <option>Please select</option>
    
    `;

    for (var size of sizesAvail){
        //console.log(size);
        details +=`
        <option>${size}</option>
        `;
    }
    //change hardcode here!! (p_id)
    details +=`
    </select>
    <br>
    <small class ='wordspace' style='font-weight:700; font-size:14px; margin-bottom:30px;'>QUANTITY: </small>
    <input min='0' type="number" id="quantity" class="form-control" aria-label="Quantity" aria-describedby="basic-addon3">
        <div class="container text-center white-text py-3">
        <button class="cartBtn mask rgba-black-strong d-flex align-items-center h-100 mt-3" onclick='redirect(20622707)'><span>Add to Cart</span></button>
        </div>


    
     `;

    name.innerHTML = details;


    p_sex = document.getElementById('p_sex');
    p_sex.innerHTML = response.gender;

    p_brand = document.getElementById('p_brand');
    p_brand.innerHTML = response.brand.name;

    p_aboutMe = document.getElementById('p_aboutMe');
    p_aboutMe.innerHTML = response.info.aboutMe;

    p_careinfo = document.getElementById('p_careinfo');
    p_careinfo.innerHTML = response.info.careInfo;

    p_id = document.getElementById('p_id');
    p_id.innerHTML = response.id;

    p_fit = document.getElementById('p_fit');
    p_fit.innerHTML = response.info.sizeAndFit;

  
    api_database();

}



// document.cookie= JSON.stringify (
//     {
//         'cart' : [
//             {
//                 'product_id' : p_id,
//                 'quantity' : ''
//             }
//         ]
//     }
// )
// console.log(document.cookie);



// //OBJECT COOKIE STORED FORMAT

// {
//     'cart' : [
//         {
//             'product_id' : '01351492',
//             'product_quantity' : '2'
//             'product_size' : 'XL'
//         }
//     ]
// }

//function (input p_id)
//declare false bool
//loop through each iteration
//check if cart.length =0
//if successful bool == same pid and same size == bool =true
//add size



function redirect(p_id){
    //add to cart
    console.log('entering redirect!');
    
    
    // //view user's cart
    // var cart = cookie.cart;
    // console.log(p_id);
    var qty = document.getElementById('quantity').value;
    var size = document.getElementById('size_selected').value;
    var p_id = p_id; //product id user was looking at
    // console.log(size); //WORKS! HALLELUJAH
    // console.log(qty); //WORKS! HALLELUJAH
    

    //validation for cart details
    var cookie = document.cookie;
    cookie = JSON.parse(cookie); //object cookie as json stores string
     
    //put into cookie
    var cart = cookie.cart; // cart object
    var check = false;
    if (cart.length != 0){ //if cart is not empty
        for (item in cart){
            var product_id = item.product_id;
            var product_quantity = item.product_quantity;
            var product_size = item.product_size;
            if (product_id == p_id && product_size == size){
                product_quantity+=1;
                check = true;
                break;
            }
        }
    }
    if (check ==false){
        cart.push({
            'product_id' : `${p_id}`,
            'product_quantity' : `${qty}`,
            'product_size' : `${p_id}`
        })
    }
   
}

