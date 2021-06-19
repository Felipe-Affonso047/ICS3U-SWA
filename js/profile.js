async function getUser(email_address) {
      // get the user info from API

      const api_url = 'https://uywqohm9s0.execute-api.us-east-1.amazonaws.com/prod/user-profile?user_email=' + email_address;
      const api_response = await fetch(api_url);
      const api_data = await(api_response).json();

      console.log(api_data);

      const div_user_info = document.getElementById('profile');
      div_user_info.innerHTML = api_data['body'];
    }
  
    var data = {
      UserPoolId : _config.cognito.userPoolId,
      ClientId : _config.cognito.clientId
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    var cognitoUser = userPool.getCurrentUser();

  window.onload = function(){
    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          alert(err);
          return;
        }
        console.log('session validity: ' + session.isValid());

        //get user info, to show that you are logged in
        cognitoUser.getUserAttributes(function(err, result) {
          if (err) {
            console.log(err);
            return;
          }

          //User email address
          var user;
          user = result[2].getValue();

          console.log(user);

          getUser(user);
        });
      });
    } else {
      console.log("You are signed-out");
    }
  }