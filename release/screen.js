var t;!function(t){t.landscape="landscape",t.portrait="portrait"}(t||(t={}));class n{get size(){return this.current.size}constructor(){this.elements=new Map,this.current={width:document.body.clientWidth,orientation:t.landscape,size:"md",sizing:{}},this.sizes=["xs","sm","md","lg","xl"],this.styles="\n    :root {\n      --screen-xs: 576px;\n      --screen-sm: 768px;\n      --screen-md: 992px;\n      --screen-lg: 1140px;\n      --screen-xl: 99999px;\n    }\n    [hidden] { display: none !important }\n    .screen-xs [hidden-xs], .screen-xs[hidden-xs] { display: none !important }\n    .screen-sm [hidden-sm], .screen-sm[hidden-sm] { display: none !important }\n    .screen-md [hidden-md], .screen-md[hidden-md] { display: none !important }\n    .screen-lg [hidden-lg], .screen-lg[hidden-lg] { display: none !important }\n    .screen-xl [hidden-xl], .screen-xl[hidden-xl] { display: none !important }\n    .no-pad { padding: 0 }\n    .no-margin { margin: 0 }\n    .no-border { border: 0 }\n    .no-scroll, .no-scroll *:not(.yes-scroll) {\n      overscroll-behavior: none !important;\n      overflow: hidden !important;\n    }\n  ",window.addEventListener("resize",(()=>{this.trackWidth(),this.update()})),window.screen.orientation.addEventListener("change",(()=>{this.trackOrientation(),this.update()}))}init(){this.initializeSizing(),this.trackWidth(),this.trackOrientation()}initializeSizing(){for(const t of this.sizes)this.current.sizing[t]=this.getSizeFromCss(t)}getSizeFromCss(t){return parseInt(getComputedStyle(document.body).getPropertyValue(`--screen-${t}`).replace("px",""))}trackWidth(){this.current.width=document.body.clientWidth;for(const t of this.sizes)if(this.current.width<this.current.sizing[t]){this.current.size=t;break}}trackOrientation(){if(["landscape","landscape-primary","landscape-secondary"].indexOf(window.screen.orientation.type)>-1)return void(this.current.orientation=t.landscape);["portrait","portrait-primary","portrait-secondary"].indexOf(window.screen.orientation.type)>-1?this.current.orientation=t.portrait:this.current.orientation=void 0}isSize(t){return this.current.size===t}sync(t,n={width:!0}){this.elements.has(t)||(this.elements.set(t,n),this.updateElement(t))}unsync(t){this.elements.delete(t),this.clearElement(t)}clear(){for(const t of this.elements.keys())this.updateElement(t)}clearElement(n){for(const t of this.sizes)this.removeClass(n,`screen-${t}`);this.removeClass(n,t.landscape),this.removeClass(n,t.portrait)}update(){for(const t of this.elements.keys())this.updateElement(t)}updateElement(n){const s=this.elements.get(n);if(s?.width)for(const t of this.sizes)this.current.size===t?this.addClass(n,`screen-${t}`):this.removeClass(n,`screen-${t}`);if(s?.orientation)switch(this.current.orientation){case t.landscape:this.addClass(n,t.landscape),this.removeClass(n,t.portrait);break;case t.portrait:this.addClass(n,t.portrait),this.removeClass(n,t.landscape);break;default:this.removeClass(n,t.portrait),this.removeClass(n,t.landscape)}}lockScroll(t){return(t=t||document.body)&&this.addClass(t,"no-scroll"),()=>{this.removeClass(document.body,"no-scroll"),t&&this.removeClass(t,"no-scroll")}}addAttribute(t,n,s=""){t.setAttribute(n,s)}removeAttribute(t,n){t.removeAttribute(n)}toggleAttribute(t,n,s,i=""){void 0===s&&(s=t.hasAttribute(n)),s?this.addAttribute(t,n,i):this.removeAttribute(t,n)}addClass(t,n){t.classList.contains(n)||t.classList.add(n)}removeClass(t,n){for(;t.classList.contains(n);)t.classList.remove(n)}async wait(t=1){return await new Promise((n=>setTimeout((()=>n(void 0)),t)))}}let s=window?.$screen;if(!s){s=new n,window.$screen=s;const t=document.createElement("style");t.setAttribute("mo-screen",""),t.innerHTML=s.styles,document.head.appendChild(t),s.init()}export{n as Screen,s as screen};