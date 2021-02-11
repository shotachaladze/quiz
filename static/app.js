function cutEntite(input) {
	input=input.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
		return '&#'+i.charCodeAt(0)+';';
	});
	return input.replace(/&#.*;/, "");
}
function randSort(a, b) {
	return 1 - Math.random();
}
var category, difficulty, answersTmp;
document.getElementById("start").onclick = function() {
	document.getElementById("selecter").style.display="none";
	document.getElementById("container").style.boxShadow="#000 0px 0px 10px";
	var point=0;
	document.getElementById("content").innerHTML='<div id="progress"></div><div id="question"></div><div id="answers"></div><button id="action">action</button></div>';
	category = document.getElementById("trivia_category").value;
	difficulty = document.getElementById("trivia_difficulty").value;
	let i, j, pos, responseLength=0;
	var buf="", buf2="";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);
			if(json && json.response_code == 0) {
				responseLength=json.results.length;
				i=0;
				answersTmp = json.results[i].incorrect_answers;
				answersTmp.push(json.results[i].correct_answer);
				document.getElementById("question").innerHTML = json.results[i].question;
				buf2+="<form>";for(j=0; j<answersTmp.length; j++) {
				buf2+='<label class="container">'+answersTmp[j]+'<input type="radio" name="answer" value="'+answersTmp[j]+'" id="answer'+j+'"><span class="checkmark"></span></label>';
				}
				document.getElementById("answers").innerHTML = buf2;
				document.getElementById("progress").innerHTML = (i+1)+"/"+json.results.length;
				var checker=false;
				document.getElementById("action").onclick = function() {
				for(j=0; j<answersTmp.length; j++) {
						if(document.getElementById("answer"+j).checked && cutEntite(document.getElementById("answer"+j).value) == cutEntite(json.results[i].correct_answer)) {
							checker=true; point++; break;
						}
				}
				if(checker) {
					document.getElementById("action").style.border="2px solid #aec4b3";
					document.getElementById("container").style.boxShadow="#aec4b3 0px 0px 10px";
				} else {
					document.getElementById("action").style.border="2px solid #c4aeae";
					document.getElementById("container").style.boxShadow="#c4aeae 0px 0px 10px";
				}
				buf2=""; checker=false;
					document.getElementById("progress").innerHTML = (i+2)+"/"+json.results.length;
					if(i==json.results.length-1) {
						document.getElementById("content").innerHTML="<h1>Your result is: "+point+"/"+(i+1)+"</h1>";
						document.getElementById("selecter").style.display="block";
						return;
					} else i++;
				answersTmp = json.results[i].incorrect_answers;
				answersTmp.push(json.results[i].correct_answer);
				document.getElementById("question").innerHTML = json.results[i].question;
				buf2+="<form>";for(j=0; j<answersTmp.length; j++) {
				buf2+='<label class="container">'+answersTmp[j]+'<input type="radio" name="answer" value="'+answersTmp[j]+'" id="answer'+j+'"><span class="checkmark"></span></label>';
				}
				document.getElementById("answers").innerHTML = buf2;
				}
			} else {
				if(this.readyState == 4 && this.status == 0 && idAction.innerHTML != connErrorText)
					idAction.innerHTML = connErrorText;
			}
		}
	};
	xhttp.open("GET", "api.php?amount=10&category="+category+"&difficulty"+difficulty, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
}