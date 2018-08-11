var AdmimUserpoolID = "ap-southeast-1_5uiXeZzFB";
var AdminAppClientID = "2qis1u4uur3e17ua9a28r7b6ol";
var API_URL_Admin = "https://7l7do5pc6f.execute-api.ap-southeast-1.amazonaws.com/ReadWriteFromTableSE21/adminusers";

var slideIndex = 1;
var email;
var localStorageWeek;
var adminPriv;
var width = 0;
var widthChange;
var EditStatus;

function Login(usernames, passwords) //used to log a user into the main page
{
	var poolData = {
    UserPoolId : AdmimUserpoolID, // your user pool id here
    ClientId : AdminAppClientID // your app client id here
	};
	var userPool = 
	new AmazonCognitoIdentity.CognitoUserPool(poolData);
	var userData = {
		Username : usernames, // your username here
		Pool : userPool
	};
    var authenticationData = {
        Username : usernames, // your username here
        Password : passwords, // your password here
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
 
    cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
			document.getElementById("signInErrMsg").style.color="green"
			document.getElementById("signInErrMsg").innerHTML="Sucessfully Logged In"
			self.location="Pages/Make_Booking.html"
        },
        onFailure: function(err) {
			document.getElementById("signInErrMsg").style.color="red"
            document.getElementById("signInErrMsg").innerHTML=(err.message || JSON.stringify(err));
        }
    });
}

function Logout()
{
	cognitoUser=getCognitoUser();
	
	if (cognitoUser != null) 
	{
    	cognitoUser.signOut();
		self.location="../index.html";
    }
}

function createNewUser(emails,password) //CreateNewUser
{
	var poolData = {
        UserPoolId : AdmimUserpoolID, // Your user pool id here
        ClientId : AdminAppClientID // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : emails
    };
	
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(emails, password, attributeList, null, function(err, result){
        if (err) {
			document.getElementById("signUpErrMsg").style.color="red";
            document.getElementById("signUpErrMsg").innerHTML=(err.message || JSON.stringify(err));
            return;
        }
        cognitoUser = result.user;
		document.getElementById("signUpErrMsg").style.color="green";
        document.getElementById("signUpErrMsg").innerHTML=("Welcome! "+ cognitoUser.getUsername() + " \nPlease access your email to verify your account");
    });
}

function forgotPassword(username)
{
	
	var poolData = {
        UserPoolId : AdmimUserpoolID, // Your user pool id here
        ClientId : AdminAppClientID // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	
	cognitoUser = new AmazonCognitoIdentity.CognitoUser({
			Username: username,
			Pool: userPool
		});

		// call forgotPassword on cognitoUser
		cognitoUser.forgotPassword({
			onSuccess: function(result) {
				writeToDeleteConsole('call result: ' + (result.message || JSON.stringify(result)));
				$("#ForgotPasswordErrMsg").html("");
				plusDivs(1);
			},
			onFailure: function(err) {
				writeToDeleteConsole((err.message || JSON.stringify(err)));
				$("#ForgotPasswordErrMsg").html((err.message || JSON.stringify(err)));
			}
		});	
}

function confirmForgottenPassword(username,code,newPassword)
{
	var poolData = {
        UserPoolId : AdmimUserpoolID, // Your user pool id here
        ClientId : AdminAppClientID // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	
	cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: userPool
    }),
	
    cognitoUser.confirmPassword(code, newPassword, {
	  onSuccess: function(result) {
		  console.log(result)
		  $("#ForgotPasswordErrMsg").css("color","green")
		  $("#ForgotPasswordErrMsg").html("Sucess, Password Changed")
		},
	  // ...
	  onFailure: function(err) {
		  console.log((err.message || JSON.stringify(err)))
	  	  $("#ForgotPasswordErrMsg").css("color","red")
		  $("#ForgotPasswordErrMsg").html((err.message || JSON.stringify(err)))
	  }
	})
}

