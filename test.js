document.addEventListener("DOMContentLoaded", function() {
    // Get the dark mode preference from localStorage
    var isDarkMode = localStorage.getItem("darkMode") === "true";
    var darktoggle = document.getElementById("darktoggle");
    var moonIcon = darktoggle.querySelector(".moon-icon");
    var sunIcon = darktoggle.querySelector(".sun-icon");
    var linksName = darktoggle.querySelector(".links_name");
    var logoImage = document.getElementById("myImg");
  
    
    // Apply dark mode if the preference is true
    if (isDarkMode) {
        document.body.classList.add("dark-theme");
        moonIcon.style.display = "none";
        sunIcon.style.display = "inline-block";
        linksName.textContent = "Light mode"; // Change text to "Light mode"
        logoImage.src = "/untitled(6).gif"; // Change the image source for dark mode
    } else {
        linksName.textContent = "Dark mode"; // Default text
    }
  
    // Toggle dark mode on click and save preference to localStorage
    darktoggle.onclick = function() {
        document.body.classList.toggle("dark-theme");
        isDarkMode = document.body.classList.contains("dark-theme");
        localStorage.setItem("darkMode", isDarkMode);
  
        // Toggle between moon and sun icons
        moonIcon.style.display = isDarkMode ? "none" : "inline-block";
        sunIcon.style.display = isDarkMode ? "inline-block" : "none";
  
        // Toggle text between "Dark mode" and "Light mode"
        linksName.textContent = isDarkMode ? "Light mode" : "Dark mode";
  
        // Toggle text color
        linksName.style.color = isDarkMode ? "#ffffff" : "#1d1d1f";
  
        // Change the image source based on dark mode
        logoImage.src = isDarkMode ? "/untitled(6).gif" : "/images/untitled-3--unscreen.gif";
    };
  });
  // Initialize Firebase with your configuration
  const firebaseConfig = {
      apiKey: "AIzaSyDukZh29Uk8aJISSuGyBDRgMYfu4NrNmVQ",
      authDomain: "html-firebase-34ba4.firebaseapp.com",
      databaseURL: "https://html-firebase-34ba4-default-rtdb.firebaseio.com",
      projectId: "html-firebase-34ba4",
      storageBucket: "html-firebase-34ba4.appspot.com",
      messagingSenderId: "162378750231",
      appId: "1:162378750231:web:bc71c70cea473b8604ff52",
      measurementId: "G-F31ZQ47EEY"
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  
  // Firebase authentication function - Sign In or Sign Up
  function authenticateUser(action) {
  
      const confirm = document.getElementById('confirmPassword').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const signupPassword = document.getElementById('signupPassword').value;
      const signupemail = document.getElementById('signupEmail').value;
      const username = document.getElementById('username').value;
      const termscond = document.getElementById('termCon');
  
      
      if (action === 'login') {
          // Sign In
          firebase.auth().signInWithEmailAndPassword(email, password)
              .then((userCredential) => {
                  alert("Login successful!");
                  
                  // Retrieve username from the user's display name
                  const username = userCredential.user.displayName;
                  
                  // Log the username to the console
                  console.log('Username:', username);
      
                  // Redirect or perform other actions upon successful login
              })
              .catch((error) => {
                  // Handle login errors
                  alert(error.message);
              });
      } else {
          if (!termscond.checked) {
              alert("Please agree to the Terms of Service before proceeding.");
              return;
          }
          // Sign Up
          if (signupPassword !== confirm) {
              alert("Passwords do not match");
              console.log('Password:', signupPassword);
              console.log('Confirm Password:', confirm);
              return;
          }
          // Add a check to ensure the username is provided during signup
          if (!username) {
              alert("Please enter a username.");
              return;
          }
  
          firebase.auth().createUserWithEmailAndPassword(signupemail, signupPassword)
          .then((userCredential) => {
              const userId = userCredential.user.uid; // Get the unique user ID
              const database = firebase.database();
              
              // Set the username in the user's display name
              userCredential.user.updateProfile({
                  displayName: username   
              })
              .then(() => {
                  // Send verification email
                  userCredential.user.sendEmailVerification()
                      .then(() => {
                          alert("Sign up successful! Verification email sent.");
  
                          // Save user data to the database using the unique user ID
                          const userRef = database.ref('users/' + userId);
                          const userData = {
                              email: signupemail,
                              username: username,
                              password: signupPassword
  
                              // You might want to add more user-related data here
                          };
                          userRef.set(userData);
                          
                          // Clear input fields
                          document.getElementById('signupEmail').value = '';
                          document.getElementById('signupPassword').value = '';
                          document.getElementById('username').value = '';
                      })
                      .catch((error) => {
                          alert("Error sending verification email: " + error.message);
                      });
              })
              .catch((error) => {
                  alert("Error setting username: " + error.message);
              });
          })
          .catch((error) => {
              // Handle signup errors
              if (error.code === 'auth/email-already-in-use') {
                  alert("Email is already in use. Please use a different email.");
              } else {
                  alert(error.message);
              }
          });
          
  }
  
  }
    document.addEventListener("DOMContentLoaded", function () {
      const forgotPasswordLink = document.getElementById("forgotPassword");
  
      forgotPasswordLink.addEventListener("click", function () {
        // Get the user's email from the email input field
        const email = document.getElementById("email").value;
  
        // Send a password reset email to the user
        firebase.auth().sendPasswordResetEmail(email)
          .then(function () {
            // Password reset email sent successfully
            alert("Password reset email sent. Check your email inbox.");
          })
          .catch(function (error) {
            // Handle errors (e.g., user not found)
            console.error("Error sending password reset email:", error.message);
            alert("Error, Please put your email in the email section!");
          });
      });
    });
  // ---------
  
  function updateUI(user) {
      const profileDiv = document.getElementById('profileDiv');
      const logOutIcon = document.getElementById('log_out');
  
      if (user) {
          // User is signed in
          profileDiv.innerHTML = `
              <div class="profile-details">
                  <img src="/images/banner.jpg" alt="profileImg">
                  <div class="name_job">
                      <div class="name">Welcome back,</div>
                      <div style="color: var(--text); class="job">${user.displayName}</div>
                  </div>
              </div>
          `;
          // Add a click event listener for redirection
          profileDiv.addEventListener('click', function() {
  
              window.location.href = '/settings.html';
          });
  
          // Add click event listener for log out
          logOutIcon.addEventListener('click', function() {
              firebase.auth().signOut()
                  .then(() => {
                      // Log out successful
                      console.log("User signed out");
                      // You can redirect the user or perform other actions after log out
                  })
                  .catch((error) => {
                      // An error happened
                      console.error("Error signing out:", error);
                  });
          });
      } else {
          // User is signed out
          profileDiv.innerHTML = `
              <div class="profile-details">
                  <img src="/images/banner.jpg" alt="profileImg">
                  <div class="name_job">
                  <div style="color: var(--text);" class="name">Log in</div>
                  <div class="job"></div>
                  </div>
              </div>
          `;
  
                    profileDiv.addEventListener('click', function() {
                    sidebar.classList.toggle("open"); 
              closeBtn.style.transform = "translateX(0)";
          mydiv.style.display = mydiv.style.display === 'none' ? 'block' : 'none';
          menuBtnChange(); // calling the function (optional)
          document.addEventListener('DOMContentLoaded', function() {
              var mydiv = document.getElementById('mydiv');
              var profileDiv = document.getElementById('profileDiv');
              profileDiv.addEventListener('click', function(event) {
                // Toggle mydiv visibility
                mydiv.style.display = mydiv.style.display === 'none' ? 'block' : 'none';
                event.stopPropagation(); // Prevents the click event from reaching the document
              });
        
              document.addEventListener('click', function(event) {
                // Check if the click is outside the "mydiv" and "profilediv"
                if (!mydiv.contains(event.target) && event.target !== profileDiv) {
                  mydiv.style.display = 'none';
                  
                }
               
              });
        // Retrieve Data from the "test" path
  
              // Prevent clicks inside the "mydiv" from triggering the document click event
              mydiv.addEventListener('click', function(event) {
                event.stopPropagation();
              });
            });
          });
  
          // Remove click event listener for log out
          logOutIcon.removeEventListener('click', function() {
              // Remove any click event listener
          });
      }
  }
  
  // Check if the user is already signed in on page load
  firebase.auth().onAuthStateChanged((user) => {
      updateUI(user);
  });
  
  // ... (Your existing code)
  
    // Close the results container when clicking outside of the entire nav-list
    document.addEventListener('click', function(event) {
      var resultsContainer = document.getElementById('autofillResults');
    
      if (!resultsContainer.contains(event.target)) {
          resultsContainer.style.display = 'none';
          console.log("assadasd")
      }
    });
  
  // Example usage of document.getElementById to access elements
  var loginButton = document.getElementById('loginButton');
  var signupButton = document.getElementById('signupButton');
  var forgotPasswordLink = document.getElementById('forgotPassword');
  var SignUpBtn = document.getElementById('SignUpBtn');
  var loginLink = document.getElementById('loginLink');
  const container = document.querySelector(".formcontainer"),
        pwShowHide = document.querySelectorAll(".showHidePw"),
        pwFields = document.querySelectorAll(".password"),
        signUp = document.querySelector(".signup-link"),
        login = document.querySelector(".login-link");
  
  // Add event listeners to the buttons and links
  loginButton.addEventListener('click', function () {
      authenticateUser('login');
  });
  
  signupButton.addEventListener('click', function () {
      authenticateUser('signup');
  });
  
  forgotPasswordLink.addEventListener('click', function () {
      // Handle forgot password link click (replace this with your actual forgot password logic)
      console.log('Forgot password link clicked');
  });
  
  SignUpBtn.addEventListener('click', function () {
      // Handle signup link click (replace this with your actual signup link logic)
      console.log('Signup link clicked');
      container.classList.add("active");
  });
  
  loginLink.addEventListener('click', function () {
      login.addEventListener("click", ( )=>{
          container.classList.remove("active");
      });    console.log('Login link clicked');
  });
  
      
  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  
  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function (optional)
  });
  
  document.addEventListener('click', function(event) {
    var isClickInsideSidebar = sidebar.contains(event.target);
    var isClickOnButton = event.target === closeBtn;
  
    if (!isClickInsideSidebar && !isClickOnButton) {
      // Clicked outside the sidebar and not on the button, close it
      sidebar.classList.remove("open");
      menuBtnChange(); // calling the function (optional)
    }
  }); 
  document.addEventListener('click', function(event) {
      var isClickInsideSidebar = mydiv.contains(event.target);
      var isClickOnButton = profileDiv.contains(event.target);
    
      if (!isClickInsideSidebar && !isClickOnButton) {
          mydiv.style.display = 'none';
      }
      else {
          mydiv.style.display = 'block';
  
      }
    }); 
  // Retrieve Data from the "test" path
  
  // Retrieve Data from the "test" path
  const database = firebase.database();
  const testRef = database.ref('/test');
  
  const fromText = document.querySelector(".from-text");
  const toText = document.querySelector(".to-text");
  const exchageIcon = document.querySelector(".exchange");
  const selectTag = document.querySelectorAll("select");
  const icons = document.querySelectorAll(".row i");
  const translateBtn = document.querySelector("button");
  
  selectTag.forEach((tag, id) => {
      for (let country_code in countries) {
          let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
          let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
          tag.insertAdjacentHTML("beforeend", option);
      }
  
      // Add event listener for language selection change
      tag.addEventListener("change", () => {
          const selectedLanguage = tag.value;
  
          // Update the Firebase database with the selected language
          testRef.update({ selectedLanguage })
              .then(() => {
                  console.log("Selected language updated in Firebase:", selectedLanguage);
              })
              .catch(error => {
                  console.error("Error updating selected language in Firebase:", error);
              });
      });
  });
  
  
  exchageIcon.addEventListener("click", () => {
      let tempText = fromText.value,
          tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = tempText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;
  });
  
  fromText.addEventListener("keyup", () => {
      if (!fromText.value) {
          toText.value = "";
      }
  });
  
  // Listen for changes in the "test" path
  testRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
          // Assuming you have a property called "text" in your Firebase data
          const newText = data.text;
          // Update the fromText value with the new text
          fromText.value = data;
          console.log(data);
      }
  });
  
  translateBtn.addEventListener("click", () => {
      let text = fromText.value.trim(),
          translateFrom = selectTag[0].value,
          translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute("placeholder", "Translating...");
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      
      console.log("API URL:", apiUrl);
  
      fetch(apiUrl)
          .then(res => res.json())
          .then(data => {
              console.log("Translation API Response:", data);
  
              if (data && data.responseData && data.responseData.translatedText) {
                  toText.value = data.responseData.translatedText;
              } else if (data && data.matches && data.matches.length > 0 && data.matches[0].translation) {
                  toText.value = data.matches[0].translation;
              } else {
                  console.error("Translation not found in API response:", data);
              }
  
              toText.setAttribute("placeholder", "Translation");
          })
          .catch(error => {
              console.error("Error during translation:", error);
              toText.setAttribute("placeholder", "Translation Error");
          });
  });
  
  
  
      // --------
      const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");
  
  let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
  
  const showHideIcons = () => {
      // showing and hiding prev/next icon according to carousel scroll left value
      let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
      arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
      arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
  }
  
  arrowIcons.forEach(icon => {
      icon.addEventListener("click", () => {
          let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
          // if clicked icon is left, reduce width value from the carousel scroll left else add to it
          carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
          setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
      });
  });
  
  const autoSlide = () => {
      // if there is no image left to scroll then return from here
      if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
  
      positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
      let firstImgWidth = firstImg.clientWidth + 14;
      // getting difference value that needs to add or reduce from carousel left to take middle img center
      let valDifference = firstImgWidth - positionDiff;
  
      if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
          return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
      }
      // if user is scrolling to the left
      carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
  
  const dragStart = (e) => {
      // updatating global variables value on mouse down event
      isDragStart = true;
      prevPageX = e.pageX || e.touches[0].pageX;
      prevScrollLeft = carousel.scrollLeft;
  }
  
  const dragging = (e) => {
      // scrolling images/carousel to left according to mouse pointer
      if(!isDragStart) return;
      e.preventDefault();
      isDragging = true;
      carousel.classList.add("dragging");
      positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
      carousel.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
  }
  
  const dragStop = () => {
      isDragStart = false;
      carousel.classList.remove("dragging");
  
      if(!isDragging) return;
      isDragging = false;
      autoSlide();
  }
  
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);
  
  document.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);
  
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchend", dragStop);
  window.addEventListener('load', () => {
    registerSW();
  });
  
  // Register the Service Worker
  async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator
              .serviceWorker
              .register('serviceworker.js');
      }
      catch (e) {
        console.log('SW registration failed');
      }
    }
  }
  
  // ------
      //   js code to show/hide password and change icon
      pwShowHide.forEach(eyeIcon =>{
          eyeIcon.addEventListener("click", ()=>{
              pwFields.forEach(pwField =>{
                  if(pwField.type ==="password"){
                      pwField.type = "text";
  
                      pwShowHide.forEach(icon =>{
                          icon.classList.replace("uil-eye-slash", "uil-eye");
                      })
                  }else{
                      pwField.type = "password";
  
                      pwShowHide.forEach(icon =>{
                          icon.classList.replace("uil-eye", "uil-eye-slash");
                      })
                  }
              }) 
          })
      })
  
      // js code to appear signup and login form
      signUp.addEventListener("click", ( )=>{
          container.classList.add("active");
      });
      login.addEventListener("click", ( )=>{
          container.classList.remove("active");
      });
  
          // Attach the scroll event listener to the window
          window.addEventListener("scroll", handleScroll);
          function menuBtnChange() {
            if (sidebar.classList.contains("open")) {
              closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
              closeBtn.style.transform = "translateX(180px)";
            } else {
              closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
              closeBtn.style.transform = "translateX(0)";
              
              
            }
          }
          function autofill() {
              var input = document.getElementById('searchInput');
              var resultsContainer = document.getElementById('autofillResults');
              var inputValue = input.value.trim().toLowerCase();
            
              // Clear previous results
              resultsContainer.innerHTML = '';
            
              // Check if the input is not empty
              if (inputValue.length > 0) {
                // Simulate fetching results (you can replace this with an AJAX call)
                var simulatedResults = [
                  { text: 'Shop', url: '/shop.html' },
                  { text: 'Settings', url: '/settings.html' },
                  { text: 'Home', url: '/index.html' },
                  { text: 'About Us', url: '/aboutme.html' },
                  { text: 'Dashboard', url: '/Dashboard.html' },
                  { text: 'Support', url: '/support.html' }
  
                ];
            
      // Filter results based on the input value
      var filteredResults = simulatedResults.filter(function(result) {
          return result.text.toLowerCase().includes(inputValue);
        });
    
        // Display filtered results
        filteredResults.forEach(function(result) {
          var li = document.createElement('li');
          li.textContent = result.text;
          li.onclick = function() {
            // Redirect to the specified URL when the result is clicked
            window.location.href = result.url;
          };
          resultsContainer.appendChild(li);
        });
    
        // Show the results container
        resultsContainer.style.display = 'block';
      } else {
        // Hide the results container if the input is empty
        resultsContainer.style.display = 'none';
      }
  
      
    }
    
  
  