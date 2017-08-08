  
var AllInfo = [];
var PresentUserIndex =0;
// function to save user data to local storage
var saveUserDataToLocalStorage = function () {

    window.localStorage['userData'] = angular.toJson(AllInfo);
    console.log("users saved to local storage : ");
    console.log(AllInfo);
};

// controller for login and sign up
 app.controller('LoginController', ['$scope', '$location', '$http', function($scope, $location, $http){
    // loading data from data.json file
       console.log("in login controller");
     // to dooo if no data in local storage then ajax and save to local else get data from local storage
     
         $http.get("data.json")
            .then(function(response) {
                    AllInfo = response.data;
        console.log("in login controller reading json data and saving to globall AllInfo array");
        console.log(AllInfo);
         }); 
     
     // on button click sign in
        $scope.signin = function(){
            
            for(var i = 0; i < AllInfo.length; i++){
                if( ( ( (AllInfo[i].username) || (AllInfo[i].email) ) == $scope.useremail )  && ((AllInfo[i].password) == $scope.loginpassword ))
                {
                    // saving present user index
                    PresentUserIndex = i;
                console.log("saving the Present User's Index");
                console.log(PresentUserIndex);    
                 // redirecting to the home page of user
                    $location.url("home");
                console.log("in login controller and redirected  to home page of user");  
                }
                else {
                $scope.ErrorSignInMessage = "Incorrect email or password";
                }
            }                                     
        };
     // on button click of sign up of saving data to object array 
        $scope.signup = function(){
            
            var NewUserObj = 
              {
                id: "a00" + AllInfo.length,
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                phone: $scope.phone,
                location: $scope.location,
                username: $scope.username,
                password: $scope.password
              }
            //saving new user data to the new object
        console.log("Saving new user data to the new object");
        console.log(NewUserObj);         
            AllInfo.push(NewUserObj);   
        console.log("Json Array after pushing new Object");    
        console.log(AllInfo);    
          };
    }]);

// controller for home page
 app.controller('HomeController', ['$scope', function($scope){

        console.log("in home controller"); 
           $scope.firstname = AllInfo[PresentUserIndex].firstname;
        console.log(AllInfo[PresentUserIndex].firstname);
        console.log($scope.firstname);  
     
    }]);

// controller for displaying Profile page with methods to update profile details
 app.controller('ProfileController', ['$scope', function($scope){ 
       
      console.log("in profile controller");
       
       // displaying data to profile page
       
         $scope.firstname =  AllInfo[PresentUserIndex].firstname;
         $scope.lastname =  AllInfo[PresentUserIndex].lastname;
         $scope.email =  AllInfo[PresentUserIndex].email;
         $scope.phone =  AllInfo[PresentUserIndex].phone;
         $scope.location =  AllInfo[PresentUserIndex].location;
         $scope.username =  AllInfo[PresentUserIndex].username;
      
       // disable the email option on edit 
            $scope.editemail = true;
       
     // message for editing  profile data
        $scope.UpdateProfile = function() {
            var EditUserObj = 
              {
                id: AllInfo[PresentUserIndex].id,
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                phone: $scope.phone,
                location: $scope.location,
                username: $scope.username,
                password: $scope.password
              }
            //saving new user data to the new object
        console.log("Saving new user data to the new object");
        console.log(EditUserObj);         
            AllInfo[PresentUserIndex] = EditUserObj;   
        console.log("Json Array after pushing updated Object");    
        console.log(AllInfo);    
          };     
     
    }]);

// controller for displaying messages
app.controller('MessageController',['$scope', '$stateParams', '$state', function ($scope) {
    console.log("in message controller"); 
  $scope.tabs = [
    { state:'messages.newmail', name:'New Mail'},
    { state:'messages.inbox', name:'Inbox'},
    { state:'messages.sent', name:'Sent'}  
 ];
   
}]); 

// controller for creating new mail

app.controller('NewMailController', ['$scope', function($scope){
        
      console.log("in new email controller"); 
     
    }]);

