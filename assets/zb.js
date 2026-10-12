/* ===================================================================
   CHINOÉTALES — landing built to the Zauberberg reference model.
   Virtual scroll (the page never natively scrolls): wheel/touch/keys
   drive one offset; two identical lists translate together. The back
   copy is dimmed + edge-masked; the front copy is clipped to a band at
   dead centre, so the row crossing centre reads solid white = active.
   The list is repeated so it loops forever.
   =================================================================== */
(function(){
  'use strict';
  const home = document.getElementById('home');
  if(!home) return;
  const REDUCED = matchMedia('(prefers-reduced-motion:reduce)').matches;

  const ROW  = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--zb-row')) || 20;
  const BAND = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--zb-band')) || 18;

  const yt = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const DIR = 'video/proj/';
  const START_AT = 'Sparsha Sangeet';   // the reel always opens on this one

  const FALLBACK_PROJECTS = [
    { t: "Ajambari Jhari", slug: "ahjambari-jhari" },
    { t: "Alvida", slug: "alvida" },
    { t: "Bhagyamaani", slug: "bhayemani" },
    { t: "Dhun", slug: "dhun" },
    { t: "Fijeko Kesh", slug: "fijeko-kesh" },
    { t: "Fir Kabhi", slug: "fir-khabi" },
    { t: "Ghara Ko Kancho Choro", slug: "ghara-ko-kancho-choro" },
    { t: "Hajar Janma", slug: "hajar-janma" },
    { t: "Hamro Maya", slug: "hamro-maya" },
    { t: "Hereko Herei", slug: "hereko-herai" },
    { t: "Hey Sailaa", slug: "hey-sailaa" },
    { t: "Jay Mahakali", slug: "jay-mahakali" },
    { t: "Jhim Jhimaune Aankha", slug: "jhim-jhimaune-aakha" },
    { t: "K Garu", slug: "k-garu" },
    { t: "Laijau Malai", slug: "laijaw-malai" },
    { t: "Ma Mare Pani", slug: "ma-mare-pani" },
    { t: "Maila Dai", slug: "maila-dai" },
    { t: "Makhamali", slug: "makhamali" },
    { t: "Maana Ko Haal", slug: "mana-ko-haal" },
    { t: "Mandainani Mana", slug: "mandaina-ni-mana" },
    { t: "Maya Ko Aago", slug: "maya-ko-aago" },
    { t: "Maya Ma", slug: "maya-ma" },
    { t: "Nindra Ma", slug: "nindra-ma" },
    { t: "Parichaya", slug: "parichaya" },
    { t: "Sahara", slug: "sahara" },
    { t: "Samau Mero Haat", slug: "samau-mero-haat" },
    { t: "Sisir", slug: "shisir" },
    { t: "Soltini", slug: "soltini" },
    { t: "Sparsha Sangeet", slug: "sparsha-sangeet" },
    { t: "Auchau Vane", slug: "timi-aauchau-vane" }
  ];

  /* Fisher–Yates: every visit gets a genuinely different running order */
  function shuffle(a){
    const x=a.slice();
    for(let i=x.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [x[i],x[j]]=[x[j],x[i]]; }
    return x;
  }

  let PROJECTS = [], ORDER = null;
  function readProjects(){
    const all = (typeof works!=='undefined' && works.length) ? works : [];
    // the landing's projects + each clip come from content.json -> projects or built-in fallback
    const list = (window.__projects && window.__projects.length) ? window.__projects : FALLBACK_PROJECTS;
    if(!Array.isArray(list) || !list.length) return 0;
    // shuffled once per visit, then reused — a resize must not re-order the reel
    if(!ORDER) ORDER = shuffle(list);
    PROJECTS = ORDER.map(p=>{
      const w = all.find(x=>x.t===p.t) || {t:p.t,a:'',d:'',y:'',id:''};
      return {
        t:w.t, a:w.a, d:w.d, e:w.e, y:w.y, id:w.id,
        video: DIR+p.slug+'.mp4',
        still: DIR+p.slug+'.jpg',
        fallback: w.id ? yt(w.id) : null,
        work: w
      };
    });
    return PROJECTS.length;
  }

  /* ---------------- build ---------------- */
  home.classList.add('zb');
  const stage = document.createElement('div');
  stage.innerHTML = `
    <div class="zb-bg">
      <div class="zb-layer" data-l="0"></div>
      <div class="zb-layer" data-l="1"></div>
    </div>
    <div class="zb-scrim"></div>
    <a class="zb-logo" href="index.html" data-route="home"><img alt="Chinoétales Productions"></a>
    <nav class="zb-nav">
      <a href="index.html"   data-route="home">Home</a>
      <a href="work.html"    data-route="work">Our Work</a>
      <a href="team.html"    data-route="team">Our Team</a>
      <a href="contact.html" data-route="contact">Contact</a>
    </nav>
    <button class="zb-burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="zb-menu">
      <a href="index.html"   data-route="home">Home</a>
      <a href="work.html"    data-route="work">Our Work</a>
      <a href="team.html"    data-route="team">Our Team</a>
      <a href="contact.html" data-route="contact">Contact</a>
    </nav>
    <div class="zb-stage">
      <div class="zb-dim"><div class="zb-list" data-list="dim"></div></div>
      <div class="zb-band"><div class="zb-list" data-list="band"></div></div>
    </div>
    <div class="zb-meta"></div>
  `;
  Array.from(stage.children).forEach(n=>home.appendChild(n));
  /* the logo + nav are the whole site's chrome, not just the landing's, so they
     live on <body> and survive the page swaps */
  ['.zb-logo','.zb-nav','.zb-burger','.zb-menu'].forEach(sel=>{
    const el=home.querySelector(sel); if(el) document.body.appendChild(el);
  });

  /* burger — the panel wipes open from the button, so the reveal has to
     originate at the button's real position, not a guessed one */
  (function burger(){
    const b=document.querySelector('.zb-burger'), m=document.querySelector('.zb-menu');
    if(!b||!m) return;
    const anchor=()=>{
      const r=b.getBoundingClientRect();
      m.style.setProperty('--ox',(r.left+r.width/2)+'px');
      m.style.setProperty('--oy',(r.top+r.height/2)+'px');
    };
    const set=o=>{
      if(o) anchor();                       // measure before the wipe starts
      document.body.classList.toggle('zb-menu-open',o);
      b.setAttribute('aria-expanded',o?'true':'false');
    };
    b.addEventListener('click',()=>set(!document.body.classList.contains('zb-menu-open')));
    m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));
    addEventListener('keydown',e=>{ if(e.key==='Escape') set(false); });
    addEventListener('hashchange',()=>set(false));
    addEventListener('resize',()=>{ if(document.body.classList.contains('zb-menu-open')) anchor(); });
  })();

  const dimList  = home.querySelector('[data-list="dim"]');
  const bandList = home.querySelector('[data-list="band"]');
  const layers   = [home.querySelector('[data-l="0"]'), home.querySelector('[data-l="1"]')];
  const metaEl   = home.querySelector('.zb-meta');
  /* the logo/nav were just re-parented onto <body>, so query from the document */
  const logoImg  = document.querySelector('.zb-logo img');

  let N=0, REPS=1, loopH=0, anchor=0;
  let offset=0, target=0, active=-1, layerOn=0, raf=0, running=false;
  let vel=0, idleTimer=0;

  /* Tuning. The band is shorter than a row, so mid-travel two half-rows sit in
     it at once — that was the white smear. We scroll slower, dim the bright
     band while it moves, and settle on a whole row, so a name only ever reads
     crisp when it is actually centred. */
  const WHEEL = 0.30;   // wheel -> px (was 1.0: far too fast)
  const MAXDELTA = 90;  // clamp one flick so trackpads can't jump a screen
  const EASE = 0.075;   // glide (was .12)
  const SNAP = 110;     // ms of stillness before settling onto a row (wheel)
  const MAGNET = 2.6;   // how much harder the glide pulls inside half a row
  const FLICK  = 9;     // frames of momentum let through before a flick locks

  function rowsHTML(canonicalRep){
    let h='';
    for(let r=0;r<REPS;r++){
      /* only one repetition is real to assistive tech / the tab key */
      const real = (r===canonicalRep);
      const attrs = real ? '' : ' aria-hidden="true"';
      const link  = real ? '' : ' tabindex="-1"';
      for(let i=0;i<N;i++)
        h+=`<div class="zb-row" data-i="${i}"${attrs}><a href="#" data-i="${i}"${link}>${PROJECTS[i].t}</a></div>`;
    }
    return h;
  }
  function build(){
    N = readProjects();
    if(!N) return false;
    const row = ROW();
    loopH = N*row;
    REPS  = Math.max(3, Math.ceil(innerHeight/loopH)+2);
    anchor = loopH*Math.floor(REPS/2);
    const canonical = Math.floor(REPS/2);        // the rep the anchor sits on
    dimList.innerHTML  = rowsHTML(canonical);
    /* the band is a visual duplicate of the same list — never announce or focus it */
    bandList.innerHTML = rowsHTML(-1);
    const bandWrap = home.querySelector('.zb-band');
    if(bandWrap) bandWrap.setAttribute('aria-hidden','true');
    // hover = white highlight + pop (no scrolling); single click = glide to
    // centre with a 3D parallax tilt; double click = play the video.
    home.querySelectorAll('.zb-dim .zb-row a').forEach(a=>{
      const i=+a.dataset.i;
      a.addEventListener('mouseenter',()=>hover(i,true));
      a.addEventListener('mouseleave',()=>hover(i,false));
      a.addEventListener('click',e=>{
        e.preventDefault();
        clearTimeout(clickTimer);
        clickTimer=setTimeout(()=>centerOn(i),210);     // wait to see if it's a dbl
      });
      a.addEventListener('dblclick',e=>{
        e.preventDefault();
        clearTimeout(clickTimer);                        // cancel the pending centre
        const p=PROJECTS[i];
        if(p && p.id && window.openModal) openModal(p.work);
      });
    });
    place(true);
    balanceMask();
    return true;
  }

  /* mirror the hover state onto every copy of that project (both lists loop) */
  function hover(i,on){
    home.querySelectorAll('.zb-row[data-i="'+i+'"]').forEach(r=>r.classList.toggle('hover',on));
  }

  /* glide the chosen project to the centre band, shortest way round the loop */
  let clickTimer=0;
  function centerOn(i){
    const row=ROW();
    const base=Math.round(offset/row);
    const cur=((base%N)+N)%N;
    let d=i-cur;
    if(d> N/2) d-=N; else if(d<-N/2) d+=N;   // take the short arc
    target=(base+d)*row;
    // parallax: tilt the background list back, then let it spring flat
    const st=home.querySelector('.zb-stage');
    if(st && !REDUCED){ st.classList.add('tilt'); setTimeout(()=>st.classList.remove('tilt'),360); }
  }

  /* ---------------- background media ----------------
     Every project change used to fetch its ~600KB clip immediately, so a few
     seconds of scrolling pulled 30+ videos (~15MB). Now the poster (~15KB)
     paints instantly and the clip is only fetched once the reel has actually
     settled on that project — and not at all on a metered/slow connection. */
  const SETTLE_MS = 300;
  let mediaTimer = 0;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const LIGHT_MODE = !!(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType||'')));

  function posterHTML(p){
    const src = p.still || p.fallback || '';
    return src ? `<img src="${src}" alt="" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src=(this.src.includes('assets/')?this.src.replace('assets/',''):'assets/'+this.getAttribute('src'));}">` : '';
  }
  /* swap the still for the moving clip, but only if the visitor is still here */
  function upgradeToVideo(layer, p, idx){
    if(active!==idx || !layer.classList.contains('on')) return;
    const v=document.createElement('video');
    v.muted=true; v.loop=true; v.playsInline=true;
    v.setAttribute('playsinline',''); v.preload='auto';
    if(p.still) v.poster=p.still;
    v.addEventListener('canplay',()=>{
      if(active!==idx || !layer.classList.contains('on')){ v.removeAttribute('src'); v.load(); return; }
      layer.replaceChildren(v);
      const pr=v.play(); if(pr&&pr.catch) pr.catch(()=>{});
    },{once:true});
    v.addEventListener('error',()=>{},{once:true});   // poster simply stays
    v.src=p.video;
  }
  function setActive(i){
    if(i===active) return;
    active = i;
    const p = PROJECTS[i]; if(!p) return;
    const next = layers[layerOn^1];
    next.innerHTML = posterHTML(p);          // instant + cheap
    next.classList.add('on');
    clearTimeout(mediaTimer);
    if(!LIGHT_MODE && p.video){
      mediaTimer = setTimeout(()=>upgradeToVideo(next, p, i), SETTLE_MS);
    }
    layers[layerOn].classList.remove('on');
    layerOn ^= 1;
    // free the old layer once it has faded out
    const old = layers[layerOn^1];
    setTimeout(()=>{ if(!old.classList.contains('on')) old.innerHTML=''; },1000);

    // credit the role we actually have — director, or editor where that's the credit
    metaEl.textContent = [p.a, p.d?('Dir. '+p.d):(p.e?('Ed. '+p.e):''), p.y]
      .filter(Boolean).join('  ·  ');
    metaEl.classList.add('on');
    home.querySelectorAll('.zb-row').forEach(r=>r.classList.toggle('hot', +r.dataset.i===i));
  }

  function place(){
    const row=ROW(), band=BAND();
    // keep both copies on the same offset so the band clips the same row
    const dimT  = (innerHeight/2 - row/2) - offset - anchor;
    const bandT = (band - row)/2 - offset - anchor;
    dimList.style.transform  = `translate3d(0,${dimT.toFixed(2)}px,0)`;
    bandList.style.transform = `translate3d(0,${bandT.toFixed(2)}px,0)`;
    // No highlight at all while the list is travelling — the band is what makes
    // two half-rows glow white at once. It only fades in once motion stops.
    const bandEl = home.querySelector('.zb-band');
    if(bandEl) bandEl.classList.toggle('idle', Math.abs(vel) < 0.12);
    const i = ((Math.round(offset/row) % N) + N) % N;
    setActive(i);
  }
  /* settle onto a whole row once the input stops */
  function scheduleSnap(){
    clearTimeout(idleTimer);
    idleTimer=setTimeout(snapNow,SNAP);
  }
  /* Lock to the nearest row immediately. `project` lets the current velocity
     carry a few frames first, so a flick still travels instead of stopping
     dead under the finger — then it lands on a whole row either way. */
  function snapNow(project){
    clearTimeout(idleTimer);
    const r=ROW();
    const t=target + (project ? vel*FLICK : 0);
    target=Math.round(t/r)*r;
  }

  function wrap(){
    // wrap offset and target together — the copies are identical, so this is invisible
    if(offset > loopH){ offset -= loopH; target -= loopH; }
    else if(offset < 0){ offset += loopH; target += loopH; }
  }

  /* one frame of motion — the single source of truth for the loop */
  function stepFrame(){
    const prev=offset;
    /* the magnet: once the remaining distance is inside half a row the glide
       tightens, so a half-scrolled name is pulled decisively onto centre
       rather than drifting there */
    const d=target-offset, r=ROW();
    offset += d * (Math.abs(d) < r*0.5 ? EASE*MAGNET : EASE);
    if(Math.abs(target-offset)<0.02) offset=target;
    vel += ((offset-prev)-vel)*0.28;          // smoothed px/frame
    if(Math.abs(vel)<0.02) vel=0;
    wrap();
    place();
  }
  function loop(){
    if(!running) return;
    raf = requestAnimationFrame(loop);
    stepFrame();
  }
  function start(){ if(!running){ running=true; loop(); } }
  function stop(){ running=false; cancelAnimationFrame(raf); }

  /* ---------------- balance the list's fade against the chrome ----------------
     On tablet/phone the logo is large and the meta line sits near the bottom,
     so fixed mask stops left the list hugging the meta while floating far from
     the logo. Measure both and give the list an equal breathing gap each end. */
  const RAMP = 88;                    // how far the list takes to dissolve
  function balanceMask(){
    const dim = home.querySelector('.zb-dim');
    if(!dim) return;
    const logo = document.querySelector('.zb-logo');
    const meta = home.querySelector('.zb-meta');
    if(!logo || !meta) return;
    /* Both ends anchor to the MEASURED chrome: the logo's bottom edge and the
       credit line's top edge. The two branches here used to be identical apart
       from a comment, so the >1024 special case has been folded away. */
    topFade(dim, logo.getBoundingClientRect().bottom);
    bottomFade(dim, meta.getBoundingClientRect().top);
  }

  /* The list reads solid for ROWS_BELOW projects under the centred one, then
     dissolves. Anchoring the fade to the CENTRE rather than to the bottom of
     the screen keeps the same number of legible titles under the active row on
     every screen. Clamped so it can never collide with the credit line. */
  const ROWS_BELOW = 10, ROWS_ABOVE = 8;
  function bottomFade(dim, metaTop){
    const row = ROW();
    const solidUntil = innerHeight/2 + ROWS_BELOW*row;   // 10 titles below centre
    const ramp = Math.min(RAMP, Math.max(40, row*3));
    let mb1 = solidUntil, mb0 = solidUntil + ramp;
    const ceiling = metaTop - 16;                        // stay clear of the credit
    if(mb0 > ceiling){ mb0 = ceiling; mb1 = Math.max(0, mb0 - ramp); }
    dim.style.setProperty('--mb1', mb1.toFixed(1) + 'px');
    dim.style.setProperty('--mb0', mb0.toFixed(1) + 'px');
  }
  /* Mirror of bottomFade: solid for 10 titles ABOVE the centred one, dissolving
     from there up. Clamped below the logo so names can never wash over it —
     on a short screen 10 rows would land behind the wordmark. */
  function topFade(dim, logoBottom){
    const row = ROW();
    const ramp = Math.min(RAMP, Math.max(40, row*3));
    let mt1 = innerHeight/2 - ROWS_ABOVE*row;            // 10 titles above centre
    const floor = logoBottom + 12;                       // never encroach on the logo
    if(mt1 < floor) mt1 = floor;
    const mt0 = Math.max(0, mt1 - ramp);
    dim.style.setProperty('--mt0', mt0.toFixed(1) + 'px');
    dim.style.setProperty('--mt1', mt1.toFixed(1) + 'px');
  }
  /* The stops are derived from measured positions, so they have to be recomputed
     whenever those positions or the viewport move. build() runs balanceMask once,
     but that happens BEFORE the webfont swaps in (which changes the credit line's
     height) and before the intro clears — and on phones the viewport height
     changes again as the browser chrome collapses. Listening on 'resize' alone
     left the stops anchored to a stale height: measured 10.2 rows above centre
     against 4.7 below, where the design calls for 8 and 10. */
  let maskTimer = 0;
  function scheduleMask(){ clearTimeout(maskTimer); maskTimer = setTimeout(balanceMask, 60); }
  addEventListener('resize', scheduleMask);
  addEventListener('orientationchange', scheduleMask);
  if(window.visualViewport) visualViewport.addEventListener('resize', scheduleMask);
  addEventListener('load', scheduleMask);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleMask);
  /* body.loaded lands when the intro finishes — the first moment the list is
     actually on screen at its final size */
  new MutationObserver(scheduleMask)
    .observe(document.body, {attributes:true, attributeFilter:['class']});
  /* the logo is an image — its height is unknown until it decodes */
  (function(){ const i=document.querySelector('.zb-logo img');
    if(i){ i.addEventListener('load', scheduleMask); if(i.complete) scheduleMask(); } })();

  /* ---------------- input ---------------- */
  function nudge(d){
    target += Math.max(-MAXDELTA, Math.min(MAXDELTA, d));
    scheduleSnap();
  }
  home.addEventListener('wheel', e=>{
    if(!onHome()) return;
    e.preventDefault();
    nudge(e.deltaY * (e.deltaMode===1 ? 16 : 1) * WHEEL);
  }, {passive:false});

  let ty=0, dragging=false;
  home.addEventListener('touchstart', e=>{ dragging=true; ty=e.touches[0].clientY; clearTimeout(idleTimer); }, {passive:true});
  home.addEventListener('touchmove', e=>{
    if(!dragging) return;
    const y=e.touches[0].clientY;
    nudge((ty-y)*0.9); ty=y;
    if(e.cancelable) e.preventDefault();
  }, {passive:false});
  /* snap the moment the finger lifts rather than waiting out the idle timer —
     the delay was what made the list feel like it drifted free on touch */
  home.addEventListener('touchend', ()=>{ dragging=false; snapNow(true); }, {passive:true});
  home.addEventListener('touchcancel', ()=>{ dragging=false; snapNow(true); }, {passive:true});

  addEventListener('keydown', e=>{
    if(!onHome()) return;
    const r=ROW();
    if(e.key==='ArrowDown'){ nudge(r); e.preventDefault(); }
    else if(e.key==='ArrowUp'){ nudge(-r); e.preventDefault(); }
    else if(e.key==='PageDown'){ nudge(r*8); e.preventDefault(); }
    else if(e.key==='PageUp'){ nudge(-r*8); e.preventDefault(); }
    else if(e.key==='Enter'){ const p=PROJECTS[active]; if(p&&window.openModal) openModal(p.work); }
  });

  /* ---------------- routing ---------------- */
  function onHome(){
    const path = location.pathname.split('/').pop() || 'index.html';
    return path === '' || path === 'index.html' || location.hash === '' || location.hash === '#home';
  }
  function sync(){
    const h=onHome();
    document.body.classList.toggle('zb-home', h);
    if(h && !document.hidden){ start(); } else { stop(); clearTimeout(mediaTimer); }
    const cur='home';
    document.querySelectorAll('.zb-nav a,.zb-menu a').forEach(a=>
      a.classList.toggle('on', a.dataset.route===cur));
  }
  addEventListener('hashchange', sync);
  document.addEventListener('visibilitychange', sync);
  addEventListener('resize', ()=>{ if(N){ build(); } });

  /* ---------------- boot ---------------- */
  function boot(){
    if(!build()){ setTimeout(boot,120); return; }   // works[] not loaded yet
    /* the order is random, so jump the reel to wherever Sparsha Sangeet landed.
       Only on first boot — a resize rebuilds and must keep the visitor's place. */
    const si = PROJECTS.findIndex(p=>p.t===START_AT);
    if(si>=0){ offset = target = si*ROW(); place(); }
    const hl=document.getElementById('heroLogo');
    logoImg.src = (hl && hl.getAttribute('src')) || 'img/wordmark-white.png';
    sync();
    const live=()=>document.body.classList.add('zb-live');
    if(document.body.classList.contains('loaded')) live();
    else{
      const mo=new MutationObserver(()=>{ if(document.body.classList.contains('loaded')){mo.disconnect();live();} });
      mo.observe(document.body,{attributes:true,attributeFilter:['class']});
      setTimeout(live,7000);
    }
    if(REDUCED) place(true);
  }
  boot();

  function rebuild(keepOrder = false){
    if(!keepOrder) ORDER = null;
    return build();
  }

  /* expose for verification */
  window.__zb = {
    get offset(){return offset;}, get target(){return target;}, get active(){return active;},
    get projects(){return PROJECTS;}, step(d){ target+=d; }, place, build, rebuild, centerOn, hover,
    get vel(){return vel;},
    tick(n){ for(let k=0;k<(n||1);k++) stepFrame(); }
  };

})();
