import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as s}from"./assets/vendor-BbbuE1sJ.js";document.querySelector(".form").addEventListener("submit",function(o){o.preventDefault();const r=document.querySelector('input[name="delay"]'),t=parseInt(r.value),i=document.querySelector('input[name="state"]:checked').value;new Promise((e,n)=>{setTimeout(()=>{i==="fulfilled"?e(t):n(t)},t)}).then(e=>{s.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{s.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=2-snackbar.js.map