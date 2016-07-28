

 

 var markerCount = 0;
 var map; 
 key=2000;

 Init =1;
function start_mapping(){
 
    jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAtmm7R7GbDN_k_nNyQH0LcRcfQ40RFolM";
        script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyAtmm7R7GbDN_k_nNyQH0LcRcfQ40RFolM&callback=initialize";
    document.body.appendChild(script);
});

}  

function initialize(key2) {
  if(Init==1){
    Init=0;
  key=2000;
  }
  else{
    key=key2;

});
  }

 //Initializes the map… 
 var myLatlng = new google.maps.LatLng(46.855141, -96.8372664);
 var map_canvas = document.getElementById('map_canvas'); 
 var map_options = { center: myLatlng, zoom: 3, mapTypeId: google.maps.MapTypeId.ROADMAP } 
 map = new google.maps.Map(map_canvas, map_options);
 start_update();
 }

function start_update(){

      d3.json("data111.json", function (data2,error) {
        if(error){
          console.log("Error loading data")
        }
    

var data2 = data2;

      

 

 //make Key from 1908 to 2009 -- for now it's till 1949
var dataset = [];
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

for (var i = 0; i < data2.Date.length; i++) {
 
var year = data2.Date[i].substr(data2.Date[i].length - 4);
var IntYear = parseInt(year);
if(IntYear>1950)
{
    
    var aboard = data2.Aboard[i];
    var IntAboard = parseInt(aboard);
    var fatalities = data2.Fatalities[i];
    var IntFatalities = parseInt(fatalities);
    dataset[end-IntYear].value +=1;
    dataset[end-IntYear].aboard +=IntAboard;
    dataset[end-IntYear].fatalities +=IntFatalities;
    dataset[end-IntYear].location.push(data2
      .Location[i]);
}

}


    
    var iter = end -key;
    geocoder = new google.maps.Geocoder();
    var address = null;
    var i=0;
    Latitude=0;
    Longitude=0;
    var map ;
    var infowindow 
    var marker;
        
    for(i=0; (i<10)&&(i<dataset[iter].location.length);i++){
      
      if(dataset[iter].location[i]){
        console.log("data found")
      address = dataset[iter].location[i];
      }
      else{
     address = "Monte Renosa, Corsica, France";
      }

      geocoder.geocode( { 'address': address}, function(results, status) {
         
           console.log(status);
          if (status == google.maps.GeocoderStatus.OK) {
            Latitude = results[0].geometry.location.lat();
            // console.log("Latitude"+Latitude+"\n");
            Longitude= results[0].geometry.location.lng();             
       
                  console.log("Latitude"+Latitude+"\n");
                  console.log("Longitude"+Longitude+"\n");
                  addMarkerToMap(Latitude,Longitude,address);
           }
            else {
               console.log("Error = "+status);
            // alert("Geocode was not successful for the following reason: " + status);
          }
        });       
      
  }

   });//Here the d3 json read file ends 
   
}  

//This function will add a marker to the map each time it 
//is called. It takes latitude, longitude, and html markup 
//for the content you want to appear in the info window
 //for the marker. 
 function addMarkerToMap(lat, lon, htmlMarkupForInfoWindow){ 
 var infowindow = new google.maps.InfoWindow(); 
 var myLatLng = new google.maps.LatLng(lat, lon);
 var marker = new google.maps.Marker({ position: myLatLng, map: map, animation: google.maps.Animation.DROP, }); 
 //Gives each marker an Id for the on click 
 markerCount++; 
 //Creates the event listener for clicking the marker 
 //and places the marker on the map 
 google.maps.event.addListener(marker, 'click', (function(marker, markerCount) { return function() { infowindow.setContent(htmlMarkupForInfoWindow); 
 infowindow.open(map, marker); } })(marker, markerCount));
 //Pans map to the new location of the marker
 map.panTo(myLatLng) 
 }     
   
