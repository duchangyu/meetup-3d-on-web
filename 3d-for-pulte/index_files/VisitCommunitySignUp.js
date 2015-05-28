

/* visit community Sign Up */
var VisitSignUp = {

    thankYouDiv: null,
    formDiv: null,

    initialize: function() {
        //alert("initialize");
        var body = document.getElementsByTagName('body')[0];
        //if ((body.className != 'template-D' && body.className != 'template-E' && body.className != 'template-N' && body.className != 'template-R' && body.className != 'template-F') || !document.visitSignUpForm) return;
        //populateCountryOptions(document.visitSignUpForm);
        VisitSignUp.thankyouDiv = document.getElementById('thankyouReg');
        VisitSignUp.formDiv = document.getElementById('formWrapperReg');
        var visitSubmit = document.getElementById('visitSubmit');
        if (visitSubmit) {
            YUE.addListener(visitSubmit, "click", VisitSignUp.submitSignUp);
        }
        var comID = -1;
        if (document.visitSignUpForm.landingComID) {  // it doesn't exist on master community page
            comID = parseInt(document.visitSignUpForm.landingComID.value);
        }
        if (window.signedInUser != null) {
            if (signedInUser.UserID != 0) {
                VisitSignUp.callBackInitialize(signedInUser);
            }
        }
        else {
            Pulte08.AjaxWebServices.CommunitySoftJoinService.GetUserDetails(comID, VisitSignUp.callBackInitialize);
        }
    },

    callBackInitialize: function(result) {
        // 1) if community has been submitted, display thank you
        // 2) if user entered data and not login, get user  data
        //alert("callBackInitialize"); alert(result.signUpFlag);
        if (!result) return;
        if (result.signUpFlag) {
            var confirmName = document.getElementById('thankyouNameReg');
            if (confirmName) confirmName.innerHTML = result.user.FirstName;
            visitSignUpForm.toggleThankYou(true);
        } else {
            //alert(result.FirstName); alert(result.user);
            if (result.user && result.user.FirstName != null) {
                document.visitSignUpForm.firstName.value = result.user.FirstName;
                document.visitSignUpForm.lastName.value = result.user.LastName;
                document.visitSignUpForm.email.value = result.user.Email;
                document.visitSignUpForm.state.value = result.user.StateAbbreviation;
            } else if (result.FirstName != null) {
                document.visitSignUpForm.firstName.value = result.FirstName;
                document.visitSignUpForm.lastName.value = result.LastName;
                document.visitSignUpForm.email.value = result.Email;
                document.visitSignUpForm.state.value = result.StateAbbreviation;
            }
        }
    },

    validateSignUp: function(fName, lName, email, state, phone1, phone2, phone3) {
        document.getElementById("visitFormError").innerHTML = "";
        var validity = true;
        var error_string = "";
        var errorConsole = YUD.getElementsByClassName('alertBar', '', document.visitSignUpForm)[0];

        if (fName == "") {
            validity = false;
            YUD.addClass(document.visitSignUpForm.firstName, 'error');
            error_string += '<li>Please enter a valid FIRST NAME</li>';
        } else { YUD.removeClass(document.visitSignUpForm.firstName, 'error'); }

        if (lName.length < 2) { // must be at least two characters
            validity = false;
            YUD.addClass(document.visitSignUpForm.lastName, 'error');
            error_string += '<li>Please enter a valid LAST NAME</li>';
        } else { YUD.removeClass(document.visitSignUpForm.lastName, 'error'); }

        if (state == "") {
            validity = false;
            YUD.addClass(document.visitSignUpForm.state, 'error');
            error_string += '<li>Please select a STATE</li>';
        } else { YUD.removeClass(document.visitSignUpForm.state, 'error'); }

        if (!check_email(email)) {
            validity = false;
            YUD.addClass(document.visitSignUpForm.email, 'error');
            error_string += '<li>Please enter a valid EMAIL</li>';
        } else { YUD.removeClass(document.visitSignUpForm.email, 'error'); }

        if (phone1 != '' || phone2 != '' || phone3 != '') {
            if (!check_usPhoneThree(phone1) || !check_usPhoneThree(phone2) || !check_usPhoneFour(phone3)) {
                validity = false;
                document.getElementById("phone_input_container").setAttribute("class", "phone_input_container error");
                //YUD.addClass(document.visitSignUpForm.phone_input_container, 'error');
                error_string += '<li>Please enter a valid PHONE NUMBER</li>';
            }
            else { document.getElementById("phone_input_container").setAttribute("class", "phone_input_container"); }
        }
        else { document.getElementById("phone_input_container").setAttribute("class", "phone_input_container"); }

        if (!validity) {
            // display error
            YUD.replaceClass(errorConsole, 'hide', 'show');
            displayError('visitFormError', error_string);
        }
        return validity;
    },

    submitSignUp: function() {
        //alert("VisitCommunitySignUp.js - submitSignUp()");
        var brandID = getCurrBrandID();
        var isInternational = false;
        var fName = document.visitSignUpForm.firstName.value;
        var lName = document.visitSignUpForm.lastName.value;
        var email = document.visitSignUpForm.email.value;
        var state = document.visitSignUpForm.state.value;
        var phone1 = document.visitSignUpForm.primaryPhone1.value;
        var phone2 = document.visitSignUpForm.primaryPhone2.value;
        var phone3 = document.visitSignUpForm.primaryPhone3.value;
        var country = "US";
        var comIDs = [];
        var communityName = document.visitSignUpForm.communityName.value;
        var message = "";
        if (document.visitSignUpForm.landingComID) {
            comIDs[0] = parseInt(document.visitSignUpForm.landingComID.value);
        }
        var validity = VisitSignUp.validateSignUp(fName, lName, email, state, phone1, phone2, phone3);
        if (validity) {
            ajaxLoading('submitVisitSignUpReg', 'submit', 'start');
            var confirmName = document.getElementById('thankyouNameReg');
            if (confirmName) confirmName.innerHTML = fName;
            var siteID = productSearchBrandIds[getCurrSite()];
            var isLoggedIn = NotebookUtils.getSignInStatus();


            var updateProfile = false;  // we are not updating profile from Sign Up form

            var campaignTitle = "Explore " + communityName + " Today";
            var campaignEmailAddress = "@VisitCommunityEmailRecipient"; // "agorodinsky@pulte.com";
            var questionText = "";
            var numberOfAnswers = 0;
            var answer = "";


            Pulte08.AjaxWebServices.SignUpService.ProcessSignUp(brandID,
	          fName, lName, email, "", "", "", state,
	          "", phone1, phone2, phone3, "", "", "", isInternational,
	          country, country, "", "", "", "", updateProfile,
	          campaignTitle, campaignEmailAddress, answer,
	          VisitSignUp.callBackSubmitSuccess, VisitSignUp.callBackSubmitFailed);


        }
    },

    callBackSubmitSuccess: function(result) {
        var errorConsole = YUD.getElementsByClassName('alertBar', '', document.visitSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        ajaxLoading('submitVisitSignUpReg', 'submit', 'stop');
        if (result == "") {

            if (YUD.hasClass(errorConsole, 'show')) YUD.replaceClass(errorConsole, 'show', 'hide');
            //if ((window.regionOffer_fName != null) || (window.rh_fName != null)) {
            // we are on the region offers or region inventory homes page, show thank you
            VisitSignUp.toggleThankYou(true);
            //pointrollLeadSubmit();
            //}


            if (typeof (s) == 'object')
                if (s) {
                var sOldPageName = s.pageName;
                s.pageName = 'Contact-ThankYou';
                if (sOldPageName.length > 0) {
                    if (sOldPageName.indexOf(" - index") > 0)
                        sOldPageName = sOldPageName.replace(" - index", "")
                    s.pageName = sOldPageName + " - Contact-ThankYou"
                }

                s.events = "event2"
                s.eVar1 = "contact us";
                s.eVar8 = "Explore";
                if (document.visitSignUpForm.landingComID) {
                    s.eVar6 = document.visitSignUpForm.landingComID.value;
                }
                s.t();
                s.eVar6 = "";
                s.eVar8 = "";
                s.eVar1 = "";
                s.events = "None"
                s.pageName = sOldPageName;

            }


        }
        else {
            YUD.replaceClass(errorConsole, 'hide', 'show');
            displayError('landingFormError', result);
        }
    },

    callBackSubmitFailed: function(result) {
        var errorConsole = YUD.getElementsByClassName('alertBar', '', document.visitSignUpForm)[0];
        var error_string = "<li>There was a server error. Please try again later...</li>";
        YUD.replaceClass(errorConsole, 'hide', 'show');
        displayError('landingFormError', error_string);
    },

    toggleThankYou: function(isThankYou) {
        //alert(isThankYou);
        if (isThankYou) {
            var thankyou = document.getElementById("thankyouReg");
            thankyou.style.display = "block";
            /*
            if (YUD.hasClass('thankyouRegWrapper', 'hide')) {
            alert("hide");
            YUD.replaceClass('thankyouRegWrapper', 'hide', 'show');
            } else {
            YUD.addClass('thankyouRegWrapper', 'show');
            }
            */
            if (!YUD.hasClass('formWrapperReg', 'hide')) {
                if (YUD.hasClass('formWrapperReg', 'show'))
                    YUD.replaceClass('formWrapperReg', 'show', 'hide');
                else
                    YUD.addClass('formWrapperReg', 'hide');
            }
        } else {
            if (YUD.hasClass('thankyouRegWrapper', 'show')) { YUD.replaceClass('thankyouRegWrapper', 'show', 'hide'); }
            if (YUD.hasClass('formWrapperReg', 'hide')) { YUD.replaceClass('formWrapperReg', 'hide', 'show'); }
        }
    }

}


YUE.onDOMReady(function() {
       VisitSignUp.initialize();
});
