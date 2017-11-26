var room = "";
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
//STORE IN PARTICLE PHOTON      
var deviceID    = "470041001051363036373538";
var accessToken = "a9d844e915fa5183963dfa166907e08d0cd946f9";


var SetFuncArr = []
	

var GetFuncArr = [];

		

for(i = 1; i<11; i++)
	{
		SetFuncArr[i] = []
	
	for(j = 1; j<10; j++)
		{		
			SetFuncArr[i][j] = ("upLoadTech" + String(i) + String(j));
		}
	}
for(i = 1; i<11; i++)
	{
		GetFuncArr[i] = []
	for(j = 1; j<10; j++)
		{		
			GetFuncArr[i][j] = ("retrvTech" + String(i) + String(j));
		}
	}
	

/*var setFuncTech1 = "upLoadTech1"
var setFuncTech2 = "upLoadTech2"
var setFuncTech3 = "upLoadTech3"
var setFuncTech4 = "upLoadTech4"

var getFuncTech1 = "retrvTech1"
var getFuncTech2 = "retrvTech2"
var getFuncTech3 = "retrvTech3"
var getFuncTech4 = "retrvTech4"*/

var times;
var emails;
var names;
var dates;
var day;

var tech11AlreadyBooked;
var tech21AlreadyBooked;
var tech31AlreadyBooked;
var tech41AlreadyBooked;

var alreadybookedName;
var alreadybookedEmail;

var confirmBox; 

function validateTime()
{
	var combinedErrorMessage;
	var alreadyBooked; 
	times = document.getElementById("PickPeriod").value;
	dates = (document.getElementById("SetDate").value);
	day = document.getElementById("day").value;
	names= document.getElementById("name").value;
	emails = document.getElementById("email").value;
	
	var chosenTime = (day+" " + dates + " " + times);
	if(room== "Technology 1")
		{
			
			if(tech11AlreadyBooked.includes(chosenTime) == true)
				{
					alreadybookedName = tech11AlreadyBooked.match("Name:(.*)Email:");
					alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
					alreadybookedEmail = tech11AlreadyBooked.match("Email:(.*)Time:");
					alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");
					
					combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");
					
					confirmBox = confirm(combinedErrorMessage);
					
					if(confirmBox == true)
						{
							emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
						}
					
				}
			else
				{
					combineString();
				}
		}
	else if(room== "Technology 2")
		{
			if(tech21AlreadyBooked.includes(chosenTime) == true)
				{
					alreadybookedName = tech21AlreadyBooked.match("Name:(.*)Email:");
					alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
					alreadybookedEmail = tech21AlreadyBooked.match("Email:(.*)Time:");
					alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");
					
					combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");
					
					confirmBox = confirm(combinedErrorMessage);
					
					if(confirmBox == true)
						{
							emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
						}
					
				}
			else
				{
					combineString();
				}
		}
	else if(room== "Technology 3")
		{
			if(tech31AlreadyBooked.includes(chosenTime) == true)
				{
					alreadybookedName = tech31AlreadyBooked.match("Name:(.*)Email:");
					alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
					alreadybookedEmail = tech31AlreadyBooked.match("Email:(.*)Time:");
					alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");
					
					combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");
					
					confirmBox = confirm(combinedErrorMessage);
					
					if(confirmBox == true)
						{
							emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
						}
					
				}
			else
				{
					combineString();
				}
		}
	else if(room== "Technology 4")
		{
			if(tech41AlreadyBooked.includes(chosenTime) == true)
				{
					alreadybookedName = tech41AlreadyBooked.match("Name:(.*)Email:");
					alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
					alreadybookedEmail = tech41AlreadyBooked.match("Email:(.*)Time:");
					alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");
					
					combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");
					
					confirmBox = confirm(combinedErrorMessage);
					
					if(confirmBox == true)
						{
							emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
						}
					
				}
			else
				{
					combineString();
				}
		}
}

var CombindedBookTimeTech1 ="";
function combineString()
{
	times = document.getElementById("PickPeriod").value;
	emails = document.getElementById("email").value;
	names= document.getElementById("name").value;
	dates = (document.getElementById("SetDate").value);
	day = document.getElementById("day").value;
	//emailjs.send("default_service", "se21bookings", {ToEmail: emails, room: room, time: times, name:names, date: day + " " + dates})
	
    CombindedBookTimeTech = ("<hr>Name:" + names + "<hr>Email:" + emails + "<hr>Time: " +day+" " + dates + " " + times +"<hr>");
    setValue();
}

