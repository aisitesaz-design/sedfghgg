'use strict';

// ===== TYPEWRITER for role =====
var roles = ['طراح و توسعه‌دهنده سایت با هوش مصنوعی و خدمات سئو'];
var roleEl = document.getElementById('role-line');
var ri = 0, ci = 0, deleting = false;
function typeRole(){
    if(!roleEl) return;
    var cur = roles[ri];
    if(!deleting){
        roleEl.textContent = cur.substring(0, ci+1);
        ci++;
        if(ci === cur.length){ deleting = true; setTimeout(typeRole, 1800); return; }
    } else {
        roleEl.textContent = cur.substring(0, ci-1);
        ci--;
        if(ci === 0){ deleting = false; ri = (ri+1)%roles.length; }
    }
    setTimeout(typeRole, deleting ? 45 : 80);
}
if(roleEl) setTimeout(typeRole, 1000);

// ===== fa number helper =====
function fa(n){ return n.toString().replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d];}); }
