

function iPop1141877261_minimize()
{

	pulte_eraseCookie('caoPopInMode');
	pulte_createCookie('caoPopInMode', 'min');
	
	document.getElementById("iCoder_POP1141877261").style.width = "245px";
	document.getElementById("iCoder_POP1141877261").style.height = "65px";

	document.getElementById("popin_layer1").style.display = "none";
	document.getElementById("popin_layer2").style.display = "block";
	
	document.getElementById("popin_layer1").style.width = "0px";
	document.getElementById("popin_layer1").style.height = "0px";
	document.getElementById("popin_layer2").style.width = "245px";
	document.getElementById("popin_layer2").style.height = "65px";

	iCoder_POP1141877261_move();
}

function iPop1141877261_maximize()
{

	pulte_eraseCookie('caoPopInMode');
	pulte_createCookie('caoPopInMode', 'max');

	document.getElementById("iCoder_POP1141877261").style.width = "420px";
	document.getElementById("iCoder_POP1141877261").style.height = "260px";

	document.getElementById("popin_layer2").style.display = "none";
	document.getElementById("popin_layer1").style.display = "block";	
	
	document.getElementById("popin_layer1").style.width = "420px";
	document.getElementById("popin_layer1").style.height = "260px";
	document.getElementById("popin_layer2").style.width = "0px";
	document.getElementById("popin_layer2").style.height = "0px";

	iCoder_POP1141877261_move();
}

function imActionWithQuestion(imAction)
{
	var urlEncodedQuestion = escape(document.getElementById('textbox').value);
	
	var imActionWithInput = imAction.replace(/',''/g, "&InitialMessage="+urlEncodedQuestion+"',''");
	
	var urlAction = imActionWithInput.substring(imActionWithInput.indexOf("http"), imActionWithInput.indexOf("\'", imActionWithInput.indexOf("http")));
	
	var nullStr=''; 
	
	window.open(urlAction, '', 'resizable=yes,toolbar=no,menubar=no,location=no,scrollbars=no,status=no,height=400,width=600');
}

function pulte_createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+"; path=/";
}

function pulte_eraseCookie(name) {
	pulte_createCookie(name,"",-1);
}