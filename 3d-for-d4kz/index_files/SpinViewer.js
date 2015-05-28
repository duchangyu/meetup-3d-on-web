/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2013 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
if(typeof s7viewers == "undefined") {
	s7viewers = {};
}else if(typeof s7viewers != "object") {
	throw new Error("Cannot initialize a root 's7viewers' package. s7viewers is not an object");
}

if(!s7viewers.SpinViewer) {

	s7viewers.SpinViewer = function (inObj) {
		this.sdkBasePath = '../../s7sdk/2.9/';
		this.containerId = null;
		this.params = {};
        this.handlers = [];
		this.onInitComplete = null;
		this.onInitFail = null;
		this.initializationComplete = false;
		this.initCalled = false;

        if (typeof inObj == "object"){
            if (inObj.containerId) {
                this.setContainerId(inObj.containerId);
            }
            if (inObj.params) {
                for (var param in inObj.params) {
                    if (inObj.params.hasOwnProperty(param) && inObj.params.propertyIsEnumerable(param)) {
                        this.setParam(param, inObj.params[param]);
                    }
                }
            }
            if (inObj.handlers) {
                this.setHandlers(inObj.handlers);
            }
            if (inObj.localizedTexts) {
				this.setLocalizedTexts(inObj.localizedTexts);
            }
        }
    };

	s7viewers.SpinViewer.cssClassName = "s7spinviewer";

	s7viewers.SpinViewer.prototype.setContainerId = function (inElemId) {
		this.containerId = inElemId || null;
	}
	
	s7viewers.SpinViewer.getCodeBase = function() {
		var contentUrl = "";
		var viewerPath = "";
		var scriptTags = null;
		if (document.scripts){
			scriptTags = document.scripts;
		} else {
			scriptTags = document.getElementsByTagName("script");
		}

		for(var i=0; i<scriptTags.length;i++){
			var src = scriptTags[i].src;
			var result = /^\s*(http[s]?:\/\/[^\/]*)?(.*)(\/js\/SpinViewer\.js)/.exec(src);
			if (result && result.length == 4) {
	            if ( typeof result[1] !== 'undefined' ) {
	                contentUrl = result[1];
	            }
				contentUrl += result[2];
				viewerPath = src;
				break;
			 }
		}
		if ((contentUrl != '') && (contentUrl.lastIndexOf('/') != contentUrl.length - 1)) {
			contentUrl += '/';
		}
		
		var codebaseRegEx = /\/etc\/dam\/viewers\//;
		s7viewers.SpinViewer.codebase = {"contentUrl": contentUrl, "isDAM": codebaseRegEx.test(viewerPath)};
		
	};
	s7viewers.SpinViewer.getCodeBase();
	
	s7viewers.SpinViewer.prototype.getContentUrl = function () {
		return s7viewers.SpinViewer.codebase.contentUrl;
	};

	s7viewers.SpinViewer.prototype.includeViewer = function () {
		s7sdk.Util.lib.include("s7sdk.set.MediaSet");
		s7sdk.Util.lib.include("s7sdk.set.SpinView");
		s7sdk.Util.lib.include("s7sdk.common.Button");
		s7sdk.Util.lib.include("s7sdk.common.Container");

        this.trackingManager = new s7sdk.TrackingManager(); // needs to be created first to track LOAD event
		
		var spinViewerLocalizedTexts = {
			"en":{
				"PanRightButton.TOOLTIP":"Spin East",			
				"PanLeftButton.TOOLTIP":"Spin West"
			},
			defaultLocale: "en"
		}	
		
		this.s7params = new s7sdk.ParameterManager(null,null,{"asset" : "MediaSet.asset"},this.getContentUrl()+"SpinViewer_light.css");
		var viewerName = ""; 
		if (this.s7params.params.config && (typeof(this.s7params.params.config) == "string")) {
			viewerName = ",";
			if (this.s7params.params.config.indexOf("/") > -1) {
				viewerName += this.s7params.params.config.split('/')[1];
			} else 
				viewerName += this.s7params.params.config;
		}
		this.s7params.setViewer("503,5.2.2" + viewerName);

		this.s7params.setLocalizedTexts(spinViewerLocalizedTexts);
		
		for(var prm in this.params){
			if (prm != "localizedtexts"){
				this.s7params.push(prm, this.params[prm]);
			}else{
				this.s7params.setLocalizedTexts(this.params[prm]);
			}
		}

		this.container = null;
		this.spinView = null;
		this.zoomInButton = null;
		this.zoomOutButton = null;
		this.zoomResetButton = null;
		this.closeButton = null;
		this.mediaSet = null; 
		this.fullScreenButton = null;
		this.spinLeftButton = null;
		this.spinRightButton = null;

		this.container = document.getElementById(this.containerId);
		if (this.container.className != ""){
			if (this.container.className.indexOf(s7viewers.SpinViewer.cssClassName) != -1){
				//
			}else{
				this.container.className += " "+s7viewers.SpinViewer.cssClassName;
			}	
		}else{
			this.container.className = s7viewers.SpinViewer.cssClassName;
		}
			
		

		var self = this;
		
		function initViewer(){
			
			self.s7params.push("aemmode",  s7viewers.SpinViewer.codebase.isDAM  ? "1" : "0");
			
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("SpinView.singleclick", "zoomReset"); //singleclick and doubleclick for desktop have specific
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("SpinView.doubleclick", "reset");			
			
			if ("ontouchstart" in window){
				addClass(self.containerId,"s7touchinput");
			}else{
				addClass(self.containerId,"s7mouseinput");
			}

            // work-around for webkit issue with applying height:100% to the containing element
            var containerDiv = document.getElementById(self.containerId);
            var tempMinHeight = containerDiv.style.minHeight;
            containerDiv.style.minHeight = "1px";

            var testdiv = document.createElement("div");
            testdiv.style.position = "relative";
            testdiv.style.width = "100%";
            testdiv.style.height = "100%";
            containerDiv.appendChild(testdiv);
            var emptyViewerHeight = testdiv.offsetHeight;
            if (testdiv.offsetHeight <= 1){
                containerDiv.style.height = "100%";
                emptyViewerHeight = testdiv.offsetHeight;
            }
            containerDiv.removeChild(testdiv);
            containerDiv.style.minHeight = tempMinHeight;

            self.container = new s7sdk.Container(self.containerId, self.s7params, self.containerId+"_container");
            var responsive = false;
            switch(self.s7params.get("responsive", "auto")){
                case "fit":
                    responsive = false;
                    break;
                case "constrain":
                    responsive = true;
                    break;
                default :
                    responsive = emptyViewerHeight == 0;
                    break;
            }
            updateCSSMarkers(self.container.getWidth(), self.container.getHeight());

            if(self.container.isFixedSize()) { // free
				self.viewerMode = "fixed";
            } else {
                if(responsive) { // restrict
					self.viewerMode = "ratio";
                } else {
					self.viewerMode = "free";
                }
            }

            // AppMeasurementBridge only available when config2 modifier is present
            self.trackingManager.setCallback(proxyTrack);
            if (typeof(AppMeasurementBridge) == "function") {
                self.appMeasurementBridge = new AppMeasurementBridge(self.trackingParams);
            }

            self.mediaSet = new s7sdk.MediaSet(null, self.s7params, self.containerId+"_mediaSet");
			self.trackingManager.attach(self.mediaSet);
			// ====================================== Event Listeners ====================================== //
			// Add MediaSet event listeners
			self.mediaSet.addEventListener(s7sdk.AssetEvent.NOTF_SET_PARSED, onSetParsed, false);
			// Add Container event listeners
			self.container.addEventListener(s7sdk.event.ResizeEvent.COMPONENT_RESIZE, onContainerResize,false);
			self.container.addEventListener(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE, onContainerFullScreen,false);	
			
			self.spinView = new s7sdk.SpinView(self.container, self.s7params, self.containerId+"_spinView");
			self.trackingManager.attach(self.spinView);
			self.toolsButtons = document.createElement('div');
			self.toolsButtons.setAttribute("id",self.containerId+"_divToolsButtons");
			
			var ctnr = document.getElementById(self.container.getInnerContainerId());
			ctnr.appendChild(self.toolsButtons);

			self.zoomInButton = new s7sdk.ZoomInButton(self.containerId+"_divToolsButtons", self.s7params, self.containerId+"_zoomInButton");
			self.zoomOutButton = new s7sdk.ZoomOutButton(self.containerId+"_divToolsButtons", self.s7params, self.containerId+"_zoomOutButton");
			self.zoomResetButton = new s7sdk.ZoomResetButton(self.containerId+"_divToolsButtons", self.s7params, self.containerId+"_zoomResetButton");
			self.fullScreenButton = new s7sdk.common.FullScreenButton(self.containerId+"_divToolsButtons", self.s7params, self.containerId + "_fullScreenButton");
			if (((self.s7params.get("closeButton", "0") == "1") || (self.s7params.get("closeButton", "0").toLowerCase() == "true"))){
				self.closeButton = new s7sdk.common.CloseButton(self.containerId+"_divToolsButtons", self.s7params, self.containerId + "_closeButton");
				self.closeButton.addEventListener("click", closeWindow);
			}
			
			if (self.container.isPopup() && !self.container.isFixedSize() &&!self.container.supportsNativeFullScreen()) {
				self.fullScreenButton.setCSS(".s7fullscreenbutton", "display", "none");
			}
			//Create container for SpinButtons
			if (s7sdk.browser.device.name == "desktop"){
				self.divSpinButtons = document.createElement('div');
				self.divSpinButtons.setAttribute("id",self.containerId+"_divSpinButtons");
				self.divSpinButtons.className = "s7spinbuttons";
				
				ctnr.appendChild(self.divSpinButtons);

				//Create SpinLeftButton and SpinRightButton
				self.spinLeftButton = new s7sdk.PanLeftButton(self.containerId+"_divSpinButtons", self.s7params, self.containerId+"_spinLeftButton");
				self.spinRightButton = new s7sdk.PanRightButton(self.containerId+"_divSpinButtons", self.s7params, self.containerId+"_spinRightButton");
				// Add SpinLeftButton event listeners
				self.spinLeftButton.addEventListener("click", function (){self.spinView.moveFrame(s7sdk.Enum.SPIN_DIRECTION.WEST);}, false);
				// Add SpinRightButton event listeners
				self.spinRightButton.addEventListener("click", function (){self.spinView.moveFrame(s7sdk.Enum.SPIN_DIRECTION.EAST);}, false);				
			}
		
			if(self.viewerMode == "ratio"){
                containerDiv.style.height = "auto";
			}
			// Add ZoomInButton event listeners
			self.zoomInButton.addEventListener("click", function(){self.spinView.zoomIn();});
			// Add ZoomOutButton event listeners
			self.zoomOutButton.addEventListener("click", function(){self.spinView.zoomOut();});
			// Add FullScreenButton event listeners
			self.fullScreenButton.addEventListener("click", onFullScreenButtonClick);
			// Add buttons event listener (change states)
			self.spinView.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_SPIN_CAPABILITY_STATE,function(stateEvent){
				if (stateEvent.s7event.state.hasCapability(s7sdk.SpinCapabilityState.ZOOM_IN))
					self.zoomInButton.activate();
				else
					self.zoomInButton.deactivate();
					
				if (stateEvent.s7event.state.hasCapability(s7sdk.SpinCapabilityState.ZOOM_OUT))
					self.zoomOutButton.activate();
				else
					self.zoomOutButton.deactivate();						
						
				if (stateEvent.s7event.state.hasCapability(s7sdk.SpinCapabilityState.ZOOM_RESET)) {
						self.zoomResetButton.activate();
				}
				else {
						self.zoomResetButton.deactivate();											
				}
			});
			
			// Add ZoomResetButton event listeners
			self.zoomResetButton.addEventListener("click",function(){self.spinView.zoomReset(); });	
			// ====================================== Event Handlers ====================================== //
			function onSetParsed(e) {
				var mediaSetDesc = e.s7event.asset;
				self.spinView.setMediaSet(mediaSetDesc);
				//check SpinSet has more than single row (spin buttons exist only on desktop)
				if (s7sdk.browser.device.name == "desktop"){
					if(mediaSetDesc.items[0] instanceof s7sdk.MediaSetDesc){
						self.spinLeftButton.setCSS(".s7panleftbutton","visibility","hidden");
						self.spinRightButton.setCSS(".s7panrightbutton","visibility","hidden");
					}
					else {
						self.spinLeftButton.setCSS(".s7panleftbutton","visibility","inherit");
						self.spinRightButton.setCSS(".s7panrightbutton","visibility","inherit");
					}
					//if SpinSet contains only one image it is need to deactivate spinLeftButton and spinRightButton
					if (mediaSetDesc.items.length == 1) {
						self.spinLeftButton.deactivate();
						self.spinRightButton.deactivate();
					}
					else {
						self.spinLeftButton.activate();
						self.spinRightButton.activate();					
					}
				}
                if(self.viewerMode == "ratio"){
                    var itm = mediaSetDesc.items[0];
                    itm = itm instanceof s7sdk.MediaSetDesc ? itm.items[0] : itm; 
                    var assetRatio = itm.width/itm.height;
                    self.container.setModifier({ "aspect": assetRatio });
                }
				
                if ((self.onInitComplete != null) && (typeof self.onInitComplete == "function")){
					self.onInitComplete();
				}

				if ((self.handlers["initComplete"] != null) && (typeof self.handlers["initComplete"] == "function") && !self.firstMediasetParsed){
					self.handlers["initComplete"]();
				}
				self.firstMediasetParsed = true;
			}

            function proxyTrack(objID, compClass, instName, timeStamp, eventInfo) {
                if (self.appMeasurementBridge) {
                    self.appMeasurementBridge.track(objID, compClass, instName, timeStamp, eventInfo);
                }
                if (self.handlers["trackEvent"]) {
                    self.handlers["trackEvent"](objID, compClass, instName, timeStamp, eventInfo)
                }
                if ("s7ComponentEvent" in window) {
                    s7ComponentEvent(objID, compClass, instName, timeStamp, eventInfo);
                }
            }

            // FullScreenButton Event Handlers
			function onFullScreenButtonClick() { 
				if (!self.container.isFullScreen()){
					if(self.closeButton){
						self.closeButton.setCSS(".s7closebutton", "display", "none");
					}
					self.container.requestFullScreen();
				}
				else {
					if(self.closeButton){
						self.closeButton.setCSS(".s7closebutton", "display", "block");
					}
					self.container.cancelFullScreen();
				}					
			}				
////
            function addClass(elm, inClass) {
                var cls = document.getElementById(elm).className.split(' ');
                if(cls.indexOf(inClass) == -1) {
                    cls[cls.length] = inClass;
                    document.getElementById(elm).className = cls.join(' ');
                }
            };

            /*	ID				min-area max-area
             s7size_small	0		 310000//old 210000
             s7size_medium	310001//old 210001	 920000
             s7size_large	920001	 Infinity
             */
            function sizeSwitch(inW,inH){
                var szswitch = inW * inH;
                var deviceType = 0; //s7size_large
                if (szswitch <= 310000){
                    deviceType = 1; //s7size_small
                }else if ((szswitch >310000) && (szswitch <=920000)){
                    deviceType = 2; //s7size_medium
                }else{
                    deviceType = 0; //s7size_large
                }
                return deviceType;
            }

            function updateCSSMarkers(w, h) {
                var szsw = sizeSwitch(w, h);
                var newclass;
                if (szsw == 0){
                    newclass = "s7size_large";
                }else{
                    if (szsw == 1){
                        newclass = "s7size_small";
                    }else{
                        newclass = "s7size_medium";
                    }
                }
                setNewSizeMarker(self.containerId, newclass);
            }
            
            function setNewSizeMarker(elm, inClass) {
            	var cls = document.getElementById(elm).className;
            	var re = /^(.*)(s7size_small|s7size_medium|s7size_large)(.*)$/gi;
            	var newcls;
            	if(cls.match(re)){
            		newcls = cls.replace(re,  "$1" + inClass + "$3");
            	} else {
            		newcls = cls + " " + inClass;
            	}
            	if(cls != newcls){
            		document.getElementById(elm).className = newcls;
            	}
            }
////
			//Container Resize handler
			function onContainerResize(event) {
				if((typeof(event.target) == 'undefined') || (event.target == document.getElementById(self.containerId+"_container"))) {
					if(self.closeButton){
						if(self.container.isFullScreen()) {
							self.closeButton.setCSS(".s7closebutton", "display", "none");
						}else{
							self.closeButton.setCSS(".s7closebutton", "display", "block");
						}
					}
					resizeViewer(event.s7event.w, event.s7event.h);
				}
			}
			
			//Container FullScreen Resize handler
			function onContainerFullScreen(event) {
				if(self.closeButton){
					if(self.container.isFullScreen()) {
						self.closeButton.setCSS(".s7closebutton", "display", "none");
					}else{
						self.closeButton.setCSS(".s7closebutton", "display", "block");
					}
				}
				resizeViewer(event.s7event.w, event.s7event.h);
				self.fullScreenButton.setSelected(self.container.isFullScreen());
			}
			
			//Resize viewer handler
			function resizeViewer(w,h){
				self.spinView.resize(w, h);
				updateCSSMarkers(w, h);
			}

			function closeWindow() {
				try{
					if(s7sdk.browser.name != "firefox" && s7sdk.browser.name != "safari") {
                        // changed back to content url as redirection link
                        window.open(self.getContentUrl() + "s7sdkclose.html","_self"); //workaround for close self window with JS
					}else if (s7sdk.browser.name == "safari"){
						window.focus();
						window.close();					
					}else {
						window.close(); // Firefox does not allow workaround so we fall back to window.close to cover pop-up case
					} 
				}
				catch(e){
					s7sdk.Logger.log(s7sdk.Logger.WARN,"Cannot close the window");
				}
			}
		}


		this.s7params.addEventListener(s7sdk.Event.SDK_READY,function(){
												self.initSiteCatalyst(self.s7params,initViewer);
										},false);
		this.s7params.init();	
	};


	s7viewers.SpinViewer.prototype.setParam = function(key, def){
		this.params[key] = def;	
	}

	s7viewers.SpinViewer.prototype.setParams = function(inParams){
		var params = inParams.split("&");
		for (var i = 0; i < params.length; i++) {
			var pair = params[i].split("=");
			if (pair.length > 1) {
				this.setParam(pair[0],decodeURIComponent(params[i].split("=")[1]));
			}
		}
	}
	
	s7viewers.SpinViewer.prototype.s7sdkUtilsAvailable = function(){
		return (typeof s7sdk != "undefined");
	};

	s7viewers.SpinViewer.prototype.init = function(){
		this.initCalled = true;
		if (this.initializationComplete) return this;

		var s7sdkUtilsAddedToDOM = false;
		var utilSrcPath = this.getContentUrl() + this.sdkBasePath + "js/s7sdk/utils/Utils.js";
		var allScripts = null;
		if (document.scripts){
			allScripts = document.scripts;
		}else{
			allScripts = document.getElementsByTagName("script");
		}
		for (var i=0; i<allScripts.length; i++){ 
			if (allScripts[i] && allScripts[i].getAttribute("src")!=null && allScripts[i].getAttribute("src").indexOf(utilSrcPath)!=-1){
				s7sdkUtilsAddedToDOM = true;
				break;
			}
		}

		if (this.s7sdkUtilsAvailable()){
			s7sdk.Util.init(); 
			this.includeViewer();
			this.initializationComplete = true;  
		}else if (!this.s7sdkUtilsAvailable() && s7sdkUtilsAddedToDOM) {
			var selfRef = this;
			var utilsWaitId = setInterval(
				function() {
					if (selfRef.s7sdkUtilsAvailable()) {
						clearInterval(utilsWaitId);
						s7sdk.Util.init(); 
						selfRef.includeViewer();
						selfRef.initializationComplete = true;
					}
				}, 100
			);
		}else{
			var elem = document.createElement("script");
			elem.setAttribute("language", "javascript");
			elem.setAttribute("type", "text/javascript");
			elem.setAttribute("src", utilSrcPath);

			var elems = document.getElementsByTagName("head");
			var self = this;
			elem.onload = elem.onerror = function() {  
				if (!this.executed) { 
					this.executed = true;  
					if (self.s7sdkUtilsAvailable() && s7sdk.Util){
						s7sdk.Util.init(); 
						self.includeViewer(); 
						self.initializationComplete = true;
					}
				}  
			};  

			elem.onreadystatechange = function() {  
				var self = this;  
				if (this.readyState == "complete" || this.readyState == "loaded") {  
					setTimeout(function() { 
						self.onload(); 
						self.onreadystatechange = null
					}, 0);
				}  
			};
			elems[0].appendChild(elem);
		}
        return this;
	};
			
	s7viewers.SpinViewer.prototype.getDomain = function(inUrl) {
		var res = /(^http[s]?:\/\/[^\/]+)/i.exec(inUrl);
		if (res == null) {
			return '';
		} else {
			return res[1];
		}
	}

	s7viewers.SpinViewer.prototype.setAsset = function(inAsset) {
		if (this.mediaSet){
			this.mediaSet.setAsset(inAsset);
		}else{
			this.setParam("asset", inAsset);
		}
	}
	
	s7viewers.SpinViewer.prototype.setLocalizedTexts = function(inText) {
		if (this.s7params){
			this.s7params.setLocalizedTexts(inText);
		}else{
			this.setParam("localizedtexts", inText);
		}
	}

	s7viewers.SpinViewer.prototype.initSiteCatalyst = function(params,inCallback) {
			//integrate SiteCatalyst logging
			//strip modifier from asset and take the very first entry from the image list, and the first element in combination from that entry
			var siteCatalystAsset = params.get("asset", null, "MediaSet").split(',')[0].split(':')[0];
			var isConfig2Exist = false;
			if (siteCatalystAsset.indexOf('/') != -1) {
				var company = s7sdk.MediaSetParser.findCompanyNameInAsset(siteCatalystAsset);
				var config2 = params.get("config2");
				isConfig2Exist = (config2 != '' && typeof config2 != "undefined");
				if (isConfig2Exist){
                    this.trackingParams = {
                        siteCatalystCompany: company,
                        config2: config2,
                        isRoot: params.get("serverurl")
                    };
					var jsp_src =this.getContentUrl()+'../AppMeasurementBridge.jsp?company=' + company + (config2 == '' ? '' : '&preset=' + config2);
                    if (params.get("serverurl", null)) {
                        jsp_src += "&isRoot=" + params.get("serverurl");
                    }
					var elem = document.createElement("script");
					elem.setAttribute("language", "javascript");
					elem.setAttribute("type", "text/javascript");
					elem.setAttribute("src", jsp_src);

					var elems = document.getElementsByTagName("head");
					var self = this;
					elem.onload = elem.onerror = function() {  
						if (!this.executed) { 
							this.executed = true;  
							if (typeof inCallback == "function"){
								inCallback();
							}
						}  
					};  

					elem.onreadystatechange = function() {  
						var self = this;  
						if (this.readyState == "complete" || this.readyState == "loaded") {  
							setTimeout(function() { 
								self.onload(); 
								self.onreadystatechange = null
							}, 0);
						}  
					};
					elems[0].appendChild(elem);
				}else{
					if (typeof inCallback == "function"){
						inCallback();
					}
				}	
			}
	}

    s7viewers.SpinViewer.prototype.getComponent = function(inId) {
        switch(inId){
            case "container":
                return this.container || null;
            case "spinView":
                return this.spinView || null;
            case "mediaSet":
                return this.mediaSet || null;
            case "zoomInButton":
                return this.zoomInButton || null;
            case "zoomOutButton":
                return this.zoomOutButton || null;
            case "zoomResetButton":
                return this.zoomResetButton || null;
            case "closeButton":
                return this.closeButton || null;
            case "spinLeftButton":
                return this.spinLeftButton || null;
            case "spinRightButton":
                return this.spinRightButton || null;
			case "parameterManager":
				return this.s7params || null;
            default:
                return null;
        }
    };


    s7viewers.SpinViewer.prototype.setHandlers = function(inObj) {
		if (this.initCalled) return;
        this.handlers = [];
        for (var i in inObj) {
            if (!inObj.hasOwnProperty(i)) continue;
            if (typeof inObj[i] != "function") continue;
            this.handlers[i] = inObj[i];
        }
    };

}
