

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

 
});//Here the d3 json read file ends 
var end = 2009;
 key = localStorage.getItem("Key");
    iter = end -key;
     for(i=0;(i<dataset[iter].location.length);i++){
      address = dataset[iter].location[i];
       
     
        console.log("address "+i+" " +address);
     }

}


   
