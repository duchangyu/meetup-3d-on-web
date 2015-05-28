
var page_data = page_data || {};

var clickCommTabLinkRun = false;
var rrID = "";
var rrHierarchy = 0;
var ignoreRRUpperTabClick = false;


jQuery(document).ready(function($) {
	// notice we pass the $ into this function which sets the jquery namespace as $
	var init = $(".jToolTip").size();
	var init2 = $(".communityHoursToolTip").size();
	if (init || init2) {
	    if(typeof $(".jToolTip").tooltip != "undefined")
		    $(".jToolTip").tooltip({
			    track: false,
			    delay: 0,
			    showURL: false,
			    //showBody: " - ",
			    fade: 250,
			    top: 10
		    });

	    if (typeof $(".communityHoursToolTip").tooltip != "undefined")
	        $(".communityHoursToolTip").tooltip({
			    track: false,
			    delay: 0,
			    showURL: false,
			    showBody: " += ",
			    fade: 250
		    });
	}

	var init = $(".communityPage .tabs").size();
	if (init) {
		$(".tabs").tabs();
		$(".community_lower_container").bind("tabsshow", function(event, ui) {
			showCommTab(ui.panel.id, false)
		});
	}
	checkForParams();
	toggle_ShareDropDown();

	listen_lifeTestedVideoModals();
	//listen_accordion();

	listen_centex_hot_home_community_rebuild();
	listen_text_input_replace_value();
	listen_hide_show_series();
	listen_getDirections();
	//Community 2011 scripts
	var communityPage = $(".communityPage").size();
	if (communityPage) {
		community_2011_init();

	}


	//Plan 2011 scripts
	var productPage = $(".productPage").size();
	if (productPage) {
		plan_2011_init();
		fix_featureHeaderImage();
	}

	// Search-v4 Contact Us
	var searchResults = $(".search-results").size();
	if (searchResults) {
		listen_moreInfoCommunity();
	}

	//Click to chat popup tracking
	// Some pages use jQuery 1.4.2 or 1.7.2 which still supports .live()
	// While pages are being upgraded to use 1.9.1 (which has deprecated .live())
	// we need to try live and if not, use .on()
	try {
		$("#popin-im_button-max").live("click", function() {//submit
			trackChat("open", "popin");
		});
		$("#popin-header-max a").live("click", function() {//minimize
			trackChat("minimize", "popin");
		});
		$("#popin-close-max a").live("click", function() {//close
			trackChat("close", "popin");
		});
	}
	catch (e) { // 1.9.1 has deprecated .live and uses .on
		$(document.body).on("click", "#popin-im_button-max", function () {//submit
			trackChat("open", "popin");
		});
		$("#popin-header-max").on("click", "a",  function () {//minimize
			trackChat("minimize", "popin");
		});
		$("#popin-close-max").on("click","a", function () {//close
			trackChat("close", "popin");
		});
	}
	var planOptionBundles = $(".planOptionBundles").size();
	if (planOptionBundles) {
		$('#slider1').tinycarousel({ display: 1 });
	}
	
});

//The styles for this modal comes from retirement.css
function open_iFrameModal(url, width, height) {
	var modalWidth = parseInt(width) + 20;
	var modalHeight = parseInt(height) + 20;
	$.modal('<iframe src="'+url+'" style="border:0" width="'+width+'" frameborder="0" height="'+height+'">', {
		//  closeHTML: "",
		containerCss: {
			backgroundColor: "#fff",
			borderColor: "#fff",
			height: modalHeight,
			padding: 0,
			width: modalWidth
		},
		closeHTML: '<a class="modalCloseImg simplemodal-close-text" title="Close"></a>',
		overlayClose: true
	});
}

function listen_centex_hot_home_community_rebuild() {
	var init = $("body#centex .planFuzzyWrapper #hot_home_title").size(); //insures that we are only going to check for this on Centex Plan pages with Hot Home Bullets
	if (init) {
		$(".lowestMonthlyPayment").appendTo(".infoBoxGallery");
		var infoBoxCount = $(".infoBoxGallery .infoBox").size();

		$(".infoBoxGallery").addClass("num_of_icons_" + infoBoxCount);
	}
}

function listen_lifeTestedVideoModals() {
	var init = $(".features-container .lt-feature").size();
	if (init) {
		$("a[rel^='lifeTestedVideoModals']").prettyPhoto({ overlay_gallery: false, animation_speed: 'fast', deeplinking: false, social_tools: false, horizontal_padding: 20, default_width: 731, show_title:false });
	}
}

function listen_text_input_replace_value() {
	$('.default-value').each(function() {
		var default_value = $(this).attr("default-value");
		$(this).focus(function() {
			if (this.value == default_value) {
				this.value = '';
			}
		});
		$(this).blur(function() {
			if (this.value == '') {
				this.value = default_value;
			}
		});
	});
}

function openIframeModal(ignoreThis, iFrameURL, title, width, height, bgColor, noLoader) {
	//var height = $(window).height() - 30;
	//var height = height + 270;
	//var width = width + 160;
	//var width = 974;
	$.modal('<iframe src="' + iFrameURL + '" height="' + height + '" width="' + width + '" style="border:0">', {
		closeHTML: '<a title="Close" class="modalCloseImg simplemodal-close"></a>',
		containerCss: {
			backgroundColor: "#fff",
			borderColor: "#fff",
			height: height,
			padding: 0,
			width: width,
			top: "10px"
		},
		overlayClose: true,
		onOpen: function(dialog) {
			dialog.overlay.fadeIn('slow', function() {
				dialog.container.slideDown('slow', function() {
					dialog.data.fadeIn('slow');
					if (!noLoader) {
						setTimeout(function() {
							var wip = "<span id='bpc-load-progress' ";
							wip += "style='position: absolute;left: 0px;top: 0px; z-index:1; margin: 10px; height: 32px; background-color: white;color: #CD202C; font-family: Helvetica,Arial,sans-serif; font-size: 16pt;'";
							wip += " >";
							wip += "Loading the Buying Power Calculator ...&nbsp;";
							wip += "<img src='/images/global/bpc-centex-loader.gif' />";
							wip += "</span>";

							$(wip).insertBefore($("#simplemodal-data iframe"));

							$("#simplemodal-data iframe").ready(function() {
								setTimeout(function() {
									$("#bpc-load-progress").fadeOut(250);
								}, 4000);
							});
						}, 10);
					}
				});
			});
		}

	});
	$("#simplemodal-container").css("position", "absolute");
	$("#simplemodal-container").css("top", "60px");
	$('html, body').animate({ scrollTop: 0 }, 'slow');
}

//since the modal is positioned absolutely, instead of fixed. If there is a resize, it breaks.
//this fixes it.
var resizeTimer;
var init = $(".retirement_content_wrapper").size();
if (init) {
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(repositionModal, 100);
	});
}

function repositionModal() {
	$("#simplemodal-container").css("position", "absolute");
	$("#simplemodal-container").css("top", "60px");
	$('html, body').animate({ scrollTop: 0 }, 'slow');
}


//******COMMUNITY 2011 SCRIPTS****************//

function community_2011_init() {

	//number the plans across the page so that we can position the pop up correctly.
	//   var x = 1;
	//   $(".plan_container").each(function() {
	//        $(this).addClass("position" + x);
	//        if (x == 3) {
	//            x = 1;
	//        } else {
	//            x++;
	//        }
	//    });

	//hide / show only links to tabs that exist
	//    var tabMarkedAsSelected;
	//    $(".comm_tab_data").each(function() {
	//        var tabId = $(this).attr("id");
	//        $(".comm_tabs li a").each(function() {
	//            if ($(this).attr("rel") == tabId) {
	//                $(this).parent().show();
	//            }
	//        });

	//    });
	//    tabMarkedAsSelected = $(".comm_tabs li:visible").eq(0);
	//    tabMarkedAsSelected.addClass("selected");

	//if no URL param passed for which tab to show. just show the first one.





	//start up the listeners

	comm_form_field_listener();
	//comm_plan_rollover_listener2();
	// comm_tab_select_listener();
	comm_plan_gallery_change();
	comm_plan_hide_show_series();
	comm_plan_about_area_change();

	var init_2 = $("body.commTemplate_2").size();
	//    if (init_2) {
	//        comm_plan_rollover_listener3();
	//    } else {
	//        comm_plan_rollover_listener2();
	//    }

	//centered pop up
	//comm_plan_rollover_listener3();

	//quick view button
	comm_plan_quick_view_listener();
	listen_showPaymentMoreInfo();
	listen_moreInfoCommunity();
	number_imageFlags();
	listen_clickable_news_announcement();
	life_tested_features_tab_collapse_plan_names();
}


function comm_form_field_listener() {
	$(".comm_form_fields_container input").focus(function() {

		var selectedID = $(this).attr("parent-id");
		if ($("#pulte.plan_2011").size() || $("#centex.plan_2011").size() || $("#diVosta.plan_2011").size()) {
			selectedID = ".plan_tab_data"
		} else {
			selectedID = "#" + selectedID;
		}
		if (selectedID) {
			if (!$(selectedID + " .comm_form_fields_container").hasClass("opened")) {
				s.events = "event26";
				trackClicks("LeadFormOpened");
				s.events = "";
			}
		}

		$(selectedID + " .comm_form_fields_container").addClass("opened");
		//basically for IE we need to z-index the whole dom above the form
		$(selectedID + " .comm_expanding_contracting_form_container").css("z-index", "6000");
		$(selectedID + " .comm_cta_container").css("z-index", "6000");

		$(".comm_cta_container").css("z-index", "6000");
		$(".comm_feat_social_cta_container").css("z-index", "6000");
		$(".header_right_container").css("z-index", "6000");
		$(".community_header_container").css("z-index", "6000");
		$(".community_top_inner_container").css("z-index", "6000");
		$(".community_top_container").css("z-index", "6000");






		//and lower the z-index of everything below
		$(".community_lower_right_container").css("z-index", "1");
		$(".community_lower_container").css("z-index", "1");
		//$(".comm_plan").css("z-index", 1);

		//hide the other components below the form
		$(selectedID + " .view_other_plans").hide();
		$(selectedID + " .plan_promo_container").hide();
		$(selectedID + " .plan_promotion").hide();
	});
}


function close_comm_form_field_container(selectedID) {

	if ($("#pulte.plan_2011").size() || $("#centex.plan_2011").size() || $("#divosta.plan_2011").size() || $("#diVosta.plan_2011").size()) {
		selectedID = ".plan_tab_data"
	} else {
		selectedID = "#" + selectedID;
	} 
	$(selectedID + " .comm_form_fields_container").removeClass("opened");

	$(selectedID + " .comm_expanding_contracting_form_container").css("z-index", "4");


	//clear errors if there are any
	$(selectedID + " input").removeClass("error");
	$(selectedID + " label").each(function() {
		if ($(this).attr("generated") == "true") {
			$(this).remove();
		}
	});

	//show the other components below the form
	$(selectedID + " .view_other_plans").show();
	$(selectedID + " .plan_promo_container").show();
	$(selectedID + " .plan_promotion").show();

	//track manual closing of form in order to correctly calculate abandons
	s.events = "event27";
	trackClicks("LeadFormClosed");
	s.events = "";
}

function comm_plan_rollover_listener2() {
	$(".plan_container").mouseenter(function() {
		$(".plan_container").each(function() {
			$(this).removeClass("hovered");
			$(this).css("z-index", "3");
		});
		$(".plan_pop_up").each(function() { $(this).hide(); });
		$(this).addClass("hovered").css("z-index", "6"); ;
		$(".comm_expanding_contracting_form_container").css("z-index", "1");
		$(".comm_cta_container").css("z-index", "1");
		$(this).find(".plan_pop_up").show();
		//var destination = $(this).find(".comm_plan_hero_container").offset().top;
		//$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination - 20 }, 500);
	});

	$(".community_lower_left_container, .community_top_container").mouseenter(function() {
		$(".plan_container").each(function() {
			$(this).removeClass("hovered");
			$(this).css("z-index", "3");
		});
		$(".plan_pop_up").each(function() { $(this).hide(); });
		$(".comm_expanding_contracting_form_container").css("z-index", "6000");
		$(".comm_cta_container").css("z-index", "6999");
	});
}


