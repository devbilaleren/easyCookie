(function($){

    'use strict';

    $.easyCookie = function(name, value, options) {
        const settings = $.extend(true, {
            domain: location.hostname,
            path: '/',
            secure: false
        }, options);

        if(!navigator.cookieEnabled)
            $.error('Cookies not enabled.');

        function checkValue(value) {
            return (
                (value.hasOwnProperty('name') && value.name.length > 0) &&
                (value.hasOwnProperty('value') && value.value.length > 0) &&
                (value.hasOwnProperty('expire') && value.value.length > 0)
            );
        }

        function getCookies() {
            const cookie = document.cookie.split(';');

            if(cookie.length > 0){
                return cookie.map(function(value){
                    return value.trim().split('=');
                }).reduce(function (previousValue, currentValue) {
                    previousValue[currentValue[0]] = currentValue[1];
                    return previousValue;
                }, {});
            }
            return [];
        }

        function setCookie(name, value, expireDate) {
            document.cookie = name +"="+ encodeURIComponent(value) +
                ";domain="+ settings.domain +
                ";path="+ settings.path +
                ";expires="+expireDate.toUTCString()+(settings.secure ? ';secure' : '');
        }

        const cookie = {
            getAll: function (){
                return getCookies()
            },
            setMulti: function (cookie_options) {
                const status_array = [];
                const $this = cookie;

                if(!$.isArray(cookie_options))
                    $.error('You need to specify an array.');
                if(cookie_options.length < 1)
                    $.error('No element in the array.');

                cookie_options.map(function(elm) {
                    if(checkValue(elm)){

                        let status = false;
                        const expire_type = elm.expire_type;
                        const name = elm.name;
                        const value = elm.value;
                        const expire = elm.expire;

                        switch (expire_type){
                            case 'years':
                                status = $this.setYears(name, value, expire);

                                status_array.push({
                                    name: name,
                                    status: status
                                });
                                break;
                            case 'months':
                                status = $this.setMonth(name, value, expire);

                                status_array.push({
                                    name: name,
                                    status: status
                                });
                                break;
                            case 'days':
                                status = $this.setDays(name, value, expire);

                                status_array.push({
                                    name: name,
                                    status: status
                                });
                                break;
                            case 'hours':
                                status = $this.setHours(name, value, expire);

                                status_array.push({
                                    name: name,
                                    status: status
                                });
                                break;
                            case 'minutes':
                                status = $this.setMinutes(name, value, expire);

                                status_array.push({
                                    name: name,
                                    status: status
                                });
                                break;
                            case 'seconds':
                                status = $this.setSeconds(name, value, expire);

                                status_array.push({
                                    name: name,
                                    status: status
                                });
                                break;
                            default:
                                status = $this.setDays(name, value, expire);

                                status_array.push({
                                    name: name,
                                    status: status
                                });
                                break;
                        }
                    }
                });

                return status_array;
            },
            removeMulti: function (cookies) {
                const status_array = [];
                const $this = cookie;

                if(!$.isArray(cookies))
                    $.error('You need to specify an array.');
                if(cookies.length < 1)
                    $.error('No element in the array.');

                cookies.map(function (elm) {
                    const status = $this.remove(elm);

                    status_array.push({
                        name: elm,
                        status: status
                    })
                });

                return status_array;
            },
            set: function (name, value){
                this.setDays(name, value, 1);
                return this.has(name);
            },
            has: function (name) {
                return this.getAll().hasOwnProperty(name);
            },
            get: function (name) {
                if(this.has(name))
                    return decodeURIComponent(this.getAll()[name]);
                else
                    return null;
            },
            remove: function (name){
                if(this.has(name))
                    return this.setSeconds(name, '', 1);
                else
                    return false;
            },
            count: function () {
                return (document.cookie).split(';').length;
            },
            setYears: function (name, value, expire_years = 1) {
                const date = new Date();
                date.setFullYear(date.getFullYear()+expire_years);
                setCookie(name, value, date);
                return this.has(name);
            },
            setMonth: function (name, value, expire_month = 1) {
                const date = new Date();
                date.setMonth(date.getMonth()+expire_month);
                setCookie(name, value, date);
                return this.has(name);
            },
            setDays: function (name, value, expire_days = 1) {
                const date = new Date();
                date.setDate(date.getDate()+expire_days);
                setCookie(name, value, date);
                return this.has(name);
            },
            setHours: function (name, value, expire_hours = 1) {
                const date = new Date();
                date.setHours(date.getHours()+expire_hours);
                setCookie(name, value, date);
                return this.has(name);
            },
            setMinutes: function (name, value, expire_minutes = 1) {
                const date = new Date();
                date.setMinutes(date.getMinutes()+expire_minutes);
                setCookie(name, value, date);
                return this.has(name);
            },
            setSeconds: function (name, value, expire_seconds = 1) {
                const date = new Date();
                date.setSeconds(date.getSeconds()+expire_seconds);
                setCookie(name, value, date);
                return this.has(name);
            },
            init: function (){
                if(name && value)
                    this.setDays(name, value, 1);
            }
        };

        cookie.init();

        return cookie;
    };

    $.easyCookieConsent = function(options) {
        const settings = $.extend(true, {
            palette: {
                button: {
                    text: '#000',
                    background: '#ddd'
                },
                popup: {
                    text: '#000',
                    background: '#fff'
                },
                link: {
                    text: '#606060',
                    background: 'transparent'
                }
            },
            content: {
                message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium architecto aut cum dolorem eos error, esse explicabo, fugiat fugit maxime perferendis qui quod ratione repellat repellendus saepe temporibus veritatis.',
                dismiss: 'Ok, thanks!',
                link: 'privacy policy.',
                href: 'https://google.com'
            },
            cookie_name: 'cookie_consent_status'
        }, options);

        let template = '';

        const base_selector = '.cookie_consent_content';
        const message = settings.content.message;
        const dismiss = settings.content.dismiss;
        const link = settings.content.link;
        const href = settings.content.href;
        const cookie_name = settings.cookie_name;
        const palette = settings.palette;
        const cookie = $.easyCookie();
        const check_cookie = cookie.has(cookie_name);
        const body = $('body');
        const style = $('<style/>', {
            type: 'text/css'
        }).text('.cookie_consent_content{position:fixed;bottom:0;background:#fff;max-width:850px;left:0;right:0;padding:5px;margin:0 auto;height:auto;display:flex;display:-webkit-flex;align-items:center;justify-content:center;z-index:1000;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:5px 5px 0 0;-moz-border-radius:5px 5px 0 0;border-radius:5px 5px 0 0;-webkit-box-shadow:0 -2px 5px rgba(0,0,0,0.4);-moz-box-shadow:0 -2px 5px rgba(0,0,0,0.4);box-shadow:0 -2px 5px rgba(0,0,0,0.4)}.cookie_consent_content p{margin:0;display:inline-block;word-break:break-all}.cookie_consent_content p > a[href]{color:#606060}.cookie_consent_content button{margin-left:20px;padding:.4em .8em;font-size:.9em;border:2px solid #ddd;text-align:center;border-radius:4px;cursor:pointer;outline:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}@media only screen and (max-width: 600px){.cookie_consent_content button{margin-left:0!important;display:block!important;width:100%!important;margin-top:3px}.cookie_consent_content{border-radius:0!important;display:block!important}}');

        if(cookie_name.length < 1)
            $.error('The cookie_name parameter cannot be empty.');

        template += '<div class="cookie_consent_content">';
            if(message)
                template += '<p>';
                    template += message;
                    if(link && href)
                        template += '&nbsp;<a href="'+href+'">'+link+'</a>';
                template += '</p>';
            if(dismiss)
                template += '<button>'+dismiss+'</button>';
        template += '</div>';

        if(check_cookie !== true){
            $('head').append(style);

            body.append(template);

            $(base_selector).css({
                color: palette.popup.text,
                backgroundColor: palette.popup.background
            });

            $(base_selector + ' p > a[href]').css({
                color: palette.link.text,
                backgroundColor: palette.link.background
            });

            $(base_selector + ' > button').css({
                color: palette.button.text,
                backgroundColor: palette.button.background
            });

            body.on('click', base_selector + ' button', function () {
                if(cookie.setYears(cookie_name, 'active'))
                    $(base_selector).remove();
            });
        }
    };
})(jQuery);