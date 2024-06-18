const outputInp = document.querySelector("#outputInp");
const apiUrl = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true';
const apiKey = 'fa515036efmsh968d7201508968ep10dc2ajsndc076d9bd49d'; // My Api Key Of Rapid API
// Function to compile code using Judge0 API
async function compileCode(code, language, stdin) {
	
	const formData = {
	  source_code: btoa(code),
	  language_id: language,
	  stdin: btoa(stdin)
	};
	console.log(formData)
	try {
	  const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'X-RapidAPI-Key': apiKey
		},
		body: JSON.stringify(formData)
	  });  
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error('An error occurred:', error);
	  return null;
	}
  }
  
  // Example usage
// const userInput = `public class Main { 
// 	public static void main(String args []){
// 	System.out.print("Hello World");
// 	}
// 	}`;
let outputDetails;

// compileCode(userInput, 62, '')
// 	.then(result => {
// 	if (result) {
// 		console.log(result);
// 		const {token} = result
// 		const url = `https://ce.judge0.com/submissions/${token}`;
// 		loadByToken(url);
// 	}
// 	})
//   .catch(e => {
// 	console.log("ERROR", e);
//   })

const loadByToken = async(url) => {
fetch(url)
.then(res => {
	return res.json();
})
.then((data) => {
	const statusId = data.status.id;
	if (statusId === 1 || statusId === 2) {
		setTimeout(() => {
			console.log("WILL RUN RETURN AGAIN 2 SECS LATER!")
			loadByToken(url)
		}, 2000)
		return
	}else {
		outputDetails = data;
		console.log(data)
		displayOutput(data);
		console.log('COMPILATION DONE!');
		return;
	}
})
.catch(e => {
	outputInp.style.color = 'red';
	outputInp.value = `Something Went Wrong Try Again!`;
	console.log("ERROR!", e);
})

}

// Function to take the input from the user and send the compile request to api;
const compileCodeBtn = document.querySelector("#compileCode");

compileCodeBtn.addEventListener("click", () => {
	outputInp.style.color = '#000';
	outputInp.value = "Compiling....";
	const userInput = editor.getValue();
	const languageEle = document.querySelector('#inlineFormSelectPref');
	const languageValue = languageEle.value
	const inputElement = document.querySelector("#inputElement");
	const inputValue = inputElement.value;
	console.log(inputValue)
	compileCode(userInput.trim(), languageValue, inputValue)
	.then(result => {
	if (result) {
		console.log(result);
		const {token} = result
		const url = `https://ce.judge0.com/submissions/${token}?base64_encoded=true`;
		loadByToken(url);
	}
	})
  .catch(e => {
	console.log("ERROR", e);
  })
})

// Function to validate the succesful response and displaying the output;
function displayOutput (data) {
	const {stdout, time, memory, compile_output, status, stderr} = data;
	outputInp.value = "";
	console.log(status.id)
	if(status.id == 3 ) {
		outputInp.style.color = 'green';
		outputInp.value = `${atob(stdout)}\nCompilation Time : ${time}`;
	}
	else if (status.id == 6 ){
		outputInp.style.color = 'red';
		outputInp.value = `Compilation Error: ${atob(compile_output)}`;
	}
	else{
		outputInp.style.color = 'red';
		outputInp.value = `Compilation Error: ${atob(compile_output)}`;
	}
}
