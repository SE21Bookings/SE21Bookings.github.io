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


var SetFuncArr = [];
	

var GetFuncArr = [];

		

for(i = 1; i<11; i++)
	{
		SetFuncArr[i] = [];
	
	for(j = 1; j<10; j++)
		{		
			SetFuncArr[i][j] = ("upLoadTech" + String(i) + String(j));
		}
	}
for(i = 1; i<11; i++)
	{
		GetFuncArr[i] = [];
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
var tech12AlreadyBooked;
var tech13AlreadyBooked;
var tech14AlreadyBooked;
var tech15AlreadyBooked;

var tech21AlreadyBooked;
var tech22AlreadyBooked;
var tech23AlreadyBooked;
var tech24AlreadyBooked;
var tech25AlreadyBooked;

var tech31AlreadyBooked;
var tech32AlreadyBooked;
var tech33AlreadyBooked;
var tech34AlreadyBooked;
var tech35AlreadyBooked;

var tech41AlreadyBooked;
var tech42AlreadyBooked;
var tech43AlreadyBooked;
var tech44AlreadyBooked;
var tech45AlreadyBooked;

var alreadyBookedTime11;
var alreadyBookedTime12;
var alreadyBookedTime13;
var alreadyBookedTime14;
var alreadyBookedTime15;

var alreadyBookedTime21;
var alreadyBookedTime22;
var alreadyBookedTime23;
var alreadyBookedTime24;
var alreadyBookedTime25;

var alreadyBookedTime31;
var alreadyBookedTime32;
var alreadyBookedTime33;
var alreadyBookedTime34;
var alreadyBookedTime35;

var alreadyBookedTime41;
var alreadyBookedTime42;
var alreadyBookedTime43;
var alreadyBookedTime44;
var alreadyBookedTime45;


var alreadybookedName;
var alreadybookedEmail;

var confirmBox;
var CurrentTime;
var CurrentDay;

var Smallest1 = 9999999999999999999999999999999999999999;
var Smallest2 = 9999999999999999999999999999999999999999;
var Smallest3 = 9999999999999999999999999999999999999999;
var Smallest4 = 9999999999999999999999999999999999999999;


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
	
	$("#date").val( moment().format('YYYY-MM-DD') );
    var today = moment().format('YYYY-MM-DD');
	
	if(today <= dates)
		{	
			
			
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
				else if(tech12AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech12AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech12AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech13AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech13AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech13AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech14AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech14AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech14AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech15AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech15AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech15AlreadyBooked.match("Email:(.*)Time:");
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
				else if(tech22AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech22AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech22AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech23AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech23AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech23AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech24AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech24AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech24AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech25AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech25AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech25AlreadyBooked.match("Email:(.*)Time:");
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
				else if(tech32AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech32AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech32AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech33AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech33AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech33AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech34AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech34AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech34AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech35AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech35AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech35AlreadyBooked.match("Email:(.*)Time:");
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
				else if(tech42AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech42AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech42AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech43AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech43AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech43AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech44AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech44AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech44AlreadyBooked.match("Email:(.*)Time:");
						alreadybookedEmail[1] = alreadybookedEmail[1].replace("<hr>","");

						combinedErrorMessage = ("Hi There " + names +"! \nUnfortunatly " + room + " has already been booked at this time by " + alreadybookedName[1] + "(" + alreadybookedEmail[1] + ")\n\nWould you like me to Contact Him?");

						confirmBox = confirm(combinedErrorMessage);

						if(confirmBox == true)
							{
								emailjs.send("default_service","se21bookingerror", {"ToEmail":alreadybookedEmail[1], "FromEmail":emails, "beforeName":alreadybookedName[1], "FromName":names, "room": room})
							}
					}
				else if(tech45AlreadyBooked.includes(chosenTime) == true)
					{
						alreadybookedName = tech45AlreadyBooked.match("Name:(.*)Email:");
						alreadybookedName[1] = alreadybookedName[1].replace("<hr>","");
						alreadybookedEmail = tech45AlreadyBooked.match("Email:(.*)Time:");
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
	
	
	else
		{
			alert("Sorry but you must choose a future date.")
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
	emailjs.send("default_service", "se21bookings", {ToEmail: emails, room: room, time: times, name:names, date: day + " " + dates})
	
    CombindedBookTimeTech = ("<hr>Name:" + names + "<hr>Email:" + emails + "<hr>Time: " +day+" " + dates + " " + times +"<hr>");
    setValue();
}

function setValue(obj) {
var newValue = CombindedBookTimeTech;
if(room == "Technology 1")
	{
		if(tech11AlreadyBooked==null)
			{
				sparkSetTech11(newValue);
			}	
		else if(tech12AlreadyBooked.length==0)
			{
				sparkSetTech12(newValue);
			}
		else if(tech13AlreadyBooked.length==0)
			{
				sparkSetTech13(newValue);
			}
		else if(tech14AlreadyBooked.length==0)
			{
				sparkSetTech14(newValue);
			}
		else if(tech15AlreadyBooked.length==0)
			{
				sparkSetTech15(newValue);
			}
		else
			{
				alert("Sorry there is no memory left on the server to store this information.\n\nWe are working on getting more server space.\n\nSorry for the inconvience")
			}
	}
else if(room == "Technology 2")
	{
		if(tech21AlreadyBooked.length==0)
			{
				sparkSetTech21(newValue);
			}
		else if(tech22AlreadyBooked.length==0)
			{
				sparkSetTech22(newValue);
			}
		else if(tech23AlreadyBooked.length==0)
			{
				sparkSetTech23(newValue);
			}
		else if(tech24AlreadyBooked.length==0)
			{
				sparkSetTech24(newValue);
			}
		else if(tech25AlreadyBooked.length==0)
			{
				sparkSetTech25(newValue);
			}
		else
			{
				alert("Sorry there is no memory left on the server to store this information.\n\nWe are working on getting more server space.\n\nSorry for the inconvience")
			}
	}
else if(room == "Technology 3")
	{
		if(tech31AlreadyBooked.length==0)
			{
				sparkSetTech31(newValue);
			}
		else if(tech32AlreadyBooked.length==0)
			{
				sparkSetTech32(newValue);
			}
		else if(tech33AlreadyBooked.length==0)
			{
				sparkSetTech33(newValue);
			}
		else if(tech34AlreadyBooked.length==0)
			{
				sparkSetTech34(newValue);
			}
		else if(tech35AlreadyBooked.length==0)
			{
				sparkSetTech35(newValue);
			}
		else
			{
				alert("Sorry there is no memory left on the server to store this information.\n\nWe are working on getting more server space.\n\nSorry for the inconvience")
			}
	}
else if(room == "Technology 4")
	{
		if(tech41AlreadyBooked.length==0)
			{
				sparkSetTech41(newValue);
			}
		else if(tech42AlreadyBooked.length==0)
			{
				sparkSetTech42(newValue);
			}
		else if(tech43AlreadyBooked.length==0)
			{
				sparkSetTech43(newValue);
			}
		else if(tech44AlreadyBooked.length==0)
			{
				sparkSetTech44(newValue);
			}
		else if(tech45AlreadyBooked.length==0)
			{
				sparkSetTech45(newValue);
			}
		else
			{
				alert("Sorry there is no memory left on the server to store this information.\n\nWe are working on getting more server space.\n\nSorry for the inconvience")
			}
	}
}
      
//set value for tech 1 functions
function sparkSetTech11(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[1][1] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech12(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[1][2] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech13(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[1][3] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech14(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[1][4] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech15(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[1][5] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}




//set value for tech 2 functions
function sparkSetTech21(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[2][1] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech22(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[2][2] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech23(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[2][3] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech24(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[2][4] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}
function sparkSetTech25(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[2][5] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}


//set value for tech 3 functions
function sparkSetTech31(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[3][1] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech32(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[3][2] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech33(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[3][3] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech34(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[3][4] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}

function sparkSetTech35(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[3][5] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}



//set value for tech 4
function sparkSetTech41(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[4][1] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}
function sparkSetTech42(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[4][2] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}
function sparkSetTech43(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[4][3] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}
function sparkSetTech44(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[4][4] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}
function sparkSetTech45(newValue) {
    var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + SetFuncArr[4][5] + "/";
    $.post( requestURL, { params: newValue, access_token: accessToken });
}





//Tech1       
window.setInterval(function() {
		$("#date").val( moment().format('YYYY-MM-DD H:mm') );
     	CurrentTime = moment().format('YYYY-MM-DD H:mm');
		$("#date").val( moment().format('e') );
		CurrentDay = moment().format('e');
	
		CurrentTime = String(weekday[CurrentDay]) + " " + String(CurrentTime)
	
        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[1][1]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech11AlreadyBooked = json.result;
            });

		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[1][2]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech12AlreadyBooked = json.result;
			});
	
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[1][3]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech13AlreadyBooked = json.result;
			});
	
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[1][4]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech14AlreadyBooked = json.result;
			});
	
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[1][5]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech15AlreadyBooked = json.result;
			});
				  

//Tech2

        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[2][1] + "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech21AlreadyBooked = json.result;
            });
	
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[2][2]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech22AlreadyBooked = json.result;
			});
	
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[2][3]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech23AlreadyBooked = json.result;
			});
	
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[2][4]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech24AlreadyBooked = json.result;
			});
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[2][5]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech25AlreadyBooked = json.result;
			});




