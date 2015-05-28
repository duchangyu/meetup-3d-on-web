
// ----------------------------------------------------------------------------------------------
// ----------------------------------- GLOBAL FUNCTIONS -----------------------------------------
// ----------------------------------------------------------------------------------------------

// Global Vars for SC Tracking of Portal 
var gsc_prop1 = '';
var gsc_prop28 = '';
var gsc_evar21 = '';
var gsc_evar20 = '';
var gsc_username = '';

var GetPortalSCValues = function (container_string) {
    if (container_string != "") {
        var result = GetDelimitedValue("//gsc_userstatus//", container_string);
        if (result != "") {
            gsc_prop28 = result;
            gsc_evar21 = result;
            gsc_prop1 = 'Owners Entry';
            gsc_evar20 = 'Owners Entry';
        }

        result = GetDelimitedValue("//gsc_username//", container_string);
        gsc_username = result;


    }

}

var GetDelimitedValue = function (delimiter, container_string) {
    var result = "";
    var startInd = container_string.indexOf(delimiter);
    var endInd = container_string.lastIndexOf(delimiter);
    if ((startInd > -1) && (startInd!=endInd)) {
        result = container_string.substring(startInd + delimiter.length, endInd);
    }
    return result;
}



var trackPortalEvents = function (eventName, promoName) {
    if (typeof eventName != 'undefined') {
        if ((eventName != "") && (UseSiteCatalyst)) {
            var sLinkName = eventName + " - " + s.pageName;

            s.eVar45 = eventName;
            s.events = 'event45';
            s.eVar22 = eventName;

            if (typeof promoName != 'undefined')
                if (promoName != '') 
                    s.eVar23 = promoName;

            s.tl('true', 'o', sLinkName);
            s.events = '';
            s.evar45 = '';
            s.eVar22 = '';
            s.evar23 = '';

        }
    }
}

var trackAndLinkPortalEvents = function (destUrl, newWindowFlag, eventName, promoName) {
    if (typeof eventName != 'undefined') {
        if (eventName != "") {
            if (typeof promoName != 'undefined')
                trackPortalEvents(eventName, promoName);
            else
                trackPortalEvents(eventName);
        }
    }

    if (!newWindowFlag)
        document.location = destUrl;
    else
        window.open(destUrl); //, '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');

}



// just in case this file is used on a page that does not load another version of JQuery;
if (typeof jQuery110 === 'undefined') {

    // on some pages we assign a different version of jQuery to jQuery110
    // do not put a var in front of this declaration so that it's global
    jQuery110 = jQuery;

    // if you want to find out what version of jQuery is running on a page,
    // type the following into the console:
    // jQuery.fn.jquery  (enter)
    // jQuery110.fn.jquery (enter)
    // if they are different then we're loading a different version in noConflict mode.
}

//----------------------------------------------------------------------------------------------------------------------
//-------------------------------------- DYNAMIC NOTEBOOK LOAD SUPPORT -------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var ga = document.createElement('script');
  ga.type = 'text/javascript'; ga.async = true;
  ga.src = filename;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
  if (typeof fileref!="undefined")
   document.getElementsByTagName("head")[0].appendChild(fileref)
 }
}


var RenderWarrantyDoc = function(result){
    if (result != '')
        document.getElementById("portal_warranty_doc_control").innerHTML = result;
}
var RenderAboutYourHome = function(result){
    if (result != '')
        document.getElementById('portal_about_benefits_control').innerHTML = result;
    //Pulte08.AjaxWebServices.PortalService.getWarrantyDocHTML(RenderWarrantyDoc);
}
        

var RenderConstruction = function(result){
    if (result != '') 
        document.getElementById('portal_construction_control').innerHTML = result;
    listen_constructionPhaseReadMore();
    instantiate_left_hand_tabs_component();
    //Pulte08.AjaxWebServices.PortalService.GetAboutYourHomeHTML(RenderAboutYourHome);
}
var RenderPartners = function(result){
    if (result != '') 
        document.getElementById('portal_partners_control').innerHTML = result;
    //Pulte08.AjaxWebServices.PortalService.GetConstructionHTML(RenderConstruction);
    instantiate_left_hand_tabs_component();
    
}
var RenderContacts = function(result){
    if (result != '') 
        if (document.getElementById('portal_contacts_control') != null)
            //document.getElementById('portal_contacts_control').outerHTML = result;
            //document.getElementById('portal_contacts_control').outerHTML = "<div id=\"portal_contacts_control\">" + result + "</div>";
            document.getElementById('portal_contacts_control').innerHTML = result;
    //Pulte08.AjaxWebServices.PortalService.GetPartnersHTML(RenderPartners);
}
var RenderAccountFAQ = function (result) {
    if (result != '') {
        if (document.getElementById('ownersentry-accountfaq-control') != null) {
            //document.getElementById('portal_contacts_control').outerHTML = result;
            //document.getElementById('portal_contacts_control').outerHTML = "<div id=\"portal_contacts_control\">" + result + "</div>";
            document.getElementById('ownersentry-accountfaq-control').innerHTML = result;
        }
    }
    //if (typeof init_SC != "undefined")
    //    window.setTimeout(init_SC,300);

    //init js
    window.setTimeout(initFAQControls, 300);
}
var RenderLeftNav = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-leftnav-control') != null)
            document.getElementById('ownersentry-leftnav-control').innerHTML = result;
    GetPortalSCValues(result);
}
var RenderDecoratingIdeas = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-decoratingideas-control') != null)
            document.getElementById('ownersentry-decoratingideas-control').innerHTML = result;

    //init js
    window.setTimeout(initDecoratingIdeas, 300);
}
var RenderConstructionProcess = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-construction-control') != null)
            document.getElementById('ownersentry-construction-control').innerHTML = result;

    if (document.getElementById('redirectFlagDiv') != null)
        document.location = '/ownersentry/my-home.aspx';


}
var RenderHomeCareGuides = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-homecareguides-control') != null)
            document.getElementById('ownersentry-homecareguides-control').innerHTML = result;
}
var RenderHomeOwnersAssociation = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-homeownersassociation-control') != null)
            document.getElementById('ownersentry-homeownersassociation-control').innerHTML = result;
    if (document.getElementById('redirectFlagDiv') != null)
        document.location = '/ownersentry/my-home.aspx';
}
var RenderMyHome = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-myhome-control') != null)
            document.getElementById('ownersentry-myhome-control').innerHTML = result;

    //init js
    window.setTimeout(initMyHomeControls, 300);
}
var RenderPartnerDiscounts = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-partnerdiscounts-control') != null)
            document.getElementById('ownersentry-partnerdiscounts-control').innerHTML = result;

    //init js
    window.setTimeout(initPartnerDiscountsControls, 300);
}
var RenderSeasonalMaintenance = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-seasonalmaintenance-control') != null)
            document.getElementById('ownersentry-seasonalmaintenance-control').innerHTML = result;
}
var RenderServiceRequests = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-servicerequests-control') != null)
            document.getElementById('ownersentry-servicerequests-control').innerHTML = result;

    //init js
    window.setTimeout(initServiceRequestControls, 300);
}
var RenderWarrantyInformation = function (result) {
    if (result != '')
        if (document.getElementById('ownersentry-warrantyinformation-control') != null)
            document.getElementById('ownersentry-warrantyinformation-control').innerHTML = result;
}
function RenderPortalControls() {
    if (document.getElementById('portal_partners_control') != null){
        //Pulte08.AjaxWebServices.PortalService.GetContactsHTML(RenderContacts);
        
         // window.location.reload();
        //NEW

        Pulte08.AjaxWebServices.PortalService.GetAboutYourHomeHTML(RenderAboutYourHome);
        Pulte08.AjaxWebServices.PortalService.GetConstructionHTML(RenderConstruction);
        Pulte08.AjaxWebServices.PortalService.GetPartnersHTML(RenderPartners);
        Pulte08.AjaxWebServices.PortalService.GetContactsHTML(RenderContacts);
        Pulte08.AjaxWebServices.PortalService.getWarrantyDocHTML(RenderWarrantyDoc);
        
        //END NEW
    }
    if (document.getElementById('ownersentry-leftnav-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetLeftNavHTML(RenderLeftNav);
    if (document.getElementById('ownersentry-accountfaq-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetAccountFAQHTML(RenderAccountFAQ);
    if (document.getElementById('ownersentry-decoratingideas-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetDecoratingIdeasHTML(RenderDecoratingIdeas);
    if (document.getElementById('ownersentry-construction-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetConstructionProcessHTML(RenderConstructionProcess);
    if (document.getElementById('ownersentry-homecareguides-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetHomecareGuidesHTML(RenderHomeCareGuides);
    if (document.getElementById('ownersentry-homeownersassociation-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetHomeOwnersAssociationHTML(RenderHomeOwnersAssociation);
    if (document.getElementById('ownersentry-myhome-control') != null) {
        Pulte08.AjaxWebServices.PortalService.GetMyHomeHTML(RenderMyHome);
    }
    if (document.getElementById('ownersentry-partnerdiscounts-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetPartnerDiscountsHTML(RenderPartnerDiscounts);
    if (document.getElementById('ownersentry-seasonalmaintenance-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetSeasonalMaintenanceHTML(RenderSeasonalMaintenance);
    if (document.getElementById('ownersentry-servicerequests-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetSeviceRequestsHTML(RenderServiceRequests);
    if (document.getElementById('ownersentry-warrantyinformation-control') != null)
        Pulte08.AjaxWebServices.PortalService.GetWarrantyInformationHTML(RenderWarrantyInformation);

}

function portalCreateAccount() {
    //s.tl("true", "o", "Owners - AccountBenefits - CreateAccount - Click");  //track via SiteCatalyst
    var signInContentLoaded = $(".signInContent").size();
    if (signInContentLoaded) {
        myNotebookRegister.openPanel()
    } else {
        loadFullControl('register');
    }
}

function portalLogin() {
    //s.tl("true", "o", "Owners - AccountBenefits - SignIn - Click");  //track via SiteCatalyst
    var signInContentLoaded = $(".signInContent").size();
    if (signInContentLoaded) {
        myNotebookSignIn.openPanel();
    } else {
        loadFullControl('signIn')
    }

}

/*********
**  Initialize DOM elements
**  Called on page ready AND from appropriate renderPortalControls
*********/


// We need to call this from the ready function AND from the renderPortalControls
function initMyHomeControls() {
    var initSalesAgreement = $(".sales-agreement-number-component").length,
        initSalesAgreementClose = $(".sales-agreement-number-component a.close").length,
        initSalesAgreementPopovers = $(".sales-agreement-number-component .js-agreement-where").length,
        constructionProgressComponent = $(".home-stage-container").length;

    if (initSalesAgreement > 0) {

        if (initSalesAgreementClose) {
            //clicking the close button in the sales agreement number prompt will hide it
            jQuery110(".sales-agreement-number-component a.close").off().on('click', function (e) {
                e.preventDefault();
                $(this).parent().fadeOut("slow");
            });
        }

        //popover for sales agreement number links
        if (initSalesAgreementPopovers) {
            var brandUrl = getCurrSite();
            jQuery110(".js-agreement-where").popover({
                html: true,
                content: '<div class="popover-sa-where"><p>Your Agreement ID number and Lot number can both be found on page 2 of your Purchase Agreement document.  The Agreement ID number begins with the letters <B>HB</B> in the upper right corner; the Lot number is a five digit number found in the upper left corner:</p><img width="473" src="/images/' + brandUrl + '/owners-entry/sales-agreement-where.jpg" /><!--img width="473" height="169" width="729" height="380"--></div>'
            });

            jQuery110(".js-agreement-why").popover({
                html: true,
                content: '<div class="popover-sa-why"><p>With your Agreement ID number, you can:</p><ul class="bullets"><li>Get customized decorating tools</li><li>View your home details</li><li>If you\'ve recently purchased your home, you can track the progress of your home\'s construction and share with friends and family.</li></ul></div>'
            });
        }
    }

    if (constructionProgressComponent) {
        initActiveStagePopover();
    }

    //listeners for modals:
    $("a[rel^='prettyPhoto']").prettyPhoto({ overlay_gallery: false, animation_speed: 'fast', deeplinking: false, social_tools: false, horizontal_padding: 20, default_width: 731 });

}


function obeoViewModel() {
    var self = this;

    // obeoInfo.OBEOTool is set in the User Control
    var rooms = obeoInfo.OBEOTool;

    self.obeoRooms = ko.observableArray(rooms);
    self.obeoAdditionalStyles = ko.observableArray();

    self.loadNewRoom = function (index, event, id) {
        event.preventDefault();

        $(".room-designer-left-nav-scroller li").removeClass("active");
        $(event.currentTarget).parent().addClass("active");

        swapIframeVideo(id);


        // load additional styles
        self.obeoAdditionalStyles(index.Additional);
        $(".alternate-style-container li a").eq(0).addClass("selected");
    }

    self.loadNewStyle = function (index, event, id) {
        event.preventDefault();
        $(".alternate-style-container li a").removeClass("selected");
        $(event.currentTarget).addClass("selected");

        swapIframeVideo(id, index.parent);


    }

    self.transformUrl = function (url) {
        return url.replace(/&amp;/g, '&');
    }

    function swapIframeVideo(idToShow, additionalVideo) {

        var $iframe = $(".room-designer-iframe-and-controls-container .iframe-container");
        $iframe.find('iframe').hide(300);


        window.setTimeout(function () {
            if (typeof additionalVideo != 'undefined') {
                $iframe.find('#additional-' + additionalVideo + ' #additional-video-' + idToShow).show('fast');
            } else {
                $iframe.find('#video-' + idToShow).show('fast');
            }
        }, 325);
    }

}

function initDecoratingIdeas() {

    $(".js-launch-floor-plan").click(function (e) {

        trackPortalEvents('Open Room Designer');

        e.preventDefault();
        jQuery110('#generic-room-designer-modal').appendTo("body").modal('show');
    });

    $(".js-close-modal").click(function () {
        jQuery110("#generic-room-designer-modal").modal('hide');
    });

    jQuery110("#generic-room-designer-modal").on("shown.bs.modal", function (e) {
        $(".room-designer-left-nav-scroller a").eq(0).click();
    });

    ko.applyBindings(new obeoViewModel);
    
}

function submitServiceRequestSuccessModal() {
    // since we can't adjust the wmode of the Select Images swf object, we just need to hide the section while the modal is open.
    jQuery110('.photo_upload_container').hide();
    trackPortalEvents('Service Request Submit');
    jQuery110('#service-request-thank-you').appendTo("body").modal('show');
    $("#service-request-thank-you .js-close-modal").click(function () {

        // and then reshow the section once we close the modal
        jQuery110('.photo_upload_container').show();
        jQuery110("#service-request-thank-you").modal('hide');

        //after clicking okay we refresh the page
        window.scrollTo(0,0); // so that when the new page loads we're at the top.
        location.reload();
    });
}
function initDecoratingIdeasObeoModal() {
    
}



function initActiveStagePopover() {
    var shareUrl = ownerEntryShareUrl || window.location.href;
    var doNotShareOE = false;
    if(typeof oeNoShare !="undefined")
        doNotShareOE= oeNoShare;

    jQuery110(".active_stage").popover({
        html: true,
        content: '<div class="popover-current-phase arial"><p class="title">Your Home</p><div class="share-trigger"></div><div class="share-container"><span class="title">Tell your friends</span><div class="add_this_container"><div class="addthis_toolbox addthis_default_style addthis_16x16_style" addthis:url="' + shareUrl + '" fb:like:href="' + shareUrl + '" tw:url="' + shareUrl + '"><a class="addthis_button_facebook"></a><a class="addthis_button_twitter"></a><a class="addthis_button_pinterest_share"></a><a class="addthis_button_google_plusone_share"></a><a class="addthis_button_compact"></a><a class="addthis_counter addthis_bubble_style"></a> </div></div></div>'
    });

    jQuery110(".active_stage").popover('show');

    if (!doNotShareOE) {
        // We need to see the share inside the popup when hovered: 
        jQuery110(".construction-progress .popover, .home-stage-container .popover").off().on('mouseover', function () {
            jQuery110(".share-trigger").hide();
            jQuery110(".popover.top .arrow").css({ 'left': '50px' });
            jQuery110(".popover-current-phase").addClass('expanded');
        });
    } else {
        // we don't want to see the share stuff when hovered
        //hide the arrows
        jQuery110(".share-trigger").hide();

    }
}

function initPartnerDiscountsControls() {
    jQuery110(".partner-collapsible-head").off().on('click', function () {
        $(this).parent().toggleClass("collapsed");
        $(this).next().toggle('slow');
    });

    jQuery110(".partner-collapsible-head").each(function (idx) {
        if (idx === 0) {
            if (typeof collapseAllPartnerDiscountCategories !== 'undefined') {
                if (collapseAllPartnerDiscountCategories === true) {
                    jQuery110(this).click();
                }
            }
        } else {
            jQuery110(this).click();
        }
    });

    //listeners for modals:
    $("a[rel^='prettyPhoto']").prettyPhoto({ overlay_gallery: false, animation_speed: 'fast', deeplinking: false, social_tools: false, horizontal_padding: 20, default_width: 731 });

    // If there is only 1 partner in a 'section' we need to change the way it's displayed.
    var collapsibleAreas = $(".component-partner-collapsible .partner-collapsible-body");

    $(collapsibleAreas).each(function () { // work through each area
        var numberOfPartners = $(".offer-with-details", $(this)).size();

        // add a class to the container so that we can use CSS
        if (numberOfPartners === 1) {
            $(this).closest(".partner-collapsible-body").addClass("one-offer");
        }

    });
}

function initFAQControls() {
    jQuery110(".faq-collapsible-head").off().on('click', function () {
        $(this).parent().toggleClass("collapsed");
        $(this).next().slideToggle('slow');
    });

    // close all the FAQ's except the first one
    jQuery110(".faq-collapsible-head").not(":first").each(function () {
        jQuery110(this).click();
    });
}

function readNotebookResponseSecond(responseText, followUp){

            var tempHTML = responseText
    	    var tempBrandDirHTML = tempHTML.replace(/images\/\//g,'images/' + getCurrSite() + '/');

	    	document.getElementById("modalNotebookDiv").innerHTML=tempBrandDirHTML;

			initUserNotebook();

			//roundedCorners();
			roundedNotebookCorners();



			//roundOnClasses();
    		switchAddress(document.getElementById('myNotebook'));
    		setbrokerFields(document.getElementById('myNotebook'));
    		setownerFields(document.getElementById('myNotebook'));
    		populateHearAboutUsOptions(document.getElementById('myNotebook'));
			styleTextInput(document.getElementById('myNotebook'));
			styleButtonInput();
//			customShowHide();
			customShowHide(document.getElementById('myNotebook'));
			//TableUtils.initSortTable('sortTableList');
			//loadMultimedia();
    		//LandingSearch.loadThankYou();
   	 		//CommunitySignUp.initialize();


			if (followUp!='') modalBackdrop.hide();

		    if (followUp=="signIn") myNotebookSignIn.openPanel();
			if (followUp=="myNotebook") myNotebookPanel.openPanel();
			if (followUp=="register") myNotebookRegister.openPanel();
			if (followUp=="signOut") Pulte08.AjaxWebServices.UserService.SignOut(NotebookUtils.callBackSignout);
			
			jQuery("#notebookAnchor").show();

}

function loadRestControl(followUp)
{
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp2=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp2.onreadystatechange=function()
	  {
	  if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
	    {
		readNotebookResponseSecond(xmlhttp2.responseText, followUp);
		
	    }
	  }
	var readAsync = true;
	if (followUp=='wait') readAsync = false;
	xmlhttp2.open("GET","/UITemplates/UserNotebookControlLoad.aspx?t=" + Math.random(),readAsync);
	xmlhttp2.send();
	

}


function readNotebookResponseFirst(responseText, followUp){

	var tempHTML = responseText;
			
	var tempBrandDirHTML = tempHTML.replace(/brandImageDirectory/g,getCurrSite());

	document.getElementById("notebookAnchor").innerHTML=tempBrandDirHTML ;

	loadRestControl(followUp);

}


function loadFullControl(followUp)
{
   if (document.getElementById("notebookAnchor")){
      if (!document.getElementById("myNotebook")){
	if (followUp!='') modalBackdrop.show();
	//loadjscssfile("/scripts/notebook.js","js");


	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
			readNotebookResponseFirst(xmlhttp.responseText, followUp)
	    }
	  }
	var readAsync = true;
	if (followUp=='wait') readAsync = false;
	if (getCurrSite()=='DelWebb') {
	    xmlhttp.open("GET", "/templates/template-notebookhead-delwebb.htm", readAsync);
	} else if(getCurrSite()=="Pulte") {
	    xmlhttp.open("GET", "/templates/template-notebookhead-pulte.html", readAsync);
	} else if(getCurrSite()=="Centex") {
	    xmlhttp.open("GET", "/templates/template-notebookhead-centex.html", readAsync);
	} else {
	    xmlhttp.open("GET", "/templates/template-notebookhead-divosta.html", readAsync);
	}
	xmlhttp.send();
      }
   }
}




function trackChat(event, locationType) {

    s.events = "None";
    if (event == "send") {
        s.events = "event40";
    }
    if (event=="open"){
        s.events="event29";
    }
    if (event=="close"){
        s.events="event30";
    }
    if (event=="minimize"){
        s.events="event31";
    }
    
    if (s.events!="None" && s.events!=""){
    
        var sttabId = "Chat - " + event + " - " + s.pageName;
    
        var sTabContactGroup=sContentGroup;
        if (sTabContactGroup.length>0)
          if(sTabContactGroup.indexOf("/index")>0)
            sTabContactGroup = sTabContactGroup.replace("/index","");
          else if(sTabContactGroup.indexOf("/Find a Home")>0)
            sTabContactGroup = sTabContactGroup.replace("/Find a Home","");

        if (locationType!="")
            s.eVar18 = locationType;
        s.eVar6=sTabContactGroup;
        s.tl("true","o",sttabId);

        s.events="None";
        s.eVar6 = "";
        //s.eVar18 = "";
    }
  
}

function ReportAndLink(trackCode, destUrl, newWindowFlag) {
  s.tl("true", "o", trackCode + " - " + destUrl);
  if (newWindowFlag) {
      window.open(destUrl); //, '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
  } else {
      window.location.href = destUrl;
  }
  
}

function ReportAndLink_popSmall(trackCode, destUrl, newWindowFlag) {
  s.tl("true", "o", trackCode + " - " + destUrl);
  if (newWindowFlag) {
      window.open(destUrl, '_blank', 'height=600, width=790,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');
  } else {
      window.location.href = destUrl;
  }
  
}


//----------------------------------------------------------------------------------------------------------------------
//-------------------------------------- end: DYNAMIC NOTEBOOK LOAD SUPPORT --------------------------------------------
//----------------------------------------------------------------------------------------------------------------------



// YUI SHORTHAND

var YUD = YAHOO.util.Dom;
var YUE = YAHOO.util.Event;
var YUA = YAHOO.util.Anim;

// GLOBAL VARIABLES

var currLoc = window.location.href;
var ua = navigator.userAgent.toLowerCase();
var isIE, isIE6, isSafari2, defaultMapLng, defaultMapLat, defaultCommunityLocation, fastPassToAddress;
var urlSiteBase = '';
var sessionTimeOutLimit = 7200000;
var sessionTimer;

var productSearchBrandIds = [];
productSearchBrandIds['Pulte'] = 1;
productSearchBrandIds['DelWebb'] = 2;
productSearchBrandIds['DiVosta'] = 3;
productSearchBrandIds['Centex'] = 4;

var BrowserDetect = {
    init: function(){
        isIE = /msie/.test(ua) && !/opera/.test(ua) && /win/.test(ua);
        isSafari2 = false;
        var index = ua.indexOf('safari');
        if (index > -1){
            var buildNum = parseInt(ua.substring(index+ 'safari'.length+1));
            if (buildNum < 500) isSafari2 = true;
        }
        isIE6 = /msie 6/.test(ua);
    }
}

BrowserDetect.init();

// fix IE request css background image over and over again
try {document.execCommand('BackgroundImageCache', false, true)}
catch(err) {}

// ----------------------------------------------------------------------------------------------

// KILL FUZZY ON MAC FIREFOX (BROWSER DEFECT HIDES FLASH) && HIDE FUZZY FROM DIVOSTA HEADER

// No longer necessary to do any of this. 8/21/13 - PW

//YUE.onDOMReady(function() {
//    var brand = getCurrSite();
//    brand = brand.toLowerCase();
    
//    if (ua.indexOf('mac')!=-1 && ua.indexOf('firefox')!=-1) {
//		var targets = document.getElementsByTagName('s');
//		for (var i=0; i < targets.length; i++) targets[i].style.display = 'none';
//	}
//	else if (brand=='divosta' && !YUD.hasClass(document.body,'template-J')) {
//		var bgImg = document.createElement('img');
//		bgImg.src = '/images/DiVosta/specialBG.jpg';
//		bgImg.className = 'specialBG';
//		YUD.insertBefore(bgImg,YUD.getElementsByClassName('logo')[0]);
//	}
//});

// ----------------------------------------------------------------------------------------------

// GET CURRSITE

var getCurrSite = function() {
	var currSite = 'Pulte';
	if (document.getElementById('pulte')) currSite = 'Pulte';
	if (document.getElementById('delWebb') || document.getElementById('delwebb')) currSite = 'DelWebb';
	if (document.getElementById('diVosta') || document.getElementById('divosta')) currSite = 'DiVosta';
	if (document.getElementById('centex')) currSite = 'Centex';
	return currSite;
}


var getCurrBrandID = function() {
	var currBrandID = 1;
	if (document.getElementById('pulte')) currBrandID = 1;
	if (document.getElementById('delWebb') || document.getElementById('delwebb')) currBrandID = 2;
	if (document.getElementById('diVosta') || document.getElementById('divosta')) currBrandID = 3;
	if (document.getElementById('centex')) currBrandID = 4;
	return currBrandID;
}
// ----------------------------------------------------------------------------------------------

// ROUNDED NOTEBOOK CORNERS


var roundedNotebookCorners = function(){ 
    if (getCurrSite()=='Pulte') {
		Rounded('myNotebookCorners','div','all','transparent','#F5F9FD'); // my notebook
		Rounded('sharePanelCorners','div','all','transparent','#F5F9FD'); // my notebook share panel
		Rounded('comparePanelCorners','div','all','transparent','#F5F9FD'); // my notebook compare panel
		Rounded('hdrBar','div','all','transparent','#E6F0FB'); // my notebook header bars
		Rounded('messageArea','div','all','transparent','#B35817'); // my notebook ask to register
		Rounded('signInCorners','div','all','transparent','#F5F9FD'); // my notebook sign in
		Rounded('driveDirectionsCorners','div','all','transparent','#F5F9FD'); // my notebook driving directions
		Rounded('registerPanelCorners','div','all','transparent','#F5F9FD'); // my notebook register in
		Rounded('errorMessageArea','div','all','transparent','#B35817'); // my notebook error messages
		Rounded('PWerrorMessageArea','div','all','transparent','#B35817'); // my notebook error messages
		Rounded('newPWerrorMessageArea','div','all','transparent','#B35817'); // my notebook error messages
        	Rounded('infoBoxCornersNB','div','all','transparent','#FFF','border #9EC7E6'); // content info boxes

        	Rounded('cNbkHdr','div','top','transparent','#5691BE'); // cool button, community hdr
		Rounded('cNbkFtr','div','bottom','transparent','#0E4073'); // cool button, community ftr

	}

	if (getCurrSite()=='DelWebb') {
		Rounded('myNotebookCorners','div','all','transparent','#E6F0FB'); // my notebook
		Rounded('sharePanelCorners','div','all','transparent','#E6F0FB'); // my notebook share panel
		Rounded('comparePanelCorners','div','all','transparent','#E6F0FB'); // my notebook compare panel
		Rounded('hdrBar','div','all','transparent','#E6F0FB'); // my notebook header bars
		Rounded('messageArea','div','all','transparent','#993416'); // my notebook ask to register
		Rounded('signInCorners','div','all','transparent','#E6F0FB'); // my notebook sign in
		Rounded('driveDirectionsCorners','div','all','transparent','#E6F0FB'); // my notebook driving directions
		Rounded('registerPanelCorners','div','all','transparent','#E6F0FB'); // my notebook register in
		Rounded('errorMessageArea','div','all','transparent','#993416'); // my notebook error messages
        	Rounded('PWerrorMessageArea','div','all','transparent','#993416'); // my notebook error messages
		Rounded('newPWerrorMessageArea','div','all','transparent','#993416'); // my notebook error messages
        	Rounded('infoBoxCornersNB','div','all','transparent','#FFF','border #CBD24C'); // content info boxes

		Rounded('cNbkHdr','div','top','transparent','#0E4073','border #0B3D70'); // cool button, community hdr
		Rounded('cNbkFtr','div','bottom','transparent','#5B85B7','border #0B3D70'); // cool button, community ftr
	}

	if (getCurrSite()=='DiVosta') {
		Rounded('myNotebookCorners','div','all','transparent','#E8F2F9'); // my notebook
		Rounded('sharePanelCorners','div','all','transparent','#E8F2F9'); // my notebook share panel
		Rounded('comparePanelCorners','div','all','transparent','#E8F2F9'); // my notebook compare panel
		Rounded('hdrBar','div','all','transparent','#CEDEBB'); // my notebook header bars
		Rounded('messageArea','div','all','transparent','#90381C'); // my notebook ask to register
		Rounded('signInCorners','div','all','transparent','#E8F2F9'); // my notebook sign in
		Rounded('driveDirectionsCorners','div','all','transparent','#E8F2F9'); // my notebook driving directions
		Rounded('registerPanelCorners','div','all','transparent','#E8F2F9'); // my notebook register in
		Rounded('errorMessageArea','div','all','transparent','#90381C'); // my notebook error messages
	        Rounded('infoBoxCornersNB','div','all','transparent','#FFF','border #CEDEBB'); // content info boxes

		Rounded('cNbkHdr','div','top','transparent','#C4D3B3'); // cool button, community hdr
		Rounded('cNbkFtr','div','bottom','transparent','#95AF83'); // cool button, community ftr
	}

	if (getCurrSite()=='Centex') {
		Rounded('myNotebookCorners','div','all','transparent','#D0D1B4'); // my notebook
		Rounded('sharePanelCorners','div','all','transparent','#E6F0FB'); // my notebook share panel
		Rounded('comparePanelCorners','div','all','transparent','#E6F0FB'); // my notebook compare panel
		Rounded('hdrBar','div','all','transparent','#F6F6EE'); // my notebook header bars
		Rounded('messageArea','div','all','transparent','#993416'); // my notebook ask to register
		Rounded('signInCorners','div','all','transparent','#D0D1B4'); // my notebook sign in
		Rounded('driveDirectionsCorners','div','all','transparent','#E6F0FB'); // my notebook driving directions
		Rounded('registerPanelCorners','div','all','transparent','#E6F0FB'); // my notebook register in
		Rounded('errorMessageArea','div','all','transparent','#993416'); // my notebook error messages
        	Rounded('PWerrorMessageArea','div','all','transparent','#993416'); // my notebook error messages
		Rounded('newPWerrorMessageArea','div','all','transparent','#993416'); // my notebook error messages
	        Rounded('infoBoxCornersNB','div','all','transparent','#FFF','border #7B7B6B'); // content info boxes

		Rounded('cNbkHdr','div','top','transparent','#403B65','border #403B65'); // cool button, community hdr
		Rounded('cNbkFtr','div','bottom','transparent','#2D2B46','border #2D2B46'); // cool button, community ftr
	}
}

// ----------------------------------------------------------------------------------------------

// ROUNDED CORNERS


var roundedCorners = function(){ 
    roundedNotebookCorners();
    if (getCurrSite()=='Pulte') {
		Rounded('contactBoxCornersHdr','div','top','transparent','#FF6E01'); // contact box top
		Rounded('contactBoxCornersFtr','div','bottom','transparent','#864211'); // contact box bottom
        Rounded('cHdr','div','top','transparent','#5691BE'); // cool button, community hdr
		Rounded('cFtr','div','bottom','transparent','#0E4073'); // cool button, community ftr
        Rounded('alertHdr','div','top','transparent','#C96625'); // alert bar
		Rounded('alertFtr','div','bottom','transparent','#B55918'); // alert bar
		Rounded('srCorners','td','top','transparent','#5A94C2'); // search results module
		Rounded('navModule','div','top','transparent','#D3B67D'); // search results navigation module(s)
		Rounded('contactUsCorners','div','all','transparent','#F5F9FD'); // contact us
		Rounded('cuFormCorners','form','all','transparent','#FFF','border #D6BB85'); // contact us form
		Rounded('infoToolTipCorners','div','all','transparent','#FFF','border #D6BB85'); // info tooltip
        // attention box in the community page
        Rounded('aHdr','div','top','transparent','#B35817'); // cool button, community hdr
        Rounded('aFtr','div','bottom','transparent','#B35817'); // cool button, community ftr
        Rounded('aSummaryCorners','div','all','transparent','#E6F0FB','border #B35817'); // community summary
        /* pre-defined landing page */
        Rounded('OptionalBanner1','div','all','transparent','#5F4E52'); // predefined landing page Optional Banner Brown
        Rounded('OptionalBanner2','div','all','transparent','#AC5516'); // predefined landing page Optional Banner Orange
        Rounded('stepHeader','div','top','transparent','#D3B67D'); // predefined landing page step header
        Rounded('stepContentWrapper','div','bottom','transparent','#FFF','border #d0bb8c'); // predefined landing page step header
        Rounded('stepContentEmailWrapper','div','bottom','transparent','#faf3e5','border #d0bb8c'); // predefined landing page step header for email
        /* soft join form */
        //Rounded('stepHeaderSJ','div','top','transparent','#FF6E01'); // community page step header
        //Rounded('stepContentSJWrapper','div','bottom','transparent','#faf3e5','border #ac8061'); // community page step header for email

		Rounded('cuThankYouCorners','div','all','transparent','#FFF','border #D6BB85'); // contact us thank you
		Rounded('tfFormCorners','div','all','transparent','#FFF','border #9EC7E6'); // tell a friend form

    // community header
    Rounded('communitySummaryBox','div','top','transparent','#FFF','border #9EC7E6');
    Rounded('sHdr','div','top','transparent','#5691BE'); // cool button, community summary hdr
		Rounded('sFtr','div','bottom','transparent','#0E4073'); // cool button, community summary ftr
		// "Rounded" creates a pixel width line on top-right corner of the box here, so was replaced with custom function
		//Rounded('communitySummaryBox','div','bottom','transparent','#FFF','border #9EC7E6');
	}

	if (getCurrSite()=='DelWebb') {
        Rounded('contactBoxCornersHdr','div','top','transparent','#FF6E01'); // contact box top
		Rounded('contactBoxCornersFtr','div','bottom','transparent','#864211'); // contact box bottom
        Rounded('summaryCorners','div','all','transparent','#E6F0FB','border #739BCC'); // community summary
		Rounded('cHdr','div','top','transparent','#0E4073','border #0B3D70'); // cool button, community hdr
		Rounded('cFtr','div','bottom','transparent','#5B85B7','border #0B3D70'); // cool button, community ftr
		Rounded('alertHdr','div','top','transparent','#86270b'); // alert bar
		Rounded('alertFtr','div','bottom','transparent','#993416'); // alert bar
		Rounded('subfooter','div','all','transparent','#FFF'); // footer
		Rounded('srCorners','td','top','transparent','#7199CA'); // search results module
		Rounded('navModule','div','top','transparent','#CBD24C'); // search results navigation module(s)
		Rounded('contactUsCorners','div','all','transparent','#E6F0FB'); // contact us
		Rounded('cuFormCorners','form','all','transparent','#FFF','border #CBD24C'); // contact us form
		Rounded('infoToolTipCorners','div','all','transparent','#FFF','border #CBD24C'); // info tooltip
        /* pre-defined landing page */
        Rounded('OptionalBanner1','div','all','transparent','#5F4E52'); // predefined landing page Optional Banner Brown
        Rounded('OptionalBanner2','div','all','transparent','#AC5516'); // predefined landing page Optional Banner Orange
        Rounded('stepHeader','div','top','transparent','#0b3d70'); // predefined landing page step header
        Rounded('stepContentWrapper','div','bottom','transparent','#e5effb','border #c7d6ea'); // predefined landing page step header
        Rounded('stepContentEmailWrapper','div','bottom','transparent','#e6f0fb','border #c7d6ea'); // predefined landing page step header for email
        /* soft join form  */
        //Rounded('stepHeaderSJ','div','top','transparent','#FF6E01'); // community page step header
        //Rounded('stepContentSJWrapper','div','bottom','transparent','#faf3e5','border #ac8061'); // community page step header for email

        // community header
        Rounded('communitySummaryBox','div','top','transparent','#FFF','border #9EC7E6');
        Rounded('sHdr','div','top','transparent','#5691BE'); // cool button, community summary hdr
		Rounded('sFtr','div','bottom','transparent','#0E4073'); // cool button, community summary ftr
		// "Rounded" creates a pixel width line on top-right corner of the box here, so was replaced with custom function
		//Rounded('communitySummaryBox','div','bottom','transparent','#FFF','border #9EC7E6');
				
		Rounded('cuThankYouCorners','div','all','transparent','#FFF','border #CBD24C'); // contact us thank you

	}

	if (getCurrSite()=='DiVosta') {
        Rounded('contactBoxCornersHdr','div','top','transparent','#FF6E01'); // contact box top
		Rounded('contactBoxCornersFtr','div','bottom','transparent','#864211'); // contact box bottom
        Rounded('summaryCorners','div','all','transparent','','border #CEDEBB'); // community summary
		Rounded('cHdr','div','top','transparent','#C4D3B3'); // cool button, community hdr
		Rounded('cFtr','div','bottom','transparent','#95AF83'); // cool button, community ftr
		Rounded('alertHdr','div','top','transparent','#72250C'); // alert bar
		Rounded('alertFtr','div','bottom','transparent','#8F371B'); // alert bar
		Rounded('srCorners','td','top','transparent','#CDDDBB'); // search results module
		Rounded('navModule','div','top','transparent','#9EC7E6'); // search results navigation module(s)
		Rounded('contactUsCorners','div','all','transparent','#E8F2F9'); // contact us
		Rounded('cuFormCorners','form','all','transparent','#FFF','border #CEDEBB'); // contact us form
		Rounded('infoToolTipCorners','div','all','transparent','#FFF','border #94AE82'); // info tooltip
        /* pre-defined landing page */
        Rounded('OptionalBanner1','div','all','transparent','#5F4E52'); // predefined landing page Optional Banner Brown
        Rounded('OptionalBanner2','div','all','transparent','#AC5516'); // predefined landing page Optional Banner Orange
        Rounded('stepHeader','div','top','transparent','#5ea2da'); // predefined landing page step header
        Rounded('stepContentWrapper','div','bottom','transparent','#ecf2e5','border #d4e2c3'); // predefined landing page step header
        Rounded('stepContentEmailWrapper','div','bottom','transparent','#ddebf6','border #e4ecf5'); // predefined landing page step header for email
        /* soft join form */
        //Rounded('stepHeaderSJ','div','top','transparent','#FF6E01'); // community page step header
        //Rounded('stepContentSJWrapper','div','bottom','transparent','#faf3e5','border #ac8061'); // community page step header for email

        // community header
        Rounded('communitySummaryBox','div','top','transparent','#FFF','border #9EC7E6');
        Rounded('sHdr','div','top','transparent','#5691BE'); // cool button, community summary hdr
		Rounded('sFtr','div','bottom','transparent','#0E4073'); // cool button, community summary ftr
		// "Rounded" creates a pixel width line on top-right corner of the box here, so was replaced with custom function
		//Rounded('communitySummaryBox','div','bottom','transparent','#FFF','border #9EC7E6');
				
		Rounded('cuThankYouCorners','div','all','transparent','#FFF','border #CEDEBB'); // contact us thank you
		Rounded('tfFormCorners','div','all','transparent','#FFF','border #94AE82'); // tell a friend form
	}

	if (getCurrSite()=='Centex') {
        Rounded('contactBoxCornersHdr','div','top','transparent','#FF6E01'); // contact box top
		Rounded('contactBoxCornersFtr','div','bottom','transparent','#864211'); // contact box bottom
        Rounded('summaryCorners','div','all','transparent','#E6F0FB','border #739BCC'); // community summary
		Rounded('cHdr','div','top','transparent','#403B65','border #403B65'); // cool button, community hdr
		Rounded('cFtr','div','bottom','transparent','#2D2B46','border #2D2B46'); // cool button, community ftr
		Rounded('alertHdr','div','top','transparent','#B3B39F'); // alert bar
		Rounded('alertFtr','div','bottom','transparent','#7B7B6B'); // alert bar
		Rounded('subfooter','div','all','transparent','#FFF'); // footer
		Rounded('srCorners','td','top','#F6F6EE','#7B7B6B'); // search results module
		Rounded('navModule','div','top','transparent','#CBD24C'); // search results navigation module(s)
		Rounded('contactUsCorners','div','all','transparent','#E6F0FB'); // contact us
		Rounded('cuFormCorners','form','all','transparent','#FFF','border #7B7B6B'); // contact us form
		Rounded('infoToolTipCorners','div','all','transparent','#FFF','border #CBD24C'); // info tooltip
        /* pre-defined landing page */
        Rounded('OptionalBanner1','div','all','transparent','#5F4E52'); // predefined landing page Optional Banner Brown
        Rounded('OptionalBanner2','div','all','transparent','#AC5516'); // predefined landing page Optional Banner Orange
        Rounded('stepHeader','div','top','transparent','#403B65'); // predefined landing page step header
        Rounded('stepContentWrapper','div','bottom','transparent','#F6F6EE','border #7B7B6B'); // predefined landing page step header
        Rounded('stepContentEmailWrapper','div','bottom','transparent','#D0D1B4','border #7B7B6B'); // predefined landing page step header for email
        /* soft join form  */
        //Rounded('stepHeaderSJ','div','top','transparent','#FF6E01'); // community page step header
        //Rounded('stepContentSJWrapper','div','bottom','transparent','#faf3e5','border #ac8061'); // community page step header for email

        // community header
        Rounded('communitySummaryBox','div','top','transparent','#FFF','border #9EC7E6');
        Rounded('sHdr','div','top','transparent','#403B65'); // cool button, community summary hdr
		Rounded('sFtr','div','bottom','transparent','#2D2B46'); // cool button, community summary ftr
		// "Rounded" creates a pixel width line on top-right corner of the box here, so was replaced with custom function
		//Rounded('communitySummaryBox','div','bottom','transparent','#FFF','border #9EC7E6');
				
		Rounded('cuThankYouCorners','div','all','transparent','#FFF','border #CBD24C'); // contact us thank you
		Rounded('tfFormCorners','div','all','transparent','#FFF','border #739BCC'); // tell a friend form
	}

}

// Rounding Conditionally on Existance of Classes
var roundOnClasses = function(){ 
   if (getCurrSite()=='Pulte') {
      // sign up pop up
      if (YUD.hasClass('pulte','signUp')) Rounded('cuInfoCorners','div','all','transparent','#F5F8FD','border #9EC7E6'); // Sign Up Pop Up infoboxes F5F8FD | D2E5F3
      else Rounded('cuInfoCorners','div','all','transparent','#FFF','border #9EC7E6'); // contact us infoboxes

		var v =YUD.getElementsByClassName('communitySummaryBox','div');
		if(v[0]!=null) {
			AddCommunitySummaryBottom(v[0], '#9EC7E6');
			if (ua.indexOf("msie 6")>0) {
			  var visit = document.getElementById("visit");
			  if (visit!=null) visit.style.width = "176px";
			}
		}
		
		if (YUD.hasClass('pulte','template-A')){ // grid A
			Rounded('overlayCorners','div','all','transparent','#FFF','border #C5A35A'); // map overlay
		}
		if (YUD.hasClass('pulte','template-D')){ // grid D
			Rounded('primaryContentCorners','div','all','transparent','#FFF','border #9EC7E6'); // primary content
			Rounded('pHdr','div','top','transparent','#5691BE'); // cool button, plan hdr
			Rounded('pFtr','div','bottom','transparent','#0E4073'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #9EC7E6'); // content info boxes
		}
		if (YUD.hasClass('pulte','template-E') || YUD.hasClass('pulte','template-N')){ // grid E & N
			Rounded('planFuzzyWrapper','div','all','transparent','#FFF'); // primary content plan
			Rounded('pHdr','div','top','transparent','#D3B77E'); // cool button, plan hdr
			Rounded('pFtr','div','bottom','transparent','#BF9A46'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #D6BB85'); // content info boxes
		}
		if (YUD.hasClass('pulte','template-F')){ // grid F or A
			Rounded('overlayWrapper','div','all','transparent','#FFF'); // map overlay
		}
		if (YUD.hasClass('pulte','template-H')){ // grid H
			Rounded('csTopCorners','td','top','transparent','#5994C1','border #A9CEE8'); // FAQs
			Rounded('csBottomCorners','td','bottom','transparent','#FFF','border #A9CEE8'); // FAQs
			Rounded('glossaryCorners','div','all','transparent','#FFF','border #E8DABD'); // glossary
		}
		if (YUD.hasClass('pulte','template-I') || YUD.hasClass('pulte','template-G') || YUD.hasClass('pulte','template-L')){ // grid I & G & L
			Rounded('iHdr','div','top','transparent','#D3B77E'); // cool button, plan hdr
			Rounded('iFtr','div','bottom','transparent','#BF9A46'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #D6BB85'); // secondary content info boxes
		}
	}

	if (getCurrSite()=='Centex') {
        // sign up pop up
		if (YUD.hasClass('centex','signUp')) Rounded('cuInfoCorners','div','all','transparent','#F5F8FD','border #7B7B6B'); // Sign Up Pop Up infoboxes F5F8FD | D2E5F3
		else Rounded('cuInfoCorners','div','all','transparent','#FFF','border #7B7B6B'); // contact us infoboxes


		var v =YUD.getElementsByClassName('communitySummaryBox','div');
		if(v[0]!=null) {
			AddCommunitySummaryBottom(v[0], '#403B65');
			if (ua.indexOf("msie 6")>0) {
			  var visit = document.getElementById("visit");
			  if (visit!=null) visit.style.width = "176px";
			}
		}
				
         if (YUD.hasClass('centex','template-A')){ // grid A
            Rounded('overlayCorners','div','all','transparent','#FFF','border #6A181A'); // map overlay
         }
		if (YUD.hasClass('centex','template-D')){ // grid D
			//Rounded('contentWrapper','div','top','transparent','#FFF'); // content top
			Rounded('primaryContentCorners','div','all','transparent','#FFF','border #403B65'); // primary content
			Rounded('pHdr','div','top','transparent','#403B65'); // cool button, plan hdr
			Rounded('pFtr','div','bottom','transparent','#403B65'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #403B65'); // content info boxes
		}
		if (YUD.hasClass('centex','template-E') || YUD.hasClass('centex','template-N')){ // grid E & N
			//Rounded('contentWrapper','div','top','transparent','#FFF'); // content top
			Rounded('planFuzzyWrapper','div','all','transparent','#FFF'); // primary content plan
			Rounded('pHdr','div','top','transparent','#B3B39F','border #B3B39F'); // cool button, plan hdr
			Rounded('pFtr','div','bottom','transparent','#7B7B6B','border #7B7B6B'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #7B7B6B'); // content info boxes
			//Rounded('contentWrapper','div','bottom','transparent','#E7F1FB'); // content bottom
		}
		if (YUD.hasClass('centex','template-F')){ // grid F
			Rounded('overlayWrapper','div','all','transparent','#FFF'); // map overlay
		}
		if (YUD.hasClass('centex','template-A')||YUD.hasClass('centex','template-F')||YUD.hasClass('centex','template-Q')||YUD.hasClass('centex','template-G')||YUD.hasClass('centex','template-H')||YUD.hasClass('centex','template-I')||YUD.hasClass('centex','template-L')){ // grid A,F,G,H,I,L
			//Rounded('contentWrapper','div','all','transparent','#FFF'); // content
		}
		if (YUD.hasClass('centex','template-H')){ // grid H
			Rounded('csTopCorners','td','top','transparent','#0D3F72','border #0D3F72'); // FAQs
			Rounded('csBottomCorners','td','bottom','transparent','#FFF','border #C1D3E8'); // FAQs
			Rounded('glossaryCorners','div','all','transparent','#FFF','border #739BCC'); // glossary
		}
		if (YUD.hasClass('centex','template-I') || YUD.hasClass('centex','template-G') || YUD.hasClass('centex','template-L')){ // grid I & G & L
			Rounded('iHdr','div','top','transparent','#B3B39F','border #B3B39F'); // cool button, plan hdr
			Rounded('iFtr','div','bottom','transparent','#7B7B6B','border #7B7B6B'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #7B7B6B'); // secondary content info boxes
		}
    }



	if (getCurrSite()=='DelWebb') {
        // sign up pop up
		if (YUD.hasClass('delWebb','signUp')) Rounded('cuInfoCorners','div','all','transparent','#F5F8FD','border #739BCC'); // Sign Up Pop Up infoboxes F5F8FD | D2E5F3
		else Rounded('cuInfoCorners','div','all','transparent','#FFF','border #739BCC'); // contact us infoboxes

		var v =YUD.getElementsByClassName('communitySummaryBox','div');
		if(v[0]!=null) {
			AddCommunitySummaryBottom(v[0], '#9EC7E6');
			if (ua.indexOf("msie 6")>0) {
			  var visit = document.getElementById("visit");
			  if (visit!=null) visit.style.width = "176px";
			}
		}
				

        if (YUD.hasClass('delWebb','template-A')){ // grid A
			Rounded('overlayCorners','div','all','transparent','#FFF','border #AFB720'); // map overlay
		}

		if (YUD.hasClass('delWebb','template-D')){ // grid D
			Rounded('contentWrapper','div','top','transparent','#FFF'); // content top
			Rounded('primaryContentCorners','div','all','transparent','#FFF','border #739BCC'); // primary content
			Rounded('pHdr','div','top','transparent','#0E4073','border #0B3D70'); // cool button, plan hdr
			Rounded('pFtr','div','bottom','transparent','#5B85B7','border #0B3D70'); // cool button, plan fdr
			Rounded('contentWrapper','div','bottom','transparent','#E7F1FB'); // content bottom
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #E6F0FB'); // content info boxes
		}
		if (YUD.hasClass('delWebb','template-E') || YUD.hasClass('delWebb','template-N')){ // grid E & N
			Rounded('contentWrapper','div','top','transparent','#FFF'); // content top
			Rounded('planFuzzyWrapper','div','all','transparent','#FFF'); // primary content plan
			Rounded('pHdr','div','top','transparent','#CAD14B','border #AFB720'); // cool button, plan hdr
			Rounded('pFtr','div','bottom','transparent','#AFB720','border #AFB720'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #CBD24C'); // content info boxes
			Rounded('contentWrapper','div','bottom','transparent','#E7F1FB'); // content bottom
		}
		if (YUD.hasClass('delWebb','template-F')){ // grid F
			Rounded('overlayWrapper','div','all','transparent','#FFF'); // map overlay
		}
		if (YUD.hasClass('delWebb','template-A')||YUD.hasClass('delWebb','template-F')||YUD.hasClass('delWebb','template-Q')||YUD.hasClass('delWebb','template-G')||YUD.hasClass('delWebb','template-H')||YUD.hasClass('delWebb','template-I')||YUD.hasClass('delWebb','template-L')){ // grid A,F,G,H,I,L
			Rounded('contentWrapper','div','all','transparent','#FFF'); // content
		}
		if (YUD.hasClass('delWebb','template-H')){ // grid H
			Rounded('csTopCorners','td','top','transparent','#0D3F72','border #0D3F72'); // FAQs
			Rounded('csBottomCorners','td','bottom','transparent','#FFF','border #C1D3E8'); // FAQs
			Rounded('glossaryCorners','div','all','transparent','#FFF','border #739BCC'); // glossary
		}
		if (YUD.hasClass('delWebb','template-I') || YUD.hasClass('delWebb','template-G') || YUD.hasClass('delWebb','template-L')){ // grid I & G & L
			Rounded('iHdr','div','top','transparent','#CBD24C','border #AFB720'); // cool button, plan hdr
			Rounded('iFtr','div','bottom','transparent','#AFB720','border #AFB720'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #CBD24C'); // secondary content info boxes
		}
	}

	if (getCurrSite()=='DiVosta') {
        // sign up pop up
		if (YUD.hasClass('diVosta','signUp')) Rounded('cuInfoCorners','div','all','transparent','#F5F8FD','border #9EC7E6'); // Sign Up Pop Up infoboxes F5F8FD | D2E5F3
		else Rounded('cuInfoCorners','div','all','transparent','#FFF','border #9EC7E6'); // contact us infoboxes

		var v =YUD.getElementsByClassName('communitySummaryBox','div');
		if(v[0]!=null) {
			AddCommunitySummaryBottom(v[0], '#9EC7E6');
			if (ua.indexOf("msie 6")>0) {
			  var visit = document.getElementById("visit");
			  if (visit!=null) visit.style.width = "176px";
			}
		}
				

        if (YUD.hasClass('diVosta','template-A')){ // grid A
			Rounded('contentWrapper','div','all','transparent','#FFF'); // homepage content
		}
		if (YUD.hasClass('diVosta','template-D')){ // grid D
			Rounded('contentWrapper','div','top','transparent','#FFF'); // content top
			Rounded('primaryContentCorners','div','all','transparent','#FFF','border #DFE5D7'); // primary content
			Rounded('pHdr','div','top','transparent','#C4D3B3','border #CCDCB9'); // cool button, plan hdr
			Rounded('pFtr','div','bottom','transparent','#95AF83','border #CCDCB9'); // cool button, plan fdr
			Rounded('contentWrapper','div','bottom','transparent','#EFF5E9'); // content bottom
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #CEDEBB'); // content info boxes
		}
		if (YUD.hasClass('diVosta','template-E') || YUD.hasClass('diVosta','template-N')){ // grid E & N
			Rounded('contentWrapper','div','top','transparent','#FFF'); // content top
			Rounded('planFuzzyWrapper','div','all','transparent','#FFF'); // primary content plan
			Rounded('pHdr','div','top','transparent','#A6CCE8'); // cool button, plan hdr
			Rounded('pFtr','div','bottom','transparent','#68A8DC'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #9EC7E6'); // content info boxes
			Rounded('contentWrapper','div','bottom','transparent','#EFF5E9'); // content bottom
		}
		if (YUD.hasClass('diVosta','template-F')){ // grid F
			Rounded('overlayWrapper','div','all','transparent','#FFF'); // map overlay
		}
		if (YUD.hasClass('diVosta','template-F')||YUD.hasClass('diVosta','template-Q')||YUD.hasClass('diVosta','template-G')||YUD.hasClass('diVosta','template-H')||YUD.hasClass('diVosta','template-I')||YUD.hasClass('diVosta','template-L')){ // grid F,G,H,I,L
			Rounded('contentWrapper','div','all','transparent','#FFF'); // content
		}
		if (YUD.hasClass('diVosta','template-H')){ // grid H
			Rounded('csTopCorners','td','top','transparent','#ABCFE9','border #ABCFE9'); // FAQs
			Rounded('csBottomCorners','td','bottom','transparent','#FFF','border #D9EAF5'); // FAQs
			Rounded('glossaryCorners','div','all','transparent','#FFF','border #9EC7E6'); // glossary
		}
		if (YUD.hasClass('diVosta','template-I') || YUD.hasClass('diVosta','template-G') || YUD.hasClass('diVosta','template-L')){ // grid I & G & L
			Rounded('iHdr','div','top','transparent','#C4D3B3','border #CCDCB9'); // cool button, plan hdr
			Rounded('iFtr','div','bottom','transparent','#95AF83','border #CCDCB9'); // cool button, plan hdr
			Rounded('infoBoxCorners','div','all','transparent','#FFF','border #CEDDBA'); // secondary content info boxes
		}
	}
}

// ROUNDED CORNERS (on function call)

var renderSearchResultsCorners = function() {
	if (getCurrSite()=='Pulte') Rounded('srCorners','td','top','transparent','#5A94C2');
	if (getCurrSite()=='DelWebb') Rounded('srCorners','td','top','transparent','#7199CA');
	if (getCurrSite()=='DiVosta') Rounded('srCorners','td','top','transparent','#CDDDBB');
}

var renderPlanGalleryCorners = function() {
	if (getCurrSite()=='Pulte') {
		Rounded('cHdr','div','top','transparent','#5691BE'); // cool button, left nav communities hdr
		Rounded('cFtr','div','bottom','transparent','#0E4073'); // cool button, left nav communities ftr
	}
	if (getCurrSite()=='DelWebb') {
		Rounded('cHdr','div','top','transparent','#0E4073','border #0B3D70'); // cool button, left nav communities hdr
		Rounded('cFtr','div','bottom','transparent','#5B85B7','border #0B3D70'); // cool button, left nav communities ftr
	}
	if (getCurrSite()=='DiVosta') {
		Rounded('cHdr','div','top','transparent','#C4D3B3','border #CCDCB9'); // cool button, left nav communities hdr
		Rounded('cFtr','div','bottom','transparent','#95AF83','border #CCDCB9'); // cool button, left nav communities ftr
	}
	if (getCurrSite()=='Centex') {
		Rounded('cHdr','div','top','transparent','#C4D3B3','border #403B65'); // cool button, left nav communities hdr
		Rounded('cFtr','div','bottom','transparent','#95AF83','border #2D2B46'); // cool button, left nav communities ftr
	}
}

// rounded corners for Notebook Registration Panel
var renderNotebookRegisterCorners = function(){
    if (getCurrSite()=='Pulte') {
        Rounded('registerPanelCorners','div','all','transparent','#F5F9FD'); // my notebook register in
        Rounded('errorMessageAreaNBReg','div','all','transparent','#B35817'); // my notebook error messages
        Rounded('infoBoxCornersNBReg','div','all','transparent','#FFF','border #9EC7E6'); // content info boxes
        Rounded('infoToolTipCorners','div','all','transparent','#FFF','border #D6BB85');
	} else if (getCurrSite()=='DelWebb') {
        Rounded('registerPanelCorners','div','all','transparent','#E6F0FB'); // my notebook register in
        Rounded('errorMessageAreaNBReg','div','all','transparent','#993416'); // my notebook error messages
        Rounded('infoBoxCornersNBReg','div','all','transparent','#FFF','border #CBD24C'); // content info boxes
        Rounded('infoToolTipCorners','div','all','transparent','#FFF','border #CBD24C');
	} else if (getCurrSite()=='DiVosta') {
        Rounded('registerPanelCorners','div','all','transparent','#E8F2F9'); // my notebook register in
        Rounded('errorMessageAreaNBReg','div','all','transparent','#90381C'); // my notebook error messages
        Rounded('infoBoxCornersNBReg','div','all','transparent','#FFF','border #CEDEBB'); // content info boxes
        Rounded('infoToolTipCorners','div','all','transparent','#FFF','border #CEDEBB');
	} else if (getCurrSite()=='Centex') {
        Rounded('registerPanelCorners','div','all','transparent','#D0D1B4'); // my notebook register in
        Rounded('infoBoxCornersNBReg','div','all','#D0D1B4','#FFF','border #7B7B6B'); // content info boxes
	}
}

// NIFTY CORNERS BY ALESSANDRO FULCINITI

var NiftyCheck = function() {
	if (!document.getElementById) return false;
	var b=navigator.userAgent.toLowerCase();
	if (b.indexOf('msie 5')>0 && b.indexOf('opera')==-1) return false;
	return true;
}

var Rounded = function(classname,tag,wich,bk,color,opt){
	var i,prefixt,prefixb,cn='r',ecolor='',edges=false,eclass='',b=false,t=false;
    var v=YUD.getElementsByClassName(classname, tag);
    if(v.length > 0) { // element found

	if(color=='transparent'){
		cn=cn+'x';
		ecolor=bk;
		bk='transparent';
	}

	else if(opt && opt.indexOf('border')>=0){
		var optar=opt.split(' ');
		for(i=0;i<optar.length;i++)
		if(optar[i].indexOf('#')>=0) ecolor=optar[i];
		if(ecolor=='') ecolor='#666';
		cn+='e';
		edges=true;
	}

	else if(opt && opt.indexOf('smooth')>=0){
		cn+='a';
		ecolor=Mix(bk,color);
	}

	if(opt && opt.indexOf('small')>=0) cn+='s';
	prefixt=cn;
	prefixb=cn;

	if(wich.indexOf('all')>=0){t=true;b=true}
	else if(wich.indexOf('top')>=0) t='true';
	else if(wich.indexOf('tl')>=0){
		t='true';
		if(wich.indexOf('tr')<0) prefixt+='l';
	}
	else if(wich.indexOf('tr')>=0){
		t='true';
		prefixt+='r';
	}

	if(wich.indexOf('bottom')>=0) b=true;
	else if(wich.indexOf('bl')>=0){
		b='true';
		if(wich.indexOf('br')<0) prefixb+='l';
	}
	else if(wich.indexOf('br')>=0){
		b='true';
		prefixb+='r';
	}

    	
	var l=v.length;
	for(i=0;i<l;i++){
		if(edges) AddBorder(v[i],ecolor);
		if(t) AddTop(v[i],bk,color,ecolor,prefixt);
		if(b) AddBottom(v[i],bk,color,ecolor,prefixb);
	}
	}
}

var AddBorder = function(el,bc) {
	var i;
	if(!el.passed){
		if(el.childNodes.length==1 && el.childNodes[0].nodeType==3){
			var t=el.firstChild.nodeValue;
			el.removeChild(el.lastChild);
			var d=CreateEl('span');
			d.style.display='block';
			d.appendChild(document.createTextNode(t));
			el.appendChild(d);
		}
		for(i=0;i<el.childNodes.length;i++){
			if(el.childNodes[i].nodeType==1){
				el.childNodes[i].style.borderLeft='1px solid '+bc;
				el.childNodes[i].style.borderRight='1px solid '+bc;
			}
		}
    }
	el.passed=true;
}

function AddTop(el,bk,color,bc,cn){
	var i,lim=4,d=CreateEl('b');

	if(cn.indexOf('s')>=0) lim=2;
	if(bc) d.className='artop';
	else d.className='rtop';
	d.style.backgroundColor=bk;
	for(i=1;i<=lim;i++){
		var x=CreateEl('b');
		x.className=cn + i;
		x.style.backgroundColor=color;
		if(bc) x.style.borderColor=bc;
		d.appendChild(x);
		}
	el.style.paddingTop=0;
	el.insertBefore(d,el.firstChild);
	}

	function AddBottom(el,bk,color,bc,cn){
	var i,lim=4,d=CreateEl('b');

	if(cn.indexOf('s')>=0) lim=2;
	if(bc) d.className='artop';
	else d.className='rtop';
	d.style.backgroundColor=bk;
	for(i=lim;i>0;i--){
		var x=CreateEl('b');
		x.className=cn + i;
		x.style.backgroundColor=color;
		if (bc) x.style.borderColor=bc;
		d.appendChild(x);
	}
	el.style.paddingBottom=0;
	el.appendChild(d);
}

function AddCommunitySummaryBottom(el,bc){ // for no visible reason regular AddBottom doesn't work right for community summary
	var i,lim=5,d=CreateEl('b'),cn='re';
  d.className='artop';
	d.style.backgroundColor='transparent';
	for(i=lim;i>0;i--){
		var x=CreateEl('b');
		x.className=cn + i;
		x.style.backgroundColor='transparent';
		x.style.borderColor=bc;
		if (i==lim) x.style.visibility='hidden'; // otherwise it adds a pixel on top-right of the CommunitySummaryBox
		d.appendChild(x);
	}
	el.style.paddingBottom=0;
	el.appendChild(d);
}
		

var CreateEl = function(x) {return(document.createElement(x))}

var Mix = function(c1,c2) {
	var i,step1,step2,x,y,r=new Array(3);
	if(c1.length==4)step1=1;
	else step1=2;
	if(c2.length==4) step2=1;
	else step2=2;
	for(i=0;i<3;i++){
		x=parseInt(c1.substr(1+step1*i,step1),16);
		if (step1==1) x=16*x+x;
		y=parseInt(c2.substr(1+step2*i,step2),16);
		if (step2==1) y=16*y+y;
		r[i]=Math.floor((x*50+y*50)/100);
	}
	return('#'+r[0].toString(16)+r[1].toString(16)+r[2].toString(16));
}

// ----------------------------------------------------------------------------------------------

// ADD SPECIAL CORNER GRAPHX FOR DIVOSTA/DELWEBB TEMPLATE H (AUTO-INITIATED USING YUI ON-AVAILABLE)

YUE.onDOMReady(function() {

	if (document.getElementById('diVosta') && (YUD.hasClass(document.body,'template-H') || YUD.hasClass(document.body,'template-I'))) {
		var cornerImg = document.createElement('img');
			cornerImg.src = '/images/DiVosta/specialCorner.gif';
			cornerImg.className = 'specialCorner';
		var target = YUD.getElementsByClassName('content')[0];
		YUD.insertBefore(cornerImg,target);
	}

	if (document.getElementById('delWebb') && (YUD.getElementsByClassName('template-H','body').length>0 || YUD.getElementsByClassName('template-I','body').length>0)) {
		var cornerImg = document.createElement('img');
			cornerImg.src = '/images/DelWebb/specialCorner.gif';
			cornerImg.className = 'specialCorner';
		var target = YUD.getElementsByClassName('content')[0];
		YUD.insertBefore(cornerImg,target);
	}
});



// ----------------------------------------------------------------------------------------------

// COPYRIGHT DATE

var getCurrYear = function(returnit) {
	var crYear = new Date().getYear();
	if (crYear < 2000) crYear = crYear + 1900; /* moz */
	if (returnit){
	return crYear;
	} else {
	document.write(crYear);
	}
}

//jQuery(document).ready(function($) {
//    $(".getCurrYear").append(getCurrYear(true));
//});


// ----------------------------------------------------------------------------------------------

// EXPAND THE CONTENT HEIGHT
// if left nav content is > then right main content (left nav is absolute positioned)

var redrawNavHeight = function() {
	var leftCol = YUD.getElementsByClassName('navContentWrapper','div',document)[0];
	if(leftCol){
		var leftContainer = YUD.getElementsByClassName('secondaryNavContainer','div',document)[0];
		var rightContainer = YUD.getElementsByClassName('primaryContent','div',document)[0];
		(rightContainer.offsetHeight < leftContainer.offsetHeight) ? leftCol.style.height = leftContainer.offsetHeight + 'px' : leftCol.style.height = rightContainer.offsetHeight + 'px';
	}
}

// ----------------------------------------------------------------------------------------------

// CUSTOM SHOW/HIDE

var customShowHide = function (parentObj) {
	var theObject;
	if (typeof parentObj =='undefined') {theObject = YUD.getElementsByClassName('toggle')}
	else {theObject = YUD.getElementsByClassName('toggle','',parentObj)}

	for (var i=0; i < theObject.length; i++) {
        var theTrigger = YUD.getElementsByClassName('toggleTrigger','',theObject[i]);
        handleDropDown(theObject[i],theTrigger[0]);

		//separate this to make notebook function work
        var theTriggerTxt = YUD.getElementsByClassName('toggleTxt','',theObject[i]);
        for(var k=0; k < theTriggerTxt.length; k++) handleDropDown(theObject[i],theTriggerTxt[k]);
    }
};

var handleDropDown = function(theObject,theTrigger) {
	YUE.addListener(theTrigger,'click',function(){
        var theTarget = YUD.getElementsByClassName('toggleTarget','',theObject)[0];
        var triggerBtn, triggerTxt;

        if (YUD.hasClass(theTrigger,'toggleBtn')) {
            triggerBtn = theTrigger;
            triggerTxt = YUD.getElementsByClassName('toggleTxt','',theObject)[0];
        }

        if (YUD.hasClass(theTrigger,'toggleTxt')) {
            triggerBtn = YUD.getElementsByClassName('toggleBtn','',theObject)[0];
            triggerTxt = theTrigger;
        }

        if (YUD.hasClass(theTarget,'hide')){
			YUD.replaceClass(theTarget,'hide','show');

			// take care of the button if exists
            if (triggerBtn){
                if (triggerBtn.getElementsByTagName('img')[0]) {
                    var newTarget = triggerBtn.getElementsByTagName('img')[0];
                    var newSrc = newTarget.src.replace('plus','minus');
                    newTarget.setAttribute('src',newSrc);
                }
            }
            // if we have trigger text
            if (triggerTxt) triggerTxt.innerHTML = 'Close series';
        }

		else {
			YUD.replaceClass(theTarget,'show','hide');
            if (triggerBtn){
                if (triggerBtn.getElementsByTagName('img')[0]) {
                    var newTarget = triggerBtn.getElementsByTagName('img')[0];
                    var newSrc = newTarget.src.replace('minus','plus');
                    newTarget.setAttribute('src',newSrc);
                }
            }
            if (triggerTxt) triggerTxt.innerHTML = 'Open series';
        }
        redrawNavHeight();
    });
};

// ----------------------------------------------------------------------------------------------

// TAB NAVIGATION

var tabView, tabViewAmenities, tabViewEvents;

YUE.onDOMReady(function() {

	// community info tabs
	if (document.getElementById('primaryTabs')) {
		tabView = new YAHOO.widget.TabView('primaryTabs');
        var onloadTarget = tabView.getElementsByClassName('yui-nav')[0].getElementsByTagName('LI');
		var target = tabView.getElementsByClassName('yui-nav')[0].getElementsByTagName('IMG');
		onloadTabs(onloadTarget,'jpgTabs');
		clickTabs(target,'.jpg','-on.jpg');

        // add google-map to tab on "about the area" and "directions"
        var handleActiveTabChange = function(e) {
            var activeIndex = tabView.get('activeIndex');
            var activeTab = tabView.getTab(activeIndex);
            var tabId = activeTab.getElementsByTagName('a')[0].id;
            
            var altTabId = activeTab.getElementsByTagName('a')[0].title;
            altTabId = altTabId.replace(" ","") + "TabClicked"



	        //SiteCatalyst code to track tab clicks***************************************************************************************
            if (((tabId != "")||(altTabId != ""))&&(UseSiteCatalyst)) {



	          //var sttabId = !tabId ? "unspecifiedTabClicked" : tabId;  //DirectionsTab or AboutAreaTab
	          var sttabId = !tabId ? altTabId : tabId;  //DirectionsTab or AboutAreaTab
	          //s.pageName=s.pageName + " - " + tabId;
	          s.pageName=s.pageName + " - " + sttabId;


	          if (sttabId.indexOf("aboutArea")==0){
	             s.events="event7";
	          }
	          else if (sttabId.indexOf("directions")==0){
	             s.events="event6";
	          }

	          //s.events=s.linkTrackEvents;

                  var sTabContactGroup=sContentGroup;
                  if (sTabContactGroup.length>0)
                      if(sTabContactGroup.indexOf("/index")>0)
                        sTabContactGroup = sTabContactGroup.replace("/index","");
                      else if(sTabContactGroup.indexOf("/Find a Home")>0)
                        sTabContactGroup = sTabContactGroup.replace("/Find a Home","");


	          s.eVar6=sTabContactGroup;
	          s.tl("true","o",sttabId);

	          s.events="None";
              s.eVar6 = "";





            }
	        //End SiteCatalyst code to track tab clicks***********************************************************************************






            // If the "Overview" tab is clicked, re-load the carousel if it exists
            if (activeIndex == 0) {
               loadCarousel();
            }
            // track the event of looking for directions
            if (tabId && (tabId == 'directionsTabClicked')) {
                //Pulte_TAB_SUBMIT();
            }
            // if tab is "directions" or "about the area", if google map exists and has not been loaded, load the google map
            if(tabId && (tabId == 'aboutAreaTabClicked' || tabId == 'directionsTabClicked')) {
                var tabContent = activeTab.get('contentEl');
                var mapDiv = YUD.getElementsByClassName('google-map','div',tabContent)[0];
                if(!mapDiv) return;

                // check if we already loaded the map
                if(!YUD.hasClass(mapDiv, 'loaded')){
                    if(tabId == 'aboutAreaTabClicked') {loadGSearch();}
					else {
                        // added marker on directions tab
                        var map = new google.maps.Map(mapDiv);
			            map.addControl(new GSmallMapControl());
                        var point = new google.maps.LatLng(defaultMapLat, defaultMapLng);
                        map.setCenter(point);
                        map.setZoom(14);
                        var address = '';
                        if(typeof dirAddress != 'undefined' && dirAddress) address += dirAddress.address + '<br />' + dirAddress.city + ', ' + dirAddress.state + ' ' + dirAddress.zip;
                        var bubbleContent = '<table border=0 cellpadding=0 cellspacing=0><tr><td>' + address + '<br />' + '</td></tr></table>';
                        var marker = customMarkerUtils.createMarker(point, bubbleContent, getCurrSite().toLowerCase());
                        map.addOverlay(marker);
                        mapDiv.map = map;
                    }
                    YUD.addClass(mapDiv,'loaded');
                }
            }
            redrawNavHeight();
        };

        tabView.addListener('activeTabChange',handleActiveTabChange);
		checkSpecialOffers(); // set "special offers" state
        preSelectTab(); // set selected tab (from URL query string)
    }

	// amenities tertiary tabs
	if (document.getElementById('amenitiesTabs')) {
		tabViewAmenities = new YAHOO.widget.TabView('amenitiesTabs');
		var onloadTarget = tabViewAmenities.getElementsByClassName('yui-nav')[0].getElementsByTagName('LI');
		var target = tabViewAmenities.getElementsByClassName('yui-nav')[0].getElementsByTagName('IMG');
        tabViewAmenities.addListener('activeTabChange',handleActiveTabHeight);
    }
	// events tertiary tabs
	if (document.getElementById('eventTabs')) {
		tabViewEvents = new YAHOO.widget.TabView('eventTabs');
		var onloadTarget = tabViewEvents.getElementsByClassName('yui-nav')[0].getElementsByTagName('LI');
		var target = tabViewEvents.getElementsByClassName('yui-nav')[0].getElementsByTagName('IMG');
        tabViewEvents.addListener('activeTabChange',handleActiveTabHeight);
    }
	// meet the residents tertiary tabs
	if (document.getElementById('meetTabs')) {
		tabViewEvents = new YAHOO.widget.TabView('meetTabs');
		var onloadTarget = tabViewEvents.getElementsByClassName('yui-nav')[0].getElementsByTagName('LI');
		var target = tabViewEvents.getElementsByClassName('yui-nav')[0].getElementsByTagName('IMG');
        tabViewEvents.addListener('activeTabChange',handleActiveTabHeight);
    }
	// meet the residents tertiary tabs
	if (document.getElementById('meetTabs')) {
		tabViewEvents = new YAHOO.widget.TabView('meetTabs');
		var onloadTarget = tabViewEvents.getElementsByClassName('yui-nav')[0].getElementsByTagName('LI');
		var target = tabViewEvents.getElementsByClassName('yui-nav')[0].getElementsByTagName('IMG');
        tabViewEvents.addListener('activeTabChange',handleActiveTabHeight);
    }
	// about the area tertiary tabs
	if (document.getElementById('aboutAreaTabs')) {
		var tabViewAboutArea = new YAHOO.widget.TabView('aboutAreaTabs');
		var onloadTarget = tabViewAboutArea.getElementsByClassName('yui-nav')[0].getElementsByTagName('LI');
		var target = tabViewAboutArea.getElementsByClassName('yui-nav')[0].getElementsByTagName('IMG');
	}

	// interactive tour tertiary tabs
	if (document.getElementById('interactiveTourTabs')) {
		var tabViewInteractiveTour = new YAHOO.widget.TabView('interactiveTourTabs');
		var onloadTarget = tabViewInteractiveTour.getElementsByClassName('yui-nav')[0].getElementsByTagName('LI');
		var target = tabViewInteractiveTour.getElementsByClassName('yui-nav')[0].getElementsByTagName('IMG');
	}

	// multi unit plans
	if (document.getElementById('multiUnitPlans')) {
		var planTabView = new YAHOO.widget.TabView('multiUnitPlans');
		var onloadTarget = planTabView.getElementsByClassName('yui-nav')[0].getElementsByTagName('LI');
		var target = planTabView.getElementsByClassName('yui-nav')[0].getElementsByTagName('IMG');
		onloadTabs(onloadTarget,'planTabs');
		clickTabs(target,'.gif','on.gif');
	}

	// masterpage tabs
	if (document.getElementById('masterPageTab')) {
		var tabViewMasterpages = new YAHOO.widget.TabView('masterPageTab');
        // add google-map to tab on "about the area" and "directions"
        var handleActiveTabChangeMaster = function(e) {
            var activeIndex = tabViewMasterpages.get('activeIndex');
            var activeTab = tabViewMasterpages.getTab(activeIndex);
            var tabId = activeTab.getElementsByTagName('a')[0].id;
            // if tab is "directions" or "about the area", if google map exists and has not been loaded, load the google map
            if(tabId && tabId == 'directionsTabClicked') {
                var tabContent = activeTab.get('contentEl');
                var mapDiv = YUD.getElementsByClassName('google-map', 'div', tabContent)[0];
                if(!mapDiv) return;
                // check if we already loaded the map
                if (!YUD.hasClass(mapDiv,'loaded')) {
                    // added marker on directions tab
                    var map = new google.maps.Map(mapDiv);
                    map.addControl(new GSmallMapControl());
                    var point = new google.maps.LatLng(defaultMapLat, defaultMapLng);
                    map.setCenter(point);
                    // load communities markers
                    if (typeof markersArray != 'undefined') {
                        customMarkerUtils.gmap = map;
                        customMarkerUtils.buildDynamicMarkers(markersArray, true);
                    }
                    mapDiv.map = map;
                    YUD.addClass(mapDiv,'loaded');
                }
            }
        };
        tabViewMasterpages.addListener('activeTabChange',handleActiveTabChangeMaster);
    }
});

// handle tab height changes
var handleActiveTabHeight = function(e){
    redrawNavHeight();
};

// onload tab images
var onloadTabs = function(target,selectedArea) {
	if (selectedArea == 'jpgTabs') {
		for (var x=0; x < target.length; x++) {
			if (target[x].className=='selected') {
				var newTarget = target[x].getElementsByTagName('img')[0];
				var newSrc = newTarget.src.replace('.jpg','-on.jpg');
				newTarget.setAttribute('src',newSrc);
			}
		}
	} else if (selectedArea == 'planTabs') {
		for (var x=0; x<target.length; x++) {
			if (target[x].className=='selected') {
				var newTarget = target[x].getElementsByTagName('img')[0];
				var newSrc = newTarget.src.replace('.gif','on.gif');
				newTarget.setAttribute('src',newSrc);
			}
		}
	}
}

// on click tab images
var clickTabs = function(clickTarget,extType,onStyle) {
	for (var i=0; i < clickTarget.length; i++) {
		YUE.addListener(clickTarget[i],'click',function(e) {
			var target = YUE.getTarget(e);
			for (var j=0; j<clickTarget.length; j++) {
				if (clickTarget[j].src.indexOf(onStyle)!=-1) {
					var newSrc = clickTarget[j].src.replace(onStyle,extType);
					clickTarget[j].setAttribute('src',newSrc);
				}
			}
			if (target.src.indexOf(onStyle)==-1) {
				var newSrc = target.src.replace(extType,onStyle);
				target.setAttribute('src',newSrc);
			}
		});
	}
}
// switch tabs
var switchTab = function(tabSetId,tabName) {//alert(tabSetId);
	if (document.getElementById(tabSetId)) {//alert(tabName);
        var tabObj = document.getElementById(tabSetId);
		var theList = YUD.getElementsByClassName('yui-nav','',tabObj)[0];
		var theTargets = theList.getElementsByTagName('LI');
        var img, imgURL;
        var tabIndex = -1;
        for (var i=0; i < theTargets.length; i++) {
            img = theTargets[i].getElementsByTagName('img')[0];
            if (theTargets[i].id == tabName) {
                if (!YUD.hasClass(theTargets[i],'selected')) YUD.addClass(theTargets[i],'selected');
                tabIndex = i;
                if (img.src.indexOf('-on.jpg') == -1){
                    imgURL = img.src.replace('.jpg','-on.jpg');
                    img.setAttribute('src',imgURL);
                }
            } else {
                YUD.removeClass(theTargets[i],'selected')
                if (img.src.indexOf('-on.jpg') > -1) {
                    imgURL = img.src.replace('-on.jpg','.jpg');
                    img.setAttribute('src',imgURL);
                }
            }
        }
        if (tabIndex > -1) tabView.set('activeIndex', tabIndex);
    }
}

// get amenities (for community type b community ammenities module)
var getAmenities = function(tabName) {
	if (document.getElementById('amenitiesTabs')) {
        var tabObj = document.getElementById('amenitiesTabs');
		var theList = YUD.getElementsByClassName('yui-nav','',tabObj)[0];
		var theTargets = theList.getElementsByTagName('LI');
        var tabIndex = -1;
        for (var i=0; i < theTargets.length; i++) {
            if (theTargets[i].id == tabName) {
                if (!YUD.hasClass(theTargets[i],'selected')) YUD.addClass(theTargets[i],'selected');
                tabIndex = i;
            }
			else {YUD.removeClass(theTargets[i],'selected')}
        }
        if (tabIndex > -1) tabViewAmenities.set('activeIndex',tabIndex);
    }
}

// set "selected" tab based on URL string query
var preSelectTab = function() {
    var isTabSelected = false;
	if (currLoc.indexOf('?selected') > -1) {
		// parse URL string and isolate tab identifiers
		var queryString = currLoc.substr(currLoc.indexOf('?')).toLowerCase();
		var queryStringArray = queryString.split(',');
		var primaryTabArray = queryStringArray[0].split('=');

			// sets 'selected' class to the correct LI
			var setSelected = function(tabTarget,term) {
				var container = YUD.getElementsByClassName('yui-nav','',tabTarget)[0];
				var targets = container.getElementsByTagName('li');
				for (var j=0; j < targets.length; j++) {
					if (targets[j].id == term) {
						YUD.removeClass(targets[j],'selected');
						YUD.addClass(targets[j],'selected');
					}
				}
			}

		var strPrimary = primaryTabArray[1]; // primay tab identifier
        switchTab('primaryTabs',strPrimary);

        if (queryStringArray.length > 1) {
			var strSecondary = queryStringArray[1]; // secondary tab identifier
			setSelected(document.getElementById('amenitiesTabs'),strSecondary);
		}
        isTabSelected = true;
    }
    return isTabSelected;
}

// render 'special offers' tab state
var checkSpecialOffers = function() {
	if (document.getElementById('communityPromotionType')) {
		var trigger = document.getElementById('communityPromotionType');
		var tabObj = document.getElementById('primaryTabs');
		var theList = YUD.getElementsByClassName('yui-nav','',tabObj)[0];
		var theTargets = theList.getElementsByTagName('LI');
		var thisPos;
		for (var j=0; j<theTargets.length; j++) if (theTargets[j].id =='special-offers'){thisPos=j;break};
        if (thisPos < theTargets.length) {
            if (trigger.getAttribute('value')==2) {
                if (currLoc.indexOf('?selected=visit-today') == -1) {
                    // don't switch tab if coming from Vacation Getaway page
                    switchTab('primaryTabs','special-offers');
                }
            }    
            else if (trigger.getAttribute('value')==0) theTargets[thisPos].className='hide';
            else {} // do nothing
        }
	}
}

// ----------------------------------------------------------------------------------------------

// VALUE HIGHLIGHTS (TOOLTIPS)

YUE.onDOMReady(function() {
	if (YUD.hasClass(document.body,'template-D')||YUD.hasClass(document.body,'template-E')) {

		var idArray = []; // array of tooltip ids - provides the 'context' for the reusable tooltip
		var valueHilight = function(el) {

			if (!YUD.getAncestorByClassName(el,'yui-nav')) { // avoid cancelling onclick events on tab buttons
                var html;
                // screen out child elements that are a tags or p tags (since we are processing p, do not want to double process it)
                for(var i=0; i < el.childNodes.length; i++){
                    if(el.childNodes[i].nodeName.toLowerCase() != 'a' && el.childNodes[i].nodeName.toLowerCase() != 'img' && el.childNodes[i].nodeName.toLowerCase() != 'p'){
                        html = el.childNodes[i].nodeValue;
                        if(html){
                            if (typeof ttStrings != 'undefined') // check to make sure ttstrings array exists
                            {
                                // wraps search terms in anchors and spans
                                for (var j=0; j<ttStrings.length; j++){
                                    var term = ttStrings[j].term;
                                    var title = ttStrings[j].title;
                                    var text = ttStrings[j].text;
                                    var regex = new RegExp('(\\b' + term + '\\b)','g');
                                    html = html.replace(regex, 'xxx'+term);
                                }
                                YUD.get(el.childNodes[i]).nodeValue = html;
                            }
                        }
                    }
                }

                html = el.innerHTML;
				if (typeof ttStrings != 'undefined') // check to make sure ttstrings array exists
				{
					// wraps search terms in anchors and spans
					for (var j=0; j<ttStrings.length; j++){
						var term = ttStrings[j].term;
						var title = ttStrings[j].title;
						var text = ttStrings[j].text;
						var regex = new RegExp('(\\bxxx' + term + '\\b)','g');
						html = html.replace(regex, '<a href="javascript:void(0)" title="<strong>' + title + '<\/strong><br/>' + text + '" class="valueHighlight" id="linkID"><span>' + term + '<\/span><\/a>');
					}
					while (html.match('linkID')) {
						var id = 'valuehilight' + idArray.length;
						idArray.push(id);
						html = html.replace('linkID',id);
					}
					el.innerHTML = html;
				}

            }
		}
		YUD.batch(YUD.getElementsByClassName('communityInfo','div'), function(el) {
			// add more tag names here, if they should contain highlights as well
			YUD.batch(el.getElementsByTagName('p'),valueHilight);
			YUD.batch(el.getElementsByTagName('li'),valueHilight);
			YUD.batch(el.getElementsByTagName('td'),valueHilight);
			YUD.batch(el.getElementsByTagName('h2'),valueHilight);
			YUD.batch(el.getElementsByTagName('em'),valueHilight);
        });
		YAHOO.namespace('tooltipsContainer').ttId = new YAHOO.widget.Tooltip('ttId',{context:idArray,width:'200px'});

		// create rounded corners on tool-tip pop-up
		YUE.addListener(YUD.getElementsByClassName('valueHighlight','a'),'mouseover',function() {
			if (!YUD.hasClass(YUD.getFirstChild(YUD.getElementsByClassName('yui-tt')[0]),'artop'))
				{
				if (getCurrSite()=='Pulte') Rounded('yui-tt','div','all','transparent','#F5F8FD','border #C5A35A');
				if (getCurrSite()=='DelWebb') Rounded('yui-tt','div','all','transparent','#F5F8FD','border #AFB720');
				if (getCurrSite()=='DiVosta') Rounded('yui-tt','div','all','transparent','#F5F8FD','border #5CA1DA');
				}
		});

		// render image carousel
		createCarousel();
	}
});

// ----------------------------------------------------------------------------------------------

// IMAGE CAROUSEL

/*

Copyright (c) 2006, Bill W. Scott
All rights reserved.
Version 0.3.6 - 12.13.2006
Extended by F. Welterlin

*/
var loadCarousel;
function createCarousel() {

	//var ulTarget = this;
	var ulTarget = document.getElementById('carousel-ul');
		ulTarget.innerHTML = '<ul class="carousel-list"></ul>';

	var lastRan = -1;

	// create the interface for each carousel item
	var fmtItem = function(imgUrl,url,i) {
		var innerHTML = '<a href="' + url + '" title="' + slideShowThumbAltName + '"><img src="' + imgUrl + '" id="carousel-image-' + i + '" width="' + 34 + '" height="' + 22 + '" alt="' + slideShowThumbAltName + '" /></a>';
		return innerHTML;
	};

	// inital load handler
	var loadInitialItems = function(type,args) {
		var start = args[0];
		var last = args[1];
		load(this,start,last);
	};

	// load next handler
	var loadNextItems = function(type,args) {
		var start = args[0];
		var last = args[1];
		var alreadyCached = args[2];
		if (!alreadyCached && displaySet.carousel.slideshowThumbs.length>4) load(this,start,last);
		prepareGallery();
	};

	// load previous handler
	var loadPrevItems = function(type,args) {
		var start = args[0];
		var last = args[1];
		var alreadyCached = args[2];
		if (!alreadyCached) load(this,start,last);
	};

      var waitForIE = function(msecs) {
         if(isIE6) {
            var start = new Date().getTime();
            var now = start;
            while(now - start < 100) { now = new Date().getTime(); } 
         }
      }

	var load = function(carousel,start,last) {
		for(var i=start;i<=last;i++) {

			carousel.addItem(i,fmtItem(displaySet.carousel.slideshowThumbs[i-1],displaySet.carousel.slideshowImages[i-1],i));
			carousel.getItem(1).className = 'selected';

			// add "selected" arrow
			YUE.addListener('carousel-image-'+i,'click',function(e) {
				var target = YUE.getTarget(e);
				for (var j=start;j<=last; j++) {if(carousel.getItem(j).className == 'selected') YUD.removeClass(carousel.getItem(j),'selected')}
				YUD.getAncestorByTagName(target,'li').className = 'selected';
			});
                  waitForIE(100);
		}
		prepareGallery();
	};

	// enabling/disabling button state.
	var handlePrevButtonState = function(type,args) {
		var enabling = args[0];
		var leftImage = args[1];
		if (enabling) leftImage.src = '/images/' + getCurrSite() + '/button-carouselPrevOn.gif';
		else leftImage.src = '/images/' + getCurrSite() + '/button-carouselPrevOff.gif';
	};

	var handleNextButtonState = function(type,args) {
		var enabling = args[0];
		var rightImage = args[1];
		if (enabling) rightImage.src = '/images/' + getCurrSite() + '/button-carouselNextOn.gif';
		else rightImage.src = '/images/' + getCurrSite() + '/button-carouselNextOff.gif';
	};

    // create the carousel after the page is loaded since it is dependent on an HTML element
    loadCarousel = function() {
        if(typeof displaySet == 'undefined' || !displaySet || !displaySet.carousel) return;
        if (typeof globalCarousel != 'undefined') {
			globalCarousel.setProperty('size', displaySet.carousel.slideshowThumbs.length);
			globalCarousel.reload();
		}

        globalCarousel = new YAHOO.extension.Carousel('dhtml-carousel',
            {
                numVisible:                 4,
                animationSpeed:             .25,
                scrollInc:                  2,
                navMargin:                  40,
                prevElement:                'prev-arrow',
                nextElement:                'next-arrow',
                loadInitHandler:            loadInitialItems,
                loadNextHandler:            loadNextItems,
                loadPrevHandler:            loadPrevItems,
                size:                       displaySet.carousel.slideshowThumbs.length,
                prevButtonStateHandler:     handlePrevButtonState,
                nextButtonStateHandler:     handleNextButtonState
            }
        );
	};

	// grab thumb img anchor tags and setup onclick event
	var prepareGallery = function() {
	  var gallery = YUD.getElementsByClassName('carousel-list')[0];
	  var links = gallery.getElementsByTagName('a');
	  for (var i=0; i < links.length; i++) links[i].onclick = function() {return showPic(this)};
	  if (displaySet.carousel.slideshowThumbs.length<5) {
           document.getElementById('next-arrow').src = '/images/' + getCurrSite() + '/button-carouselNextOff.gif';
        }
        else {
           document.getElementById('next-arrow').src = '/images/' + getCurrSite() + '/button-carouselNextOn.gif';
        }
	}

	// for thumb onclick, switch large image
	var showPic = function(whichpic) {
	  var source = whichpic.getAttribute('href');
	  var targetImage = document.getElementById('default-image');
		  targetImage.setAttribute('src',source);
	  return false;
	}

	// create image set dropdown UL
	var createDropDown = function() {
		var theTarget = document.getElementById('carouselSets');
		var newUL = document.createElement('UL');

		// carouselObj var exists in HTML templates as array of image paths
		for (var item in carouselObj) {
			var newLI = document.createElement('LI');
			newLI.innerHTML = '<a href="javascript:void(0)">' + item + '</a>';
			newUL.appendChild(newLI);
		}
		theTarget.appendChild(newUL);
		handleDropDown();
	}

	// handle image set dropdown UL
	var handleDropDown = function() {

		var theOne = YUD.getElementsByClassName('customSelect')[0];
		var theTrigger = theOne.getElementsByTagName('A')[0];
		var theList = theOne.getElementsByTagName('UL')[0];
		var theLinks = theList.getElementsByTagName('A');

		// set default image set name to trigger
		theTrigger.innerHTML = displaySet.name;

		// trigger onclick = show/hide
		YUE.addListener(theTrigger,'click',function(){
			if (theList.style.visibility == 'visible') {
				theList.style.visibility = 'hidden';
                        triggerIcon("down");
				//YUD.removeClass(theOne,'on');
			}
			else {
				theList.style.visibility = 'visible';
                        triggerIcon("up");
				//YUD.addClass(theOne,'on');
			}
		});

		// mouseover for items in drop-down
		theList.onmouseover = function(evt) {
			var e = evt || window.event;
			var target = e.target || e.srcElement;
			for (j=0; j < theLinks.length; j++) {
				if(target == theLinks[j]) {
                           YUD.addClass(theLinks[j],'on')
                        }
			}
                  triggerIcon("up");
			//YUD.addClass(theOne,'on');
			this.style.visibility = 'visible';
		}

		// mouseout for items in drop-down
		theList.onmouseout = function(evt) {
			var e = evt || window.event;
			var target = e.target || e.srcElement;
			for (j=0; j < theLinks.length; j++) {
				if(target == theLinks[j]) {YUD.removeClass(theLinks[j],'on')}
			}
			theList.style.visibility = 'hidden';
                  waitForIE(200);
		}

		// onclick for items in drop-down
		for (var i=0; i < theLinks.length; i++) {
			theLinks[i].onclick = function() {
				updateTarget(this);
				displaySet.carousel = carouselObj[this.innerHTML];
				loadCarousel();
				updateDefaultImage();
				theList.style.visibility = 'hidden';
                        triggerIcon("down");
				//YUD.removeClass(theOne,'on');
			}
		}

            // IE6 - hack to allow triggerIcon to always show
            var triggerIcon = function(direction) {
               if(!isIE6) {
                  if(direction == "up") {
                     YUD.addClass(theOne,'on');
                  }
                  else {
                     YUD.removeClass(theOne,'on');
                  }
               }
               waitForIE(100);
            };

		// update trigger with new selection
		var updateTarget = function(theTarget) {
			while (theTrigger.hasChildNodes()) {theTrigger.removeChild(theTrigger.childNodes[0])}
			var target = document.createTextNode(theTarget.innerHTML);
			theTrigger.appendChild(target);
		};

		// update default image when new carousel set is selelcted
		var updateDefaultImage = function() {
                  waitForIE(100);
			var target = document.getElementById('default-image');
                  waitForIE(100);
                  var srcImage = document.getElementById('carousel-image-1');
                  waitForIE(100);
                  var newSrc =  srcImage.src.replace('S.jpg','L.jpg');
                  target.setAttribute('src',newSrc);
                  waitForIE(600);
		};
	}

	loadCarousel();
	YUE.addListener(window,'load',createDropDown());
}

// ----------------------------------------------------------------------------------------------

// MODAL DIALOG BACKGROUND

var modalBackdrop = new (function() {
	var backdrop = document.createElement('div');
	var shown = false;
	backdrop.id = 'modalDialog';

	this.show = function() {
		shown = true;

		// hide select boxes from IE
		if (isIE) {
			YUE.onDOMReady(function(){
				var targetArea = YUD.getElementsByClassName('content')[0];
                if(targetArea){
                    var selects = targetArea.getElementsByTagName('select');
                    if(selects && selects.length){
                        for (i=0; i < selects.length; i++) {selects[i].style.display = 'none'}
                    }
                }
			});
		}
		YUD.setStyle(backdrop,'display','block');
	};
	this.hide = function() {
		shown = false;

		// show select boxes from IE
		if (isIE) {
			YUE.onDOMReady(function(){
				var targetArea = YUD.getElementsByClassName('content')[0];
                if(targetArea){
                    var selects = targetArea.getElementsByTagName('select');
                    if(selects && selects.length){
                        for (i=0; i < selects.length; i++) {selects[i].style.display = 'inline'}
                    }
                }

			});
		}
		YUD.setStyle(backdrop,'display','none');
	}
	this.toggle = function() {
		(shown ? this.hide : this.show).call();
	}

	YUE.addListener(window,'load',function() {
		document.body.appendChild(backdrop);
		var resize = function() {
			YUD.setStyle(backdrop,'height', Math.max(YUD.getViewportHeight(), document.body.scrollHeight) + 'px');
			YUD.setStyle(backdrop,'width', Math.max(YUD.getViewportWidth(), document.body.scrollWidth) + 'px');
		};
		YAHOO.widget.Overlay.windowResizeEvent.subscribe(resize);
		resize();
	});

	this.hide();

})();

// ----------------------------------------------------------------------------------------------

// TELL A FRIEND FORM

YAHOO.namespace('tellFriend');
YAHOO.tellFriend.init = function() {

    // Build overlay based on markup
    YAHOO.tellFriend.overlay = new YAHOO.widget.Overlay('tellFriend',{'fixedCenter':true,'width':350,'visible':false,'zIndex':1000,'effect':{'effect':YAHOO.widget.ContainerEffect.FADE,duration:0.25}});
    YAHOO.tellFriend.overlay.render();

    YUE.addListener(YUD.getElementsByClassName('tellFriendTrigger'),'click',function(){

		modalBackdrop.show();
		populateCommunityTitle();
        setTimeout('YAHOO.tellFriend.overlay.show()',400);
		setTimeout('document.tell.tellFriendEmail.focus();',1000);
		charInit();
		clearForm();
		hideAlerts();
		populateTellForm();

    },YAHOO.tellFriend.overlay,true);

	// cancel/close
    YUE.addListener(YUD.getElementsByClassName('tellFriendClose'),'click',function(){

        YAHOO.tellFriend.overlay.hide();
		setTimeout('modalBackdrop.hide()',800);
		setTimeout('document.tell.reset();',1000);
		setTimeout('YUD.getElementsByClassName("tellFriendThankYou","div")[0].style.display = "none";',1000);
		setTimeout('YUD.getElementsByClassName("tellFriendContent","div")[0].style.display = "block";',1000);

		// uncheck "send a copy" button
		document.getElementById('tellSendCopy').checked = false;
		YUD.getPreviousSibling(document.getElementById('tellSendCopy')).src = '/images/' + getCurrSite() + '/button-checkboxUnchecked.gif';
		resetCharCount();

    },YAHOO.tellFriend.overlay,true);

	// submit form to ajax and get thank you - see AjaxEcmaClient.js
	var submitTellAfriend = function() {
		if (validate_taf() == true) {
		  SendToAFriend();
			/*populateEmails();
			YUD.getElementsByClassName('tellFriendContent','div')[0].style.display = 'none';
			YUD.getElementsByClassName('tellFriendThankYou','div')[0].style.display = 'block';*/
		}
	}

	// submit event
	//YUE.addListener(document.tell,'submit',function() {submitTellAfriend()},YAHOO.tellFriend.overlay,true);

	// 'enter' keypress submit event (ie)
	if (window.attachEvent) {
		var tellKeyPress = new YAHOO.util.KeyListener(document.tell,{keys:13},submitTellAfriend); 
		tellKeyPress.enable(); // main contact form
		var disableEnter = function() {
		  tellKeyPress.disable();
		}
		var enableEnter = function() {
		  tellKeyPress.enable();
		}
		var setExceptions = function()  {
		  var msg = document.getElementById('tellYourMessage');
		  YUE.addListener(msg,'focus',disableEnter);
		  YUE.addListener(msg,'blur',enableEnter);
		  var btn = document.getElementById('sendButton');
		  YUE.addListener(btn,'focus',disableEnter);
		  YUE.addListener(btn,'blur',enableEnter);
		}
		setExceptions();
	}

	// create new instance
	YUE.addListener('newFriendTrigger','click',function(){

		document.tell.reset();
		populateTellForm();

		// uncheck "send a copy" button
		document.getElementById('tellSendCopy').checked = false;
		YUD.getPreviousSibling(document.getElementById('tellSendCopy')).src = '/images/' + getCurrSite() + '/button-checkboxUnchecked.gif';

		hideAlerts();
		resetCharCount();
		YUD.getElementsByClassName('tellFriendThankYou','div')[0].style.display = 'none';
		YUD.getElementsByClassName('tellFriendContent','div')[0].style.display = 'block';

    },YAHOO.tellFriend.overlay,true);

	// populate community title into tell a friend form
	var populateCommunityTitle = function() {
		var title;
		if (document.getElementById('planName')) {
			title = document.getElementById('communityInfo_Name').innerHTML;
			title += ', ' + document.getElementById('planName').value;
		}
		else {
		  title = YUD.getElementsByClassName('communityName','div')[0].innerHTML;
		}
		//alert(title);
		rExp = /<h1>/gi;
		title = title.replace(rExp, '');
		rExp = /<\/h1>/gi;
		title = title.replace(rExp, '');
		//alert(title);
		var targets = document.getElementById('tellFriend').getElementsByTagName('strong');
		//alert(targets.length);
		for (var i=0; i < targets.length; i++) {targets[i].innerHTML = title}
	}

	// populate friend email addresses into thank you page
	var populateEmails = function() {
		var data = document.tell.tellFriendEmail.value;
		var target = document.getElementById('tellFriend').getElementsByTagName('address')[0];
		target.innerHTML = data;
	}

}

YUE.addListener(window,'load',YAHOO.tellFriend.init);

// validate tell a friend
var validate_taf = function() {
	validity = true;
	var error_string = '';

	if (!check_email(document.tell.tellFriendEmail.value)) {
		validity = false;
		YUD.addClass(YUD.getAncestorByTagName(document.tell.tellFriendEmail,'td'),'error');
		error_string += '<li>Please insert valid FRIEND EMAIL ADDRESS(S).</li>';
	}
	else {YUD.removeClass(YUD.getAncestorByTagName(document.tell.tellFriendEmail,'td'),'error')}

	if (!check_email(document.tell.tellYourEmail.value)) {
		validity = false;
		YUD.addClass(YUD.getAncestorByTagName(document.tell.tellYourEmail,'td'),'error');
		error_string += '<li>Please insert a valid EMAIL ADDRESS.</li>';
	}
	else {YUD.removeClass(YUD.getAncestorByTagName(document.tell.tellYourEmail,'td'),'error')}

	if (validity == false) {
		var target = YUD.getElementsByClassName('alertBar');
		for (var i=0; i < target.length; i++) {
			if (YUD.getAncestorByClassName(target[i],'tellFriendContent')) target[i].style.display = 'block';
		}
	}

	displayError('tafError',error_string);
	return validity;
}

// when user signs in/out, pre-populate form
var populateTellForm = function() {
	if (document.getElementById('profileFirstName')) document.tell.tellYourFirstName.value = document.getElementById('profileFirstName').value;
	if (document.getElementById('profileLastName')) document.tell.tellYourLastName.value = document.getElementById('profileLastName').value;
	if (document.getElementById('profileUserEmail')) document.tell.tellYourEmail.value = document.getElementById('profileUserEmail').value;
}



var populatePortalContactForms = function() {
    if (document.getElementById('profileFirstName')) 
    {
        if (YUD.getElementsByClassName('refer_fname', 'input', '')[0])
            YUD.getElementsByClassName('refer_fname', 'input', '')[0].value = document.getElementById('profileFirstName').value;
    }
    if (document.getElementById('profileLastName')) 
    {
        if (YUD.getElementsByClassName('refer_lname', 'input', '')[0])
            YUD.getElementsByClassName('refer_lname', 'input', '')[0].value = document.getElementById('profileLastName').value;
    }
    if (document.getElementById('profileUserEmail')) 
    {
        //document.tell.tellYourEmail.value = document.getElementById('profileUserEmail').value;
    }
}





// ----------------------------------------------------------------------------------------------

// UI SHOW/HIDE

YAHOO.namespace('UIfunctions');

YAHOO.UIfunctions.show = function (el) {
	YUD.removeClass(el,'hide');
	YUD.addClass(el,'show');
}

YAHOO.UIfunctions.hide = function (el) {
	YUD.removeClass(el,'show');
	YUD.addClass(el,'hide');
}

// ----------------------------------------------------------------------------------------------

// GENERAL FORM VALIDATION FUNCTIONS

// update user fields checkbox - sign up now!
var fieldsInit = function() {
	var targets = new Array(document.signup.firstName, document.signup.lastName, document.signup.email, document.signup.city, document.signup.address1, document.signup.address2, document.signup.state, document.signup.zip, document.signup.primaryPhone1, document.signup.primaryPhone2, document.signup.primaryPhone3, document.signup.secondPhone1, document.signup.secondPhone2, document.signup.secondPhone3, document.signup.province, document.signup.postal, document.signup.country);
	for (i=0; i < targets.length; i++) updateFields(targets[i]);
}

var updateFields = function(targets) {
	var updateInfo = document.getElementById('updateInfo');
	YUE.addListener(targets,'change',function() {
		updateInfo.disabled = false;
		var label = YUD.getElementsByClassName('updateInfodisabled');
		YUD.replaceClass(label,'updateInfodisabled','updateInfo');
	});
}

// validate zip structure
var validateZipStructure = function(target) {
	var objRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
	return objRegExp.test(target);
}

// validate numeric structure
var validateNumericStructure = function(target) {
	var objRegExp = /(^\d+$)/;
	return objRegExp.test(target);
}

// validate u.s. phone structure
var validateUSphoneStructure = function(target) {
	var objRegExp = /((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/;
	return objRegExp.test(target);
}

// character counter
var charInit = function() {
	var targets = YUD.getElementsByClassName('charCount');
	for (i=0; i < targets.length; i++) {charCount(targets[i])}
}

var charCount = function(targets,maxChar) {
    if(typeof maxChar == 'undefined') maxChar = 1000;
    var txtArea = YUD.getElementsByClassName('charTarget','',targets)[0];
	var updateArea = YUD.getElementsByClassName('charCounter','',targets)[0];
	YUE.addListener(txtArea,'keyup',function() {
		if (txtArea.value.length > maxChar) txtArea.value = txtArea.value.substring(0,maxChar);
		else updateArea.innerHTML = maxChar - txtArea.value.length;
	});
}

var resetCharCount = function(targets) {
	var targets = YUD.getElementsByClassName('charCounter');
	for (i=0; i < targets.length; i++) targets[i].innerHTML = 1000;
}

var check_empty = function(text) {return (text.length > 0)} // returns true if text is not empty.
var check_minChar = function(text) {return (text.length > 1)}
var check_minPass = function(text) {return (text.length > 4)}
var check_notEmpty = function(text) {return (text.length > 0)} // returns true if text is not empty

var check_usPhoneThree = function(text) {return (text.length > 2 && validateNumericStructure(text))}
var check_usPhoneFour = function(text) {return (text.length > 3 && validateNumericStructure(text))}

var check_email = function(address) {
	// construct tester
	var testValidConstruct = function(param) {
		//var re = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		// the following regex is from http://www.markussipila.info/pub/emailvalidator.php?action=validate
		var re = /^[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,9})$/;
		return re.test(param);
	}

	// validate multiple email addresses
	if (address.indexOf(',') > -1) {
		var stringArray = address.split(',');
		for (var i=0; i < stringArray.length; i++) {
			stringArray[i] = stringArray[i].replace(/\s+/g,''); // remove white space
			if (!testValidConstruct(stringArray[i])) return false;
		}
		return true;
	}

	// validate one email address
	else {return testValidConstruct(address)}
}

// display error console
var displayError = function(targetID, error_string) {
	var target = document.getElementById(targetID);
    var html = '<img src="/images/' + getCurrSite() + '/icon-alert.gif" alt="alert" /><h4>ERROR</h4>';
    html += '<ul>' + error_string + '</ul>';
    target.innerHTML = html;
    /*
    target.innerHTML = '<img src="/images/' + getCurrSite() + '/icon-alert.gif" alt="alert" /><h4>ERROR</h4>';
	target.innerHTML += '<ul>';
	target.innerHTML += error_string;
	target.innerHTML += '</ul>';
	*/
}

// cancel / clear form
var clearForm = function() {
	YUE.addListener(YUD.getElementsByClassName('cancel','a'),'click',function() {

		// remove ERROR box at top
		var target = YUD.getElementsByClassName('alertBar');
		for (var i=0; i < target.length; i++) {target[i].style.display = 'none'}

		// remove color bording around fields, where class name is set to error.
		var targets  = YUD.getElementsByClassName('error','td');
		var targets2 = YUD.getElementsByClassName('error','div');
		for (var i=0; i < targets.length; i++) {targets[i].className = 'none'}
		for (var i=0; i < targets2.length; i++) {targets2[i].className = 'none'}
	});
}

// cancel / clear form from non cancel button event
var hideAlerts = function() {

		// remove ERROR box at top
		var target = YUD.getElementsByClassName('alertBar');
		for (var i=0; i < target.length; i++) {target[i].style.display = 'none'}

		// remove color bording around fields, where class name is set to error.
		var targets  = YUD.getElementsByClassName('error','td');
		var targets2 = YUD.getElementsByClassName('error','div');
		for (var i=0; i < targets.length; i++) {targets[i].className = 'none'}
		for (var i=0; i < targets2.length; i++) {targets2[i].className = 'none'}
}

// ----------------------------------------------------------------------------------------------

// POPULATE FORM DROP DOWNS / HANDLE FORMS

// switch address between U.S. and International on contact us, profile, registration, and signUp form
var switchAddress = function(parentObj) {
    var aToggles;
    if(typeof parentObj == 'undefined'){aToggles = YUD.getElementsByClassName('addressTrigger')}
	else {aToggles = YUD.getElementsByClassName('addressTrigger','',parentObj)}

    YUD.batch(aToggles, function(el){
        var aLink = YUD.getElementsByClassName('switchAddress','a',el)[0];
        var domestic = YUD.getElementsByClassName('domestic','',el)[0];
        var international = YUD.getElementsByClassName('international','',el)[0];
        if(aLink && domestic && international){

            YUE.on(aLink,'click', function(){
                // if domestic is currently hidden, display it
                if(YUD.hasClass(domestic,'hide')){
                    YUD.removeClass(domestic,'hide');
                    if(!YUD.hasClass(international,'hide')) YUD.removeClass(international,'show'); YUD.addClass(international,'hide');
                    this.innerHTML = 'Address outside the U.S.?';
                }
				else {
                    // load country
                    if(!YUD.hasClass(international,'loaded')){
                        populateCountryOptions(international);
                        YUD.addClass(international,'loaded');
                    }
                    if(!YUD.hasClass(domestic,'hide')) YUD.removeClass(domestic,'show'); YUD.addClass(domestic,'hide');
                    YUD.removeClass(international,'hide');
                    this.innerHTML = 'Address inside the U.S.?';
                }
            });
        }
    });
}

// switch (non-click event) address between U.S. and International
var toggleAddress = function(container,witch) {
	var aLink = YUD.getElementsByClassName('switchAddress','a',container)[0];
	var domestic = YUD.getElementsByClassName('domestic','',container)[0];
    var international = YUD.getElementsByClassName('international','',container)[0];
	if (witch=='international') {
		(YUD.hasClass(domestic,'show')) ? YUD.replaceClass(domestic,'show','hide') : YUD.addClass(domestic,'hide');
		(YUD.hasClass(international,'hide')) ? YUD.replaceClass(international,'hide','show') : YUD.addClass(international,'show');
		aLink.innerHTML = 'Address inside the U.S.?';
	}
	else {
		(YUD.hasClass(international,'show')) ? YUD.replaceClass(international,'show','hide') : YUD.addClass(international,'hide');
		(YUD.hasClass(domestic,'hide')) ? YUD.replaceClass(domestic,'hide','show') : YUD.addClass(domestic,'show');
		aLink.innerHTML = 'Address outside of the U.S.?';
	}
}

var populateHearAboutUsOptions = function(parentObj){

    var defOptions = ['Radio','TV','Another website','Billboards','Friend or relative recommended','Visited one of our communities','Drove by or saw local signage','Received mail from us','Newspaper ad','Magazine','Realtor referral','MLS listing','Received email from us','Received phone call from us','Other'];
    var flds;
    if (typeof parentObj == 'undefined'){flds = YUD.getElementsByClassName('hearAboutUs')}
	else {flds = YUD.getElementsByClassName('hearAboutUs','select',parentObj)}
    var cnt;
    for(var i=0; i < flds.length; i++){
        cnt = 0;
        for(var k=0; k < defOptions.length; k++){
            if(k == 0) flds[i].options[0] = new Option('Select','');
            cnt = k + 1;
            flds[i].options[cnt] = new Option(defOptions[k],defOptions[k]);
        }
    }
}

var populateCountryOptions = function(parentObj){
    var countryList = [{name:'Afghanistan', code:'AF'}, {name:'Aland Islands', code:'AX'}, {name:'Albania', code:'AL'}, {name:'Algeria', code:'DZ'}, {name:'American Samoa', code:'AS'}, {name:'Andorra', code:'AD'}, {name:'Angola', code:'AO'}, {name:'Anguilla', code:'AI'}, {name:'Antarctica', code:'AQ'}, {name:'Antigua and Barbuda', code:'AG'}, {name:'Argentina', code:'AR'}, {name:'Armenia', code:'AM'}, {name:'Aruba', code:'AW'}, {name:'Australia', code:'AU'}, {name:'Austria', code:'AT'}, {name:'Azerbaijan', code:'AZ'},
    {name:'Bahamas', code:'BS'}, {name:'Bahrain', code:'BH'}, {name:'Bangladesh', code:'BD'}, {name:'Barbados', code:'BB'}, {name:'Belarus', code:'BY'}, {name:'Belgium', code:'BE'}, {name:'Belize', code:'BZ'}, {name:'Benin', code:'BJ'}, {name:'Bermuda', code:'BM'}, {name:'Bhutan', code:'BT'}, {name:'Bolivia', code:'BO'}, {name:'Bosnia and Herzegovina', code:'BA'}, {name:'Botswana', code:'BW'}, {name:'Brazil', code:'BR'}, {name:'British Indian Ocean Territory', code:'IO'}, {name:'Brunei Darussalam', code:'BN'}, {name:'Bulgaria', code:'BG'}, {name:'Burkina Faso', code:'BF'}, {name:'Burundi', code:'BI'},
    {name:'Cambodia', code:'KH'}, {name:'Cameroon', code:'CM'}, {name:'Canada', code:'CA'}, {name:'Cape Verde', code:'CV'}, {name:'Cayman Islands', code:'KY'}, {name:'Central African Republic', code:'CF'}, {name:'Chad', code:'TD'}, {name:'Chile', code:'CL'}, {name:'China', code:'CN'}, {name:'Christmas Island', code:'CX'}, {name:'Cocos (Keeling) Islands', code:'CC'}, {name:'Colombia', code:'CO'}, {name:'Comoros', code:'KM'}, {name:'Congo', code:'CG'}, {name:'Congo, the Democratic Republic of the', code:'CD'}, {name:'Cook Islands', code:'CK'}, {name:'Costa Rica', code:'CR'}, {name:'Croatia', code:'HR'}, {name:'Cuba', code:'CU'}, {name:'Cyprus', code:'CY'}, {name:'Czech Republic', code:'CZ'},
    {name:'Denmark', code:'DK'}, {name:'Djibouti', code:'DJ'}, {name:'Dominica', code:'DM'}, {name:'Dominican Republic', code:'DO'},
    {name:'Ecuador', code:'EC'}, {name:'Egypt', code:'EG'}, {name:'El Salvador', code:'SV'}, {name:'Equatorial Guinea', code:'GQ'}, {name:'Eritrea', code:'ER'}, {name:'Estonia', code:'EE'}, {name:'Ethiopia', code:'ET'},
    {name:'Falkland Islands (Malvinas)', code:'FK'}, {name:'Faroe Islands', code:'FO'}, {name:'Fiji', code:'FJ'}, {name:'Finland', code:'FI'}, {name:'France', code:'FR'}, {name:'French Guiana', code:'GF'}, {name:'French Polynesia', code:'PF'}, {name:'French Southern Territories', code:'TF'},
    {name:'Gabon', code:'GA'}, {name:'Gambia', code:'GM'}, {name:'Georgia', code:'GE'}, {name:'Germany', code:'DE'}, {name:'Ghana', code:'GH'}, {name:'Gibraltar', code:'GI'}, {name:'Greece', code:'GR'}, {name:'Greenland', code:'GL'}, {name:'Grenada', code:'GD'}, {name:'Guadeloupe', code:'GP'}, {name:'Guam', code:'GU'}, {name:'Guatemala', code:'GT'}, {name:'Guernsey', code:'GG'}, {name:'Guinea', code:'GN'}, {name:'Guinea-Bissau', code:'GW'}, {name:'Guyana', code:'GY'},
    {name:'Haiti', code:'HT'}, {name:'Heard Island and McDonald Islands', code:'HM'}, {name:'Holy See (Vatican City State)', code:'VA'}, {name:'Honduras', code:'HN'}, {name:'Hong Kong', code:'HK'}, {name:'Hungary', code:'HU'},
    {name:'Iceland', code:'IS'}, {name:'India', code:'IN'}, {name:'Indonesia', code:'ID'}, {name:'Iran, Islamic Republic of', code:'IR'}, {name:'Iraq', code:'IQ'}, {name:'Ireland', code:'IE'}, {name:'Isle of Man', code:'IM'}, {name:'Israel', code:'IL'}, {name:'Italy', code:'IT'},
    {name:'Jamaica', code:'JM'}, {name:'Japan', code:'JP'}, {name:'Jersey', code:'JE'}, {name:'Jordan', code:'JO'},
    {name:'Kazakhstan', code:'KZ'}, {name:'Kenya', code:'KE'}, {name:'Kiribati', code:'KI'}, {name:'Korea, North', code:'KP'}, {name:'Korea, South', code:'KR'}, {name:'Kuwait', code:'KW'}, {name:'Kyrgyzstan', code:'KG'},
    {name:'Laos', code:'LA'}, {name:'Latvia', code:'LV'}, {name:'Lebanon', code:'LB'}, {name:'Lesotho', code:'LS'}, {name:'Liberia', code:'LR'}, {name:'Libyan Arab Jamahiriya', code:'LY'}, {name:'Liechtenstein', code:'LI'}, {name:'Lithuania', code:'LT'}, {name:'Luxembourg', code:'LU'},
    {name:'Macao', code:'MO'}, {name:'Macedonia, the former Yugoslav Republic of', code:'MK'}, {name:'Madagascar', code:'MG'}, {name:'Malawi', code:'MW'}, {name:'Malaysia', code:'MY'}, {name:'Maldives', code:'MV'}, {name:'Mali', code:'ML'}, {name:'Malta', code:'MT'}, {name:'Marshall Islands', code:'MH'}, {name:'Martinique', code:'MQ'}, {name:'Mauritania', code:'MR'}, {name:'Mauritius', code:'MU'}, {name:'Mayotte', code:'YT'}, {name:'Mexico', code:'MX'}, {name:'Micronesia, Federated States of', code:'FM'}, {name:'Moldova, Republic of', code:'MD'}, {name:'Monaco', code:'MC'}, {name:'Mongolia', code:'MN'}, {name:'Montenegro', code:'ME'}, {name:'Montserrat', code:'MS'}, {name:'Morocco', code:'MA'}, {name:'Mozambique', code:'MZ'}, {name:'Myanmar', code:'MM'},
    {name:'Namibia', code:'NA'}, {name:'Nauru', code:'NR'}, {name:'Nepal', code:'NP'}, {name:'Netherlands', code:'NL'}, {name:'Netherlands Antilles', code:'AN'}, {name:'New Caledonia', code:'NC'}, {name:'New Zealand', code:'NZ'}, {name:'Nicaragua', code:'NI'}, {name:'Niger', code:'NE'}, {name:'Nigeria', code:'NG'}, {name:'Niue', code:'NU'}, {name:'Norfolk Island', code:'NF'}, {name:'Northern Mariana Islands', code:'MP'}, {name:'Norway', code:'NO'},
    {name:'Oman', code:'OM'},
    {name:'Pakistan', code:'PK'}, {name:'Palau', code:'PW'}, {name:'Palestinian Territory, Occupied', code:'PS'}, {name:'Panama', code:'PA'}, {name:'Papua New Guinea', code:'PG'}, {name:'Paraguay', code:'PY'}, {name:'Peru', code:'PE'}, {name:'Philippines', code:'PH'}, {name:'Pitcairn', code:'PN'}, {name:'Poland', code:'PL'}, {name:'Portugal', code:'PT'}, {name:'Puerto Rico', code:'PR'},
    {name:'Qatar', code:'QA'},
    {name:'Reunion', code:'RE'}, {name:'Romania', code:'RO'}, {name:'Russian Federation', code:'RU'}, {name:'Rwanda', code:'RW'},
    {name:'Saint Barthelemy', code:'BL'}, {name:'Saint Helena', code:'SH'}, {name:'Saint Kitts and Nevis', code:'KN'}, {name:'Saint Lucia', code:'LC'}, {name:'Saint Martin (French part)', code:'MF'}, {name:'Saint Pierre and Miquelon', code:'PM'}, {name:'Saint Vincent and the Grenadines', code:'VC'}, {name:'Samoa', code:'WS'}, {name:'San Marino', code:'SM'}, {name:'Sao Tome and Principe', code:'ST'}, {name:'Saudi Arabia', code:'SA'}, {name:'Senegal', code:'SN'}, {name:'Serbia', code:'RS'}, {name:'Seychelles', code:'SC'}, {name:'Sierra Leone', code:'SL'}, {name:'Singapore', code:'SG'}, {name:'Slovakia', code:'SK'}, {name:'Slovenia', code:'SI'}, {name:'Solomon Islands', code:'SB'}, {name:'Somalia', code:'SO'}, {name:'South Africa', code:'ZA'}, {name:'South Georgia and the South Sandwich Islands', code:'GS'}, {name:'Spain', code:'ES'}, {name:'Sri Lanka', code:'LK'}, {name:'Sudan', code:'SD'}, {name:'Suriname', code:'SR'}, {name:'Svalbard and Jan Mayen', code:'SJ'}, {name:'Swaziland', code:'SZ'}, {name:'Sweden', code:'SE'}, {name:'Switzerland', code:'CH'}, {name:'Syrian Arab Republic', code:'SY'},
    {name:'Taiwan, Province of China', code:'TW'}, {name:'Tajikistan', code:'TJ'}, {name:'Tanzania, United Republic of', code:'TZ'}, {name:'Thailand', code:'TH'}, {name:'Timor-Leste', code:'TL'}, {name:'Togo', code:'TG'}, {name:'Tokelau', code:'TK'}, {name:'Tonga', code:'TO'}, {name:'Trinidad and Tobago', code:'TT'}, {name:'Tunisia', code:'TN'}, {name:'Turkey', code:'TR'}, {name:'Turkmenistan', code:'TM'}, {name:'Turks and Caicos Islands', code:'TC'}, {name:'Tuvalu', code:'TV'},
    {name:'Uganda', code:'UG'}, {name:'Ukraine', code:'UA'}, {name:'United Arab Emirates', code:'AE'}, {name:'United Kingdom', code:'GB'}, {name:'United States Minor Outlying Islands', code:'UM'}, {name:'Uruguay', code:'UY'}, {name:'Uzbekistan', code:'UZ'},
    {name:'Vanuatu', code:'VU'}, {name:'Venezuela', code:'VE'}, {name:'Viet Nam', code:'VN'}, {name:'Virgin Islands, British', code:'VG'}, {name:'Virgin Islands, U.S.', code:'VI'},
    {name:'Wallis and Futuna', code:'WF'}, {name:'Western Sahara', code:'EH'},
    {name:'Yemen', code:'YE'},
    {name:'Zambia', code:'ZM'}, {name:'Zimbabwe', code:'ZW'}];
    var flds;
    if (typeof parentObj == 'undefined'){flds = YUD.getElementsByClassName('countryOptions')}
	else {flds = YUD.getElementsByClassName('countryOptions','select',parentObj)}
    if(!flds) return;
    var cnt;
    for(var i=0; i < flds.length; i++){
        cnt = 0;
        if(!YUD.hasClass(flds[i],'loaded')){
            for(var k=0; k < countryList.length; k++){
                if(k == 0) flds[i].options[0] = new Option('Select','');
                cnt = k + 1;
                flds[i].options[cnt] = new Option(countryList[k].name,countryList[k].code);
            }
            YUD.addClass(flds[i],'loaded');
        }
    }
}

// pass in the array of state fields or a single field reference
var populateStateOptions = function(stateFlds){
    if(!stateFlds) return;
    var flds = [];
    (!stateFlds.length) ? flds.push(stateFlds) : flds = stateFlds;
    var curBrand = getCurrSite().toLowerCase();
    var cnt = 0;
    if (typeof(window['communities'])!='undefined'){
    if(communities && communities[curBrand] && communities[curBrand].length){
        for(var i=0; i < communities[curBrand].length; i++) {
            if(communities[curBrand][i].stateName != "" && communities[curBrand][i].stateCode != ""){
                cnt += 1;
                for(var k=0; k<flds.length; k++){
                    if(flds[k]){
                        if(cnt==1) flds[k].options[0] = new Option('Select','');
                        flds[k].options[cnt] = new Option(communities[curBrand][i].stateName,communities[curBrand][i].stateCode);
                    }
                }
            }
        }
    }
    }
}

// ----------------------------------------------------------------------------------------------

// BROKER FIELDS

var setbrokerFields = function(parentObjId) {

    var realtors;
    if (typeof parentObjId == 'undefined') {realtors = YUD.getElementsByClassName('realtorTrigger')}
	else {realtors = YUD.getElementsByClassName('realtorTrigger','',parentObjId)}

    YUD.batch(realtors, function(el){
        var fld = YUD.getElementsByClassName('realtorInput','input',el)[0];
        var brokerFields = YUD.getElementsByClassName('brokerFields','div',el)[0];

        if(fld && brokerFields){
            YUE.on(fld,'click',function(){
                (this.checked) ? YUD.replaceClass(brokerFields,'hide','show') : YUD.replaceClass(brokerFields,'show','hide');
            });
        }
    });
}

// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------

// HOMEOWNER FIELDS

var setownerFields = function(parentObjId) {

    var owners;
    if (typeof parentObjId == 'undefined') {owners = YUD.getElementsByClassName('ownerTrigger')}
	else {owners = YUD.getElementsByClassName('ownerTrigger','',parentObjId)}

    YUD.batch(owners, function(el){
        var fld = YUD.getElementsByClassName('ownerInput','input',el)[0];
        var ownerFields = YUD.getElementsByClassName('ownerFields','div',el)[0];

        if(fld && ownerFields){
            YUE.on(fld,'click',function(){
                (this.checked) ? YUD.replaceClass(ownerFields,'hide','show') : YUD.replaceClass(ownerFields,'show','hide');
            });
        }
    });

    var ownerNoSalesNum;
    if (typeof parentObjId == 'undefined') {ownerNoSalesNum = YUD.getElementsByClassName('ownerNoSalesNumTrigger')}
	else {ownerNoSalesNum = YUD.getElementsByClassName('ownerNoSalesNumTrigger','',parentObjId)}

    YUD.batch(ownerNoSalesNum, function(el){
        var fld = YUD.getElementsByClassName('ownerNoSalesNumInput','input',el)[0];
        var ownerNoSalesNumFields = YUD.getElementsByClassName('ownerNoSalesNumFields','div',el)[0];

        if(fld && ownerNoSalesNumFields){
            YUE.on(fld,'click',function(){
                //var el=YUD.getElementsByClassName('ownerSalesNumber','input',el)[0];
                //if (el!=null){
                //    if (YUD.hasClass(ownerNoSalesNumFields,'hide')){
                //        //document.getElementById("regOwnerSalesNumber").value="";
                //        el.disabled=true; //document.getElementById("regOwnerSalesNumber").disabled=true;
                //    }else{
                //        el.disabled=false; //document.getElementById("regOwnerSalesNumber").disabled=false;
                //    }
                //}

                var elDisabled = false;
                var el = YUD.getElementsByClassName('ownerSalesNumber', 'input', el);
                if (el != null) {
                    if (YUD.hasClass(ownerNoSalesNumFields, 'hide')) {
                        //document.getElementById("regOwnerSalesNumber").value="";
                        elDisabled = true; //document.getElementById("regOwnerSalesNumber").disabled=true;
                    } else {
                        elDisabled = false; //document.getElementById("regOwnerSalesNumber").disabled=false;
                    }

                    for (var k = 0; k < el.length; k++) {
                        if (el[k]) {
                            el[k].disabled = elDisabled;
                        }
                    }             

                }   


                (YUD.hasClass(ownerNoSalesNumFields,'hide') ) ? YUD.replaceClass(ownerNoSalesNumFields,'hide','show') : YUD.replaceClass(ownerNoSalesNumFields,'show','hide');
            });
        }
    });



    var origOwner;
    if (typeof parentObjId == 'undefined') {origOwner = YUD.getElementsByClassName('origOwnerTrigger')}
	else {origOwner = YUD.getElementsByClassName('origOwnerTrigger','',parentObjId)}

    YUD.batch(origOwner, function(el){
        var origOwnerFields = YUD.getElementsByClassName('origOwnerFields','div',el)[0];
        var fldY = YUD.getElementsByClassName('regOriginalOwnerYes','input',el)[0];

        if(fldY && origOwnerFields){
            YUE.on(fldY,'click',function(){
                if (YUD.getElementsByClassName('regOriginalOwnerYes','',parentObjId)[0].checked)
                    if (YUD.hasClass(origOwnerFields,'hide'))
                        YUD.replaceClass(origOwnerFields,'hide','show');
                //(YUD.hasClass(ownerNoCommunityFields,'hide') ) ? YUD.replaceClass(ownerNoCommunityFields,'hide','show') : YUD.replaceClass(ownerNoCommunityFields,'show','hide');
            });

        }
        
        var fldN = YUD.getElementsByClassName('regOriginalOwnerNo','input',el)[0];
        if(fldN && origOwnerFields){
            YUE.on(fldN,'click',function(){
                if (YUD.getElementsByClassName('regOriginalOwnerNo','',parentObjId)[0].checked)
                    if (YUD.hasClass(origOwnerFields,'show'))
                        YUD.replaceClass(origOwnerFields,'show','hide');
                //(YUD.hasClass(ownerNoCommunityFields,'hide') ) ? YUD.replaceClass(ownerNoCommunityFields,'hide','show') : YUD.replaceClass(ownerNoCommunityFields,'show','hide');
            });

        }
    });



    var ownerNoCommunityListed;
    if (typeof parentObjId == 'undefined') {ownerNoCommunityListed = YUD.getElementsByClassName('ownerNoCommunity')}
	else {ownerNoCommunityListed = YUD.getElementsByClassName('ownerNoCommunity','',parentObjId)}

    YUD.batch(ownerNoCommunityListed, function(el){
        //var fld = YUD.getElementsByClassName('ownerNoCommunity','input',el)[0];
        //var ownerNoCommunityFields = YUD.getElementsByClassName('enter_community','div',el)[0];
        var fld = YUD.getElementsByClassName('ownerNoCommunity','input')[0];
        var ownerNoCommunityFields = YUD.getElementsByClassName('enter_community','div')[0];

        if(fld && ownerNoCommunityFields){
            YUE.on(fld,'click',function(){
                (YUD.hasClass(ownerNoCommunityFields,'hide') ) ? YUD.replaceClass(ownerNoCommunityFields,'hide','show') : YUD.replaceClass(ownerNoCommunityFields,'show','hide');
            });
        }
    });
}

// ----------------------------------------------------------------------------------------------

// POP-UP WINDOWS

var popWindow = function(type,url,title,height,width,bgcolor) {
    var newWindow;

    if (type == 'flash') {
		newWindow = window.open('','','height=' + height + ',width=' + width + ',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no');
		newWindow.document.open();
		var popWindowQS = 'title='+title+'&fileURL='+url+'&bgcolor='+bgcolor;
		newWindow.location = '/templates/template-popUp.html?'+popWindowQS;
	}

	if (type == 'alphavision') {
	    if (url != '/assets/images/') {
	        newWindow = window.open(url,'','height=' + height + ',width=' + width + ',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes');
	    }
	}

	if (type == 'image') {
		newWindow = window.open('','','height=' + height + ',width=' + width + ',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no');
		newWindow.document.open();
		newWindow.document.write('<html><head><title>' + title + '</title></head>');
		newWindow.document.write('<body style="margin:0;padding:0;"><center>');
		newWindow.document.write('<img src="' + url + '" alt="' + title + '">');
		newWindow.document.write('</center></body></html>');
		newWindow.document.close();
	}

    if(type == 'regular') newWindow = window.open(url,'','height=' + height + ',width=' + width + ',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
    return newWindow;
}

// optionally pass a querystring to parse
var Querystring = function(qs) {
	this.params = new Object();
	this.get=Querystring_get;
	if (qs == null) qs=location.search.substring(1,location.search.length);
	if (qs.length == 0) return;
	qs = qs.replace(/\+/g, ' ');
	var args = qs.split('&'); // parse out name/value pairs separated via &

	for (var i=0;i<args.length;i++) {
		var value;
		var pair = args[i].split('=');
		var name = unescape(pair[0]);
		if (pair.length == 2) value = unescape(pair[1]);
		else value = name;
		this.params[name] = value;
	}
}

var Querystring_get = function(key, default_) {
	// changes UNDEFINED to NULL
	if (default_ == null) default_ = null;
	var value=this.params[key]
	if (value==null) value=default_;
	return value;
}

// ----------------------------------------------------------------------------------------------

// FAQ CONTENT

var GenerateFAQContent;

GenerateFAQContent = {

    init: function() {
        var categoryContainer = YUD.getElementsByClassName('category','div')[0];

        var dl, dt, dd, aLink, arrowImg, anchor, anchorName;
        for (var i = 0; i < FAQContent.length; i++) {
            dl = document.createElement('dl');
            // do not display category, just topics
            //dt = document.createElement('dt');
            //dt.appendChild(document.createTextNode(FAQContent[i].Cat));
            //dl.appendChild(dt);

            for (var j = 0; j < FAQContent[i].Topics.length; j++) {
                dd = document.createElement('dd');
                aLink = document.createElement('a');
                arrowImg = document.createElement('img');
                arrowImg.src = '/images/' + getCurrSite() + '/icon-doubleArrow.gif';
				anchor = getCurrSite();
				anchorName = anchor.charAt(0).toLowerCase();
                aLink.href = '#'+anchorName+anchor.substring(1);
                aLink.id = 'c' + i + '_t' + j;
                aLink.appendChild(document.createTextNode(FAQContent[i].Topics[j].topic));
                aLink.appendChild(arrowImg);
                dd.appendChild(aLink);
                dl.appendChild(dd);
            }
            categoryContainer.appendChild(dl);
        }
        this.faqContentWrapper = document.getElementById('faqContent');
        this.catHeight = categoryContainer.offsetHeight;
        this.faqContentWrapper.style.height = this.catHeight + 'px';
    },

    faqContentWrapper:null,
    catHeight:0,
    questionHeight:0,
    answerHeight:0,

    createQuestionListing: function(arrayID) {
        var arrIndex = this.calArrayIndex(arrayID);
        if(arrIndex.length < 2 ) return null;
        var catIndex  = arrIndex[0];
        var topicIndex = arrIndex[1];
        var questionWrapper = YUD.getElementsByClassName('questionWrapper', 'div')[0];

        var qContainer = document.createElement('div');
        qContainer.className = 'question';
        qContainer.id = arrayID + '_q';
        var dl, dt, aLink, arrowImg, anchor, anchorName;
        for(var i=0; i < FAQContent[catIndex].Topics[topicIndex].faqs.length; i++){
            dl = document.createElement('dl');
            dt = document.createElement('dt');
            aLink = document.createElement('a');
            arrowImg = document.createElement('img');
			arrowImg.src = '/images/' + getCurrSite() + '/icon-doubleArrow.gif';
            anchor = getCurrSite();
	    	anchorName = anchor.charAt(0).toLowerCase();
            aLink.href = '#'+anchorName+anchor.substring(1);
            aLink.id = 'c' + catIndex + '_t' + topicIndex + '_q' + i;
            aLink.appendChild(document.createTextNode(FAQContent[catIndex].Topics[topicIndex].faqs[i].q));
			aLink.appendChild(arrowImg);
            dt.appendChild(aLink);
            dl.appendChild(dt);
            qContainer.appendChild(dl);
        }

        questionWrapper.appendChild(qContainer);
        var questions = qContainer.getElementsByTagName('A');
        var questionObj = new ControlPanel(questions, false);
        return qContainer;

    },

    createAnswer: function(arrayID) {
        var arrIndex = this.calArrayIndex(arrayID);
        if(arrIndex.length < 3 ) return null;
        var catIndex  = arrIndex[0];
        var topicIndex = arrIndex[1];
        var faqIndex = arrIndex[2];
        var answerWrapper = YUD.getElementsByClassName('answerWrapper', 'div')[0];

        var aContainer = document.createElement('div');
        aContainer.className = 'answer';
        aContainer.id = arrayID + '_a';

        var dl, dt, dd, h4, aLink, anchor, anchorName;
        var aContent = document.createElement('h4');
        aContent.appendChild(document.createTextNode(FAQContent[catIndex].Topics[topicIndex].faqs[faqIndex].a));
        aContainer.appendChild(aContent);

        //if call to action details exists, display it
        if(FAQContent[catIndex].Topics[topicIndex].faqs[faqIndex].action){
            var hrContainer = document.createElement('div');
            hrContainer.className='hr';
            var hrLine = document.createElement('hr');
            hrContainer.appendChild(hrLine);
            aContainer.appendChild(hrContainer);

            dl = document.createElement('dl');
            dt = document.createElement('dt');
            dt.appendChild(document.createTextNode(FAQContent[catIndex].Topics[topicIndex].faqs[faqIndex].action.title));
            dl.appendChild(dt);
            dd = document.createElement('dd');
            dd.appendChild(document.createTextNode(FAQContent[catIndex].Topics[topicIndex].faqs[faqIndex].action.detail));
            dl.appendChild(dd);
            dd = document.createElement('dd');
            aLink = document.createElement('a');
            anchor = getCurrSite();
            anchorName = anchor.charAt(0).toLowerCase();
            aLink.href = FAQContent[catIndex].Topics[topicIndex].faqs[faqIndex].action.url;
            aLink.appendChild(document.createTextNode(FAQContent[catIndex].Topics[topicIndex].faqs[faqIndex].action.urlName));
            dd.appendChild(aLink);
            dl.appendChild(dd);
            aContainer.appendChild(dl);
        }

        answerWrapper.appendChild(aContainer);
        return aContainer;
    },

    calArrayIndex: function(arrayID) {
        var aIndex = arrayID.split('_');
        var charCnt = 0;
        var rIndex = [];
        if (aIndex.length > 0) {
            charCnt = aIndex[0].indexOf('c');
            if(charCnt > -1) rIndex.push(parseInt(aIndex[0].substr(charCnt + 1)));
        }
        if (aIndex.length > 1) {
            charCnt = aIndex[1].indexOf('t');
            if(charCnt > -1) rIndex.push(parseInt(aIndex[1].substr(charCnt + 1)));
        }
        if(aIndex.length > 2){
            charCnt = aIndex[2].indexOf('q');
            if(charCnt > -1) rIndex.push(parseInt(aIndex[2].substr(charCnt + 1)));
        }
        return rIndex;
    },

    setFAQContentWrapperHeight: function(isCategory){
        var maxHeight = this.catHeight;
        if(maxHeight < this.questionHeight) maxHeight = this.questionHeight;

        // if it is the anwer area, check the height of the answer area as well
        if(!isCategory){
            if(maxHeight < this.answerHeight) maxHeight = this.answerHeight;
        }
        this.faqContentWrapper.style.height = maxHeight + 'px';
    }
};

// FAQ ANIMATION

var ControlPanel = function(control, isCategory) {
    if (control) this.init(control,isCategory);
};

ControlPanel.prototype = {

    addControlListener:function() {
        YUE.addListener(this.control,'click',function(e) {
            this.handleControlClick(e);
        }, this, true);
    },

    handleControlClick: function(e) {

        // kill all answer col if user starts over
        this.hideContainer('answer');

        // get the clicked element
        var trigger = YUE.getTarget(e);

        // add "selected" class
        for (var i = 0; i < this.control.length; i++) {YUD.removeClass(this.control[i],'selected')}

        YUD.addClass(trigger,'selected');

        // if it is a category
        var clickedContainer;
        if (this.isCategory) {
            // hide all the other question listing
            this.hideContainer('question');

            // create the question element - even if it was created before so nothing is selected (#1925)
            clickedContainer = GenerateFAQContent.createQuestionListing(trigger.id);

	      } else {
            // it is a question click
            clickedContainer = document.getElementById(trigger.id + '_a');
            if(!clickedContainer) clickedContainer = GenerateFAQContent.createAnswer(trigger.id);
        }
        var button_container = clickedContainer;
        var attributes = {right:{from:500,to:0}};
        var anim = new YUA(button_container,attributes,.5,YAHOO.util.Easing.easeOut);

        anim.animate();

		// keep track of the height of the current clicked element (question or answer)
        if(this.isCategory) {GenerateFAQContent.questionHeight = clickedContainer.offsetHeight}
		else {GenerateFAQContent.answerHeight = clickedContainer.offsetHeight}

		clickedContainer.style.height = clickedContainer.offsetHeight + 'px';
        clickedContainer.parentNode.style.height = clickedContainer.offsetHeight + 'px';

		// adjust the tbody of the FAQ content if necessary
        GenerateFAQContent.setFAQContentWrapperHeight(this.isCategory);
    },

    hideContainer: function(containerName){
        var hideContainers = YUD.getElementsByClassName(containerName,'div');
        if(hideContainers && hideContainers.length){
            for(var i = 0; i < hideContainers.length; i ++){YUD.get(hideContainers[i]).style.right = '-100em'}
        }
    },

    init: function(control, isCategory) {
        this.isCategory = isCategory;
        this.control = YUD.get(control);
        if (control) this.addControlListener();
    }
};

var initFAQs = function() {
    GenerateFAQContent.init();
    var module = YUD.getElementsByClassName('faqs','div');
    var categoryContainer = YUD.getElementsByClassName('category','div')[0];
    var category = categoryContainer.getElementsByTagName('A');
    var catObj = new ControlPanel(category,true);
}

// ----------------------------------------------------------------------------------------------

// GLOBAL CUSTOM FORM INPUT STYLING

// style input fields
var styleTextInput = function (parentObj) {
    var items;
    if(typeof parentObj == 'undefined') items = document.getElementsByTagName('INPUT');
    else items = parentObj.getElementsByTagName('INPUT');

    for (var i=0; i<items.length; i++) {
		var element = items[i];
        if (element.getAttribute('TYPE') == 'text' || element.getAttribute('TYPE') == 'password') {YUD.addClass(element,'inputStyle')};

		// WHOEVER ADDED THIS PLEASE CONTACT FRED, YOUR CODE IS BREAKING SUBMIT FORMS AROUND THE SITE!
		/*if (element.getAttribute('TYPE') == 'submit') continue;
		if (!element.defaultValue) continue;
		element.onfocus = function() {if (this.value == this.defaultValue) {this.value = ''}}
		element.onblur = function() {if (this.value == '') {this.value = this.defaultValue}}*/
    }
}

// return branded "checked" checkbox
var returnCheckboxImgTrue = function(fldName) {
	//if (getCurrSite()=='Pulte')   var x = '/images/Pulte/button-checkboxChecked.gif';
	//if (getCurrSite()=='DelWebb') var x = '/images/DelWebb/button-checkboxChecked.gif';
	//if (getCurrSite()=='DiVosta') var x = '/images/DiVosta/button-checkboxChecked.gif';
	var x = '/images/'+getCurrSite()+'/button-checkboxChecked.gif';
	if (fldName!='regRealtor' && fldName!='profileRealtor'){
	    if((YUD.hasClass('pulte','template-F'))|| (YUD.hasClass('delWebb','template-F')) || (YUD.hasClass('diVosta','template-F')) || (YUD.hasClass('centex','template-F'))){
	        var x = '/images/global/btn-checkboxChecked.gif';   
	    }
	}
	return x;
}

// return branded "unchecked" checkbox
var returnCheckboxImgFalse = function(fldName) {
	var x;
	//if (getCurrSite()=='Pulte')   var x = '/images/Pulte/button-checkboxUnchecked.gif';
	//if (getCurrSite()=='DelWebb') var x = '/images/DelWebb/button-checkboxUnchecked.gif';
	//if (getCurrSite()=='DiVosta') var x = '/images/DiVosta/button-checkboxUnchecked.gif';
	var x = '/images/'+getCurrSite()+'/button-checkboxUnchecked.gif';
	if (fldName!='regRealtor' && fldName!='profileRealtor'){
	    if((YUD.hasClass('pulte','template-F'))|| (YUD.hasClass('delWebb','template-F')) || (YUD.hasClass('diVosta','template-F')) || (YUD.hasClass('centex','template-F'))){
	        var x = '/images/global/btn-checkboxUnChecked.gif';   
	    }
	}
	return x;
}

// return branded "checked" radio
var returnRadioImgTrue = function() {
	//if (getCurrSite()=='Pulte')   var x = '/images/Pulte/button-radioChecked.gif';
	//if (getCurrSite()=='DelWebb') var x = '/images/DelWebb/button-radioChecked.gif';
	//if (getCurrSite()=='DiVosta') var x = '/images/DiVosta/button-radioChecked.gif';
	if ((YUD.hasClass('pulte','template-F'))|| (YUD.hasClass('delWebb','template-F')) || (YUD.hasClass('diVosta','template-F')) || (YUD.hasClass('centex','template-F'))){
	    var x = '/images/global/btn-checkboxChecked.gif';   
	}
	else{
	    var x = '/images/'+getCurrSite()+'/button-radioChecked.gif';
	}
	return x;
}

// return branded "unchecked" radio
var returnRadioImgFalse = function() {
	//if (getCurrSite()=='Pulte')   var x = '/images/Pulte/button-radioUnchecked.gif';
	//if (getCurrSite()=='DelWebb') var x = '/images/DelWebb/button-radioUnchecked.gif';
	//if (getCurrSite()=='DiVosta') var x = '/images/DiVosta/button-radioUnchecked.gif';
	if ((YUD.hasClass('pulte','template-F'))|| (YUD.hasClass('delWebb','template-F')) || (YUD.hasClass('diVosta','template-F')) || (YUD.hasClass('centex','template-F'))){
	    var x = '/images/global/btn-checkboxUnChecked.gif';   
	}
	else{
	    var x = '/images/'+getCurrSite()+'/button-radioUnchecked.gif';
	}
	return x;
}

// style button inputs
var styleButtonInput = function () {

    var inputs = YUD.getElementsByClassName('styleInput','input');

    for(var i=0; i < inputs.length; i++) {

	if (!YUD.getPreviousSibling(inputs[i])) { // do not execute if imgs already exist for an input

		// style checkboxes
        if(inputs[i].getAttribute('type') == 'checkbox') CheckboxRadioStyle.addCheckboxStyle(inputs[i],i);

        // style radios
        if(inputs[i].getAttribute('type') == 'radio' && !YUD.getPreviousSibling(inputs[i])) {

            var img = document.createElement('img');
            // check if the radio is checked
            if (YUD.hasClass(inputs[i],'disabled')) {
                if ((YUD.hasClass('pulte','template-F'))|| (YUD.hasClass('delWebb','template-F')) || (YUD.hasClass('diVosta','template-F')) || (YUD.hasClass('centex','template-F'))){
	               img.src = '/images/global/btn-checkboxUnChecked.gif';   
	            }
	            else{
	               img.src = '/images/' + getCurrSite() + '/button-radioDisabled.gif';
	            }
                inputs[i].disabled = true;
            }
			else if (inputs[i].checked) {img.src = returnRadioImgTrue()}
            else {img.src = returnRadioImgFalse()}

            img.id = 'radioImage'+i;

            // determine if this is a Contact Us radio button, use specific class for Select a Topic.
            var checkButton = inputs[i].parentNode.parentNode.id;
            (checkButton == 'selectTopic') ? img.className = 'customRadioContactUs' : img.className = 'customRadio';
            if ((YUD.hasClass('pulte','template-F'))|| (YUD.hasClass('delWebb','template-F')) || (YUD.hasClass('diVosta','template-F')) || (YUD.hasClass('centex','template-F'))){
	            img.className = 'customSearchCheckbox';
	        }
            // handle switching when users clicks on image
            img.imgIndex = i;
            YUE.on(img,'click',function() {
                if (YUD.getNextSibling(this).disabled) {} // do nothing
                else {
                    if(YUD.getNextSibling(this).checked) {
                        YUD.getNextSibling(this).checked = false;
                        document.getElementById('radioImage'+this.imgIndex).src=returnRadioImgFalse();
                    }
                    else {
                        YUD.getNextSibling(this).checked = true;
                        document.getElementById('radioImage'+this.imgIndex).src=returnRadioImgTrue();
                    }
                    // fire any HTML embedded onclick events
                    YUD.getNextSibling(this).click();
                }
            });

            // handle switching on input state change
            YUE.on(inputs[i],'click',function() {
                if (this.disabled) {} // do nothing
                else {
                    if (this.checked) {YUD.getPreviousSibling(this).src=returnRadioImgTrue()}
                    else {YUD.getPreviousSibling(this).src=returnRadioImgFalse()}
                }
                for(var j=0; j < inputs.length; j++) {
                    if (inputs[j].getAttribute('name')==this.getAttribute('name') && inputs[j] != this) {
                        if(!inputs[j].disabled){
                            YUD.getPreviousSibling(inputs[j]).src=returnRadioImgFalse();
                            inputs[j].checked = false;
                        }
                    }
                }
            });

            // if IE, listen to the label click event
            if(isIE){
                var inputLabel = YUD.getNextSibling(inputs[i]);
                if(inputLabel){
                    YUE.on(inputLabel,'click',function(){
                        var fld = document.getElementById(this.getAttribute('htmlFor'));
                        if(fld) fld.click();
                    });
                }
            }

            //place image in front of the checkbox and hide radio
            inputs[i].parentNode.insertBefore(img,inputs[i]);
            inputs[i].style.display='none';
        }
	}
    }
}

//addCheckboxStyle
var CheckboxRadioStyle = {
    addCheckboxStyle: function(fld, index, isNotebookCompare, isLanding,isLandingWithPromo){
        if(typeof isNotebookCompare == 'undefined') isNotebookCompare = false;
        if(typeof isLanding == 'undefined') isLanding = false;
		if(typeof isLandingWithPromo == 'undefined') isLandingWithPromo = false;
        var img = document.createElement('img');
        //check if the checkbox is checked
        if (YUD.hasClass(fld,'disabled')) {
            img.src = '/images/' + getCurrSite() + '/button-checkboxDisabled.gif';
            fld.disabled = true;
        }
        else if (fld.checked) {
            img.src = returnCheckboxImgTrue(fld.getAttribute('name'))
            if (((YUD.hasClass('pulte','template-F'))|| (YUD.hasClass('delWebb','template-F')) || (YUD.hasClass('diVosta','template-F')) || (YUD.hasClass('centex','template-F'))) && (fld.getAttribute('name')!='regRealtor' && fld.getAttribute('name')!='profileRealtor')){
	            img.className = 'customSearchCheckbox';
	        }else{
                img.className = 'customCheckbox';
            }
        }   
        else {
            img.src = returnCheckboxImgFalse(fld.getAttribute('name'))
            if (((YUD.hasClass('pulte','template-F'))|| (YUD.hasClass('delWebb','template-F')) || (YUD.hasClass('diVosta','template-F')) || (YUD.hasClass('centex','template-F'))) && (fld.getAttribute('name')!='regRealtor' && fld.getAttribute('name')!='profileRealtor')){
	            img.className = 'customSearchCheckbox';
	        }else{
                img.className = 'customCheckbox';
            }
        }

        // handle switching when users clicks on image
        img.imgIndex = index;
        YUE.on(img,'click',function() {
            var input = YUD.getNextSibling(this);
            if (input.disabled) {} // do nothing
            else {
                // NOTE: the final "checked" state is reversed because the "click" event "inputs[this.imgIndex].click();" (below) switches it back again
                if(input.checked) {
                    if(isSafari2) input.checked = false;
                    this.src=returnCheckboxImgFalse(input.name);
                }
                else {
                    if(isSafari2) input.checked = true;
                    this.src=returnCheckboxImgTrue(input.name);
                }
                // fire any HTML embedded onclick events (this switches the "checked" state)
                input.click();
            }
        });
        // handle switching on input state change
        YUE.on(fld,'click',function() {

            if (this.disabled) {} // do nothing
            else {
                (this.checked) ? YUD.getPreviousSibling(this).src=returnCheckboxImgTrue(fld.name) : YUD.getPreviousSibling(this).src=returnCheckboxImgFalse(fld.name);
            }
            // if it is notebookcompare function, track the number of checked boxes
            if(isNotebookCompare) myNotebookPanel.trackCompareCheckbox();
            // if it is a landing checkbox, track the selected community
            if(isLanding) LandingSearch.updateCommunityList(this);
			 // if it is a landing with promo checkbox, track the selected community
            if(isLandingWithPromo) LandingSearchWithPromo.updateCommunityList(this);
        });
        // if IE, listen to the label click event
        if(isIE){
            var inputLabel = YUD.getNextSibling(fld);
            if(inputLabel){
                YUE.on(inputLabel, 'click', function(){
                    var fld = document.getElementById(this.getAttribute('htmlFor'));
                    if(fld) fld.click();
                });
            }
        }
        //place image in front of the checkbox and hide inputs
        fld.parentNode.insertBefore(img,fld);
        fld.style.display='none';
    },

    //checkboxRadio button image change function for IE browser
    updateIECheckboxRadioImage: function(fld){
        if (fld.getAttribute('disabled')) {} // do nothing
        else {
            if(fld.checked) {
                fld.checked = false;
                (fld.getAttribute('type') == 'checkbox') ? YUD.getPreviousSibling(fld).src=returnCheckboxImgFalse(fld.name) : YUD.getPreviousSibling(fld).src=returnRadioImgFalse();
            }
            else {
                fld.checked = true;
                (fld.getAttribute('type') == 'checkbox') ? YUD.getPreviousSibling(fld).src=returnCheckboxImgTrue(fld.name) : YUD.getPreviousSibling(fld).src=returnRadioImgTrue();
            }
        }
    }
}

// ----------------------------------------------------------------------------------------------

// GOOGLE MAPS

var mapSearchControl;
function loadGSearch() {
    //alert("here in loadGsearch");
    var container = document.getElementById('mapsearch');
    if(!container) return;
    // use lat lng to plot the map
    var center = new Object();
    center.lat = defaultMapLat;
    center.lng = defaultMapLng;

    var address = '';
    var comName = '';
    if((typeof dirAddress != 'undefined') && dirAddress) {
        address = dirAddress.address + '<br />' + dirAddress.city + ', ' + dirAddress.state + ' ' + dirAddress.zip;
    }else{
        if (document.getElementById('address1') != null && document.getElementById('_address') != null) address=document.getElementById('_address1').value + '<br />';
        if (document.getElementById('address1') != null && document.getElementById('_address') == null) address=document.getElementById('address1').value + '<br />';
        if (document.getElementById('cityStateZip') != null && document.getElementById('_cityStateZip') != null) address += document.getElementById('_cityStateZip').value;
        if (document.getElementById('cityStateZip') != null && document.getElementById('_cityStateZip') == null) address += document.getElementById('cityStateZip').value;
    }

    if(document.getElementById('communityName') != null){
       comName = document.getElementById('communityName').value;
    }

    var mapZoomDiff = 5;
    if (document.getElementById("newAboutMap") != null)
        mapZoomDiff = 3;
        
    
    // remove direction drivingDirections: GSmapSearchControl.DRIVING_DIRECTIONS_FROM_USER
    //mapSearchControl = new GSmapSearchControl(container,
	//	center,
	//	{	title : comName,
    //        url: '#content',
    //        zoomControl : GSmapSearchControl.ZOOM_CONTROL_ENABLE_ALL,
    //        idleMapZoom : GSmapSearchControl.ACTIVE_MAP_ZOOM-mapZoomDiff,
    //        activeMapZoom : GSmapSearchControl.ACTIVE_MAP_ZOOM-mapZoomDiff,
    //        mapTypeControl : GSmapSearchControl.MAP_TYPE_ENABLE_ALL,
    //        onBootComplete : function() {
    //            // replace center HTML
    //            this.mapCenterHtml.innerHTML = '<div class="gsmsc-user-title">' + ((comName != "")?('<strong>' + comName + '</strong><br />'):"") + address + '</div>';
    //        }
    //    }
	//);


    /*  WAS (ACTIVE_MAP_ZOOM-5)
    mapSearchControl = new GSmapSearchControl(container,
		center,
		{	title : comName,
            url: '#content',
            zoomControl : GSmapSearchControl.ZOOM_CONTROL_ENABLE_ALL,
            idleMapZoom : GSmapSearchControl.ACTIVE_MAP_ZOOM-5,
            activeMapZoom : GSmapSearchControl.ACTIVE_MAP_ZOOM-5,
            mapTypeControl : GSmapSearchControl.MAP_TYPE_ENABLE_ALL,
            onBootComplete : function() {
                // replace center HTML
                this.mapCenterHtml.innerHTML = '<div class="gsmsc-user-title">' + ((comName != "")?('<strong>' + comName + '</strong><br />'):"") + address + '</div>';
            }
        }
	);
    */




}

var gdir;
YUE.onDOMReady(function() {
	var body = document.getElementsByTagName('body')[0];
	if (!YUD.getElementsByClassName('google-map','div')[0] || body.className == 'template-F') return;
    var targets = YUD.getElementsByClassName('google-map','div');
	for (i=0; i < targets.length; i++) {
		if (GBrowserIsCompatible()) {
            // community template with tabs, we need to set the google map on tab click this function handles google map on page load
            if(body.className != 'template-D' && body.className != 'template-N'){
                var map = new google.maps.Map(targets[i]);
                if(body.className == 'template-Q' || body.className == 'template-G') map.addControl(new GLargeMapControl());
                else map.addControl(new GSmallMapControl());
                map.addControl(new GScaleControl());
                map.setCenter(new google.maps.LatLng(defaultMapLat, defaultMapLng));
                map.setZoom(14);
                if(body.className == 'template-M'){
                    gdir = new GDirections(map, document.getElementById('direction-results'));
                    google.maps.event.addListener(gdir, 'error', handleErrorsGoogleDirections);
                    loadGoogleDirection();
                    break;
                }
                targets[i].map = map;
            }
        }
	}
});

// google directions
function setDirections(dirURL, fromAddress,toAddress) {
    //Pulte_TAB_SUBMIT3();    // pointroll tag
    var directionURL = dirURL + '?f=' + escape(fromAddress) + '&t=' + escape(toAddress);
	popWindow('regular',directionURL,'Direction',700,700,'');
}

// load google direction on fastpass template
function loadGoogleDirection(){

	// to address will be hard coded on community page fastPassToAddress
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	var fromAddress = '', toAddress = '';
	var pair;
	for (var i=0;i<vars.length;i++) {
		pair = vars[i].split('=');
		if(pair[0].toLowerCase() == 'f') fromAddress = unescape(pair[1]);
	}
	if(fromAddress != '' && fastPassToAddress != '') gdir.load('from: ' + fromAddress + ' to: ' + fastPassToAddress);
}

function handleErrorsGoogleDirections (){
    var dirPanel = document.getElementById('direction-results');
    if(!dirPanel) return;
    if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS) dirPanel.innerHTML =      '<p class="ajaxError"><br />No corresponding geographic location could be found for one of the specified addresses. This may be due to the fact that the address is relatively new, or it may be incorrect. <br />Error code: ' + gdir.getStatus().code + '</p>';
    else if (gdir.getStatus().code == G_GEO_SERVER_ERROR) dirPanel.innerHTML =    '<p class="ajaxError"><br />A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.<br /> Error code: ' + gdir.getStatus().code + '</p>';
    else if (gdir.getStatus().code == G_GEO_MISSING_QUERY) dirPanel.innerHTML =   '<p class="ajaxError"><br />The HTTP q parameter was either missing or had no value. For geocoder requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.<br />Error code: ' + gdir.getStatus().code + '</p>';
    else if (gdir.getStatus().code == G_UNAVAILABLE_ADDRESS) dirPanel.innerHTML = '<p class="ajaxError"><br />The geocode for the given address or the route for the given directions query cannot be returned due to legal or contractual reasons.<br />Error code: ' + gdir.getStatus().code + '</p>';
    else if (gdir.getStatus().code == G_GEO_BAD_KEY) dirPanel.innerHTML =         '<p class="ajaxError"><br />The given key is either invalid or does not match the domain for which it was given.<br />Error code: ' + gdir.getStatus().code + '</p>';
    else if (gdir.getStatus().code == G_GEO_BAD_REQUEST) dirPanel.innerHTML =     '<p class="ajaxError"><br />A directions request could not be successfully parsed.<br />Error code: ' + gdir.getStatus().code + '</p>';
    else dirPanel.innerHTML =                                                     '<p class="ajaxError"><br />An unknown error occurred.</p>';
}

var cleanupGMap = function(){
    var mapDivs = YUD.getElementsByClassName('google-map','div');
    if(mapDivs.length < 1) return;
    //GUnload();
    if(typeof map != 'undefined') map = null;
    for (var i=0; i < mapDivs.length; i++){if(mapDivs[i].map){mapDivs[i].map = null}}
}

// ----------------------------------------------------------------------------------------------

// ATTACH COMMUNITY/NEIGHBORHOOD ID TO CONTACT US HREF

YUE.onDOMReady(function() {
	if (document.getElementById('contactUsURL')) {
		YUE.on(document.getElementsByTagName('A'),'click',function() {
			if (this.href.indexOf('contact-us.aspx')>-1 && !YUD.getAncestorByClassName(this,'similarHomeModels')) this.href = document.getElementById('contactUsURL').value;
		});
	}
});

// ----------------------------------------------------------------------------------------------


// GET CLIMATE INFO FROM WEATHER.COM

YUE.onDOMReady(function() {
	if (document.getElementById('communityZip')) {
        if(!YUD.getElementsByClassName('pt-climate')[0]) return;
        YUD.getElementsByClassName('pt-climate')[0].style.display='inline';
		YUE.on(YUD.getElementsByClassName('pt-climate')[0],'click',function() {popWindow('regular','http://www.weather.com/outlook/driving/interstate/wxclimatology/monthly/graph/' + document.getElementById('communityZip').value,'weather',700,850)})
	}
});

// ----------------------------------------------------------------------------------------------

// UTILS

var StringUtils = {
    addCommas: function (num){
        var nStr = num + '';
        if(nStr == '') return nStr;
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {x1 = x1.replace(rgx, '$1' + ',' + '$2')}
        return x1 + x2;
    }
};

// ----------------------------------------------------------------------------------------------

// REMOVE TABLE COLUMN

// used in compare communities and plan page
var removeTableColumn = function(colClassName) {
    var table = YUD.getElementsByClassName('compareResults', 'table', document)[0];
    if(table){
        var tHeader = table.getElementsByTagName('thead')[0];
        var rows = YUD.getFirstChild(tHeader);
        var cols = YUD.getChildren(rows);
        var colIndex = -1;
        for(var i=0; i < cols.length; i++){
            if(YUD.hasClass(cols[i], colClassName) ){
                colIndex = i;
               break;
            }
        }
        if(colIndex < 0) return;

        for(var i=0; i < cols.length; i++){if(colIndex == i) rows.removeChild(cols[i])}
        var tBodys = table.getElementsByTagName('tbody');

        for(var i = 0; i < tBodys.length; i++){
            rows = YUD.getChildren(tBodys[i]);

            for(var k = 0; k < rows.length; k++){
                cols = YUD.getChildren(rows[k]);
                for (var m = 0; m < cols.length; m++){
                    if(colIndex == m) rows[k].removeChild(cols[m]);
                }
            }
        }

    }
}

// ----------------------------------------------------------------------------------------------

// COMPARE RESULTS TABLE STYLE

var applyCompareResultTableStyle = function(){

    var thead1, thead2, tbody1, tbody2;
    var tb = document.getElementById('Maintable');
    if(!tb) return;

    var tHeader = YUD.getElementsByClassName('thead_primarygrid','tr','Maintable');
    var tBodyGrid1 = YUD.getElementsByClassName('tbody_primarygrid','tr','Maintable');
    var tHeader2 = YUD.getElementsByClassName('tbody_secondarygridheader','tr','Maintable');
    var tBodyGrid2 = YUD.getElementsByClassName('tbody_secondarygrid','tr','Maintable');

    thead1 = document.createElement('thead');
    thead1.className = 'primarygrid';
    tb.insertBefore(thead1, tb.firstChild);

    tbody1 = document.createElement('tbody');
    tbody1.className = 'primarygrid';
    YUD.insertAfter(tbody1, YUD.get(thead1));

    thead2 = document.createElement('tbody');
    thead2.className = 'secondarygridheader';

    YUD.insertAfter(thead2, YUD.get(tbody1));
    tbody2 = document.createElement('tbody');
    tbody2.className = 'secondarygrid';

    YUD.insertAfter(tbody2, YUD.get(thead2));

    thead1.appendChild(YUD.get(tHeader[0]));
    for(var i=0; i < tBodyGrid1.length; i++){tbody1.appendChild(YUD.get(tBodyGrid1[i]))}
    for(var i=0; i < tHeader2.length; i++){thead2.appendChild(YUD.get(tHeader2[i]))}
    for(var i=0; i < tBodyGrid2.length; i++){tbody2.appendChild(YUD.get(tBodyGrid2[i]))}

    // remove unnecessary columns
    var qsObj = new Querystring();
    if(qsObj.get('ids').indexOf(',') > -1){
        var vals = qsObj.get('ids').split(',');
        var cols = [];
        for(var i = 4; i > vals.length; i--){
            cols.push(i);
        }
        var colName;
        for(var i=0; i < cols.length; i++){
            colName = 'col' + cols[i];
            removeTableColumn(colName);
        }
    }
}

var openParentWindowLink = function(url){
    window.opener.location.href= url;
    window.opener.focus();
}

// ----------------------------------------------------------------------------------------------

// INFO BUTTON (TOOLTIPS)

var initInfoToolTips = function() {
	var targets = YUD.getElementsByClassName('infoToolTipContainer');
	for (i=0; i < targets.length; i++) {createInfoToolTips(targets[i])}
}

var createInfoToolTips = function(theInstance) {
	var theTrigger = theInstance.getElementsByTagName('a')[0].id;
	var theToggle = YUD.getElementsByClassName('infoToolTip','',theInstance)[0].id;
	YAHOO.namespace('infoToolTip');
	YAHOO.infoToolTip.panel = new YAHOO.widget.Panel(theToggle,{width:'200px',visible:false,draggable:false});
	YAHOO.infoToolTip.panel.render();
	YUE.addListener(theTrigger,'mouseover',YAHOO.infoToolTip.panel.show,YAHOO.infoToolTip.panel,true);
	YUE.addListener(theTrigger,'mouseout',YAHOO.infoToolTip.panel.hide,YAHOO.infoToolTip.panel,true);
}

YUE.addListener(window,'load',initInfoToolTips);

// ----------------------------------------------------------------------------------------------

// PRINT PAGE

YUE.onDOMReady(function() {
    YUE.addListener(YUD.getElementsByClassName('pt-print','a'),'click',function() {window.print()});
});

// ----------------------------------------------------------------------------------------------

// HIGHLIGHT TABLE ROWS

var highlightTableRows = function() {
	function altEveryOther(parent,childType) {
		var allChildren = parent.getElementsByTagName(childType);
        // remove the class first before we call it
        for (var i=0; i < allChildren.length; i++){YUD.removeClass(allChildren[i],'alternate')}
        for (var i=0; i < allChildren.length; i+=2) {YUD.addClass(allChildren[i],'alternate')}
	}
	// trs alternate within tables, and divs alternate within tds
	YUD.batch(YUD.getElementsByClassName('srListings','tbody'),altEveryOther,'tr');
	YUD.batch(YUD.getElementsByClassName('srListings','td'),altEveryOther,'div');
}


var highlightSearchTableRows = function() {
	function altEveryOther(parent,childType) {
	
		var allChildren = parent.getElementsByTagName(childType);
        // remove the class first before we call it
        for (var i=0; i < allChildren.length; i++){YUD.removeClass(allChildren[i],'alternate')}
        for (var i=0; i < allChildren.length; i+=2) {YUD.addClass(allChildren[i],'alternate')}
	}
	// trs alternate within tables, and divs alternate within tds
	YUD.batch(YUD.getElementsByClassName('srListings','tbody'),altEveryOther,'tr');
	YUD.batch(YUD.getElementsByClassName('srListings','td'),altEveryOther,'div');
}
// ----------------------------------------------------------------------------------------------

// SITE SEARCH SUBMIT

YUE.onDOMReady(function() {
    YUE.addListener(document.siteSearch,'submit',function() {
		var url = document.siteSearch.action;
		var searchTerm = document.getElementById('site-search').value;
		window.location.href = url + '&q=' + searchTerm;
	});
});

// ----------------------------------------------------------------------------------------------

// AJAX "LOADING" SPINNER

var ajaxLoading = function(containerID,targetCLASS,toggle) {

	var target = document.getElementById(containerID);
	var button = YUD.getElementsByClassName(targetCLASS,'',target)[0];
	var timeout;
    var spinnerId = 'ajaxSpinner_' + containerID;
	var image = document.createElement('img');
	image.id = spinnerId;
	image.className = 'floatright';
	image.setAttribute('alt','loading...');
	image.setAttribute('src','/images/global/spinner.gif');

	// remove spinner, show error msg
	var serverError = function() {
		if (document.getElementById(spinnerId)) {
            target.removeChild(document.getElementById(spinnerId));
			target.innerHTML = '<div class="ajaxError">The server did not respond. Please try again later...</div>';
		}
	}

	if (toggle=='start') {
    	if (button) button.style.display = 'none';
		if(target!=null) target.appendChild(image);
		timeout = setTimeout(serverError,50000); // stop trying after 50 seconds
	}
	else {
		if (timeout!='null') clearTimeout(timeout);
		if (button) button.style.display = 'inline';
		if (document.getElementById(spinnerId)) target.removeChild(document.getElementById(spinnerId));
	}
}

// ----------------------------------------------------------------------------------------------

// ADD COMMAS TO MONETARY VALUES

var addCommas = function(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {x1 = x1.replace(rgx, '$1' + ',' + '$2')}
    return x1 + x2;
}

// ----------------------------------------------------------------------------------------------

// LOAD SITEMAP CITIES

var createSiteMapStates = function(){
    var html = '<ul class="primary">';
    var curBrand = getCurrSite().toLowerCase();
    if(communities && communities[curBrand] && communities[curBrand].length){
        for(var i=0; i < communities[curBrand].length; i++) {
            html += '<li><a href="' + urlSiteBase + '/find-a-home/search.aspx?state=' + communities[curBrand][i].stateCode  + '&brand=' + productSearchBrandIds[getCurrSite()] +'&fc=' + communities[curBrand][i].stateCode + '">'  + communities[curBrand][i].stateName + '</a></li>';
        }
    }
    html += '</ul>';
    return html;
}

// ----------------------------------------------------------------------------------------------

// LOAD SITEMAP STATE DATA

//YUE.onDOMReady(function(){
//    var listingDiv = document.getElementById('siteMapStateListing');
//    if(listingDiv) listingDiv.innerHTML = createSiteMapStates();
//});

// ----------------------------------------------------------------------------------------------

// POPULATE SELECT

var setSelectBoxValue = function(selObj,selValue) {
	if (selObj != null){
		if (selObj.options != null && selObj.options.length > 0) {
			for (var i=0; i < selObj.options.length; i++){
				if (selObj.options[i].value == selValue) {
					selObj.selectedIndex = i;
					break;
				}
			}
		}
	}
}

// ----------------------------------------------------------------------------------------------

// COOKIE FUNCTIONS

function getCookie(name) {
	var start = document.cookie.indexOf(name + '=');
	var len = start + name.length + 1;
	if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
	if (start == -1) return null;
	var end = document.cookie.indexOf(';',len);
	if (end == -1) end = document.cookie.length;
	return unescape(document.cookie.substring(len,end));
}

function setCookie(name,value,expires,path,domain,secure) {
	var today = new Date();
	today.setTime(today.getTime());
	if (expires) expires = expires * 1000 * 60 * 60 * 24;
	var expires_date = new Date(today.getTime() + (expires));
	document.cookie = name+'='+escape( value ) +
		((expires) ? ';expires='+expires_date.toGMTString() : '') + //expires.toGMTString()
		((path) ?    ';path=' + path : '') +
		((domain) ?  ';domain=' + domain : '') +
		((secure) ?  ';secure' : '');
}

function deleteCookie(name,path,domain) {
	if (getCookie(name)) document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

// ----------------------------------------------------------------------------------------------

// FOR BROWSERS THAT DON'T REFLECT THE DOM CONSTANTS (LIKE IE)

if (document.ELEMENT_NODE == null) {
    document.ELEMENT_NODE = 1;
    document.TEXT_NODE = 3;
}

var TableUtils = {

    whtSpEnds: new RegExp('^\\s*|\\s*$', 'g'),
    whtSpMult: new RegExp('\\s\\s+', 'g'),
    dallarSign: new RegExp('\\$', 'g'),
    commaSign: new RegExp('\\,', 'g'),

    tblEl: null,
    sortLinks: null,

    // initSortTable
    initSortTable: function(id){
        this.tblEl = document.getElementById(id);
        if(!this.tblEl) return;
        var tHead = this.tblEl.parentNode.getElementsByTagName('thead')[0];
        this.sortLinks = tHead.getElementsByTagName('a');
        if(this.sortLinks){
            var counter = 0;
            for (var i=0; i < this.sortLinks.length; i++) TableUtils.addClickEvent(i, this.sortLinks[i]);
            TableUtils.sortTable(0, false, this.sortLinks[0]); // sort the first column first
        }
    },

    //addClickEvent
    addClickEvent: function(col, linkObj){
        YUE.addListener(linkObj, 'click', function(){TableUtils.sortTable(col, false, linkObj)})
    },

    //sortTable
    sortTable: function(col, rev, linkObj){
        // first time this function is called for a given table, set up an array of reverse sort flags
        if (this.tblEl.reverseSort == null) {
            this.tblEl.reverseSort = new Array();
            this.tblEl.lastColumn = -1; // also, assume nothing was sorted
        }

        // if this column has not been sorted before, set the initial sort direction
        if (this.tblEl.reverseSort[col] == null) this.tblEl.reverseSort[col] = rev;

        // if this column was the last one sorted, reverse its sort direction
        if (col == this.tblEl.lastColumn) this.tblEl.reverseSort[col] = !this.tblEl.reverseSort[col];

        // remember this column as the last one sorted
        this.tblEl.lastColumn = col;
        this.setSortImage(linkObj, this.tblEl.reverseSort[col]);

        // set the table display style to "none" - necessary for netscape 6 browsers
        var oldDsply = this.tblEl.style.display;
        this.tblEl.style.display = 'none';

        // sort the rows based on the content of the specified column using a selection sort
        var tmpEl;
        var i, j;
        var minVal, minIdx;
        var testVal;
        var cmp;

        for (i = 0; i < this.tblEl.rows.length - 1; i++) {
            // assume the current row has the minimum value
            minIdx = i;
            minVal = this.getTextValue(this.tblEl.rows[i].cells[col]);

            // search the rows that follow the current one for a smaller value
            for (j = i + 1; j < this.tblEl.rows.length; j++) {
                testVal = this.getTextValue(this.tblEl.rows[j].cells[col]);
                cmp = this.compareValues(minVal, testVal);

                // negate the comparison result if the reverse sort flag is set
                if (this.tblEl.reverseSort[col]) cmp = -cmp;

                // if this row has a smaller value than the current minimum, remember its position and update the current minimum value
                if (cmp > 0) {
                    minIdx = j;
                    minVal = testVal;
                }
            }
            // by now, we have the row with the smallest value. remove it from the table and insert it before the current row
            if (minIdx > i) {
              tmpEl = this.tblEl.removeChild(this.tblEl.rows[minIdx]);
              this.tblEl.insertBefore(tmpEl, this.tblEl.rows[i]);
            }
        }

        // make it look pretty
        highlightTableRows();

        // restore the table's display style
        this.tblEl.style.display = oldDsply;

        return false;
    },

    // getTextValue
    getTextValue:function(el){
        var i;
        var s;

        // find and concatenate the values of all text nodes contained within the element
        s = '';
        for (i = 0; i < el.childNodes.length; i++)
        if (el.childNodes[i].nodeType == document.TEXT_NODE) s += el.childNodes[i].nodeValue;
        else if (el.childNodes[i].nodeType == document.ELEMENT_NODE && el.childNodes[i].tagName == 'BR') s += ' ';
        else s += this.getTextValue(el.childNodes[i]); // use recursion to get text within sub-elements
        return this.normalizeString(s);
    },

    // compare values
    compareValues:function (v1, v2) {
        var f1, f2;
        var r1 = v1.replace(this.dallarSign, '');
        var r2 = v2.replace(this.dallarSign, '');
        r1 = r1.replace(this.commaSign, '');
        r2 = r2.replace(this.commaSign, '');
        // if the values are numeric, convert them to floats
        f1 = parseFloat(r1);
        f2 = parseFloat(r2);
        if (!isNaN(f1) && !isNaN(f2)) {
            v1 = f1;
			v2 = f2;
        }
        // compare the two values
        if (v1 == v2) return 0;
        if (v1 > v2)
		return 1
        return -1;
    },

    // normalizestring
    normalizeString:function(s) {
        s = s.replace(this.whtSpMult, ' ');  // collapse any multiple whites space
        s = s.replace(this.whtSpEnds, '');   // remove leading or trailing white space
        return s;
    },

    // return branded "unchecked" radio
    setSortImage: function(selLinkObj, isRev) {
        var path = '/images/global/';
        if(!this.sortLinks) return;
        for(var i=0; i < this.sortLinks.length; i++){
            var imgControl = YUD.getPreviousSibling(this.sortLinks[i]);
            if(this.sortLinks[i] == selLinkObj){
                if(isRev) imgControl.src = path + 'icon-arrow-down.gif';
				else imgControl.src = path + 'icon-arrow-up.gif';
            }
			else {imgControl.src = path + 'icon-arrow-off.gif'}
        }
    }
}

// NEW Predefined Landing Page function
var LandingSearch = {
    searchResults: [],
    sortedResults: [], // capture the index of the searchResult
    resultLocations: [],
    priceSort: 0, // 0 is low to hight, 1 is high to low
    selectedCommunities: [],
    currentPage: 1,
    totalPages: 0,
    startIndex: 0,
    endIndex: 0,
    curPriceFilter: "",
    highestPrice: 0,
    selectedComList: [],
    userDetails: [],
    priceLabel: "",
    
    initializeResults: function(results){
        //populate country options
        var landingForm = document.getElementById("LandingSignUpForm");
        populateCountryOptions(landingForm); 
        if(!results || !results.markersArray || results.markersArray.length < 1) return;

        LandingSearch.searchResults = results.markersArray.slice(0);
        LandingSearch.resultLocations = results.locations.slice(0);
        LandingSearch.priceLabel = LandingSearch.searchResults[0].PriceLabel;

        //check if user details are returned for anon user
        if(results.userDetails){
            LandingSearch.userDetails = results.userDetails;
        
            document.LandingSignUpForm.landingFirstName.value = LandingSearch.userDetails.FirstName;
            document.LandingSignUpForm.landingLastName.value = LandingSearch.userDetails.LastName;
            document.LandingSignUpForm.landingEmail.value = LandingSearch.userDetails.Email;
           
            var profileCountry = LandingSearch.userDetails.CountryCode;
            var profileState =  LandingSearch.userDetails.StateAbbreviation;
            
            if(profileCountry != "" && profileCountry != "US"){
                document.LandingSignUpForm.landingCountry.value = profileCountry;
                toggleAddress("LandingSignUpForm", "international");
            } else {
                toggleAddress("LandingSignUpForm", "domestic");
                if (profileState) 
                     document.LandingSignUpForm.landingState.value = profileState;
            }
        }
        
        var regex = /PIDS/g;
        for(var i=0; i < LandingSearch.searchResults.length; i++){
            // get the index of the
            if(LandingSearch.searchResults[i].price > LandingSearch.highestPrice) LandingSearch.highestPrice = LandingSearch.searchResults[i].price;
            var info = {index:i, price:LandingSearch.searchResults[i].price,  communityName:LandingSearch.searchResults[i].communityName};
            LandingSearch.sortedResults.push(info);
            // update the image to use bigger image
            LandingSearch.searchResults[i].propertyImage = LandingSearch.searchResults[i].propertyImage.replace(regex, 'PIDI');
            // replace the point object
            LandingSearch.searchResults[i].point = {latitude: LandingSearch.searchResults[i].point.Latitude, longitude: LandingSearch.searchResults[i].point.Longitude};
        }
        // set the highest price
        LandingSearch.highestPrice += 1;

        LandingSearch.resetPaging();
        // create sort field options: filter by Location
        var sortLoc = document.getElementById('sortLocation');
        var sortPrice = document.getElementById('sortPrice');
        var landingSubmit = document.getElementById('landingSubmit');
        if(sortLoc){
            var cnt = 1
            for(var i=0; i < LandingSearch.resultLocations.length; i++){
                sortLoc.options[cnt] = new Option(LandingSearch.resultLocations[i],LandingSearch.resultLocations[i]);
                cnt += 1;
            }
            YUE.addListener(sortLoc, "change", LandingSearch.filterByLocation);
        } 
        var homeTypeFilter = document.getElementById("homeTypeFilter");
        if(homeTypeFilter) {
          for (var i=0; i < homeTypes.length; i++) {
            homeTypeFilter.options[i+1] = new Option(homeTypes[i], homeTypes[i]);
          }
        }
        // add event listener
        if(sortPrice) YUE.addListener(sortPrice, "change", LandingSearch.sortByPrice);
        if(landingSubmit) YUE.addListener(landingSubmit, "click", LandingSearch.submitSignUp);
        if(homeTypeFilter) YUE.addListener(homeTypeFilter, "change", LandingSearch.filterByHomeType);
  
        customMarkerUtils.buildDynamicMarkers(LandingSearch.searchResults);
        LandingSearch.renderResults();

    },

    renderResults: function(){
        // 1) clear the pagination 2)clear the search content 3) build HTML 4) add event listener: highlight, checkbox render, checkbox click event

        var landingDiv = document.getElementById("LandingContent");
        if (!landingDiv) return;
        
        var isUserControl = (document.getElementById("flexibleLandingUserControl") != null); 
        var paging = YUD.getElementsByClassName("pagination", "", landingDiv);

        for(var i=0; i < paging.length; i++){
            paging[i].innerHTML = "";
        }

        //calculating the total number of pages
        this.totalPages = parseInt(LandingSearch.sortedResults.length / 6);
        if(LandingSearch.sortedResults.length % 6 > 0) this.totalPages++;

        var topPagination = '<a href="javascript:LandingSearch.getPage(LandingSearch.currentPage,1);"><img id="btnFirst1" src="/images/Pulte/button-paginationFastBack.gif" alt="Pagination: Fast Back" /></a><a href="javascript:LandingSearch.getPage(LandingSearch.currentPage,2);"><img id="btnPrev1" src="/images/Pulte/button-paginationBack.gif" alt="Pagination: Back" /></a><em>';
        var bottomPagination = '<a href="javascript:LandingSearch.getPage(LandingSearch.currentPage,1);"><img id="btnFirst2" src="/images/Pulte/button-paginationFastBack.gif" alt="Pagination: Fast Back" /></a><a href="javascript:LandingSearch.getPage(LandingSearch.currentPage,2);"><img id="btnPrev2" src="/images/Pulte/button-paginationBack.gif" alt="Pagination: Back" /></a><em>';

       if(LandingSearch.totalPages > 1) {
            var firstPage;
            var lastPage;

            //set first page number value to be displayed
            if(LandingSearch.currentPage > 6)
                firstPage = this.currentPage - 5;
            else
                firstPage = 1;

            //set last page number value to be displayed
            lastPage = firstPage + 9;

            if(lastPage > LandingSearch.totalPages)
                lastPage = LandingSearch.totalPages;

            //always display ten page numbers
            if((lastPage - firstPage) < 9 && lastPage > 10)
                firstPage -= (10 - (lastPage - firstPage + 1));

            for(var i=firstPage;i<=lastPage;i++)
            {
                if(i == LandingSearch.currentPage){
                    topPagination += i + '&nbsp;';
                    bottomPagination += i + '&nbsp;';
                }
                else{
                    topPagination += '<a href="javascript:LandingSearch.getPage('+ i +', 3);">'+ i +'</a>';
                    bottomPagination += '<a href="javascript:LandingSearch.getPage('+ i +', 3);">'+ i +'</a>';
                }
            }
        }

        topPagination += '</em><a href="javascript:LandingSearch.getPage(LandingSearch.currentPage,4);"><img id="btnNext1" src="/images/Pulte/button-paginationForward.gif" alt="Pagination: Forward" /></a><a href="javascript:LandingSearch.getPage(LandingSearch.currentPage,5);"><img id="btnLast1" src="/images/Pulte/button-paginationFastForward.gif" alt="Pagination: Fast Forward" /></a>';
        bottomPagination += '</em><a href="javascript:LandingSearch.getPage(LandingSearch.currentPage,4);"><img id="btnNext2" src="/images/Pulte/button-paginationForward.gif" alt="Pagination: Forward" /></a><a href="javascript:LandingSearch.getPage(LandingSearch.currentPage,5);"><img id="btnLast2" src="/images/Pulte/button-paginationFastForward.gif" alt="Pagination: Fast Forward" /></a>';

        for(var i=0; i < paging.length; i++){
            if(i == 0)
                paging[i].innerHTML = topPagination;
            else
                paging[i].innerHTML = bottomPagination;
        }
        LandingSearch.enablePagingControls();

        // build the HTML Content
        var resultDiv = document.getElementById("landingSearchResults");
        // remove any current listener
        var checkboxes = YUD.getElementsByClassName("styleInput", "input", resultDiv);
        for(var i=0; i < checkboxes.length; i++){
            NotebookUtils.removeCheckboxListeners(checkboxes[i]);
        }

        resultDiv.innerHTML = "";

        var finalOutput = '<ul>';
        var ref;
        var liClass = "";
        var fldChecked = "";
        for(var i=LandingSearch.startIndex; i<LandingSearch.endIndex; i++) {
            liClass = "";
            fldChecked = "";
            ref = LandingSearch.sortedResults[i].index;
            if(LandingSearch.checkIfSelected(LandingSearch.searchResults[ref].comID)){
                liClass = ' class="selected"';
                fldChecked = ' checked';
            }
            finalOutput += '<li' + liClass + '><div class="checkField"><input type="checkbox" id="fld' + LandingSearch.searchResults[ref].comID + '" name="fld' + LandingSearch.searchResults[ref].comID + '" value="' + LandingSearch.searchResults[ref].comID  + '" class="styleInput"' + fldChecked + ' />';
            finalOutput += '<span class="label">' + LandingSearch.searchResults[ref].communityName + ', ' + LandingSearch.searchResults[ref].city + ", " + LandingSearch.searchResults[ref].state + '<\/span><\/div>';
            if (isUserControl) {
              finalOutput += '<span class="priceDetail">' + ((LandingSearch.searchResults[ref].price < 1)?'TBD':LandingSearch.priceLabel + ' $' + StringUtils.addCommas(LandingSearch.searchResults[ref].price)) + '<\/span>';
              finalOutput += '<span class="homeType">' + (LandingSearch.searchResults[ref].planType);
              if (LandingSearch.searchResults[ref].HomesAvailable > 0) finalOutput += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/assets/images/icon-MoveIn.gif">';
              finalOutput += '<\/span>';
            } else {
              finalOutput += '<span class="priceDetail">' + ((LandingSearch.searchResults[ref].price < 1)?'TBD':'Starting at $' + StringUtils.addCommas(LandingSearch.searchResults[ref].price)) + '<\/span>';
            }
            finalOutput += '<img src="' + LandingSearch.searchResults[ref].propertyImage + '" alt="" class="propertyImg" width="126" height="50" />';
            finalOutput += '<div class="details">' + LandingSearch.searchResults[ref].overview + '<br/><em>Sign up for more information.<\/em><\/div><div class="clear"><\/div><\/li>';
        }
        finalOutput += '<\/ul>';
        resultDiv.innerHTML = finalOutput;

        // render checkbox style
        checkboxes = YUD.getElementsByClassName("styleInput", "input", resultDiv);
        for(var i=0; i < checkboxes.length; i++){
            CheckboxRadioStyle.addCheckboxStyle(checkboxes[i], i, false, true);
        }
        // enable highlights
        LandingSearch.setHighLights();
        
        YUE.on(resultDiv.getElementsByTagName("li"), 'click', function(e) {
            var input = this.getElementsByTagName("input")[0];
            var target = YUE.getTarget(e);
            if (target === input || target.className == "customCheckbox") { return; }
            input.click();
            YUE.stopEvent(e);
        });
    },

    checkIfSelected: function(comID){
        var isFound = false;
        if(LandingSearch.selectedComList.length < 1) return isFound;
        for(var i=0; i < LandingSearch.selectedComList.length; i++){
            if(LandingSearch.selectedComList[i] == comID){
                isFound = true;
                break;
            }
        }
        return isFound;
    },

    filterByLocation:function(e){
        var target = YUE.getTarget(e);
        if(!target) return;
        var city="", state="", showAll= false;
        if(target.value == "") return;

        if(target.value.indexOf(",") > -1){
            var val = target.value.split(", ");
            if(val.length > 1){
                city = val[0]; state=val[1];
            }
        } else {
            if(target.value == "all") showAll=true;
        }

        if(!showAll && city == "" && state == "") return;

        LandingSearch.sortedResults = [];
        if(showAll){
            for(var i=0; i < LandingSearch.searchResults.length; i++){
                // get the index of the
                var info = {index:i, price:LandingSearch.searchResults[i].price, communityName:LandingSearch.searchResults[i].communityName}
                LandingSearch.sortedResults.push(info);
            }
        } else if(city != "" && state != ""){

            for(var i=0; i < LandingSearch.searchResults.length; i++){
                if(LandingSearch.searchResults[i].city == city && LandingSearch.searchResults[i].state == state){
                    var info = {index:i, price:LandingSearch.searchResults[i].price, communityName:LandingSearch.searchResults[i].communityName}
                    LandingSearch.sortedResults.push(info);
                }
            }
        }
        //check current sorting 0 == low to high 1 = high to low "" = neutural
        if(LandingSearch.curPriceFilter == "0"){
            LandingSearch.sortedResults.sort(LandingSearch.arraySortPriceAsc);
        } else if (LandingSearch.curPriceFilter == "1"){
            LandingSearch.sortedResults.sort(LandingSearch.arraySortPriceDes);
        }
        LandingSearch.resetPaging();
        LandingSearch.renderResults();
    },

    filterByHomeType: function(e){
        var target = YUE.getTarget(e);
        if(!target) return;
        var type=target.value, showAll= false;
        if(type == "") return;
        if(type == "all") showAll=true;

        LandingSearch.sortedResults = [];
        if(showAll){
            for(var i=0; i < LandingSearch.searchResults.length; i++){
                // get the index of the
                var info = {index:i, price:LandingSearch.searchResults[i].price, communityName:LandingSearch.searchResults[i].communityName}
                LandingSearch.sortedResults.push(info);
            }
        } else if(type != ""){
            for(var i=0; i < LandingSearch.searchResults.length; i++){
                if(LandingSearch.searchResults[i].planType.indexOf(type) != -1 ){
                    var info = {index:i, price:LandingSearch.searchResults[i].price, communityName:LandingSearch.searchResults[i].communityName}
                    LandingSearch.sortedResults.push(info);
                }
            }
        }
        //check current sorting 0 == low to high 1 = high to low "" = neutural
        if(LandingSearch.curPriceFilter == "0"){
            LandingSearch.sortedResults.sort(LandingSearch.arraySortPriceAsc);
        } else if (LandingSearch.curPriceFilter == "1"){
            LandingSearch.sortedResults.sort(LandingSearch.arraySortPriceDes);
        }
        LandingSearch.resetPaging();
        LandingSearch.renderResults();    
    },
    
    sortByPrice: function(e){
        var target = YUE.getTarget(e);
        if(!target) return;
        if(target.value != LandingSearch.curPriceFilter){
            LandingSearch.curPriceFilter = target.value;
            if(target.value == "0"){
                LandingSearch.sortedResults.sort(LandingSearch.arraySortPriceAsc);
            } else if(target.value == "1") {
                LandingSearch.sortedResults.sort(LandingSearch.arraySortPriceDes);
            } else {
                LandingSearch.sortedResults.sort(LandingSearch.arraySortComName);
            }
            LandingSearch.resetPaging();
            LandingSearch.renderResults();
        }
    },

    resetPaging: function(){
        LandingSearch.currentPage = 1;
        LandingSearch.startIndex = 0;
        // more than 6 items, craete paging
        if(LandingSearch.sortedResults.length >= 6){
            LandingSearch.endIndex = 6;
        } else LandingSearch.endIndex = LandingSearch.sortedResults.length;
    },

    // enablePagingControls
    enablePagingControls: function () {
        var first = document.getElementById('btnFirst1');
        var prev = document.getElementById('btnPrev1');
        var next = document.getElementById('btnNext1');
        var last = document.getElementById('btnLast1');

        var firstBtm = document.getElementById('btnFirst2');
        var prevBtm = document.getElementById('btnPrev2');
        var nextBtm = document.getElementById('btnNext2');
        var lastBtm = document.getElementById('btnLast2');

       if(this.currentPage == 1)//this is the first page
       {
          first.style.display = 'none';
          firstBtm.style.display = 'none';

          prev.style.display = 'none';
          prevBtm.style.display = 'none';

          if(this.currentPage != this.totalPages)//checking if result has only 1 page
          {
              next.style.display = '';
              nextBtm.style.display = '';

              last.style.display = '';
              lastBtm.style.display = '';
          }
          else
          {
              next.style.display = 'none';
              nextBtm.style.display = 'none';

              last.style.display = 'none';
              lastBtm.style.display = 'none';
          }
       }
       else
       {
        if(this.currentPage == this.totalPages)//this is the last page
        {
            next.style.display = 'none';
            nextBtm.style.display = 'none';

            last.style.display = 'none';
            lastBtm.style.display = 'none';

            prev.style.display = '';
            prevBtm.style.display = '';

            first.style.display = '';
            firstBtm.style.display = '';
        }
        else
        {
            next.style.display = '';
            nextBtm.style.display = '';

            last.style.display = '';
            lastBtm.style.display = '';

            prev.style.display = '';
            prevBtm.style.display = '';

            first.style.display = '';
            firstBtm.style.display = '';
        }
       }
    },

    setHighLights: function(){
        var sfEls = document.getElementById("landingSearchResults").getElementsByTagName("LI");
        if(isIE && sfEls){
            for (var i=0; i<sfEls.length; i++) {
                sfEls[i].onmouseover=function() {
                    YUD.addClass(this, "sfhover");
                }
                sfEls[i].onmouseout=function() {
                    YUD.removeClass(this, "sfhover");
                }
            }
        }
    },

    getPage: function(pageNumber,pType){
        // update pagination info: (2) * 6 -  6
        // update search content
        // add event listener
        var pageType;
        switch(pType)
        {
            case 1: pageType = 'first';
                    this.currentPage = 1;
                break;
            case 2: pageType = 'prev';
                    this.currentPage--;
                break;
            case 3: pageType = 'page';
                    this.currentPage = pageNumber;
                break;
            case 4: pageType = 'next';
                    this.currentPage++;
                break;
            case 5: pageType = 'last';
                    this.currentPage = this.totalPages;
                break;
        }
        this.endIndex = this.currentPage * 6;
        this.startIndex = this.endIndex - 6;
        if(this.endIndex > this.sortedResults.length) this.endIndex = this.sortedResults.length;
        this.renderResults();
    },

    // sort by price then community name in ascending order (price = 0 should be displayed at the bottom of the page)
    arraySortPriceAsc: function(a,b){
        var aVal = (a.price == 0)?LandingSearch.highestPrice:a.price;
        var bVal = (b.price == 0)?LandingSearch.highestPrice:b.price;
        if(aVal == bVal){
            if(a.communityName == b.communityName){
                return 0;
            }
            return (a.communityName < b.communityName) ? -1 : 1;
        }
        return (aVal - bVal);
    },

    // sort by price then community Name in descending order
    arraySortPriceDes: function(a,b){
        if(a.price == b.price){
            if(a.communityName == b.communityName){
                return 0;
            }
            return (a.communityName < b.communityName) ? -1 : 1;
        }
        return (b.price - a.price);
    },

    // sort by community name
    arraySortComName: function(a, b){
        if(a.communityName == b.communityName) return 0;
        return (a.communityName < b.communityName)? -1 : 1;
    },

    updateCommunityList: function(target){
        if(!target) return;
        var isFound = false;
        var foundIndex = -1;

        if(LandingSearch.selectedComList.length > 0){
            for(var i=0; i < LandingSearch.selectedComList.length; i++){
                if(LandingSearch.selectedComList[i] == target.value){
                    isFound = true;
                    foundIndex = i;
                    break;
                }
            }
        }
        // adding
        var li = target.parentNode.parentNode;
        if(target.checked){
             // if adding but the value does not exist, add it to the list
            if(!isFound) LandingSearch.selectedComList.push(target.value);
            if(!YUD.hasClass(li, "selected")) YUD.addClass(li, "selected");
        } else {
            // if removing and is in the list, remove it
            if(isFound) LandingSearch.selectedComList.splice(foundIndex, 1);
            if(YUD.hasClass(li, "selected")) YUD.removeClass(li, "selected");
        }
    },

    submitSignUp: function(){

        var isInternational = false;
        var intl = YUD.getElementsByClassName("international", "div", "LandingSignUpForm")[0];
        if(!YUD.hasClass(intl, "hide")){
            isInternational = true;
        }
        var fName = document.LandingSignUpForm.landingFirstName.value;
        var lName = document.LandingSignUpForm.landingLastName.value;
        var email = document.LandingSignUpForm.landingEmail.value;
        var state = document.LandingSignUpForm.landingState.value;
        var country = document.LandingSignUpForm.landingCountry.value;
       
        var validity = SoftJoinControl.validateSignUp(fName, lName, email, state, country, LandingSearch.selectedComList, isInternational);
        if (validity) {
            ajaxLoading('submitLandingSignUp','submit','start');
            var siteID = productSearchBrandIds[getCurrSite()];
            var eventContext = "LANDING_PAGE";
            var isLoggedIn = NotebookUtils.getSignInStatus();
            var topicID = 10;
            
            Pulte08.AjaxWebServices.PredefinedLandingService.SavePredefinedLandingForm(siteID,eventContext,isLoggedIn,topicID,LandingSearch.selectedComList,
                    fName,lName,email,state,isInternational,country,LandingSearch.callBackSubmitSuccess, LandingSearch.callBackSubmitFailed, fName);
        }
    },

    callBackSubmitSuccess: function(result, fName){
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        ajaxLoading('submitLandingSignUp','submit','stop');
        if (result != null && result[0] != null) {
            if (result[0].Title!='error'){
                if(YUD.hasClass(errorConsole, 'show')) YUD.replaceClass(errorConsole,'show','hide');
                var url = window.location.href;
                window.location.href = url.substr(0, url.lastIndexOf(".")) + "-thankyou.aspx?fname=" + fName;
            }
            else {
                YUD.replaceClass(errorConsole,'hide','show');
                displayError('landingFormError',error_string);
            }
        }
        else {
            YUD.replaceClass(errorConsole,'hide','show');
            displayError('landingFormError',error_string);
        }
    },

    callBackSubmitFailed: function(result, context){
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        YUD.replaceClass(errorConsole,'hide','show');
        displayError('landingFormError',error_string);
    },

    loadThankYou: function(){

        var body = document.getElementsByTagName('body')[0];
        var landingThankYou = document.getElementById('landingGreeting');
        if (body.className != 'template-Q' || !landingThankYou) return;
        var qs = location.search.substring(1);
        var qsObj = new Querystring(qs);
        if(qsObj.get('fname')){
            landingThankYou.innerHTML = "Thank you, " + qsObj.get('fname');
        }
    }

}


// NEW Predefined Landing Page function - for a landing page with an exclusive promotion introduced 2/12/09
var LandingSearchWithPromo = {
    searchResults: [],
    sortedResults: [], // capture the index of the searchResult
    resultLocations: [],
    priceSort: 0, // 0 is low to hight, 1 is high to low
    selectedCommunities: [],
    currentPage: 1,
    totalPages: 0,
    startIndex: 0,
    endIndex: 0,
    curPriceFilter: "",
    highestPrice: 0,
    selectedComList: [],
    userDetails: [],
    priceLabel: "",
    
    initializeResults: function(results){
        //populate country options
        var landingForm = document.getElementById("LandingSignUpForm");
        populateCountryOptions(landingForm); 
        if(!results || !results.markersArray || results.markersArray.length < 1) return;

        LandingSearchWithPromo.searchResults = results.markersArray.slice(0);
        LandingSearchWithPromo.resultLocations = results.locations.slice(0);
        LandingSearchWithPromo.priceLabel = LandingSearchWithPromo.searchResults[0].PriceLabel;

        //check if user details are returned for anon user
        if(results.userDetails){
            LandingSearchWithPromo.userDetails = results.userDetails;
        
            document.LandingSignUpForm.landingFirstName.value = LandingSearchWithPromo.userDetails.FirstName;
            document.LandingSignUpForm.landingLastName.value = LandingSearchWithPromo.userDetails.LastName;
            document.LandingSignUpForm.landingEmail.value = LandingSearchWithPromo.userDetails.Email;
           
            var profileCountry = LandingSearchWithPromo.userDetails.CountryCode;
            var profileState =  LandingSearchWithPromo.userDetails.StateAbbreviation;
            
            if(profileCountry != "" && profileCountry != "US"){
                document.LandingSignUpForm.landingCountry.value = profileCountry;
                toggleAddress("LandingSignUpForm", "international");
            } else {
                toggleAddress("LandingSignUpForm", "domestic");
                if (profileState) 
                     document.LandingSignUpForm.landingState.value = profileState;
            }
        }
        
        var regex = /PIDS/g;
        for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
            // get the index of the
            if(LandingSearchWithPromo.searchResults[i].price > LandingSearchWithPromo.highestPrice) LandingSearchWithPromo.highestPrice = LandingSearchWithPromo.searchResults[i].price;
            var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price,  communityName:LandingSearchWithPromo.searchResults[i].communityName};
            LandingSearchWithPromo.sortedResults.push(info);
            // update the image to use bigger image
            LandingSearchWithPromo.searchResults[i].propertyImage = LandingSearchWithPromo.searchResults[i].propertyImage.replace(regex, 'PIDI');
            // replace the point object
            LandingSearchWithPromo.searchResults[i].point = {latitude: LandingSearchWithPromo.searchResults[i].point.Latitude, longitude: LandingSearchWithPromo.searchResults[i].point.Longitude};
        }
        // set the highest price
        LandingSearchWithPromo.highestPrice += 1;
        LandingSearchWithPromo.resetPaging();
        // create sort field options: filter by Location
        var sortLoc = document.getElementById('sortLocation');
        var sortPrice = document.getElementById('sortPrice');
        var landingSubmit = document.getElementById('landingSubmit');
        if(sortLoc){
            var cnt = 1
            for(var i=0; i < LandingSearchWithPromo.resultLocations.length; i++){
                if (LandingSearchWithPromo.resultLocations[i].substr(0,1) != ",") {
                    sortLoc.options[cnt] = new Option(LandingSearchWithPromo.resultLocations[i],LandingSearchWithPromo.resultLocations[i]);
                    cnt += 1;
                }
            }
            YUE.addListener(sortLoc, "change", LandingSearchWithPromo.filterByLocation);
        } 
        var homeTypeFilter = document.getElementById("homeTypeFilter");
        if(homeTypeFilter) {
          for (var i=0; i < homeTypes.length; i++) {
            homeTypeFilter.options[i+1] = new Option(homeTypes[i], homeTypes[i]);
          }
        }
        // add event listener
        if(sortPrice) YUE.addListener(sortPrice, "change", LandingSearchWithPromo.sortByPrice);
        if(landingSubmit) YUE.addListener(landingSubmit, "click", LandingSearchWithPromo.submitSignUp);
        if(homeTypeFilter) YUE.addListener(homeTypeFilter, "change", LandingSearchWithPromo.filterByHomeType);
  
        customMarkerUtils.buildDynamicMarkers(LandingSearchWithPromo.searchResults);
		LandingSearchWithPromo.renderResults();
    },

    renderResults: function(){
        // 1) clear the pagination 2)clear the search content 3) build HTML 4) add event listener: highlight, checkbox render, checkbox click event
        var landingDiv = document.getElementById("LandingContent");
        if (!landingDiv) return;
        
        var isUserControl = (document.getElementById("flexibleLandingUserControl") != null); 
        var paging = YUD.getElementsByClassName("pagination", "", landingDiv);

        for(var i=0; i < paging.length; i++){
            paging[i].innerHTML = "";
        }

        //calculating the total number of pages
        this.totalPages = parseInt(LandingSearchWithPromo.sortedResults.length / 6);
        if(LandingSearchWithPromo.sortedResults.length % 6 > 0) this.totalPages++;

        var topPagination = '<a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,1);"><img id="btnFirst1" src="/images/Pulte/button-paginationFastBack.gif" alt="Pagination: Fast Back" /></a><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,2);"><img id="btnPrev1" src="/images/Pulte/button-paginationBack.gif" alt="Pagination: Back" /></a><em>';
        var bottomPagination = '<a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,1);"><img id="btnFirst2" src="/images/Pulte/button-paginationFastBack.gif" alt="Pagination: Fast Back" /></a><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,2);"><img id="btnPrev2" src="/images/Pulte/button-paginationBack.gif" alt="Pagination: Back" /></a><em>';

       if(LandingSearchWithPromo.totalPages > 1) {
            var firstPage;
            var lastPage;

            //set first page number value to be displayed
            if(LandingSearchWithPromo.currentPage > 6)
                firstPage = this.currentPage - 5;
            else
                firstPage = 1;

            //set last page number value to be displayed
            lastPage = firstPage + 9;

            if(lastPage > LandingSearchWithPromo.totalPages)
                lastPage = LandingSearchWithPromo.totalPages;

            //always display ten page numbers
            if((lastPage - firstPage) < 9 && lastPage > 10)
                firstPage -= (10 - (lastPage - firstPage + 1));

            for(var i=firstPage;i<=lastPage;i++)
            {
                if(i == LandingSearchWithPromo.currentPage){
                    topPagination += i + '&nbsp;';
                    bottomPagination += i + '&nbsp;';
                }
                else{
                    topPagination += '<a href="javascript:LandingSearchWithPromo.getPage('+ i +', 3);">'+ i +'</a>';
                    bottomPagination += '<a href="javascript:LandingSearchWithPromo.getPage('+ i +', 3);">'+ i +'</a>';
                }
            }
        }

        topPagination += '</em><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,4);"><img id="btnNext1" src="/images/Pulte/button-paginationForward.gif" alt="Pagination: Forward" /></a><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,5);"><img id="btnLast1" src="/images/Pulte/button-paginationFastForward.gif" alt="Pagination: Fast Forward" /></a>';
        bottomPagination += '</em><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,4);"><img id="btnNext2" src="/images/Pulte/button-paginationForward.gif" alt="Pagination: Forward" /></a><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,5);"><img id="btnLast2" src="/images/Pulte/button-paginationFastForward.gif" alt="Pagination: Fast Forward" /></a>';

        for(var i=0; i < paging.length; i++){
            if(i == 0)
                paging[i].innerHTML = topPagination;
            else
                paging[i].innerHTML = bottomPagination;
        }
        LandingSearchWithPromo.enablePagingControls();

        // build the HTML Content
        var resultDiv = document.getElementById("landingSearchResults");
        // remove any current listener
        var checkboxes = YUD.getElementsByClassName("styleInput", "input", resultDiv);
        for(var i=0; i < checkboxes.length; i++){
            NotebookUtils.removeCheckboxListeners(checkboxes[i]);
        }

        resultDiv.innerHTML = "";

        var finalOutput = '<ul>';
        var ref;
        var liClass = "";
        var fldChecked = "";
        for(var i=LandingSearchWithPromo.startIndex; i<LandingSearchWithPromo.endIndex; i++) {
            liClass = "";
            fldChecked = "";
            ref = LandingSearchWithPromo.sortedResults[i].index;
            if (LandingSearchWithPromo.searchResults[ref].comID > 0) {
                if(LandingSearchWithPromo.checkIfSelected(LandingSearchWithPromo.searchResults[ref].comID)){
                    liClass = ' class="selected"';
                    fldChecked = ' checked';
                }
                finalOutput += '<li' + liClass + '><div class="checkField"><input type="checkbox" id="fld' + LandingSearchWithPromo.searchResults[ref].comID + '" name="fld' + LandingSearchWithPromo.searchResults[ref].comID + '" value="' + LandingSearchWithPromo.searchResults[ref].comID  + '" class="styleInput"' + fldChecked + ' />';
                finalOutput += '<span class="label">' + LandingSearchWithPromo.searchResults[ref].communityName + ', ' + LandingSearchWithPromo.searchResults[ref].city + ", " + LandingSearchWithPromo.searchResults[ref].state + '<\/span><\/div>';
                if (isUserControl) {
                  finalOutput += '<span class="priceDetail">' + ((LandingSearchWithPromo.searchResults[ref].price < 1)?'TBD':LandingSearchWithPromo.priceLabel + ' $' + StringUtils.addCommas(LandingSearchWithPromo.searchResults[ref].price)) + '<\/span>';
                  finalOutput += '<span class="homeType">' + (LandingSearchWithPromo.searchResults[ref].planType);
                  if (LandingSearchWithPromo.searchResults[ref].HomesAvailable > 0) finalOutput += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/assets/images/icon-MoveIn.gif">';
                  finalOutput += '<\/span>';
                } else {
                  finalOutput += '<span class="priceDetail">' + ((LandingSearchWithPromo.searchResults[ref].price < 1)?'TBD':'Starting at $' + StringUtils.addCommas(LandingSearchWithPromo.searchResults[ref].price)) + '<\/span>';
                }
                finalOutput += '<img src="' + LandingSearchWithPromo.searchResults[ref].propertyImage + '" alt="" class="propertyImg" width="126" height="50" /><em>';
                finalOutput += '<div class="details">' + LandingSearchWithPromo.searchResults[ref].overview + '<br/>'
                if (window.location.href.indexOf('geotype') == -1) {
                    finalOutput += '<a href="javascript:gotocommunitypage(\''+LandingSearchWithPromo.searchResults[ref].linkURL+'\');">Click here to visit this neighborhood\'s home page.</a>';
                }
                finalOutput += '<\/em><\/div><div class="clear"><\/div><\/li>';
            }
        }
        finalOutput += '<\/ul>';
        resultDiv.innerHTML = finalOutput;
        // render checkbox style
        checkboxes = YUD.getElementsByClassName("styleInput", "input", resultDiv);
        for(var i=0; i < checkboxes.length; i++){
            CheckboxRadioStyle.addCheckboxStyle(checkboxes[i], i, false, false, true);
        }
        // enable highlights
        //LandingSearchWithPromo.setHighLights();

        //YUE.on(resultDiv.getElementsByTagName("li"), 'click', function(e) {
        //    var input = this.getElementsByTagName("input")[0];
        //    var target = YUE.getTarget(e);
         //   if (target === input || target.className == "customCheckbox") { return; }
        //    input.click();
         //   YUE.stopEvent(e);
        //});
    },

    checkIfSelected: function(comID){
        var isFound = false;
        if(LandingSearchWithPromo.selectedComList.length < 1) return isFound;
        for(var i=0; i < LandingSearchWithPromo.selectedComList.length; i++){
            if(LandingSearchWithPromo.selectedComList[i] == comID){
                isFound = true;
                break;
            }
        }
        return isFound;
    },

    filterByLocation:function(e){
        var target = YUE.getTarget(e);
        if(!target) return;
        var city="", state="", showAll= false;
        if(target.value == "") return;

        if(target.value.indexOf(",") > -1){
            var val = target.value.split(", ");
            if(val.length > 1){
                city = val[0]; state=val[1];
            }
        } else {
            if(target.value == "all") showAll=true;
        }

        if(!showAll && city == "" && state == "") return;

        LandingSearchWithPromo.sortedResults = [];
        if(showAll){
            for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
                // get the index of the
                var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price, communityName:LandingSearchWithPromo.searchResults[i].communityName}
                LandingSearchWithPromo.sortedResults.push(info);
            }
        } else if(city != "" && state != ""){

            for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
                if(LandingSearchWithPromo.searchResults[i].city == city && LandingSearchWithPromo.searchResults[i].state == state){
                    var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price, communityName:LandingSearchWithPromo.searchResults[i].communityName}
                    LandingSearchWithPromo.sortedResults.push(info);
                }
            }
        }
        //check current sorting 0 == low to high 1 = high to low "" = neutural
        if(LandingSearchWithPromo.curPriceFilter == "0"){
            LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceAsc);
        } else if (LandingSearchWithPromo.curPriceFilter == "1"){
            LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceDes);
        }
        LandingSearchWithPromo.resetPaging();
        LandingSearchWithPromo.renderResults();
    },

    filterByHomeType: function(e){
        var target = YUE.getTarget(e);
        if(!target) return;
        var type=target.value, showAll= false;
        if(type == "") return;
        if(type == "all") showAll=true;

        LandingSearchWithPromo.sortedResults = [];
        if(showAll){
            for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
                // get the index of the
                var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price, communityName:LandingSearchWithPromo.searchResults[i].communityName}
                LandingSearchWithPromo.sortedResults.push(info);
            }
        } else if(type != ""){
            for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
                if(LandingSearchWithPromo.searchResults[i].planType.indexOf(type) != -1 ){
                    var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price, communityName:LandingSearchWithPromo.searchResults[i].communityName}
                    LandingSearchWithPromo.sortedResults.push(info);
                }
            }
        }
        //check current sorting 0 == low to high 1 = high to low "" = neutural
        if(LandingSearchWithPromo.curPriceFilter == "0"){
            LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceAsc);
        } else if (LandingSearchWithPromo.curPriceFilter == "1"){
            LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceDes);
        }
        LandingSearchWithPromo.resetPaging();
        LandingSearchWithPromo.renderResults();    
    },
    
    sortByPrice: function(e){
        var target = YUE.getTarget(e);
        if(!target) return;
        if(target.value != LandingSearchWithPromo.curPriceFilter){
            LandingSearchWithPromo.curPriceFilter = target.value;
            if(target.value == "0"){
                LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceAsc);
            } else if(target.value == "1") {
                LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceDes);
            } else {
                LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortComName);
            }
            LandingSearchWithPromo.resetPaging();
            LandingSearchWithPromo.renderResults();
        }
    },

    resetPaging: function(){
        LandingSearchWithPromo.currentPage = 1;
        LandingSearchWithPromo.startIndex = 0;
        // more than 6 items, craete paging
        if(LandingSearchWithPromo.sortedResults.length >= 6){
            LandingSearchWithPromo.endIndex = 6;
        } else LandingSearchWithPromo.endIndex = LandingSearchWithPromo.sortedResults.length;
    },

    // enablePagingControls
    enablePagingControls: function () {
        var first = document.getElementById('btnFirst1');
        var prev = document.getElementById('btnPrev1');
        var next = document.getElementById('btnNext1');
        var last = document.getElementById('btnLast1');

        var firstBtm = document.getElementById('btnFirst2');
        var prevBtm = document.getElementById('btnPrev2');
        var nextBtm = document.getElementById('btnNext2');
        var lastBtm = document.getElementById('btnLast2');

       if(this.currentPage == 1)//this is the first page
       {
          first.style.display = 'none';
          firstBtm.style.display = 'none';

          prev.style.display = 'none';
          prevBtm.style.display = 'none';

          if(this.currentPage != this.totalPages)//checking if result has only 1 page
          {
              next.style.display = '';
              nextBtm.style.display = '';

              last.style.display = '';
              lastBtm.style.display = '';
          }
          else
          {
              next.style.display = 'none';
              nextBtm.style.display = 'none';

              last.style.display = 'none';
              lastBtm.style.display = 'none';
          }
       }
       else
       {
        if(this.currentPage == this.totalPages)//this is the last page
        {
            next.style.display = 'none';
            nextBtm.style.display = 'none';

            last.style.display = 'none';
            lastBtm.style.display = 'none';

            prev.style.display = '';
            prevBtm.style.display = '';

            first.style.display = '';
            firstBtm.style.display = '';
        }
        else
        {
            next.style.display = '';
            nextBtm.style.display = '';

            last.style.display = '';
            lastBtm.style.display = '';

            prev.style.display = '';
            prevBtm.style.display = '';

            first.style.display = '';
            firstBtm.style.display = '';
        }
       }
    },

    setHighLights: function(){
        var sfEls = document.getElementById("LandingSearchWithPromoResults").getElementsByTagName("LI");
        if(isIE && sfEls){
            for (var i=0; i<sfEls.length; i++) {
                sfEls[i].onmouseover=function() {
                    YUD.addClass(this, "sfhover");
                }
                sfEls[i].onmouseout=function() {
                    YUD.removeClass(this, "sfhover");
                }
            }
        }
    },

    getPage: function(pageNumber,pType){
        // update pagination info: (2) * 6 -  6
        // update search content
        // add event listener
        var pageType;
        switch(pType)
        {
            case 1: pageType = 'first';
                    this.currentPage = 1;
                break;
            case 2: pageType = 'prev';
                    this.currentPage--;
                break;
            case 3: pageType = 'page';
                    this.currentPage = pageNumber;
                break;
            case 4: pageType = 'next';
                    this.currentPage++;
                break;
            case 5: pageType = 'last';
                    this.currentPage = this.totalPages;
                break;
        }
        this.endIndex = this.currentPage * 6;
        this.startIndex = this.endIndex - 6;
        if(this.endIndex > this.sortedResults.length) this.endIndex = this.sortedResults.length;
        this.renderResults();
    },

    // sort by price then community name in ascending order (price = 0 should be displayed at the bottom of the page)
    arraySortPriceAsc: function(a,b){
        var aVal = (a.price == 0)?LandingSearchWithPromo.highestPrice:a.price;
        var bVal = (b.price == 0)?LandingSearchWithPromo.highestPrice:b.price;
        if(aVal == bVal){
            if(a.communityName == b.communityName){
                return 0;
            }
            return (a.communityName < b.communityName) ? -1 : 1;
        }
        return (aVal - bVal);
    },

    // sort by price then community Name in descending order
    arraySortPriceDes: function(a,b){
        if(a.price == b.price){
            if(a.communityName == b.communityName){
                return 0;
            }
            return (a.communityName < b.communityName) ? -1 : 1;
        }
        return (b.price - a.price);
    },

    // sort by community name
    arraySortComName: function(a, b){
        if(a.communityName == b.communityName) return 0;
        return (a.communityName < b.communityName)? -1 : 1;
    },

    updateCommunityList: function(target){
        if(!target) return;
        var isFound = false;
        var foundIndex = -1;

        if(LandingSearchWithPromo.selectedComList.length > 0){
            for(var i=0; i < LandingSearchWithPromo.selectedComList.length; i++){
                if(LandingSearchWithPromo.selectedComList[i] == target.value){
                    isFound = true;
                    foundIndex = i;
                    break;
                }
            }
        }
        // adding
        var li = target.parentNode.parentNode;
        if(target.checked){
             // if adding but the value does not exist, add it to the list
            if(!isFound) LandingSearchWithPromo.selectedComList.push(target.value);
            if(!YUD.hasClass(li, "selected")) YUD.addClass(li, "selected");
        } else {
            // if removing and is in the list, remove it
            if(isFound) LandingSearchWithPromo.selectedComList.splice(foundIndex, 1);
            if(YUD.hasClass(li, "selected")) YUD.removeClass(li, "selected");
        }
    },

    submitSignUp: function(){
        var isInternational = false;
        var intl = YUD.getElementsByClassName("international", "div", "LandingSignUpForm")[0];
        if(!YUD.hasClass(intl, "hide")){
            isInternational = true;
        }
        var fName = document.LandingSignUpForm.landingFirstName.value;
        var lName = document.LandingSignUpForm.landingLastName.value;
        var email = document.LandingSignUpForm.landingEmail.value;
        var state = document.LandingSignUpForm.landingState.value;
        var country = document.LandingSignUpForm.landingCountry.value;
       
        var validity = SoftJoinControl.validateSignUp(fName, lName, email, state, country, LandingSearchWithPromo.selectedComList, isInternational);
        if (validity) {
            ajaxLoading('submitLandingSignUp','submit','start');
            var siteID = productSearchBrandIds[getCurrSite()];
            var eventContext = "LANDING_PAGE";
            var isLoggedIn = NotebookUtils.getSignInStatus();
            var topicID = 10;
            
            Pulte08.AjaxWebServices.PredefinedLandingService.SavePredefinedLandingForm(siteID,eventContext,isLoggedIn,topicID,LandingSearchWithPromo.selectedComList,
                    fName,lName,email,state,isInternational,country,LandingSearchWithPromo.callBackSubmitSuccess, LandingSearchWithPromo.callBackSubmitFailed, fName);
        }
    },

    callBackSubmitSuccess: function(result, fName){
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        ajaxLoading('submitLandingSignUp','submit','stop');
        if (result != null && result[0] != null) {
            if (result[0].Title!='error'){
                if(YUD.hasClass(errorConsole, 'show')) YUD.replaceClass(errorConsole,'show','hide');
                var url = window.location.href;
                window.location.href = url.substr(0, url.lastIndexOf(".")) + "-thankyou.aspx?fname=" + fName;
            }
            else {
                YUD.replaceClass(errorConsole,'hide','show');
                displayError('landingFormError',error_string);
            }
        }
        else {
            YUD.replaceClass(errorConsole,'hide','show');
            displayError('landingFormError',error_string);
        }
    },

    callBackSubmitFailed: function(result, context){
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        YUD.replaceClass(errorConsole,'hide','show');
        displayError('landingFormError',error_string);
    },

    loadThankYou: function(){

        var body = document.getElementsByTagName('body')[0];
        var landingThankYou = document.getElementById('landingGreeting');
        if (body.className != 'template-Q' || !landingThankYou) return;
        var qs = location.search.substring(1);
        var qsObj = new Querystring(qs);
        if(qsObj.get('fname')){
            landingThankYou.innerHTML = "Thank you, " + qsObj.get('fname');
        }
    }

}


// NEW Predefined Landing Page function - for a landing page with an exclusive promotion introduced 2/12/09
var LandingSearchWithPromo = {
    searchResults: [],
    sortedResults: [], // capture the index of the searchResult
    resultLocations: [],
    priceSort: 0, // 0 is low to hight, 1 is high to low
    selectedCommunities: [],
    currentPage: 1,
    totalPages: 0,
    startIndex: 0,
    endIndex: 0,
    curPriceFilter: "",
    highestPrice: 0,
    selectedComList: [],
    userDetails: [],
    priceLabel: "",
    
    initializeResults: function(results){
        //populate country options
        var landingForm = document.getElementById("LandingSignUpForm");
        populateCountryOptions(landingForm); 
        if(!results || !results.markersArray || results.markersArray.length < 1) return;

        LandingSearchWithPromo.searchResults = results.markersArray.slice(0);
        LandingSearchWithPromo.resultLocations = results.locations.slice(0);
        LandingSearchWithPromo.priceLabel = LandingSearchWithPromo.searchResults[0].PriceLabel;

        //check if user details are returned for anon user
        if(results.userDetails){
            LandingSearchWithPromo.userDetails = results.userDetails;
        
            document.LandingSignUpForm.landingFirstName.value = LandingSearchWithPromo.userDetails.FirstName;
            document.LandingSignUpForm.landingLastName.value = LandingSearchWithPromo.userDetails.LastName;
            document.LandingSignUpForm.landingEmail.value = LandingSearchWithPromo.userDetails.Email;
           
            var profileCountry = LandingSearchWithPromo.userDetails.CountryCode;
            var profileState =  LandingSearchWithPromo.userDetails.StateAbbreviation;
            
            if(profileCountry != "" && profileCountry != "US"){
                document.LandingSignUpForm.landingCountry.value = profileCountry;
                toggleAddress("LandingSignUpForm", "international");
            } else {
                toggleAddress("LandingSignUpForm", "domestic");
                if (profileState) 
                     document.LandingSignUpForm.landingState.value = profileState;
            }
        }
        
        var regex = /PIDS/g;
        for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
            // get the index of the
            if(LandingSearchWithPromo.searchResults[i].price > LandingSearchWithPromo.highestPrice) LandingSearchWithPromo.highestPrice = LandingSearchWithPromo.searchResults[i].price;
            var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price,  communityName:LandingSearchWithPromo.searchResults[i].communityName};
            LandingSearchWithPromo.sortedResults.push(info);
            // update the image to use bigger image
            LandingSearchWithPromo.searchResults[i].propertyImage = LandingSearchWithPromo.searchResults[i].propertyImage.replace(regex, 'PIDI');
            // replace the point object
            LandingSearchWithPromo.searchResults[i].point = {latitude: LandingSearchWithPromo.searchResults[i].point.Latitude, longitude: LandingSearchWithPromo.searchResults[i].point.Longitude};
        }
        // set the highest price
        LandingSearchWithPromo.highestPrice += 1;
        LandingSearchWithPromo.resetPaging();
        // create sort field options: filter by Location
        var sortLoc = document.getElementById('sortLocation');
        var sortPrice = document.getElementById('sortPrice');
        var landingSubmit = document.getElementById('landingSubmit');
        if(sortLoc){
            var cnt = 1
            for(var i=0; i < LandingSearchWithPromo.resultLocations.length; i++){
                sortLoc.options[cnt] = new Option(LandingSearchWithPromo.resultLocations[i],LandingSearchWithPromo.resultLocations[i]);
                cnt += 1;
            }
            YUE.addListener(sortLoc, "change", LandingSearchWithPromo.filterByLocation);
        } 
        var homeTypeFilter = document.getElementById("homeTypeFilter");
        if(homeTypeFilter) {
          for (var i=0; i < homeTypes.length; i++) {
            homeTypeFilter.options[i+1] = new Option(homeTypes[i], homeTypes[i]);
          }
        }
        // add event listener
        if(sortPrice) YUE.addListener(sortPrice, "change", LandingSearchWithPromo.sortByPrice);
        if(landingSubmit) YUE.addListener(landingSubmit, "click", LandingSearchWithPromo.submitSignUp);
        if(homeTypeFilter) YUE.addListener(homeTypeFilter, "change", LandingSearchWithPromo.filterByHomeType);
  
        customMarkerUtils.buildDynamicMarkers(LandingSearchWithPromo.searchResults);
		LandingSearchWithPromo.renderResults();
    },

    renderResults: function(){
        // 1) clear the pagination 2)clear the search content 3) build HTML 4) add event listener: highlight, checkbox render, checkbox click event
        var landingDiv = document.getElementById("LandingContent");
        if (!landingDiv) return;
        
        var isUserControl = (document.getElementById("flexibleLandingUserControl") != null); 
        var paging = YUD.getElementsByClassName("pagination", "", landingDiv);

        for(var i=0; i < paging.length; i++){
            paging[i].innerHTML = "";
        }

        //calculating the total number of pages
        this.totalPages = parseInt(LandingSearchWithPromo.sortedResults.length / 6);
        if(LandingSearchWithPromo.sortedResults.length % 6 > 0) this.totalPages++;

        var topPagination = '<a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,1);"><img id="btnFirst1" src="/images/Pulte/button-paginationFastBack.gif" alt="Pagination: Fast Back" /></a><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,2);"><img id="btnPrev1" src="/images/Pulte/button-paginationBack.gif" alt="Pagination: Back" /></a><em>';
        var bottomPagination = '<a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,1);"><img id="btnFirst2" src="/images/Pulte/button-paginationFastBack.gif" alt="Pagination: Fast Back" /></a><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,2);"><img id="btnPrev2" src="/images/Pulte/button-paginationBack.gif" alt="Pagination: Back" /></a><em>';

       if(LandingSearchWithPromo.totalPages > 1) {
            var firstPage;
            var lastPage;

            //set first page number value to be displayed
            if(LandingSearchWithPromo.currentPage > 6)
                firstPage = this.currentPage - 5;
            else
                firstPage = 1;

            //set last page number value to be displayed
            lastPage = firstPage + 9;

            if(lastPage > LandingSearchWithPromo.totalPages)
                lastPage = LandingSearchWithPromo.totalPages;

            //always display ten page numbers
            if((lastPage - firstPage) < 9 && lastPage > 10)
                firstPage -= (10 - (lastPage - firstPage + 1));

            for(var i=firstPage;i<=lastPage;i++)
            {
                if(i == LandingSearchWithPromo.currentPage){
                    topPagination += i + '&nbsp;';
                    bottomPagination += i + '&nbsp;';
                }
                else{
                    topPagination += '<a href="javascript:LandingSearchWithPromo.getPage('+ i +', 3);">'+ i +'</a>';
                    bottomPagination += '<a href="javascript:LandingSearchWithPromo.getPage('+ i +', 3);">'+ i +'</a>';
                }
            }
        }

        topPagination += '</em><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,4);"><img id="btnNext1" src="/images/Pulte/button-paginationForward.gif" alt="Pagination: Forward" /></a><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,5);"><img id="btnLast1" src="/images/Pulte/button-paginationFastForward.gif" alt="Pagination: Fast Forward" /></a>';
        bottomPagination += '</em><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,4);"><img id="btnNext2" src="/images/Pulte/button-paginationForward.gif" alt="Pagination: Forward" /></a><a href="javascript:LandingSearchWithPromo.getPage(LandingSearchWithPromo.currentPage,5);"><img id="btnLast2" src="/images/Pulte/button-paginationFastForward.gif" alt="Pagination: Fast Forward" /></a>';

        for(var i=0; i < paging.length; i++){
            if(i == 0)
                paging[i].innerHTML = topPagination;
            else
                paging[i].innerHTML = bottomPagination;
        }
        LandingSearchWithPromo.enablePagingControls();

        // build the HTML Content
        var resultDiv = document.getElementById("landingSearchResults");
        // remove any current listener
        var checkboxes = YUD.getElementsByClassName("styleInput", "input", resultDiv);
        for(var i=0; i < checkboxes.length; i++){
            NotebookUtils.removeCheckboxListeners(checkboxes[i]);
        }

        resultDiv.innerHTML = "";

        var finalOutput = '<ul>';
        var ref;
        var liClass = "";
        var fldChecked = "";
        for(var i=LandingSearchWithPromo.startIndex; i<LandingSearchWithPromo.endIndex; i++) {
            liClass = "";
            fldChecked = "";
            ref = LandingSearchWithPromo.sortedResults[i].index;
            if(LandingSearchWithPromo.checkIfSelected(LandingSearchWithPromo.searchResults[ref].comID)){
                liClass = ' class="selected"';
                fldChecked = ' checked';
            }
            finalOutput += '<li' + liClass + '><div class="checkField"><input type="checkbox" id="fld' + LandingSearchWithPromo.searchResults[ref].comID + '" name="fld' + LandingSearchWithPromo.searchResults[ref].comID + '" value="' + LandingSearchWithPromo.searchResults[ref].comID  + '" class="styleInput"' + fldChecked + ' />';
            finalOutput += '<span class="label">' + LandingSearchWithPromo.searchResults[ref].communityName + ', ' + LandingSearchWithPromo.searchResults[ref].city + ", " + LandingSearchWithPromo.searchResults[ref].state + '<\/span><\/div>';
            if (isUserControl) {
              finalOutput += '<span class="priceDetail">' + ((LandingSearchWithPromo.searchResults[ref].price < 1)?'TBD':LandingSearchWithPromo.priceLabel + ' $' + StringUtils.addCommas(LandingSearchWithPromo.searchResults[ref].price)) + '<\/span>';
              finalOutput += '<span class="homeType">' + (LandingSearchWithPromo.searchResults[ref].planType);
              if (LandingSearchWithPromo.searchResults[ref].HomesAvailable > 0) finalOutput += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/assets/images/icon-MoveIn.gif">';
              finalOutput += '<\/span>';
            } else {
              finalOutput += '<span class="priceDetail">' + ((LandingSearchWithPromo.searchResults[ref].price < 1)?'TBD':'Starting at $' + StringUtils.addCommas(LandingSearchWithPromo.searchResults[ref].price)) + '<\/span>';
            }
            finalOutput += '<img src="' + LandingSearchWithPromo.searchResults[ref].propertyImage + '" alt="" class="propertyImg" width="126" height="50" /><em>';
            finalOutput += '<div class="details">' + LandingSearchWithPromo.searchResults[ref].overview + '<br/>'
            if (window.location.href.indexOf('geotype') == -1) {
                finalOutput += '<a href="javascript:gotocommunitypage(\''+LandingSearchWithPromo.searchResults[ref].linkURL+'\');">Click here to visit this neighborhood\'s home page.</a>';
            }
            finalOutput += '<\/em><\/div><div class="clear"><\/div><\/li>';
        }
        finalOutput += '<\/ul>';
        resultDiv.innerHTML = finalOutput;
        // render checkbox style
        checkboxes = YUD.getElementsByClassName("styleInput", "input", resultDiv);
        for(var i=0; i < checkboxes.length; i++){
            CheckboxRadioStyle.addCheckboxStyle(checkboxes[i], i, false, false, true);
        }
        // enable highlights
        //LandingSearchWithPromo.setHighLights();

        //YUE.on(resultDiv.getElementsByTagName("li"), 'click', function(e) {
        //    var input = this.getElementsByTagName("input")[0];
        //    var target = YUE.getTarget(e);
         //   if (target === input || target.className == "customCheckbox") { return; }
        //    input.click();
         //   YUE.stopEvent(e);
        //});
    },

    checkIfSelected: function(comID){
        var isFound = false;
        if(LandingSearchWithPromo.selectedComList.length < 1) return isFound;
        for(var i=0; i < LandingSearchWithPromo.selectedComList.length; i++){
            if(LandingSearchWithPromo.selectedComList[i] == comID){
                isFound = true;
                break;
            }
        }
        return isFound;
    },

    filterByLocation:function(e){
        var target = YUE.getTarget(e);
        if(!target) return;
        var city="", state="", showAll= false;
        if(target.value == "") return;

        if(target.value.indexOf(",") > -1){
            var val = target.value.split(", ");
            if(val.length > 1){
                city = val[0]; state=val[1];
            }
        } else {
            if(target.value == "all") showAll=true;
        }

        if(!showAll && city == "" && state == "") return;

        LandingSearchWithPromo.sortedResults = [];
        if(showAll){
            for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
                // get the index of the
                var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price, communityName:LandingSearchWithPromo.searchResults[i].communityName}
                LandingSearchWithPromo.sortedResults.push(info);
            }
        } else if(city != "" && state != ""){

            for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
                if(LandingSearchWithPromo.searchResults[i].city == city && LandingSearchWithPromo.searchResults[i].state == state){
                    var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price, communityName:LandingSearchWithPromo.searchResults[i].communityName}
                    LandingSearchWithPromo.sortedResults.push(info);
                }
            }
        }
        //check current sorting 0 == low to high 1 = high to low "" = neutural
        if(LandingSearchWithPromo.curPriceFilter == "0"){
            LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceAsc);
        } else if (LandingSearchWithPromo.curPriceFilter == "1"){
            LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceDes);
        }
        LandingSearchWithPromo.resetPaging();
        LandingSearchWithPromo.renderResults();
    },

    filterByHomeType: function(e){
        var target = YUE.getTarget(e);
        if(!target) return;
        var type=target.value, showAll= false;
        if(type == "") return;
        if(type == "all") showAll=true;

        LandingSearchWithPromo.sortedResults = [];
        if(showAll){
            for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
                // get the index of the
                var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price, communityName:LandingSearchWithPromo.searchResults[i].communityName}
                LandingSearchWithPromo.sortedResults.push(info);
            }
        } else if(type != ""){
            for(var i=0; i < LandingSearchWithPromo.searchResults.length; i++){
                if(LandingSearchWithPromo.searchResults[i].planType.indexOf(type) != -1 ){
                    var info = {index:i, price:LandingSearchWithPromo.searchResults[i].price, communityName:LandingSearchWithPromo.searchResults[i].communityName}
                    LandingSearchWithPromo.sortedResults.push(info);
                }
            }
        }
        //check current sorting 0 == low to high 1 = high to low "" = neutural
        if(LandingSearchWithPromo.curPriceFilter == "0"){
            LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceAsc);
        } else if (LandingSearchWithPromo.curPriceFilter == "1"){
            LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceDes);
        }
        LandingSearchWithPromo.resetPaging();
        LandingSearchWithPromo.renderResults();    
    },
    
    sortByPrice: function(e){
        var target = YUE.getTarget(e);
        if(!target) return;
        if(target.value != LandingSearchWithPromo.curPriceFilter){
            LandingSearchWithPromo.curPriceFilter = target.value;
            if(target.value == "0"){
                LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceAsc);
            } else if(target.value == "1") {
                LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortPriceDes);
            } else {
                LandingSearchWithPromo.sortedResults.sort(LandingSearchWithPromo.arraySortComName);
            }
            LandingSearchWithPromo.resetPaging();
            LandingSearchWithPromo.renderResults();
        }
    },

    resetPaging: function(){
        LandingSearchWithPromo.currentPage = 1;
        LandingSearchWithPromo.startIndex = 0;
        // more than 6 items, craete paging
        if(LandingSearchWithPromo.sortedResults.length >= 6){
            LandingSearchWithPromo.endIndex = 6;
        } else LandingSearchWithPromo.endIndex = LandingSearchWithPromo.sortedResults.length;
    },

    // enablePagingControls
    enablePagingControls: function () {
        var first = document.getElementById('btnFirst1');
        var prev = document.getElementById('btnPrev1');
        var next = document.getElementById('btnNext1');
        var last = document.getElementById('btnLast1');

        var firstBtm = document.getElementById('btnFirst2');
        var prevBtm = document.getElementById('btnPrev2');
        var nextBtm = document.getElementById('btnNext2');
        var lastBtm = document.getElementById('btnLast2');

       if(this.currentPage == 1)//this is the first page
       {
          first.style.display = 'none';
          firstBtm.style.display = 'none';

          prev.style.display = 'none';
          prevBtm.style.display = 'none';

          if(this.currentPage != this.totalPages)//checking if result has only 1 page
          {
              next.style.display = '';
              nextBtm.style.display = '';

              last.style.display = '';
              lastBtm.style.display = '';
          }
          else
          {
              next.style.display = 'none';
              nextBtm.style.display = 'none';

              last.style.display = 'none';
              lastBtm.style.display = 'none';
          }
       }
       else
       {
        if(this.currentPage == this.totalPages)//this is the last page
        {
            next.style.display = 'none';
            nextBtm.style.display = 'none';

            last.style.display = 'none';
            lastBtm.style.display = 'none';

            prev.style.display = '';
            prevBtm.style.display = '';

            first.style.display = '';
            firstBtm.style.display = '';
        }
        else
        {
            next.style.display = '';
            nextBtm.style.display = '';

            last.style.display = '';
            lastBtm.style.display = '';

            prev.style.display = '';
            prevBtm.style.display = '';

            first.style.display = '';
            firstBtm.style.display = '';
        }
       }
    },

    setHighLights: function(){
        var sfEls = document.getElementById("LandingSearchWithPromoResults").getElementsByTagName("LI");
        if(isIE && sfEls){
            for (var i=0; i<sfEls.length; i++) {
                sfEls[i].onmouseover=function() {
                    YUD.addClass(this, "sfhover");
                }
                sfEls[i].onmouseout=function() {
                    YUD.removeClass(this, "sfhover");
                }
            }
        }
    },

    getPage: function(pageNumber,pType){
        // update pagination info: (2) * 6 -  6
        // update search content
        // add event listener
        var pageType;
        switch(pType)
        {
            case 1: pageType = 'first';
                    this.currentPage = 1;
                break;
            case 2: pageType = 'prev';
                    this.currentPage--;
                break;
            case 3: pageType = 'page';
                    this.currentPage = pageNumber;
                break;
            case 4: pageType = 'next';
                    this.currentPage++;
                break;
            case 5: pageType = 'last';
                    this.currentPage = this.totalPages;
                break;
        }
        this.endIndex = this.currentPage * 6;
        this.startIndex = this.endIndex - 6;
        if(this.endIndex > this.sortedResults.length) this.endIndex = this.sortedResults.length;
        this.renderResults();
    },

    // sort by price then community name in ascending order (price = 0 should be displayed at the bottom of the page)
    arraySortPriceAsc: function(a,b){
        var aVal = (a.price == 0)?LandingSearchWithPromo.highestPrice:a.price;
        var bVal = (b.price == 0)?LandingSearchWithPromo.highestPrice:b.price;
        if(aVal == bVal){
            if(a.communityName == b.communityName){
                return 0;
            }
            return (a.communityName < b.communityName) ? -1 : 1;
        }
        return (aVal - bVal);
    },

    // sort by price then community Name in descending order
    arraySortPriceDes: function(a,b){
        if(a.price == b.price){
            if(a.communityName == b.communityName){
                return 0;
            }
            return (a.communityName < b.communityName) ? -1 : 1;
        }
        return (b.price - a.price);
    },

    // sort by community name
    arraySortComName: function(a, b){
        if(a.communityName == b.communityName) return 0;
        return (a.communityName < b.communityName)? -1 : 1;
    },

    updateCommunityList: function(target){
        if(!target) return;
        var isFound = false;
        var foundIndex = -1;

        if(LandingSearchWithPromo.selectedComList.length > 0){
            for(var i=0; i < LandingSearchWithPromo.selectedComList.length; i++){
                if(LandingSearchWithPromo.selectedComList[i] == target.value){
                    isFound = true;
                    foundIndex = i;
                    break;
                }
            }
        }
        // adding
        var li = target.parentNode.parentNode;
        if(target.checked){
             // if adding but the value does not exist, add it to the list
            if(!isFound) LandingSearchWithPromo.selectedComList.push(target.value);
            if(!YUD.hasClass(li, "selected")) YUD.addClass(li, "selected");
        } else {
            // if removing and is in the list, remove it
            if(isFound) LandingSearchWithPromo.selectedComList.splice(foundIndex, 1);
            if(YUD.hasClass(li, "selected")) YUD.removeClass(li, "selected");
        }
    },

    submitSignUp: function(){

        var isInternational = false;
        var intl = YUD.getElementsByClassName("international", "div", "LandingSignUpForm")[0];
        if(!YUD.hasClass(intl, "hide")){
            isInternational = true;
        }
        var fName = document.LandingSignUpForm.landingFirstName.value;
        var lName = document.LandingSignUpForm.landingLastName.value;
        var email = document.LandingSignUpForm.landingEmail.value;
        var state = document.LandingSignUpForm.landingState.value;
        var country = document.LandingSignUpForm.landingCountry.value;
       
        var validity = SoftJoinControl.validateSignUp(fName, lName, email, state, country, LandingSearchWithPromo.selectedComList, isInternational);
        if (validity) {
            ajaxLoading('submitLandingSignUp','submit','start');
            var siteID = productSearchBrandIds[getCurrSite()];
            var eventContext = "LANDING_PAGE";
            var isLoggedIn = NotebookUtils.getSignInStatus();
            var topicID = 10;
            
            if (typeof(pageLeadSourceCode)!='undefined' && (pageLeadSourceCode != null)) {
                
                Pulte08.AjaxWebServices.PredefinedLandingService.SavePredefinedLandingFormWithLeadSourceCode(siteID,eventContext,isLoggedIn,topicID,LandingSearchWithPromo.selectedComList,
                    fName,lName,email,state,isInternational,country, pageLeadSourceCode,
                    LandingSearchWithPromo.callBackSubmitSuccess, LandingSearchWithPromo.callBackSubmitFailed, fName);
            } else {
                Pulte08.AjaxWebServices.PredefinedLandingService.SavePredefinedLandingForm(siteID,eventContext,isLoggedIn,topicID,LandingSearchWithPromo.selectedComList,
                    fName,lName,email,state,isInternational,country, 
                    LandingSearchWithPromo.callBackSubmitSuccess, LandingSearchWithPromo.callBackSubmitFailed, fName);
            }
        }
    },

    callBackSubmitSuccess: function(result, fName){
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        ajaxLoading('submitLandingSignUp','submit','stop');
        if (result != null && result[0] != null) {
            if (result[0].Title!='error'){
                if(YUD.hasClass(errorConsole, 'show')) YUD.replaceClass(errorConsole,'show','hide');
                var url = window.location.href;
                window.location.href = url.substr(0, url.lastIndexOf(".")) + "-thankyou.aspx?fname=" + fName;
            }
            else {
                YUD.replaceClass(errorConsole,'hide','show');
                displayError('landingFormError',error_string);
            }
        }
        else {
            YUD.replaceClass(errorConsole,'hide','show');
            displayError('landingFormError',error_string);
        }
    },

    callBackSubmitFailed: function(result, context){
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        YUD.replaceClass(errorConsole,'hide','show');
        displayError('landingFormError',error_string);
    },

    loadThankYou: function(){

        var body = document.getElementsByTagName('body')[0];
        var landingThankYou = document.getElementById('landingGreeting');
        if (body.className != 'template-Q' || !landingThankYou) return;
        var qs = location.search.substring(1);
        var qsObj = new Querystring(qs);
        if(qsObj.get('fname')){
            landingThankYou.innerHTML = "Thank you, " + qsObj.get('fname');
        }
    }

}

// assume the form name is always "LandingSignUpForm"
var SoftJoinControl = {
    // populate user data if sign in
    populateSignUpForm: function(){
        var profileCountry = ((document.getElementById('profileCountry'))?document.getElementById('profileCountry').value : "");
        if (document.getElementById('profileFirstName')) document.LandingSignUpForm.landingFirstName.value = document.getElementById('profileFirstName').value;
		if (document.getElementById('profileLastName'))  document.LandingSignUpForm.landingLastName.value = document.getElementById('profileLastName').value;
        if (document.getElementById('profileUserEmail')) document.LandingSignUpForm.landingEmail.value = document.getElementById('profileUserEmail').value;
        if (document.getElementById('domestic') != null) { // domestic vs. international address is a part of the form
            if(profileCountry != "" && profileCountry != "US"){
                document.LandingSignUpForm.landingCountry.value = profileCountry;
                toggleAddress("LandingSignUpForm", "international");
            } else {
                toggleAddress("LandingSignUpForm", "domestic");
                if (document.getElementById('profileState')) document.LandingSignUpForm.landingState.value = document.getElementById('profileState').value;
            }
        } else {
            if (document.getElementById('profileState')) document.LandingSignUpForm.landingState.value = document.getElementById('profileState').value;
        }
    },

    resetSignUpForm: function(){
        document.LandingSignUpForm.landingFirstName.value = "";
        document.LandingSignUpForm.landingLastName.value = "";
        document.LandingSignUpForm.landingEmail.value = "";
        if (document.getElementById('domestic') != null) {
            document.LandingSignUpForm.landingCountry.value = "";
        }
        document.LandingSignUpForm.landingState.value = "";
    },

    validateSignUp: function(fName, lName, email, state, country, comIDs, isInternational){
        document.getElementById("landingFormError").innerHTML="";
        var validity = true;
        var error_string = "";
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];

        if(comIDs.length < 1){
            validity = false;
            error_string += '<li>Please select one or more Neighborhood of Interest</li>';
        }
        if (fName == "") {
            validity = false;
            YUD.addClass(document.LandingSignUpForm.landingFirstName,'error');
            error_string += '<li>Please enter a valid FIRST NAME</li>';
        } else {YUD.removeClass(document.LandingSignUpForm.landingFirstName,'error');}

        if (lName.length < 2) { // must be at least two characters
            validity = false;
            YUD.addClass(document.LandingSignUpForm.landingLastName,'error');
            error_string += '<li>Please enter a valid LAST NAME</li>';
        } else {YUD.removeClass(document.LandingSignUpForm.landingLastName,'error');}

        if(isInternational){
            if(country == ""){
                validity = false;
                YUD.addClass(document.LandingSignUpForm.landingCountry,'error');
                error_string += '<li>Please select a COUNTRY</li>';
            } else {YUD.removeClass(document.LandingSignUpForm.landingCountry,'error');}
        } else {
            if(state == ""){
                validity = false;
                YUD.addClass(document.LandingSignUpForm.landingState,'error');
                error_string += '<li>Please select a STATE</li>';
            } else {YUD.removeClass(document.LandingSignUpForm.landingState,'error');}
        }

        if (!check_email(email)) {
            validity = false;
            YUD.addClass(document.LandingSignUpForm.landingEmail,'error');
            error_string += '<li>Please enter a valid EMAIL</li>';
        } else {YUD.removeClass(document.LandingSignUpForm.landingEmail,'error');}

        if (!validity) {
            // display error
            YUD.replaceClass(errorConsole,'hide','show');
            displayError('landingFormError',error_string);
        }
        return validity;
    },
    
    validateReferral: function(fName, lName, email, friendsName, comIDs, state, captcha ){
        document.getElementById("landingFormError").innerHTML="";
        var validity = true;
        var error_string = "";
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];

        if (fName == "") {
            validity = false;
            YUD.addClass(document.LandingSignUpForm.landingFirstName,'error');
            error_string += '<li>Please enter a valid FIRST NAME</li>';
        } else {YUD.removeClass(document.LandingSignUpForm.landingFirstName,'error');}

        if (lName.length < 2) { // must be at least two characters
            validity = false;
            YUD.addClass(document.LandingSignUpForm.landingLastName,'error');
            error_string += '<li>Please enter a valid LAST NAME</li>';
        } else {YUD.removeClass(document.LandingSignUpForm.landingLastName,'error');}

        if(comIDs.length < 1){
            validity = false;
            error_string += '<li>Please select COMMUNITY</li>';
        }
        
        if (friendsName == "") {
            validity = false;
            YUD.addClass(document.LandingSignUpForm.landingDearFirstName,'error');
            error_string += '<li>Please enter a valid FRIEND\'S NAME</li>';
        } else {YUD.removeClass(document.LandingSignUpForm.landingDearFirstName,'error');}
        
        if (!check_email(email)) {
            validity = false;
            YUD.addClass(document.LandingSignUpForm.landingEmail,'error');
            error_string += '<li>Please enter a valid EMAIL</li>';
        } else {YUD.removeClass(document.LandingSignUpForm.landingEmail,'error');}
        
        if(state == ""){
            validity = false;
            YUD.addClass(document.LandingSignUpForm.landingState,'error');
            error_string += '<li>Please enter a valid FRIEND\'S STATE</li>';
        } else {YUD.removeClass(document.LandingSignUpForm.landingState,'error');}
        
        if(captcha == ""){
            validity = false;
            error_string += '<li>Please insert the security key from the image into the Textbox that is provided.</li>';
        } 
        
        if (!validity) {
            // display error
            YUD.replaceClass(errorConsole,'hide','show');
            displayError('landingFormError',error_string);
        }
        return validity;
    },
    validateReferral2: function(fName, lName, email, friendsName, comIDs, state ){
        document.getElementById("landingFormError2").innerHTML="";
        var validity = true;
        var error_string = "";
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm2)[0];

        if (fName == "") {
            validity = false;
            YUD.addClass(document.LandingSignUpForm2.landingFirstName,'error');
            error_string += '<li>Please enter a valid FIRST NAME</li>';
        } else {YUD.removeClass(document.LandingSignUpForm2.landingFirstName,'error');}

        if (lName.length < 2) { // must be at least two characters
            validity = false;
            YUD.addClass(document.LandingSignUpForm2.landingLastName,'error');
            error_string += '<li>Please enter a valid LAST NAME</li>';
        } else {YUD.removeClass(document.LandingSignUpForm2.landingLastName,'error');}

        if(comIDs.length < 1){
            validity = false;
            error_string += '<li>Please select COMMUNITY</li>';
        }
        
        if (friendsName == "") {
            validity = false;
            YUD.addClass(document.LandingSignUpForm2.landingDearFirstName,'error');
            error_string += '<li>Please enter a valid FRIEND\'S NAME</li>';
        } else {YUD.removeClass(document.LandingSignUpForm2.landingDearFirstName,'error');}
        
        if (!check_email(email)) {
            validity = false;
            YUD.addClass(document.LandingSignUpForm2.landingEmail,'error');
            error_string += '<li>Please enter a valid EMAIL</li>';
        } else {YUD.removeClass(document.LandingSignUpForm2.landingEmail,'error');}
        
        if(state == ""){
            validity = false;
            YUD.addClass(document.LandingSignUpForm.landingState,'error');
            error_string += '<li>Please select a STATE</li>';
        } else {YUD.removeClass(document.LandingSignUpForm2.landingState,'error');}
        
        if (!validity) {
            // display error
            YUD.replaceClass(errorConsole,'hide','show');
            displayError('landingFormError2',error_string);
        }
        return validity;
    }
}

/* commmunitySign Up */
var CommunitySignUp = {

    thankYouDiv: null,
    formDiv: null,

    initialize: function(){
        var body = document.getElementsByTagName('body')[0]; 
        if((body.className != 'template-D' && body.className != 'template-E' && body.className != 'template-N' && body.className != 'template-R' && body.className != 'template-F') || !document.LandingSignUpForm) return;
        populateCountryOptions(document.LandingSignUpForm);
        CommunitySignUp.thankyouDiv = document.getElementById('thankyouSJ');
        CommunitySignUp.formDiv = document.getElementById('formWrapperSJ');
        var landingSubmit = document.getElementById('landingSubmit');
        if(landingSubmit) {
            YUE.addListener(landingSubmit, "click", CommunitySignUp.submitSignUp);
        }
        var comID = -1;
        if (document.LandingSignUpForm.landingComID) {  // it doesn't exist on master community page
            comID = parseInt(document.LandingSignUpForm.landingComID.value);
        }
        if (window.signedInUser != null) {
            if(signedInUser.UserID != 0) {
                CommunitySignUp.callBackInitialize(signedInUser);
            }
        }
        else
        {
            Pulte08.AjaxWebServices.CommunitySoftJoinService.GetUserDetails(comID, CommunitySignUp.callBackInitialize);
        }
    },

    callBackInitialize: function(result){
        // 1) if community has been submitted, display thank you
        // 2) if user entered data and not login, get user  data
        if(!result) return;
        if(result.signUpFlag){
            var confirmName = document.getElementById('thankyouName');
            if(confirmName) confirmName.innerHTML = result.user.FirstName;
            CommunitySignUp.toggleThankYou(true);
        } else {
            if(result.user && result.user.FirstName != null ){
                document.LandingSignUpForm.landingFirstName.value = result.user.FirstName;
                document.LandingSignUpForm.landingLastName.value = result.user.LastName;
                document.LandingSignUpForm.landingEmail.value = result.user.Email;
                document.LandingSignUpForm.landingState.value = result.user.StateAbbreviation;
                document.LandingSignUpForm.landingCountry.value = result.user.CountryCode;
                if(result.user.CountryCode != "" && result.user.CountryCode != "US"){
                    toggleAddress("LandingSignUpForm", "international");
                } else {
                    toggleAddress("LandingSignUpForm", "domestic");
                }
            }
        }
    },

    submitSignUp: function(){
        var isInternational = false;
        var intl = YUD.getElementsByClassName("international", "div", "LandingSignUpForm")[0];
        if(!YUD.hasClass(intl, "hide")){
            isInternational = true;
        }
        var fName = document.LandingSignUpForm.landingFirstName.value;
        var lName = document.LandingSignUpForm.landingLastName.value;
        var email = document.LandingSignUpForm.landingEmail.value;
        var state = document.LandingSignUpForm.landingState.value;
        var country = document.LandingSignUpForm.landingCountry.value;
        var comIDs = [];
        var topicID = 11; // soft join on product page
        var message = "";
        if (document.LandingSignUpForm.landingComID) {  // it doesn't exist on master community page
            comIDs[0] = parseInt(document.LandingSignUpForm.landingComID.value);
        } else {
            // find what communities are selected
            var j = 0;
            for (var i=0; i<communityGalleryIDs.length;i++) {
                var cbox = eval("document.getElementById('community_' + communityGalleryIDs[i])");
                if(cbox.checked) {
                    comIDs[j] = communityGalleryIDs[i];
                    j++;
                }
            }
        }
        var validity = SoftJoinControl.validateSignUp(fName, lName, email, state, country, comIDs, isInternational);
        if (validity) {
            if (window.regionOffer_fName != null) {
                // we are on the region offers page, store submitted information in window variables
                window.regionOffer_fName = fName;
                window.regionOffer_lName = lName;
                window.regionOffer_email = email;
                window.regionOffer_state = state;
                topicID = window.leadTopicID; // landing page - different values generate different LeadSource value. Set in AjaxContactUs.js
                message = document.LandingSignUpForm.message.value;
            }
            if (window.rh_fName != null) {
                // we are on the region inventory homes page, store submitted information in window variables
                window.rh_fName = fName;
                window.rh_lName = lName;
                window.rh_email = email;
                window.rh_state = state;
                topicID = window.leadTopicID; // landing page - different values generate different LeadSource value. Set in AjaxContactUs.js
                message = "";
            }     
            if (document.LandingSignUpForm.sourcePageType) { // CommunitySummary user control on community and plan pages
                message = "@@@" + document.LandingSignUpForm.sourcePageType.value + "@@@";    
            } 
            ajaxLoading('submitLandingSignUp','submit','start');
            var confirmName = document.getElementById('thankyouName');
            if(confirmName) confirmName.innerHTML = fName;
            var siteID = productSearchBrandIds[getCurrSite()];
            var isLoggedIn = NotebookUtils.getSignInStatus();


            //SiteCatalyst code to track form conversion***************************************************************************************
            if (UseSiteCatalyst)
            {
                var sOldPageName = s.pageName;

                s.pageName='ContactUs-NeighborhoodInfo-ThankYou';
                if (window.rh_fName != null) { // we are on the region inventory homes page
                    s.pageName='InventoryHomesInfo-ThankYou';
                }
		        if (sOldPageName.length>0) {
			        if (sOldPageName.indexOf(" - index")>0)
				        sOldPageName=sOldPageName.replace(" - index","")
			        s.pageName = sOldPageName + " - " + s.pageName;
		        }

                s.events="event2"
                s.eVar1="contact us";

                //s.channel=sContentGroup;
                //s.hier1=sContentGroup;
                
                var sContactUsContentGroup=sContentGroup;
                if (sContactUsContentGroup.length>0){
                    if(sContactUsContentGroup.indexOf("/index")>0)
	                    sContactUsContentGroup = sContactUsContentGroup.replace("/index","");
                    else if(sContactUsContentGroup.indexOf("/Find a Home")>0)
	                    sContactUsContentGroup = sContactUsContentGroup.replace("/Find a Home","");
		        }
	            else
	                sContactUsContentGroup = comIDs[0];

                s.channel=sContactUsContentGroup + "/" + "ContactUs-NeighborhoodInfo-ThankYou";
                s.hier1=sContactUsContentGroup + "/" + "ContactUs-NeighborhoodInfo-ThankYou";
                s.prop1 = sTProp1;
                s.prop2 = sTProp2;
                s.prop3 = sTProp3;
                s.prop4 = sTProp4;
                s.prop5 = sTProp5;
                s.prop6 = sTProp6;
                //s.prop7 = sTProp7;
                //s.prop8 = sTProp8;
                //s.prop9 = sTProp9;
                /*
                if (sTProp1==""){
                 s.prop1="Contact Us";
                }else if (sTProp2==""){
                 s.prop2="Contact Us";
                }else if (sTProp3==""){
                 s.prop3="Contact Us";
                }else if (sTProp4==""){
                 s.prop4="Contact Us";
                }else if (sTProp5==""){
                 s.prop5="Contact Us";
                }else if (sTProp6==""){
                 s.prop6="Contact Us";
                }else if (sTProp7==""){
                 s.prop7="Contact Us";
                }else if (sTProp8==""){
                 s.prop8="Contact Us";
                }else if (sTProp9==""){
                 s.prop9="Contact Us";
                }	
                */

                s.state = state;	

                s.t();
                s.pageName = sOldPageName;
                s.events = "None"
                s.eVar1 = "";

            }
            //End SiteCatalyst code to track form conversion***********************************************************************************

            Pulte08.AjaxWebServices.CommunitySoftJoinService.SaveSoftJoinForm(siteID, isLoggedIn, comIDs, fName, lName, email, state, isInternational, country, topicID, message,
            CommunitySignUp.callBackSubmitSuccess, CommunitySignUp.callBackSubmitFailed);
        }
    },

    callBackSubmitSuccess: function(result){
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        ajaxLoading('submitLandingSignUp','submit','stop');
        if (result != null && result[0] != null) {
          if (result[0].Title!='error'){
              if (YUD.hasClass(errorConsole, 'show')) YUD.replaceClass(errorConsole, 'show', 'hide');
              trackLeadSubmit();  // in \UserControls\MasterPageContent\SiteTags.ascx 
            if ((window.regionOffer_fName != null) || (window.rh_fName != null)) {
                // we are on the region offers or region inventory homes page, show thank you
                CommunitySignUp.toggleThankYou(true);
                //pointrollLeadSubmit();
            } else {
	            if (!document.getElementById("selectedCommunities")) {  // not a master community page
	                //Pulte_TAB_SUBMIT2(); // pointroll action code
	                // Yahoo tracking code
	                if (typeof(window.ysm_customData) != 'object') {
	                    window.ysm_customData = new Object();
	                }
                    window.ysm_customData.segment_1111111 = "event=1,transId=,currency=,amount=";
                    window.ysm_accountid  = "1R5UHKMVBK4J4UOGGSS8SJ9ITHC";
                    var ss = document.createElement('script');
                    ss.src = "//srv1.wa.marketingsolutions.yahoo.com/script/ScriptServlet?aid=" + ysm_accountid;
                    document.getElementsByTagName('head')[0].appendChild(ss);


	              //output the atlas tag only for first time submit and display of Thank you Div
		            var brand = getCurrSite().toLowerCase();
		            var actionTag = "";
		            if (brand=="pulte") { actionTag = "Pulte_Soft_Join_Confirmation_EDAT_0109"; }
		            if (brand=="delwebb") { actionTag = "Del_Webb_Soft_Join_Confirmation_EDAT_0109"; }
		            if (brand=="divosta") { actionTag = "DiVosta_Soft_Join_Confirmation_EDAT_0109"; }
		            /* Atlas and doubleclick traction codes are removed 6/1/10
		            var thankYouTag = "<script>document.write('<s'+'cript language=\"JavaScript\" src=\"http://view.atdmt.com/jaction/" + actionTag + 
		              "/v3/atc1thankYouTag." + neighborhoodCode + "\"></s'+'cript>')</script><noscript><iframe src=\"http://view.atdmt.com/iaction/" + actionTag + 
		              "/v3/atc1." + neighborhoodCode + "\" width=\"1\" height=\"1\" frameborder=\"0\" scrolling=\"No\" marginheight=\"0\" marginwidth=\"0\" topmargin=\"0\" leftmargin=\"0\"></iframe></noscript>";
		              // (neighborhoodCode is set in CommunitySummary.ascx)
    		          
                    /*  Start of DoubleClick Floodlight Tag: Please do not remove * /
                    var axel = Math.random() + "";
                    var a = axel * 10000000000000;
                    if (brand=="pulte") {
                        thankYouTag = thankYouTag + '<script>document.write(\'<iframe src="http://fls.doubleclick.net/activityi;src=2622573;type=thank457;cat=commu585;ord=1;num=' + a + '?" width="1" height="1" frameborder="0"></iframe>\');</script>' +
                        '<noscript><iframe src="http://fls.doubleclick.net/activityi;src=2622573;type=thank457;cat=commu585;ord=1;num=1?" width="1" height="1" frameborder="0"></iframe></noscript>';
                    }
                    if (brand=="delwebb") {
                        thankYouTag = thankYouTag + '<script>document.write(\'<iframe src="http://fls.doubleclick.net/activityi;src=2622574;type=thank174;cat=commu783;ord=1;num=' + a + '?" width="1" height="1" frameborder="0"></iframe>\');</script>' +
                        '<noscript><iframe src="http://fls.doubleclick.net/activityi;src=2622574;type=thank174;cat=commu783;ord=1;num=1?" width="1" height="1" frameborder="0"></iframe></noscript>';
                    }
                    */
                    var thankYouTag = "";
                    /* Google Code for Lead Conversion Page */
                    var googleConversionID="", googleConversionLabel="";
                    switch (brand) {
                        case "pulte": {
                            googleConversionID_0 = "1017407966";
                            googleConversionLabel_0 = "shLWCMqE2QEQ3tOR5QM";
                            googleConversionID_1 = "1029389122";
                            googleConversionLabel_1 = "gH-3CNbH2AEQwvbs6gM";
                            googleConversionID_2 = "1020077367";
                            googleConversionLabel_2 = "8E7YCMGTzAEQt8q05gM";
                            break;
                        }
                        case "delwebb": {
                            googleConversionID_0 = "1019283242";
                            googleConversionLabel_0 = "yfz6CL7txAEQqo6E5gM";
                            googleConversionID_1 = "1017906805";
                            googleConversionLabel_1 = "gH-zhWPCKPI4gEQ9Yyw5QM";
                            googleConversionID_2 = "1018566212";
                            googleConversionLabel_2 = "suwqCJSRywEQxKzY5QM";
                            break;
                        }
                        case "divosta": {
                            googleConversionID_0 = "1023554503";
                            googleConversionLabel_0 = "gD2nCLGNyQEQx-eI6AM";
                            googleConversionID_1 = "1018005328";
                            googleConversionLabel_1 = "ubFcCIjx0gEQ0I625QM";
                            googleConversionID_2 = "1028479090";
                            googleConversionLabel_2 = "dhMfCOb_0AEQ8rC16gM";
                            break;
                        }
                        case "centex" : {
                            googleConversionID_0 = "1029207100";
                            googleConversionLabel_0 = "LnpuCMTh0QEQvOjh6gM";
                            googleConversionID_1 = "1017034488";
                            googleConversionLabel_1 = "XFmcCKC0yQEQ-O365AM";
                            googleConversionID_2 = "1018521298";
                            googleConversionLabel_2 = "3wQNCNazygEQ0s3V5QM";
                            break;
                        }
                    }
                    /*
                    var googleTag_0 = "<script>document.write('<s'+'cript type=\"text/javascript\">var google_conversion_id = " + 
                    googleConversionID_0 + ";var google_conversion_language = \"en\";var google_conversion_format = \"2\";var google_conversion_color = \"ffffff\";var google_conversion_label = \"" +
                    googleConversionLabel_0 + "\";var google_conversion_value = 0;</s'+'cript><s'+'cript type=\"text/javascript\" src=\"http://www.googleadservices.com/pagead/conversion.js\"></s'+'cript>')</script>";
                    var googleTag_1 = "<script>document.write('<s'+'cript type=\"text/javascript\">var google_conversion_id = " + 
                    googleConversionID_1 + ";var google_conversion_language = \"en\";var google_conversion_format = \"2\";var google_conversion_color = \"ffffff\";var google_conversion_label = \"" +
                    googleConversionLabel_1 + "\";var google_conversion_value = 0;</s'+'cript><s'+'cript type=\"text/javascript\" src=\"http://www.googleadservices.com/pagead/conversion.js\"></s'+'cript>')</script>";
                    var googleTag_2 = "<script>document.write('<s'+'cript type=\"text/javascript\">var google_conversion_id = " + 
                    googleConversionID_2 + ";var google_conversion_language = \"en\";var google_conversion_format = \"2\";var google_conversion_color = \"ffffff\";var google_conversion_label = \"" +
                    googleConversionLabel_2 + "\";var google_conversion_value = 0;</s'+'cript><s'+'cript type=\"text/javascript\" src=\"http://www.googleadservices.com/pagead/conversion.js\"></s'+'cript>')</script>";
                    //alert(googleTag_1);
                    */
                    var googleTag_0 = "<div style=\"display:inline;\"><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" " +
                    "src=\"http://www.googleadservices.com/pagead/conversion/" + googleConversionID_0 + "/?label=" + googleConversionLabel_0 + "&amp;guid=ON&amp;script=0\"/></div>";
                    var googleTag_1 = "<div style=\"display:inline;\"><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" " +
                    "src=\"http://www.googleadservices.com/pagead/conversion/" + googleConversionID_1 + "/?label=" + googleConversionLabel_1 + "&amp;guid=ON&amp;script=0\"/></div>";
                    var googleTag_2 = "<div style=\"display:inline;\"><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" " +
                    "src=\"http://www.googleadservices.com/pagead/conversion/" + googleConversionID_2 + "/?label=" + googleConversionLabel_2 + "&amp;guid=ON&amp;script=0\"/></div>";
                    
                    thankYouTag = thankYouTag + googleTag_0 + googleTag_1 + googleTag_2;
                    
                    //alert(thankYouTag);
                    document.getElementById("atlasThankYou").innerHTML = thankYouTag;
                 } else {
                    // master community page - build links to community brochures. result has links to fast-pass.aspx page for each community, we need to replace it with brochure.aspx.
                    var linksToSelectedCommunities = "";
                    rExp = /fast-pass/gi;
                    for (var i=1; i<result.length - 2; i++) {
                        linksToSelectedCommunities = linksToSelectedCommunities + "<a href='" + result[i].Description.replace(rExp,"brochure") + "' target='_blank'>" + result[i].Title + "</a><br>";
                    }
                    document.getElementById("selectedCommunities").innerHTML = linksToSelectedCommunities;
                 }
                 CommunitySignUp.toggleThankYou(true);
             }
          }
          else {
            YUD.replaceClass(errorConsole,'hide','show');
            displayError('landingFormError',error_string);
          }
        }
        else {
          YUD.replaceClass(errorConsole,'hide','show');
          displayError('landingFormError',error_string);
        }
    },

    callBackSubmitFailed: function(result){
        var errorConsole = YUD.getElementsByClassName('alertBar','',document.LandingSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        YUD.replaceClass(errorConsole,'hide','show');
        displayError('landingFormError',error_string);
    },

    toggleThankYou: function(isThankYou){
        if(isThankYou){
            if(YUD.hasClass('thankyouSJ', 'hide')) {YUD.replaceClass('thankyouSJ','hide','show');}
            if(!YUD.hasClass('formWrapperSJ', 'hide')) {
                if(YUD.hasClass('formWrapperSJ', 'show'))
                    YUD.replaceClass('formWrapperSJ','show','hide');
                else
                    YUD.addClass('formWrapperSJ', 'hide');
            }
        } else {
            if(YUD.hasClass('thankyouSJ', 'show')) {YUD.replaceClass('thankyouSJ','show','hide');}
            if(YUD.hasClass('formWrapperSJ', 'hide')) {YUD.replaceClass('formWrapperSJ', 'hide', 'show');}
        }
    }
    
}

// ----------------------------------------------------------------------------------------------

// SESSION TIMEOUT

YAHOO.namespace('sessionTimeOut');
YAHOO.sessionTimeOut.init = function() {

    document.getElementById('sessionTimeOutDiv').style.display = '';
    // Build overlay based on markup
    YAHOO.sessionTimeOut.overlay = new YAHOO.widget.Overlay('sessionTimeOutDiv',{'fixedCenter':true,'width':350,'visible':false,'zIndex':1000,'effect':{'effect':YAHOO.widget.ContainerEffect.FADE,duration:0.25}});
    YAHOO.sessionTimeOut.overlay.render();

    YUE.addListener(YUD.getElementsByClassName('timeoutClose'),'click',function(){

        YAHOO.sessionTimeOut.overlay.hide();

		// if it is contact form
        if (document.contact) {

            // remove ERROR messaging
            resetErrorHandling();

            // reset form view
            YUD.setStyle(YUD.getElementsByClassName('level1','div')[0],'display','inline');
            YUD.setStyle([YUD.getElementsByClassName('level2','div')[0],YUD.getElementsByClassName('level3','div')[0],YUD.getElementsByClassName('level4','div')[0]],'display','none');
            var resetSelectedTopic = document.getElementById('selectTopic');
            var selectedTopicTargets = resetSelectedTopic.getElementsByTagName('LI');
            YUD.removeClass(selectedTopicTargets,'selected');
            var selectedTopicInputs = resetSelectedTopic.getElementsByTagName('INPUT');
            for (f=0; f < selectedTopicInputs.length; f++) selectedTopicInputs[f].checked=false;
            var selectedTopicImgs = resetSelectedTopic.getElementsByTagName('IMG');
            for (q=0; q < selectedTopicImgs.length; q++) {if (selectedTopicImgs[q].src.indexOf('radioChecked.gif') > -1) {selectedTopicImgs[q].src = '/images/' + getCurrSite() + '/button-radioUnchecked.gif'}};
            document.thankyou.confirmEmail.value='';

            // hide modal, show select (if IE), reset form, restart counter
		    setTimeout('modalBackdrop.hide()',800);
            setTimeout(function() {document.contact.reset()},1000);
		    resetCharCount();
        }
		else {
            modalBackdrop.hide();
            if (document.getElementById("selectionCriteria")!=null) {
                document.formProductSearch.homesAvailableNow.checked = false;
                SearchControlUtils.resetSearchParameters();
                MapSearch.zoomToCountry();
                //switchTab('primaryTabs','communitylisting');
            }
            else {
                location.reload(true);
            }            
        }

		// restart session timeout
		if (sessionTimer) window.clearTimeout(sessionTimer);
		sessionTimer = setTimeout(restartSessionTimeOut,sessionTimeOutLimit);

    },YAHOO.sessionTimeOut.overlay,true);
}

var restartSessionTimeOut = function() {
    // close user/id/notebook panels
     if (document.getElementById('myNotebook')){  //bm
	if (document.getElementById('myNotebook').style.visibility=='visible') myNotebookPanel.closePanel();
	if (document.getElementById('signIn').style.visibility=='visible') myNotebookSignIn.closePanel();
	if (document.getElementById('registerPanel').style.visibility=='visible') myNotebookRegister.closePanel();
     }  //bm
	modalBackdrop.show();
	setTimeout('YAHOO.sessionTimeOut.overlay.show()',400);
	// reset modal dialog height based on growth from topic selection
	YUD.setStyle(document.getElementById('modalDialog'),'height', Math.max(YUD.getViewportHeight(), document.body.scrollHeight) + 'px');
}

// ----------------------------------------------------------------------------------------------

// IPIX MULTIMEDIA LOAD ON-DEMAND

var loadMultimedia = function() {
	if (YUD.hasClass(document.body,'template-E') && document.getElementById('interactiveTourTabs')) {
		var container = YUD.getElementsByClassName('yui-nav','ul',document.getElementById('interactiveTourTabs'))[0];
		var linkList = container.getElementsByTagName('a');

		// insert applet code
		var writeApplet = function(target,url) {
			target.innerHTML =  '<applet name="IpixViewer" code="IpixViewer.class" archive="/assets/ipix/IpixViewer.jar" width="320" height="240">' +
								'<param name="url" value="../../../../../' + url + '" />' +
								'<param name="toolbar" value="on" />' +
								'<param name="initfov" value="80" />' +
								'<param name="spinspeed" value="4" />' +
								'<param name="spinstyle" value="flat" />' +
								'<param name="splash" value="/assets/ipix/ipix_pulte.jpg" />';
		}

		// click event
		if (linkList.length>-1) {
			YUE.on(linkList,'click',function(e){

				// remove existing IPIX first
				var appletContainers = YUD.getElementsByClassName('applet','div',document.getElementById('interactiveTourTabs'));
				for (f=0; f < appletContainers.length; f++) appletContainers[f].innerHTML='';

				// load new IPIX
				var linkClicked = YUE.getTarget(e).id;
				var idConstruct = linkClicked.replace('mediaLink','mediaLoad');
				var target = document.getElementById(idConstruct);
				var url = target.title;
				writeApplet(target,url);
			});
		}

		// load first (default) applet onclick "Interactive Tour" tab
		YUE.on(document.body,'click',function(e){
			if (YUD.getAncestorByTagName(YUE.getTarget(e),'li') && YUD.getAncestorByTagName(YUE.getTarget(e),'li').id == 'interactive-tour') writeApplet(document.getElementById('mediaLoad10'),document.getElementById('mediaLoad10').title);
		});
	}
}

// ----------------------------------------------------------------------------------------------


// Atlas Tag Configuration
var atlasTagCONFIG = {
    seoBrandTag: [],
    seoCatContactUs: "contact-us",
    seoCatNotebook: "notebook",
    seoCatLP: "landing",

    initizlize: function(){
        return; // 06/01/2010 - removed RazerFish tracking codes 
        this.seoBrandTag["Pulte"] = [{Cat: this.seoCatContactUs, SubCat: "info", TagName: "pulte_contact_neighborhood_info"},
                {Cat: this.seoCatContactUs, SubCat: "mortgages", TagName: "pulte_contact_mortgages_financing"},
                {Cat: this.seoCatContactUs, SubCat: "support", TagName: "pulte_contact_technical_site_support"},
                {Cat: this.seoCatContactUs, SubCat: "homeowner", TagName: "pulte_contact_homeowner_questions"},
                {Cat: this.seoCatContactUs, SubCat: "communications", TagName: "pulte_contact_corporate_communications"},
                {Cat: this.seoCatContactUs, SubCat: "investor", TagName: "pulte_contact_investor_relations"},
                {Cat: this.seoCatContactUs, SubCat: "careers", TagName: "pulte_contact_careers_at_pulte"},
                {Cat: this.seoCatContactUs, SubCat: "general", TagName: "pulte_contact_general_questions"},
                {Cat: this.seoCatNotebook, SubCat: this.seoCatNotebook, TagName: "pulte_registration"},
                {Cat: this.seoCatLP, SubCat: "landingForm", TagName: "Pulte_New_National_LP_071908"},
                {Cat: this.seoCatLP, SubCat: "landingThankyou-REMOVED", TagName: "Pulte_New_Confirmation_Page_071908"}
        ];
       this.seoBrandTag["DelWebb"] = [{Cat: this.seoCatContactUs, SubCat: "info", TagName: "Del_Webb_Contact_Neighborhood_Info"},
                {Cat: this.seoCatContactUs, SubCat: "mortgages", TagName: "Del_Webb_Contact_Mortgages_Financing"},
                {Cat: this.seoCatContactUs, SubCat: "support", TagName: "Del_Webb_Contact_Technical_Site_Support"},
                {Cat: this.seoCatContactUs, SubCat: "homeowner", TagName: "Del_Webb_Contact_Homeowner_Questions"},
                {Cat: this.seoCatContactUs, SubCat: "communications", TagName: "Del_Webb_Contact_Corporate_Communications"},
                {Cat: this.seoCatContactUs, SubCat: "investor", TagName: "Del_Webb_Contact_Investor_Relations"},
                {Cat: this.seoCatContactUs, SubCat: "careers", TagName: "Del_Webb_Contact_Careers_at_Del_Webb"},
                {Cat: this.seoCatContactUs, SubCat: "general", TagName: "Del_Webb_Contact_General_Questions"},
                {Cat: this.seoCatNotebook, SubCat: this.seoCatNotebook, TagName: "Del_Webb_Registration"},
                {Cat: this.seoCatLP, SubCat: "landingForm", TagName: "Del_Webb_New_National_LP_071908"},
                {Cat: this.seoCatLP, SubCat: "landingThankyou-REMOVED", TagName: "Del_Webb_New_Confirmation_Page_071908"}
       ];
       this.seoBrandTag["DiVosta"] = [{Cat: this.seoCatLP, SubCat: "landingForm", TagName: "DiVosta_New_National_LP_071908"},
                {Cat: this.seoCatLP, SubCat: "landingThankyou-REMOVED", TagName: "DiVosta_New_Confirmation_Page_071908"}
       ];
       this.seoBrandTag["Centex"] = [{Cat: this.seoCatContactUs, SubCat: "info", TagName: "centex_contact_neighborhood_info"},
                {Cat: this.seoCatContactUs, SubCat: "mortgages", TagName: "centex_contact_mortgages_financing"},
                {Cat: this.seoCatContactUs, SubCat: "support", TagName: "centex_contact_technical_site_support"},
                {Cat: this.seoCatContactUs, SubCat: "homeowner", TagName: "centex_contact_homeowner_questions"},
                {Cat: this.seoCatContactUs, SubCat: "communications", TagName: "centex_contact_corporate_communications"},
                {Cat: this.seoCatContactUs, SubCat: "investor", TagName: "centexcontact_investor_relations"},
                {Cat: this.seoCatContactUs, SubCat: "careers", TagName: "centex_contact_careers_at_pulte"},
                {Cat: this.seoCatContactUs, SubCat: "general", TagName: "centex_contact_general_questions"},
                {Cat: this.seoCatNotebook, SubCat: this.seoCatNotebook, TagName: "centex_registration"},
                {Cat: this.seoCatLP, SubCat: "landingForm", TagName: "centex_New_National_LP_071908"},
                {Cat: this.seoCatLP, SubCat: "landingThankyou-REMOVED", TagName: "centex_New_Confirmation_Page_071908"}
        ];
   },

   getAtlasImageTag: function(cat, subCat){
        var seoImage;
        return seoImage; 
        if(getCurrSite() != "DiVosta"){
            var curBrandTag = this.seoBrandTag[getCurrSite()];
            for(var i=0; i < curBrandTag.length; i++){
                if(curBrandTag[i].Cat == cat && curBrandTag[i].SubCat == subCat ){
                    seoImage = document.createElement("img");
                    seoImage.src = 'http://switch.atdmt.com/action/' + curBrandTag[i].TagName;
                    seoImage.height = 1;
                    seoImage.width = 1;
                    break;
                }
            }
        }
        return seoImage;
    },

    populateAtlasScriptTag: function(cat, subCat){
        var tagString = "";
        return;
        var curBrandTag = this.seoBrandTag[getCurrSite()];
        for(var i=0; i < curBrandTag.length; i++){
            if(curBrandTag[i].Cat == cat && curBrandTag[i].SubCat == subCat ){
                tagString = curBrandTag[i].TagName;
                break;
            }
        }
        if (tagString != "") {
	        document.write('<s'+'cript language="JavaScript" src="http://switch.atdmt.com/jaction/' + tagString + '"></s'+'cript>');
	        document.write('<noscript><iframe src="http://switch.atdmt.com/iaction/' + tagString + '" width="1" height="1" frameborder="0" scrolling="No" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0"></iframe></noscript>');
	      }
    },
    
    getAtlasScriptTag: function(cat, subCat){
        var seoTag = "";
        var tagString = "";
        return seoTag;
        var curBrandTag = this.seoBrandTag[getCurrSite()];
        for(var i=0; i < curBrandTag.length; i++){
            if(curBrandTag[i].Cat == cat && curBrandTag[i].SubCat == subCat ){
                tagString = curBrandTag[i].TagName;
                break;
            }
        }
        if (tagString != "") {
          seoTag = "<script>document.write('<s'+'cript language=\"JavaScript\" src=\"http://switch.atdmt.com/jaction/" + tagString + "\"></s'+'cript>')</script>" +
	          '<noscript><iframe src="http://switch.atdmt.com/iaction/' + tagString + '" width="1" height="1" frameborder="0" scrolling="No" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0"></iframe></noscript>';
	      } 
	      return seoTag;
    }
}

atlasTagCONFIG.initizlize();



// ----------------------------------------------------------------------------------------------
// ----------------------------- NOTEBOOK ISSIGNEDIN DETERMINATION ------------------------------
// ----------------------------------------------------------------------------------------------

function setNotebookSignIn(){
  if (window.signedInStatus != null) { // signedInStatus was declared and set in the master page by user control SignedInStatus
//    NotebookUtils.SetSignInStatus(signedInStatus);

	if (document.getElementById("loginStatus")){
          var loginStatus = document.getElementById("loginStatus");
          loginStatus.value = window.signedInStatus;
	}


    //****THIS WAS OLD CODE - LOAD ON DEMAND***********//
	//if (window.signedInStatus && !document.getElementById("myNotebook")){
	//  loadFullControl('');
	//  return;
	//}
    //****END OLD CODE - LOAD ON DEMAND***********//

    //****THIS IS NEW CODE - LOAD ALWAYS***********//
	if (!document.getElementById("myNotebook")){
	  loadFullControl('');
	  return;
	}
    //****END NEW CODE - LOAD ALWAYS***********//



        //var loginStatus = document.getElementById("loginStatus");
        //loginStatus.value = isLogin;

        var signInDivs = YUD.getElementsByClassName("myNotebookSignIn", "div");
        var signOutDivs = YUD.getElementsByClassName("myNotebookSignOut", "div");
        //var profileDiv = document.getElementById("profileDetailInfo");
        var regDiv = document.getElementById("profileRegisterInfo");

        // get user data from Ajax call
        if (window.signedInStatus) {
            // display sign out link
            for (var i = 0; i < signInDivs.length; i++) { signInDivs[i].style.display = "none"; }
            for (var i = 0; i < signOutDivs.length; i++) { signOutDivs[i].style.display = ""; }
            // display profile detail section
            if (profileDiv) profileDiv.style.display = "";
            if (regDiv) regDiv.style.display = "none";
            // load profile data
            //if (window.signedInUser != null) {
            //    myNotebookProfileControl.callBackRenderResult(signedInUser);
            //} else {
            //    Pulte08.AjaxWebServices.UserService.GetProfileInfo(myNotebookProfileControl.callBackRenderResult);
            //}
        } //else {
          //  // display sign in Link
          //  for (var i = 0; i < signInDivs.length; i++) { signInDivs[i].style.display = ""; }
          //  for (var i = 0; i < signOutDivs.length; i++) { signOutDivs[i].style.display = "none"; }
          //  // display please register info
          //  if (profileDiv) profileDiv.style.display = "none";
          //  if (regDiv) regDiv.style.display = "";
          //  // set the welcome text to be blank
          //  var userWelcomeText = document.getElementById("userWelcomeText");
          //  userWelcomeText.innerHTML = "";
          //  myNotebookSignIn.errorMessage.innerHTML = '';
        //}








  } else { 
    Pulte08.AjaxWebServices.UserService.IsSignedIn(NotebookUtils.SetSignInStatus, NotebookUtils.SetSignInException);
  }













}

// ----------------------------------------------------------------------------------------------
// ----------------------------- end: NOTEBOOK ISSIGNEDIN DETERMINATION -------------------------
// ----------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------

// ONDOMREADY, LOAD THESE FUNCTIONS

YUE.onDOMReady(function(){
	roundedCorners();
    roundOnClasses();
    switchAddress();
    setbrokerFields();
    setownerFields();
    populateHearAboutUsOptions();
	styleTextInput();
	styleButtonInput();
	customShowHide();
	TableUtils.initSortTable('sortTableList');
	loadMultimedia();
    LandingSearch.loadThankYou();
    CommunitySignUp.initialize();
    setNotebookSignIn();
});

// ----------------------------------------------------------------------------------------------




function findZip(address) {
    if (address.length == 5) {
        geocoder = new google.maps.Geocoder();
        if (!geocoder) return;
        //geocoder.getLocations(address, locationFound);
        geocoder.geocode({ 'address': address }, locationFound);
        return true;
    } else {
        var errorConsole = document.getElementById("errorConsole");
        YUD.replaceClass(errorConsole, 'hide', 'show');
        displayError('zipCodeSearchError', "Please enter five digit postal code.");
        return false;
    }
}

function locationFound(result,status) {
    var url = "";
    var zipValue = "";
    var errString = "";
    var zipSearch = document.getElementById("zipSearch");
    if (zipSearch != null) {
        if (zipSearch.value != "") {
            zipValue = zipSearch.value;
        }
    }
    //if (result.Status.code == "200") {
    //alert(status);
    //console.log(result[0]);
    //alert(google.maps.GeocoderStatus.ZERO_RESULTS);
    if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
        errString = "Sorry, the requested Postal Code " + zipValue + " is invalid. Please verify the postal code or use the map functionality to find States/Markets Centex Homes serves.";
    }
    if (status == google.maps.GeocoderStatus.OK) {
        var country = "";
        var foundZip = "";
        if ((result[0].length < 1)) {
            errString = "Nothing was found, please specify an accurate zip code";
        } else {
            for (i = 0; i < result[0].address_components.length; i++) {
                //alert(result[0].address_components[i].types[0]);
                if (result[0].address_components[i].types[0] == "country") {
                    country = result[0].address_components[i].short_name
                }
                if (result[0].address_components[i].types[0] == "postal_code") {
                    foundZip = result[0].address_components[i].short_name
                }
            }
            //alert(country);
            if (country == "US") {

                //if (result.Placemark[0].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea) {
                //    if (result.Placemark[0].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality && result.Placemark[0].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality != null &&
                //    result.Placemark[0].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.PostalCode && result.Placemark[0].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.PostalCode.PostalCodeNumber &&
                //    result.Placemark[0].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.PostalCode != null && result.Placemark[0].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.PostalCode.PostalCodeNumber != null) {
                //        foundZip = result.Placemark[0].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.PostalCode.PostalCodeNumber;
                //    } else {
                //        foundZip = result.Placemark[0].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.PostalCode.PostalCodeNumber;
                //    }
                //} else { // 11201 doesn't have SubAdministrativeArea
                //    if (result.Placemark[0].AddressDetails.Country.AdministrativeArea.Locality && result.Placemark[0].AddressDetails.Country.AdministrativeArea.Locality != null &&
                //    result.Placemark[0].AddressDetails.Country.AdministrativeArea.Locality.PostalCode && result.Placemark[0].AddressDetails.Country.AdministrativeArea.Locality.PostalCode.PostalCodeNumber &&
                //    result.Placemark[0].AddressDetails.Country.AdministrativeArea.Locality.PostalCode != null && result.Placemark[0].AddressDetails.Country.AdministrativeArea.Locality.PostalCode.PostalCodeNumber != null) {
                //        foundZip = result.Placemark[0].AddressDetails.Country.AdministrativeArea.Locality.PostalCode.PostalCodeNumber;
                //    } else {
                //        foundZip = result.Placemark[0].AddressDetails.Country.AdministrativeArea.PostalCode.PostalCodeNumber;
                //    }
                //}
                if (foundZip == zipValue) {
                    var point = result[0].geometry.location;
                    url = "/find-a-home/search.aspx?zip=" + zipValue + "&ha=0";
                    //alert(result.Placemark[0].AddressDetails.Accuracy);
                } else {
                    errString = "Sorry, the requested Postal Code " + zipValue + " is invalid. Please verify the postal code or use the map functionality to find States/Markets Centex Homes serves.";
                }
            } else {
                errString = zipValue + " was found in '" + result[0].address_components[2].short_name  + "', and is not in the United States. Please re-enter a new postal code.";
            }
        }
    }
    else {
        if (google.maps.GeocoderStatus.ZERO_RESULTS || google.maps.GeocoderStatus.OVER_QUERY_LIMIT || google.maps.GeocoderStatus.REQUEST_DENIED) {
            errString = "Nothing was found, please specify an accurate zip code";
        } else {
            errString = "Google Error " + result.Status.code;
        }
    }
    if (errString != "") {
        //errString = "&nbsp;&nbsp;&nbsp;" + errString;
        var errorConsole = document.getElementById("errorConsole");
        YUD.replaceClass(errorConsole, 'hide', 'show');
        displayError('zipCodeSearchError', errString);
    } else {
        var errorConsole = document.getElementById("errorConsole");
        YUD.replaceClass(errorConsole, 'show', 'hide');
    }
    if (url != "") {
        if (document.getElementById("getLocationByZip") == null) {
            window.location = url;
        } else {
            var zipSearch = document.getElementById("zipSearch");
            if (zipSearch != null) {
                if ((zipSearch.value != "") && (!isNaN(zipSearch.value))) {
                    var zipValue = zipSearch.value;
                    MapSearch.showAddress(zipValue, 0, result[0].geometry.location, country); // it will use default radius
                }
            }
        }
    }
}

function numericOnly(eventRef) {
    eventRef = (eventRef) ? eventRef : event;
    var keyStroke = (eventRef.keyCode) ? eventRef.keyCode : eventRef.which;
    if (keyStroke) {
        keyStroke = parseInt(keyStroke, 10);
        if (isKeyboardNavKey(keyStroke)) return true;
        else 
            if ((keyStroke < 48 || keyStroke > 57) && (keyStroke < 96 || keyStroke > 105)) return false;
            else if (eventRef.shiftKey) return false;
    }
    return true;
}

function isKeyboardNavKey(keyStroke) {
    if (keyStroke == 8 || keyStroke == 9 || keyStroke == 13 || keyStroke == 45 || keyStroke == 46) return true;
    if ((keyStroke > 16 && keyStroke < 21) || (keyStroke > 34 && keyStroke < 41)) return true;
    return false;
}

function removeZipText() {
    var zip = document.getElementById("zipSearch");
    if (isNaN(zip.value)) zip.value = '';
    return true;
}


// ----------------------------------------------------------------------------------------------
// ----------------------------------- USER FUNCTIONS -------------------------------------------
// ----------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
//-------------------------------------- start: NotebookUtils ----------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

// NotebookUtils
var NotebookUtils = {

    //callBackSignout
    callBackSignout: function() {
        NotebookUtils.SetSignInStatus(false);
        if (openedNotebookSection) {
            openedNotebookSection.hide();
            modalBackdrop.hide();
        }
        //
        if (document.contact) populateContactForm("out");
        if (document.LandingSignUpForm) SoftJoinControl.resetSignUpForm();
        if (document.advisorContact) RemoveUserInfo();
        
        Pulte08.AjaxWebServices.UserService.GetWindowUser(NotebookUtils.callBackSetWindowUser);

        //var sPath = window.location.pathname;
        ////var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        //if (sPath.toLowerCase().indexOf('portal') > 0)
        //    window.location.href = sPath;
        RenderPortalControls();


    },
    // -------------------------------------------------- end: callBackSignout -----------------------------------------


    // callBackSetWindowUser
    callBackSetWindowUser: function(result) {
        if (result == "") {
            window.signedInUser = eval("(" + "{UserID:0}" +")");
            window.signedInStatus = false;
        } else {
            window.signedInStatus = true;
            window.signedInUser = eval("(" + result + ")");
            if (result == "{UserID:0}")
                window.signedInStatus = false;

        }

    },
    // ----------------------------- end: callBackSetWindowUser ---------------------------------------------------------



    // setSignInStatus
    SetSignInStatus: function(isLogin) {

        if(!document.getElementById("loginStatus")) return;
        var loginStatus = document.getElementById("loginStatus");
        loginStatus.value = isLogin;
        //bmif(!document.getElementById("myNotebook")) return;
        //if(!document.getElementById("myNotebook")) return;
        //var loginStatus = document.getElementById("loginStatus");
        //loginStatus.value = isLogin;


        var signInDivs = YUD.getElementsByClassName("myNotebookSignIn", "div");
        var signOutDivs = YUD.getElementsByClassName("myNotebookSignOut", "div");
        var profileDiv = document.getElementById("profileDetailInfo");
        var regDiv = document.getElementById("profileRegisterInfo");

        // get user data from Ajax call
        if (isLogin) {
            // display sign out link
            for (var i = 0; i < signInDivs.length; i++) { signInDivs[i].style.display = "none"; }
            for (var i = 0; i < signOutDivs.length; i++) { signOutDivs[i].style.display = ""; }
            // display profile detail section
            if (profileDiv) profileDiv.style.display = "";
            if (regDiv) regDiv.style.display = "none";
            // load profile data
            if (window.signedInUser != null) {
                if(document.getElementById("myNotebook")) myNotebookProfileControl.callBackRenderResult(signedInUser);
            } else {
                Pulte08.AjaxWebServices.UserService.GetProfileInfo(myNotebookProfileControl.callBackRenderResult);
            }
        } else {
            // display sign in Link
            for (var i = 0; i < signInDivs.length; i++) { signInDivs[i].style.display = ""; }
            for (var i = 0; i < signOutDivs.length; i++) { signOutDivs[i].style.display = "none"; }
            // display please register info
            if (profileDiv) profileDiv.style.display = "none";
            if (regDiv) regDiv.style.display = "";
            // set the welcome text to be blank
	    if (document.getElementById("userWelcomeText")) {
            var userWelcomeText = document.getElementById("userWelcomeText");
            userWelcomeText.innerHTML = "";
	    }
            if(document.getElementById("myNotebook")) myNotebookSignIn.errorMessage.innerHTML = '';
        }

        NotebookUtils.displayRegMarketingInfo(false);
        //myNotebookViewedControl.refreshResult();
        //myNotebookSavedControl.refreshResult();

    },
    // ------------------------- end SetSignInStatus -------------------------------------------------------------------

    // SetSignInException
    SetSignInException: function(result) {
    },
    // -------------------------- end: SetSignInException --------------------------------------------------------------

    //getSignInStatus
    getSignInStatus: function() {
        var isLogin = false;
        if (document.getElementById("loginStatus")){
         var loginStatus = document.getElementById("loginStatus").value;
         if (loginStatus == "true") isLogin = true;
        }
        return isLogin;
    },
    // -------------------------- end: getSignInStatus -----------------------------------------------------------------

    //displayRegisterAdv
    displayRegMarketingInfo: function(isTrue) {
        var msgDiv = YUD.getElementsByClassName("messageArea", "div", "myNotebook")[0];
        if (msgDiv) {
            if (isTrue) show(msgDiv);
            else hide(msgDiv);
        }
    },
    // -----------------------------------------------------------------------------------------------------------------
    //saveCommunityToNotebook
    saveCommunity: function(communityId) {
        Pulte08.AjaxWebServices.SavedProductsService.SaveCommunity(communityId, NotebookUtils.callBackSaveAndRemove);
    },
    // ------------------------- end: saveCommunityToNotebook ----------------------------------------------------------

    //savePlanToNotebook
    savePlan: function(planId) {
        Pulte08.AjaxWebServices.SavedProductsService.SavePlan(planId, NotebookUtils.callBackSaveAndRemove);
    },
    // -------------------------- end: savePlanToNotebook --------------------------------------------------------------

    //saveInvHomeToNotebook
    saveInventoryHome: function(inventoryHomeId) {
        Pulte08.AjaxWebServices.SavedProductsService.SaveInventoryHome(inventoryHomeId, NotebookUtils.callBackSaveAndRemove);
    },
    // -------------------------- end: saveInvHomeToNotebook --------------------------------------------------------------

    //removeCommunityFromNotebook
    removeCommunity: function(communityId, obj) {
        // display delete confirmation message
        if (obj) {
            var pObj = obj.parentNode;
            var confirmDiv;
            // check if div has been created
            confirmDiv = YUD.getElementsByClassName('NBConfirmDelete', 'div', pObj)[0];
            // if the div is not found, create it
            if (!confirmDiv) {
                //var removeLink = pObj.getElementsByTagName('a')[0];
                confirmDiv = document.createElement('div');
                confirmDiv.className = 'NBConfirmDelete';
                confirmDiv.appendChild(document.createTextNode('Remove Neighborhood? '));
                // yes link
                var a = document.createElement('a');
                a.href = 'javascript:void("");'
                a.onclick = function() { NotebookUtils.removeCommunityConfirm(communityId, obj); };
                a.appendChild(document.createTextNode('Yes'));
                confirmDiv.appendChild(a);
                confirmDiv.appendChild(document.createTextNode(' | '));
                // no link
                a = document.createElement('a');
                a.href = 'javascript:void("")';
                a.onclick = function() { NotebookUtils.removeCommunityCancel(obj); };
                a.appendChild(document.createTextNode('No'));
                confirmDiv.appendChild(a);
                confirmDiv.appendChild(document.createTextNode(' | '));
                // cancel link
                a = document.createElement('a');
                a.href = 'javascript:void("")';
                a.onclick = function() { NotebookUtils.removeCommunityCancel(obj); };
                a.appendChild(document.createTextNode('Cancel'));
                confirmDiv.appendChild(a);
                pObj.appendChild(confirmDiv);
            } else {
                show(confirmDiv);
            }
        }
    },
    // ------------------------- end: removeCommunityFromNotebook ------------------------------------------------------

    //removeCommunityFromNotebook
    removeCommunityConfirm: function(communityId, obj) {
        // display delete confirmation message
        if (obj) {
            var pObj = obj.parentNode;
            var confirmDiv = YUD.getElementsByClassName('NBConfirmDelete', 'div', pObj)[0];
            // if the div is not found, create it
            if (confirmDiv) hide(confirmDiv);
            Pulte08.AjaxWebServices.SavedProductsService.RemoveCommunity(communityId, NotebookUtils.callBackSaveAndRemove, NotebookUtils.callBackSaveAndRemoveFailed, obj);
        }
    },
    // ------------------------------------- end: removeCommunityConfirm -----------------------------------------------

    //removeCommunityFromNotebook
    removeCommunityCancel: function(obj) {
        // hide the confirm popup
        if (obj) {
            var pObj = obj.parentNode;
            var confirmDiv = YUD.getElementsByClassName('NBConfirmDelete', 'div', pObj)[0];
            if (confirmDiv) hide(confirmDiv);
        }
    },
    // --------------------------------------- remove Community Cancel -------------------------------------------------

    //removePlanFromNotebook
    removePlan: function(planId, obj) {
        // display delete confirmation message
        if (obj) {
            var pObj = obj.parentNode;
            var confirmDiv;
            // check if div has been created
            confirmDiv = YUD.getElementsByClassName('NBConfirmDeletePlan', 'div', pObj)[0];
            // if the div is not found, create it
            if (!confirmDiv) {
                confirmDiv = document.createElement('div');
                confirmDiv.className = 'NBConfirmDeletePlan';
                confirmDiv.appendChild(document.createTextNode('Remove Home Model?'));
                confirmDiv.appendChild(document.createElement('br'));
                // yes link
                var a = document.createElement('a');
                a.href = 'javascript:void("");'
                a.onclick = function() { NotebookUtils.removePlanConfirm(planId, obj); };
                a.appendChild(document.createTextNode('Yes'));
                confirmDiv.appendChild(a);
                confirmDiv.appendChild(document.createTextNode(' | '));
                // no link
                a = document.createElement('a');
                a.href = 'javascript:void("")';
                a.onclick = function() { NotebookUtils.removePlanCancel(obj); };
                a.appendChild(document.createTextNode('No'));
                confirmDiv.appendChild(a);
                confirmDiv.appendChild(document.createTextNode(' | '));
                // cancel link
                a = document.createElement('a');
                a.href = 'javascript:void("")';
                a.onclick = function() { NotebookUtils.removePlanCancel(obj); };
                a.appendChild(document.createTextNode('Cancel'));
                confirmDiv.appendChild(a);
                pObj.appendChild(confirmDiv);

            } else {
                show(confirmDiv);
            }
        }

    },
    // -------------------------- end: removePlanFromNotebook ----------------------------------------------------------

    //removePlanFromNotebook
    removePlanConfirm: function(planId, obj) {
        // display delete confirmation message
        if (obj) {
            var pObj = obj.parentNode;
            var confirmDiv = YUD.getElementsByClassName('NBConfirmDeletePlan', 'div', pObj)[0];
            // if the div is not found, create it
            if (confirmDiv) hide(confirmDiv);
            Pulte08.AjaxWebServices.SavedProductsService.RemovePlan(planId, NotebookUtils.callBackSaveAndRemove, NotebookUtils.callBackSaveAndRemoveFailed, obj);
        }
    },
    // -------------------------- end: removePlanFromNotebook ----------------------------------------------------------

    //removePlanFromNotebook
    removePlanCancel: function(obj) {
        var pObj = obj.parentNode;
        var confirmDiv = YUD.getElementsByClassName('NBConfirmDeletePlan', 'div', pObj)[0];
        if (confirmDiv) hide(confirmDiv);
    },
    // -------------------------- end: removePlanFromNotebook ----------------------------------------------------------


    //removeInvHome
    removeInventoryHome: function(inventoryHomeId, obj) {
        // display delete confirmation message
        if (obj) {
            var pObj = obj.parentNode;
            var confirmDiv;
            // check if div has been created
            confirmDiv = YUD.getElementsByClassName('NBConfirmDeletePlan', 'div', pObj)[0];
            // if the div is not found, create it
            if (!confirmDiv) {
                confirmDiv = document.createElement('div');
                confirmDiv.className = 'NBConfirmDeletePlan';
                confirmDiv.appendChild(document.createTextNode('Remove Home Model?'));
                confirmDiv.appendChild(document.createElement('br'));
                // yes link
                var a = document.createElement('a');
                a.href = 'javascript:void("");'
                a.onclick = function() { NotebookUtils.removeInventoryHomeConfirm(inventoryHomeId, obj); };
                a.appendChild(document.createTextNode('Yes'));
                confirmDiv.appendChild(a);
                confirmDiv.appendChild(document.createTextNode(' | '));
                // no link
                a = document.createElement('a');
                a.href = 'javascript:void("")';
                a.onclick = function() { NotebookUtils.removeInventoryHomeCancel(obj); };
                a.appendChild(document.createTextNode('No'));
                confirmDiv.appendChild(a);
                confirmDiv.appendChild(document.createTextNode(' | '));
                // cancel link
                a = document.createElement('a');
                a.href = 'javascript:void("")';
                a.onclick = function() { NotebookUtils.removeInventoryHomeCancel(obj); };
                a.appendChild(document.createTextNode('Cancel'));
                confirmDiv.appendChild(a);
                pObj.appendChild(confirmDiv);
            } else {
                show(confirmDiv);
            }
        }
    },
    // -------------------------- end: removePlanFromNotebook ----------------------------------------------------------

    //removeInvHomeConfirm
    removeInventoryHomeConfirm: function(inventoryHomeId, obj) {
        // display delete confirmation message
        if (obj) {
            var pObj = obj.parentNode;
            var confirmDiv = YUD.getElementsByClassName('NBConfirmDeletePlan', 'div', pObj)[0];
            // if the div is not found, create it
            if (confirmDiv) hide(confirmDiv);
            Pulte08.AjaxWebServices.SavedProductsService.RemoveInventoryHome(inventoryHomeId, NotebookUtils.callBackSaveAndRemove, NotebookUtils.callBackSaveAndRemoveFailed, obj);
        }

    },
    // -------------------------- end: removePlanFromNotebook ----------------------------------------------------------

    //removeInvHomeCancel
    removeInventoryHomeCancel: function(obj) {
        var pObj = obj.parentNode;
        var confirmDiv = YUD.getElementsByClassName('NBConfirmDeletePlan', 'div', pObj)[0];
        if (confirmDiv) hide(confirmDiv);
    },
    // -------------------------- end: removePlanFromNotebook ----------------------------------------------------------

    // callBackSaveCommunity
    callBackSaveAndRemove: function(result, obj) {
        if (result == Pulte08.BusinessServices.User.enumSaveData.SAVE_SUCCESS) {
            NotebookUtils.displayRegMarketingInfo(false);
            myNotebookViewedControl.refreshResult();
            myNotebookSavedControl.refreshResult();
        } else if (result == Pulte08.BusinessServices.User.enumSaveData.SAVE_COOKIE_FULL) {
            NotebookUtils.displayRegMarketingInfo(true);
        } else {
            if (obj) obj.innerHTML = "Error: Remove";
            NotebookUtils.displayRegMarketingInfo(false);
        }
    },
    // --------------------------- end: callBackSaveCommunity ----------------------------------------------------------

    // callBackSaveCommunity
    callBackSaveAndRemoveFailed: function(result, obj) {
        if (obj) obj.innerHTML = "Error: Remove";
    },
    // --------------------------- end: callBackSaveCommunity ----------------------------------------------------------

    //saveNotes
    saveNotes: function(notation, txtBoxId) {
        var notes = document.getElementById(txtBoxId);
        if (notes) {
            Pulte08.AjaxWebServices.SavedProductsService.SaveNotes(notation, notes.value, NotebookUtils.callBackSaveAndDeleteNotes);
        }

    },
    // --------------------------- end: saveNotes ----------------------------------------------------------------------
    //callBackSaveNotes
    callBackSaveAndDeleteNotes: function(result, obj) {
        // display notes save?
    },
    // --------------------------- end: callBackSaveNotes --------------------------------------------------------------

    //callBackSaveNotes
    callBackSaveAndDeleteNotesFailed: function(result, obj) {
        // display notes save?
        if (obj) obj.innerHTML = "Error: Delete Notes";
    },
    // --------------------------- end: callBackSaveNotes --------------------------------------------------------------

    //deleteNotes
    deleteNotes: function(notation, txtBoxId, obj) {
        // display delete confirmation message
        if (obj) {
            var pObj = obj.parentNode;
            var confirmDiv;
            // check if div has been created
            confirmDiv = YUD.getElementsByClassName('NBConfirmDeleteNotes', 'div', pObj)[0];
            // if the div is not found, create it
            if (!confirmDiv) {
                //var removeLink = pObj.getElementsByTagName('a')[0];
                confirmDiv = document.createElement('div');
                confirmDiv.className = 'NBConfirmDeleteNotes';
                confirmDiv.appendChild(document.createTextNode('Delete Notes? '));
                // yes link
                var a = document.createElement('a');
                a.href = 'javascript:void("");'
                a.onclick = function() { NotebookUtils.deleteNotesConfirm(notation, txtBoxId, obj); };
                a.appendChild(document.createTextNode('Yes'));
                confirmDiv.appendChild(a);
                confirmDiv.appendChild(document.createTextNode(' | '));
                // no link
                a = document.createElement('a');
                a.href = 'javascript:void("")';
                a.onclick = function() { NotebookUtils.deleteNotesCancel(obj); };
                a.appendChild(document.createTextNode('No'));
                confirmDiv.appendChild(a);
                confirmDiv.appendChild(document.createTextNode(' | '));
                // cancel link
                a = document.createElement('a');
                a.href = 'javascript:void("")';
                a.onclick = function() { NotebookUtils.deleteNotesCancel(obj); };
                a.appendChild(document.createTextNode('Cancel'));
                confirmDiv.appendChild(a);
                pObj.appendChild(confirmDiv);
            } else {
                show(confirmDiv);
            }
        }
    },
    // --------------------------- end: deleteNotes --------------------------------------------------------------------

    //deleteNotesConfirm
    deleteNotesConfirm: function(notation, txtBoxId, obj) {
        // display delete confirmation message
        if (obj) {
            var pObj = obj.parentNode;
            var confirmDiv = YUD.getElementsByClassName('NBConfirmDeleteNotes', 'div', pObj)[0];
            // if the div is not found, create it
            if (confirmDiv) hide(confirmDiv);
            var notes = document.getElementById(txtBoxId);
            if (notes) {
                notes.value = "";
                Pulte08.AjaxWebServices.SavedProductsService.SaveNotes(notation, "", NotebookUtils.callBackSaveAndDeleteNotes, NotebookUtils.callBackSaveAndRemoveFailed, obj);
            }
        }
    },
    // --------------------------- end: deleteNotesConfirm -------------------------------------------------------------

    //deleteNotesCancel
    deleteNotesCancel: function(obj) {
        var pObj = obj.parentNode;
        var confirmDiv = YUD.getElementsByClassName('NBConfirmDeleteNotes', 'div', pObj)[0];
        if (confirmDiv) hide(confirmDiv);
    },
    // --------------------------- end: deleteNotesCancel --------------------------------------------------------------

    // renderRoundCorner
    renderRoundCorner: function(className) {
        if (getCurrSite() == 'Pulte')
            Rounded(className, 'div', 'all', 'transparent', '#E6F0FB'); // my notebook header bars
        else if (getCurrSite() == 'DelWebb')
            Rounded(className, 'div', 'all', 'transparent', '#E6F0FB'); // my notebook header bars
        else if (getCurrSite() == 'Centex')
            Rounded(className, 'div', 'all', 'transparent', '#F6F6EE'); // my notebook header bars
        else
            Rounded(className, 'div', 'all', 'transparent', '#CEDEBB'); // my notebook header bars
    },
    // -------------------------- end: renderRoundCorner ---------------------------------------------------------------

    // getDirections
    getDirections: function(dirURL) {
        var fastPass = document.getElementById("driveFastPassURL");
        fastPass.value = dirURL;
        document.getElementById('NBDrivingLink').href = dirURL;
        var formDiv = document.getElementById('NBDrivingForm');
        var descDiv = document.getElementById('NBDrivingDesc');
        var loadingDiv = document.getElementById('NBDrivingLoading');
        // hide divs
        hide(formDiv);
        hide(descDiv);
        show(loadingDiv);
        myNotebookPanel.openSubPanel(myNotebookPanel.driveDirections);
        // web service call to check if it is mapable
        Pulte08.AjaxWebServices.SavedProductsService.IsFastPassMappable(dirURL, NotebookUtils.callBackDirections);

    },
    // --------------------------- end: getDirections ------------------------------------------------------------------

    //callBackDirections
    callBackDirections: function(result) {
        var formDiv = document.getElementById('NBDrivingForm');
        var descDiv = document.getElementById('NBDrivingDesc');
        var loadingDiv = document.getElementById('NBDrivingLoading');
        if (result) {
            show(formDiv);
            hide(descDiv);
            hide(loadingDiv);
            document.getElementById("driveAddress").focus();
        } else {
            hide(formDiv);
            show(descDiv);
            hide(loadingDiv);
        }
    },
    // --------------------------- end: callBackDirections -------------------------------------------------------------

    // remove all of the listener via addListener function
    removeCheckboxListeners: function(obj) {
        // remove listeners
        YUE.purgeElement(obj);
        // remove the image listeners
        var img = YUD.getPreviousSibling(obj);
        if (img) {
            YUE.purgeElement(img);
        }
        if (isIE) {
            var inputLabel = YUD.getNextSibling(obj);
            if (inputLabel) {
                YUE.purgeElement(inputLabel);
            }
        }
    },
    // ---------------------------------------- end: removeObjListeners ------------------------------------------------

    // searchByState
    searchByState: function() {
        var state = document.getElementById("preferenceSearchState").value;
        var url;
        url = NOTEBOOKCONFIG.searchURL;

        if (state != "") {
            url += "?state=" + state + '&brand=' + productSearchBrandIds[getCurrSite()];
        } else {
            url += '?brand=' + productSearchBrandIds[getCurrSite()];
        }
        window.location = url;
    },
    //----------------------------------------- end: search by State ---------------------------------------------------

    //togglePanel
    togglePanel: function(trigger, panel, isShow) {

        if (isShow) {
            if (YUD.hasClass(panel, 'hide')) {
                YUD.replaceClass(panel, 'hide', 'show');
                if (trigger.getElementsByTagName('img')[0]) {
                    var newTarget = trigger.getElementsByTagName('img')[0];
                    var newSrc = newTarget.src.replace('plus', 'minus');
                    newTarget.setAttribute('src', newSrc);
                }
            }
        } else {
            if (YUD.hasClass(panel, 'show')) {
                YUD.replaceClass(panel, 'show', 'hide');
                if (trigger.getElementsByTagName('img')[0]) {
                    var newTarget = trigger.getElementsByTagName('img')[0];
                    var newSrc = newTarget.src.replace('minus', 'plus');
                    newTarget.setAttribute('src', newSrc);
                }
            }
        }

    },
    // -------------------------------------- end: togglePanel ---------------------------------------------------------
    //validateAddress
    validateAddress: function(address1, address2, city, state, zip, province, postalCode, country, isInternational) {
        var error_string = "";
        if (address1 != "" || address2 != "" || city != "" || zip != "" || province != "" || postalCode != "") {
            if (address1 == "") error_string += "Please enter a valid Address<br />";
            if (city == "") error_string += "Please enter a valid CITY<br />";
            if (!isInternational) {
                if (zip == "") { error_string += "Please enter a valid ZIP CODE.<br />"; }
                else if (!validateZipStructure(zip)) { error_string += "Please enter a valid ZIP<br />"; }
            } else {
                if (province == "") { error_string += "Please enter a valid Province/Region.<br />"; }
                if (postalCode == "") { error_string += "Please enter a valid Postal Code.<br />"; }
            }
        }
        if (isInternational) {
            if (country == "") error_string += "Please select a valid COUNTRY<br />";
        } else {
            if (state == "") error_string += "Please select a valid STATE<br />";
        }

        return error_string;
    },
    // -------------------------------------- end: validateAddress -----------------------------------------------------
    //validateCountry
    validateCountry: function(state, country, isInternational) {
        var error_string = "";
        if (isInternational) {
            if (country == "") error_string += "Please select a valid COUNTRY<br />";
        } else {
            if (state == "") error_string += "Please select a valid STATE<br />";
        }

        return error_string;
    },
    // -------------------------------------- end: validateCountry -----------------------------------------------------
    validateProfileInfo: function(fName, lName, email, username, password, password2, isHomeOwner, salesNum, salesNum2, origOwnerStatus, noSalesNum, yearsInHome, isProfile) {
        fName = fName.trim();
        lName = lName.trim();
        username = username.trim();
        password = password.trim();
        password2 = password2.trim();
        salesNum = salesNum.trim();
        salesNum2 = salesNum2.trim();
        
        var error_string = "";
        if (fName == "") error_string += 'Please enter a valid FIRST NAME<br />';
        if (lName == "") { error_string += 'Please enter a valid LAST NAME<br />'; } else if (lName.length < 2) { error_string += "Last Name must be at least 2 characters long.<br />"; }
        if (email == "") {
            error_string += 'Please enter a valid EMAIL ADDRESS<br />';
        } else if (!check_email(email)) {
            error_string += 'Please enter a valid EMAIL ADDRESS<br />';
        }
        if (username == "") error_string += 'Please enter a valid USERNAME<br />';

        if ((password == "" || password2 == "") && !isProfile) {
            if (password == "")
                error_string += 'Please enter a valid PASSWORD<br />';
            else
                error_string += 'Please enter a valid CONFIRM PASSWORD<br />';
        } else if (password != "" && password2 != "" && password != password2) {
            error_string += 'The PASSWORDs do not match!<br />';
        } else if (password != "" && (password.length < 5 || password.length > 20)) {
            error_string += 'PASSWORD must be at least 5 characters and up to 20 characters<br />';
        } else if (salesNum != "" && salesNum2 != "" && salesNum != salesNum2 && isHomeOwner) {
            error_string += 'The Agreement ID Numbers do not match!<br />';
        }

        
        if (isHomeOwner != 100 && isHomeOwner == 1 && (yearsInHome=="")) error_string += 'Please select the Years in Home<br />';
        if (isHomeOwner != 100 && isHomeOwner == 1 &&  (origOwnerStatus==-1)) error_string += 'Please tell us if you are the Original Homeowner<br />';
        if (isHomeOwner != 100 && isHomeOwner == 1 && (origOwnerStatus!=-1) && noSalesNum == 100) error_string += "Please tell us if you do or do not have your Agreement ID Number";
        if (isHomeOwner != 100 && isHomeOwner == 1 && noSalesNum == 1 && (origOwnerStatus!=-1) && salesNum=="") error_string += 'Please enter an Agreement ID Number or check \"No\" to \"I have my Agreement ID Number\"<br />';
        
        
        return error_string;
    },
    // --------------------------------------------- end: validateProfileInfo ------------------------------------------
    // validateRealtor
    validateRealtor: function(isRealtor, brokerOffice, brokerId) {
        var error_string = "";
        if (isRealtor) {
            if (brokerOffice == '') error_string += 'Please enter your BROKER OFFICE<br />';
            if (brokerId == '') error_string += 'Please enter your BROKER ID<br />';
        }
        return error_string;
    },
    // --------------------------------------------- end: validateRealtor ----------------------------------------------

    //validatePhoneNumbers
    validatePhoneNumbers: function(phone, fldName) {
        var error_string = "";
        if (!validateUSphoneStructure(phone))
            error_string += "Please enter a valid " + fldName + " Number<br />";
        return error_string;
    },
    // -------------------------------------------- end: validatePhoneNumber -------------------------------------------
    // alignNotebook
    alignNotebook: function() {
        if (myNotebookPanel.overlayPanel) { myNotebookPanel.overlayPanel.align("tr", "tr"); }
        if (myNotebookRegister.overlayPanel) { myNotebookRegister.overlayPanel.align("tr", "tr"); }
        if (myNotebookSignIn.overlayPanel) { myNotebookSignIn.overlayPanel.align("tr", "tr"); }
    },
    // --------------------------------------------- end: alignNotebook ------------------------------------------------
    //createLoadingImg
    createLoadingImg: function() {
        var image = document.createElement('img');
        image.id = 'ajaxSpinner';
        image.setAttribute('alt', 'loading...');
        image.setAttribute('src', '/images/global/spinner.gif');
        return image;
    },
    // --------------------------------------------- end: createLoadingImg ---------------------------------------------

    //saveCommunityToNotebook - from community & plan page
    saveCommunityToNotebook: function(communityId, linkObj, linkCSS) {
        var context = { linkRef: linkObj, cssRef: "" };
        if (typeof linkCSS != "undefined") {
            context.cssRef = linkCSS;
        }
        
        var thisClickedId = "NotebookSaveCommunity" + " - " + communityId.toString()
        var sOldPageName = s.pageName;
        s.pageName = s.pageName + " - " + thisClickedId;
        s.tl("true", "o", thisClickedId);
        s.pageName = sOldPageName;

        Pulte08.AjaxWebServices.SavedProductsService.SaveCommunity(communityId, NotebookUtils.callBackSaveToNotebookSuccess, NotebookUtils.callBackSaveToNotebookFailed, context);
    },
    // --------------------------------------------- end: saveCommunityToNotebook --------------------------------------
    //saveCommunityToNotebook - from search-map.aspx
    saveCommunityToNotebookFromSearch: function (communityId, linkObj) {
        var linkCSS = "community_listing";
        var context = { linkRef: linkObj, cssRef: "" };
        if (typeof linkCSS != "undefined") {
            context.cssRef = linkCSS;
        }

        var thisClickedId = "NotebookSaveCommunity" + " - " + communityId.toString()
        var sOldPageName = s.pageName;
        s.pageName = s.pageName + " - " + thisClickedId;
        if (typeof setContentGroup == 'function') {
            setContentGroup(communityId);
        }
        s.tl("true", "o", thisClickedId);
        s.pageName = sOldPageName;
        if (typeof resetContentGroup == 'function') {
            resetContentGroup();
        }

        Pulte08.AjaxWebServices.SavedProductsService.SaveCommunity(communityId, NotebookUtils.callBackSaveToNotebookSuccess, NotebookUtils.callBackSaveToNotebookFailed, context);
    },

    // savePlanToNotebook - from community & plan page
    savePlanToNotebook: function(planId, linkObj, linkCSS) {
        var context = { linkRef: linkObj, cssRef: "" };
        if (typeof linkCSS != "undefined") {
            context.cssRef = linkCSS;
        }
        
        var thisClickedId = "NotebookSavePlan" + " - " + planId.toString()
        var sOldPageName = s.pageName;
        s.pageName = s.pageName + " - " + thisClickedId;
        s.tl("true", "o", thisClickedId);
        s.pageName = sOldPageName;

        Pulte08.AjaxWebServices.SavedProductsService.SavePlan(planId, NotebookUtils.callBackSaveToNotebookSuccess, NotebookUtils.callBackSaveToNotebookFailed, context);
    },
    // --------------------------------------------  end: savePlanToNotebook -------------------------------------------

    //saveInventoryHomeToNotebook
    saveInventoryHomeToNotebook: function(homeId, linkObj, linkCSS) {
        var context = { linkRef: linkObj, cssRef: "" };
        if (typeof linkCSS != "undefined") {
            context.cssRef = linkCSS;
        }
        Pulte08.AjaxWebServices.SavedProductsService.SaveInventoryHome(homeId, NotebookUtils.callBackSaveToNotebookSuccess, NotebookUtils.callBackSaveToNotebookFailed, context);
    },
    // --------------------------------------------- end: saveInventoryHomeToNotebook ----------------------------------

    // callBackSaveCommunityAndPlan
    callBackSaveToNotebookSuccess: function(result, context) {
        if (result == Pulte08.BusinessServices.User.enumSaveData.SAVE_SUCCESS) {
            //alert(context.linkRef.id);
            if (context.linkRef.id.substr(0, 4) == "inv_") {
                context.linkRef.innerHTML = "<a href='javascript:void();' class='" + context.cssRef + "'>Saved</a>";
            } else {
                if (context.linkRef.id == "_saveToNotebookFromSearch") {
                    context.linkRef.innerHTML = "<a href='javascript:void();' class='" + context.cssRef + "'>Saved</a>";
                } else {
                    context.linkRef.innerHTML = "Saved";
                }
            }
            var curCSS = context.linkRef.className;
            if (context.cssRef != "") {
                if (context.linkRef.id.substr(0, 4) != "inv_" && context.linkRef.id != "_saveToNotebookFromSearch") {
                    YUD.replaceClass(context.linkRef, curCSS, context.cssRef); //  gives an error, so class is set as a part of innerHTML above (AG 03/25/10)
                }
            }
        } else if (result == Pulte08.BusinessServices.User.enumSaveData.SAVE_COOKIE_FULL) {
            location.href = "#content";
            loadFullControl('wait');
            myNotebookPanel.openPanel();
            NotebookUtils.displayRegMarketingInfo(true);
        } else {
            context.linkRef.innerHTML = "Error: Save To Notebook";
        }
    },
    // --------------------------------------------- end: callBackSaveCommunityAndPlan ---------------------------------
    // callBackSaveCommunityAndPlan
    callBackSaveToNotebookFailed: function(result, context) {
        context.linkRef.innerHTML = "Error: Save To Notebook";
    }
    // --------------------------------------------- end: callBackSaveCommunityAndPlan ---------------------------------

};
//----------------------------------------------------------------------------------------------------------------------
//-------------------------------------- end: NotebookUtils ------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------






// ----------------------------------------------------------------------------------------------
// ----------------------------------- AJAX ECMA CLIENT FUNCTIONS -------------------------------
// ----------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------
// ------------------------------ TELL A FRIEND AJAX FUNCTIONS ----------------------------------
// ----------------------------------------------------------------------------------------------

// calls the web service method 
function SendToAFriend(){

	var siteID;
	if (getCurrSite()=='Pulte') {siteID=1}
	else if (getCurrSite() == 'DelWebb') { siteID = 2 }
	else if (getCurrSite() == 'DiVosta') { siteID = 3 }
	else {siteID=4};

	var communityID = document.getElementById('communityID').value;
	var homePlanID = 0;
	if (document.getElementById('planID')!=null) homePlanID = document.getElementById('planID').value;

	var friendsEmail = document.getElementById('tellFriendEmail');
	var yourFirstName = document.getElementById('tellYourFirstName');
	var yourLastName = document.getElementById('tellYourLastName');
	var yourEmail = document.getElementById('tellYourEmail');
	var sendMeACopy = document.getElementById('tellSendCopy');
	var message = document.getElementById('tellYourMessage');

	if (validate_taf() == true) Pulte08.AjaxWebServices.TellAFriendService.SendTellAFriend(siteID,communityID,homePlanID,friendsEmail.value,yourFirstName.value,yourLastName.value,yourEmail.value,sendMeACopy.checked,message.value,OnEmailSent);
}

// web service method callback
function OnEmailSent(result){
	populateEmails();
	YUD.getElementsByClassName('tellFriendContent','div')[0].style.display = 'none';
	YUD.getElementsByClassName('tellFriendThankYou','div')[0].style.display = 'block';
	var RsltElem = document.getElementById('Results');
	if (result != 'Success') {
	    YUD.getElementsByClassName('tellFriendThankYou','h2')[0].innerHTML = '<span class="ajaxError">The server did not respond. Please try again later...</span>';
	}
	else {
        s.events = "event33";
        trackClicks("TellAFriendSent");
        s.events = "";
	}
	    
	return false;
}
//contact us button from pultegroup page
function listen_submitSoftJoinPulteGroupInc() {
    $("#LandingSignUpForm").validate({
        submitHandler: function(form) {
                var siteID;
                if (getCurrSite() == 'Pulte') { siteID = 1 }
                else if (getCurrSite() == 'DelWebb') { siteID = 2 }
                else if (getCurrSite() == 'DiVosta') { siteID = 3 }
                else { siteID = 4 };

                //var communityID = document.getElementById('communityID').value;
                var homePlanID = 0;
                if (document.getElementById('planID') != null) homePlanID = document.getElementById('planID').value;

                var friendsEmail = 'Judy.campernel@pultegroup.com';
                var yourFirstName = document.getElementById('landingFirstName');
                var yourLastName = document.getElementById('landingLastName');
                var yourEmail = document.getElementById('landingEmail');
                //var sendMeACopy = document.getElementById('tellSendCopy');
                var message = document.getElementById('message');
                var phone1 = document.getElementById('primaryPhone1');
                var phone2 = document.getElementById('primaryPhone2');
                var phone3 = document.getElementById('primaryPhone3');
                var formattedMSG = phone1.value+'-'+phone2.value+'-'+phone3.value+'<br>'+message.value;
                //if (validate_taf() == true) Pulte08.AjaxWebServices.TellAFriendService.SendTellAFriend(4, 2147, homePlanID, friendsEmail.value, yourFirstName.value, yourLastName.value, yourEmail.value, false, message.value, OnEmailSent);
                Pulte08.AjaxWebServices.TellAFriendService.SendTellAFriend(5, 2147, homePlanID, friendsEmail, yourFirstName.value, yourLastName.value, yourEmail.value, false,formattedMSG, OnEmailPulteGroupSent);

        } //submit handler end

    });                  // validate end

}
 
 function OnEmailPulteGroupSent(result){
	//populateEmails();
	//YUD.getElementsByClassName('tellFriendContent','div')[0].style.display = 'none';
	//YUD.getElementsByClassName('tellFriendThankYou','div')[0].style.display = 'block';
	$("#PGISoftJoinPopUpContent").hide();
	$("#thankyouSJ").show();
	var RsltElem = document.getElementById('Results');
	if (result != 'Success') {
	    alert('The server did not respond. Please try again later.');
	}
	//else {
    //    s.events = "event33";
    //    trackClicks("TellAFriendSent");
     //   s.events = "";
	//}
	    
	return false;
}
    
// populate page title into tell a friend form
var populateEmails = function() {
	var data = document.tell.tellFriendEmail.value;
	var target = document.getElementById('tellFriend').getElementsByTagName('address')[0];
	target.innerHTML = data;
}

// ----------------------------------------------------------------------------------------------
// ---------------------------- END TELL A FRIEND -----------------------------------------------
// ----------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------
// --------------------------------- GeoLocation via IPInfoDB -----------------------------------
// ----------------------------------------------------------------------------------------------

var geoUtils = {

  getRegionByIP:function(onGeoData) {
    $.getJSON("http://api.ipinfodb.com/v2/ip_query.php?output=json&callback=?&key=c8396475f26b5b977fb0fe95819c1009026aa00918cc757251be7396a6ef1895&timezone=false", function(geoData) {
      onGeoData(geoData['RegionName']);
    });
  },

  getZipByIP:function() {
    $.getJSON("http://api.ipinfodb.com/v2/ip_query.php?output=json&callback=?&key=c8396475f26b5b977fb0fe95819c1009026aa00918cc757251be7396a6ef1895&timezone=false", function(geoData) {
      alert(geoData['Latitude']+","+geoData['Longitude']);
    });
  },

  getRegionIDByIP:function(passResultToFunction) {
    $.getJSON("http://api.ipinfodb.com/v2/ip_query.php?output=json&callback=?&key=c8396475f26b5b977fb0fe95819c1009026aa00918cc757251be7396a6ef1895&timezone=false", function(geoData) {
      //alert(geoData['Latitude']+","+geoData['Longitude']);
      lat = geoData['Latitude'];
      lng = geoData['Longitude'];
      /*
      // austin area - zip=78737
      lat = 30.1775093; lng = -97.9626159;
      // st louis zip=62269
      lat = 38.5981674; lng = -89.8716316;
      // michigan zip=48076
      lat = 42.4969749;  lng = -83.2322959;   
      */

      Pulte08.AjaxWebServices.MapService.GetRegionIDForLocationBrand(getCurrBrandID(),lat,lng, passResultToFunction );
    });
  },
  
  getCityByIP:function() {
  },
  
  getLatLongByIP:function() {
  }
  
}
/**
* @module PULTE13
*/
var PULTE13 = {
    /**
   * 
   * Utilities
   * @namespace PULTE13
   * @class utils
   */
    utils: {
        /**
       *
       * Scroll the page
       * @method scrollPageTo
       * @param {string} identifier id or class name (be sure to put # or . in string (respectively))
       * @param {number} topPadding=0 amount in pixels to move the window above the targeted identifier
       * @param {number} speed=1000 number of milliseconds the scroll should take
       */
        scrollPageTo: function (identifier, topPadding, speed) {
            if (topPadding == undefined) {
                topPadding = 0;
            }
            if (speed == undefined) {
                speed = 1000;
            }
            if (identifier !== undefined || identifier !== "") {
                var moveTo = $(identifier).offset().top - topPadding;

                $('html, body').stop().animate({
                    scrollTop: moveTo
                }, speed);
            }
        },
        /**
Get an array of URL params 
 
    http://www.example.com/?me=myValue&name2=SomeOtherValue
          {
             "me"    : "myValue",
             "name2" : "SomeOtherValue"
          }
            var first = getUrlVars()["me"]; // return value of "me"
            var second = getUrlVars()["name2"]; // return value of 'name'
        
 @method getUrlVars
 @return {Array} var : value
        */
        getUrlVars: function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
    }
}
