'use strict';

// ===== THEME =====
var savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
var themeBtn = document.getElementById('theme-btn');
themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';


// ===== DARK MODE =====
themeBtn.addEventListener('click', function(){
    var c = document.documentElement.getAttribute('data-theme');
    var n = c === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    localStorage.setItem('theme', n);
    this.textContent = n === 'dark' ? '☀️' : '🌙';
    // update meta theme-color
    var mtc = document.getElementById('meta-theme-color');
    if(mtc) mtc.content = n === 'dark' ? '#0f0d0a' : '#5b3fa6';
});