// controller for displaying inbox messages
app.controller('InboxController', ['$scope', function($scope){
    
    $scope.replyarea=true;
      console.log("in Inbox controller"); 
    $scope.inboxMsgs = AllInfo[PresentUserIndex].received_messages;
    // display first msg by default
    var index =0;
    var sId = AllInfo[PresentUserIndex].received_messages[index].sender_id;
    console.log("displaying first msg");
          $scope.senderemail = AllInfo[PresentUserIndex].received_messages[index].sender_email;
          $scope.sendername = AllInfo[PresentUserIndex].received_messages[index].sender_name;
       // console.log(sendername);
          $scope.time = AllInfo[PresentUserIndex].received_messages[index].created_at;   
          $scope.title = AllInfo[PresentUserIndex].received_messages[index].title; 
          $scope.body = AllInfo[PresentUserIndex].received_messages[index].msg;       
    
    
  // function to display clicked msg details    
    $scope.ViewMsg = function(index) {  
        console.log("in viewing function ");
            sId = AllInfo[PresentUserIndex].received_messages[index].sender_id;
        console.log(sId);
          $scope.senderemail = AllInfo[PresentUserIndex].received_messages[index].sender_email;
          $scope.sendername = AllInfo[PresentUserIndex].received_messages[index].sender_name;
       // console.log(sendername);
          $scope.time = AllInfo[PresentUserIndex].received_messages[index].created_at;   
          $scope.title = AllInfo[PresentUserIndex].received_messages[index].title; 
          $scope.body = AllInfo[PresentUserIndex].received_messages[index].msg;  
        };
    
         // function on click of reply 
            $scope.sendreply = function(){
                
                console.log("in reply function");
                var msg ={ 
                    "receiver_id": sId,
                    "receiver_email": $scope.replyemail, 
                    "receiver_name": $scope.sendername,  
                    "title": $scope.replytitle,
                    "msg": $scope.replymsg,
                    "important": true,
                    "created_at": new Date()
                }; 
                
                //method to fetch receiverindex 
            var recIndex = function(){
                
               for(var i = 0; i < AllInfo.length; i++)
               {
                if(((AllInfo[i].id) == $scope.replyemail) )
                 {
                  // saving present user index
                    //receiverIndex = i;
                console.log("saving the receiver Index");
                console.log(i);  
                     return i;
                }  
               }
            };
                console.log(AllInfo[PresentUserIndex].sent_messages);
                console.log(msg);
             AllInfo[PresentUserIndex].sent_messages.push(msg);
                  console.log(AllInfo[PresentUserIndex].sent_messages);
            AllInfo[recIndex()].received_messages.push(msg);  
                   console.log("displaying receriver indexs received msgs object");
                   console.log(AllInfo[recIndex()].received_messages);
                $scope.replyarea=true;  
            };
    
             
    
         $scope.reply = function(){
             
                $scope.replyarea=false;
             console.log("in reply toggle show");
         };
         $scope.cancel =function(){
             $scope.replyarea=true;
         };
   
      
    }]);

// controller for displaying  sent messages
app.controller('SentMsgController', ['$scope', function($scope){
    
             console.log("in SentMsg controller"); 
    $scope.sentMsgs = AllInfo[PresentUserIndex].sent_messages;
// display first msg by default
    var index =0;
     console.log("displaying first msg");
          $scope.receiveremail = AllInfo[PresentUserIndex].sent_messages[index].receiver_email;    
          $scope.receivername = AllInfo[PresentUserIndex].sent_messages[index].receiver_name;
          $scope.time = AllInfo[PresentUserIndex].sent_messages[index].created_at;   
          $scope.title = AllInfo[PresentUserIndex].sent_messages[index].title; 
          $scope.body = AllInfo[PresentUserIndex].sent_messages[index].msg;  
    
 // function to display clicked msg details
    $scope.ViewMsg = function(index) {
        console.log("in viewing function ");
          var recId = AllInfo[PresentUserIndex].sent_messages[index].receiver_id;
        console.log(recId);
          $scope.receiveremail = AllInfo[PresentUserIndex].sent_messages[index].receiver_email;
          $scope.receivername = AllInfo[PresentUserIndex].sent_messages[index].receiver_name;
          $scope.time = AllInfo[PresentUserIndex].sent_messages[index].created_at;   
          $scope.title = AllInfo[PresentUserIndex].sent_messages[index].title; 
          $scope.body = AllInfo[PresentUserIndex].sent_messages[index].msg;       
        };
    
    }]);

// controller for displaying messages
app.controller('LogoutController', ['$scope', function($scope){
      console.log("in logout controller"); 
     
    }]);

