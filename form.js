'use strict';

// ===== FORM VALIDATION (live) =====
function validateField(input, checkId, pattern){
    var check = document.getElementById(checkId);
    if(!check) return false;
    var val = input.value.trim();
    var valid = pattern ? pattern.test(val) : val.length >= (parseInt(input.getAttribute('minlength'))||1);
    input.classList.toggle('field-valid', valid && val.length>0);
    input.classList.toggle('field-invalid', !valid && val.length>0);
    check.textContent = (val.length>0) ? (valid ? '✅' : '❌') : '';
    return valid;
}
var cNameEl = document.getElementById('c-name');
var cPhoneEl = document.getElementById('c-phone');
if(cNameEl) cNameEl.addEventListener('input', function(){ validateField(this,'c-name-check',null); });
if(cPhoneEl) cPhoneEl.addEventListener('input', function(){ validateField(this,'c-phone-check',/^09[0-9]{9}$/); });


// ===== CONTACT FORM (FormSubmit — native form POST + AJAX fallback) =====
var contactForm = document.getElementById('myForm');
var sendBtn = document.getElementById('send-btn');
if(contactForm && sendBtn){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        var name = (cNameEl ? cNameEl.value.trim() : '');
        var phone = (cPhoneEl ? cPhoneEl.value.trim() : '');
        var msgEl = document.getElementById('c-msg');
        var msg = (msgEl ? msgEl.value.trim() : '');
        var statusEl = document.getElementById('status');

        // client-side validation
        if(!name || name.length < 2){
            statusEl.innerHTML='<span style="color:var(--error)">لطفاً نام خود را وارد کنید.</span>';
            if(sendBtn){ sendBtn.classList.add('shake'); setTimeout(function(){sendBtn.classList.remove('shake');},500); }
            return;
        }
        if(!phone || !/^09[0-9]{9}$/.test(phone)){
            statusEl.innerHTML='<span style="color:var(--error)">شماره موبایل صحیح وارد کنید (مثال: 09123456789)</span>';
            if(sendBtn){ sendBtn.classList.add('shake'); setTimeout(function(){sendBtn.classList.remove('shake');},500); }
            return;
        }
        if(!msg || msg.length < 5){
            statusEl.innerHTML='<span style="color:var(--error)">لطفاً پیام خود را بنویسید.</span>';
            if(sendBtn){ sendBtn.classList.add('shake'); setTimeout(function(){sendBtn.classList.remove('shake');},500); }
            return;
        }

        // online check
        if(!navigator.onLine){
            statusEl.innerHTML='<div style="padding:14px;background:rgba(239,68,68,.1);color:var(--error);border-radius:3px;font-weight:700;">❌ اتصال اینترنت برقرار نیست. لطفاً بررسی کنید.</div>';
            return;
        }

        sendBtn.disabled = true;
        statusEl.innerHTML='<span style="color:var(--gold);font-weight:600">✈️ در حال ارسال...</span>';

        var fd = new FormData(contactForm);
        fetch('https://formsubmit.co/ajax/6b4yyb@gmail.com', {
            method: 'POST',
            body: fd,
            headers: { 'Accept': 'application/json' }
        })
        .then(function(r){
            if(!r.ok) throw new Error('server-error');
            return r.json();
        })
        .then(function(data){
            if(data && data.success === 'true' || data && data.success === true){
                statusEl.innerHTML='<div style="margin-top:14px;padding:14px 18px;background:rgba(34,197,94,.1);color:#166534;border:1px solid rgba(34,197,94,.3);border-radius:3px;font-weight:700;">✅ پیامت ارسال شد! ممنون 🤍 در اسرع وقت پاسخ می‌دم.</div>';
                contactForm.reset();
                ['c-name','c-phone'].forEach(function(id){
                    var el = document.getElementById(id);
                    if(el){ el.classList.remove('field-valid','field-invalid'); }
                });
                ['c-name-check','c-phone-check'].forEach(function(id){
                    var el = document.getElementById(id);
                    if(el) el.textContent='';
                });
                setTimeout(function(){ statusEl.innerHTML=''; }, 7000);
            } else {
                throw new Error('unexpected-response');
            }
            sendBtn.disabled = false;
        })
        .catch(function(){
            statusEl.innerHTML='<div style="padding:14px;background:rgba(239,68,68,.1);color:var(--error);border-radius:3px;font-weight:700;">❌ خطا در ارسال. لطفاً مستقیم از واتساپ تماس بگیرید.</div>';
            sendBtn.disabled = false;
        });
    });
}

