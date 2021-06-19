// JavaScript File
		
async function getUser(email_address) {
    // get the user info from API Gate
    
    const api_url = 'https://uywqohm9s0.execute-api.us-east-1.amazonaws.com/prod/user-profile?user_email=' + email_address;
    const api_response = await fetch(api_url);
    const api_data = await(api_response).json();
    console.log(api_data);
    
    const json_profile = JSON.parse(api_data['body']);
    const div_user_profile_email = document.getElementById('profile_email');
    const div_user_profile_first_name = document.getElementById('profile_first_name');
    const div_user_profile_last_name = document.getElementById('profile_last_name');
    const div_user_profile_age = document.getElementById('profile_age');
    
    div_user_profile_email.innerHTML = json_profile['email'];
    div_user_profile_first_name.innerHTML = json_profile['first_name'];
    div_user_profile_last_name.innerHTML = json_profile['last_name'];
    div_user_profile_age.innerHTML = json_profile['age'];
    document.getElementById("profile").innerHTML = api_data['body'];
  }
  
function getUserAttributes() {
	var data = { 
		UserPoolId : _config.cognito.userPoolId,
    ClientId : _config.cognito.clientId
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
	var cognitoUser = userPool.getCurrentUser();

	if (cognitoUser != null) {
  	cognitoUser.getSession(function(err, session) {
      if (err) {
      	alert(err);
        return;
      }
      //console.log('session validity: ' + session.isValid());
      
      cognitoUser.getUserAttributes(function(err, result) {
				if (err) {
					console.log(err);
					return;
				}
				// user email address
				var user;
        user = result[2].getValue();

        var profile_pic = "https://8nyv2cxlb3.execute-api.us-east-1.amazonaws.com/prod/user-profile-pic=" + user;

        document.getElementById("profile_pic").innerHTML = profile_pic["encoded_image"];

        console.log(user);
        console.log(profile_pic);

        getUser(user);
			});

  	});
	} else {
		console.log("Already signed-out");
	}
}