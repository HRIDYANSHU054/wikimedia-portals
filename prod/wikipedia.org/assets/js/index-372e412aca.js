function addEvent(e,t,n){e&&(e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&(attachedEvents.push([e,t,n]),e.attachEvent("on"+t,n)))}function removeEvent(e,t,n){e&&(e.removeEventListener?e.removeEventListener(t,n):e.detachEvent&&e.detachEvent("on"+t,n))}function doWhenReady(e){var t=function(){removeEvent(document,"DOMContentLoaded",t),removeEvent(window,"load",t),e()};"complete"===document.readyState?e():(addEvent(document,"DOMContentLoaded",t),addEvent(window,"load",t))}function getIso639(e){var t=e&&e.match(/^\w+/);if(t)return t="nb"===t[0]?"no":t[0]}function getDevicePixelRatio(){return void 0!==window.devicePixelRatio?window.devicePixelRatio:void 0!==window.msMatchMedia?window.msMatchMedia("(min-resolution: 192dpi)").matches?2:window.msMatchMedia("(min-resolution: 144dpi)").matches?1.5:1:1}function localizeTopTen(){function e(e){var t;try{t=JSON.parse(e)}catch(n){t=""}return t}function t(e){for(var t=[],n=0;n<e.length;n++){var r=e[n].getAttribute("lang");t.push(r)}return t}function n(){for(u=0;u<d.length;u++){var e=d[u],t=p.indexOf(e),n=t>=0,r=t===u;n?r||p.splice(u,0,p.splice(t,1)[0]):(p.splice(u,0,e),p.pop())}}function r(e,t){var n=e.getElementsByTagName("a")[0],r=t.name.replace(/<\/?[^>]+(>|$)/g,"");n.setAttribute("href","//"+t.url),n.setAttribute("id","js-link-box-"+t.lang),n.setAttribute("data-slogan",t.slogan||"The Free Encyclopedia"),n.setAttribute("title",r+" — "+t.siteName+" — "+(t.slogan||"")),e.setAttribute("lang",t.lang),e.getElementsByTagName("strong")[0].textContent=r,e.getElementsByTagName("small")[0].textContent=t.numPages+"+ "+(t.articles||"")}function a(e){for(var t=document.querySelectorAll(".central-featured-lang"),n=!0,r=0;r<t.length&&n===!0;r++){var a=t[r].getAttribute("lang");n=e.indexOf(a)>=0}for(r=0;r<t.length&&n===!0;r++){var o=t[r],i=o.className,s="central-featured-lang lang"+(r+1);i!==s&&(o.className=s)}}function o(){var e,t=d[0],n=document.getElementById("js-link-box-"+t);n&&(e=n.getAttribute("data-slogan")||"The free encyclopedia",h.textContent=e,h.className="localized-slogan")}function i(t,n){var i=new XMLHttpRequest;i.open("GET",encodeURI("portal/wikipedia.org/assets/translations/"+n+".json"),!0),i.onload=function(){if(200===i.status){var s=e(this.responseText);s&&(r(t,s),o(),a(p),v=e(mw.storage.get("storedTranslations"))||{},v[n]=s,mw.storage.set("storedTranslations",JSON.stringify(v)))}},i.send()}function s(e,t){var n=v;n[t]?r(e,n[t]):i(e,t)}function l(e,t){for(var n=null,r=t.length-1;r>=0&&null===n;r--){var a=e[r].getAttribute("lang");t.indexOf(a)<0&&(n=e[r])}return n}function c(){for(u=0;u<p.length;u++){var e=document.querySelectorAll(".central-featured-lang"),t=p[u],n=document.querySelector(".central-featured-lang[lang="+t+"]");if(n){var r=Array.prototype.indexOf.call(e,n);r!==u&&m.insertBefore(n,e[u])}else{var a=l(e,p);s(a,t),m.insertBefore(a,e[u])}}}var u,d=wmTest.userLangs,g=document.querySelectorAll(".central-featured-lang"),m=document.querySelector(".central-featured"),h=document.getElementById("js-localized-slogan"),p=t(g),f=mw.storage.get("translationHash"),v=e(mw.storage.get("storedTranslations"))||{};f!==translationsHash&&(mw.storage.set("translationHash",translationsHash),mw.storage.remove("storedTranslations")),n(),c(),a(p),o(),h.style.visibility="visible",m.style.visibility="visible"}window.JSON||(window.JSON={parse:function(sJSON){return eval("("+sJSON+")")},stringify:function(){var e=Object.prototype.toString,t=Array.isArray||function(t){return"[object Array]"===e.call(t)},n={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t"},r=function(e){return n[e]||"\\u"+(e.charCodeAt(0)+65536).toString(16).substr(1)},a=/[\\"\u0000-\u001F\u2028\u2029]/g;return function o(n){if(null==n)return"null";if("number"==typeof n)return isFinite(n)?n.toString():"null";if("boolean"==typeof n)return n.toString();if("object"==typeof n){if("function"==typeof n.toJSON)return o(n.toJSON());if(t(n)){for(var i="[",s=0;s<n.length;s++)i+=(s?", ":"")+o(n[s]);return i+"]"}if("[object Object]"===e.call(n)){var l=[];for(var c in n)n.hasOwnProperty(c)&&l.push(o(c)+": "+o(n[c]));return"{"+l.join(", ")+"}"}}return'"'+n.toString().replace(a,r)+'"'}}()}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var n;if(null==this)throw new TypeError('"this" is null or not defined');var r=Object(this),a=r.length>>>0;if(0===a)return-1;var o=+t||0;if(Math.abs(o)===1/0&&(o=0),o>=a)return-1;for(n=Math.max(o>=0?o:a-Math.abs(o),0);a>n;){if(n in r&&r[n]===e)return n;n++}return-1}),function(){window.document.querySelectorAll||(document.querySelectorAll=document.body.querySelectorAll=Object.querySelectorAll=function(e,t,n,r,a){var o=document,i=o.createStyleSheet();for(a=o.all,t=[],e=e.replace(/\[for\b/gi,"[htmlFor").split(","),n=e.length;n--;){for(i.addRule(e[n],"k:v"),r=a.length;r--;)a[r].currentStyle.k&&t.push(a[r]);i.removeRule(0)}return t})}(),document.querySelector||(document.querySelector=function(e){var t=document.querySelectorAll(e);return t.length?t[0]:null}),Function.prototype.bind||(Function.prototype.bind=function(e){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},a=function(){return n.apply(this instanceof r?this:e,t.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(r.prototype=this.prototype),a.prototype=new r,a}),Object.defineProperty&&Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(Element.prototype,"textContent")&&!Object.getOwnPropertyDescriptor(Element.prototype,"textContent").get&&!function(){var e=Object.getOwnPropertyDescriptor(Element.prototype,"innerText");Object.defineProperty(Element.prototype,"textContent",{get:function(){return e.get.call(this)},set:function(t){return e.set.call(this,t)}})}(),window.Element&&!Element.prototype.matches&&(Element.prototype.matches=function e(t){for(var e=(this.document||this.ownerDocument).querySelectorAll(t),n=e.length;--n>=0&&e.item(n)!==this;);return n>-1}),window.attachedEvents=[],window.onunload=function(){var e,t;for(e=0;e<attachedEvents.length;e++)t=attachedEvents[e],t[0]&&t[0].detachEvent("on"+t[1],t[2]);attachedEvents=[]};var _=_||{};_.now=Date.now||function(){return(new Date).getTime()},_.throttle=function(e,t,n){var r,a,o,i=null,s=0;n||(n={});var l=function(){s=n.leading===!1?0:_.now(),i=null,o=e.apply(r,a),i||(r=a=null)};return function(){var c=_.now();s||n.leading!==!1||(s=c);var u=t-(c-s);return r=this,a=arguments,0>=u||u>t?(i&&(clearTimeout(i),i=null),s=c,o=e.apply(r,a),i||(r=a=null)):i||n.trailing===!1||(i=setTimeout(l,u)),o}},_.debounce=function(e,t,n){var r,a,o,i,s,l=function(){var c=_.now()-i;t>c&&c>=0?r=setTimeout(l,t-c):(r=null,n||(s=e.apply(o,a),r||(o=a=null)))};return function(){o=this,a=arguments,i=_.now();var c=n&&!r;return r||(r=setTimeout(l,t)),c&&(s=e.apply(o,a),o=a=null),s}};var mw=mw||{};mw.html=function(){function e(e){switch(e){case"'":return"&#039;";case'"':return"&quot;";case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;"}}return{escape:function(t){return t.replace(/['"<>&]/g,e)},element:function(e,t,n){var r,a,o="<"+e;for(a in t){if(r=t[a],r===!0)r=a;else if(r===!1)continue;o+=" "+a+'="'+this.escape(String(r))+'"'}if(void 0===n||null===n)return o+="/>";switch(o+=">",typeof n){case"string":o+=this.escape(n);break;case"number":case"boolean":o+=String(n);break;default:if(n instanceof this.Raw)o+=n.value;else{if(!(n instanceof this.Cdata))throw new Error("mw.html.element: Invalid type of contents");if(/<\/[a-zA-z]/.test(n.value))throw new Error("mw.html.element: Illegal end tag found in CDATA");o+=n.value}}return o+="</"+e+">"},Raw:function(e){this.value=e},Cdata:function(e){this.value=e}}}(),mw.storage={localStorage:window.localStorage,get:function(e){try{return mw.storage.localStorage.getItem(e)}catch(t){}return!1},set:function(e,t){try{return mw.storage.localStorage.setItem(e,t),!0}catch(n){}return!1},remove:function(e){try{return mw.storage.localStorage.removeItem(e),!0}catch(t){}return!1}},function(e){e.RegExp={escape:function(e){return e.replace(/([\\{}()|.?*+\-\^$\[\]])/g,"\\$1")}}}(mw),function(){"use strict";var e,t,n="http://bits.beta.wmflabs.org/event.gif",r=[];/www.wikipedia.org/.test(location.hostname)&&(n="//www.wikipedia.org/beacon/event"),t={extend:function(e,t){var n,r={};for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&e[n]&&(r[n]=e[n]);for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&t[n]&&(r[n]=t[n]);return r},noop:function(){}};for(var a=0;256>a;a++)r[a]=(a+256).toString(16).slice(1);e=window.eventLoggingLite={schema:{},maxUrlSize:2e3,byteToHex:r,checkUrlSize:function(t,n){var r;return n.length>e.maxUrlSize?r="Url exceeds maximum length":void 0},generateRandomSessionId:function(){var t,n,r,a=new Array(8),o=window.crypto||window.msCrypto;if(o&&o.getRandomValues)t=new Uint8Array(8),o.getRandomValues(t);else for(t=new Array(8),n=0;8>n;n++)0===(3&n)&&(r=4294967296*Math.random()),t[n]=r>>>((3&n)<<3)&255;for(n=0;8>n;n++)a[n]=e.byteToHex[t[n]];return a.join("")},validate:function(e,t){var n,r,a,o=[];if(!t||!t.properties)return o.push("Missing or empty schema"),o;for(n in e)t.properties.hasOwnProperty(n)||o.push("Undeclared property: "+n);for(n in t.properties)a=t.properties[n],e.hasOwnProperty(n)?(r=e[n],a["enum"]&&a.required&&-1===a["enum"].indexOf(r)&&o.push('Value "'+JSON.stringify(r)+'" for property "'+n+'" is not one of '+JSON.stringify(a["enum"]))):a.required&&o.push("Missing property:",n);return o},prepare:function(n,r){for(var a=t.extend(n.defaults,r),o=e.validate(a,n);o.length;)console.log(o[o.length-1]),o.pop();return{event:a,revision:n.revision||-1,schema:n.name,webHost:location.hostname,wiki:"metawiki"}},makeBeaconUrl:function(e){var t=encodeURIComponent(JSON.stringify(e));return n+"?"+t+";"},sendBeacon:/1|yes/.test(navigator.doNotTrack)||!n?t.noop:navigator.sendBeacon?function(e){try{navigator.sendBeacon(e)}catch(t){}}:function(e){document.createElement("img").src=e},logEvent:function(t,n){var r=e.prepare(t,n),a=e.makeBeaconUrl(r),o=e.checkUrlSize(t,a);o||e.sendBeacon(a)}}}(),window.wmTest=function(e,t){"use strict";function n(){function e(e){var n=getIso639(e);n&&t.indexOf(n)<0&&t.push(n)}var t=[];for(var n in navigator.languages)e(navigator.languages[n]);return e(navigator.language),e(navigator.userLanguage),e(navigator.browserLanguage),e(navigator.systemLanguage),t}function r(e,t){var n=parseInt(e.slice(0,13),16);return n%t===0}function a(e){var t="rejected";return r(e,l)&&(t="baseline"),t}var o,i,s=e.generateRandomSessionId(),l=2,c=9e5,u={GROUP:"portal_test_group",SESSION_ID:"portal_session_id",EXPIRES:"portal_test_group_expires"},d=!1;if(i=n(),/www.wikipedia.org/.test(location.hostname)&&(l=200),d)o=location.hash.slice(1);else if(window.localStorage&&!/1|yes/.test(navigator.doNotTrack)){var g=t.storage.get(u.GROUP),m=t.storage.get(u.SESSION_ID),h=t.storage.get(u.EXPIRES),p=(new Date).getTime();h&&m&&g&&p<parseInt(h,10)?(s=m,o="null"===g?null:g):(o=a(s),t.storage.set(u.SESSION_ID,s),t.storage.set(u.GROUP,o)),t.storage.set(u.EXPIRES,p+c)}else o="rejected";return{loggingDisabled:d,sessionId:s,userLangs:i,group:o,populationSize:l,getTestGroup:a}}(eventLoggingLite,mw),function(e,t){"use strict";function n(e,t){var n,r,a={};for(n=0;n<t.length;n++){var o=t[n].nodes;for(r=0;r<o.length;r++)o[r].contains(e)&&(a=t[n])}return a.name}function r(e){return"A"!==e.tagName&&e.parentElement?r(e.parentElement):e}function a(){u={event_type:"landing"},e.logEvent(s,u),u=null}function o(t){var a,o=t||window.event,i=o.target||o.srcElement;i.matches("a, a *")&&(a=r(i),u={event_type:"clickthrough",destination:a.href,section_used:n(a,l)},u.section_used&&e.logEvent(s,u))}function i(t){var r=t||window.event,a=r.target||r.srcElement;null===u&&(u={event_type:"clickthrough",section_used:n(a,l),destination:a.action}),u.section_used&&e.logEvent(s,u)}var s,l,c,u,d=document.cookie.match(/GeoIP=.[^:]/);if("rejected"!==t.group&&!t.loggingDisabled){s={name:"WikipediaPortal",revision:14377354,defaults:{session_id:t.sessionId,event_type:"landing",referer:document.referrer||null,accept_language:t.userLangs.toString(),cohort:t.group},properties:{session_id:{type:"string",required:!0},event_type:{type:"string",required:!0,"enum":["landing","clickthrough"]},section_used:{type:"string",required:!1,"enum":["primary links","search","language search","secondary links","other languages","other projects"]},destination:{type:"string",required:!1},referer:{type:"string",required:!1},country:{type:"string",required:!1},accept_language:{type:"string",required:!0},cohort:{type:"string",required:!1}}},l=[{name:"primary links",nodes:document.querySelectorAll('[data-el-section="primary links"]')},{name:"search",nodes:document.querySelectorAll('[data-el-section="search"]')},{name:"language search",nodes:document.querySelectorAll('[data-el-section="language search"]')},{name:"secondary links",nodes:document.querySelectorAll('[data-el-section="secondary links"]')},{name:"other languages",nodes:document.querySelectorAll('[data-el-section="other languages"]')},{name:"other projects",nodes:document.querySelectorAll('[data-el-section="other projects"]')}],addEvent(document,"click",o),c=document.getElementsByTagName("form");for(var g=0;g<c.length;g++)addEvent(c[g],"submit",i);d&&(s.defaults.country=d.toString().split("=")[1],addEvent(window,"load",a)),addEvent(window,"load",a)}}(eventLoggingLite,wmTest);var WMTypeAhead=function(e,t){function n(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n+"="+encodeURIComponent(e[n]));return t.join("&")}function r(){setTimeout(function(){h.innerHTML="";var e=document.getElementById("api_opensearch");e&&(e.src=!1),y.clear()},300)}function a(e,t){if(c=encodeURIComponent(t)||"en",u=encodeURIComponent(e),0===u.length)return void r();var a=document.getElementById("api_opensearch"),o=document.getElementsByTagName("head")[0],i="//"+c+".wikipedia.org/w/api.php?";a&&o.removeChild(a),a=document.createElement("script"),a.id="api_opensearch";var s=window.callbackStack.addCallback(window.portalOpensearchCallback),l={action:"query",format:"json",generator:"prefixsearch",prop:"pageprops|pageimages|pageterms",redirects:"",ppprop:"displaytitle",piprop:"thumbnail",pithumbsize:v,pilimit:w,wbptterms:"description",gpssearch:e,gpsnamespace:0,gpslimit:w,callback:"callbackStack.queue["+s+"]"};a.src=i+n(l),o.appendChild(a)}function o(e,t){var n=mw.html.escape(mw.RegExp.escape(t)),r=new RegExp(n,"i"),a=e.search(r),o=mw.html.escape(e);if(a>=0){var i=a+n.length,s=e.substring(a,i),l=e.substring(0,a),c=e.substring(i,e.length);o=l+mw.html.element("em",{"class":"suggestion-highlight"},s)+c}return o}function i(e){for(var t='<div class="suggestions-dropdown">',n=0;n<e.length;n++)if(e[n]){var r,a,i,s,l,d=e[n],g=!1,m="",h=d.terms&&d.terms.description?d.terms.description:"";d.thumbnail&&d.thumbnail.source&&(g=d.thumbnail.source.replace(/\"/g,"%22"),g=g.replace(/'/g,"%27")),h&&(m="object"==typeof h&&h[0]?h[0].toString():h.toString()),l=mw.html.element("p",{"class":"suggestion-description"},m),s=mw.html.element("h3",{"class":"suggestion-title"},new mw.html.Raw(o(d.title,u))),i=mw.html.element("div",{"class":"suggestion-text"},new mw.html.Raw(s+l)),a=mw.html.element("div",{"class":"suggestion-thumbnail",style:g?"background-image:url("+g+")":!1},""),r=mw.html.element("a",{"class":"suggestion-link",href:"https://"+c+".wikipedia.org/wiki/"+encodeURIComponent(d.title.replace(/ /gi,"_"))},new mw.html.Raw(i+a)),t+=r}return t+="</div>"}function s(e,t){for(var n=" active",r=0;r<t.length;r++){var a=t[r];a!==e?a.className=a.className.replace(n,""):/ active/.test(e.className)?e.className=e.className.replace(n,""):(e.className+=n,y.setIndex(r))}}function l(e){var t=e||window.event,n=t.which||t.keyCode;if(h.firstChild){if(40===n||38===n){var r,a=h.firstChild.childNodes;r=40===n?y.increment(1):y.increment(-1),g=a?a[r]:!1,s(g,a)}13===n&&g&&(t.preventDefault?t.preventDefault():t.returnValue=!1,g.children[0].click())}}var c,u,d,g,m="typeahead-suggestions",h=document.getElementById(m),p=document.getElementById(e),f=document.getElementById(t),v=80*getDevicePixelRatio(),w=6;h||(h=document.createElement("div"),h.id=m,p.appendChild(h)),window.callbackStack={queue:{},index:-1,incrementIndex:function(){return this.index+=1,this.index},addCallback:function(e){var t=this.incrementIndex();return this.queue[t]=e(t),t},deleteSelfFromQueue:function(e){delete this.queue[e]},deletePrevCallbacks:function(e){this.deleteSelfFromQueue(e);for(var t in this.queue)e>t&&(this.queue[t]=this.deleteSelfFromQueue.bind(window.callbackStack,t))}};var y={index:-1,max:w,setMax:function(e){this.max=e},increment:function(e){return this.index+=e,this.index<0&&this.setIndex(this.max-1),this.index===this.max&&this.setIndex(0),this.index},setIndex:function(e){return e<=this.max-1&&(this.index=e),this.index},clear:function(){this.setIndex(-1)}};return window.portalOpensearchCallback=function(e){var t=e;return function(e){if(window.callbackStack.deletePrevCallbacks(t),document.activeElement===f){var n=[],r=e.query&&e.query.pages?e.query.pages:[];for(var a in r){var o=r[a];n[o.index-1]=o}var l=i(n);y.setMax(n.length),y.clear(),h.innerHTML=l,d=h.childNodes[0].childNodes;for(var c=0;c<d.length;c++){var u=d[c];addEvent(u,"mouseenter",s.bind(this,u,d)),addEvent(u,"mouseleave",s.bind(this,u,d))}}}},addEvent(f,"keydown",l),addEvent(f,"blur",r),{typeAheadEl:h,query:a}};!function(e,t){var n,r=document.getElementById("searchInput"),a=new t("search-input","searchInput");n="oninput"in document?"input":"propertychange",addEvent(r,n,_.debounce(function(){a.query(r.value,document.getElementById("searchLanguage").value)},100))}(wmTest,WMTypeAhead),localizeTopTen(),function(){"use strict";function e(e){return document.getElementById(e)}function t(e){var t,n;document.querySelector&&"www-wiktionary-org"===document.body.id&&!e.match(/\W/)&&(t=document.querySelector('option[lang|="'+e+'"]'),n=t&&t.getAttribute("data-logo"),n&&document.body.setAttribute("data-logo",n))}function n(){var e=navigator.languages&&navigator.languages[0]||navigator.language||navigator.userLanguage||"";return e.toLowerCase().split("-")[0]}function r(){var e=document.cookie.match(/(?:^|\W)searchLang=([^;]+)/);return(e?e[1]:n()).toLowerCase()}function a(e,t){for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}function o(t){var n,r,o="data-convert-hans",i="data-converttitle-hans";if(-1!=="zh-hans,zh-cn,zh-sg,zh-my,".indexOf(t+",")){var s=["zh_art","zh_others","zh_search","zh_tag","zh_top10","zh-yue_wiki","gan_wiki","hak_wiki","wuu_wiki"];for(n=0;n<s.length;n+=1)r=e(s[n]),r&&(r.hasAttribute(o)&&a(r,r.getAttribute(o)),r.hasAttribute(i)&&(r.title=r.getAttribute(i)))}}function i(t){var n;0===t.indexOf("zh")&&(n=t.substring(3),"mo"===n?n="hk":"my"===n&&(n="sg"),n&&"cn,tw,hk,sg,".indexOf(n+",")>=0&&(e("zh_wiki").href+="zh-"+n+"/",e("zh_others").href=e("zh_others").href.replace("wiki/","zh-"+n+"/")),o(t))}function s(e){if(e){var r=n(),a=r.match(/^\w+/),o=new Date;t(e),a&&a[0]===e?o.setTime(o.getTime()-1):o.setFullYear(o.getFullYear()+1),document.cookie="searchLang="+e+";expires="+o.toUTCString()+";domain="+location.host+";"}}function l(e,t){var n,r,a,o,i={ratio:1};for(n=t.split(/ *, */),a=0;a<n.length;a++)r=n[a].match(/\s*(\S+)(?:\s*([\d.]+)w)?(?:\s*([\d.]+)h)?(?:\s*([\d.]+)x)?\s*/),o=r[4]&&parseFloat(r[4]),e>=o&&o>i.ratio&&(i.ratio=o,i.src=r[1],i.width=r[2]&&parseFloat(r[2]),i.height=r[3]&&parseFloat(r[3]));return i}function c(){var e,t,n=getDevicePixelRatio(),r=new Image;if(n>1&&void 0===r.srcset)for(e=document.getElementsByTagName("img"),t=0;t<e.length;t++){var a,o=e[t],i=o.getAttribute("srcset");"string"==typeof i&&""!==i&&(a=l(n,i),void 0!==a.src&&(o.setAttribute("src",a.src),void 0!==a.width&&o.setAttribute("width",a.width),void 0!==a.height&&o.setAttribute("height",a.height)))}}doWhenReady(function(){var n,o,s,l,c,u,d,g,m,h=r();if(h&&(i(h),n=getIso639(h),o=e("searchLanguage"))){for(s=o.getElementsByTagName("option"),l=0,c=s.length;!u&&c>l;l+=1)s[l].value===n&&(u=n);!u&&document.querySelector&&(d=document.querySelector('.langlist a[lang|="'+n+'"]'),d&&(u=n,g=document.createElement("option"),g.setAttribute("lang",n),g.setAttribute("value",n),m=d.textContent||d.innerText||n,a(g,m),o.appendChild(g))),u&&(o.value=u,t(u))}}),doWhenReady(function(){var t,n,r,a=e("searchInput"),o=e("searchLanguage");if(a)for(a.setAttribute("results","10"),void 0===a.autofocus?a.focus():window.scroll(0,0),t=location.search&&location.search.substr(1).split("&"),n=0;n<t.length;n+=1)if(r=t[n].split("="),"search"===r[0]&&r[1]){a.value=decodeURIComponent(r[1].replace(/\+/g," "));break}addEvent(o,"change",function(){o.blur(),s(o.value)})}),doWhenReady(function(){var e=document.searchwiki&&document.searchwiki.elements.uselang;e&&(e.value=n())}),doWhenReady(c)}(),window.mw||(window.mw=window.mediaWiki={loader:{state:function(){}}});