// Reset button
var resetBtn = document.getElementById('reset-btn');
if(resetBtn){
    resetBtn.addEventListener('click', function(){
        var statusEl = document.getElementById('status');
        if(statusEl) statusEl.innerHTML='';
        ['c-name','c-phone'].forEach(function(id){
            var el = document.getElementById(id);
            if(el){ el.classList.remove('field-valid','field-invalid'); }
        });
        ['c-name-check','c-phone-check'].forEach(function(id){
            var el = document.getElementById(id);
            if(el) el.textContent='';
        });
    });
}


// ===== REVIEWS with MODERATION =====
var REVIEWS_KEY = 'eftekhari_reviews_v3';
var PENDING_KEY = 'eftekhari_reviews_pending_v3';
function getReviews(){ try{return JSON.parse(localStorage.getItem(REVIEWS_KEY))||[];}catch(e){return [];} }
function saveReviews(arr){ try{localStorage.setItem(REVIEWS_KEY,JSON.stringify(arr));}catch(e){} }
function getPending(){ try{return JSON.parse(localStorage.getItem(PENDING_KEY))||[];}catch(e){return [];} }
function savePending(arr){ try{localStorage.setItem(PENDING_KEY,JSON.stringify(arr));}catch(e){} }
function starsHTML(n){ var s=''; for(var i=1;i<=5;i++) s+=(i<=n?'★':'☆'); return s; }
function fa(n){ return n.toString().replace(/0/g,'۰').replace(/1/g,'۱').replace(/2/g,'۲').replace(/3/g,'۳').replace(/4/g,'۴').replace(/5/g,'۵').replace(/6/g,'۶').replace(/7/g,'۷').replace(/8/g,'۸').replace(/9/g,'۹'); }
function updateRatingDisplay(reviews){
    var count = reviews.length;
    var avg = count ? (reviews.reduce(function(a,r){return a+r.stars;},0)/count).toFixed(1) : '0.0';
    document.getElementById('avg-rating').textContent = fa(avg);
    document.getElementById('review-count').textContent = fa(count);
    var filled = Math.round(parseFloat(avg));
    document.getElementById('avg-stars').textContent = starsHTML(filled);
    document.getElementById('avg-stars').setAttribute('aria-label','امتیاز میانگین '+fa(avg)+' از ۵');
}
function renderReviews(reviews){
    var list = document.getElementById('reviews-list');
    if(!list) return;
    if(!reviews.length){
        list.innerHTML='<p style="text-align:center;color:var(--muted);font-size:.88rem;">هنوز نظر تأییدشده‌ای وجود ندارد.</p>';
        return;
    }
    list.innerHTML = reviews.slice().reverse().map(function(r,i){
        var idx = reviews.length - 1 - i;
        return '<div class="review-item" data-idx="'+idx+'"><div class="review-item-header"><span class="review-item-name">'+r.name+'</span><span class="review-item-stars" aria-label="'+r.stars+' ستاره">'+starsHTML(r.stars)+'</span></div><div class="review-item-text">'+r.text+'</div><div class="review-item-date">'+r.date+'</div></div>';
    }).join('');
}

// Admin panel toggle — press ctrl+shift+A
function renderAdminPanel(){
    var pending = getPending();
    var approved = getReviews();
    var panel = document.getElementById('admin-review-panel');
    if(!panel) return;
    var html = '<h4 style="color:var(--gold);margin-bottom:12px;">🔒 مدیریت نظرات</h4>';
    html += '<p style="font-size:.8rem;color:var(--muted);margin-bottom:16px;">در انتظار تأیید: '+pending.length+' | تأییدشده: '+approved.length+'</p>';
    if(pending.length){
        html += '<div style="margin-bottom:20px;"><strong style="font-size:.82rem;color:var(--text);">در انتظار تأیید:</strong>';
        pending.forEach(function(r,i){
            html += '<div style="background:var(--card2);border:1px solid var(--border);border-radius:6px;padding:12px;margin:8px 0;">';
            html += '<b>'+r.name+'</b> '+starsHTML(r.stars)+' <small style="color:var(--muted);">'+r.date+'</small><br>';
            html += '<p style="font-size:.82rem;margin:6px 0;">'+r.text+'</p>';
            html += '<button onclick="approveReview('+i+')" style="background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);color:#166534;border-radius:4px;padding:4px 12px;font-size:.75rem;cursor:pointer;margin-left:6px;">✅ تأیید</button>';
            html += '<button onclick="deletePending('+i+')" style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:var(--error);border-radius:4px;padding:4px 12px;font-size:.75rem;cursor:pointer;">🗑 حذف</button>';
            html += '</div>';
        });
        html += '</div>';
    }
    if(approved.length){
        html += '<div><strong style="font-size:.82rem;color:var(--text);">نظرات تأییدشده:</strong>';
        approved.forEach(function(r,i){
            html += '<div style="background:var(--card2);border:1px solid var(--border);border-radius:6px;padding:10px;margin:6px 0;display:flex;justify-content:space-between;align-items:center;">';
            html += '<span style="font-size:.8rem;"><b>'+r.name+'</b> '+starsHTML(r.stars)+'</span>';
            html += '<button onclick="deleteApproved('+i+')" style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:var(--error);border-radius:4px;padding:4px 10px;font-size:.72rem;cursor:pointer;">🗑</button>';
            html += '</div>';
        });
        html += '</div>';
    }
    panel.innerHTML = html;
}