function comm_plan_rollover_listener3() {
	$(".comm_plan").hover(function() {
		$(".comm_plan").each(function() {
			$(this).removeClass("hovered");
			$(this).css("z-index", "3");
		});
		$(".plan_pop_up").each(function() { $(this).hide(); });
		$(this).addClass("hovered").css("z-index", "6"); ;
		$(".comm_expanding_contracting_form_container").css("z-index", "1");
		$(".comm_cta_container").css("z-index", "1");
		$(this).find(".plan_pop_up").show();
		//var destination = $(this).find(".comm_plan_hero_container").offset().top;
		//$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination - 20 }, 500);
		var distanceFromTop = $(window).scrollTop();
		$(this).find(".plan_pop_up").css({ "top": distanceFromTop + 20 });
	}, function() {
		$(".comm_plan").each(function() {
			$(this).removeClass("hovered");
			$(this).css("z-index", "3");
		});
		$(".plan_pop_up").each(function() {
			$(this).hide();
		});

	});

	$(".community_lower_left_container, .community_top_container").mouseenter(function() {
		$(".comm_plan").each(function() {
			$(this).removeClass("hovered");
			$(this).css("z-index", "3");
		});
		$(".plan_pop_up").each(function() { $(this).hide(); });
		$(".comm_expanding_contracting_form_container").css("z-index", "1000");
		$(".comm_cta_container").css("z-index", "999");
	});
}

function comm_plan_quick_view_listener() {

	//show quick view button on hover
	$(".plan_container").hover(function() {
		$(this).find(".comm_plan_quick_view").show();
	}, function() {
		$(this).find(".comm_plan_quick_view").hide();
	});

	//CENTERED POP UP
	$(".comm_plan_quick_view").click(function() {
	trackClicks("quick_view");
		//load the images in the plan pop up
		var plan_pop_up = $(this).closest(".comm_plan_image_container").prev();
		if (!$(plan_pop_up).hasClass("imagesLoaded")) {
			$(".comm_plan_photo_thumbnails li a img", plan_pop_up).each(function() {
				//thumbnails first
				var imageSrc = $(this).attr("data-original-src");
				$(this).attr("src", imageSrc);
			});
			//the large image second
			var firstImage = $(plan_pop_up).find(".comm_plan_photo_thumbnails li a").first().addClass("selected").attr("rel"); // get the first image and assign the selected class to the first thumbnail
			$(plan_pop_up).find(".comm_plan_main_image img").attr("src", firstImage); //set the large image to be the first thumbnail
			$(plan_pop_up).addClass("imagesLoaded");
		}


		$(".plan_container").each(function() {
			$(this).removeClass("hovered");
			$(this).css("z-index", "3");
			
		});
		$(".plan_pop_up").each(function() { $(this).hide(); });

		//upper DOM elements
		$(this).parent().parent().parent().parent().addClass("hovered").css("z-index", "6"); ;
		$(".comm_expanding_contracting_form_container").css("z-index", "1");
		$(".comm_cta_container").css("z-index", "1");
		$(".comm_feat_social_cta_container").css("z-index", "1");
		$(".header_right_container").css("z-index", "1");
		$(".community_header_container").css("z-index", "1");
		$(".community_top_inner_container").css("z-index", "1");
		$(".community_top_container").css("z-index", "1");


		//lower dom elements
		$(this).parent().parent().find(".plan_pop_up").show();
		$(".community_lower_right_container").css("z-index", "1009");
		$(".community_lower_container").css("z-index", "5009");



		//var destination = $(this).find(".comm_plan_hero_container").offset().top;
		//$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination - 20 }, 500);
		var distanceFromTop = $(window).scrollTop();
		$(this).parent().parent().find(".plan_pop_up").css({ "top": distanceFromTop - 700 }); //765 is the distance from the top of the page to the lower tabbed area.
	});

	$(".plan_pop_up a.close_btn").click(function() {
		$(".plan_container").each(function() {
			$(this).removeClass("hovered");
			$(this).css("z-index", "3");
		});
		$(".plan_pop_up").each(function() { $(this).hide(); });
		$(".comm_cta_container").css("z-index", "6000");
		$(".comm_feat_social_cta_container").css("z-index", "6000");
		$(".header_right_container").css("z-index", "6000");
		$(".community_header_container").css("z-index", "6000");
		$(".community_top_inner_container").css("z-index", "6000");
		$(".community_top_container").css("z-index", "6000");


		$(".community_lower_right_container").css("z-index", "1");

		$(".community_lower_container").css("z-index", "1");
	});
}



function trackClicks(thisClickedId) {
	if (typeof thisClickedId != 'undefined') {
		if ((thisClickedId != "") && (UseSiteCatalyst)) {
			//var sOldPageName = s.pageName;
			//s.pageName = s.pageName + " - " + thisClickedId;
			//s.tl("true", "o", thisClickedId);

		    if (!(thisClickedId.toLowerCase() == "ratings and reviews upper tab" && ignoreRRUpperTabClick)) {
		        if (s.pageName != undefined) {
		            var sLinkName = thisClickedId + " - " + s.pageName;


		            //this next section should be handled by trackTabClicks() but trying to avoid editing too much code -
		            //  it already calls trackClicks from several locations.
		            //    And, trackTabClicks() calls this function so cannot simply call trackTabClicks from here.
		            if (thisClickedId.toLowerCase().indexOf("submitmortgageadvisor") >= 0) {
		                s.events = "event2";
		                var sTabContactGroup = sContentGroup;
		                if (sTabContactGroup.length > 0)
		                    if (sTabContactGroup.indexOf("/index") > 0)
		                        sTabContactGroup = sTabContactGroup.replace("/index", "");
		                    else if (sTabContactGroup.indexOf("/Find a Home") > 0)
		                        sTabContactGroup = sTabContactGroup.replace("/Find a Home", "");
		                s.eVar6 = sTabContactGroup;
		            }
		            //end this section

		            //if (typeof console === "undefined") {
		            //    var doNothing = 1;
		            //}else{
		            //    console.debug("SC Custom Link: " + sLinkName);
		            //    if (s.events != "" && s.events != "None") console.debug("SC Events     : " + s.events);
		            //}

		            s.tl("true", "o", sLinkName);
		            s.events = '';

		            //s.tl("true", "o", thisClickedId);
		            //s.pageName = sOldPageName;
		        }

			}
			else {
				ignoreRRUpperTabClick = false;  //clear it once we've ignored it 
			}
		}
	}
}

function popWindowAndTrack(thisClickedID, type, url, title, height, width, bgcolor) {
	trackClicks(thisClickedID);
	popWindow(type, url, title, height, width, bgcolor);
}

function openIframeModalAndTrack(thisClickedID, ignoreThis, iFrameURL, title, width, height, bgColor, noLoader) {
	trackClicks(thisClickedID + '-modal');
	openIframeModal(ignoreThis, iFrameURL, title, width, height, bgColor, noLoader);
}

function linkAndEventTrack(destUrl, thisClickedId, thisEvent, newWindowFlag) {
    //trackTabClicks(thisClickedId);

    if (sContentGroup != undefined) {
        s.events = thisEvent;

        var sTabContactGroup = sContentGroup;
        if (sTabContactGroup.length > 0)
            if (sTabContactGroup.indexOf("/index") > 0)
                sTabContactGroup = sTabContactGroup.replace("/index", "");
            else if (sTabContactGroup.indexOf("/Find a Home") > 0)
                sTabContactGroup = sTabContactGroup.replace("/Find a Home", "");

        s.eVar6 = sTabContactGroup;

        trackClicks(thisClickedId)

        s.events = "None";
        s.eVar6 = "";
    }
	if (newWindowFlag) {
		window.open(destUrl); //, '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
	} else {
		window.location.href = destUrl;
	}

}

function trackTabClicks_popSmall(thisClickedId, destUrl) {

	trackTabClicks(thisClickedId)
	window.open(destUrl, '_blank', 'height=600, width=790,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');

}

function trackHoverState(thisHoveredId, destUrl) {

    trackClicks(thisHoveredId);
	//s.linkTrackVars = 'prop1';
	//s.linkTrackEvents = 'event1';
	//s.prop1 = ''; 
	//s.events = 'None';
	//s.tl(this, 'o', 'Info Box');
}

var pageLoading = false;
function trackTabClicks(thisClickedId) {

	if (pageLoading) {
		pageLoading = false;
	} else if ((thisClickedId != "") && (UseSiteCatalyst)) {

		if (thisClickedId.toLowerCase().indexOf("aboutthearea") >= 0) {
			s.events = "event7";
		}
		else if (thisClickedId.toLowerCase().indexOf("stepbystepdirections") >= 0) {
			s.events = "event6";
		}
		else if (thisClickedId.toLowerCase().indexOf("mapanddirections") >= 0)  {
			s.events = "event41";
		}
		else if (thisClickedId.toLowerCase().indexOf("clicktocall") >= 0) {
			s.events = "event11";
		}
		else if (thisClickedId.toLowerCase().indexOf("callme") >= 0) {
			s.events = "event16";
		}
		else if (thisClickedId.toLowerCase().indexOf("clicktoemail") >= 0) {
			s.events = "event12";
		}
		else if (thisClickedId.toLowerCase().indexOf("like") >= 0) {
			if (!optionBundleModal)
				s.events = "event17";  //old tracking - apparently discontiniued ~5/13 but jic
			else
				s.events = "event44";  //only currently applicable to Option Bundles (can't happen outside of the modal)
		}
		else if (thisClickedId.toLowerCase().indexOf("printbrochure") >= 0) {
			s.events = "event18";
		}
		else if (thisClickedId.toLowerCase().indexOf("printoptionbundle") >= 0) {
			s.events = "event43";
		}
		else if (thisClickedId.toLowerCase().indexOf("optionbundle") >= 0) {
			s.events = "event42";
		}
		else if (thisClickedId.toLowerCase().indexOf("lifetestedvideo") >= 0) {
			s.events = "event45";
			s.eVar45 = thisClickedId;
		}
		else if (thisClickedId.toLowerCase().indexOf("lifetestedplanclick") >= 0) {
			s.events = "event45";
			s.eVar45 = thisClickedId;
		}
		else if (thisClickedId.toLowerCase().indexOf("inspired designs features - floor plans") >= 0) {
		    s.events = "event45";
		    s.eVar45 = thisClickedId;
		}
    
		

		var sTabContactGroup = sContentGroup;
		if (sTabContactGroup.length > 0)
			if (sTabContactGroup.indexOf("/index") > 0)
			sTabContactGroup = sTabContactGroup.replace("/index", "");
		else if (sTabContactGroup.indexOf("/Find a Home") > 0)
			sTabContactGroup = sTabContactGroup.replace("/Find a Home", "");

		s.eVar6 = sTabContactGroup;
		//s.tl("true", "o", thisClickedId);

		if (thisClickedId.toLowerCase() == "tabcomm-review-rating") {
			if (clickCommTabLinkRun) {
				//clickCommTabLinkRun = false;
				//rrHierarchy = 0;
				if (rrID != '') {
					thisClickedId = thisClickedId + rrID;
				}
				//rrID = "";
			}
		}
		clickCommTabLinkRun = false;
		rrHierarchy = 0;
		rrID = "";

		trackClicks(thisClickedId)

		s.events = "None";
		s.eVar6 = "";

	}
}

/*
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
*/






function comm_plan_about_area_change() {
	$(".comm_about_area_tab_data").each(function() {
		var tabId = $(this).attr("id");
		$(".comm_about_area_links li a").each(function() {
			if ($(this).attr("rel") == tabId) {
				$(this).parent().show();
			}
		});
		$(".comm_about_area_links li").eq(0).addClass("selected");
	});


	$(".comm_about_area_tab_data").hide();
	$(".comm_about_area_tab_data").eq(0).show();

	$("ul.comm_about_area_links li a").click(function() {
		var clickedId = $(this).attr("rel");
		showAboutAreaCopy(clickedId);


		return false;
	});
}


function comm_plan_gallery_change() {
	$("ul.comm_plan_photo_thumbnails li a").click(function() {
		$("ul.comm_plan_photo_thumbnails li a").removeClass("selected");
		var clickedImage = $(this).attr("rel");
		$(this).parent().parent().next().find("img").attr("src", clickedImage);
		$(this).addClass("selected");
		return false;

	});
}

function comm_plan_hide_show_series() {
	$(".comm_plan_series_hide_show a").click(function() {
		close_all_hovered_plans();
		if ($(this).hasClass("series_hide")) {
			$(this).parent().parent().addClass("closed");
			$(this).hide();
			$(this).prev().show();
			$(this).parent().next().next().next().hide();
		} else {
			$(this).parent().parent().removeClass("closed");
			$(this).hide();
			$(this).next().show();
			$(this).parent().next().next().next().show();
		}
		return false;
	});
}

