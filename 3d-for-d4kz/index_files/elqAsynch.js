//Eloqua Asynchronous Tracking Script
var eloquaCustomURL = window.location.href;
if (window.location.pathname.charAt(window.location.pathname.length - 1) == "/") {
	eloquaCustomURL = eloquaCustomURL.replace("?", "");
} else {
	eloquaCustomURL = eloquaCustomURL.replace("?", "/");
}
eloquaCustomURL = eloquaCustomURL.replace(/\&/g, "-");

var _elqQ = _elqQ || [];
_elqQ.push(['elqSetSiteId', '2936']);
_elqQ.push(['elqTrackPageView', eloquaCustomURL]);
(function() {
	function async_load() {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = '//img.en25.com/i/elqCfg.min.js';
		var x = document.getElementsByTagName('script')[0];
		x.parentNode.insertBefore(s, x);
	}
	if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
	else if (window.attachEvent) window.attachEvent('onload', async_load);
})();

/**********************************************
 Added 6.04.2013 - Brandon Klotz

 If Google Analytics exists, this will pull the
 visitor's unique identifier (GUID) from Eloqua
 and pass it to Google Analytics as an event.
 It will then lookup the visitors email address
 in Eloqua if known, then find the Customer ID #
 and track that to Google Analytics also.

 NOTE: This script requires jQuery
 **********************************************/

//Declare global vars
var elqTimer = null;
var elqTimeout = 5;
var theGUID = "none";

var firstElq = true;
function SetElqContent() {
	if (this.GetElqContentPersonalizationValue) {
		if (firstElq === true) {
			firstElq = false;
			_elqQ.push(['elqDataLookup', escape('6a200f15024c4aada61c7774519bad5f'), '<C_EmailAddress>' + GetElqContentPersonalizationValue('V_ElqEmailAddress') + '</C_EmailAddress>']);
		} else {
			var labelval = GetElqContentPersonalizationValue('ContactIDExt');
			var label2val = labelval + " | " + theGUID;
			dataLayer.push({
				'category' : 'Visitors',
				'action' : 'Eloqua Customer ID',
				'label' : labelval,
				'event' : 'eloqua'
			});
			dataLayer.push({
				'category' : 'Visitors',
				'action' : 'Eloqua ID Connection',
				'label' : label2val,
				'event' : 'eloqua'
			});
		}
	} else {
		dataLayer.push({
			'category' : 'Visitors',
			'action' : 'Errors',
			'label' : 'GetElqContentPersonalizationValue function missing',
			'event' : 'eloqua'
		});
	}
}

//Create GUID retrieval function
function WaitUntilCustomerGUIDIsRetrieved() {
	if ( !! (elqTimer)) {
		// If attempt limit reached, kill timeouts
		if (elqTimeout === 0) {
			return;
		}
		// Check if function GetElqCustomerGUID() exists
		if (typeof this.GetElqCustomerGUID === 'function') {
			// Attempt to get visitor's GUID
			theGUID = GetElqCustomerGUID();
			$("input[name=elqCustomerGUID]").val( GetElqCustomerGUID());
			// If visitor has a valid GUID, track event to Google Analytics
			if (theGUID !== "none" && theGUID !== "" && theGUID !== null) {
				dataLayer.push({
					'category' : 'Visitors',
					'action' : 'Eloqua GUID',
					'label' : theGUID,
					'event' : 'eloqua'
				});
				_elqQ.push(['elqDataLookup', escape('f64e612389c24bce9a650370fa3e3d85'), '']);
			}
			return;
		}
		elqTimeout -= 1;
	}
	// If function GetElqCustomerGUID() not available try again in 0.5 seconds
	elqTimer = setTimeout("WaitUntilCustomerGUIDIsRetrieved()", 500);
	return;
}

//Wait for document ready
$(document).ready(function() {
	WaitUntilCustomerGUIDIsRetrieved();
});

//Pull GUID function from Eloqua
_elqQ.push(['elqGetCustomerGUID']);