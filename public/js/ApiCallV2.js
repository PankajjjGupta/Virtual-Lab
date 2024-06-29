// Elements Selectors Related Variables
const runButton = document.querySelector("#compileCode"); // Run Button Reference
const languageIDButton = document.querySelector("#inlineFormSelectPref"); // Language ID Button Reference
const inputTextarea = document.querySelector("#inputElement");
const outputTextarea = document.querySelector("#outputInp");
console.log("API CALL VERSION 2 JS FILE!")
// API Related Variables
const API_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';
const API_KEY = '<YOUR_API_KEY_HERE'; // Your Api Key Of Rapid API

// This function is to display the OUTPUT on the Ouput Screen!
const displayOutput = (data) => {
    const {time, status, stdout, stderr, compile_output} = data;
    if(status.id == 6) {
        outputTextarea.style.color = 'red';
        outputTextarea.value = atob(compile_output);
    }else if(status.id == 3) {
        outputTextarea.style.color = 'green';
        outputTextarea.value = atob(stdout);
    }else {
        outputTextarea.style.color = 'red';
        outputTextarea.value = atob(stderr);
    }
    // outputTextarea.style.color = 'green';
}

// CheckStatus function will take the token and make request to get output

const checkStatus = async (token) => {
    const API_URL2 = `https://ce.judge0.com/submissions/${token}?base64_encoded=true&fields=*`;
    try {
        const response = await fetch(API_URL2);
        const data = await response.json();
        const statusId = data.status.id;

        if(statusId == 1 || statusId == 2) {
            setTimeout(() => {
                checkStatus(token);
            }, 2000)
        }
        else {
            console.log("COMPILED SUCCESSFULLY!");
            console.log("COMPILING RESPONSE!", data);
            displayOutput(data);
        }
    } catch (e) {
        console.log("ERROR!", e);
    }
}

// This will return an token
const compileCode = async (code, languageID, stdin) => {
    const userInput = {
        source_code: btoa(code),
	    language_id: languageID,
	    stdin: btoa(stdin)
    };

    try {
        // Calling Api
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': API_KEY
            },
            body: JSON.stringify(userInput)
          });
        // Response from Api -token
        const data = await response.json();
        console.log(data)
        // Requesting using this token
        checkStatus(data.token);
          
    } catch(e) {
        console.log("ERROR!", e);
    }
}

// Event Listener When The Run Button Is Clicked It Will Call The Judge-API

runButton.addEventListener("click", () => {
    // Displayig the Compiling Text on User Output Screen;
    outputTextarea.style.color = "green";
    outputTextarea.value = "Compiling...";
    console.log(outputTextarea)
    const userCode = editor.getValue();
    const languageId = languageIDButton.value;
    const input = inputTextarea.value;

    // Calling the compileCode Function to Call The API - 
    compileCode(userCode, languageId, input);
    
})
