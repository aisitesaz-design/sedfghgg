'use strict';
/* ============================================================
   SERVICE PRICING — data-driven, no dependencies
   4 tiers × 6 site types. Prices based on Tehran market rate,
   Mordad 1405. Delivery times reflect solo-developer capacity
   (not an agency/team) — review and update periodically.
   ============================================================ */

var svcData = {
    personal: {
        label: 'شخصی', icon: '👤',
        template: { price: '۵ تا ۱۲ میلیون تومان', delivery: 'تحویل ۲ تا ۴ روز', features: ['قالب آماده، شخصی‌سازی‌شده', 'معرفی، رزومه، نمونه‌کار شخصی', 'ریسپانسیو کامل'] },
        wordpress: { price: '۸ تا ۱۶ میلیون تومان', delivery: 'تحویل ۳ تا ۵ روز', features: ['وردپرس با قالب و پلاگین مناسب', 'مدیریت محتوا برای خودتان آسان', 'قابل توسعه با بلاگ در آینده'] },
        redesign: { price: '۱۲ تا ۲۲ میلیون تومان', delivery: 'تحویل ۴ تا ۷ روز', features: ['بازطراحی کامل ظاهر و UI/UX', 'بدون تغییر در محتوای فعلی', 'بهینه‌سازی سرعت و سئوی فنی'] },
        custom: { price: '۲۵ تا ۵۰ میلیون تومان', delivery: 'تحویل ۱ تا ۲ هفته', features: ['طراحی و کدنویسی کامل از صفر', 'انیمیشن و تعامل اختصاصی', 'هویت بصری کاملاً منحصربه‌فرد'] }
    },
    corporate: {
        label: 'شرکتی معرفی', icon: '🏢',
        template: { price: '۹ تا ۲۲ میلیون تومان', delivery: 'تحویل ۳ تا ۶ روز', features: ['چند صفحه (درباره، خدمات، تماس)', 'قالب آماده با برندسازی سبک', 'مدیریت محتوای ساده'] },
        wordpress: { price: '۱۴ تا ۳۰ میلیون تومان', delivery: 'تحویل ۵ تا ۸ روز', features: ['وردپرس با قالب و پلاگین‌های حرفه‌ای', 'مدیریت محتوا کاملاً در اختیار شما', 'قابل توسعه با فرم و بلاگ'] },
        redesign: { price: '۲۵ تا ۴۵ میلیون تومان', delivery: 'تحویل ۱ تا ۲ هفته', features: ['بازطراحی کامل هر صفحه', 'ساختار و محتوای فعلی حفظ می‌شود', 'یکپارچه با هویت بصری برند'] },
        custom: { price: '۴۵ تا ۱۰۰ میلیون تومان', delivery: 'تحویل ۲ تا ۳ هفته', features: ['معماری و کدنویسی اختصاصی کامل', 'پنل مدیریت محتوای اختصاصی', 'سئوی فنی پیشرفته از پایه'] }
    },
    b2b: {
        label: 'سازمانی / کارخانه‌ای / B2B', icon: '🏭',
        template: { price: '۲۵ تا ۵۰ میلیون تومان', delivery: 'تحویل ۱ تا ۲ هفته', features: ['کاتالوگ محصول + فرم استعلام', 'قالب سفارشی‌سازی‌شده', 'مناسب شروع سریع'] },
        wordpress: { price: '۳۵ تا ۷۰ میلیون تومان', delivery: 'تحویل ۲ تا ۳ هفته', features: ['وردپرس با پلاگین کاتالوگ/استعلام', 'مدیریت محصولات توسط خودتان', 'هزینه نگهداری پایین‌تر از اختصاصی'] },
        redesign: { price: '۷۵ تا ۱۴۰ میلیون تومان', delivery: 'تحویل ۳ تا ۴ هفته', features: ['بازطراحی کامل هویت بصری B2B', 'فرم استعلام/سفارش سفارشی', 'بک‌اند و دیتابیس فعلی حفظ می‌شود'] },
        custom: { price: '۱۶۰ تا ۳۰۰ میلیون تومان', delivery: 'تحویل ۶ تا ۸ هفته', features: ['معماری کامل از صفر (فرانت + بک‌اند)', 'پنل مدیریت سفارش/استعلام اختصاصی', 'مقیاس‌پذیر برای رشد آتی کسب‌وکار'] }
    },
    store: {
        label: 'فروشگاهی', icon: '🛒',
        template: { price: '۱۶ تا ۳۵ میلیون تومان', delivery: 'تحویل ۱ تا ۲ هفته', features: ['فروشگاه‌ساز آماده، آماده فروش', 'درگاه پرداخت ایرانی متصل', 'مدیریت محصول و موجودی پایه'] },
        wordpress: { price: '۲۲ تا ۴۵ میلیون تومان', delivery: 'تحویل ۲ تا ۳ هفته', features: ['ووکامرس + قالب و درگاه پرداخت', 'مدیریت محصول و سفارش‌ها آسان', 'اکوسیستم بزرگ افزونه‌های فروش'] },
        redesign: { price: '۶۰ تا ۱۱۰ میلیون تومان', delivery: 'تحویل ۳ تا ۴ هفته', features: ['بازطراحی کامل فروشگاه فعلی', 'بهبود تجربه خرید و نرخ تبدیل', 'دیتابیس و سفارش‌های فعلی حفظ می‌شود'] },
        custom: { price: '۱۵۰ تا ۳۲۰ میلیون تومان', delivery: 'تحویل ۸ تا ۱۲ هفته', features: ['فروشگاه اختصاصی از صفر', 'چند درگاه پرداخت + انبارداری پیشرفته', 'مقیاس‌پذیر برای حجم فروش بالا'] }
    },
    news: {
        label: 'خبری / پورتال', icon: '📰',
        template: { price: '۲۲ تا ۴۸ میلیون تومان', delivery: 'تحویل ۱ تا ۲ هفته', features: ['CMS آماده با دسته‌بندی و جستجو', 'قالب سفارشی‌سازی‌شده', 'مناسب شروع سریع محتوا'] },
        wordpress: { price: '۳۰ تا ۶۰ میلیون تومان', delivery: 'تحویل ۱ تا ۲ هفته', features: ['وردپرس خبری با قالب حرفه‌ای', 'مدیریت آسان توسط تحریریه', 'اکوسیستم بزرگ افزونه‌های خبری'] },
        redesign: { price: '۷۰ تا ۱۳۰ میلیون تومان', delivery: 'تحویل ۳ تا ۴ هفته', features: ['بازطراحی کامل چیدمان و خوانایی', 'آرشیو و محتوای فعلی حفظ می‌شود', 'بهینه‌سازی سرعت برای ترافیک بالا'] },
        custom: { price: '۱۶۰ تا ۳۲۰ میلیون تومان', delivery: 'تحویل ۸ تا ۱۲ هفته', features: ['CMS و پنل مدیریت اختصاصی از صفر', 'معماری مقیاس‌پذیر برای ترافیک سنگین', 'دسته‌بندی و جستجوی اختصاصی'] }
    },
    landing: {
        label: 'لندینگ پیج', icon: '🚀',
        template: { price: '۴ تا ۹ میلیون تومان', delivery: 'تحویل ۱ تا ۳ روز', features: ['قالب آماده، شخصی‌سازی‌شده', 'یک صفحه با فرم تماس/سفارش', 'ریسپانسیو کامل'] },
        wordpress: { price: '۶ تا ۱۲ میلیون تومان', delivery: 'تحویل ۲ تا ۴ روز', features: ['وردپرس با صفحه‌ساز (المنتور و مشابه)', 'ویرایش آسان توسط خودتان', 'مناسب کمپین‌های تبلیغاتی'] },
        redesign: { price: '۱۰ تا ۱۸ میلیون تومان', delivery: 'تحویل ۳ تا ۵ روز', features: ['بازطراحی کامل ظاهر و UI/UX', 'بدون تغییر در محتوای فعلی', 'بهینه‌سازی سرعت و سئوی فنی'] },
        custom: { price: '۲۰ تا ۴۰ میلیون تومان', delivery: 'تحویل ۱ تا ۲ هفته', features: ['طراحی و کدنویسی کامل از صفر', 'انیمیشن و تعامل اختصاصی', 'ساختار منطبق با هویت برند شما'] }
    }
};

