//const { default: node } = require("@babel/register");

const textArea = document.getElementById("text-input");
const coordInput = document.getElementById("coord");
const valInput = document.getElementById("val");
const errorMsg = document.getElementById("error");

document.addEventListener("DOMContentLoaded", () => {
  textArea.value =
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
  fillpuzzle(textArea.value);
});

textArea.addEventListener("input", () => {
  fillpuzzle(textArea.value);
});

function fillpuzzle(data) {
  let len = data.length < 81 ? data.length : 81;
  for (let i = 0; i < len; i++) {
    let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
    let col = (i % 9) + 1; 
    if (!data[i] || data[i] === ".") {
      document.getElementsByClassName(rowLetter + col)[0].innerText = " ";
      continue;
    }
    document.getElementsByClassName(rowLetter + col)[0].innerText = data[i];
  }
  return;
}

async function getSolved() {
  const stuff = {"puzzle": textArea.value}
  let doc = document.getElementById("error-msg");
  const data = await fetch("/api/solve", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(stuff)
  })
  const parsed = await data.json();
  const msg = parsed.text;
  const err = parsed.error;
  //console.log('msg: ',parsed.text);

  if (err) {
    document.getElementById("error-msg").innerHTML = `<code>${JSON.stringify(parsed, null, 2)}</code>`;    
    setTimeout(function(){ doc.innerHTML="" }, 6000);
    return
  }
  fillpuzzle(parsed.solution);
  if(msg)writeInfo("error-msg", msg);
 // if(err) writeInfo("error-msg", err);
  //setTimeout(function(){ doc.innerHTML=msg }, 0);
  if(err || msg) setTimeout(function(){ doc.innerHTML="" }, 2000);
  //const myTimeout = setInterval(writeInfo("error-msg", msg), 3000);
  else {
    writeInfo("error", "hello");
  }  
  //writeInfo("error-msg", msg);
}

function writeInfo(id, msg ){
  let doc = document.getElementById(id);
  doc.innerHTML = msg;
}

async function getChecked() {
  const stuff = {"puzzle": textArea.value, "coordinate": coordInput.value, "value": valInput.value}
    const checkdata = await fetch("/api/check", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(stuff)
  })
  let checked = await checkdata.json();
    errorMsg.innerHTML = `<code>${JSON.stringify(checked, null, 2)}</code>`;
    console.log('checked', checked['valid']) 
    //console.log('no error', checked.valid);
    //clearTimeout(m1);  
}

document.getElementById("solve-button").addEventListener("click", getSolved)
document.getElementById("check-button").addEventListener("click", getChecked)