function getCognitoUser() 
{
	var data =
	{ 
		UserPoolId : AdmimUserpoolID,
        ClientId : AdminAppClientID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) 
	{
        cognitoUser.getSession(function(err, session) 
		{
            if (err) 
			{
                console.log(err);
				self.location="../index.html"
                return;
            }
            console.log('session validity: ' + session.isValid());
        });
		return cognitoUser;
    }
	else
	{
		self.location="../index.html"
	}
}

function checkWhichUser()// checks what user it is, and whether or not it is a master user
{
	var emailExist = false;
	$.ajax({
		type: 'GET',
		url: API_URL_Admin,
		success: function (data) 
		{
			getEmail()
			checkVariable()
			function checkVariable() 
			{
				if (email != null) 
				{
					$.each(data.Items, function (index, val)
					{
						if(val["Email"].toLowerCase()==email.toLowerCase())
						{
							emailExist = true;
						}
					});
					
					if(emailExist==true)
					{
						adminPriv=true
					}
					else
					{
						adminPriv=false
					}
					checkIfEditing()

				}
				else
				{
					window.setTimeout(checkVariable,1000)
				}	
			}
		},
		error: function (data)
		{
			$("#signInErrMsg").html("Error: UserDatabase load has failed")
		}
	});
	
}

function decodeJWT(jwtToken) // decodes JWT accessToken
{
	var playload = JSON.parse(atob(jwtToken.split('.')[1]));
    console.log(playload);
}

function checkValid(jwtToken) // Used to see if session has ended
{	
	var current_time = Date.now() / 1000;
	if ( jwtToken.exp < current_time) {
 		return false
	}
	else{
		return true
	}
}

function forgotPassContinue()
{
	if(slideIndex==1)
	{
		forgotPassword($("#forgotPassEmail").val())
	}
	else if(slideIndex==2)
	{
		if($("#forgotPassNPassword").val()==$("#forgotPassConfirmPassword").val() && $("#forgotPassNPassword").val() !="")
		{
			confirmForgottenPassword($("#forgotPassEmail").val(),$("#forgotPassCode").val(),$("#forgotPassNPassword").val())
		}
		else
		{
			$("#ForgotPasswordErrMsg").html("Passwords Don't Match");
		}
		
	}
}

function getMonday( date ) 
{
    var day = date.getDay() || 7;  
    if( day !== 1 ) 
        date.setHours(-24 * (day - 2)); 
	
	date = date.toUTCString();
	date = date.split(' ').slice(0, 4).join(' ');
    return date;
}

function manipulateDay(day, whichWeek)
{
	if(whichWeek == 1)
	{
		switch(day) 
		{	
			case "Monday":
				return "1Monday";
				break;
			case "Tuesday":
				return "2Tuesday";
				break;
			case "Wednesday":
				return "3Wednesday";
				break;
			case "Thursday":
				return "4Thursday";
				break;
			case "Friday":
				return "5Friday";
				break;
		}
	}
	else if(whichWeek ==2)
	{
		switch(day) 
		{
			case "Monday":
				return "11Monday";
				break;
			case "Tuesday":
				return "22Tuesday";
				break;
			case "Wednesday":
				return "33Wednesday";
				break;
			case "Thursday":
				return "44Thursday";
				break;
			case "Friday":
				return "55Friday";
				break;
		}
	}
	
}

function manipulatePeriod(Period)
{
	switch(Period) 
		{
			case "Period1":
				return "Period 1";
				break;
			case "Period2":
				return "Period 2";
				break;
			case "Break":
				return "Break";
				break;
			case "Period3":
				return "Period 3";
				break;
			case "Period4":
				return "Period 4";
				break;
			case "Lunch":
				return "Lunch";
				break;
			case "Period5":
				return "Period 5";
				break;
			case "Period6":
				return "Period 6";
				break;
			case "AfterschoolH1":
				return "Afterschool Hour 1";
				break;
			case "AfterschoolH2":
				return "Afterschool Hour 2";
				break;
		}
}

