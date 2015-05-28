// ----------------------------------------------------------------------------------------------
// ----------------------------------- USER FUNCTIONS -------------------------------------------
// ----------------------------------------------------------------------------------------------


var show = YAHOO.UIfunctions.show;
var hide = YAHOO.UIfunctions.hide;

var NOTEBOOKCONFIG = {
    viewedSubPanel: {trigger: "RecentCommunitiesTrigger", panel: "notebookSubPanelViewed"},
    savedSubPanel: {trigger: "SavedCommunitiesTrigger", panel: "notebookSubPanelSaved"},
    profileSubPanel: {trigger: "ProfileTrigger", panel: "notebookSubPanelProfile"},
    profileSectionPreference: "profileSearchPreference",
    searchURL: "/find-a-home/search.aspx"
};

// window resize function
// myOverlay.align("tr", "bl");

var openedNotebookSection;

//myNotebookPanel
var myNotebookPanel = {
    overlayPanel: null,
    xPos: 0,
    targets: null,
    eventsInit: false,
    driveDirections: null,
    directionsTrigger: null,
    directionLink: null,
    directionError: null,
    notebookShare: null,
    shareTrigger: null,
    errorMessageArea: null,
    emailFriendError: null,
    compareError: null,
    profileError: null,
    sendLink: null,
    compareLink: null,
    profileLink: null,
    notebookShareThanks: null,
    notebookCompare: null,
    compareTrigger: null,
    closeDialog: null,
    closeLink: null,
    cancelLink: null,
    allSubPanels: null,
    //initVars
    initVars: function() {
        // Build overlay based on markup
        this.overlayPanel = new YAHOO.widget.Overlay('myNotebook', { context: ["notebookAnchor", "tr", "tr"], 'width': 432, 'visible': false, 'zIndex': 1000 });
        this.overlayPanel.render();
        YAHOO.widget.Overlay.windowResizeEvent.subscribe(NotebookUtils.alignNotebook, this.overlayPanel, true);
        this.targets = YUD.getElementsByClassName('myNotebookTrigger');
        this.eventsInit = false;
        this.driveDirections = document.getElementById('notebookDriveDirections');
        this.directionsTrigger = YUD.getElementsByClassName('directionsTrigger', null, 'myNotebook');
        this.directionLink = YUD.getElementsByClassName('directionsLink', null, 'myNotebook');
        this.notebookShare = document.getElementById('notebookShare');
        this.shareTrigger = YUD.getElementsByClassName('shareTrigger', null, 'myNotebook');
        this.errorMessageArea = YUD.getElementsByClassName('errorMessageArea', null, 'myNotebook');
        this.emailFriendError = document.getElementById('emailFriendErrorMessage');
        this.compareError = document.getElementById('compareErrorMessage');
        this.profileError = document.getElementById('profileErrorMessage');
        this.directionError = document.getElementById('profileDriveErrorMessage');
        this.sendLink = YUD.getElementsByClassName('sendLink', null, 'myNotebook');
        this.compareLink = YUD.getElementsByClassName('compareLink', null, 'myNotebook');
        this.profileLink = YUD.getElementsByClassName('profileLink', null, 'myNotebook');
        this.notebookShareThanks = document.getElementById('notebookShareThanks');
        this.notebookCompare = document.getElementById('notebookCompare');
        this.compareTrigger = YUD.getElementsByClassName('compareTrigger', null, 'myNotebook');
        this.closeDialog = YUD.getElementsByClassName('myNotebookClose', null, 'myNotebook');
        this.closeLink = YUD.getElementsByClassName('closeLink', null, 'myNotebook');
        this.cancelLink = YUD.getElementsByClassName('cancelLink', null, 'myNotebook');
        this.allSubPanels = [this.notebookShare, this.notebookShareThanks, this.notebookCompare, this.driveDirections];
    },
    // ---------------------------------------- end: initVars ----------------------------------------------------------
    //openPanel
    openPanel: function() {
        hide(this.allSubPanels);
        modalBackdrop.show();
        YUD.setStyle(document.getElementById('modalDialog'), 'height', Math.max(YUD.getViewportHeight(), document.body.scrollHeight) + 'px');
        if (openedNotebookSection) {
            openedNotebookSection.hide();
        }
        // collapse all the subsections
        var subSections = [NOTEBOOKCONFIG.profileSubPanel, NOTEBOOKCONFIG.viewedSubPanel, NOTEBOOKCONFIG.savedSubPanel];
        for (var i = 0; i < subSections.length; i++) {
            var trigger = document.getElementById(subSections[i].trigger);
            var panel = document.getElementById(subSections[i].panel);
            NotebookUtils.togglePanel(trigger, panel, false);
        }
        NotebookUtils.displayRegMarketingInfo(false);
        openedNotebookSection = this.overlayPanel;
        this.overlayPanel.show();
    },
    // ---------------------------------------- end: openPanel ---------------------------------------------------------

    // closePanel
    closePanel: function() {
        hide(this.allSubPanels);
        this.overlayPanel.hide();
        modalBackdrop.hide();
    },
    //----------------------------------------- end: closePanel --------------------------------------------------------

    //openSubPanel
    openSubPanel: function(panelObj) {
        hide(this.allSubPanels);
        show(panelObj);
    },
    // ---------------------------------------- end: openSubPanel ------------------------------------------------------

    // submitShare
    submitShare: function() {
        var validity = true;
        var error_string = '';
        var shareSendTo = document.getElementById('shareFriendEmail').value;
        var shareSendFrom = document.getElementById('shareEmail').value;
        var checkValues = "";
        var selectedInfo = [];

        if (shareSendTo.trim() == '') {
            validity = false;
            error_string += 'Please enter a valid FRIEND\'s EMAIL ADDRESS<br />';
        } else if (shareSendTo.indexOf(",") > -1) {
            var emails = shareSendTo.split(",");
            var isValidEmail = true;
            for (var i = 0; i < emails.length; i++) {
                if (!check_email(emails[i].trim())) {
                    isValidEmail = false;
                    break;
                }
            }
            if (!isValidEmail) {
                validity = false;
                error_string += 'Please enter a valid FRIEND\'s EMAIL ADDRESS<br />';
            }
        } else if (!check_email(shareSendTo)) {
            // if it is multiple email address
            validity = false;
            error_string += 'Please enter a valid FRIEND\'s EMAIL ADDRESS<br />';
        }

        if (shareSendFrom == '') {
            validity = false;
            error_string += 'Please enter a valid EMAIL ADDRESS<br />';
        } else if (!check_email(shareSendFrom)) {
            validity = false;
            error_string += 'Please enter a valid EMAIL ADDRESS<br />';
        }

        var itemsCount = 0;
        var inputs = YUD.getElementsByClassName('styleInput', 'input', 'notebookShare');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('type') == 'checkbox' && inputs[i].checked && inputs[i].id != 'shareSendCopy') {
                checkValues += (checkValues == "") ? (inputs[i].value) : ("," + inputs[i].value);
                itemsCount++;
            }
        }

        if (itemsCount > 0) {
            // get the UL List
            var ul = YUD.getChildren("shareCheckboxList")[0];
            var comList = YUD.getChildren(ul);
            var cInfo, fld, sLabel;

            for (var i = 0; i < comList.length; i++) {
                cInfo = new Object;
                cInfo.community = "";
                cInfo.plans = [];
                sLabel = comList[i].getElementsByTagName("label")[0];
                if (sLabel)
                    cInfo.community = sLabel.innerHTML;
                // we got plans
                var planList = comList[i].getElementsByTagName("li");
                if (planList.length > 0) {
                    for (var k = 0; k < planList.length; k++) {
                        fld = planList[k].getElementsByTagName("input")[0];
                        if (fld) {
                            if (fld.checked) {
                                sLabel = planList[k].getElementsByTagName("label")[0];
                                if (sLabel) {
                                    cInfo.plans.push(sLabel.innerHTML);
                                }
                            }
                        }
                    }
                }
                fld = comList[i].getElementsByTagName("input")[0];
                // if community is checked or plan is checked within the community are
                if (fld.checked || cInfo.plans.length > 0) {
                    selectedInfo.push(cInfo);
                }
            }

        }

        if (itemsCount == 0) {
            validity = false;
            error_string += 'Please select a COMMUNITY or PLAN<br />';
        }
        // if there is an error_string, display the following.
        if (!validity) {

            myNotebookPanel.emailFriendError.innerHTML = error_string;
            show(myNotebookPanel.emailFriendError.parentNode);

        } else {
            // form validated, goto next step.
            myNotebookPanel.emailFriendError.innerHTML = "";
            var fName = escape(document.getElementById("shareFirstName").value);
            var lName = escape(document.getElementById("shareLastName").value);
            var msg = escape(document.getElementById("shareYourMessage").value);
            // update thank you page info with our data
            document.getElementById("sharedRecipients").innerHTML = shareSendTo;
            var sendCopy = document.getElementById("shareSendCopy").checked;

            var content = "We sent <br />";
            for (var i = 0; i < selectedInfo.length; i++) {
                content += "<strong>" + selectedInfo[i].community + "</strong> ";
                if (selectedInfo[i].plans.length > 0) {
                    content += " including ";
                    for (var k = 0; k < selectedInfo[i].plans.length; k++) {
                        if (k > 0) {
                            if (k == (selectedInfo[i].plans.length - 1)) content += " and ";
                            else content += ", ";
                        }
                        content += "<strong>" + selectedInfo[i].plans[k] + "</strong>";
                    }
                    content += "<br />";
                }
                content += "<br />";
            }
            content += "to your friends &mdash;";
            document.getElementById("sharedCommunitiesAndPlans").innerHTML = content;
            myNotebookPanel.emailFriendError.innerHTML = "";
            hide(myNotebookPanel.emailFriendError.parentNode);
            ajaxLoading('notebookShareSubmitDiv', 'sendLink', 'start');
            Pulte08.AjaxWebServices.SavedProductsService.SendSharedEmail(shareSendTo, fName, lName, shareSendFrom, sendCopy, checkValues, msg, myNotebookPanel.callBackShare);
        }
    },
    // ----------------------------------------- end: submitShare ------------------------------------------------------

    //callBackShare
    callBackShare: function(result) {
        // is send is success
        if (result) {
            hide(myNotebookPanel.allSubPanels);
            // reset the send to field and message
            document.getElementById('shareFriendEmail').value = "";
            document.getElementById("shareYourMessage").value = "";
            var sendCopy = document.getElementById("shareSendCopy");
            sendCopy.checked = false;
            var controlImg = YUD.getPreviousSibling(sendCopy);
            controlImg.src = returnCheckboxImgFalse('regRealtor');
            show(myNotebookPanel.notebookShareThanks);
        } else {
            myNotebookPanel.emailFriendError.innerHTML = "The system cannot send your message. Please try again later";
            show(myNotebookPanel.errorMessageArea);
        }
        ajaxLoading('notebookShareSubmitDiv', 'sendLink', 'end');
    },
    // ---------------------------------------- end: callBackShare -----------------------------------------------------
    //loadShareHTML
    loadShareHTML: function(result) {

        var div = document.getElementById("shareCheckboxList");
        if (!div) return;
        // remove the current listener
        var checkboxes = YUD.getElementsByClassName("styleInput", "input", div);
        for (var i = 0; i < checkboxes.length; i++) {
            NotebookUtils.removeCheckboxListeners(checkboxes[i]);
        }
        div.innerHTML = result;
        checkboxes = YUD.getElementsByClassName("styleInput", "input", div);
        for (var i = 0; i < checkboxes.length; i++) {
            CheckboxRadioStyle.addCheckboxStyle(checkboxes[i], i);
        }

        // add new event listener
        myNotebookPanel.openSubPanel(myNotebookPanel.notebookShare);
        document.getElementById("shareFriendEmail").focus();
    },
    // ----------------------------------------- end: loadShareHTML ----------------------------------------------------

    //loadCompareHTML
    loadCompareHTML: function(result) {

        // remove event listener first from styleInput
        var div = document.getElementById("compareCheckboxList");
        if (!div) return;
        var checkboxes = YUD.getElementsByClassName("styleInput", "input", div);
        for (var i = 0; i < checkboxes.length; i++) {
            NotebookUtils.removeCheckboxListeners(checkboxes[i]);
        }
        div.innerHTML = result;
        checkboxes = YUD.getElementsByClassName("styleInput", "input", div);
        for (var i = 0; i < checkboxes.length; i++) {
            CheckboxRadioStyle.addCheckboxStyle(checkboxes[i], i, true);
        }
        myNotebookPanel.openSubPanel(myNotebookPanel.notebookCompare);

    },
    // ----------------------------------------- end: loadCompare HTML -------------------------------------------------

    //trackCompareCheckbox
    trackCompareCheckbox: function() {
        var checkboxes = YUD.getElementsByClassName("styleInput", "input", "compareCheckboxList");
        var controlImg;

        var count = myNotebookPanel.countCompareCheckbox(true);

        if (count == 4) {
            // disable
            for (var i = 0; i < checkboxes.length; i++) {
                if (!checkboxes[i].checked) {
                    controlImg = YUD.getPreviousSibling(checkboxes[i]);
                    checkboxes[i].disabled = true;
                    controlImg.src = '/images/' + getCurrSite() + '/button-checkboxDisabled.gif';
                }
            }
        } else {

            for (var i = 0; i < checkboxes.length; i++) {
                if (!checkboxes[i].checked) {
                    // if disabled, enable it
                    if (checkboxes[i].disabled) {
                        controlImg = YUD.getPreviousSibling(checkboxes[i]);
                        checkboxes[i].disabled = false;
                        controlImg.src = returnCheckboxImgFalse('regRealtor');
                    }
                }
            }
        }
    },
    // ------------------------------------------ end: trackCompareCheckbox --------------------------------------------

    //countCompareCheckbox
    countCompareCheckbox: function(isCount) {
        var ul = YUD.getChildren("compareCheckboxList")[0];
        var comList = YUD.getChildren(ul);
        var cInfo, fld;
        var count = 0;
        var vals = "";

        for (var i = 0; i < comList.length; i++) {
            cInfo = new Object;
            cInfo.community = comList[i].getElementsByTagName("input")[0];
            cInfo.plans = [];
            // we got plans
            var planList = comList[i].getElementsByTagName("li");
            if (planList.length > 0) {
                for (var k = 0; k < planList.length; k++) {
                    fld = planList[k].getElementsByTagName("input")[0];
                    if (fld && fld.checked) {
                        cInfo.plans.push(fld); count += 1;
                        vals += (vals != "") ? ("," + fld.value) : fld.value;
                    }
                }
            }
            if (cInfo.plans.length > 0) {
                if (!cInfo.community.checked) {
                    cInfo.community.checked = true;
                    var controlImg = YUD.getPreviousSibling(cInfo.community);
                    controlImg.src = returnCheckboxImgTrue('regRealtor');
                }
            } else {
                if (cInfo.community.checked) {
                    count += 1;
                    vals += (vals != "") ? ("," + cInfo.community.value) : cInfo.community.value;
                }
            }
        }
        if (isCount)
            return count;
        else
            return vals;
    },
    // ----------------------------------------- end: countCompareCheckbox ---------------------------------------------

    // submitCompare
    submitCompare: function() {
        var validity = true;
        var error_string = '';



        var inputs = YUD.getElementsByClassName('styleInput', 'input');
        var itemsCount = myNotebookPanel.countCompareCheckbox(true);
        if (itemsCount < 2) {
            validity = false;
            error_string += 'Please select at least 2 and UP TO 4 COMMUNITIES or PLANS<br />';
        }

        // if there is an error_string, display the following.
        if (!validity) {

            myNotebookPanel.compareError.innerHTML = error_string;
            show(myNotebookPanel.compareError.parentNode);

        } else {
            // form validates, show Compare Pop UP
            //hide(this.allSubPanels);
            myNotebookPanel.compareError.innerHTML = "";
            hide(myNotebookPanel.compareError.parentNode);
            var checkValues = myNotebookPanel.countCompareCheckbox(false);
            var url = urlSiteBase + "/find-a-home/CompareProducts-Pulte.aspx?ids=" + checkValues;
            var ref = popWindow("regular", url, "compare", 600, 900, "");
            ref.focus();
        }
    },
    // ---------------------------------------- end: submitCompare -----------------------------------------------------

    // openSubPanelMyProfile
    submitMyProfile: function() {
        var error_string = "";
        var isInternational = false;
        var fName = document.profileInfo.profileFirstName.value;
        var lName = document.profileInfo.profileLastName.value;
        var email = document.profileInfo.profileUserEmail.value;
        var username = document.profileInfo.profileUserName.value;
        var newPassword = document.profileInfo.profileNewPassword.value;
        var confirmPassword = document.profileInfo.profileConfirmNewPassword.value;
        var isRealtor = false;  // document.profileInfo.profileRealtor.checked;
        var brokerOffice = "";  // document.profileInfo.profileBrokerOffice.value;
        var brokerId = "";  // document.profileInfo.profileBrokerID.value;
        var address1 = document.profileInfo.profileAddress1.value;
        var address2 = document.profileInfo.profileAddress2.value;
        var city = document.profileInfo.profileCity.value;
        var zip = document.profileInfo.profileZip.value;
        var state = document.profileInfo.profileState.value;
        var province = document.profileInfo.profileProvince.value;
        var postalCode = document.profileInfo.profilePostal.value;
        var country = document.profileInfo.profileCountry.value;
        var intl = YUD.getElementsByClassName("international", "div", "profileDetailInfo")[0];
        var phone1 = document.getElementById("profilePhone1").value;
        var phone2 = document.getElementById("profilePhone2").value;
        //var yearsInHome = document.getElementById("proOwnerYears").value;
        var yearsInHome = 1;
        var originalOwnerSet = false;
        var originalOwner = false;
        if (document.getElementById("proOriginalOwnerYes").checked) {
            originalOwnerSet = true;
            originalOwner = true;
        }
        if (!originalOwnerSet && document.getElementById("proOriginalOwnerNo").checked)
            originalOwnerSet = true;






        var isHomeOwner = document.getElementById('profileHomeOwner').checked;

        var noSalesNum = 0;
        if (originalOwnerSet && originalOwner)
            if (!document.getElementById('proOwnerNoSalesNum').checked)
                noSalesNum = 1;  //document.getElementById('proOwnerNoSalesNum').checked;

        //if (isHomeOwner && !noSalesNum)
        var origOwnerStatus = -1;  //unchecked
        if (document.getElementById('proOriginalOwnerYes').checked)
            origOwnerStatus = 1;  //Yes
        if (document.getElementById('proOriginalOwnerNo').checked)
            origOwnerStatus = 0;  //No




        salesNum = '';
        if (isHomeOwner && noSalesNum == 1 && (origOwnerStatus == 1)) {
            salesNum = document.getElementById('proOwnerSalesNumber').value;
            salesNum = salesNum.replace(/[^0-9]/g, '');
            if (salesNum.length > 0) {
                while (salesNum.substr(0, 1) == "0")
                    salesNum = salesNum.substr(1);
            }
            document.getElementById('proOwnerSalesNumber').value = salesNum;
        }

        salesNum2 = salesNum;  //document.getElementById('regOwnerConfirmSalesNumber').value;

        var lotBlock = document.getElementById('proOwnerLotBlock').value;





        if (!YUD.hasClass(intl, "hide")) {
            isInternational = true;
        }
        //error_string = NotebookUtils.validateProfileInfo(fName, lName, email, username, newPassword, confirmPassword, false, '', '', true);
        error_string = NotebookUtils.validateProfileInfo(fName, lName, email, username, newPassword, confirmPassword, isHomeOwner, salesNum, salesNum2, origOwnerStatus, noSalesNum, yearsInHome, true);
        //fName, lName, email, username, password,    password2,       isHomeOwner, salesNum, salesNum2, origOwnerStatus, noSalesNum, isProfile
        error_string += NotebookUtils.validateCountry(state, country, isInternational);
        // validate phone only if in US
        if (!isInternational) {
            if (phone1 != "") error_string += NotebookUtils.validatePhoneNumbers(phone1, "PRIMARY PHONE");
            if (phone2 != "") error_string += NotebookUtils.validatePhoneNumbers(phone2, "SECONDARY PHONE");
        }
        // if there is an error_string, display the following.
        if (error_string != "") {
            myNotebookPanel.profileError.innerHTML = error_string;
            show(myNotebookPanel.profileError.parentNode);

        } else {
            myNotebookPanel.profileError.innerHTML = "";
            hide(myNotebookPanel.profileError.parentNode);
            var user = new Pulte08.BusinessServices.User.UserEntity;
            user.FirstName = fName;
            user.LastName = lName;
            user.Email = email;
            user.Username = username;
            user.Address1 = address1;
            user.Address2 = address2;
            user.City = city;
            if (isInternational) {
                user.CountryCode = country;
                user.StateAbbreviation = province;
                user.PostalCode = postalCode;
            } else {
                user.CountryCode = "US";
                user.StateAbbreviation = state;
                user.PostalCode = zip;
            }
            user.Phone1 = phone1;
            user.Phone2 = phone2;
            user.IsRealtor = isRealtor;
            user.BrokerOffice = brokerOffice;
            user.BrokerTaxID = brokerId;
            if (isHomeOwner)
                user.SalesNum = salesNum;


            if (isHomeOwner) {
                user.SalesAgreementNumber = salesNum;
                user.SalesNum = salesNum;
                //user.CommunityID = communityID;
                //user.CommunityName = communityName;
                user.YearsInHome = yearsInHome;
                user.IsOriginalHomeOwner = originalOwner;
                user.lotBlock = lotBlock;
            }



            ajaxLoading('myProfileSubmitDiv', 'profileLink', 'start');

            if (isHomeOwner)
                Pulte08.AjaxWebServices.UserService.SaveProfileInfo(user, newPassword, myNotebookPanel.callBackSubmitProfileStep2, myNotebookPanel.callBackSaveProfileFailed);
            else
                Pulte08.AjaxWebServices.UserService.SaveProfileInfo(user, newPassword, myNotebookPanel.callBackSaveProfile, myNotebookPanel.callBackSaveProfileFailed);

        }

    },
    // ---------------------------------------- end: openSubPanelMyProfile ---------------------------------------------





    callBackSubmitProfileStep2: function(result) {

        if (result.Retcode != Pulte08.BusinessServices.User.enumSaveProfile.PROFILE_SUCCESS) {
            myNotebookPanel.callBackSaveProfile(result);
        }
        else {

            var isHomeOwner;
            //            if (document.getElementById('regHomeOwnerYes').checked) { isHomeOwner = true; }
            //            if (document.getElementById('regHomeOwnerNo').checked) { isHomeOwner = false; }
            isHomeOwner = document.getElementById('profileHomeOwner').checked;  //YUD.getElementsByClassName('ownerInput', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked; //homeOwner
            if (isHomeOwner && result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS) { //SAVE HOMEOWNER INFO


                var sError = "";
               // var yearsInHome = document.getElementById("proOwnerYears").value;
                var yearsInHome = 1;
                var originalOwnerSet = false;
                var originalOwner = false;
                if (document.getElementById("proOriginalOwnerYes").checked) {
                    originalOwnerSet = true;
                    originalOwner = true;
                }
                if (!originalOwnerSet && document.getElementById("proOriginalOwnerNo").checked)
                    originalOwnerSet = true;

                var isHomeOwner = document.getElementById('profileHomeOwner').checked;
                var noSalesNum = document.getElementById('proOwnerNoSalesNum').checked;
                var hasSalesNum = !noSalesNum;

                //if (isHomeOwner && !noSalesNum)
                var origOwnerStatus = -1;  //unchecked
                if (document.getElementById('proOriginalOwnerYes').checked)
                    origOwnerStatus = 1;  //Yes
                if (document.getElementById('proOriginalOwnerNo').checked)
                    origOwnerStatus = 0;  //No

                var isOriginalHomeOwner = false
                if (origOwnerStatus == 1)
                    isOriginalHomeOwner = true;

                salesNum = '';
                if (isHomeOwner && hasSalesNum && (origOwnerStatus == 1)) {
                    salesNum = document.getElementById('proOwnerSalesNumber').value;
                }
                if (document.getElementById('proOwnerSalesNumber'))
                    document.getElementById('proOwnerSalesNumber').value = salesNum;

                salesNum2 = salesNum;  //document.getElementById('regOwnerConfirmSalesNumber').value;

                if (yearsInHome == "") {
                    sError = "Please select the number of years you have lived in the home";
                }

                communityNotListed = YUD.getElementsByClassName('profileOwnerNoCommunity', '', 'notebookSubPanelProfile')[0].checked; //document.getElementById('ownerNoCommunity').checked;
                if (communityNotListed) {
                    communityID = 0;
                    //communityName = YUD.getElementsByClassName('profileEnterCommunity', '', 'notebookSubPanelProfile')[0].value; //document.getElementById('registerEnterCommunity').value;
                    communityName = document.getElementById('profileEnterCommunity').value;
                    if (communityName == "") {
                        sError = "You must enter a Community name...";
                    }

                } else {
                    var selectCommunity = document.getElementById('profileSelectCommunity');
                    communityID = selectCommunity.value;  //document.getElementById('registerSelectCommunity').value;
                    if (communityID == "") {
                        sError = "You must select a Community...";
                    }
                    communityName = selectCommunity[selectCommunity.selectedIndex].text; //document.getElementById('registerSelectCommunity')[document.getElementById('registerSelectCommunity').selectedIndex].text;
                }

                if (isOriginalHomeOwner && hasSalesNum && salesNum == '') {
                    sError = "You must enter an Agreement ID Number or select \"Continue without registering an Agreement ID Number\"";
                }


                planID = 0;
                //planID = YUD.getElementsByClassName('registerPlanID', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value; //document.getElementById('registerEnterCommunity').value;
                //if (planID == "")
                //    planID = 0;


                lotBlock = "";
                if (isHomeOwner && hasSalesNum && (origOwnerStatus == 1)) {
                    if (document.getElementById('proOwnerLotBlock')) {
                        lotBlock = document.getElementById('proOwnerLotBlock').value;
                    }
                }
                if (document.getElementById('proOwnerLotBlock')) {
                    document.getElementById('proOwnerLotBlock').value = lotBlock;
                }




                //var context = { ajaxContainer: "regStep2SubmitDiv", ajaxBtn: "completeStep2", errObj: myNotebookRegister.errorMessage2 };
                //Pulte08.AjaxWebServices.UserService.RegisterHomeOwner(salesNumber, communityID, communityName, isOriginalHomeOwner, yearsInHome, originalHomeOwnerSet, planID, myNotebookPanel.callBackSaveProfile, myNotebookPanel.callBackSaveProfileFailed, context);
                if (sError == "")
                    Pulte08.AjaxWebServices.UserService.RegisterHomeOwner(salesNum, communityID, communityName, isOriginalHomeOwner, yearsInHome, originalOwnerSet, planID, lotBlock, myNotebookPanel.callBackSaveProfile, myNotebookPanel.callBackSaveProfileFailed);
                else {
                    myNotebookPanel.profileError.innerHTML = sError;
                    show(myNotebookPanel.profileError.parentNode);
                    ajaxLoading('myProfileSubmitDiv', 'profileLink', 'end');
                    window.scrollTo(0, 0);
                }
            }
            else
                myNotebookPanel.callBackSaveProfile(result);
        }

    },










    // callBackeSaveProfile
    callBackSaveProfile: function(result) {
        // TODO:  if success, display a message
        var wasSuccessful = false;
        if (typeof (result) == "string")
            if (result == "")
            wasSuccessful = true;


        if (wasSuccessful || (result.Retcode == Pulte08.BusinessServices.User.enumSaveProfile.PROFILE_SUCCESS)) {
            myNotebookPanel.profileError.innerHTML = "Data is saved.";
            show(myNotebookPanel.profileError.parentNode);
            window.scrollTo(0, 0);
            setTimeout(function () { hide(myNotebookPanel.profileError.parentNode) }, 5000);
            // update data
            var fName = document.profileInfo.profileFirstName.value;
            if (document.getElementById("shareFirstName")) {
                document.getElementById("shareFirstName").value = fName;
                document.getElementById("shareLastName").value = document.profileInfo.profileLastName.value;
                document.getElementById("shareEmail").value = document.profileInfo.profileUserEmail.value;
            }
            // update Directions Area
            if (document.getElementById("driveAddress")) {
                document.getElementById("driveAddress").value = document.profileInfo.profileAddress1.value;
                document.getElementById("driveCity").value = document.profileInfo.profileCity.value;
                setSelectBoxValue(document.getElementById("driveState"), document.profileInfo.profileState.value);
                document.getElementById("driveZip").value = document.profileInfo.profileZip.value;
            }
            // update welcome Text
            var userWelcomeText = document.getElementById("userWelcomeText");
            userWelcomeText.innerHTML = "Welcome Home, " + fName;

        } else if (result.Retcode == Pulte08.BusinessServices.User.enumSaveProfile.PROFILE_USERNAME_EXISTS) {
            myNotebookPanel.profileError.innerHTML = "The USERNAME that you entered is already in use. Please choose a different USERNAME";
            show(myNotebookPanel.profileError.parentNode);
            window.scrollTo(0, 0);
        } else if (result.Retcode == Pulte08.BusinessServices.User.enumSaveProfile.PROFILE_FAILURE || result.Retcode == Pulte08.BusinessServices.User.enumSaveProfile.PROFILE_FAILURE_VALIDATION) {
            myNotebookPanel.profileError.innerHTML = result.Message;
            show(myNotebookPanel.profileError.parentNode);
            show(myNotebookPanel.profileError.parentNode);
            window.scrollTo(0, 0);
        }


        Pulte08.AjaxWebServices.UserService.GetWindowUser(NotebookUtils.callBackSetWindowUser);
        RenderPortalControls();



        ajaxLoading('myProfileSubmitDiv', 'profileLink', 'end');
    },
    // ---------------------------------------- end: callBackSaveProfile ----------------------------------------------
    // callBackSaveProfileFailed
    callBackSaveProfileFailed: function(result) {
        myNotebookPanel.profileError.innerHTML = "The website is not responding. Please try again later...";
        show(myNotebookPanel.profileError.parentNode);
        ajaxLoading('myProfileSubmitDiv', 'profileLink', 'end');
        window.scrollTo(0, 0);
    },
    // ---------------------------------------- end: callBackSaveProfileFailed -----------------------------------------

    // submitGetDirections
    submitGetDirections: function() {
        var isValid = true;
        var error_string = "";
        var fromAddress = document.getElementById("driveAddress").value;
        var fromCity = document.getElementById("driveCity").value;
        var fromState = document.getElementById("driveState").value;
        var fromZip = document.getElementById("driveZip").value;
        if (fromAddress == "") {
            isValid = false;
            error_string += "Please enter a valid ADDRESS<br />";
        }
        if (fromCity == "") {
            isValid = false;
            error_string += "Please enter a valid CITY<br />";
        }
        if (fromState == "" && fromZip == "") {
            isValid = false;
            error_string += "Please select a valid STATE or Zip Code<br />";
        }
        if (fromZip != "" && !validateZipStructure(fromZip)) {
            isValid = false;
            error_string += 'Please enter a valid ZIP <br />';
        }

        if (isValid) {
            myNotebookPanel.directionError.innerHTML = "";
            hide(myNotebookPanel.directionError.parentNode);
            var val = fromState;
            if (val == "") val = fromZip;
            else val += " " + fromZip;
            var f = fromAddress + ", " + fromCity + ", " + val.trim();
            //assuming user didn't modify it and not submit the form
            var name = document.getElementById("profileFirstName").value;
            name += (name != "" && document.getElementById("profileLastName").value != "") ? " " : "";
            name += document.getElementById("profileLastName").value;
            var email = document.getElementById("profileUserEmail").value;
            var phone = document.getElementById("profilePhone1").value;
            if (phone == "" || phone == null) {
                phone = document.getElementById("profilePhone2").value;
            }
            var url = document.getElementById("driveFastPassURL").value + "?f=" + escape(f) + "&name=" + escape(name) + "&email=" + email + "&phone=" + escape(phone);
            var ref = popWindow("regular", url, "compare", 700, 700, "");
            ref.focus();
        } else {
            myNotebookPanel.directionError.innerHTML = error_string;
            show(myNotebookPanel.directionError.parentNode);
        }
    },
    // -------------------------------------- end: submitGetDirections -------------------------------------------------

    //closeSubPanel
    closeSubPanel: function() {
        hide(this.allSubPanels);
        // reset forms and error strings.
        hide(this.errorMessageArea);
        document.emailFriend.reset(); // share with friend panel
        document.compare.reset(); 	// compare plans panel
        var checkboxes = YUD.getElementsByClassName('customCheckbox');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].src = returnCheckboxImgFalse('regRealtor'); // uncheck checkboxes
        }
    },
    // ----------------------------------------- end: closeSubPanel ----------------------------------------------------

    //openBySection
    openBySection: function(panelObj) {
        var subSections = [NOTEBOOKCONFIG.profileSubPanel, NOTEBOOKCONFIG.viewedSubPanel, NOTEBOOKCONFIG.savedSubPanel];
        myNotebookPanel.openPanel();
        var trigger = document.getElementById(panelObj.trigger);
        var panel = document.getElementById(panelObj.panel);
        NotebookUtils.togglePanel(trigger, panel, true);
        if (panelObj.trigger == NOTEBOOKCONFIG.viewedSubPanel.trigger) {
            if (myNotebookViewedControl.loadingDiv) { show(myNotebookViewedControl.loadingDiv); }
            Pulte08.AjaxWebServices.RecentlyViewedService.RenderView(myNotebookViewedControl.callBackRenderResult);
        } else if (panelObj.trigger == NOTEBOOKCONFIG.savedSubPanel.trigger) {
            if (myNotebookSavedControl.loadingDiv) { show(myNotebookSavedControl.loadingDiv); }
            Pulte08.AjaxWebServices.SavedProductsService.RenderView(myNotebookSavedControl.callBackRenderResult);
        }
    },
    // ------------------------------------- end: openbySectio ---------------------------------------------------------

    //openProfilePreference
    openProfilePreference: function() {
        var toggles = YUD.getElementsByClassName("toggle", "div", "profileDetailInfo");
        var trigger, panel;
        for (var i = 0; i < toggles.length; i++) {
            trigger = YUD.getElementsByClassName('toggleTrigger', '', toggles[i])[0];
            panel = YUD.getElementsByClassName('toggleTarget', '', toggles[i])[0];
            if (trigger.id != null && trigger.id == "profileSearchPreference") {
                NotebookUtils.togglePanel(trigger, panel, true);
            } else {
                NotebookUtils.togglePanel(trigger, panel, false);
            }
        }
        trigger = document.getElementById(NOTEBOOKCONFIG.profileSubPanel.trigger);
        panel = document.getElementById(NOTEBOOKCONFIG.profileSubPanel.panel);
        NotebookUtils.togglePanel(trigger, panel, true);
        myNotebookPanel.openPanel();
    },
    // --------------------------------------- end: openProfilePreference ----------------------------------------------
    //addPanelListeners
    addPanelListeners: function() {
        myNotebookPanel.initVars();
        // open notebook panel
        YUE.addListener(myNotebookPanel.targets, 'click', function() {
            myNotebookPanel.openPanel();
        });

        // close notebook panel
        YUE.addListener(myNotebookPanel.closeDialog, 'click', function() {
            myNotebookPanel.closePanel();
        });

        // open directions sub-panel
        /* use IN Line javascrpt
        YUE.addListener(myNotebookPanel.directionsTrigger,'click',function() {

        });
        */
        // open share sub-panel
        YUE.addListener(myNotebookPanel.shareTrigger, 'click', function() {
            if (NotebookUtils.getSignInStatus()) {
                Pulte08.AjaxWebServices.SavedProductsService.GetShareListHTML(myNotebookPanel.loadShareHTML);
            } else {
                // display error
                NotebookUtils.displayRegMarketingInfo(true);
            }

        });
        // initialize the char count on share form
        var msgs = YUD.getElementsByClassName('charCount', "div", "notebookShare");
        for (var i = 0; i < msgs.length; i++) { charCount(msgs[i]) };

        // link send email to friends
        YUE.addListener(myNotebookPanel.sendLink, 'click', function() {
            myNotebookPanel.submitShare();
        });

        // open compare form sub-panel
        YUE.addListener(myNotebookPanel.compareTrigger, 'click', function() {
            if (NotebookUtils.getSignInStatus()) {
                Pulte08.AjaxWebServices.SavedProductsService.GetCompareListHTML(myNotebookPanel.loadCompareHTML);
            } else {
                NotebookUtils.displayRegMarketingInfo(true);
            }
        });

        // submit compare panel, check for MAX of 4 items, goes to popup window.
        YUE.addListener(myNotebookPanel.compareLink, 'click', function() {
            myNotebookPanel.submitCompare();
        });

        // update User Profile
        YUE.addListener(myNotebookPanel.profileLink, 'click', function() {
            myNotebookPanel.submitMyProfile();
        });

        //getDirectionLink
        YUE.addListener(myNotebookPanel.directionLink, 'click', function() {
            myNotebookPanel.submitGetDirections();
        });
        // close/cancel any of the sub-panels
        YUE.addListener([myNotebookPanel.closeLink, myNotebookPanel.cancelLink], 'click', function() {
            myNotebookPanel.closeSubPanel();
        });

        // listen to the enter key
        if (window.attachEvent && isIE) {
            var directionsKeyPress = new YAHOO.util.KeyListener(document.directionsForm, { keys: 13 }, myNotebookPanel.submitGetDirections);
            directionsKeyPress.enable(); // getDirections form

            var shareKeyPress = new YAHOO.util.KeyListener(document.emailFriend, { keys: 13 }, myNotebookPanel.submitShare);
            shareKeyPress.enable(); // Share with Friends Form

            var compareKeyPress = new YAHOO.util.KeyListener(document.compare, { keys: 13 }, myNotebookPanel.submitCompare);
            compareKeyPress.enable(); // compare

            var profileKeyPress = new YAHOO.util.KeyListener(document.profileInfo, { keys: 13 }, myNotebookPanel.submitMyProfile);
            profileKeyPress.enable(); // profile form
        }
    }
    // ---------------------------------------- end: addPanelListeners -------------------------------------------------
}
//--------------------------------------------- end: myNotebookPanel ---------------------------------------------------

