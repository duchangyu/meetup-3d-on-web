/* linezing page click data collect
 * dingqiu@taobao
 */(function(){function a(){if(!e)return;try{console.log.apply(console,arguments)}catch(t){}}function f(e,t){var n="getAttributeNode";return(e[n]?(e[n](t)||{}).nodeValue:e.getAttribute(t)||e[t])||null}function x(){w||(w=+(new Date));var e=+(new Date),t=d[c]("LineZing");if(!t){e-w<=E&&setTimeout(x,100);return}y=t;if(y._init){a("return");return}y._init=1;var n,r,i=["shopid","pagetype","pageid","tmplid","itemid","ssver"],s=[0,"index","item",0,"page"];for(var o=0,u=i.length;o<u;++o){n=i[o],r=f(y,n);if(!r)continue;if(n=="pagetype"){r=s[r];if(!r)return}S[n]=r}n=r=null,a(S);if(!S.shopid)return;if(!S.pagetype.match(/^(?:index|page|item)$/))return;S.url=location.href.replace(/#.*$/,""),S.cl=0,S.ca=0,a("init",S),S.pagetype=="index"?S.pageid=S.shopid:S.pagetype=="item"&&(S.pageid=S.itemid),m.addEventListener?m.addEventListener("click",T,!1):m.attachEvent?m.attachEvent("onclick",T):m.onclick=T}function T(t){try{t||(t=window.event);if(!t)return;var r=t.target||t.srcElement,i=[];if(!r)return;++S.ca;function s(e){var t;return e&&(t=e[p])&&t[h]()}i.unshift(r);if(s(r)!=="area")while(r&&s(r)!=="a"&&s(r)!=="html")r=r.parentNode,i.unshift(r);var o,u,f;b?(o=t.clientX+Math.max(m.scrollLeft,v.scrollLeft),u=t.clientY+Math.max(m.scrollTop,v.scrollTop)):(o=t.pageX,u=t.pageY),f=Math.max(v.scrollWidth,m.scrollWidth),o-=f/2;function c(e){var t=[],n,r,i;for(var o=0,u=e.length;o<u;++o){n=e[o];if(!n)continue;r=s(n),r==="div"&&(r=""),r+=n.id?"#"+n.id:"",i=n.className||n["class"],i&&(i=i.replace(/^ +| +$/g,"").split(/ +/g),i&&i.length&&(r+="."+i.join("."))),t.push(r)}return t.join(">")}var d;if(r&&s(r).match(/^area|a$/)&&(d=r.href)&&!d.match(/^javascript:/)){var g=s(r);++S.cl,function(e,t){var n=4-e.length,t=e[0];if(n>1)while(n-->0&&(t=t.parentNode))e.unshift(t);else e.unshift(t.parentNode)}(i,r);var y=g+":"+(r.__lid||function(e){var t=m[l](g),n=t.length,r;for(var i=0;i<n;++i)r=t[i],r.__lid=""+i;return r=t=null,e.__lid}(r));f=A().join(":"),a("link ws, x, y->",f,o,u),C({linkid:y,linkurl:d,x:o,y:u,ws:f,el:c(i)}),r=r.target,(!r||r=="_self"||r=="_top")&&M()}else n&&(f=A().join(":"),a("link ws, x, y->",f,o,u),C({linkid:"",linkurl:"",x:o,y:u,ws:f,el:c(i.slice(-4))}));i=null}catch(w){if(e)throw w}}function C(e){var n=[],r,i;for(r in S)n.push(r+"="+g(S[r]));if(e)for(r in e)n.push(r+"="+g(e[r]));(!e||!e.rnd)&&n.push("rnd="+(Math.random()*1e5|0)),(!e||!e.cna)&&n.push("cna="+g((d.cookie.match(/cna=([^;]+)/)||["",""])[1])),n=t+n.join("&"),k(n)}function k(e){function n(){--N,t.onload=null;try{y.removeChild(t)}catch(e){}}var t=d.createElement("img");t.style.display="none",y.appendChild(t),t.onload=n,t.src=e,++N,a("sending",e.replace(/&/g,"\n"))}function L(){if(u.length<=0)return;o=(new Date).getTime();var e=A().join(":");C({linkid:"",linkurl:"",x:u.length,y:u.join(";"),ws:e}),u.length=0}function A(){var e=window.innerWidth?window.innerWidth:v&&v.clientWidth?v.clientWidth:m.offsetWidth,t=window.innerHeight?window.innerHeight:v&&v.clientHeight?v.clientHeight:m.offsetHeight;return[e,t]}function M(){if(O)return;O=1;var e=new Date,t=e.getTime()+90;for(;;)if((new Date).getTime()>t){O=0;return}}var e=!1,t="http://hotclick.app.linezing.com/hotclick.gif?",n=!0,r=10,i=2e3,s,o=0,u=[],l="getElementsByTagName",c="getElementById",h="toLowerCase",p="nodeName",d=document,v=d.documentElement,m=d.body,g=encodeURIComponent,y,b=!!navigator.userAgent.match(/msie (?:\d+)/i),w=0,E=6500,S={},N=0,O=0;x()})()