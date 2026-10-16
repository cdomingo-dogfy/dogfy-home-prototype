// Popup promo «Rasca la caja»: se abre al hacer clic en cualquier enlace a Nutricionistas.
// Paso 1: rascar la caja (canvas) descubre el 10% DTO. Paso 2: email para recibirlo. Paso 3: confirmación.
(()=>{
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const css=`
.pz{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:16px;background:rgba(24,20,17,.82);opacity:0;visibility:hidden;transition:opacity .3s ease,visibility 0s .3s}
.pz.is-open{opacity:1;visibility:visible;transition:opacity .3s ease}
.pz-box{position:relative;width:100%;max-width:440px;max-height:calc(100dvh - 32px);overflow:auto;background:#FFFAE5;border-radius:28px;padding:40px 28px 28px;text-align:center;color:#565049;font-family:var(--font-body,"DM Sans",system-ui,sans-serif);transform:translateY(16px) scale(.98);transition:transform .35s cubic-bezier(.22,.61,.36,1);box-shadow:0 30px 60px -20px rgba(0,0,0,.5)}
.pz.is-open .pz-box{transform:none}
.pz-x{position:absolute;top:12px;right:12px;width:44px;height:44px;border:0;border-radius:50%;background:#fff;color:#2a2724;display:grid;place-items:center;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.pz-x:focus-visible,.pz button:focus-visible,.pz input:focus-visible{outline:3px solid #f2c94c;outline-offset:3px}
.pz-eye{display:inline-block;padding:0 40px;font-size:14px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#5b78d6;margin-bottom:8px}
.pz h2{font-family:var(--font-display,"Urbanist",system-ui,sans-serif);font-weight:800;font-size:32px;line-height:1.1;color:#2a2724;margin:0 0 8px}
.pz p{font-size:17px;line-height:1.45;margin:0}
.pz-scr{position:relative;width:min(100%,300px);aspect-ratio:1;margin:24px auto 16px;border-radius:24px;overflow:hidden;background:url("assets/blob-bg-1-blanco.svg") center/82% no-repeat,#FFE9A3;touch-action:none;user-select:none;-webkit-user-select:none}
.pz-prize{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:#2a2724}
.pz-prize small{font-size:16px;font-weight:600}
.pz-prize b{font-family:var(--font-display,"Urbanist",system-ui,sans-serif);font-weight:800;font-size:72px;line-height:1;letter-spacing:-.02em}
.pz-prize span{font-size:15px}
.pz canvas{position:absolute;inset:0;width:100%;height:100%;cursor:grab;transition:opacity .6s ease}
.pz canvas.is-gone{opacity:0;pointer-events:none}
.pz-tag{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:#fff;color:#2a2724;font-size:14px;font-weight:700;letter-spacing:.04em;white-space:nowrap;pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,.18);transition:opacity .3s}
.pz-tag svg{color:#5b78d6}
.pz-scr.is-scratching .pz-tag,.pz-scr.is-done .pz-tag{opacity:0}
.pz-skip{background:none;border:0;padding:10px;font:inherit;font-size:15px;color:#565049;text-decoration:underline;text-underline-offset:3px;cursor:pointer;min-height:44px}
.pz-cta{display:flex;align-items:center;justify-content:center;width:100%;min-height:56px;border:0;border-radius:999px;background:#fa592d;color:#fff;font:inherit;font-size:18px;font-weight:700;cursor:pointer;margin-top:16px;text-decoration:none}
.pz-step[hidden]{display:none}
.pz-step2 h2{margin-top:4px}
.pz-badge{display:inline-grid;place-items:center;width:112px;height:112px;margin:0 auto 16px;background:url("assets/blob-bg-2-amarillo.svg") center/contain no-repeat;font-family:var(--font-display,"Urbanist",system-ui,sans-serif);font-weight:800;font-size:28px;line-height:1;color:#2a2724}
.pz form{margin-top:20px;text-align:left}
.pz label{display:block;font-size:15px;font-weight:600;color:#2a2724;margin-bottom:6px}
.pz input[type=email]{width:100%;height:52px;border:1.5px solid #c9c2b8;border-radius:14px;background:#fff;padding:0 16px;font:inherit;font-size:17px;color:#2a2724}
.pz input[aria-invalid=true]{border-color:#c0392b}
.pz-err{min-height:20px;font-size:14px;color:#c0392b;margin-top:6px}
.pz-note{text-align:center;font-size:14px!important;margin-top:12px!important;color:#565049}
.pz-ok{display:grid;place-items:center;width:72px;height:72px;margin:0 auto 16px;border-radius:50%;background:#DBEAFE;color:#5b78d6}
@media (max-width:480px){.pz-box{padding:36px 20px 22px;border-radius:24px}.pz h2{font-size:28px}.pz-prize b{font-size:64px}}
@media (prefers-reduced-motion:reduce){.pz,.pz-box,.pz canvas{transition:none}.pz-box{transform:none}}
body.pz-lock{overflow:hidden}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const ic={x:'<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
hand:'<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14c3-1 5-4 8-4s4 3 8 2M5 19c3-1 6-4 9-4s3 2 6 1" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
ok:'<svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'};
const root=document.createElement('div');root.className='pz';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-labelledby','pzT1');
root.innerHTML=`<div class="pz-box">
<button type="button" class="pz-x" aria-label="Cerrar">${ic.x}</button>
<div class="pz-step pz-step1">
  <span class="pz-eye">Un regalo para tu perro</span>
  <h2 id="pzT1">Prueba suerte</h2>
  <p>Rasca la caja para descubrir tu premio</p>
  <div class="pz-scr">
    <div class="pz-prize" aria-live="polite"><small>Has desbloqueado</small><b>10%</b><span>de descuento extra</span></div>
    <canvas aria-hidden="true"></canvas>
    <span class="pz-tag">${ic.hand} RASCA LA CAJA</span>
  </div>
  <button type="button" class="pz-skip">Descubrir sin rascar</button>
</div>
<div class="pz-step pz-step2" hidden>
  <div class="pz-badge" aria-hidden="true">10%</div>
  <h2 id="pzT2">Tienes un 10% extra</h2>
  <p>Déjanos tu email y te enviamos el código para tu primer pedido.</p>
  <form novalidate>
    <label for="pzMail">Tu email</label>
    <input id="pzMail" type="email" autocomplete="email" inputmode="email" placeholder="nombre@email.com" required aria-describedby="pzErr">
    <div class="pz-err" id="pzErr" role="alert"></div>
    <button type="submit" class="pz-cta">Consigue tu 10%</button>
    <p class="pz-note">Te llega al momento. Sin spam.</p>
  </form>
</div>
<div class="pz-step pz-step3" hidden>
  <div class="pz-ok" aria-hidden="true">${ic.ok}</div>
  <h2 id="pzT3" tabindex="-1">¡Listo! Revisa tu email</h2>
  <p>Tu código del 10% ya va de camino. Úsalo al crear su menú.</p>
  <button type="button" class="pz-cta pz-close2">Seguir navegando</button>
</div></div>`;
document.body.appendChild(root);
const $=s=>root.querySelector(s),steps=[$('.pz-step1'),$('.pz-step2'),$('.pz-step3')];
const scr=$('.pz-scr'),cv=$('canvas'),ctx=cv.getContext('2d');
const img=new Image();img.src='assets/promo-caja.jpg';
let done=false,drawing=false,last=null,after=null,lastFocus=null;

const paint=()=>{const r=scr.getBoundingClientRect(),d=devicePixelRatio||1;cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);ctx.setTransform(d,0,0,d,0,0);ctx.globalCompositeOperation='source-over';
  if(img.complete&&img.naturalWidth)ctx.drawImage(img,0,0,r.width,r.height);else{ctx.fillStyle='#e8562b';ctx.fillRect(0,0,r.width,r.height);}
  ctx.globalCompositeOperation='destination-out';ctx.lineCap=ctx.lineJoin='round';ctx.lineWidth=Math.max(36,r.width*.14);};
img.onload=()=>{if(!done&&root.classList.contains('is-open'))paint();};
const pt=e=>{const r=cv.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];};
const cleared=()=>{const {width:w,height:h}=cv,data=ctx.getImageData(0,0,w,h).data;let n=0,t=0;for(let i=3;i<data.length;i+=4*24){t++;if(data[i]<40)n++;}return n/t;};
const reveal=()=>{if(done)return;done=true;cv.classList.add('is-gone');scr.classList.add('is-done');setTimeout(()=>show(1),RM?400:1400);};
cv.addEventListener('pointerdown',e=>{if(done)return;drawing=true;scr.classList.add('is-scratching');cv.setPointerCapture(e.pointerId);last=pt(e);ctx.beginPath();ctx.arc(last[0],last[1],ctx.lineWidth/2,0,7);ctx.fill();});
cv.addEventListener('pointermove',e=>{if(!drawing||done)return;const p=pt(e);ctx.beginPath();ctx.moveTo(last[0],last[1]);ctx.lineTo(p[0],p[1]);ctx.stroke();last=p;});
const end=()=>{if(!drawing)return;drawing=false;if(cleared()>.45)reveal();};
cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
$('.pz-skip').addEventListener('click',()=>{reveal();});

const show=i=>{steps.forEach((s,j)=>s.hidden=j!==i);root.setAttribute('aria-labelledby','pzT'+(i+1));const f=i===1?$('#pzMail'):i===2?$('#pzT3'):null;if(f)f.focus();};
const focusables=()=>[...root.querySelectorAll('button,input')].filter(el=>!el.closest('[hidden]'));
const open=href=>{after=href||null;lastFocus=document.activeElement;done=false;cv.classList.remove('is-gone');scr.classList.remove('is-done','is-scratching');$('#pzMail').value='';$('#pzErr').textContent='';$('#pzMail').removeAttribute('aria-invalid');show(0);
  root.classList.add('is-open');document.body.classList.add('pz-lock');requestAnimationFrame(()=>{paint();$('.pz-x').focus();});};
const close=()=>{root.classList.remove('is-open');document.body.classList.remove('pz-lock');if(after){location.href=after;return;}if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});};
$('.pz-x').addEventListener('click',close);$('.pz-close2').addEventListener('click',close);
root.addEventListener('click',e=>{if(e.target===root)close();});
addEventListener('keydown',e=>{if(!root.classList.contains('is-open'))return;if(e.key==='Escape'){e.preventDefault();close();}
  if(e.key==='Tab'){const f=focusables(),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}}});
$('form').addEventListener('submit',e=>{e.preventDefault();const m=$('#pzMail'),ok=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m.value.trim());
  if(!ok){m.setAttribute('aria-invalid','true');$('#pzErr').textContent='Escribe un email válido, por ejemplo nombre@email.com';m.focus();return;}
  m.removeAttribute('aria-invalid');$('#pzErr').textContent='';show(2);});
addEventListener('resize',()=>{if(root.classList.contains('is-open')&&!done)paint();});

// Disparador: enlaces a Nutricionistas. En la home se deja que haga scroll a la sección detrás del popup; desde otras páginas se abre aquí y al cerrar se va a la home
document.addEventListener('click',e=>{const a=e.target.closest('a[href$="#nutricionistas"]');if(!a)return;
  const sameDoc=a.pathname===location.pathname||!!document.getElementById('nutricionistas');
  if(sameDoc){setTimeout(()=>open(null),RM?0:350);}else{e.preventDefault();open(a.href);}});
})();