//NOTEBOOKSIGNIN
var myNotebookSignIn = {
    overlayPanel: null,
    xPos: 0,
    signIn: null,
    signInPane: null,
    forgotPasswordPane: null,
    forgetPasswordSuccess: null,
    passwordConfirm: null,
    changePw: null,
    getPassword: null,
    signInGo: null,
    passwordGo: null,
    changePwGo: null,
    errorMessageArea: null,
    errorMessage: null,
    PWerrorMessageArea: null,
    PWerrorMessage: null,
    newPWMessageArea: null,
    newPWMessage: null,
    cancelDialog: null,
    cancelLink: null,
    closeDialog: null,

    // initVars
    initVars: function() {
        this.overlayPanel = new YAHOO.widget.Overlay('signIn', { context: ["notebookAnchor", "tr", "tr"], 'width': 260, 'visible': false, 'zIndex': 1000 });
        this.overlayPanel.render();
        this.signIn = document.getElementById('signIn');
        this.signInPane = document.getElementById('signInPane');
        this.forgotPasswordPane = document.getElementById('forgotPasswordPane');
        this.passwordConfirm = document.getElementById('pwConfirmMessage');
        this.changePw = document.getElementById('changePw');
        this.getPassword = YUD.getElementsByClassName('pwLink');
        this.signInGo = YUD.getElementsByClassName('signInGo');
        this.passwordGo = YUD.getElementsByClassName('passwordGo');
        this.changePwGo = YUD.getElementsByClassName('changePwGo');
        this.errorMessageArea = YUD.getElementsByClassName('errorMessageArea')[0];
        this.errorMessage = document.getElementById('signInErrorMessage');
        this.PWerrorMessageArea = YUD.getElementsByClassName('PWerrorMessageArea')[0];
        this.PWerrorMessage = YUD.getElementsByClassName('PasswordErrorMessage', 'div')[0];
        this.newPWMessageArea = YUD.getElementsByClassName('newPWerrorMessageArea', 'div')[0];
        this.newPWMessage = document.getElementById('newPWerrorMessage');
        this.cancelDialog = YUD.getElementsByClassName('cancelLink', null, 'signInPanel');
        this.cancelLink = YUD.getElementsByClassName('cancelLink');
        this.closeDialog = YUD.getElementsByClassName('myNotebookClose', null, 'signIn');
        this.forgetPasswordSuccess = document.getElementById("forgetPasswordSuccess");
    },
    // ------------------------------------- end of initVars -----------------------------------------------------------

    //openPanel
    openPanel: function() {
        modalBackdrop.show();
        YUD.setStyle(document.getElementById('modalDialog'), 'height', Math.max(YUD.getViewportHeight(), document.body.scrollHeight) + 'px');
        if (openedNotebookSection) {
            openedNotebookSection.hide();
        }
        openedNotebookSection = myNotebookSignIn.overlayPanel;
        this.overlayPanel.show();
        document.getElementById('userIDlogin').focus();

        // make sure forms are reset if switching from Register -> Sign -> MyNotebook and Vis Versa
        this.errorMessage.innerHTML = '';
        this.error_string = '';
        document.signInForm.reset();
        hide(this.errorMessage.parentNode);

        show(myNotebookSignIn.signInPane);
        hide(myNotebookSignIn.changePw);
        hide(myNotebookSignIn.forgotPasswordPane);
        document.getElementById('userIDlogin').focus();
    },
    // ------------------------------------- end: openPanel ---------------------------------------------------

    // closePanel
    closePanel: function() {
        // initSignInPane();
        this.errorMessage.innerHTML = '';
        this.error_string = '';
        document.signInForm.reset();
        hide(this.errorMessageArea);
        hide(this.PWerrorMessageArea);
        hide(this.forgotPasswordPane);
        //hide(this.passwordConfirm);
        show(this.signInPane);
        this.overlayPanel.hide();
        modalBackdrop.hide();
    },
    // ------------------------------------- end: displaySignInPanel ---------------------------------------------------

    //submitSignIn
    submitSignIn: function() {

        var validity = true;
        var error_string = '';
        if (document.getElementById('userIDlogin').value == "") {
            validity = false;
            error_string += 'Please enter a valid USERNAME<br />';
        }
        if (document.getElementById('signInPassword').value == '') {
            validity = false;
            error_string += 'Please enter a valid PASSWORD<br />';
        }

        if (validity) {
            // Web Services Call
            myNotebookSignIn.errorMessage.innerHTML = "";
            hide(myNotebookSignIn.errorMessage.parentNode);
            hide(myNotebookSignIn.forgetPasswordSuccess);
            var un = document.getElementById("userIDlogin").value;
            var pw = document.getElementById("signInPassword").value;
            ajaxLoading('signInSubmitDiv', 'signInGo', 'start');
            Pulte08.AjaxWebServices.UserService.SignInAndReturnName(un, pw, myNotebookSignIn.callBackSignInSuccess, myNotebookSignIn.callBackSignInFail);

        } else {
            myNotebookSignIn.errorMessage.innerHTML = error_string;
            show(myNotebookSignIn.errorMessage.parentNode);
        }
    },
    // -------------------------------------end: submitSignIn ----------------------------------------------------------
    // submitForgetPassword
    submitForgetPassword: function() {
        var validity = true;
        var error_string = '';
        var firstName = document.getElementById("forgetFirstName").value;
        var lastName = document.getElementById("forgetLastName").value;
        var email = document.getElementById('forgetEmail').value;

        if (firstName == "") {
            validity = false;
            error_string += "Please enter your FIRST NAME<br />";
        }
        if (lastName == "") {
            validity = false;
            error_string += "Please enter your LAST NAME<br />";
        }
        if (email == "") {
            validity = false;
            error_string += 'Please enter your registered EMAIL ADDRESS<br />';
        } else if (!check_email(email)) {
            validity = false;
            error_string += 'Please enter a valid EMAIL ADDRESS<br />';
        }

        if (!validity) {
            myNotebookSignIn.PWerrorMessage.innerHTML = error_string;
            show(myNotebookSignIn.PWerrorMessage.parentNode);
        } else {
            myNotebookSignIn.PWerrorMessage.innerHTML = "";
            hide(myNotebookSignIn.PWerrorMessage.parentNode);
            ajaxLoading('forgetPaswrodSubmitDiv', 'passwordGo', 'start');
            var brandName = getCurrSite();
            Pulte08.AjaxWebServices.UserService.RecoverPassword(firstName, lastName, email, brandName, myNotebookSignIn.callBackForgetPassword, myNotebookSignIn.callBackForgetPasswordFailed);
        }
    },
    // ------------------------------------ end: submitForgetPassword --------------------------------------------------

    // callBackForgetPassword
    callBackForgetPassword: function(result) {
        if (result == Pulte08.BusinessServices.User.enumPasswordRecovery.EMAIL_SENT) {
            hide(myNotebookSignIn.forgotPasswordPane);
            show(myNotebookSignIn.forgetPasswordSuccess);
            myNotebookSignIn.errorMessage.innerHTML = "";
            hide(myNotebookSignIn.errorMessage.parentNode);
            document.forgotPasswordForm.reset();
        } else if (result == Pulte08.BusinessServices.User.enumPasswordRecovery.USER_NOT_REGISTERED) {
            myNotebookSignIn.PWerrorMessage.innerHTML = "User is not recognized in the system. Please <a href='javascript:void(0);' class='errorLink registerPanelTrigger'>Register</a>";   // trigger will load HTML and fire myNotebookRegister.openPanel()
            myNotebookRegister.loadTrigger(myNotebookSignIn.PWerrorMessage);
            show(myNotebookSignIn.PWerrorMessage.parentNode);
        }
        ajaxLoading('forgetPaswrodSubmitDiv', 'passwordGo', 'end');
    },
    // ------------------------------------- end: callBackForgetPassword -----------------------------------------------

    // callBackForgetPasswordFailed
    callBackForgetPasswordFailed: function(result) {
        myNotebookSignIn.PWerrorMessage.innerHTML = "The website is not responding. Please try again later...";
        myNotebookRegister.loadTrigger(myNotebookSignIn.PWerrorMessage);
        show(myNotebookSignIn.PWerrorMessage.parentNode);
        ajaxLoading('forgetPaswrodSubmitDiv', 'passwordGo', 'end');
    },

    // ------------------------------------- end: callBack ForgetPassword Failed ---------------------------------------
    // submitChangePassword
    submitChangePassword: function() {
        //console.log(1);
        var validity = true;
        var error_string = '';

        if ((document.getElementById('newPassword1').value == '') || (document.getElementById('newPassword2').value == '')) {
            validity = false;
            error_string += 'Please enter a valid PASSWORD (must be 5 characters).<br />';
        } else if (document.getElementById('newPassword1').value != document.getElementById('newPassword2').value) {
            validity = false;
            error_string += 'The PASSWORDs do not match!<br />';
        } else if (document.getElementById('newPassword1').value.length < 6) {
            validity = false;
            error_string += 'PASSWORD must be at least 5 characters and up to 30 characters<br />';
        }

        if (validity) {
            // reset and hide all panels
            var pw = document.getElementById("newPassword1").value;
            myNotebookSignIn.newPWMessage.innerHTML = '';
            error_string = '';
            document.changePw.reset();
            hide(myNotebookSignIn.newPWMessageArea);
            myNotebookSignIn.overlayPanel.hide();
            modalBackdrop.hide();
            // execute web services call
            Pulte08.AjaxWebServices.UserService.SavePassword(pw, myNotebookSignIn.callBackChangePassword);
        } else {
            myNotebookSignIn.newPWMessage.innerHTML = error_string;
            show(myNotebookSignIn.newPWMessageArea);
        }
    },
    // ------------------------------------ end: submitChangePassword --------------------------------------------------

    // callBackChangePassword
    callBackChangePassword: function(result) {
        if (result == Pulte08.BusinessServices.User.enumSaveData.SAVE_SUCCESS) {
            myNotebookSignIn.closePanel();
        }
    },
    // ------------------------------------ end: callBackChangePassword ------------------------------------------------

    // openSubPanelForgetPassword
    openSubPanelForgetPassword: function() {
        if (YUD.hasClass(this.forgotPasswordPane, 'hide')) {
            show(this.forgotPasswordPane);
            document.getElementById("forgetFirstName").focus();
        } else {
            hide(this.forgotPasswordPane);
            hide(this.PWerrorMessageArea);
        }
    },
    // ------------------------------------ end: openForgetPasswordPanel -----------------------------------------------

    // openSignIn & Password Panel
    openSignInAndPasswordPanel: function() {
        myNotebookSignIn.openPanel();
        myNotebookSignIn.openSubPanelForgetPassword();
    },
    // ----------------------------------- end: openSignInAndPasswordPanel ---------------------------------------------

    // addPanelListener
    addPanelListeners: function() {
        if (myNotebookSignIn.signIn == null) {
            myNotebookSignIn.initVars();
            if (document.getElementById("userIDlogin")) {
                YUE.addListener(YUD.getElementsByClassName('signInTrigger'), 'click', function() {
                    myNotebookSignIn.openPanel();
                });

                // cancel/close panel - reset form and error messages
                YUE.addListener(myNotebookSignIn.cancelLink, 'click', function() {
                    myNotebookSignIn.closePanel();
                });

                // close register and open notebook
                YUE.addListener(myNotebookSignIn.closeDialog, 'click', function() {
                    myNotebookPanel.openPanel();
                });

                // Sign In error checking
                YUE.addListener(myNotebookSignIn.signInGo, 'click', function() {
                    myNotebookSignIn.submitSignIn();
                });

                // Forgot Password error checking
                YUE.addListener(myNotebookSignIn.passwordGo, 'click', function() {
                    myNotebookSignIn.submitForgetPassword();
                });

                // open forgot password sub-panel
                YUE.addListener(myNotebookSignIn.getPassword, 'click', function() {
                    myNotebookSignIn.openSubPanelForgetPassword();
                });

                // change password after user logins from entering reset password from email.
                YUE.addListener(myNotebookSignIn.changePwGo, 'click', function() {
                    myNotebookSignIn.submitChangePassword();
                });

                // listen to enter key press to submit form
                if (window.attachEvent) {
                    var signInKeyPress = new YAHOO.util.KeyListener(document.signInForm, { keys: 13 }, myNotebookSignIn.submitSignIn);
                    signInKeyPress.enable(); // SignIn

                    var forgetKeyPress = new YAHOO.util.KeyListener(document.forgotPasswordForm, { keys: 13 }, myNotebookSignIn.submitForgetPassword);
                    forgetKeyPress.enable(); // forget password

                    var changeKeyPress = new YAHOO.util.KeyListener(document.changePw, { keys: 13 }, myNotebookSignIn.submitChangePassword);
                    changeKeyPress.enable(); // change password
                }
            }
        }
    },
    // ------------------------------------ end addPanelListener -------------------------------------------------------

    //callBackSignInSuccess
    callBackSignInSuccess: function(result) {
        if (result.Retcode == Pulte08.BusinessServices.User.enumAuthCode.AUTH_SUCCESS) {
            // show name

            myNotebookSignIn.errorMessage.innerHTML = '';
            document.signInForm.reset();
            hide(myNotebookSignIn.errorMessageArea);
            myNotebookSignIn.overlayPanel.hide();
            modalBackdrop.hide();
            NotebookUtils.SetSignInStatus(true);
            myNotebookPanel.openPanel();
            Pulte08.AjaxWebServices.UserService.GetProfileInfo(myNotebookProfileControl.callBackRenderResult);
        }
        else if (result.Retcode == Pulte08.BusinessServices.User.enumAuthCode.AUTH_SUCCESS_PASSWORD_CHANGE) {
            show(myNotebookSignIn.changePw);
            document.getElementById("newPassword1").focus();
            hide(myNotebookSignIn.signInPane);
            hide(myNotebookSignIn.forgotPasswordPane);
            hide(myNotebookSignIn.PWerrorMessageArea);
            hide(myNotebookSignIn.errorMessageArea);
            NotebookUtils.SetSignInStatus(true);
        }

        else {
            myNotebookSignIn.errorMessage.innerHTML = result.Message;
            show(myNotebookSignIn.errorMessage.parentNode);

        }

        Pulte08.AjaxWebServices.UserService.GetWindowUser(NotebookUtils.callBackSetWindowUser);

        ajaxLoading('signInSubmitDiv', 'signInGo', 'end');

        //var sPath = window.location.pathname;
        ////var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        //if (sPath.toLowerCase().indexOf('portal') > 0)
        //    window.location.href = sPath;

        RenderPortalControls();

    },
    // ------------------------------------- end: callBackSignInSuccess ------------------------------------------------

    // callBackSignInFail
    callBackSignInFail: function(error) {
        myNotebookSignIn.errorMessage.innerHTML = error.Message;
        show(myNotebookSignIn.errorMessageArea);
        ajaxLoading('signInSubmitDiv', 'signInGo', 'end');
    }
    //------------------------------------- end: callBackSignInFail ----------------------------------------------------

};
// -------------------------------- end: myNotebookSignIn --------------------------------------------------------------


