var AdmimUserpoolID = "eu-central-1_WYExJawO8";
var AdminAppClientID = "4tuportgn3gi4qjniq8on33e5g";

var slideIndex = 1;

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
			localStorage.setItem("JwtToken",accessToken)
			decodeJWT(localStorage.getItem("JwtToken"))
			whatUser(localStorage.getItem("JwtToken"))
        },
        onFailure: function(err) {
			document.getElementById("signInErrMsg").style.color="red"
            document.getElementById("signInErrMsg").innerHTML=(err.message || JSON.stringify(err));
        }
    });
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

function whatUser(jwtToken) // checks what user it is, and whether or not it is a master user
{
	const tokenParts = jwtToken.split('.');
	const encodedPayload = tokenParts[1];
	const rawPayload = atob(encodedPayload);
	const user = JSON.parse(rawPayload);
	
	if(user.username == "SE21Admin")
	{
		//Do Stuff For Admin
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
