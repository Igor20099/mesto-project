(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{Lu:()=>I,R$:()=>z,mG:()=>J});var t=document.querySelector(".popup_edit-profile"),n=t.querySelector(".popup__form"),o=t.querySelector(".popup__edit-input_type_name"),r=t.querySelector(".popup__edit-input_type_about"),c=t.querySelector(".popup__close-button"),a=document.querySelector(".popup_add-card"),i=a.querySelector(".popup__close-button"),u=a.querySelector(".popup__edit-input_type_link-image"),l=a.querySelector(".popup__form"),s=a.querySelector(".popup__edit-input_type_name"),p=document.querySelector(".popup_fullsize-image"),d=p.querySelector(".popup__image"),f=p.querySelector(".popup__image-title"),_=p.querySelector(".popup__close-button"),v=l.querySelector(".popup__save-button"),m=n.querySelector(".popup__save-button"),y=document.querySelector(".popup_edit-avatar"),h=y.querySelector(".popup__close-button"),b=y.querySelector(".popup__save-button"),S=y.querySelector(".popup__edit-input_type_avatar");function q(e){"Escape"===e.key&&g(document.querySelector(".popup_opened"))}function L(e){e.classList.add("popup_opened"),document.addEventListener("keydown",q)}function g(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",q)}var k=document.querySelector(".elements"),E=document.querySelector("#element").content;function C(e,t,n){var o=e.querySelector(".element__like-button"),r=e.querySelector(".element__like-count");t.length>0?t.forEach((function(e){e._id===n.id?o.classList.add("element__like-button_active"):o.classList.remove("element__like-button_active")})):o.classList.remove("element__like-button_active"),r.textContent=t.length}function j(e,t){var n=E.querySelector(".element").cloneNode(!0),o=n.querySelector(".element__like-button"),r=n.querySelector(".element__image"),c=n.querySelector(".element__title");if(n.id=e._id,r.src=e.link,r.alt=e.name,r.addEventListener("click",(function(){d.src=r.src,d.alt=r.alt,f.textContent=r.alt,L(p)})),c.textContent=e.name,t.id===e.owner._id){var a=n.querySelector(".element__remove-button");a.classList.add("element__remove-button_active"),a.addEventListener("click",(function(){z(n)}))}return o.addEventListener("click",(function(){o.classList.contains("element__like-button_active")?J(n,e,t):I(n,e,t)})),C(n,e.likes,t),n}var x=document.querySelector(".profile"),A=x.querySelector(".profile__name"),P=x.querySelector(".profile__about"),U=x.querySelector(".profile__image"),O=x.querySelector(".profile__edit-button"),w=x.querySelector(".profile__add-button"),T=x.querySelector(".profile__edit-image-button");function M(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}var D={baseUrl:"https://nomoreparties.co/v1/plus-cohort-17",headers:{authorization:"e9f29ecd-7473-4cd5-991b-c4f08c138626","Content-Type":"application/json"}};function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active",errorMessage:".popup__input-error"};function I(e,t,n){var o;(o=t._id,fetch("".concat(D.baseUrl,"/cards/likes/").concat(o),{method:"PUT",headers:D.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){C(e,t.likes,n)})).catch((function(e){console.log(e)}))}function J(e,t,n){var o;(o=t._id,fetch("".concat(D.baseUrl,"/cards/likes/").concat(o),{method:"DELETE",headers:D.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){C(e,t.likes,n)})).catch((function(e){console.log(e)}))}function z(e){var t;(t=e.id,fetch("".concat(D.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:D.headers})).then((function(){return e.remove()})).catch((function(e){console.log(e)}))}Promise.all([fetch("".concat(D.baseUrl,"/users/me"),{headers:D.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(D.baseUrl,"/cards"),{headers:D.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(o=n.next()).done)&&(c.push(o.value),!t||c.length!==t);a=!0);}catch(e){i=!0,r=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw r}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return B(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];x.id=r._id,A.textContent=r.name,P.textContent=r.about,U.src=r.avatar,c.forEach((function(e){var t=j(e,x);k.append(t)}))})).catch((function(e){console.log(e)})),O.addEventListener("click",(function(){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=Array.from(e.querySelectorAll(t.errorMessage));n.forEach((function(e){e.classList.contains(t.inputErrorClass)&&e.classList.remove(t.inputErrorClass)})),o.forEach((function(e){e.classList.contains(t.errorClass)&&e.classList.remove(t.errorClass)}))}(n,N),o.value=A.textContent,r.value=P.textContent,m.disable=!1,m.classList.remove("popup__save-button_inactive"),L(t)})),c.addEventListener("click",(function(){g(t)})),n.addEventListener("submit",(function(e){e.preventDefault(),m.textContent="Сохранение...",console.log("ok");var n,c,a=o.value,i=r.value;(n=a,c=i,fetch("".concat(D.baseUrl,"/users/me"),{method:"PATCH",headers:D.headers,body:JSON.stringify({name:n,about:c})})).then((function(){A.textContent=a,P.textContent=i})).catch((function(e){console.log(e)})).finally((function(){m.textContent="Сохранить"})),g(t)})),T.addEventListener("click",(function(){L(y)})),h.addEventListener("click",(function(){g(y)})),y.addEventListener("submit",(function(e){e.preventDefault(),b.textContent="Сохранение...";var t,n=S.value;(t=n,fetch("".concat(D.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:D.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){console.log(n),U.src=e.avatar,U.alt=e.avatar,g(y)})).catch((function(e){console.log(e)})).finally((function(){b.textContent="Сохранить"}))})),w.addEventListener("click",(function(){v.disable=!0,v.classList.add("popup__save-button_inactive"),L(a)})),i.addEventListener("click",(function(){g(a)})),l.addEventListener("submit",(function(e){var t,n;e.preventDefault(),v.textContent="Создание...",(t=s.value,n=u.value,fetch("".concat(D.baseUrl,"/cards"),{method:"POST",headers:D.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){s.value="",u.value="",k.prepend(j(e,x)),g(a)})).catch((function(e){console.log(e)})).finally((function(){v.textContent="Создать"}))})),_.addEventListener("click",(function(){g(p)})),document.addEventListener("click",(function(e){e.target===t?g(t):e.target===a?g(a):e.target===p?g(p):e.target===y&&g(y)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n,o,r,c,a,i,u,l;n=t,o=e.inputSelector,r=e.submitButtonSelector,c=e.inactiveButtonClass,a=e.inputErrorClass,i=e.errorClass,u=Array.from(n.querySelectorAll(o)),l=n.querySelector(r),M(u,l,c),u.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.classList.remove(o),r.textContent=""}(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(n,e,a,i),M(u,l,c)}))}))}))}(N)})();