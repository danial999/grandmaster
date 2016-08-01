var dataset = [];



function start_mapping(){


  key=document.getElementById("text1").value ;
    if(key!=""){
    localStorage.setItem("Key", key);
    }
 
      d3.json("data111.json", function (data2,error) {
        if(error){
          console.log("Error loading data")
        }
    

var data2 = data2;

      

 

 //make Key from 1908 to 2009 -- for now it's till 1949

var start = 1950;
var end = 2009
var len = end-start;
for (var i = start; i <= end; i++) {
    dataset.push({
        key: i,
        value:0,
        aboard:0,
        fatalities:0,
        location:[]
    });
}

var soso=data2.Date.length;

for (var jj = 0; jj < data2.Date.length; jj++) {
 
var year = data2.Date[jj].substr(data2.Date[jj].length - 4);
var IntYear = parseInt(year);
if(IntYear>1950)
{ 
    
    var aboard = data2.Aboard[jj];
    var IntAboard = parseInt(aboard);
    var fatalities = data2.Fatalities[jj];
    var IntFatalities = parseInt(fatalities);
    dataset[end-IntYear].value +=1;
    dataset[end-IntYear].aboard +=IntAboard;
    dataset[end-IntYear].fatalities +=IntFatalities;
    dataset[end-IntYear].location.push(data2
      .Location[jj]);

}

}

 print();
});//Here the d3 json read file ends 
}
      debugger;
function print(){
  

  while(dataset.length==0){
     setTimeout(function() {  }, 1000);
  }
var end = 2009;
 key = localStorage.getItem("Key");
    iter = end -key;
     // 
    // delay between geocode requests - at the time of writing, 100 miliseconds seems to work well
    mapgoogle();

}
// ====== Geocoding ======
      function getAddress(search, next) {
        geo.geocode({address:search}, function (results,status)
          { 
            // If that was successful
            if (status == google.maps.GeocoderStatus.OK) {
              // Lets assume that the first marker is the one we want
              var p = results[0].geometry.location;
              var lat=p.lat();
              var lng=p.lng();
              // Output the data
                var msg = 'address="' + search + '" lat=' +lat+ ' lng=' +lng+ '(delay='+delay+'ms)<br>';
                document.getElementById("messages").innerHTML += msg;
              // Create a marker
              createMarker(search,lat,lng);
            }
            // ====== Decode the error status ======
            else {
              // === if we were sending the requests to fast, try this one again and increase the delay
              if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                nextAddress--;
                delay++;
              } else {
                var reason="Code "+status;
                var msg = 'address="' + search + '" error=' +reason+ '(delay='+delay+'ms)<br>';
                
              }   
            }
            next();
          }
        );
      }
 // ======= Function to create a marker
     function createMarker(add,lat,lng) {
       var contentString = add;
       var marker = new google.maps.Marker({
         position: new google.maps.LatLng(lat,lng),
         map: map,
         zIndex: Math.round(latlng.lat()*-100000)<<5
       });

      google.maps.event.addListener(marker, 'click', function() {
         infowindow.setContent(contentString); 
         infowindow.open(map,marker);
       });

       bounds.extend(marker.position);

     }

      // ======= An array of locations that we want to Geocode ========
     
      var addresses = dataset[iter].location;

      // ======= Global variable to remind us what to do next
      var nextAddress = 0;

      // ======= Function to call the next Geocode operation when the reply comes back

      function theNext() {
        if (nextAddress < addresses.length) {
          setTimeout('getAddress("'+addresses[nextAddress]+'",theNext)', delay);
          nextAddress++;
        } else {
          // We're done. Show map bounds
          map.fitBounds(bounds);
        }
      }

function mapgoogle() {
  var delay = 100;


      // ====== Create map objects ======
      var infowindow = new google.maps.InfoWindow();
      var latlng = new google.maps.LatLng(-34.397, 150.644);
      var mapOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var geo = new google.maps.Geocoder(); 
      var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
      var bounds = new google.maps.LatLngBounds();

      

    

      // ======= Call that function for the first time =======
      theNext();

    // This Javascript is based on code provided by the
    // Community Church Javascript Team
    // http://www.bisphamchurch.org.uk/   
    // http://econym.org.uk/gmap/

    //]]>
}









   
