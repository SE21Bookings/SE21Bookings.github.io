var AdmimUserpoolID = "ap-southeast-1_5uiXeZzFB";
var AdminAppClientID = "2qis1u4uur3e17ua9a28r7b6ol";

var slideIndex = 1;
var email;



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
			checkWhichUser()
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
				console.log('call result: ' + (result.message || JSON.stringify(result)));
				$("#ForgotPasswordErrMsg").html("");
				plusDivs(1);
			},
			onFailure: function(err) {
				console.log((err.message || JSON.stringify(err)));
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
	if(getEmail()=="SE21Admin")
	{
		//do something
	}
	else
	{
		self.location="Pages/Make_Booking.html"
	}
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

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event)
{
	if (event.target == modal) 
	{
		modal.style.display = "none";
	}
	else if (event.target == emailmodal) {
        emailmodal.style.display = "none";
    }
	else if (event.target == Rbook) {
        Rbook.style.display = "none";
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
    if( day !== 2 ) 
        date.setHours(-24 * (day - 2)); 
	
	date = date.toUTCString();
	date = date.split(' ').slice(0, 4).join(' ');
    return date;
}

function manipulateDayWeek1(day)
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

function manipulateDayWeek2(day)
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
}