function setValue(obj) {
var newValue = CombindedBookTimeTech;
if(room == "Technology 1")
	{
		sparkSetTech11(newValue);
	}
else if(room == "Technology 2")
	{
		sparkSetTech21(newValue);
	}
else if(room == "Technology 3")
	{
		sparkSetTech31(newValue);
	}
else if(room == "Technology 4")
	{
		sparkSetTech41(newValue);
	}
}
      

function sparkSetTech11(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[1][1] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech21(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[2][1] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech31(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[3][1] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech41(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[4][1] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}
//Tech1       
window.setInterval(function() {
        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[1][1]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) {
				 var BookingDetails = json.result;
				 tech11AlreadyBooked = json.result;
				 if((BookingDetails).includes("�") == true)
					{
						 BookingDetails= BookingDetails.substr(BookingDetails.indexOf("<hr>"));
						 document.getElementById("Tech1CurrentBookings").innerHTML = BookingDetails;
					}
				 else
					 {
						 document.getElementById("Tech1CurrentBookings").innerHTML = BookingDetails;
					 }
                 });
		



//Tech2

        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[2][1] + "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) {
				 var BookingDetails = json.result;
				 tech21AlreadyBooked = json.result;
				 if((BookingDetails).includes("�") == true)
					{
						 BookingDetails= BookingDetails.substr(BookingDetails.indexOf("<hr>"));
						 document.getElementById("Tech2CurrentBookings").innerHTML = BookingDetails;
					}
				 else
					 {
						 document.getElementById("Tech2CurrentBookings").innerHTML = BookingDetails;
					 }
                 });
		



//Tech3
        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[3][1] + "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) {
				 var BookingDetails = json.result;
				 tech31AlreadyBooked = json.result;
				 if((BookingDetails).includes("�") == true)
					{
						 BookingDetails= BookingDetails.substr(BookingDetails.indexOf("<hr>"));
						 document.getElementById("Tech3CurrentBookings").innerHTML = BookingDetails;
					}
				 else
					 {
						 document.getElementById("Tech3CurrentBookings").innerHTML = BookingDetails;
					 }
                 });
		



//Tech4
        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[4][1] + "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) {
				 var BookingDetails = json.result;
				 tech41AlreadyBooked = json.result;
				 if((BookingDetails).includes("�") == true)
					{
						 BookingDetails= BookingDetails.substr(BookingDetails.indexOf("<hr>"));
						 document.getElementById("Tech4CurrentBookings").innerHTML = BookingDetails;
					}
				 else
					 {
						 document.getElementById("Tech4CurrentBookings").innerHTML = BookingDetails;
					 }
                 });
		


      }, 1500);
//END STORE IN PARTICLE PHOTON      

   
function BookRoom()
{
	if(localStorage.getItem("LastBtn") == "bookTech1Btn")
		{
			document.getElementById("BookedRoom").innerHTML="Book Technology 1";
		}
	else if(localStorage.getItem("LastBtn")== "bookTech2Btn")
		{
			document.getElementById("BookedRoom").innerHTML="Book Technology 2";
		}
	else if(localStorage.getItem("LastBtn")== "bookTech3Btn")
		{
			document.getElementById("BookedRoom").innerHTML="Book Technology 3";
		}
	else if(localStorage.getItem("LastBtn")== "bookTech4Btn")
		{
			document.getElementById("BookedRoom").innerHTML="Book Technology 4";
		}
}
window.setInterval(function() {
	var chosendate = document.getElementById("SetDate").value;
	if (chosendate =="")
		{
			document.getElementById('day').value ="";
		}
	else
		{
			document.getElementById('day').value = weekday[(new Date(chosendate)).getDay()]
		}
	if (localStorage.getItem("LastBtn") == "bookTech1Btn")
		{
			room = "Technology 1"
		}
	else if (localStorage.getItem("LastBtn") == "bookTech2Btn")
		{
			room = "Technology 2"
		}
	else if (localStorage.getItem("LastBtn") == "bookTech3Btn")
		{
			room = "Technology 3"
		}
	else if (localStorage.getItem("LastBtn") == "bookTech4Btn")
		{
			room = "Technology 4"
		}
}, 500);


