// JavaScript File
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

        // sign out
        cognitoUser.signOut();
        console.log("Signed-out");
      });
    } else {
      console.log("Already signed-out")
  }
}