//myNotebookRegister
var myNotebookRegister = {
    overlayPanel: null,
    isHTMLLoaded: false,
    xPos: 0,
    register_step1: null,
    register_step2: null,
    register_step3: null,
    brokerFields: null,
    nextStep2: null,
    completeStep2: null,
    thanksStep3: null,
    errorMessageArea: null,
    errorMessage1: null,
    errorMessage2: null,
    regBrokerInfo: null,
    realtorSel: null,
    cancelLink: null,
    closeDialog: null,
    regStep: 1,
    register_invalid_salesnum: null,
    register_select_community: null,
    registerSelectCommunity: null,
    registerState: null,
    ownerNoCommunity: null,
    register_enter_community: null,
    cancelEnterCommunity: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    zip: null,
    communityID: null,
    planID: null,
    // initVars
    initVars: function() {
        this.overlayPanel = new YAHOO.widget.Overlay('registerPanel', { context: ["notebookAnchor", "tr", "tr"], 'width': 350, 'visible': false, 'zIndex': 1000 });
        this.overlayPanel.render();
        this.register_step1 = document.getElementById('register_step1');
        this.register_step2 = document.getElementById('register_step2');
        this.register_step3 = document.getElementById('register_step3');
        this.register_invalid_salesnum = document.getElementById('register_invalid_salesnum');
        this.register_select_community = document.getElementById('register_select_community');
        this.registerSelectCommunity = document.getElementById('registerSelectCommunity');
        this.registerState = document.getElementById('registerState');
        this.brokerFields = document.getElementById('regRealtor');
        this.nextStep2 = YUD.getElementsByClassName('nextStep2');
        this.completeStep2 = YUD.getElementsByClassName('completeStep2');
        this.thanksStep3 = YUD.getElementsByClassName('thanksStep3');
        this.errorMessageArea = YUD.getElementsByClassName('errorMessageArea');
        this.errorMessage1 = YUD.getElementsByClassName('registerErrorMessage')[0];
        this.errorMessage2 = YUD.getElementsByClassName('registerErrorMessage')[1];
        this.regBrokerInfo = YUD.getElementsByClassName('regBrokerInfo');
        this.realtorSel = YUD.getElementsByClassName('realtorSelTrigger');
        this.cancelLink = YUD.getElementsByClassName('cancelLink', null, 'registerPanel');
        this.closeDialog = YUD.getElementsByClassName('myNotebookClose', null, 'registerPanel');
        this.ownerNoCommunity = YUD.getElementsByClassName('ownerNoCommunity', null, 'registerPanel')[0];
        this.register_enter_community = YUD.getElementsByClassName('register_enter_community', null, 'registerPanel')[0];
        this.cancelEnterCommunity = YUD.getElementsByClassName('cancelEnterCommunity', null, 'registerPanel')[0];
        this.addressLine1 = document.getElementById('registerAddress1');
        this.addressLine2 = document.getElementById('registerAddress2');
        this.city = document.getElementById('registerCity');
        this.zip = document.getElementById('registerZip');
        this.communityID = document.getElementById('registerCommunityID');
        this.planID = document.getElementById('registerPlanID');

        this.regStep = 1;
    },
    // ---------------------------- end: initVars ----------------------------------------------------------------------

    //openPanel
    openPanel: function() {
        //alert("openPanel");
        var sOldPageName = s.pageName;
        s.pageName = s.pageName + " - " + "Open Registration";

        s.tl("true", "o", "Open Registration");
        s.pageName = sOldPageName;

        // make sure that we have html loaded
        if (!myNotebookRegister.isHTMLLoaded) {
            //alert("AJAX GetRegistrationHTML");
            Pulte08.AjaxWebServices.UserService.GetRegistrationHTML(myNotebookRegister.loadHTML);
        }
        hide(this.errorMessageArea);
        modalBackdrop.show();
        YUD.setStyle(document.getElementById('modalDialog'), 'height', Math.max(YUD.getViewportHeight(), document.body.scrollHeight) + 'px');
        if (openedNotebookSection) {
            openedNotebookSection.hide();
        }
        openedNotebookSection = this.overlayPanel;
        myNotebookRegister.initRegistrationSteps();
        if (myNotebookRegister.overlayPanel) myNotebookRegister.overlayPanel.show();
        //window.setTimeout(function() { document.getElementById('regFirstName').focus(); }, 0);
        window.setTimeout(function() { if (document.getElementById('regFirstName')) document.getElementById('regFirstName').focus(); }, 0);
    },
    // ----------------------------- end: openPanel --------------------------------------------------------------------

    //closePanel
    closePanel: function() {
        this.overlayPanel.hide();
        modalBackdrop.hide();
    },
    // ----------------------------- end: clsoePanel -------------------------------------------------------------------
    // initRegistrationSteps
    initRegistrationSteps: function() {
        var regPanel = document.getElementById("registerPanel");
        if (!regPanel) return;
        // hide error message
        if (myNotebookRegister && myNotebookRegister.errorMessage1 && myNotebookRegister.errorMessage1.parentNode) {
            hide(myNotebookRegister.errorMessage1.parentNode);
        }
        if (myNotebookRegister && myNotebookRegister.errorMessage2 && myNotebookRegister.errorMessage2.parentNode) {
            hide(myNotebookRegister.errorMessage2.parentNode);
        }

        myNotebookRegister.regStep = 1;

        hide(myNotebookRegister.register_step2);
        hide(myNotebookRegister.register_step3);
        show(myNotebookRegister.register_step1);

        var inputs = regPanel.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        var selects = regPanel.getElementsByTagName('select');
        for (var i = 0; i < selects.length; i++) {
            selects[i].selectedIndex = 0;
        }
        if (document.getElementById('regUserEmail')) {
            document.getElementById('regUserEmail').value = '';
        }
        var realtorCheck = document.getElementById('regRealtor');
        if (realtorCheck) {
            realtorCheck.checked = false;
            YUD.getPreviousSibling(realtorCheck).src = returnCheckboxImgFalse('regRealtor');
        }
        var realTriggers = YUD.getElementsByClassName('brokerFields', 'div', 'registerPanel')[0];
        if (realTriggers) {
            YUD.replaceClass(realTriggers, 'show', 'hide');
        }
    },
    // ---------------------------- end: initRegistrationSteps ---------------------------------------------------------

    //submiRegForm
    submitRegForm: function() {
        if (myNotebookRegister.regStep == 1) {
            myNotebookRegister.submitRegStep1();
        } else if (myNotebookRegister.regStep == 2) {
            myNotebookRegister.submitRegStep2();
        } else {
            myNotebookRegister.submitRegStep1();
        }
    },
    // ---------------------------- end: submitRegForm -----------------------------------------------------------------

    // submitRegStep1
    submitRegStep1: function() {
        var error_string = "";
        var fName, lName, email, username, password, password2, isRealtor, brokerOffice, brokerId, isHomeOwner, salesNum, noSalesNum, origOwnerStatus, yearsInHome;
        fName = document.getElementById('regFirstName').value;
        lName = document.getElementById('regLastName').value;
        email = document.getElementById('regUserEmail').value;
        username = document.getElementById('regUserName').value;
        password = document.getElementById('regUserPassword').value;
        password2 = document.getElementById('regConfirmPassword').value;
        isRealtor = false;  //this.brokerFields.checked;
        brokerOffice = "";  //document.getElementById('regBrokerOffice').value;
        brokerId = "";  //document.getElementById('regBrokerID').value;
        isHomeOwner = 100; //used for error checking
        if (document.getElementById('regHomeOwnerYes').checked)
            isHomeOwner = 1; //yes
        if (document.getElementById('regHomeOwnerNo').checked)
            isHomeOwner = 0; //No

        noSalesNum = 100;
        if (document.getElementById('regOwnerSalesNumYes').checked)
            noSalesNum = 1; //This means they DO NOT have a sales num
        if (document.getElementById('regOwnerSalesNumNo').checked)
            noSalesNum = 0; //This means they DO  have a sales num



        //yearsInHome = yearsInHome = YUD.getElementsByClassName('regOwnerYears', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value;
        yearsInHome = 1;
        //if (isHomeOwner && !noSalesNum)
        origOwnerStatus = -1;  //unchecked
        if (document.getElementById('regOriginalOwnerYes').checked)
            origOwnerStatus = 1;  //Yes
        if (document.getElementById('regOriginalOwnerNo').checked)
            origOwnerStatus = 0;  //No

        if (origOwnerStatus == 0)
            noSalesNum = 0;


        salesNum = '';
        if (isHomeOwner == 1 && noSalesNum == 1 && (origOwnerStatus == 1)) { //noSalesNum == 1 is equivalent to No Sales Number
            salesNum = document.getElementById('regOwnerSalesNumber').value;
            salesNum = salesNum.replace(/[^0-9]/g, '');
            if (salesNum.length > 0) {
                while (salesNum.substr(0, 1) == "0")
                    salesNum = salesNum.substr(1);
            }
            document.getElementById('regOwnerSalesNumber').value = salesNum;

        }

        salesNum2 = salesNum;  //document.getElementById('regOwnerConfirmSalesNumber').value;


        error_string = NotebookUtils.validateProfileInfo(fName, lName, email, username, password, password2, isHomeOwner, salesNum, salesNum2, origOwnerStatus, noSalesNum, yearsInHome, false);
        if (isHomeOwner == 100) {//it hasn't been made true or false by the radio buttons
            var brand = $("#brand_name").attr('data-brand');
            error_string += "Please tell us if you do or do not own a " + brand + " home";
        }
        //fName, lName, email, username, password, password2, isHomeOwner, salesNum, salesNum2, origOwnerStatus, noSalesNum, isProfile

        //error_string += NotebookUtils.validateRealtor(isRealtor, brokerOffice, brokerId);

        //SET lotBlock
        lotBlock = "";
        if (document.getElementById('regOwnerLotBlock'))
            lotBlock = document.getElementById('regOwnerLotBlock').value;

        // if there is an error_string, display the following.
        if (error_string != "") {
            myNotebookRegister.errorMessage1.innerHTML = error_string;
            show(myNotebookRegister.errorMessage1.parentNode);
            window.scrollTo(0, 0); //scroll to top to show the error messages better.
        }
        else {
            myNotebookRegister.errorMessage1.innerHTML = "";
            hide(myNotebookRegister.errorMessage1.parentNode);
            var context = { ajaxContainer: "regStep1SubmitDiv", ajaxBtn: "nextStep2", errObj: myNotebookRegister.errorMessage1 };
            ajaxLoading('regStep1SubmitDiv', 'nextStep2', 'start');
            Pulte08.AjaxWebServices.UserService.ValidateRegistrationStep1(fName, lName, email, username, salesNum, lotBlock, myNotebookRegister.callBackRegStep1, myNotebookRegister.callBackFailed, context);

        }
    },
    // ---------------------------- end: sumbitRegStep1 ----------------------------------------------------------------

    //callBackRegStep1
    callBackRegStep1: function(result, obj) {
        /* REG_SUCCESS, REG_USERNAME_EXISTS, REG_USER_IN_EAI, REG_FAILURE_VALIDATION, REG_FAILURE_UNKNOWN, REG_SUCCESS_VALID_SALESNUM, REG_SUCCESS_INVALID_SALES_NUM */
        if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS || result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS_VALID_SALESNUM) {
            myNotebookRegister.regStep = 2;
            // form validates, goto next step.
            hide(myNotebookRegister.errorMessage1.parentNode);
            hide(myNotebookRegister.register_step1);
            show(myNotebookRegister.register_step2);

            //if (document.getElementById("regHomeOwner").checked) //homeOwner
            if (document.getElementById('regHomeOwnerYes').checked) //homeOwner
            {
                show(myNotebookRegister.register_select_community);
            }

            if (result.Retcode != Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS) //homeOwner
            {
                show(myNotebookRegister.register_select_community);
                if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS_INVALID_SALESNUM) {
                    show(myNotebookRegister.register_invalid_salesnum);
                }
            }


            ////DO NOT SET THESE DEFAULTS - THESE ARE LOT ADDRESS AND WE WANT CURRENT ADDRESS
            //myNotebookRegister.addressLine1.value = result.StreetLine1;
            //myNotebookRegister.addressLine2.value = result.StreetLine2;
            //myNotebookRegister.city.value = result.City;
            //myNotebookRegister.zip.value = result.PostalCode;
            ////END - DO NOT SET THESE DEFAULTS - THESE ARE LOT ADDRESS AND WE WANT CURRENT ADDRESS


            if (result.StateAbbreviation != "") {
                ////DO NOT SET THESE DEFAULTS - THESE ARE LOT ADDRESS AND WE WANT CURRENT ADDRESS
                //for (index = 0; index < myNotebookRegister.registerState.length; index++) {
                //    if (myNotebookRegister.registerState[index].value == result.StateAbbreviation)
                //        myNotebookRegister.registerState.selectedIndex = index;
                //}
                ////END - DO NOT SET THESE DEFAULTS - THESE ARE LOT ADDRESS AND WE WANT CURRENT ADDRESS

                //myNotebookRegister.registerState.disabled = true;

                // myNotebookRegister.registerSelectCommunity.options.length = 0
                // if (myNotebookRegister.registerState.value != "") {
                //     myNotebookRegister.registerSelectCommunity.options[0] = new Option("Your Community...", result.CommunityID.toString(), true, true)
                // }


                myNotebookRegister.communityID.value = result.CommunityID;
                myNotebookRegister.planID.value = result.PlanID;
                //hide(myNotebookRegister.register_select_community);
                hide(myNotebookRegister.register_enter_community);


                //if (result.CommunityID == 0)
                //    show(myNotebookRegister.register_enter_community);

            }

            document.getElementById('registerAddress1').focus();

            if (result.StateAbbreviation != "") { // && myNotebookRegister.communityID.value != 0) {
                ajaxLoading('regStep1SubmitDiv', 'nextStep2', 'end');
                Pulte08.AjaxWebServices.UserService.LoadCommunitySelect(myNotebookRegister.registerState.value, myNotebookRegister.communityID.value, myNotebookRegister.callBackLoadCommunities);
            }
        }
        else {
            var err;
            if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS_INVALID_SALESNUM) {
                err = "We could not locate a match to your Agreement ID number.  Please re-enter and provide Lot Number or check \"Continue without an Agreement ID Number\"";
                if (document.getElementById("regOwnerSalesNumYes"))
                    if (document.getElementById("regOwnerSalesNumYes").checked)
                        err = "We could not locate a match to your Agreement ID number.  Please re-enter and provide Lot Number or check No to \"I have my Agreement ID Number\"";
            }
            else {
                if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_USER_REGISTERED) {
                    err = "The NAME and EMAIL you entered indicate you are already a registered user, please <a href='javascript:myNotebookSignIn.openPanel();'>Sign In</a>";
                }
                else {
                    if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_USERNAME_EXISTS) {
                        err = "The USERNAME that you entered is already in use. Please choose a different USERNAME";
                    }
                    else {
                        if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_FAILURE_VALIDATION || result == Pulte08.BusinessServices.User.enumRegisterCode.REG_FAILURE_UNKNOWN) {

                            err = result.Message;
                        }
                        else {
                            err = "The website is currently experiencing technical difficulties. Please try again later.";
                        }
                    }
                }


            }
            myNotebookRegister.errorMessage1.innerHTML = err;
            show(myNotebookRegister.errorMessage1.parentNode);
            window.scrollTo(0, 0); //scroll to top to show the error messages better.
        }
        ajaxLoading('regStep1SubmitDiv', 'nextStep2', 'end');
    },
    // ---------------------------- end: callBackStep1 -----------------------------------------------------------------

    //submitRegStep2
    submitRegStep2: function() {

        hide(this.errorMessageArea);
        var validity = true;
        var error_string = '';
        var isInternational = false;
        var address1, address2, city, state, zip, province, postalCode, country, phone1, phone2, phone3, hearAboutUs;
        var isHomeOwner, isOriginalHomeOwner, hasSalesNumber, salesNumber, yearsInHome, communityNotListed, communityName, communityID;
        var originalHomeOwnerSet;
        var element1 = document.getElementById('regDomestic');
        var element2 = document.getElementById('regInternational');
        if (!YUD.hasClass(element2, 'hide')) {
            isInternational = true;
        }

        address1 = document.getElementById('registerAddress1').value;
        address2 = document.getElementById('registerAddress2').value;
        city = document.getElementById("registerCity").value;
        state = document.getElementById('registerState').value;
        zip = document.getElementById('registerZip').value;
        province = document.getElementById('registerProvince').value;
        postalCode = document.getElementById("registerPostal").value;
        country = document.getElementById('registerCountry').value;
        phone1 = document.getElementById("regPrimaryPhone1").value + document.getElementById("regPrimaryPhone2").value + document.getElementById("regPrimaryPhone3").value;
        phone2 = document.getElementById("regSecondPhone1").value + document.getElementById("regSecondPhone2").value + document.getElementById("regSecondPhone3").value;
        error_string = NotebookUtils.validateAddress(address1, address2, city, state, zip, province, postalCode, country, isInternational);
        if (phone1 != "") error_string += NotebookUtils.validatePhoneNumbers(phone1, "PRIMARY PHONE");
        if (phone2 != "") error_string += NotebookUtils.validatePhoneNumbers(phone2, "SECONDARY PHONE");
        hearAboutUs = "";  //document.getElementById('registerFindSite').value;

        //var isHomeOwner, isOriginalHomeOwner, hasSalesNumber, salesNumber, yearsInHome, communityNotListed, communityName, communityID;
        //isHomeOwner = document.getElementById('regHomeOwner').checked;
        if (document.getElementById('regHomeOwnerYes').checked) { isHomeOwner = true; }
        if (document.getElementById('regHomeOwnerNo').checked) { isHomeOwner = false; }

        if (isHomeOwner) {
            //console.log("isHomeOwner3 = " + isHomeOwner);
            //ownerNoSalesNumInput

            //isOriginalHomeOwner = document.getElementById('regOriginalOwnerYes').checked;
            //hasSalesNumber = !document.getElementById('regOwnerNoSalesNum').checked;
            //if (hasSalesNumber)
            //    salesNumber = document.getElementById('regOwnerSalesNumber').value;
            //yearsInHome = document.getElementById('regOwnerYears').value;

            originalHomeOwnerSet = false;
            isOriginalHomeOwner = YUD.getElementsByClassName('regOriginalOwnerYes', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked;
            if (isOriginalHomeOwner)
                originalHomeOwnerSet = true;
            else
                originalHomeOwnerSet = YUD.getElementsByClassName('regOriginalOwnerNo', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked;
            salesNumber = "";



            hasSalesNumber = false;
            //lotBlock = "";
            salesNumber = "";
            if (originalHomeOwnerSet && isOriginalHomeOwner) {
                if (document.getElementById("regOwnerSalesNumYes"))
                    hasSalesNumber = document.getElementById("regOwnerSalesNumYes").checked;

                if (hasSalesNumber && document.getElementById("regOwnerNoSalesNum"))
                    hasSalesNumber = !document.getElementById("regOwnerNoSalesNum").checked;

                //hasSalesNumber = !YUD.getElementsByClassName('ownerNoSalesNumInput', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked;  //!document.getElementById('regOwnerNoSalesNum').checked;

                if (hasSalesNumber && document.getElementById("regOwnerSalesNumber"))
                    salesNumber = document.getElementById("regOwnerSalesNumber").value;

                if (document.getElementById("regOwnerSalesNumber"))
                    document.getElementById("regOwnerSalesNumber").value = salesNumber;

                //if (hasSalesNumber)
                //    salesNumber = YUD.getElementsByClassName('regOwnerSalesNumber', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value;  //document.getElementById('regOwnerSalesNumber').value;
                ////if (document.getElementById('regOwnerLotBlock'))
                ////    lotBlock = document.getElementById('regOwnerLotBlock').value;
            }



            //hasSalesNumber = !YUD.getElementsByClassName('ownerNoSalesNumInput', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked;  //!document.getElementById('regOwnerNoSalesNum').checked;
            //if (hasSalesNumber)
            //    salesNumber = YUD.getElementsByClassName('regOwnerSalesNumber', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value;  //document.getElementById('regOwnerSalesNumber').value;

            //yearsInHome = YUD.getElementsByClassName('regOwnerYears', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value;
            yearsInHome = 1;
            communityNotListed = YUD.getElementsByClassName('ownerNoCommunity', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked; //document.getElementById('ownerNoCommunity').checked;
            if (communityNotListed) {
                //communityID = 0;
                communityName = YUD.getElementsByClassName('registerEnterCommunity', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value; //document.getElementById('registerEnterCommunity').value;
                if (communityName == "")
                    error_string += "You must enter a COMMUNITY NAME.<br />";
            } else {
                var selectCommunity = YUD.getElementsByClassName('registerSelectCommunity', '', YUD.getElementsByClassName('registerPanelContent')[0])[0];
                communityID = selectCommunity.value;  //document.getElementById('registerSelectCommunity').value;
                communityName = selectCommunity[selectCommunity.selectedIndex].text; //document.getElementById('registerSelectCommunity')[document.getElementById('registerSelectCommunity').selectedIndex].text;
                if (communityID == "" || communityID == "0")
                    error_string += "You must select a COMMUNITY.<br />";
            }

        }



        // if there is an error_string, display the following.
        if (error_string != "") {
            this.errorMessage2.innerHTML = error_string;
            show(this.errorMessage2.parentNode);
            window.scrollTo(0, 0);
        }
        else {
            var regFirstname = document.getElementById('regFirstName').value;
            var regLastname = document.getElementById('regLastName').value;
            var regEmail = document.getElementById('regUserEmail').value;
            var username = document.getElementById('regUserName').value;
            var password = document.getElementById('regUserPassword').value;

            var user = new Pulte08.BusinessServices.User.UserEntity;

            user.FirstName = regFirstname;
            user.LastName = regLastname;
            user.Email = regEmail;
            user.Username = username;
            user.Address1 = address1;
            user.Address2 = address2;
            user.City = city;
            user.HearAboutWebsite = hearAboutUs;
            if (isInternational) {
                user.CountryCode = country;
                user.StateAbbreviation = province;
                user.PostalCode = postalCode;
                user.Phone1 = document.getElementById("regIntlPhone1").value;
                user.Phone2 = document.getElementById("regIntlPhone2").value;
            } else {
                user.CountryCode = "US";
                user.StateAbbreviation = state;
                user.PostalCode = zip;
                user.Phone1 = phone1;
                user.Phone2 = phone2;
                //user.Phone1 = (phone1 != "")?("(" + document.getElementById("regPrimaryPhone1").value + ") " + document.getElementById("regPrimaryPhone2").value + "-" + document.getElementById("regPrimaryPhone3").value):phone1;
                //user.Phone2 = (phone2 != "")?("(" + document.getElementById("regSecondPhone1").value + ") " + document.getElementById("regSecondPhone2").value + "-" + document.getElementById("regSecondPhone3").value):phone2;
            }
            user.IsRealtor = false;  //this.brokerFields.checked;
            user.BrokerOffice = "";  //document.getElementById('regBrokerOffice').value;
            user.BrokerTaxID = "";  //document.getElementById('regBrokerID').value;




            if (isHomeOwner) {
                user.SalesAgreementNumber = salesNumber;
                user.SalesNum = salesNumber;
                user.CommunityID = communityID;
                user.CommunityName = communityName;
                user.YearsInHome = yearsInHome;
                user.IsOriginalHomeOwner = isOriginalHomeOwner;

                //user.PlanID = (int)dr[DAOHelper.COL_HOMEOWNER_PLAN_ID];



            }







            ajaxLoading('regStep2SubmitDiv', 'completeStep2', 'start');

            var context = { ajaxContainer: "regStep2SubmitDiv", ajaxBtn: "completeStep2", errObj: myNotebookRegister.errorMessage2 };
            Pulte08.AjaxWebServices.UserService.Register(user, password, myNotebookRegister.callBackRegStep2, myNotebookRegister.callBackFailed, context);
        }
    },
    // ---------------------------- end: submitRegStep2 ----------------------------------------------------------------

    //callBackRegStep2
    callBackRegStep2: function(result, obj) {
        if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS) {
            myNotebookRegister.regStep = 1;
            hide(myNotebookRegister.errorMessage2.parentNode);
            hide(myNotebookRegister.register_step1);
            hide(myNotebookRegister.register_step2);
            show(myNotebookRegister.register_step3);
            // add atlas tag
            var seoImg = atlasTagCONFIG.getAtlasImageTag(atlasTagCONFIG.seoCatNotebook, atlasTagCONFIG.seoCatNotebook);
            if (seoImg != null) myNotebookRegister.register_step3.appendChild(seoImg);
            //document.getElementById("preferenceSearchState").focus();
            NotebookUtils.SetSignInStatus(true);
        }
        else {
            if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_USER_REGISTERED) {
                myNotebookRegister.errorMessage2.innerHTML = "";
                hide(myNotebookRegister.errorMessage2.parentNode);
                hide(myNotebookRegister.register_step2);
                show(myNotebookRegister.register_step1);
                myNotebookRegister.errorMessage1.innerHTML = "The NAME and EMAIL you entered indicate you are already a registered user, please <a href='javascript:myNotebookSignIn.openPanel();'>Sign In</a>";
                show(myNotebookRegister.errorMessage1.parentNode);
                window.scrollTo(0, 0);
            } else if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_USERNAME_EXISTS) {
                myNotebookRegister.errorMessage2.innerHTML = "";
                hide(myNotebookRegister.errorMessage2.parentNode);
                hide(myNotebookRegister.register_step2);
                show(myNotebookRegister.register_step1);
                myNotebookRegister.errorMessage1.innerHTML = "The USERNAME that you entered is already in use. Please choose a different USERNAME";
                show(myNotebookRegister.errorMessage1.parentNode);
                window.scrollTo(0, 0);
            } else if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_FAILURE_VALIDATION || result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_FAILURE_UNKNOWN) {
                myNotebookRegister.errorMessage2.innerHTML = result.Message;
                show(myNotebookRegister.errorMessage2.parentNode);
                window.scrollTo(0, 0);
            } else {
                myNotebookRegister.errorMessage2.innerHTML = "The website is not responding. Please try again later...";
                show(myNotebookRegister.errorMessage2.parentNode);
                window.scrollTo(0, 0);
            }
        }
        ajaxLoading('regStep2SubmitDiv', 'completeStep2', 'end');


        var isHomeOwner;
        if (document.getElementById('regHomeOwnerYes').checked) { isHomeOwner = true; }
        if (document.getElementById('regHomeOwnerNo').checked) { isHomeOwner = false; }
        if (isHomeOwner && result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS) { //SAVE HOMEOWNER INFO
            hide(myNotebookRegister.register_step3);
            show(myNotebookRegister.register_step2);
            ajaxLoading('regStep2SubmitDiv', 'completeStep2', 'start');

            var hasSalesNumber, salesNumber, yearsInHome, isOriginalHomeOwner, communityNotListed, communityID, communityName, userID, originalHomeOwnerSet, planID;
            salesNumber = '';

            originalHomeOwnerSet = false;
            isOriginalHomeOwner = YUD.getElementsByClassName('regOriginalOwnerYes', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked;
            if (isOriginalHomeOwner)
                originalHomeOwnerSet = true;
            else
                originalHomeOwnerSet = YUD.getElementsByClassName('regOriginalOwnerNo', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked;

            hasSalesNumber = false;
            lotBlock = "";
            salesNumber = "";
            if (originalHomeOwnerSet && isOriginalHomeOwner) {

                if (document.getElementById("regOwnerSalesNumYes"))
                    hasSalesNumber = document.getElementById("regOwnerSalesNumYes").checked;

                if (hasSalesNumber && document.getElementById("regOwnerNoSalesNum"))
                    hasSalesNumber = !document.getElementById("regOwnerNoSalesNum").checked;

                //hasSalesNumber = !YUD.getElementsByClassName('ownerNoSalesNumInput', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked;  //!document.getElementById('regOwnerNoSalesNum').checked;

                if (hasSalesNumber && document.getElementById("regOwnerSalesNumber"))
                    salesNumber = document.getElementById("regOwnerSalesNumber").value;
                if (hasSalesNumber && document.getElementById('regOwnerLotBlock'))
                    lotBlock = document.getElementById('regOwnerLotBlock').value;

                //SET TO BLANK IF NOT AN OWNER "WITH AGREEMENT ID"
                if (document.getElementById("regOwnerSalesNumber"))
                    document.getElementById("regOwnerSalesNumber").value = salesNumber;
                if (document.getElementById("regOwnerLotBlock"))
                    document.getElementById("regOwnerLotBlock").value = lotBlock;





                //hasSalesNumber = !YUD.getElementsByClassName('ownerNoSalesNumInput', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked;  //!document.getElementById('regOwnerNoSalesNum').checked;
                //if (hasSalesNumber)
                //    salesNumber = YUD.getElementsByClassName('regOwnerSalesNumber', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value;  //document.getElementById('regOwnerSalesNumber').value;
                //if (document.getElementById('regOwnerLotBlock'))
                //    lotBlock = document.getElementById('regOwnerLotBlock').value;
            }

            //yearsInHome = YUD.getElementsByClassName('regOwnerYears', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value;
            yearsInHome = 1;
            communityNotListed = YUD.getElementsByClassName('ownerNoCommunity', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].checked; //document.getElementById('ownerNoCommunity').checked;
            if (communityNotListed) {
                communityID = 0;
                communityName = YUD.getElementsByClassName('registerEnterCommunity', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value; //document.getElementById('registerEnterCommunity').value;
            } else {
                var selectCommunity = YUD.getElementsByClassName('registerSelectCommunity', '', YUD.getElementsByClassName('registerPanelContent')[0])[0];
                communityID = selectCommunity.value;  //document.getElementById('registerSelectCommunity').value;
                communityName = selectCommunity[selectCommunity.selectedIndex].text; //document.getElementById('registerSelectCommunity')[document.getElementById('registerSelectCommunity').selectedIndex].text;
            }

            planID = YUD.getElementsByClassName('registerPlanID', '', YUD.getElementsByClassName('registerPanelContent')[0])[0].value; //document.getElementById('registerEnterCommunity').value;
            if (planID == "")
                planID = 0;








            var context = { ajaxContainer: "regStep2SubmitDiv", ajaxBtn: "completeStep2", errObj: myNotebookRegister.errorMessage2 };
            Pulte08.AjaxWebServices.UserService.RegisterHomeOwner(salesNumber, communityID, communityName, isOriginalHomeOwner, yearsInHome, originalHomeOwnerSet, planID, lotBlock, myNotebookRegister.callBackRegStep2bHomeOwner, myNotebookRegister.callBackFailed, context);

        }
        else if (result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS) {
            s.tl("true", "o", "Successful Non-Owner Registration");
            Pulte08.AjaxWebServices.UserService.GetWindowUser(NotebookUtils.callBackSetWindowUser);
            RenderPortalControls();
        }

    },
    // ---------------------------- end: callBackRegStep2 --------------------------------------------------------------

    //callBackRegStep2bHomeOwner
    callBackRegStep2bHomeOwner: function(result, obj) {
        if (result == "") { //(result.Retcode == Pulte08.BusinessServices.User.enumRegisterCode.REG_SUCCESS) {
            myNotebookRegister.regStep = 1;
            hide(myNotebookRegister.errorMessage2.parentNode);
            hide(myNotebookRegister.register_step1);
            hide(myNotebookRegister.register_step2);
            show(myNotebookRegister.register_step3);

            s.tl("true", "o", "Successful Owner Registration");

            //document.getElementById("preferenceSearchState").focus();
            //NotebookUtils.SetSignInStatus(true);
        }
        else {
            myNotebookRegister.errorMessage2.innerHTML = "Registration completed but Home Owner info was not saved.  Please edit your information in My Profile...";
            show(myNotebookRegister.errorMessage2.parentNode);
            window.scrollTo(0, 0);
        }

        Pulte08.AjaxWebServices.UserService.GetWindowUser(NotebookUtils.callBackSetWindowUser);

        ajaxLoading('regStep2SubmitDiv', 'completeStep2', 'end');


        //var sPath = window.location.pathname;
        ////var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        //if (sPath.toLowerCase().indexOf('portal') > 0)
        //    window.location.href = sPath;
        RenderPortalControls();


    },
    // ---------------------------- end: callBackRegStep2bHomeOwner --------------------------------------------------------------

    // callBackFailed
    callBackFailed: function(result, obj) {
        obj.errObj.innerHTML = "The website is not responding. Please try again later...";
        show(obj.errObj.parentNode);
        ajaxLoading(obj.ajaxContainer, obj.ajaxBtn, 'end');
        window.scrollTo(0, 0);
    },
    // -------------------------- end: callBackFailed ------------------------------------------------------------------

    // loadHTML
    loadHTML: function(result) {

        var regDiv = document.getElementById("registerPanel");
        regDiv.innerHTML = result;
        myNotebookRegister.initVars();

        renderNotebookRegisterCorners();
        /*
        Rounded('registerPanelCorners','div','all','transparent','#F5F9FD'); // my notebook register in
        Rounded('errorMessageArea','div','all','transparent','#B35817'); // my notebook error messages
        Rounded('infoBoxCornersNBReg','div','all','transparent','#FFF','border #9EC7E6'); // content info boxes
        Rounded('infoToolTipCorners','div','all','transparent','#FFF','border #D6BB85');
        */
        myNotebookRegister.isHTMLLoaded = true;
        // add event listen becuase the html is generated in the backend
        // listen to Regiser link click
        myNotebookRegister.addPanelListeners();
        // load styleInput
        var checkboxes = YUD.getElementsByClassName("styleInput", "input", "register_step1");
        for (var i = 0; i < checkboxes.length; i++) {
            CheckboxRadioStyle.addCheckboxStyle(checkboxes[i], i);
        }
        setbrokerFields("registerPanel");
        setownerFields("registerPanel");
        switchAddress("registerPanel");
        styleTextInput(regDiv);
        //var stateSearchFld = document.getElementById("preferenceSearchState");
        //populateStateOptions(stateSearchFld);
        //populateHearAboutUsOptions("registerPanel");
        myNotebookRegister.openPanel();

    },
    // --------------------------- end: loadHTML -----------------------------------------------------------------------

    //loadTrigger
    loadTrigger: function(domObj) {
        var triggers;
        if (typeof domObj == "undefined") {
            triggers = YUD.getElementsByClassName('registerPanelTrigger', 'A');
        } else {
            triggers = YUD.getElementsByClassName('registerPanelTrigger', 'A', domObj);
        }
        // listen to Regiser link click
        YUE.addListener(triggers, 'click', function() {
            //alert("Trigger"); alert(myNotebookRegister.isHTMLLoaded);
            // if we already loaded the html to the dom, just open the panel
            if (!myNotebookRegister.isHTMLLoaded) {
                Pulte08.AjaxWebServices.UserService.GetRegistrationHTML(myNotebookRegister.loadHTML);
            } else {
                myNotebookRegister.openPanel();
            }
        });
    },
    // ----------------------------- end: loadTrigger ------------------------------------------------------------------

    //callBackLoadCommunities
    callBackLoadCommunities: function(optionsArray) {
        for (var i = 0; i < optionsArray.length; i++) {
            myNotebookRegister.registerSelectCommunity.options[i] = new Option(optionsArray[i].Display, optionsArray[i].Value)
        }

        if (myNotebookRegister.communityID.value != "" && myNotebookRegister.communityID.value != "0") {
            for (index = 0; index < myNotebookRegister.registerSelectCommunity.length; index++) {
                if (myNotebookRegister.registerSelectCommunity[index].value == myNotebookRegister.communityID.value) {
                    myNotebookRegister.registerSelectCommunity.selectedIndex = index;
                }
            }

        }

    },
    // ----------------------------- end: callBackLoadCommunities ------------------------------------------------------------------

    //toggleEnterCommunity
    toggleEnterCommunity: function() {
        if (YUD.hasClass(myNotebookRegister.register_enter_community, 'show')) myNotebookRegister.ownerNoCommunity.checked = false;
        (YUD.hasClass(myNotebookRegister.register_enter_community, 'hide')) ? document.getElementById("register_select_community").disabled = true : document.getElementById("register_select_community").disabled = false;
        (YUD.hasClass(myNotebookRegister.register_enter_community, 'hide')) ? YUD.replaceClass(myNotebookRegister.register_enter_community, 'hide', 'show') : YUD.replaceClass(myNotebookRegister.register_enter_community, 'show', 'hide');

    },
    // ----------------------------- end: toggleEnterCommunity ------------------------------------------------------------------

    // addPanelListeners
    addPanelListeners: function() {

        YUE.addListener(YUD.getElementsByClassName('signInTrigger', 'A', 'registerPanel'), 'click', function() {
            myNotebookSignIn.openPanel();
        });

        // listen to sign out link
        YUE.addListener(YUD.getElementsByClassName('signOutTrigger', 'A', 'registerPanel'), 'click', function() {
            Pulte08.AjaxWebServices.UserService.SignOut(NotebookUtils.callBackSignout);
        });

        // cancel / close
        YUE.addListener([myNotebookRegister.cancelLink, myNotebookRegister.thanksStep3], 'click', function() {
            myNotebookRegister.closePanel();
        });

        // cancel / close
        YUE.addListener(myNotebookRegister.closeDialog, 'click', function() {
            myNotebookPanel.openPanel();
        });

        // form validation for step 1 of registration
        YUE.addListener(myNotebookRegister.nextStep2, 'click', function() {
            myNotebookRegister.submitRegStep1();
        });

        // form validation for step 2 of registration
        YUE.addListener(myNotebookRegister.completeStep2, 'click', function() {
            myNotebookRegister.submitRegStep2();
        });
        // listen to infoTooltip
        var targets = YUD.getElementsByClassName('infoToolTipContainer', "div", "registerPanel");
        for (var i = 0; i < targets.length; i++) { createInfoToolTips(targets[i]) }

        // listen to enter key
        var registerKeyPress = new YAHOO.util.KeyListener(document.NotebookRegisterForm, { keys: 13 }, myNotebookRegister.submitRegForm);
        registerKeyPress.enable();



        // State Change
        YUE.addListener([myNotebookRegister.registerState], 'change', function() {
            ajaxLoading('myProfileSubmitDiv', 'profileLink', 'start');
            myNotebookRegister.registerSelectCommunity.options.length = 0
            if (myNotebookRegister.registerState.value == "") {
                myNotebookRegister.registerSelectCommunity.options[0] = new Option("Select a state first in order to see the list of communities available...", "", true, true)
                ajaxLoading('myProfileSubmitDiv', 'profileLink', 'end');
            }
            else {
                Pulte08.AjaxWebServices.UserService.LoadCommunitySelect(myNotebookRegister.registerState.value, myNotebookRegister.communityID.value, myNotebookRegister.callBackLoadCommunities);
                ajaxLoading('myProfileSubmitDiv', 'profileLink', 'end');

                //myNotebookRegister.registerSelectCommunity.options[0] = new Option("Comm 1", "1")
                //myNotebookRegister.registerSelectCommunity.options[1] = new Option("Comm 2", "2")
            }

            //alert(myNotebookRegister.registerState.value);
            //myNotebookPanel.closeSubPanel();
        });








        // CommunityNotListed
        YUE.addListener([myNotebookRegister.ownerNoCommunity], 'click', function() {
            myNotebookRegister.toggleEnterCommunity(); //(YUD.hasClass(myNotebookRegister.register_enter_community, 'hide')) ? YUD.replaceClass(myNotebookRegister.register_enter_community, 'hide', 'show') : YUD.replaceClass(myNotebookRegister.register_enter_community, 'show', 'hide');
        });


        // CommunityNotListed
        YUE.addListener([myNotebookRegister.cancelEnterCommunity], 'click', function() {
            myNotebookRegister.toggleEnterCommunity(); //(YUD.hasClass(myNotebookRegister.register_enter_community, 'hide')) ? YUD.replaceClass(myNotebookRegister.register_enter_community, 'hide', 'show') : YUD.replaceClass(myNotebookRegister.register_enter_community, 'show', 'hide');
        });












    }
    // --------------------------- end: addPanelListeners --------------------------------------------------------------
};
// ------------------------------- end: myNotebookRegister -------------------------------------------------------------

// myNotebookRecentlyViewed
var myNotebookViewedControl = {
    loadingDiv: null,
    // addPanelListeners
    addPanelListeners: function(){
        myNotebookViewedControl.loadingDiv = document.getElementById("recentlyViewedLoadingDiv");
        var regTrigger = document.getElementById('RecentCommunitiesTrigger');
        if(regTrigger){
           YUE.addListener(regTrigger,'click',function() {
               // check toggle, if show, call ajax
               setTimeout(function(){
                   var target = document.getElementById(NOTEBOOKCONFIG.viewedSubPanel.panel);
                   if(YUD.hasClass(target, "show")){
                       if(myNotebookViewedControl.loadingDiv){show(myNotebookViewedControl.loadingDiv);}
                       Pulte08.AjaxWebServices.RecentlyViewedService.RenderView(myNotebookViewedControl.callBackRenderResult);
                   }
               }, 100);
            });
        }
    },
    // ---------------------------- end: addPanelListeners -------------------------------------------------------------

    // callBackRenderResult
    callBackRenderResult: function(result){
        document.getElementById("vNeighborhoodListings").innerHTML = result;
        NotebookUtils.renderRoundCorner('hdrBarViewed');
        if(myNotebookViewedControl.loadingDiv){hide(myNotebookViewedControl.loadingDiv);}
    },
    // ----------------------------- end: callBackRenderResult ---------------------------------------------------------

    // refreshResult
    refreshResult: function(){
        Pulte08.AjaxWebServices.RecentlyViewedService.RenderView(myNotebookViewedControl.callBackRenderResult);
    }
    // ------------------------------- end: refresh result -------------------------------------------------------------
};
// ------------------------------ end: myNotebookRecentlyViewed --------------------------------------------------------

// myNotebookSavedControl
var myNotebookSavedControl = {
    // addPanelListeners
    loadingDiv: null,

    addPanelListeners: function(){
        myNotebookSavedControl.loadingDiv = document.getElementById("SavedCommunitiesLoadingDiv");
        var regTrigger = document.getElementById('SavedCommunitiesTrigger');
        if(regTrigger){
            YUE.addListener(regTrigger,'click',function() {
                setTimeout(function(){
                   var target = document.getElementById(NOTEBOOKCONFIG.savedSubPanel.panel);
                   if(YUD.hasClass(target, "show")){
                       if(myNotebookSavedControl.loadingDiv){show(myNotebookSavedControl.loadingDiv);}
                       Pulte08.AjaxWebServices.SavedProductsService.RenderView(myNotebookSavedControl.callBackRenderResult);
                   } else {
                       hide(myNotebookPanel.allSubPanels);
                   }
               }, 100);
            });
        }
    },
    // -------------------------- end: addPanelListeners ---------------------------------------------------------------
    // callBackRenderResult
    callBackRenderResult: function(result){
        // remove listeners
        myNotebookSavedControl.updateToggleListeners(true);
        myNotebookSavedControl.updateNoteCounter(true);
        var actionBar = document.getElementById("SaveCommunitiesActions");
        if(result == ""){
            document.getElementById("SavedCommunities").innerHTML = "<p><br />Please explore communities and plans.</p>";
            hide(actionBar);
        }else {
            document.getElementById("SavedCommunities").innerHTML = result;
            // display actions
            show(actionBar);

            NotebookUtils.renderRoundCorner('hdrBar');
            // add toggle listeners
            myNotebookSavedControl.updateToggleListeners(false);
            myNotebookSavedControl.updateNoteCounter(false);
        }
        if(myNotebookSavedControl.loadingDiv){hide(myNotebookSavedControl.loadingDiv);}
    },
    // ----------------------------- end: callBackRenderResult ---------------------------------------------------------
    // refreshResult
    refreshResult: function(){
        if(myNotebookSavedControl.loadingDiv){show(myNotebookSavedControl.loadingDiv);}
        Pulte08.AjaxWebServices.SavedProductsService.RenderView(myNotebookSavedControl.callBackRenderResult);
    },
    // ------------------------------- end: refresh result -------------------------------------------------------------
    //updateToggleListeners
    updateToggleListeners: function(isRemoved){

        var theObject = YUD.getElementsByClassName('toggle', "div", "SavedCommunities");
        for (var i=0; i < theObject.length; i++) {
            var theTrigger = YUD.getElementsByClassName('toggleTrigger','',theObject[i])[0];
            if(theTrigger){
                if(isRemoved){
                    YUE.purgeElement(theTrigger);
                }else {
                    // if it is a notes link, check if we use has logged in
                    if(theTrigger.className && YUD.hasClass(theTrigger, "notesLink")){
                        if(NotebookUtils.getSignInStatus()){
                            handleDropDown(theObject[i], theTrigger);
                        } else{
                            YUE.addListener(theTrigger, 'click', function(){NotebookUtils.displayRegMarketingInfo(true);})
                        }
                    } else {
                        handleDropDown(theObject[i], theTrigger);
                    }
                }
            }
        }
    },
    // -------------------------------- end: udpateToggleListeners -----------------------------------------------------
    //updateNoteCounter
    updateNoteCounter: function(isRemoved){
        if(isRemoved){
            // remove listeners
            var targets = YUD.getElementsByClassName('charTarget', "textarea", "SavedCommunities");
            for(var i=0; i < targets.length; i++){
                YUE.purgeElement(targets[i]);
            }
        } else {
            // add listener
            var targets = YUD.getElementsByClassName('charCount', "div", "SavedCommunities");
            for (var i=0; i < targets.length; i++) {
                charCount(targets[i], 255);
            }
        }
    }
    // --------------------------------- end: updateNoteCounter --------------------------------------------------------
};
// ------------------------------------- end: myNotebookSavedControl ---------------------------------------------------

// myNotebookProfileControl
var myNotebookProfileControl = {

    profileState: null,
    profileSelectCommunity: null,
    profile_enter_community: null,
    ownerNoCommunity: null,
    cancelEnterCommunity: null,
    ownerFields: null,
    origOwnerFields: null,
    communityID: null,

    // initVars
    initVars: function() {
        //this.overlayPanel = new YAHOO.widget.Overlay('profilePanel', { context: ["notebookAnchor", "tr", "tr"], 'width': 350, 'visible': false, 'zIndex': 1000 });
        //this.overlayPanel.render();
        this.profileState = document.getElementById('profileState');
        this.profileSelectCommunity = document.getElementById('profileSelectCommunity');
        //this.profile_enter_community = document.getElementById('profile_enter_community');
        //this.ownerNoCommunity = document.getElementById('ownerNoCommunity');
        //this.cancelEnterCommunity = document.getElementById('');
        this.ownerNoCommunity = YUD.getElementsByClassName('profileOwnerNoCommunity', null, 'notebookSubPanelProfile')[0];
        this.register_enter_community = YUD.getElementsByClassName('profile_enter_community', null, 'notebookSubPanelProfile')[0];
        this.cancelEnterCommunity = YUD.getElementsByClassName('cancelEnterCommunity', null, 'notebookSubPanelProfile')[0];
        this.ownerFields = YUD.getElementsByClassName('ownerFields', null, 'notebookSubPanelProfile')[0];
        this.origOwnerFields = YUD.getElementsByClassName('origOwnerFields', null, 'notebookSubPanelProfile')[0];
        this.communityID = YUD.getElementsByClassName('communityID', null, 'notebookSubPanelProfile')[0];
        this.profile_enter_community = YUD.getElementsByClassName('profile_enter_community', null, 'notebookSubPanelProfile')[0];
        this.cancelEnterCommunity = YUD.getElementsByClassName('cancelEnterCommunity', null, 'notebookSubPanelProfile')[0];

    },
    // ---------------------------- end: initVars ----------------------------------------------------------------------



    // addPanelListeners
    addPanelListeners: function() {
        var proTrigger = document.getElementById('ProfileTrigger');
        if (proTrigger) {
            YUE.addListener(proTrigger, 'click', function() {
                setTimeout(function() {
                    var target = document.getElementById(NOTEBOOKCONFIG.profileSubPanel.panel);
                    if (YUD.hasClass(target, "show")) {
                        myNotebookProfileControl.callBackSignInResult(NotebookUtils.getSignInStatus());
                        var proDiv = document.getElementById("profileRegisterInfo");
                        if (proDiv.style.display == "none")
                            document.profileInfo.profileFirstName.focus();
                    }
                }, 100);
            });

        };  //HERE




        var proStateTrigger = document.getElementById('profileState');
        if (proStateTrigger) {

            YUE.addListener([myNotebookProfileControl.profileState], 'change', function() {
                ajaxLoading('myProfileSubmitDiv', 'profileLink', 'start');
                myNotebookProfileControl.profileSelectCommunity.options.length = 0
                if (myNotebookProfileControl.profileState.value == "") {
                    myNotebookProfileControl.profileSelectCommunity.options[0] = new Option("Select a state first in order to see the list of communities available...", "", true, true)
                    ajaxLoading('myProfileSubmitDiv', 'profileLink', 'end');
                }
                else {
                    Pulte08.AjaxWebServices.UserService.LoadCommunitySelect(myNotebookProfileControl.profileState.value, myNotebookProfileControl.communityID.value, myNotebookProfileControl.callBackLoadCommunities);
                    ajaxLoading('myProfileSubmitDiv', 'profileLink', 'end');

                    //myNotebookProfileControl.profileSelectCommunity.options[0] = new Option("Comm 1", "1")
                    //myNotebookProfileControl.profileSelectCommunity.options[1] = new Option("Comm 2", "2")
                }

                //alert(myNotebookProfileControl.profileState.value);
                //myNotebookPanel.closeSubPanel();
            });


            // CommunityNotListed
            YUE.addListener([myNotebookProfileControl.ownerNoCommunity], 'click', function() {
                myNotebookProfileControl.toggleEnterCommunity(); //(YUD.hasClass(myNotebookProfileControl.profile_enter_community, 'hide')) ? YUD.replaceClass(myNotebookProfileControl.profile_enter_community, 'hide', 'show') : YUD.replaceClass(myNotebookProfileControl.profile_enter_community, 'show', 'hide');
            });


            // CommunityNotListed
            YUE.addListener([myNotebookProfileControl.cancelEnterCommunity], 'click', function() {
                myNotebookProfileControl.toggleEnterCommunity(); //(YUD.hasClass(myNotebookProfileControl.profile_enter_community, 'hide')) ? YUD.replaceClass(myNotebookProfileControl.profile_enter_community, 'hide', 'show') : YUD.replaceClass(myNotebookProfileControl.profile_enter_community, 'show', 'hide');
            });

        }
    },













    // -------------------------- end: addPanelListeners ---------------------------------------------------------------
    // callBackSignInResult
    callBackSignInResult: function(result) {
        var profileDiv = document.getElementById("profileDetailInfo");
        var regDiv = document.getElementById("profileRegisterInfo");
        if (result) {
            profileDiv.style.display = "";
            regDiv.style.display = "none";
            Pulte08.AjaxWebServices.UserService.GetProfileInfo(myNotebookProfileControl.callBackRenderResult);
        } else {
            regDiv.style.display = "";
            profileDiv.style.display = "none";
        }
        Pulte08.AjaxWebServices.UserService.GetWindowUser(NotebookUtils.callBackSetWindowUser);
    },
    // ----------------------------- end: callBackSignInResult ---------------------------------------------------------




    // callBackRenderResult
    callBackRenderResult: function(result) {
        Pulte08.AjaxWebServices.UserService.GetWindowUser(myNotebookProfileControl.callBackSetWindowUser);
        if (document.getElementById("myNotebookPanel") != null) {
            myNotebookPanel.profileError.innerHTML = "";
            hide(myNotebookPanel.profileError.parentNode);
        }
        if ((result != null) && (result.UserID != 0)) {
            //updateProfileArea
            if (document.getElementById("profileFirstName")) {
                document.getElementById("profileFirstName").value = result.FirstName;
                document.getElementById("profileLastName").value = result.LastName;
                document.getElementById("profileUserEmail").value = result.Email;
                document.getElementById("profileUserName").value = result.Username;
                document.getElementById("profileAddress1").value = (result.Address1 && result.Address1 != "null") ? result.Address1 : "";
                document.getElementById("profileAddress2").value = (result.Address2 && result.Address2 != "null") ? result.Address2 : "";
                document.getElementById("profileCity").value = (result.City && result.City != "null") ? result.City : "";
                document.getElementById("profileZip").value = (result.PostalCode && result.PostalCode != "null") ? result.PostalCode : "";
                document.getElementById("profilePhone1").value = (result.Phone1 && result.Phone1 != "null") ? result.Phone1 : "";
                document.getElementById("profilePhone2").value = (result.Phone2 && result.Phone2 != "null") ? result.Phone2 : "";
                if (result.CountryCode && result.CountryCode != "null" && result.CountryCode != "" && result.CountryCode != "US") {
                    document.getElementById("profilePostal").value = (result.PostalCode && result.PostalCode != "null") ? result.PostalCode : "";
                    // for international address it can be either one of two values:
                    document.getElementById("profileProvince").value = (result.ProvinceRegion && result.ProvinceRegion != "null") ? result.ProvinceRegion : (result.StateAbbreviation && result.StateAbbreviation != "null") ? result.StateAbbreviation : "";
                    // display international section
                    var intl = YUD.getElementsByClassName("international", "div", "profileDetailInfo")[0];
                    populateCountryOptions(intl);
                    YUD.addClass(intl, 'loaded');
                    toggleAddress("profileDetailInfo", "international");
                    setSelectBoxValue(document.getElementById("profileCountry"), result.CountryCode);
                }
                else {
                    setSelectBoxValue(document.getElementById("profileState"), result.StateAbbreviation);
                    setSelectBoxValue(document.getElementById("profileCountry"), result.CountryCode);
                    document.getElementById("profileProvince").value = "";
                    document.getElementById("profilePostal").value = "";
                    document.getElementById("profileZip").value = (result.PostalCode && result.PostalCode != "null") ? result.PostalCode : "";
                    toggleAddress("profileInfo", "domestic");
                }

                document.getElementById("profileHomeOwner").checked = false;

                var hasCommunity = false;
                if (result.CommunityID != null)
                    if (result.CommunityID != 0)
                    hasCommunity = true;

                if (!hasCommunity && result.CommunityName != null)
                    if (result.CommunityName != "")
                    hasCommunity = true;

                document.getElementById("proOwnerNoSalesNum").checked = false;
                document.getElementById("proOriginalOwnerYes").checked = false;
                document.getElementById("proOriginalOwnerNo").checked = false;
                document.getElementById("profileOwnerNoCommunity").checked = false;
                document.getElementById("proOwnerSalesNumber").disabled = false;
                document.getElementById("proOwnerLotBlock").disabled = false;
                hide(YUD.getElementsByClassName('ownerFields', 'div', ''));
                YUD.replaceClass(myNotebookProfileControl.ownerFields, 'show', 'hide')
                hide(document.getElementById("profile_enter_community"));


                if (hasCommunity) //(result.CommunityID != 0 || result.CommunityName != "")  //HOMEOWNER
                {
                    document.getElementById("profileAddress1").value = result.Address1;  //.StreetLine1;
                    document.getElementById("profileAddress2").value = result.Address2;  //.StreetLine2;
                    document.getElementById("profileCity").value = result.City;
                    document.getElementById("profileZip").value = result.PostalCode;

                    document.getElementById("profileHomeOwner").checked = true;
                    //document.getElementById("profileHomeOwner").setAttribute('checked', 'checked');
                    //document.getElementById("profileHomeOwner").value = "on";
                    //document.getElementById("profileHomeOwner").checked = true;


                    if (result.IsOriginalHomeOwner) {
                        document.getElementById("proOriginalOwnerYes").checked = true;
                        YUD.replaceClass(myNotebookProfileControl.origOwnerFields, 'hide', 'show');
                    }
                    else {
                        document.getElementById("proOriginalOwnerNo").checked = true;
                        YUD.replaceClass(myNotebookProfileControl.origOwnerFields, 'show', 'hide');
                    }

                    document.getElementById("proOwnerSalesNumber").value = result.SalesNum;
                    document.getElementById("proOwnerLotBlock").value = result.lotBlock;
                    //document.getElementById("proOwnerYears").value = result.YearsInHome;

                    setSelectBoxValue(document.getElementById("proOwnerYears"), result.YearsInHome);


                    show(YUD.getElementsByClassName('ownerFields', 'div', ''));
                    YUD.replaceClass(myNotebookProfileControl.ownerFields, 'hide', 'show')

                    if (result.SalesNum == "") {
                        document.getElementById("proOwnerNoSalesNum").checked = true;
                        document.getElementById("proOwnerSalesNumber").disabled = true;
                        document.getElementById("proOwnerLotBlock").disabled = true;






                        //var ownerNoSalesNumFields = YUD.getElementsByClassName('ownerNoSalesNumFields', 'div', el)[0];
                        var ownerNoSalesNumFields = YUD.getElementsByClassName('ownerNoSalesNumFields', 'div')[0];

                        if (ownerNoSalesNumFields)
                            YUD.replaceClass(ownerNoSalesNumFields, 'hide', 'show');
                        //YUD.replaceClass(ownerNoSalesNumFields, 'show', 'hide');
                        //(YUD.hasClass(ownerNoSalesNumFields,'hide') ) ? YUD.replaceClass(ownerNoSalesNumFields,'hide','show') : YUD.replaceClass(ownerNoSalesNumFields,'show','hide');




                    }
                    if (result.CommunityID == 0) {

                        document.getElementById("profileOwnerNoCommunity").checked = true;
                        show(document.getElementById("profile_enter_community"));
                        document.getElementById("profileEnterCommunity").value = result.CommunityName;
                    }
                    else {
                        myNotebookProfileControl.communityID.value = result.CommunityID;
                        document.getElementById("profileEnterCommunity").value = result.CommunityName;
                    }


                }
                else {

                    //document.getElementById("profileHomeOwner").removeAttribute('checked');
                    document.getElementById("profileHomeOwner").checked = false;
                    document.getElementById("proOriginalOwnerYes").checked = false;
                    document.getElementById("proOriginalOwnerNo").checked = false;
                    document.getElementById("proOwnerSalesNumber").value = '';
                    document.getElementById("proOwnerLotBlock").value = "";
                    setSelectBoxValue(document.getElementById("proOwnerYears"), '');
                    hide(YUD.getElementsByClassName('ownerFields', 'div', ''));
                    YUD.replaceClass(myNotebookProfileControl.ownerFields, 'show', 'hide');
                    YUD.replaceClass(myNotebookProfileControl.origOwnerFields, 'show', 'hide');
                    document.getElementById("proOwnerNoSalesNum").checked = false;
                    if (document.getElementById("profileOwnerNoCommunity"))
                        document.getElementById("profileOwnerNoCommunity").checked = false;
                    hide(document.getElementById("profile_enter_community"));
                    myNotebookProfileControl.communityID.value = 0;

                }


                var controlImg = YUD.getPreviousSibling("profileHomeOwner");
                if (document.getElementById("profileHomeOwner").checked) {
                    if (controlImg != null) {
                        controlImg.src = returnCheckboxImgTrue('profileHomeOwner');
                    }
                } else {
                    if (controlImg != null) {
                        controlImg.src = returnCheckboxImgFalse('profileHomeOwner');
                    }
                }
                controlImg = YUD.getPreviousSibling("proOwnerNoSalesNum");
                if (document.getElementById("proOwnerNoSalesNum").checked) {
                    if (controlImg != null) {
                        controlImg.src = returnCheckboxImgTrue('proOwnerNoSalesNum');
                    }
                } else {
                    if (controlImg != null) {
                        controlImg.src = returnCheckboxImgFalse('proOwnerNoSalesNum');
                    }
                }
                controlImg = YUD.getPreviousSibling("profileOwnerNoCommunity");
                if (document.getElementById("profileOwnerNoCommunity").checked) {
                    if (controlImg != null) {
                        controlImg.src = returnCheckboxImgTrue('profileOwnerNoCommunity');
                    }
                } else {
                    if (controlImg != null) {
                        controlImg.src = returnCheckboxImgFalse('profileOwnerNoCommunity');
                    }
                }



                // update realtor info
                //var controlImg = YUD.getPreviousSibling("profileRealtor");
                //if (result.IsRealtor) {
                //    document.getElementById("profileRealtor").checked = true;
                //    if (controlImg != null) {
                //        controlImg.src = returnCheckboxImgTrue('regRealtor');
                //    }
                //    var realtorDiv = YUD.getElementsByClassName("brokerFields", "div", "profileDetailInfo")[0];
                //    if (realtorDiv) show(realtorDiv);
                //
                //} else {
                //    document.getElementById("profileRealtor").checked = false;
                //    if (controlImg != null) {
                //        controlImg.src = returnCheckboxImgFalse('regRealtor');
                //   }
                //}
                //document.getElementById("profileBrokerOffice").value = (result.BrokerOffice && result.BrokerOffice != "null") ? result.BrokerOffice : "";
                //document.getElementById("profileBrokerID").value = (result.BrokerTaxID && result.BrokerTaxID != "null") ? result.BrokerTaxID : "";
            }
            // Update Share Area
            if (document.getElementById("shareFirstName")) {
                document.getElementById("shareFirstName").value = result.FirstName;
                document.getElementById("shareLastName").value = result.LastName;
                document.getElementById("shareEmail").value = result.Email;
            }
            // update Directions Area
            if (document.getElementById("driveAddress")) {
                document.getElementById("driveAddress").value = result.Address1;
                document.getElementById("driveCity").value = result.City;
                setSelectBoxValue(document.getElementById("driveState"), result.StateAbbreviation);
                document.getElementById("driveZip").value = result.PostalCode;
            }
            // update welcome Text
            var userWelcomeText = document.getElementById("userWelcomeText");
            userWelcomeText.innerHTML = "Welcome Home, " + result.FirstName;
            myNotebookSignIn.errorMessage.innerHTML = '';
        }
        // populate contact us form
        if (document.contact) populateContactForm("in");
        // populate tell a friend form
        if (document.tell) populateTellForm();
        // populate predefined landing page
        if (document.LandingSignUpForm) SoftJoinControl.populateSignUpForm();
        if (document.advisorContact) PopulateAdvisorContactForm();
        //populatePortalContactForms();


        //if (result.CommunityID != 0 || result.CommunityName != "")  //HOMEOWNER
        Pulte08.AjaxWebServices.UserService.LoadCommunitySelect(myNotebookProfileControl.profileState.value, myNotebookProfileControl.communityID.value, myNotebookProfileControl.callBackLoadCommunities);


        //******RENDERPOTALCONTROL HERE???*********//

    },
    // ------------------------------ end: callBackRenderResult --------------------------------------------------------


    //callBackLoadCommunities
    callBackLoadCommunities: function(optionsArray) {
        var communityFound = false;
        for (var i = 0; i < optionsArray.length; i++) {
            myNotebookProfileControl.profileSelectCommunity.options[i] = new Option(optionsArray[i].Display, optionsArray[i].Value)
        }

        if (myNotebookProfileControl.communityID.value != "" && myNotebookProfileControl.communityID.value != "0") {
            for (index = 0; index < myNotebookProfileControl.profileSelectCommunity.length; index++) {
                if (myNotebookProfileControl.profileSelectCommunity[index].value == myNotebookProfileControl.communityID.value) {
                    myNotebookProfileControl.profileSelectCommunity.selectedIndex = index;
                    communityFound = true;
                }
            }
            if (!communityFound && (document.getElementById("profileEnterCommunity").value != "")) //user is logged on to a different brand's site
            {
                myNotebookProfileControl.profileSelectCommunity.options[myNotebookProfileControl.profileSelectCommunity.options.length] = new Option(document.getElementById("profileEnterCommunity").value, myNotebookProfileControl.communityID.value);
                myNotebookProfileControl.profileSelectCommunity.selectedIndex = myNotebookProfileControl.profileSelectCommunity.options.length - 1;
            }
        }


    },
    // ----------------------------- end: callBackLoadCommunities ------------------------------------------------------------------

    //toggleEnterCommunity
    toggleEnterCommunity: function() {
        if (YUD.hasClass(myNotebookProfileControl.profile_enter_community, 'show')) myNotebookProfileControl.ownerNoCommunity.checked = false;
        (YUD.hasClass(myNotebookProfileControl.profile_enter_community, 'hide')) ? document.getElementById("profile_select_community").disabled = true : document.getElementById("profile_select_community").disabled = false;
        (YUD.hasClass(myNotebookProfileControl.profile_enter_community, 'hide')) ? YUD.replaceClass(myNotebookProfileControl.profile_enter_community, 'hide', 'show') : YUD.replaceClass(myNotebookProfileControl.profile_enter_community, 'show', 'hide');

        var controlImg = YUD.getPreviousSibling("profileOwnerNoCommunity");
        if (document.getElementById("profileOwnerNoCommunity").checked) {
            if (controlImg != null) {
                controlImg.src = returnCheckboxImgTrue('profileOwnerNoCommunity');
            }
        } else {
            if (controlImg != null) {
                controlImg.src = returnCheckboxImgFalse('profileOwnerNoCommunity');
            }
        }

    }
    // ----------------------------- end: toggleEnterCommunity ------------------------------------------------------------------



};
// -------------------------------------- end: myNotebookProfileControl ------------------------------------------------



function initUserNotebook (){
    // add signIn listeners
    myNotebookSignIn.addPanelListeners();
    // check user's sign in status

    //if (window.signedInStatus != null) { // signedInStatus was declared and set in the master page by user control SignedInStatus
    //  NotebookUtils.SetSignInStatus(signedInStatus);
    //} else { 
    //  Pulte08.AjaxWebServices.UserService.IsSignedIn(NotebookUtils.SetSignInStatus, NotebookUtils.SetSignInException);
    //}
    
    // myNotebook with sub panels
    myNotebookPanel.addPanelListeners();
    myNotebookViewedControl.addPanelListeners();
    myNotebookSavedControl.addPanelListeners();
    myNotebookProfileControl.initVars();
    myNotebookProfileControl.addPanelListeners();

    // listen to Regiser link click
    myNotebookRegister.loadTrigger();
    // listen to sign out link
    YUE.addListener(YUD.getElementsByClassName('signOutTrigger','A'),'click',function() {
        Pulte08.AjaxWebServices.UserService.SignOut(NotebookUtils.callBackSignout);
    });
    YAHOO.widget.Overlay.windowResizeEvent.subscribe(NotebookUtils.alignNotebook, myNotebookPanel.overlayPanel, true);
    YAHOO.widget.Overlay.windowResizeEvent.subscribe(NotebookUtils.alignNotebook, myNotebookRegister.overlayPanel, true);
    YAHOO.widget.Overlay.windowResizeEvent.subscribe(NotebookUtils.alignNotebook, myNotebookSignIn.overlayPanel, true);


    if (window.signedInStatus != null) { // signedInStatus was declared and set in the master page by user control SignedInStatus
        NotebookUtils.SetSignInStatus(signedInStatus);
    } else {
        Pulte08.AjaxWebServices.UserService.IsSignedIn(NotebookUtils.SetSignInStatus, NotebookUtils.SetSignInException);
    }


};

YUE.addListener(window,'load',function(){initUserNotebook()});

function regHomeOwnerSelect() {
    if (document.getElementById('regHomeOwnerNo').checked) { //disable everything else.
        $("select, label, input", ".regOwnerYearsContainer, .regOriginalOwnerContainer, .regOwnerSalesNumContainer, .regOwnerSalesNumberContainer")
            .attr("disabled", "disabled")
                .addClass("disabled");

        //select no as everything else too.
        $("#regOriginalOwnerNo").attr("checked", "checked");
        $("#regOwnerSalesNumNo").attr("checked", "checked");
        
    }
    if (document.getElementById('regHomeOwnerYes').checked) { //enables everything else.
        $("select, label, input", ".regOwnerYearsContainer, .regOriginalOwnerContainer, .regOwnerSalesNumContainer, .regOwnerSalesNumberContainer")
            .attr("disabled", "")
                .removeAttr("disabled")                
                    .removeClass("disabled");
        $("#regOriginalOwnerNo").attr("checked", false);
        $("#regOriginalOwnerYes").attr("checked", false);

        $("#regOwnerSalesNumNo").attr("checked", false);
        $("#regOwnerSalesNumYes").attr("checked", false);
       
    }
}

function regOriginalOwnerSelect() {
    if (document.getElementById('regOriginalOwnerNo').checked) { //disable everything else.
        $("select, label, input", ".regOwnerSalesNumContainer, .regOwnerSalesNumberContainer")
            .attr("disabled", "disabled")
                .addClass("disabled");
       
        $("#regOwnerSalesNumNo").attr("checked", "checked");
    }
    if (document.getElementById('regOriginalOwnerYes').checked) { //enables everything else.
        $("select, label, input", ".regOwnerSalesNumContainer, .regOwnerSalesNumberContainer")
            .attr("disabled", "")
                .removeAttr("disabled")
                    .removeClass("disabled");
        $("#regOwnerSalesNumNo").attr("checked", false);
        $("#regOwnerSalesNumYes").attr("checked", false);
    }
}

function regOwnerSalesSelect() {
    if (document.getElementById('regOwnerSalesNumNo').checked) { //disable everything else.
        $("select, label, input", ".regOwnerSalesNumberContainer")
            .attr("disabled", "disabled")
                .addClass("disabled");

    }
    if (document.getElementById('regOwnerSalesNumYes').checked) { //enables everything else.
        $("select, label, input", ".regOwnerSalesNumberContainer")
            .attr("disabled", "")
                .removeAttr("disabled")
                    .removeClass("disabled");

    }
}