var svcTierMeta = {
    template: { label: 'قالبی', desc: 'شروع سریع و مقرون‌به‌صرفه با قالب آماده' },
    wordpress: { label: 'وردپرسی', desc: 'مدیریت محتوای آسان روی CMS محبوب جهانی' },
    redesign: { label: 'فقط ریدیزاین ظاهری', desc: 'ظاهر و UI/UX از صفر؛ بک‌اند فعلی حفظ می‌شود' },
    custom: { label: 'کدنویسی کامل صفر تا صد', desc: 'طراحی و توسعه کاملاً اختصاصی، بدون محدودیت' }
};

var svcTierOrder = ['template', 'wordpress', 'redesign', 'custom'];

(function () {
    var typeButtons = document.querySelectorAll('.svc-type-btn');
    var cardsWrap = document.getElementById('svc-cards');
    if (!typeButtons.length || !cardsWrap) return;

    function renderCard(tierKey, tierData) {
        var meta = svcTierMeta[tierKey];
        if (!tierData) {
            return '<div class="svc-card svc-na">' +
                '<span class="svc-na-ico" aria-hidden="true">🧩</span>' +
                '<p>این سطح برای این نوع سایت ارائه نمی‌شود.</p>' +
                '</div>';
        }
        var features = tierData.features.map(function (f) { return '<li>' + f + '</li>'; }).join('');
        var isWordpress = tierKey === 'wordpress';
        var cardClass = isWordpress ? 'svc-card svc-muted' : 'svc-card';
        var stamp = isWordpress ? '<span class="svc-stamp">غیرفعال<br>تا اطلاع ثانوی</span>' : '';
        return '<div class="' + cardClass + '">' +
            stamp +
            '<span class="svc-card-tier">' + meta.label + '</span>' +
            '<h3>' + meta.label + '</h3>' +
            '<p class="svc-card-desc">' + meta.desc + '</p>' +
            '<span class="svc-price">' + tierData.price + '</span>' +
            '<span class="svc-delivery">⏱ ' + tierData.delivery + '</span>' +
            '<ul class="svc-features">' + features + '</ul>' +
            '<a href="#contact" class="svc-card-btn">مشاوره رایگان</a>' +
            '</div>';
    }

    function render(typeKey) {
        var t = svcData[typeKey];
        if (!t) return;
        var html = '';
        for (var i = 0; i < svcTierOrder.length; i++) {
            var tier = svcTierOrder[i];
            html += renderCard(tier, t[tier]);
        }
        cardsWrap.innerHTML = html;
    }

    typeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            typeButtons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
            btn.setAttribute('aria-pressed', 'true');
            render(btn.getAttribute('data-type'));
        });
    });

    render('personal');
})();
