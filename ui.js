'use strict';

// ===== PRELOADER — tracks real resource loading progress =====
(function(){
    var preloader = document.getElementById('preloader');
    var fill = document.getElementById('preloader-fill');
    var pctEl = document.getElementById('preloader-pct');
    if(!preloader || !fill) return;

    var trackedUrls = [];
    document.querySelectorAll('link[rel="stylesheet"][href], script[src], img[loading="eager"]').forEach(function(el){
        var url = el.href || el.src;
        if(url){ try { trackedUrls.push(new URL(url, location.href).href); } catch(e){} }
    });
    var total = trackedUrls.length || 1;
    var loadedSet = {};
    var loadedCount = 0;

    function toFa(n){ return n.toString().replace(/\d/g, function(d){ return '۰۱۲۳۴۵۶۷۸۹'[d]; }); }
    function setProgress(p){
        p = Math.min(100, Math.max(0, p));
        fill.style.width = p + '%';
        if(pctEl) pctEl.textContent = toFa(Math.round(p)) + '٪';
    }
    setProgress(6);

    if(window.PerformanceObserver){
        try {
            var po = new PerformanceObserver(function(list){
                list.getEntries().forEach(function(entry){
                    if(trackedUrls.indexOf(entry.name) !== -1 && !loadedSet[entry.name]){
                        loadedSet[entry.name] = true;
                        loadedCount++;
                        setProgress((loadedCount / total) * 100);
                    }
                });
            });
            po.observe({ type: 'resource', buffered: true });
        } catch(e){}
    }

    window.addEventListener('load', function(){
        setProgress(100);
        setTimeout(function(){ preloader.classList.add('hidden'); }, 350);
    });
})();


// ===== YEAR =====
var yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();


// ===== SCROLL PROGRESS =====
var progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', function(){
    var s = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if(progressBar) progressBar.style.width = (h > 0 ? (s/h*100) : 0) + '%';
}, {passive:true});


// ===== HEADER SCROLL =====
var header = document.getElementById('main-header');
var lastScroll = 0;
window.addEventListener('scroll', function(){
    var s = window.scrollY;
    if(s > 100 && s > lastScroll) header.classList.add('hidden');
    else header.classList.remove('hidden');
    lastScroll = s;
    var btt = document.getElementById('back-to-top');
    if(btt) btt.classList.toggle('visible', s > 400);
}, {passive:true});


// ===== BACK TO TOP =====
var bttEl = document.getElementById('back-to-top');
if(bttEl){
    bttEl.addEventListener('click', function(e){
        e.preventDefault();
        window.scrollTo({top:0, behavior:'smooth'});
    });
}


// ===== HAMBURGER =====
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', function(){
    var isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
    });
});


// ===== FADE UP OBSERVER =====
var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
}, {threshold:0.08});
document.querySelectorAll('.fade-up').forEach(function(el){ obs.observe(el); });