function showCommTab(tabId, scrollPage, floorPlanLinks) {
	if (floorPlanLinks) { //the floorplan links on the plan page still use the old non-jquery ui tabs.
			$(".comm_tabs li").removeClass("selected");
			$(".comm_tabs li a").each(function() {
				var relAttr = $(this).attr("rel");
				if (relAttr == tabId) {
					$(this).parent().addClass("selected");
				}
			});

			//if this is plan page and floor plan links we need to resize the content area (because everything is absolutely positioned

			
				//just to test
				$(".comm_tab_data").each(function() {
					$(this).hide();
					if ($(this).attr("id") == tabId) {
						$(this).show();
					}
				});
				//set the content area to be the correct height since the tabs are absolutely positioned
				var tab_data_height = $("#plan_content-FloorPlans .plan_top_container").height();

				tab_data_height += $(".disclaimer_container").height();
				//alert("tabheight from #1 : " + tab_data_height);
				$(".plan_2011 .content").height(tab_data_height + 255);  //255px is the top area of the page.
			
	}


	//Don't track MAP AND DIRECTIONS from left side tab navigation (per marketing discussion 10/10/13)
	// We will track it from VISIT MAP & DIRECTIONS in contact area
	if (tabId == "tabComm-mapAndDirections") {
		//Pulte_TAB_SUBMIT2(); //tracking

	} else {

		trackTabClicks(tabId);

	}

	//    $(".comm_tab_data").css({'visibility' : 'hidden', 'position' : 'absolute', 'left':'-999em' });

	//    $("#" + tabId).show().css({ 'left': '0px', 'visibility': 'visible', 'position': 'relative' });


	//__________init map______________
	var clickedId = tabId;
	if (!YUD.hasClass(document.getElementById("mapsearch"), 'loaded')) {
		//if (clickedId == "tabComm-aboutTheArea" || clickedId == "tabComm-mapAndDirections") { loadGSearch(); }
		//YUD.addClass(document.getElementById("mapsearch"), 'loaded');
		if (clickedId == "tabComm-aboutTheArea") {
			comm13.aboutTheAreaMap("mapsearch", 12);

			/**** 
			*****  EVERYTHING BELOW WAS MOVED INTO FUNCTION CALLED ABOVE
			*****/


			////loadGSearch();
			////YUD.addClass(document.getElementById("mapsearch"), 'loaded');
			//var mapDiv = document.getElementById("mapsearch");  //YUD.getElementsByClassName('google-map', 'div', tabContent)[0];
			//if (!mapDiv) return;

			//// check if we already loaded the map
			//if (!YUD.hasClass(mapDiv, 'loaded')) {
			//    var mapOptions = {
			//        zoom: 4,
			//        center: new google.maps.LatLng(-33, 151),
			//        disableDefaultUI: true,
			//        mapTypeId: google.maps.MapTypeId.ROADMAP,
			//        zoomControl: true,
			//        scaleControl: true
			//    }

			//    // create the map object and add custom control
			//    map = new google.maps.Map(mapDiv, mapOptions);
			//    //map = new google.maps.Map(mapDiv);
			//    //map.addControl(new GSmallMapControl());
			//    var point = new google.maps.LatLng(defaultMapLat, defaultMapLng);
			//    map.setCenter(point);
			//    map.setZoom(12);
			//    var address = '';
			//    if (typeof dirAddress != 'undefined' && dirAddress) address += dirAddress.address + '<br />' + dirAddress.city + ', ' + dirAddress.state + ' ' + dirAddress.zip;
			//    if (address == '') {
			//        if (document.getElementById('address1') != null) address = document.getElementById('address1').value + '<br />';
			//        if (document.getElementById('cityStateZip') != null) address += document.getElementById('cityStateZip').value;
			//    }
			//    var bubbleContent = '<table border=0 cellpadding=0 cellspacing=0><tr><td>' + address + '<br />' + '</td></tr></table>';
			//    //var marker = customMarkerUtils.createMarker(point, bubbleContent, getCurrSite().toLowerCase());
			//    //alert(map);
			//    marker = mapCONFIG.createMarkerV3(point, bubbleContent);
			//    //map.addOverlay(marker);
			//    mapDiv.map = map;
			//    YUD.addClass(mapDiv, 'loaded');

			//}
		}
	}
	//trackTabClicks(clickedId); HANDLED IN showCommTab
	if (clickedId == "tabComm-mapAndDirections") {
		//Pulte_TAB_SUBMIT2(); //tracking <--moved to showCommTab
	   // comm13.loadMap("google-directions", 14);
	   comm13.directionsMap("google-directions", 14)

		/***** 
		**** EVERYTHING BELOW WAS MOVED INTO THE METHOD ABOVE
		*****/

		////var tabContent = $("#" + clickedId);  //activeTab.get('contentEl');
		//var mapDiv = document.getElementById("google-directions");  //YUD.getElementsByClassName('google-map', 'div', tabContent)[0];
		//if (!mapDiv) return;

		//// check if we already loaded the map
		//if (!YUD.hasClass(mapDiv, 'loaded')) {
		//    var mapOptions = {
		//        zoom: 4,
		//        center: new google.maps.LatLng(-33, 151),
		//        disableDefaultUI: true,
		//        mapTypeId: google.maps.MapTypeId.ROADMAP,
		//        zoomControl: true,
		//        scaleControl: true
		//    }

		//    // create the map object and add custom control
		//    map = new google.maps.Map(mapDiv, mapOptions);
		//    //map = new google.maps.Map(mapDiv);
		//    //map.addControl(new GSmallMapControl());
		//    var point = new google.maps.LatLng(defaultMapLat, defaultMapLng);
		//    map.setCenter(point);
		//    map.setZoom(14);
		//    var address = '';
		//    if (typeof dirAddress != 'undefined' && dirAddress) address += dirAddress.address + '<br />' + dirAddress.city + ', ' + dirAddress.state + ' ' + dirAddress.zip;
		//    if (address == '') {
		//        if (document.getElementById('address1') != null) address = document.getElementById('address1').value + '<br />';
		//        if (document.getElementById('cityStateZip') != null) address += document.getElementById('cityStateZip').value;
		//    }
		//    var bubbleContent = '<table border=0 cellpadding=0 cellspacing=0><tr><td>' + address + '<br />' + '</td></tr></table>';
		//    //var marker = customMarkerUtils.createMarker(point, bubbleContent, getCurrSite().toLowerCase());
		//    //alert(map);
		//    marker = mapCONFIG.createMarkerV3(point, bubbleContent);
		//    //map.addOverlay(marker);
		//    mapDiv.map = map;
		//    YUD.addClass(mapDiv, 'loaded');

		//}

	}

	//______ / init map _______________
	//community page needs manual height set.  ///NOT ANYMORE
	//    var comm_init = $(".community_lower_right_container").size();
	//    if (comm_init) {
	//        var shown_comm_tab_height = $("#" + tabId).height();
	//        //$(".community_lower_right_container").height(shown_comm_tab_height + 50);
	//        $(".community_lower_right_container").css("height", "auto");
	//    }

	
}

function showAboutAreaCopy(tabId) {
	$(".comm_about_area_links li").removeClass("selected");
	$(".comm_about_area_links li a").each(function() {
		var relAttr = $(this).attr("rel");
		if (relAttr == tabId) {
			$(this).parent().addClass("selected");
		}
	});


	$(".comm_about_area_tab_data").hide();
	$("#" + tabId).show();
}

function scrollPageToTabArea() {
	var init = $(".plan_2011").size(); //we Dont want to do this on the plan pages.
	if (!init) {
		var destination = $(".community_lower_container").offset().top;
		$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination - 20 }, 500);
	}
	return false;
}




function close_all_hovered_plans() {
	$(".comm_plan").removeClass("hovered");
	$(".comm_plan .plan_pop_up").hide();
}


function listen_showPaymentMoreInfo() {
	$(".payment_more_info").hover(function() {
		$(".comm_payment_breakdown_container").show();
	});

	$(".comm_payment_breakdown_container .close_btn").click(function() {
		$(".comm_payment_breakdown_container").hide();
	});

	$(".series_more_info").hover(function() {
		$(".plan_series_popup_container").show();
	});

	$(".plan_series_popup_container .close_btn").click(function() {
		$(".plan_series_popup_container").hide();
	});

	listen_showHotPaymentMoreInfo_commListing();
}

function listen_showPaymentMoreInfo_commListing() {
	$(".payment_more_info").hover(function () {
		$(".comm_payment_breakdown_container").hide();
		$(".comm_payment_breakdown_container" + $(this)[0].name).show();
	});

	$(".comm_payment_breakdown_container .close_btn").off().on("click", function () {
		$(this).parent().hide();
	});

}

function listen_showHotPaymentMoreInfo_commListing() {
	$(".hot_payment_more_info").hover(function () {
		$(".hot_payment_breakdown_container").hide();
		$(".hot_payment_breakdown_container" + $(this)[0].name).show();
	});

	$(".hot_payment_breakdown_container .close_btn").off().on("click", function () {
		$(this).parent().hide();
	});

}