function plusDivs(n) 
{
	showDivs(slideIndex += n);
}
function showDivs(n) 
{
	var i;
	var x = document.getElementsByClassName("ForgotPasswordSlides");
	if (n > x.length) {slideIndex = 1}    
	if (n < 1) {slideIndex = x.length}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";  
	}
	x[slideIndex-1].style.display = "block";  
}

function plusDivsSettings(n) 
{
	showDivsSettings(slideIndex += n);
}
function showDivsSettings(n) 
{
	var i;
	var x = document.getElementsByClassName("SettingsSlides");
	if (n > x.length) {slideIndex = 1}    
	if (n < 1) {slideIndex = x.length}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";  
	}
	x[slideIndex-1].style.display = "block";  
}

function getEmail()
{
	cognitoUser = getCognitoUser()
	cognitoUser.getUserAttributes(function(err, result) {
        if (err) {
            console.log(err);
			$("#errorModule").show();
            return;
        }
		email = result[2]["Value"];
	});
}

function extractContent(s)
{
  var span = document.createElement('span');
  span.innerHTML = s;
  return span.textContent || span.innerText;
};

function preLimLoader(loadingText)
{
	$("#viewPort_Content").hide()
	$("#preLimLoader").show()
	$("#preLimLoader").html(loadingText)
}
function exitpreLimLoader()
{
	$("#viewPort_Content").hide()
	$("#preLimLoader").show()
	$("#preLimLoader").html("Event Successful...")
	window.setTimeout(function(){
		$("#preLimLoader").html("[Click on a Timeslot to View Bookings]")
	},3000)
}
function exitpreLimLoaderErr()
{
	window.setTimeout(function(){
		$("#preLimLoader").html("[Click on a Timeslot to View Bookings]")
	},3000)
}
function checkRecurrence()
{
	var selectR = $("#Recurrence").val()
	if(selectR == "NPR")
	{
		$("#howManyWeeks").show()
	}
	else
	{
		$("#howManyWeeks").hide()
	}
}

function removeEventListeners()
{
	$(document).off('click', '#bookBtn')
	$(document).off('click', '#deleteBtn')
	$(document).off('click', '.row_data')
	$(document).off('click', '#contactBtn')
	$(document).off('click', '#BookRecrBtn')
	$(document).off('click', '#sendBtn')
	$(document).off('click', '#lessonLockBtn')
	$(document).off('click', '#quickLockBtn')
	$(document).off('click', '#addUserBtn')
	$(document).off('focusout', '.row_data')
}

function whichTrueWeek(day)
{
	switch(day) 
	{
		case "1Monday":
			return 1;
			break;
		case "2Tuesday":
			return 1;
			break;
		case "3Wednesday":
			return 1;
			break;
		case "4Thursday":
			return 1;
			break;
		case "5Friday":
			return 1;
			break;
		case "11Monday":
			return 2;
			break;
		case "22Tuesday":
			return 2;
			break;
		case "33Wednesday":
			return 2;
			break;
		case "44Thursday":
			return 2;
			break;
		case "55Friday":
			return 2;
			break;
	}
}

function ReloadRoom(Room, Week)
{

	loadinRoom(Room, overWriteTrueWeek)
	
}

