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

firebase.initializeApp(firebaseConfig);

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


icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (!fromText.value || !toText.value) return;
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });  
});

function showSignUpForm() {
    document.getElementById('id01').style.display = 'none';
    document.getElementById('id02').style.display = 'block';
  }
  
  function showLogInForm() {
    document.getElementById('id01').style.display = 'block';
    document.getElementById('id02').style.display = 'none';
  }
  

  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let searchBtn = document.querySelector(".bx-search");
  
  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
  });
  
  searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
  });
  


  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
  
    // Set a threshold value for when to change the button color
    const threshold = 700;
  
    if (scrollY > threshold) {
    } else {
      // If above the threshold, set the color to white
    }
  }
  
  // Attach the scroll event listener to the window
  window.addEventListener("scroll", handleScroll);
  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      closeBtn.style.transform = "translateX(180px)";
      closeBtn.style.color = "black"; // Set button color to black when opened
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      closeBtn.style.transform = "translateX(0)";
      
    }
  }
  
  

    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/iyro0dVzj/";

    let model, webcam, labelContainer, maxPredictions;
    let isPredicting = false;
    let showPredictions = new Array();

    async function togglePredictions() {
        const webcamContainer = document.getElementById("webcam-container");
        const labelContainer = document.getElementById("label-container");

        if (!isPredicting) {
            document.getElementById("startStopButton").textContent = "Stop";
            isPredicting = true;
            webcamContainer.style.display = "block";
            labelContainer.style.display = "block";
            await init();
        } else {
            document.getElementById("startStopButton").textContent = "Start";
            isPredicting = false;
            webcamContainer.style.display = "none";
            labelContainer.style.display = "none";
            webcam.stop();
        }
    }

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update();
        if (isPredicting) {
            await predict();
        }
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].probability > 0.70) {
                if (!showPredictions[i]) {
                    showPredictions[i] = Date.now();
                } else {
                    const currentTime = Date.now();
                    const elapsedTime = (currentTime - showPredictions[i]) / 1000;
                    if (elapsedTime >= 2) {
                        const classPrediction =
                            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                        labelContainer.childNodes[i].innerHTML = classPrediction;
                    }
                }
            } else {
                labelContainer.childNodes[i].innerHTML = "";
                showPredictions[i] = null;
            }
        }
    }