//Tech3
        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[3][1] + "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech31AlreadyBooked = json.result;
            });
	
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[3][2]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech32AlreadyBooked = json.result;
			});
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[3][3]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech33AlreadyBooked = json.result;
			});
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[3][4]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech34AlreadyBooked = json.result;
			});
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[3][5]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech35AlreadyBooked = json.result;
			});

		

//Tech4
        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[4][1] + "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech41AlreadyBooked = json.result;
            });
	
		requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[4][2]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech42AlreadyBooked = json.result;
			});
	
	    requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[4][3]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech43AlreadyBooked = json.result;
			});

	    requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[4][4]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech44AlreadyBooked = json.result;
			});

	    requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + GetFuncArr[4][5]+ "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) 
			{
				 tech45AlreadyBooked = json.result;
			});
		
		
	
		if(tech11AlreadyBooked!=null)
			{
				alreadyBookedTime11 = tech11AlreadyBooked.match("Time:(.*)<hr>");
				Tech1CheckSmallest(alreadyBookedTime11[1],11)
				move()

			}
		if(tech12AlreadyBooked!=null)
			{
				alreadyBookedTime12 = tech12AlreadyBooked.match("Time:(.*)<hr>");
				Tech1CheckSmallest(alreadyBookedTime12[1],12)

			}
		if(tech13AlreadyBooked!=null)
			{
				alreadyBookedTime13 = tech13AlreadyBooked.match("Time:(.*)<hr>");
				Tech1CheckSmallest(alreadyBookedTime13[1],13)
			}
		if(tech14AlreadyBooked!=null)
			{
				alreadyBookedTime14 = tech14AlreadyBooked.match("Time:(.*)<hr>");
				Tech1CheckSmallest(alreadyBookedTime14[1],14)
			}
		if(tech15AlreadyBooked!=null)
			{
				alreadyBookedTime15 = tech15AlreadyBooked.match("Time:(.*)<hr>");
				Tech1CheckSmallest(alreadyBookedTime15[1],15)
			}	
      }, 1500);
		
	
	window.setInterval(function(){
		if(tech21AlreadyBooked!=null)
			{
				alreadyBookedTime21 = tech21AlreadyBooked.match("Time:(.*)<hr>");
				Tech2CheckSmallest(alreadyBookedTime21[1],21)
			}
		if(tech22AlreadyBooked!=null)
			{
				alreadyBookedTime22 = tech22AlreadyBooked.match("Time:(.*)<hr>");
				Tech2CheckSmallest(alreadyBookedTime22[1],22)
			}
		if(tech23AlreadyBooked!=null)
			{
				alreadyBookedTime23 = tech23AlreadyBooked.match("Time:(.*)<hr>");
				Tech2CheckSmallest(alreadyBookedTime23[1],23)
			}
		if(tech24AlreadyBooked!=null)
			{
				alreadyBookedTime24 = tech24AlreadyBooked.match("Time:(.*)<hr>");
				Tech2CheckSmallest(alreadyBookedTime24[1],24)
			}
		if(tech25AlreadyBooked!=null)
			{
				alreadyBookedTime25 = tech25AlreadyBooked.match("Time:(.*)<hr>");
				Tech2CheckSmallest(alreadyBookedTime25[1],25)
			}
	},1500);

	window.setInterval(function(){
		if(tech31AlreadyBooked!=null)
			{
				alreadyBookedTime31 = tech31AlreadyBooked.match("Time:(.*)<hr>");
				Tech3CheckSmallest(alreadyBookedTime31[1],31)
			}
		if(tech32AlreadyBooked!=null)
			{
				alreadyBookedTime32 = tech32AlreadyBooked.match("Time:(.*)<hr>");
				Tech3CheckSmallest(alreadyBookedTime32[1],32)
			}
		if(tech33AlreadyBooked!=null)
			{
				alreadyBookedTime33 = tech33AlreadyBooked.match("Time:(.*)<hr>");				Tech3CheckSmallest(alreadyBookedTime33[1],33)
			}
		if(tech34AlreadyBooked!=null)
			{
				alreadyBookedTime34 = tech34AlreadyBooked.match("Time:(.*)<hr>");				Tech3CheckSmallest(alreadyBookedTime34[1],34)
			}
		if(tech35AlreadyBooked!=null)
			{
				alreadyBookedTime35 = tech35AlreadyBooked.match("Time:(.*)<hr>");				Tech3CheckSmallest(alreadyBookedTime35[1],35)
			}
	},1500);

	window.setInterval(function(){
		if(tech41AlreadyBooked!=null)
			{
				alreadyBookedTime41 = tech41AlreadyBooked.match("Time:(.*)<hr>");
				Tech4CheckSmallest(alreadyBookedTime41[1],41)
			}
		if(tech42AlreadyBooked!=null)
			{
				alreadyBookedTime42 = tech42AlreadyBooked.match("Time:(.*)<hr>");				Tech4CheckSmallest(alreadyBookedTime42[1],42)
			}
		if(tech43AlreadyBooked!=null)
			{
				alreadyBookedTime43 = tech43AlreadyBooked.match("Time:(.*)<hr>");				Tech4CheckSmallest(alreadyBookedTime43[1],43)
			}
		if(tech44AlreadyBooked!=null)
			{
				alreadyBookedTime44 = tech44AlreadyBooked.match("Time:(.*)<hr>");				Tech4CheckSmallest(alreadyBookedTime44[1],44)
			}
		if(tech45AlreadyBooked!=null)
			{
				alreadyBookedTime45 = tech45AlreadyBooked.match("Time:(.*)<hr>");				Tech4CheckSmallest(alreadyBookedTime45[1],45)
			}
	},1500);
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



