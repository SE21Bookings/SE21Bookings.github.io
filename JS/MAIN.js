      
var deviceID    = "470041001051363036373538";
var accessToken = "a9d844e915fa5183963dfa166907e08d0cd946f9";

var setFunc = "SendText";
    
var getFunc = "msgRetrieve";

var CombindedBookTimeTech1 ="";
function combineString()
{
    CombindedBookTimeTech1 = ("<hr>TECH 1: <hr>Booked By:" + document.getElementById("name").value + "<hr>Email:" + document.getElementById("email").value + "<hr>Time:" + document.getElementById("PickPeriod").value+"<hr>")
    setValue();
	
}

function setValue(obj) {
var newValue = CombindedBookTimeTech1;
sparkSetPos(newValue);
}
      

function sparkSetPos(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + setFunc + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}
        
window.setInterval(function() {
        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + getFunc + "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) {
                 document.getElementById("currentBook").innerHTML = json.result;
                 });
      }, 1000);
        


