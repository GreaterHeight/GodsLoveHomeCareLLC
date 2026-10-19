var dnnJscriptVersion="6.0.0";if(typeof(Sys.Browser.Chrome)=="undefined"){Sys.Browser.Chrome={};if(navigator.userAgent.indexOf("Chrome/index.html")>-1){Sys.Browser.agent=Sys.Browser.Chrome;Sys.Browser.version=parseFloat(navigator.userAgent.match(/Chrome\/(\d+\.\d+)/)[1]);Sys.Browser.name="Chrome";Sys.Browser.hasDebuggerStatement=true}}else{if(Sys.Browser.agent===Sys.Browser.InternetExplorer&&Sys.Browser.version>10){HTMLAnchorElement.prototype.attachEvent=function(a,b){if(a.substr(0,2)=="on"){a=a.substr(2)}this.addEventListener(a,b,false)};HTMLAnchorElement.prototype.detachEvent=function(a,b){if(a.substr(0,2)=="on"){a=a.substr(2)}this.removeEventListener(a,b,false)}}}var DNN_HIGHLIGHT_COLOR="#9999FF";var COL_DELIMITER=String.fromCharCode(18);var ROW_DELIMITER=String.fromCharCode(17);var QUOTE_REPLACEMENT=String.fromCharCode(19);var KEY_LEFT_ARROW=37;var KEY_UP_ARROW=38;var KEY_RIGHT_ARROW=39;var KEY_DOWN_ARROW=40;var KEY_RETURN=13;var KEY_ESCAPE=27;Type.registerNamespace("dnn");dnn.extend=function(a,b){for(s in b){a[s]=b[s]}return a};dnn.extend(dnn,{apiversion:new Number("04.02"),pns:"",ns:"dnn",diagnostics:null,vars:null,dependencies:new Array(),isLoaded:false,delay:[],_delayedSet:null,getVars:function(){if(this.vars==null){var a=dnn.dom.getById("__dnnVariable");if(a!=null){if(a.value.indexOf("`")==0){a.value=a.value.substring(1).replace(/`/g,'"')}if(a.value.indexOf("__scdoff")!=-1){COL_DELIMITER="~|~";ROW_DELIMITER="~`~";QUOTE_REPLACEMENT="~!~"}}if(a!=null&&a.value.length>0){this.vars=Sys.Serialization.JavaScriptSerializer.deserialize(a.value)}else{this.vars=[]}}return this.vars},getVar:function(key,def){if(this.getVars()[key]!=null){var re=new RegExp(QUOTE_REPLACEMENT,"g");return this.getVars()[key].replace(re,'"')}return def},setVar:function(b,c){if(this.vars==null){this.getVars()}this.vars[b]=c;var a=dnn.dom.getById("__dnnVariable");if(a==null){a=dnn.dom.createElement("INPUT");a.type="hidden";a.id="__dnnVariable";dnn.dom.appendChild(dnn.dom.getByTagName("body")[0],a)}if(dnn.isLoaded){a.value=Sys.Serialization.JavaScriptSerializer.serialize(this.vars)}else{dnn._delayedSet={key:b,val:c}}return true},callPostBack:function(action){var postBack=dnn.getVar("__dnn_postBack");var data="";if(postBack.length>0){data+=action;for(var i=1;i<arguments.length;i++){var aryParam=arguments[i].split("=");data+=COL_DELIMITER+aryParam[0]+COL_DELIMITER+aryParam[1]}eval(postBack.replace("[DATA]",data));return true}return false},createDelegate:function(a,b){return Function.createDelegate(a,b)},doDelay:function(b,c,d,a){if(this.delay[b]==null){this.delay[b]=new dnn.delayObject(d,a,b);this.delay[b].num=window.setTimeout(dnn.createDelegate(this.delay[b],this.delay[b].complete),c)}},cancelDelay:function(a){if(this.delay[a]!=null){window.clearTimeout(this.delay[a].num);this.delay[a]=null}},decodeHTML:function(a){return a.toString().replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"')},encode:function(a,c){var b=a;if(encodeURIComponent){b=encodeURIComponent(b)}else{b=escape(b)}if(c==false){return b}return b.replace(/%/g,"%25")},encodeHTML:function(a){return a.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/\"/g,"&quot;")},encodeJSON:function(a){return a.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"\u0027").replace(/\"/g,"&quot;").replace(/\\/g,"\\\\")},evalJSON:function(a){return Sys.Serialization.JavaScriptSerializer.deserialize(a)},escapeForEval:function(a){return a.replace(/\\/g,"\\\\").replace(/\'/g,"\\'").replace(/\r/g,"").replace(/\n/g,"\\n").replace(/\./,"\\.")},getEnumByValue:function(a,b){for(var c in a){if(typeof(a[c])=="number"&&a[c]==b){return c}}},_onload:function(){dnn.isLoaded=true;if(dnn._delayedSet){dnn.setVar(dnn._delayedSet.key,dnn._delayedSet.val)}},addIframeMask:function(c){if(dnn.dom.browser.isType("ie")&&(c.previousSibling==null||c.previousSibling.nodeName.toLowerCase()!="iframe")){var a=document.createElement("iframe");c.parentNode.insertBefore(a,c);var b=c.getBoundingClientRect();a.style.position="absolute";a.style.left=c.offsetLeft+"px";a.style.top=c.offsetTop+"px";a.style.width=(b.right-b.left)+"px";a.style.height=(b.bottom-b.top)+"px";a.style.opacity="0";a.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=0)";a.style.zIndex="-1";return a}return null},removeIframeMask:function(a){if(dnn.dom.browser.isType("ie")&&(a.previousSibling!=null&&a.previousSibling.nodeName.toLowerCase()=="iframe")){a.parentNode.removeChild(a.previousSibling)}}});dnn.delayObject=function(c,a,b){this.num=null;this.pfunc=c;this.context=a;this.type=b};dnn.delayObject.prototype={complete:function(){dnn.delay[this.type]=null;this.pfunc(this.context)}};dnn.delayObject.registerClass("dnn.delayObject");dnn.ScriptRequest=function(e,d,c){this.ctl=null;this.xmlhttp=null;this.src=null;this.text=null;if(e!=null&&e.length>0){var b=dnn.dom.scriptFile(e);var a=dnn.getVar(b+".resx","");if(a.length>0){this.src=a}else{this.src=e}}if(d!=null&&d.length>0){this.text=d}this.callBack=c;this.status="init";this.timeOut=5000;this._xmlhttpStatusChangeDelegate=dnn.createDelegate(this,this.xmlhttpStatusChange);this._statusChangeDelegate=dnn.createDelegate(this,this.statusChange);this._completeDelegate=dnn.createDelegate(this,this.complete);this._reloadDelegate=dnn.createDelegate(this,this.reload)};dnn.ScriptRequest.prototype={load:function(){this.status="loading";this.ctl=document.createElement("script");this.ctl.type="text/javascript";if(this.src!=null){if(dnn.dom.browser.isType(dnn.dom.browser.Safari)){this.xmlhttp=new XMLHttpRequest();this.xmlhttp.open("GET",this.src,true);this.xmlhttp.onreadystatechange=this._xmlhttpStatusChangeDelegate;this.xmlhttp.send(null);return}else{if(dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer)){this.ctl.onreadystatechange=this._statusChangeDelegate}else{if(dnn.dom.browser.isType(dnn.dom.browser.Opera)==false){this.ctl.onload=this._completeDelegate}}this.ctl.src=this.src}dnn.dom.scriptElements[this.src]=this.ctl}else{if(dnn.dom.browser.isType(dnn.dom.browser.Safari)){this.ctl.innerHTML=dnn.encodeHTML(this.text)}else{this.ctl.text=this.text}}var a=dnn.dom.getByTagName("HEAD");if(a){if(dnn.dom.browser.isType(dnn.dom.browser.Opera)==false||this.src!=null){a[0].appendChild(this.ctl)}}else{alert("Cannot load dynamic script, no HEAD tag present.")}if(this.src==null||dnn.dom.browser.isType(dnn.dom.browser.Opera)){this.complete()}else{if(this.timeOut){dnn.doDelay("loadScript_"+this.src,this.timeOut,this._reloadDelegate,null)}}},xmlhttpStatusChange:function(){if(this.xmlhttp.readyState!=4){return}this.src=null;this.text=this.xmlhttp.responseText;this.load()},statusChange:function(){if((this.ctl.readyState=="loaded"||this.ctl.readyState=="complete")&&this.status!="complete"){this.complete()}},reload:function(){if(dnn.dom.scriptStatus(this.src)=="complete"){this.complete()}else{this.load()}},complete:function(){dnn.cancelDelay("loadScript_"+this.src);this.status="complete";if(typeof(this.callBack)!="undefined"){this.callBack(this)}this.dispose()},dispose:function(){this.callBack=null;if(this.ctl){if(this.ctl.onreadystatechange){this.ctl.onreadystatechange=new function(){}}else{if(this.ctl.onload){this.ctl.onload=null}}this.ctl=null}this.xmlhttp=null;this._xmlhttpStatusChangeDelegate=null;this._statusChangeDelegate=null;this._completeDelegate=null;this._reloadDelegate=null}};dnn.ScriptRequest.registerClass("dnn.ScriptRequest");Type.registerNamespace("dnn.dom");dnn.extend(dnn.dom,{pns:"dnn",ns:"dom",browser:null,__leakEvts:[],scripts:[],scriptElements:[],tweens:[],attachEvent:function(a,c,d){if(a.addEventListener){var b=c.substring(2);a.addEventListener(b,function(e){dnn.dom.event=new dnn.dom.eventObject(e,e.target);return d()},false)}else{a.attachEvent(c,function(){dnn.dom.event=new dnn.dom.eventObject(window.event,window.event.srcElement);return d()})}return true},cursorPos:function(b){if(b.value.length==0){return 0}var h=-1;if(b.selectionStart){h=b.selectionStart}else{if(b.createTextRange){var f=window.document.selection.createRange();var a=b.createTextRange();if(a==null||f==null||((f.text!="")&&a.inRange(f)==false)){return-1}if(f.text==""){if(a.boundingLeft==f.boundingLeft){h=0}else{var d=b.tagName.toLowerCase();if(d=="input"){var g=a.text;var c=1;while(c<g.length){a.findText(g.substring(c));if(a.boundingLeft==f.boundingLeft){break}c++}}else{if(d=="textarea"){var c=b.value.length+1;var e=document.selection.createRange().duplicate();while(e.parentElement()==b&&e.move("character",1)==1){--c}if(c==b.value.length+1){c=-1}}}h=c}}else{h=a.text.indexOf(f.text)}}}return h},cancelCollapseElement:function(a){dnn.cancelDelay(a.id+"col");a.style.display="none"},collapseElement:function(b,c,d){if(c==null){c=10}b.style.overflow="hidden";var a=new Object();a.num=c;a.ctl=b;a.pfunc=d;b.origHeight=b.offsetHeight;dnn.dom.__collapseElement(a)},__collapseElement:function(a){var c=a.num;var b=a.ctl;var d=b.origHeight/c;if(b.offsetHeight-(d*2)>0){b.style.height=(b.offsetHeight-d).toString()+"px";dnn.doDelay(b.id+"col",10,dnn.dom.__collapseElement,a)}else{b.style.display="none";if(a.pfunc!=null){a.pfunc()}}},cancelExpandElement:function(a){dnn.cancelDelay(a.id+"exp");a.style.overflow="";a.style.height=""},disableTextSelect:function(a){if(typeof a.onselectstart!="undefined"){a.onselectstart=function(){return false}}else{if(typeof a.style.MozUserSelect!="undefined"){a.style.MozUserSelect="none"}else{a.onmousedown=function(){return false}}}},expandElement:function(b,c,d){if(c==null){c=10}if(b.style.display=="none"&&b.origHeight==null){b.style.display="";b.style.overflow="";b.origHeight=b.offsetHeight;b.style.overflow="hidden";b.style.height="1px"}b.style.display="";var a=new Object();a.num=c;a.ctl=b;a.pfunc=d;dnn.dom.__expandElement(a)},__expandElement:function(a){var c=a.num;var b=a.ctl;var d=b.origHeight/c;if(b.offsetHeight+d<b.origHeight){b.style.height=(b.offsetHeight+d).toString()+"px";dnn.doDelay(b.id+"exp",10,dnn.dom.__expandElement,a)}else{b.style.overflow="";b.style.height="";if(a.pfunc!=null){a.pfunc()}}},deleteCookie:function(a,c,b){if(this.getCookie(a)){this.setCookie(a,"",-1,c,b);return true}return false},getAttr:function(b,a,c){if(b.getAttribute==null){return c}var d=b.getAttribute(a);if(d==null||d==""){return c}else{return d}},getById:function(b,a){return $get(b,a)},getByTagName:function(a,b){if(b==null){b=document}if(b.getElementsByTagName){return b.getElementsByTagName(a)}else{if(b.all&&b.all.tags){return b.all.tags(a)}else{return null}}},getParentByTagName:function(b,a){var c=b.parentNode;a=a.toLowerCase();while(c!=null){if(c.tagName&&c.tagName.toLowerCase()==a){return c}c=c.parentNode}return null},getCookie:function(c){var e=" "+document.cookie;var d=" "+c+"=";var b=null;var f=0;var a=0;if(e.length>0){f=e.indexOf(d);if(f!=-1){f+=d.length;a=e.indexOf(";",f);if(a==-1){a=e.length}b=unescape(e.substring(f,a))}}return(b)},getNonTextNode:function(a){if(this.isNonTextNode(a)){return a}while(a!=null&&this.isNonTextNode(a)){a=this.getSibling(a,1)}return a},addSafeHandler:function(b,a,c,d){b[a]=this.getObjMethRef(c,d);if(dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer)){if(this.__leakEvts.length==0){dnn.dom.attachEvent(window,"onunload",dnn.dom.destroyHandlers)}this.__leakEvts[this.__leakEvts.length]=new dnn.dom.leakEvt(a,b,b[a])}},destroyHandlers:function(){var c=dnn.dom.__leakEvts.length-1;for(var a=c;a>=0;a--){var b=dnn.dom.__leakEvts[a];b.ctl.detachEvent(b.name,b.ptr);b.ctl[b.name]=null;dnn.dom.__leakEvts.length=dnn.dom.__leakEvts.length-1}},getObjMethRef:function(b,a){return(function(c){c=c||window.event;return b[a](c,this)})},getSibling:function(a,c){if(a!=null&&a.parentNode!=null){for(var b=0;b<a.parentNode.childNodes.length;b++){if(a.parentNode.childNodes[b].id==a.id){if(a.parentNode.childNodes[b+c]!=null){return a.parentNode.childNodes[b+c]}}}}return null},isNonTextNode:function(a){return(a.nodeType!=3&&a.nodeType!=8)},getScript:function(c){if(this.scriptElements[c]){return this.scriptElements[c]}var a=dnn.dom.getByTagName("SCRIPT");for(var b=0;b<a.length;b++){if(a[b].src!=null&&a[b].src.indexOf(c)>-1){this.scriptElements[c]=a[b];return a[b]}}},getScriptSrc:function(b){var a=dnn.getVar(b+".resx","");if(a.length>0){return a}return b},getScriptPath:function(){var a=dnn.dom.getScript("dnn.js");if(a){var b=a.src;if(b.indexOf("?")>-1){b=b.substr(0,b.indexOf("?"))}return b.replace("dnn.js","")}var c=dnn.getVar("__sp");if(c){return c}return""},scriptFile:function(b){var a=b.split("/");return a[a.length-1]},loadScript:function(e,d,b){var c;if(e!=null&&e.length>0){c=this.scriptFile(e);if(this.scripts[c]!=null){return}}var a=new dnn.ScriptRequest(e,d,b);if(c){this.scripts[c]=a}a.load();return a},loadScripts:function(a,b,c){if(dnn.scripts==null){var e=function(f,g,h){return(function(){dnn.dom.loadScripts(f,g,h)})};dnn.dom.loadScript(dnn.dom.getScriptPath()+"dnn.scripts.js",null,e(a,b,c));return}var d=new dnn.scripts.ScriptBatchRequest(a,b,c);d.load()},scriptStatus:function(c){var b=this.scriptFile(c);if(this.scripts[b]){return this.scripts[b].status}var a=this.getScript(c);if(a!=null){return"complete"}else{return""}},setScriptLoaded:function(b){var a=this.scriptFile(b);if(this.scripts[a]&&dnn.dom.scripts[a].status!="complete"){dnn.dom.scripts[a].complete()}},navigate:function(b,a){if(a!=null&&a.length>0){if(a=="_blank"||a=="_new"){window.open(b)}else{document.frames[a].location.href=b}}else{if(Sys.Browser.agent===Sys.Browser.InternetExplorer){window.navigate(b)}else{window.location.href=b}}return false},setCookie:function(b,f,h,e,d,c,a){var g;if(h){g=new Date();g.setTime(g.getTime()+(h*24*60*60*1000))}if(a){g=new Date();g.setTime(g.getTime()+(a))}document.cookie=b+"="+escape(f)+((g)?"; expires="+g.toGMTString():"")+((e)?"; path="+e:"")+((d)?"; domain="+d:"")+((c)?"; secure":"");if(document.cookie.length>0){return true}},getCurrentStyle:function(b,c){var a=Sys.UI.DomElement._getCurrentStyle(b);if(a){return a[c]}return""},getFormPostString:function(a){var c="";if(a!=null){if(a.tagName&&a.tagName.toLowerCase()=="form"){for(var b=0;b<a.elements.length;b++){c+=this.getElementPostString(a.elements[b])}}else{c=this.getElementPostString(a);for(var b=0;b<a.childNodes.length;b++){c+=this.getFormPostString(a.childNodes[b])}}}return c},getElementPostString:function(a){var c;if(a.tagName){c=a.tagName.toLowerCase()}if(c=="input"){var d=a.type.toLowerCase();if(d=="text"||d=="password"||d=="hidden"||((d=="checkbox"||d=="radio")&&a.checked)){return a.name+"="+dnn.encode(a.value,false)+"&"}}else{if(c=="select"){for(var b=0;b<a.options.length;b++){if(a.options[b].selected){return a.name+"="+dnn.encode(a.options[b].value,false)+"&"}}}else{if(c=="textarea"){return a.name+"="+dnn.encode(a.value,false)+"&"}}}return""},appendChild:function(b,a){return b.appendChild(a)},removeChild:function(a){return a.parentNode.removeChild(a)},createElement:function(a){return document.createElement(a.toLowerCase())}});dnn.dom.leakEvt=function(c,a,b){this.name=c;this.ctl=a;this.ptr=b};dnn.dom.leakEvt.registerClass("dnn.dom.leakEvt");dnn.dom.eventObject=function(b,a){this.object=b;this.srcElement=a};dnn.dom.eventObject.registerClass("dnn.dom.eventObject");dnn.dom.browserObject=function(){this.InternetExplorer="ie";this.Netscape="ns";this.Mozilla="mo";this.Opera="op";this.Safari="safari";this.Konqueror="kq";this.MacIE="macie";var b;var d=navigator.userAgent.toLowerCase();if(d.indexOf("konqueror")!=-1){b=this.Konqueror}else{if(d.indexOf("msie")!=-1&&d.indexOf("mac")!=-1){b=this.MacIE}else{if(Sys.Browser.agent===Sys.Browser.InternetExplorer){b=this.InternetExplorer}else{if(Sys.Browser.agent===Sys.Browser.FireFox){b=this.Mozilla}else{if(Sys.Browser.agent===Sys.Browser.Safari){b=this.Safari}else{if(Sys.Browser.agent===Sys.Browser.Opera){b=this.Opera}else{b=this.Mozilla}}}}}}this.type=b;this.version=Sys.Browser.version;var c=navigator.userAgent.toLowerCase();if(this.type==this.InternetExplorer){var a=navigator.appVersion.split("MSIE");this.version=parseFloat(a[1])}if(this.type==this.Netscape){var a=c.split("netscape");this.version=parseFloat(a[1].split("/")[1])}};dnn.dom.browserObject.prototype={toString:function(){return this.type+" "+this.version},isType:function(){for(var a=0;a<arguments.length;a++){if(dnn.dom.browser.type==arguments[a]){return true}}return false}};dnn.dom.browserObject.registerClass("dnn.dom.browserObject");dnn.dom.browser=new dnn.dom.browserObject();if(typeof($)=="undefined"){window.$=function $(){var ary=new Array();for(var i=0;i<arguments.length;i++){var arg=arguments[i];var ctl;if(typeof arg=='string')ctl=dnn.dom.getById(arg);else ctl=arg;if(ctl!=null&&typeof(Element)!='undefined'&&typeof(Element.extend)!='undefined')Element.extend(ctl);if(arguments.length==1)return ctl;ary[ary.length]=ctl;}return ary;}}try{document.execCommand("BackgroundImageCache",false,true)}catch(err){}Sys.Application.add_load(dnn._onload);
;;;!function(o,e){function i(o){for(var e=i.options,t=e.parser[e.strictMode?"strict":"loose"].exec(o),n={},a=14;a--;)n[e.key[a]]=t[a]||"";return n[e.q.name]={},n[e.key[12]].replace(e.q.parser,function(o,i,t){i&&(n[e.q.name][i]=t)}),n}i.options={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var t=function(){var e=!1;return function(o){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(o)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(o.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||o.opera),e}();o.dnnModal={load:function(){try{if(void 0!==parent.location.href){var o=parent;if(void 0!==o.parent.$find)if(-1==location.href.indexOf("popUp")||o.location.href.indexOf("popUp")>-1){var e=o.jQuery("#iPopUp"),i=e.dialog("option","refresh"),t=e.dialog("option","closingUrl"),n=e.dialog("option","minWidth"),a=e.dialog("option","minHeight"),r=e.dialog("option","showReturn");t||(t=location.href),!0===e.dialog("isOpen")&&e.dialog("option",{close:function(o,e){dnnModal.refreshPopup({url:t,width:n,height:a,showReturn:r,refresh:i})}}).dialog("close")}else o.jQuery("#iPopUp").dialog({autoOpen:!1,title:document.title})}return!1}catch(o){return!0}},show:function(n,a,r,l,d,s){var p=e("#iPopUp");p.length&&(p[0].src="about:blank",p.remove()),p=e('<iframe id="iPopUp" name="iPopUp" src="about:blank" scrolling="auto" frameborder="0"></iframe>'),e(document.body).append(p),e(document).find("html").css("overflow","hidden");for(var c=document.styleSheets,h=!1,m=0,g=c.length;m<g;m++){var u=c[m].href;if("string"==typeof u&&u.indexOf("admin.css")>-1){h=!0;break}}var f=!h&&(e(o).width()<481||t);f?e("html").addClass("mobileView"):e("html").removeClass("mobileView");var w=0,b=function(){p.prev(".dnnLoading").remove()},v=function(){p.on("load",function(){b();var e=document.getElementById("iPopUp"),t=o.location.hostname.toLowerCase(),a=o.location.port.toLowerCase(),r=i(n),l=r.host.toLowerCase(),d=r.port.toLowerCase();if(l=l||t,d=d||a,t===l&&a===d)try{if(f){var s=e.contentDocument.body,c=e.contentDocument.documentElement;c.style.width=w+"px",s.className+="mobileView dnnFormPopup dnnFormPopupMobileView";var h=Math.max(s.scrollHeight,s.offsetHeight,c.clientHeight,c.scrollHeight,c.offsetHeight);p.css("height",h+100).dialog("option","position",{my:"top",at:"top"})}e.contentWindow.dnnModal.show=function(o,e,i,t,n,a){var r=parent.jQuery("#iPopUp");a||(a=location.href),r.dialog("isOpen")&&r.dialog("option",{close:function(){parent.dnnModal.show(o,e,i,t,n,a)}}).dialog("close")}}catch(o){}}),p[0].src=n,"function"==typeof e.ui.dialog.prototype.options.open&&e.ui.dialog.prototype.options.open.apply(this,arguments)};if(f){w=e(o).width()-100;var y=e("body").css("height");p.dialog({modal:!0,autoOpen:!0,dialogClass:"dnnFormPopup dnnFormPopupMobileView",resizable:!1,closeOnEscape:!0,refresh:d,showReturn:a,closingUrl:s,minHeight:r,position:{my:"top",at:"top"},draggable:!1,open:function(){e("#Form").hide(),e("body").css("height","auto"),p.parent().css({width:"auto",left:"0",right:"0",top:"0","box-shadow":"none"}),o.scrollTo(0,0),v()},close:function(){e("#Form").show(),y&&e("body").css("height",y),o.scrollTo(0,0),o.dnnModal.closePopUp(d,s)}})}else if(p.dialog({modal:!0,autoOpen:!0,dialogClass:"dnnFormPopup",position:{my:"center",at:"center"},minWidth:l,minHeight:r,maxWidth:1920,maxHeight:1080,resizable:!0,closeOnEscape:!0,refresh:d,showReturn:a,closingUrl:s,open:v,close:function(){o.dnnModal.closePopUp(d,s)}}).width(l-11).height(r-11),0===p.parent().find(".ui-dialog-title").next("a.dnnModalCtrl").length){var k=e('<a class="dnnModalCtrl"></a>');p.parent().find(".ui-dialog-titlebar-close").wrap(k);var x=e('<a href="#" class="dnnToggleMax"><span>Max</span></a>');p.parent().find(".ui-dialog-titlebar-close").before(x),x.click(function(i){i.preventDefault();var t,n,a=e(o),r="center",l="center",d=0,s=0;if(e("button.ui-dialog-titlebar-close").length&&(s=e("button.ui-dialog-titlebar-close").parent(".dnnModalCtrl").height(),d=e("button.ui-dialog-titlebar-close").parent(".dnnModalCtrl").width()),p.data("isMaximized")){var c=p.data("height")+100;c>=a.height()&&(c=p.data("height")),t=c-s,n=p.data("width"),p.data("isMaximized",!1)}else{p.data("height",p.dialog("option","minHeight")).data("width",p.dialog("option","minWidth"));var h=0;e("#personaBar-iframe").length&&(h=e("#personaBar-iframe").width()),n=a.outerWidth()-h-d/7.5-40,t=a.height()-s,r="right-"+d/5.5+" center",l="right center-"+s/11,p.data("isMaximized",!0)}p.dialog("option","height",t),p.dialog("option","width",n),p.dialog("option","position",{my:r,at:l,of:o})})}if(function(){var o=e('<div class="dnnLoading"></div>');o.css({width:p.width(),height:p.height()}),p.before(o)}(),"true"===a.toString())return!1},closePopUp:function(o,i){var t=parent,n=t.jQuery("#iPopUp");void 0!==o&&null!=o||(o=!0),"true"==o.toString()?(void 0!==i&&""!=i||(i=t.location.href),t.location.href=i,n.hide()):n.dialog("option","close",null).dialog("close"),e(t.document).find("html").css("overflow","")},refreshPopup:function(o){var e=parent,i=e.parent;e.location.href!==i.location.href&&e.location.href!==o.url?i.dnnModal.show(o.url,o.showReturn,o.height,o.width,o.refresh,o.closingUrl):dnnModal.closePopUp(o.refresh,o.url)}},o.dnnModal.load()}(window,jQuery);
;;;
;;;(function($){$.fn.validationEngineLanguage=function(){};$.validationEngineLanguage={newLang:function(){$.validationEngineLanguage.allRules={"required":{"regex":"none","alertText":"* This field is required","alertTextCheckboxMultiple":"* Please select an option","alertTextCheckboxe":"* This checkbox is required","alertTextDateRange":"* Both date range fields are required"},"requiredInFunction":{"func":function(field,rules,i,options){return(field.val()=="test")?true:false;},"alertText":"* Field must equal test"},"dateRange":{"regex":"none","alertText":"* Invalid ","alertText2":"Date Range"},"dateTimeRange":{"regex":"none","alertText":"* Invalid ","alertText2":"Date Time Range"},"minSize":{"regex":"none","alertText":"* Minimum ","alertText2":" characters required"},"maxSize":{"regex":"none","alertText":"* Maximum ","alertText2":" characters allowed"},"groupRequired":{"regex":"none","alertText":"* You must fill one of the following fields","alertTextCheckboxMultiple":"* Please select an option","alertTextCheckboxe":"* This checkbox is required"},"min":{"regex":"none","alertText":"* Minimum value is "},"max":{"regex":"none","alertText":"* Maximum value is "},"past":{"regex":"none","alertText":"* Date prior to "},"future":{"regex":"none","alertText":"* Date past "},"maxCheckbox":{"regex":"none","alertText":"* Maximum ","alertText2":" options allowed"},"minCheckbox":{"regex":"none","alertText":"* Please select ","alertText2":" options"},"equals":{"regex":"none","alertText":"* Fields do not match"},"creditCard":{"regex":"none","alertText":"* Invalid credit card number"},"phone":{"regex":/^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/,"alertText":"* Invalid phone number"},"email":{"regex":/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"alertText":"* Invalid email address"},"fullname":{"regex":/^([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]*)+[ ]([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]+)+$/,"alertText":"* Must be first and last name"},"zip":{"regex":/^\d{5}$|^\d{5}-\d{4}$/,"alertText":"* Invalid zip format"},"integer":{"regex":/^[\-\+]?\d+$/,"alertText":"* Not a valid integer"},"number":{"regex":/^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,"alertText":"* Invalid floating decimal number"},"date":{"func":function(field){var pattern=new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);var match=pattern.exec(field.val());if(match==null)
return false;var year=match[1];var month=match[2]*1;var day=match[3]*1;var date=new Date(year,month-1,day);return(date.getFullYear()==year&&date.getMonth()==(month-1)&&date.getDate()==day);},"alertText":"* Invalid date, must be in YYYY-MM-DD format"},"ipv4":{"regex":/^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,"alertText":"* Invalid IP address"},"ip":{"regex":/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/,"alertText":"* Invalid IP address"},"url":{"regex":/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,"alertText":"* Invalid URL"},"onlyNumberSp":{"regex":/^[0-9\ ]+$/,"alertText":"* Numbers only"},"onlyLetterSp":{"regex":/^[a-zA-Z\ \']+$/,"alertText":"* Letters only"},"onlyLetterAccentSp":{"regex":/^[a-z\u00C0-\u017F\ ]+$/i,"alertText":"* Letters only (accents allowed)"},"onlyLetterNumber":{"regex":/^[0-9a-zA-Z]+$/,"alertText":"* No special characters allowed"},"ajaxUserCall":{"url":"ajaxValidateFieldUser","extraData":"name=eric","alertText":"* This user is already taken","alertTextLoad":"* Validating, please wait"},"ajaxUserCallPhp":{"url":"phpajax/ajaxValidateFieldUser.php","extraData":"name=eric","alertTextOk":"* This username is available","alertText":"* This user is already taken","alertTextLoad":"* Validating, please wait"},"ajaxNameCall":{"url":"ajaxValidateFieldName","alertText":"* This name is already taken","alertTextOk":"* This name is available","alertTextLoad":"* Validating, please wait"},"ajaxNameCallPhp":{"url":"phpajax/ajaxValidateFieldName.php","alertText":"* This name is already taken","alertTextLoad":"* Validating, please wait"},"validate2fields":{"alertText":"* Please input HELLO"},"dateFormat":{"regex":/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,"alertText":"* Invalid Date"},"dateTimeFormat":{"regex":/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,"alertText":"* Invalid Date or Date Format","alertText2":"Expected Format: ","alertText3":"mm/dd/yyyy hh:mm:ss AM|PM or ","alertText4":"yyyy-mm-dd hh:mm:ss AM|PM"}};}};$.validationEngineLanguage.newLang();})(jQuery);
;;;(function($) {
    "use strict";
    var x = {
        init: function(a) {
            var b = this;
            if (!b.data('jqv') || b.data('jqv') == null) {
                a = x._saveOptions(b, a)
            }
            return this
        },
        attach: function(a) {
            var b = this;
            var c;
            if (a) c = x._saveOptions(b, a);
            else c = b.data('jqv');
            c.validateAttribute = (b.find("[data-validation-engine*=validate]").length) ? "data-validation-engine": "class";
            if (c.binded) {
                b.on(c.validationEventTrigger, "[" + c.validateAttribute + "*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", x._onFieldEvent);
                b.on("click", "[" + c.validateAttribute + "*=validate][type=checkbox],[" + c.validateAttribute + "*=validate][type=radio]", x._onFieldEvent);
                b.on(c.validationEventTrigger, "[" + c.validateAttribute + "*=validate][class*=datepicker]", {
                    "delay": 300
                },
                x._onFieldEvent)
            }
            if (c.autoPositionUpdate) {
                $(window).bind("resize", {
                    "noAnimation": true,
                    "formElem": b
                },
                x.updatePromptsPosition)
            }
            b.on("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", x._submitButtonClick);
            b.removeData('jqv_submitButton');
            b.on("submit", x._onSubmitEvent);
            return this
        },
        detach: function() {
            var a = this;
            var b = a.data('jqv');
            a.find("[" + b.validateAttribute + "*=validate]").not("[type=checkbox]").off(b.validationEventTrigger, x._onFieldEvent);
            a.find("[" + b.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").off("click", x._onFieldEvent);
            a.off("submit", x._onSubmitEvent);
            a.removeData('jqv');
            a.off("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", x._submitButtonClick);
            a.removeData('jqv_submitButton');
            if (b.autoPositionUpdate) $(window).off("resize", x.updatePromptsPosition);
            return this
        },
        validate: function() {
            var a = $(this);
            var b = null;
            if (a.is("form") || a.hasClass("dng-form")) {
                if (a.hasClass('validating')) {
                    return false
                } else {
                    a.addClass('validating');
                    var c = a.data('jqv');
                    var b = x._validateFields(this);
                    setTimeout(function() {
                        a.removeClass('validating')
                    },
                    100);
                    if (b && c.onSuccess) {
                        c.onSuccess()
                    } else if (!b && c.onFailure) {
                        c.onFailure()
                    }
                }
            } else if (a.is('form') || a.hasClass('dng-form')) {
                a.removeClass('validating')
            } else {
                var d = a.closest('form, .dng-form'),
                c = (d.data('jqv')) ? d.data('jqv') : $.validationEngine2.defaults,
                b = x._validateField(a, c);
                if (b && c.onFieldSuccess) c.onFieldSuccess();
                else if (c.onFieldFailure && c.InvalidFields.length > 0) {
                    c.onFieldFailure()
                }
            }
            if (c.onValidationComplete) {
                return !! c.onValidationComplete(d, b)
            }
            return b
        },
        updatePromptsPosition: function(d) {
            if (d && this == window) {
                var e = d.data.formElem;
                var f = d.data.noAnimation
            } else var e = $(this.closest('form, .dng-form'));
            var g = e.data('jqv');
            e.find('[' + g.validateAttribute + '*=validate]').not(":disabled").each(function() {
                var a = $(this);
                if (g.prettySelect && a.is(":hidden")) a = e.find("#" + g.usePrefix + a.attr('id') + g.useSuffix);
                var b = x._getPrompt(a);
                var c = $(b).find(".formErrorContent2").html();
                if (b) x._updatePrompt(a, $(b), c, undefined, false, g, f)
            });
            return this
        },
        showPrompt: function(a, b, c, d) {
            var e = this.closest('form, .dng-form');
            var f = e.data('jqv');
            if (!f) f = x._saveOptions(this, f);
            if (c) f.promptPosition = c;
            f.showArrow = d == true;
            x._showPrompt(this, a, b, false, f);
            return this
        },
        hide: function() {
            var a = $(this).closest('form, .dng-form');
            var b = a.data('jqv');
            var c;
            if ($(this).is("form") || $(this).hasClass("dng-form")) {
                c = "parentForm" + x._getClassName($(this).attr("id"))
            } else {
                c = x._getClassName($(this).attr("id")) + "formError2"
            }
            $('.' + c).children(".formErrorContent2").stop().slideUp(function() {
                $(this).parent().parent('.formErrorOuter').remove();
                $(this).parent().remove()
            });
            $('.' + c).parent().removeClass("error-element");
            return this
        },
        hideAll: function() {
            var a = this;
            var b = a.data('jqv');
            $('.formError').children(".formErrorContent2").stop().slideUp(function() {
                $(this).parent().parent('.formErrorOuter').remove();
                $(this).parent().remove()
            });
            $('.formError').parent().removeClass("error-element");
            return this
        },
        _onFieldEvent: function(a) {
            var b = $(this);
            var c = b.closest('form, .dng-form');
            var d = c.data('jqv');
            d.eventTrigger = "field";
            window.setTimeout(function() {
                x._validateField(b, d);
                if (d.InvalidFields.length == 0 && d.onFieldSuccess) {
                    d.onFieldSuccess()
                } else if (d.InvalidFields.length > 0 && d.onFieldFailure) {
                    d.onFieldFailure()
                }
            },
            (a.data) ? a.data.delay: 0)
        },
        _onSubmitEvent: function() {
            var a = $(this);
            var b = a.data('jqv');
            if (a.data("jqv_submitButton")) {
                var c = $("#" + a.data("jqv_submitButton"));
                if (c) {
                    if (c.length > 0) {
                        if (c.hasClass("validate-skip") || c.attr("data-validation-engine-skip") == "true") return true
                    }
                }
            }
            b.eventTrigger = "submit";
            var r = x._validateFields(a);
            if (r && b.ajaxFormValidation) {
                x._validateFormWithAjax(a, b);
                return false
            }
            if (b.onValidationComplete) {
                return !! b.onValidationComplete(a, r)
            }
            return r
        },
        _checkAjaxStatus: function(c) {
            var d = true;
            $.each(c.ajaxValidCache,
            function(a, b) {
                if (!b) {
                    d = false;
                    return false
                }
            });
            return d
        },
        _checkAjaxFieldStatus: function(a, b) {
            return b.ajaxValidCache[a] == true
        },
        _validateFields: function(c) {
            var d = c.data('jqv');
            var e = false;
            c.trigger("jqv.form.validating");
            var f = null;
            c.find('[' + d.validateAttribute + '*=validate]').not(":disabled").each(function() {
                var a = $(this);
                var b = [];
                if ($.inArray(a.attr('name'), b) < 0) {
                    e |= x._validateField(a, d);
                    if (e && f == null) if (a.is(":hidden") && d.prettySelect) f = a = c.find("#" + d.usePrefix + x._jqSelector(a.attr('id')) + d.useSuffix);
                    else {
                        if (a.data('jqv-prompt-at') instanceof jQuery) {
                            a = a.data('jqv-prompt-at')
                        } else if (a.data('jqv-prompt-at')) {
                            a = $(a.data('jqv-prompt-at'))
                        }
                        f = a
                    }
                    if (d.doNotShowAllErrosOnSubmit) return false;
                    b.push(a.attr('name'));
                    if (d.showOneMessage == true && e) {
                        return false
                    }
                }
            });
            c.trigger("jqv.form.result", [e]);
            if (e) {
                if (d.scroll) {
                    var g = f.offset().top;
                    var h = f.offset().left;
                    var i = d.promptPosition;
                    if (typeof(i) == 'string' && i.indexOf(":") != -1) i = i.substring(0, i.indexOf(":"));
                    if (i != "bottomRight" && i != "bottomLeft") {
                        var j = x._getPrompt(f);
                        if (j) {
                            g = j.offset().top
                        }
                    }
                    if (d.scrollOffset) {
                        g -= d.scrollOffset
                    }
                    if (d.isOverflown) {
                        var k = $(d.overflownDIV);
                        if (!k.length) return false;
                        var l = k.scrollTop();
                        var m = -parseInt(k.offset().top);
                        g += l + m - 5;
                        var n = $(d.overflownDIV + ":not(:animated)");
                        n.animate({
                            scrollTop: g
                        },
                        ($("html").css("scroll-behavior")=="smooth"?0:800),
                        function() {
                            if (d.focusFirstField) f.focus()
                        })
                    } else {
                        $("html, body").animate({
                            scrollTop: g - 200
                        },
                        ($("html").css("scroll-behavior")=="smooth"?0:800),
                        function() {
                            if (d.focusFirstField) f.focus()
                        })
                    }
                } else if (d.focusFirstField) f.focus();
                return false
            }
            return true
        },
        _validateFormWithAjax: function(h, j) {
            var k = h.serialize();
            var l = (j.ajaxFormValidationMethod) ? j.ajaxFormValidationMethod: "GET";
            var m = (j.ajaxFormValidationURL) ? j.ajaxFormValidationURL: h.attr("action");
            var n = (j.dataType) ? j.dataType: "json";
            $.ajax({
                type: l,
                url: m,
                cache: false,
                dataType: n,
                data: k,
                form: h,
                methods: x,
                options: j,
                beforeSend: function() {
                    return j.onBeforeAjaxFormValidation(h, j)
                },
                error: function(a, b) {
                    x._ajaxError(a, b)
                },
                success: function(a) {
                    if ((n == "json") && (a !== true)) {
                        var b = false;
                        for (var i = 0; i < a.length; i++) {
                            var c = a[i];
                            var d = c[0];
                            var e = $($("#" + d)[0]);
                            if (e.length == 1) {
                                var f = c[2];
                                if (c[1] == true) {
                                    if (f == "" || !f) {
                                        x._closePrompt(e)
                                    } else {
                                        if (j.allrules[f]) {
                                            var g = j.allrules[f].alertTextOk;
                                            if (g) f = g
                                        }
                                        if (j.showPrompts) x._showPrompt(e, f, "pass", false, j, true)
                                    }
                                } else {
                                    b |= true;
                                    if (j.allrules[f]) {
                                        var g = j.allrules[f].alertText;
                                        if (g) f = g
                                    }
                                    if (j.showPrompts) x._showPrompt(e, f, "", false, j, true)
                                }
                            }
                        }
                        j.onAjaxFormComplete(!b, h, a, j)
                    } else j.onAjaxFormComplete(true, h, a, j)
                }
            })
        },
        _validateField: function(a, b, c) {
            if (!a.attr("id")) {
                a.attr("id", "form-validation-field-" + $.validationEngine2.fieldIdCounter); ++$.validationEngine2.fieldIdCounter
            }
            if (!b.validateNonVisibleFields && (a.is(":hidden") && !b.prettySelect || a.parent().is(":hidden"))) return false;
            var d = a.attr(b.validateAttribute);
            var e = /validate\[(.*)\]/.exec(d);
            if (!e) return false;
            var f = e[1];
            var g = f.split(/\[|,|\]/);
            var h = false;
            var j = a.attr("name");
            var k = "";
            var l = "";
            var m = false;
            var n = false;
            b.isError = false;
            b.showArrow = true;
            if (b.maxErrorsPerField > 0) {
                n = true
            }
            var o = $(a.closest("form, .dng-form"));
            for (var i = 0; i < g.length; i++) {
                g[i] = g[i].replace(" ", "");
                if (g[i] === '') {
                    delete g[i]
                }
            }
            for (var i = 0,
            field_errors = 0; i < g.length; i++) {
                if (n && field_errors >= b.maxErrorsPerField) {
                    if (!m) {
                        var p = $.inArray('required', g);
                        m = (p != -1 && p >= i)
                    }
                    break
                }
                var q = undefined;
                switch (g[i]) {
                case "required":
                    m = true;
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._required);
                    break;
                case "custom":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._custom);
                    break;
                case "groupRequired":
                    var r = "[" + b.validateAttribute + "*=" + g[i + 1] + "]";
                    var s = o.find(r).eq(0);
                    if (s[0] != a[0]) {
                        x._validateField(s, b, c);
                        b.showArrow = true
                    }
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._groupRequired);
                    if (q) m = true;
                    b.showArrow = false;
                    break;
                case "ajax":
                    q = x._ajax(a, g, i, b);
                    if (q) {
                        l = "load"
                    }
                    break;
                case "minSize":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._minSize);
                    break;
                case "maxSize":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._maxSize);
                    break;
                case "min":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._min);
                    break;
                case "max":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._max);
                    break;
                case "past":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._past);
                    break;
                case "future":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._future);
                    break;
                case "dateRange":
                    var r = "[" + b.validateAttribute + "*=" + g[i + 1] + "]";
                    b.firstOfGroup = o.find(r).eq(0);
                    b.secondOfGroup = o.find(r).eq(1);
                    if (b.firstOfGroup[0].value || b.secondOfGroup[0].value) {
                        q = x._getErrorMessage(o, a, g[i], g, i, b, x._dateRange)
                    }
                    if (q) m = true;
                    b.showArrow = false;
                    break;
                case "dateTimeRange":
                    var r = "[" + b.validateAttribute + "*=" + g[i + 1] + "]";
                    b.firstOfGroup = o.find(r).eq(0);
                    b.secondOfGroup = o.find(r).eq(1);
                    if (b.firstOfGroup[0].value || b.secondOfGroup[0].value) {
                        q = x._getErrorMessage(o, a, g[i], g, i, b, x._dateTimeRange)
                    }
                    if (q) m = true;
                    b.showArrow = false;
                    break;
                case "maxCheckbox":
                    a = $(o.find("input[name='" + j + "']"));
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._maxCheckbox);
                    break;
                case "minCheckbox":
                    a = $(o.find("input[name='" + j + "']"));
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._minCheckbox);
                    break;
                case "equals":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._equals);
                    break;
                case "funcCall":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._funcCall);
                    break;
                case "creditCard":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._creditCard);
                    break;
                case "condRequired":
                    q = x._getErrorMessage(o, a, g[i], g, i, b, x._condRequired);
                    if (q !== undefined) {
                        m = true
                    }
                    break;
                default:
                }
                var t = false;
                if (typeof q == "object") {
                    switch (q.status) {
                    case "_break":
                        t = true;
                        break;
                    case "_error":
                        q = q.message;
                        break;
                    case "_error_no_prompt":
                        return true;
                        break;
                    default:
                        break
                    }
                }
                if (t) {
                    break
                }
                if (typeof q == 'string') {
                    k += q + "<br/>";
                    b.isError = true;
                    field_errors++
                }
            }
            if (!m && !(a.val()) && a.val().length < 1) b.isError = false;
            var u = a.prop("type");
            var v = a.data("promptPosition") || b.promptPosition;
            if ((u == "radio" || u == "checkbox") && o.find("input[name='" + j + "']").length > 1) {
                if (v === 'inline') {
                    a = $(o.find("input[name='" + j + "'][type!=hidden]:last"))
                } else {
                    a = $(o.find("input[name='" + j + "'][type!=hidden]:first"))
                }
                b.showArrow = false
            }
            if (a.is(":hidden") && b.prettySelect) {
                a = o.find("#" + b.usePrefix + x._jqSelector(a.attr('id')) + b.useSuffix)
            }
            if (b.isError && b.showPrompts) {
                x._showPrompt(a, k, l, false, b)
            } else {
                if (!h) x._closePrompt(a)
            }
            if (!h) {
                a.trigger("jqv.field.result", [a, b.isError, k])
            }
            var w = $.inArray(a[0], b.InvalidFields);
            if (w == -1) {
                if (b.isError) b.InvalidFields.push(a[0])
            } else if (!b.isError) {
                b.InvalidFields.splice(w, 1)
            }
            x._handleStatusCssClasses(a, b);
            if (b.isError && b.onFieldFailure) b.onFieldFailure(a);
            if (!b.isError && b.onFieldSuccess) b.onFieldSuccess(a);
            return b.isError
        },
        _handleStatusCssClasses: function(a, b) {
            if (b.addSuccessCssClassToField) a.removeClass(b.addSuccessCssClassToField);
            if (b.addFailureCssClassToField) a.removeClass(b.addFailureCssClassToField);
            if (b.addSuccessCssClassToField && !b.isError) a.addClass(b.addSuccessCssClassToField);
            if (b.addFailureCssClassToField && b.isError) a.addClass(b.addFailureCssClassToField)
        },
        _getErrorMessage: function(a, b, c, d, i, e, f) {
            var g = jQuery.inArray(c, d);
            if (c === "custom" || c === "funcCall") {
                var h = d[g + 1];
                c = c + "[" + h + "]";
                delete(d[g])
            }
            var j = c;
            var k = (b.attr("data-validation-engine")) ? b.attr("data-validation-engine") : b.attr("class");
            var l = k.split(" ");
            var m;
            if (c == "future" || c == "past" || c == "maxCheckbox" || c == "minCheckbox") {
                m = f(a, b, d, i, e)
            } else {
                m = f(b, d, i, e)
            }
            if (m != undefined) {
                var n = x._getCustomErrorMessage($(b), l, j, e);
                if (n) m = n
            }
            return m
        },
        _getCustomErrorMessage: function(a, b, c, d) {
            var e = false;
            var f = /^custom\[.*\]$/.test(c) ? x._validityProp["custom"] : x._validityProp[c];
            if (f != undefined) {
                e = a.attr("data-errormessage-" + f);
                if (e != undefined) return e
            }
            e = a.attr("data-errormessage");
            if (e != undefined) return e;
            var g = '#' + a.attr("id");
            if (typeof d.custom_error_messages[g] != "undefined" && typeof d.custom_error_messages[g][c] != "undefined") {
                e = d.custom_error_messages[g][c]['message']
            } else if (b.length > 0) {
                for (var i = 0; i < b.length && b.length > 0; i++) {
                    var h = "." + b[i];
                    if (typeof d.custom_error_messages[h] != "undefined" && typeof d.custom_error_messages[h][c] != "undefined") {
                        e = d.custom_error_messages[h][c]['message'];
                        break
                    }
                }
            }
            if (!e && typeof d.custom_error_messages[c] != "undefined" && typeof d.custom_error_messages[c]['message'] != "undefined") {
                e = d.custom_error_messages[c]['message']
            }
            return e
        },
        _validityProp: {
            "required": "value-missing",
            "custom": "custom-error",
            "groupRequired": "value-missing",
            "ajax": "custom-error",
            "minSize": "range-underflow",
            "maxSize": "range-overflow",
            "min": "range-underflow",
            "max": "range-overflow",
            "past": "type-mismatch",
            "future": "type-mismatch",
            "dateRange": "type-mismatch",
            "dateTimeRange": "type-mismatch",
            "maxCheckbox": "range-overflow",
            "minCheckbox": "range-underflow",
            "equals": "pattern-mismatch",
            "funcCall": "custom-error",
            "creditCard": "pattern-mismatch",
            "condRequired": "value-missing"
        },
        _required: function(a, b, i, c, d) {
            switch (a.prop("type")) {
            case "text":
            case "password":
            case "textarea":
            case "file":
            case "select-one":
            case "select-multiple":
            default:
                var e = $.trim(a.val());
                var f = $.trim(a.attr("data-validation-placeholder"));
                var g = $.trim(a.attr("placeholder"));
                if ((!e) || (f && e == f) || (g && e == g)) {
                    return c.allrules[b[i]].alertText
                }
                break;
            case "radio":
            case "checkbox":
                if (d) {
                    if (!a.attr('checked')) {
                        return c.allrules[b[i]].alertTextCheckboxMultiple
                    }
                    break
                }
                var h = a.closest("form, .dng-form");
                var j = a.attr("name");
                if (h.find("input[name='" + j + "']:checked").length == 0) {
                    if (h.find("input[name='" + j + "']:visible").length == 1) return c.allrules[b[i]].alertTextCheckboxe;
                    else return c.allrules[b[i]].alertTextCheckboxMultiple
                }
                break
            }
        },
        _groupRequired: function(a, b, i, c) {
            var d = "[" + c.validateAttribute + "*=" + b[i + 1] + "]";
            var e = false;
            a.closest("form, .dng-form").find(d).each(function() {
                if (!x._required($(this), b, i, c)) {
                    e = true;
                    return false
                }
            });
            if (!e) {
                return c.allrules[b[i]].alertText
            }
        },
        _custom: function(a, b, i, c) {
            var d = b[i + 1];
            var e = c.allrules[d];
            var f;
            if (!e) {
                alert("jqv:custom rule not found - " + d);
                return
            }
            if (e["regex"]) {
                var g = e.regex;
                if (!g) {
                    alert("jqv:custom regex not found - " + d);
                    return
                }
                var h = new RegExp(g);
                if (!h.test(a.val())) return c.allrules[d].alertText
            } else if (e["func"]) {
                f = e["func"];
                if (typeof(f) !== "function") {
                    alert("jqv:custom parameter 'function' is no function - " + d);
                    return
                }
                if (!f(a, b, i, c)) return c.allrules[d].alertText
            } else {
                alert("jqv:custom type not allowed " + d);
                return
            }
        },
        _funcCall: function(a, b, i, c) {
            var d = b[i + 1];
            var e;
            if (d.indexOf('.') > -1) {
                var f = d.split('.');
                var g = window;
                while (f.length) {
                    g = g[f.shift()]
                }
                e = g
            } else e = window[d] || c.customFunctions[d];
            if (typeof(e) == 'function') return e(a, b, i, c)
        },
        _equals: function(a, b, i, c) {
            var d = b[i + 1];
            if (a.val() != $("#" + d).val()) return c.allrules.equals.alertText
        },
        _maxSize: function(a, b, i, c) {
            var d = b[i + 1];
            var e = a.val().length;
            if (e > d) {
                var f = c.allrules.maxSize;
                return f.alertText + d + f.alertText2
            }
        },
        _minSize: function(a, b, i, c) {
            var d = b[i + 1];
            var e = a.val().length;
            if (e < d) {
                var f = c.allrules.minSize;
                return f.alertText + d + f.alertText2
            }
        },
        _min: function(a, b, i, c) {
            var d = parseFloat(b[i + 1]);
            var e = parseFloat(a.val());
            if (e < d) {
                var f = c.allrules.min;
                if (f.alertText2) return f.alertText + d + f.alertText2;
                return f.alertText + d
            }
        },
        _max: function(a, b, i, c) {
            var d = parseFloat(b[i + 1]);
            var e = parseFloat(a.val());
            if (e > d) {
                var f = c.allrules.max;
                if (f.alertText2) return f.alertText + d + f.alertText2;
                return f.alertText + d
            }
        },
        _past: function(a, b, c, i, d) {
            var p = c[i + 1];
            var e = $(a.find("input[name='" + p.replace(/^#+/, '') + "']"));
            var f;
            if (p.toLowerCase() == "now") {
                f = new Date()
            } else if (undefined != e.val()) {
                if (e.is(":disabled")) return;
                f = x._parseDate(e.val())
            } else {
                f = x._parseDate(p)
            }
            var g = x._parseDate(b.val());
            if (g > f) {
                var h = d.allrules.past;
                if (h.alertText2) return h.alertText + x._dateToString(f) + h.alertText2;
                return h.alertText + x._dateToString(f)
            }
        },
        _future: function(a, b, c, i, d) {
            var p = c[i + 1];
            var e = $(a.find("input[name='" + p.replace(/^#+/, '') + "']"));
            var f;
            if (p.toLowerCase() == "now") {
                f = new Date()
            } else if (undefined != e.val()) {
                if (e.is(":disabled")) return;
                f = x._parseDate(e.val())
            } else {
                f = x._parseDate(p)
            }
            var g = x._parseDate(b.val());
            if (g < f) {
                var h = d.allrules.future;
                if (h.alertText2) return h.alertText + x._dateToString(f) + h.alertText2;
                return h.alertText + x._dateToString(f)
            }
        },
        _isDate: function(a) {
            var b = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
            return b.test(a)
        },
        _isDateTime: function(a) {
            var b = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
            return b.test(a)
        },
        _dateCompare: function(a, b) {
            return (new Date(a.toString()) < new Date(b.toString()))
        },
        _dateRange: function(a, b, i, c) {
            if ((!c.firstOfGroup[0].value && c.secondOfGroup[0].value) || (c.firstOfGroup[0].value && !c.secondOfGroup[0].value)) {
                return c.allrules[b[i]].alertText + c.allrules[b[i]].alertText2
            }
            if (!x._isDate(c.firstOfGroup[0].value) || !x._isDate(c.secondOfGroup[0].value)) {
                return c.allrules[b[i]].alertText + c.allrules[b[i]].alertText2
            }
            if (!x._dateCompare(c.firstOfGroup[0].value, c.secondOfGroup[0].value)) {
                return c.allrules[b[i]].alertText + c.allrules[b[i]].alertText2
            }
        },
        _dateTimeRange: function(a, b, i, c) {
            if ((!c.firstOfGroup[0].value && c.secondOfGroup[0].value) || (c.firstOfGroup[0].value && !c.secondOfGroup[0].value)) {
                return c.allrules[b[i]].alertText + c.allrules[b[i]].alertText2
            }
            if (!x._isDateTime(c.firstOfGroup[0].value) || !x._isDateTime(c.secondOfGroup[0].value)) {
                return c.allrules[b[i]].alertText + c.allrules[b[i]].alertText2
            }
            if (!x._dateCompare(c.firstOfGroup[0].value, c.secondOfGroup[0].value)) {
                return c.allrules[b[i]].alertText + c.allrules[b[i]].alertText2
            }
        },
        _maxCheckbox: function(a, b, c, i, d) {
            var e = c[i + 1];
            var f = b.attr("name");
            var g = a.find("input[name='" + f + "']:checked").length;
            if (g > e) {
                d.showArrow = false;
                if (d.allrules.maxCheckbox.alertText2) return d.allrules.maxCheckbox.alertText + " " + e + " " + d.allrules.maxCheckbox.alertText2;
                return d.allrules.maxCheckbox.alertText
            }
        },
        _minCheckbox: function(a, b, c, i, d) {
            var e = c[i + 1];
            var f = b.attr("name");
            var g = a.find("input[name='" + f + "']:checked").length;
            if (g < e) {
                d.showArrow = false;
                return d.allrules.minCheckbox.alertText + " " + e + " " + d.allrules.minCheckbox.alertText2
            }
        },
        _creditCard: function(a, b, i, c) {
            var d = false,
            cardNumber = a.val().replace(/ +/g, '').replace(/-+/g, '');
            var e = cardNumber.length;
            if (e >= 14 && e <= 16 && parseInt(cardNumber) > 0) {
                var f = 0,
                i = e - 1,
                pos = 1,
                digit, luhn = new String();
                do {
                    digit = parseInt(cardNumber.charAt(i));
                    luhn += (pos++%2 == 0) ? digit * 2 : digit
                } while (-- i >= 0 ) for (i = 0; i < luhn.length; i++) {
                    f += parseInt(luhn.charAt(i))
                }
                d = f % 10 == 0
            }
            if (!d) return c.allrules.creditCard.alertText
        },
        _ajax: function(g, h, i, j) {
            var k = h[i + 1];
            var l = j.allrules[k];
            var m = l.extraData;
            var n = l.extraDataDynamic;
            var o = {
                "fieldId": g.attr("id"),
                "fieldValue": g.val()
            };
            if (typeof m === "object") {
                $.extend(o, m)
            } else if (typeof m === "string") {
                var p = m.split("&");
                for (var i = 0; i < p.length; i++) {
                    var q = p[i].split("=");
                    if (q[0] && q[0]) {
                        o[q[0]] = q[1]
                    }
                }
            }
            if (n) {
                var r = [];
                var s = String(n).split(",");
                for (var i = 0; i < s.length; i++) {
                    var t = s[i];
                    if ($(t).length) {
                        var u = g.closest("form, .dng-form").find(t).val();
                        var v = t.replace('#', '') + '=' + escape(u);
                        o[t.replace('#', '')] = u
                    }
                }
            }
            if (j.eventTrigger == "field") {
                delete(j.ajaxValidCache[g.attr("id")])
            }
            if (!j.isError && !x._checkAjaxFieldStatus(g.attr("id"), j)) {
                $.ajax({
                    type: j.ajaxFormValidationMethod,
                    url: l.url,
                    cache: false,
                    dataType: "json",
                    data: o,
                    field: g,
                    rule: l,
                    methods: x,
                    options: j,
                    beforeSend: function() {},
                    error: function(a, b) {
                        x._ajaxError(a, b)
                    },
                    success: function(a) {
                        var b = a[0];
                        var c = $("#" + b).eq(0);
                        if (c.length == 1) {
                            var d = a[1];
                            var e = a[2];
                            if (!d) {
                                j.ajaxValidCache[b] = false;
                                j.isError = true;
                                if (e) {
                                    if (j.allrules[e]) {
                                        var f = j.allrules[e].alertText;
                                        if (f) {
                                            e = f
                                        }
                                    }
                                } else e = l.alertText;
                                if (j.showPrompts) x._showPrompt(c, e, "", true, j)
                            } else {
                                j.ajaxValidCache[b] = true;
                                if (e) {
                                    if (j.allrules[e]) {
                                        var f = j.allrules[e].alertTextOk;
                                        if (f) {
                                            e = f
                                        }
                                    }
                                } else e = l.alertTextOk;
                                if (j.showPrompts) {
                                    if (e) x._showPrompt(c, e, "pass", true, j);
                                    else x._closePrompt(c)
                                }
                                if (j.eventTrigger == "submit") g.closest("form").submit()
                            }
                        }
                        c.trigger("jqv.field.result", [c, j.isError, e])
                    }
                });
                return l.alertTextLoad
            }
        },
        _ajaxError: function(a, b) {
            if (a.status == 0 && b == null) alert("The page is not served from a server! ajax call failed");
            else if (typeof console != "undefined") console.log("Ajax error: " + a.status + " " + b)
        },
        _dateToString: function(a) {
            return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate()
        },
        _parseDate: function(d) {
            var a = d.split("-");
            if (a == d) a = d.split("index.html");
            if (a == d) {
                a = d.split(".");
                return new Date(a[2], (a[1] - 1), a[0])
            }
            return new Date(a[0], (a[1] - 1), a[2])
        },
        _showPrompt: function(a, b, c, d, e, f) {
            if (a.data('jqv-prompt-at') instanceof jQuery) {
                a = a.data('jqv-prompt-at')
            } else if (a.data('jqv-prompt-at')) {
                a = $(a.data('jqv-prompt-at'))
            }
            var g = x._getPrompt(a);
            if (f) g = false;
            if ($.trim(b)) {
                if (g) x._updatePrompt(a, g, b, c, d, e);
                else x._buildPrompt(a, b, c, d, e)
            }
        },
        _buildPrompt: function(a, b, c, d, e) {
            var f = $('<div>');
            f.addClass(x._getClassName(a.attr("id")) + "formError2");
            f.addClass("parentForm" + x._getClassName(a.closest('form, .dng-form').attr("id")));
            f.addClass("formError2");
            f.attr("id", x._getClassName(a.attr("id")) + "formError2");
            a.attr("aria-describedby", x._getClassName(a.attr("id")) + "formError2");
            if (d) f.addClass("ajaxed");
            f.html('<div class="formErrorContent2">' + b + '<span class="info-close"></span></div>');
            if (e.addPromptClass) f.addClass(e.addPromptClass);
            var g = a.attr('data-required-class');
            if (g !== undefined) {
                f.addClass(g)
            } else {
                if (e.prettySelect) {
                    if ($('#' + a.attr('id')).next().is('select')) {
                        var h = $('#' + a.attr('id').substr(e.usePrefix.length).substring(e.useSuffix.length)).attr('data-required-class');
                        if (h !== undefined) {
                            f.addClass(h)
                        }
                    }
                }
            }
            f.children(".formErrorContent2").hide();
            a.parent().after(f);
            f.children(".formErrorContent2").stop().slideDown();
            a.parent().parent().addClass("error-element");
            f.data("callerField", a);
            if (e.autoHidePrompt) {
                setTimeout(function() {
                    f.children(".formErrorContent2").stop().slideUp(function() {
                        f.closest('.formErrorOuter').remove();
                        f.remove()
                    })
                },
                e.autoHideDelay)
            }
            return
        },
        _updatePrompt: function(a, b, c, d, e, f, g) {
            if (b) {
                if (typeof d !== "undefined") {
                    if (d == "pass") b.addClass("greenPopup");
                    else b.removeClass("greenPopup");
                    if (d == "load") b.addClass("blackPopup");
                    else b.removeClass("blackPopup")
                }
                if (e) b.addClass("ajaxed");
                else b.removeClass("ajaxed");
                b.find(".formErrorContent2").html(c + '<span class="info-close"></span>')
            }
        },
        _closePrompt: function(a) {
            var b = x._getPrompt(a);
            if (b) {
                if (b.siblings(".hasErrorMsg").length) {
                    b.siblings(".hasErrorMsg").removeClass("hasErrorMsg");
                    b.children(".formErrorContent2").stop().slideUp(function() {
                        b.parent('.formErrorOuter').remove();
                        a.removeAttr("aria-describedby");
                        b.remove()
                    });
                    a.parent().parent().removeClass("error-element")
                } else {
                    a.removeAttr("aria-describedby");
                    b.children(".formErrorContent2").slideUp(function() {
                        b.parent('.formErrorOuter').remove();
                        b.remove()
                    });
                    a.parent().parent().removeClass("error-element")
                }
            }
        },
        closePrompt: function(a) {
            return x._closePrompt(a)
        },
        _getPrompt: function(a) {
            var b = $(a).closest('form, .dng-form').attr('id');
            var c = x._getClassName(a.attr("id")) + "formError2";
            var d = $("." + x._escapeExpression(c) + '.parentForm' + x._getClassName(b))[0];
            if (d) return $(d)
        },
        _escapeExpression: function(a) {
            return a.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1")
        },
        isRTL: function(a) {
            var b = $(document);
            var c = $('body');
            var d = (a && a.hasClass('rtl')) || (a && (a.attr('dir') || '').toLowerCase() === 'rtl') || b.hasClass('rtl') || (b.attr('dir') || '').toLowerCase() === 'rtl' || c.hasClass('rtl') || (c.attr('dir') || '').toLowerCase() === 'rtl';
            return Boolean(d)
        },
        _saveOptions: function(a, b) {
            if ($.validationEngineLanguage) var c = $.validationEngineLanguage.allRules;
            else $.error("jQuery.validationEngine2 rules are not loaded, plz add localization files to the page");
            $.validationEngine2.defaults.allrules = c;
            var d = $.extend(true, {},
            $.validationEngine2.defaults, b);
            a.data('jqv', d);
            return d
        },
        _getClassName: function(a) {
            if (a) return a.replace(/:/g, "_").replace(/\./g, "_")
        },
        _jqSelector: function(a) {
            return a.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1')
        },
        _condRequired: function(a, b, i, c) {
            var d, dependingField;
            for (d = (i + 1); d < b.length; d++) {
                dependingField = jQuery("#" + b[d]).first();
                if (dependingField.length && x._required(dependingField, ["required"], 0, c, true) == undefined) {
                    return x._required(a, ["required"], 0, c)
                }
            }
        },
        _submitButtonClick: function(a) {
            var b = $(this);
            var c = b.closest('form, .dng-form');
            c.data("jqv_submitButton", b.attr("id"))
        }
    };
    $.fn.validationEngine2 = function(a) {
        var b = $(this);
        if (!b[0]) return b;
        if (typeof(a) == 'string' && a.charAt(0) != '_' && x[a]) {
            if (a != "showPrompt" && a != "hide" && a != "hideAll") x.init.apply(b);
            return x[a].apply(b, Array.prototype.slice.call(arguments, 1))
        } else if (typeof a == 'object' || !a) {
            x.init.apply(b, arguments);
            return x.attach.apply(b)
        } else {
            $.error('Method ' + a + ' does not exist in jQuery.validationEngine2')
        }
    };
    $.validationEngine2 = {
        fieldIdCounter: 0,
        defaults: {
            validationEventTrigger: "blur",
            scroll: true,
            focusFirstField: true,
            showPrompts: true,
            validateNonVisibleFields: false,
            promptPosition: "inline",
            bindMethod: "bind",
            inlineAjax: false,
            ajaxFormValidation: false,
            ajaxFormValidationURL: false,
            ajaxFormValidationMethod: 'get',
            onAjaxFormComplete: $.noop,
            onBeforeAjaxFormValidation: $.noop,
            onValidationComplete: false,
            doNotShowAllErrosOnSubmit: false,
            custom_error_messages: {},
            binded: true,
            showArrow: true,
            isError: false,
            maxErrorsPerField: false,
            ajaxValidCache: {},
            autoPositionUpdate: false,
            InvalidFields: [],
            onFieldSuccess: false,
            onFieldFailure: false,
            onSuccess: false,
            onFailure: false,
            validateAttribute: "class",
            addSuccessCssClassToField: "",
            addFailureCssClassToField: "",
            autoHidePrompt: false,
            autoHideDelay: 10000,
            fadeDuration: 0.3,
            prettySelect: false,
            addPromptClass: "",
            usePrefix: "",
            useSuffix: "",
            showOneMessage: false,
            isWCAG: false
        }
    }
})(jQuery);
;;;(function($){$.fn.conditionize2=function(options){$.fn.showOrHide2=function(is_met,$section,animation){if($section.is(".nav-item")||$section.is(".form-page")){if(is_met){$section.removeClass("item-hide").addClass("item-show");}else{$section.addClass("item-hide").removeClass("item-show");}}else{if(is_met){animation?$section.stop().slideDown(100):$section.stop().show();$section.find("select, input,textarea").removeAttr("disabled","disabled").trigger("change");}else{animation?$section.stop().slideUp(100,function(){$section.find("select, input,textarea").attr("disabled","disabled").trigger("change");}):$section.stop().hide(),$section.find("select, input,textarea").attr("disabled","disabled").trigger("change");}}};return this.each(function(){let $section=$(this);let cond=$(this).data("condition");if(!cond)return;let match=cond.match=="all"?true:false;let inputs={};let action=cond.action=="show"?true:false;cond.logic.forEach((row,index)=>{let box=$("#"+row.id);if(box.length&&box[0].nodeName=="DIV"){if(!inputs[row.id]){inputs[row.id]="#"+row.id+" input";}
row.isGroup=true;}else{if(!inputs[row.id]){inputs[row.id]="#"+row.id;}}});function CalculateRuleAll(){for(let i=0;i<cond.logic.length;i++){let row=cond.logic[i];let box=$("#"+row.id);let boxVal=box.val();let isGroup=row.isGroup;let is_met=false;if(isGroup){boxVal=[];box.find("input:checked").each(function(){boxVal.push($(this).val());})}
switch(row.rule){case"eq":is_met=(isGroup?boxVal.includes(row.value):boxVal==row.value);break;case"neq":is_met=isGroup?!boxVal.includes(row.value):boxVal!=row.value;break;case"empty":is_met=isGroup?!boxVal.length:!boxVal;break;case"not_empty":is_met=isGroup?boxVal.length:boxVal;break;case"gt":is_met=boxVal&&boxVal>row.value;break;case"lt":is_met=boxVal&&boxVal<row.value;break;case"contains":is_met=boxVal&&boxVal.indexOf(row.value)!=-1;break;case"starts_with":is_met=boxVal&&boxVal.indexOf(row.value)==0;break;case"ends_with":is_met=boxVal&&boxVal.lastIndexOf(row.value)==boxVal.length-row.value.length;break;}
if(match&&!is_met){return false;}
if(!match&&is_met){return true;}}
return match?true:false;}
for(let n in inputs){$(inputs[n]).on("change",function(){$.fn.showOrHide2(action?CalculateRuleAll():!CalculateRuleAll(),$section,true)})}
$.fn.showOrHide2(action?CalculateRuleAll():!CalculateRuleAll(),$section.removeAttr("data-condition"));})}}(jQuery));function formLauncher(){$(".dng-form").each(function(){let e=$(this);let formPage=0;let myPond=[];let PondProgress=[];let PondFileProgress=[];let PondProgressReady=0;let FormValidateToken=false;let message=false;let query=e.parents(".form-html").data("query")||{};if(e.parent("form").length)e.unwrap();let form=e;e.one("mouseenter",function(){e.wrap('<form action="'+e.attr("action")+'" novalidate>');form=e.parent();form.submit(function(event){event.preventDefault();if(e.validationEngine2('validate')){if(e.find(".form-pages-main .form-page").length-1>formPage+1){currentPages(true);return;}
let data={};let dataArray=$(this).serializeArray();let url=$(this).attr("action");$.each(dataArray,function(index,item){if(data[item.name]){data[item.name]+=','+item.value;}else{data[item.name]=item.value;}});$(this).find('input[type="radio"],input[type="checkbox"]').each(function(){if(data[this.name]==undefined){data[this.name]='';}});let PostForm=()=>$.ajax({url:url,data:formData,type:'POST',jsonp:'jsoncallback',cache:false,processData:false,contentType:false,success:function(resp){function successResp(){resp=JSON.parse(resp);if(resp.success){}
e.find(".form-pages-main").children(".message").remove();let messageTimeout=3000;let resetType='';let messagePosition='below';if(message){message.remove();}
message=$('<div class="message" style="display:none">'+resp.msg+'<div>');if(resp.data&&resp.data.Confirmation){let hrefUrl='';resp.data.Confirmation.forEach(function(item){if(["message"].includes(item.type)){message.html(item.message);}else{message=false;}
if(["redirect"].includes(item.type)||(["alert"].includes(item.type)&&item.successButtonEvent=="redirect")||(["message","html"].includes(item.type)&&item.afterRedirect)){if(!item.urlType){hrefUrl=item.pageUrl;if(item.queryString&&hrefUrl){hrefUrl+=item.queryString;}}else{hrefUrl=item.url;};if(!["alert"].includes(item.type)){setTimeout(()=>{if(item.OpenNewWindow){window.open(hrefUrl);}else{window.location.href=hrefUrl;};},!["redirect"].includes(item.type)?item.redirectDelay*1000:0);}};if(["html"].includes(item.type)){e.find(".form-pages-main > .form-submit-info-page").html(item.html);currentPages(true);};if(["reload"].includes(item.type)){window.location.reload();};if(["alert"].includes(item.type)){var alertMessage=$(`<div class="form-message-alert"><div class="message-content"><div class="icon"></div><div class="description">${item.message}</div><button type="button" class="btn-confirm">${item.successButtonText}</button></div></div>`);$('body').append(alertMessage.hide());alertMessage.fadeIn(200,function(){alertMessage.addClass("animate");});alertMessage.find(".btn-confirm").on("click",function(){alertMessage.fadeOut(200,function(){alertMessage.remove();});if(item.successButtonEvent=="redirect"){if(item.OpenNewWindow){window.open(hrefUrl);}else{window.location.href=hrefUrl;};}}).trigger("focus");}
messageTimeout=item.timeOut*1000;resetType=item.reset;messagePosition=item.position;})}
if(message){messagePosition=='above'?e.prepend(message.addClass("position-above")):e.append(message.addClass("position-below"));}
if(resp.success){message&&message.addClass('valid');if(!resetType||resetType=="clear"){if(resetType=="clear"){form.find(".form-control").removeAttr('value');form.find('input[type="checkbox"]').removeAttr('checked');form.find('input[type="radio"]').removeAttr('checked');form.find('select option').removeAttr('selected');form[0].reset();};form[0].reset();form.find('.conditional2').conditionize2();myPond.forEach(Pond=>{Pond.removeFiles();});clearTimeout(FormValidateToken);FormValidateToken=setTimeout(function(){form.find('input[id^="FormValidate_Encoded"]').val(resp.data.FormValidateToken);},5000);}}else{if(e.data("messagealert")){var alertMessage=$(`<div class="form-message-alert error"><div class="message-content"><div class="icon"></div><div class="description">${resp.msg}</div><button type="button" class="btn-confirm">${e.data("messagealert")}</button></div></div>`);$('body').append(alertMessage.hide());alertMessage.fadeIn(200,function(){alertMessage.addClass("animate");});alertMessage.find(".btn-confirm").on("click",function(){alertMessage.fadeOut(200,function(){alertMessage.remove();});});}else{message&&message.addClass('error');}
myPond.forEach(Pond=>{let oldFiles=Pond.getFiles();Pond.removeFiles();oldFiles.forEach(item=>{Pond.addFile(item.file);});});};e.removeClass("form-loading");if(!e.data("messagealert")){message&&message.slideDown();if(message){setTimeout(function(){message.slideUp(function(){message.remove();});},messageTimeout);}};form.find('.recaptcha-image').each(function(){$(this).children("img").attr("src",$(this).data("src")+"&v="+(new Date()).getTime());});form.find(".jsignature-container .reset").trigger("click");form.find(".select2-container > select").trigger("change.select2");}
if(myPond.length){setTimeout(function(){successResp();},1500)}else{successResp();}},xhr:function(){let newxhr=new XMLHttpRequest();let index=0;let currentTotal=0;if(myPond.length){function lengthComputable(e){if(PondFileProgress[index]<=e.loaded-currentTotal){currentTotal+=PondFileProgress[index];form.find('.filepond--item[data-filepond-item-state *= "processing"]').eq(index).css('--pond-processing',"100%");PondProgress[index](e.lengthComputable,PondFileProgress[index],PondFileProgress[index]);index++;lengthComputable(e);};if(index<PondFileProgress.length){form.find('.filepond--item[data-filepond-item-state *= "processing"]').eq(index).css('--pond-processing',(e.loaded-currentTotal)/PondFileProgress[index]*100+"%");PondProgress[index](e.lengthComputable,e.loaded-currentTotal,PondFileProgress[index]);}}
newxhr.upload.onprogress=(e)=>{lengthComputable(e);}}
return newxhr;},error:function(resp,text){console.log(resp,text);}});const formData=new FormData();for(let key in data){formData.append(key,data[key]);};if(myPond.length){PondProgress=[];PondFileProgress=[];PondProgressReady=0;let HasFileItem=0;form.find('.filepond--item').css('--pond-processing',"0");myPond.forEach(i=>{formData.delete(i.Name);i.getFiles().forEach(item=>{if(item.status==2){PondFileProgress.push(item.file.size);formData.append(i.Name,item.file);HasFileItem++;}});i.processFiles();});let PondProgressReadyTime=setInterval(()=>{if(PondProgressReady>=HasFileItem){clearInterval(PondProgressReadyTime);PostForm();}},10);}else{PostForm();}
e.addClass("form-loading");}
return false;});});function currentPages(next){let current=e.find(".form-pages-main > .form-page").eq(formPage);formPage=next?current.nextAll(':not(".item-hide")').eq(0).index():current.prevAll(':not(".item-hide")').eq(0).index();e.find(".step-nav > li").removeClass("current active").eq(formPage).addClass("current");e.find('.step-nav > li').slice(0,formPage).filter(':not(".item-hide"),.skip-item').addClass("active");e.find(".form-pages-main > .form-page").removeClass("active").eq(formPage).addClass("active");}
function dynamicOption(q){e.find("[data-dynamic]").each(function(){let dynamic=q[$(this).data("dynamic").toLowerCase()];let box=$(this);if(dynamic){if(box.hasClass("checkbox-list")||box.hasClass("radio-list")){box.find('input').prop("checked",false);dynamic.split(",").forEach(function(i){i=decodeURIComponent(i);box.find('input[value="'+i+'"]').prop("checked",true);})}else if(box.attr("multiple")){box.find('option').prop("selected",false);dynamic.split(",").forEach(function(i){i=decodeURIComponent(i);box.find('option[value="'+i+'"]').prop("selected",true);})}else{box.val(decodeURIComponent(dynamic));}}});}
e.find("button.btn-next,button.btn-prev").on("click",function(event){event.preventDefault();if($(this).hasClass("btn-prev")){currentPages(false);}else{if(e.validationEngine2('validate')){currentPages(true);}}});dynamicOption(query);e.find('.conditional2').conditionize2();let validationMessage={};e.find("[data-validate]").each(function(){let validate=$(this).data("validate");let name="validate";let msg={};validate.forEach(function(i){switch(i.type){case"required":name+="[required]";if(i.message){msg['required']={message:i.message}};break;case"phone":case"url":case"email":case"date":case"number":case"integer":case"ip":case"onlyNumberSp":case"onlyLetterSp":case"onlyLetterNumber":name+="[custom["+i.type+"]]";if(i.message){msg['custom['+i.type+']']={message:i.message}};break;case"min":case"max":case"minSize":case"maxSize":case"minCheckbox":case"maxCheckbox":name+="["+i.type+"["+i.value+"]]";if(i.message){msg[i.type+'['+i.value+']']={message:i.message}};break;case"custom":let customId=Math.round(Math.random()*1000000);name+="[custom["+i.type+"_"+customId+"]]";$.validationEngine2Language.allRules[i.type+"_"+customId]={"regex":i.value,"alertText":i.message};break;};});validationMessage["#"+$(this).attr("id")]=msg;$(this).addClass(name).removeAttr("data-validate");});e.find("[data-filters]").each(function(){let item=$(this);let filters=item.data("filters");filters.forEach(function(i){let pattern='';let event='change';switch(i.type){case"alpha":pattern=i.value?new RegExp(/[^A-Za-z\s]/g):new RegExp(/[^A-Za-z]/g);break;case"alphanumeric":pattern=i.value?new RegExp(/[^A-Za-z0-9\s]/g):new RegExp(/[^A-Za-z0-9]/g);break;case"digits":pattern=i.value?new RegExp(/[^0-9\s]/g):new RegExp(/[^0-9]/g);break;case"regex":if(i.value){pattern=new RegExp(i.value,'g');}
break;case"striptags":if(i.value){let value="\/?"+i.value.replace(/,/g,'|\/?');pattern=new RegExp("<(?!"+value+")[^<>]*>",'g');}else{pattern=new RegExp("<[^<>]*>",'g');}
break;case"trim":pattern=new RegExp(/^\s*|\s*$/g);break;};if(pattern){item.on(event,function(){this.value=this.value.replace(pattern,'');})}});$(this).removeAttr("data-filters");});e.find("[data-dynamic]").each(function(){let dynamic=query[$(this).data("dynamic")];let box=$(this);if(dynamic){if(box.hasClass("checkbox-list")||box.hasClass("radio-list")){box.find('input').prop("checked",false);dynamic.split(",").forEach(function(i){i=decodeURIComponent(i);box.find('input[value="'+i+'"]').prop("checked",true);})}else if(box.attr("multiple")){box.find('option').prop("selected",false);dynamic.split(",").forEach(function(i){i=decodeURIComponent(i);box.find('option[value="'+i+'"]').prop("selected",true);})}else{box.val(decodeURIComponent(dynamic));}}});e.find("[data-countrules]").each(function(){let cnt='';let obj=[];let item=$(this);item.data("countrules").forEach(function(i){if(i.type=="id"){obj.push(i.value);cnt+="{"+i.value+"}";let d=$("#"+i.value);if(d[0].nodeName=="DIV"){d=d.find("input");}
d.on("change",function(){let newcnt=cnt;obj.forEach(function(o){let d=$("#"+o);let n=0;if(d[0].nodeName=="DIV"){d=d.find("input:checked");};if(!(d.hasClass("disabled")&&d.parents(".form-element").first().hasClass("conditional2"))){if(d.val()&&parseFloat(d.val())){n=parseFloat(d.val());}}
newcnt=newcnt.replace("{"+o+"}",n);});item.val(eval(newcnt));});}else{cnt+=i.value;}});if(obj.length){$("#"+obj[0]).trigger("change");}
$(this).removeAttr("data-countrules");});e.on("click",'.info-close',function(){$(this).parents(".formErrorContent2").stop().slideUp(function(){$(this).parent().remove();}).parent().parent().removeClass("error-element").find("input[aria-describedby]").removeAttr('aria-describedby');});if(e.find(".jquery-easepick").length){let LoadDatepickInterval='';function LoadDatepick(){if("object"==typeof easepick){clearInterval(LoadDatepickInterval);e.find(".jquery-easepick").each(function(){let item=$(this);let options=item.data("element-options")?item.data("element-options"):{};item.removeAttr("data-element-options")
options=Object.assign({element:item[0],css:['/DesktopModules/MVC/DNNGo_FormBuilder/Resources/plugins/easepick/index.css'],zIndex:10000,LockPlugin:{},RangePlugin:{},AmpPlugin:{dropdown:{months:true,years:true}},plugins:["LockPlugin","AmpPlugin"]},options);console.log(options)
if(options.ActiveRangePlugin){options.plugins.push("RangePlugin");}else{delete options.LockPlugin.minDays;delete options.LockPlugin.maxDays;}
if(options.ActiveTime){options.plugins.push("TimePlugin");}
["minDate","maxDate"].forEach((i)=>{if(options.LockPlugin&&options.LockPlugin[i]=="today"){options.LockPlugin[i]=new Date();}else if(options.LockPlugin[i]){options.LockPlugin[i]=new Date(options.LockPlugin[i]);}})
if(options.ActiveDisableDays&&options.DisableDays){let DisableDays=options.DisableDays;let bookedDates=[];let calendarsIndex=1;let CalendarData=new Date();let ActiveDisableDays=options.ActiveDisableDays==1?true:false;CalendarData.setDate(1);function getAllMondays(y,m,x){const mondays=[];const date=new Date(y+"-"+m+"-01");for(let day=1;day<=31;day++){date.setDate(day);const dayOfWeek=date.getDay();if(dayOfWeek===x){mondays.push(date.getFullYear()+"-"+(date.getMonth()+1>9?date.getMonth()+1:"0"+(date.getMonth()+1))+"-"+(date.getDate()>9?date.getDate():"0"+date.getDate()));}}
return mondays;};function getDateInterval(date){const startDate=new Date(date[0]);const endDate=new Date(date[1]);if(startDate&&endDate){const totalDays=Math.ceil((endDate-startDate)/(1000*60*60*24));const dates=[];for(let i=0;i<=totalDays;i++){const c=new Date(startDate);c.setDate(c.getDate()+i);dates.push(c.getFullYear()+"-"+(c.getMonth()+1>9?c.getMonth()+1:"0"+(c.getMonth()+1))+"-"+(c.getDate()>9?c.getDate():"0"+c.getDate()));}
return dates;}}
let getBookedDates=()=>{let DataYear=CalendarData.getFullYear();let DataMonth=CalendarData.getMonth()+1>9?CalendarData.getMonth()+1+"":"0"+(CalendarData.getMonth()+1);DisableDays.forEach((i)=>{if(i.value){switch(i.rule){case"day":bookedDates=bookedDates.concat(i.value);break;case"week":i.value.map((x)=>{bookedDates=bookedDates.concat(getAllMondays(DataYear,DataMonth,x));})
break;case"month":let month=i.value.map((x)=>{return DataYear+"-"+DataMonth+"-"+x;})
bookedDates=bookedDates.concat(month);break;case"year":let year=i.value.map((x)=>{return DataYear+"-"+x;});bookedDates=bookedDates.concat(year);break;case"range":bookedDates=bookedDates.concat(getDateInterval(i.value));break;}}});}
getBookedDates();options.LockPlugin.filter=(date,picked)=>{const H=bookedDates.includes(date.format('YYYY-MM-DD'));return ActiveDisableDays?!H:H;}
options.LockPlugin.inseparable=true;options.setup=(picker)=>{picker.on('view',(e)=>{const{view,date}=e.detail;if(view=="CalendarHeader"){CalendarData=date;if(calendarsIndex==1){bookedDates=[];}
calendarsIndex++;getBookedDates();}
if(view=="Main"){calendarsIndex=1;}});picker.on('select',(e)=>{setTimeout(()=>{item.trigger("change").trigger("focus");},50)})}}
if(options.lang=="Auto"){if(navigator.language){options.lang=navigator.language;}else{delete options.lang;}}
const picker=new easepick.create(options);$("body").append(item.siblings(".easepick-wrapper"));if(item.data("validate")){item.on("click",function(){if(!item.val()){item.css({"color":"transparent","transition":"none"}).val(".").trigger("blur");setTimeout(()=>{item.val("").css({"color":"","transition":""});},50)}})}});}}
if("object"==typeof easepick){LoadDatepick();}else{LoadDatepickInterval=setInterval(LoadDatepick,10);}};if(e.find(".file-filepond").length){let LoadFilePondInterval='';function LoadFilePond(){if("object"==typeof FilePond){clearInterval(LoadFilePondInterval);e.find(".file-filepond").each(function(){let item=$(this);let textInput=item.siblings('input[type="text"]');let options=item.data("element-options")?item.data("element-options"):{};if(options.maxFiles>1){options['allowMultiple']=true;}
options["instantUpload"]=false;options["credits"]=false;options["allowProcess"]=false;options["maxParallelUploads"]=100000;if(options.maxFileSize){options.maxFileSize=options.maxFileSize+"MB"};options["server"]={process:(fieldName,file,metadata,load,error,progress,abort,transfer,options)=>{PondProgress.push(progress);PondProgressReady++;}};let Pond=FilePond.create(this,options);Pond.on('updatefiles',(file)=>{let length=0;file.forEach(i=>{if(i.status==2){length++;}});if(length){textInput.val(file.length).trigger("blur");}else{textInput.val('');};});Pond.Name=this.name;myPond.push(Pond);});}}
if("object"==typeof FilePond){LoadFilePond();}else{LoadFilePondInterval=setInterval(LoadFilePond,10);}};e.find(".recaptcha-image").each(function(){let e=$(this);e.data("src",e.children("img").attr("src")).on("click",function(){e.children("img").attr("src",e.data("src")+"&v="+(new Date()).getTime());e.siblings("input").val("").trigger("focus");$(this).addClass("active");}).on("mouseout",function(){$(this).removeClass("active");});e.siblings("button").on("click",function(event){event.preventDefault();e.children("img").attr("src",e.data("src")+"&v="+(new Date()).getTime());e.siblings("input").val("").trigger("focus");});});e.find('.inside-element .form-control:not([type="time"]):not(.please-select)').on("focus",function(){$(this).parents(".form-element").addClass("valid");}).on("blur",function(){!$(this).val()&&$(this).parents(".form-element").removeClass("valid");}).each(function(){$(this).parents(".form-element").addClass("fixline");$(this).val()&&$(this).parents(".form-element").addClass("valid");});e.find('.inside-element .form-control[type="time"]').on("focus",function(){$(this).parents(".form-element").addClass("valid");}).each(function(){$(this).parents(".form-element").addClass("valid");});let formObj=e.data("validation")||{};if(formObj.showOneMessage){formObj.maxErrorsPerField=1;}
e.validationEngine2(Object.assign({'custom_error_messages':validationMessage,},formObj));e.removeAttr("data-validation");if(typeof FormBuilderJSignatureLauncher!="undefined"){FormBuilderJSignatureLauncher();}
if(typeof FormBuilderSelect2Launcher!="undefined"){FormBuilderSelect2Launcher();}
e.parents(".form-lightbox").each(function(){let el=$(this);let id=$(this).data("moduleid");let button=$('[data-module="'+id+'"]');let options=el.data("options");let show=true;let isPreview=$("#form-preview").length?true:false;button.on("click",function(){var pr=window.innerWidth-$(window).width();$("html").css({"overflow":"hidden","padding-right":pr});if(el.find("form").length){el.find("form")[0].reset();};dynamicOption(this.dataset);el.stop().fadeIn(200).delay(50).queue(function(){$(this).addClass("active");$(this).dequeue();});});el.find(".form-close").on("click",function(){el.stop().fadeOut(200).delay(50).queue(function(){$(this).removeClass("active");$("html").css({"overflow":"","padding-right":''});$(this).dequeue();});});if(options.LightboxMode){if(options.Frequency=="once"){if(typeof jQuery.cookie=="undefined"){jQuery.cookie=function(key,value,options){if(arguments.length>1&&(value===null||typeof value!=="object")){options=jQuery.extend({},options);if(value===null){options.expires=-1;}
if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
return(document.cookie=[encodeURIComponent(key),'=',options.raw?String(value):encodeURIComponent(String(value)),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
options=value||{};var result,decode=options.raw?function(s){return s;}:decodeURIComponent;return(result=new RegExp('(?:^|; )'+encodeURIComponent(key)+'=([^;]*)').exec(document.cookie))?decode(result[1]):null;};}
if(jQuery.cookie("form_"+id+"_"+(options.Version||1))){show=false;}
if(show||isPreview){var pr=window.innerWidth-$(window).width();setTimeout(function(){$("html").css({"overflow":"hidden","padding-right":pr});el.stop().fadeIn(200).delay(50).queue(function(){$(this).addClass("active");$(this).dequeue();if(!isPreview){jQuery.cookie("form_"+id+"_"+(options.Version||1),true,{expires:options.expiration||1,path:'/'});}});},options.Delay*1000||1000);}}else{var pr=window.innerWidth-$(window).width();setTimeout(function(){$("html").css({"overflow":"hidden","padding-right":pr});el.stop().fadeIn(200).delay(50).queue(function(){$(this).addClass("active");$(this).dequeue();});},options.Delay*1000||1000);}}})})};jQuery(document).ready(function($){if(!$("#form-preview").length){formLauncher();}})
;;;var DNN_COL_DELIMITER=String.fromCharCode(16);var DNN_ROW_DELIMITER=String.fromCharCode(15);var __dnn_m_bPageLoaded=false;if(window.addEventListener){window.addEventListener("load",__dnn_Page_OnLoad,false)}else{window.attachEvent("onload",__dnn_Page_OnLoad)}function __dnn_ClientAPIEnabled(){return typeof(dnn)!="undefined"&&typeof(dnn.dom)!="undefined"}function __dnn_Page_OnLoad(){if(__dnn_ClientAPIEnabled()){dnn.dom.attachEvent(window,"onscroll",__dnn_bodyscroll)}__dnn_m_bPageLoaded=true}function __dnn_KeyDown(iKeyCode,sFunc,e){if(e==null){e=window.event}if(e.keyCode==iKeyCode){eval(unescape(sFunc));return false}}function __dnn_bodyscroll(){var a=document.forms[0];if(__dnn_ClientAPIEnabled()&&__dnn_m_bPageLoaded&&typeof(a.ScrollTop)!="undefined"){a.ScrollTop.value=document.documentElement.scrollTop?document.documentElement.scrollTop:dnn.dom.getByTagName("body")[0].scrollTop}}function __dnn_setScrollTop(c){if(__dnn_ClientAPIEnabled()){if(c==null){c=document.forms[0].ScrollTop.value}var a=dnn.getVar("ScrollToControl");if(a!=null&&a.length>0){var b=dnn.dom.getById(a);if(b!=null){c=dnn.dom.positioning.elementTop(b);dnn.setVar("ScrollToControl","")}}if(document.getElementsByTagName("html")[0].style.overflow!="hidden"){window.scrollTo(0,c)}}}function __dnn_SetInitialFocus(a){var b=dnn.dom.getById(a);if(b!=null&&__dnn_CanReceiveFocus(b)){b.focus()}}function __dnn_CanReceiveFocus(b){if(b.style.display!="none"&&b.tabIndex>-1&&b.disabled==false&&b.style.visible!="hidden"){var a=b.parentElement;while(a!=null&&a.tagName!="BODY"){if(a.style.display=="none"||a.disabled||a.style.visible=="hidden"){return false}a=a.parentElement}return true}else{return false}}function __dnn_ContainerMaxMin_OnClick(i,b){var g=dnn.dom.getById(b);if(g!=null){var e=i.childNodes[0];var l=dnn.getVar("containerid_"+b);var j=dnn.getVar("cookieid_"+b);var d=e.src.toLowerCase().substr(e.src.lastIndexOf("/"));var a;var h;var k;if(dnn.getVar("min_icon_"+l)){k=dnn.getVar("min_icon_"+l)}else{k=dnn.getVar("min_icon")}if(dnn.getVar("max_icon_"+l)){h=dnn.getVar("max_icon_"+l)}else{h=dnn.getVar("max_icon")}a=h.toLowerCase().substr(h.lastIndexOf("index.html"));var c=5;var f=dnn.getVar("animf_"+b);if(f!=null){c=new Number(f)}if(d==a){e.src=k;dnn.dom.expandElement(g,c);e.title=dnn.getVar("min_text");if(j!=null){if(dnn.getVar("__dnn_"+l+":defminimized")=="true"){dnn.dom.setCookie(j,"true",365)}else{dnn.dom.deleteCookie(j)}}else{dnn.setVar("__dnn_"+l+"_Visible","true")}}else{e.src=h;dnn.dom.collapseElement(g,c);e.title=dnn.getVar("max_text");if(j!=null){if(dnn.getVar("__dnn_"+l+":defminimized")=="true"){dnn.dom.deleteCookie(j)}else{dnn.dom.setCookie(j,"false",365)}}else{dnn.setVar("__dnn_"+l+"_Visible","false")}}return true}return false}function __dnn_Help_OnClick(a){var b=dnn.dom.getById(a);if(b!=null){if(b.style.display=="none"){b.style.display=""}else{b.style.display="none"}return true}return false}function __dnn_SectionMaxMin(f,c){var d=dnn.dom.getById(c);if(d!=null){var g=f.getAttribute("max_icon");var e=f.getAttribute("min_icon");var a=f.getAttribute("userctr")!=null;var b;if(d.style.display=="none"){f.src=e;d.style.display="";if(a){b="True"}else{dnn.setVar(f.id+":exp",1)}}else{f.src=g;d.style.display="none";if(a){b="False"}else{dnn.setVar(f.id+":exp",0)}}if(a){dnncore.setUserProp(f.getAttribute("userctr"),f.getAttribute("userkey"),b,null)}return true}return false}function __dnn_enableDragDrop(){var b=dnn.getVar("__dnn_dragDrop").split(";");var e;for(var c=0;c<b.length;c++){e=b[c].split(" ");if(e[0].length>0){var a=dnn.dom.getById(e[0]);var d=dnn.dom.getById(e[1]);if(a!=null&&d!=null){a.setAttribute("moduleid",e[2]);dnn.dom.positioning.enableDragAndDrop(a,d,"__dnn_dragComplete()","__dnn_dragOver()")}}}}var __dnn_oPrevSelPane;var __dnn_oPrevSelModule;var __dnn_dragEventCount=0;function __dnn_dragOver(){__dnn_dragEventCount++;if(__dnn_dragEventCount%75!=0){return}var c=dnn.dom.getById(dnn.dom.positioning.dragCtr.contID);var a=__dnn_getMostSelectedPane(dnn.dom.positioning.dragCtr);if(__dnn_oPrevSelPane!=null){__dnn_oPrevSelPane.pane.style.border=__dnn_oPrevSelPane.origBorder}if(a!=null){__dnn_oPrevSelPane=a;a.pane.style.border="4px double "+DNN_HIGHLIGHT_COLOR;var e=__dnn_getPaneControlIndex(c,a);var b;var f;for(var d=0;d<a.controls.length;d++){if(e>d&&a.controls[d].id!=c.id){b=a.controls[d]}if(e<=d&&a.controls[d].id!=c.id){f=a.controls[d];break}}if(__dnn_oPrevSelModule!=null){dnn.dom.getNonTextNode(__dnn_oPrevSelModule.control).style.border=__dnn_oPrevSelModule.origBorder}if(f!=null){__dnn_oPrevSelModule=f;dnn.dom.getNonTextNode(f.control).style.borderTop="5px groove "+DNN_HIGHLIGHT_COLOR}else{if(b!=null){__dnn_oPrevSelModule=b;dnn.dom.getNonTextNode(b.control).style.borderBottom="5px groove "+DNN_HIGHLIGHT_COLOR}}}}function __dnn_dragComplete(){var f=dnn.dom.getById(dnn.dom.positioning.dragCtr.contID);var d=f.getAttribute("moduleid");if(__dnn_oPrevSelPane!=null){__dnn_oPrevSelPane.pane.style.border=__dnn_oPrevSelPane.origBorder}if(__dnn_oPrevSelModule!=null){dnn.dom.getNonTextNode(__dnn_oPrevSelModule.control).style.border=__dnn_oPrevSelModule.origBorder}var b=__dnn_getMostSelectedPane(dnn.dom.positioning.dragCtr);var e;if(b==null){var a=__dnn_Panes();for(var c=0;c<a.length;c++){if(a[c].id==f.parentNode.id){b=a[c]}}}if(b!=null){e=__dnn_getPaneControlIndex(f,b);__dnn_MoveToPane(b,f,e);dnn.callPostBack("MoveToPane","moduleid="+d,"pane="+b.paneName,"order="+e*2)}}function __dnn_MoveToPane(a,e,d){if(a!=null){var c=new Array();for(var b=d;b<a.controls.length;b++){if(a.controls[b].control.id!=e.id){c[c.length]=a.controls[b].control}dnn.dom.removeChild(a.controls[b].control)}dnn.dom.appendChild(a.pane,e);e.style.top=0;e.style.left=0;e.style.position="relative";for(var b=0;b<c.length;b++){dnn.dom.appendChild(a.pane,c[b])}__dnn_RefreshPanes()}else{e.style.top=0;e.style.left=0;e.style.position="relative"}}function __dnn_RefreshPanes(){var b=dnn.getVar("__dnn_Panes").split(";");var a=dnn.getVar("__dnn_PaneNames").split(";");__dnn_m_aryPanes=new Array();for(var c=0;c<b.length;c++){if(b[c].length>0){__dnn_m_aryPanes[__dnn_m_aryPanes.length]=new __dnn_Pane(dnn.dom.getById(b[c]),a[c])}}}var __dnn_m_aryPanes;var __dnn_m_aryModules;function __dnn_Panes(){if(__dnn_m_aryPanes==null){__dnn_m_aryPanes=new Array();__dnn_RefreshPanes()}return __dnn_m_aryPanes}function __dnn_Modules(a){if(__dnn_m_aryModules==null){__dnn_RefreshPanes()}return __dnn_m_aryModules[a]}function __dnn_getMostSelectedPane(g){var c=new dnn.dom.positioning.dims(g);var f=0;var a;var h;for(var e=0;e<__dnn_Panes().length;e++){var b=__dnn_Panes()[e];var d=new dnn.dom.positioning.dims(b.pane);a=dnn.dom.positioning.elementOverlapScore(d,c);if(a>f){f=a;h=b}}return h}function __dnn_getPaneControlIndex(f,b){if(b==null){return}var a=new dnn.dom.positioning.dims(f);var e;if(b.controls.length==0){return 0}for(var c=0;c<b.controls.length;c++){e=b.controls[c];var d=new dnn.dom.positioning.dims(e.control);if(a.t<d.t){return e.index}}if(e!=null){return e.index+1}else{return 0}}function __dnn_Pane(a,b){this.pane=a;this.id=a.id;this.controls=new Array();this.origBorder=a.style.border;this.paneName=b;var f=0;var e="";for(var d=0;d<a.childNodes.length;d++){var g=a.childNodes[d];if(dnn.dom.isNonTextNode(g)){if(__dnn_m_aryModules==null){__dnn_m_aryModules=new Array()}var c=g.getAttribute("moduleid");if(c!=null&&c.length>0){e+=c+"~";this.controls[this.controls.length]=new __dnn_PaneControl(g,f);__dnn_m_aryModules[c]=g.id;f+=1}}}this.moduleOrder=e}function __dnn_PaneControl(a,b){this.control=a;this.id=a.id;this.index=b;this.origBorder=a.style.border}function __dnn_ShowModalPage(a){dnnModal.show(a,true,550,950,true,"")}function __dnncore(){this.GetUserVal=0;this.SetUserVal=1}__dnncore.prototype={getUserProp:function(b,c,a){this._doUserCallBack(dnncore.GetUserVal,b,c,null,new dnncore.UserPropArgs(b,c,a))},setUserProp:function(c,d,a,b){this._doUserCallBack(dnncore.SetUserVal,c,d,a,new dnncore.UserPropArgs(c,d,b))},_doUserCallBack:function(c,d,e,a,b){if(dnn&&dnn.xmlhttp){var f=c+COL_DELIMITER+d+COL_DELIMITER+e+COL_DELIMITER+a;dnn.xmlhttp.doCallBack("__Page",f,dnncore._callBackSuccess,b,dnncore._callBackFail,null,true,null,0)}else{alert("Client Personalization not enabled")}},_callBackSuccess:function(a,b,c){if(b.pFunc){b.pFunc(b.namingCtr,b.key,a)}},_callBackFail:function(a,b){window.status=a}};__dnncore.prototype.UserPropArgs=function(b,c,a){this.namingCtr=b;this.key=c;this.pFunc=a};var dnncore=new __dnncore();
;;;(function($){if(typeof dnn=='undefined')window.dnn={};if(typeof dnn.searchSkinObject=='undefined'){dnn.searchSkinObject=function(options){var settings={delayTriggerAutoSearch:100,minCharRequiredTriggerAutoSearch:2,searchType:'S',enableWildSearch:true,cultureCode:'en-US'};this.settings=$.extend({},settings,options);};dnn.searchSkinObject.prototype={_ignoreKeyCodes:[9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45],init:function(){var throttle=null,self=this;var makeUrl=function(val,service){var url=service?service.getServiceRoot('internalservices')+'searchService/preview':null;if(!url)return null;var params={};params['keywords']=val.replace(/^\s+|\s+$/g,'');if(!self.settings.enableWildSearch)params["forceWild"]="0";params['culture']=self.settings.cultureCode;if(self.settings.portalId>=0)
params['portal']=self.settings.portalId;var urlAppend=[];$.each(params,function(index,value){urlAppend.push([index,encodeURIComponent(value)].join('='));});if(urlAppend.length){url+=url.indexOf('?')===-1?'?':'&';url+=urlAppend.join('&');}
return url;};var generatePreviewTemplate=function(data,$wrap){var preview=$('.searchSkinObjectPreview',$wrap);if(preview.length)
preview.remove();var markup='<ul class="searchSkinObjectPreview">';if(data&&data.length){for(var i=0;i<data.length;i++){var group=data[i];if(group.Results&&group.Results.length){var groupTitle=group.DocumentTypeName;markup+='<li class="searchSkinObjectPreview_group">'+groupTitle+'</li>';for(var j=0;j<group.Results.length;j++){var item=group.Results[j];var itemTitle=item.Title;var itemUrl=item.DocumentUrl;var itemDescription=item.Description;var itemSnippet=item.Snippet;markup+='<li data-url="'+itemUrl+'">';if(item.Attributes.Avatar){markup+='<span><img src="'+item.Attributes.Avatar+'" class="userpic" /></span>';}
markup+='<span>'+itemTitle+'</span>';if(itemDescription){markup+='<p>'+itemDescription+'</p>';}
if(itemSnippet){markup+='<p>'+itemSnippet+'</p>';}
markup+='</li>';}}}
var moreResults=$wrap.attr('data-moreresults');markup+='<li><a href="javascript:void(0)" class="searchSkinObjectPreview_more">'+moreResults+'</a></li>';markup+='</ul>';}
else{var noResult=$wrap.attr('data-noresult');markup+='<li>'+noResult+'</li></ul>';}
$wrap.append(markup);preview=$('.searchSkinObjectPreview',$wrap);$('li',preview).on('click',function(){var navigateUrl=$(this).attr('data-url');if(navigateUrl){window.location.href=navigateUrl;}
return false;});$('.searchSkinObjectPreview_more',$wrap).on('click',function(){var $searchButton=$wrap.next();if(!$searchButton.length){$searchButton=$wrap.parent().next();}
$searchButton[0].click();return false;});};$('.searchInputContainer a.dnnSearchBoxClearText').on('click',function(){var $this=$(this);var $wrap=$this.parent();$('.searchInputContainer input').val('').focus();$this.removeClass('dnnShow');$('.searchSkinObjectPreview',$wrap).remove();return false;});$('.searchInputContainer').next().on('click',function(){var $this=$(this);var inputBox=$this.prev().find('input[type="text"]');var val=inputBox.val();if(val.length){return true;}
return false;});$('.searchInputContainer input').on('keyup',function(e){var k=e.keyCode||e.witch;if($.inArray(k,self._ignoreKeyCodes)>-1)return;var $this=$(this);var $wrap=$this.parent();var val=$this.val();var container=$this.parent('.searchInputContainer');if(!val){$('a.dnnSearchBoxClearText',$wrap).removeClass('dnnShow');$('.searchSkinObjectPreview',$wrap).remove();}else{$('a.dnnSearchBoxClearText',$wrap).addClass('dnnShow');if(self.settings.searchType!='S'||val.length<self.settings.minCharRequiredTriggerAutoSearch)return;if(throttle){clearTimeout(throttle);delete throttle;}
throttle=setTimeout(function(){var service=$.dnnSF?$.dnnSF(-1):null;var url=makeUrl(val,service);if(url){$.ajax({url:url,beforeSend:service?service.setModuleHeaders:null,success:function(result){if(result)
generatePreviewTemplate(result,container);},error:function(){},type:'GET',dataType:'json',contentType:"application/json"});}},self.settings.delayTriggerAutoSearch);}}).on('paste',function(){$(this).triggerHandler('keyup');}).on('keypress',function(e){var k=e.keyCode||e.which;if(k==13){var $this=$(this);var $wrap=$this.parent();var val=$this.val();if(val.length){var $searchButton=$wrap.next();if(!$searchButton.length){$searchButton=$wrap.parent().next();}
$searchButton[0].click();e.preventDefault();}else{e.preventDefault();}}});}};}})(jQuery);
;;;(function($){$.dnnSF=function(moduleId){var base=this;base.getServiceRoot=function(moduleName){var serviceRoot=dnn.getVar("sf_siteRoot","index.html");serviceRoot+="API/"+moduleName+"/";return serviceRoot;};base.getTabId=function(){return dnn.getVar("sf_tabId",-1);};base.getModuleId=function(){return moduleId;};base.setModuleHeaders=function(xhr){var tabId=base.getTabId();if(tabId>-1){xhr.setRequestHeader("ModuleId",base.getModuleId());xhr.setRequestHeader("TabId",tabId);}var afValue=base.getAntiForgeryValue();if(afValue){xhr.setRequestHeader("RequestVerificationToken",afValue);}};base.getAntiForgeryKey=function(){return"__RequestVerificationToken";};base.getAntiForgeryValue=function(){return $('[name="__RequestVerificationToken"]').val();};return base;};$.ServicesFramework=function(moduleId){return new $.dnnSF(moduleId);};})(jQuery);
;;;