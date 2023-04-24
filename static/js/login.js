
// var api="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"
function showlogin() {
             
    /* show login popup when login link is clicked */
   
   document.getElementById("login-link").addEventListener("click", function() {
     document.getElementById("login-popup").classList.add("show");
   });
   
   /* hide login popup when close button is clicked */
   
   document.querySelector(".close-btn").addEventListener("click", function() {
     document.getElementById("login-popup").classList.remove("show");
   });

  }



  function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if (username == "" || password == "") {
      alert("Please enter both username and password");
      return false;
    } 
  
    // Send an AJAX request to the Flask endpoint to validate the credentials
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/validate", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // If the credentials are valid, redirect to the home page
          window.location.href = "/index";
        } else {
          alert(response.message);
        }
      }
    };
    xhr.send(JSON.stringify({username: username, password: password}));
  
    return false; // Prevent the form from submitting
  }
  
  function logout() {
    // Clear session on the server side
    
        // Clear session on the client side
        sessionStorage.clear();
        
        // Remove the logout page from the browser history
        history.replaceState(null, null, '/');
        
        // Redirect to the login page
        window.location.href = '/';
      
  }
