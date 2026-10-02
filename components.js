'use strict';

// ===== FAQ =====
document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
        var item = this.parentElement;
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function(i){
            i.classList.remove('open');
            i.querySelector('.faq-q').setAttribute('aria-expanded','false');
        });
        if(!isOpen){
            item.classList.add('open');
            this.setAttribute('aria-expanded','true');
        }
    });
    q.addEventListener('keydown', function(e){
        if(e.key==='Enter'||e.key===' '){ e.preventDefault(); this.click(); }
    });
});