function showLmpDisclaimerHot(inventoryID) {
	var self = this,
		//inventoryID = self.ID,
	targetDiv = ".hot_payment_breakdown_container" + inventoryID + " .lmp-disclaimer";
	linkDisc = ".hot_payment_breakdown_container" + inventoryID + " .show_disclaimer_for_lmp";
	$(linkDisc).hide();
	$(targetDiv).show();

	var thisType = "";
	thisType = inventoryID.substr(0, 1).toLowerCase();
	inventoryID = inventoryID.substr(1, inventoryID.length - 1);
	if (thisType=="p")
		Pulte08.AjaxWebServices.MapService.GetPlanMortgagePayment(inventoryID, populateHotDisclaimer);
	else
		Pulte08.AjaxWebServices.MapService.GetInventoryHomeMortgagePayment(inventoryID, populateHotDisclaimer);

	function populateHotDisclaimer(response) {
		var mortgageType = response.MortgageTypeText;
		//var salesPrice = searchApp.communitiesViewModel.formatPrice(response.Price, true);
		//var loanAmount = searchApp.communitiesViewModel.formatPrice(response.LoanAmount, true);
		var salesPrice = response.Price.toString();
		salesPrice = "$" + (salesPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
		var loanAmount = response.LoanAmount.toString();
		loanAmount = "$" + (loanAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
		var downPaymentPercent = response.DownPaymentPercent;
		var interestRate = response.InterestRate;
		var updatedDate = response.UpdatedDate;
		var apr = response.Apr;
		var disclaimer = "";
		if (getCurrSite() === "Pulte" || getCurrSite() === "pulte") {
			disclaimer = '<br /><p>Financing available through Pulte Mortgage LLC.  Although other loan programs are also available, this example is based on a conventional 30 year fixed mortgage with a sales price of ' + salesPrice + ' and a loan amount of ' + loanAmount + ' with 20% down payment, ' + interestRate + '% rate ' + apr + '% Annual Percentage Rate effective ' + updatedDate + '. Rates may vary depending on program and loan amount. Primary or second residence. Payment includes principal, interest, estimated property taxes and hazard insurance. All loans subject to underwriting and loan qualification of the lender. Rates, terms and conditions subject to change without notice. Pulte Mortgage LLC is an Equal Opportunity Lender. NMLS Entity Identifier #1791. For licensing information for Pulte Mortgage LLC access <a href="https://secure.pultemortgage.com/ContactUs.aspx" target="_blank">https://secure.pultemortgage.com/ContactUs.aspx</a> or <a href="http://www.nmlsconsumeraccess.org" target="_blank">www.nmlsconsumeraccess.org</a>.</p>';
		}
		if (getCurrSite() === "Centex" || getCurrSite() === "centex") {
			disclaimer = '<br /><p>Financing available through Pulte Mortgage LLC.  Although other loan programs are also available, this example is based on an FHA 30 year mortgage with a sales price of ' + salesPrice + ' and a loan amount of ' + loanAmount + ' including upfront mortgage insurance of 1.75% and 3.50% down payment. Note rate ' + interestRate + '% / ' + apr + '% Annual Percentage Rate as of ' + updatedDate + '. Loan must be for a primary residence. Payment includes principal, interest, mortgage insurance, estimated property taxes and hazard insurance. All loans subject to underwriting and loan qualification of the lender. Rates, terms and conditions subject to change without notice. Pulte Mortgage LLC is an Equal Opportunity Lender. NMLS Entity Identifier #1791. For licensing information for Pulte Mortgage LLC access <a href="https://secure.pultemortgage.com/ContactUs.aspx" target="_blank">https://secure.pultemortgage.com/ContactUs.aspx</a> or <a href="http://www.nmlsconsumeraccess.org" target="_blank">www.nmlsconsumeraccess.org</a>.</p>';
		}
		if (thisType == "p")
			disclaimer = disclaimer + "<br />‡‡ These are estimated monthly payments that are calculated based upon the base purchase price for this particular model of home in this neighborhood. The base purchase price used for calculation of the mortgage payment does not include any additional costs for options, upgrades or lot premiums.";

		$(targetDiv).html(disclaimer);
	}

}


function number_imageFlags() {
	$(".comm_plan_image_container").each(function() {
		$(this).find(".tag").each(function(x) {
			$(this).addClass("tagNum" + x);
		});


	});
}

function listen_clickable_news_announcement() {
	var init = $(".communityTemplate_2011 .clickable").size();
	if (init) {
		$(".clickable").bind('click', function() {
			var link = $(this).attr("data-href");
			var target = $(this).attr("data-target");
			if (target == "_blank") {
				window.open(link);
			} else {
				window.location = link;
			}

		});
		$(".clickable a").bind('click', function(e) {
			e.preventDefault();
		});
	}


}

function life_tested_features_tab_collapse_plan_names() {
	var init = $(".lt-feature").size();
	if (init) {
		$(".lt-feature").each(function (index, value) { // start with EACH feature

			if ($("ul.lt-available-in-plans li", $(this)).size() > 5) { // if there are more than 5 (remember size is NOT zero based)

				// hide everything greater than 4 (remember :gt() IS zero based
				$("ul.lt-available-in-plans li:gt(4)", $(this)).hide();

				// create the view all link
				var viewAllLink = $('<a href="#">View All</a>');

				// attach a click handler to the view all link
				viewAllLink.on("click", function (e) {
					e.preventDefault();

					// show all the li's in the ul above.
					$(this).parent().find('li').show();

					// hide the link that was just clicked
					$(this).hide();

				});

				// put the View All link after the bullets
				$("ul.lt-available-in-plans", $(this)).after(viewAllLink);
			}

			//var availableInPlans = $(this).find("ul.lt-available-in-plans li");
			//if ($(availableInPlans).size() > 5) { // size is NOT zero based.
			//    var availableInPlansWrapper = '<div class="available-in-wrapper"></div>';
			//    $(availableInPlans).gt(4).wrap(availableInPlansWrapper);
			//    //var availableInPlansToHide = $(availableInPlans).gt(4) // .gt IS zero based
			//}
		});
	}
}

function openSimpleModal(theIdToModalize, optionalContainerId) {
	if (!optionalContainerId) {
		$("#" + theIdToModalize).modal({
			overlayClose: true,
			onClose: function(dialog) {
				dialog.data.fadeOut('slow', function() {
					$.modal.close();
				});
			}
		});
	} else {
		$("#" + theIdToModalize).modal({
			overlayClose: true,
			containerId: optionalContainerId,
			onClose: function(dialog) {
				dialog.data.fadeOut('slow', function() {
					$.modal.close();
				});
			}
		});
	}
	trackClicks(theIdToModalize);
}

//******PLAN 2011 SCRIPTS****************//
function plan_2011_init() {
	var init = $("body.plan_2011").size();
	if (init) {
		//hide / show only links to tabs that exist
//        $(".plan_tab_data").each(function() {
//            var tabId = $(this).attr("id"),
//                planTabsA = $(".plan_tabs li a");
////            $(planTabsA).each(function() {
////                if ($(this).attr("rel") == tabId) {
////                    $(this).parent().show();
////                }
////            });
//            $(".plan_tabs li").eq(0).addClass("selected");
//        });


		//Life Tested Gallery
		var lifeTestedPlanExists = $("#life-tested-features-gallery").size();
		if (lifeTestedPlanExists) {
			init_lifeTestedPlanModal();
		}

		//needed for the floor plan navigation
		$(".comm_tab_data").each(function() {
			var tabId = $(this).attr("id");
			$(".comm_tabs li a").each(function() {
				if ($(this).attr("rel") == tabId) {
					$(this).parent().show();
				}
			});
			$(".comm_tabs li").eq(0).addClass("selected");
		});

		$(".comm_tab_data").hide();
		$(".comm_tab_data").eq(0).show();
		floor_plan_nav_listen();
		//comm_tab_select_listener();


		//if no URL param passed for which tab to show. just show the first one.
		//    $(".plan_tab_data").hide();
		var tabParam = getUrlVars()["tab"];
		var tab_data_height = 0; $(".plan_tab_data").eq(0).height();
		if (tabParam === undefined && $("body#delwebb").size() ) {
			$(".plan_tab_data").eq(0).css({ "visibility": "visible", "z-index": "1", "top": "0px" });

			tab_data_height = $(".plan_tab_data").eq(0).height();
			tab_data_height += $(".disclaimer_container").height();
			//$(".plan_2011 .content").height(tab_data_height + 255);  //255px is the top area of the page.
		} else {
			showPlanTab(tabParam, true);
		}

		//set the content area to be the correct height since the tabs are absolutely positioned


		//listeners
		comm_form_field_listener();
		plan_tab_select_listener();
		listen_showPaymentMoreInfo();
		listen_moreInfoCommunity();



	} //end init
}
function floor_plan_nav_listen() {
	$("ul.comm_tabs li a").click(function() {
		var clickedId = $(this).attr("rel");
		showCommTab(clickedId, false, true);


		return false;
	});
}

function plan_tab_select_listener() {
	var clickableTabs = $('ul.plan_tabs li a[href="#"], ul.plan_cta a.view_floor_plans');
	$(clickableTabs).click(function() {
			var clickedId = $(this).attr("rel");
			showPlanTab(clickedId);
		

		return false;
	});
}

var videoLoadClick = false;

function init_lifeTestedPlanModal() {
   
	var clickableTabsInit = function () {
		var clickableTabs = $(".life-tested-video-photo-tabs ul.lt-photo-video-tabs li a");
		var ltPhotoThumbnails = $("#life-tested-photo-gallery ul li a");
		var ltVideoThumbnails = $("#lt-video-gallery ul li a");

		var loadClick = false;
			
		$(clickableTabs).on("click", function (e) {
				var clickedId = $(this).attr("rel");
				$(clickableTabs).removeClass("selected");
				$(this).addClass("selected");
				$(".lt-tab").removeClass('showing');
				$("#" + clickedId).addClass('showing');


				e.preventDefault();

				var thisClicked = "";
				if (!loadClick)
					if (clickedId.toLowerCase().indexOf("photos") > 0)
						thisClicked = "Life Tested Photo Tab - ";
					else if (clickedId.toLowerCase().indexOf("videos") > 0)
						thisClicked = "Life Tested Video Tab - ";

					if (thisClicked!="")
						s.tl("true", "o", thisClicked + sContentGroup);

				loadClick = false;
			});

		//once everything is up and running, we click the first link
				loadClick = true;
				$(clickableTabs[0]).click();
				loadClick = false;

		//init the carousel for videos
				$("#lt-video-gallery").jcarousel();

		//and photos
				$("#life-tested-photo-gallery").jcarousel();

		// if there are less than 3 thumbnails we want to hide the next and prev arrows in the carousel
				if (ltPhotoThumbnails < 3) {
					$("#lt-photo-gallery .jcarousel-next, #lt-photo-gallery .jcarousel-prev").remove();
				}
				if (ltVideoThumbnails < 3) {
					$("#lt-video-gallery .jcarousel-next, #lt-video-gallery .jcarousel-prev").remove();
				}


		// when clicking on a photo this happens:
			$(ltPhotoThumbnails).off().on("click", function (e) {
				e.preventDefault();

				$(ltPhotoThumbnails).removeClass("lt-selected");
				// add a class to the thumb that was clicked
				$(this).addClass("lt-selected");

				//load the new image into the large box
				var newImage = $(this).data("image");
				var imageIndex = $(this).data("image-index");
				replaceImage(newImage, ".lt-photo-gallery-photo", imageIndex);

				//update the caption

				// the actual image caption
				var photoCaption = $(this).data("photo-caption");
				if (photoCaption !== "") {
					$(".lt-photo-caption-container .lt-photoCaption").empty().html(photoCaption);
					$(".lt-photo-caption-container").show();
				} else {
					$(".lt-photo-caption-container").hide();
				}

				// caption title
				$(".lt-photoContent .lt-photoCaptionTitle").empty().html($(this).data("caption-title"));

				// process and show the bullets (they are pipe separated)
				var captionBullets = $(this).data("caption-bullets").split("|");
				var captionBulletsHtml = "";
				$(captionBullets).each(function (index, bulletText) {
					captionBulletsHtml += "<li>" + bulletText + "</li>";
				});
				$(".lt-bullets").empty().html(captionBulletsHtml);
			});

		//when clicking on a video thumbnail this happens:
			$(ltVideoThumbnails).off().on("click", function (e) {
				e.preventDefault();

				$(ltVideoThumbnails).removeClass("lt-selected");
				// add a class to the thumb that was clicked
				$(this).addClass("lt-selected");

				var newVideoId = $(this).data("videoid");
				watch_youtubeOnPage(newVideoId, '.lt-modal-video-container', true, 'Life Tested');

			});

		// the prev and next arrows should move the images
			var numberOfLtPhotos = $(ltPhotoThumbnails).size();
			$("#lt-gallery-prev").off().on("click", function () {
				var currentImageIndex = parseInt($(".lt-photo-gallery-photo").data("image-index"));
				var lastLtPhoto = parseInt(numberOfLtPhotos) - 1;
				var prevLtPhoto = parseInt(currentImageIndex) - 1;
				if (currentImageIndex === 1) {
					$(ltPhotoThumbnails).eq(lastLtPhoto).click();
						$("#life-tested-photo-gallery").jcarousel('scroll', currentImageIndex);
				} else {
					$(ltPhotoThumbnails).eq(prevLtPhoto - 1).click();
						$("#life-tested-photo-gallery").jcarousel('scroll', currentImageIndex);
				}
			});
			$("#lt-gallery-next").off().on("click", function () {
				var currentImageIndex = parseInt($(".lt-photo-gallery-photo").data("image-index"));
				if (currentImageIndex < numberOfLtPhotos) {
					$(ltPhotoThumbnails).eq(currentImageIndex).click();
						$("#life-tested-photo-gallery").jcarousel('scroll', currentImageIndex);
				} else {
					$(ltPhotoThumbnails).eq(0).click();
						$("#life-tested-photo-gallery").jcarousel('scroll', 0);
				}

			});


		//show the first content panel
			$(".lt-videoContent").eq(0).show();

		//click the first image
			$(ltPhotoThumbnails).eq(0).click();

		//click the first video
			videoLoadClick = true;
			$('#lt-video-gallery ul li a').eq(0).click();
			videoLoadClick = false;

			s.eVar45 = "Life Tested Gallery Open";
			s.events = "event45";
			s.tl("true", "o", "Life Tested Gallery Open - " + sContentGroup);
			s.events = "";
			s.eVar45 = "";

	}


	$("a#life_tested_modal").on("click", function (e) {
		e.preventDefault();

		$("#life-tested-features-gallery").modal({
			containerId: 'life-tested-overlay-container',
			close: false,
			onShow: clickableTabsInit,
			overlayClose: true
		});


		// roll the page to the top because this isn't a fixed modal
		$('html, body').animate({ scrollTop: 0 }, 'slow');


	});

	
}

function replaceImage(imageSrc, photoContainer, id) {
	if (imageSrc) {
		// clear out the old src and replace the new one
		$(photoContainer + " img").attr("src", "");
		$(photoContainer + " img").attr("src", imageSrc);

		// also update the image index so that the arrows work
		$(photoContainer).data("image-index", id);

	}
}

function watch_youtubeOnPage(youtubeID, playerID, swapContent, videoCategory) { //the playerID should container either the . or the #
	//$('iframe', playerID).hide();
	var youtubeVideoSrc = 'https://www.youtube.com/embed/' + youtubeID + '?modestbranding=1&amp;rel=0&amp;border=1&amp;title=0&amp;wmode=opaque&amp;fs=0&amp;autohide=1&amp;showinfo=0';
	//var $videoIframe = $(playerID).find('iframe');
	$('iframe', playerID).attr("src", youtubeVideoSrc);
	//$('iframe', playerID).show();
	if (swapContent) {
		updateVideoCaptionOnPage(youtubeID);
		if (!videoLoadClick) {
		    var thisCaption = (document.getElementById("lt-content-" + youtubeID).innerText || document.getElementById("lt-content-" + youtubeID).textContent);
		    thisCaption = thisCaption.trim();

			if (thisCaption.indexOf("\n"))
				thisCaption = thisCaption.substring(0, thisCaption.indexOf("\n"));
			thisCaption = thisCaption.replace(/[^\x00-\x7f]/g, '');
			var thisLinkType = "Video Click - ";
			if (typeof videoCategory != "undefined")
				thisLinkType = videoCategory + " " + thisLinkType;
			s.tl("true", "o", thisLinkType + thisCaption + " - " + sContentGroup);
		}
	}
}

function updateVideoCaptionOnPage(contentID) {
	var content = $(".lt-videoContent");
	$(content).hide();
	$("#lt-content-" + contentID).show();

}

function showPlanTab(tabId, scrollPage) {
//updated 1.28.13 to move to individual pages as opposed to tabs.

//    $(".plan_tabs li").removeClass("selected");
//    $(".plan_tabs li a").each(function() {
//        var relAttr = $(this).attr("rel");
//        if (relAttr == tabId) {
//            $(this).parent().addClass("selected");
//        }
//    });


//    $(".plan_tab_data").css({ "visibility": "hidden", "z-index": "-1", "top": "-999em" });
//    //hide / show correct disclaimers
	if (tabId == "plan_content-HomesReadyNow") {
		$(".disclaimer_HomesReadyNow").show();
	} else {
		$(".disclaimer_HomesReadyNow").hide();
	}

	$("#" + tabId).css({ "visibility": "visible", "z-index": "1", "display": "block", "top": "0px" });
//    var tab_data_height = $("#" + tabId).height();
//    tab_data_height += $(".disclaimer_container").height();
//    $(".plan_2011 .content").height(tab_data_height + 255);  //255px is the top area of the page.


	trackClicks(tabId);

}

function listen_getDirections() {
	//since this is called on doc.ready lets use this to populate the community address into the field
	var init = $("#getDirectionsToCommunity").size();
	if (init) {
		$("#getDirectionsToCommunity").validate({
			submitHandler: function(form) {
				var communityID = $("#communityID").val();
				var startAddress = $(".start_address").val();
				startAddress = startAddress.replace(" ", "+");
				var endAddress = $(".end_address").val();

				var origEndAddress = $(".orig_end_address").val();
				var latlng = $(".lat_lng").val();
				if(origEndAddress!=undefined && latlng!= undefined)
					if (origEndAddress != "" && latlng != "" && ($.trim(origEndAddress) == $.trim(endAddress)))
						endAddress = latlng;

				endAddress = endAddress.replace(" ", "+");
				var googleURL = "http://maps.google.com/maps?saddr=" + startAddress + "&daddr=" + endAddress;
				//Pulte_TAB_SUBMIT3() //tracking

				trackTabClicks("button_StepByStepDirections");
				trackDrivingDirectionSubmit(); // UserControls\MasterPageContent\SiteTags.ascx
				//ad perfect:
				var init = $("body#pulte").size(); //only fire ad perfect on pulte pages
				//if (init) {
				if (typeof SSM_submit_conversion == 'function') {
					SSM_submit_conversion('Directions', communityID, '');
				}


				window.open(googleURL);

				//}

			} //submit handler end

		});        // validate end

	}
}

function TrackRequestInfoSuccess(commID, state, location) {

	if (UseSiteCatalyst) {
		var sOldPageName = s.pageName;

		s.pageName = 'ContactUs-NeighborhoodInfo-ThankYou';
		if (location != '')
			s.pageName = location + ' - ' + s.pageName;

		if (window.rh_fName != null && s.pageName.indexOf('find a home - search map') < 0) { // we are on the region inventory homes page
			s.pageName = 'InventoryHomesInfo-ThankYou';
		}
		if (sOldPageName.length > 0) {
			if (sOldPageName.indexOf(" - index") > 0)
				sOldPageName = sOldPageName.replace(" - index", "")
			s.pageName = sOldPageName + " - " + s.pageName;
		}

		s.events = "event2"
		s.eVar1 = "contact us";

		//s.channel=sContentGroup;
		//s.hier1=sContentGroup;

		setContentGroup(commID);

		var sContactUsContentGroup = sContentGroup;
		if (sContactUsContentGroup.length > 0) {
			if (sContactUsContentGroup.indexOf("/index") > 0)
				sContactUsContentGroup = sContactUsContentGroup.replace("/index", "");
			else if (sContactUsContentGroup.indexOf("/Find a Home") > 0)
				sContactUsContentGroup = sContactUsContentGroup.replace("/Find a Home", "");
		}
		else
			sContactUsContentGroup = commID;

		s.channel = sContactUsContentGroup + "/" + "ContactUs-NeighborhoodInfo-ThankYou";
		s.hier1 = sContactUsContentGroup + "/" + "ContactUs-NeighborhoodInfo-ThankYou";
		s.prop1 = sTProp1;
		s.prop2 = sTProp2;
		s.prop3 = sTProp3;
		s.prop4 = sTProp4;
		s.prop5 = sTProp5;
		s.prop6 = sTProp6;

		s.state = state;

		s.t();
		s.pageName = sOldPageName;
		s.events = "None";
		s.eVar1 = "";
		resetContentGroup();
	}
	//End SiteCatalyst code to track form conversion***********************************************************************************
	trackLeadSubmit();  // in \UserControls\MasterPageContent\SiteTags.ascx 
}

function listen_moreInfoCommunity() {
	//this is the form on the community page and search-map page
	$("#moreInfoCommunity").validate({
		submitHandler: function (form) {
			//alert("submit");
			var siteID = getCurrBrandID();
			var comIDs = []; // need to declare it as an array and set comIDs[0] = communityID
			var communityID = $("#communityID").val();
			comIDs[0] = communityID;
			var isLoggedIn = signedInStatus;
			var fName = $("#community_fName").val();
			var lName = $("#community_lName").val();
			var email = $("#community_email").val();
			var state = $("#community_state").val();
			var topicID = 11;
			var message = $("#message").val();
			if (!message) { message = "@@@Community@@@"; }
			if (message == '@@@LEAD_SOURCE_CODE@@@') {
				switch (siteID) {
					case 1: message = "@@@Pulte_FindAHome@@@"; break;
					case 2: message = "@@@Del_Webb_FindAHome@@@"; break;
					case 3: message = "@@@Divosta_FindAHome@@@"; break;
					case 4: message = "@@@Centex_FindAHome@@@"; break;
					default: message = ""; break;
				}
			}
			$(".comm_form_fields_container ").append('<img class="ajax_spinner" src="/images/global/spinner.gif" alt="sending..." class=\"ajax_spinner\" />');
			var thisLocation = "";
			if (s.pageName.indexOf('find a home - search map') >= 0) {
				if (document.getElementById('geohierarchy-' + communityID) != undefined)
					thisLocation = 'comm_listing';
				else
					thisLocation = 'inv_listing';
			}
			TrackRequestInfoSuccess(communityID, state, thisLocation); //tracking
			//Pulte_TAB_SUBMIT(); //tracking
			Pulte08.AjaxWebServices.CommunitySoftJoinService.SaveSoftJoinForm(siteID, isLoggedIn, comIDs, fName, lName, email, state, false, "", topicID, message,
			callBackMoreInfoCommunitySuccess, callBackMoreInfoCommunityFailed);
			//adperfect
			var init = $("body#pulte").size(); //only fire ad perfect on pulte pages
			//if (init) {
			if (typeof SSM_submit_conversion == 'function') {
				SSM_submit_conversion('Community', communityID, communityID);
			}
			
			
			//}

		} //submit handler end

	});                  // validate end

	//this is the form on the plan page under the "Home Features" tab
	$("#moreInfoPlanHomeFeatures").validate({
		submitHandler: function(form) {
			var siteID = getCurrBrandID();
			var comIDs = []; // need to declare it as an array and set comIDs[0] = communityID
			var communityID = $("#communityID").val();
			var planID = $("#planID").val();
			comIDs[0] = communityID;
			var isLoggedIn = signedInStatus;
			var fName = $("#plan1_fName").val();
			var lName = $("#plan1_lName").val();
			var email = $("#plan1_email").val();
			var state = $("#plan1_state").val();
			var topicID = 11;
			var message = "@@@Plan@@@";
			$(".comm_form_fields_container ").append('<img class="ajax_spinner" src="/images/global/spinner.gif" alt="sending..." class=\"ajax_spinner\" />');
			TrackRequestInfoSuccess(communityID, state, "Home Features Tab")
			Pulte08.AjaxWebServices.CommunitySoftJoinService.SaveSoftJoinForm(siteID, isLoggedIn, comIDs, fName, lName, email, state, false, "", topicID, message,
			callBackMoreInfoCommunitySuccessOne, callBackMoreInfoCommunityFailedOne);
			//adperfect
			var init = $("body#pulte").size(); //only fire ad perfect on pulte pages
			//if (init) {
			if (typeof SSM_submit_conversion == 'function') {
				SSM_submit_conversion('Plan', communityID, planID);
			}
			
			//}

		} //submit handler end

	});               // validate end


	//this is the form on the plan page under the "Homes Ready Now" tab
	$("#moreInfoPlanReadyNow").validate({
		submitHandler: function(form) {
			var siteID = getCurrBrandID();
			var comIDs = []; // need to declare it as an array and set comIDs[0] = communityID
			var communityID = $("#communityID").val();
			var planID = $("#planID").val();
			comIDs[0] = communityID;
			var isLoggedIn = signedInStatus;
			var fName = $("#plan2_fName").val();
			var lName = $("#plan2_lName").val();
			var email = $("#plan2_email").val();
			var state = $("#plan2_state").val();
			var topicID = 11;
			var message = "homes ready now tab. Plan ID = ";
			$(".comm_form_fields_container ").append('<img class="ajax_spinner" src="/images/global/spinner.gif" alt="sending..." class=\"ajax_spinner\" />');
			TrackRequestInfoSuccess(communityID, state, "Homes Ready Now Tab")
			Pulte08.AjaxWebServices.CommunitySoftJoinService.SaveSoftJoinForm(siteID, isLoggedIn, comIDs, fName, lName, email, state, false, "", topicID, message,
			callBackMoreInfoCommunitySuccessTwo, callBackMoreInfoCommunityFailedTwo);
			//adperfect
			var init = $("body#pulte").size(); //only fire ad perfect on pulte pages
			//if (init) {
			if (typeof SSM_submit_conversion == 'function') {
				SSM_submit_conversion('Plan-Inventory', communityID, planID);
			}
			
			//}

		} //submit handler end

	});               // validate end
}

function callBackMoreInfoCommunitySuccess() {
	//$(".comm_form_fields_container").removeclass("opened");
	$(".comm_form_fields_container .ajax_spinner").remove();
	$(".comm_form_fields_container").removeClass("opened");
	$(".comm_form_fields_container .commMoreInfoFormFields").hide();
	$(".contact_form_container .comm_contact_title").remove();
	$(".comm_form_fields_container .commMoreInfoFormThank_you").show();
}

function callBackMoreInfoCommunityFailed() {
	$(".comm_form_fields_container .ajax_spinner").remove();
	$(".comm_form_fields_container").removeClass("opened");
	$(".comm_form_fields_container .commMoreInfoFormFields").hide();
	$(".contact_form_container .comm_contact_title").remove();
	$(".comm_form_fields_container .commmoreinfoformsend_error").show();

}
function callBackMoreInfoCommunitySuccessOne() { //home features tab
	//$(".comm_form_fields_container").removeclass("opened");
	$(".comm_form_fields_container .ajax_spinner").remove();
	$(".comm_form_fields_container").removeClass("opened");
	$("#plan_content-HomeFeatures .commMoreInfoFormFields").hide();
	$("#plan_content-HomeFeatures .comm_contact_title").remove();
	$("#plan_content-HomeFeatures .commMoreInfoFormThank_you").show();

	$("#plan_content-HomesReadyNow .commMoreInfoFormFields").hide();
	$("#plan_content-HomesReadyNow .comm_contact_title").remove();
	$("#plan_content-HomesReadyNow .commMoreInfoFormThank_you").show();
}

function callBackMoreInfoCommunityFailedOne() { //home features tab
	$(".comm_form_fields_container .ajax_spinner").remove();
	$(".comm_form_fields_container").removeClass("opened");
	$("#plan_content-HomeFeatures .commMoreInfoFormFields").hide();
	$("#plan_content-HomeFeatures .comm_contact_title").remove();
	$("#plan_content-HomeFeatures .commMoreInfoFormSend_Error").show();

}
function callBackMoreInfoCommunitySuccessTwo() { //inventory tab
	//$(".comm_form_fields_container").removeclass("opened");
	$(".comm_form_fields_container .ajax_spinner").remove();
	$(".comm_form_fields_container").removeClass("opened");
	$("#plan_content-HomesReadyNow .commMoreInfoFormFields").hide();
	$("#plan_content-HomesReadyNow .comm_contact_title").remove();
	$("#plan_content-HomesReadyNow .commMoreInfoFormThank_you").show();
}

function callBackMoreInfoCommunityFailedTwo() { //inventory tab
	$(".comm_form_fields_container .ajax_spinner").remove();
	$(".comm_form_fields_container").removeClass("opened");
	$("#plan_content-HomesReadyNow .commMoreInfoFormFields").hide();
	$("#plan_content-HomesReadyNow .comm_contact_title").remove();
	$("#plan_content-HomesReadyNow .commMoreInfoFormSend_Error").show();

}

//function callBackRestrictedMarketingReferCommunity(result) {
//    if (result) {
//        var yourFirstName = $("#referFriend .refer_fname").val();
//        var yourLastName = $("#referFriend .refer_lname").val();
//        var yourState = "";
//        var friendsName = $("#referFriend .refer_friendName").val();
//        var friendsEmail = $("#referFriend .refer_friendEmail").val();
//        var friendsState = "";
//        var message = $("#referFriend .refer_friend_message_info").val();
//        var brandID = getCurrBrandID();
//        var brandName = getCurrSite();
//        Pulte08.AjaxWebServices.TellAFriendService.SendHomeownerReferral(brandID, brandName, friendsName, friendsEmail, friendsState, yourFirstName, yourLastName, yourState, message, callBackEmailCommunity);
//    }
//}

//function callBackEmailCommunity() {
//    $("#modal_content-refer-friend .ajax_spinner").remove();
//    $.modal.close();
//}


function sendToFriendModalOpen() {
	$("#modal-wrapper-refer-friend").modal({
		closeHTML: '<a title="Close" class="close_btn simplemodal-close"></a>',
		overlayClose: true,
		onClose: function(dialog) {
			dialog.data.fadeOut('slow', function() {
				$.modal.close();
			});
		}
	});


	$("#simplemodal-container").addClass("sendToFriendModal");
	$("#simplemodal-container").css("position", "absolute");
	$("#simplemodal-container").css("top", "60px");
	$("#simplemodal-container").css("background-color", "transparent");
	$("#simplemodal-container").css("border", "none");
	$("#simplemodal-container").css("width", "550px");
	$("#simplemodal-container").css("height", "600px");

	trackClicks("OpenTellAFriend");
	//listen for submit button
	listen_tellFriendSubmit();
}


function listen_tellFriendSubmit() {
	page_data.referFriendValidate = $("#referFriend").validate({
		submitHandler: function(form) {
			var siteID = getCurrBrandID();
			var comIDs = []; // need to declare it as an array and set comIDs[0] = communityID
			var communityID = 0;
			if ($("#communityID").size()) {
				communityID = $("#communityID").val();
			}

			// Search-map page uses the following id
			if ($("#send-communityID").size()) {
				communityID = $("#send-communityID").val();
				$("#sendToFriendModal .ajax_spinner").show();

				$("#sendToFriendModal .submit-sendToFriend").attr("disabled", "disabled");
			}

			comIDs[0] = communityID;

			var homePlanID = 0
			if ($("#planID").size()) {
				homePlanID = $("#planID").val();
			}
			if (document.getElementById('planID') != null) homePlanID = document.getElementById('planID').value;
			var isLoggedIn = signedInStatus;
			var friendsEmail = $("#referFriend .refer_friendEmail").val();
			var yourFirstName = $("#referFriend .refer_fname").val();
			var yourLastName = $("#referFriend .refer_lname").val();
			var yourEmail = "";
			switch (siteID) {
				case 1:
					yourEmail = "ReferAFriend@pulte.com";
					break;
				case 2:
					yourEmail = "ReferAFriend@centex.com";
					break;
				case 3:
					yourEmail = "ReferAFriend@delwebb.com";
					break;
				case 4:
					yourEmail = "ReferAFriend@divosta.com";
					break;
			}

			var sendMeACopy = false;
			var message = $("#referFriend .refer_friend_message_info").val();
			if (!message) {
				message = "";
			}

			setContentGroup(communityID);
			trackTabClicks("ClickToEmail");
			resetContentGroup();

			//Pulte08.AjaxWebServices.CommunitySoftJoinService.SaveSoftJoinForm(siteID, isLoggedIn, comIDs, fName, lName, email, state, false, "", topicID, message,callBackMoreInfoCommunitySuccess, callBackMoreInfoCommunityFailed);
			Pulte08.AjaxWebServices.TellAFriendService.SendTellAFriend(siteID, communityID, homePlanID, friendsEmail, yourFirstName, yourLastName, yourEmail, sendMeACopy, message, OnEmailSentCommunity);
			$("#modal_content-refer-friend").append('<img class="ajax_spinner" src="/images/global/spinner.gif" alt="sending..." class=\"ajax_spinner\" />');
		} //submit handler end

	});    // validate end
}

function OnEmailSentCommunity() {
	$("#modal_content-refer-friend .ajax_spinner").remove();
	
	if ($("body.search-results").size()) {
		//hide the controls
		$("#sendToFriendModal .form_inputs").hide();
		//show the thank you message
		$("#sendToFriendModal .modal-after-submit-success").show();
		$("#sendToFriendModal .refer_friendEmail").val("");

		$("#sendToFriendModal .ajax_spinner").hide();

		$("#sendToFriendModal .submit-sendToFriend").removeAttr("disabled");
	} else {
		$.modal.close();
	}
}

function fix_featureHeaderImage() {
	$(".feature_wrapper .plan_features_title").each(function() {
		if ($(this).text() == "Neighborhood Features" || $(this).text() == "Top Features" || $(this).text() == "Top Feature") {
			$(this).addClass("feature2");
		}
	});
}

function listen_hide_show_series() {
	$(".btn_toggle_series").click(function() {
		var seriesName = $(this).attr("data-series-name");
		var $this = $(this);
		//toggles the buttons
		$(".btn_toggle_series").each(function() {
			if ($(this).attr("data-series-name") == seriesName) {
				$(this).toggle();
			}
		});

		//decide to SHOW or HIDE
		if ($this.hasClass("view_series_btn")) {  //SHOW
			$(".series_plan_wrapper").each(function() {
				if ($(this).attr("data-series-name") == seriesName) {
					//$(this).slideDown('slow');
					$(this).show();
				}
			});
		} else { // HIDE
			$(".series_plan_wrapper").each(function() {
				if ($(this).attr("data-series-name") == seriesName) {
					//$(this).slideUp('fast');
					$(this).hide();
				}
			});
		}
	});

	var init = $("#series_1").size(); // this means that there is only 1 series

	if (init) {//if there is only 1 series, we want it to be toggled open.
		$(".view_series_btn").click().hide();

	}

}

function ViewAllReviewsFromUpperTab() {
	//New Tracking Code
	if (rrHierarchy < 3) {
		rrHierarchy = 3;
		rrID = " - view all reviews";
	}
	//End New Tracking Code
	clickCommTabLink('tabComm-review-rating', true);
}

function clickCommTabLink(linkID, scroll) {
	clickCommTabLinkRun = true;
	$("ul.comm_tabs a").each(function() {
		$this = $(this);
		if ($this.attr("rel") == linkID) { $this.click(); }
	});
	if (scroll) {
		scrollPageToTabArea();
	}
	//We will track non left nav tab clicks to View Map from here - all else still tracked in ShowCommTab - per 10/10/13 marketing discussion
	if (linkID.toLowerCase().indexOf('mapanddirections') >= 0) {
		trackTabClicks(linkID);
	}
	return true;
}

function checkForParams() {
	try {
		var tabParam = getUrlVars()["tab"] || getUrlVars()["selectedTab"];
	
		//some legacy links have ?selected=events so we have to account for that too. (that param will override ALL other "tab" params.
		var tabParam1 = getUrlVars()["selected"];

		if (tabParam1 == "events" || tabParam1 == "special-offers") {
			tabParam = "tabComm-offersAndEvents";
		}
	
		if (tabParam === undefined) {
			//$(".comm_tab_data").css("left", "0px");
			//$(".comm_tab_data").eq(0).show();
			//showCommTab(tabMarkedAsSelected.children().attr("rel"), false);
		} else {
			//New Tracking Code
			if (rrHierarchy < 1) {
				rrHierarchy = 1;
				rrID = " - search map";
			}
			//End New Tracking Code

			clickCommTabLink(tabParam, true);
		}
	} catch (e) {

	}
}


//Life Tested functions
function listen_expandContractContent() {
	//the page loads with the hovered state visible, and then they all hide
	$(".hover_effect").each(function() {
		//$(this).hide("fade", {}, 10);
	});

	$(".expandable").hover(
		function() {
			var $parentRail = $(this).parent();
			$(".icon_carrot", this).hide();
			$(".innercontent", this).show();
			$(".content_mid", this).stop(true, true).addClass("expanded", 500);
			//because of the abolute position on the images below the expandable box, we need to hide the other icons:
			$(".icon_carrot, .icon_playVideo", $parentRail).hide();

		},
		function() {
			var $parentRail = $(this).parent();
			$(".icon_carrot", this).show();
			$(".innercontent", this).hide();
			$(".content_mid", this).stop(true, true).removeClass("expanded", 500);
			$(".icon_carrot, .icon_playVideo", $parentRail).show();
		}
	);

		$(".content_image").hover(
		function() {
			var $container = $(this);
			$(".hover_effect", $container).stop(true, true).fadeTo(500, 0.5); //.show("fade", {}, 400);
			$(".hover_title, .icon_go", $container).show();
			$(".content_mid").stop(true, true);
		},
		function() {
			var $container = $(this);
			$(".hover_effect", $container).stop(true, true).fadeTo('slow', 0); //.hide("fade", {}, 700);
			$(".hover_title, .icon_go", $container).hide();
		}


		);

		$(".icon_playVideo, .icon_go").click(function() {
			//This is due to IE7 and z-indexing.

			//find related a tag:
			$trigger = $(this).parent().parent().find(".gallery_trigger");
			$trigger.click();
		});

	}

	function toggle_ShareDropDown() {
		$("a#shareToggle").click(function() {
			if ($(this).hasClass("closed"))
				trackClicks("ShareDropDownOpened");
			else
				trackClicks("ShareDropDownClosed");


			$(this).toggleClass("closed").toggleClass("open").next().toggleClass("show");
		});
	}

	function listen_accordion() {
		//used on the following pages:
		// DW / research/area.aspx
		// DW / research/region.aspx
		// DW / communities / comm2012 - how to reach us
		
		$('.accordion .head').click(function() {
			$(this).toggleClass("ui-accordion-selected");

			if ($(this).next().is(":hidden")) {
				$(this).next().slideDown("slow");
		   } else {
				$(this).next().slideUp("slow");
			}

			//      $(this).next().toggle('slow');
			return false;
		}).next().hide();   //this hides all content areas

		$('.accordion .head').first().click(); //this opens the first content area
		$('.accordion .load-open').not(':eq(0)').click(); //this opens the content area for anything with the class of load-open. the reason for the .not eq(0) is because the first (eq0) element was clicked in the line above.

	}

	function scrollPageTo(identifier, topPadding) {
		if (topPadding == undefined) {
			topPadding = 0;
		}
		var moveTo = $(identifier).offset().top - topPadding;
		$('html, body').stop().animate({
			scrollTop: moveTo
		}, 1000);

	}

	function createPinsOnMap(locationList, locationListId, areaImage, areaContainer,mapSide,regionPage) {

		var xCoor,
			yCoor,
			xCoorPopUp,
			yCoorPopUp,
			html = "",
			x = 0,
			pointsToPlot = locationList,
			pluralCommunities = 'community';
		if (typeof (BrandName) == "undefined") {//Brand Name is defined on DW/Research/area.aspx
			
			var BrandName = 'Del Webb';
		}
		if (page_data.brandName === undefined) {
			page_data.brandName = "Del Webb";
		}
		page_data.urlBrandName = page_data.brandName.replace(" ", "");
			
		//push new image to css bg
		if (areaImage != "") {
			$(areaContainer).css("background-image", 'url("' + areaImage + '")'); //this is generally done on the aspx page with CSS.
		}
		for (i in locationList) {//put new pin/pins on map
			//to account for the size of the pin we have to subtract 10 from the left measurement and 27 from the top measurement.
			xCoor = Number(locationList[i].XLOC) - 10;
			yCoor = Number(locationList[i].YLOC) - 27;

			//if there is more than 1 community we don't want it to say community
			if (Number(locationList[i].CommunityCount) > 1) {
				pluralCommunities = 'communities';
			} else {
				pluralCommunities = 'community';
			}

			//On the Region.aspx page we have a different colored pin point for the 'selected' area
			//In the tooltip we don't want an "About the Area" button on the selected region - since this is the page that is about the area. (thats set up below in the html+= section
			if (regionPage) {
				if (locationList[i].SelectedRegion) {
					var RegionImgName = "area-map-pointer-selected";
				} else {
					var RegionImgName = "area-map-pointer";
				}
			} else {
				var RegionImgName = "area-map-pointer";
			}

			var lowestPrice = parseInt(locationList[i].PriceFrom, 10);
			lowestPrice = addCommas(lowestPrice);

			// MapPin.createPin(this, i);
			//this parent is so that the tooltip displays in the correct place
			html += '<div class="pointer_tip_container mapPointer" id="mapPointerContainer-' + locationList[i].Region + '-' + i + '" style="margin-top:' + yCoor + 'px; margin-left:' + xCoor + 'px;" >';
			html += ('<img data-location-id="' + locationListId + '" data-index="' + i + '" id="mapPointer-' + locationList[i].Region + '-' + i + '" class="mapPointer-' + mapSide + ' fixedPoint" data-popup-id="mapPopUp-' + locationList[i].Region + '-' + i + '" src="/images/' + page_data.urlBrandName + '/research/' + RegionImgName + '.png" alt="' + locationList[i].Region + '" />');
			//build the tooltip
			html += '<div class="comm_details_popup" id="mapPopUp-' + locationList[i].Region + '-' + i + '" >';
			html += '<img src="' + locationList[i].ImagePath + '" alt="' + locationList[i].Region + '" class="comm_image" />';
			html += '<div class="comm_right_info">';
			html += '<span class="region">' + locationList[i].Region + '</span>, <span class="state">' + locationList[i].State + '</span>';
			html += '<p class="comm_copy"><span class="comm_count">' + locationList[i].CommunityCount + '</span> ' + page_data.brandName + ' <span class="comm_singular_plural">' + pluralCommunities + '</span> priced from $<span class="comm_lowest_price">' + lowestPrice + '</span>.</p>';
			html += '</div><!--comm_right_info-->';
			html += '<div class="comm_button_container">';
			html += '<a class="button button_blue comm_view_community"  href="' + locationList[i].ViewCommunityURL + '"><span>View ' + pluralCommunities + '</span></a>';
			if (!locationList[i].SelectedRegion) { //NOT the selected region we hide the about the area button
				html += '<a class="button button_brown comm_about_the_area" href="' + locationList[i].AboutAreaURL + '"><span>About The Area</span></a>';
			}
			html += '</div><!--comm_button_container-->';
			html += '</div><!--comm_details_popup-->';
			html += '</div><!--pointer_tip_container-->';
			x++;
			}
			$(".staticPinContainer", areaContainer).append(html);

		}

		function addCommas(nStr) {
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}

		function showFullArticle(articleID) { }

		function showLessArticle(articleID) { }

		function toggleArticle(articleID) {
			$(".article_copy", "#articleID-" + articleID).toggle();
		}

		function padvQuestionLegalModal() {
			$.modal('<iframe src="/predefined/ask-answer-legal.aspx" style="border:0" width="630" frameborder="0" height="890">', {
				//  closeHTML: "",
				containerCss: {
					backgroundColor: "#fff",
					borderColor: "#fff",
					height: 920,
					padding: 0,
					width: 650,
					paddingTop: 20
				},
				closeHTML: '<a class="modalCloseImg simplemodal-close-text" title="Close"></a>',
				overlayClose: true
			});
		
		}


		function PinAndTrack(thisLink) {
			s.events = "event34";
			ReportAndLink("Pinterest", thisLink, true)
			//trackClicks("Pinterest");
			s.events = "";
		}


		function TrackGooglePlus() {
			s.events = "event35";
			trackClicks("GooglePlus");
			s.events = "";
		}

		function TrackFaceBookLike() {
			s.events = "event17";
			trackClicks("FaceBookLike");
			s.events = "";
		}

		function getMetaContent(propName) {
			var metas = document.getElementsByTagName('meta');

			for (i = 0; i < metas.length; i++) {
				if (metas[i].getAttribute("name") == propName) {
					return metas[i].getAttribute("content");
				}
			}

			return "";
		} 
		
		function closeModal(){ //so that we can call this from within the iframe
			$.modal.close();
		}

		function instantiate_collapsible_modules() {
			var init = $(".collapsible").size();
			if (init) {
				$(".collapsible").each(function() {
					//add the a tag and the close / open icon
					$(this).find(".module_title span").wrap('<a href="#" class="collapsible" />')

					//next close all the ones that should be closed.
					if ($(this).hasClass("closed")) {
						$(this).find(".module_body").slideUp("slow");
					} else {
						$(this).addClass("opened");
					}
				});
			}
			//listen for the clicks
			$(".module_title .collapsible").live('click', function() {
				$(this).parent().parent().toggleClass("opened").toggleClass("closed").find(".module_body").slideToggle("slow");
				$(this).blur(); //to get rid of the border that appears around the title element
				return false;
			});
		}

		var comm13 = comm13 || {};
		comm13 = {
			/**
			@method aboutTheAreaMap
			**/
			aboutTheAreaMap: function aboutTheAreaMap() {
				//loadGSearch();
				//YUD.addClass(document.getElementById("mapsearch"), 'loaded');
				var isKiosk = $("body").hasClass("kiosk");
				var brand = $("body").attr("id").toLowerCase();
				var mapDiv = document.getElementById("mapsearch");  //YUD.getElementsByClassName('google-map', 'div', tabContent)[0];
				if (!mapDiv) return;

				// check if we already loaded the map
				if (!$(mapDiv).hasClass("loaded")) {
					var mapOptions = {
						zoom: 8,
						center: new google.maps.LatLng(-33, 151),
						disableDefaultUI: true,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						zoomControl: true,
						scaleControl: true,
						scrollwheel: false
					}
					var infowindow = new google.maps.InfoWindow();
					// create the map object and add custom control
					map = new google.maps.Map(mapDiv, mapOptions);  //the global var map is used in some other places and needs to be tracked down before fixing this.
					mapCONFIG.maps.aboutTheAreaMap = map;
					//map = new google.maps.Map(mapDiv);
					//map.addControl(new GSmallMapControl());
					var point = new google.maps.LatLng(defaultMapLat, defaultMapLng);
					mapCONFIG.maps.aboutTheAreaMap.setCenter(point);
					mapCONFIG.maps.aboutTheAreaMap.setZoom(11);
					var communityName = "";
					if (document.getElementById("communityName")) {
						communityName = document.getElementById("communityName").value;
					}
					var address = '';
					if (typeof dirAddress != 'undefined' && dirAddress) address += dirAddress.address + '<br />' + dirAddress.city + ', ' + dirAddress.state + ' ' + dirAddress.zip;
					if (address == '') {
						if (document.getElementById('address1') != null) address = document.getElementById('address1').value + '<br />';
						if (document.getElementById('cityStateZip') != null) address += document.getElementById('cityStateZip').value;
					}
					var bubbleContent = '<table border=0 cellpadding=0 cellspacing=0>';
					bubbleContent += '<tr><td><strong>' + communityName + '</strong></td></tr>';
					bubbleContent += '<tr><td>' + address + '<br />' + '</td></tr>';
					bubbleContent += '</table>';
					//var marker = customMarkerUtils.createMarker(point, bubbleContent, getCurrSite().toLowerCase());
					//alert(map);
					if (!isKiosk) {
						marker = mapCONFIG.createMarkerV3(point, bubbleContent, undefined, mapCONFIG.maps.aboutTheAreaMap);
						google.maps.event.addListener(marker, 'click', function () {
							infowindow.setContent(bubbleContent);
							infowindow.open(mapCONFIG.maps.aboutTheAreaMap, marker);
						});
					} else {
						// For Kiosk it's a different center Icon
						var kioskCenterIcon = "/images/" + brand + "/kiosk/google/icons/realestate.png"
						var centerKioskMarker = new google.maps.Marker({
							position: point,
							map: mapCONFIG.maps.aboutTheAreaMap,
							icon: kioskCenterIcon
						});
					}
					//map.addOverlay(marker);
					mapDiv.map = mapCONFIG.maps.aboutTheAreaMap;
					$(mapDiv).addClass('loaded');

				}
			},

			/**
			@method directionsMap
			**/
			directionsMap: function directionsMap() {
				//var tabContent = $("#" + clickedId);  //activeTab.get('contentEl');
				var mapDiv = document.getElementById("google-directions");  //YUD.getElementsByClassName('google-map', 'div', tabContent)[0];
				if (!mapDiv) return;

				// check if we already loaded the map
				if (!YUD.hasClass(mapDiv, 'loaded')) {
					var mapOptions = {
						zoom: 4,
						center: new google.maps.LatLng(-33, 151),
						disableDefaultUI: true,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						zoomControl: true,
						scaleControl: false,
						scrollwheel: false
					}
					var infowindow = new google.maps.InfoWindow();

					// create the map object and add custom control
					mapCONFIG.maps.directionsMap = new google.maps.Map(mapDiv, mapOptions);
					//map = new google.maps.Map(mapDiv);
					//map.addControl(new GSmallMapControl());
					var point = new google.maps.LatLng(defaultMapLat, defaultMapLng);
					mapCONFIG.maps.directionsMap.setCenter(point);
					mapCONFIG.maps.directionsMap.setZoom(14); var communityName = "";
					if (document.getElementById("communityName")) {
						communityName = document.getElementById("communityName").value;
					}
					var address = '';
					if (typeof dirAddress != 'undefined' && dirAddress) address += dirAddress.address + '<br />' + dirAddress.city + ', ' + dirAddress.state + ' ' + dirAddress.zip;
					if (address == '') {
						if (document.getElementById('address1') != null) address = document.getElementById('address1').value + '<br />';
						if (document.getElementById('cityStateZip') != null) address += document.getElementById('cityStateZip').value;
					}
					var bubbleContent = '<table border=0 cellpadding=0 cellspacing=0>';
					bubbleContent += '<tr><td><strong>' + communityName + '</strong></td></tr>';
					bubbleContent += '<tr><td>' + address + '<br />' + '</td></tr>';
					bubbleContent += '</table>';
					//var marker = customMarkerUtils.createMarker(point, bubbleContent, getCurrSite().toLowerCase());
					//alert(map);
					//marker = mapCONFIG.createMarkerV3(point, bubbleContent, undefined, mapCONFIG.maps.directionsMap);
					//var currentBrand = getCurrSite().toLowerCase();
					var currentBrand = $("body").attr("id").toLowerCase();
					var marker = mapCONFIG.buildV3Marker(mapCONFIG.maps.directionsMap, point, mapCONFIG.gIcons[currentBrand], bubbleContent);
					google.maps.event.addListener(marker, 'click', function () {
						infowindow.setContent(bubbleContent);
						infowindow.open(mapCONFIG.maps.directionsMap, marker);
					});
					//map.addOverlay(marker);
					mapDiv.map = mapCONFIG.maps.directionsMap;
					YUD.addClass(mapDiv, 'loaded');
				}
			},


			/**
			* Use this method to load non-search page maps.
			* 
			* @method loadMap
			* @namespace comm13
			* @param {String} mapId
			* @param {Number} zoomLevel
			* 
			*/
			loadMap: function loadMap(mapId, zoomLevel) {
				var mapDiv = document.getElementById(mapId);  //YUD.getElementsByClassName('google-map', 'div', tabContent)[0];
				if (!mapDiv) return;

				// check if we already loaded the map
				if (!YUD.hasClass(mapDiv, 'loaded')) {
					var mapOptions = {
						zoom: 4,
						center: new google.maps.LatLng(-33, 151),
						disableDefaultUI: true,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						zoomControl: true,
						scaleControl: true
					}
					var infowindow = new google.maps.InfoWindow();

					// create the map object and add custom control
					map = new google.maps.Map(mapDiv, mapOptions);
					
					//map = new google.maps.Map(mapDiv);
					//map.addControl(new GSmallMapControl());
					var point = new google.maps.LatLng(defaultMapLat, defaultMapLng);
					map.setCenter(point);
					map.setZoom(zoomLevel);
					var communityName = "";
					if (document.getElementById("communityName")) {
						communityName = document.getElementById("communityName").value;
					}
					var address = '';
					if (typeof dirAddress != 'undefined' && dirAddress) address += dirAddress.address + '<br />' + dirAddress.city + ', ' + dirAddress.state + ' ' + dirAddress.zip;
					if (address == '') {
						if (document.getElementById('address1') != null) address = document.getElementById('address1').value + '<br />';
						if (document.getElementById('cityStateZip') != null) address += document.getElementById('cityStateZip').value;
					}
					var bubbleContent = '<table border=0 cellpadding=0 cellspacing=0>';
					bubbleContent += '<tr><td><strong>' + communityName + '</strong></td></tr>';
					bubbleContent += '<tr><td>' + address + '<br />' + '</td></tr>';
					bubbleContent += '</table>';
					//var marker = customMarkerUtils.createMarker(point, bubbleContent, getCurrSite().toLowerCase());
					//alert(map);
					marker = mapCONFIG.createMarkerV3(point, bubbleContent);
					google.maps.event.addListener(marker, 'click', function () {
						infowindow.setContent(bubbleContent);
						infowindow.open(map, marker);
					});
					//map.addOverlay(marker);
					mapDiv.map = map;
					YUD.addClass(mapDiv, 'loaded');
				}
			}
		};
		var research = {
			init: function () {
				this.events.scrollTo();
			},
			simpleRotator: function () {
				var allImgs = $('.rotator li');
				var delay = 12000;
				var currIdx = 0;
				var thumbs;
				var player;
				var externalButtons = $(".button_container a");

				//init
				allImgs.css({
					position: 'absolute',
					top: 0,
					left: 0
				}).hide();

				allImgs.first().show();

				createSimpleThumbs();

				player = setTimeout(doAuto, delay);

				function jumpto(imageId) {
					if (imageId <= allImgs.length) {
						allImgs.eq(currIdx).fadeOut();
						allImgs.eq(imageId).fadeIn();
						currIdx = imageId;
						highlightThumb(currIdx);
					}
				}
				function next() {
					var nextIdx = currIdx + 1;
					if (nextIdx >= allImgs.length) nextIdx = 0;
					allImgs.eq(currIdx).fadeOut();
					allImgs.eq(nextIdx).fadeIn();
					currIdx = nextIdx;
					highlightThumb(currIdx);
				}

				function prev() {
					var prevIdx = currIdx - 1;
					if (prevIdx < 0) prevIdx = allImgs.length - 1;
					allImgs.eq(currIdx).fadeOut();
					allImgs.eq(prevIdx).fadeIn();
					currIdx = prevIdx;
					highlightThumb(currIdx);
				}

				function doAuto() {
					next();
					player = setTimeout(doAuto, delay);
				};


				function createSimpleThumbs() {
					var thumbContainer = $("<div />").addClass("simple-thumbs");

					$(allImgs).each(function (i) {
						var thumb = $("<div />").addClass("simple-thumb-image");
						var img = $("<span />").addClass("img");
						$(thumb).append(img);
						$(thumb).bind("click", function () {
							jumpto(i);
						});
						$(thumbContainer).append(thumb);
					});
					//cache the reference to the thumbs
					thumbs = thumbContainer;
					//stick it in the dom
					$(".rotator_container").append(thumbContainer);
					//set the first thumb as active
					highlightThumb(0);
				}


				function highlightThumb(currentIdx) {
					$(thumbs).children().removeClass("active").eq(currentIdx).addClass("active");
					highlightExternalButton(currentIdx);
				}

				function highlightExternalButton(currentIdx) {
					$(externalButtons).removeClass("selected").eq(currentIdx).addClass("selected");
				}

				function pause() {
					clearTimeout(player);
				}

				function unpause() {
					player = setTimeout(doAuto, delay / 2);
				}

				$('#rotator-prev').click(function (evt) {
					evt.preventDefault();
					prev();
				});
				$('#rotator-next').click(function (evt) {
					evt.preventDefault();
					next();
				});

				$(".rotator_container").hover(function () {
					pause();
				}, function () {
					unpause();
				});

			},

			/**
			 Event listeners 
			 **/
			events: {
				/**
				@method scrollTo
				@module research
add class of scrollTo to any <a>
then add data-scrollto=".className" or data-scrollto="#idname" to the same a tag.
optionally data-scrollpadding and data-scrollspeed can be overridden in the a tag by adding them
and assigning numbers.
data-scrollpadding assumes px.
				*/
				scrollTo: function () {
					$(".js-scrollTo").on("click", function () {
						var identifier = $(this).data("scrollto");
						var padding = $(this).data("scrollpadding") || 50;
						var speed = $(this).data("scrollspeed") || 1000;
						if (identifier !== undefined) {
							PULTE13.utils.scrollPageTo(identifier, padding, speed);
						} else {
							//alert("no place to scroll to");
						}
					});
				}
			}
		};

		var oldContentGroup = "";
		var oldEVar6 = "";
		var oldProp1 = "";
		var oldProp2 = "";
		var oldProp3 = "";
		var oldProp4 = "";
		var oldProp5 = "";
		var oldProp6 = "";
		var oldProp10 = "";

		setContentGroup = function (id) {
			oldContentGroup = sContentGroup;
			oldEVar6 = s.eVar6;
			var bContentSet = false;
			if (document.getElementById('geohierarchy-' + id) != undefined)
				if (document.getElementById('geohierarchy-' + id).value != null)
					if (document.getElementById('geohierarchy-' + id).value != '') {
						sContentGroup = document.getElementById('geohierarchy-' + id).value;
						bContentSet = true;
					}
			if (!bContentSet)
				if (document.getElementById('invgeohierarchy-' + id) != undefined)
					if (document.getElementById('invgeohierarchy-' + id).value != null)
						if (document.getElementById('invgeohierarchy-' + id).value != '')
							sContentGroup = document.getElementById('invgeohierarchy-' + id).value;


			if (sContentGroup.indexOf("Dallas/Ft.Worth") > 0)
				sContentGroup = sContentGroup.replace("Dallas/Ft.Worth", "Dallas|Ft.Worth");
			else if (sContentGroup.indexOf("Ft Myers/Naples") > 0)
				sContentGroup = sContentGroup.replace("Ft Myers/Naples", "Ft Myers|Naples");
			else if (sContentGroup.indexOf("Killeen / Temple") > 0)
				sContentGroup = sContentGroup.replace("Killeen / Temple", "Killeen | Temple");
			else if (sContentGroup.indexOf("York/Lancaster Area") > 0)
				sContentGroup = sContentGroup.replace("York/Lancaster Area", "York|Lancaster Area");
			else if (sContentGroup.indexOf("Akron/Fairlawn") > 0)
				sContentGroup = sContentGroup.replace("Akron/Fairlawn", "Akron|Fairlawn");


			if (sContentGroup.length > 0)
				if (sContentGroup.indexOf("/index") > 0)
					sContentGroup = sContentGroup.replace("/index", "");
				else if (sContentGroup.indexOf("/Find a Home") > 0)
					sContentGroup = sContentGroup.replace("/Find a Home", "");

			if (sContentGroup.indexOf("/") == 0)
				sContentGroup = sContentGroup.replace("/", "");

			s.channel = sContentGroup;
			s.hier1 = sContentGroup;
			s.eVar6 = sContentGroup;

			var sTProp1 = "";
			var sTProp2 = "";
			var sTProp3 = "";
			var sTProp4 = "";
			var sTProp5 = "";
			var sTProp6 = "";
			var sTProp7 = "";
			var sTProp8 = "";
			var sTProp9 = "";

			if (sContentGroup.length > 0) {
				var sTGroup = sContentGroup;
				var sMySplit = sTGroup.split("/");

				for (i = 0; i < sMySplit.length; i++) {
					if (i == 0) sTProp1 = sMySplit[i];
					else if (i == 1) sTProp2 = sMySplit[i];
					else if (i == 2) sTProp3 = sMySplit[i];
					else if (i == 3) sTProp4 = sMySplit[i];
					else if (i == 4) sTProp5 = sMySplit[i];
					else if (i == 5) sTProp6 = sMySplit[i];
				}
			}

			s.prop1 = sTProp1;
			s.prop2 = sTProp2;
			s.prop3 = sTProp3;
			s.prop4 = sTProp4;
			s.prop5 = sTProp5;
			s.prop6 = sTProp6;

			if (sTProp1.toString().toLowerCase() == "product") {
				if (sTProp2 == "" || sTProp2 == "index")
					s.prop10 = "Product";
				else if (sTProp2 > "" && (sTProp3 == "" || sTProp3 == "index"))
					s.prop10 = "Area";
				else if (sTProp3 > "" && (sTProp4 == "" || sTProp4 == "index"))
					s.prop10 = "State";
				else if (sTProp4 > "" && (sTProp5 == "" || sTProp5 == "index"))
					s.prop10 = "Region";
				else if (sTProp5 > "" && (sTProp6 == "" || sTProp6 == "index"))
					s.prop10 = "Community";
				else if (sTProp6 > "" && sTProp6 != "index")
					s.prop10 = "Plan";
			}

		};

		resetContentGroup = function () {
			sContentGroup = oldContentGroup;
			s.channel = sContentGroup;
			s.hier1 = sContentGroup;
			s.eVar6 = oldEVar6;
			s.prop1 = oldProp1;
			s.prop2 = oldProp2;
			s.prop3 = oldProp3;
			s.prop4 = oldProp4;
			s.prop5 = oldProp5;
			s.prop6 = oldProp6;
			s.prop10 = oldProp10;
		};






	function trackPositionSpecificLinks(thisClickedId, position, totalPositions) {

		if (typeof thisClickedId != 'undefined') {
			if ((thisClickedId != "") && (UseSiteCatalyst)) {

				if (typeof position != undefined) {

					var actualTotal = '1';

					if (typeof totalPositions != 'undefined')
						actualTotal = totalPositions.toString();

					var thisPosition = '';

					if (actualTotal == '1') {
						thisPosition = 'Only';
					}
					else {

						var suffix = 'th';

						thisPosition = position.toString();
						thisPosition = thisPosition.replace(/^\s+|\s+$/g, ""); //trim

						var rtChar = '';

						if (thisPosition.length > 0) {
							rtChar = thisPosition.substring(rtChar.length - 1, 1)
						}
						if (rtChar == '1')
							suffix = 'st';
						else if (rtChar == '2')
							suffix = 'nd';
						else if (rtChar == '3')
							suffix = 'rd';

						thisPosition = thisPosition + suffix + ' Position';
					}

					s.eVar23 = thisPosition;
					s.eVar42 = actualTotal;
					s.eVar20 = thisClickedId;


					trackTabClicks(thisClickedId);


				}
			}
		}

	}

	var optionBundleModal = false;
	function optionBundleOpen(optionName, position, totalPositions) {

		if (typeof optionName != 'undefined') {
			if ((optionName != "") && (UseSiteCatalyst)) {

				s.eVar21 = optionName;
				if (optionBundleModal)
					s.eVar22 = 'Modal';
				else
					s.eVar22 = 'Page';

				trackPositionSpecificLinks('OptionBundle', position, totalPositions);

			}
		}
		optionBundleModal = true;
		s.eVar22 = 'Modal';

	}



	function optionBundleCloseModal() {

		optionBundleModal = false;
		s.eVar22 = '';
		s.eVar21 = '';
		s.eVar23 = '';
		s.eVar42 = '';
		s.eVar20 = '';

		trackClicks('OptionBundleClose')
	}


	//var optionBundleModal = false;
	function lifeTestedOpen(optionName, position, totalPositions) {

		if (typeof optionName != 'undefined') {
			if ((optionName != "") && (UseSiteCatalyst)) {

				s.eVar21 = optionName;
				//if (optionBundleModal)
				//    s.eVar22 = 'Modal';
				//else
				//    s.eVar22 = 'Page';

				trackPositionSpecificLinks('LifeTestedVideo', position, totalPositions);

			}
		}
		//optionBundleModal = true;
		//s.eVar22 = 'Modal';

	}

	function closeLifeTestedVideo(optionName, position, totalPositions) {
		lifeTestedOpen(optionName, position, totalPositions);
		$.prettyPhoto.close();
	}


	function inspiredDesignsPlanClick(planName, position, totalPositions, featureName, destUrl, newWindow) {

	    if (typeof planName != 'undefined') {
	        if ((planName != "") && (UseSiteCatalyst)) {

	            s.eVar21 = planName;
	            if (typeof featureName != 'undefined')
	                s.eVar22 = featureName;
	            //if (optionBundleModal)
	            //    s.eVar22 = 'Modal';
	            //else
	            //    s.eVar22 = 'Page';

	            trackPositionSpecificLinks('Inspired Designs Features - Floor Plans - ' + planName, position, totalPositions);

	            var newWindowFlag = false;
	            if (typeof newWindow != 'undefined')
	                newWindowFlag = newWindow;

	            if (newWindowFlag) {
	                window.open(destUrl); //, '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
	            } else {
	                window.location.href = destUrl;
	            }


	        }
	    }
	    //optionBundleModal = true;
	    //s.eVar22 = 'Modal';

	}


	function lifeTestedPlanClick(planName, position, totalPositions, featureName, destUrl, newWindow) {

		if (typeof planName != 'undefined') {
		    if ((planName != "") && (UseSiteCatalyst)) {
                
				s.eVar21 = planName;
				if (typeof featureName != 'undefined')
					s.eVar22 = featureName;
				//if (optionBundleModal)
				//    s.eVar22 = 'Modal';
				//else
				//    s.eVar22 = 'Page';

				trackPositionSpecificLinks('LifeTestedPlanClick', position, totalPositions);

				var newWindowFlag = false;
				if (typeof newWindow != 'undefined')
					newWindowFlag = newWindow;

				if (newWindowFlag) {
					window.open(destUrl); //, '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
				} else {
					window.location.href = destUrl;
				}


			}
		}
		//optionBundleModal = true;
		//s.eVar22 = 'Modal';

	}


	// GET CURRSITE

	var getCurrSite = function () {
		var currSite = 'Pulte';
		if (document.getElementById('pulte')) currSite = 'Pulte';
		if (document.getElementById('delWebb') || document.getElementById('delwebb')) currSite = 'DelWebb';
		if (document.getElementById('diVosta') || document.getElementById('divosta')) currSite = 'DiVosta';
		if (document.getElementById('centex')) currSite = 'Centex';
		return currSite;
	}