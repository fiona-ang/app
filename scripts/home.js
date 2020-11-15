var item_details
fetch('api/items/all.php')
.then(response => response.json())
.then(json => item_details = json)
.catch(function(item_status){
  console.log("Error detected")
})

// console.log(item_details);
const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
        var response_json = JSON.parse(this.responseText);
        var all_products = response_json.products;

        display(all_products);
  }
});

xhr.open("GET", "https://asos2.p.rapidapi.com/products/v2/list?country=US&currency=USD&sort=freshness&lang=en-US&sizeSchema=US&offset=0&categoryId=4209&limit=48&store=US");
xhr.setRequestHeader("x-rapidapi-host", "asos2.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "438acc3e60msh4ab92755245ec91p11a85fjsnd44149a8b159");

xhr.send(data);

//function for creating coookie!
function push(p_id){
  //console.log('entering function push');
  document.cookie = p_id;
  //console.log(document.cookie);
  window.location.href ='listing_page.html';
}

// function sickbtn(){
//   <a href="#aboutus-section"></a>
// }


function display(all_products){
  var trending_listings = document.getElementById("trending_cards");
  

  for(i=0; i < 4; i++){
    var item_id = all_products[i].id;
    
    // console.log(item_details);

    if(item_details.length !== 0 && item_id in item_details){
      var progress =  (item_details[item_id]['current_orders'] / item_details[item_id]['total_required'])*100;
      var current_orders = item_details[item_id]['current_orders'];
      var total_required = item_details[item_id]['total_required'];

    }
    else{
      var progress = 0
      var current_orders = 0
      var total_required = 10
    }

    
      counter += 1
      trending_listings.innerHTML += `
          <div class="col-sm-12 col-md-6 col-lg-3">
              <div class="card mx-auto" onclick="push(${all_products[i].id})" style="width: 18rem; height: 30rem; margin-top: 18px;">
                  <img src='http://${all_products[i].imageUrl}' class="card-img-top" alt="...">
                  
                  <div class="item-time">

                    <div class="count-down-container">

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="days_${i}">00</h1>
                          <p>Days</p>
                        </div>
                      </div>

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="hours_${i}">00</h1>
                          <p>Hours</p>
                        </div>
                      </div>

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="minutes_${i}">00</h1>
                          <p>Minutes</p>
                        </div>
                      </div>

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="seconds_${i}">00</h1>
                          <p>Seconds</p>
                        </div>
                      </div>


                      
                    </div>

                  </div>


                  <div class="card-body">
                      <h6 class="card-title">${all_products[i].name}</h6> 
                                               
                  </div>

                  
                    <div class="skillbar">
                      
                      <div class="skill_percentage">
                        
                        <div class="skill_level" style="width: ${progress}%"></div>
                        
                      </div>
                      <p class="progress-label"> ${current_orders} / ${total_required} Orders </p> 
                    </div>
                    
                  
                    
              </div>
          </div>
      
      `;
    }


// --------------------------------------------------------------------------------------------------//
var recommended_listings = document.getElementById("recommended_cards");
var counter = 0
for(i=4; i < 12; i++){
    var item_id = all_products[i].id;
    console.log(item_details);
    if(item_details.length !== 0 && item_id in item_details){
      var progress =  (item_details[item_id]['current_orders'] / item_details[item_id]['total_required'])*100
      var current_orders = item_details[item_id]['current_orders'];
      var total_required = item_details[item_id]['total_required'];
    }
    else{
      var progress = 0
      var current_orders = 0
      var total_required = 10
    }
    
    if(i != 11){
    recommended_listings.innerHTML += `
    
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card mx-auto" style="width: 18rem; height: 30rem; margin-top: 20px;">
                <img src='http://${all_products[i].imageUrl}' class="card-img-top" alt="...">
                
                <div class="item-time">

                    <div class="count-down-container">

                    <div class="count-down-box">
                        <div class="count-down">
                        <h1 id="days_${i}">00</h1>
                        <p>Days</p>
                        </div>
                    </div>

                    <div class="count-down-box">
                        <div class="count-down">
                        <h1 id="hours_${i}">00</h1>
                        <p>Hours</p>
                        </div>
                    </div>

                    <div class="count-down-box">
                        <div class="count-down">
                        <h1 id="minutes_${i}">00</h1>
                        <p>Minutes</p>
                        </div>
                    </div>

                    <div class="count-down-box">
                        <div class="count-down">
                        <h1 id="seconds_${i}">00</h1>
                        <p>Seconds</p>
                        </div>
                    </div>


                    
                    </div>

                </div>


                <div class="card-body">
                    <h6 class="card-title">${all_products[i].name}</h6>                           
                </div>

                <div class="skillbar">
                    
                    <div class="skill_percentage">

                      <div class="skill_level" style="width: ${progress}%"></div>

                    </div>
                    <p class="progress-label"> ${current_orders} / ${total_required} Orders </p> 
                </div>

            </div>
        </div>
    
    `;
  }

  else{
    recommended_listings.innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-3">
      <div class="SeeMore card mx-auto" onclick="SeeMore()" style="position: relative; width: 18rem; height: 30rem; margin-top: 20px;">
        <b class="empty-card-title">SEE ALL NEW ARRIVALS</b>  
        <p><i class="arrow right"></i></p>                          
      </div>
    </div>
    `;
    }
  }
}


function SeeMore(){
  window.location.href ='pages/all_products.html';
}


function countdown() {

    var formatTime = (time) => (time < 10 ? `0${time}` : time);

    for (let i=0; i<11; i++) {
        var remDays = document.getElementById(`days_${i}`);
        var remHours = document.getElementById(`hours_${i}`);
        var remMinutes = document.getElementById(`minutes_${i}`);
        var remSeconds = document.getElementById(`seconds_${i}`);

        const item_id = all_products[i].id

        if (item_details[item_id]) {
            var expiryDate = new Date(item_details[item_id]['expiry']);
            var currentDate = new Date();

            var totalSeconds = (expiryDate - currentDate) / 1000;

            var days = Math.floor(totalSeconds / 3600 / 24);
            var hours = Math.floor(totalSeconds / 3600) % 24;
            var mins = Math.floor(totalSeconds / 60) % 60;
            var seconds = Math.floor(totalSeconds) % 60;

            remDays.innerHTML = days;
            remHours.innerHTML = formatTime(hours);
            remMinutes.innerHTML = formatTime(mins);
            remSeconds.innerHTML = formatTime(seconds);
        } else {
            remDays.innerHTML = 00;
            remHours.innerHTML = 00;
            remMinutes.innerHTML = 00;
            remSeconds.innerHTML = 00;
        }
    }
};

// initial call
countdown();

setInterval(countdown, 1000);

// function sickbtn(){

// }