function newWeekClear(DeletionMode)
{
	$("#userPermissionValue").removeAttr("keypress");
	clearProgressBar()
	
	var DayArray = ["1Monday","2Tuesday","3Wednesday","4Thursday","5Friday","11Monday","22Tuesday","33Wednesday","44Thursday","55Friday"] 
	
	var PeriodArray = ["Period1","Period2","Break","Period3","Period4","Lunch","Period5","Period6","AfterschoolH1","AfterschoolH2"]
	
	var RoomArray = ["Tech1","Tech2","Tech3","Tech4","Tech5","VR"]
	
	var i =0;
	var a =0;
	var b = 0;
	var checkVarInterval;
		
	var changingWeek = false;
	var changed = false; 
	
	var deleted = false; 
	var deleting = false;
	
	if(DeletionMode=="AlternateWeek")
	{
		$("#dConsoleTextWrite").html("")
		var oppositeLocalWeek;
		if(localStorageWeek=="1")
		{
			oppositeLocalWeek = "2"
		}
		else if(localStorageWeek=="2")
		{
			oppositeLocalWeek = "1"
		}
		
		$("#UserPermissionText").html("<br>$. Initiating Alternate Week....<br>");
		window.setTimeout(function(){
			$("#UserPermissionText").append("$. Current Week: "+localStorageWeek+" || ");
			$("#UserPermissionText").append("Next Week: "+oppositeLocalWeek+"<br>");
			window.setTimeout(function(){
				$("#UserPermissionText").append("$. You are calling this function off schedule <br>")
				$("#UserPermissionText").append("$. Are you sure you want to continue?(y/n): ")
				deleteConsoleScroll()
			},500)
		},500);
		
		$("#userPermissionValue").attr("contenteditable","true")
		$("#userPermissionValue").html("&nbsp;")
		$("#userPermissionValue").focus()
		
		$('#userPermissionValue').keypress(function (e) {
		 
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
			if($("#userPermissionValue").text().trim()=="yes" || $("#userPermissionValue").text().trim()=="y")
			{
				$("#userPermissionValue").attr("contenteditable","false")
				$("#myProgress").show()
				$("#CurrentWeek").html("<strong>&nbsp;Current Week: Editing....</strong>")
				checkTrueWeek()
			}
			else
			{
				$("#userPermissionValue").attr("contenteditable","false");
				$("#userPermissionValue").append("<br>$. Exiting...");
				deleteConsoleScroll()
				$("#myProgress").hide()
			}
		  }
		});
		
	}
	else if(DeletionMode=="MasterDelete")
	{
		$("#dConsoleTextWrite").html("")		
		$("#UserPermissionText").html("<br>$. Initiating Master Delete....<br>");
		window.setTimeout(function(){
			$("#UserPermissionText").append("$. This will delete all bookings indiscriminately <br>")
			$("#UserPermissionText").append("$. Are you sure you want to continue?(y/n): ")
			deleteConsoleScroll()
		},500);
		
		$("#userPermissionValue").attr("contenteditable","true")
		$("#userPermissionValue").html("&nbsp;")
		$("#userPermissionValue").focus()
		
		$('#userPermissionValue').keypress(function (e) {
		 
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
			if($("#userPermissionValue").text().trim()=="yes" || $("#userPermissionValue").text().trim()=="y")
			{
				$("#userPermissionValue").attr("contenteditable","false")
				$("#myProgress").show()
				loop1MasterDelete()
				widthChange=0.1851851667;
			}
			else
			{
				$("#userPermissionValue").attr("contenteditable","false");
				$("#userPermissionValue").append("<br>$. Exiting...");
				deleteConsoleScroll()
				$("#myProgress").hide()
			}
		  }
		});
	}
	else if(DeletionMode=="DeleteTech1")
	{
		deleteTechs("Tech1")	
	}
	else if(DeletionMode=="DeleteTech2")
	{
		
		deleteTechs("Tech2")
	}
	else if(DeletionMode=="DeleteTech3")
	{
		deleteTechs("Tech3")
	}
	else if(DeletionMode=="DeleteTech4")
	{
		deleteTechs("Tech4")
	}
	else if(DeletionMode=="DeleteTech5")
	{
		deleteTechs("Tech5")
	}
	else if(DeletionMode=="DeleteVR")
	{
		deleteTechs("VR")
	}
	
	function deleteTechs(Room)
	{
		$("#dConsoleTextWrite").html("")		
		$("#UserPermissionText").html("<br>$. Initiating Delete "+Room+"....<br>");
		window.setTimeout(function(){
			$("#UserPermissionText").append("$. This will delete all bookings in "+Room+" indiscriminately <br>")
			$("#UserPermissionText").append("$. Are you sure you want to continue?(y/n): ")
			deleteConsoleScroll()
		},500);
		
		$("#userPermissionValue").attr("contenteditable","true")
		$("#userPermissionValue").html("&nbsp;")
		$("#userPermissionValue").focus()
		
		$('#userPermissionValue').keypress(function (e) {
		 
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
			if($("#userPermissionValue").text().trim()=="yes" || $("#userPermissionValue").text().trim()=="y")
			{
				$("#userPermissionValue").attr("contenteditable","false")
				$("#myProgress").show()
				RoomArray =[Room]
				widthChange=1.1111155556;
				loop1MasterDelete()
			}
			else
			{
				$("#userPermissionValue").attr("contenteditable","false");
				$("#userPermissionValue").append("<br>$. Exiting...");
				deleteConsoleScroll()
				$("#myProgress").hide()
			}
		  }
		});
	}
	
	function checkTrueWeek()
	{
		$.ajax({
			type:'PATCH',
			url: API_URL_Tech1,
			data:JSON.stringify(
				{
					"Key":"Room",
					"Key2":"Day",
					"searchAttr":"CheckWeek",
					"searchAttr2":"CheckWeek"
				}
				),
			contentType:"application/json",
			success: function(data)
			{
				if(data.Items[0]["WeekCount"]=="1")
				{
					changeTrueWeek("2")	
					localStorage.setItem("weekValue","2")
					//alert("Changing LocalStorage: " + localStorage.getItem("weekValue"))
					localStorageWeek = "2"
					PushEditing("Editing")
				}
				else if(data.Items[0]["WeekCount"]=="2")
				{
					changeTrueWeek("1")
					localStorage.setItem("weekValue","1")
					//alert("Changing LocalStorage: " + localStorage.getItem("weekValue"))
					localStorageWeek = "1"
					PushEditing("Editing")
				}
				

				},
				error: function(data)
				{
					$("#errorModule").show();
				}
			});
	}
	
	function loop1ChangeWeek(nweek)
	{
		loop2ChangeWeek(nweek)
	}
	function loop2ChangeWeek(nweek1)
	{
		writeToDeleteConsole(RoomArray[i]+" "+DayArray[a])
		$.ajax({
		type:'PATCH',
		url: API_URL_Tech1,
		data:JSON.stringify(
			{
				"Key":"Room",
				"Key2":"Day",
				"searchAttr":RoomArray[i],
				"searchAttr2":DayArray[a]
			}
			),
		contentType:"application/json",
		success: function(data)
			{
				$.each(data.Items, function(index, val) 
				{
					loop3()
					function loop3()
					{
						deleteConsoleScroll()
						changed = false;
						changingWeek = false;
						
						checkVar()
						function checkVar()
						{
							writeToDeleteConsole("CheckingVar: "+val[PeriodArray[b]] + " " +PeriodArray[b])
							
							if(changed == true)
							{
								nextLoop3()
								return;
							}
							else
							{
								if(changingWeek == false)
								{
									if(a >= 5)
									{
										if(nweek1=="1")
										{
											newWeekCountChange(DayArray[a],RoomArray[i],"2")
										}
										else if(nweek1=="2")
										{
											newWeekCountChange(DayArray[a],RoomArray[i],"1")
										}		
									}	
									else
									{
										newWeekCountChange(DayArray[a],RoomArray[i],nweek1)
									}
									changingWeek = true;
								}
								checkVarInterval = window.setTimeout(checkVar,500);
							}
							
						}
						
					}
					
					function next()
					{
						a+=1;
						if (a < DayArray.length) 
						{   
							//alert(localStorageWeek)
							loop2ChangeWeek(localStorageWeek)
							writeToDeleteConsole("CallingLoop2")
						}
						else
						{
							a = 0
							if(i < 5)
							{
								i += 1;
								writeToDeleteConsole("CallingLoop1")
								loop1ChangeWeek(localStorageWeek)
							}
							else
							{
								i=0;
								a=0;
								b=0;
								if(nweek1=="1")
								{
									DayArray =["11Monday","22Tuesday","33Wednesday","44Thursday","55Friday"]
									
									loop1()
								}
								else if(nweek1=="2")
								{
									DayArray =["1Monday","2Tuesday","3Wednesday","4Thursday","5Friday"]	
									loop1()
								}
								writeToDeleteConsole("function finish excecution")
							}

						}
					}
					
					function nextLoop3()
					{
						b+=1
						moveProgressBar()
						if(b<10)
						{
							loop3();
						}
						else
						{
							b = 0;
							next();
						}
					}
					
				});
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	}
	
	function changeTrueWeek(newTWeek)
	{
		$.ajax({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
			{
				"Day":"CheckWeek",
				"Room":"CheckWeek",
				"updateAttr":"WeekCount",
				"updateValue":newTWeek
			}
			),

			contentType:"application/json",

			success: function(data)
			{
				loop1ChangeWeek(newTWeek)
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	}
	
	function newWeekCountChange(weekChangeDay, weekChangeRoom,weekCountChange)
	{
		$.ajax({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
			{
				"Day":weekChangeDay,
				"Room":weekChangeRoom,
				"updateAttr":"WeekCount",
				"updateValue":weekCountChange
			}
			),

			contentType:"application/json",

			success: function(data)
			{
				changed = true; 
				writeToDeleteConsole("weekChanged to: "+ weekCountChange)
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	}

	function loop1()
	{
		loop2()	
	}			
	function loop2()
	{
		writeToDeleteConsole(RoomArray[i]+" "+DayArray[a])
		$.ajax({
		type:'PATCH',
		url: API_URL_Tech1,
		data:JSON.stringify(
			{
				"Key":"Room",
				"Key2":"Day",
				"searchAttr":RoomArray[i],
				"searchAttr2":DayArray[a]
			}
			),
		contentType:"application/json",
		success: function(data)
			{
				$.each(data.Items, function(index, val) 
				{
					loop3()
					function loop3()
					{
						deleteConsoleScroll()
						deleted = false;
						deleting = false;
						checkVar()
						function checkVar()
						{
							writeToDeleteConsole("CheckingVar: "+val[PeriodArray[b]] + " " +PeriodArray[b])						
														
							if((val[PeriodArray[b]]!= "unbooked" && val[PeriodArray[b]].indexOf("lock1") == -1) && (val[PeriodArray[b]]!= "unbooked" && val[PeriodArray[b]].indexOf("lock2") == -1))
							{	
									if(deleted == true)
									{
										nextLoop3()
										return;
									}
									else
									{
										if(deleting == false)
										{
											writeToDeleteConsole("Deleting...: "+ DayArray[a]+" "+RoomArray[i]+" "+PeriodArray[b])
											excecuteDelete(DayArray[a],RoomArray[i],PeriodArray[b])
											deleting = true;
										}
										checkVarInterval = window.setTimeout(checkVar,500);
									}
									
							}
							else
							{	
								if(val[PeriodArray[b]]!= "unbooked" && (val[PeriodArray[b]].indexOf("lock1") >= 0 || val[PeriodArray[b]].indexOf("lock2") >=0 ))
								{
									
									var n = val[PeriodArray[b]].split(" ");
									var lastNum = n[n.length - 1];
									writeToDeleteConsole(lastNum)
									if(lastNum != "-1")
									{
										var lastIndex = val[PeriodArray[b]].lastIndexOf(" ");
										var newStr = val[PeriodArray[b]].substring(0, lastIndex);
										var newrBookWeek = newStr + " " + (parseInt(lastNum)-1).toString()
										if(deleted == true)
										{
											nextLoop3()
											return;
										}
										else
										{
											if(deleting == false)
											{
												writeToDeleteConsole("UpdatingArray...: "+ DayArray[a]+" "+RoomArray[i]+" "+PeriodArray[b])
												excecuteWeekUpdate(DayArray[a],RoomArray[i],PeriodArray[b],newrBookWeek)
												deleting = true;
											}
											checkVarInterval = window.setTimeout(checkVar,500);
										}
									}
									else
									{
										nextLoop3()	
									}
								}
								else
								{
									nextLoop3()	
									return;
								}
							}
						}
						
					}
					
					function next()
					{
						a+=1;
						if (a < DayArray.length) 
						{            
							loop2()
							writeToDeleteConsole("CallingLoop2")
						}
						else
						{
							a = 0
							if(i < 5)
							{
								i += 1;
								writeToDeleteConsole("CallingLoop1")
								loop1()
							}
							else
							{
								i =0;
								a =0;
								b = 0;
								localStorageWeek = null;
								checkWeekNum()
								checkVariable()
								function checkVariable() 
								{
									if (localStorageWeek != null) 
									{
										$("#CurrentWeek").html("<strong>&nbsp;Current Week: " + localStorageWeek+"</strong>")
									}
									else
									{
										setTimeout(checkVariable, 1000);
									}
								}
								PushEditing("Edited")
							}

						}
					}
					
					function nextLoop3()
					{
						b+=1
						moveProgressBar()
						if(b<10)
						{
							loop3();
						}
						else
						{
							b = 0;
							next();
						}
					}
					
				});
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	}
	
	function excecuteDelete(givenDay,givenRoom,givenPeriod)
	{
		writeToDeleteConsole("Deleting....")
		$.ajax
		({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
			{
				"Day":givenDay,
				"Room":givenRoom,
				"updateAttr":givenPeriod,
				"updateValue":"unbooked"
			}
			),

			contentType:"application/json",

			success: function(data)
			{
				deleted = true; 
				writeToDeleteConsole("Deleted")
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	}
	function excecuteWeekUpdate(givenDay,givenRoom,givenPeriod,newVal)
	{
		writeToDeleteConsole("Updating WeekStatus....")
		$.ajax
		({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
			{
				"Day":givenDay,
				"Room":givenRoom,
				"updateAttr":givenPeriod,
				"updateValue":newVal
			}
			),

			contentType:"application/json",

			success: function(data)
			{
				deleted = true; 
				writeToDeleteConsole("Updated")
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	}
	
	function loop1MasterDelete()
	{
		loop2MasterDelete()	
	}			
	function loop2MasterDelete()
	{
		writeToDeleteConsole(RoomArray[i]+" "+DayArray[a])
		$.ajax({
		type:'PATCH',
		url: API_URL_Tech1,
		data:JSON.stringify(
			{
				"Key":"Room",
				"Key2":"Day",
				"searchAttr":RoomArray[i],
				"searchAttr2":DayArray[a]
			}
			),
		contentType:"application/json",
		success: function(data)
			{
				$.each(data.Items, function(index, val) 
				{
					loop3()
					function loop3()
					{
						deleteConsoleScroll()
						deleted = false;
						deleting = false;
						checkVar()
						function checkVar()
						{
							writeToDeleteConsole("CheckingVar: "+val[PeriodArray[b]] + " " +PeriodArray[b])	
							if(val[PeriodArray[b]] != "unbooked")
							{
								if(deleted == true)
								{
									nextLoop3()
									return;
								}
								else
								{
									if(deleting == false)
									{
										writeToDeleteConsole("Deleting...: "+ DayArray[a]+" "+RoomArray[i]+" "+PeriodArray[b])
										excecuteDelete(DayArray[a],RoomArray[i],PeriodArray[b])
										deleting = true;
									}
									checkVarInterval = window.setTimeout(checkVar,500);
								}
							}
							else
							{
								nextLoop3()
							}
						}
						
					}
					
					function next()
					{
						a+=1;
						if (a < DayArray.length) 
						{            
							loop2MasterDelete()
							writeToDeleteConsole("CallingLoop2")
						}
						else
						{
							a = 0
							if(i < RoomArray.length-1)
							{
								i += 1;
								writeToDeleteConsole("CallingLoop1")
								loop1MasterDelete()
							}
							else
							{
								i =0;
								a =0;
								b = 0;
								writeToDeleteConsole("function finish excecution")
								PushEditing("Edited")
							}

						}
					}
					
					function nextLoop3()
					{
						b+=1
						if(b<10)
						{
							moveProgressBarMasterDelete()
							loop3();
						}
						else
						{
							b = 0;
							next();
						}
					}
					
				});
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	}
	
	function displayDefaultText()
	{
		$("#dConsoleText").append('<br><center><span>Timetable Management<br><br>Use this console to make large changes to the timetables<br><br>Every "Next Delete" Weeks will alternate. <br>The current week\'s quickbooks will be deleted</span></center>')
	}
}

function checkWeekNum()
{
	$.ajax({
		type:'PATCH',
		url: API_URL_Tech1,
		data:JSON.stringify(
			{
				"Key":"Room",
				"Key2":"Day",
				"searchAttr":"CheckWeek",
				"searchAttr2":"CheckWeek"
			}
			),
		contentType:"application/json",
		success: function(data)
		{
			localStorage.setItem("weekValue", data.Items[0]['WeekCount'])
			localStorageWeek = data.Items[0]['WeekCount']
			doneLoading = true;
		},
		error: function(data)
		{
			$("#errorModule").show();
		}
	});
}

function weekBeginNext()
{
	var nextWeekDate = new Date();
	var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
	nextWeekDate.setTime(nextWeekDate.getTime() + weekInMilliseconds);
	return getMonday(nextWeekDate) + " Week "+trueWeek
}
function weekBeginNow()
{
	return getMonday(new Date())+ " Week "+trueWeek
}
			
function moveProgressBar() 
{
  var elem = document.getElementById("myBar");   
  frame()
  function frame() {
    width+=0.1111111111; 
    elem.style.width = width + '%'; 
    elem.innerHTML = Math.round( width * 10 ) / 10 + '%';
  }
}
function moveProgressBarMasterDelete() 
{
  var elem = document.getElementById("myBar");   
  frame()
  function frame() {
	width+=widthChange;
    elem.style.width = width + '%'; 
    elem.innerHTML = Math.round( width * 10 ) / 10 + '%';
  }
}
function clearProgressBar()
{
	var elem = document.getElementById("myBar");
	elem.style.width = 0 + '%';
}

function writeToDeleteConsole(Text)
{
	$("#dConsoleTextWrite").append(Text+"<br>")
}

function deleteConsoleScroll()
{
	$('#DeleteConsole').animate({scrollTop: $('#DeleteConsole').prop("scrollHeight")}, 10);
}

function checkIfEditing()
{
	$.ajax({
		type:'PATCH',
		url: API_URL_Tech1,
		data:JSON.stringify(
			{
				"Key":"Room",
				"Key2":"Day",
				"searchAttr":"EditStatus",
				"searchAttr2":"EditStatus"
			}
			),
		contentType:"application/json",
		success: function(data)
		{
			EditStatus = data.Items[0]['Status']
		},
		error: function(data)
		{
			$("#errorModule").show();
		}
	});
}

function PushEditing(NewStatus)
{
	$.ajax
		({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
			{
				"Day":"EditStatus",
				"Room":"EditStatus",
				"updateAttr":"Status",
				"updateValue":NewStatus
			}
			),

			contentType:"application/json",

			success: function(data)
			{
				console.log("Sucessfully Pushed Data");
			},
			error: function(data)
			{
				window.setTimeout(function(){
					PushEditing(NewStatus);
				},3000)
			}
		});
}