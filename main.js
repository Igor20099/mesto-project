(()=>{"use strict";var e=document.querySelector(".popup_edit-profile"),t=e.querySelector(".popup__form"),n=e.querySelector(".popup__edit-input_type_name"),r=e.querySelector(".popup__edit-input_type_about"),o=e.querySelector(".popup__close-button"),c=document.querySelector(".popup_add-card"),a=c.querySelector(".popup__close-button"),u=c.querySelector(".popup__edit-input_type_link-image"),i=c.querySelector(".popup__form"),l=c.querySelector(".popup__edit-input_type_name"),s=document.querySelector(".popup_fullsize-image"),p=s.querySelector(".popup__image"),d=s.querySelector(".popup__image-title"),_=s.querySelector(".popup__close-button"),f=i.querySelector(".popup__save-button"),m=t.querySelector(".popup__save-button"),v=document.querySelector(".popup_edit-avatar"),y=v.querySelector(".popup__close-button"),h=v.querySelector(".popup__save-button"),S=v.querySelector(".popup__edit-input_type_avatar");function b(e){"Escape"===e.key&&g(document.querySelector(".popup_opened"))}function q(e){e.classList.add("popup_opened"),document.addEventListener("keydown",b)}function g(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",b)}var L={baseUrl:"https://nomoreparties.co/v1/plus-cohort-17",headers:{authorization:"e9f29ecd-7473-4cd5-991b-c4f08c138626","Content-Type":"application/json"}},k=document.querySelector(".elements"),C=document.querySelector("#element").content;function E(e,t,n){var r=e.querySelector(".element__like-button"),o=e.querySelector(".element__like-count");t.length>0?t.forEach((function(e){e._id===n.id?r.classList.add("element__like-button_active"):r.classList.remove("element__like-button_active")})):r.classList.remove("element__like-button_active"),o.textContent=t.length}function x(e,t){var n=C.querySelector(".element").cloneNode(!0);return n.querySelector(".element__like-button"),n.id=e._id,n.querySelector(".element__image").src=e.link,n.querySelector(".element__image").alt=e.name,n.querySelector(".element__image").addEventListener("click",(function(){p.src=n.querySelector(".element__image").src,p.alt=n.querySelector(".element__image").alt,d.textContent=n.querySelector(".element__image").alt,q(s)})),n.querySelector(".element__title").textContent=e.name,t.id===e.owner._id&&n.querySelector(".element__remove-button").classList.add("element__remove-button_active"),E(n,e.likes,t),function(e){e.querySelector(".element__remove-button").addEventListener("click",(function(){var t;(t=e.id,fetch("".concat(L.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:L.headers})).then((function(){return e.remove()})).catch((function(e){console.log(e)}))}))}(n),n}var j,A=document.querySelector(".profile"),P=A.querySelector(".profile__name"),U=A.querySelector(".profile__about"),T=A.querySelector(".profile__image"),w=A.querySelector(".profile__edit-button"),B=A.querySelector(".profile__add-button"),M=A.querySelector(".profile__edit-image-button");function O(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}Promise.all([fetch("".concat(L.baseUrl,"/users/me"),{headers:L.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(L.baseUrl,"/cards"),{headers:L.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return D(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];A.id=o._id,P.textContent=o.name,U.textContent=o.about,T.src=o.avatar,c.forEach((function(e){var t=x(e,A),n=t.querySelector(".element__like-button");n.addEventListener("click",(function(){var r;n.classList.contains("element__like-button_active")?function(e){return fetch("".concat(L.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:L.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(e._id).then((function(e){E(t,e.likes,A)})).catch((function(e){console.log(e)})):(r=e._id,fetch("".concat(L.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:L.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){E(t,e.likes,A)})).catch((function(e){console.log(e)}))})),k.append(t)}))})).catch((function(e){console.log(e)})),w.addEventListener("click",(function(){var o,c,a,u;o=t,c={inputSelector:".popup__input",errorMessage:".popup__input-error",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},a=Array.from(o.querySelectorAll(c.inputSelector)),u=Array.from(o.querySelectorAll(c.errorMessage)),a.forEach((function(e){e.classList.contains(c.inputErrorClass)&&e.classList.remove(c.inputErrorClass)})),u.forEach((function(e){e.classList.contains(c.errorClass)&&e.classList.remove(c.errorClass)})),n.value=P.textContent,r.value=U.textContent,m.disable=!1,m.classList.remove("popup__save-button_inactive"),q(e)})),o.addEventListener("click",(function(){g(e)})),t.addEventListener("submit",(function(t){t.preventDefault(),m.textContent="Сохранение...";var o,c,a=n.value,u=r.value;P.textContent=a,U.textContent=u,(o=a,c=u,fetch("".concat(L.baseUrl,"/users/me"),{method:"PATCH",headers:L.headers,body:JSON.stringify({name:o,about:c})})).finally((function(){m.textContent="Сохранить"})),g(e)})),M.addEventListener("click",(function(){q(v)})),y.addEventListener("click",(function(){g(v)})),v.addEventListener("submit",(function(e){e.preventDefault(),h.textContent="Сохранение...";var t,n=S.value;(t=n,fetch("".concat(L.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:L.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){console.log(n),T.src=e.avatar,T.alt=e.avatar,g(v)})).catch((function(e){console.log(e)})).finally((function(){h.textContent="Сохранить"}))})),B.addEventListener("click",(function(){f.disable=!0,f.classList.add("popup__save-button_inactive"),q(c)})),a.addEventListener("click",(function(){g(c)})),i.addEventListener("submit",(function(e){var t,n;e.preventDefault(),f.textContent="Создание...",(t=l.value,n=u.value,fetch("".concat(L.baseUrl,"/cards"),{method:"POST",headers:L.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){l.value="",u.value="",k.prepend(x(e,A)),g(c)})).catch((function(e){console.log(e)})).finally((function(){f.textContent="Создать"}))})),_.addEventListener("click",(function(){g(s)})),document.addEventListener("click",(function(t){t.target===e?g(e):t.target===c?g(c):t.target===s?g(s):t.target===v&&g(v)})),j={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(j.formSelector)).forEach((function(e){var t,n,r,o,c,a,u,i;t=e,n=j.inputSelector,r=j.submitButtonSelector,o=j.inactiveButtonClass,c=j.inputErrorClass,a=j.errorClass,u=Array.from(t.querySelectorAll(n)),i=t.querySelector(r),O(u,i,o),u.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""}(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(t,e,c,a),O(u,i,o)}))}))}))})();