window.approveReview = function(i){
    var pending = getPending();
    var reviews = getReviews();
    reviews.push(pending[i]);
    pending.splice(i,1);
    saveReviews(reviews);
    savePending(pending);
    updateRatingDisplay(reviews);
    renderReviews(reviews);
    renderAdminPanel();
};
window.deletePending = function(i){
    var pending = getPending();
    pending.splice(i,1);
    savePending(pending);
    renderAdminPanel();
};
window.deleteApproved = function(i){
    var reviews = getReviews();
    reviews.splice(i,1);
    saveReviews(reviews);
    updateRatingDisplay(reviews);
    renderReviews(reviews);
    renderAdminPanel();
};

document.addEventListener('keydown', function(e){
    if(e.ctrlKey && e.shiftKey && e.key === 'A'){
        var p = document.getElementById('admin-review-panel');
        if(!p){
            p = document.createElement('div');
            p.id = 'admin-review-panel';
            p.style.cssText = 'position:fixed;bottom:80px;left:20px;z-index:99998;background:var(--card);border:2px solid var(--gold);border-radius:12px;padding:20px;max-width:400px;max-height:70vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:Vazirmatn,sans-serif;direction:rtl;';
            document.body.appendChild(p);
            renderAdminPanel();
        } else {
            p.remove();
        }
    }
});

var rNameEl = document.getElementById('r-name');
if(rNameEl) rNameEl.addEventListener('input', function(){ validateField(this,'r-name-check',null); });
document.getElementById('review-submit-btn').addEventListener('click', function(){
    var name = document.getElementById('r-name').value.trim();
    var text = document.getElementById('r-text').value.trim();
    var starEl = document.querySelector('input[name="stars"]:checked');
    var status = document.getElementById('review-status');
    if(!name||name.length<2){status.innerHTML='<span style="color:var(--error)">لطفاً نام خود را وارد کنید.</span>';return;}
    if(!starEl){status.innerHTML='<span style="color:var(--error)">لطفاً امتیاز بدید ★</span>';return;}
    if(!text||text.length<10){status.innerHTML='<span style="color:var(--error)">نظر باید حداقل ۱۰ کاراکتر باشد.</span>';return;}
    var pending = getPending();
    var now = new Date();
    pending.push({
        name: name, stars: parseInt(starEl.value), text: text,
        date: now.getFullYear()+'/'+(now.getMonth()+1).toString().padStart(2,'0')+'/'+now.getDate().toString().padStart(2,'0')
    });
    savePending(pending);
    status.innerHTML='<div style="padding:12px 16px;background:rgba(34,197,94,.1);color:#166534;border:1px solid rgba(34,197,94,.3);border-radius:3px;font-weight:700;">✅ نظرت دریافت شد! بعد از بررسی نمایش داده می‌شه 🤍</div>';
    document.getElementById('r-name').value='';
    document.getElementById('r-text').value='';
    document.querySelectorAll('input[name="stars"]').forEach(function(r){r.checked=false;});
    document.getElementById('r-name').classList.remove('field-valid','field-invalid');
    var rnc = document.getElementById('r-name-check'); if(rnc) rnc.textContent='';
    setTimeout(function(){status.innerHTML='';},5000);
});
updateRatingDisplay(getReviews());
renderReviews(getReviews());
