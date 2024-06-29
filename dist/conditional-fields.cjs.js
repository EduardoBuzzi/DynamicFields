"use strict";var e=Object.defineProperty,t=(t,i,s)=>((t,i,s)=>i in t?e(t,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[i]=s)(t,"symbol"!=typeof i?i+"":i,s)
/*! conditional-fields - v0.1.0 */;class i{constructor(e){t(this,"triggerSelector"),t(this,"trigger"),t(this,"value"),t(this,"clearOnHide"),t(this,"affectedFields"),t(this,"affectedBlock"),t(this,"initialCheck",!0),this.triggerSelector=e.triggerSelector,this.trigger=s.createField(this.triggerSelector),this.value="string"==typeof e.value?[e.value]:e.value,this.clearOnHide=e.clearOnHide??!0,this.initialCheck=e.initialCheck??!0,this.affectedFields=e.affected.fields.map((t=>(e.affected.parentSelector&&!t.parentSelector&&(t.parentSelector=e.affected.parentSelector),s.createField(t.selector,t.required,t.associatedElements,t.parentSelector)))).filter((e=>null!==e)),e.affected.block&&(this.affectedBlock=document.querySelector(e.affected.block),this.affectedBlock.classList.add("dcf__animated")),this.initialize(),i.addUtilityClasses()}initialize(){this.trigger.addEventListener((()=>{this.check()})),this.initialCheck&&this.check()}check(e=null){let t=!1;if(e)t=this.value.includes(e);else{const e=this.trigger.getValues().filter((e=>e));t=0!==e.length&&e.some((e=>this.value.includes(e)))}this.updateVisibility(t),this.updateRequired(t),!t&&this.clearOnHide&&this.clearFields()}updateVisibility(e){var t;if(this.affectedBlock)return this.affectedBlock.classList.toggle("dcf__hidden",!e);null==(t=this.affectedFields)||t.forEach((t=>{t.toggleVisibility(e)}))}updateRequired(e){var t;null==(t=this.affectedFields)||t.forEach((t=>{t.setRequired(e)}))}clearFields(){var e;null==(e=this.affectedFields)||e.forEach((e=>{this.clearOnHide&&e.clear()}))}static addUtilityClasses(){if(!document.getElementById("dcf-utility-styles")){const e=document.createElement("style");e.id="dcf-utility-styles",e.innerHTML=".dcf__hidden{display:none!important}.dcf__animated{animation:dcf__appear .5s ease-in-out 1;transition-property:display,max-height;transition-duration:.5s;transition-behavior:allow-discrete;max-height:1000px}.dcf__animated.dcf__hidden{animation:dcf__disappear .5s ease-in-out 1;max-height:0}@keyframes dcf__appear{0%{opacity:0;max-height:0}to{opacity:1;max-height:1000px}}@keyframes dcf__disappear{0%{opacity:1;max-height:1000px;display:block!important}to{opacity:0;max-height:0;display:none!important}}",document.head.appendChild(e)}}}class s{constructor(e,i=!1,s,a){t(this,"selector"),t(this,"elements"),t(this,"required"),t(this,"associatedElements"),t(this,"parentSelector"),this.selector=e,this.required=i,this.elements=this.getElements(e),this.parentSelector=a,s&&(this.associatedElements=this.getElements(s)),this.addClass(this.elements)}static createField(e,t=!1,i,s){let n;if(!(n=document.querySelector(e)))throw new Error(`No elements found for selector: ${e}`);return"INPUT"===n.tagName?new a(e,t,i,s):"SELECT"===n.tagName?new r(e,t,i,s):"TEXTAREA"===n.tagName?new l(e,t,i,s):new c(e,t,i,s)}getElements(e){const t=document.querySelectorAll(Array.isArray(e)?e.join(","):e);if(0===t.length)throw new Error(`No elements found for selector: ${e}`);return Array.from(t)}addClass(e){e.forEach((e=>{e.classList.add("dcf__animated")})),this.parentSelector&&e.forEach((e=>{var t;const i=null==(t=this.parentSelector)?void 0:t.call(this,e);i&&i.classList.add("dcf__animated")})),this.associatedElements&&this.associatedElements.forEach((e=>{e.classList.add("dcf__animated")}))}addEventListener(e,t=this.getEventName()){t&&this.elements.forEach((i=>{i.addEventListener(t,e)}))}setRequired(e){!this.required&&e||this.elements.forEach((t=>{t.required=e}))}toggleVisibility(e){const t=e?"remove":"add";this.parentSelector?this.elements.forEach((e=>{var i;const s=null==(i=this.parentSelector)?void 0:i.call(this,e);s?s.classList[t]("dcf__hidden"):e.classList[t]("dcf__hidden")})):(this.elements.forEach((e=>{e.classList[t]("dcf__hidden")})),this.associatedElements&&this.associatedElements.forEach((e=>{e.classList[t]("dcf__hidden")})))}}class a extends s{clear(){this.elements.forEach((e=>{const t=e;"checkbox"===t.type||"radio"===t.type?t.checked=!1:t.value=""}))}getValues(){const e=[];return this.elements.forEach((t=>{const i=t;"checkbox"===i.type||"radio"===i.type?i.checked&&e.push(i.value):e.push(i.value)})),e}getEventName(){const e=this.elements[0].type;return"checkbox"===e||"radio"===e||"file"===e?"change":"input"}setRequired(e){"checkbox"!==this.elements[0].type&&super.setRequired(e)}}class r extends s{clear(){this.elements.forEach((e=>{e.selectedIndex=0}))}getValues(){return this.elements.map((e=>e.value))}getEventName(){return"change"}}class l extends s{clear(){this.elements.forEach((e=>{e.value=""}))}getValues(){return this.elements.map((e=>e.value))}getEventName(){return"input"}}class c extends s{clear(){}getValues(){return this.elements.map((e=>e.textContent||""))}getEventName(){return null}}"undefined"!=typeof window&&(window.setupConditionalFields=function(e){if(!e||!e.length)throw new Error("No configuration provided");e.forEach((function(e){new i(e)}))});