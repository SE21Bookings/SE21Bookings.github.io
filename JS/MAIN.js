var AdmimUserpoolID = "eu-central-1_u2KvNn6XU";
var AdminAppClientID = "7bol71nuc83cbltle8quq5alqn";

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
			alert("Sucess!")
			localStorage.setItem("JwtToken",accessToken)
			decodeJWT(localStorage.getItem("JwtToken"))
			whatUser(localStorage.getItem("JwtToken"))
        },
        onFailure: function(err) {
            document.getElementById("signInErrMsg").innerHTML=(err.message || JSON.stringify(err));
        }
    });
}

function createNewUser(username,password,emails) //CreateNewUser
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

    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            document.getElementById("signUpErrMsg").innerHTML=(err.message || JSON.stringify(err));
            return;
        }
        cognitoUser = result.user;
		document.getElementById("signUpErrMsg").style.color="green";
        document.getElementById("signUpErrMsg").innerHTML=("Welcome! "+ cognitoUser.getUsername() + " Please access your email to verify your account");
    });
}

function whatUser(jwtToken) // checks what user it is, and whether or not it is a master user
{
	const tokenParts = jwtToken.split('.');
	const encodedPayload = tokenParts[1];
	const rawPayload = atob(encodedPayload);
	const user = JSON.parse(rawPayload);
	
	if(user.username == "KMAdmin")
	{
		openInNewTab("Pages/AdminCreateMaster.html")
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

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}