function Tech1CheckSmallest(TimeTillBook, TimeSlot)
{
	move()
	if((new Date(TimeTillBook)-new Date(CurrentTime))<Smallest1)
		{
			move()
			Smallest1= new Date(TimeTillBook)-new Date(CurrentTime)
			if(TimeSlot==11)
				{
				move()
				if((tech11AlreadyBooked).includes("�") == true)
					{
						 move()
						 tech11AlreadyBooked= tech11AlreadyBooked.substr(tech11AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech11AlreadyBooked;
					}
				 else
					 {
						 move()
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech11AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==12)
				{
					move()
				if((tech12AlreadyBooked).includes("�") == true)
					{
						 move()
						 tech12AlreadyBooked= tech12AlreadyBooked.substr(tech12AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech12AlreadyBooked;
					}
				 else
					 {
						 move()
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech12AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==13)
				{
				move()
				if((tech13AlreadyBooked).includes("�") == true)
					{
						 move()
						 tech13AlreadyBooked= tech13AlreadyBooked.substr(tech13AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech13AlreadyBooked;
					}
				 else
					 {
						 move()
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech13AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==14)
				{
				move()
				if((tech14AlreadyBooked).includes("�") == true)
					{
						 move()
						 tech14AlreadyBooked= tech14AlreadyBooked.substr(tech14AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech14AlreadyBooked;
					}
				 else
					 {
						 move()
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech14AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==15)
				{
				move()
				if((tech15AlreadyBooked).includes("�") == true)
					{
						 move()
						 tech15AlreadyBooked= tech15AlreadyBooked.substr(tech15AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech15AlreadyBooked;
					}
				 else
					 {
						 move()
						 document.getElementById("Tech1CurrentBookings").innerHTML = tech15AlreadyBooked;
					 }
                 }
		}
		
		
}

function Tech2CheckSmallest(TimeTillBook, TimeSlot)
{
	if((new Date(TimeTillBook)-new Date(CurrentTime))<Smallest2)
		{
			Smallest2= new Date(TimeTillBook)-new Date(CurrentTime)
			if(TimeSlot==21)
				{
				if((tech21AlreadyBooked).includes("�") == true)
					{
						 tech21AlreadyBooked= tech21AlreadyBooked.substr(tech21AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech21AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech21AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==22)
				{
				if((tech22AlreadyBooked).includes("�") == true)
					{
						 tech22AlreadyBooked= tech22AlreadyBooked.substr(tech22AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech22AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech22AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==23)
				{
				if((tech23AlreadyBooked).includes("�") == true)
					{
						 tech23AlreadyBooked= tech23AlreadyBooked.substr(tech23AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech23AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech23AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==24)
				{
				if((tech24AlreadyBooked).includes("�") == true)
					{
						 tech24AlreadyBooked= tech24AlreadyBooked.substr(tech24AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech24AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech24AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==25)
				{
				if((tech25AlreadyBooked).includes("�") == true)
					{
						 tech25AlreadyBooked= tech25AlreadyBooked.substr(tech25AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech25AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech2CurrentBookings").innerHTML = tech25AlreadyBooked;
					 }
                 }
		}	
}

function Tech3CheckSmallest(TimeTillBook, TimeSlot)
{
	if((new Date(TimeTillBook)-new Date(CurrentTime))<Smallest3)
		{
			Smallest3= new Date(TimeTillBook)-new Date(CurrentTime)
			if(TimeSlot==31)
				{
				if((tech31AlreadyBooked).includes("�") == true)
					{
						 tech31AlreadyBooked= tech31AlreadyBooked.substr(tech31AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech31AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech31AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==32)
				{
				if((tech32AlreadyBooked).includes("�") == true)
					{
						 tech32AlreadyBooked= tech32AlreadyBooked.substr(tech32AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech32AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech32AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==33)
				{
				if((tech33AlreadyBooked).includes("�") == true)
					{
						 tech33AlreadyBooked= tech33AlreadyBooked.substr(tech33AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech33AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech33AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==34)
				{
				if((tech34AlreadyBooked).includes("�") == true)
					{
						 tech34AlreadyBooked= tech34AlreadyBooked.substr(tech34AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech34AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech34AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==35)
				{
				if((tech35AlreadyBooked).includes("�") == true)
					{
						 tech35AlreadyBooked= tech35AlreadyBooked.substr(tech35AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech35AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech3CurrentBookings").innerHTML = tech35AlreadyBooked;
					 }
                 }
		}	
}

function Tech4CheckSmallest(TimeTillBook, TimeSlot)
{
	if((new Date(TimeTillBook)-new Date(CurrentTime))<Smallest4)
		{
			Smallest4= new Date(TimeTillBook)-new Date(CurrentTime)
			if(TimeSlot==41)
				{
				if((tech41AlreadyBooked).includes("�") == true)
					{
						 tech41AlreadyBooked= tech41AlreadyBooked.substr(tech41AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech41AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech41AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==42)
				{
				if((tech42AlreadyBooked).includes("�") == true)
					{
						 tech42AlreadyBooked= tech42AlreadyBooked.substr(tech42AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech42AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech32AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==43)
				{
				if((tech43AlreadyBooked).includes("�") == true)
					{
						 tech43AlreadyBooked= tech43AlreadyBooked.substr(tech43AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech43AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech43AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==44)
				{
				if((tech44AlreadyBooked).includes("�") == true)
					{
						 tech44AlreadyBooked= tech44AlreadyBooked.substr(tech44AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech44AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech44AlreadyBooked;
					 }
                 }
			
			if(TimeSlot==45)
				{
				if((tech45AlreadyBooked).includes("�") == true)
					{
						 tech45AlreadyBooked= tech45AlreadyBooked.substr(tech45AlreadyBooked.indexOf("<hr>"));
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech45AlreadyBooked;
					}
				 else
					 {
						 document.getElementById("Tech4CurrentBookings").innerHTML = tech45AlreadyBooked;
					 }
                 }
		}	
}



function bubbleSort(items) {  
    var length = items.length;
    for (var i = (length - 1); i >= 0; i--) {
        //Number of passes
        for (var j = (length - i); j > 0; j--) {
            //Compare the adjacent positions
            if (items[j] < items[j - 1]) {
                //Swap the numbers
                var tmp = items[j];
                items[j] = items[j - 1];
                items[j - 1] = tmp;
				return items
            }
        }
    }
}
var timesTch1=[];
function createSortArrayTech1()
{
	alert(alreadyBookedTime11[1]);
	timesTch1.push(new Date(alreadyBookedTime11[1])-new Date(CurrentTime))
}
