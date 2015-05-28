var popinBottomOffset = 0;var xCloseCookieName = 'xClose7353164790';function popIn(){if (GetCookie('xClose7353164790') != null) { return; }var target=document.getElementById("agent_info");target.innerHTML='<table style="width:100%;height:100%" cellpadding="0" cellspacing="0" border="0" bgcolor="black"><tr><td >  <table style="width:100%" cellpadding="0" cellspacing="0" border="0" bgcolor="white"><tr valign="top"> <td colspan=2 ><table style="width:100%"><tr><td><img src="http://CAO-US1PRES6.contactatonce.com/images/label.gif" border=0 /></td><td id="messageCell" sytle="font-weight: bold">Samantha P of Pulte Homes is available to answer your questions now!</td><td valign="top" align="right"><a href="javascript:iPop1141877261_close()" style="color: black; font-family: Verdana; font-style: normal; font-variant: normal; font-weight: normal; font-size: 10pt; line-height: normal; font-stretch: normal; font-size-adjust: none; text-decoration: none;">[&times;]</a></td></tr></table></td></tr>  <tr valign="top">   <td align=center><img id="agentImage" src="http://CAO-US1PRES6.contactatonce.com/images/BlankAgentImage.jpg" border="0" /></td>   <td>     <table cellpadding="0" cellspacing="5">       <tr><td valign="center" align="center" /> <strong>2488757297</strong>  </td></tr>       <tr><td><a onclick="javascript:var nullStr=\'\'; window.open(\'http://CAO-US1PRES6.contactatonce.com/CaoClientContainer.aspx?MerchantId=164790&ProviderId=7353&PlacementId=0&Community=Primrose&Address=1376%20Grand%20Junction%20Way%20Roseville%20CA,%2095747&Phone=888-817-2238&Region=Northern%20California&State=CA&sPageName=Pulte%20-%20communities%20-%20ca%20-%20roseville%20-%20primrose%20-%20plans%20-%20residence%202%20-%20floorplans&sEvar31=/Product/West/California/Northern%20California/Primrose/Residence%202&sAccount=phpulte,phpultebrands&OriginationUrl=http%3a%2f%2fwww.pulte.com%2fcommunities%2fCA%2froseville%2fPrimros%2ffloor-plans%2f683809%2fResidence-2.aspx\',\'\',\'resizable=yes,toolbar=no,menubar=no,location=no,scrollbars=no,status=no,height=400,width=600\');return false; "href="#"><img id="imButton" src="http://CAO-US1PRES6.contactatonce.com/images/button3.jpg" border="0" /></a></td></tr>     </table>   </td></tr></table></td></tr></table>';var launchDelay = 500;
document.getElementById("iCoder_POP1141877261").style.border = "none";
document.getElementById("iCoder_POP1141877261").style.lineHeight = "normal";
document.getElementById("iCoder_POP1141877261").style.backgroundColor = "transparent";
document.getElementById("iCoder_POP1141877261").style.backgroundRepeat = "no-repeat";


var AgentNamePointSize = '10pt';
var LeftAgentNamePointSize = '13pt';
var LeftAgentPointSizeNoPic = '14pt';



var agentDisplayName = "Samantha P";
var MerchantDisplayName = "Pulte Homes";
var imAction = "javascript:var nullStr=\'\'; window.open(\'http://CAO-US1PRES6.contactatonce.com/CaoClientContainer.aspx?MerchantId=164790&amp;ProviderId=7353&amp;PlacementId=0&amp;Community=Primrose&amp;Address=1376%20Grand%20Junction%20Way%20Roseville%20CA,%2095747&amp;Phone=888-817-2238&amp;Region=Northern%20California&amp;State=CA&amp;sPageName=Pulte%20-%20communities%20-%20ca%20-%20roseville%20-%20primrose%20-%20plans%20-%20residence%202%20-%20floorplans&amp;sEvar31=/Product/West/California/Northern%20California/Primrose/Residence%202&amp;sAccount=phpulte,phpultebrands&amp;OriginationUrl=http%3a%2f%2fwww.pulte.com%2fcommunities%2fCA%2froseville%2fPrimros%2ffloor-plans%2f683809%2fResidence-2.aspx\',\'\',\'resizable=yes,toolbar=no,menubar=no,location=no,scrollbars=no,status=no,height=400,width=600\');return false; ";
var imActionEscaped = imAction.replace(/'/g, "\\'");

useVibro = false;
customPosition = false;

var customAnimation = document.createElement("script");
customAnimation.setAttribute("type", "text/javascript");
customAnimation.setAttribute("src", "http://scripts.contactatonce.com/scripts/pultegroup_CustomAnimation.js");
document.getElementsByTagName("head")[0].appendChild(customAnimation);
_imAction = imAction;



var MerchantId = "";
MerchantId = imAction.search(/MerchantId/);
MerchantId = imAction.substring(MerchantId+11,MerchantId+16);

var ProviderId = "";
ProviderId = imAction.search(/ProviderId/);
ProviderId = imAction.substring(ProviderId+11,ProviderId+15);
if (ProviderId == "1543") {
  ProviderId = imAction.search(/PlacementId/);
  ProviderId = imAction.substring(ProviderId+12,ProviderId+16);
}

var MaxTitleImage = "http:\/\/cdn.contactatonce.com\/dropin\/";
var MaxMessageImage = "http:\/\/cdn.contactatonce.com\/dropin\/";

switch (ProviderId) {

// Pulte Homes
	case "7353": 	
// Pultehomes.com
	case "8104": 	
		MaxTitleImage+= "p7353_TitleMax2.png";
		MaxMessageImage+= "p7353_ChatBubbles3.png";
		break;
	
// Centex Homes
	case "8047": 	
// Centexhomes.com
	case "8103": 	
		MaxTitleImage+= "p8047_TitleMax2.png";
		MaxMessageImage+= "p8047_ChatBubbles3.png";
		break;
  
// Del Webb Homes
	case "8048": 	
// DelWebbHome.com
	case "8105": 	
		MaxTitleImage+= "p8048_TitleMax2.png";
		MaxMessageImage+= "p8048_ChatBubbles3.png";
		break;

// DiVosta Homes
	case "8049": 	
// Divostahome.com
	case "8106": 	
		MaxTitleImage+= "p8049_TitleMax2a.png";
		MaxMessageImage+= "p8049_ChatBubbles3.png";
		break;

// Sun City
	case "8050": 	
		MaxTitleImage+= "p8050_TitleMax2.png";
		MaxMessageImage+= "p8050_ChatBubbles3.png";
		break;

// NewHomeHelp.com
	case "8051": 	
		MaxTitleImage+= "p8051_TitleMax2.png";
		MaxMessageImage+= "p8051_ChatBubbles3.png";
		break;

//  default
	default:
		MaxTitleImage+= "p7353_TitleMax2.png";
		MaxMessageImage+= "p7353_ChatBubbles3.png";
		break;

}





document.getElementById("iCoder_POP1141877261").innerHTML = 
		'<div id="popin_layer1">'+
		'<div id="popin-background-max" style="z-index:3; position: absolute; top: 0px; left: 0px; width: 420px; height: 260px; background-repeat: no-repeat; background-color: transparent; background-image:url(\'http://cdn.contactatonce.com/dropin/PulteGroup_Background.png\');"></div>' +
		'<div id="popin-header-max" style="z-index:3;position: absolute; top: 10px; left: 10px; width: 400px; height:26px;"><img style="position: absolute; top: 2px; left: 0px; border:0;" src="'+MaxTitleImage+'"></img><a href="#" onclick="iPop1141877261_minimize(); return false;"><img src="http://cdn.contactatonce.com/dropin/PulteGroup_MinimizeButton.png" style="position: absolute; top: 0px; right: 10px; border:0;"></img></a></div>' + 
		'<div id="popin-messageText-max" style="z-index:3;position: absolute; top: 35px; left: 30px; width: 362px; height:68px;"><img src="'+MaxMessageImage+'" style="border:0"></img></div>'+
		'<textarea id="textbox" rows="4" cols="41" onmousedown="javascript: this.value=\'\';" onmouseup="javascript: this.onmousedown=\'\';" style="z-index:3; position:absolute; top:113px; left:30px;">Type your question here.</textarea>'+
		'<a id="popin-im_button-max" href="#" style="z-index:3;position: absolute; top: 206px; left: 316px; width: 68px; height:26px;" onclick="iPop1141877261_minimize();imActionWithQuestion(\''+imActionEscaped+'\'); return false;"><img src="http://cdn.contactatonce.com/dropin/PulteGroup_ChatButton.png" style="border:0"></img></a>'+
		'<div id="popin-close-max" style="z-index:3;position: absolute; top: 206px; left: 50px; width: 236px; height:26px;"><a href="#" onclick="iPop1141877261_close(); return false"><img src="http://cdn.contactatonce.com/dropin/PulteGroup_CloseButton.png" style="border:0"></img></a></div>' + 
		'</div>'+
		'<div id="popin_layer2">'+
		'<div id="caopopin-header-min" style="z-index:2; position: absolute; bottom: 10px; right: 10px; width: 235px; height:55px; background-color: transparent; background-image:url(\'http://cdn.contactatonce.com/dropin/PulteGroup_BackgroundMin2.png\');"><a href="#" onclick="iPop1141877261_maximize(); return false;"><img src="http://cdn.contactatonce.com/dropin/PulteGroup_MaximizeButton.png" style="position: absolute; top: 19px; right: 13px; border:0;"></img></a></div>' + 
		'</div>';

var popInModeValue = GetCookie('caoPopInMode');

if (popInModeValue == 'min') {
	useDrop = false;

	document.getElementById("iCoder_POP1141877261").style.width = "245px";
	document.getElementById("iCoder_POP1141877261").style.height = "65px";

	document.getElementById("popin_layer1").style.width = "0px";
	document.getElementById("popin_layer1").style.height = "0px";
	document.getElementById("popin_layer1").style.display = "none";

	document.getElementById("popin_layer2").style.width = "245px";
	document.getElementById("popin_layer2").style.height = "65px";
	document.getElementById("popin_layer2").style.display = "block";
} 
else
{
	document.getElementById("iCoder_POP1141877261").style.width = "420px";
	document.getElementById("iCoder_POP1141877261").style.height = "260px";

	document.getElementById("popin_layer1").style.width = "420px";
	document.getElementById("popin_layer1").style.height = "260px";
	document.getElementById("popin_layer1").style.display = "block";

	document.getElementById("popin_layer2").style.width = "0px";
	document.getElementById("popin_layer2").style.height = "0px";
	document.getElementById("popin_layer2").style.display = "none";
}


	
	
var launchDelay = 10000;document.getElementById("iCoder_POP1141877261").setAttribute("pos","br");document.getElementById("iCoder_POP1141877261").onselectstart = function(){return false;};setTimeout("iPop1141877261_init1()", launchDelay);}