(function(){

// editor.js
UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};

var baidu = window.baidu || {};

window.baidu = baidu;

window.UE = baidu.editor =  window.UE || {};

UE.plugins = {};

UE.commands = {};

UE.instants = {};

UE.I18N = {};

UE._customizeUI = {};

UE.version = "1.4.3";

var dom = UE.dom = {};

// core/browser.js
/**
 * 浏览器判断模块
 * @file
 * @module UE.browser
 * @since 1.2.6.1
 */

/**
 * 提供浏览器检测的模块
 * @unfile
 * @module UE.browser
 */
var browser = UE.browser = function(){
    var agent = navigator.userAgent.toLowerCase(),
        opera = window.opera,
        browser = {
        /**
         * @property {boolean} ie 检测当前浏览器是否为IE
         * @example
         * ```javascript
         * if ( UE.browser.ie ) {
         *     console.log( '当前浏览器是IE' );
         * }
         * ```
         */
        ie		:  /(msie\s|trident.*rv:)([\w.]+)/.test(agent),

        /**
         * @property {boolean} opera 检测当前浏览器是否为Opera
         * @example
         * ```javascript
         * if ( UE.browser.opera ) {
         *     console.log( '当前浏览器是Opera' );
         * }
         * ```
         */
        opera	: ( !!opera && opera.version ),

        /**
         * @property {boolean} webkit 检测当前浏览器是否是webkit内核的浏览器
         * @example
         * ```javascript
         * if ( UE.browser.webkit ) {
         *     console.log( '当前浏览器是webkit内核浏览器' );
         * }
         * ```
         */
        webkit	: ( agent.indexOf( ' applewebkit/' ) > -1 ),

        /**
         * @property {boolean} mac 检测当前浏览器是否是运行在mac平台下
         * @example
         * ```javascript
         * if ( UE.browser.mac ) {
         *     console.log( '当前浏览器运行在mac平台下' );
         * }
         * ```
         */
        mac	: ( agent.indexOf( 'macintosh' ) > -1 ),

        /**
         * @property {boolean} quirks 检测当前浏览器是否处于“怪异模式”下
         * @example
         * ```javascript
         * if ( UE.browser.quirks ) {
         *     console.log( '当前浏览器运行处于“怪异模式”' );
         * }
         * ```
         */
        quirks : ( document.compatMode == 'BackCompat' )
    };

    /**
    * @property {boolean} gecko 检测当前浏览器内核是否是gecko内核
    * @example
    * ```javascript
    * if ( UE.browser.gecko ) {
    *     console.log( '当前浏览器内核是gecko内核' );
    * }
    * ```
    */
    browser.gecko =( navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie);

    var version = 0;

    // Internet Explorer 6.0+
    if ( browser.ie ){

        var v1 =  agent.match(/(?:msie\s([\w.]+))/);
        var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
        if(v1 && v2 && v1[1] && v2[1]){
            version = Math.max(v1[1]*1,v2[1]*1);
        }else if(v1 && v1[1]){
            version = v1[1]*1;
        }else if(v2 && v2[1]){
            version = v2[1]*1;
        }else{
            version = 0;
        }

        browser.ie11Compat = document.documentMode == 11;
        /**
         * @property { boolean } ie9Compat 检测浏览器模式是否为 IE9 兼容模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie9Compat ) {
         *     console.log( '当前浏览器运行在IE9兼容模式下' );
         * }
         * ```
         */
        browser.ie9Compat = document.documentMode == 9;

        /**
         * @property { boolean } ie8 检测浏览器是否是IE8浏览器
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie8 ) {
         *     console.log( '当前浏览器是IE8浏览器' );
         * }
         * ```
         */
        browser.ie8 = !!document.documentMode;

        /**
         * @property { boolean } ie8Compat 检测浏览器模式是否为 IE8 兼容模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie8Compat ) {
         *     console.log( '当前浏览器运行在IE8兼容模式下' );
         * }
         * ```
         */
        browser.ie8Compat = document.documentMode == 8;

        /**
         * @property { boolean } ie7Compat 检测浏览器模式是否为 IE7 兼容模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie7Compat ) {
         *     console.log( '当前浏览器运行在IE7兼容模式下' );
         * }
         * ```
         */
        browser.ie7Compat = ( ( version == 7 && !document.documentMode )
                || document.documentMode == 7 );

        /**
         * @property { boolean } ie6Compat 检测浏览器模式是否为 IE6 模式 或者怪异模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie6Compat ) {
         *     console.log( '当前浏览器运行在IE6模式或者怪异模式下' );
         * }
         * ```
         */
        browser.ie6Compat = ( version < 7 || browser.quirks );

        browser.ie9above = version > 8;

        browser.ie9below = version < 9;

        browser.ie11above = version > 10;

        browser.ie11below = version < 11;

    }

    // Gecko.
    if ( browser.gecko ){
        var geckoRelease = agent.match( /rv:([\d\.]+)/ );
        if ( geckoRelease )
        {
            geckoRelease = geckoRelease[1].split( '.' );
            version = geckoRelease[0] * 10000 + ( geckoRelease[1] || 0 ) * 100 + ( geckoRelease[2] || 0 ) * 1;
        }
    }

    /**
     * @property { Number } chrome 检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号
     * @warning 如果浏览器不是chrome， 则该值为undefined
     * @example
     * ```javascript
     * if ( UE.browser.chrome ) {
     *     console.log( '当前浏览器是Chrome' );
     * }
     * ```
     */
    if (/chrome\/(\d+\.\d)/i.test(agent)) {
        browser.chrome = + RegExp['\x241'];
    }

    /**
     * @property { Number } safari 检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号
     * @warning 如果浏览器不是safari， 则该值为undefined
     * @example
     * ```javascript
     * if ( UE.browser.safari ) {
     *     console.log( '当前浏览器是Safari' );
     * }
     * ```
     */
    if(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)){
    	browser.safari = + (RegExp['\x241'] || RegExp['\x242']);
    }


    // Opera 9.50+
    if ( browser.opera )
        version = parseFloat( opera.version() );

    // WebKit 522+ (Safari 3+)
    if ( browser.webkit )
        version = parseFloat( agent.match( / applewebkit\/(\d+)/ )[1] );

    /**
     * @property { Number } version 检测当前浏览器版本号
     * @remind
     * <ul>
     *     <li>IE系列返回值为5,6,7,8,9,10等</li>
     *     <li>gecko系列会返回10900，158900等</li>
     *     <li>webkit系列会返回其build号 (如 522等)</li>
     * </ul>
     * @example
     * ```javascript
     * console.log( '当前浏览器版本号是： ' + UE.browser.version );
     * ```
     */
    browser.version = version;

    /**
     * @property { boolean } isCompatible 检测当前浏览器是否能够与UEditor良好兼容
     * @example
     * ```javascript
     * if ( UE.browser.isCompatible ) {
     *     console.log( '浏览器与UEditor能够良好兼容' );
     * }
     * ```
     */
    browser.isCompatible =
        !browser.mobile && (
        ( browser.ie && version >= 6 ) ||
        ( browser.gecko && version >= 10801 ) ||
        ( browser.opera && version >= 9.5 ) ||
        ( browser.air && version >= 1 ) ||
        ( browser.webkit && version >= 522 ) ||
        false );
    return browser;
}();
//快捷方式
var ie = browser.ie,
    webkit = browser.webkit,
    gecko = browser.gecko,
    opera = browser.opera;

// core/utils.js
/**
 * 工具函数包
 * @file
 * @module UE.utils
 * @since 1.2.6.1
 */

/**
 * UEditor封装使用的静态工具函数
 * @module UE.utils
 * @unfile
 */

var utils = UE.utils = {

    /**
     * 用给定的迭代器遍历对象
     * @method each
     * @param { Object } obj 需要遍历的对象
     * @param { Function } iterator 迭代器， 该方法接受两个参数， 第一个参数是当前所处理的value， 第二个参数是当前遍历对象的key
     * @example
     * ```javascript
     * var demoObj = {
     *     key1: 1,
     *     key2: 2
     * };
     *
     * //output: key1: 1, key2: 2
     * UE.utils.each( demoObj, funciton ( value, key ) {
     *
     *     console.log( key + ":" + value );
     *
     * } );
     * ```
     */

    /**
     * 用给定的迭代器遍历数组或类数组对象
     * @method each
     * @param { Array } array 需要遍历的数组或者类数组
     * @param { Function } iterator 迭代器， 该方法接受两个参数， 第一个参数是当前所处理的value， 第二个参数是当前遍历对象的key
     * @example
     * ```javascript
     * var divs = document.getElmentByTagNames( "div" );
     *
     * //output: 0: DIV, 1: DIV ...
     * UE.utils.each( divs, funciton ( value, key ) {
     *
     *     console.log( key + ":" + value.tagName );
     *
     * } );
     * ```
     */
    each : function(obj, iterator, context) {
        if (obj == null) return;
        if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if(iterator.call(context, obj[i], i, obj) === false)
                    return false;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if(iterator.call(context, obj[key], key, obj) === false)
                        return false;
                }
            }
        }
    },

    /**
     * 以给定对象作为原型创建一个新对象
     * @method makeInstance
     * @param { Object } protoObject 该对象将作为新创建对象的原型
     * @return { Object } 新的对象， 该对象的原型是给定的protoObject对象
     * @example
     * ```javascript
     *
     * var protoObject = { sayHello: function () { console.log('Hello UEditor!'); } };
     *
     * var newObject = UE.utils.makeInstance( protoObject );
     * //output: Hello UEditor!
     * newObject.sayHello();
     * ```
     */
    makeInstance:function (obj) {
        var noop = new Function();
        noop.prototype = obj;
        obj = new noop;
        noop.prototype = null;
        return obj;
    },

    /**
     * 将source对象中的属性扩展到target对象上
     * @method extend
     * @remind 该方法将强制把source对象上的属性复制到target对象上
     * @see UE.utils.extend(Object,Object,Boolean)
     * @param { Object } target 目标对象， 新的属性将附加到该对象上
     * @param { Object } source 源对象， 该对象的属性会被附加到target对象上
     * @return { Object } 返回target对象
     * @example
     * ```javascript
     *
     * var target = { name: 'target', sex: 1 },
     *      source = { name: 'source', age: 17 };
     *
     * UE.utils.extend( target, source );
     *
     * //output: { name: 'source', sex: 1, age: 17 }
     * console.log( target );
     *
     * ```
     */

    /**
     * 将source对象中的属性扩展到target对象上， 根据指定的isKeepTarget值决定是否保留目标对象中与
     * 源对象属性名相同的属性值。
     * @method extend
     * @param { Object } target 目标对象， 新的属性将附加到该对象上
     * @param { Object } source 源对象， 该对象的属性会被附加到target对象上
     * @param { Boolean } isKeepTarget 是否保留目标对象中与源对象中属性名相同的属性
     * @return { Object } 返回target对象
     * @example
     * ```javascript
     *
     * var target = { name: 'target', sex: 1 },
     *      source = { name: 'source', age: 17 };
     *
     * UE.utils.extend( target, source, true );
     *
     * //output: { name: 'target', sex: 1, age: 17 }
     * console.log( target );
     *
     * ```
     */
    extend:function (t, s, b) {
        if (s) {
            for (var k in s) {
                if (!b || !t.hasOwnProperty(k)) {
                    t[k] = s[k];
                }
            }
        }
        return t;
    },

    /**
     * 将给定的多个对象的属性复制到目标对象target上
     * @method extend2
     * @remind 该方法将强制把源对象上的属性复制到target对象上
     * @remind 该方法支持两个及以上的参数， 从第二个参数开始， 其属性都会被复制到第一个参数上。 如果遇到同名的属性，
     *          将会覆盖掉之前的值。
     * @param { Object } target 目标对象， 新的属性将附加到该对象上
     * @param { Object... } source 源对象， 支持多个对象， 该对象的属性会被附加到target对象上
     * @return { Object } 返回target对象
     * @example
     * ```javascript
     *
     * var target = {},
     *     source1 = { name: 'source', age: 17 },
     *     source2 = { title: 'dev' };
     *
     * UE.utils.extend2( target, source1, source2 );
     *
     * //output: { name: 'source', age: 17, title: 'dev' }
     * console.log( target );
     *
     * ```
     */
    extend2:function (t) {
        var a = arguments;
        for (var i = 1; i < a.length; i++) {
            var x = a[i];
            for (var k in x) {
                if (!t.hasOwnProperty(k)) {
                    t[k] = x[k];
                }
            }
        }
        return t;
    },

    /**
     * 模拟继承机制， 使得subClass继承自superClass
     * @method inherits
     * @param { Object } subClass 子类对象
     * @param { Object } superClass 超类对象
     * @warning 该方法只能让subClass继承超类的原型， subClass对象自身的属性和方法不会被继承
     * @return { Object } 继承superClass后的子类对象
     * @example
     * ```javascript
     * function SuperClass(){
     *     this.name = "小李";
     * }
     *
     * SuperClass.prototype = {
     *     hello:function(str){
     *         console.log(this.name + str);
     *     }
     * }
     *
     * function SubClass(){
     *     this.name = "小张";
     * }
     *
     * UE.utils.inherits(SubClass,SuperClass);
     *
     * var sub = new SubClass();
     * //output: '小张早上好!
     * sub.hello("早上好!");
     * ```
     */
    inherits:function (subClass, superClass) {
        var oldP = subClass.prototype,
            newP = utils.makeInstance(superClass.prototype);
        utils.extend(newP, oldP, true);
        subClass.prototype = newP;
        return (newP.constructor = subClass);
    },

    /**
     * 用指定的context对象作为函数fn的上下文
     * @method bind
     * @param { Function } fn 需要绑定上下文的函数对象
     * @param { Object } content 函数fn新的上下文对象
     * @return { Function } 一个新的函数， 该函数作为原始函数fn的代理， 将完成fn的上下文调换工作。
     * @example
     * ```javascript
     *
     * var name = 'window',
     *     newTest = null;
     *
     * function test () {
     *     console.log( this.name );
     * }
     *
     * newTest = UE.utils.bind( test, { name: 'object' } );
     *
     * //output: object
     * newTest();
     *
     * //output: window
     * test();
     *
     * ```
     */
    bind:function (fn, context) {
        return function () {
            return fn.apply(context, arguments);
        };
    },

    /**
     * 创建延迟指定时间后执行的函数fn
     * @method defer
     * @param { Function } fn 需要延迟执行的函数对象
     * @param { int } delay 延迟的时间， 单位是毫秒
     * @warning 该方法的时间控制是不精确的，仅仅只能保证函数的执行是在给定的时间之后，
     *           而不能保证刚好到达延迟时间时执行。
     * @return { Function } 目标函数fn的代理函数， 只有执行该函数才能起到延时效果
     * @example
     * ```javascript
     * var start = 0;
     *
     * function test(){
     *     console.log( new Date() - start );
     * }
     *
     * var testDefer = UE.utils.defer( test, 1000 );
     * //
     * start = new Date();
     * //output: (大约在1000毫秒之后输出) 1000
     * testDefer();
     * ```
     */

    /**
     * 创建延迟指定时间后执行的函数fn, 如果在延迟时间内再次执行该方法， 将会根据指定的exclusion的值，
     * 决定是否取消前一次函数的执行， 如果exclusion的值为true， 则取消执行，反之，将继续执行前一个方法。
     * @method defer
     * @param { Function } fn 需要延迟执行的函数对象
     * @param { int } delay 延迟的时间， 单位是毫秒
     * @param { Boolean } exclusion 如果在延迟时间内再次执行该函数，该值将决定是否取消执行前一次函数的执行，
     *                     值为true表示取消执行， 反之则将在执行前一次函数之后才执行本次函数调用。
     * @warning 该方法的时间控制是不精确的，仅仅只能保证函数的执行是在给定的时间之后，
     *           而不能保证刚好到达延迟时间时执行。
     * @return { Function } 目标函数fn的代理函数， 只有执行该函数才能起到延时效果
     * @example
     * ```javascript
     *
     * function test(){
     *     console.log(1);
     * }
     *
     * var testDefer = UE.utils.defer( test, 1000, true );
     *
     * //output: (两次调用仅有一次输出) 1
     * testDefer();
     * testDefer();
     * ```
     */
    defer:function (fn, delay, exclusion) {
        var timerID;
        return function () {
            if (exclusion) {
                clearTimeout(timerID);
            }
            timerID = setTimeout(fn, delay);
        };
    },

    /**
     * 获取元素item在数组array中首次出现的位置, 如果未找到item， 则返回-1
     * @method indexOf
     * @remind 该方法的匹配过程使用的是恒等“===”
     * @param { Array } array 需要查找的数组对象
     * @param { * } item 需要在目标数组中查找的值
     * @return { int } 返回item在目标数组array中首次出现的位置， 如果在数组中未找到item， 则返回-1
     * @example
     * ```javascript
     * var item = 1,
     *     arr = [ 3, 4, 6, 8, 1, 1, 2 ];
     *
     * //output: 4
     * console.log( UE.utils.indexOf( arr, item ) );
     * ```
     */

    /**
     * 获取元素item数组array中首次出现的位置, 如果未找到item， 则返回-1。通过start的值可以指定搜索的起始位置。
     * @method indexOf
     * @remind 该方法的匹配过程使用的是恒等“===”
     * @param { Array } array 需要查找的数组对象
     * @param { * } item 需要在目标数组中查找的值
     * @param { int } start 搜索的起始位置
     * @return { int } 返回item在目标数组array中的start位置之后首次出现的位置， 如果在数组中未找到item， 则返回-1
     * @example
     * ```javascript
     * var item = 1,
     *     arr = [ 3, 4, 6, 8, 1, 2, 8, 3, 2, 1, 1, 4 ];
     *
     * //output: 9
     * console.log( UE.utils.indexOf( arr, item, 5 ) );
     * ```
     */
    indexOf:function (array, item, start) {
        var index = -1;
        start = this.isNumber(start) ? start : 0;
        this.each(array, function (v, i) {
            if (i >= start && v === item) {
                index = i;
                return false;
            }
        });
        return index;
    },

    /**
     * 移除数组array中所有的元素item
     * @method removeItem
     * @param { Array } array 要移除元素的目标数组
     * @param { * } item 将要被移除的元素
     * @remind 该方法的匹配过程使用的是恒等“===”
     * @example
     * ```javascript
     * var arr = [ 4, 5, 7, 1, 3, 4, 6 ];
     *
     * UE.utils.removeItem( arr, 4 );
     * //output: [ 5, 7, 1, 3, 6 ]
     * console.log( arr );
     *
     * ```
     */
    removeItem:function (array, item) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                i--;
            }
        }
    },

    /**
     * 删除字符串str的首尾空格
     * @method trim
     * @param { String } str 需要删除首尾空格的字符串
     * @return { String } 删除了首尾的空格后的字符串
     * @example
     * ```javascript
     *
     * var str = " UEdtior ";
     *
     * //output: 9
     * console.log( str.length );
     *
     * //output: 7
     * console.log( UE.utils.trim( " UEdtior " ).length );
     *
     * //output: 9
     * console.log( str.length );
     *
     *  ```
     */
    trim:function (str) {
        return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
    },

    /**
     * 将字符串str以','分隔成数组后，将该数组转换成哈希对象， 其生成的hash对象的key为数组中的元素， value为1
     * @method listToMap
     * @warning 该方法在生成的hash对象中，会为每一个key同时生成一个另一个全大写的key。
     * @param { String } str 该字符串将被以','分割为数组， 然后进行转化
     * @return { Object } 转化之后的hash对象
     * @example
     * ```javascript
     *
     * //output: Object {UEdtior: 1, UEDTIOR: 1, Hello: 1, HELLO: 1}
     * console.log( UE.utils.listToMap( 'UEdtior,Hello' ) );
     *
     * ```
     */

    /**
     * 将字符串数组转换成哈希对象， 其生成的hash对象的key为数组中的元素， value为1
     * @method listToMap
     * @warning 该方法在生成的hash对象中，会为每一个key同时生成一个另一个全大写的key。
     * @param { Array } arr 字符串数组
     * @return { Object } 转化之后的hash对象
     * @example
     * ```javascript
     *
     * //output: Object {UEdtior: 1, UEDTIOR: 1, Hello: 1, HELLO: 1}
     * console.log( UE.utils.listToMap( [ 'UEdtior', 'Hello' ] ) );
     *
     * ```
     */
    listToMap:function (list) {
        if (!list)return {};
        list = utils.isArray(list) ? list : list.split(',');
        for (var i = 0, ci, obj = {}; ci = list[i++];) {
            obj[ci.toUpperCase()] = obj[ci] = 1;
        }
        return obj;
    },

    /**
     * 将str中的html符号转义,将转义“'，&，<，"，>”五个字符
     * @method unhtml
     * @param { String } str 需要转义的字符串
     * @return { String } 转义后的字符串
     * @example
     * ```javascript
     * var html = '<body>&</body>';
     *
     * //output: &lt;body&gt;&amp;&lt;/body&gt;
     * console.log( UE.utils.unhtml( html ) );
     *
     * ```
     */
    unhtml:function (str, reg) {
        return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
            if (b) {
                return a;
            } else {
                return {
                    '<':'&lt;',
                    '&':'&amp;',
                    '"':'&quot;',
                    '>':'&gt;',
                    "'":'&#39;'
                }[a]
            }

        }) : '';
    },

    /**
     * 将str中的转义字符还原成html字符
     * @see UE.utils.unhtml(String);
     * @method html
     * @param { String } str 需要逆转义的字符串
     * @return { String } 逆转义后的字符串
     * @example
     * ```javascript
     *
     * var str = '&lt;body&gt;&amp;&lt;/body&gt;';
     *
     * //output: <body>&</body>
     * console.log( UE.utils.html( str ) );
     *
     * ```
     */
    html:function (str) {
        return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
            return {
                '&lt;':'<',
                '&amp;':'&',
                '&quot;':'"',
                '&gt;':'>',
                '&#39;':"'",
                '&nbsp;':' '
            }[m]
        }) : '';
    },

    /**
     * 将css样式转换为驼峰的形式
     * @method cssStyleToDomStyle
     * @param { String } cssName 需要转换的css样式名
     * @return { String } 转换成驼峰形式后的css样式名
     * @example
     * ```javascript
     *
     * var str = 'border-top';
     *
     * //output: borderTop
     * console.log( UE.utils.cssStyleToDomStyle( str ) );
     *
     * ```
     */
    cssStyleToDomStyle:function () {
        var test = document.createElement('div').style,
            cache = {
                'float':test.cssFloat != undefined ? 'cssFloat' : test.styleFloat != undefined ? 'styleFloat' : 'float'
            };

        return function (cssName) {
            return cache[cssName] || (cache[cssName] = cssName.toLowerCase().replace(/-./g, function (match) {
                return match.charAt(1).toUpperCase();
            }));
        };
    }(),

    /**
     * 动态加载文件到doc中
     * @method loadFile
     * @param { DomDocument } document 需要加载资源文件的文档对象
     * @param { Object } options 加载资源文件的属性集合， 取值请参考代码示例
     * @example
     * ```javascript
     *
     * UE.utils.loadFile( document, {
     *     src:"test.js",
     *     tag:"script",
     *     type:"text/javascript",
     *     defer:"defer"
     * } );
     *
     * ```
     */

    /**
     * 动态加载文件到doc中，加载成功后执行的回调函数fn
     * @method loadFile
     * @param { DomDocument } document 需要加载资源文件的文档对象
     * @param { Object } options 加载资源文件的属性集合， 该集合支持的值是script标签和style标签支持的所有属性。
     * @param { Function } fn 资源文件加载成功之后执行的回调
     * @warning 对于在同一个文档中多次加载同一URL的文件， 该方法会在第一次加载之后缓存该请求，
     *           在此之后的所有同一URL的请求， 将会直接触发回调。
     * @example
     * ```javascript
     *
     * UE.utils.loadFile( document, {
     *     src:"test.js",
     *     tag:"script",
     *     type:"text/javascript",
     *     defer:"defer"
     * }, function () {
     *     console.log('加载成功');
     * } );
     *
     * ```
     */
    loadFile:function () {
        var tmpList = [];

        function getItem(doc, obj) {
            try {
                for (var i = 0, ci; ci = tmpList[i++];) {
                    if (ci.doc === doc && ci.url == (obj.src || obj.href)) {
                        return ci;
                    }
                }
            } catch (e) {
                return null;
            }

        }

        return function (doc, obj, fn) {
            var item = getItem(doc, obj);
            if (item) {
                if (item.ready) {
                    fn && fn();
                } else {
                    item.funs.push(fn)
                }
                return;
            }
            tmpList.push({
                doc:doc,
                url:obj.src || obj.href,
                funs:[fn]
            });
            if (!doc.body) {
                var html = [];
                for (var p in obj) {
                    if (p == 'tag')continue;
                    html.push(p + '="' + obj[p] + '"')
                }
                doc.write('<' + obj.tag + ' ' + html.join(' ') + ' ></' + obj.tag + '>');
                return;
            }
            if (obj.id && doc.getElementById(obj.id)) {
                return;
            }
            var element = doc.createElement(obj.tag);
            delete obj.tag;
            for (var p in obj) {
                element.setAttribute(p, obj[p]);
            }
            element.onload = element.onreadystatechange = function () {
                if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                    item = getItem(doc, obj);
                    if (item.funs.length > 0) {
                        item.ready = 1;
                        for (var fi; fi = item.funs.pop();) {
                            fi();
                        }
                    }
                    element.onload = element.onreadystatechange = null;
                }
            };
            element.onerror = function () {
                throw Error('The load ' + (obj.href || obj.src) + ' fails,check the url settings of file ueditor.config.js ')
            };
            doc.getElementsByTagName("head")[0].appendChild(element);
        }
    }(),

    /**
     * 判断obj对象是否为空
     * @method isEmptyObject
     * @param { * } obj 需要判断的对象
     * @remind 如果判断的对象是NULL， 将直接返回true， 如果是数组且为空， 返回true， 如果是字符串， 且字符串为空，
     *          返回true， 如果是普通对象， 且该对象没有任何实例属性， 返回true
     * @return { Boolean } 对象是否为空
     * @example
     * ```javascript
     *
     * //output: true
     * console.log( UE.utils.isEmptyObject( {} ) );
     *
     * //output: true
     * console.log( UE.utils.isEmptyObject( [] ) );
     *
     * //output: true
     * console.log( UE.utils.isEmptyObject( "" ) );
     *
     * //output: false
     * console.log( UE.utils.isEmptyObject( { key: 1 } ) );
     *
     * //output: false
     * console.log( UE.utils.isEmptyObject( [1] ) );
     *
     * //output: false
     * console.log( UE.utils.isEmptyObject( "1" ) );
     *
     * ```
     */
    isEmptyObject:function (obj) {
        if (obj == null) return true;
        if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return true;
    },

    /**
     * 把rgb格式的颜色值转换成16进制格式
     * @method fixColor
     * @param { String } rgb格式的颜色值
     * @param { String }
     * @example
     * rgb(255,255,255)  => "#ffffff"
     */
    fixColor:function (name, value) {
        if (/color/i.test(name) && /rgba?/.test(value)) {
            var array = value.split(",");
            if (array.length > 3)
                return "";
            value = "#";
            for (var i = 0, color; color = array[i++];) {
                color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
                value += color.length == 1 ? "0" + color : color;
            }
            value = value.toUpperCase();
        }
        return  value;
    },
    /**
     * 只针对border,padding,margin做了处理，因为性能问题
     * @public
     * @function
     * @param {String}    val style字符串
     */
    optCss:function (val) {
        var padding, margin, border;
        val = val.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function (str, key, name, val) {
            if (val.split(' ').length == 1) {
                switch (key) {
                    case 'padding':
                        !padding && (padding = {});
                        padding[name] = val;
                        return '';
                    case 'margin':
                        !margin && (margin = {});
                        margin[name] = val;
                        return '';
                    case 'border':
                        return val == 'initial' ? '' : str;
                }
            }
            return str;
        });

        function opt(obj, name) {
            if (!obj) {
                return '';
            }
            var t = obj.top , b = obj.bottom, l = obj.left, r = obj.right, val = '';
            if (!t || !l || !b || !r) {
                for (var p in obj) {
                    val += ';' + name + '-' + p + ':' + obj[p] + ';';
                }
            } else {
                val += ';' + name + ':' +
                    (t == b && b == l && l == r ? t :
                        t == b && l == r ? (t + ' ' + l) :
                            l == r ? (t + ' ' + l + ' ' + b) : (t + ' ' + r + ' ' + b + ' ' + l)) + ';'
            }
            return val;
        }

        val += opt(padding, 'padding') + opt(margin, 'margin');
        return val.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, '').replace(/;([ \n\r\t]+)|\1;/g, ';')
            .replace(/(&((l|g)t|quot|#39))?;{2,}/g, function (a, b) {
                return b ? b + ";;" : ';'
            });
    },

    /**
     * 克隆对象
     * @method clone
     * @param { Object } source 源对象
     * @return { Object } source的一个副本
     */

    /**
     * 深度克隆对象，将source的属性克隆到target对象， 会覆盖target重名的属性。
     * @method clone
     * @param { Object } source 源对象
     * @param { Object } target 目标对象
     * @return { Object } 附加了source对象所有属性的target对象
     */
    clone:function (source, target) {
        var tmp;
        target = target || {};
        for (var i in source) {
            if (source.hasOwnProperty(i)) {
                tmp = source[i];
                if (typeof tmp == 'object') {
                    target[i] = utils.isArray(tmp) ? [] : {};
                    utils.clone(source[i], target[i])
                } else {
                    target[i] = tmp;
                }
            }
        }
        return target;
    },

    /**
     * 把cm／pt为单位的值转换为px为单位的值
     * @method transUnitToPx
     * @param { String } 待转换的带单位的字符串
     * @return { String } 转换为px为计量单位的值的字符串
     * @example
     * ```javascript
     *
     * //output: 500px
     * console.log( UE.utils.transUnitToPx( '20cm' ) );
     *
     * //output: 27px
     * console.log( UE.utils.transUnitToPx( '20pt' ) );
     *
     * ```
     */
    transUnitToPx:function (val) {
        if (!/(pt|cm)/.test(val)) {
            return val
        }
        var unit;
        val.replace(/([\d.]+)(\w+)/, function (str, v, u) {
            val = v;
            unit = u;
        });
        switch (unit) {
            case 'cm':
                val = parseFloat(val) * 25;
                break;
            case 'pt':
                val = Math.round(parseFloat(val) * 96 / 72);
        }
        return val + (val ? 'px' : '');
    },

    /**
     * 在dom树ready之后执行给定的回调函数
     * @method domReady
     * @remind 如果在执行该方法的时候， dom树已经ready， 那么回调函数将立刻执行
     * @param { Function } fn dom树ready之后的回调函数
     * @example
     * ```javascript
     *
     * UE.utils.domReady( function () {
     *
     *     console.log('123');
     *
     * } );
     *
     * ```
     */
    domReady:function () {

        var fnArr = [];

        function doReady(doc) {
            //确保onready只执行一次
            doc.isReady = true;
            for (var ci; ci = fnArr.pop(); ci()) {
            }
        }

        return function (onready, win) {
            win = win || window;
            var doc = win.document;
            onready && fnArr.push(onready);
            if (doc.readyState === "complete") {
                doReady(doc);
            } else {
                doc.isReady && doReady(doc);
                if (browser.ie && browser.version != 11) {
                    (function () {
                        if (doc.isReady) return;
                        try {
                            doc.documentElement.doScroll("left");
                        } catch (error) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        doReady(doc);
                    })();
                    win.attachEvent('onload', function () {
                        doReady(doc)
                    });
                } else {
                    doc.addEventListener("DOMContentLoaded", function () {
                        doc.removeEventListener("DOMContentLoaded", arguments.callee, false);
                        doReady(doc);
                    }, false);
                    win.addEventListener('load', function () {
                        doReady(doc)
                    }, false);
                }
            }

        }
    }(),

    /**
     * 动态添加css样式
     * @method cssRule
     * @param { String } 节点名称
     * @grammar UE.utils.cssRule('添加的样式的节点名称',['样式'，'放到哪个document上'])
     * @grammar UE.utils.cssRule('body','body{background:#ccc}') => null  //给body添加背景颜色
     * @grammar UE.utils.cssRule('body') =>样式的字符串  //取得key值为body的样式的内容,如果没有找到key值先关的样式将返回空，例如刚才那个背景颜色，将返回 body{background:#ccc}
     * @grammar UE.utils.cssRule('body',document) => 返回指定key的样式，并且指定是哪个document
     * @grammar UE.utils.cssRule('body','') =>null //清空给定的key值的背景颜色
     */
    cssRule:browser.ie && browser.version != 11 ? function (key, style, doc) {
        var indexList, index;
        if(style === undefined || style && style.nodeType && style.nodeType == 9){
            //获取样式
            doc = style && style.nodeType && style.nodeType == 9 ? style : (doc || document);
            indexList = doc.indexList || (doc.indexList = {});
            index = indexList[key];
            if(index !==  undefined){
                return doc.styleSheets[index].cssText
            }
            return undefined;
        }
        doc = doc || document;
        indexList = doc.indexList || (doc.indexList = {});
        index = indexList[key];
        //清除样式
        if(style === ''){
            if(index!== undefined){
                doc.styleSheets[index].cssText = '';
                delete indexList[key];
                return true
            }
            return false;
        }

        //添加样式
        if(index!== undefined){
            sheetStyle =  doc.styleSheets[index];
        }else{
            sheetStyle = doc.createStyleSheet('', index = doc.styleSheets.length);
            indexList[key] = index;
        }
        sheetStyle.cssText = style;
    }: function (key, style, doc) {
        var head, node;
        if(style === undefined || style && style.nodeType && style.nodeType == 9){
            //获取样式
            doc = style && style.nodeType && style.nodeType == 9 ? style : (doc || document);
            node = doc.getElementById(key);
            return node ? node.innerHTML : undefined;
        }
        doc = doc || document;
        node = doc.getElementById(key);

        //清除样式
        if(style === ''){
            if(node){
                node.parentNode.removeChild(node);
                return true
            }
            return false;
        }

        //添加样式
        if(node){
            node.innerHTML = style;
        }else{
            node = doc.createElement('style');
            node.id = key;
            node.innerHTML = style;
            doc.getElementsByTagName('head')[0].appendChild(node);
        }
    },
    sort:function(array,compareFn){
        compareFn = compareFn || function(item1, item2){ return item1.localeCompare(item2);};
        for(var i= 0,len = array.length; i<len; i++){
            for(var j = i,length = array.length; j<length; j++){
                if(compareFn(array[i], array[j]) > 0){
                    var t = array[i];
                    array[i] = array[j];
                    array[j] = t;
                }
            }
        }
        return array;
    },
    serializeParam:function (json) {
        var strArr = [];
        for (var i in json) {
            //忽略默认的几个参数
            if(i=="method" || i=="timeout" || i=="async") continue;
            //传递过来的对象和函数不在提交之列
            if (!((typeof json[i]).toLowerCase() == "function" || (typeof json[i]).toLowerCase() == "object")) {
                strArr.push( encodeURIComponent(i) + "="+encodeURIComponent(json[i]) );
            } else if (utils.isArray(json[i])) {
                //支持传数组内容
                for(var j = 0; j < json[i].length; j++) {
                    strArr.push( encodeURIComponent(i) + "[]="+encodeURIComponent(json[i][j]) );
                }
            }
        }
        return strArr.join("&");
    },
    formatUrl:function (url) {
        var u = url.replace(/&&/g, '&');
        u = u.replace(/\?&/g, '?');
        u = u.replace(/&$/g, '');
        u = u.replace(/&#/g, '#');
        u = u.replace(/&+/g, '&');
        return u;
    },
    isCrossDomainUrl:function (url) {
        var a = document.createElement('a');
        a.href = url;
        if (browser.ie) {
            a.href = a.href;
        }
        return !(a.protocol == location.protocol && a.hostname == location.hostname &&
        (a.port == location.port || (a.port == '80' && location.port == '') || (a.port == '' && location.port == '80')));
    },
    clearEmptyAttrs : function(obj){
        for(var p in obj){
            if(obj[p] === ''){
                delete obj[p]
            }
        }
        return obj;
    },
    str2json : function(s){

        if (!utils.isString(s)) return null;
        if (window.JSON) {
            return JSON.parse(s);
        } else {
            return (new Function("return " + utils.trim(s || '')))();
        }

    },
    json2str : (function(){

        if (window.JSON) {

            return JSON.stringify;

        } else {

            var escapeMap = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"' : '\\"',
                "\\": '\\\\'
            };

            function encodeString(source) {
                if (/["\\\x00-\x1f]/.test(source)) {
                    source = source.replace(
                        /["\\\x00-\x1f]/g,
                        function (match) {
                            var c = escapeMap[match];
                            if (c) {
                                return c;
                            }
                            c = match.charCodeAt();
                            return "\\u00"
                            + Math.floor(c / 16).toString(16)
                            + (c % 16).toString(16);
                        });
                }
                return '"' + source + '"';
            }

            function encodeArray(source) {
                var result = ["["],
                    l = source.length,
                    preComma, i, item;

                for (i = 0; i < l; i++) {
                    item = source[i];

                    switch (typeof item) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            if(preComma) {
                                result.push(',');
                            }
                            result.push(utils.json2str(item));
                            preComma = 1;
                    }
                }
                result.push("]");
                return result.join("");
            }

            function pad(source) {
                return source < 10 ? '0' + source : source;
            }

            function encodeDate(source){
                return '"' + source.getFullYear() + "-"
                + pad(source.getMonth() + 1) + "-"
                + pad(source.getDate()) + "T"
                + pad(source.getHours()) + ":"
                + pad(source.getMinutes()) + ":"
                + pad(source.getSeconds()) + '"';
            }

            return function (value) {
                switch (typeof value) {
                    case 'undefined':
                        return 'undefined';

                    case 'number':
                        return isFinite(value) ? String(value) : "null";

                    case 'string':
                        return encodeString(value);

                    case 'boolean':
                        return String(value);

                    default:
                        if (value === null) {
                            return 'null';
                        } else if (utils.isArray(value)) {
                            return encodeArray(value);
                        } else if (utils.isDate(value)) {
                            return encodeDate(value);
                        } else {
                            var result = ['{'],
                                encode = utils.json2str,
                                preComma,
                                item;

                            for (var key in value) {
                                if (Object.prototype.hasOwnProperty.call(value, key)) {
                                    item = value[key];
                                    switch (typeof item) {
                                        case 'undefined':
                                        case 'unknown':
                                        case 'function':
                                            break;
                                        default:
                                            if (preComma) {
                                                result.push(',');
                                            }
                                            preComma = 1;
                                            result.push(encode(key) + ':' + encode(item));
                                    }
                                }
                            }
                            result.push('}');
                            return result.join('');
                        }
                }
            };
        }

    })()

};
/**
 * 判断给定的对象是否是字符串
 * @method isString
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是字符串
 */

/**
 * 判断给定的对象是否是数组
 * @method isArray
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是数组
 */

/**
 * 判断给定的对象是否是一个Function
 * @method isFunction
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是Function
 */

/**
 * 判断给定的对象是否是Number
 * @method isNumber
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是Number
 */

/**
 * 判断给定的对象是否是一个正则表达式
 * @method isRegExp
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是正则表达式
 */

/**
 * 判断给定的对象是否是一个普通对象
 * @method isObject
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是普通对象
 */
utils.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'], function (v) {
    UE.utils['is' + v] = function (obj) {
        return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    }
});

// core/EventBase.js
/**
 * UE采用的事件基类
 * @file
 * @module UE
 * @class EventBase
 * @since 1.2.6.1
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @unfile
 * @module UE
 */

/**
 * UE采用的事件基类，继承此类的对应类将获取addListener,removeListener,fireEvent方法。
 * 在UE中，Editor以及所有ui实例都继承了该类，故可以在对应的ui对象以及editor对象上使用上述方法。
 * @unfile
 * @module UE
 * @class EventBase
 */

/**
 * 通过此构造器，子类可以继承EventBase获取事件监听的方法
 * @constructor
 * @example
 * ```javascript
 * UE.EventBase.call(editor);
 * ```
 */
var EventBase = UE.EventBase = function () {};

EventBase.prototype = {

    /**
     * 注册事件监听器
     * @method addListener
     * @param { String } types 监听的事件名称，同时监听多个事件使用空格分隔
     * @param { Function } fn 监听的事件被触发时，会执行该回调函数
     * @waining 事件被触发时，监听的函数假如返回的值恒等于true，回调函数的队列中后面的函数将不执行
     * @example
     * ```javascript
     * editor.addListener('selectionchange',function(){
     *      console.log("选区已经变化！");
     * })
     * editor.addListener('beforegetcontent aftergetcontent',function(type){
     *         if(type == 'beforegetcontent'){
     *             //do something
     *         }else{
     *             //do something
     *         }
     *         console.log(this.getContent) // this是注册的事件的编辑器实例
     * })
     * ```
     * @see UE.EventBase:fireEvent(String)
     */
    addListener:function (types, listener) {
        types = utils.trim(types).split(/\s+/);
        for (var i = 0, ti; ti = types[i++];) {
            getListener(this, ti, true).push(listener);
        }
    },

    on : function(types, listener){
      return this.addListener(types,listener);
    },
    off : function(types, listener){
        return this.removeListener(types, listener)
    },
    trigger:function(){
        return this.fireEvent.apply(this,arguments);
    },
    /**
     * 移除事件监听器
     * @method removeListener
     * @param { String } types 移除的事件名称，同时移除多个事件使用空格分隔
     * @param { Function } fn 移除监听事件的函数引用
     * @example
     * ```javascript
     * //changeCallback为方法体
     * editor.removeListener("selectionchange",changeCallback);
     * ```
     */
    removeListener:function (types, listener) {
        types = utils.trim(types).split(/\s+/);
        for (var i = 0, ti; ti = types[i++];) {
            utils.removeItem(getListener(this, ti) || [], listener);
        }
    },

    /**
     * 触发事件
     * @method fireEvent
     * @param { String } types 触发的事件名称，同时触发多个事件使用空格分隔
     * @remind 该方法会触发addListener
     * @return { * } 返回触发事件的队列中，最后执行的回调函数的返回值
     * @example
     * ```javascript
     * editor.fireEvent("selectionchange");
     * ```
     */

    /**
     * 触发事件
     * @method fireEvent
     * @param { String } types 触发的事件名称，同时触发多个事件使用空格分隔
     * @param { *... } options 可选参数，可以传入一个或多个参数，会传给事件触发的回调函数
     * @return { * } 返回触发事件的队列中，最后执行的回调函数的返回值
     * @example
     * ```javascript
     *
     * editor.addListener( "selectionchange", function ( type, arg1, arg2 ) {
     *
     *     console.log( arg1 + " " + arg2 );
     *
     * } );
     *
     * //触发selectionchange事件， 会执行上面的事件监听器
     * //output: Hello World
     * editor.fireEvent("selectionchange", "Hello", "World");
     * ```
     */
    fireEvent:function () {
        var types = arguments[0];
        types = utils.trim(types).split(' ');
        for (var i = 0, ti; ti = types[i++];) {
            var listeners = getListener(this, ti),
                r, t, k;
            if (listeners) {
                k = listeners.length;
                while (k--) {
                    if(!listeners[k])continue;
                    t = listeners[k].apply(this, arguments);
                    if(t === true){
                        return t;
                    }
                    if (t !== undefined) {
                        r = t;
                    }
                }
            }
            if (t = this['on' + ti.toLowerCase()]) {
                r = t.apply(this, arguments);
            }
        }
        return r;
    }
};
/**
 * 获得对象所拥有监听类型的所有监听器
 * @unfile
 * @module UE
 * @since 1.2.6.1
 * @method getListener
 * @public
 * @param { Object } obj  查询监听器的对象
 * @param { String } type 事件类型
 * @param { Boolean } force  为true且当前所有type类型的侦听器不存在时，创建一个空监听器数组
 * @return { Array } 监听器数组
 */
function getListener(obj, type, force) {
    var allListeners;
    type = type.toLowerCase();
    return ( ( allListeners = ( obj.__allListeners || force && ( obj.__allListeners = {} ) ) )
        && ( allListeners[type] || force && ( allListeners[type] = [] ) ) );
}



// core/dtd.js
///import editor.js
///import core/dom/dom.js
///import core/utils.js
/**
 * dtd html语义化的体现类
 * @constructor
 * @namespace dtd
 */
var dtd = dom.dtd = (function() {
    function _( s ) {
        for (var k in s) {
            s[k.toUpperCase()] = s[k];
        }
        return s;
    }
    var X = utils.extend2;
    var A = _({isindex:1,fieldset:1}),
        B = _({input:1,button:1,select:1,textarea:1,label:1}),
        C = X( _({a:1}), B ),
        D = X( {iframe:1}, C ),
        E = _({hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1}),
        F = _({ins:1,del:1,script:1,style:1}),
        G = X( _({b:1,acronym:1,bdo:1,'var':1,'#':1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1}), F ),
        H = X( _({sub:1,img:1,embed:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1}), G ),
        I = X( _({p:1}), H ),
        J = X( _({iframe:1}), H, B ),
        K = _({img:1,embed:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,'#':1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,'var':1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1}),

        L = X( _({a:0}), J ),//a不能被切开，所以把他
        M = _({tr:1}),
        N = _({'#':1}),
        O = X( _({param:1}), K ),
        P = X( _({form:1}), A, D, E, I ),
        Q = _({li:1,ol:1,ul:1}),
        R = _({style:1,script:1}),
        S = _({base:1,link:1,meta:1,title:1}),
        T = X( S, R ),
        U = _({head:1,body:1}),
        V = _({html:1});

    var block = _({address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1}),

        empty =  _({area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1});

    return  _({

        // $ 表示自定的属性

        // body外的元素列表.
        $nonBodyContent: X( V, U, S ),

        //块结构元素列表
        $block : block,

        //内联元素列表
        $inline : L,

        $inlineWithA : X(_({a:1}),L),

        $body : X( _({script:1,style:1}), block ),

        $cdata : _({script:1,style:1}),

        //自闭和元素
        $empty : empty,

        //不是自闭合，但不能让range选中里边
        $nonChild : _({iframe:1,textarea:1}),
        //列表元素列表
        $listItem : _({dd:1,dt:1,li:1}),

        //列表根元素列表
        $list: _({ul:1,ol:1,dl:1}),

        //不能认为是空的元素
        $isNotEmpty : _({table:1,ul:1,ol:1,dl:1,iframe:1,area:1,base:1,col:1,hr:1,img:1,embed:1,input:1,link:1,meta:1,param:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1}),

        //如果没有子节点就可以删除的元素列表，像span,a
        $removeEmpty : _({a:1,abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,'var':1}),

        $removeEmptyBlock : _({'p':1,'div':1}),

        //在table元素里的元素列表
        $tableContent : _({caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1,table:1}),
        //不转换的标签
        $notTransContent : _({pre:1,script:1,style:1,textarea:1}),
        html: U,
        head: T,
        style: N,
        script: N,
        body: P,
        base: {},
        link: {},
        meta: {},
        title: N,
        col : {},
        tr : _({td:1,th:1}),
        img : {},
        embed: {},
        colgroup : _({thead:1,col:1,tbody:1,tr:1,tfoot:1}),
        noscript : P,
        td : P,
        br : {},
        th : P,
        center : P,
        kbd : L,
        button : X( I, E ),
        basefont : {},
        h5 : L,
        h4 : L,
        samp : L,
        h6 : L,
        ol : Q,
        h1 : L,
        h3 : L,
        option : N,
        h2 : L,
        form : X( A, D, E, I ),
        select : _({optgroup:1,option:1}),
        font : L,
        ins : L,
        menu : Q,
        abbr : L,
        label : L,
        table : _({thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1}),
        code : L,
        tfoot : M,
        cite : L,
        li : P,
        input : {},
        iframe : P,
        strong : L,
        textarea : N,
        noframes : P,
        big : L,
        small : L,
        //trace:
        span :_({'#':1,br:1,b:1,strong:1,u:1,i:1,em:1,sub:1,sup:1,strike:1,span:1}),
        hr : L,
        dt : L,
        sub : L,
        optgroup : _({option:1}),
        param : {},
        bdo : L,
        'var' : L,
        div : P,
        object : O,
        sup : L,
        dd : P,
        strike : L,
        area : {},
        dir : Q,
        map : X( _({area:1,form:1,p:1}), A, F, E ),
        applet : O,
        dl : _({dt:1,dd:1}),
        del : L,
        isindex : {},
        fieldset : X( _({legend:1}), K ),
        thead : M,
        ul : Q,
        acronym : L,
        b : L,
        a : X( _({a:1}), J ),
        blockquote :X(_({td:1,tr:1,tbody:1,li:1}),P),
        caption : L,
        i : L,
        u : L,
        tbody : M,
        s : L,
        address : X( D, I ),
        tt : L,
        legend : L,
        q : L,
        pre : X( G, C ),
        p : X(_({'a':1}),L),
        em :L,
        dfn : L
    });
})();


// core/domUtils.js
/**
 * Dom操作工具包
 * @file
 * @module UE.dom.domUtils
 * @since 1.2.6.1
 */

/**
 * Dom操作工具包
 * @unfile
 * @module UE.dom.domUtils
 */
function getDomNode(node, start, ltr, startFromChild, fn, guard) {
    var tmpNode = startFromChild && node[start],
        parent;
    !tmpNode && (tmpNode = node[ltr]);
    while (!tmpNode && (parent = (parent || node).parentNode)) {
        if (parent.tagName == 'BODY' || guard && !guard(parent)) {
            return null;
        }
        tmpNode = parent[ltr];
    }
    if (tmpNode && fn && !fn(tmpNode)) {
        return  getDomNode(tmpNode, start, ltr, false, fn);
    }
    return tmpNode;
}
var attrFix = ie && browser.version < 9 ? {
        tabindex:"tabIndex",
        readonly:"readOnly",
        "for":"htmlFor",
        "class":"className",
        maxlength:"maxLength",
        cellspacing:"cellSpacing",
        cellpadding:"cellPadding",
        rowspan:"rowSpan",
        colspan:"colSpan",
        usemap:"useMap",
        frameborder:"frameBorder"
    } : {
        tabindex:"tabIndex",
        readonly:"readOnly"
    },
    styleBlock = utils.listToMap([
        '-webkit-box', '-moz-box', 'block' ,
        'list-item' , 'table' , 'table-row-group' ,
        'table-header-group', 'table-footer-group' ,
        'table-row' , 'table-column-group' , 'table-column' ,
        'table-cell' , 'table-caption'
    ]);
var domUtils = dom.domUtils = {
    //节点常量
    NODE_ELEMENT:1,
    NODE_DOCUMENT:9,
    NODE_TEXT:3,
    NODE_COMMENT:8,
    NODE_DOCUMENT_FRAGMENT:11,

    //位置关系
    POSITION_IDENTICAL:0,
    POSITION_DISCONNECTED:1,
    POSITION_FOLLOWING:2,
    POSITION_PRECEDING:4,
    POSITION_IS_CONTAINED:8,
    POSITION_CONTAINS:16,
    //ie6使用其他的会有一段空白出现
    fillChar:ie && browser.version == '6' ? '\ufeff' : '\u200B',
    //-------------------------Node部分--------------------------------
    keys:{
        /*Backspace*/ 8:1, /*Delete*/ 46:1,
        /*Shift*/ 16:1, /*Ctrl*/ 17:1, /*Alt*/ 18:1,
        37:1, 38:1, 39:1, 40:1,
        13:1 /*enter*/
    },
    /**
     * 获取节点A相对于节点B的位置关系
     * @method getPosition
     * @param { Node } nodeA 需要查询位置关系的节点A
     * @param { Node } nodeB 需要查询位置关系的节点B
     * @return { Number } 节点A与节点B的关系
     * @example
     * ```javascript
     * //output: 20
     * var position = UE.dom.domUtils.getPosition( document.documentElement, document.body );
     *
     * switch ( position ) {
     *
     *      //0
     *      case UE.dom.domUtils.POSITION_IDENTICAL:
     *          console.log('元素相同');
     *          break;
     *      //1
     *      case UE.dom.domUtils.POSITION_DISCONNECTED:
     *          console.log('两个节点在不同的文档中');
     *          break;
     *      //2
     *      case UE.dom.domUtils.POSITION_FOLLOWING:
     *          console.log('节点A在节点B之后');
     *          break;
     *      //4
     *      case UE.dom.domUtils.POSITION_PRECEDING;
     *          console.log('节点A在节点B之前');
     *          break;
     *      //8
     *      case UE.dom.domUtils.POSITION_IS_CONTAINED:
     *          console.log('节点A被节点B包含');
     *          break;
     *      case 10:
     *          console.log('节点A被节点B包含且节点A在节点B之后');
     *          break;
     *      //16
     *      case UE.dom.domUtils.POSITION_CONTAINS:
     *          console.log('节点A包含节点B');
     *          break;
     *      case 20:
     *          console.log('节点A包含节点B且节点A在节点B之前');
     *          break;
     *
     * }
     * ```
     */
    getPosition:function (nodeA, nodeB) {
        // 如果两个节点是同一个节点
        if (nodeA === nodeB) {
            // domUtils.POSITION_IDENTICAL
            return 0;
        }
        var node,
            parentsA = [nodeA],
            parentsB = [nodeB];
        node = nodeA;
        while (node = node.parentNode) {
            // 如果nodeB是nodeA的祖先节点
            if (node === nodeB) {
                // domUtils.POSITION_IS_CONTAINED + domUtils.POSITION_FOLLOWING
                return 10;
            }
            parentsA.push(node);
        }
        node = nodeB;
        while (node = node.parentNode) {
            // 如果nodeA是nodeB的祖先节点
            if (node === nodeA) {
                // domUtils.POSITION_CONTAINS + domUtils.POSITION_PRECEDING
                return 20;
            }
            parentsB.push(node);
        }
        parentsA.reverse();
        parentsB.reverse();
        if (parentsA[0] !== parentsB[0]) {
            // domUtils.POSITION_DISCONNECTED
            return 1;
        }
        var i = -1;
        while (i++, parentsA[i] === parentsB[i]) {
        }
        nodeA = parentsA[i];
        nodeB = parentsB[i];
        while (nodeA = nodeA.nextSibling) {
            if (nodeA === nodeB) {
                // domUtils.POSITION_PRECEDING
                return 4
            }
        }
        // domUtils.POSITION_FOLLOWING
        return  2;
    },

    /**
     * 检测节点node在父节点中的索引位置
     * @method getNodeIndex
     * @param { Node } node 需要检测的节点对象
     * @return { Number } 该节点在父节点中的位置
     * @see UE.dom.domUtils.getNodeIndex(Node,Boolean)
     */

    /**
     * 检测节点node在父节点中的索引位置， 根据给定的mergeTextNode参数决定是否要合并多个连续的文本节点为一个节点
     * @method getNodeIndex
     * @param { Node } node 需要检测的节点对象
     * @param { Boolean } mergeTextNode 是否合并多个连续的文本节点为一个节点
     * @return { Number } 该节点在父节点中的位置
     * @example
     * ```javascript
     *
     *      var node = document.createElement("div");
     *
     *      node.appendChild( document.createTextNode( "hello" ) );
     *      node.appendChild( document.createTextNode( "world" ) );
     *      node.appendChild( node = document.createElement( "div" ) );
     *
     *      //output: 2
     *      console.log( UE.dom.domUtils.getNodeIndex( node ) );
     *
     *      //output: 1
     *      console.log( UE.dom.domUtils.getNodeIndex( node, true ) );
     *
     * ```
     */
    getNodeIndex:function (node, ignoreTextNode) {
        var preNode = node,
            i = 0;
        while (preNode = preNode.previousSibling) {
            if (ignoreTextNode && preNode.nodeType == 3) {
                if(preNode.nodeType != preNode.nextSibling.nodeType ){
                    i++;
                }
                continue;
            }
            i++;
        }
        return i;
    },

    /**
     * 检测节点node是否在给定的document对象上
     * @method inDoc
     * @param { Node } node 需要检测的节点对象
     * @param { DomDocument } doc 需要检测的document对象
     * @return { Boolean } 该节点node是否在给定的document的dom树上
     * @example
     * ```javascript
     *
     * var node = document.createElement("div");
     *
     * //output: false
     * console.log( UE.do.domUtils.inDoc( node, document ) );
     *
     * document.body.appendChild( node );
     *
     * //output: true
     * console.log( UE.do.domUtils.inDoc( node, document ) );
     *
     * ```
     */
    inDoc:function (node, doc) {
        return domUtils.getPosition(node, doc) == 10;
    },
    /**
     * 根据给定的过滤规则filterFn， 查找符合该过滤规则的node节点的第一个祖先节点，
     * 查找的起点是给定node节点的父节点。
     * @method findParent
     * @param { Node } node 需要查找的节点
     * @param { Function } filterFn 自定义的过滤方法。
     * @warning 查找的终点是到body节点为止
     * @remind 自定义的过滤方法filterFn接受一个Node对象作为参数， 该对象代表当前执行检测的祖先节点。 如果该
     *          节点满足过滤条件， 则要求返回true， 这时将直接返回该节点作为findParent()的结果， 否则， 请返回false。
     * @return { Node | Null } 如果找到符合过滤条件的节点， 就返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var filterNode = UE.dom.domUtils.findParent( document.body.firstChild, function ( node ) {
     *
     *     //由于查找的终点是body节点， 所以永远也不会匹配当前过滤器的条件， 即这里永远会返回false
     *     return node.tagName === "HTML";
     *
     * } );
     *
     * //output: true
     * console.log( filterNode === null );
     * ```
     */

    /**
     * 根据给定的过滤规则filterFn， 查找符合该过滤规则的node节点的第一个祖先节点，
     * 如果includeSelf的值为true，则查找的起点是给定的节点node， 否则， 起点是node的父节点
     * @method findParent
     * @param { Node } node 需要查找的节点
     * @param { Function } filterFn 自定义的过滤方法。
     * @param { Boolean } includeSelf 查找过程是否包含自身
     * @warning 查找的终点是到body节点为止
     * @remind 自定义的过滤方法filterFn接受一个Node对象作为参数， 该对象代表当前执行检测的祖先节点。 如果该
     *          节点满足过滤条件， 则要求返回true， 这时将直接返回该节点作为findParent()的结果， 否则， 请返回false。
     * @remind 如果includeSelf为true， 则过滤器第一次执行时的参数会是节点本身。
     *          反之， 过滤器第一次执行时的参数将是该节点的父节点。
     * @return { Node | Null } 如果找到符合过滤条件的节点， 就返回该节点， 否则返回NULL
     * @example
     * ```html
     * <body>
     *
     *      <div id="test">
     *      </div>
     *
     *      <script type="text/javascript">
     *
     *          //output: DIV, BODY
     *          var filterNode = UE.dom.domUtils.findParent( document.getElementById( "test" ), function ( node ) {
     *
     *              console.log( node.tagName );
     *              return false;
     *
     *          }, true );
     *
     *      </script>
     * </body>
     * ```
     */
    findParent:function (node, filterFn, includeSelf) {
        if (node && !domUtils.isBody(node)) {
            node = includeSelf ? node : node.parentNode;
            while (node) {
                if (!filterFn || filterFn(node) || domUtils.isBody(node)) {
                    return filterFn && !filterFn(node) && domUtils.isBody(node) ? null : node;
                }
                node = node.parentNode;
            }
        }
        return null;
    },
    /**
     * 查找node的节点名为tagName的第一个祖先节点， 查找的起点是node节点的父节点。
     * @method findParentByTagName
     * @param { Node } node 需要查找的节点对象
     * @param { Array } tagNames 需要查找的父节点的名称数组
     * @warning 查找的终点是到body节点为止
     * @return { Node | NULL } 如果找到符合条件的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var node = UE.dom.domUtils.findParentByTagName( document.getElementsByTagName("div")[0], [ "BODY" ] );
     * //output: BODY
     * console.log( node.tagName );
     * ```
     */

    /**
     * 查找node的节点名为tagName的祖先节点， 如果includeSelf的值为true，则查找的起点是给定的节点node，
     * 否则， 起点是node的父节点。
     * @method findParentByTagName
     * @param { Node } node 需要查找的节点对象
     * @param { Array } tagNames 需要查找的父节点的名称数组
     * @param { Boolean } includeSelf 查找过程是否包含node节点自身
     * @warning 查找的终点是到body节点为止
     * @return { Node | NULL } 如果找到符合条件的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var queryTarget = document.getElementsByTagName("div")[0];
     * var node = UE.dom.domUtils.findParentByTagName( queryTarget, [ "DIV" ], true );
     * //output: true
     * console.log( queryTarget === node );
     * ```
     */
    findParentByTagName:function (node, tagNames, includeSelf, excludeFn) {
        tagNames = utils.listToMap(utils.isArray(tagNames) ? tagNames : [tagNames]);
        return domUtils.findParent(node, function (node) {
            return tagNames[node.tagName] && !(excludeFn && excludeFn(node));
        }, includeSelf);
    },
    /**
     * 查找节点node的祖先节点集合， 查找的起点是给定节点的父节点，结果集中不包含给定的节点。
     * @method findParents
     * @param { Node } node 需要查找的节点对象
     * @return { Array } 给定节点的祖先节点数组
     * @grammar UE.dom.domUtils.findParents(node)  => Array  //返回一个祖先节点数组集合，不包含自身
     * @grammar UE.dom.domUtils.findParents(node,includeSelf)  => Array  //返回一个祖先节点数组集合，includeSelf指定是否包含自身
     * @grammar UE.dom.domUtils.findParents(node,includeSelf,filterFn)  => Array  //返回一个祖先节点数组集合，filterFn指定过滤条件，返回true的node将被选取
     * @grammar UE.dom.domUtils.findParents(node,includeSelf,filterFn,closerFirst)  => Array  //返回一个祖先节点数组集合，closerFirst为true的话，node的直接父亲节点是数组的第0个
     */

    /**
     * 查找节点node的祖先节点集合， 如果includeSelf的值为true，
     * 则返回的结果集中允许出现当前给定的节点， 否则， 该节点不会出现在其结果集中。
     * @method findParents
     * @param { Node } node 需要查找的节点对象
     * @param { Boolean } includeSelf 查找的结果中是否允许包含当前查找的节点对象
     * @return { Array } 给定节点的祖先节点数组
     */
    findParents:function (node, includeSelf, filterFn, closerFirst) {
        var parents = includeSelf && ( filterFn && filterFn(node) || !filterFn ) ? [node] : [];
        while (node = domUtils.findParent(node, filterFn)) {
            parents.push(node);
        }
        return closerFirst ? parents : parents.reverse();
    },

    /**
     * 在节点node后面插入新节点newNode
     * @method insertAfter
     * @param { Node } node 目标节点
     * @param { Node } newNode 新插入的节点， 该节点将置于目标节点之后
     * @return { Node } 新插入的节点
     */
    insertAfter:function (node, newNode) {
        return node.nextSibling ? node.parentNode.insertBefore(newNode, node.nextSibling):
            node.parentNode.appendChild(newNode);
    },

    /**
     * 删除节点node及其下属的所有节点
     * @method remove
     * @param { Node } node 需要删除的节点对象
     * @return { Node } 返回刚删除的节点对象
     * @example
     * ```html
     * <div id="test">
     *     <div id="child">你好</div>
     * </div>
     * <script>
     *     UE.dom.domUtils.remove( document.body, false );
     *     //output: false
     *     console.log( document.getElementById( "child" ) !== null );
     * </script>
     * ```
     */

    /**
     * 删除节点node，并根据keepChildren的值决定是否保留子节点
     * @method remove
     * @param { Node } node 需要删除的节点对象
     * @param { Boolean } keepChildren 是否需要保留子节点
     * @return { Node } 返回刚删除的节点对象
     * @example
     * ```html
     * <div id="test">
     *     <div id="child">你好</div>
     * </div>
     * <script>
     *     UE.dom.domUtils.remove( document.body, true );
     *     //output: true
     *     console.log( document.getElementById( "child" ) !== null );
     * </script>
     * ```
     */
    remove:function (node, keepChildren) {
        var parent = node.parentNode,
            child;
        if (parent) {
            if (keepChildren && node.hasChildNodes()) {
                while (child = node.firstChild) {
                    parent.insertBefore(child, node);
                }
            }
            parent.removeChild(node);
        }
        return node;
    },

    /**
     * 取得node节点的下一个兄弟节点， 如果该节点其后没有兄弟节点， 则递归查找其父节点之后的第一个兄弟节点，
     * 直到找到满足条件的节点或者递归到BODY节点之后才会结束。
     * @method getNextDomNode
     * @param { Node } node 需要获取其后的兄弟节点的节点对象
     * @return { Node | NULL } 如果找满足条件的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```html
     *     <body>
     *      <div id="test">
     *          <span></span>
     *      </div>
     *      <i>xxx</i>
     * </body>
     * <script>
     *
     *     //output: i节点
     *     console.log( UE.dom.domUtils.getNextDomNode( document.getElementById( "test" ) ) );
     *
     * </script>
     * ```
     * @example
     * ```html
     * <body>
     *      <div>
     *          <span></span>
     *          <i id="test">xxx</i>
     *      </div>
     *      <b>xxx</b>
     * </body>
     * <script>
     *
     *     //由于id为test的i节点之后没有兄弟节点， 则查找其父节点（div）后面的兄弟节点
     *     //output: b节点
     *     console.log( UE.dom.domUtils.getNextDomNode( document.getElementById( "test" ) ) );
     *
     * </script>
     * ```
     */

    /**
     * 取得node节点的下一个兄弟节点， 如果startFromChild的值为ture，则先获取其子节点，
     * 如果有子节点则直接返回第一个子节点；如果没有子节点或者startFromChild的值为false，
     * 则执行<a href="#UE.dom.domUtils.getNextDomNode(Node)">getNextDomNode(Node node)</a>的查找过程。
     * @method getNextDomNode
     * @param { Node } node 需要获取其后的兄弟节点的节点对象
     * @param { Boolean } startFromChild 查找过程是否从其子节点开始
     * @return { Node | NULL } 如果找满足条件的节点， 则返回该节点， 否则返回NULL
     * @see UE.dom.domUtils.getNextDomNode(Node)
     */
    getNextDomNode:function (node, startFromChild, filterFn, guard) {
        return getDomNode(node, 'firstChild', 'nextSibling', startFromChild, filterFn, guard);
    },
    getPreDomNode:function (node, startFromChild, filterFn, guard) {
        return getDomNode(node, 'lastChild', 'previousSibling', startFromChild, filterFn, guard);
    },
    /**
     * 检测节点node是否属是UEditor定义的bookmark节点
     * @method isBookmarkNode
     * @private
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 是否是bookmark节点
     * @example
     * ```html
     * <span id="_baidu_bookmark_1"></span>
     * <script>
     *      var bookmarkNode = document.getElementById("_baidu_bookmark_1");
     *      //output: true
     *      console.log( UE.dom.domUtils.isBookmarkNode( bookmarkNode ) );
     * </script>
     * ```
     */
    isBookmarkNode:function (node) {
        return node.nodeType == 1 && node.id && /^_baidu_bookmark_/i.test(node.id);
    },
    /**
     * 获取节点node所属的window对象
     * @method  getWindow
     * @param { Node } node 节点对象
     * @return { Window } 当前节点所属的window对象
     * @example
     * ```javascript
     * //output: true
     * console.log( UE.dom.domUtils.getWindow( document.body ) === window );
     * ```
     */
    getWindow:function (node) {
        var doc = node.ownerDocument || node;
        return doc.defaultView || doc.parentWindow;
    },
    /**
     * 获取离nodeA与nodeB最近的公共的祖先节点
     * @method  getCommonAncestor
     * @param { Node } nodeA 第一个节点
     * @param { Node } nodeB 第二个节点
     * @remind 如果给定的两个节点是同一个节点， 将直接返回该节点。
     * @return { Node | NULL } 如果未找到公共节点， 返回NULL， 否则返回最近的公共祖先节点。
     * @example
     * ```javascript
     * var commonAncestor = UE.dom.domUtils.getCommonAncestor( document.body, document.body.firstChild );
     * //output: true
     * console.log( commonAncestor.tagName.toLowerCase() === 'body' );
     * ```
     */
    getCommonAncestor:function (nodeA, nodeB) {
        if (nodeA === nodeB)
            return nodeA;
        var parentsA = [nodeA] , parentsB = [nodeB], parent = nodeA, i = -1;
        while (parent = parent.parentNode) {
            if (parent === nodeB) {
                return parent;
            }
            parentsA.push(parent);
        }
        parent = nodeB;
        while (parent = parent.parentNode) {
            if (parent === nodeA)
                return parent;
            parentsB.push(parent);
        }
        parentsA.reverse();
        parentsB.reverse();
        while (i++, parentsA[i] === parentsB[i]) {
        }
        return i == 0 ? null : parentsA[i - 1];

    },
    /**
     * 清除node节点左右连续为空的兄弟inline节点
     * @method clearEmptySibling
     * @param { Node } node 执行的节点对象， 如果该节点的左右连续的兄弟节点是空的inline节点，
     * 则这些兄弟节点将被删除
     * @grammar UE.dom.domUtils.clearEmptySibling(node,ignoreNext)  //ignoreNext指定是否忽略右边空节点
     * @grammar UE.dom.domUtils.clearEmptySibling(node,ignoreNext,ignorePre)  //ignorePre指定是否忽略左边空节点
     * @example
     * ```html
     * <body>
     *     <div></div>
     *     <span id="test"></span>
     *     <i></i>
     *     <b></b>
     *     <em>xxx</em>
     *     <span></span>
     * </body>
     * <script>
     *
     *      UE.dom.domUtils.clearEmptySibling( document.getElementById( "test" ) );
     *
     *      //output: <div></div><span id="test"></span><em>xxx</em><span></span>
     *      console.log( document.body.innerHTML );
     *
     * </script>
     * ```
     */

    /**
     * 清除node节点左右连续为空的兄弟inline节点， 如果ignoreNext的值为true，
     * 则忽略对右边兄弟节点的操作。
     * @method clearEmptySibling
     * @param { Node } node 执行的节点对象， 如果该节点的左右连续的兄弟节点是空的inline节点，
     * @param { Boolean } ignoreNext 是否忽略忽略对右边的兄弟节点的操作
     * 则这些兄弟节点将被删除
     * @see UE.dom.domUtils.clearEmptySibling(Node)
     */

    /**
     * 清除node节点左右连续为空的兄弟inline节点， 如果ignoreNext的值为true，
     * 则忽略对右边兄弟节点的操作， 如果ignorePre的值为true，则忽略对左边兄弟节点的操作。
     * @method clearEmptySibling
     * @param { Node } node 执行的节点对象， 如果该节点的左右连续的兄弟节点是空的inline节点，
     * @param { Boolean } ignoreNext 是否忽略忽略对右边的兄弟节点的操作
     * @param { Boolean } ignorePre 是否忽略忽略对左边的兄弟节点的操作
     * 则这些兄弟节点将被删除
     * @see UE.dom.domUtils.clearEmptySibling(Node)
     */
    clearEmptySibling:function (node, ignoreNext, ignorePre) {
        function clear(next, dir) {
            var tmpNode;
            while (next && !domUtils.isBookmarkNode(next) && (domUtils.isEmptyInlineElement(next)
                //这里不能把空格算进来会吧空格干掉，出现文字间的空格丢掉了
                || !new RegExp('[^\t\n\r' + domUtils.fillChar + ']').test(next.nodeValue) )) {
                tmpNode = next[dir];
                domUtils.remove(next);
                next = tmpNode;
            }
        }
        !ignoreNext && clear(node.nextSibling, 'nextSibling');
        !ignorePre && clear(node.previousSibling, 'previousSibling');
    },
    /**
     * 将一个文本节点textNode拆分成两个文本节点，offset指定拆分位置
     * @method split
     * @param { Node } textNode 需要拆分的文本节点对象
     * @param { int } offset 需要拆分的位置， 位置计算从0开始
     * @return { Node } 拆分后形成的新节点
     * @example
     * ```html
     * <div id="test">abcdef</div>
     * <script>
     *      var newNode = UE.dom.domUtils.split( document.getElementById( "test" ).firstChild, 3 );
     *      //output: def
     *      console.log( newNode.nodeValue );
     * </script>
     * ```
     */
    split:function (node, offset) {
        var doc = node.ownerDocument;
        if (browser.ie && offset == node.nodeValue.length) {
            var next = doc.createTextNode('');
            return domUtils.insertAfter(node, next);
        }
        var retval = node.splitText(offset);
        //ie8下splitText不会跟新childNodes,我们手动触发他的更新
        if (browser.ie8) {
            var tmpNode = doc.createTextNode('');
            domUtils.insertAfter(retval, tmpNode);
            domUtils.remove(tmpNode);
        }
        return retval;
    },

    /**
     * 检测文本节点textNode是否为空节点（包括空格、换行、占位符等字符）
     * @method  isWhitespace
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 检测的节点是否为空
     * @example
     * ```html
     * <div id="test">
     *
     * </div>
     * <script>
     *      //output: true
     *      console.log( UE.dom.domUtils.isWhitespace( document.getElementById("test").firstChild ) );
     * </script>
     * ```
     */
    isWhitespace:function (node) {
        return !new RegExp('[^ \t\n\r' + domUtils.fillChar + ']').test(node.nodeValue);
    },
    /**
     * 获取元素element相对于viewport的位置坐标
     * @method getXY
     * @param { Node } element 需要计算位置的节点对象
     * @return { Object } 返回形如{x:left,y:top}的一个key-value映射对象， 其中键x代表水平偏移距离，
     *                          y代表垂直偏移距离。
     *
     * @example
     * ```javascript
     * var location = UE.dom.domUtils.getXY( document.getElementById("test") );
     * //output: test的坐标为: 12, 24
     * console.log( 'test的坐标为： ', location.x, ',', location.y );
     * ```
     */
    getXY:function (element) {
        var x = 0, y = 0;
        while (element.offsetParent) {
            y += element.offsetTop;
            x += element.offsetLeft;
            element = element.offsetParent;
        }
        return { 'x':x, 'y':y};
    },
    /**
     * 为元素element绑定原生DOM事件，type为事件类型，handler为处理函数
     * @method on
     * @param { Node } element 需要绑定事件的节点对象
     * @param { String } type 绑定的事件类型
     * @param { Function } handler 事件处理器
     * @example
     * ```javascript
     * UE.dom.domUtils.on(document.body,"click",function(e){
     *     //e为事件对象，this为被点击元素对戏那个
     * });
     * ```
     */

    /**
     * 为元素element绑定原生DOM事件，type为事件类型，handler为处理函数
     * @method on
     * @param { Node } element 需要绑定事件的节点对象
     * @param { Array } type 绑定的事件类型数组
     * @param { Function } handler 事件处理器
     * @example
     * ```javascript
     * UE.dom.domUtils.on(document.body,["click","mousedown"],function(evt){
     *     //evt为事件对象，this为被点击元素对象
     * });
     * ```
     */
    on:function (element, type, handler) {

        var types = utils.isArray(type) ? type : utils.trim(type).split(/\s+/),
            k = types.length;
        if (k) while (k--) {
            type = types[k];
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else {
                if (!handler._d) {
                    handler._d = {
                        els : []
                    };
                }
                var key = type + handler.toString(),index = utils.indexOf(handler._d.els,element);
                if (!handler._d[key] || index == -1) {
                    if(index == -1){
                        handler._d.els.push(element);
                    }
                    if(!handler._d[key]){
                        handler._d[key] = function (evt) {
                            return handler.call(evt.srcElement, evt || window.event);
                        };
                    }


                    element.attachEvent('on' + type, handler._d[key]);
                }
            }
        }
        element = null;
    },
    /**
     * 解除DOM事件绑定
     * @method un
     * @param { Node } element 需要解除事件绑定的节点对象
     * @param { String } type 需要接触绑定的事件类型
     * @param { Function } handler 对应的事件处理器
     * @example
     * ```javascript
     * UE.dom.domUtils.un(document.body,"click",function(evt){
     *     //evt为事件对象，this为被点击元素对象
     * });
     * ```
     */

    /**
     * 解除DOM事件绑定
     * @method un
     * @param { Node } element 需要解除事件绑定的节点对象
     * @param { Array } type 需要接触绑定的事件类型数组
     * @param { Function } handler 对应的事件处理器
     * @example
     * ```javascript
     * UE.dom.domUtils.un(document.body, ["click","mousedown"],function(evt){
     *     //evt为事件对象，this为被点击元素对象
     * });
     * ```
     */
    un:function (element, type, handler) {
        var types = utils.isArray(type) ? type : utils.trim(type).split(/\s+/),
            k = types.length;
        if (k) while (k--) {
            type = types[k];
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else {
                var key = type + handler.toString();
                try{
                    element.detachEvent('on' + type, handler._d ? handler._d[key] : handler);
                }catch(e){}
                if (handler._d && handler._d[key]) {
                    var index = utils.indexOf(handler._d.els,element);
                    if(index!=-1){
                        handler._d.els.splice(index,1);
                    }
                    handler._d.els.length == 0 && delete handler._d[key];
                }
            }
        }
    },

    /**
     * 比较节点nodeA与节点nodeB是否具有相同的标签名、属性名以及属性值
     * @method  isSameElement
     * @param { Node } nodeA 需要比较的节点
     * @param { Node } nodeB 需要比较的节点
     * @return { Boolean } 两个节点是否具有相同的标签名、属性名以及属性值
     * @example
     * ```html
     * <span style="font-size:12px">ssss</span>
     * <span style="font-size:12px">bbbbb</span>
     * <span style="font-size:13px">ssss</span>
     * <span style="font-size:14px">bbbbb</span>
     *
     * <script>
     *
     *     var nodes = document.getElementsByTagName( "span" );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isSameElement( nodes[0], nodes[1] ) );
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.isSameElement( nodes[2], nodes[3] ) );
     *
     * </script>
     * ```
     */
    isSameElement:function (nodeA, nodeB) {
        if (nodeA.tagName != nodeB.tagName) {
            return false;
        }
        var thisAttrs = nodeA.attributes,
            otherAttrs = nodeB.attributes;
        if (!ie && thisAttrs.length != otherAttrs.length) {
            return false;
        }
        var attrA, attrB, al = 0, bl = 0;
        for (var i = 0; attrA = thisAttrs[i++];) {
            if (attrA.nodeName == 'style') {
                if (attrA.specified) {
                    al++;
                }
                if (domUtils.isSameStyle(nodeA, nodeB)) {
                    continue;
                } else {
                    return false;
                }
            }
            if (ie) {
                if (attrA.specified) {
                    al++;
                    attrB = otherAttrs.getNamedItem(attrA.nodeName);
                } else {
                    continue;
                }
            } else {
                attrB = nodeB.attributes[attrA.nodeName];
            }
            if (!attrB.specified || attrA.nodeValue != attrB.nodeValue) {
                return false;
            }
        }
        // 有可能attrB的属性包含了attrA的属性之外还有自己的属性
        if (ie) {
            for (i = 0; attrB = otherAttrs[i++];) {
                if (attrB.specified) {
                    bl++;
                }
            }
            if (al != bl) {
                return false;
            }
        }
        return true;
    },

    /**
     * 判断节点nodeA与节点nodeB的元素的style属性是否一致
     * @method isSameStyle
     * @param { Node } nodeA 需要比较的节点
     * @param { Node } nodeB 需要比较的节点
     * @return { Boolean } 两个节点是否具有相同的style属性值
     * @example
     * ```html
     * <span style="font-size:12px">ssss</span>
     * <span style="font-size:12px">bbbbb</span>
     * <span style="font-size:13px">ssss</span>
     * <span style="font-size:14px">bbbbb</span>
     *
     * <script>
     *
     *     var nodes = document.getElementsByTagName( "span" );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isSameStyle( nodes[0], nodes[1] ) );
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.isSameStyle( nodes[2], nodes[3] ) );
     *
     * </script>
     * ```
     */
    isSameStyle:function (nodeA, nodeB) {
        var styleA = nodeA.style.cssText.replace(/( ?; ?)/g, ';').replace(/( ?: ?)/g, ':'),
            styleB = nodeB.style.cssText.replace(/( ?; ?)/g, ';').replace(/( ?: ?)/g, ':');
        if (browser.opera) {
            styleA = nodeA.style;
            styleB = nodeB.style;
            if (styleA.length != styleB.length)
                return false;
            for (var p in styleA) {
                if (/^(\d+|csstext)$/i.test(p)) {
                    continue;
                }
                if (styleA[p] != styleB[p]) {
                    return false;
                }
            }
            return true;
        }
        if (!styleA || !styleB) {
            return styleA == styleB;
        }
        styleA = styleA.split(';');
        styleB = styleB.split(';');
        if (styleA.length != styleB.length) {
            return false;
        }
        for (var i = 0, ci; ci = styleA[i++];) {
            if (utils.indexOf(styleB, ci) == -1) {
                return false;
            }
        }
        return true;
    },
    /**
     * 检查节点node是否为block元素
     * @method isBlockElm
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 是否是block元素节点
     * @warning 该方法的判断规则如下： 如果该元素原本是block元素， 则不论该元素当前的css样式是什么都会返回true；
     *          否则，检测该元素的css样式， 如果该元素当前是block元素， 则返回true。 其余情况下都返回false。
     * @example
     * ```html
     * <span id="test1" style="display: block"></span>
     * <span id="test2"></span>
     * <div id="test3" style="display: inline"></div>
     *
     * <script>
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isBlockElm( document.getElementById("test1") ) );
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.isBlockElm( document.getElementById("test2") ) );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isBlockElm( document.getElementById("test3") ) );
     *
     * </script>
     * ```
     */
    isBlockElm:function (node) {
        return node.nodeType == 1 && (dtd.$block[node.tagName] || styleBlock[domUtils.getComputedStyle(node, 'display')]) && !dtd.$nonChild[node.tagName];
    },
    /**
     * 检测node节点是否为body节点
     * @method isBody
     * @param { Element } node 需要检测的dom元素
     * @return { Boolean } 给定的元素是否是body元素
     * @example
     * ```javascript
     * //output: true
     * console.log( UE.dom.domUtils.isBody( document.body ) );
     * ```
     */
    isBody:function (node) {
        return  node && node.nodeType == 1 && node.tagName.toLowerCase() == 'body';
    },
    /**
     * 以node节点为分界，将该节点的指定祖先节点parent拆分成两个独立的节点，
     * 拆分形成的两个节点之间是node节点
     * @method breakParent
     * @param { Node } node 作为分界的节点对象
     * @param { Node } parent 该节点必须是node节点的祖先节点， 且是block节点。
     * @return { Node } 给定的node分界节点
     * @example
     * ```javascript
     *
     *      var node = document.createElement("span"),
     *          wrapNode = document.createElement( "div" ),
     *          parent = document.createElement("p");
     *
     *      parent.appendChild( node );
     *      wrapNode.appendChild( parent );
     *
     *      //拆分前
     *      //output: <p><span></span></p>
     *      console.log( wrapNode.innerHTML );
     *
     *
     *      UE.dom.domUtils.breakParent( node, parent );
     *      //拆分后
     *      //output: <p></p><span></span><p></p>
     *      console.log( wrapNode.innerHTML );
     *
     * ```
     */
    breakParent:function (node, parent) {
        var tmpNode,
            parentClone = node,
            clone = node,
            leftNodes,
            rightNodes;
        do {
            parentClone = parentClone.parentNode;
            if (leftNodes) {
                tmpNode = parentClone.cloneNode(false);
                tmpNode.appendChild(leftNodes);
                leftNodes = tmpNode;
                tmpNode = parentClone.cloneNode(false);
                tmpNode.appendChild(rightNodes);
                rightNodes = tmpNode;
            } else {
                leftNodes = parentClone.cloneNode(false);
                rightNodes = leftNodes.cloneNode(false);
            }
            while (tmpNode = clone.previousSibling) {
                leftNodes.insertBefore(tmpNode, leftNodes.firstChild);
            }
            while (tmpNode = clone.nextSibling) {
                rightNodes.appendChild(tmpNode);
            }
            clone = parentClone;
        } while (parent !== parentClone);
        tmpNode = parent.parentNode;
        tmpNode.insertBefore(leftNodes, parent);
        tmpNode.insertBefore(rightNodes, parent);
        tmpNode.insertBefore(node, rightNodes);
        domUtils.remove(parent);
        return node;
    },
    /**
     * 检查节点node是否是空inline节点
     * @method  isEmptyInlineElement
     * @param { Node } node 需要检测的节点对象
     * @return { Number }  如果给定的节点是空的inline节点， 则返回1, 否则返回0。
     * @example
     * ```html
     * <b><i></i></b> => 1
     * <b><i></i><u></u></b> => 1
     * <b></b> => 1
     * <b>xx<i></i></b> => 0
     * ```
     */
    isEmptyInlineElement:function (node) {
        if (node.nodeType != 1 || !dtd.$removeEmpty[ node.tagName ]) {
            return 0;
        }
        node = node.firstChild;
        while (node) {
            //如果是创建的bookmark就跳过
            if (domUtils.isBookmarkNode(node)) {
                return 0;
            }
            if (node.nodeType == 1 && !domUtils.isEmptyInlineElement(node) ||
                node.nodeType == 3 && !domUtils.isWhitespace(node)
                ) {
                return 0;
            }
            node = node.nextSibling;
        }
        return 1;

    },

    /**
     * 删除node节点下首尾两端的空白文本子节点
     * @method trimWhiteTextNode
     * @param { Element } node 需要执行删除操作的元素对象
     * @example
     * ```javascript
     *      var node = document.createElement("div");
     *
     *      node.appendChild( document.createTextNode( "" ) );
     *
     *      node.appendChild( document.createElement("div") );
     *
     *      node.appendChild( document.createTextNode( "" ) );
     *
     *      //3
     *      console.log( node.childNodes.length );
     *
     *      UE.dom.domUtils.trimWhiteTextNode( node );
     *
     *      //1
     *      console.log( node.childNodes.length );
     * ```
     */
    trimWhiteTextNode:function (node) {
        function remove(dir) {
            var child;
            while ((child = node[dir]) && child.nodeType == 3 && domUtils.isWhitespace(child)) {
                node.removeChild(child);
            }
        }
        remove('firstChild');
        remove('lastChild');
    },

    /**
     * 合并node节点下相同的子节点
     * @name mergeChild
     * @desc
     * UE.dom.domUtils.mergeChild(node,tagName) //tagName要合并的子节点的标签
     * @example
     * <p><span style="font-size:12px;">xx<span style="font-size:12px;">aa</span>xx</span></p>
     * ==> UE.dom.domUtils.mergeChild(node,'span')
     * <p><span style="font-size:12px;">xxaaxx</span></p>
     */
    mergeChild:function (node, tagName, attrs) {
        var list = domUtils.getElementsByTagName(node, node.tagName.toLowerCase());
        for (var i = 0, ci; ci = list[i++];) {
            if (!ci.parentNode || domUtils.isBookmarkNode(ci)) {
                continue;
            }
            //span单独处理
            if (ci.tagName.toLowerCase() == 'span') {
                if (node === ci.parentNode) {
                    domUtils.trimWhiteTextNode(node);
                    if (node.childNodes.length == 1) {
                        node.style.cssText = ci.style.cssText + ";" + node.style.cssText;
                        domUtils.remove(ci, true);
                        continue;
                    }
                }
                ci.style.cssText = node.style.cssText + ';' + ci.style.cssText;
                if (attrs) {
                    var style = attrs.style;
                    if (style) {
                        style = style.split(';');
                        for (var j = 0, s; s = style[j++];) {
                            ci.style[utils.cssStyleToDomStyle(s.split(':')[0])] = s.split(':')[1];
                        }
                    }
                }
                if (domUtils.isSameStyle(ci, node)) {
                    domUtils.remove(ci, true);
                }
                continue;
            }
            if (domUtils.isSameElement(node, ci)) {
                domUtils.remove(ci, true);
            }
        }
    },

    /**
     * 原生方法getElementsByTagName的封装
     * @method getElementsByTagName
     * @param { Node } node 目标节点对象
     * @param { String } tagName 需要查找的节点的tagName， 多个tagName以空格分割
     * @return { Array } 符合条件的节点集合
     */
    getElementsByTagName:function (node, name,filter) {
        if(filter && utils.isString(filter)){
           var className = filter;
           filter =  function(node){return domUtils.hasClass(node,className)}
        }
        name = utils.trim(name).replace(/[ ]{2,}/g,' ').split(' ');
        var arr = [];
        for(var n = 0,ni;ni=name[n++];){
            var list = node.getElementsByTagName(ni);
            for (var i = 0, ci; ci = list[i++];) {
                if(!filter || filter(ci))
                    arr.push(ci);
            }
        }

        return arr;
    },
    /**
     * 将节点node提取到父节点上
     * @method mergeToParent
     * @param { Element } node 需要提取的元素对象
     * @example
     * ```html
     * <div id="parent">
     *     <div id="sub">
     *         <span id="child"></span>
     *     </div>
     * </div>
     *
     * <script>
     *
     *     var child = document.getElementById( "child" );
     *
     *     //output: sub
     *     console.log( child.parentNode.id );
     *
     *     UE.dom.domUtils.mergeToParent( child );
     *
     *     //output: parent
     *     console.log( child.parentNode.id );
     *
     * </script>
     * ```
     */
    mergeToParent:function (node) {
        var parent = node.parentNode;
        while (parent && dtd.$removeEmpty[parent.tagName]) {
            if (parent.tagName == node.tagName || parent.tagName == 'A') {//针对a标签单独处理
                domUtils.trimWhiteTextNode(parent);
                //span需要特殊处理  不处理这样的情况 <span stlye="color:#fff">xxx<span style="color:#ccc">xxx</span>xxx</span>
                if (parent.tagName == 'SPAN' && !domUtils.isSameStyle(parent, node)
                    || (parent.tagName == 'A' && node.tagName == 'SPAN')) {
                    if (parent.childNodes.length > 1 || parent !== node.parentNode) {
                        node.style.cssText = parent.style.cssText + ";" + node.style.cssText;
                        parent = parent.parentNode;
                        continue;
                    } else {
                        parent.style.cssText += ";" + node.style.cssText;
                        //trace:952 a标签要保持下划线
                        if (parent.tagName == 'A') {
                            parent.style.textDecoration = 'underline';
                        }
                    }
                }
                if (parent.tagName != 'A') {
                    parent === node.parentNode && domUtils.remove(node, true);
                    break;
                }
            }
            parent = parent.parentNode;
        }
    },
    /**
     * 合并节点node的左右兄弟节点
     * @method mergeSibling
     * @param { Element } node 需要合并的目标节点
     * @example
     * ```html
     * <b>xxxx</b><b id="test">ooo</b><b>xxxx</b>
     *
     * <script>
     *     var demoNode = document.getElementById("test");
     *     UE.dom.domUtils.mergeSibling( demoNode );
     *     //output: xxxxoooxxxx
     *     console.log( demoNode.innerHTML );
     * </script>
     * ```
     */

    /**
     * 合并节点node的左右兄弟节点， 可以根据给定的条件选择是否忽略合并左节点。
     * @method mergeSibling
     * @param { Element } node 需要合并的目标节点
     * @param { Boolean } ignorePre 是否忽略合并左节点
     * @example
     * ```html
     * <b>xxxx</b><b id="test">ooo</b><b>xxxx</b>
     *
     * <script>
     *     var demoNode = document.getElementById("test");
     *     UE.dom.domUtils.mergeSibling( demoNode, true );
     *     //output: oooxxxx
     *     console.log( demoNode.innerHTML );
     * </script>
     * ```
     */

    /**
     * 合并节点node的左右兄弟节点，可以根据给定的条件选择是否忽略合并左右节点。
     * @method mergeSibling
     * @param { Element } node 需要合并的目标节点
     * @param { Boolean } ignorePre 是否忽略合并左节点
     * @param { Boolean } ignoreNext 是否忽略合并右节点
     * @remind 如果同时忽略左右节点， 则该操作什么也不会做
     * @example
     * ```html
     * <b>xxxx</b><b id="test">ooo</b><b>xxxx</b>
     *
     * <script>
     *     var demoNode = document.getElementById("test");
     *     UE.dom.domUtils.mergeSibling( demoNode, false, true );
     *     //output: xxxxooo
     *     console.log( demoNode.innerHTML );
     * </script>
     * ```
     */
    mergeSibling:function (node, ignorePre, ignoreNext) {
        function merge(rtl, start, node) {
            var next;
            if ((next = node[rtl]) && !domUtils.isBookmarkNode(next) && next.nodeType == 1 && domUtils.isSameElement(node, next)) {
                while (next.firstChild) {
                    if (start == 'firstChild') {
                        node.insertBefore(next.lastChild, node.firstChild);
                    } else {
                        node.appendChild(next.firstChild);
                    }
                }
                domUtils.remove(next);
            }
        }
        !ignorePre && merge('previousSibling', 'firstChild', node);
        !ignoreNext && merge('nextSibling', 'lastChild', node);
    },

    /**
     * 设置节点node及其子节点不会被选中
     * @method unSelectable
     * @param { Element } node 需要执行操作的dom元素
     * @remind 执行该操作后的节点， 将不能被鼠标选中
     * @example
     * ```javascript
     * UE.dom.domUtils.unSelectable( document.body );
     * ```
     */
    unSelectable:ie && browser.ie9below || browser.opera ? function (node) {
        //for ie9
        node.onselectstart = function () {
            return false;
        };
        node.onclick = node.onkeyup = node.onkeydown = function () {
            return false;
        };
        node.unselectable = 'on';
        node.setAttribute("unselectable", "on");
        for (var i = 0, ci; ci = node.all[i++];) {
            switch (ci.tagName.toLowerCase()) {
                case 'iframe' :
                case 'textarea' :
                case 'input' :
                case 'select' :
                    break;
                default :
                    ci.unselectable = 'on';
                    node.setAttribute("unselectable", "on");
            }
        }
    } : function (node) {
        node.style.MozUserSelect =
            node.style.webkitUserSelect =
                node.style.msUserSelect =
                    node.style.KhtmlUserSelect = 'none';
    },
    /**
     * 删除节点node上的指定属性名称的属性
     * @method  removeAttributes
     * @param { Node } node 需要删除属性的节点对象
     * @param { String } attrNames 可以是空格隔开的多个属性名称，该操作将会依次删除相应的属性
     * @example
     * ```html
     * <div id="wrap">
     *      <span style="font-size:14px;" id="test" name="followMe">xxxxx</span>
     * </div>
     *
     * <script>
     *
     *     UE.dom.domUtils.removeAttributes( document.getElementById( "test" ), "id name" );
     *
     *     //output: <span style="font-size:14px;">xxxxx</span>
     *     console.log( document.getElementById("wrap").innerHTML );
     *
     * </script>
     * ```
     */

    /**
     * 删除节点node上的指定属性名称的属性
     * @method  removeAttributes
     * @param { Node } node 需要删除属性的节点对象
     * @param { Array } attrNames 需要删除的属性名数组
     * @example
     * ```html
     * <div id="wrap">
     *      <span style="font-size:14px;" id="test" name="followMe">xxxxx</span>
     * </div>
     *
     * <script>
     *
     *     UE.dom.domUtils.removeAttributes( document.getElementById( "test" ), ["id", "name"] );
     *
     *     //output: <span style="font-size:14px;">xxxxx</span>
     *     console.log( document.getElementById("wrap").innerHTML );
     *
     * </script>
     * ```
     */
    removeAttributes:function (node, attrNames) {
        attrNames = utils.isArray(attrNames) ? attrNames : utils.trim(attrNames).replace(/[ ]{2,}/g,' ').split(' ');
        for (var i = 0, ci; ci = attrNames[i++];) {
            ci = attrFix[ci] || ci;
            switch (ci) {
                case 'className':
                    node[ci] = '';
                    break;
                case 'style':
                    node.style.cssText = '';
                    var val = node.getAttributeNode('style');
                    !browser.ie && val && node.removeAttributeNode(val);
            }
            node.removeAttribute(ci);
        }
    },
    /**
     * 在doc下创建一个标签名为tag，属性为attrs的元素
     * @method createElement
     * @param { DomDocument } doc 新创建的元素属于该document节点创建
     * @param { String } tagName 需要创建的元素的标签名
     * @param { Object } attrs 新创建的元素的属性key-value集合
     * @return { Element } 新创建的元素对象
     * @example
     * ```javascript
     * var ele = UE.dom.domUtils.createElement( document, 'div', {
     *     id: 'test'
     * } );
     *
     * //output: DIV
     * console.log( ele.tagName );
     *
     * //output: test
     * console.log( ele.id );
     *
     * ```
     */
    createElement:function (doc, tag, attrs) {
        return domUtils.setAttributes(doc.createElement(tag), attrs)
    },
    /**
     * 为节点node添加属性attrs，attrs为属性键值对
     * @method setAttributes
     * @param { Element } node 需要设置属性的元素对象
     * @param { Object } attrs 需要设置的属性名-值对
     * @return { Element } 设置属性的元素对象
     * @example
     * ```html
     * <span id="test"></span>
     *
     * <script>
     *
     *     var testNode = UE.dom.domUtils.setAttributes( document.getElementById( "test" ), {
     *         id: 'demo'
     *     } );
     *
     *     //output: demo
     *     console.log( testNode.id );
     *
     * </script>
     *
     */
    setAttributes:function (node, attrs) {
        for (var attr in attrs) {
            if(attrs.hasOwnProperty(attr)){
                var value = attrs[attr];
                switch (attr) {
                    case 'class':
                        //ie下要这样赋值，setAttribute不起作用
                        node.className = value;
                        break;
                    case 'style' :
                        node.style.cssText = node.style.cssText + ";" + value;
                        break;
                    case 'innerHTML':
                        node[attr] = value;
                        break;
                    case 'value':
                        node.value = value;
                        break;
                    default:
                        node.setAttribute(attrFix[attr] || attr, value);
                }
            }
        }
        return node;
    },

    /**
     * 获取元素element经过计算后的样式值
     * @method getComputedStyle
     * @param { Element } element 需要获取样式的元素对象
     * @param { String } styleName 需要获取的样式名
     * @return { String } 获取到的样式值
     * @example
     * ```html
     * <style type="text/css">
     *      #test {
     *          font-size: 15px;
     *      }
     * </style>
     *
     * <span id="test"></span>
     *
     * <script>
     *     //output: 15px
     *     console.log( UE.dom.domUtils.getComputedStyle( document.getElementById( "test" ), 'font-size' ) );
     * </script>
     * ```
     */
    getComputedStyle:function (element, styleName) {
        //一下的属性单独处理
        var pros = 'width height top left';

        if(pros.indexOf(styleName) > -1){
            return element['offset' + styleName.replace(/^\w/,function(s){return s.toUpperCase()})] + 'px';
        }
        //忽略文本节点
        if (element.nodeType == 3) {
            element = element.parentNode;
        }
        //ie下font-size若body下定义了font-size，则从currentStyle里会取到这个font-size. 取不到实际值，故此修改.
        if (browser.ie && browser.version < 9 && styleName == 'font-size' && !element.style.fontSize &&
            !dtd.$empty[element.tagName] && !dtd.$nonChild[element.tagName]) {
            var span = element.ownerDocument.createElement('span');
            span.style.cssText = 'padding:0;border:0;font-family:simsun;';
            span.innerHTML = '.';
            element.appendChild(span);
            var result = span.offsetHeight;
            element.removeChild(span);
            span = null;
            return result + 'px';
        }
        try {
            var value = domUtils.getStyle(element, styleName) ||
                (window.getComputedStyle ? domUtils.getWindow(element).getComputedStyle(element, '').getPropertyValue(styleName) :
                    ( element.currentStyle || element.style )[utils.cssStyleToDomStyle(styleName)]);

        } catch (e) {
            return "";
        }
        return utils.transUnitToPx(utils.fixColor(styleName, value));
    },
    /**
     * 删除元素element指定的className
     * @method removeClasses
     * @param { Element } ele 需要删除class的元素节点
     * @param { String } classNames 需要删除的className， 多个className之间以空格分开
     * @example
     * ```html
     * <span id="test" class="test1 test2 test3">xxx</span>
     *
     * <script>
     *
     *     var testNode = document.getElementById( "test" );
     *     UE.dom.domUtils.removeClasses( testNode, "test1 test2" );
     *
     *     //output: test3
     *     console.log( testNode.className );
     *
     * </script>
     * ```
     */

    /**
     * 删除元素element指定的className
     * @method removeClasses
     * @param { Element } ele 需要删除class的元素节点
     * @param { Array } classNames 需要删除的className数组
     * @example
     * ```html
     * <span id="test" class="test1 test2 test3">xxx</span>
     *
     * <script>
     *
     *     var testNode = document.getElementById( "test" );
     *     UE.dom.domUtils.removeClasses( testNode, ["test1", "test2"] );
     *
     *     //output: test3
     *     console.log( testNode.className );
     *
     * </script>
     * ```
     */
    removeClasses:function (elm, classNames) {
        classNames = utils.isArray(classNames) ? classNames :
            utils.trim(classNames).replace(/[ ]{2,}/g,' ').split(' ');
        for(var i = 0,ci,cls = elm.className;ci=classNames[i++];){
            cls = cls.replace(new RegExp('\\b' + ci + '\\b'),'')
        }
        cls = utils.trim(cls).replace(/[ ]{2,}/g,' ');
        if(cls){
            elm.className = cls;
        }else{
            domUtils.removeAttributes(elm,['class']);
        }
    },
    /**
     * 给元素element添加className
     * @method addClass
     * @param { Node } ele 需要增加className的元素
     * @param { String } classNames 需要添加的className， 多个className之间以空格分割
     * @remind 相同的类名不会被重复添加
     * @example
     * ```html
     * <span id="test" class="cls1 cls2"></span>
     *
     * <script>
     *     var testNode = document.getElementById("test");
     *
     *     UE.dom.domUtils.addClass( testNode, "cls2 cls3 cls4" );
     *
     *     //output: cl1 cls2 cls3 cls4
     *     console.log( testNode.className );
     *
     * <script>
     * ```
     */

    /**
     * 给元素element添加className
     * @method addClass
     * @param { Node } ele 需要增加className的元素
     * @param { Array } classNames 需要添加的className的数组
     * @remind 相同的类名不会被重复添加
     * @example
     * ```html
     * <span id="test" class="cls1 cls2"></span>
     *
     * <script>
     *     var testNode = document.getElementById("test");
     *
     *     UE.dom.domUtils.addClass( testNode, ["cls2", "cls3", "cls4"] );
     *
     *     //output: cl1 cls2 cls3 cls4
     *     console.log( testNode.className );
     *
     * <script>
     * ```
     */
    addClass:function (elm, classNames) {
        if(!elm)return;
        classNames = utils.trim(classNames).replace(/[ ]{2,}/g,' ').split(' ');
        for(var i = 0,ci,cls = elm.className;ci=classNames[i++];){
            if(!new RegExp('\\b' + ci + '\\b').test(cls)){
                cls += ' ' + ci;
            }
        }
        elm.className = utils.trim(cls);
    },
    /**
     * 判断元素element是否包含给定的样式类名className
     * @method hasClass
     * @param { Node } ele 需要检测的元素
     * @param { String } classNames 需要检测的className， 多个className之间用空格分割
     * @return { Boolean } 元素是否包含所有给定的className
     * @example
     * ```html
     * <span id="test1" class="cls1 cls2"></span>
     *
     * <script>
     *     var test1 = document.getElementById("test1");
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.hasClass( test1, "cls2 cls1 cls3" ) );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.hasClass( test1, "cls2 cls1" ) );
     * </script>
     * ```
     */

    /**
     * 判断元素element是否包含给定的样式类名className
     * @method hasClass
     * @param { Node } ele 需要检测的元素
     * @param { Array } classNames 需要检测的className数组
     * @return { Boolean } 元素是否包含所有给定的className
     * @example
     * ```html
     * <span id="test1" class="cls1 cls2"></span>
     *
     * <script>
     *     var test1 = document.getElementById("test1");
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.hasClass( test1, [ "cls2", "cls1", "cls3" ] ) );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.hasClass( test1, [ "cls2", "cls1" ]) );
     * </script>
     * ```
     */
    hasClass:function (element, className) {
        if(utils.isRegExp(className)){
            return className.test(element.className)
        }
        className = utils.trim(className).replace(/[ ]{2,}/g,' ').split(' ');
        for(var i = 0,ci,cls = element.className;ci=className[i++];){
            if(!new RegExp('\\b' + ci + '\\b','i').test(cls)){
                return false;
            }
        }
        return i - 1 == className.length;
    },

    /**
     * 阻止事件默认行为
     * @method preventDefault
     * @param { Event } evt 需要阻止默认行为的事件对象
     * @example
     * ```javascript
     * UE.dom.domUtils.preventDefault( evt );
     * ```
     */
    preventDefault:function (evt) {
        evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    },
    /**
     * 删除元素element指定的样式
     * @method removeStyle
     * @param { Element } element 需要删除样式的元素
     * @param { String } styleName 需要删除的样式名
     * @example
     * ```html
     * <span id="test" style="color: red; background: blue;"></span>
     *
     * <script>
     *
     *     var testNode = document.getElementById("test");
     *
     *     UE.dom.domUtils.removeStyle( testNode, 'color' );
     *
     *     //output: background: blue;
     *     console.log( testNode.style.cssText );
     *
     * </script>
     * ```
     */
    removeStyle:function (element, name) {
        if(browser.ie ){
            //针对color先单独处理一下
            if(name == 'color'){
                name = '(^|;)' + name;
            }
            element.style.cssText = element.style.cssText.replace(new RegExp(name + '[^:]*:[^;]+;?','ig'),'')
        }else{
            if (element.style.removeProperty) {
                element.style.removeProperty (name);
            }else {
                element.style.removeAttribute (utils.cssStyleToDomStyle(name));
            }
        }


        if (!element.style.cssText) {
            domUtils.removeAttributes(element, ['style']);
        }
    },
    /**
     * 获取元素element的style属性的指定值
     * @method getStyle
     * @param { Element } element 需要获取属性值的元素
     * @param { String } styleName 需要获取的style的名称
     * @warning 该方法仅获取元素style属性中所标明的值
     * @return { String } 该元素包含指定的style属性值
     * @example
     * ```html
     * <div id="test" style="color: red;"></div>
     *
     * <script>
     *
     *      var testNode = document.getElementById( "test" );
     *
     *      //output: red
     *      console.log( UE.dom.domUtils.getStyle( testNode, "color" ) );
     *
     *      //output: ""
     *      console.log( UE.dom.domUtils.getStyle( testNode, "background" ) );
     *
     * </script>
     * ```
     */
    getStyle:function (element, name) {
        var value = element.style[ utils.cssStyleToDomStyle(name) ];
        return utils.fixColor(name, value);
    },
    /**
     * 为元素element设置样式属性值
     * @method setStyle
     * @param { Element } element 需要设置样式的元素
     * @param { String } styleName 样式名
     * @param { String } styleValue 样式值
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *
     *      var testNode = document.getElementById( "test" );
     *
     *      //output: ""
     *      console.log( testNode.style.color );
     *
     *      UE.dom.domUtils.setStyle( testNode, 'color', 'red' );
     *      //output: "red"
     *      console.log( testNode.style.color );
     *
     * </script>
     * ```
     */
    setStyle:function (element, name, value) {
        element.style[utils.cssStyleToDomStyle(name)] = value;
        if(!utils.trim(element.style.cssText)){
            this.removeAttributes(element,'style')
        }
    },
    /**
     * 为元素element设置多个样式属性值
     * @method setStyles
     * @param { Element } element 需要设置样式的元素
     * @param { Object } styles 样式名值对
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *
     *      var testNode = document.getElementById( "test" );
     *
     *      //output: ""
     *      console.log( testNode.style.color );
     *
     *      UE.dom.domUtils.setStyles( testNode, {
     *          'color': 'red'
     *      } );
     *      //output: "red"
     *      console.log( testNode.style.color );
     *
     * </script>
     * ```
     */
    setStyles:function (element, styles) {
        for (var name in styles) {
            if (styles.hasOwnProperty(name)) {
                domUtils.setStyle(element, name, styles[name]);
            }
        }
    },
    /**
     * 删除_moz_dirty属性
     * @private
     * @method removeDirtyAttr
     */
    removeDirtyAttr:function (node) {
        for (var i = 0, ci, nodes = node.getElementsByTagName('*'); ci = nodes[i++];) {
            ci.removeAttribute('_moz_dirty');
        }
        node.removeAttribute('_moz_dirty');
    },
    /**
     * 获取子节点的数量
     * @method getChildCount
     * @param { Element } node 需要检测的元素
     * @return { Number } 给定的node元素的子节点数量
     * @example
     * ```html
     * <div id="test">
     *      <span></span>
     * </div>
     *
     * <script>
     *
     *     //output: 3
     *     console.log( UE.dom.domUtils.getChildCount( document.getElementById("test") ) );
     *
     * </script>
     * ```
     */

    /**
     * 根据给定的过滤规则， 获取符合条件的子节点的数量
     * @method getChildCount
     * @param { Element } node 需要检测的元素
     * @param { Function } fn 过滤器， 要求对符合条件的子节点返回true， 反之则要求返回false
     * @return { Number } 符合过滤条件的node元素的子节点数量
     * @example
     * ```html
     * <div id="test">
     *      <span></span>
     * </div>
     *
     * <script>
     *
     *     //output: 1
     *     console.log( UE.dom.domUtils.getChildCount( document.getElementById("test"), function ( node ) {
     *
     *         return node.nodeType === 1;
     *
     *     } ) );
     *
     * </script>
     * ```
     */
    getChildCount:function (node, fn) {
        var count = 0, first = node.firstChild;
        fn = fn || function () {
            return 1;
        };
        while (first) {
            if (fn(first)) {
                count++;
            }
            first = first.nextSibling;
        }
        return count;
    },

    /**
     * 判断给定节点是否为空节点
     * @method isEmptyNode
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 节点是否为空
     * @example
     * ```javascript
     * UE.dom.domUtils.isEmptyNode( document.body );
     * ```
     */
    isEmptyNode:function (node) {
        return !node.firstChild || domUtils.getChildCount(node, function (node) {
            return  !domUtils.isBr(node) && !domUtils.isBookmarkNode(node) && !domUtils.isWhitespace(node)
        }) == 0
    },
    clearSelectedArr:function (nodes) {
        var node;
        while (node = nodes.pop()) {
            domUtils.removeAttributes(node, ['class']);
        }
    },
    /**
     * 将显示区域滚动到指定节点的位置
     * @method scrollToView
     * @param    {Node}   node    节点
     * @param    {window}   win      window对象
     * @param    {Number}    offsetTop    距离上方的偏移量
     */
    scrollToView:function (node, win, offsetTop) {
        var getViewPaneSize = function () {
                var doc = win.document,
                    mode = doc.compatMode == 'CSS1Compat';
                return {
                    width:( mode ? doc.documentElement.clientWidth : doc.body.clientWidth ) || 0,
                    height:( mode ? doc.documentElement.clientHeight : doc.body.clientHeight ) || 0
                };
            },
            getScrollPosition = function (win) {
                if ('pageXOffset' in win) {
                    return {
                        x:win.pageXOffset || 0,
                        y:win.pageYOffset || 0
                    };
                }
                else {
                    var doc = win.document;
                    return {
                        x:doc.documentElement.scrollLeft || doc.body.scrollLeft || 0,
                        y:doc.documentElement.scrollTop || doc.body.scrollTop || 0
                    };
                }
            };
        var winHeight = getViewPaneSize().height, offset = winHeight * -1 + offsetTop;
        offset += (node.offsetHeight || 0);
        var elementPosition = domUtils.getXY(node);
        offset += elementPosition.y;
        var currentScroll = getScrollPosition(win).y;
        // offset += 50;
        if (offset > currentScroll || offset < currentScroll - winHeight) {
            win.scrollTo(0, offset + (offset < 0 ? -20 : 20));
        }
    },
    /**
     * 判断给定节点是否为br
     * @method isBr
     * @param { Node } node 需要判断的节点对象
     * @return { Boolean } 给定的节点是否是br节点
     */
    isBr:function (node) {
        return node.nodeType == 1 && node.tagName == 'BR';
    },
    /**
     * 判断给定的节点是否是一个“填充”节点
     * @private
     * @method isFillChar
     * @param { Node } node 需要判断的节点
     * @param { Boolean } isInStart 是否从节点内容的开始位置匹配
     * @returns { Boolean } 节点是否是填充节点
     */
    isFillChar:function (node,isInStart) {
        if(node.nodeType != 3)
            return false;
        var text = node.nodeValue;
        if(isInStart){
            return new RegExp('^' + domUtils.fillChar).test(text)
        }
        return !text.replace(new RegExp(domUtils.fillChar,'g'), '').length
    },
    isStartInblock:function (range) {
        var tmpRange = range.cloneRange(),
            flag = 0,
            start = tmpRange.startContainer,
            tmp;
        if(start.nodeType == 1 && start.childNodes[tmpRange.startOffset]){
            start = start.childNodes[tmpRange.startOffset];
            var pre = start.previousSibling;
            while(pre && domUtils.isFillChar(pre)){
                start = pre;
                pre = pre.previousSibling;
            }
        }
        if(this.isFillChar(start,true) && tmpRange.startOffset == 1){
            tmpRange.setStartBefore(start);
            start = tmpRange.startContainer;
        }

        while (start && domUtils.isFillChar(start)) {
            tmp = start;
            start = start.previousSibling
        }
        if (tmp) {
            tmpRange.setStartBefore(tmp);
            start = tmpRange.startContainer;
        }
        if (start.nodeType == 1 && domUtils.isEmptyNode(start) && tmpRange.startOffset == 1) {
            tmpRange.setStart(start, 0).collapse(true);
        }
        while (!tmpRange.startOffset) {
            start = tmpRange.startContainer;
            if (domUtils.isBlockElm(start) || domUtils.isBody(start)) {
                flag = 1;
                break;
            }
            var pre = tmpRange.startContainer.previousSibling,
                tmpNode;
            if (!pre) {
                tmpRange.setStartBefore(tmpRange.startContainer);
            } else {
                while (pre && domUtils.isFillChar(pre)) {
                    tmpNode = pre;
                    pre = pre.previousSibling;
                }
                if (tmpNode) {
                    tmpRange.setStartBefore(tmpNode);
                } else {
                    tmpRange.setStartBefore(tmpRange.startContainer);
                }
            }
        }
        return flag && !domUtils.isBody(tmpRange.startContainer) ? 1 : 0;
    },

    /**
     * 判断给定的元素是否是一个空元素
     * @method isEmptyBlock
     * @param { Element } node 需要判断的元素
     * @return { Boolean } 是否是空元素
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *     //output: true
     *     console.log( UE.dom.domUtils.isEmptyBlock( document.getElementById("test") ) );
     * </script>
     * ```
     */

    /**
     * 根据指定的判断规则判断给定的元素是否是一个空元素
     * @method isEmptyBlock
     * @param { Element } node 需要判断的元素
     * @param { RegExp } reg 对内容执行判断的正则表达式对象
     * @return { Boolean } 是否是空元素
     */
    isEmptyBlock:function (node,reg) {
        if(node.nodeType != 1)
            return 0;
        reg = reg || new RegExp('[ \xa0\t\r\n' + domUtils.fillChar + ']', 'g');

        if (node[browser.ie ? 'innerText' : 'textContent'].replace(reg, '').length > 0) {
            return 0;
        }
        for (var n in dtd.$isNotEmpty) {
            if (node.getElementsByTagName(n).length) {
                return 0;
            }
        }
        return 1;
    },

    /**
     * 移动元素使得该元素的位置移动指定的偏移量的距离
     * @method setViewportOffset
     * @param { Element } element 需要设置偏移量的元素
     * @param { Object } offset 偏移量， 形如{ left: 100, top: 50 }的一个键值对， 表示该元素将在
     *                                  现有的位置上向水平方向偏移offset.left的距离， 在竖直方向上偏移
     *                                  offset.top的距离
     * @example
     * ```html
     * <div id="test" style="top: 100px; left: 50px; position: absolute;"></div>
     *
     * <script>
     *
     *     var testNode = document.getElementById("test");
     *
     *     UE.dom.domUtils.setViewportOffset( testNode, {
     *         left: 200,
     *         top: 50
     *     } );
     *
     *     //output: top: 300px; left: 100px; position: absolute;
     *     console.log( testNode.style.cssText );
     *
     * </script>
     * ```
     */
    setViewportOffset:function (element, offset) {
        var left = parseInt(element.style.left) | 0;
        var top = parseInt(element.style.top) | 0;
        var rect = element.getBoundingClientRect();
        var offsetLeft = offset.left - rect.left;
        var offsetTop = offset.top - rect.top;
        if (offsetLeft) {
            element.style.left = left + offsetLeft + 'px';
        }
        if (offsetTop) {
            element.style.top = top + offsetTop + 'px';
        }
    },

    /**
     * 用“填充字符”填充节点
     * @method fillNode
     * @private
     * @param { DomDocument } doc 填充的节点所在的docment对象
     * @param { Node } node 需要填充的节点对象
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *     var testNode = document.getElementById("test");
     *
     *     //output: 0
     *     console.log( testNode.childNodes.length );
     *
     *     UE.dom.domUtils.fillNode( document, testNode );
     *
     *     //output: 1
     *     console.log( testNode.childNodes.length );
     *
     * </script>
     * ```
     */
    fillNode:function (doc, node) {
        var tmpNode = browser.ie ? doc.createTextNode(domUtils.fillChar) : doc.createElement('br');
        node.innerHTML = '';
        node.appendChild(tmpNode);
    },

    /**
     * 把节点src的所有子节点追加到另一个节点tag上去
     * @method moveChild
     * @param { Node } src 源节点， 该节点下的所有子节点将被移除
     * @param { Node } tag 目标节点， 从源节点移除的子节点将被追加到该节点下
     * @example
     * ```html
     * <div id="test1">
     *      <span></span>
     * </div>
     * <div id="test2">
     *     <div></div>
     * </div>
     *
     * <script>
     *
     *     var test1 = document.getElementById("test1"),
     *         test2 = document.getElementById("test2");
     *
     *     UE.dom.domUtils.moveChild( test1, test2 );
     *
     *     //output: ""（空字符串）
     *     console.log( test1.innerHTML );
     *
     *     //output: "<div></div><span></span>"
     *     console.log( test2.innerHTML );
     *
     * </script>
     * ```
     */

    /**
     * 把节点src的所有子节点移动到另一个节点tag上去, 可以通过dir参数控制附加的行为是“追加”还是“插入顶部”
     * @method moveChild
     * @param { Node } src 源节点， 该节点下的所有子节点将被移除
     * @param { Node } tag 目标节点， 从源节点移除的子节点将被附加到该节点下
     * @param { Boolean } dir 附加方式， 如果为true， 则附加进去的节点将被放到目标节点的顶部， 反之，则放到末尾
     * @example
     * ```html
     * <div id="test1">
     *      <span></span>
     * </div>
     * <div id="test2">
     *     <div></div>
     * </div>
     *
     * <script>
     *
     *     var test1 = document.getElementById("test1"),
     *         test2 = document.getElementById("test2");
     *
     *     UE.dom.domUtils.moveChild( test1, test2, true );
     *
     *     //output: ""（空字符串）
     *     console.log( test1.innerHTML );
     *
     *     //output: "<span></span><div></div>"
     *     console.log( test2.innerHTML );
     *
     * </script>
     * ```
     */
    moveChild:function (src, tag, dir) {
        while (src.firstChild) {
            if (dir && tag.firstChild) {
                tag.insertBefore(src.lastChild, tag.firstChild);
            } else {
                tag.appendChild(src.firstChild);
            }
        }
    },

    /**
     * 判断节点的标签上是否不存在任何属性
     * @method hasNoAttributes
     * @private
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 节点是否不包含任何属性
     * @example
     * ```html
     * <div id="test"><span>xxxx</span></div>
     *
     * <script>
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.hasNoAttributes( document.getElementById("test") ) );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.hasNoAttributes( document.getElementById("test").firstChild ) );
     *
     * </script>
     * ```
     */
    hasNoAttributes:function (node) {
        return browser.ie ? /^<\w+\s*?>/.test(node.outerHTML) : node.attributes.length == 0;
    },

    /**
     * 检测节点是否是UEditor所使用的辅助节点
     * @method isCustomeNode
     * @private
     * @param { Node } node 需要检测的节点
     * @remind 辅助节点是指编辑器要完成工作临时添加的节点， 在输出的时候将会从编辑器内移除， 不会影响最终的结果。
     * @return { Boolean } 给定的节点是否是一个辅助节点
     */
    isCustomeNode:function (node) {
        return node.nodeType == 1 && node.getAttribute('_ue_custom_node_');
    },

    /**
     * 检测节点的标签是否是给定的标签
     * @method isTagNode
     * @param { Node } node 需要检测的节点对象
     * @param { String } tagName 标签
     * @return { Boolean } 节点的标签是否是给定的标签
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isTagNode( document.getElementById("test"), "div" ) );
     *
     * </script>
     * ```
     */
    isTagNode:function (node, tagNames) {
        return node.nodeType == 1 && new RegExp('\\b' + node.tagName + '\\b','i').test(tagNames)
    },

    /**
     * 给定一个节点数组，在通过指定的过滤器过滤后， 获取其中满足过滤条件的第一个节点
     * @method filterNodeList
     * @param { Array } nodeList 需要过滤的节点数组
     * @param { Function } fn 过滤器， 对符合条件的节点， 执行结果返回true， 反之则返回false
     * @return { Node | NULL } 如果找到符合过滤条件的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var divNodes = document.getElementsByTagName("div");
     * divNodes = [].slice.call( divNodes, 0 );
     *
     * //output: null
     * console.log( UE.dom.domUtils.filterNodeList( divNodes, function ( node ) {
     *     return node.tagName.toLowerCase() !== 'div';
     * } ) );
     * ```
     */

    /**
     * 给定一个节点数组nodeList和一组标签名tagNames， 获取其中能够匹配标签名的节点集合中的第一个节点
     * @method filterNodeList
     * @param { Array } nodeList 需要过滤的节点数组
     * @param { String } tagNames 需要匹配的标签名， 多个标签名之间用空格分割
     * @return { Node | NULL } 如果找到标签名匹配的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var divNodes = document.getElementsByTagName("div");
     * divNodes = [].slice.call( divNodes, 0 );
     *
     * //output: null
     * console.log( UE.dom.domUtils.filterNodeList( divNodes, 'a span' ) );
     * ```
     */

    /**
     * 给定一个节点数组，在通过指定的过滤器过滤后， 如果参数forAll为true， 则会返回所有满足过滤
     * 条件的节点集合， 否则， 返回满足条件的节点集合中的第一个节点
     * @method filterNodeList
     * @param { Array } nodeList 需要过滤的节点数组
     * @param { Function } fn 过滤器， 对符合条件的节点， 执行结果返回true， 反之则返回false
     * @param { Boolean } forAll 是否返回整个节点数组, 如果该参数为false， 则返回节点集合中的第一个节点
     * @return { Array | Node | NULL } 如果找到符合过滤条件的节点， 则根据参数forAll的值决定返回满足
     *                                      过滤条件的节点数组或第一个节点， 否则返回NULL
     * @example
     * ```javascript
     * var divNodes = document.getElementsByTagName("div");
     * divNodes = [].slice.call( divNodes, 0 );
     *
     * //output: 3（假定有3个div）
     * console.log( divNodes.length );
     *
     * var nodes = UE.dom.domUtils.filterNodeList( divNodes, function ( node ) {
     *     return node.tagName.toLowerCase() === 'div';
     * }, true );
     *
     * //output: 3
     * console.log( nodes.length );
     *
     * var node = UE.dom.domUtils.filterNodeList( divNodes, function ( node ) {
     *     return node.tagName.toLowerCase() === 'div';
     * }, false );
     *
     * //output: div
     * console.log( node.nodeName );
     * ```
     */
    filterNodeList : function(nodelist,filter,forAll){
        var results = [];
        if(!utils .isFunction(filter)){
            var str = filter;
            filter = function(n){
                return utils.indexOf(utils.isArray(str) ? str:str.split(' '), n.tagName.toLowerCase()) != -1
            };
        }
        utils.each(nodelist,function(n){
            filter(n) && results.push(n)
        });
        return results.length  == 0 ? null : results.length == 1 || !forAll ? results[0] : results
    },

    /**
     * 查询给定的range选区是否在给定的node节点内，且在该节点的最末尾
     * @method isInNodeEndBoundary
     * @param { UE.dom.Range } rng 需要判断的range对象， 该对象的startContainer不能为NULL
     * @param node 需要检测的节点对象
     * @return { Number } 如果给定的选取range对象是在node内部的最末端， 则返回1, 否则返回0
     */
    isInNodeEndBoundary : function (rng,node){
        var start = rng.startContainer;
        if(start.nodeType == 3 && rng.startOffset != start.nodeValue.length){
            return 0;
        }
        if(start.nodeType == 1 && rng.startOffset != start.childNodes.length){
            return 0;
        }
        while(start !== node){
            if(start.nextSibling){
                return 0
            };
            start = start.parentNode;
        }
        return 1;
    },
    isBoundaryNode : function (node,dir){
        var tmp;
        while(!domUtils.isBody(node)){
            tmp = node;
            node = node.parentNode;
            if(tmp !== node[dir]){
                return false;
            }
        }
        return true;
    },
    fillHtml :  browser.ie11below ? '&nbsp;' : '<br/>'
};
var fillCharReg = new RegExp(domUtils.fillChar, 'g');

// core/Range.js
/**
 * Range封装
 * @file
 * @module UE.dom
 * @class Range
 * @since 1.2.6.1
 */

/**
 * dom操作封装
 * @unfile
 * @module UE.dom
 */

/**
 * Range实现类，本类是UEditor底层核心类，封装不同浏览器之间的Range操作。
 * @unfile
 * @module UE.dom
 * @class Range
 */


(function () {
    var guid = 0,
        fillChar = domUtils.fillChar,
        fillData;

    /**
     * 更新range的collapse状态
     * @param  {Range}   range    range对象
     */
    function updateCollapse(range) {
        range.collapsed =
            range.startContainer && range.endContainer &&
                range.startContainer === range.endContainer &&
                range.startOffset == range.endOffset;
    }

    function selectOneNode(rng){
        return !rng.collapsed && rng.startContainer.nodeType == 1 && rng.startContainer === rng.endContainer && rng.endOffset - rng.startOffset == 1
    }
    function setEndPoint(toStart, node, offset, range) {
        //如果node是自闭合标签要处理
        if (node.nodeType == 1 && (dtd.$empty[node.tagName] || dtd.$nonChild[node.tagName])) {
            offset = domUtils.getNodeIndex(node) + (toStart ? 0 : 1);
            node = node.parentNode;
        }
        if (toStart) {
            range.startContainer = node;
            range.startOffset = offset;
            if (!range.endContainer) {
                range.collapse(true);
            }
        } else {
            range.endContainer = node;
            range.endOffset = offset;
            if (!range.startContainer) {
                range.collapse(false);
            }
        }
        updateCollapse(range);
        return range;
    }

    function execContentsAction(range, action) {
        //调整边界
        //range.includeBookmark();
        var start = range.startContainer,
            end = range.endContainer,
            startOffset = range.startOffset,
            endOffset = range.endOffset,
            doc = range.document,
            frag = doc.createDocumentFragment(),
            tmpStart, tmpEnd;
        if (start.nodeType == 1) {
            start = start.childNodes[startOffset] || (tmpStart = start.appendChild(doc.createTextNode('')));
        }
        if (end.nodeType == 1) {
            end = end.childNodes[endOffset] || (tmpEnd = end.appendChild(doc.createTextNode('')));
        }
        if (start === end && start.nodeType == 3) {
            frag.appendChild(doc.createTextNode(start.substringData(startOffset, endOffset - startOffset)));
            //is not clone
            if (action) {
                start.deleteData(startOffset, endOffset - startOffset);
                range.collapse(true);
            }
            return frag;
        }
        var current, currentLevel, clone = frag,
            startParents = domUtils.findParents(start, true), endParents = domUtils.findParents(end, true);
        for (var i = 0; startParents[i] == endParents[i];) {
            i++;
        }
        for (var j = i, si; si = startParents[j]; j++) {
            current = si.nextSibling;
            if (si == start) {
                if (!tmpStart) {
                    if (range.startContainer.nodeType == 3) {
                        clone.appendChild(doc.createTextNode(start.nodeValue.slice(startOffset)));
                        //is not clone
                        if (action) {
                            start.deleteData(startOffset, start.nodeValue.length - startOffset);
                        }
                    } else {
                        clone.appendChild(!action ? start.cloneNode(true) : start);
                    }
                }
            } else {
                currentLevel = si.cloneNode(false);
                clone.appendChild(currentLevel);
            }
            while (current) {
                if (current === end || current === endParents[j]) {
                    break;
                }
                si = current.nextSibling;
                clone.appendChild(!action ? current.cloneNode(true) : current);
                current = si;
            }
            clone = currentLevel;
        }
        clone = frag;
        if (!startParents[i]) {
            clone.appendChild(startParents[i - 1].cloneNode(false));
            clone = clone.firstChild;
        }
        for (var j = i, ei; ei = endParents[j]; j++) {
            current = ei.previousSibling;
            if (ei == end) {
                if (!tmpEnd && range.endContainer.nodeType == 3) {
                    clone.appendChild(doc.createTextNode(end.substringData(0, endOffset)));
                    //is not clone
                    if (action) {
                        end.deleteData(0, endOffset);
                    }
                }
            } else {
                currentLevel = ei.cloneNode(false);
                clone.appendChild(currentLevel);
            }
            //如果两端同级，右边第一次已经被开始做了
            if (j != i || !startParents[i]) {
                while (current) {
                    if (current === start) {
                        break;
                    }
                    ei = current.previousSibling;
                    clone.insertBefore(!action ? current.cloneNode(true) : current, clone.firstChild);
                    current = ei;
                }
            }
            clone = currentLevel;
        }
        if (action) {
            range.setStartBefore(!endParents[i] ? endParents[i - 1] : !startParents[i] ? startParents[i - 1] : endParents[i]).collapse(true);
        }
        tmpStart && domUtils.remove(tmpStart);
        tmpEnd && domUtils.remove(tmpEnd);
        return frag;
    }

    /**
     * 创建一个跟document绑定的空的Range实例
     * @constructor
     * @param { Document } document 新建的选区所属的文档对象
     */

    /**
     * @property { Node } startContainer 当前Range的开始边界的容器节点, 可以是一个元素节点或者是文本节点
     */

    /**
     * @property { Node } startOffset 当前Range的开始边界容器节点的偏移量, 如果是元素节点，
     *                              该值就是childNodes中的第几个节点， 如果是文本节点就是文本内容的第几个字符
     */

    /**
     * @property { Node } endContainer 当前Range的结束边界的容器节点, 可以是一个元素节点或者是文本节点
     */

    /**
     * @property { Node } endOffset 当前Range的结束边界容器节点的偏移量, 如果是元素节点，
     *                              该值就是childNodes中的第几个节点， 如果是文本节点就是文本内容的第几个字符
     */

    /**
     * @property { Boolean } collapsed 当前Range是否闭合
     * @default true
     * @remind Range是闭合的时候， startContainer === endContainer && startOffset === endOffset
     */

    /**
     * @property { Document } document 当前Range所属的Document对象
     * @remind 不同range的的document属性可以是不同的
     */
    var Range = dom.Range = function (document) {
        var me = this;
        me.startContainer =
            me.startOffset =
                me.endContainer =
                    me.endOffset = null;
        me.document = document;
        me.collapsed = true;
    };

    /**
     * 删除fillData
     * @param doc
     * @param excludeNode
     */
    function removeFillData(doc, excludeNode) {
        try {
            if (fillData && domUtils.inDoc(fillData, doc)) {
                if (!fillData.nodeValue.replace(fillCharReg, '').length) {
                    var tmpNode = fillData.parentNode;
                    domUtils.remove(fillData);
                    while (tmpNode && domUtils.isEmptyInlineElement(tmpNode) &&
                        //safari的contains有bug
                        (browser.safari ? !(domUtils.getPosition(tmpNode,excludeNode) & domUtils.POSITION_CONTAINS) : !tmpNode.contains(excludeNode))
                        ) {
                        fillData = tmpNode.parentNode;
                        domUtils.remove(tmpNode);
                        tmpNode = fillData;
                    }
                } else {
                    fillData.nodeValue = fillData.nodeValue.replace(fillCharReg, '');
                }
            }
        } catch (e) {
        }
    }

    /**
     * @param node
     * @param dir
     */
    function mergeSibling(node, dir) {
        var tmpNode;
        node = node[dir];
        while (node && domUtils.isFillChar(node)) {
            tmpNode = node[dir];
            domUtils.remove(node);
            node = tmpNode;
        }
    }

    Range.prototype = {

        /**
         * 克隆选区的内容到一个DocumentFragment里
         * @method cloneContents
         * @return { DocumentFragment | NULL } 如果选区是闭合的将返回null， 否则， 返回包含所clone内容的DocumentFragment元素
         * @example
         * ```html
         * <body>
         *      <!-- 中括号表示选区 -->
         *      <b>x<i>x[x</i>xx]x</b>
         *
         *      <script>
         *          //range是已选中的选区
         *          var fragment = range.cloneContents(),
         *              node = document.createElement("div");
         *
         *          node.appendChild( fragment );
         *
         *          //output: <i>x</i>xx
         *          console.log( node.innerHTML );
         *
         *      </script>
         * </body>
         * ```
         */
        cloneContents:function () {
            return this.collapsed ? null : execContentsAction(this, 0);
        },

        /**
         * 删除当前选区范围中的所有内容
         * @method deleteContents
         * @remind 执行完该操作后， 当前Range对象变成了闭合状态
         * @return { UE.dom.Range } 当前操作的Range对象
         * @example
         * ```html
         * <body>
         *      <!-- 中括号表示选区 -->
         *      <b>x<i>x[x</i>xx]x</b>
         *
         *      <script>
         *          //range是已选中的选区
         *          range.deleteContents();
         *
         *          //竖线表示闭合后的选区位置
         *          //output: <b>x<i>x</i>|x</b>
         *          console.log( document.body.innerHTML );
         *
         *          //此时， range的各项属性为
         *          //output: B
         *          console.log( range.startContainer.tagName );
         *          //output: 2
         *          console.log( range.startOffset );
         *          //output: B
         *          console.log( range.endContainer.tagName );
         *          //output: 2
         *          console.log( range.endOffset );
         *          //output: true
         *          console.log( range.collapsed );
         *
         *      </script>
         * </body>
         * ```
         */
        deleteContents:function () {
            var txt;
            if (!this.collapsed) {
                execContentsAction(this, 1);
            }
            if (browser.webkit) {
                txt = this.startContainer;
                if (txt.nodeType == 3 && !txt.nodeValue.length) {
                    this.setStartBefore(txt).collapse(true);
                    domUtils.remove(txt);
                }
            }
            return this;
        },

        /**
         * 将当前选区的内容提取到一个DocumentFragment里
         * @method extractContents
         * @remind 执行该操作后， 选区将变成闭合状态
         * @warning 执行该操作后， 原来选区所选中的内容将从dom树上剥离出来
         * @return { DocumentFragment } 返回包含所提取内容的DocumentFragment对象
         * @example
         * ```html
         * <body>
         *      <!-- 中括号表示选区 -->
         *      <b>x<i>x[x</i>xx]x</b>
         *
         *      <script>
         *          //range是已选中的选区
         *          var fragment = range.extractContents(),
         *              node = document.createElement( "div" );
         *
         *          node.appendChild( fragment );
         *
         *          //竖线表示闭合后的选区位置
         *
         *          //output: <b>x<i>x</i>|x</b>
         *          console.log( document.body.innerHTML );
         *          //output: <i>x</i>xx
         *          console.log( node.innerHTML );
         *
         *          //此时， range的各项属性为
         *          //output: B
         *          console.log( range.startContainer.tagName );
         *          //output: 2
         *          console.log( range.startOffset );
         *          //output: B
         *          console.log( range.endContainer.tagName );
         *          //output: 2
         *          console.log( range.endOffset );
         *          //output: true
         *          console.log( range.collapsed );
         *
         *      </script>
         * </body>
         */
        extractContents:function () {
            return this.collapsed ? null : execContentsAction(this, 2);
        },

        /**
         * 设置Range的开始容器节点和偏移量
         * @method  setStart
         * @remind 如果给定的节点是元素节点，那么offset指的是其子元素中索引为offset的元素，
         *          如果是文本节点，那么offset指的是其文本内容的第offset个字符
         * @remind 如果提供的容器节点是一个不能包含子元素的节点， 则该选区的开始容器将被设置
         *          为该节点的父节点， 此时， 其距离开始容器的偏移量也变成了该节点在其父节点
         *          中的索引
         * @param { Node } node 将被设为当前选区开始边界容器的节点对象
         * @param { int } offset 选区的开始位置偏移量
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区 -->
         * <b>xxx<i>x<span>xx</span>xx<em>xx</em>xxx</i>[xxx]</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStart( document.getElementsByTagName("i")[0], 1 );
         *
         *     //此时， 选区变成了
         *     //<b>xxx<i>x[<span>xx</span>xx<em>xx</em>xxx</i>xxx]</b>
         *
         * </script>
         * ```
         * @example
         * ```html
         * <!-- 选区 -->
         * <b>xxx<img>[xx]x</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStart( document.getElementsByTagName("img")[0], 3 );
         *
         *     //此时， 选区变成了
         *     //<b>xxx[<img>xx]x</b>
         *
         * </script>
         * ```
         */
        setStart:function (node, offset) {
            return setEndPoint(true, node, offset, this);
        },

        /**
         * 设置Range的结束容器和偏移量
         * @method  setEnd
         * @param { Node } node 作为当前选区结束边界容器的节点对象
         * @param { int } offset 结束边界的偏移量
         * @see UE.dom.Range:setStart(Node,int)
         * @return { UE.dom.Range } 当前range对象
         */
        setEnd:function (node, offset) {
            return setEndPoint(false, node, offset, this);
        },

        /**
         * 将Range开始位置设置到node节点之后
         * @method  setStartAfter
         * @remind 该操作将会把给定节点的父节点作为range的开始容器， 且偏移量是该节点在其父节点中的位置索引+1
         * @param { Node } node 选区的开始边界将紧接着该节点之后
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>xx[x</span>xxx]</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStartAfter( document.getElementsByTagName("i")[0] );
         *
         *     //结果选区
         *     //<b>xx<i>xxx</i>[<span>xxx</span>xxx]</b>
         *
         * </script>
         * ```
         */
        setStartAfter:function (node) {
            return this.setStart(node.parentNode, domUtils.getNodeIndex(node) + 1);
        },

        /**
         * 将Range开始位置设置到node节点之前
         * @method  setStartBefore
         * @remind 该操作将会把给定节点的父节点作为range的开始容器， 且偏移量是该节点在其父节点中的位置索引
         * @param { Node } node 新的选区开始位置在该节点之前
         * @see UE.dom.Range:setStartAfter(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setStartBefore:function (node) {
            return this.setStart(node.parentNode, domUtils.getNodeIndex(node));
        },

        /**
         * 将Range结束位置设置到node节点之后
         * @method  setEndAfter
         * @remind 该操作将会把给定节点的父节点作为range的结束容器， 且偏移量是该节点在其父节点中的位置索引+1
         * @param { Node } node 目标节点
         * @see UE.dom.Range:setStartAfter(Node)
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>[xx<i>xxx</i><span>xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStartAfter( document.getElementsByTagName("span")[0] );
         *
         *     //结果选区
         *     //<b>[xx<i>xxx</i><span>xxx</span>]xxx</b>
         *
         * </script>
         * ```
         */
        setEndAfter:function (node) {
            return this.setEnd(node.parentNode, domUtils.getNodeIndex(node) + 1);
        },

        /**
         * 将Range结束位置设置到node节点之前
         * @method  setEndBefore
         * @remind 该操作将会把给定节点的父节点作为range的结束容器， 且偏移量是该节点在其父节点中的位置索引
         * @param { Node } node 目标节点
         * @see UE.dom.Range:setEndAfter(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setEndBefore:function (node) {
            return this.setEnd(node.parentNode, domUtils.getNodeIndex(node));
        },

        /**
         * 设置Range的开始位置到node节点内的第一个子节点之前
         * @method  setStartAtFirst
         * @remind 选区的开始容器将变成给定的节点， 且偏移量为0
         * @remind 如果给定的节点是元素节点， 则该节点必须是允许包含子节点的元素。
         * @param { Node } node 目标节点
         * @see UE.dom.Range:setStartBefore(Node)
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStartAtFirst( document.getElementsByTagName("i")[0] );
         *
         *     //结果选区
         *     //<b>xx<i>[xxx</i><span>xx]x</span>xxx</b>
         *
         * </script>
         * ```
         */
        setStartAtFirst:function (node) {
            return this.setStart(node, 0);
        },

        /**
         * 设置Range的开始位置到node节点内的最后一个节点之后
         * @method setStartAtLast
         * @remind 选区的开始容器将变成给定的节点， 且偏移量为该节点的子节点数
         * @remind 如果给定的节点是元素节点， 则该节点必须是允许包含子节点的元素。
         * @param { Node } node 目标节点
         * @see UE.dom.Range:setStartAtFirst(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setStartAtLast:function (node) {
            return this.setStart(node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length);
        },

        /**
         * 设置Range的结束位置到node节点内的第一个节点之前
         * @method  setEndAtFirst
         * @param { Node } node 目标节点
         * @remind 选区的结束容器将变成给定的节点， 且偏移量为0
         * @remind node必须是一个元素节点， 且必须是允许包含子节点的元素。
         * @see UE.dom.Range:setStartAtFirst(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setEndAtFirst:function (node) {
            return this.setEnd(node, 0);
        },

        /**
         * 设置Range的结束位置到node节点内的最后一个节点之后
         * @method  setEndAtLast
         * @param { Node } node 目标节点
         * @remind 选区的结束容器将变成给定的节点， 且偏移量为该节点的子节点数量
         * @remind node必须是一个元素节点， 且必须是允许包含子节点的元素。
         * @see UE.dom.Range:setStartAtFirst(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setEndAtLast:function (node) {
            return this.setEnd(node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length);
        },

        /**
         * 选中给定节点
         * @method  selectNode
         * @remind 此时， 选区的开始容器和结束容器都是该节点的父节点， 其startOffset是该节点在父节点中的位置索引，
         *          而endOffset为startOffset+1
         * @param { Node } node 需要选中的节点
         * @return { UE.dom.Range } 当前range对象，此时的range仅包含当前给定的节点对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.selectNode( document.getElementsByTagName("i")[0] );
         *
         *     //结果选区
         *     //<b>xx[<i>xxx</i>]<span>xxx</span>xxx</b>
         *
         * </script>
         * ```
         */
        selectNode:function (node) {
            return this.setStartBefore(node).setEndAfter(node);
        },

        /**
         * 选中给定节点内部的所有节点
         * @method  selectNodeContents
         * @remind 此时， 选区的开始容器和结束容器都是该节点， 其startOffset为0，
         *          而endOffset是该节点的子节点数。
         * @param { Node } node 目标节点， 当前range将包含该节点内的所有节点
         * @return { UE.dom.Range } 当前range对象， 此时range仅包含给定节点的所有子节点
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.selectNode( document.getElementsByTagName("b")[0] );
         *
         *     //结果选区
         *     //<b>[xx<i>xxx</i><span>xxx</span>xxx]</b>
         *
         * </script>
         * ```
         */
        selectNodeContents:function (node) {
            return this.setStart(node, 0).setEndAtLast(node);
        },

        /**
         * clone当前Range对象
         * @method  cloneRange
         * @remind 返回的range是一个全新的range对象， 其内部所有属性与当前被clone的range相同。
         * @return { UE.dom.Range } 当前range对象的一个副本
         */
        cloneRange:function () {
            var me = this;
            return new Range(me.document).setStart(me.startContainer, me.startOffset).setEnd(me.endContainer, me.endOffset);

        },

        /**
         * 向当前选区的结束处闭合选区
         * @method  collapse
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.collapse();
         *
         *     //结果选区
         *     //“|”表示选区已闭合
         *     //<b>xx<i>xxx</i><span>xx|x</span>xxx</b>
         *
         * </script>
         * ```
         */

        /**
         * 闭合当前选区，根据给定的toStart参数项决定是向当前选区开始处闭合还是向结束处闭合，
         * 如果toStart的值为true，则向开始位置闭合， 反之，向结束位置闭合。
         * @method  collapse
         * @param { Boolean } toStart 是否向选区开始处闭合
         * @return { UE.dom.Range } 当前range对象，此时range对象处于闭合状态
         * @see UE.dom.Range:collapse()
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.collapse( true );
         *
         *     //结果选区
         *     //“|”表示选区已闭合
         *     //<b>xx<i>xxx</i><span>|xxx</span>xxx</b>
         *
         * </script>
         * ```
         */
        collapse:function (toStart) {
            var me = this;
            if (toStart) {
                me.endContainer = me.startContainer;
                me.endOffset = me.startOffset;
            } else {
                me.startContainer = me.endContainer;
                me.startOffset = me.endOffset;
            }
            me.collapsed = true;
            return me;
        },

        /**
         * 调整range的开始位置和结束位置，使其"收缩"到最小的位置
         * @method  shrinkBoundary
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <span>xx<b>xx[</b>xxxxx]</span> => <span>xx<b>xx</b>[xxxxx]</span>
         * ```
         *
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>x[xx</b><i>]xxx</i>
         *
         * <script>
         *
         *     //执行收缩
         *     range.shrinkBoundary();
         *
         *     //结果选区
         *     //<b>x[xx]</b><i>xxx</i>
         * </script>
         * ```
         *
         * @example
         * ```html
         * [<b><i>xxxx</i>xxxxxxx</b>] => <b><i>[xxxx</i>xxxxxxx]</b>
         * ```
         */

        /**
         * 调整range的开始位置和结束位置，使其"收缩"到最小的位置，
         * 如果ignoreEnd的值为true，则忽略对结束位置的调整
         * @method  shrinkBoundary
         * @param { Boolean } ignoreEnd 是否忽略对结束位置的调整
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.domUtils.Range:shrinkBoundary()
         */
        shrinkBoundary:function (ignoreEnd) {
            var me = this, child,
                collapsed = me.collapsed;
            function check(node){
                return node.nodeType == 1 && !domUtils.isBookmarkNode(node) && !dtd.$empty[node.tagName] && !dtd.$nonChild[node.tagName]
            }
            while (me.startContainer.nodeType == 1 //是element
                && (child = me.startContainer.childNodes[me.startOffset]) //子节点也是element
                && check(child)) {
                me.setStart(child, 0);
            }
            if (collapsed) {
                return me.collapse(true);
            }
            if (!ignoreEnd) {
                while (me.endContainer.nodeType == 1//是element
                    && me.endOffset > 0 //如果是空元素就退出 endOffset=0那么endOffst-1为负值，childNodes[endOffset]报错
                    && (child = me.endContainer.childNodes[me.endOffset - 1]) //子节点也是element
                    && check(child)) {
                    me.setEnd(child, child.childNodes.length);
                }
            }
            return me;
        },

        /**
         * 获取离当前选区内包含的所有节点最近的公共祖先节点，
         * @method  getCommonAncestor
         * @remind 返回的公共祖先节点一定不是range自身的容器节点， 但有可能是一个文本节点
         * @return { Node } 当前range对象内所有节点的公共祖先节点
         * @example
         * ```html
         * //选区示例
         * <span>xxx<b>x[x<em>xx]x</em>xxx</b>xx</span>
         * <script>
         *
         *     var node = range.getCommonAncestor();
         *
         *     //公共祖先节点是： b节点
         *     //输出： B
         *     console.log(node.tagName);
         *
         * </script>
         * ```
         */

        /**
         * 获取当前选区所包含的所有节点的公共祖先节点， 可以根据给定的参数 includeSelf 决定获取到
         * 的公共祖先节点是否可以是当前选区的startContainer或endContainer节点， 如果 includeSelf
         * 的取值为true， 则返回的节点可以是自身的容器节点， 否则， 则不能是容器节点
         * @method  getCommonAncestor
         * @param { Boolean } includeSelf 是否允许获取到的公共祖先节点是当前range对象的容器节点
         * @return { Node } 当前range对象内所有节点的公共祖先节点
         * @see UE.dom.Range:getCommonAncestor()
         * @example
         * ```html
         * <body>
         *
         *     <!-- 选区示例 -->
         *     <b>xxx<i>xxxx<span>xx[x</span>xx]x</i>xxxxxxx</b>
         *
         *     <script>
         *
         *         var node = range.getCommonAncestor( false );
         *
         *         //这里的公共祖先节点是B而不是I， 是因为参数限制了获取到的节点不能是容器节点
         *         //output: B
         *         console.log( node.tagName );
         *
         *     </script>
         *
         * </body>
         * ```
         */

        /**
         * 获取当前选区所包含的所有节点的公共祖先节点， 可以根据给定的参数 includeSelf 决定获取到
         * 的公共祖先节点是否可以是当前选区的startContainer或endContainer节点， 如果 includeSelf
         * 的取值为true， 则返回的节点可以是自身的容器节点， 否则， 则不能是容器节点； 同时可以根据
         * ignoreTextNode 参数的取值决定是否忽略类型为文本节点的祖先节点。
         * @method  getCommonAncestor
         * @param { Boolean } includeSelf 是否允许获取到的公共祖先节点是当前range对象的容器节点
         * @param { Boolean } ignoreTextNode 获取祖先节点的过程中是否忽略类型为文本节点的祖先节点
         * @return { Node } 当前range对象内所有节点的公共祖先节点
         * @see UE.dom.Range:getCommonAncestor()
         * @see UE.dom.Range:getCommonAncestor(Boolean)
         * @example
         * ```html
         * <body>
         *
         *     <!-- 选区示例 -->
         *     <b>xxx<i>xxxx<span>x[x]x</span>xxx</i>xxxxxxx</b>
         *
         *     <script>
         *
         *         var node = range.getCommonAncestor( true, false );
         *
         *         //output: SPAN
         *         console.log( node.tagName );
         *
         *     </script>
         *
         * </body>
         * ```
         */
        getCommonAncestor:function (includeSelf, ignoreTextNode) {
            var me = this,
                start = me.startContainer,
                end = me.endContainer;
            if (start === end) {
                if (includeSelf && selectOneNode(this)) {
                    start = start.childNodes[me.startOffset];
                    if(start.nodeType == 1)
                        return start;
                }
                //只有在上来就相等的情况下才会出现是文本的情况
                return ignoreTextNode && start.nodeType == 3 ? start.parentNode : start;
            }
            return domUtils.getCommonAncestor(start, end);
        },

        /**
         * 调整当前Range的开始和结束边界容器，如果是容器节点是文本节点,就调整到包含该文本节点的父节点上
         * @method trimBoundary
         * @remind 该操作有可能会引起文本节点被切开
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         *
         * //选区示例
         * <b>xxx<i>[xxxxx]</i>xxx</b>
         *
         * <script>
         *     //未调整前， 选区的开始容器和结束都是文本节点
         *     //执行调整
         *     range.trimBoundary();
         *
         *     //调整之后， 容器节点变成了i节点
         *     //<b>xxx[<i>xxxxx</i>]xxx</b>
         * </script>
         * ```
         */

        /**
         * 调整当前Range的开始和结束边界容器，如果是容器节点是文本节点,就调整到包含该文本节点的父节点上，
         * 可以根据 ignoreEnd 参数的值决定是否调整对结束边界的调整
         * @method trimBoundary
         * @param { Boolean } ignoreEnd 是否忽略对结束边界的调整
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         *
         * //选区示例
         * <b>xxx<i>[xxxxx]</i>xxx</b>
         *
         * <script>
         *     //未调整前， 选区的开始容器和结束都是文本节点
         *     //执行调整
         *     range.trimBoundary( true );
         *
         *     //调整之后， 开始容器节点变成了i节点
         *     //但是， 结束容器没有发生变化
         *     //<b>xxx[<i>xxxxx]</i>xxx</b>
         * </script>
         * ```
         */
        trimBoundary:function (ignoreEnd) {
            this.txtToElmBoundary();
            var start = this.startContainer,
                offset = this.startOffset,
                collapsed = this.collapsed,
                end = this.endContainer;
            if (start.nodeType == 3) {
                if (offset == 0) {
                    this.setStartBefore(start);
                } else {
                    if (offset >= start.nodeValue.length) {
                        this.setStartAfter(start);
                    } else {
                        var textNode = domUtils.split(start, offset);
                        //跟新结束边界
                        if (start === end) {
                            this.setEnd(textNode, this.endOffset - offset);
                        } else if (start.parentNode === end) {
                            this.endOffset += 1;
                        }
                        this.setStartBefore(textNode);
                    }
                }
                if (collapsed) {
                    return this.collapse(true);
                }
            }
            if (!ignoreEnd) {
                offset = this.endOffset;
                end = this.endContainer;
                if (end.nodeType == 3) {
                    if (offset == 0) {
                        this.setEndBefore(end);
                    } else {
                        offset < end.nodeValue.length && domUtils.split(end, offset);
                        this.setEndAfter(end);
                    }
                }
            }
            return this;
        },

        /**
         * 如果选区在文本的边界上，就扩展选区到文本的父节点上, 如果当前选区是闭合的， 则什么也不做
         * @method txtToElmBoundary
         * @remind 该操作不会修改dom节点
         * @return { UE.dom.Range } 当前range对象
         */

        /**
         * 如果选区在文本的边界上，就扩展选区到文本的父节点上, 如果当前选区是闭合的， 则根据参数项
         * ignoreCollapsed 的值决定是否执行该调整
         * @method txtToElmBoundary
         * @param { Boolean } ignoreCollapsed 是否忽略选区的闭合状态， 如果该参数取值为true， 则
         *                      不论选区是否闭合， 都会执行该操作， 反之， 则不会对闭合的选区执行该操作
         * @return { UE.dom.Range } 当前range对象
         */
        txtToElmBoundary:function (ignoreCollapsed) {
            function adjust(r, c) {
                var container = r[c + 'Container'],
                    offset = r[c + 'Offset'];
                if (container.nodeType == 3) {
                    if (!offset) {
                        r['set' + c.replace(/(\w)/, function (a) {
                            return a.toUpperCase();
                        }) + 'Before'](container);
                    } else if (offset >= container.nodeValue.length) {
                        r['set' + c.replace(/(\w)/, function (a) {
                            return a.toUpperCase();
                        }) + 'After' ](container);
                    }
                }
            }

            if (ignoreCollapsed || !this.collapsed) {
                adjust(this, 'start');
                adjust(this, 'end');
            }
            return this;
        },

        /**
         * 在当前选区的开始位置前插入节点，新插入的节点会被该range包含
         * @method  insertNode
         * @param { Node } node 需要插入的节点
         * @remind 插入的节点可以是一个DocumentFragment依次插入多个节点
         * @return { UE.dom.Range } 当前range对象
         */
        insertNode:function (node) {
            var first = node, length = 1;
            if (node.nodeType == 11) {
                first = node.firstChild;
                length = node.childNodes.length;
            }
            this.trimBoundary(true);
            var start = this.startContainer,
                offset = this.startOffset;
            var nextNode = start.childNodes[ offset ];
            if (nextNode) {
                start.insertBefore(node, nextNode);
            } else {
                start.appendChild(node);
            }
            if (first.parentNode === this.endContainer) {
                this.endOffset = this.endOffset + length;
            }
            return this.setStartBefore(first);
        },

        /**
         * 闭合选区到当前选区的开始位置， 并且定位光标到闭合后的位置
         * @method  setCursor
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.Range:collapse()
         */

        /**
         * 闭合选区，可以根据参数toEnd的值控制选区是向前闭合还是向后闭合， 并且定位光标到闭合后的位置。
         * @method  setCursor
         * @param { Boolean } toEnd 是否向后闭合， 如果为true， 则闭合选区时， 将向结束容器方向闭合，
         *                      反之，则向开始容器方向闭合
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.Range:collapse(Boolean)
         */
        setCursor:function (toEnd, noFillData) {
            return this.collapse(!toEnd).select(noFillData);
        },

        /**
         * 创建当前range的一个书签，记录下当前range的位置，方便当dom树改变时，还能找回原来的选区位置
         * @method createBookmark
         * @param { Boolean } serialize 控制返回的标记位置是对当前位置的引用还是ID，如果该值为true，则
         *                              返回标记位置的ID， 反之则返回标记位置节点的引用
         * @return { Object } 返回一个书签记录键值对， 其包含的key有： start => 开始标记的ID或者引用，
         *                          end => 结束标记的ID或引用， id => 当前标记的类型， 如果为true，则表示
         *                          返回的记录的类型为ID， 反之则为引用
         */
        createBookmark:function (serialize, same) {
            var endNode,
                startNode = this.document.createElement('span');
            startNode.style.cssText = 'display:none;line-height:0px;';
            startNode.appendChild(this.document.createTextNode('\u200D'));
            startNode.id = '_baidu_bookmark_start_' + (same ? '' : guid++);

            if (!this.collapsed) {
                endNode = startNode.cloneNode(true);
                endNode.id = '_baidu_bookmark_end_' + (same ? '' : guid++);
            }
            this.insertNode(startNode);
            if (endNode) {
                this.collapse().insertNode(endNode).setEndBefore(endNode);
            }
            this.setStartAfter(startNode);
            return {
                start:serialize ? startNode.id : startNode,
                end:endNode ? serialize ? endNode.id : endNode : null,
                id:serialize
            }
        },

        /**
         *  调整当前range的边界到书签位置，并删除该书签对象所标记的位置内的节点
         *  @method  moveToBookmark
         *  @param { BookMark } bookmark createBookmark所创建的标签对象
         *  @return { UE.dom.Range } 当前range对象
         *  @see UE.dom.Range:createBookmark(Boolean)
         */
        moveToBookmark:function (bookmark) {
            var start = bookmark.id ? this.document.getElementById(bookmark.start) : bookmark.start,
                end = bookmark.end && bookmark.id ? this.document.getElementById(bookmark.end) : bookmark.end;
            this.setStartBefore(start);
            domUtils.remove(start);
            if (end) {
                this.setEndBefore(end);
                domUtils.remove(end);
            } else {
                this.collapse(true);
            }
            return this;
        },

        /**
         * 调整range的边界，使其"放大"到最近的父节点
         * @method  enlarge
         * @remind 会引起选区的变化
         * @return { UE.dom.Range } 当前range对象
         */

        /**
         * 调整range的边界，使其"放大"到最近的父节点，根据参数 toBlock 的取值， 可以
         * 要求扩大之后的父节点是block节点
         * @method  enlarge
         * @param { Boolean } toBlock 是否要求扩大之后的父节点必须是block节点
         * @return { UE.dom.Range } 当前range对象
         */
        enlarge:function (toBlock, stopFn) {
            var isBody = domUtils.isBody,
                pre, node, tmp = this.document.createTextNode('');
            if (toBlock) {
                node = this.startContainer;
                if (node.nodeType == 1) {
                    if (node.childNodes[this.startOffset]) {
                        pre = node = node.childNodes[this.startOffset]
                    } else {
                        node.appendChild(tmp);
                        pre = node = tmp;
                    }
                } else {
                    pre = node;
                }
                while (1) {
                    if (domUtils.isBlockElm(node)) {
                        node = pre;
                        while ((pre = node.previousSibling) && !domUtils.isBlockElm(pre)) {
                            node = pre;
                        }
                        this.setStartBefore(node);
                        break;
                    }
                    pre = node;
                    node = node.parentNode;
                }
                node = this.endContainer;
                if (node.nodeType == 1) {
                    if (pre = node.childNodes[this.endOffset]) {
                        node.insertBefore(tmp, pre);
                    } else {
                        node.appendChild(tmp);
                    }
                    pre = node = tmp;
                } else {
                    pre = node;
                }
                while (1) {
                    if (domUtils.isBlockElm(node)) {
                        node = pre;
                        while ((pre = node.nextSibling) && !domUtils.isBlockElm(pre)) {
                            node = pre;
                        }
                        this.setEndAfter(node);
                        break;
                    }
                    pre = node;
                    node = node.parentNode;
                }
                if (tmp.parentNode === this.endContainer) {
                    this.endOffset--;
                }
                domUtils.remove(tmp);
            }

            // 扩展边界到最大
            if (!this.collapsed) {
                while (this.startOffset == 0) {
                    if (stopFn && stopFn(this.startContainer)) {
                        break;
                    }
                    if (isBody(this.startContainer)) {
                        break;
                    }
                    this.setStartBefore(this.startContainer);
                }
                while (this.endOffset == (this.endContainer.nodeType == 1 ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length)) {
                    if (stopFn && stopFn(this.endContainer)) {
                        break;
                    }
                    if (isBody(this.endContainer)) {
                        break;
                    }
                    this.setEndAfter(this.endContainer);
                }
            }
            return this;
        },
        enlargeToBlockElm:function(ignoreEnd){
            while(!domUtils.isBlockElm(this.startContainer)){
                this.setStartBefore(this.startContainer);
            }
            if(!ignoreEnd){
                while(!domUtils.isBlockElm(this.endContainer)){
                    this.setEndAfter(this.endContainer);
                }
            }
            return this;
        },
        /**
         * 调整Range的边界，使其"缩小"到最合适的位置
         * @method adjustmentBoundary
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.Range:shrinkBoundary()
         */
        adjustmentBoundary:function () {
            if (!this.collapsed) {
                while (!domUtils.isBody(this.startContainer) &&
                    this.startOffset == this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length &&
                    this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length
                    ) {

                    this.setStartAfter(this.startContainer);
                }
                while (!domUtils.isBody(this.endContainer) && !this.endOffset &&
                    this.endContainer[this.endContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length
                    ) {
                    this.setEndBefore(this.endContainer);
                }
            }
            return this;
        },

        /**
         * 给range选区中的内容添加给定的inline标签
         * @method applyInlineStyle
         * @param { String } tagName 需要添加的标签名
         * @example
         * ```html
         * <p>xxxx[xxxx]x</p>  ==>  range.applyInlineStyle("strong")  ==>  <p>xxxx[<strong>xxxx</strong>]x</p>
         * ```
         */

        /**
         * 给range选区中的内容添加给定的inline标签， 并且为标签附加上一些初始化属性。
         * @method applyInlineStyle
         * @param { String } tagName 需要添加的标签名
         * @param { Object } attrs 跟随新添加的标签的属性
         * @return { UE.dom.Range } 当前选区
         * @example
         * ```html
         * <p>xxxx[xxxx]x</p>
         *
         * ==>
         *
         * <!-- 执行操作 -->
         * range.applyInlineStyle("strong",{"style":"font-size:12px"})
         *
         * ==>
         *
         * <p>xxxx[<strong style="font-size:12px">xxxx</strong>]x</p>
         * ```
         */
        applyInlineStyle:function (tagName, attrs, list) {
            if (this.collapsed)return this;
            this.trimBoundary().enlarge(false,
                function (node) {
                    return node.nodeType == 1 && domUtils.isBlockElm(node)
                }).adjustmentBoundary();
            var bookmark = this.createBookmark(),
                end = bookmark.end,
                filterFn = function (node) {
                    return node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' : !domUtils.isWhitespace(node);
                },
                current = domUtils.getNextDomNode(bookmark.start, false, filterFn),
                node,
                pre,
                range = this.cloneRange();
            while (current && (domUtils.getPosition(current, end) & domUtils.POSITION_PRECEDING)) {
                if (current.nodeType == 3 || dtd[tagName][current.tagName]) {
                    range.setStartBefore(current);
                    node = current;
                    while (node && (node.nodeType == 3 || dtd[tagName][node.tagName]) && node !== end) {
                        pre = node;
                        node = domUtils.getNextDomNode(node, node.nodeType == 1, null, function (parent) {
                            return dtd[tagName][parent.tagName];
                        });
                    }
                    var frag = range.setEndAfter(pre).extractContents(), elm;
                    if (list && list.length > 0) {
                        var level, top;
                        top = level = list[0].cloneNode(false);
                        for (var i = 1, ci; ci = list[i++];) {
                            level.appendChild(ci.cloneNode(false));
                            level = level.firstChild;
                        }
                        elm = level;
                    } else {
                        elm = range.document.createElement(tagName);
                    }
                    if (attrs) {
                        domUtils.setAttributes(elm, attrs);
                    }
                    elm.appendChild(frag);
                    range.insertNode(list ? top : elm);
                    //处理下滑线在a上的情况
                    var aNode;
                    if (tagName == 'span' && attrs.style && /text\-decoration/.test(attrs.style) && (aNode = domUtils.findParentByTagName(elm, 'a', true))) {
                        domUtils.setAttributes(aNode, attrs);
                        domUtils.remove(elm, true);
                        elm = aNode;
                    } else {
                        domUtils.mergeSibling(elm);
                        domUtils.clearEmptySibling(elm);
                    }
                    //去除子节点相同的
                    domUtils.mergeChild(elm, attrs);
                    current = domUtils.getNextDomNode(elm, false, filterFn);
                    domUtils.mergeToParent(elm);
                    if (node === end) {
                        break;
                    }
                } else {
                    current = domUtils.getNextDomNode(current, true, filterFn);
                }
            }
            return this.moveToBookmark(bookmark);
        },

        /**
         * 移除当前选区内指定的inline标签，但保留其中的内容
         * @method removeInlineStyle
         * @param { String } tagName 需要移除的标签名
         * @return { UE.dom.Range } 当前的range对象
         * @example
         * ```html
         * xx[x<span>xxx<em>yyy</em>zz]z</span>  => range.removeInlineStyle(["em"])  => xx[x<span>xxxyyyzz]z</span>
         * ```
         */

        /**
         * 移除当前选区内指定的一组inline标签，但保留其中的内容
         * @method removeInlineStyle
         * @param { Array } tagNameArr 需要移除的标签名的数组
         * @return { UE.dom.Range } 当前的range对象
         * @see UE.dom.Range:removeInlineStyle(String)
         */
        removeInlineStyle:function (tagNames) {
            if (this.collapsed)return this;
            tagNames = utils.isArray(tagNames) ? tagNames : [tagNames];
            this.shrinkBoundary().adjustmentBoundary();
            var start = this.startContainer, end = this.endContainer;
            while (1) {
                if (start.nodeType == 1) {
                    if (utils.indexOf(tagNames, start.tagName.toLowerCase()) > -1) {
                        break;
                    }
                    if (start.tagName.toLowerCase() == 'body') {
                        start = null;
                        break;
                    }
                }
                start = start.parentNode;
            }
            while (1) {
                if (end.nodeType == 1) {
                    if (utils.indexOf(tagNames, end.tagName.toLowerCase()) > -1) {
                        break;
                    }
                    if (end.tagName.toLowerCase() == 'body') {
                        end = null;
                        break;
                    }
                }
                end = end.parentNode;
            }
            var bookmark = this.createBookmark(),
                frag,
                tmpRange;
            if (start) {
                tmpRange = this.cloneRange().setEndBefore(bookmark.start).setStartBefore(start);
                frag = tmpRange.extractContents();
                tmpRange.insertNode(frag);
                domUtils.clearEmptySibling(start, true);
                start.parentNode.insertBefore(bookmark.start, start);
            }
            if (end) {
                tmpRange = this.cloneRange().setStartAfter(bookmark.end).setEndAfter(end);
                frag = tmpRange.extractContents();
                tmpRange.insertNode(frag);
                domUtils.clearEmptySibling(end, false, true);
                end.parentNode.insertBefore(bookmark.end, end.nextSibling);
            }
            var current = domUtils.getNextDomNode(bookmark.start, false, function (node) {
                return node.nodeType == 1;
            }), next;
            while (current && current !== bookmark.end) {
                next = domUtils.getNextDomNode(current, true, function (node) {
                    return node.nodeType == 1;
                });
                if (utils.indexOf(tagNames, current.tagName.toLowerCase()) > -1) {
                    domUtils.remove(current, true);
                }
                current = next;
            }
            return this.moveToBookmark(bookmark);
        },

        /**
         * 获取当前选中的自闭合的节点
         * @method  getClosedNode
         * @return { Node | NULL } 如果当前选中的是自闭合节点， 则返回该节点， 否则返回NULL
         */
        getClosedNode:function () {
            var node;
            if (!this.collapsed) {
                var range = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                if (selectOneNode(range)) {
                    var child = range.startContainer.childNodes[range.startOffset];
                    if (child && child.nodeType == 1 && (dtd.$empty[child.tagName] || dtd.$nonChild[child.tagName])) {
                        node = child;
                    }
                }
            }
            return node;
        },

        /**
         * 在页面上高亮range所表示的选区
         * @method select
         * @return { UE.dom.Range } 返回当前Range对象
         */
            //这里不区分ie9以上，trace:3824
        select:browser.ie ? function (noFillData, textRange) {
            var nativeRange;
            if (!this.collapsed)
                this.shrinkBoundary();
            var node = this.getClosedNode();
            if (node && !textRange) {
                try {
                    nativeRange = this.document.body.createControlRange();
                    nativeRange.addElement(node);
                    nativeRange.select();
                } catch (e) {}
                return this;
            }
            var bookmark = this.createBookmark(),
                start = bookmark.start,
                end;
            nativeRange = this.document.body.createTextRange();
            nativeRange.moveToElementText(start);
            nativeRange.moveStart('character', 1);
            if (!this.collapsed) {
                var nativeRangeEnd = this.document.body.createTextRange();
                end = bookmark.end;
                nativeRangeEnd.moveToElementText(end);
                nativeRange.setEndPoint('EndToEnd', nativeRangeEnd);
            } else {
                if (!noFillData && this.startContainer.nodeType != 3) {
                    //使用<span>|x<span>固定住光标
                    var tmpText = this.document.createTextNode(fillChar),
                        tmp = this.document.createElement('span');
                    tmp.appendChild(this.document.createTextNode(fillChar));
                    start.parentNode.insertBefore(tmp, start);
                    start.parentNode.insertBefore(tmpText, start);
                    //当点b,i,u时，不能清除i上边的b
                    removeFillData(this.document, tmpText);
                    fillData = tmpText;
                    mergeSibling(tmp, 'previousSibling');
                    mergeSibling(start, 'nextSibling');
                    nativeRange.moveStart('character', -1);
                    nativeRange.collapse(true);
                }
            }
            this.moveToBookmark(bookmark);
            tmp && domUtils.remove(tmp);
            //IE在隐藏状态下不支持range操作，catch一下
            try {
                nativeRange.select();
            } catch (e) {
            }
            return this;
        } : function (notInsertFillData) {
            function checkOffset(rng){

                function check(node,offset,dir){
                    if(node.nodeType == 3 && node.nodeValue.length < offset){
                        rng[dir + 'Offset'] = node.nodeValue.length
                    }
                }
                check(rng.startContainer,rng.startOffset,'start');
                check(rng.endContainer,rng.endOffset,'end');
            }
            var win = domUtils.getWindow(this.document),
                sel = win.getSelection(),
                txtNode;
            //FF下关闭自动长高时滚动条在关闭dialog时会跳
            //ff下如果不body.focus将不能定位闭合光标到编辑器内
            browser.gecko ? this.document.body.focus() : win.focus();
            if (sel) {
                sel.removeAllRanges();
                // trace:870 chrome/safari后边是br对于闭合得range不能定位 所以去掉了判断
                // this.startContainer.nodeType != 3 &&! ((child = this.startContainer.childNodes[this.startOffset]) && child.nodeType == 1 && child.tagName == 'BR'
                if (this.collapsed && !notInsertFillData) {
//                    //opear如果没有节点接着，原生的不能够定位,不能在body的第一级插入空白节点
//                    if (notInsertFillData && browser.opera && !domUtils.isBody(this.startContainer) && this.startContainer.nodeType == 1) {
//                        var tmp = this.document.createTextNode('');
//                        this.insertNode(tmp).setStart(tmp, 0).collapse(true);
//                    }
//
                    //处理光标落在文本节点的情况
                    //处理以下的情况
                    //<b>|xxxx</b>
                    //<b>xxxx</b>|xxxx
                    //xxxx<b>|</b>
                    var start = this.startContainer,child = start;
                    if(start.nodeType == 1){
                        child = start.childNodes[this.startOffset];

                    }
                    if( !(start.nodeType == 3 && this.startOffset)  &&
                        (child ?
                            (!child.previousSibling || child.previousSibling.nodeType != 3)
                            :
                            (!start.lastChild || start.lastChild.nodeType != 3)
                        )
                    ){
                        txtNode = this.document.createTextNode(fillChar);
                        //跟着前边走
                        this.insertNode(txtNode);
                        removeFillData(this.document, txtNode);
                        mergeSibling(txtNode, 'previousSibling');
                        mergeSibling(txtNode, 'nextSibling');
                        fillData = txtNode;
                        this.setStart(txtNode, browser.webkit ? 1 : 0).collapse(true);
                    }
                }
                var nativeRange = this.document.createRange();
                if(this.collapsed && browser.opera && this.startContainer.nodeType == 1){
                    var child = this.startContainer.childNodes[this.startOffset];
                    if(!child){
                        //往前靠拢
                        child = this.startContainer.lastChild;
                        if( child && domUtils.isBr(child)){
                            this.setStartBefore(child).collapse(true);
                        }
                    }else{
                        //向后靠拢
                        while(child && domUtils.isBlockElm(child)){
                            if(child.nodeType == 1 && child.childNodes[0]){
                                child = child.childNodes[0]
                            }else{
                                break;
                            }
                        }
                        child && this.setStartBefore(child).collapse(true)
                    }

                }
                //是createAddress最后一位算的不准，现在这里进行微调
                checkOffset(this);
                nativeRange.setStart(this.startContainer, this.startOffset);
                nativeRange.setEnd(this.endContainer, this.endOffset);
                sel.addRange(nativeRange);
            }
            return this;
        },

        /**
         * 滚动到当前range开始的位置
         * @method scrollToView
         * @param { Window } win 当前range对象所属的window对象
         * @return { UE.dom.Range } 当前Range对象
         */

        /**
         * 滚动到距离当前range开始位置 offset 的位置处
         * @method scrollToView
         * @param { Window } win 当前range对象所属的window对象
         * @param { Number } offset 距离range开始位置处的偏移量， 如果为正数， 则向下偏移， 反之， 则向上偏移
         * @return { UE.dom.Range } 当前Range对象
         */
        scrollToView:function (win, offset) {
            win = win ? window : domUtils.getWindow(this.document);
            var me = this,
                span = me.document.createElement('span');
            //trace:717
            span.innerHTML = '&nbsp;';
            me.cloneRange().insertNode(span);
            domUtils.scrollToView(span, win, offset);
            domUtils.remove(span);
            return me;
        },

        /**
         * 判断当前选区内容是否占位符
         * @private
         * @method inFillChar
         * @return { Boolean } 如果是占位符返回true，否则返回false
         */
        inFillChar : function(){
            var start = this.startContainer;
            if(this.collapsed && start.nodeType == 3
                && start.nodeValue.replace(new RegExp('^' + domUtils.fillChar),'').length + 1 == start.nodeValue.length
                ){
                return true;
            }
            return false;
        },

        /**
         * 保存
         * @method createAddress
         * @private
         * @return { Boolean } 返回开始和结束的位置
         * @example
         * ```html
         * <body>
         *     <p>
         *         aaaa
         *         <em>
         *             <!-- 选区开始 -->
         *             bbbb
         *             <!-- 选区结束 -->
         *         </em>
         *     </p>
         *
         *     <script>
         *         //output: {startAddress:[0,1,0,0],endAddress:[0,1,0,4]}
         *         console.log( range.createAddress() );
         *     </script>
         * </body>
         * ```
         */
        createAddress : function(ignoreEnd,ignoreTxt){
            var addr = {},me = this;

            function getAddress(isStart){
                var node = isStart ? me.startContainer : me.endContainer;
                var parents = domUtils.findParents(node,true,function(node){return !domUtils.isBody(node)}),
                    addrs = [];
                for(var i = 0,ci;ci = parents[i++];){
                    addrs.push(domUtils.getNodeIndex(ci,ignoreTxt));
                }
                var firstIndex = 0;

                if(ignoreTxt){
                    if(node.nodeType == 3){
                        var tmpNode = node.previousSibling;
                        while(tmpNode && tmpNode.nodeType == 3){
                            firstIndex += tmpNode.nodeValue.replace(fillCharReg,'').length;
                            tmpNode = tmpNode.previousSibling;
                        }
                        firstIndex +=  (isStart ? me.startOffset : me.endOffset)// - (fillCharReg.test(node.nodeValue) ? 1 : 0 )
                    }else{
                        node =  node.childNodes[ isStart ? me.startOffset : me.endOffset];
                        if(node){
                            firstIndex = domUtils.getNodeIndex(node,ignoreTxt);
                        }else{
                            node = isStart ? me.startContainer : me.endContainer;
                            var first = node.firstChild;
                            while(first){
                                if(domUtils.isFillChar(first)){
                                    first = first.nextSibling;
                                    continue;
                                }
                                firstIndex++;
                                if(first.nodeType == 3){
                                    while( first && first.nodeType == 3){
                                        first = first.nextSibling;
                                    }
                                }else{
                                    first = first.nextSibling;
                                }
                            }
                        }
                    }

                }else{
                    firstIndex = isStart ? domUtils.isFillChar(node) ? 0 : me.startOffset  : me.endOffset
                }
                if(firstIndex < 0){
                    firstIndex = 0;
                }
                addrs.push(firstIndex);
                return addrs;
            }
            addr.startAddress = getAddress(true);
            if(!ignoreEnd){
                addr.endAddress = me.collapsed ? [].concat(addr.startAddress) : getAddress();
            }
            return addr;
        },

        /**
         * 保存
         * @method createAddress
         * @private
         * @return { Boolean } 返回开始和结束的位置
         * @example
         * ```html
         * <body>
         *     <p>
         *         aaaa
         *         <em>
         *             <!-- 选区开始 -->
         *             bbbb
         *             <!-- 选区结束 -->
         *         </em>
         *     </p>
         *
         *     <script>
         *         var range = editor.selection.getRange();
         *         range.moveToAddress({startAddress:[0,1,0,0],endAddress:[0,1,0,4]});
         *         range.select();
         *         //output: 'bbbb'
         *         console.log(editor.selection.getText());
         *     </script>
         * </body>
         * ```
         */
        moveToAddress : function(addr,ignoreEnd){
            var me = this;
            function getNode(address,isStart){
                var tmpNode = me.document.body,
                    parentNode,offset;
                for(var i= 0,ci,l=address.length;i<l;i++){
                    ci = address[i];
                    parentNode = tmpNode;
                    tmpNode = tmpNode.childNodes[ci];
                    if(!tmpNode){
                        offset = ci;
                        break;
                    }
                }
                if(isStart){
                    if(tmpNode){
                        me.setStartBefore(tmpNode)
                    }else{
                        me.setStart(parentNode,offset)
                    }
                }else{
                    if(tmpNode){
                        me.setEndBefore(tmpNode)
                    }else{
                        me.setEnd(parentNode,offset)
                    }
                }
            }
            getNode(addr.startAddress,true);
            !ignoreEnd && addr.endAddress &&  getNode(addr.endAddress);
            return me;
        },

        /**
         * 判断给定的Range对象是否和当前Range对象表示的是同一个选区
         * @method equals
         * @param { UE.dom.Range } 需要判断的Range对象
         * @return { Boolean } 如果给定的Range对象与当前Range对象表示的是同一个选区， 则返回true， 否则返回false
         */
        equals : function(rng){
            for(var p in this){
                if(this.hasOwnProperty(p)){
                    if(this[p] !== rng[p])
                        return false
                }
            }
            return true;

        },

        /**
         * 遍历range内的节点。每当遍历一个节点时， 都会执行参数项 doFn 指定的函数， 该函数的接受当前遍历的节点
         * 作为其参数。
         * @method traversal
         * @param { Function }  doFn 对每个遍历的节点要执行的方法， 该方法接受当前遍历的节点作为其参数
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         *
         * <body>
         *
         *     <!-- 选区开始 -->
         *     <span></span>
         *     <a></a>
         *     <!-- 选区结束 -->
         * </body>
         *
         * <script>
         *
         *     //output: <span></span><a></a>
         *     console.log( range.cloneContents() );
         *
         *     range.traversal( function ( node ) {
         *
         *         if ( node.nodeType === 1 ) {
         *             node.className = "test";
         *         }
         *
         *     } );
         *
         *     //output: <span class="test"></span><a class="test"></a>
         *     console.log( range.cloneContents() );
         *
         * </script>
         * ```
         */

        /**
         * 遍历range内的节点。
         * 每当遍历一个节点时， 都会执行参数项 doFn 指定的函数， 该函数的接受当前遍历的节点
         * 作为其参数。
         * 可以通过参数项 filterFn 来指定一个过滤器， 只有符合该过滤器过滤规则的节点才会触
         * 发doFn函数的执行
         * @method traversal
         * @param { Function } doFn 对每个遍历的节点要执行的方法， 该方法接受当前遍历的节点作为其参数
         * @param { Function } filterFn 过滤器， 该函数接受当前遍历的节点作为参数， 如果该节点满足过滤
         *                      规则， 请返回true， 该节点会触发doFn， 否则， 请返回false， 则该节点不
         *                      会触发doFn。
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.Range:traversal(Function)
         * @example
         * ```html
         *
         * <body>
         *
         *     <!-- 选区开始 -->
         *     <span></span>
         *     <a></a>
         *     <!-- 选区结束 -->
         * </body>
         *
         * <script>
         *
         *     //output: <span></span><a></a>
         *     console.log( range.cloneContents() );
         *
         *     range.traversal( function ( node ) {
         *
         *         node.className = "test";
         *
         *     }, function ( node ) {
         *          return node.nodeType === 1;
         *     } );
         *
         *     //output: <span class="test"></span><a class="test"></a>
         *     console.log( range.cloneContents() );
         *
         * </script>
         * ```
         */
        traversal:function(doFn,filterFn){
            if (this.collapsed)
                return this;
            var bookmark = this.createBookmark(),
                end = bookmark.end,
                current = domUtils.getNextDomNode(bookmark.start, false, filterFn);
            while (current && current !== end && (domUtils.getPosition(current, end) & domUtils.POSITION_PRECEDING)) {
                var tmpNode = domUtils.getNextDomNode(current,false,filterFn);
                doFn(current);
                current = tmpNode;
            }
            return this.moveToBookmark(bookmark);
        }
    };
})();

// core/Selection.js
/**
 * 选集
 * @file
 * @module UE.dom
 * @class Selection
 * @since 1.2.6.1
 */

/**
 * 选区集合
 * @unfile
 * @module UE.dom
 * @class Selection
 */
(function () {

    function getBoundaryInformation( range, start ) {
        var getIndex = domUtils.getNodeIndex;
        range = range.duplicate();
        range.collapse( start );
        var parent = range.parentElement();
        //如果节点里没有子节点，直接退出
        if ( !parent.hasChildNodes() ) {
            return  {container:parent, offset:0};
        }
        var siblings = parent.children,
            child,
            testRange = range.duplicate(),
            startIndex = 0, endIndex = siblings.length - 1, index = -1,
            distance;
        while ( startIndex <= endIndex ) {
            index = Math.floor( (startIndex + endIndex) / 2 );
            child = siblings[index];
            testRange.moveToElementText( child );
            var position = testRange.compareEndPoints( 'StartToStart', range );
            if ( position > 0 ) {
                endIndex = index - 1;
            } else if ( position < 0 ) {
                startIndex = index + 1;
            } else {
                //trace:1043
                return  {container:parent, offset:getIndex( child )};
            }
        }
        if ( index == -1 ) {
            testRange.moveToElementText( parent );
            testRange.setEndPoint( 'StartToStart', range );
            distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
            siblings = parent.childNodes;
            if ( !distance ) {
                child = siblings[siblings.length - 1];
                return  {container:child, offset:child.nodeValue.length};
            }

            var i = siblings.length;
            while ( distance > 0 ){
                distance -= siblings[ --i ].nodeValue.length;
            }
            return {container:siblings[i], offset:-distance};
        }
        testRange.collapse( position > 0 );
        testRange.setEndPoint( position > 0 ? 'StartToStart' : 'EndToStart', range );
        distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
        if ( !distance ) {
            return  dtd.$empty[child.tagName] || dtd.$nonChild[child.tagName] ?
            {container:parent, offset:getIndex( child ) + (position > 0 ? 0 : 1)} :
            {container:child, offset:position > 0 ? 0 : child.childNodes.length}
        }
        while ( distance > 0 ) {
            try {
                var pre = child;
                child = child[position > 0 ? 'previousSibling' : 'nextSibling'];
                distance -= child.nodeValue.length;
            } catch ( e ) {
                return {container:parent, offset:getIndex( pre )};
            }
        }
        return  {container:child, offset:position > 0 ? -distance : child.nodeValue.length + distance}
    }

    /**
     * 将ieRange转换为Range对象
     * @param {Range}   ieRange    ieRange对象
     * @param {Range}   range      Range对象
     * @return  {Range}  range       返回转换后的Range对象
     */
    function transformIERangeToRange( ieRange, range ) {
        if ( ieRange.item ) {
            range.selectNode( ieRange.item( 0 ) );
        } else {
            var bi = getBoundaryInformation( ieRange, true );
            range.setStart( bi.container, bi.offset );
            if ( ieRange.compareEndPoints( 'StartToEnd', ieRange ) != 0 ) {
                bi = getBoundaryInformation( ieRange, false );
                range.setEnd( bi.container, bi.offset );
            }
        }
        return range;
    }

    /**
     * 获得ieRange
     * @param {Selection} sel    Selection对象
     * @return {ieRange}    得到ieRange
     */
    function _getIERange( sel ) {
        var ieRange;
        //ie下有可能报错
        try {
            ieRange = sel.getNative().createRange();
        } catch ( e ) {
            return null;
        }
        var el = ieRange.item ? ieRange.item( 0 ) : ieRange.parentElement();
        if ( ( el.ownerDocument || el ) === sel.document ) {
            return ieRange;
        }
        return null;
    }

    var Selection = dom.Selection = function ( doc ) {
        var me = this, iframe;
        me.document = doc;
        if ( browser.ie9below ) {
            iframe = domUtils.getWindow( doc ).frameElement;
            domUtils.on( iframe, 'beforedeactivate', function () {
                me._bakIERange = me.getIERange();
            } );
            domUtils.on( iframe, 'activate', function () {
                try {
                    if ( !_getIERange( me ) && me._bakIERange ) {
                        me._bakIERange.select();
                    }
                } catch ( ex ) {
                }
                me._bakIERange = null;
            } );
        }
        iframe = doc = null;
    };

    Selection.prototype = {

        rangeInBody : function(rng,txtRange){
            var node = browser.ie9below || txtRange ? rng.item ? rng.item() : rng.parentElement() : rng.startContainer;

            return node === this.document.body || domUtils.inDoc(node,this.document);
        },

        /**
         * 获取原生seleciton对象
         * @method getNative
         * @return { Object } 获得selection对象
         * @example
         * ```javascript
         * editor.selection.getNative();
         * ```
         */
        getNative:function () {
            var doc = this.document;
            try {
                return !doc ? null : browser.ie9below ? doc.selection : domUtils.getWindow( doc ).getSelection();
            } catch ( e ) {
                return null;
            }
        },

        /**
         * 获得ieRange
         * @method getIERange
         * @return { Object } 返回ie原生的Range
         * @example
         * ```javascript
         * editor.selection.getIERange();
         * ```
         */
        getIERange:function () {
            var ieRange = _getIERange( this );
            if ( !ieRange ) {
                if ( this._bakIERange ) {
                    return this._bakIERange;
                }
            }
            return ieRange;
        },

        /**
         * 缓存当前选区的range和选区的开始节点
         * @method cache
         */
        cache:function () {
            this.clear();
            this._cachedRange = this.getRange();
            this._cachedStartElement = this.getStart();
            this._cachedStartElementPath = this.getStartElementPath();
        },

        /**
         * 获取选区开始位置的父节点到body
         * @method getStartElementPath
         * @return { Array } 返回父节点集合
         * @example
         * ```javascript
         * editor.selection.getStartElementPath();
         * ```
         */
        getStartElementPath:function () {
            if ( this._cachedStartElementPath ) {
                return this._cachedStartElementPath;
            }
            var start = this.getStart();
            if ( start ) {
                return domUtils.findParents( start, true, null, true )
            }
            return [];
        },

        /**
         * 清空缓存
         * @method clear
         */
        clear:function () {
            this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null;
        },

        /**
         * 编辑器是否得到了选区
         * @method isFocus
         */
        isFocus:function () {
            try {
                if(browser.ie9below){

                    var nativeRange = _getIERange(this);
                    return !!(nativeRange && this.rangeInBody(nativeRange));
                }else{
                    return !!this.getNative().rangeCount;
                }
            } catch ( e ) {
                return false;
            }

        },

        /**
         * 获取选区对应的Range
         * @method getRange
         * @return { Object } 得到Range对象
         * @example
         * ```javascript
         * editor.selection.getRange();
         * ```
         */
        getRange:function () {
            var me = this;
            function optimze( range ) {
                var child = me.document.body.firstChild,
                    collapsed = range.collapsed;
                while ( child && child.firstChild ) {
                    range.setStart( child, 0 );
                    child = child.firstChild;
                }
                if ( !range.startContainer ) {
                    range.setStart( me.document.body, 0 )
                }
                if ( collapsed ) {
                    range.collapse( true );
                }
            }

            if ( me._cachedRange != null ) {
                return this._cachedRange;
            }
            var range = new baidu.editor.dom.Range( me.document );

            if ( browser.ie9below ) {
                var nativeRange = me.getIERange();
                if ( nativeRange ) {
                    //备份的_bakIERange可能已经实效了，dom树发生了变化比如从源码模式切回来，所以try一下，实效就放到body开始位置
                    try{
                        transformIERangeToRange( nativeRange, range );
                    }catch(e){
                        optimze( range );
                    }

                } else {
                    optimze( range );
                }
            } else {
                var sel = me.getNative();
                if ( sel && sel.rangeCount ) {
                    var firstRange = sel.getRangeAt( 0 );
                    var lastRange = sel.getRangeAt( sel.rangeCount - 1 );
                    range.setStart( firstRange.startContainer, firstRange.startOffset ).setEnd( lastRange.endContainer, lastRange.endOffset );
                    if ( range.collapsed && domUtils.isBody( range.startContainer ) && !range.startOffset ) {
                        optimze( range );
                    }
                } else {
                    //trace:1734 有可能已经不在dom树上了，标识的节点
                    if ( this._bakRange && domUtils.inDoc( this._bakRange.startContainer, this.document ) ){
                        return this._bakRange;
                    }
                    optimze( range );
                }
            }
            return this._bakRange = range;
        },

        /**
         * 获取开始元素，用于状态反射
         * @method getStart
         * @return { Element } 获得开始元素
         * @example
         * ```javascript
         * editor.selection.getStart();
         * ```
         */
        getStart:function () {
            if ( this._cachedStartElement ) {
                return this._cachedStartElement;
            }
            var range = browser.ie9below ? this.getIERange() : this.getRange(),
                tmpRange,
                start, tmp, parent;
            if ( browser.ie9below ) {
                if ( !range ) {
                    //todo 给第一个值可能会有问题
                    return this.document.body.firstChild;
                }
                //control元素
                if ( range.item ){
                    return range.item( 0 );
                }
                tmpRange = range.duplicate();
                //修正ie下<b>x</b>[xx] 闭合后 <b>x|</b>xx
                tmpRange.text.length > 0 && tmpRange.moveStart( 'character', 1 );
                tmpRange.collapse( 1 );
                start = tmpRange.parentElement();
                parent = tmp = range.parentElement();
                while ( tmp = tmp.parentNode ) {
                    if ( tmp == start ) {
                        start = parent;
                        break;
                    }
                }
            } else {
                range.shrinkBoundary();
                start = range.startContainer;
                if ( start.nodeType == 1 && start.hasChildNodes() ){
                    start = start.childNodes[Math.min( start.childNodes.length - 1, range.startOffset )];
                }
                if ( start.nodeType == 3 ){
                    return start.parentNode;
                }
            }
            return start;
        },

        /**
         * 得到选区中的文本
         * @method getText
         * @return { String } 选区中包含的文本
         * @example
         * ```javascript
         * editor.selection.getText();
         * ```
         */
        getText:function () {
            var nativeSel, nativeRange;
            if ( this.isFocus() && (nativeSel = this.getNative()) ) {
                nativeRange = browser.ie9below ? nativeSel.createRange() : nativeSel.getRangeAt( 0 );
                return browser.ie9below ? nativeRange.text : nativeRange.toString();
            }
            return '';
        },

        /**
         * 清除选区
         * @method clearRange
         * @example
         * ```javascript
         * editor.selection.clearRange();
         * ```
         */
        clearRange : function(){
            this.getNative()[browser.ie9below ? 'empty' : 'removeAllRanges']();
        }
    };
})();

// core/Editor.js
/**
 * 编辑器主类，包含编辑器提供的大部分公用接口
 * @file
 * @module UE
 * @class Editor
 * @since 1.2.6.1
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @unfile
 * @module UE
 */

/**
 * UEditor的核心类，为用户提供与编辑器交互的接口。
 * @unfile
 * @module UE
 * @class Editor
 */

(function () {
    var uid = 0, _selectionChangeTimer;

    /**
     * 获取编辑器的html内容，赋值到编辑器所在表单的textarea文本域里面
     * @private
     * @method setValue
     * @param { UE.Editor } editor 编辑器事例
     */
    function setValue(form, editor) {
        var textarea;
        if (editor.textarea) {
            if (utils.isString(editor.textarea)) {
                for (var i = 0, ti, tis = domUtils.getElementsByTagName(form, 'textarea'); ti = tis[i++];) {
                    if (ti.id == 'ueditor_textarea_' + editor.options.textarea) {
                        textarea = ti;
                        break;
                    }
                }
            } else {
                textarea = editor.textarea;
            }
        }
        if (!textarea) {
            form.appendChild(textarea = domUtils.createElement(document, 'textarea', {
                'name': editor.options.textarea,
                'id': 'ueditor_textarea_' + editor.options.textarea,
                'style': "display:none"
            }));
            //不要产生多个textarea
            editor.textarea = textarea;
        }
        !textarea.getAttribute('name') && textarea.setAttribute('name', editor.options.textarea );
        textarea.value = editor.hasContents() ?
            (editor.options.allHtmlEnabled ? editor.getAllHtml() : editor.getContent(null, null, true)) :
            ''
    }
    function loadPlugins(me){
        //初始化插件
        for (var pi in UE.plugins) {
            UE.plugins[pi].call(me);
        }

    }
    function checkCurLang(I18N){
        for(var lang in I18N){
            return lang
        }
    }

    function langReadied(me){
        me.langIsReady = true;

        me.fireEvent("langReady");
    }

    /**
     * 编辑器准备就绪后会触发该事件
     * @module UE
     * @class Editor
     * @event ready
     * @remind render方法执行完成之后,会触发该事件
     * @remind
     * @example
     * ```javascript
     * editor.addListener( 'ready', function( editor ) {
     *     editor.execCommand( 'focus' ); //编辑器家在完成后，让编辑器拿到焦点
     * } );
     * ```
     */
    /**
     * 执行destroy方法,会触发该事件
     * @module UE
     * @class Editor
     * @event destroy
     * @see UE.Editor:destroy()
     */
    /**
     * 执行reset方法,会触发该事件
     * @module UE
     * @class Editor
     * @event reset
     * @see UE.Editor:reset()
     */
    /**
     * 执行focus方法,会触发该事件
     * @module UE
     * @class Editor
     * @event focus
     * @see UE.Editor:focus(Boolean)
     */
    /**
     * 语言加载完成会触发该事件
     * @module UE
     * @class Editor
     * @event langReady
     */
    /**
     * 运行命令之后会触发该命令
     * @module UE
     * @class Editor
     * @event beforeExecCommand
     */
    /**
     * 运行命令之后会触发该命令
     * @module UE
     * @class Editor
     * @event afterExecCommand
     */
    /**
     * 运行命令之前会触发该命令
     * @module UE
     * @class Editor
     * @event firstBeforeExecCommand
     */
    /**
     * 在getContent方法执行之前会触发该事件
     * @module UE
     * @class Editor
     * @event beforeGetContent
     * @see UE.Editor:getContent()
     */
    /**
     * 在getContent方法执行之后会触发该事件
     * @module UE
     * @class Editor
     * @event afterGetContent
     * @see UE.Editor:getContent()
     */
    /**
     * 在getAllHtml方法执行时会触发该事件
     * @module UE
     * @class Editor
     * @event getAllHtml
     * @see UE.Editor:getAllHtml()
     */
    /**
     * 在setContent方法执行之前会触发该事件
     * @module UE
     * @class Editor
     * @event beforeSetContent
     * @see UE.Editor:setContent(String)
     */
    /**
     * 在setContent方法执行之后会触发该事件
     * @module UE
     * @class Editor
     * @event afterSetContent
     * @see UE.Editor:setContent(String)
     */
    /**
     * 每当编辑器内部选区发生改变时，将触发该事件
     * @event selectionchange
     * @warning 该事件的触发非常频繁，不建议在该事件的处理过程中做重量级的处理
     * @example
     * ```javascript
     * editor.addListener( 'selectionchange', function( editor ) {
     *     console.log('选区发生改变');
     * }
     */
    /**
     * 在所有selectionchange的监听函数执行之前，会触发该事件
     * @module UE
     * @class Editor
     * @event beforeSelectionChange
     * @see UE.Editor:selectionchange
     */
    /**
     * 在所有selectionchange的监听函数执行完之后，会触发该事件
     * @module UE
     * @class Editor
     * @event afterSelectionChange
     * @see UE.Editor:selectionchange
     */
    /**
     * 编辑器内容发生改变时会触发该事件
     * @module UE
     * @class Editor
     * @event contentChange
     */


    /**
     * 以默认参数构建一个编辑器实例
     * @constructor
     * @remind 通过 改构造方法实例化的编辑器,不带ui层.需要render到一个容器,编辑器实例才能正常渲染到页面
     * @example
     * ```javascript
     * var editor = new UE.Editor();
     * editor.execCommand('blod');
     * ```
     * @see UE.Config
     */

    /**
     * 以给定的参数集合创建一个编辑器实例，对于未指定的参数，将应用默认参数。
     * @constructor
     * @remind 通过 改构造方法实例化的编辑器,不带ui层.需要render到一个容器,编辑器实例才能正常渲染到页面
     * @param { Object } setting 创建编辑器的参数
     * @example
     * ```javascript
     * var editor = new UE.Editor();
     * editor.execCommand('blod');
     * ```
     * @see UE.Config
     */
    var Editor = UE.Editor = function (options) {
        var me = this;
        me.uid = uid++;
        EventBase.call(me);
        me.commands = {};
        me.options = utils.extend(utils.clone(options || {}), UEDITOR_CONFIG, true);
        me.shortcutkeys = {};
        me.inputRules = [];
        me.outputRules = [];
        //设置默认的常用属性
        me.setOpt(Editor.defaultOptions(me));

        /* 尝试异步加载后台配置 */
        me.loadServerConfig();

        if(!utils.isEmptyObject(UE.I18N)){
            //修改默认的语言类型
            me.options.lang = checkCurLang(UE.I18N);
            UE.plugin.load(me);
            langReadied(me);

        }else{
            utils.loadFile(document, {
                src: me.options.langPath + me.options.lang + "/" + me.options.lang + ".js",
                tag: "script",
                type: "text/javascript",
                defer: "defer"
            }, function () {
                UE.plugin.load(me);
                langReadied(me);
            });
        }

        UE.instants['ueditorInstant' + me.uid] = me;
    };
    Editor.prototype = {
         registerCommand : function(name,obj){
            this.commands[name] = obj;
         },
        /**
         * 编辑器对外提供的监听ready事件的接口， 通过调用该方法，达到的效果与监听ready事件是一致的
         * @method ready
         * @param { Function } fn 编辑器ready之后所执行的回调, 如果在注册事件之前编辑器已经ready，将会
         * 立即触发该回调。
         * @remind 需要等待编辑器加载完成后才能执行的代码,可以使用该方法传入
         * @example
         * ```javascript
         * editor.ready( function( editor ) {
         *     editor.setContent('初始化完毕');
         * } );
         * ```
         * @see UE.Editor.event:ready
         */
        ready: function (fn) {
            var me = this;
            if (fn) {
                me.isReady ? fn.apply(me) : me.addListener('ready', fn);
            }
        },

        /**
         * 该方法是提供给插件里面使用，设置配置项默认值
         * @method setOpt
         * @warning 三处设置配置项的优先级: 实例化时传入参数 > setOpt()设置 > config文件里设置
         * @warning 该方法仅供编辑器插件内部和编辑器初始化时调用，其他地方不能调用。
         * @param { String } key 编辑器的可接受的选项名称
         * @param { * } val  该选项可接受的值
         * @example
         * ```javascript
         * editor.setOpt( 'initContent', '欢迎使用编辑器' );
         * ```
         */

        /**
         * 该方法是提供给插件里面使用，以{key:value}集合的方式设置插件内用到的配置项默认值
         * @method setOpt
         * @warning 三处设置配置项的优先级: 实例化时传入参数 > setOpt()设置 > config文件里设置
         * @warning 该方法仅供编辑器插件内部和编辑器初始化时调用，其他地方不能调用。
         * @param { Object } options 将要设置的选项的键值对对象
         * @example
         * ```javascript
         * editor.setOpt( {
         *     'initContent': '欢迎使用编辑器'
         * } );
         * ```
         */
        setOpt: function (key, val) {
            var obj = {};
            if (utils.isString(key)) {
                obj[key] = val
            } else {
                obj = key;
            }
            utils.extend(this.options, obj, true);
        },
        getOpt:function(key){
            return this.options[key]
        },
        /**
         * 销毁编辑器实例，使用textarea代替
         * @method destroy
         * @example
         * ```javascript
         * editor.destroy();
         * ```
         */
        destroy: function () {

            var me = this;
            me.fireEvent('destroy');
            var container = me.container.parentNode;
            var textarea = me.textarea;
            if (!textarea) {
                textarea = document.createElement('textarea');
                container.parentNode.insertBefore(textarea, container);
            } else {
                textarea.style.display = ''
            }

            textarea.style.width = me.iframe.offsetWidth + 'px';
            textarea.style.height = me.iframe.offsetHeight + 'px';
            textarea.value = me.getContent();
            textarea.id = me.key;
            container.innerHTML = '';
            domUtils.remove(container);
            var key = me.key;
            //trace:2004
            for (var p in me) {
                if (me.hasOwnProperty(p)) {
                    delete this[p];
                }
            }
            UE.delEditor(key);
        },

        /**
         * 渲染编辑器的DOM到指定容器
         * @method render
         * @param { String } containerId 指定一个容器ID
         * @remind 执行该方法,会触发ready事件
         * @warning 必须且只能调用一次
         */

        /**
         * 渲染编辑器的DOM到指定容器
         * @method render
         * @param { Element } containerDom 直接指定容器对象
         * @remind 执行该方法,会触发ready事件
         * @warning 必须且只能调用一次
         */
        render: function (container) {
            var me = this,
                options = me.options,
                getStyleValue=function(attr){
                    return parseInt(domUtils.getComputedStyle(container,attr));
                };
            if (utils.isString(container)) {
                container = document.getElementById(container);
            }
            if (container) {
                if(options.initialFrameWidth){
                    options.minFrameWidth = options.initialFrameWidth
                }else{
                    options.minFrameWidth = options.initialFrameWidth = container.offsetWidth;
                }
                if(options.initialFrameHeight){
                    options.minFrameHeight = options.initialFrameHeight
                }else{
                    options.initialFrameHeight = options.minFrameHeight = container.offsetHeight;
                }

                container.style.width = /%$/.test(options.initialFrameWidth) ?  '100%' : options.initialFrameWidth-
                    getStyleValue("padding-left")- getStyleValue("padding-right") +'px';
                container.style.height = /%$/.test(options.initialFrameHeight) ?  '100%' : options.initialFrameHeight -
                    getStyleValue("padding-top")- getStyleValue("padding-bottom") +'px';

                container.style.zIndex = options.zIndex;

                var html = ( ie && browser.version < 9  ? '' : '<!DOCTYPE html>') +
                    '<html xmlns=\'http://www.w3.org/1999/xhtml\' class=\'view\' ><head>' +
                    '<style type=\'text/css\'>' +
                    //设置四周的留边
                    '.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\n' +
                    //设置默认字体和字号
                    //font-family不能呢随便改，在safari下fillchar会有解析问题
                    'body{margin:8px;font-family:sans-serif;font-size:16px;}' +
                    'img{max-width:100%}'+//控制图片大小
                    //设置段落间距
                    'p{margin:5px 0;}</style>' +
                    ( options.iframeCssUrl ? '<link rel=\'stylesheet\' type=\'text/css\' href=\'' + utils.unhtml(options.iframeCssUrl) + '\'/>' : '' ) +
                    (options.initialStyle ? '<style>' + options.initialStyle + '</style>' : '') +
                    '</head><body class=\'view\' ></body>' +
                    '<script type=\'text/javascript\' ' + (ie ? 'defer=\'defer\'' : '' ) +' id=\'_initialScript\'>' +
                    'setTimeout(function(){editor = window.parent.UE.instants[\'ueditorInstant' + me.uid + '\'];editor._setup(document);},0);' +
                    'var _tmpScript = document.getElementById(\'_initialScript\');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>';
                container.appendChild(domUtils.createElement(document, 'iframe', {
                    id: 'ueditor_' + me.uid,
                    width: "100%",
                    height: "100%",
                    frameborder: "0",
                    //先注释掉了，加的原因忘记了，但开启会直接导致全屏模式下内容多时不会出现滚动条
//                    scrolling :'no',
                    src: 'javascript:void(function(){document.open();' + (options.customDomain && document.domain != location.hostname ?  'document.domain="' + document.domain + '";' : '') +
                        'document.write("' + html + '");document.close();}())'
                }));
                container.style.overflow = 'hidden';
                //解决如果是给定的百分比，会导致高度算不对的问题
                setTimeout(function(){
                    if( /%$/.test(options.initialFrameWidth)){
                        options.minFrameWidth = options.initialFrameWidth = container.offsetWidth;
                        //如果这里给定宽度，会导致ie在拖动窗口大小时，编辑区域不随着变化
//                        container.style.width = options.initialFrameWidth + 'px';
                    }
                    if(/%$/.test(options.initialFrameHeight)){
                        options.minFrameHeight = options.initialFrameHeight = container.offsetHeight;
                        container.style.height = options.initialFrameHeight + 'px';
                    }
                })
            }
        },

        /**
         * 编辑器初始化
         * @method _setup
         * @private
         * @param { Element } doc 编辑器Iframe中的文档对象
         */
        _setup: function (doc) {

            var me = this,
                options = me.options;
            if (ie) {
                doc.body.disabled = true;
                doc.body.contentEditable = true;
                doc.body.disabled = false;
            } else {
                doc.body.contentEditable = true;
            }
            doc.body.spellcheck = false;
            me.document = doc;
            me.window = doc.defaultView || doc.parentWindow;
            me.iframe = me.window.frameElement;
            me.body = doc.body;
            me.selection = new dom.Selection(doc);
            //gecko初始化就能得到range,无法判断isFocus了
            var geckoSel;
            if (browser.gecko && (geckoSel = this.selection.getNative())) {
                geckoSel.removeAllRanges();
            }
            this._initEvents();
            //为form提交提供一个隐藏的textarea
            for (var form = this.iframe.parentNode; !domUtils.isBody(form); form = form.parentNode) {
                if (form.tagName == 'FORM') {
                    me.form = form;
                    if(me.options.autoSyncData){
                        domUtils.on(me.window,'blur',function(){
                            setValue(form,me);
                        });
                    }else{
                        domUtils.on(form, 'submit', function () {
                            setValue(this, me);
                        });
                    }
                    break;
                }
            }
            if (options.initialContent) {
                if (options.autoClearinitialContent) {
                    var oldExecCommand = me.execCommand;
                    me.execCommand = function () {
                        me.fireEvent('firstBeforeExecCommand');
                        return oldExecCommand.apply(me, arguments);
                    };
                    this._setDefaultContent(options.initialContent);
                } else
                    this.setContent(options.initialContent, false, true);
            }

            //编辑器不能为空内容

            if (domUtils.isEmptyNode(me.body)) {
                me.body.innerHTML = '<p>' + (browser.ie ? '' : '<br/>') + '</p>';
            }
            //如果要求focus, 就把光标定位到内容开始
            if (options.focus) {
                setTimeout(function () {
                    me.focus(me.options.focusInEnd);
                    //如果自动清除开着，就不需要做selectionchange;
                    !me.options.autoClearinitialContent && me._selectionChange();
                }, 0);
            }
            if (!me.container) {
                me.container = this.iframe.parentNode;
            }
            if (options.fullscreen && me.ui) {
                me.ui.setFullScreen(true);
            }

            try {
                me.document.execCommand('2D-position', false, false);
            } catch (e) {
            }
            try {
                me.document.execCommand('enableInlineTableEditing', false, false);
            } catch (e) {
            }
            try {
                me.document.execCommand('enableObjectResizing', false, false);
            } catch (e) {
            }

            //挂接快捷键
            me._bindshortcutKeys();
            me.isReady = 1;
            me.fireEvent('ready');
            options.onready && options.onready.call(me);
            if (!browser.ie9below) {
                domUtils.on(me.window, ['blur', 'focus'], function (e) {
                    //chrome下会出现alt+tab切换时，导致选区位置不对
                    if (e.type == 'blur') {
                        me._bakRange = me.selection.getRange();
                        try {
                            me._bakNativeRange = me.selection.getNative().getRangeAt(0);
                            me.selection.getNative().removeAllRanges();
                        } catch (e) {
                            me._bakNativeRange = null;
                        }

                    } else {
                        try {
                            me._bakRange && me._bakRange.select();
                        } catch (e) {
                        }
                    }
                });
            }
            //trace:1518 ff3.6body不够寛，会导致点击空白处无法获得焦点
            if (browser.gecko && browser.version <= 10902) {
                //修复ff3.6初始化进来，不能点击获得焦点
                me.body.contentEditable = false;
                setTimeout(function () {
                    me.body.contentEditable = true;
                }, 100);
                setInterval(function () {
                    me.body.style.height = me.iframe.offsetHeight - 20 + 'px'
                }, 100)
            }

            !options.isShow && me.setHide();
            options.readonly && me.setDisabled();
        },

        /**
         * 同步数据到编辑器所在的form
         * 从编辑器的容器节点向上查找form元素，若找到，就同步编辑内容到找到的form里，为提交数据做准备，主要用于是手动提交的情况
         * 后台取得数据的键值，使用你容器上的name属性，如果没有就使用参数里的textarea项
         * @method sync
         * @example
         * ```javascript
         * editor.sync();
         * form.sumbit(); //form变量已经指向了form元素
         * ```
         */

        /**
         * 根据传入的formId，在页面上查找要同步数据的表单，若找到，就同步编辑内容到找到的form里，为提交数据做准备
         * 后台取得数据的键值，该键值默认使用给定的编辑器容器的name属性，如果没有name属性则使用参数项里给定的“textarea”项
         * @method sync
         * @param { String } formID 指定一个要同步数据的form的id,编辑器的数据会同步到你指定form下
         */
        sync: function (formId) {
            var me = this,
                form = formId ? document.getElementById(formId) :
                    domUtils.findParent(me.iframe.parentNode, function (node) {
                        return node.tagName == 'FORM'
                    }, true);
            form && setValue(form, me);
        },

        /**
         * 设置编辑器高度
         * @method setHeight
         * @remind 当配置项autoHeightEnabled为真时,该方法无效
         * @param { Number } number 设置的高度值，纯数值，不带单位
         * @example
         * ```javascript
         * editor.setHeight(number);
         * ```
         */
        setHeight: function (height,notSetHeight) {
            if (height !== parseInt(this.iframe.parentNode.style.height)) {
                this.iframe.parentNode.style.height = height + 'px';
            }
            !notSetHeight && (this.options.minFrameHeight = this.options.initialFrameHeight = height);
            this.body.style.height = height + 'px';
            !notSetHeight && this.trigger('setHeight')
        },

        /**
         * 为编辑器的编辑命令提供快捷键
         * 这个接口是为插件扩展提供的接口,主要是为新添加的插件，如果需要添加快捷键，所提供的接口
         * @method addshortcutkey
         * @param { Object } keyset 命令名和快捷键键值对对象，多个按钮的快捷键用“＋”分隔
         * @example
         * ```javascript
         * editor.addshortcutkey({
         *     "Bold" : "ctrl+66",//^B
         *     "Italic" : "ctrl+73", //^I
         * });
         * ```
         */
        /**
         * 这个接口是为插件扩展提供的接口,主要是为新添加的插件，如果需要添加快捷键，所提供的接口
         * @method addshortcutkey
         * @param { String } cmd 触发快捷键时，响应的命令
         * @param { String } keys 快捷键的字符串，多个按钮用“＋”分隔
         * @example
         * ```javascript
         * editor.addshortcutkey("Underline", "ctrl+85"); //^U
         * ```
         */
        addshortcutkey: function (cmd, keys) {
            var obj = {};
            if (keys) {
                obj[cmd] = keys
            } else {
                obj = cmd;
            }
            utils.extend(this.shortcutkeys, obj)
        },

        /**
         * 对编辑器设置keydown事件监听，绑定快捷键和命令，当快捷键组合触发成功，会响应对应的命令
         * @method _bindshortcutKeys
         * @private
         */
        _bindshortcutKeys: function () {
            var me = this, shortcutkeys = this.shortcutkeys;
            me.addListener('keydown', function (type, e) {
                var keyCode = e.keyCode || e.which;
                for (var i in shortcutkeys) {
                    var tmp = shortcutkeys[i].split(',');
                    for (var t = 0, ti; ti = tmp[t++];) {
                        ti = ti.split(':');
                        var key = ti[0], param = ti[1];
                        if (/^(ctrl)(\+shift)?\+(\d+)$/.test(key.toLowerCase()) || /^(\d+)$/.test(key)) {
                            if (( (RegExp.$1 == 'ctrl' ? (e.ctrlKey || e.metaKey) : 0)
                                && (RegExp.$2 != "" ? e[RegExp.$2.slice(1) + "Key"] : 1)
                                && keyCode == RegExp.$3
                                ) ||
                                keyCode == RegExp.$1
                                ) {
                                if (me.queryCommandState(i,param) != -1)
                                    me.execCommand(i, param);
                                domUtils.preventDefault(e);
                            }
                        }
                    }

                }
            });
        },

        /**
         * 获取编辑器的内容
         * @method getContent
         * @warning 该方法获取到的是经过编辑器内置的过滤规则进行过滤后得到的内容
         * @return { String } 编辑器的内容字符串, 如果编辑器的内容为空，或者是空的标签内容（如:”&lt;p&gt;&lt;br/&gt;&lt;/p&gt;“）， 则返回空字符串
         * @example
         * ```javascript
         * //编辑器html内容:<p>1<strong>2<em>34</em>5</strong>6</p>
         * var content = editor.getContent(); //返回值:<p>1<strong>2<em>34</em>5</strong>6</p>
         * ```
         */

        /**
         * 获取编辑器的内容。 可以通过参数定义编辑器内置的判空规则
         * @method getContent
         * @param { Function } fn 自定的判空规则， 要求该方法返回一个boolean类型的值，
         *                      代表当前编辑器的内容是否空，
         *                      如果返回true， 则该方法将直接返回空字符串；如果返回false，则编辑器将返回
         *                      经过内置过滤规则处理后的内容。
         * @remind 该方法在处理包含有初始化内容的时候能起到很好的作用。
         * @warning 该方法获取到的是经过编辑器内置的过滤规则进行过滤后得到的内容
         * @return { String } 编辑器的内容字符串
         * @example
         * ```javascript
         * // editor 是一个编辑器的实例
         * var content = editor.getContent( function ( editor ) {
         *      return editor.body.innerHTML === '欢迎使用UEditor'; //返回空字符串
         * } );
         * ```
         */
        getContent: function (cmd, fn,notSetCursor,ignoreBlank,formatter) {
            var me = this;
            if (cmd && utils.isFunction(cmd)) {
                fn = cmd;
                cmd = '';
            }
            if (fn ? !fn() : !this.hasContents()) {
                return '';
            }
            me.fireEvent('beforegetcontent');
            var root = UE.htmlparser(me.body.innerHTML,ignoreBlank);
            me.filterOutputRule(root);
            me.fireEvent('aftergetcontent', cmd,root);
            return  root.toHtml(formatter);
        },

        /**
         * 取得完整的html代码，可以直接显示成完整的html文档
         * @method getAllHtml
         * @return { String } 编辑器的内容html文档字符串
         * @eaxmple
         * ```javascript
         * editor.getAllHtml(); //返回格式大致是: <html><head>...</head><body>...</body></html>
         * ```
         */
        getAllHtml: function () {
            var me = this,
                headHtml = [],
                html = '';
            me.fireEvent('getAllHtml', headHtml);
            if (browser.ie && browser.version > 8) {
                var headHtmlForIE9 = '';
                utils.each(me.document.styleSheets, function (si) {
                    headHtmlForIE9 += ( si.href ? '<link rel="stylesheet" type="text/css" href="' + si.href + '" />' : '<style>' + si.cssText + '</style>');
                });
                utils.each(me.document.getElementsByTagName('script'), function (si) {
                    headHtmlForIE9 += si.outerHTML;
                });

            }
            return '<html><head>' + (me.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + me.options.charset + '"/>' : '')
                + (headHtmlForIE9 || me.document.getElementsByTagName('head')[0].innerHTML) + headHtml.join('\n') + '</head>'
                + '<body ' + (ie && browser.version < 9 ? 'class="view"' : '') + '>' + me.getContent(null, null, true) + '</body></html>';
        },

        /**
         * 得到编辑器的纯文本内容，但会保留段落格式
         * @method getPlainTxt
         * @return { String } 编辑器带段落格式的纯文本内容字符串
         * @example
         * ```javascript
         * //编辑器html内容:<p><strong>1</strong></p><p><strong>2</strong></p>
         * console.log(editor.getPlainTxt()); //输出:"1\n2\n
         * ```
         */
        getPlainTxt: function () {
            var reg = new RegExp(domUtils.fillChar, 'g'),
                html = this.body.innerHTML.replace(/[\n\r]/g, '');//ie要先去了\n在处理
            html = html.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, '\n')
                .replace(/<br\/?>/gi, '\n')
                .replace(/<[^>/]+>/g, '')
                .replace(/(\n)?<\/([^>]+)>/g, function (a, b, c) {
                    return dtd.$block[c] ? '\n' : b ? b : '';
                });
            //取出来的空格会有c2a0会变成乱码，处理这种情况\u00a0
            return html.replace(reg, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ');
        },

        /**
         * 获取编辑器中的纯文本内容,没有段落格式
         * @method getContentTxt
         * @return { String } 编辑器不带段落格式的纯文本内容字符串
         * @example
         * ```javascript
         * //编辑器html内容:<p><strong>1</strong></p><p><strong>2</strong></p>
         * console.log(editor.getPlainTxt()); //输出:"12
         * ```
         */
        getContentTxt: function () {
            var reg = new RegExp(domUtils.fillChar, 'g');
            //取出来的空格会有c2a0会变成乱码，处理这种情况\u00a0
            return this.body[browser.ie ? 'innerText' : 'textContent'].replace(reg, '').replace(/\u00a0/g, ' ');
        },

        /**
         * 设置编辑器的内容，可修改编辑器当前的html内容
         * @method setContent
         * @warning 通过该方法插入的内容，是经过编辑器内置的过滤规则进行过滤后得到的内容
         * @warning 该方法会触发selectionchange事件
         * @param { String } html 要插入的html内容
         * @example
         * ```javascript
         * editor.getContent('<p>test</p>');
         * ```
         */

        /**
         * 设置编辑器的内容，可修改编辑器当前的html内容
         * @method setContent
         * @warning 通过该方法插入的内容，是经过编辑器内置的过滤规则进行过滤后得到的内容
         * @warning 该方法会触发selectionchange事件
         * @param { String } html 要插入的html内容
         * @param { Boolean } isAppendTo 若传入true，不清空原来的内容，在最后插入内容，否则，清空内容再插入
         * @example
         * ```javascript
         * //假设设置前的编辑器内容是 <p>old text</p>
         * editor.setContent('<p>new text</p>', true); //插入的结果是<p>old text</p><p>new text</p>
         * ```
         */
        setContent: function (html, isAppendTo, notFireSelectionchange) {
            var me = this;

            me.fireEvent('beforesetcontent', html);
            var root = UE.htmlparser(html);
            me.filterInputRule(root);
            html = root.toHtml();

            me.body.innerHTML = (isAppendTo ? me.body.innerHTML : '') + html;


            function isCdataDiv(node){
                return  node.tagName == 'DIV' && node.getAttribute('cdata_tag');
            }
            //给文本或者inline节点套p标签
            if (me.options.enterTag == 'p') {

                var child = this.body.firstChild, tmpNode;
                if (!child || child.nodeType == 1 &&
                    (dtd.$cdata[child.tagName] || isCdataDiv(child) ||
                        domUtils.isCustomeNode(child)
                        )
                    && child === this.body.lastChild) {
                    this.body.innerHTML = '<p>' + (browser.ie ? '&nbsp;' : '<br/>') + '</p>' + this.body.innerHTML;

                } else {
                    var p = me.document.createElement('p');
                    while (child) {
                        while (child && (child.nodeType == 3 || child.nodeType == 1 && dtd.p[child.tagName] && !dtd.$cdata[child.tagName])) {
                            tmpNode = child.nextSibling;
                            p.appendChild(child);
                            child = tmpNode;
                        }
                        if (p.firstChild) {
                            if (!child) {
                                me.body.appendChild(p);
                                break;
                            } else {
                                child.parentNode.insertBefore(p, child);
                                p = me.document.createElement('p');
                            }
                        }
                        child = child.nextSibling;
                    }
                }
            }
            me.fireEvent('aftersetcontent');
            me.fireEvent('contentchange');

            !notFireSelectionchange && me._selectionChange();
            //清除保存的选区
            me._bakRange = me._bakIERange = me._bakNativeRange = null;
            //trace:1742 setContent后gecko能得到焦点问题
            var geckoSel;
            if (browser.gecko && (geckoSel = this.selection.getNative())) {
                geckoSel.removeAllRanges();
            }
            if(me.options.autoSyncData){
                me.form && setValue(me.form,me);
            }
        },

        /**
         * 让编辑器获得焦点，默认focus到编辑器头部
         * @method focus
         * @example
         * ```javascript
         * editor.focus()
         * ```
         */

        /**
         * 让编辑器获得焦点，toEnd确定focus位置
         * @method focus
         * @param { Boolean } toEnd 默认focus到编辑器头部，toEnd为true时focus到内容尾部
         * @example
         * ```javascript
         * editor.focus(true)
         * ```
         */
        focus: function (toEnd) {
            try {
                var me = this,
                    rng = me.selection.getRange();
                if (toEnd) {
                    var node = me.body.lastChild;
                    if(node && node.nodeType == 1 && !dtd.$empty[node.tagName]){
                        if(domUtils.isEmptyBlock(node)){
                            rng.setStartAtFirst(node)
                        }else{
                            rng.setStartAtLast(node)
                        }
                        rng.collapse(true);
                    }
                    rng.setCursor(true);
                } else {
                    if(!rng.collapsed && domUtils.isBody(rng.startContainer) && rng.startOffset == 0){

                        var node = me.body.firstChild;
                        if(node && node.nodeType == 1 && !dtd.$empty[node.tagName]){
                            rng.setStartAtFirst(node).collapse(true);
                        }
                    }

                    rng.select(true);

                }
                this.fireEvent('focus selectionchange');
            } catch (e) {
            }

        },
        isFocus:function(){
            return this.selection.isFocus();
        },
        blur:function(){
            var sel = this.selection.getNative();
            if(sel.empty && browser.ie){
                var nativeRng = document.body.createTextRange();
                nativeRng.moveToElementText(document.body);
                nativeRng.collapse(true);
                nativeRng.select();
                sel.empty()
            }else{
                sel.removeAllRanges()
            }

            //this.fireEvent('blur selectionchange');
        },
        /**
         * 初始化UE事件及部分事件代理
         * @method _initEvents
         * @private
         */
        _initEvents: function () {
            var me = this,
                doc = me.document,
                win = me.window;
            me._proxyDomEvent = utils.bind(me._proxyDomEvent, me);
            domUtils.on(doc, ['click', 'contextmenu', 'mousedown', 'keydown', 'keyup', 'keypress', 'mouseup', 'mouseover', 'mouseout', 'selectstart'], me._proxyDomEvent);
            domUtils.on(win, ['focus', 'blur'], me._proxyDomEvent);
            domUtils.on(me.body,'drop',function(e){
                //阻止ff下默认的弹出新页面打开图片
                if(browser.gecko && e.stopPropagation) { e.stopPropagation(); }
                me.fireEvent('contentchange')
            });
            domUtils.on(doc, ['mouseup', 'keydown'], function (evt) {
                //特殊键不触发selectionchange
                if (evt.type == 'keydown' && (evt.ctrlKey || evt.metaKey || evt.shiftKey || evt.altKey)) {
                    return;
                }
                if (evt.button == 2)return;
                me._selectionChange(250, evt);
            });
        },
        /**
         * 触发事件代理
         * @method _proxyDomEvent
         * @private
         * @return { * } fireEvent的返回值
         * @see UE.EventBase:fireEvent(String)
         */
        _proxyDomEvent: function (evt) {
            if(this.fireEvent('before' + evt.type.replace(/^on/, '').toLowerCase()) === false){
                return false;
            }
            if(this.fireEvent(evt.type.replace(/^on/, ''), evt) === false){
                return false;
            }
            return this.fireEvent('after' + evt.type.replace(/^on/, '').toLowerCase())
        },
        /**
         * 变化选区
         * @method _selectionChange
         * @private
         */
        _selectionChange: function (delay, evt) {
            var me = this;
            //有光标才做selectionchange 为了解决未focus时点击source不能触发更改工具栏状态的问题（source命令notNeedUndo=1）
//            if ( !me.selection.isFocus() ){
//                return;
//            }


            var hackForMouseUp = false;
            var mouseX, mouseY;
            if (browser.ie && browser.version < 9 && evt && evt.type == 'mouseup') {
                var range = this.selection.getRange();
                if (!range.collapsed) {
                    hackForMouseUp = true;
                    mouseX = evt.clientX;
                    mouseY = evt.clientY;
                }
            }
            clearTimeout(_selectionChangeTimer);
            _selectionChangeTimer = setTimeout(function () {
                if (!me.selection || !me.selection.getNative()) {
                    return;
                }
                //修复一个IE下的bug: 鼠标点击一段已选择的文本中间时，可能在mouseup后的一段时间内取到的range是在selection的type为None下的错误值.
                //IE下如果用户是拖拽一段已选择文本，则不会触发mouseup事件，所以这里的特殊处理不会对其有影响
                var ieRange;
                if (hackForMouseUp && me.selection.getNative().type == 'None') {
                    ieRange = me.document.body.createTextRange();
                    try {
                        ieRange.moveToPoint(mouseX, mouseY);
                    } catch (ex) {
                        ieRange = null;
                    }
                }
                var bakGetIERange;
                if (ieRange) {
                    bakGetIERange = me.selection.getIERange;
                    me.selection.getIERange = function () {
                        return ieRange;
                    };
                }
                me.selection.cache();
                if (bakGetIERange) {
                    me.selection.getIERange = bakGetIERange;
                }
                if (me.selection._cachedRange && me.selection._cachedStartElement) {
                    me.fireEvent('beforeselectionchange');
                    // 第二个参数causeByUi为true代表由用户交互造成的selectionchange.
                    me.fireEvent('selectionchange', !!evt);
                    me.fireEvent('afterselectionchange');
                    me.selection.clear();
                }
            }, delay || 50);
        },

        /**
         * 执行编辑命令
         * @method _callCmdFn
         * @private
         * @param { String } fnName 函数名称
         * @param { * } args 传给命令函数的参数
         * @return { * } 返回命令函数运行的返回值
         */
        _callCmdFn: function (fnName, args) {
            var cmdName = args[0].toLowerCase(),
                cmd, cmdFn;
            cmd = this.commands[cmdName] || UE.commands[cmdName];
            cmdFn = cmd && cmd[fnName];
            //没有querycommandstate或者没有command的都默认返回0
            if ((!cmd || !cmdFn) && fnName == 'queryCommandState') {
                return 0;
            } else if (cmdFn) {
                return cmdFn.apply(this, args);
            }
        },

        /**
         * 执行编辑命令cmdName，完成富文本编辑效果
         * @method execCommand
         * @param { String } cmdName 需要执行的命令
         * @remind 具体命令的使用请参考<a href="#COMMAND.LIST">命令列表</a>
         * @return { * } 返回命令函数运行的返回值
         * @example
         * ```javascript
         * editor.execCommand(cmdName);
         * ```
         */
        execCommand: function (cmdName) {
            cmdName = cmdName.toLowerCase();
            var me = this,
                result,
                cmd = me.commands[cmdName] || UE.commands[cmdName];
            if (!cmd || !cmd.execCommand) {
                return null;
            }
            if (!cmd.notNeedUndo && !me.__hasEnterExecCommand) {
                me.__hasEnterExecCommand = true;
                if (me.queryCommandState.apply(me,arguments) != -1) {
                    me.fireEvent('saveScene');
                    me.fireEvent.apply(me, ['beforeexeccommand', cmdName].concat(arguments));
                    result = this._callCmdFn('execCommand', arguments);
                    //保存场景时，做了内容对比，再看是否进行contentchange触发，这里多触发了一次，去掉
//                    (!cmd.ignoreContentChange && !me._ignoreContentChange) && me.fireEvent('contentchange');
                    me.fireEvent.apply(me, ['afterexeccommand', cmdName].concat(arguments));
                    me.fireEvent('saveScene');
                }
                me.__hasEnterExecCommand = false;
            } else {
                result = this._callCmdFn('execCommand', arguments);
                (!me.__hasEnterExecCommand && !cmd.ignoreContentChange && !me._ignoreContentChange) && me.fireEvent('contentchange')
            }
            (!me.__hasEnterExecCommand && !cmd.ignoreContentChange && !me._ignoreContentChange) && me._selectionChange();
            return result;
        },

        /**
         * 根据传入的command命令，查选编辑器当前的选区，返回命令的状态
         * @method  queryCommandState
         * @param { String } cmdName 需要查询的命令名称
         * @remind 具体命令的使用请参考<a href="#COMMAND.LIST">命令列表</a>
         * @return { Number } number 返回放前命令的状态，返回值三种情况：(-1|0|1)
         * @example
         * ```javascript
         * editor.queryCommandState(cmdName)  => (-1|0|1)
         * ```
         * @see COMMAND.LIST
         */
        queryCommandState: function (cmdName) {
            return this._callCmdFn('queryCommandState', arguments);
        },

        /**
         * 根据传入的command命令，查选编辑器当前的选区，根据命令返回相关的值
         * @method queryCommandValue
         * @param { String } cmdName 需要查询的命令名称
         * @remind 具体命令的使用请参考<a href="#COMMAND.LIST">命令列表</a>
         * @remind 只有部分插件有此方法
         * @return { * } 返回每个命令特定的当前状态值
         * @grammar editor.queryCommandValue(cmdName)  =>  {*}
         * @see COMMAND.LIST
         */
        queryCommandValue: function (cmdName) {
            return this._callCmdFn('queryCommandValue', arguments);
        },

        /**
         * 检查编辑区域中是否有内容
         * @method  hasContents
         * @remind 默认有文本内容，或者有以下节点都不认为是空
         * table,ul,ol,dl,iframe,area,base,col,hr,img,embed,input,link,meta,param
         * @return { Boolean } 检查有内容返回true，否则返回false
         * @example
         * ```javascript
         * editor.hasContents()
         * ```
         */

        /**
         * 检查编辑区域中是否有内容，若包含参数tags中的节点类型，直接返回true
         * @method  hasContents
         * @param { Array } tags 传入数组判断时用到的节点类型
         * @return { Boolean } 若文档中包含tags数组里对应的tag，返回true，否则返回false
         * @example
         * ```javascript
         * editor.hasContents(['span']);
         * ```
         */
        hasContents: function (tags) {
            if (tags) {
                for (var i = 0, ci; ci = tags[i++];) {
                    if (this.document.getElementsByTagName(ci).length > 0) {
                        return true;
                    }
                }
            }
            if (!domUtils.isEmptyBlock(this.body)) {
                return true
            }
            //随时添加,定义的特殊标签如果存在，不能认为是空
            tags = ['div'];
            for (i = 0; ci = tags[i++];) {
                var nodes = domUtils.getElementsByTagName(this.document, ci);
                for (var n = 0, cn; cn = nodes[n++];) {
                    if (domUtils.isCustomeNode(cn)) {
                        return true;
                    }
                }
            }
            return false;
        },

        /**
         * 重置编辑器，可用来做多个tab使用同一个编辑器实例
         * @method  reset
         * @remind 此方法会清空编辑器内容，清空回退列表，会触发reset事件
         * @example
         * ```javascript
         * editor.reset()
         * ```
         */
        reset: function () {
            this.fireEvent('reset');
        },

        /**
         * 设置当前编辑区域可以编辑
         * @method setEnabled
         * @example
         * ```javascript
         * editor.setEnabled()
         * ```
         */
        setEnabled: function () {
            var me = this, range;
            if (me.body.contentEditable == 'false') {
                me.body.contentEditable = true;
                range = me.selection.getRange();
                //有可能内容丢失了
                try {
                    range.moveToBookmark(me.lastBk);
                    delete me.lastBk
                } catch (e) {
                    range.setStartAtFirst(me.body).collapse(true)
                }
                range.select(true);
                if (me.bkqueryCommandState) {
                    me.queryCommandState = me.bkqueryCommandState;
                    delete me.bkqueryCommandState;
                }
                if (me.bkqueryCommandValue) {
                    me.queryCommandValue = me.bkqueryCommandValue;
                    delete me.bkqueryCommandValue;
                }
                me.fireEvent('selectionchange');
            }
        },
        enable: function () {
            return this.setEnabled();
        },

        /** 设置当前编辑区域不可编辑
         * @method setDisabled
         */

        /** 设置当前编辑区域不可编辑,except中的命令除外
         * @method setDisabled
         * @param { String } except 例外命令的字符串
         * @remind 即使设置了disable，此处配置的例外命令仍然可以执行
         * @example
         * ```javascript
         * editor.setDisabled('bold'); //禁用工具栏中除加粗之外的所有功能
         * ```
         */

        /** 设置当前编辑区域不可编辑,except中的命令除外
         * @method setDisabled
         * @param { Array } except 例外命令的字符串数组，数组中的命令仍然可以执行
         * @remind 即使设置了disable，此处配置的例外命令仍然可以执行
         * @example
         * ```javascript
         * editor.setDisabled(['bold','insertimage']); //禁用工具栏中除加粗和插入图片之外的所有功能
         * ```
         */
        setDisabled: function (except) {
            var me = this;
            except = except ? utils.isArray(except) ? except : [except] : [];
            if (me.body.contentEditable == 'true') {
                if (!me.lastBk) {
                    me.lastBk = me.selection.getRange().createBookmark(true);
                }
                me.body.contentEditable = false;
                me.bkqueryCommandState = me.queryCommandState;
                me.bkqueryCommandValue = me.queryCommandValue;
                me.queryCommandState = function (type) {
                    if (utils.indexOf(except, type) != -1) {
                        return me.bkqueryCommandState.apply(me, arguments);
                    }
                    return -1;
                };
                me.queryCommandValue = function (type) {
                    if (utils.indexOf(except, type) != -1) {
                        return me.bkqueryCommandValue.apply(me, arguments);
                    }
                    return null;
                };
                me.fireEvent('selectionchange');
            }
        },
        disable: function (except) {
            return this.setDisabled(except);
        },

        /**
         * 设置默认内容
         * @method _setDefaultContent
         * @private
         * @param  { String } cont 要存入的内容
         */
        _setDefaultContent: function () {
            function clear() {
                var me = this;
                if (me.document.getElementById('initContent')) {
                    me.body.innerHTML = '<p>' + (ie ? '' : '<br/>') + '</p>';
                    me.removeListener('firstBeforeExecCommand focus', clear);
                    setTimeout(function () {
                        me.focus();
                        me._selectionChange();
                    }, 0)
                }
            }

            return function (cont) {
                var me = this;
                me.body.innerHTML = '<p id="initContent">' + cont + '</p>';

                me.addListener('firstBeforeExecCommand focus', clear);
            }
        }(),

        /**
         * 显示编辑器
         * @method setShow
         * @example
         * ```javascript
         * editor.setShow()
         * ```
         */
        setShow: function () {
            var me = this, range = me.selection.getRange();
            if (me.container.style.display == 'none') {
                //有可能内容丢失了
                try {
                    range.moveToBookmark(me.lastBk);
                    delete me.lastBk
                } catch (e) {
                    range.setStartAtFirst(me.body).collapse(true)
                }
                //ie下focus实效，所以做了个延迟
                setTimeout(function () {
                    range.select(true);
                }, 100);
                me.container.style.display = '';
            }

        },
        show: function () {
            return this.setShow();
        },
        /**
         * 隐藏编辑器
         * @method setHide
         * @example
         * ```javascript
         * editor.setHide()
         * ```
         */
        setHide: function () {
            var me = this;
            if (!me.lastBk) {
                me.lastBk = me.selection.getRange().createBookmark(true);
            }
            me.container.style.display = 'none'
        },
        hide: function () {
            return this.setHide();
        },

        /**
         * 根据指定的路径，获取对应的语言资源
         * @method getLang
         * @param { String } path 路径根据的是lang目录下的语言文件的路径结构
         * @return { Object | String } 根据路径返回语言资源的Json格式对象或者语言字符串
         * @example
         * ```javascript
         * editor.getLang('contextMenu.delete'); //如果当前是中文，那返回是的是'删除'
         * ```
         */
        getLang: function (path) {
            var lang = UE.I18N[this.options.lang];
            if (!lang) {
                throw Error("not import language file");
            }
            path = (path || "").split(".");
            for (var i = 0, ci; ci = path[i++];) {
                lang = lang[ci];
                if (!lang)break;
            }
            return lang;
        },

        /**
         * 计算编辑器html内容字符串的长度
         * @method  getContentLength
         * @return { Number } 返回计算的长度
         * @example
         * ```javascript
         * //编辑器html内容<p><strong>132</strong></p>
         * editor.getContentLength() //返回27
         * ```
         */
        /**
         * 计算编辑器当前纯文本内容的长度
         * @method  getContentLength
         * @param { Boolean } ingoneHtml 传入true时，只按照纯文本来计算
         * @return { Number } 返回计算的长度，内容中有hr/img/iframe标签，长度加1
         * @example
         * ```javascript
         * //编辑器html内容<p><strong>132</strong></p>
         * editor.getContentLength() //返回3
         * ```
         */
        getContentLength: function (ingoneHtml, tagNames) {
            var count = this.getContent(false,false,true).length;
            if (ingoneHtml) {
                tagNames = (tagNames || []).concat([ 'hr', 'img', 'iframe']);
                count = this.getContentTxt().replace(/[\t\r\n]+/g, '').length;
                for (var i = 0, ci; ci = tagNames[i++];) {
                    count += this.document.getElementsByTagName(ci).length;
                }
            }
            return count;
        },

        /**
         * 注册输入过滤规则
         * @method  addInputRule
         * @param { Function } rule 要添加的过滤规则
         * @example
         * ```javascript
         * editor.addInputRule(function(root){
         *   $.each(root.getNodesByTagName('div'),function(i,node){
         *       node.tagName="p";
         *   });
         * });
         * ```
         */
        addInputRule: function (rule) {
            this.inputRules.push(rule);
        },

        /**
         * 执行注册的过滤规则
         * @method  filterInputRule
         * @param { UE.uNode } root 要过滤的uNode节点
         * @remind 执行editor.setContent方法和执行'inserthtml'命令后，会运行该过滤函数
         * @example
         * ```javascript
         * editor.filterInputRule(editor.body);
         * ```
         * @see UE.Editor:addInputRule
         */
        filterInputRule: function (root) {
            for (var i = 0, ci; ci = this.inputRules[i++];) {
                ci.call(this, root)
            }
        },

        /**
         * 注册输出过滤规则
         * @method  addOutputRule
         * @param { Function } rule 要添加的过滤规则
         * @example
         * ```javascript
         * editor.addOutputRule(function(root){
         *   $.each(root.getNodesByTagName('p'),function(i,node){
         *       node.tagName="div";
         *   });
         * });
         * ```
         */
        addOutputRule: function (rule) {
            this.outputRules.push(rule)
        },

        /**
         * 根据输出过滤规则，过滤编辑器内容
         * @method  filterOutputRule
         * @remind 执行editor.getContent方法的时候，会先运行该过滤函数
         * @param { UE.uNode } root 要过滤的uNode节点
         * @example
         * ```javascript
         * editor.filterOutputRule(editor.body);
         * ```
         * @see UE.Editor:addOutputRule
         */
        filterOutputRule: function (root) {
            for (var i = 0, ci; ci = this.outputRules[i++];) {
                ci.call(this, root)
            }
        },

        /**
         * 根据action名称获取请求的路径
         * @method  getActionUrl
         * @remind 假如没有设置serverUrl,会根据imageUrl设置默认的controller路径
         * @param { String } action action名称
         * @example
         * ```javascript
         * editor.getActionUrl('config'); //返回 "/ueditor/php/controller.php?action=config"
         * editor.getActionUrl('image'); //返回 "/ueditor/php/controller.php?action=uplaodimage"
         * editor.getActionUrl('scrawl'); //返回 "/ueditor/php/controller.php?action=uplaodscrawl"
         * editor.getActionUrl('imageManager'); //返回 "/ueditor/php/controller.php?action=listimage"
         * ```
         */
        getActionUrl: function(action){
            var actionName = this.getOpt(action) || action,
                imageUrl = this.getOpt('imageUrl'),
                serverUrl = this.getOpt('serverUrl');

            if(!serverUrl && imageUrl) {
                serverUrl = imageUrl.replace(/^(.*[\/]).+([\.].+)$/, '$1controller$2');
            }

            if(serverUrl) {
                serverUrl = serverUrl + (serverUrl.indexOf('?') == -1 ? '?':'&') + 'action=' + (actionName || '');
                return utils.formatUrl(serverUrl);
            } else {
                return '';
            }
        }
    };
    utils.inherits(Editor, EventBase);
})();


// core/Editor.defaultoptions.js
//维护编辑器一下默认的不在插件中的配置项
UE.Editor.defaultOptions = function(editor){

    var _url = editor.options.UEDITOR_HOME_URL;
    return {
        isShow: true,
        initialContent: '',
        initialStyle:'',
        autoClearinitialContent: false,
        iframeCssUrl: _url + 'themes/iframe.css',
        textarea: 'editorValue',
        focus: false,
        focusInEnd: true,
        autoClearEmptyNode: true,
        fullscreen: false,
        readonly: false,
        zIndex: 999,
        imagePopup: true,
        enterTag: 'p',
        customDomain: false,
        lang: 'zh-cn',
        langPath: _url + 'lang/',
        theme: 'default',
        themePath: _url + 'themes/',
        allHtmlEnabled: false,
        scaleEnabled: false,
        tableNativeEditInFF: false,
        autoSyncData : true,
        fileNameFormat: '{time}{rand:6}'
    }
};

// core/loadconfig.js
(function(){

    UE.Editor.prototype.loadServerConfig = function(){
        var me = this;
        setTimeout(function(){
            try{
                me.options.imageUrl && me.setOpt('serverUrl', me.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, '$1controller$2'));

                var configUrl = me.getActionUrl('config'),
                    isJsonp =false;

                /* 发出ajax请求 */
                me._serverConfigLoaded = false;

                configUrl && UE.ajax.request(configUrl,{
                    'method': 'GET',
                    'dataType': '',
                    'onsuccess':function(r){
                        try {
                            var config = isJsonp ? r:eval("("+r.responseText+")");
                            utils.extend(me.options, config);
                            me.fireEvent('serverConfigLoaded');
                            me._serverConfigLoaded = true;
                        } catch (e) {
                            showErrorMsg(me.getLang('loadconfigFormatError'));
                        }
                    },
                    'onerror':function(){
                        showErrorMsg(me.getLang('loadconfigHttpError'));
                    }
                });
            } catch(e){
                showErrorMsg(me.getLang('loadconfigError'));
            }
        });

        function showErrorMsg(msg) {
            console && console.error(msg);
            //me.fireEvent('showMessage', {
            //    'title': msg,
            //    'type': 'error'
            //});
        }
    };

    UE.Editor.prototype.isServerConfigLoaded = function(){
        var me = this;
        return me._serverConfigLoaded || false;
    };

    UE.Editor.prototype.afterConfigReady = function(handler){
        if (!handler || !utils.isFunction(handler)) return;
        var me = this;
        var readyHandler = function(){
            handler.apply(me, arguments);
            me.removeListener('serverConfigLoaded', readyHandler);
        };

        if (me.isServerConfigLoaded()) {
            handler.call(me, 'serverConfigLoaded');
        } else {
            me.addListener('serverConfigLoaded', readyHandler);
        }
    };

})();


// core/ajax.js
/**
 * @file
 * @module UE.ajax
 * @since 1.2.6.1
 */

/**
 * 提供对ajax请求的支持
 * @module UE.ajax
 */
UE.ajax = function() {

    //创建一个ajaxRequest对象
    var fnStr = 'XMLHttpRequest()';
    try {
        new ActiveXObject("Msxml2.XMLHTTP");
        fnStr = 'ActiveXObject(\'Msxml2.XMLHTTP\')';
    } catch (e) {
        try {
            new ActiveXObject("Microsoft.XMLHTTP");
            fnStr = 'ActiveXObject(\'Microsoft.XMLHTTP\')'
        } catch (e) {
        }
    }
    var creatAjaxRequest = new Function('return new ' + fnStr);


    /**
     * 将json参数转化成适合ajax提交的参数列表
     * @param json
     */
    function json2str(json) {
        var strArr = [];
        for (var i in json) {
            //忽略默认的几个参数
            if(i=="method" || i=="timeout" || i=="async" || i=="dataType" || i=="callback") continue;
            //忽略控制
            if(json[i] == undefined || json[i] == null) continue;
            //传递过来的对象和函数不在提交之列
            if (!((typeof json[i]).toLowerCase() == "function" || (typeof json[i]).toLowerCase() == "object")) {
                strArr.push( encodeURIComponent(i) + "="+encodeURIComponent(json[i]) );
            } else if (utils.isArray(json[i])) {
            //支持传数组内容
                for(var j = 0; j < json[i].length; j++) {
                    strArr.push( encodeURIComponent(i) + "[]="+encodeURIComponent(json[i][j]) );
                }
            }
        }
        return strArr.join("&");
    }

    function doAjax(url, ajaxOptions) {
        var xhr = creatAjaxRequest(),
        //是否超时
            timeIsOut = false,
        //默认参数
            defaultAjaxOptions = {
                method:"POST",
                timeout:5000,
                async:true,
                data:{},//需要传递对象的话只能覆盖
                onsuccess:function() {
                },
                onerror:function() {
                }
            };

        if (typeof url === "object") {
            ajaxOptions = url;
            url = ajaxOptions.url;
        }
        if (!xhr || !url) return;
        var ajaxOpts = ajaxOptions ? utils.extend(defaultAjaxOptions,ajaxOptions) : defaultAjaxOptions;

        var submitStr = json2str(ajaxOpts);  // { name:"Jim",city:"Beijing" } --> "name=Jim&city=Beijing"
        //如果用户直接通过data参数传递json对象过来，则也要将此json对象转化为字符串
        if (!utils.isEmptyObject(ajaxOpts.data)){
            submitStr += (submitStr? "&":"") + json2str(ajaxOpts.data);
        }
        //超时检测
        var timerID = setTimeout(function() {
            if (xhr.readyState != 4) {
                timeIsOut = true;
                xhr.abort();
                clearTimeout(timerID);
            }
        }, ajaxOpts.timeout);

        var method = ajaxOpts.method.toUpperCase();
        var str = url + (url.indexOf("?")==-1?"?":"&") + (method=="POST"?"":submitStr+ "&noCache=" + +new Date);
        xhr.open(method, str, ajaxOpts.async);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (!timeIsOut && xhr.status == 200) {
                    ajaxOpts.onsuccess(xhr);
                } else {
                    ajaxOpts.onerror(xhr);
                }
            }
        };
        if (method == "POST") {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(submitStr);
        } else {
            xhr.send(null);
        }
    }

    function doJsonp(url, opts) {

        var successhandler = opts.onsuccess || function(){},
            scr = document.createElement('SCRIPT'),
            options = opts || {},
            charset = options['charset'],
            callbackField = options['jsonp'] || 'callback',
            callbackFnName,
            timeOut = options['timeOut'] || 0,
            timer,
            reg = new RegExp('(\\?|&)' + callbackField + '=([^&]*)'),
            matches;

        if (utils.isFunction(successhandler)) {
            callbackFnName = 'bd__editor__' + Math.floor(Math.random() * 2147483648).toString(36);
            window[callbackFnName] = getCallBack(0);
        } else if(utils.isString(successhandler)){
            callbackFnName = successhandler;
        } else {
            if (matches = reg.exec(url)) {
                callbackFnName = matches[2];
            }
        }

        url = url.replace(reg, '\x241' + callbackField + '=' + callbackFnName);

        if (url.search(reg) < 0) {
            url += (url.indexOf('?') < 0 ? '?' : '&') + callbackField + '=' + callbackFnName;
        }

        var queryStr = json2str(opts);  // { name:"Jim",city:"Beijing" } --> "name=Jim&city=Beijing"
        //如果用户直接通过data参数传递json对象过来，则也要将此json对象转化为字符串
        if (!utils.isEmptyObject(opts.data)){
            queryStr += (queryStr? "&":"") + json2str(opts.data);
        }
        if (queryStr) {
            url = url.replace(/\?/, '?' + queryStr + '&');
        }

        scr.onerror = getCallBack(1);
        if( timeOut ){
            timer = setTimeout(getCallBack(1), timeOut);
        }
        createScriptTag(scr, url, charset);

        function createScriptTag(scr, url, charset) {
            scr.setAttribute('type', 'text/javascript');
            scr.setAttribute('defer', 'defer');
            charset && scr.setAttribute('charset', charset);
            scr.setAttribute('src', url);
            document.getElementsByTagName('head')[0].appendChild(scr);
        }

        function getCallBack(onTimeOut){
            return function(){
                try {
                    if(onTimeOut){
                        options.onerror && options.onerror();
                    }else{
                        try{
                            clearTimeout(timer);
                            successhandler.apply(window, arguments);
                        } catch (e){}
                    }
                } catch (exception) {
                    options.onerror && options.onerror.call(window, exception);
                } finally {
                    options.oncomplete && options.oncomplete.apply(window, arguments);
                    scr.parentNode && scr.parentNode.removeChild(scr);
                    window[callbackFnName] = null;
                    try {
                        delete window[callbackFnName];
                    }catch(e){}
                }
            }
        }
    }

    return {
        /**
         * 根据给定的参数项，向指定的url发起一个ajax请求。 ajax请求完成后，会根据请求结果调用相应回调： 如果请求
         * 成功， 则调用onsuccess回调， 失败则调用 onerror 回调
         * @method request
         * @param { URLString } url ajax请求的url地址
         * @param { Object } ajaxOptions ajax请求选项的键值对，支持的选项如下：
         * @example
         * ```javascript
         * //向sayhello.php发起一个异步的Ajax GET请求, 请求超时时间为10s， 请求完成后执行相应的回调。
         * UE.ajax.requeset( 'sayhello.php', {
         *
         *     //请求方法。可选值： 'GET', 'POST'，默认值是'POST'
         *     method: 'GET',
         *
         *     //超时时间。 默认为5000， 单位是ms
         *     timeout: 10000,
         *
         *     //是否是异步请求。 true为异步请求， false为同步请求
         *     async: true,
         *
         *     //请求携带的数据。如果请求为GET请求， data会经过stringify后附加到请求url之后。
         *     data: {
         *         name: 'ueditor'
         *     },
         *
         *     //请求成功后的回调， 该回调接受当前的XMLHttpRequest对象作为参数。
         *     onsuccess: function ( xhr ) {
         *         console.log( xhr.responseText );
         *     },
         *
         *     //请求失败或者超时后的回调。
         *     onerror: function ( xhr ) {
         *          alert( 'Ajax请求失败' );
         *     }
         *
         * } );
         * ```
         */

        /**
         * 根据给定的参数项发起一个ajax请求， 参数项里必须包含一个url地址。 ajax请求完成后，会根据请求结果调用相应回调： 如果请求
         * 成功， 则调用onsuccess回调， 失败则调用 onerror 回调。
         * @method request
         * @warning 如果在参数项里未提供一个key为“url”的地址值，则该请求将直接退出。
         * @param { Object } ajaxOptions ajax请求选项的键值对，支持的选项如下：
         * @example
         * ```javascript
         *
         * //向sayhello.php发起一个异步的Ajax POST请求, 请求超时时间为5s， 请求完成后不执行任何回调。
         * UE.ajax.requeset( 'sayhello.php', {
         *
         *     //请求的地址， 该项是必须的。
         *     url: 'sayhello.php'
         *
         * } );
         * ```
         */
		request:function(url, opts) {
            if (opts && opts.dataType == 'jsonp') {
                doJsonp(url, opts);
            } else {
                doAjax(url, opts);
            }
		},
        getJSONP:function(url, data, fn) {
            var opts = {
                'data': data,
                'oncomplete': fn
            };
            doJsonp(url, opts);
		}
	};


}();


// core/filterword.js
/**
 * UE过滤word的静态方法
 * @file
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @module UE
 */


/**
 * 根据传入html字符串过滤word
 * @module UE
 * @since 1.2.6.1
 * @method filterWord
 * @param { String } html html字符串
 * @return { String } 已过滤后的结果字符串
 * @example
 * ```javascript
 * UE.filterWord(html);
 * ```
 */
var filterWord = UE.filterWord = function () {

    //是否是word过来的内容
    function isWordDocument( str ) {
        return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test( str );
    }
    //去掉小数
    function transUnit( v ) {
        v = v.replace( /[\d.]+\w+/g, function ( m ) {
            return utils.transUnitToPx(m);
        } );
        return v;
    }

    function filterPasteWord( str ) {
        return str.replace(/[\t\r\n]+/g,' ')
                .replace( /<!--[\s\S]*?-->/ig, "" )
                //转换图片
                .replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi,function(str){
                    //opera能自己解析出image所这里直接返回空
                    if(browser.opera){
                        return '';
                    }
                    try{
                        //有可能是bitmap占为图，无用，直接过滤掉，主要体现在粘贴excel表格中
                        if(/Bitmap/i.test(str)){
                            return '';
                        }
                        var width = str.match(/width:([ \d.]*p[tx])/i)[1],
                            height = str.match(/height:([ \d.]*p[tx])/i)[1],
                            src =  str.match(/src=\s*"([^"]*)"/i)[1];
                        return '<img width="'+ transUnit(width) +'" height="'+transUnit(height) +'" src="' + src + '" />';
                    } catch(e){
                        return '';
                    }
                })
                //针对wps添加的多余标签处理
                .replace(/<\/?div[^>]*>/g,'')
                //去掉多余的属性
                .replace( /v:\w+=(["']?)[^'"]+\1/g, '' )
                .replace( /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "" )
                .replace( /<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>" )
                //去掉多余的属性
                .replace( /\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig, function(str,name,marks,val){
                    //保留list的标示
                    return name == 'class' && val == 'MsoListParagraph' ? str : ''
                })
                //清除多余的font/span不能匹配&nbsp;有可能是空格
                .replace( /<(font|span)[^>]*>(\s*)<\/\1>/gi, function(a,b,c){
                    return c.replace(/[\t\r\n ]+/g,' ')
                })
                //处理style的问题
                .replace( /(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function( str, tag, tmp, style ) {
                    var n = [],
                        s = style.replace( /^\s+|\s+$/, '' )
                            .replace(/&#39;/g,'\'')
                            .replace( /&quot;/gi, "'" )
                            .replace(/[\d.]+(cm|pt)/g,function(str){
                                return utils.transUnitToPx(str)
                            })
                            .split( /;\s*/g );

                    for ( var i = 0,v; v = s[i];i++ ) {

                        var name, value,
                            parts = v.split( ":" );

                        if ( parts.length == 2 ) {
                            name = parts[0].toLowerCase();
                            value = parts[1].toLowerCase();
                            if(/^(background)\w*/.test(name) && value.replace(/(initial|\s)/g,'').length == 0
                                ||
                                /^(margin)\w*/.test(name) && /^0\w+$/.test(value)
                            ){
                                continue;
                            }

                            switch ( name ) {
                                case "mso-padding-alt":
                                case "mso-padding-top-alt":
                                case "mso-padding-right-alt":
                                case "mso-padding-bottom-alt":
                                case "mso-padding-left-alt":
                                case "mso-margin-alt":
                                case "mso-margin-top-alt":
                                case "mso-margin-right-alt":
                                case "mso-margin-bottom-alt":
                                case "mso-margin-left-alt":
                                //ie下会出现挤到一起的情况
                               //case "mso-table-layout-alt":
                                case "mso-height":
                                case "mso-width":
                                case "mso-vertical-align-alt":
                                    //trace:1819 ff下会解析出padding在table上
                                    if(!/<table/.test(tag))
                                        n[i] = name.replace( /^mso-|-alt$/g, "" ) + ":" + transUnit( value );
                                    continue;
                                case "horiz-align":
                                    n[i] = "text-align:" + value;
                                    continue;

                                case "vert-align":
                                    n[i] = "vertical-align:" + value;
                                    continue;

                                case "font-color":
                                case "mso-foreground":
                                    n[i] = "color:" + value;
                                    continue;

                                case "mso-background":
                                case "mso-highlight":
                                    n[i] = "background:" + value;
                                    continue;

                                case "mso-default-height":
                                    n[i] = "min-height:" + transUnit( value );
                                    continue;

                                case "mso-default-width":
                                    n[i] = "min-width:" + transUnit( value );
                                    continue;

                                case "mso-padding-between-alt":
                                    n[i] = "border-collapse:separate;border-spacing:" + transUnit( value );
                                    continue;

                                case "text-line-through":
                                    if ( (value == "single") || (value == "double") ) {
                                        n[i] = "text-decoration:line-through";
                                    }
                                    continue;
                                case "mso-zero-height":
                                    if ( value == "yes" ) {
                                        n[i] = "display:none";
                                    }
                                    continue;
//                                case 'background':
//                                    break;
                                case 'margin':
                                    if ( !/[1-9]/.test( value ) ) {
                                        continue;
                                    }

                            }

                            if ( /^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test( name )
                                ||
                                /text\-indent|padding|margin/.test(name) && /\-[\d.]+/.test(value)
                            ) {
                                continue;
                            }

                            n[i] = name + ":" + parts[1];
                        }
                    }
                    return tag + (n.length ? ' style="' + n.join( ';').replace(/;{2,}/g,';') + '"' : '');
                })


    }

    return function ( html ) {
        return (isWordDocument( html ) ? filterPasteWord( html ) : html);
    };
}();

// core/node.js
/**
 * 编辑器模拟的节点类
 * @file
 * @module UE
 * @class uNode
 * @since 1.2.6.1
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @unfile
 * @module UE
 */

(function () {

    /**
     * 编辑器模拟的节点类
     * @unfile
     * @module UE
     * @class uNode
     */

    /**
     * 通过一个键值对，创建一个uNode对象
     * @constructor
     * @param { Object } attr 传入要创建的uNode的初始属性
     * @example
     * ```javascript
     * var node = new uNode({
     *     type:'element',
     *     tagName:'span',
     *     attrs:{style:'font-size:14px;'}
     * }
     * ```
     */
    var uNode = UE.uNode = function (obj) {
        this.type = obj.type;
        this.data = obj.data;
        this.tagName = obj.tagName;
        this.parentNode = obj.parentNode;
        this.attrs = obj.attrs || {};
        this.children = obj.children;
    };

    var notTransAttrs = {
        'href':1,
        'src':1,
        '_src':1,
        '_href':1,
        'cdata_data':1
    };

    var notTransTagName = {
        style:1,
        script:1
    };

    var indentChar = '    ',
        breakChar = '\n';

    function insertLine(arr, current, begin) {
        arr.push(breakChar);
        return current + (begin ? 1 : -1);
    }

    function insertIndent(arr, current) {
        //插入缩进
        for (var i = 0; i < current; i++) {
            arr.push(indentChar);
        }
    }

    //创建uNode的静态方法
    //支持标签和html
    uNode.createElement = function (html) {
        if (/[<>]/.test(html)) {
            return UE.htmlparser(html).children[0]
        } else {
            return new uNode({
                type:'element',
                children:[],
                tagName:html
            })
        }
    };
    uNode.createText = function (data,noTrans) {
        return new UE.uNode({
            type:'text',
            'data':noTrans ? data : utils.unhtml(data || '')
        })
    };
    function nodeToHtml(node, arr, formatter, current) {
        switch (node.type) {
            case 'root':
                for (var i = 0, ci; ci = node.children[i++];) {
                    //插入新行
                    if (formatter && ci.type == 'element' && !dtd.$inlineWithA[ci.tagName] && i > 1) {
                        insertLine(arr, current, true);
                        insertIndent(arr, current)
                    }
                    nodeToHtml(ci, arr, formatter, current)
                }
                break;
            case 'text':
                isText(node, arr);
                break;
            case 'element':
                isElement(node, arr, formatter, current);
                break;
            case 'comment':
                isComment(node, arr, formatter);
        }
        return arr;
    }

    function isText(node, arr) {
        if(node.parentNode.tagName == 'pre'){
            //源码模式下输入html标签，不能做转换处理，直接输出
            arr.push(node.data)
        }else{
            arr.push(notTransTagName[node.parentNode.tagName] ? utils.html(node.data) : node.data.replace(/[ ]{2}/g,' &nbsp;'))
        }

    }

    function isElement(node, arr, formatter, current) {
        var attrhtml = '';
        if (node.attrs) {
            attrhtml = [];
            var attrs = node.attrs;
            for (var a in attrs) {
                //这里就针对
                //<p>'<img src='http://nsclick.baidu.com/u.gif?&asdf=\"sdf&asdfasdfs;asdf'></p>
                //这里边的\"做转换，要不用innerHTML直接被截断了，属性src
                //有可能做的不够
                attrhtml.push(a + (attrs[a] !== undefined ? '="' + (notTransAttrs[a] ? utils.html(attrs[a]).replace(/["]/g, function (a) {
                   return '&quot;'
                }) : utils.unhtml(attrs[a])) + '"' : ''))
            }
            attrhtml = attrhtml.join(' ');
        }
        arr.push('<' + node.tagName +
            (attrhtml ? ' ' + attrhtml  : '') +
            (dtd.$empty[node.tagName] ? '\/' : '' ) + '>'
        );
        //插入新行
        if (formatter  &&  !dtd.$inlineWithA[node.tagName] && node.tagName != 'pre') {
            if(node.children && node.children.length){
                current = insertLine(arr, current, true);
                insertIndent(arr, current)
            }

        }
        if (node.children && node.children.length) {
            for (var i = 0, ci; ci = node.children[i++];) {
                if (formatter && ci.type == 'element' &&  !dtd.$inlineWithA[ci.tagName] && i > 1) {
                    insertLine(arr, current);
                    insertIndent(arr, current)
                }
                nodeToHtml(ci, arr, formatter, current)
            }
        }
        if (!dtd.$empty[node.tagName]) {
            if (formatter && !dtd.$inlineWithA[node.tagName]  && node.tagName != 'pre') {

                if(node.children && node.children.length){
                    current = insertLine(arr, current);
                    insertIndent(arr, current)
                }
            }
            arr.push('<\/' + node.tagName + '>');
        }

    }

    function isComment(node, arr) {
        arr.push('<!--' + node.data + '-->');
    }

    function getNodeById(root, id) {
        var node;
        if (root.type == 'element' && root.getAttr('id') == id) {
            return root;
        }
        if (root.children && root.children.length) {
            for (var i = 0, ci; ci = root.children[i++];) {
                if (node = getNodeById(ci, id)) {
                    return node;
                }
            }
        }
    }

    function getNodesByTagName(node, tagName, arr) {
        if (node.type == 'element' && node.tagName == tagName) {
            arr.push(node);
        }
        if (node.children && node.children.length) {
            for (var i = 0, ci; ci = node.children[i++];) {
                getNodesByTagName(ci, tagName, arr)
            }
        }
    }
    function nodeTraversal(root,fn){
        if(root.children && root.children.length){
            for(var i= 0,ci;ci=root.children[i];){
                nodeTraversal(ci,fn);
                //ci被替换的情况，这里就不再走 fn了
                if(ci.parentNode ){
                    if(ci.children && ci.children.length){
                        fn(ci)
                    }
                    if(ci.parentNode) i++
                }
            }
        }else{
            fn(root)
        }

    }
    uNode.prototype = {

        /**
         * 当前节点对象，转换成html文本
         * @method toHtml
         * @return { String } 返回转换后的html字符串
         * @example
         * ```javascript
         * node.toHtml();
         * ```
         */

        /**
         * 当前节点对象，转换成html文本
         * @method toHtml
         * @param { Boolean } formatter 是否格式化返回值
         * @return { String } 返回转换后的html字符串
         * @example
         * ```javascript
         * node.toHtml( true );
         * ```
         */
        toHtml:function (formatter) {
            var arr = [];
            nodeToHtml(this, arr, formatter, 0);
            return arr.join('')
        },

        /**
         * 获取节点的html内容
         * @method innerHTML
         * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
         * @return { String } 返回节点的html内容
         * @example
         * ```javascript
         * var htmlstr = node.innerHTML();
         * ```
         */

        /**
         * 设置节点的html内容
         * @method innerHTML
         * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
         * @param { String } htmlstr 传入要设置的html内容
         * @return { UE.uNode } 返回节点本身
         * @example
         * ```javascript
         * node.innerHTML('<span>text</span>');
         * ```
         */
        innerHTML:function (htmlstr) {
            if (this.type != 'element' || dtd.$empty[this.tagName]) {
                return this;
            }
            if (utils.isString(htmlstr)) {
                if(this.children){
                    for (var i = 0, ci; ci = this.children[i++];) {
                        ci.parentNode = null;
                    }
                }
                this.children = [];
                var tmpRoot = UE.htmlparser(htmlstr);
                for (var i = 0, ci; ci = tmpRoot.children[i++];) {
                    this.children.push(ci);
                    ci.parentNode = this;
                }
                return this;
            } else {
                var tmpRoot = new UE.uNode({
                    type:'root',
                    children:this.children
                });
                return tmpRoot.toHtml();
            }
        },

        /**
         * 获取节点的纯文本内容
         * @method innerText
         * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
         * @return { String } 返回节点的存文本内容
         * @example
         * ```javascript
         * var textStr = node.innerText();
         * ```
         */

        /**
         * 设置节点的纯文本内容
         * @method innerText
         * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
         * @param { String } textStr 传入要设置的文本内容
         * @return { UE.uNode } 返回节点本身
         * @example
         * ```javascript
         * node.innerText('<span>text</span>');
         * ```
         */
        innerText:function (textStr,noTrans) {
            if (this.type != 'element' || dtd.$empty[this.tagName]) {
                return this;
            }
            if (textStr) {
                if(this.children){
                    for (var i = 0, ci; ci = this.children[i++];) {
                        ci.parentNode = null;
                    }
                }
                this.children = [];
                this.appendChild(uNode.createText(textStr,noTrans));
                return this;
            } else {
                return this.toHtml().replace(/<[^>]+>/g, '');
            }
        },

        /**
         * 获取当前对象的data属性
         * @method getData
         * @return { Object } 若节点的type值是elemenet，返回空字符串，否则返回节点的data属性
         * @example
         * ```javascript
         * node.getData();
         * ```
         */
        getData:function () {
            if (this.type == 'element')
                return '';
            return this.data
        },

        /**
         * 获取当前节点下的第一个子节点
         * @method firstChild
         * @return { UE.uNode } 返回第一个子节点
         * @example
         * ```javascript
         * node.firstChild(); //返回第一个子节点
         * ```
         */
        firstChild:function () {
//            if (this.type != 'element' || dtd.$empty[this.tagName]) {
//                return this;
//            }
            return this.children ? this.children[0] : null;
        },

        /**
         * 获取当前节点下的最后一个子节点
         * @method lastChild
         * @return { UE.uNode } 返回最后一个子节点
         * @example
         * ```javascript
         * node.lastChild(); //返回最后一个子节点
         * ```
         */
        lastChild:function () {
//            if (this.type != 'element' || dtd.$empty[this.tagName] ) {
//                return this;
//            }
            return this.children ? this.children[this.children.length - 1] : null;
        },

        /**
         * 获取和当前节点有相同父亲节点的前一个节点
         * @method previousSibling
         * @return { UE.uNode } 返回前一个节点
         * @example
         * ```javascript
         * node.children[2].previousSibling(); //返回子节点node.children[1]
         * ```
         */
        previousSibling : function(){
            var parent = this.parentNode;
            for (var i = 0, ci; ci = parent.children[i]; i++) {
                if (ci === this) {
                   return i == 0 ? null : parent.children[i-1];
                }
            }

        },

        /**
         * 获取和当前节点有相同父亲节点的后一个节点
         * @method nextSibling
         * @return { UE.uNode } 返回后一个节点,找不到返回null
         * @example
         * ```javascript
         * node.children[2].nextSibling(); //如果有，返回子节点node.children[3]
         * ```
         */
        nextSibling : function(){
            var parent = this.parentNode;
            for (var i = 0, ci; ci = parent.children[i++];) {
                if (ci === this) {
                    return parent.children[i];
                }
            }
        },

        /**
         * 用新的节点替换当前节点
         * @method replaceChild
         * @param { UE.uNode } target 要替换成该节点参数
         * @param { UE.uNode } source 要被替换掉的节点
         * @return { UE.uNode } 返回替换之后的节点对象
         * @example
         * ```javascript
         * node.replaceChild(newNode, childNode); //用newNode替换childNode,childNode是node的子节点
         * ```
         */
        replaceChild:function (target, source) {
            if (this.children) {
                if(target.parentNode){
                    target.parentNode.removeChild(target);
                }
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === source) {
                        this.children.splice(i, 1, target);
                        source.parentNode = null;
                        target.parentNode = this;
                        return target;
                    }
                }
            }
        },

        /**
         * 在节点的子节点列表最后位置插入一个节点
         * @method appendChild
         * @param { UE.uNode } node 要插入的节点
         * @return { UE.uNode } 返回刚插入的子节点
         * @example
         * ```javascript
         * node.appendChild( newNode ); //在node内插入子节点newNode
         * ```
         */
        appendChild:function (node) {
            if (this.type == 'root' || (this.type == 'element' && !dtd.$empty[this.tagName])) {
                if (!this.children) {
                    this.children = []
                }
                if(node.parentNode){
                    node.parentNode.removeChild(node);
                }
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === node) {
                        this.children.splice(i, 1);
                        break;
                    }
                }
                this.children.push(node);
                node.parentNode = this;
                return node;
            }


        },

        /**
         * 在传入节点的前面插入一个节点
         * @method insertBefore
         * @param { UE.uNode } target 要插入的节点
         * @param { UE.uNode } source 在该参数节点前面插入
         * @return { UE.uNode } 返回刚插入的子节点
         * @example
         * ```javascript
         * node.parentNode.insertBefore(newNode, node); //在node节点后面插入newNode
         * ```
         */
        insertBefore:function (target, source) {
            if (this.children) {
                if(target.parentNode){
                    target.parentNode.removeChild(target);
                }
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === source) {
                        this.children.splice(i, 0, target);
                        target.parentNode = this;
                        return target;
                    }
                }

            }
        },

        /**
         * 在传入节点的后面插入一个节点
         * @method insertAfter
         * @param { UE.uNode } target 要插入的节点
         * @param { UE.uNode } source 在该参数节点后面插入
         * @return { UE.uNode } 返回刚插入的子节点
         * @example
         * ```javascript
         * node.parentNode.insertAfter(newNode, node); //在node节点后面插入newNode
         * ```
         */
        insertAfter:function (target, source) {
            if (this.children) {
                if(target.parentNode){
                    target.parentNode.removeChild(target);
                }
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === source) {
                        this.children.splice(i + 1, 0, target);
                        target.parentNode = this;
                        return target;
                    }

                }
            }
        },

        /**
         * 从当前节点的子节点列表中，移除节点
         * @method removeChild
         * @param { UE.uNode } node 要移除的节点引用
         * @param { Boolean } keepChildren 是否保留移除节点的子节点，若传入true，自动把移除节点的子节点插入到移除的位置
         * @return { * } 返回刚移除的子节点
         * @example
         * ```javascript
         * node.removeChild(childNode,true); //在node的子节点列表中移除child节点，并且吧child的子节点插入到移除的位置
         * ```
         */
        removeChild:function (node,keepChildren) {
            if (this.children) {
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === node) {
                        this.children.splice(i, 1);
                        ci.parentNode = null;
                        if(keepChildren && ci.children && ci.children.length){
                            for(var j= 0,cj;cj=ci.children[j];j++){
                                this.children.splice(i+j,0,cj);
                                cj.parentNode = this;

                            }
                        }
                        return ci;
                    }
                }
            }
        },

        /**
         * 获取当前节点所代表的元素属性，即获取attrs对象下的属性值
         * @method getAttr
         * @param { String } attrName 要获取的属性名称
         * @return { * } 返回attrs对象下的属性值
         * @example
         * ```javascript
         * node.getAttr('title');
         * ```
         */
        getAttr:function (attrName) {
            return this.attrs && this.attrs[attrName.toLowerCase()]
        },

        /**
         * 设置当前节点所代表的元素属性，即设置attrs对象下的属性值
         * @method setAttr
         * @param { String } attrName 要设置的属性名称
         * @param { * } attrVal 要设置的属性值，类型视设置的属性而定
         * @return { * } 返回attrs对象下的属性值
         * @example
         * ```javascript
         * node.setAttr('title','标题');
         * ```
         */
        setAttr:function (attrName, attrVal) {
            if (!attrName) {
                delete this.attrs;
                return;
            }
            if(!this.attrs){
                this.attrs = {};
            }
            if (utils.isObject(attrName)) {
                for (var a in attrName) {
                    if (!attrName[a]) {
                        delete this.attrs[a]
                    } else {
                        this.attrs[a.toLowerCase()] = attrName[a];
                    }
                }
            } else {
                if (!attrVal) {
                    delete this.attrs[attrName]
                } else {
                    this.attrs[attrName.toLowerCase()] = attrVal;
                }

            }
        },

        /**
         * 获取当前节点在父节点下的位置索引
         * @method getIndex
         * @return { Number } 返回索引数值，如果没有父节点，返回-1
         * @example
         * ```javascript
         * node.getIndex();
         * ```
         */
        getIndex:function(){
            var parent = this.parentNode;
            for(var i= 0,ci;ci=parent.children[i];i++){
                if(ci === this){
                    return i;
                }
            }
            return -1;
        },

        /**
         * 在当前节点下，根据id查找节点
         * @method getNodeById
         * @param { String } id 要查找的id
         * @return { UE.uNode } 返回找到的节点
         * @example
         * ```javascript
         * node.getNodeById('textId');
         * ```
         */
        getNodeById:function (id) {
            var node;
            if (this.children && this.children.length) {
                for (var i = 0, ci; ci = this.children[i++];) {
                    if (node = getNodeById(ci, id)) {
                        return node;
                    }
                }
            }
        },

        /**
         * 在当前节点下，根据元素名称查找节点列表
         * @method getNodesByTagName
         * @param { String } tagNames 要查找的元素名称
         * @return { Array } 返回找到的节点列表
         * @example
         * ```javascript
         * node.getNodesByTagName('span');
         * ```
         */
        getNodesByTagName:function (tagNames) {
            tagNames = utils.trim(tagNames).replace(/[ ]{2,}/g, ' ').split(' ');
            var arr = [], me = this;
            utils.each(tagNames, function (tagName) {
                if (me.children && me.children.length) {
                    for (var i = 0, ci; ci = me.children[i++];) {
                        getNodesByTagName(ci, tagName, arr)
                    }
                }
            });
            return arr;
        },

        /**
         * 根据样式名称，获取节点的样式值
         * @method getStyle
         * @param { String } name 要获取的样式名称
         * @return { String } 返回样式值
         * @example
         * ```javascript
         * node.getStyle('font-size');
         * ```
         */
        getStyle:function (name) {
            var cssStyle = this.getAttr('style');
            if (!cssStyle) {
                return ''
            }
            var reg = new RegExp('(^|;)\\s*' + name + ':([^;]+)','i');
            var match = cssStyle.match(reg);
            if (match && match[0]) {
                return match[2]
            }
            return '';
        },

        /**
         * 给节点设置样式
         * @method setStyle
         * @param { String } name 要设置的的样式名称
         * @param { String } val 要设置的的样值
         * @example
         * ```javascript
         * node.setStyle('font-size', '12px');
         * ```
         */
        setStyle:function (name, val) {
            function exec(name, val) {
                var reg = new RegExp('(^|;)\\s*' + name + ':([^;]+;?)', 'gi');
                cssStyle = cssStyle.replace(reg, '$1');
                if (val) {
                    cssStyle = name + ':' + utils.unhtml(val) + ';' + cssStyle
                }

            }

            var cssStyle = this.getAttr('style');
            if (!cssStyle) {
                cssStyle = '';
            }
            if (utils.isObject(name)) {
                for (var a in name) {
                    exec(a, name[a])
                }
            } else {
                exec(name, val)
            }
            this.setAttr('style', utils.trim(cssStyle))
        },

        /**
         * 传入一个函数，递归遍历当前节点下的所有节点
         * @method traversal
         * @param { Function } fn 遍历到节点的时，传入节点作为参数，运行此函数
         * @example
         * ```javascript
         * traversal(node, function(){
         *     console.log(node.type);
         * });
         * ```
         */
        traversal:function(fn){
            if(this.children && this.children.length){
                nodeTraversal(this,fn);
            }
            return this;
        }
    }
})();


// core/htmlparser.js
/**
 * html字符串转换成uNode节点
 * @file
 * @module UE
 * @since 1.2.6.1
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @unfile
 * @module UE
 */

/**
 * html字符串转换成uNode节点的静态方法
 * @method htmlparser
 * @param { String } htmlstr 要转换的html代码
 * @param { Boolean } ignoreBlank 若设置为true，转换的时候忽略\n\r\t等空白字符
 * @return { uNode } 给定的html片段转换形成的uNode对象
 * @example
 * ```javascript
 * var root = UE.htmlparser('<p><b>htmlparser</b></p>', true);
 * ```
 */

var htmlparser = UE.htmlparser = function (htmlstr,ignoreBlank) {
    //todo 原来的方式  [^"'<>\/] 有\/就不能配对上 <TD vAlign=top background=../AAA.JPG> 这样的标签了
    //先去掉了，加上的原因忘了，这里先记录
    var re_tag = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/<>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
        re_attr = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g;

    //ie下取得的html可能会有\n存在，要去掉，在处理replace(/[\t\r\n]*/g,'');代码高量的\n不能去除
    var allowEmptyTags = {
        b:1,code:1,i:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,span:1,
        sub:1,img:1,sup:1,font:1,big:1,small:1,iframe:1,a:1,br:1,pre:1
    };
    htmlstr = htmlstr.replace(new RegExp(domUtils.fillChar, 'g'), '');
    if(!ignoreBlank){
        htmlstr = htmlstr.replace(new RegExp('[\\r\\t\\n'+(ignoreBlank?'':' ')+']*<\/?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n'+(ignoreBlank?'':' ')+']*','g'), function(a,b){
            //br暂时单独处理
            if(b && allowEmptyTags[b.toLowerCase()]){
                return a.replace(/(^[\n\r]+)|([\n\r]+$)/g,'');
            }
            return a.replace(new RegExp('^[\\r\\n'+(ignoreBlank?'':' ')+']+'),'').replace(new RegExp('[\\r\\n'+(ignoreBlank?'':' ')+']+$'),'');
        });
    }

    var notTransAttrs = {
        'href':1,
        'src':1
    };

    var uNode = UE.uNode,
        needParentNode = {
            'td':'tr',
            'tr':['tbody','thead','tfoot'],
            'tbody':'table',
            'th':'tr',
            'thead':'table',
            'tfoot':'table',
            'caption':'table',
            'li':['ul', 'ol'],
            'dt':'dl',
            'dd':'dl',
            'option':'select'
        },
        needChild = {
            'ol':'li',
            'ul':'li'
        };

    function text(parent, data) {

        if(needChild[parent.tagName]){
            var tmpNode = uNode.createElement(needChild[parent.tagName]);
            parent.appendChild(tmpNode);
            tmpNode.appendChild(uNode.createText(data));
            parent = tmpNode;
        }else{

            parent.appendChild(uNode.createText(data));
        }
    }

    function element(parent, tagName, htmlattr) {
        var needParentTag;
        if (needParentTag = needParentNode[tagName]) {
            var tmpParent = parent,hasParent;
            while(tmpParent.type != 'root'){
                if(utils.isArray(needParentTag) ? utils.indexOf(needParentTag, tmpParent.tagName) != -1 : needParentTag == tmpParent.tagName){
                    parent = tmpParent;
                    hasParent = true;
                    break;
                }
                tmpParent = tmpParent.parentNode;
            }
            if(!hasParent){
                parent = element(parent, utils.isArray(needParentTag) ? needParentTag[0] : needParentTag)
            }
        }
        //按dtd处理嵌套
//        if(parent.type != 'root' && !dtd[parent.tagName][tagName])
//            parent = parent.parentNode;
        var elm = new uNode({
            parentNode:parent,
            type:'element',
            tagName:tagName.toLowerCase(),
            //是自闭合的处理一下
            children:dtd.$empty[tagName] ? null : []
        });
        //如果属性存在，处理属性
        if (htmlattr) {
            var attrs = {}, match;
            while (match = re_attr.exec(htmlattr)) {
                attrs[match[1].toLowerCase()] = notTransAttrs[match[1].toLowerCase()] ? (match[2] || match[3] || match[4]) : utils.unhtml(match[2] || match[3] || match[4])
            }
            elm.attrs = attrs;
        }
        //trace:3970
//        //如果parent下不能放elm
//        if(dtd.$inline[parent.tagName] && dtd.$block[elm.tagName] && !dtd[parent.tagName][elm.tagName]){
//            parent = parent.parentNode;
//            elm.parentNode = parent;
//        }
        parent.children.push(elm);
        //如果是自闭合节点返回父亲节点
        return  dtd.$empty[tagName] ? parent : elm
    }

    function comment(parent, data) {
        parent.children.push(new uNode({
            type:'comment',
            data:data,
            parentNode:parent
        }));
    }

    var match, currentIndex = 0, nextIndex = 0;
    //设置根节点
    var root = new uNode({
        type:'root',
        children:[]
    });
    var currentParent = root;

    while (match = re_tag.exec(htmlstr)) {
        currentIndex = match.index;
        try{
            if (currentIndex > nextIndex) {
                //text node
                text(currentParent, htmlstr.slice(nextIndex, currentIndex));
            }
            if (match[3]) {

                if(dtd.$cdata[currentParent.tagName]){
                    text(currentParent, match[0]);
                }else{
                    //start tag
                    currentParent = element(currentParent, match[3].toLowerCase(), match[4]);
                }


            } else if (match[1]) {
                if(currentParent.type != 'root'){
                    if(dtd.$cdata[currentParent.tagName] && !dtd.$cdata[match[1]]){
                        text(currentParent, match[0]);
                    }else{
                        var tmpParent = currentParent;
                        while(currentParent.type == 'element' && currentParent.tagName != match[1].toLowerCase()){
                            currentParent = currentParent.parentNode;
                            if(currentParent.type == 'root'){
                                currentParent = tmpParent;
                                throw 'break'
                            }
                        }
                        //end tag
                        currentParent = currentParent.parentNode;
                    }

                }

            } else if (match[2]) {
                //comment
                comment(currentParent, match[2])
            }
        }catch(e){}

        nextIndex = re_tag.lastIndex;

    }
    //如果结束是文本，就有可能丢掉，所以这里手动判断一下
    //例如 <li>sdfsdfsdf<li>sdfsdfsdfsdf
    if (nextIndex < htmlstr.length) {
        text(currentParent, htmlstr.slice(nextIndex));
    }
    return root;
};

// core/filternode.js
/**
 * UE过滤节点的静态方法
 * @file
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @module UE
 */


/**
 * 根据传入节点和过滤规则过滤相应节点
 * @module UE
 * @since 1.2.6.1
 * @method filterNode
 * @param { Object } root 指定root节点
 * @param { Object } rules 过滤规则json对象
 * @example
 * ```javascript
 * UE.filterNode(root,editor.options.filterRules);
 * ```
 */
var filterNode = UE.filterNode = function () {
    function filterNode(node,rules){
        switch (node.type) {
            case 'text':
                break;
            case 'element':
                var val;
                if(val = rules[node.tagName]){
                   if(val === '-'){
                       node.parentNode.removeChild(node)
                   }else if(utils.isFunction(val)){
                       var parentNode = node.parentNode,
                           index = node.getIndex();
                       val(node);
                       if(node.parentNode){
                           if(node.children){
                               for(var i = 0,ci;ci=node.children[i];){
                                   filterNode(ci,rules);
                                   if(ci.parentNode){
                                       i++;
                                   }
                               }
                           }
                       }else{
                           for(var i = index,ci;ci=parentNode.children[i];){
                               filterNode(ci,rules);
                               if(ci.parentNode){
                                   i++;
                               }
                           }
                       }


                   }else{
                       var attrs = val['$'];
                       if(attrs && node.attrs){
                           var tmpAttrs = {},tmpVal;
                           for(var a in attrs){
                               tmpVal = node.getAttr(a);
                               //todo 只先对style单独处理
                               if(a == 'style' && utils.isArray(attrs[a])){
                                   var tmpCssStyle = [];
                                   utils.each(attrs[a],function(v){
                                       var tmp;
                                       if(tmp = node.getStyle(v)){
                                           tmpCssStyle.push(v + ':' + tmp);
                                       }
                                   });
                                   tmpVal = tmpCssStyle.join(';')
                               }
                               if(tmpVal){
                                   tmpAttrs[a] = tmpVal;
                               }

                           }
                           node.attrs = tmpAttrs;
                       }
                       if(node.children){
                           for(var i = 0,ci;ci=node.children[i];){
                               filterNode(ci,rules);
                               if(ci.parentNode){
                                   i++;
                               }
                           }
                       }
                   }
                }else{
                    //如果不在名单里扣出子节点并删除该节点,cdata除外
                    if(dtd.$cdata[node.tagName]){
                        node.parentNode.removeChild(node)
                    }else{
                        var parentNode = node.parentNode,
                            index = node.getIndex();
                        node.parentNode.removeChild(node,true);
                        for(var i = index,ci;ci=parentNode.children[i];){
                            filterNode(ci,rules);
                            if(ci.parentNode){
                                i++;
                            }
                        }
                    }
                }
                break;
            case 'comment':
                node.parentNode.removeChild(node)
        }

    }
    return function(root,rules){
        if(utils.isEmptyObject(rules)){
            return root;
        }
        var val;
        if(val = rules['-']){
            utils.each(val.split(' '),function(k){
                rules[k] = '-'
            })
        }
        for(var i= 0,ci;ci=root.children[i];){
            filterNode(ci,rules);
            if(ci.parentNode){
               i++;
            }
        }
        return root;
    }
}();

// core/plugin.js
/**
 * Created with JetBrains PhpStorm.
 * User: campaign
 * Date: 10/8/13
 * Time: 6:15 PM
 * To change this template use File | Settings | File Templates.
 */
UE.plugin = function(){
    var _plugins = {};
    return {
        register : function(pluginName,fn,oldOptionName,afterDisabled){
            if(oldOptionName && utils.isFunction(oldOptionName)){
                afterDisabled = oldOptionName;
                oldOptionName = null
            }
            _plugins[pluginName] = {
                optionName : oldOptionName || pluginName,
                execFn : fn,
                //当插件被禁用时执行
                afterDisabled : afterDisabled
            }
        },
        load : function(editor){
            utils.each(_plugins,function(plugin){
                var _export = plugin.execFn.call(editor);
                if(editor.options[plugin.optionName] !== false){
                    if(_export){
                        //后边需要再做扩展
                        utils.each(_export,function(v,k){
                            switch(k.toLowerCase()){
                                case 'shortcutkey':
                                    editor.addshortcutkey(v);
                                    break;
                                case 'bindevents':
                                    utils.each(v,function(fn,eventName){
                                        editor.addListener(eventName,fn);
                                    });
                                    break;
                                case 'bindmultievents':
                                    utils.each(utils.isArray(v) ? v:[v],function(event){
                                        var types = utils.trim(event.type).split(/\s+/);
                                        utils.each(types,function(eventName){
                                            editor.addListener(eventName, event.handler);
                                        });
                                    });
                                    break;
                                case 'commands':
                                    utils.each(v,function(execFn,execName){
                                        editor.commands[execName] = execFn
                                    });
                                    break;
                                case 'outputrule':
                                    editor.addOutputRule(v);
                                    break;
                                case 'inputrule':
                                    editor.addInputRule(v);
                                    break;
                                case 'defaultoptions':
                                    editor.setOpt(v)
                            }
                        })
                    }

                }else if(plugin.afterDisabled){
                    plugin.afterDisabled.call(editor)
                }

            });
            //向下兼容
            utils.each(UE.plugins,function(plugin){
                plugin.call(editor);
            });
        },
        run : function(pluginName,editor){
            var plugin = _plugins[pluginName];
            if(plugin){
                plugin.exeFn.call(editor)
            }
        }
    }
}();

// core/keymap.js
var keymap = UE.keymap  = {
    'Backspace' : 8,
    'Tab' : 9,
    'Enter' : 13,

    'Shift':16,
    'Control':17,
    'Alt':18,
    'CapsLock':20,

    'Esc':27,

    'Spacebar':32,

    'PageUp':33,
    'PageDown':34,
    'End':35,
    'Home':36,

    'Left':37,
    'Up':38,
    'Right':39,
    'Down':40,

    'Insert':45,

    'Del':46,

    'NumLock':144,

    'Cmd':91,

    '=':187,
    '-':189,

    "b":66,
    'i':73,
    //回退
    'z':90,
    'y':89,
    //粘贴
    'v' : 86,
    'x' : 88,

    's' : 83,

    'n' : 78
};

// core/localstorage.js
//存储媒介封装
var LocalStorage = UE.LocalStorage = (function () {

    var storage = window.localStorage || getUserData() || null,
        LOCAL_FILE = 'localStorage';

    return {

        saveLocalData: function (key, data) {

            if (storage && data) {
                storage.setItem(key, data);
                return true;
            }

            return false;

        },

        getLocalData: function (key) {

            if (storage) {
                return storage.getItem(key);
            }

            return null;

        },

        removeItem: function (key) {

            storage && storage.removeItem(key);

        }

    };

    function getUserData() {

        var container = document.createElement("div");
        container.style.display = "none";

        if (!container.addBehavior) {
            return null;
        }

        container.addBehavior("#default#userdata");

        return {

            getItem: function (key) {

                var result = null;

                try {
                    document.body.appendChild(container);
                    container.load(LOCAL_FILE);
                    result = container.getAttribute(key);
                    document.body.removeChild(container);
                } catch (e) {
                }

                return result;

            },

            setItem: function (key, value) {

                document.body.appendChild(container);
                container.setAttribute(key, value);
                container.save(LOCAL_FILE);
                document.body.removeChild(container);

            },

            //// 暂时没有用到
            //clear: function () {
            //
            //    var expiresTime = new Date();
            //    expiresTime.setFullYear(expiresTime.getFullYear() - 1);
            //    document.body.appendChild(container);
            //    container.expires = expiresTime.toUTCString();
            //    container.save(LOCAL_FILE);
            //    document.body.removeChild(container);
            //
            //},

            removeItem: function (key) {

                document.body.appendChild(container);
                container.removeAttribute(key);
                container.save(LOCAL_FILE);
                document.body.removeChild(container);

            }

        };

    }

})();

(function () {

    var ROOTKEY = 'ueditor_preference';

    UE.Editor.prototype.setPreferences = function(key,value){
        var obj = {};
        if (utils.isString(key)) {
            obj[ key ] = value;
        } else {
            obj = key;
        }
        var data = LocalStorage.getLocalData(ROOTKEY);
        if (data && (data = utils.str2json(data))) {
            utils.extend(data, obj);
        } else {
            data = obj;
        }
        data && LocalStorage.saveLocalData(ROOTKEY, utils.json2str(data));
    };

    UE.Editor.prototype.getPreferences = function(key){
        var data = LocalStorage.getLocalData(ROOTKEY);
        if (data && (data = utils.str2json(data))) {
            return key ? data[key] : data
        }
        return null;
    };

    UE.Editor.prototype.removePreferences = function (key) {
        var data = LocalStorage.getLocalData(ROOTKEY);
        if (data && (data = utils.str2json(data))) {
            data[key] = undefined;
            delete data[key]
        }
        data && LocalStorage.saveLocalData(ROOTKEY, utils.json2str(data));
    };

})();


// plugins/defaultfilter.js
///import core
///plugin 编辑器默认的过滤转换机制

UE.plugins['defaultfilter'] = function () {
    var me = this;
    me.setOpt({
        'allowDivTransToP':true,
        'disabledTableInTable':true
    });
    //默认的过滤处理
    //进入编辑器的内容处理
    me.addInputRule(function (root) {
        var allowDivTransToP = this.options.allowDivTransToP;
        var val;
        function tdParent(node){
            while(node && node.type == 'element'){
                if(node.tagName == 'td'){
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }
        //进行默认的处理
        root.traversal(function (node) {
            if (node.type == 'element') {
                if (!dtd.$cdata[node.tagName] && me.options.autoClearEmptyNode && dtd.$inline[node.tagName] && !dtd.$empty[node.tagName] && (!node.attrs || utils.isEmptyObject(node.attrs))) {
                    if (!node.firstChild()) node.parentNode.removeChild(node);
                    else if (node.tagName == 'span' && (!node.attrs || utils.isEmptyObject(node.attrs))) {
                        node.parentNode.removeChild(node, true)
                    }
                    return;
                }
                switch (node.tagName) {
                    case 'style':
                    case 'script':
                        node.setAttr({
                            cdata_tag: node.tagName,
                            cdata_data: (node.innerHTML() || ''),
                            '_ue_custom_node_':'true'
                        });
                        node.tagName = 'div';
                        node.innerHTML('');
                        break;
                    case 'a':
                        if (val = node.getAttr('href')) {
                            node.setAttr('_href', val)
                        }
                        break;
                    case 'img':
                        //todo base64暂时去掉，后边做远程图片上传后，干掉这个
                        if (val = node.getAttr('src')) {
                            if (/^data:/.test(val)) {
                                node.parentNode.removeChild(node);
                                break;
                            }
                        }
                        node.setAttr('_src', node.getAttr('src'));
                        break;
                    case 'span':
                        if (browser.webkit && (val = node.getStyle('white-space'))) {
                            if (/nowrap|normal/.test(val)) {
                                node.setStyle('white-space', '');
                                if (me.options.autoClearEmptyNode && utils.isEmptyObject(node.attrs)) {
                                    node.parentNode.removeChild(node, true)
                                }
                            }
                        }
                        val = node.getAttr('id');
                        if(val && /^_baidu_bookmark_/i.test(val)){
                            node.parentNode.removeChild(node)
                        }
                        break;
                    case 'p':
                        if (val = node.getAttr('align')) {
                            node.setAttr('align');
                            node.setStyle('text-align', val)
                        }
                        //trace:3431
//                        var cssStyle = node.getAttr('style');
//                        if (cssStyle) {
//                            cssStyle = cssStyle.replace(/(margin|padding)[^;]+/g, '');
//                            node.setAttr('style', cssStyle)
//
//                        }
                        //p标签不允许嵌套
                        utils.each(node.children,function(n){
                            if(n.type == 'element' && n.tagName == 'p'){
                                var next = n.nextSibling();
                                node.parentNode.insertAfter(n,node);
                                var last = n;
                                while(next){
                                    var tmp = next.nextSibling();
                                    node.parentNode.insertAfter(next,last);
                                    last = next;
                                    next = tmp;
                                }
                                return false;
                            }
                        });
                        if (!node.firstChild()) {
                            node.innerHTML(browser.ie ? '&nbsp;' : '<br/>')
                        }
                        break;
                    case 'div':
                        if(node.getAttr('cdata_tag')){
                            break;
                        }
                        //针对代码这里不处理插入代码的div
                        val = node.getAttr('class');
                        if(val && /^line number\d+/.test(val)){
                            break;
                        }
                        if(!allowDivTransToP){
                            break;
                        }
                        var tmpNode, p = UE.uNode.createElement('p');
                        while (tmpNode = node.firstChild()) {
                            if (tmpNode.type == 'text' || !UE.dom.dtd.$block[tmpNode.tagName]) {
                                p.appendChild(tmpNode);
                            } else {
                                if (p.firstChild()) {
                                    node.parentNode.insertBefore(p, node);
                                    p = UE.uNode.createElement('p');
                                } else {
                                    node.parentNode.insertBefore(tmpNode, node);
                                }
                            }
                        }
                        if (p.firstChild()) {
                            node.parentNode.insertBefore(p, node);
                        }
                        node.parentNode.removeChild(node);
                        break;
                    case 'dl':
                        node.tagName = 'ul';
                        break;
                    case 'dt':
                    case 'dd':
                        node.tagName = 'li';
                        break;
                    case 'li':
                        var className = node.getAttr('class');
                        if (!className || !/list\-/.test(className)) {
                            node.setAttr()
                        }
                        var tmpNodes = node.getNodesByTagName('ol ul');
                        UE.utils.each(tmpNodes, function (n) {
                            node.parentNode.insertAfter(n, node);
                        });
                        break;
                    case 'td':
                    case 'th':
                    case 'caption':
                        if(!node.children || !node.children.length){
                            node.appendChild(browser.ie11below ? UE.uNode.createText(' ') : UE.uNode.createElement('br'))
                        }
                        break;
                    case 'table':
                        if(me.options.disabledTableInTable && tdParent(node)){
                            node.parentNode.insertBefore(UE.uNode.createText(node.innerText()),node);
                            node.parentNode.removeChild(node)
                        }
                }

            }
//            if(node.type == 'comment'){
//                node.parentNode.removeChild(node);
//            }
        })

    });

    //从编辑器出去的内容处理
    me.addOutputRule(function (root) {

        var val;
        root.traversal(function (node) {
            if (node.type == 'element') {

                if (me.options.autoClearEmptyNode && dtd.$inline[node.tagName] && !dtd.$empty[node.tagName] && (!node.attrs || utils.isEmptyObject(node.attrs))) {

                    if (!node.firstChild()) node.parentNode.removeChild(node);
                    else if (node.tagName == 'span' && (!node.attrs || utils.isEmptyObject(node.attrs))) {
                        node.parentNode.removeChild(node, true)
                    }
                    return;
                }
                switch (node.tagName) {
                    case 'div':
                        if (val = node.getAttr('cdata_tag')) {
                            node.tagName = val;
                            node.appendChild(UE.uNode.createText(node.getAttr('cdata_data')));
                            node.setAttr({cdata_tag: '', cdata_data: '','_ue_custom_node_':''});
                        }
                        break;
                    case 'a':
                        if (val = node.getAttr('_href')) {
                            node.setAttr({
                                'href': utils.html(val),
                                '_href': ''
                            })
                        }
                        break;
                        break;
                    case 'span':
                        val = node.getAttr('id');
                        if(val && /^_baidu_bookmark_/i.test(val)){
                            node.parentNode.removeChild(node)
                        }
                        break;
                    case 'img':
                        if (val = node.getAttr('_src')) {
                            node.setAttr({
                                'src': node.getAttr('_src'),
                                '_src': ''
                            })
                        }


                }
            }

        })


    });
};


// plugins/inserthtml.js
/**
 * 插入html字符串插件
 * @file
 * @since 1.2.6.1
 */

/**
 * 插入html代码
 * @command inserthtml
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } html 插入的html字符串
 * @remaind 插入的标签内容是在当前的选区位置上插入，如果当前是闭合状态，那直接插入内容， 如果当前是选中状态，将先清除当前选中内容后，再做插入
 * @warning 注意:该命令会对当前选区的位置，对插入的内容进行过滤转换处理。 过滤的规则遵循html语意化的原则。
 * @example
 * ```javascript
 * //xxx[BB]xxx 当前选区为非闭合选区，选中BB这两个文本
 * //执行命令，插入<b>CC</b>
 * //插入后的效果 xxx<b>CC</b>xxx
 * //<p>xx|xxx</p> 当前选区为闭合状态
 * //插入<p>CC</p>
 * //结果 <p>xx</p><p>CC</p><p>xxx</p>
 * //<p>xxxx</p>|</p>xxx</p> 当前选区在两个p标签之间
 * //插入 xxxx
 * //结果 <p>xxxx</p><p>xxxx</p></p>xxx</p>
 * ```
 */

UE.commands['inserthtml'] = {
    execCommand: function (command,html,notNeedFilter){
        var me = this,
            range,
            div;
        if(!html){
            return;
        }
        if(me.fireEvent('beforeinserthtml',html) === true){
            return;
        }
        range = me.selection.getRange();
        div = range.document.createElement( 'div' );
        div.style.display = 'inline';

        if (!notNeedFilter) {
            var root = UE.htmlparser(html);
            //如果给了过滤规则就先进行过滤
            if(me.options.filterRules){
                UE.filterNode(root,me.options.filterRules);
            }
            //执行默认的处理
            me.filterInputRule(root);
            html = root.toHtml()
        }
        div.innerHTML = utils.trim( html );

        if ( !range.collapsed ) {
            var tmpNode = range.startContainer;
            if(domUtils.isFillChar(tmpNode)){
                range.setStartBefore(tmpNode)
            }
            tmpNode = range.endContainer;
            if(domUtils.isFillChar(tmpNode)){
                range.setEndAfter(tmpNode)
            }
            range.txtToElmBoundary();
            //结束边界可能放到了br的前边，要把br包含进来
            // x[xxx]<br/>
            if(range.endContainer && range.endContainer.nodeType == 1){
                tmpNode = range.endContainer.childNodes[range.endOffset];
                if(tmpNode && domUtils.isBr(tmpNode)){
                    range.setEndAfter(tmpNode);
                }
            }
            if(range.startOffset == 0){
                tmpNode = range.startContainer;
                if(domUtils.isBoundaryNode(tmpNode,'firstChild') ){
                    tmpNode = range.endContainer;
                    if(range.endOffset == (tmpNode.nodeType == 3 ? tmpNode.nodeValue.length : tmpNode.childNodes.length) && domUtils.isBoundaryNode(tmpNode,'lastChild')){
                        me.body.innerHTML = '<p>'+(browser.ie ? '' : '<br/>')+'</p>';
                        range.setStart(me.body.firstChild,0).collapse(true)

                    }
                }
            }
            !range.collapsed && range.deleteContents();
            if(range.startContainer.nodeType == 1){
                var child = range.startContainer.childNodes[range.startOffset],pre;
                if(child && domUtils.isBlockElm(child) && (pre = child.previousSibling) && domUtils.isBlockElm(pre)){
                    range.setEnd(pre,pre.childNodes.length).collapse();
                    while(child.firstChild){
                        pre.appendChild(child.firstChild);
                    }
                    domUtils.remove(child);
                }
            }

        }


        var child,parent,pre,tmp,hadBreak = 0, nextNode;
        //如果当前位置选中了fillchar要干掉，要不会产生空行
        if(range.inFillChar()){
            child = range.startContainer;
            if(domUtils.isFillChar(child)){
                range.setStartBefore(child).collapse(true);
                domUtils.remove(child);
            }else if(domUtils.isFillChar(child,true)){
                child.nodeValue = child.nodeValue.replace(fillCharReg,'');
                range.startOffset--;
                range.collapsed && range.collapse(true)
            }
        }
        //列表单独处理
        var li = domUtils.findParentByTagName(range.startContainer,'li',true);
        if(li){
            var next,last;
            while(child = div.firstChild){
                //针对hr单独处理一下先
                while(child && (child.nodeType == 3 || !domUtils.isBlockElm(child) || child.tagName=='HR' )){
                    next = child.nextSibling;
                    range.insertNode( child).collapse();
                    last = child;
                    child = next;

                }
                if(child){
                    if(/^(ol|ul)$/i.test(child.tagName)){
                        while(child.firstChild){
                            last = child.firstChild;
                            domUtils.insertAfter(li,child.firstChild);
                            li = li.nextSibling;
                        }
                        domUtils.remove(child)
                    }else{
                        var tmpLi;
                        next = child.nextSibling;
                        tmpLi = me.document.createElement('li');
                        domUtils.insertAfter(li,tmpLi);
                        tmpLi.appendChild(child);
                        last = child;
                        child = next;
                        li = tmpLi;
                    }
                }
            }
            li = domUtils.findParentByTagName(range.startContainer,'li',true);
            if(domUtils.isEmptyBlock(li)){
                domUtils.remove(li)
            }
            if(last){

                range.setStartAfter(last).collapse(true).select(true)
            }
        }else{
            while ( child = div.firstChild ) {
                if(hadBreak){
                    var p = me.document.createElement('p');
                    while(child && (child.nodeType == 3 || !dtd.$block[child.tagName])){
                        nextNode = child.nextSibling;
                        p.appendChild(child);
                        child = nextNode;
                    }
                    if(p.firstChild){

                        child = p
                    }
                }
                range.insertNode( child );
                nextNode = child.nextSibling;
                if ( !hadBreak && child.nodeType == domUtils.NODE_ELEMENT && domUtils.isBlockElm( child ) ){

                    parent = domUtils.findParent( child,function ( node ){ return domUtils.isBlockElm( node ); } );
                    if ( parent && parent.tagName.toLowerCase() != 'body' && !(dtd[parent.tagName][child.nodeName] && child.parentNode === parent)){
                        if(!dtd[parent.tagName][child.nodeName]){
                            pre = parent;
                        }else{
                            tmp = child.parentNode;
                            while (tmp !== parent){
                                pre = tmp;
                                tmp = tmp.parentNode;

                            }
                        }


                        domUtils.breakParent( child, pre || tmp );
                        //去掉break后前一个多余的节点  <p>|<[p> ==> <p></p><div></div><p>|</p>
                        var pre = child.previousSibling;
                        domUtils.trimWhiteTextNode(pre);
                        if(!pre.childNodes.length){
                            domUtils.remove(pre);
                        }
                        //trace:2012,在非ie的情况，切开后剩下的节点有可能不能点入光标添加br占位

                        if(!browser.ie &&
                            (next = child.nextSibling) &&
                            domUtils.isBlockElm(next) &&
                            next.lastChild &&
                            !domUtils.isBr(next.lastChild)){
                            next.appendChild(me.document.createElement('br'));
                        }
                        hadBreak = 1;
                    }
                }
                var next = child.nextSibling;
                if(!div.firstChild && next && domUtils.isBlockElm(next)){

                    range.setStart(next,0).collapse(true);
                    break;
                }
                range.setEndAfter( child ).collapse();

            }

            child = range.startContainer;

            if(nextNode && domUtils.isBr(nextNode)){
                domUtils.remove(nextNode)
            }
            //用chrome可能有空白展位符
            if(domUtils.isBlockElm(child) && domUtils.isEmptyNode(child)){
                if(nextNode = child.nextSibling){
                    domUtils.remove(child);
                    if(nextNode.nodeType == 1 && dtd.$block[nextNode.tagName]){

                        range.setStart(nextNode,0).collapse(true).shrinkBoundary()
                    }
                }else{

                    try{
                        child.innerHTML = browser.ie ? domUtils.fillChar : '<br/>';
                    }catch(e){
                        range.setStartBefore(child);
                        domUtils.remove(child)
                    }

                }

            }
            //加上true因为在删除表情等时会删两次，第一次是删的fillData
            try{
                range.select(true);
            }catch(e){}

        }



        setTimeout(function(){
            range = me.selection.getRange();
            range.scrollToView(me.autoHeightEnabled,me.autoHeightEnabled ? domUtils.getXY(me.iframe).y:0);
            me.fireEvent('afterinserthtml', html);
        },200);
    }
};


// plugins/image.js
/**
 * 图片插入、排版插件
 * @file
 * @since 1.2.6.1
 */

/**
 * 图片对齐方式
 * @command imagefloat
 * @method execCommand
 * @remind 值center为独占一行居中
 * @param { String } cmd 命令字符串
 * @param { String } align 对齐方式，可传left、right、none、center
 * @remaind center表示图片独占一行
 * @example
 * ```javascript
 * editor.execCommand( 'imagefloat', 'center' );
 * ```
 */

/**
 * 如果选区所在位置是图片区域
 * @command imagefloat
 * @method queryCommandValue
 * @param { String } cmd 命令字符串
 * @return { String } 返回图片对齐方式
 * @example
 * ```javascript
 * editor.queryCommandValue( 'imagefloat' );
 * ```
 */

UE.commands['imagefloat'] = {
    execCommand:function (cmd, align) {
        var me = this,
            range = me.selection.getRange();
        if (!range.collapsed) {
            var img = range.getClosedNode();
            if (img && img.tagName == 'IMG') {
                switch (align) {
                    case 'left':
                    case 'right':
                    case 'none':
                        var pN = img.parentNode, tmpNode, pre, next;
                        while (dtd.$inline[pN.tagName] || pN.tagName == 'A') {
                            pN = pN.parentNode;
                        }
                        tmpNode = pN;
                        if (tmpNode.tagName == 'P' && domUtils.getStyle(tmpNode, 'text-align') == 'center') {
                            if (!domUtils.isBody(tmpNode) && domUtils.getChildCount(tmpNode, function (node) {
                                return !domUtils.isBr(node) && !domUtils.isWhitespace(node);
                            }) == 1) {
                                pre = tmpNode.previousSibling;
                                next = tmpNode.nextSibling;
                                if (pre && next && pre.nodeType == 1 && next.nodeType == 1 && pre.tagName == next.tagName && domUtils.isBlockElm(pre)) {
                                    pre.appendChild(tmpNode.firstChild);
                                    while (next.firstChild) {
                                        pre.appendChild(next.firstChild);
                                    }
                                    domUtils.remove(tmpNode);
                                    domUtils.remove(next);
                                } else {
                                    domUtils.setStyle(tmpNode, 'text-align', '');
                                }


                            }

                            range.selectNode(img).select();
                        }
                        domUtils.setStyle(img, 'float', align == 'none' ? '' : align);
                        if(align == 'none'){
                            domUtils.removeAttributes(img,'align');
                        }

                        break;
                    case 'center':
                        if (me.queryCommandValue('imagefloat') != 'center') {
                            pN = img.parentNode;
                            domUtils.setStyle(img, 'float', '');
                            domUtils.removeAttributes(img,'align');
                            tmpNode = img;
                            while (pN && domUtils.getChildCount(pN, function (node) {
                                return !domUtils.isBr(node) && !domUtils.isWhitespace(node);
                            }) == 1
                                && (dtd.$inline[pN.tagName] || pN.tagName == 'A')) {
                                tmpNode = pN;
                                pN = pN.parentNode;
                            }
                            range.setStartBefore(tmpNode).setCursor(false);
                            pN = me.document.createElement('div');
                            pN.appendChild(tmpNode);
                            domUtils.setStyle(tmpNode, 'float', '');

                            me.execCommand('insertHtml', '<p id="_img_parent_tmp" style="text-align:center">' + pN.innerHTML + '</p>');

                            tmpNode = me.document.getElementById('_img_parent_tmp');
                            tmpNode.removeAttribute('id');
                            tmpNode = tmpNode.firstChild;
                            range.selectNode(tmpNode).select();
                            //去掉后边多余的元素
                            next = tmpNode.parentNode.nextSibling;
                            if (next && domUtils.isEmptyNode(next)) {
                                domUtils.remove(next);
                            }

                        }

                        break;
                }

            }
        }
    },
    queryCommandValue:function () {
        var range = this.selection.getRange(),
            startNode, floatStyle;
        if (range.collapsed) {
            return 'none';
        }
        startNode = range.getClosedNode();
        if (startNode && startNode.nodeType == 1 && startNode.tagName == 'IMG') {
            floatStyle = domUtils.getComputedStyle(startNode, 'float') || startNode.getAttribute('align');

            if (floatStyle == 'none') {
                floatStyle = domUtils.getComputedStyle(startNode.parentNode, 'text-align') == 'center' ? 'center' : floatStyle;
            }
            return {
                left:1,
                right:1,
                center:1
            }[floatStyle] ? floatStyle : 'none';
        }
        return 'none';


    },
    queryCommandState:function () {
        var range = this.selection.getRange(),
            startNode;

        if (range.collapsed)  return -1;

        startNode = range.getClosedNode();
        if (startNode && startNode.nodeType == 1 && startNode.tagName == 'IMG') {
            return 0;
        }
        return -1;
    }
};


/**
 * 插入图片
 * @command insertimage
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { Object } opt 属性键值对，这些属性都将被复制到当前插入图片
 * @remind 该命令第二个参数可接受一个图片配置项对象的数组，可以插入多张图片，
 * 此时数组的每一个元素都是一个Object类型的图片属性集合。
 * @example
 * ```javascript
 * editor.execCommand( 'insertimage', {
 *     src:'a/b/c.jpg',
 *     width:'100',
 *     height:'100'
 * } );
 * ```
 * @example
 * ```javascript
 * editor.execCommand( 'insertimage', [{
 *     src:'a/b/c.jpg',
 *     width:'100',
 *     height:'100'
 * },{
 *     src:'a/b/d.jpg',
 *     width:'100',
 *     height:'100'
 * }] );
 * ```
 */

UE.commands['insertimage'] = {
    execCommand:function (cmd, opt) {

        opt = utils.isArray(opt) ? opt : [opt];
        if (!opt.length) {
            return;
        }
        var me = this,
            range = me.selection.getRange(),
            img = range.getClosedNode();

        if(me.fireEvent('beforeinsertimage', opt) === true){
            return;
        }

        if (img && /img/i.test(img.tagName) && (img.className != "edui-faked-video" || img.className.indexOf("edui-upload-video")!=-1) && !img.getAttribute("word_img")) {
            var first = opt.shift();
            var floatStyle = first['floatStyle'];
            delete first['floatStyle'];
////                img.style.border = (first.border||0) +"px solid #000";
////                img.style.margin = (first.margin||0) +"px";
//                img.style.cssText += ';margin:' + (first.margin||0) +"px;" + 'border:' + (first.border||0) +"px solid #000";
            domUtils.setAttributes(img, first);
            me.execCommand('imagefloat', floatStyle);
            if (opt.length > 0) {
                range.setStartAfter(img).setCursor(false, true);
                me.execCommand('insertimage', opt);
            }

        } else {
            var html = [], str = '', ci;
            ci = opt[0];
            if (opt.length == 1) {
                str = '<img src="' + ci.src + '" ' + (ci._src ? ' _src="' + ci._src + '" ' : '') +
                    (ci.width ? 'width="' + ci.width + '" ' : '') +
                    (ci.height ? ' height="' + ci.height + '" ' : '') +
                    (ci['floatStyle'] == 'left' || ci['floatStyle'] == 'right' ? ' style="float:' + ci['floatStyle'] + ';"' : '') +
                    (ci.title && ci.title != "" ? ' title="' + ci.title + '"' : '') +
                    (ci.border && ci.border != "0" ? ' border="' + ci.border + '"' : '') +
                    (ci.alt && ci.alt != "" ? ' alt="' + ci.alt + '"' : '') +
                    (ci.hspace && ci.hspace != "0" ? ' hspace = "' + ci.hspace + '"' : '') +
                    (ci.vspace && ci.vspace != "0" ? ' vspace = "' + ci.vspace + '"' : '') + '/>';
                if (ci['floatStyle'] == 'center') {
                    str = '<p style="text-align: center">' + str + '</p>';
                }
                html.push(str);

            } else {
                for (var i = 0; ci = opt[i++];) {
                    str = '<p ' + (ci['floatStyle'] == 'center' ? 'style="text-align: center" ' : '') + '><img src="' + ci.src + '" ' +
                        (ci.width ? 'width="' + ci.width + '" ' : '') + (ci._src ? ' _src="' + ci._src + '" ' : '') +
                        (ci.height ? ' height="' + ci.height + '" ' : '') +
                        ' style="' + (ci['floatStyle'] && ci['floatStyle'] != 'center' ? 'float:' + ci['floatStyle'] + ';' : '') +
                        (ci.border || '') + '" ' +
                        (ci.title ? ' title="' + ci.title + '"' : '') + ' /></p>';
                    html.push(str);
                }
            }

            me.execCommand('insertHtml', html.join(''));
        }

        me.fireEvent('afterinsertimage', opt)
    }
};

// plugins/justify.js
/**
 * 段落格式
 * @file
 * @since 1.2.6.1
 */

/**
 * 段落对齐方式
 * @command justify
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } align 对齐方式：left => 居左，right => 居右，center => 居中，justify => 两端对齐
 * @example
 * ```javascript
 * editor.execCommand( 'justify', 'center' );
 * ```
 */
/**
 * 如果选区所在位置是段落区域，返回当前段落对齐方式
 * @command justify
 * @method queryCommandValue
 * @param { String } cmd 命令字符串
 * @return { String } 返回段落对齐方式
 * @example
 * ```javascript
 * editor.queryCommandValue( 'justify' );
 * ```
 */

UE.plugins['justify']=function(){
    var me=this,
        block = domUtils.isBlockElm,
        defaultValue = {
            left:1,
            right:1,
            center:1,
            justify:1
        },
        doJustify = function (range, style) {
            var bookmark = range.createBookmark(),
                filterFn = function (node) {
                    return node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' && !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace(node);
                };

            range.enlarge(true);
            var bookmark2 = range.createBookmark(),
                current = domUtils.getNextDomNode(bookmark2.start, false, filterFn),
                tmpRange = range.cloneRange(),
                tmpNode;
            while (current && !(domUtils.getPosition(current, bookmark2.end) & domUtils.POSITION_FOLLOWING)) {
                if (current.nodeType == 3 || !block(current)) {
                    tmpRange.setStartBefore(current);
                    while (current && current !== bookmark2.end && !block(current)) {
                        tmpNode = current;
                        current = domUtils.getNextDomNode(current, false, null, function (node) {
                            return !block(node);
                        });
                    }
                    tmpRange.setEndAfter(tmpNode);
                    var common = tmpRange.getCommonAncestor();
                    if (!domUtils.isBody(common) && block(common)) {
                        domUtils.setStyles(common, utils.isString(style) ? {'text-align':style} : style);
                        current = common;
                    } else {
                        var p = range.document.createElement('p');
                        domUtils.setStyles(p, utils.isString(style) ? {'text-align':style} : style);
                        var frag = tmpRange.extractContents();
                        p.appendChild(frag);
                        tmpRange.insertNode(p);
                        current = p;
                    }
                    current = domUtils.getNextDomNode(current, false, filterFn);
                } else {
                    current = domUtils.getNextDomNode(current, true, filterFn);
                }
            }
            return range.moveToBookmark(bookmark2).moveToBookmark(bookmark);
        };

    UE.commands['justify'] = {
        execCommand:function (cmdName, align) {
            var range = this.selection.getRange(),
                txt;

            //闭合时单独处理
            if (range.collapsed) {
                txt = this.document.createTextNode('p');
                range.insertNode(txt);
            }
            doJustify(range, align);
            if (txt) {
                range.setStartBefore(txt).collapse(true);
                domUtils.remove(txt);
            }

            range.select();


            return true;
        },
        queryCommandValue:function () {
            var startNode = this.selection.getStart(),
                value = domUtils.getComputedStyle(startNode, 'text-align');
            return defaultValue[value] ? value : 'left';
        },
        queryCommandState:function () {
            var start = this.selection.getStart(),
                cell = start && domUtils.findParentByTagName(start, ["td", "th","caption"], true);

            return cell? -1:0;
        }

    };
};


// plugins/font.js
/**
 * 字体颜色,背景色,字号,字体,下划线,删除线
 * @file
 * @since 1.2.6.1
 */

/**
 * 字体颜色
 * @command forecolor
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } value 色值(必须十六进制)
 * @example
 * ```javascript
 * editor.execCommand( 'forecolor', '#000' );
 * ```
 */
/**
 * 返回选区字体颜色
 * @command forecolor
 * @method queryCommandValue
 * @param { String } cmd 命令字符串
 * @return { String } 返回字体颜色
 * @example
 * ```javascript
 * editor.queryCommandValue( 'forecolor' );
 * ```
 */

/**
 * 字体背景颜色
 * @command backcolor
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } value 色值(必须十六进制)
 * @example
 * ```javascript
 * editor.execCommand( 'backcolor', '#000' );
 * ```
 */
/**
 * 返回选区字体颜色
 * @command backcolor
 * @method queryCommandValue
 * @param { String } cmd 命令字符串
 * @return { String } 返回字体背景颜色
 * @example
 * ```javascript
 * editor.queryCommandValue( 'backcolor' );
 * ```
 */

/**
 * 字体大小
 * @command fontsize
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } value 字体大小
 * @example
 * ```javascript
 * editor.execCommand( 'fontsize', '14px' );
 * ```
 */
/**
 * 返回选区字体大小
 * @command fontsize
 * @method queryCommandValue
 * @param { String } cmd 命令字符串
 * @return { String } 返回字体大小
 * @example
 * ```javascript
 * editor.queryCommandValue( 'fontsize' );
 * ```
 */

/**
 * 字体样式
 * @command fontfamily
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } value 字体样式
 * @example
 * ```javascript
 * editor.execCommand( 'fontfamily', '微软雅黑' );
 * ```
 */
/**
 * 返回选区字体样式
 * @command fontfamily
 * @method queryCommandValue
 * @param { String } cmd 命令字符串
 * @return { String } 返回字体样式
 * @example
 * ```javascript
 * editor.queryCommandValue( 'fontfamily' );
 * ```
 */

/**
 * 字体下划线,与删除线互斥
 * @command underline
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'underline' );
 * ```
 */

/**
 * 字体删除线,与下划线互斥
 * @command strikethrough
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'strikethrough' );
 * ```
 */

/**
 * 字体边框
 * @command fontborder
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'fontborder' );
 * ```
 */

UE.plugins['font'] = function () {
    var me = this,
        fonts = {
            'forecolor': 'color',
            'backcolor': 'background-color',
            'fontsize': 'font-size',
            'fontfamily': 'font-family',
            'underline': 'text-decoration',
            'strikethrough': 'text-decoration',
            'fontborder': 'border'
        },
        needCmd = {'underline': 1, 'strikethrough': 1, 'fontborder': 1},
        needSetChild = {
            'forecolor': 'color',
            'backcolor': 'background-color',
            'fontsize': 'font-size',
            'fontfamily': 'font-family'

        };
    me.setOpt({
        'fontfamily': [
            { name: 'songti', val: '宋体,SimSun'},
            { name: 'yahei', val: '微软雅黑,Microsoft YaHei'},
            { name: 'kaiti', val: '楷体,楷体_GB2312, SimKai'},
            { name: 'heiti', val: '黑体, SimHei'},
            { name: 'lishu', val: '隶书, SimLi'},
            { name: 'andaleMono', val: 'andale mono'},
            { name: 'arial', val: 'arial, helvetica,sans-serif'},
            { name: 'arialBlack', val: 'arial black,avant garde'},
            { name: 'comicSansMs', val: 'comic sans ms'},
            { name: 'impact', val: 'impact,chicago'},
            { name: 'timesNewRoman', val: 'times new roman'}
        ],
        'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36]
    });

    function mergeWithParent(node){
        var parent;
        while(parent = node.parentNode){
            if(parent.tagName == 'SPAN' && domUtils.getChildCount(parent,function(child){
                return !domUtils.isBookmarkNode(child) && !domUtils.isBr(child)
            }) == 1) {
                parent.style.cssText += node.style.cssText;
                domUtils.remove(node,true);
                node = parent;

            }else{
                break;
            }
        }

    }
    function mergeChild(rng,cmdName,value){
        if(needSetChild[cmdName]){
            rng.adjustmentBoundary();
            if(!rng.collapsed && rng.startContainer.nodeType == 1){
                var start = rng.startContainer.childNodes[rng.startOffset];
                if(start && domUtils.isTagNode(start,'span')){
                    var bk = rng.createBookmark();
                    utils.each(domUtils.getElementsByTagName(start, 'span'), function (span) {
                        if (!span.parentNode || domUtils.isBookmarkNode(span))return;
                        if(cmdName == 'backcolor' && domUtils.getComputedStyle(span,'background-color').toLowerCase() === value){
                            return;
                        }
                        domUtils.removeStyle(span,needSetChild[cmdName]);
                        if(span.style.cssText.replace(/^\s+$/,'').length == 0){
                            domUtils.remove(span,true)
                        }
                    });
                    rng.moveToBookmark(bk)
                }
            }
        }

    }
    function mergesibling(rng,cmdName,value) {
        var collapsed = rng.collapsed,
            bk = rng.createBookmark(), common;
        if (collapsed) {
            common = bk.start.parentNode;
            while (dtd.$inline[common.tagName]) {
                common = common.parentNode;
            }
        } else {
            common = domUtils.getCommonAncestor(bk.start, bk.end);
        }
        utils.each(domUtils.getElementsByTagName(common, 'span'), function (span) {
            if (!span.parentNode || domUtils.isBookmarkNode(span))return;
            if (/\s*border\s*:\s*none;?\s*/i.test(span.style.cssText)) {
                if(/^\s*border\s*:\s*none;?\s*$/.test(span.style.cssText)){
                    domUtils.remove(span, true);
                }else{
                    domUtils.removeStyle(span,'border');
                }
                return
            }
            if (/border/i.test(span.style.cssText) && span.parentNode.tagName == 'SPAN' && /border/i.test(span.parentNode.style.cssText)) {
                span.style.cssText = span.style.cssText.replace(/border[^:]*:[^;]+;?/gi, '');
            }
            if(!(cmdName=='fontborder' && value=='none')){
                var next = span.nextSibling;
                while (next && next.nodeType == 1 && next.tagName == 'SPAN' ) {
                    if(domUtils.isBookmarkNode(next) && cmdName == 'fontborder') {
                        span.appendChild(next);
                        next = span.nextSibling;
                        continue;
                    }
                    if (next.style.cssText == span.style.cssText) {
                        domUtils.moveChild(next, span);
                        domUtils.remove(next);
                    }
                    if (span.nextSibling === next)
                        break;
                    next = span.nextSibling;
                }
            }


            mergeWithParent(span);
            if(browser.ie && browser.version > 8 ){
                //拷贝父亲们的特别的属性,这里只做背景颜色的处理
                var parent = domUtils.findParent(span,function(n){return n.tagName == 'SPAN' && /background-color/.test(n.style.cssText)});
                if(parent && !/background-color/.test(span.style.cssText)){
                    span.style.backgroundColor = parent.style.backgroundColor;
                }
            }

        });
        rng.moveToBookmark(bk);
        mergeChild(rng,cmdName,value)
    }

    me.addInputRule(function (root) {
        utils.each(root.getNodesByTagName('u s del font strike'), function (node) {
            if (node.tagName == 'font') {
                var cssStyle = [];
                for (var p in node.attrs) {
                    switch (p) {
                        case 'size':
                            cssStyle.push('font-size:' +
                                ({
                                '1':'10',
                                '2':'12',
                                '3':'16',
                                '4':'18',
                                '5':'24',
                                '6':'32',
                                '7':'48'
                            }[node.attrs[p]] || node.attrs[p]) + 'px');
                            break;
                        case 'color':
                            cssStyle.push('color:' + node.attrs[p]);
                            break;
                        case 'face':
                            cssStyle.push('font-family:' + node.attrs[p]);
                            break;
                        case 'style':
                            cssStyle.push(node.attrs[p]);
                    }
                }
                node.attrs = {
                    'style': cssStyle.join(';')
                };
            } else {
                var val = node.tagName == 'u' ? 'underline' : 'line-through';
                node.attrs = {
                    'style': (node.getAttr('style') || '') + 'text-decoration:' + val + ';'
                }
            }
            node.tagName = 'span';
        });
//        utils.each(root.getNodesByTagName('span'), function (node) {
//            var val;
//            if(val = node.getAttr('class')){
//                if(/fontstrikethrough/.test(val)){
//                    node.setStyle('text-decoration','line-through');
//                    if(node.attrs['class']){
//                        node.attrs['class'] = node.attrs['class'].replace(/fontstrikethrough/,'');
//                    }else{
//                        node.setAttr('class')
//                    }
//                }
//                if(/fontborder/.test(val)){
//                    node.setStyle('border','1px solid #000');
//                    if(node.attrs['class']){
//                        node.attrs['class'] = node.attrs['class'].replace(/fontborder/,'');
//                    }else{
//                        node.setAttr('class')
//                    }
//                }
//            }
//        });
    });
//    me.addOutputRule(function(root){
//        utils.each(root.getNodesByTagName('span'), function (node) {
//            var val;
//            if(val = node.getStyle('text-decoration')){
//                if(/line-through/.test(val)){
//                    if(node.attrs['class']){
//                        node.attrs['class'] += ' fontstrikethrough';
//                    }else{
//                        node.setAttr('class','fontstrikethrough')
//                    }
//                }
//
//                node.setStyle('text-decoration')
//            }
//            if(val = node.getStyle('border')){
//                if(/1px/.test(val) && /solid/.test(val)){
//                    if(node.attrs['class']){
//                        node.attrs['class'] += ' fontborder';
//
//                    }else{
//                        node.setAttr('class','fontborder')
//                    }
//                }
//                node.setStyle('border')
//
//            }
//        });
//    });
    for (var p in fonts) {
        (function (cmd, style) {
            UE.commands[cmd] = {
                execCommand: function (cmdName, value) {
                    value = value || (this.queryCommandState(cmdName) ? 'none' : cmdName == 'underline' ? 'underline' :
                        cmdName == 'fontborder' ? '1px solid #000' :
                            'line-through');
                    var me = this,
                        range = this.selection.getRange(),
                        text;

                    if (value == 'default') {

                        if (range.collapsed) {
                            text = me.document.createTextNode('font');
                            range.insertNode(text).select();

                        }
                        me.execCommand('removeFormat', 'span,a', style);
                        if (text) {
                            range.setStartBefore(text).collapse(true);
                            domUtils.remove(text);
                        }
                        mergesibling(range,cmdName,value);
                        range.select()
                    } else {
                        if (!range.collapsed) {
                            if (needCmd[cmd] && me.queryCommandValue(cmd)) {
                                me.execCommand('removeFormat', 'span,a', style);
                            }
                            range = me.selection.getRange();

                            range.applyInlineStyle('span', {'style': style + ':' + value});
                            mergesibling(range, cmdName,value);
                            range.select();
                        } else {

                            var span = domUtils.findParentByTagName(range.startContainer, 'span', true);
                            text = me.document.createTextNode('font');
                            if (span && !span.children.length && !span[browser.ie ? 'innerText' : 'textContent'].replace(fillCharReg, '').length) {
                                //for ie hack when enter
                                range.insertNode(text);
                                if (needCmd[cmd]) {
                                    range.selectNode(text).select();
                                    me.execCommand('removeFormat', 'span,a', style, null);

                                    span = domUtils.findParentByTagName(text, 'span', true);
                                    range.setStartBefore(text);

                                }
                                span && (span.style.cssText += ';' + style + ':' + value);
                                range.collapse(true).select();


                            } else {
                                range.insertNode(text);
                                range.selectNode(text).select();
                                span = range.document.createElement('span');

                                if (needCmd[cmd]) {
                                    //a标签内的不处理跳过
                                    if (domUtils.findParentByTagName(text, 'a', true)) {
                                        range.setStartBefore(text).setCursor();
                                        domUtils.remove(text);
                                        return;
                                    }
                                    me.execCommand('removeFormat', 'span,a', style);
                                }

                                span.style.cssText = style + ':' + value;


                                text.parentNode.insertBefore(span, text);
                                //修复，span套span 但样式不继承的问题
                                if (!browser.ie || browser.ie && browser.version == 9) {
                                    var spanParent = span.parentNode;
                                    while (!domUtils.isBlockElm(spanParent)) {
                                        if (spanParent.tagName == 'SPAN') {
                                            //opera合并style不会加入";"
                                            span.style.cssText = spanParent.style.cssText + ";" + span.style.cssText;
                                        }
                                        spanParent = spanParent.parentNode;
                                    }
                                }


                                if (opera) {
                                    setTimeout(function () {
                                        range.setStart(span, 0).collapse(true);
                                        mergesibling(range, cmdName,value);
                                        range.select();
                                    });
                                } else {
                                    range.setStart(span, 0).collapse(true);
                                    mergesibling(range,cmdName,value);
                                    range.select();
                                }

                                //trace:981
                                //domUtils.mergeToParent(span)
                            }
                            domUtils.remove(text);
                        }


                    }
                    return true;
                },
                queryCommandValue: function (cmdName) {
                    var startNode = this.selection.getStart();

                    //trace:946
                    if (cmdName == 'underline' || cmdName == 'strikethrough') {
                        var tmpNode = startNode, value;
                        while (tmpNode && !domUtils.isBlockElm(tmpNode) && !domUtils.isBody(tmpNode)) {
                            if (tmpNode.nodeType == 1) {
                                value = domUtils.getComputedStyle(tmpNode, style);
                                if (value != 'none') {
                                    return value;
                                }
                            }

                            tmpNode = tmpNode.parentNode;
                        }
                        return 'none';
                    }
                    if (cmdName == 'fontborder') {
                        var tmp = startNode, val;
                        while (tmp && dtd.$inline[tmp.tagName]) {
                            if (val = domUtils.getComputedStyle(tmp, 'border')) {

                                if (/1px/.test(val) && /solid/.test(val)) {
                                    return val;
                                }
                            }
                            tmp = tmp.parentNode;
                        }
                        return ''
                    }

                    if( cmdName == 'FontSize' ) {
                        var styleVal = domUtils.getComputedStyle(startNode, style),
                            tmp = /^([\d\.]+)(\w+)$/.exec( styleVal );

                        if( tmp ) {

                            return Math.floor( tmp[1] ) + tmp[2];

                        }

                        return styleVal;

                    }

                    return  domUtils.getComputedStyle(startNode, style);
                },
                queryCommandState: function (cmdName) {
                    if (!needCmd[cmdName])
                        return 0;
                    var val = this.queryCommandValue(cmdName);
                    if (cmdName == 'fontborder') {
                        return /1px/.test(val) && /solid/.test(val)
                    } else {
                        return  cmdName == 'underline' ? /underline/.test(val) : /line\-through/.test(val);

                    }

                }
            };
        })(p, fonts[p]);
    }
};

// plugins/link.js
/**
 * 超链接
 * @file
 * @since 1.2.6.1
 */

/**
 * 插入超链接
 * @command link
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { Object } options   设置自定义属性，例如：url、title、target
 * @example
 * ```javascript
 * editor.execCommand( 'link', '{
 *     url:'ueditor.baidu.com',
 *     title:'ueditor',
 *     target:'_blank'
 * }' );
 * ```
 */
/**
 * 返回当前选中的第一个超链接节点
 * @command link
 * @method queryCommandValue
 * @param { String } cmd 命令字符串
 * @return { Element } 超链接节点
 * @example
 * ```javascript
 * editor.queryCommandValue( 'link' );
 * ```
 */

/**
 * 取消超链接
 * @command unlink
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'unlink');
 * ```
 */

UE.plugins['link'] = function(){
    function optimize( range ) {
        var start = range.startContainer,end = range.endContainer;

        if ( start = domUtils.findParentByTagName( start, 'a', true ) ) {
            range.setStartBefore( start );
        }
        if ( end = domUtils.findParentByTagName( end, 'a', true ) ) {
            range.setEndAfter( end );
        }
    }


    UE.commands['unlink'] = {
        execCommand : function() {
            var range = this.selection.getRange(),
                bookmark;
            if(range.collapsed && !domUtils.findParentByTagName( range.startContainer, 'a', true )){
                return;
            }
            bookmark = range.createBookmark();
            optimize( range );
            range.removeInlineStyle( 'a' ).moveToBookmark( bookmark ).select();
        },
        queryCommandState : function(){
            return !this.highlight && this.queryCommandValue('link') ?  0 : -1;
        }

    };
    function doLink(range,opt,me){
        var rngClone = range.cloneRange(),
            link = me.queryCommandValue('link');
        optimize( range = range.adjustmentBoundary() );
        var start = range.startContainer;
        if(start.nodeType == 1 && link){
            start = start.childNodes[range.startOffset];
            if(start && start.nodeType == 1 && start.tagName == 'A' && /^(?:https?|ftp|file)\s*:\s*\/\//.test(start[browser.ie?'innerText':'textContent'])){
                start[browser.ie ? 'innerText' : 'textContent'] =  utils.html(opt.textValue||opt.href);

            }
        }
        if( !rngClone.collapsed || link){
            range.removeInlineStyle( 'a' );
            rngClone = range.cloneRange();
        }

        if ( rngClone.collapsed ) {
            var a = range.document.createElement( 'a'),
                text = '';
            if(opt.textValue){

                text =   utils.html(opt.textValue);
                delete opt.textValue;
            }else{
                text =   utils.html(opt.href);

            }
            domUtils.setAttributes( a, opt );
            start =  domUtils.findParentByTagName( rngClone.startContainer, 'a', true );
            if(start && domUtils.isInNodeEndBoundary(rngClone,start)){
                range.setStartAfter(start).collapse(true);

            }
            a[browser.ie ? 'innerText' : 'textContent'] = text;
            range.insertNode(a).selectNode( a );
        } else {
            range.applyInlineStyle( 'a', opt );

        }
    }
    UE.commands['link'] = {
        execCommand : function( cmdName, opt ) {
            var range;
            opt._href && (opt._href = utils.unhtml(opt._href,/[<">]/g));
            opt.href && (opt.href = utils.unhtml(opt.href,/[<">]/g));
            opt.textValue && (opt.textValue = utils.unhtml(opt.textValue,/[<">]/g));
            doLink(range=this.selection.getRange(),opt,this);
            //闭合都不加占位符，如果加了会在a后边多个占位符节点，导致a是图片背景组成的列表，出现空白问题
            range.collapse().select(true);

        },
        queryCommandValue : function() {
            var range = this.selection.getRange(),
                node;
            if ( range.collapsed ) {
//                    node = this.selection.getStart();
                //在ie下getstart()取值偏上了
                node = range.startContainer;
                node = node.nodeType == 1 ? node : node.parentNode;

                if ( node && (node = domUtils.findParentByTagName( node, 'a', true )) && ! domUtils.isInNodeEndBoundary(range,node)) {

                    return node;
                }
            } else {
                //trace:1111  如果是<p><a>xx</a></p> startContainer是p就会找不到a
                range.shrinkBoundary();
                var start = range.startContainer.nodeType  == 3 || !range.startContainer.childNodes[range.startOffset] ? range.startContainer : range.startContainer.childNodes[range.startOffset],
                    end =  range.endContainer.nodeType == 3 || range.endOffset == 0 ? range.endContainer : range.endContainer.childNodes[range.endOffset-1],
                    common = range.getCommonAncestor();
                node = domUtils.findParentByTagName( common, 'a', true );
                if ( !node && common.nodeType == 1){

                    var as = common.getElementsByTagName( 'a' ),
                        ps,pe;

                    for ( var i = 0,ci; ci = as[i++]; ) {
                        ps = domUtils.getPosition( ci, start ),pe = domUtils.getPosition( ci,end);
                        if ( (ps & domUtils.POSITION_FOLLOWING || ps & domUtils.POSITION_CONTAINS)
                            &&
                            (pe & domUtils.POSITION_PRECEDING || pe & domUtils.POSITION_CONTAINS)
                            ) {
                            node = ci;
                            break;
                        }
                    }
                }
                return node;
            }

        },
        queryCommandState : function() {
            //判断如果是视频的话连接不可用
            //fix 853
            var img = this.selection.getRange().getClosedNode(),
                flag = img && (img.className == "edui-faked-video" || img.className.indexOf("edui-upload-video")!=-1);
            return flag ? -1 : 0;
        }
    };
};

// plugins/paragraph.js
/**
 * 段落样式
 * @file
 * @since 1.2.6.1
 */

/**
 * 段落格式
 * @command paragraph
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param {String}   style               标签值为：'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
 * @param {Object}   attrs               标签的属性
 * @example
 * ```javascript
 * editor.execCommand( 'Paragraph','h1','{
 *     class:'test'
 * }' );
 * ```
 */

/**
 * 返回选区内节点标签名
 * @command paragraph
 * @method queryCommandValue
 * @param { String } cmd 命令字符串
 * @return { String } 节点标签名
 * @example
 * ```javascript
 * editor.queryCommandValue( 'Paragraph' );
 * ```
 */

UE.plugins['paragraph'] = function() {
    var me = this,
        block = domUtils.isBlockElm,
        notExchange = ['TD','LI','PRE'],

        doParagraph = function(range,style,attrs,sourceCmdName){
            var bookmark = range.createBookmark(),
                filterFn = function( node ) {
                    return   node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' &&  !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace( node );
                },
                para;

            range.enlarge( true );
            var bookmark2 = range.createBookmark(),
                current = domUtils.getNextDomNode( bookmark2.start, false, filterFn ),
                tmpRange = range.cloneRange(),
                tmpNode;
            while ( current && !(domUtils.getPosition( current, bookmark2.end ) & domUtils.POSITION_FOLLOWING) ) {
                if ( current.nodeType == 3 || !block( current ) ) {
                    tmpRange.setStartBefore( current );
                    while ( current && current !== bookmark2.end && !block( current ) ) {
                        tmpNode = current;
                        current = domUtils.getNextDomNode( current, false, null, function( node ) {
                            return !block( node );
                        } );
                    }
                    tmpRange.setEndAfter( tmpNode );
                    
                    para = range.document.createElement( style );
                    if(attrs){
                        domUtils.setAttributes(para,attrs);
                        if(sourceCmdName && sourceCmdName == 'customstyle' && attrs.style){
                            para.style.cssText = attrs.style;
                        }
                    }
                    para.appendChild( tmpRange.extractContents() );
                    //需要内容占位
                    if(domUtils.isEmptyNode(para)){
                        domUtils.fillChar(range.document,para);
                        
                    }

                    tmpRange.insertNode( para );

                    var parent = para.parentNode;
                    //如果para上一级是一个block元素且不是body,td就删除它
                    if ( block( parent ) && !domUtils.isBody( para.parentNode ) && utils.indexOf(notExchange,parent.tagName)==-1) {
                        //存储dir,style
                        if(!(sourceCmdName && sourceCmdName == 'customstyle')){
                            parent.getAttribute('dir') && para.setAttribute('dir',parent.getAttribute('dir'));
                            //trace:1070
                            parent.style.cssText && (para.style.cssText = parent.style.cssText + ';' + para.style.cssText);
                            //trace:1030
                            parent.style.textAlign && !para.style.textAlign && (para.style.textAlign = parent.style.textAlign);
                            parent.style.textIndent && !para.style.textIndent && (para.style.textIndent = parent.style.textIndent);
                            parent.style.padding && !para.style.padding && (para.style.padding = parent.style.padding);
                        }

                        //trace:1706 选择的就是h1-6要删除
                        if(attrs && /h\d/i.test(parent.tagName) && !/h\d/i.test(para.tagName) ){
                            domUtils.setAttributes(parent,attrs);
                            if(sourceCmdName && sourceCmdName == 'customstyle' && attrs.style){
                                parent.style.cssText = attrs.style;
                            }
                            domUtils.remove(para,true);
                            para = parent;
                        }else{
                            domUtils.remove( para.parentNode, true );
                        }

                    }
                    if(  utils.indexOf(notExchange,parent.tagName)!=-1){
                        current = parent;
                    }else{
                       current = para;
                    }


                    current = domUtils.getNextDomNode( current, false, filterFn );
                } else {
                    current = domUtils.getNextDomNode( current, true, filterFn );
                }
            }
            return range.moveToBookmark( bookmark2 ).moveToBookmark( bookmark );
        };
    me.setOpt('paragraph',{'p':'', 'h1':'', 'h2':'', 'h3':'', 'h4':'', 'h5':'', 'h6':''});
    me.commands['paragraph'] = {
        execCommand : function( cmdName, style,attrs,sourceCmdName ) {
            var range = this.selection.getRange();
             //闭合时单独处理
            if(range.collapsed){
                var txt = this.document.createTextNode('p');
                range.insertNode(txt);
                //去掉冗余的fillchar
                if(browser.ie){
                    var node = txt.previousSibling;
                    if(node && domUtils.isWhitespace(node)){
                        domUtils.remove(node);
                    }
                    node = txt.nextSibling;
                    if(node && domUtils.isWhitespace(node)){
                        domUtils.remove(node);
                    }
                }

            }
            range = doParagraph(range,style,attrs,sourceCmdName);
            if(txt){
                range.setStartBefore(txt).collapse(true);
                pN = txt.parentNode;

                domUtils.remove(txt);

                if(domUtils.isBlockElm(pN)&&domUtils.isEmptyNode(pN)){
                    domUtils.fillNode(this.document,pN);
                }

            }

            if(browser.gecko && range.collapsed && range.startContainer.nodeType == 1){
                var child = range.startContainer.childNodes[range.startOffset];
                if(child && child.nodeType == 1 && child.tagName.toLowerCase() == style){
                    range.setStart(child,0).collapse(true);
                }
            }
            //trace:1097 原来有true，原因忘了，但去了就不能清除多余的占位符了
            range.select();


            return true;
        },
        queryCommandValue : function() {
            var node = domUtils.filterNodeList(this.selection.getStartElementPath(),'p h1 h2 h3 h4 h5 h6');
            return node ? node.tagName.toLowerCase() : '';
        }
    };
};


// plugins/time.js
/**
 * 插入时间和日期
 * @file
 * @since 1.2.6.1
 */

/**
 * 插入时间，默认格式：12:59:59
 * @command time
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'time');
 * ```
 */

/**
 * 插入日期，默认格式：2013-08-30
 * @command date
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'date');
 * ```
 */
UE.commands['time'] = UE.commands["date"] = {
    execCommand : function(cmd, format){
        var date = new Date;

        function formatTime(date, format) {
            var hh = ('0' + date.getHours()).slice(-2),
                ii = ('0' + date.getMinutes()).slice(-2),
                ss = ('0' + date.getSeconds()).slice(-2);
            format = format || 'hh:ii:ss';
            return format.replace(/hh/ig, hh).replace(/ii/ig, ii).replace(/ss/ig, ss);
        }
        function formatDate(date, format) {
            var yyyy = ('000' + date.getFullYear()).slice(-4),
                yy = yyyy.slice(-2),
                mm = ('0' + (date.getMonth()+1)).slice(-2),
                dd = ('0' + date.getDate()).slice(-2);
            format = format || 'yyyy-mm-dd';
            return format.replace(/yyyy/ig, yyyy).replace(/yy/ig, yy).replace(/mm/ig, mm).replace(/dd/ig, dd);
        }

        this.execCommand('insertHtml',cmd == "time" ? formatTime(date, format):formatDate(date, format) );
    }
};


// plugins/rowspacing.js
/**
 * 段前段后间距插件
 * @file
 * @since 1.2.6.1
 */

/**
 * 设置段间距
 * @command rowspacing
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } value 段间距的值，以px为单位
 * @param { String } dir 间距位置，top或bottom，分别表示段前和段后
 * @example
 * ```javascript
 * editor.execCommand( 'rowspacing', '10', 'top' );
 * ```
 */

UE.plugins['rowspacing'] = function(){
    var me = this;
    me.setOpt({
        'rowspacingtop':['5', '10', '15', '20', '25'],
        'rowspacingbottom':['5', '10', '15', '20', '25']

    });
    me.commands['rowspacing'] =  {
        execCommand : function( cmdName,value,dir ) {
            this.execCommand('paragraph','p',{style:'margin-'+dir+':'+value + 'px'});
            return true;
        },
        queryCommandValue : function(cmdName,dir) {
            var pN = domUtils.filterNodeList(this.selection.getStartElementPath(),function(node){return domUtils.isBlockElm(node) }),
                value;
            //trace:1026
            if(pN){
                value = domUtils.getComputedStyle(pN,'margin-'+dir).replace(/[^\d]/g,'');
                return !value ? 0 : value;
            }
            return 0;

        }
    };
};




// plugins/lineheight.js
/**
 * 设置行内间距
 * @file
 * @since 1.2.6.1
 */
UE.plugins['lineheight'] = function(){
    var me = this;
    me.setOpt({'lineheight':['1', '1.5','1.75','2', '3', '4', '5']});

    /**
     * 行距
     * @command lineheight
     * @method execCommand
     * @param { String } cmdName 命令字符串
     * @param { String } value 传入的行高值， 该值是当前字体的倍数， 例如： 1.5, 1.75
     * @example
     * ```javascript
     * editor.execCommand( 'lineheight', 1.5);
     * ```
     */
    /**
     * 查询当前选区内容的行高大小
     * @command lineheight
     * @method queryCommandValue
     * @param { String } cmd 命令字符串
     * @return { String } 返回当前行高大小
     * @example
     * ```javascript
     * editor.queryCommandValue( 'lineheight' );
     * ```
     */

    me.commands['lineheight'] =  {
        execCommand : function( cmdName,value ) {
            this.execCommand('paragraph','p',{style:'line-height:'+ (value == "1" ? "normal" : value + 'em') });
            return true;
        },
        queryCommandValue : function() {
            var pN = domUtils.filterNodeList(this.selection.getStartElementPath(),function(node){return domUtils.isBlockElm(node)});
            if(pN){
                var value = domUtils.getComputedStyle(pN,'line-height');
                return value == 'normal' ? 1 : value.replace(/[^\d.]*/ig,"");
            }
        }
    };
};




// plugins/pagebreak.js
/**
 * 分页功能插件
 * @file
 * @since 1.2.6.1
 */
UE.plugins['pagebreak'] = function () {
    var me = this,
        notBreakTags = ['td'];
    me.setOpt('pageBreakTag','_ueditor_page_break_tag_');

    function fillNode(node){
        if(domUtils.isEmptyBlock(node)){
            var firstChild = node.firstChild,tmpNode;

            while(firstChild && firstChild.nodeType == 1 && domUtils.isEmptyBlock(firstChild)){
                tmpNode = firstChild;
                firstChild = firstChild.firstChild;
            }
            !tmpNode && (tmpNode = node);
            domUtils.fillNode(me.document,tmpNode);
        }
    }
    //分页符样式添加

    me.ready(function(){
        utils.cssRule('pagebreak','.pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}',me.document);
    });
    function isHr(node){
        return node && node.nodeType == 1 && node.tagName == 'HR' && node.className == 'pagebreak';
    }
    me.addInputRule(function(root){
        root.traversal(function(node){
            if(node.type == 'text' && node.data == me.options.pageBreakTag){
                var hr = UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">');
                node.parentNode.insertBefore(hr,node);
                node.parentNode.removeChild(node)
            }
        })
    });
    me.addOutputRule(function(node){
        utils.each(node.getNodesByTagName('hr'),function(n){
            if(n.getAttr('class') == 'pagebreak'){
                var txt = UE.uNode.createText(me.options.pageBreakTag);
                n.parentNode.insertBefore(txt,n);
                n.parentNode.removeChild(n);
            }
        })

    });

    /**
     * 插入分页符
     * @command pagebreak
     * @method execCommand
     * @param { String } cmd 命令字符串
     * @remind 在表格中插入分页符会把表格切分成两部分
     * @remind 获取编辑器内的数据时， 编辑器会把分页符转换成“_ueditor_page_break_tag_”字符串，
     *          以便于提交数据到服务器端后处理分页。
     * @example
     * ```javascript
     * editor.execCommand( 'pagebreak'); //插入一个hr标签，带有样式类名pagebreak
     * ```
     */

    me.commands['pagebreak'] = {
        execCommand:function () {
            var range = me.selection.getRange(),hr = me.document.createElement('hr');
            domUtils.setAttributes(hr,{
                'class' : 'pagebreak',
                noshade:"noshade",
                size:"5"
            });
            domUtils.unSelectable(hr);
            //table单独处理
            var node = domUtils.findParentByTagName(range.startContainer, notBreakTags, true),

                parents = [], pN;
            if (node) {
                switch (node.tagName) {
                    case 'TD':
                        pN = node.parentNode;
                        if (!pN.previousSibling) {
                            var table = domUtils.findParentByTagName(pN, 'table');
//                            var tableWrapDiv = table.parentNode;
//                            if(tableWrapDiv && tableWrapDiv.nodeType == 1
//                                && tableWrapDiv.tagName == 'DIV'
//                                && tableWrapDiv.getAttribute('dropdrag')
//                                ){
//                                domUtils.remove(tableWrapDiv,true);
//                            }
                            table.parentNode.insertBefore(hr, table);
                            parents = domUtils.findParents(hr, true);

                        } else {
                            pN.parentNode.insertBefore(hr, pN);
                            parents = domUtils.findParents(hr);

                        }
                        pN = parents[1];
                        if (hr !== pN) {
                            domUtils.breakParent(hr, pN);

                        }
                        //table要重写绑定一下拖拽
                        me.fireEvent('afteradjusttable',me.document);
                }

            } else {

                if (!range.collapsed) {
                    range.deleteContents();
                    var start = range.startContainer;
                    while ( !domUtils.isBody(start) && domUtils.isBlockElm(start) && domUtils.isEmptyNode(start)) {
                        range.setStartBefore(start).collapse(true);
                        domUtils.remove(start);
                        start = range.startContainer;
                    }

                }
                range.insertNode(hr);

                var pN = hr.parentNode, nextNode;
                while (!domUtils.isBody(pN)) {
                    domUtils.breakParent(hr, pN);
                    nextNode = hr.nextSibling;
                    if (nextNode && domUtils.isEmptyBlock(nextNode)) {
                        domUtils.remove(nextNode);
                    }
                    pN = hr.parentNode;
                }
                nextNode = hr.nextSibling;
                var pre = hr.previousSibling;
                if(isHr(pre)){
                    domUtils.remove(pre);
                }else{
                    pre && fillNode(pre);
                }

                if(!nextNode){
                    var p = me.document.createElement('p');

                    hr.parentNode.appendChild(p);
                    domUtils.fillNode(me.document,p);
                    range.setStart(p,0).collapse(true);
                }else{
                    if(isHr(nextNode)){
                        domUtils.remove(nextNode);
                    }else{
                        fillNode(nextNode);
                    }
                    range.setEndAfter(hr).collapse(false);
                }

                range.select(true);

            }

        }
    };
};

// plugins/dragdrop.js
UE.plugins['dragdrop'] = function (){

    var me = this;
    me.ready(function(){
        domUtils.on(this.body,'dragend',function(){
            var rng = me.selection.getRange();
            var node = rng.getClosedNode()||me.selection.getStart();

            if(node && node.tagName == 'IMG'){

                var pre = node.previousSibling,next;
                while(next = node.nextSibling){
                    if(next.nodeType == 1 && next.tagName == 'SPAN' && !next.firstChild){
                        domUtils.remove(next)
                    }else{
                        break;
                    }
                }


                if((pre && pre.nodeType == 1 && !domUtils.isEmptyBlock(pre) || !pre) && (!next || next && !domUtils.isEmptyBlock(next))){
                    if(pre && pre.tagName == 'P' && !domUtils.isEmptyBlock(pre)){
                        pre.appendChild(node);
                        domUtils.moveChild(next,pre);
                        domUtils.remove(next);
                    }else  if(next && next.tagName == 'P' && !domUtils.isEmptyBlock(next)){
                        next.insertBefore(node,next.firstChild);
                    }

                    if(pre && pre.tagName == 'P' && domUtils.isEmptyBlock(pre)){
                        domUtils.remove(pre)
                    }
                    if(next && next.tagName == 'P' && domUtils.isEmptyBlock(next)){
                        domUtils.remove(next)
                    }
                    rng.selectNode(node).select();
                    me.fireEvent('saveScene');

                }

            }

        })
    });
    me.addListener('keyup', function(type, evt) {
        var keyCode = evt.keyCode || evt.which;
        if (keyCode == 13) {
            var rng = me.selection.getRange(),node;
            if(node = domUtils.findParentByTagName(rng.startContainer,'p',true)){
                if(domUtils.getComputedStyle(node,'text-align') == 'center'){
                    domUtils.removeStyle(node,'text-align')
                }
            }
        }
    })
};


// plugins/undo.js
/**
 * undo redo
 * @file
 * @since 1.2.6.1
 */

/**
 * 撤销上一次执行的命令
 * @command undo
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'undo' );
 * ```
 */

/**
 * 重做上一次执行的命令
 * @command redo
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'redo' );
 * ```
 */

UE.plugins['undo'] = function () {
    var saveSceneTimer;
    var me = this,
        maxUndoCount = me.options.maxUndoCount || 20,
        maxInputCount = me.options.maxInputCount || 20,
        fillchar = new RegExp(domUtils.fillChar + '|<\/hr>', 'gi');// ie会产生多余的</hr>
    var noNeedFillCharTags = {
        ol:1,ul:1,table:1,tbody:1,tr:1,body:1
    };
    var orgState = me.options.autoClearEmptyNode;
    function compareAddr(indexA, indexB) {
        if (indexA.length != indexB.length)
            return 0;
        for (var i = 0, l = indexA.length; i < l; i++) {
            if (indexA[i] != indexB[i])
                return 0
        }
        return 1;
    }

    function compareRangeAddress(rngAddrA, rngAddrB) {
        if (rngAddrA.collapsed != rngAddrB.collapsed) {
            return 0;
        }
        if (!compareAddr(rngAddrA.startAddress, rngAddrB.startAddress) || !compareAddr(rngAddrA.endAddress, rngAddrB.endAddress)) {
            return 0;
        }
        return 1;
    }

    function UndoManager() {
        this.list = [];
        this.index = 0;
        this.hasUndo = false;
        this.hasRedo = false;
        this.undo = function () {
            if (this.hasUndo) {
                if (!this.list[this.index - 1] && this.list.length == 1) {
                    this.reset();
                    return;
                }
                while (this.list[this.index].content == this.list[this.index - 1].content) {
                    this.index--;
                    if (this.index == 0) {
                        return this.restore(0);
                    }
                }
                this.restore(--this.index);
            }
        };
        this.redo = function () {
            if (this.hasRedo) {
                while (this.list[this.index].content == this.list[this.index + 1].content) {
                    this.index++;
                    if (this.index == this.list.length - 1) {
                        return this.restore(this.index);
                    }
                }
                this.restore(++this.index);
            }
        };

        this.restore = function () {
            var me = this.editor;
            var scene = this.list[this.index];
            var root = UE.htmlparser(scene.content.replace(fillchar, ''));
            me.options.autoClearEmptyNode = false;
            me.filterInputRule(root);
            me.options.autoClearEmptyNode = orgState;
            //trace:873
            //去掉展位符
            me.document.body.innerHTML = root.toHtml();
            me.fireEvent('afterscencerestore');
            //处理undo后空格不展位的问题
            if (browser.ie) {
                utils.each(domUtils.getElementsByTagName(me.document,'td th caption p'),function(node){
                    if(domUtils.isEmptyNode(node)){
                        domUtils.fillNode(me.document, node);
                    }
                })
            }

            try{
                var rng = new dom.Range(me.document).moveToAddress(scene.address);
                rng.select(noNeedFillCharTags[rng.startContainer.nodeName.toLowerCase()]);
            }catch(e){}

            this.update();
            this.clearKey();
            //不能把自己reset了
            me.fireEvent('reset', true);
        };

        this.getScene = function () {
            var me = this.editor;
            var rng = me.selection.getRange(),
                rngAddress = rng.createAddress(false,true);
            me.fireEvent('beforegetscene');
            var root = UE.htmlparser(me.body.innerHTML);
            me.options.autoClearEmptyNode = false;
            me.filterOutputRule(root);
            me.options.autoClearEmptyNode = orgState;
            var cont = root.toHtml();
            //trace:3461
            //这个会引起回退时导致空格丢失的情况
//            browser.ie && (cont = cont.replace(/>&nbsp;</g, '><').replace(/\s*</g, '<').replace(/>\s*/g, '>'));
            me.fireEvent('aftergetscene');

            return {
                address:rngAddress,
                content:cont
            }
        };
        this.save = function (notCompareRange,notSetCursor) {
            clearTimeout(saveSceneTimer);
            var currentScene = this.getScene(notSetCursor),
                lastScene = this.list[this.index];

            if(lastScene && lastScene.content != currentScene.content){
                me.trigger('contentchange')
            }
            //内容相同位置相同不存
            if (lastScene && lastScene.content == currentScene.content &&
                ( notCompareRange ? 1 : compareRangeAddress(lastScene.address, currentScene.address) )
                ) {
                return;
            }
            this.list = this.list.slice(0, this.index + 1);
            this.list.push(currentScene);
            //如果大于最大数量了，就把最前的剔除
            if (this.list.length > maxUndoCount) {
                this.list.shift();
            }
            this.index = this.list.length - 1;
            this.clearKey();
            //跟新undo/redo状态
            this.update();

        };
        this.update = function () {
            this.hasRedo = !!this.list[this.index + 1];
            this.hasUndo = !!this.list[this.index - 1];
        };
        this.reset = function () {
            this.list = [];
            this.index = 0;
            this.hasUndo = false;
            this.hasRedo = false;
            this.clearKey();
        };
        this.clearKey = function () {
            keycont = 0;
            lastKeyCode = null;
        };
    }

    me.undoManger = new UndoManager();
    me.undoManger.editor = me;
    function saveScene() {
        this.undoManger.save();
    }

    me.addListener('saveScene', function () {
        var args = Array.prototype.splice.call(arguments,1);
        this.undoManger.save.apply(this.undoManger,args);
    });

//    me.addListener('beforeexeccommand', saveScene);
//    me.addListener('afterexeccommand', saveScene);

    me.addListener('reset', function (type, exclude) {
        if (!exclude) {
            this.undoManger.reset();
        }
    });
    me.commands['redo'] = me.commands['undo'] = {
        execCommand:function (cmdName) {
            this.undoManger[cmdName]();
        },
        queryCommandState:function (cmdName) {
            return this.undoManger['has' + (cmdName.toLowerCase() == 'undo' ? 'Undo' : 'Redo')] ? 0 : -1;
        },
        notNeedUndo:1
    };

    var keys = {
            //  /*Backspace*/ 8:1, /*Delete*/ 46:1,
            /*Shift*/ 16:1, /*Ctrl*/ 17:1, /*Alt*/ 18:1,
            37:1, 38:1, 39:1, 40:1

        },
        keycont = 0,
        lastKeyCode;
    //输入法状态下不计算字符数
    var inputType = false;
    me.addListener('ready', function () {
        domUtils.on(this.body, 'compositionstart', function () {
            inputType = true;
        });
        domUtils.on(this.body, 'compositionend', function () {
            inputType = false;
        })
    });
    //快捷键
    me.addshortcutkey({
        "Undo":"ctrl+90", //undo
        "Redo":"ctrl+89" //redo

    });
    var isCollapsed = true;
    me.addListener('keydown', function (type, evt) {

        var me = this;
        var keyCode = evt.keyCode || evt.which;
        if (!keys[keyCode] && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
            if (inputType)
                return;

            if(!me.selection.getRange().collapsed){
                me.undoManger.save(false,true);
                isCollapsed = false;
                return;
            }
            if (me.undoManger.list.length == 0) {
                me.undoManger.save(true);
            }
            clearTimeout(saveSceneTimer);
            function save(cont){
                cont.undoManger.save(false,true);
                cont.fireEvent('selectionchange');
            }
            saveSceneTimer = setTimeout(function(){
                if(inputType){
                    var interalTimer = setInterval(function(){
                        if(!inputType){
                            save(me);
                            clearInterval(interalTimer)
                        }
                    },300)
                    return;
                }
                save(me);
            },200);

            lastKeyCode = keyCode;
            keycont++;
            if (keycont >= maxInputCount ) {
                save(me)
            }
        }
    });
    me.addListener('keyup', function (type, evt) {
        var keyCode = evt.keyCode || evt.which;
        if (!keys[keyCode] && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
            if (inputType)
                return;
            if(!isCollapsed){
                this.undoManger.save(false,true);
                isCollapsed = true;
            }
        }
    });
    //扩展实例，添加关闭和开启命令undo
    me.stopCmdUndo = function(){
        me.__hasEnterExecCommand = true;
    };
    me.startCmdUndo = function(){
        me.__hasEnterExecCommand = false;
    }
};


// plugins/paste.js
///import core
///import plugins/inserthtml.js
///import plugins/undo.js
///import plugins/serialize.js
///commands 粘贴
///commandsName  PastePlain
///commandsTitle  纯文本粘贴模式
/**
 * @description 粘贴
 * @author zhanyi
 */
UE.plugins['paste'] = function () {
    function getClipboardData(callback) {
        var doc = this.document;
        if (doc.getElementById('baidu_pastebin')) {
            return;
        }
        var range = this.selection.getRange(),
            bk = range.createBookmark(),
        //创建剪贴的容器div
            pastebin = doc.createElement('div');
        pastebin.id = 'baidu_pastebin';
        // Safari 要求div必须有内容，才能粘贴内容进来
        browser.webkit && pastebin.appendChild(doc.createTextNode(domUtils.fillChar + domUtils.fillChar));
        doc.body.appendChild(pastebin);
        //trace:717 隐藏的span不能得到top
        //bk.start.innerHTML = '&nbsp;';
        bk.start.style.display = '';
        pastebin.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" +
            //要在现在光标平行的位置加入，否则会出现跳动的问题
            domUtils.getXY(bk.start).y + 'px';

        range.selectNodeContents(pastebin).select(true);

        setTimeout(function () {
            if (browser.webkit) {
                for (var i = 0, pastebins = doc.querySelectorAll('#baidu_pastebin'), pi; pi = pastebins[i++];) {
                    if (domUtils.isEmptyNode(pi)) {
                        domUtils.remove(pi);
                    } else {
                        pastebin = pi;
                        break;
                    }
                }
            }
            try {
                pastebin.parentNode.removeChild(pastebin);
            } catch (e) {
            }
            range.moveToBookmark(bk).select(true);
            callback(pastebin);
        }, 0);
    }

    var me = this;

    me.setOpt({
        retainOnlyLabelPasted : false
    });

    var txtContent, htmlContent, address;

    function getPureHtml(html){
        return html.replace(/<(\/?)([\w\-]+)([^>]*)>/gi, function (a, b, tagName, attrs) {
            tagName = tagName.toLowerCase();
            if ({img: 1}[tagName]) {
                return a;
            }
            attrs = attrs.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi, function (str, atr, val) {
                if ({
                    'src': 1,
                    'href': 1,
                    'name': 1
                }[atr.toLowerCase()]) {
                    return atr + '=' + val + ' '
                }
                return ''
            });
            if ({
                'span': 1,
                'div': 1
            }[tagName]) {
                return ''
            } else {

                return '<' + b + tagName + ' ' + utils.trim(attrs) + '>'
            }

        });
    }
    function filter(div) {
        var html;
        if (div.firstChild) {
            //去掉cut中添加的边界值
            var nodes = domUtils.getElementsByTagName(div, 'span');
            for (var i = 0, ni; ni = nodes[i++];) {
                if (ni.id == '_baidu_cut_start' || ni.id == '_baidu_cut_end') {
                    domUtils.remove(ni);
                }
            }

            if (browser.webkit) {

                var brs = div.querySelectorAll('div br');
                for (var i = 0, bi; bi = brs[i++];) {
                    var pN = bi.parentNode;
                    if (pN.tagName == 'DIV' && pN.childNodes.length == 1) {
                        pN.innerHTML = '<p><br/></p>';
                        domUtils.remove(pN);
                    }
                }
                var divs = div.querySelectorAll('#baidu_pastebin');
                for (var i = 0, di; di = divs[i++];) {
                    var tmpP = me.document.createElement('p');
                    di.parentNode.insertBefore(tmpP, di);
                    while (di.firstChild) {
                        tmpP.appendChild(di.firstChild);
                    }
                    domUtils.remove(di);
                }

                var metas = div.querySelectorAll('meta');
                for (var i = 0, ci; ci = metas[i++];) {
                    domUtils.remove(ci);
                }

                var brs = div.querySelectorAll('br');
                for (i = 0; ci = brs[i++];) {
                    if (/^apple-/i.test(ci.className)) {
                        domUtils.remove(ci);
                    }
                }
            }
            if (browser.gecko) {
                var dirtyNodes = div.querySelectorAll('[_moz_dirty]');
                for (i = 0; ci = dirtyNodes[i++];) {
                    ci.removeAttribute('_moz_dirty');
                }
            }
            if (!browser.ie) {
                var spans = div.querySelectorAll('span.Apple-style-span');
                for (var i = 0, ci; ci = spans[i++];) {
                    domUtils.remove(ci, true);
                }
            }

            //ie下使用innerHTML会产生多余的\r\n字符，也会产生&nbsp;这里过滤掉
            html = div.innerHTML;//.replace(/>(?:(\s|&nbsp;)*?)</g,'><');

            //过滤word粘贴过来的冗余属性
            html = UE.filterWord(html);
            //取消了忽略空白的第二个参数，粘贴过来的有些是有空白的，会被套上相关的标签
            var root = UE.htmlparser(html);
            //如果给了过滤规则就先进行过滤
            if (me.options.filterRules) {
                UE.filterNode(root, me.options.filterRules);
            }
            //执行默认的处理
            me.filterInputRule(root);
            //针对chrome的处理
            if (browser.webkit) {
                var br = root.lastChild();
                if (br && br.type == 'element' && br.tagName == 'br') {
                    root.removeChild(br)
                }
                utils.each(me.body.querySelectorAll('div'), function (node) {
                    if (domUtils.isEmptyBlock(node)) {
                        domUtils.remove(node,true)
                    }
                })
            }
            html = {'html': root.toHtml()};
            me.fireEvent('beforepaste', html, root);
            //抢了默认的粘贴，那后边的内容就不执行了，比如表格粘贴
            if(!html.html){
                return;
            }
            root = UE.htmlparser(html.html,true);
            //如果开启了纯文本模式
            if (me.queryCommandState('pasteplain') === 1) {
                me.execCommand('insertHtml', UE.filterNode(root, me.options.filterTxtRules).toHtml(), true);
            } else {
                //文本模式
                UE.filterNode(root, me.options.filterTxtRules);
                txtContent = root.toHtml();
                //完全模式
                htmlContent = html.html;

                address = me.selection.getRange().createAddress(true);
                me.execCommand('insertHtml', me.getOpt('retainOnlyLabelPasted') === true ?  getPureHtml(htmlContent) : htmlContent, true);
            }
            me.fireEvent("afterpaste", html);
        }
    }

    me.addListener('pasteTransfer', function (cmd, plainType) {

        if (address && txtContent && htmlContent && txtContent != htmlContent) {
            var range = me.selection.getRange();
            range.moveToAddress(address, true);

            if (!range.collapsed) {

                while (!domUtils.isBody(range.startContainer)
                    ) {
                    var start = range.startContainer;
                    if(start.nodeType == 1){
                        start = start.childNodes[range.startOffset];
                        if(!start){
                            range.setStartBefore(range.startContainer);
                            continue;
                        }
                        var pre = start.previousSibling;

                        if(pre && pre.nodeType == 3 && new RegExp('^[\n\r\t '+domUtils.fillChar+']*$').test(pre.nodeValue)){
                            range.setStartBefore(pre)
                        }
                    }
                    if(range.startOffset == 0){
                        range.setStartBefore(range.startContainer);
                    }else{
                        break;
                    }

                }
                while (!domUtils.isBody(range.endContainer)
                    ) {
                    var end = range.endContainer;
                    if(end.nodeType == 1){
                        end = end.childNodes[range.endOffset];
                        if(!end){
                            range.setEndAfter(range.endContainer);
                            continue;
                        }
                        var next = end.nextSibling;
                        if(next && next.nodeType == 3 && new RegExp('^[\n\r\t'+domUtils.fillChar+']*$').test(next.nodeValue)){
                            range.setEndAfter(next)
                        }
                    }
                    if(range.endOffset == range.endContainer[range.endContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length){
                        range.setEndAfter(range.endContainer);
                    }else{
                        break;
                    }

                }

            }

            range.deleteContents();
            range.select(true);
            me.__hasEnterExecCommand = true;
            var html = htmlContent;
            if (plainType === 2 ) {
                html = getPureHtml(html);
            } else if (plainType) {
                html = txtContent;
            }
            me.execCommand('inserthtml', html, true);
            me.__hasEnterExecCommand = false;
            var rng = me.selection.getRange();
            while (!domUtils.isBody(rng.startContainer) && !rng.startOffset &&
                rng.startContainer[rng.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length
                ) {
                rng.setStartBefore(rng.startContainer);
            }
            var tmpAddress = rng.createAddress(true);
            address.endAddress = tmpAddress.startAddress;
        }
    });

    me.addListener('ready', function () {
        domUtils.on(me.body, 'cut', function () {
            var range = me.selection.getRange();
            if (!range.collapsed && me.undoManger) {
                me.undoManger.save();
            }
        });

        //ie下beforepaste在点击右键时也会触发，所以用监控键盘才处理
        domUtils.on(me.body, browser.ie || browser.opera ? 'keydown' : 'paste', function (e) {
            if ((browser.ie || browser.opera) && ((!e.ctrlKey && !e.metaKey) || e.keyCode != '86')) {
                return;
            }
            getClipboardData.call(me, function (div) {
                filter(div);
            });
        });

    });

    me.commands['paste'] = {
        execCommand: function (cmd) {
            if (browser.ie) {
                getClipboardData.call(me, function (div) {
                    filter(div);
                });
                me.document.execCommand('paste');
            } else {
                alert(me.getLang('pastemsg'));
            }
        }
    }
};



// plugins/puretxtpaste.js
/**
 * 纯文本粘贴插件
 * @file
 * @since 1.2.6.1
 */

UE.plugins['pasteplain'] = function(){
    var me = this;
    me.setOpt({
        'pasteplain':false,
        'filterTxtRules' : function(){
            function transP(node){
                node.tagName = 'p';
                node.setStyle();
            }
            function removeNode(node){
                node.parentNode.removeChild(node,true)
            }
            return {
                //直接删除及其字节点内容
                '-' : 'script style object iframe embed input select',
                'p': {$:{}},
                'br':{$:{}},
                div: function (node) {
                    var tmpNode, p = UE.uNode.createElement('p');
                    while (tmpNode = node.firstChild()) {
                        if (tmpNode.type == 'text' || !UE.dom.dtd.$block[tmpNode.tagName]) {
                            p.appendChild(tmpNode);
                        } else {
                            if (p.firstChild()) {
                                node.parentNode.insertBefore(p, node);
                                p = UE.uNode.createElement('p');
                            } else {
                                node.parentNode.insertBefore(tmpNode, node);
                            }
                        }
                    }
                    if (p.firstChild()) {
                        node.parentNode.insertBefore(p, node);
                    }
                    node.parentNode.removeChild(node);
                },
                ol: removeNode,
                ul: removeNode,
                dl:removeNode,
                dt:removeNode,
                dd:removeNode,
                'li':removeNode,
                'caption':transP,
                'th':transP,
                'tr':transP,
                'h1':transP,'h2':transP,'h3':transP,'h4':transP,'h5':transP,'h6':transP,
                'td':function(node){
                        //没有内容的td直接删掉
                        var txt = !!node.innerText();
                        if(txt){
                         node.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'),node);
                    }
                    node.parentNode.removeChild(node,node.innerText())
                }
            }
        }()
    });
    //暂时这里支持一下老版本的属性
    var pasteplain = me.options.pasteplain;

    /**
     * 启用或取消纯文本粘贴模式
     * @command pasteplain
     * @method execCommand
     * @param { String } cmd 命令字符串
     * @example
     * ```javascript
     * editor.queryCommandState( 'pasteplain' );
     * ```
     */

    /**
     * 查询当前是否处于纯文本粘贴模式
     * @command pasteplain
     * @method queryCommandState
     * @param { String } cmd 命令字符串
     * @return { int } 如果处于纯文本模式，返回1，否则，返回0
     * @example
     * ```javascript
     * editor.queryCommandState( 'pasteplain' );
     * ```
     */
    me.commands['pasteplain'] = {
        queryCommandState: function (){
            return pasteplain ? 1 : 0;
        },
        execCommand: function (){
            pasteplain = !pasteplain|0;
        },
        notNeedUndo : 1
    };
};

// plugins/list.js
/**
 * 有序列表,无序列表插件
 * @file
 * @since 1.2.6.1
 */

UE.plugins['list'] = function () {
    var me = this,
        notExchange = {
            'TD':1,
            'PRE':1,
            'BLOCKQUOTE':1
        };
    var customStyle = {
        'cn' : 'cn-1-',
        'cn1' : 'cn-2-',
        'cn2' : 'cn-3-',
        'num':  'num-1-',
        'num1' : 'num-2-',
        'num2' : 'num-3-',
        'dash'  : 'dash',
        'dot':'dot'
    };

    me.setOpt( {
        'autoTransWordToList':false,
        'insertorderedlist':{
            'num':'',
            'num1':'',
            'num2':'',
            'cn':'',
            'cn1':'',
            'cn2':'',
            'decimal':'',
            'lower-alpha':'',
            'lower-roman':'',
            'upper-alpha':'',
            'upper-roman':''
        },
        'insertunorderedlist':{
            'circle':'',
            'disc':'',
            'square':'',
            'dash' : '',
            'dot':''
        },
        listDefaultPaddingLeft : '30',
        listiconpath : 'http://bs.baidu.com/listicon/',
        maxListLevel : -1,//-1不限制
        disablePInList:false
    } );
    function listToArray(list){
        var arr = [];
        for(var p in list){
            arr.push(p)
        }
        return arr;
    }
    var listStyle = {
        'OL':listToArray(me.options.insertorderedlist),
        'UL':listToArray(me.options.insertunorderedlist)
    };
    var liiconpath = me.options.listiconpath;

    //根据用户配置，调整customStyle
    for(var s in customStyle){
        if(!me.options.insertorderedlist.hasOwnProperty(s) && !me.options.insertunorderedlist.hasOwnProperty(s)){
            delete customStyle[s];
        }
    }

    me.ready(function () {
        var customCss = [];
        for(var p in customStyle){
            if(p == 'dash' || p == 'dot'){
                customCss.push('li.list-' + customStyle[p] + '{background-image:url(' + liiconpath +customStyle[p]+'.gif)}');
                customCss.push('ul.custom_'+p+'{list-style:none;}ul.custom_'+p+' li{background-position:0 3px;background-repeat:no-repeat}');
            }else{
                for(var i= 0;i<99;i++){
                    customCss.push('li.list-' + customStyle[p] + i + '{background-image:url(' + liiconpath + 'list-'+customStyle[p] + i + '.gif)}')
                }
                customCss.push('ol.custom_'+p+'{list-style:none;}ol.custom_'+p+' li{background-position:0 3px;background-repeat:no-repeat}');
            }
            switch(p){
                case 'cn':
                    customCss.push('li.list-'+p+'-paddingleft-1{padding-left:25px}');
                    customCss.push('li.list-'+p+'-paddingleft-2{padding-left:40px}');
                    customCss.push('li.list-'+p+'-paddingleft-3{padding-left:55px}');
                    break;
                case 'cn1':
                    customCss.push('li.list-'+p+'-paddingleft-1{padding-left:30px}');
                    customCss.push('li.list-'+p+'-paddingleft-2{padding-left:40px}');
                    customCss.push('li.list-'+p+'-paddingleft-3{padding-left:55px}');
                    break;
                case 'cn2':
                    customCss.push('li.list-'+p+'-paddingleft-1{padding-left:40px}');
                    customCss.push('li.list-'+p+'-paddingleft-2{padding-left:55px}');
                    customCss.push('li.list-'+p+'-paddingleft-3{padding-left:68px}');
                    break;
                case 'num':
                case 'num1':
                    customCss.push('li.list-'+p+'-paddingleft-1{padding-left:25px}');
                    break;
                case 'num2':
                    customCss.push('li.list-'+p+'-paddingleft-1{padding-left:35px}');
                    customCss.push('li.list-'+p+'-paddingleft-2{padding-left:40px}');
                    break;
                case 'dash':
                    customCss.push('li.list-'+p+'-paddingleft{padding-left:35px}');
                    break;
                case 'dot':
                    customCss.push('li.list-'+p+'-paddingleft{padding-left:20px}');
            }
        }
        customCss.push('.list-paddingleft-1{padding-left:0}');
        customCss.push('.list-paddingleft-2{padding-left:'+me.options.listDefaultPaddingLeft+'px}');
        customCss.push('.list-paddingleft-3{padding-left:'+me.options.listDefaultPaddingLeft*2+'px}');
        //如果不给宽度会在自定应样式里出现滚动条
        utils.cssRule('list', 'ol,ul{margin:0;pading:0;'+(browser.ie ? '' : 'width:95%')+'}li{clear:both;}'+customCss.join('\n'), me.document);
    });
    //单独处理剪切的问题
    me.ready(function(){
        domUtils.on(me.body,'cut',function(){
            setTimeout(function(){
                var rng = me.selection.getRange(),li;
                //trace:3416
                if(!rng.collapsed){
                    if(li = domUtils.findParentByTagName(rng.startContainer,'li',true)){
                        if(!li.nextSibling && domUtils.isEmptyBlock(li)){
                            var pn = li.parentNode,node;
                            if(node = pn.previousSibling){
                                domUtils.remove(pn);
                                rng.setStartAtLast(node).collapse(true);
                                rng.select(true);
                            }else if(node = pn.nextSibling){
                                domUtils.remove(pn);
                                rng.setStartAtFirst(node).collapse(true);
                                rng.select(true);
                            }else{
                                var tmpNode = me.document.createElement('p');
                                domUtils.fillNode(me.document,tmpNode);
                                pn.parentNode.insertBefore(tmpNode,pn);
                                domUtils.remove(pn);
                                rng.setStart(tmpNode,0).collapse(true);
                                rng.select(true);
                            }
                        }
                    }
                }

            })
        })
    });

    function getStyle(node){
        var cls = node.className;
        if(domUtils.hasClass(node,/custom_/)){
            return cls.match(/custom_(\w+)/)[1]
        }
        return domUtils.getStyle(node, 'list-style-type')

    }

    me.addListener('beforepaste',function(type,html){
        var me = this,
            rng = me.selection.getRange(),li;
        var root = UE.htmlparser(html.html,true);
        if(li = domUtils.findParentByTagName(rng.startContainer,'li',true)){
            var list = li.parentNode,tagName = list.tagName == 'OL' ? 'ul':'ol';
            utils.each(root.getNodesByTagName(tagName),function(n){
                n.tagName = list.tagName;
                n.setAttr();
                if(n.parentNode === root){
                    type = getStyle(list) || (list.tagName == 'OL' ? 'decimal' : 'disc')
                }else{
                    var className = n.parentNode.getAttr('class');
                    if(className && /custom_/.test(className)){
                        type = className.match(/custom_(\w+)/)[1]
                    }else{
                        type = n.parentNode.getStyle('list-style-type');
                    }
                    if(!type){
                        type = list.tagName == 'OL' ? 'decimal' : 'disc';
                    }
                }
                var index = utils.indexOf(listStyle[list.tagName], type);
                if(n.parentNode !== root)
                    index = index + 1 == listStyle[list.tagName].length ? 0 : index + 1;
                var currentStyle = listStyle[list.tagName][index];
                if(customStyle[currentStyle]){
                    n.setAttr('class', 'custom_' + currentStyle)

                }else{
                    n.setStyle('list-style-type',currentStyle)
                }
            })

        }

        html.html = root.toHtml();
    });
    //导出时，去掉p标签
    me.getOpt('disablePInList') === true && me.addOutputRule(function(root){
        utils.each(root.getNodesByTagName('li'),function(li){
            var newChildrens = [],index=0;
            utils.each(li.children,function(n){
                if(n.tagName == 'p'){
                    var tmpNode;
                    while(tmpNode = n.children.pop()) {
                        newChildrens.splice(index,0,tmpNode);
                        tmpNode.parentNode = li;
                        lastNode = tmpNode;
                    }
                    tmpNode = newChildrens[newChildrens.length-1];
                    if(!tmpNode || tmpNode.type != 'element' || tmpNode.tagName != 'br'){
                        var br = UE.uNode.createElement('br');
                        br.parentNode = li;
                        newChildrens.push(br);
                    }

                    index = newChildrens.length;
                }
            });
            if(newChildrens.length){
                li.children = newChildrens;
            }
        });
    });
    //进入编辑器的li要套p标签
    me.addInputRule(function(root){
        utils.each(root.getNodesByTagName('li'),function(li){
            var tmpP = UE.uNode.createElement('p');
            for(var i= 0,ci;ci=li.children[i];){
                if(ci.type == 'text' || dtd.p[ci.tagName]){
                    tmpP.appendChild(ci);
                }else{
                    if(tmpP.firstChild()){
                        li.insertBefore(tmpP,ci);
                        tmpP = UE.uNode.createElement('p');
                        i = i + 2;
                    }else{
                        i++;
                    }

                }
            }
            if(tmpP.firstChild() && !tmpP.parentNode || !li.firstChild()){
                li.appendChild(tmpP);
            }
            //trace:3357
            //p不能为空
            if (!tmpP.firstChild()) {
                tmpP.innerHTML(browser.ie ? '&nbsp;' : '<br/>')
            }
            //去掉末尾的空白
            var p = li.firstChild();
            var lastChild = p.lastChild();
            if(lastChild && lastChild.type == 'text' && /^\s*$/.test(lastChild.data)){
                p.removeChild(lastChild)
            }
        });
        if(me.options.autoTransWordToList){
            var orderlisttype = {
                    'num1':/^\d+\)/,
                    'decimal':/^\d+\./,
                    'lower-alpha':/^[a-z]+\)/,
                    'upper-alpha':/^[A-Z]+\./,
                    'cn':/^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,
                    'cn2':/^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/
                },
                unorderlisttype = {
                    'square':'n'
                };
            function checkListType(content,container){
                var span = container.firstChild();
                if(span &&  span.type == 'element' && span.tagName == 'span' && /Wingdings|Symbol/.test(span.getStyle('font-family'))){
                    for(var p in unorderlisttype){
                        if(unorderlisttype[p] == span.data){
                            return p
                        }
                    }
                    return 'disc'
                }
                for(var p in orderlisttype){
                    if(orderlisttype[p].test(content)){
                        return p;
                    }
                }

            }
            utils.each(root.getNodesByTagName('p'),function(node){
                if(node.getAttr('class') != 'MsoListParagraph'){
                    return
                }

                //word粘贴过来的会带有margin要去掉,但这样也可能会误命中一些央视
                node.setStyle('margin','');
                node.setStyle('margin-left','');
                node.setAttr('class','');

                function appendLi(list,p,type){
                    if(list.tagName == 'ol'){
                        if(browser.ie){
                            var first = p.firstChild();
                            if(first.type =='element' && first.tagName == 'span' && orderlisttype[type].test(first.innerText())){
                                p.removeChild(first);
                            }
                        }else{
                            p.innerHTML(p.innerHTML().replace(orderlisttype[type],''));
                        }
                    }else{
                        p.removeChild(p.firstChild())
                    }

                    var li = UE.uNode.createElement('li');
                    li.appendChild(p);
                    list.appendChild(li);
                }
                var tmp = node,type,cacheNode = node;

                if(node.parentNode.tagName != 'li' && (type = checkListType(node.innerText(),node))){

                    var list = UE.uNode.createElement(me.options.insertorderedlist.hasOwnProperty(type) ? 'ol' : 'ul');
                    if(customStyle[type]){
                        list.setAttr('class','custom_'+type)
                    }else{
                        list.setStyle('list-style-type',type)
                    }
                    while(node && node.parentNode.tagName != 'li' && checkListType(node.innerText(),node)){
                        tmp = node.nextSibling();
                        if(!tmp){
                            node.parentNode.insertBefore(list,node)
                        }
                        appendLi(list,node,type);
                        node = tmp;
                    }
                    if(!list.parentNode && node && node.parentNode){
                        node.parentNode.insertBefore(list,node)
                    }
                }
                var span = cacheNode.firstChild();
                if(span && span.type == 'element' && span.tagName == 'span' && /^\s*(&nbsp;)+\s*$/.test(span.innerText())){
                    span.parentNode.removeChild(span)
                }
            })
        }

    });

    //调整索引标签
    me.addListener('contentchange',function(){
        adjustListStyle(me.document)
    });

    function adjustListStyle(doc,ignore){
        utils.each(domUtils.getElementsByTagName(doc,'ol ul'),function(node){

            if(!domUtils.inDoc(node,doc))
                return;

            var parent = node.parentNode;
            if(parent.tagName == node.tagName){
                var nodeStyleType = getStyle(node) || (node.tagName == 'OL' ? 'decimal' : 'disc'),
                    parentStyleType = getStyle(parent) || (parent.tagName == 'OL' ? 'decimal' : 'disc');
                if(nodeStyleType == parentStyleType){
                    var styleIndex = utils.indexOf(listStyle[node.tagName], nodeStyleType);
                    styleIndex = styleIndex + 1 == listStyle[node.tagName].length ? 0 : styleIndex + 1;
                    setListStyle(node,listStyle[node.tagName][styleIndex])
                }

            }
            var index = 0,type = 2;
            if( domUtils.hasClass(node,/custom_/)){
                if(!(/[ou]l/i.test(parent.tagName) && domUtils.hasClass(parent,/custom_/))){
                    type = 1;
                }
            }else{
                if(/[ou]l/i.test(parent.tagName) && domUtils.hasClass(parent,/custom_/)){
                    type = 3;
                }
            }

            var style = domUtils.getStyle(node, 'list-style-type');
            style && (node.style.cssText = 'list-style-type:' + style);
            node.className = utils.trim(node.className.replace(/list-paddingleft-\w+/,'')) + ' list-paddingleft-' + type;
            utils.each(domUtils.getElementsByTagName(node,'li'),function(li){
                li.style.cssText && (li.style.cssText = '');
                if(!li.firstChild){
                    domUtils.remove(li);
                    return;
                }
                if(li.parentNode !== node){
                    return;
                }
                index++;
                if(domUtils.hasClass(node,/custom_/) ){
                    var paddingLeft = 1,currentStyle = getStyle(node);
                    if(node.tagName == 'OL'){
                        if(currentStyle){
                            switch(currentStyle){
                                case 'cn' :
                                case 'cn1':
                                case 'cn2':
                                    if(index > 10 && (index % 10 == 0 || index > 10 && index < 20)){
                                        paddingLeft = 2
                                    }else if(index > 20){
                                        paddingLeft = 3
                                    }
                                    break;
                                case 'num2' :
                                    if(index > 9){
                                        paddingLeft = 2
                                    }
                            }
                        }
                        li.className = 'list-'+customStyle[currentStyle]+ index + ' ' + 'list-'+currentStyle+'-paddingleft-' + paddingLeft;
                    }else{
                        li.className = 'list-'+customStyle[currentStyle]  + ' ' + 'list-'+currentStyle+'-paddingleft';
                    }
                }else{
                    li.className = li.className.replace(/list-[\w\-]+/gi,'');
                }
                var className = li.getAttribute('class');
                if(className !== null && !className.replace(/\s/g,'')){
                    domUtils.removeAttributes(li,'class')
                }
            });
            !ignore && adjustList(node,node.tagName.toLowerCase(),getStyle(node)||domUtils.getStyle(node, 'list-style-type'),true);
        })
    }
    function adjustList(list, tag, style,ignoreEmpty) {
        var nextList = list.nextSibling;
        if (nextList && nextList.nodeType == 1 && nextList.tagName.toLowerCase() == tag && (getStyle(nextList) || domUtils.getStyle(nextList, 'list-style-type') || (tag == 'ol' ? 'decimal' : 'disc')) == style) {
            domUtils.moveChild(nextList, list);
            if (nextList.childNodes.length == 0) {
                domUtils.remove(nextList);
            }
        }
        if(nextList && domUtils.isFillChar(nextList)){
            domUtils.remove(nextList);
        }
        var preList = list.previousSibling;
        if (preList && preList.nodeType == 1 && preList.tagName.toLowerCase() == tag && (getStyle(preList) || domUtils.getStyle(preList, 'list-style-type') || (tag == 'ol' ? 'decimal' : 'disc')) == style) {
            domUtils.moveChild(list, preList);
        }
        if(preList && domUtils.isFillChar(preList)){
            domUtils.remove(preList);
        }
        !ignoreEmpty && domUtils.isEmptyBlock(list) && domUtils.remove(list);
        if(getStyle(list)){
            adjustListStyle(list.ownerDocument,true)
        }
    }

    function setListStyle(list,style){
        if(customStyle[style]){
            list.className = 'custom_' + style;
        }
        try{
            domUtils.setStyle(list, 'list-style-type', style);
        }catch(e){}
    }
    function clearEmptySibling(node) {
        var tmpNode = node.previousSibling;
        if (tmpNode && domUtils.isEmptyBlock(tmpNode)) {
            domUtils.remove(tmpNode);
        }
        tmpNode = node.nextSibling;
        if (tmpNode && domUtils.isEmptyBlock(tmpNode)) {
            domUtils.remove(tmpNode);
        }
    }

    me.addListener('keydown', function (type, evt) {
        function preventAndSave() {
            evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
            me.fireEvent('contentchange');
            me.undoManger && me.undoManger.save();
        }
        function findList(node,filterFn){
            while(node && !domUtils.isBody(node)){
                if(filterFn(node)){
                    return null
                }
                if(node.nodeType == 1 && /[ou]l/i.test(node.tagName)){
                    return node;
                }
                node = node.parentNode;
            }
            return null;
        }
        var keyCode = evt.keyCode || evt.which;
        if (keyCode == 13 && !evt.shiftKey) {//回车
            var rng = me.selection.getRange(),
                parent = domUtils.findParent(rng.startContainer,function(node){return domUtils.isBlockElm(node)},true),
                li = domUtils.findParentByTagName(rng.startContainer,'li',true);
            if(parent && parent.tagName != 'PRE' && !li){
                var html = parent.innerHTML.replace(new RegExp(domUtils.fillChar, 'g'),'');
                if(/^\s*1\s*\.[^\d]/.test(html)){
                    parent.innerHTML = html.replace(/^\s*1\s*\./,'');
                    rng.setStartAtLast(parent).collapse(true).select();
                    me.__hasEnterExecCommand = true;
                    me.execCommand('insertorderedlist');
                    me.__hasEnterExecCommand = false;
                }
            }
            var range = me.selection.getRange(),
                start = findList(range.startContainer,function (node) {
                    return node.tagName == 'TABLE';
                }),
                end = range.collapsed ? start : findList(range.endContainer,function (node) {
                    return node.tagName == 'TABLE';
                });

            if (start && end && start === end) {

                if (!range.collapsed) {
                    start = domUtils.findParentByTagName(range.startContainer, 'li', true);
                    end = domUtils.findParentByTagName(range.endContainer, 'li', true);
                    if (start && end && start === end) {
                        range.deleteContents();
                        li = domUtils.findParentByTagName(range.startContainer, 'li', true);
                        if (li && domUtils.isEmptyBlock(li)) {

                            pre = li.previousSibling;
                            next = li.nextSibling;
                            p = me.document.createElement('p');

                            domUtils.fillNode(me.document, p);
                            parentList = li.parentNode;
                            if (pre && next) {
                                range.setStart(next, 0).collapse(true).select(true);
                                domUtils.remove(li);

                            } else {
                                if (!pre && !next || !pre) {

                                    parentList.parentNode.insertBefore(p, parentList);


                                } else {
                                    li.parentNode.parentNode.insertBefore(p, parentList.nextSibling);
                                }
                                domUtils.remove(li);
                                if (!parentList.firstChild) {
                                    domUtils.remove(parentList);
                                }
                                range.setStart(p, 0).setCursor();


                            }
                            preventAndSave();
                            return;

                        }
                    } else {
                        var tmpRange = range.cloneRange(),
                            bk = tmpRange.collapse(false).createBookmark();

                        range.deleteContents();
                        tmpRange.moveToBookmark(bk);
                        var li = domUtils.findParentByTagName(tmpRange.startContainer, 'li', true);

                        clearEmptySibling(li);
                        tmpRange.select();
                        preventAndSave();
                        return;
                    }
                }


                li = domUtils.findParentByTagName(range.startContainer, 'li', true);

                if (li) {
                    if (domUtils.isEmptyBlock(li)) {
                        bk = range.createBookmark();
                        var parentList = li.parentNode;
                        if (li !== parentList.lastChild) {
                            domUtils.breakParent(li, parentList);
                            clearEmptySibling(li);
                        } else {

                            parentList.parentNode.insertBefore(li, parentList.nextSibling);
                            if (domUtils.isEmptyNode(parentList)) {
                                domUtils.remove(parentList);
                            }
                        }
                        //嵌套不处理
                        if (!dtd.$list[li.parentNode.tagName]) {

                            if (!domUtils.isBlockElm(li.firstChild)) {
                                p = me.document.createElement('p');
                                li.parentNode.insertBefore(p, li);
                                while (li.firstChild) {
                                    p.appendChild(li.firstChild);
                                }
                                domUtils.remove(li);
                            } else {
                                domUtils.remove(li, true);
                            }
                        }
                        range.moveToBookmark(bk).select();


                    } else {
                        var first = li.firstChild;
                        if (!first || !domUtils.isBlockElm(first)) {
                            var p = me.document.createElement('p');

                            !li.firstChild && domUtils.fillNode(me.document, p);
                            while (li.firstChild) {

                                p.appendChild(li.firstChild);
                            }
                            li.appendChild(p);
                            first = p;
                        }

                        var span = me.document.createElement('span');

                        range.insertNode(span);
                        domUtils.breakParent(span, li);

                        var nextLi = span.nextSibling;
                        first = nextLi.firstChild;

                        if (!first) {
                            p = me.document.createElement('p');

                            domUtils.fillNode(me.document, p);
                            nextLi.appendChild(p);
                            first = p;
                        }
                        if (domUtils.isEmptyNode(first)) {
                            first.innerHTML = '';
                            domUtils.fillNode(me.document, first);
                        }

                        range.setStart(first, 0).collapse(true).shrinkBoundary().select();
                        domUtils.remove(span);
                        var pre = nextLi.previousSibling;
                        if (pre && domUtils.isEmptyBlock(pre)) {
                            pre.innerHTML = '<p></p>';
                            domUtils.fillNode(me.document, pre.firstChild);
                        }

                    }
//                        }
                    preventAndSave();
                }


            }


        }
        if (keyCode == 8) {
            //修中ie中li下的问题
            range = me.selection.getRange();
            if (range.collapsed && domUtils.isStartInblock(range)) {
                tmpRange = range.cloneRange().trimBoundary();
                li = domUtils.findParentByTagName(range.startContainer, 'li', true);
                //要在li的最左边，才能处理
                if (li && domUtils.isStartInblock(tmpRange)) {
                    start = domUtils.findParentByTagName(range.startContainer, 'p', true);
                    if (start && start !== li.firstChild) {
                        var parentList = domUtils.findParentByTagName(start,['ol','ul']);
                        domUtils.breakParent(start,parentList);
                        clearEmptySibling(start);
                        me.fireEvent('contentchange');
                        range.setStart(start,0).setCursor(false,true);
                        me.fireEvent('saveScene');
                        domUtils.preventDefault(evt);
                        return;
                    }

                    if (li && (pre = li.previousSibling)) {
                        if (keyCode == 46 && li.childNodes.length) {
                            return;
                        }
                        //有可能上边的兄弟节点是个2级菜单，要追加到2级菜单的最后的li
                        if (dtd.$list[pre.tagName]) {
                            pre = pre.lastChild;
                        }
                        me.undoManger && me.undoManger.save();
                        first = li.firstChild;
                        if (domUtils.isBlockElm(first)) {
                            if (domUtils.isEmptyNode(first)) {
//                                    range.setEnd(pre, pre.childNodes.length).shrinkBoundary().collapse().select(true);
                                pre.appendChild(first);
                                range.setStart(first, 0).setCursor(false, true);
                                //first不是唯一的节点
                                while (li.firstChild) {
                                    pre.appendChild(li.firstChild);
                                }
                            } else {

                                span = me.document.createElement('span');
                                range.insertNode(span);
                                //判断pre是否是空的节点,如果是<p><br/></p>类型的空节点，干掉p标签防止它占位
                                if (domUtils.isEmptyBlock(pre)) {
                                    pre.innerHTML = '';
                                }
                                domUtils.moveChild(li, pre);
                                range.setStartBefore(span).collapse(true).select(true);

                                domUtils.remove(span);

                            }
                        } else {
                            if (domUtils.isEmptyNode(li)) {
                                var p = me.document.createElement('p');
                                pre.appendChild(p);
                                range.setStart(p, 0).setCursor();
//                                    range.setEnd(pre, pre.childNodes.length).shrinkBoundary().collapse().select(true);
                            } else {
                                range.setEnd(pre, pre.childNodes.length).collapse().select(true);
                                while (li.firstChild) {
                                    pre.appendChild(li.firstChild);
                                }
                            }
                        }
                        domUtils.remove(li);
                        me.fireEvent('contentchange');
                        me.fireEvent('saveScene');
                        domUtils.preventDefault(evt);
                        return;

                    }
                    //trace:980

                    if (li && !li.previousSibling) {
                        var parentList = li.parentNode;
                        var bk = range.createBookmark();
                        if(domUtils.isTagNode(parentList.parentNode,'ol ul')){
                            parentList.parentNode.insertBefore(li,parentList);
                            if(domUtils.isEmptyNode(parentList)){
                                domUtils.remove(parentList)
                            }
                        }else{

                            while(li.firstChild){
                                parentList.parentNode.insertBefore(li.firstChild,parentList);
                            }

                            domUtils.remove(li);
                            if(domUtils.isEmptyNode(parentList)){
                                domUtils.remove(parentList)
                            }

                        }
                        range.moveToBookmark(bk).setCursor(false,true);
                        me.fireEvent('contentchange');
                        me.fireEvent('saveScene');
                        domUtils.preventDefault(evt);
                        return;

                    }


                }


            }

        }
    });

    me.addListener('keyup',function(type, evt){
        var keyCode = evt.keyCode || evt.which;
        if (keyCode == 8) {
            var rng = me.selection.getRange(),list;
            if(list = domUtils.findParentByTagName(rng.startContainer,['ol', 'ul'],true)){
                adjustList(list,list.tagName.toLowerCase(),getStyle(list)||domUtils.getComputedStyle(list,'list-style-type'),true)
            }
        }
    });
    //处理tab键
    me.addListener('tabkeydown',function(){

        var range = me.selection.getRange();

        //控制级数
        function checkLevel(li){
            if(me.options.maxListLevel != -1){
                var level = li.parentNode,levelNum = 0;
                while(/[ou]l/i.test(level.tagName)){
                    levelNum++;
                    level = level.parentNode;
                }
                if(levelNum >= me.options.maxListLevel){
                    return true;
                }
            }
        }
        //只以开始为准
        //todo 后续改进
        var li = domUtils.findParentByTagName(range.startContainer, 'li', true);
        if(li){

            var bk;
            if(range.collapsed){
                if(checkLevel(li))
                    return true;
                var parentLi = li.parentNode,
                    list = me.document.createElement(parentLi.tagName),
                    index = utils.indexOf(listStyle[list.tagName], getStyle(parentLi)||domUtils.getComputedStyle(parentLi, 'list-style-type'));
                index = index + 1 == listStyle[list.tagName].length ? 0 : index + 1;
                var currentStyle = listStyle[list.tagName][index];
                setListStyle(list,currentStyle);
                if(domUtils.isStartInblock(range)){
                    me.fireEvent('saveScene');
                    bk = range.createBookmark();
                    parentLi.insertBefore(list, li);
                    list.appendChild(li);
                    adjustList(list,list.tagName.toLowerCase(),currentStyle);
                    me.fireEvent('contentchange');
                    range.moveToBookmark(bk).select(true);
                    return true;
                }
            }else{
                me.fireEvent('saveScene');
                bk = range.createBookmark();
                for(var i= 0,closeList,parents = domUtils.findParents(li),ci;ci=parents[i++];){
                    if(domUtils.isTagNode(ci,'ol ul')){
                        closeList = ci;
                        break;
                    }
                }
                var current = li;
                if(bk.end){
                    while(current && !(domUtils.getPosition(current, bk.end) & domUtils.POSITION_FOLLOWING)){
                        if(checkLevel(current)){
                            current = domUtils.getNextDomNode(current,false,null,function(node){return node !== closeList});
                            continue;
                        }
                        var parentLi = current.parentNode,
                            list = me.document.createElement(parentLi.tagName),
                            index = utils.indexOf(listStyle[list.tagName], getStyle(parentLi)||domUtils.getComputedStyle(parentLi, 'list-style-type'));
                        var currentIndex = index + 1 == listStyle[list.tagName].length ? 0 : index + 1;
                        var currentStyle = listStyle[list.tagName][currentIndex];
                        setListStyle(list,currentStyle);
                        parentLi.insertBefore(list, current);
                        while(current && !(domUtils.getPosition(current, bk.end) & domUtils.POSITION_FOLLOWING)){
                            li = current.nextSibling;
                            list.appendChild(current);
                            if(!li || domUtils.isTagNode(li,'ol ul')){
                                if(li){
                                    while(li = li.firstChild){
                                        if(li.tagName == 'LI'){
                                            break;
                                        }
                                    }
                                }else{
                                    li = domUtils.getNextDomNode(current,false,null,function(node){return node !== closeList});
                                }
                                break;
                            }
                            current = li;
                        }
                        adjustList(list,list.tagName.toLowerCase(),currentStyle);
                        current = li;
                    }
                }
                me.fireEvent('contentchange');
                range.moveToBookmark(bk).select();
                return true;
            }
        }

    });
    function getLi(start){
        while(start && !domUtils.isBody(start)){
            if(start.nodeName == 'TABLE'){
                return null;
            }
            if(start.nodeName == 'LI'){
                return start
            }
            start = start.parentNode;
        }
    }

    /**
     * 有序列表，与“insertunorderedlist”命令互斥
     * @command insertorderedlist
     * @method execCommand
     * @param { String } command 命令字符串
     * @param { String } style 插入的有序列表类型，值为：decimal,lower-alpha,lower-roman,upper-alpha,upper-roman,cn,cn1,cn2,num,num1,num2
     * @example
     * ```javascript
     * editor.execCommand( 'insertorderedlist','decimal');
     * ```
     */
    /**
     * 查询当前选区内容是否有序列表
     * @command insertorderedlist
     * @method queryCommandState
     * @param { String } cmd 命令字符串
     * @return { int } 如果当前选区是有序列表返回1，否则返回0
     * @example
     * ```javascript
     * editor.queryCommandState( 'insertorderedlist' );
     * ```
     */
    /**
     * 查询当前选区内容是否有序列表
     * @command insertorderedlist
     * @method queryCommandValue
     * @param { String } cmd 命令字符串
     * @return { String } 返回当前有序列表的类型，值为null或decimal,lower-alpha,lower-roman,upper-alpha,upper-roman,cn,cn1,cn2,num,num1,num2
     * @example
     * ```javascript
     * editor.queryCommandValue( 'insertorderedlist' );
     * ```
     */

    /**
     * 无序列表，与“insertorderedlist”命令互斥
     * @command insertunorderedlist
     * @method execCommand
     * @param { String } command 命令字符串
     * @param { String } style 插入的无序列表类型，值为：circle,disc,square,dash,dot
     * @example
     * ```javascript
     * editor.execCommand( 'insertunorderedlist','circle');
     * ```
     */
    /**
     * 查询当前是否有word文档粘贴进来的图片
     * @command insertunorderedlist
     * @method insertunorderedlist
     * @param { String } command 命令字符串
     * @return { int } 如果当前选区是无序列表返回1，否则返回0
     * @example
     * ```javascript
     * editor.queryCommandState( 'insertunorderedlist' );
     * ```
     */
    /**
     * 查询当前选区内容是否有序列表
     * @command insertunorderedlist
     * @method queryCommandValue
     * @param { String } command 命令字符串
     * @return { String } 返回当前无序列表的类型，值为null或circle,disc,square,dash,dot
     * @example
     * ```javascript
     * editor.queryCommandValue( 'insertunorderedlist' );
     * ```
     */

    me.commands['insertorderedlist'] =
    me.commands['insertunorderedlist'] = {
            execCommand:function (command, style) {

                if (!style) {
                    style = command.toLowerCase() == 'insertorderedlist' ? 'decimal' : 'disc';
                }
                var me = this,
                    range = this.selection.getRange(),
                    filterFn = function (node) {
                        return   node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' : !domUtils.isWhitespace(node);
                    },
                    tag = command.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul',
                    frag = me.document.createDocumentFragment();
                //去掉是因为会出现选到末尾，导致adjustmentBoundary缩到ol/ul的位置
                //range.shrinkBoundary();//.adjustmentBoundary();
                range.adjustmentBoundary().shrinkBoundary();
                var bko = range.createBookmark(true),
                    start = getLi(me.document.getElementById(bko.start)),
                    modifyStart = 0,
                    end =  getLi(me.document.getElementById(bko.end)),
                    modifyEnd = 0,
                    startParent, endParent,
                    list, tmp;

                if (start || end) {
                    start && (startParent = start.parentNode);
                    if (!bko.end) {
                        end = start;
                    }
                    end && (endParent = end.parentNode);

                    if (startParent === endParent) {
                        while (start !== end) {
                            tmp = start;
                            start = start.nextSibling;
                            if (!domUtils.isBlockElm(tmp.firstChild)) {
                                var p = me.document.createElement('p');
                                while (tmp.firstChild) {
                                    p.appendChild(tmp.firstChild);
                                }
                                tmp.appendChild(p);
                            }
                            frag.appendChild(tmp);
                        }
                        tmp = me.document.createElement('span');
                        startParent.insertBefore(tmp, end);
                        if (!domUtils.isBlockElm(end.firstChild)) {
                            p = me.document.createElement('p');
                            while (end.firstChild) {
                                p.appendChild(end.firstChild);
                            }
                            end.appendChild(p);
                        }
                        frag.appendChild(end);
                        domUtils.breakParent(tmp, startParent);
                        if (domUtils.isEmptyNode(tmp.previousSibling)) {
                            domUtils.remove(tmp.previousSibling);
                        }
                        if (domUtils.isEmptyNode(tmp.nextSibling)) {
                            domUtils.remove(tmp.nextSibling)
                        }
                        var nodeStyle = getStyle(startParent) || domUtils.getComputedStyle(startParent, 'list-style-type') || (command.toLowerCase() == 'insertorderedlist' ? 'decimal' : 'disc');
                        if (startParent.tagName.toLowerCase() == tag && nodeStyle == style) {
                            for (var i = 0, ci, tmpFrag = me.document.createDocumentFragment(); ci = frag.firstChild;) {
                                if(domUtils.isTagNode(ci,'ol ul')){
//                                  删除时，子列表不处理
//                                  utils.each(domUtils.getElementsByTagName(ci,'li'),function(li){
//                                        while(li.firstChild){
//                                            tmpFrag.appendChild(li.firstChild);
//                                        }
//
//                                    });
                                    tmpFrag.appendChild(ci);
                                }else{
                                    while (ci.firstChild) {

                                        tmpFrag.appendChild(ci.firstChild);
                                        domUtils.remove(ci);
                                    }
                                }

                            }
                            tmp.parentNode.insertBefore(tmpFrag, tmp);
                        } else {
                            list = me.document.createElement(tag);
                            setListStyle(list,style);
                            list.appendChild(frag);
                            tmp.parentNode.insertBefore(list, tmp);
                        }

                        domUtils.remove(tmp);
                        list && adjustList(list, tag, style);
                        range.moveToBookmark(bko).select();
                        return;
                    }
                    //开始
                    if (start) {
                        while (start) {
                            tmp = start.nextSibling;
                            if (domUtils.isTagNode(start, 'ol ul')) {
                                frag.appendChild(start);
                            } else {
                                var tmpfrag = me.document.createDocumentFragment(),
                                    hasBlock = 0;
                                while (start.firstChild) {
                                    if (domUtils.isBlockElm(start.firstChild)) {
                                        hasBlock = 1;
                                    }
                                    tmpfrag.appendChild(start.firstChild);
                                }
                                if (!hasBlock) {
                                    var tmpP = me.document.createElement('p');
                                    tmpP.appendChild(tmpfrag);
                                    frag.appendChild(tmpP);
                                } else {
                                    frag.appendChild(tmpfrag);
                                }
                                domUtils.remove(start);
                            }

                            start = tmp;
                        }
                        startParent.parentNode.insertBefore(frag, startParent.nextSibling);
                        if (domUtils.isEmptyNode(startParent)) {
                            range.setStartBefore(startParent);
                            domUtils.remove(startParent);
                        } else {
                            range.setStartAfter(startParent);
                        }
                        modifyStart = 1;
                    }

                    if (end && domUtils.inDoc(endParent, me.document)) {
                        //结束
                        start = endParent.firstChild;
                        while (start && start !== end) {
                            tmp = start.nextSibling;
                            if (domUtils.isTagNode(start, 'ol ul')) {
                                frag.appendChild(start);
                            } else {
                                tmpfrag = me.document.createDocumentFragment();
                                hasBlock = 0;
                                while (start.firstChild) {
                                    if (domUtils.isBlockElm(start.firstChild)) {
                                        hasBlock = 1;
                                    }
                                    tmpfrag.appendChild(start.firstChild);
                                }
                                if (!hasBlock) {
                                    tmpP = me.document.createElement('p');
                                    tmpP.appendChild(tmpfrag);
                                    frag.appendChild(tmpP);
                                } else {
                                    frag.appendChild(tmpfrag);
                                }
                                domUtils.remove(start);
                            }
                            start = tmp;
                        }
                        var tmpDiv = domUtils.createElement(me.document, 'div', {
                            'tmpDiv':1
                        });
                        domUtils.moveChild(end, tmpDiv);

                        frag.appendChild(tmpDiv);
                        domUtils.remove(end);
                        endParent.parentNode.insertBefore(frag, endParent);
                        range.setEndBefore(endParent);
                        if (domUtils.isEmptyNode(endParent)) {
                            domUtils.remove(endParent);
                        }

                        modifyEnd = 1;
                    }


                }

                if (!modifyStart) {
                    range.setStartBefore(me.document.getElementById(bko.start));
                }
                if (bko.end && !modifyEnd) {
                    range.setEndAfter(me.document.getElementById(bko.end));
                }
                range.enlarge(true, function (node) {
                    return notExchange[node.tagName];
                });

                frag = me.document.createDocumentFragment();

                var bk = range.createBookmark(),
                    current = domUtils.getNextDomNode(bk.start, false, filterFn),
                    tmpRange = range.cloneRange(),
                    tmpNode,
                    block = domUtils.isBlockElm;

                while (current && current !== bk.end && (domUtils.getPosition(current, bk.end) & domUtils.POSITION_PRECEDING)) {

                    if (current.nodeType == 3 || dtd.li[current.tagName]) {
                        if (current.nodeType == 1 && dtd.$list[current.tagName]) {
                            while (current.firstChild) {
                                frag.appendChild(current.firstChild);
                            }
                            tmpNode = domUtils.getNextDomNode(current, false, filterFn);
                            domUtils.remove(current);
                            current = tmpNode;
                            continue;

                        }
                        tmpNode = current;
                        tmpRange.setStartBefore(current);

                        while (current && current !== bk.end && (!block(current) || domUtils.isBookmarkNode(current) )) {
                            tmpNode = current;
                            current = domUtils.getNextDomNode(current, false, null, function (node) {
                                return !notExchange[node.tagName];
                            });
                        }

                        if (current && block(current)) {
                            tmp = domUtils.getNextDomNode(tmpNode, false, filterFn);
                            if (tmp && domUtils.isBookmarkNode(tmp)) {
                                current = domUtils.getNextDomNode(tmp, false, filterFn);
                                tmpNode = tmp;
                            }
                        }
                        tmpRange.setEndAfter(tmpNode);

                        current = domUtils.getNextDomNode(tmpNode, false, filterFn);

                        var li = range.document.createElement('li');

                        li.appendChild(tmpRange.extractContents());
                        if(domUtils.isEmptyNode(li)){
                            var tmpNode = range.document.createElement('p');
                            while(li.firstChild){
                                tmpNode.appendChild(li.firstChild)
                            }
                            li.appendChild(tmpNode);
                        }
                        frag.appendChild(li);
                    } else {
                        current = domUtils.getNextDomNode(current, true, filterFn);
                    }
                }
                range.moveToBookmark(bk).collapse(true);
                list = me.document.createElement(tag);
                setListStyle(list,style);
                list.appendChild(frag);
                range.insertNode(list);
                //当前list上下看能否合并
                adjustList(list, tag, style);
                //去掉冗余的tmpDiv
                for (var i = 0, ci, tmpDivs = domUtils.getElementsByTagName(list, 'div'); ci = tmpDivs[i++];) {
                    if (ci.getAttribute('tmpDiv')) {
                        domUtils.remove(ci, true)
                    }
                }
                range.moveToBookmark(bko).select();

            },
            queryCommandState:function (command) {
                var tag = command.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul';
                var path = this.selection.getStartElementPath();
                for(var i= 0,ci;ci = path[i++];){
                    if(ci.nodeName == 'TABLE'){
                        return 0
                    }
                    if(tag == ci.nodeName.toLowerCase()){
                        return 1
                    };
                }
                return 0;

            },
            queryCommandValue:function (command) {
                var tag = command.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul';
                var path = this.selection.getStartElementPath(),
                    node;
                for(var i= 0,ci;ci = path[i++];){
                    if(ci.nodeName == 'TABLE'){
                        node = null;
                        break;
                    }
                    if(tag == ci.nodeName.toLowerCase()){
                        node = ci;
                        break;
                    };
                }
                return node ? getStyle(node) || domUtils.getComputedStyle(node, 'list-style-type') : null;
            }
        };
};



// plugins/source.js
/**
 * 源码编辑插件
 * @file
 * @since 1.2.6.1
 */

(function (){
    var sourceEditors = {
        textarea: function (editor, holder){
            var textarea = holder.ownerDocument.createElement('textarea');
            textarea.style.cssText = 'position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;';
            // todo: IE下只有onresize属性可用... 很纠结
            if (browser.ie && browser.version < 8) {
                textarea.style.width = holder.offsetWidth + 'px';
                textarea.style.height = holder.offsetHeight + 'px';
                holder.onresize = function (){
                    textarea.style.width = holder.offsetWidth + 'px';
                    textarea.style.height = holder.offsetHeight + 'px';
                };
            }
            holder.appendChild(textarea);
            return {
                setContent: function (content){
                    textarea.value = content;
                },
                getContent: function (){
                    return textarea.value;
                },
                select: function (){
                    var range;
                    if (browser.ie) {
                        range = textarea.createTextRange();
                        range.collapse(true);
                        range.select();
                    } else {
                        //todo: chrome下无法设置焦点
                        textarea.setSelectionRange(0, 0);
                        textarea.focus();
                    }
                },
                dispose: function (){
                    holder.removeChild(textarea);
                    // todo
                    holder.onresize = null;
                    textarea = null;
                    holder = null;
                }
            };
        },
        codemirror: function (editor, holder){

            var codeEditor = window.CodeMirror(holder, {
                mode: "text/html",
                tabMode: "indent",
                lineNumbers: true,
                lineWrapping:true
            });
            var dom = codeEditor.getWrapperElement();
            dom.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;';
            codeEditor.getScrollerElement().style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;';
            codeEditor.refresh();
            return {
                getCodeMirror:function(){
                    return codeEditor;
                },
                setContent: function (content){
                    codeEditor.setValue(content);
                },
                getContent: function (){
                    return codeEditor.getValue();
                },
                select: function (){
                    codeEditor.focus();
                },
                dispose: function (){
                    holder.removeChild(dom);
                    dom = null;
                    codeEditor = null;
                }
            };
        }
    };

    UE.plugins['source'] = function (){
        var me = this;
        var opt = this.options;
        var sourceMode = false;
        var sourceEditor;
        var orgSetContent;
        opt.sourceEditor = browser.ie  ? 'textarea' : (opt.sourceEditor || 'codemirror');

        me.setOpt({
            sourceEditorFirst:false
        });
        function createSourceEditor(holder){
            return sourceEditors[opt.sourceEditor == 'codemirror' && window.CodeMirror ? 'codemirror' : 'textarea'](me, holder);
        }

        var bakCssText;
        //解决在源码模式下getContent不能得到最新的内容问题
        var oldGetContent,
            bakAddress;

        /**
         * 切换源码模式和编辑模式
         * @command source
         * @method execCommand
         * @param { String } cmd 命令字符串
         * @example
         * ```javascript
         * editor.execCommand( 'source');
         * ```
         */

        /**
         * 查询当前编辑区域的状态是源码模式还是可视化模式
         * @command source
         * @method queryCommandState
         * @param { String } cmd 命令字符串
         * @return { int } 如果当前是源码编辑模式，返回1，否则返回0
         * @example
         * ```javascript
         * editor.queryCommandState( 'source' );
         * ```
         */

        me.commands['source'] = {
            execCommand: function (){

                sourceMode = !sourceMode;
                if (sourceMode) {
                    bakAddress = me.selection.getRange().createAddress(false,true);
                    me.undoManger && me.undoManger.save(true);
                    if(browser.gecko){
                        me.body.contentEditable = false;
                    }

                    bakCssText = me.iframe.style.cssText;
                    me.iframe.style.cssText += 'position:absolute;left:-32768px;top:-32768px;';


                    me.fireEvent('beforegetcontent');
                    var root = UE.htmlparser(me.body.innerHTML);
                    me.filterOutputRule(root);
                    root.traversal(function (node) {
                        if (node.type == 'element') {
                            switch (node.tagName) {
                                case 'td':
                                case 'th':
                                case 'caption':
                                if(node.children && node.children.length == 1){
                                    if(node.firstChild().tagName == 'br' ){
                                        node.removeChild(node.firstChild())
                                    }
                                };
                                break;
                                case 'pre':
                                    node.innerText(node.innerText().replace(/&nbsp;/g,' '))

                            }
                        }
                    });

                    me.fireEvent('aftergetcontent');

                    var content = root.toHtml(true);

                    sourceEditor = createSourceEditor(me.iframe.parentNode);

                    sourceEditor.setContent(content);

                    orgSetContent = me.setContent;

                    me.setContent = function(html){
                        //这里暂时不触发事件，防止报错
                        var root = UE.htmlparser(html);
                        me.filterInputRule(root);
                        html = root.toHtml();
                        sourceEditor.setContent(html);
                    };

                    setTimeout(function (){
                        sourceEditor.select();
                        me.addListener('fullscreenchanged', function(){
                            try{
                                sourceEditor.getCodeMirror().refresh()
                            }catch(e){}
                        });
                    });

                    //重置getContent，源码模式下取值也能是最新的数据
                    oldGetContent = me.getContent;
                    me.getContent = function (){
                        return sourceEditor.getContent() || '<p>' + (browser.ie ? '' : '<br/>')+'</p>';
                    };
                } else {
                    me.iframe.style.cssText = bakCssText;
                    var cont = sourceEditor.getContent() || '<p>' + (browser.ie ? '' : '<br/>')+'</p>';
                    //处理掉block节点前后的空格,有可能会误命中，暂时不考虑
                    cont = cont.replace(new RegExp('[\\r\\t\\n ]*<\/?(\\w+)\\s*(?:[^>]*)>','g'), function(a,b){
                        if(b && !dtd.$inlineWithA[b.toLowerCase()]){
                            return a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g,'');
                        }
                        return a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g,'')
                    });

                    me.setContent = orgSetContent;

                    me.setContent(cont);
                    sourceEditor.dispose();
                    sourceEditor = null;
                    //还原getContent方法
                    me.getContent = oldGetContent;
                    var first = me.body.firstChild;
                    //trace:1106 都删除空了，下边会报错，所以补充一个p占位
                    if(!first){
                        me.body.innerHTML = '<p>'+(browser.ie?'':'<br/>')+'</p>';
                        first = me.body.firstChild;
                    }


                    //要在ifm为显示时ff才能取到selection,否则报错
                    //这里不能比较位置了
                    me.undoManger && me.undoManger.save(true);

                    if(browser.gecko){

                        var input = document.createElement('input');
                        input.style.cssText = 'position:absolute;left:0;top:-32768px';

                        document.body.appendChild(input);

                        me.body.contentEditable = false;
                        setTimeout(function(){
                            domUtils.setViewportOffset(input, { left: -32768, top: 0 });
                            input.focus();
                            setTimeout(function(){
                                me.body.contentEditable = true;
                                me.selection.getRange().moveToAddress(bakAddress).select(true);
                                domUtils.remove(input);
                            });

                        });
                    }else{
                        //ie下有可能报错，比如在代码顶头的情况
                        try{
                            me.selection.getRange().moveToAddress(bakAddress).select(true);
                        }catch(e){}

                    }
                }
                this.fireEvent('sourcemodechanged', sourceMode);
            },
            queryCommandState: function (){
                return sourceMode|0;
            },
            notNeedUndo : 1
        };
        var oldQueryCommandState = me.queryCommandState;

        me.queryCommandState = function (cmdName){
            cmdName = cmdName.toLowerCase();
            if (sourceMode) {
                //源码模式下可以开启的命令
                return cmdName in {
                    'source' : 1,
                    'fullscreen' : 1
                } ? 1 : -1
            }
            return oldQueryCommandState.apply(this, arguments);
        };

        if(opt.sourceEditor == "codemirror"){

            me.addListener("ready",function(){
                utils.loadFile(document,{
                    src : opt.codeMirrorJsUrl || opt.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.js",
                    tag : "script",
                    type : "text/javascript",
                    defer : "defer"
                },function(){
                    if(opt.sourceEditorFirst){
                        setTimeout(function(){
                            me.execCommand("source");
                        },0);
                    }
                });
                utils.loadFile(document,{
                    tag : "link",
                    rel : "stylesheet",
                    type : "text/css",
                    href : opt.codeMirrorCssUrl || opt.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.css"
                });

            });
        }

    };

})();

// plugins/enterkey.js
///import core
///import plugins/undo.js
///commands 设置回车标签p或br
///commandsName  EnterKey
///commandsTitle  设置回车标签p或br
/**
 * @description 处理回车
 * @author zhanyi
 */
UE.plugins['enterkey'] = function() {
    var hTag,
        me = this,
        tag = me.options.enterTag;
    me.addListener('keyup', function(type, evt) {

        var keyCode = evt.keyCode || evt.which;
        if (keyCode == 13) {
            var range = me.selection.getRange(),
                start = range.startContainer,
                doSave;

            //修正在h1-h6里边回车后不能嵌套p的问题
            if (!browser.ie) {

                if (/h\d/i.test(hTag)) {
                    if (browser.gecko) {
                        var h = domUtils.findParentByTagName(start, [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6','blockquote','caption','table'], true);
                        if (!h) {
                            me.document.execCommand('formatBlock', false, '<p>');
                            doSave = 1;
                        }
                    } else {
                        //chrome remove div
                        if (start.nodeType == 1) {
                            var tmp = me.document.createTextNode(''),div;
                            range.insertNode(tmp);
                            div = domUtils.findParentByTagName(tmp, 'div', true);
                            if (div) {
                                var p = me.document.createElement('p');
                                while (div.firstChild) {
                                    p.appendChild(div.firstChild);
                                }
                                div.parentNode.insertBefore(p, div);
                                domUtils.remove(div);
                                range.setStartBefore(tmp).setCursor();
                                doSave = 1;
                            }
                            domUtils.remove(tmp);

                        }
                    }

                    if (me.undoManger && doSave) {
                        me.undoManger.save();
                    }
                }
                //没有站位符，会出现多行的问题
                browser.opera &&  range.select();
            }else{
                me.fireEvent('saveScene',true,true)
            }
        }
    });

    me.addListener('keydown', function(type, evt) {
        var keyCode = evt.keyCode || evt.which;
        if (keyCode == 13) {//回车
            if(me.fireEvent('beforeenterkeydown')){
                domUtils.preventDefault(evt);
                return;
            }
            me.fireEvent('saveScene',true,true);
            hTag = '';


            var range = me.selection.getRange();

            if (!range.collapsed) {
                //跨td不能删
                var start = range.startContainer,
                    end = range.endContainer,
                    startTd = domUtils.findParentByTagName(start, 'td', true),
                    endTd = domUtils.findParentByTagName(end, 'td', true);
                if (startTd && endTd && startTd !== endTd || !startTd && endTd || startTd && !endTd) {
                    evt.preventDefault ? evt.preventDefault() : ( evt.returnValue = false);
                    return;
                }
            }
            if (tag == 'p') {


                if (!browser.ie) {

                    start = domUtils.findParentByTagName(range.startContainer, ['ol','ul','p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6','blockquote','caption'], true);

                    //opera下执行formatblock会在table的场景下有问题，回车在opera原生支持很好，所以暂时在opera去掉调用这个原生的command
                    //trace:2431
                    if (!start && !browser.opera) {

                        me.document.execCommand('formatBlock', false, '<p>');

                        if (browser.gecko) {
                            range = me.selection.getRange();
                            start = domUtils.findParentByTagName(range.startContainer, 'p', true);
                            start && domUtils.removeDirtyAttr(start);
                        }


                    } else {
                        hTag = start.tagName;
                        start.tagName.toLowerCase() == 'p' && browser.gecko && domUtils.removeDirtyAttr(start);
                    }

                }

            } else {
                evt.preventDefault ? evt.preventDefault() : ( evt.returnValue = false);

                if (!range.collapsed) {
                    range.deleteContents();
                    start = range.startContainer;
                    if (start.nodeType == 1 && (start = start.childNodes[range.startOffset])) {
                        while (start.nodeType == 1) {
                            if (dtd.$empty[start.tagName]) {
                                range.setStartBefore(start).setCursor();
                                if (me.undoManger) {
                                    me.undoManger.save();
                                }
                                return false;
                            }
                            if (!start.firstChild) {
                                var br = range.document.createElement('br');
                                start.appendChild(br);
                                range.setStart(start, 0).setCursor();
                                if (me.undoManger) {
                                    me.undoManger.save();
                                }
                                return false;
                            }
                            start = start.firstChild;
                        }
                        if (start === range.startContainer.childNodes[range.startOffset]) {
                            br = range.document.createElement('br');
                            range.insertNode(br).setCursor();

                        } else {
                            range.setStart(start, 0).setCursor();
                        }


                    } else {
                        br = range.document.createElement('br');
                        range.insertNode(br).setStartAfter(br).setCursor();
                    }


                } else {
                    br = range.document.createElement('br');
                    range.insertNode(br);
                    var parent = br.parentNode;
                    if (parent.lastChild === br) {
                        br.parentNode.insertBefore(br.cloneNode(true), br);
                        range.setStartBefore(br);
                    } else {
                        range.setStartAfter(br);
                    }
                    range.setCursor();

                }

            }

        }
    });
};


// plugins/keystrokes.js
/* 处理特殊键的兼容性问题 */
UE.plugins['keystrokes'] = function() {
    var me = this;
    var collapsed = true;
    me.addListener('keydown', function(type, evt) {
        var keyCode = evt.keyCode || evt.which,
            rng = me.selection.getRange();

        //处理全选的情况
        if(!rng.collapsed && !(evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey) && (keyCode >= 65 && keyCode <=90
            || keyCode >= 48 && keyCode <= 57 ||
            keyCode >= 96 && keyCode <= 111 || {
                    13:1,
                    8:1,
                    46:1
                }[keyCode])
            ){

            var tmpNode = rng.startContainer;
            if(domUtils.isFillChar(tmpNode)){
                rng.setStartBefore(tmpNode)
            }
            tmpNode = rng.endContainer;
            if(domUtils.isFillChar(tmpNode)){
                rng.setEndAfter(tmpNode)
            }
            rng.txtToElmBoundary();
            //结束边界可能放到了br的前边，要把br包含进来
            // x[xxx]<br/>
            if(rng.endContainer && rng.endContainer.nodeType == 1){
                tmpNode = rng.endContainer.childNodes[rng.endOffset];
                if(tmpNode && domUtils.isBr(tmpNode)){
                    rng.setEndAfter(tmpNode);
                }
            }
            if(rng.startOffset == 0){
                tmpNode = rng.startContainer;
                if(domUtils.isBoundaryNode(tmpNode,'firstChild') ){
                    tmpNode = rng.endContainer;
                    if(rng.endOffset == (tmpNode.nodeType == 3 ? tmpNode.nodeValue.length : tmpNode.childNodes.length) && domUtils.isBoundaryNode(tmpNode,'lastChild')){
                        me.fireEvent('saveScene');
                        me.body.innerHTML = '<p>'+(browser.ie ? '' : '<br/>')+'</p>';
                        rng.setStart(me.body.firstChild,0).setCursor(false,true);
                        me._selectionChange();
                        return;
                    }
                }
            }
        }

        //处理backspace
        if (keyCode == keymap.Backspace) {
            rng = me.selection.getRange();
            collapsed = rng.collapsed;
            if(me.fireEvent('delkeydown',evt)){
                return;
            }
            var start,end;
            //避免按两次删除才能生效的问题
            if(rng.collapsed && rng.inFillChar()){
                start = rng.startContainer;

                if(domUtils.isFillChar(start)){
                    rng.setStartBefore(start).shrinkBoundary(true).collapse(true);
                    domUtils.remove(start)
                }else{
                    start.nodeValue = start.nodeValue.replace(new RegExp('^' + domUtils.fillChar ),'');
                    rng.startOffset--;
                    rng.collapse(true).select(true)
                }
            }

            //解决选中control元素不能删除的问题
            if (start = rng.getClosedNode()) {
                me.fireEvent('saveScene');
                rng.setStartBefore(start);
                domUtils.remove(start);
                rng.setCursor();
                me.fireEvent('saveScene');
                domUtils.preventDefault(evt);
                return;
            }
            //阻止在table上的删除
            if (!browser.ie) {
                start = domUtils.findParentByTagName(rng.startContainer, 'table', true);
                end = domUtils.findParentByTagName(rng.endContainer, 'table', true);
                if (start && !end || !start && end || start !== end) {
                    evt.preventDefault();
                    return;
                }
            }

        }
        //处理tab键的逻辑
        if (keyCode == keymap.Tab) {
            //不处理以下标签
            var excludeTagNameForTabKey = {
                'ol' : 1,
                'ul' : 1,
                'table':1
            };
            //处理组件里的tab按下事件
            if(me.fireEvent('tabkeydown',evt)){
                domUtils.preventDefault(evt);
                return;
            }
            var range = me.selection.getRange();
            me.fireEvent('saveScene');
            for (var i = 0,txt = '',tabSize = me.options.tabSize|| 4,tabNode =  me.options.tabNode || '&nbsp;'; i < tabSize; i++) {
                txt += tabNode;
            }
            var span = me.document.createElement('span');
            span.innerHTML = txt + domUtils.fillChar;
            if (range.collapsed) {
                range.insertNode(span.cloneNode(true).firstChild).setCursor(true);
            } else {
                var filterFn = function(node) {
                    return domUtils.isBlockElm(node) && !excludeTagNameForTabKey[node.tagName.toLowerCase()]

                };
                //普通的情况
                start = domUtils.findParent(range.startContainer, filterFn,true);
                end = domUtils.findParent(range.endContainer, filterFn,true);
                if (start && end && start === end) {
                    range.deleteContents();
                    range.insertNode(span.cloneNode(true).firstChild).setCursor(true);
                } else {
                    var bookmark = range.createBookmark();
                    range.enlarge(true);
                    var bookmark2 = range.createBookmark(),
                        current = domUtils.getNextDomNode(bookmark2.start, false, filterFn);
                    while (current && !(domUtils.getPosition(current, bookmark2.end) & domUtils.POSITION_FOLLOWING)) {
                        current.insertBefore(span.cloneNode(true).firstChild, current.firstChild);
                        current = domUtils.getNextDomNode(current, false, filterFn);
                    }
                    range.moveToBookmark(bookmark2).moveToBookmark(bookmark).select();
                }
            }
            domUtils.preventDefault(evt)
        }
        //trace:1634
        //ff的del键在容器空的时候，也会删除
        if(browser.gecko && keyCode == 46){
            range = me.selection.getRange();
            if(range.collapsed){
                start = range.startContainer;
                if(domUtils.isEmptyBlock(start)){
                    var parent = start.parentNode;
                    while(domUtils.getChildCount(parent) == 1 && !domUtils.isBody(parent)){
                        start = parent;
                        parent = parent.parentNode;
                    }
                    if(start === parent.lastChild)
                        evt.preventDefault();
                    return;
                }
            }
        }
    });
    me.addListener('keyup', function(type, evt) {
        var keyCode = evt.keyCode || evt.which,
            rng,me = this;
        if(keyCode == keymap.Backspace){
            if(me.fireEvent('delkeyup')){
                return;
            }
            rng = me.selection.getRange();
            if(rng.collapsed){
                var tmpNode,
                    autoClearTagName = ['h1','h2','h3','h4','h5','h6'];
                if(tmpNode = domUtils.findParentByTagName(rng.startContainer,autoClearTagName,true)){
                    if(domUtils.isEmptyBlock(tmpNode)){
                        var pre = tmpNode.previousSibling;
                        if(pre && pre.nodeName != 'TABLE'){
                            domUtils.remove(tmpNode);
                            rng.setStartAtLast(pre).setCursor(false,true);
                            return;
                        }else{
                            var next = tmpNode.nextSibling;
                            if(next && next.nodeName != 'TABLE'){
                                domUtils.remove(tmpNode);
                                rng.setStartAtFirst(next).setCursor(false,true);
                                return;
                            }
                        }
                    }
                }
                //处理当删除到body时，要重新给p标签展位
                if(domUtils.isBody(rng.startContainer)){
                    var tmpNode = domUtils.createElement(me.document,'p',{
                        'innerHTML' : browser.ie ? domUtils.fillChar : '<br/>'
                    });
                    rng.insertNode(tmpNode).setStart(tmpNode,0).setCursor(false,true);
                }
            }


            //chrome下如果删除了inline标签，浏览器会有记忆，在输入文字还是会套上刚才删除的标签，所以这里再选一次就不会了
            if( !collapsed && (rng.startContainer.nodeType == 3 || rng.startContainer.nodeType == 1 && domUtils.isEmptyBlock(rng.startContainer))){
                if(browser.ie){
                    var span = rng.document.createElement('span');
                    rng.insertNode(span).setStartBefore(span).collapse(true);
                    rng.select();
                    domUtils.remove(span)
                }else{
                    rng.select()
                }

            }
        }


    })
};

// plugins/fiximgclick.js
///import core
///commands 修复chrome下图片不能点击的问题，出现八个角可改变大小
///commandsName  FixImgClick
///commandsTitle  修复chrome下图片不能点击的问题，出现八个角可改变大小
//修复chrome下图片不能点击的问题，出现八个角可改变大小

UE.plugins['fiximgclick'] = (function () {

    var elementUpdated = false;
    function Scale() {
        this.editor = null;
        this.resizer = null;
        this.cover = null;
        this.doc = document;
        this.prePos = {x: 0, y: 0};
        this.startPos = {x: 0, y: 0};
    }

    (function () {
        var rect = [
            //[left, top, width, height]
            [0, 0, -1, -1],
            [0, 0, 0, -1],
            [0, 0, 1, -1],
            [0, 0, -1, 0],
            [0, 0, 1, 0],
            [0, 0, -1, 1],
            [0, 0, 0, 1],
            [0, 0, 1, 1]
        ];

        Scale.prototype = {
            init: function (editor) {
                var me = this;
                me.editor = editor;
                me.startPos = this.prePos = {x: 0, y: 0};
                me.dragId = -1;

                var hands = [],
                    cover = me.cover = document.createElement('div'),
                    resizer = me.resizer = document.createElement('div');

                cover.id = me.editor.ui.id + '_imagescale_cover';
                cover.style.cssText = 'position:absolute;display:none;z-index:' + (me.editor.options.zIndex) + ';filter:alpha(opacity=0); opacity:0;background:#CCC;';
                domUtils.on(cover, 'mousedown click', function () {
                    me.hide();
                });

                for (i = 0; i < 8; i++) {
                    hands.push('<span class="edui-editor-imagescale-hand' + i + '"></span>');
                }
                resizer.id = me.editor.ui.id + '_imagescale';
                resizer.className = 'edui-editor-imagescale';
                resizer.innerHTML = hands.join('');
                resizer.style.cssText += ';display:none;border:1px solid #3b77ff;z-index:' + (me.editor.options.zIndex) + ';';

                me.editor.ui.getDom().appendChild(cover);
                me.editor.ui.getDom().appendChild(resizer);

                me.initStyle();
                me.initEvents();
            },
            initStyle: function () {
                utils.cssRule('imagescale', '.edui-editor-imagescale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}' +
                    '.edui-editor-imagescale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}'
                    + '.edui-editor-imagescale .edui-editor-imagescale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}'
                    + '.edui-editor-imagescale .edui-editor-imagescale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}'
                    + '.edui-editor-imagescale .edui-editor-imagescale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}'
                    + '.edui-editor-imagescale .edui-editor-imagescale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}'
                    + '.edui-editor-imagescale .edui-editor-imagescale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}'
                    + '.edui-editor-imagescale .edui-editor-imagescale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}'
                    + '.edui-editor-imagescale .edui-editor-imagescale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}'
                    + '.edui-editor-imagescale .edui-editor-imagescale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}');
            },
            initEvents: function () {
                var me = this;

                me.startPos.x = me.startPos.y = 0;
                me.isDraging = false;
            },
            _eventHandler: function (e) {
                var me = this;
                switch (e.type) {
                    case 'mousedown':
                        var hand = e.target || e.srcElement, hand;
                        if (hand.className.indexOf('edui-editor-imagescale-hand') != -1 && me.dragId == -1) {
                            me.dragId = hand.className.slice(-1);
                            me.startPos.x = me.prePos.x = e.clientX;
                            me.startPos.y = me.prePos.y = e.clientY;
                            domUtils.on(me.doc,'mousemove', me.proxy(me._eventHandler, me));
                        }
                        break;
                    case 'mousemove':
                        if (me.dragId != -1) {
                            me.updateContainerStyle(me.dragId, {x: e.clientX - me.prePos.x, y: e.clientY - me.prePos.y});
                            me.prePos.x = e.clientX;
                            me.prePos.y = e.clientY;
                            elementUpdated = true;
                            me.updateTargetElement();

                        }
                        break;
                    case 'mouseup':
                        if (me.dragId != -1) {
                            me.updateContainerStyle(me.dragId, {x: e.clientX - me.prePos.x, y: e.clientY - me.prePos.y});
                            me.updateTargetElement();
                            if (me.target.parentNode) me.attachTo(me.target);
                            me.dragId = -1;
                        }
                        domUtils.un(me.doc,'mousemove', me.proxy(me._eventHandler, me));
                        //修复只是点击挪动点，但没有改变大小，不应该触发contentchange
                        if(elementUpdated){
                            elementUpdated = false;
                            me.editor.fireEvent('contentchange');
                        }

                        break;
                    default:
                        break;
                }
            },
            updateTargetElement: function () {
                var me = this;
                domUtils.setStyles(me.target, {
                    'width': me.resizer.style.width,
                    'height': me.resizer.style.height
                });
                me.target.width = parseInt(me.resizer.style.width);
                me.target.height = parseInt(me.resizer.style.height);
                me.attachTo(me.target);
            },
            updateContainerStyle: function (dir, offset) {
                var me = this,
                    dom = me.resizer, tmp;

                if (rect[dir][0] != 0) {
                    tmp = parseInt(dom.style.left) + offset.x;
                    dom.style.left = me._validScaledProp('left', tmp) + 'px';
                }
                if (rect[dir][1] != 0) {
                    tmp = parseInt(dom.style.top) + offset.y;
                    dom.style.top = me._validScaledProp('top', tmp) + 'px';
                }
                if (rect[dir][2] != 0) {
                    tmp = dom.clientWidth + rect[dir][2] * offset.x;
                    dom.style.width = me._validScaledProp('width', tmp) + 'px';
                }
                if (rect[dir][3] != 0) {
                    tmp = dom.clientHeight + rect[dir][3] * offset.y;
                    dom.style.height = me._validScaledProp('height', tmp) + 'px';
                }
            },
            _validScaledProp: function (prop, value) {
                var ele = this.resizer,
                    wrap = document;

                value = isNaN(value) ? 0 : value;
                switch (prop) {
                    case 'left':
                        return value < 0 ? 0 : (value + ele.clientWidth) > wrap.clientWidth ? wrap.clientWidth - ele.clientWidth : value;
                    case 'top':
                        return value < 0 ? 0 : (value + ele.clientHeight) > wrap.clientHeight ? wrap.clientHeight - ele.clientHeight : value;
                    case 'width':
                        return value <= 0 ? 1 : (value + ele.offsetLeft) > wrap.clientWidth ? wrap.clientWidth - ele.offsetLeft : value;
                    case 'height':
                        return value <= 0 ? 1 : (value + ele.offsetTop) > wrap.clientHeight ? wrap.clientHeight - ele.offsetTop : value;
                }
            },
            hideCover: function () {
                this.cover.style.display = 'none';
            },
            showCover: function () {
                var me = this,
                    editorPos = domUtils.getXY(me.editor.ui.getDom()),
                    iframePos = domUtils.getXY(me.editor.iframe);

                domUtils.setStyles(me.cover, {
                    'width': me.editor.iframe.offsetWidth + 'px',
                    'height': me.editor.iframe.offsetHeight + 'px',
                    'top': iframePos.y - editorPos.y + 'px',
                    'left': iframePos.x - editorPos.x + 'px',
                    'position': 'absolute',
                    'display': ''
                })
            },
            show: function (targetObj) {
                var me = this;
                me.resizer.style.display = 'block';
                if(targetObj) me.attachTo(targetObj);

                domUtils.on(this.resizer, 'mousedown', me.proxy(me._eventHandler, me));
                domUtils.on(me.doc, 'mouseup', me.proxy(me._eventHandler, me));

                me.showCover();
                me.editor.fireEvent('afterscaleshow', me);
                me.editor.fireEvent('saveScene');
            },
            hide: function () {
                var me = this;
                me.hideCover();
                me.resizer.style.display = 'none';

                domUtils.un(me.resizer, 'mousedown', me.proxy(me._eventHandler, me));
                domUtils.un(me.doc, 'mouseup', me.proxy(me._eventHandler, me));
                me.editor.fireEvent('afterscalehide', me);
            },
            proxy: function( fn, context ) {
                return function(e) {
                    return fn.apply( context || this, arguments);
                };
            },
            attachTo: function (targetObj) {
                var me = this,
                    target = me.target = targetObj,
                    resizer = this.resizer,
                    imgPos = domUtils.getXY(target),
                    iframePos = domUtils.getXY(me.editor.iframe),
                    editorPos = domUtils.getXY(resizer.parentNode);

                domUtils.setStyles(resizer, {
                    'width': target.width + 'px',
                    'height': target.height + 'px',
                    'left': iframePos.x + imgPos.x - me.editor.document.body.scrollLeft - editorPos.x - parseInt(resizer.style.borderLeftWidth) + 'px',
                    'top': iframePos.y + imgPos.y - me.editor.document.body.scrollTop - editorPos.y - parseInt(resizer.style.borderTopWidth) + 'px'
                });
            }
        }
    })();

    return function () {
        var me = this,
            imageScale;

        me.setOpt('imageScaleEnabled', true);

        if ( !browser.ie && me.options.imageScaleEnabled) {
            me.addListener('click', function (type, e) {

                var range = me.selection.getRange(),
                    img = range.getClosedNode();

                if (img && img.tagName == 'IMG' && me.body.contentEditable!="false") {

                    if (img.className.indexOf("edui-faked-music") != -1 ||
                        img.getAttribute("anchorname") ||
                        domUtils.hasClass(img, 'loadingclass') ||
                        domUtils.hasClass(img, 'loaderrorclass')) { return }

                    if (!imageScale) {
                        imageScale = new Scale();
                        imageScale.init(me);
                        me.ui.getDom().appendChild(imageScale.resizer);

                        var _keyDownHandler = function (e) {
                            imageScale.hide();
                            if(imageScale.target) me.selection.getRange().selectNode(imageScale.target).select();
                        }, _mouseDownHandler = function (e) {
                            var ele = e.target || e.srcElement;
                            if (ele && (ele.className===undefined || ele.className.indexOf('edui-editor-imagescale') == -1)) {
                                _keyDownHandler(e);
                            }
                        }, timer;

                        me.addListener('afterscaleshow', function (e) {
                            me.addListener('beforekeydown', _keyDownHandler);
                            me.addListener('beforemousedown', _mouseDownHandler);
                            domUtils.on(document, 'keydown', _keyDownHandler);
                            domUtils.on(document,'mousedown', _mouseDownHandler);
                            me.selection.getNative().removeAllRanges();
                        });
                        me.addListener('afterscalehide', function (e) {
                            me.removeListener('beforekeydown', _keyDownHandler);
                            me.removeListener('beforemousedown', _mouseDownHandler);
                            domUtils.un(document, 'keydown', _keyDownHandler);
                            domUtils.un(document,'mousedown', _mouseDownHandler);
                            var target = imageScale.target;
                            if (target.parentNode) {
                                me.selection.getRange().selectNode(target).select();
                            }
                        });
                        //TODO 有iframe的情况，mousedown不能往下传。。
                        domUtils.on(imageScale.resizer, 'mousedown', function (e) {
                            me.selection.getNative().removeAllRanges();
                            var ele = e.target || e.srcElement;
                            if (ele && ele.className.indexOf('edui-editor-imagescale-hand') == -1) {
                                timer = setTimeout(function () {
                                    imageScale.hide();
                                    if(imageScale.target) me.selection.getRange().selectNode(ele).select();
                                }, 200);
                            }
                        });
                        domUtils.on(imageScale.resizer, 'mouseup', function (e) {
                            var ele = e.target || e.srcElement;
                            if (ele && ele.className.indexOf('edui-editor-imagescale-hand') == -1) {
                                clearTimeout(timer);
                            }
                        });
                    }
                    imageScale.show(img);
                } else {
                    if (imageScale && imageScale.resizer.style.display != 'none') imageScale.hide();
                }
            });
        }

        if (browser.webkit) {
            me.addListener('click', function (type, e) {
                if (e.target.tagName == 'IMG' && me.body.contentEditable!="false") {
                    var range = new dom.Range(me.document);
                    range.selectNode(e.target).select();
                }
            });
        }
    }
})();

// plugins/basestyle.js
/**
 * B、I、sub、super命令支持
 * @file
 * @since 1.2.6.1
 */

UE.plugins['basestyle'] = function(){

    /**
     * 字体加粗
     * @command bold
     * @param { String } cmd 命令字符串
     * @remind 对已加粗的文本内容执行该命令， 将取消加粗
     * @method execCommand
     * @example
     * ```javascript
     * //editor是编辑器实例
     * //对当前选中的文本内容执行加粗操作
     * //第一次执行， 文本内容加粗
     * editor.execCommand( 'bold' );
     *
     * //第二次执行， 文本内容取消加粗
     * editor.execCommand( 'bold' );
     * ```
     */


    /**
     * 字体倾斜
     * @command italic
     * @method execCommand
     * @param { String } cmd 命令字符串
     * @remind 对已倾斜的文本内容执行该命令， 将取消倾斜
     * @example
     * ```javascript
     * //editor是编辑器实例
     * //对当前选中的文本内容执行斜体操作
     * //第一次操作， 文本内容将变成斜体
     * editor.execCommand( 'italic' );
     *
     * //再次对同一文本内容执行， 则文本内容将恢复正常
     * editor.execCommand( 'italic' );
     * ```
     */

    /**
     * 下标文本，与“superscript”命令互斥
     * @command subscript
     * @method execCommand
     * @remind  把选中的文本内容切换成下标文本， 如果当前选中的文本已经是下标， 则该操作会把文本内容还原成正常文本
     * @param { String } cmd 命令字符串
     * @example
     * ```javascript
     * //editor是编辑器实例
     * //对当前选中的文本内容执行下标操作
     * //第一次操作， 文本内容将变成下标文本
     * editor.execCommand( 'subscript' );
     *
     * //再次对同一文本内容执行， 则文本内容将恢复正常
     * editor.execCommand( 'subscript' );
     * ```
     */

    /**
     * 上标文本，与“subscript”命令互斥
     * @command superscript
     * @method execCommand
     * @remind 把选中的文本内容切换成上标文本， 如果当前选中的文本已经是上标， 则该操作会把文本内容还原成正常文本
     * @param { String } cmd 命令字符串
     * @example
     * ```javascript
     * //editor是编辑器实例
     * //对当前选中的文本内容执行上标操作
     * //第一次操作， 文本内容将变成上标文本
     * editor.execCommand( 'superscript' );
     *
     * //再次对同一文本内容执行， 则文本内容将恢复正常
     * editor.execCommand( 'superscript' );
     * ```
     */
    var basestyles = {
            'bold':['strong','b'],
            'italic':['em','i'],
            'subscript':['sub'],
            'superscript':['sup']
        },
        getObj = function(editor,tagNames){
            return domUtils.filterNodeList(editor.selection.getStartElementPath(),tagNames);
        },
        me = this;
    //添加快捷键
    me.addshortcutkey({
        "Bold" : "ctrl+66",//^B
        "Italic" : "ctrl+73", //^I
        "Underline" : "ctrl+85"//^U
    });
    me.addInputRule(function(root){
        utils.each(root.getNodesByTagName('b i'),function(node){
            switch (node.tagName){
                case 'b':
                    node.tagName = 'strong';
                    break;
                case 'i':
                    node.tagName = 'em';
            }
        });
    });
    for ( var style in basestyles ) {
        (function( cmd, tagNames ) {
            me.commands[cmd] = {
                execCommand : function( cmdName ) {
                    var range = me.selection.getRange(),obj = getObj(this,tagNames);
                    if ( range.collapsed ) {
                        if ( obj ) {
                            var tmpText =  me.document.createTextNode('');
                            range.insertNode( tmpText ).removeInlineStyle( tagNames );
                            range.setStartBefore(tmpText);
                            domUtils.remove(tmpText);
                        } else {
                            var tmpNode = range.document.createElement( tagNames[0] );
                            if(cmdName == 'superscript' || cmdName == 'subscript'){
                                tmpText = me.document.createTextNode('');
                                range.insertNode(tmpText)
                                    .removeInlineStyle(['sub','sup'])
                                    .setStartBefore(tmpText)
                                    .collapse(true);
                            }
                            range.insertNode( tmpNode ).setStart( tmpNode, 0 );
                        }
                        range.collapse( true );
                    } else {
                        if(cmdName == 'superscript' || cmdName == 'subscript'){
                            if(!obj || obj.tagName.toLowerCase() != cmdName){
                                range.removeInlineStyle(['sub','sup']);
                            }
                        }
                        obj ? range.removeInlineStyle( tagNames ) : range.applyInlineStyle( tagNames[0] );
                    }
                    range.select();
                },
                queryCommandState : function() {
                   return getObj(this,tagNames) ? 1 : 0;
                }
            };
        })( style, basestyles[style] );
    }
};



// plugins/simpleupload.js
/**
 * @description
 * 简单上传:点击按钮,直接选择文件上传
 * @author Jinqn
 * @date 2014-03-31
 */
UE.plugin.register('simpleupload', function (){
    var me = this,
        isLoaded = false,
        containerBtn;

    function initUploadBtn(){
        var w = containerBtn.offsetWidth || 20,
            h = containerBtn.offsetHeight || 20,
            btnIframe = document.createElement('iframe'),
            btnStyle = 'display:block;width:' + w + 'px;height:' + h + 'px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;';

        domUtils.on(btnIframe, 'load', function(){

            var timestrap = (+new Date()).toString(36),
                wrapper,
                btnIframeDoc,
                btnIframeBody;

            btnIframeDoc = (btnIframe.contentDocument || btnIframe.contentWindow.document);
            btnIframeBody = btnIframeDoc.body;
            wrapper = btnIframeDoc.createElement('div');

            wrapper.innerHTML = '<form id="edui_form_' + timestrap + '" target="edui_iframe_' + timestrap + '" method="POST" enctype="multipart/form-data" action="' + me.getOpt('serverUrl') + '" ' +
            'style="' + btnStyle + '">' +
            '<input id="edui_input_' + timestrap + '" type="file" accept="image/*" name="' + me.options.imageFieldName + '" ' +
            'style="' + btnStyle + '">' +
            '</form>' +
            '<iframe id="edui_iframe_' + timestrap + '" name="edui_iframe_' + timestrap + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>';

            wrapper.className = 'edui-' + me.options.theme;
            wrapper.id = me.ui.id + '_iframeupload';
            btnIframeBody.style.cssText = btnStyle;
            btnIframeBody.style.width = w + 'px';
            btnIframeBody.style.height = h + 'px';
            btnIframeBody.appendChild(wrapper);

            if (btnIframeBody.parentNode) {
                btnIframeBody.parentNode.style.width = w + 'px';
                btnIframeBody.parentNode.style.height = w + 'px';
            }

            var form = btnIframeDoc.getElementById('edui_form_' + timestrap);
            var input = btnIframeDoc.getElementById('edui_input_' + timestrap);
            var iframe = btnIframeDoc.getElementById('edui_iframe_' + timestrap);

            domUtils.on(input, 'change', function(){
                if(!input.value) return;
                var loadingId = 'loading_' + (+new Date()).toString(36);
                var params = utils.serializeParam(me.queryCommandValue('serverparam')) || '';

                var imageActionUrl = me.getActionUrl(me.getOpt('imageActionName'));
                var allowFiles = me.getOpt('imageAllowFiles');

                me.focus();
                me.execCommand('inserthtml', '<img class="loadingclass" id="' + loadingId + '" src="' + me.options.themePath + me.options.theme +'/images/spacer.gif" title="' + (me.getLang('simpleupload.loading') || '') + '" >');

                function callback(){
                    try{
                        var link, json, loader,
                            body = (iframe.contentDocument || iframe.contentWindow.document).body,
                            result = body.innerText || body.textContent || '';
                        json = (new Function("return " + result))();
                        link = me.options.imageUrlPrefix + json.url;
                        if(json.state == 'SUCCESS' && json.url) {
                            loader = me.document.getElementById(loadingId);
                            loader.setAttribute('src', link);
                            loader.setAttribute('_src', link);
                            loader.setAttribute('title', json.title || '');
                            loader.setAttribute('alt', json.original || '');
                            loader.removeAttribute('id');
                            domUtils.removeClasses(loader, 'loadingclass');
                        } else {
                            showErrorLoader && showErrorLoader(json.state);
                        }
                    }catch(er){
                        showErrorLoader && showErrorLoader(me.getLang('simpleupload.loadError'));
                    }
                    form.reset();
                    domUtils.un(iframe, 'load', callback);
                }
                function showErrorLoader(title){
                    if(loadingId) {
                        var loader = me.document.getElementById(loadingId);
                        loader && domUtils.remove(loader);
                        me.fireEvent('showmessage', {
                            'id': loadingId,
                            'content': title,
                            'type': 'error',
                            'timeout': 4000
                        });
                    }
                }

                /* 判断后端配置是否没有加载成功 */
                if (!me.getOpt('imageActionName')) {
                    errorHandler(me.getLang('autoupload.errorLoadConfig'));
                    return;
                }
                // 判断文件格式是否错误
                var filename = input.value,
                    fileext = filename ? filename.substr(filename.lastIndexOf('.')):'';
                if (!fileext || (allowFiles && (allowFiles.join('') + '.').indexOf(fileext.toLowerCase() + '.') == -1)) {
                    showErrorLoader(me.getLang('simpleupload.exceedTypeError'));
                    return;
                }

                domUtils.on(iframe, 'load', callback);
                form.action = utils.formatUrl(imageActionUrl + (imageActionUrl.indexOf('?') == -1 ? '?':'&') + params);
                form.submit();
            });

            var stateTimer;
            me.addListener('selectionchange', function () {
                clearTimeout(stateTimer);
                stateTimer = setTimeout(function() {
                    var state = me.queryCommandState('simpleupload');
                    if (state == -1) {
                        input.disabled = 'disabled';
                    } else {
                        input.disabled = false;
                    }
                }, 400);
            });
            isLoaded = true;
        });

        btnIframe.style.cssText = btnStyle;
        containerBtn.appendChild(btnIframe);
    }

    return {
        bindEvents:{
            'ready': function() {
                //设置loading的样式
                utils.cssRule('loading',
                    '.loadingclass{display:inline-block;cursor:default;background: url(\''
                    + this.options.themePath
                    + this.options.theme +'/images/loading.gif\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n' +
                    '.loaderrorclass{display:inline-block;cursor:default;background: url(\''
                    + this.options.themePath
                    + this.options.theme +'/images/loaderror.png\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;' +
                    '}',
                    this.document);
            },
            /* 初始化简单上传按钮 */
            'simpleuploadbtnready': function(type, container) {
                containerBtn = container;
                me.afterConfigReady(initUploadBtn);
            }
        },
        outputRule: function(root){
            utils.each(root.getNodesByTagName('img'),function(n){
                if (/\b(loaderrorclass)|(bloaderrorclass)\b/.test(n.getAttr('class'))) {
                    n.parentNode.removeChild(n);
                }
            });
        },
        commands: {
            'simpleupload': {
                queryCommandState: function () {
                    return isLoaded ? 0:-1;
                }
            }
        }
    }
});

// plugins/serverparam.js
/**
 * 服务器提交的额外参数列表设置插件
 * @file
 * @since 1.2.6.1
 */
UE.plugin.register('serverparam', function (){

    var me = this,
        serverParam = {};

    return {
        commands:{
            /**
             * 修改服务器提交的额外参数列表,清除所有项
             * @command serverparam
             * @method execCommand
             * @param { String } cmd 命令字符串
             * @example
             * ```javascript
             * editor.execCommand('serverparam');
             * editor.queryCommandValue('serverparam'); //返回空
             * ```
             */
            /**
             * 修改服务器提交的额外参数列表,删除指定项
             * @command serverparam
             * @method execCommand
             * @param { String } cmd 命令字符串
             * @param { String } key 要清除的属性
             * @example
             * ```javascript
             * editor.execCommand('serverparam', 'name'); //删除属性name
             * ```
             */
            /**
             * 修改服务器提交的额外参数列表,使用键值添加项
             * @command serverparam
             * @method execCommand
             * @param { String } cmd 命令字符串
             * @param { String } key 要添加的属性
             * @param { String } value 要添加属性的值
             * @example
             * ```javascript
             * editor.execCommand('serverparam', 'name', 'hello');
             * editor.queryCommandValue('serverparam'); //返回对象 {'name': 'hello'}
             * ```
             */
            /**
             * 修改服务器提交的额外参数列表,传入键值对对象添加多项
             * @command serverparam
             * @method execCommand
             * @param { String } cmd 命令字符串
             * @param { Object } key 传入的键值对对象
             * @example
             * ```javascript
             * editor.execCommand('serverparam', {'name': 'hello'});
             * editor.queryCommandValue('serverparam'); //返回对象 {'name': 'hello'}
             * ```
             */
            /**
             * 修改服务器提交的额外参数列表,使用自定义函数添加多项
             * @command serverparam
             * @method execCommand
             * @param { String } cmd 命令字符串
             * @param { Function } key 自定义获取参数的函数
             * @example
             * ```javascript
             * editor.execCommand('serverparam', function(editor){
             *     return {'key': 'value'};
             * });
             * editor.queryCommandValue('serverparam'); //返回对象 {'key': 'value'}
             * ```
             */

            /**
             * 获取服务器提交的额外参数列表
             * @command serverparam
             * @method queryCommandValue
             * @param { String } cmd 命令字符串
             * @example
             * ```javascript
             * editor.queryCommandValue( 'serverparam' ); //返回对象 {'key': 'value'}
             * ```
             */
            'serverparam':{
                execCommand:function (cmd, key, value) {
                    if (key === undefined || key === null) { //不传参数,清空列表
                        serverParam = {};
                    } else if (utils.isString(key)) { //传入键值
                        if(value === undefined || value === null) {
                            delete serverParam[key];
                        } else {
                            serverParam[key] = value;
                        }
                    } else if (utils.isObject(key)) { //传入对象,覆盖列表项
                        utils.extend(serverParam, key, true);
                    } else if (utils.isFunction(key)){ //传入函数,添加列表项
                        utils.extend(serverParam, key(), true);
                    }
                },
                queryCommandValue: function(){
                    return serverParam || {};
                }
            }
        }
    }
});


// ui/ui.js
var baidu = baidu || {};
baidu.editor = baidu.editor || {};
UE.ui = baidu.editor.ui = {};

// ui/uiutils.js
(function (){
    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils;

    var magic = '$EDITORUI';
    var root = window[magic] = {};
    var uidMagic = 'ID' + magic;
    var uidCount = 0;

    var uiUtils = baidu.editor.ui.uiUtils = {
        uid: function (obj){
            return (obj ? obj[uidMagic] || (obj[uidMagic] = ++ uidCount) : ++ uidCount);
        },
        hook: function ( fn, callback ) {
            var dg;
            if (fn && fn._callbacks) {
                dg = fn;
            } else {
                dg = function (){
                    var q;
                    if (fn) {
                        q = fn.apply(this, arguments);
                    }
                    var callbacks = dg._callbacks;
                    var k = callbacks.length;
                    while (k --) {
                        var r = callbacks[k].apply(this, arguments);
                        if (q === undefined) {
                            q = r;
                        }
                    }
                    return q;
                };
                dg._callbacks = [];
            }
            dg._callbacks.push(callback);
            return dg;
        },
        createElementByHtml: function (html){
            var el = document.createElement('div');
            el.innerHTML = html;
            el = el.firstChild;
            el.parentNode.removeChild(el);
            return el;
        },
        getViewportElement: function (){
            return (browser.ie && browser.quirks) ?
                document.body : document.documentElement;
        },
        getClientRect: function (element){
            var bcr;
            //trace  IE6下在控制编辑器显隐时可能会报错，catch一下
            try{
                bcr = element.getBoundingClientRect();
            }catch(e){
                bcr={left:0,top:0,height:0,width:0}
            }
            var rect = {
                left: Math.round(bcr.left),
                top: Math.round(bcr.top),
                height: Math.round(bcr.bottom - bcr.top),
                width: Math.round(bcr.right - bcr.left)
            };
            var doc;
            while ((doc = element.ownerDocument) !== document &&
                (element = domUtils.getWindow(doc).frameElement)) {
                bcr = element.getBoundingClientRect();
                rect.left += bcr.left;
                rect.top += bcr.top;
            }
            rect.bottom = rect.top + rect.height;
            rect.right = rect.left + rect.width;
            return rect;
        },
        getViewportRect: function (){
            var viewportEl = uiUtils.getViewportElement();
            var width = (window.innerWidth || viewportEl.clientWidth) | 0;
            var height = (window.innerHeight ||viewportEl.clientHeight) | 0;
            return {
                left: 0,
                top: 0,
                height: height,
                width: width,
                bottom: height,
                right: width
            };
        },
        setViewportOffset: function (element, offset){
            var rect;
            var fixedLayer = uiUtils.getFixedLayer();
            if (element.parentNode === fixedLayer) {
                element.style.left = offset.left + 'px';
                element.style.top = offset.top + 'px';
            } else {
                domUtils.setViewportOffset(element, offset);
            }
        },
        getEventOffset: function (evt){
            var el = evt.target || evt.srcElement;
            var rect = uiUtils.getClientRect(el);
            var offset = uiUtils.getViewportOffsetByEvent(evt);
            return {
                left: offset.left - rect.left,
                top: offset.top - rect.top
            };
        },
        getViewportOffsetByEvent: function (evt){
            var el = evt.target || evt.srcElement;
            var frameEl = domUtils.getWindow(el).frameElement;
            var offset = {
                left: evt.clientX,
                top: evt.clientY
            };
            if (frameEl && el.ownerDocument !== document) {
                var rect = uiUtils.getClientRect(frameEl);
                offset.left += rect.left;
                offset.top += rect.top;
            }
            return offset;
        },
        setGlobal: function (id, obj){
            root[id] = obj;
            return magic + '["' + id  + '"]';
        },
        unsetGlobal: function (id){
            delete root[id];
        },
        copyAttributes: function (tgt, src){
            var attributes = src.attributes;
            var k = attributes.length;
            while (k --) {
                var attrNode = attributes[k];
                if ( attrNode.nodeName != 'style' && attrNode.nodeName != 'class' && (!browser.ie || attrNode.specified) ) {
                    tgt.setAttribute(attrNode.nodeName, attrNode.nodeValue);
                }
            }
            if (src.className) {
                domUtils.addClass(tgt,src.className);
            }
            if (src.style.cssText) {
                tgt.style.cssText += ';' + src.style.cssText;
            }
        },
        removeStyle: function (el, styleName){
            if (el.style.removeProperty) {
                el.style.removeProperty(styleName);
            } else if (el.style.removeAttribute) {
                el.style.removeAttribute(styleName);
            } else throw '';
        },
        contains: function (elA, elB){
            return elA && elB && (elA === elB ? false : (
                elA.contains ? elA.contains(elB) :
                    elA.compareDocumentPosition(elB) & 16
                ));
        },
        startDrag: function (evt, callbacks,doc){
            var doc = doc || document;
            var startX = evt.clientX;
            var startY = evt.clientY;
            function handleMouseMove(evt){
                var x = evt.clientX - startX;
                var y = evt.clientY - startY;
                callbacks.ondragmove(x, y,evt);
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                } else {
                    evt.cancelBubble = true;
                }
            }
            if (doc.addEventListener) {
                function handleMouseUp(evt){
                    doc.removeEventListener('mousemove', handleMouseMove, true);
                    doc.removeEventListener('mouseup', handleMouseUp, true);
                    window.removeEventListener('mouseup', handleMouseUp, true);
                    callbacks.ondragstop();
                }
                doc.addEventListener('mousemove', handleMouseMove, true);
                doc.addEventListener('mouseup', handleMouseUp, true);
                window.addEventListener('mouseup', handleMouseUp, true);

                evt.preventDefault();
            } else {
                var elm = evt.srcElement;
                elm.setCapture();
                function releaseCaptrue(){
                    elm.releaseCapture();
                    elm.detachEvent('onmousemove', handleMouseMove);
                    elm.detachEvent('onmouseup', releaseCaptrue);
                    elm.detachEvent('onlosecaptrue', releaseCaptrue);
                    callbacks.ondragstop();
                }
                elm.attachEvent('onmousemove', handleMouseMove);
                elm.attachEvent('onmouseup', releaseCaptrue);
                elm.attachEvent('onlosecaptrue', releaseCaptrue);
                evt.returnValue = false;
            }
            callbacks.ondragstart();
        },
        getFixedLayer: function (){
            var layer = document.getElementById('edui_fixedlayer');
            if (layer == null) {
                layer = document.createElement('div');
                layer.id = 'edui_fixedlayer';
                document.body.appendChild(layer);
                if (browser.ie && browser.version <= 8) {
                    layer.style.position = 'absolute';
                    bindFixedLayer();
                    setTimeout(updateFixedOffset);
                } else {
                    layer.style.position = 'fixed';
                }
                layer.style.left = '0';
                layer.style.top = '0';
                layer.style.width = '0';
                layer.style.height = '0';
            }
            return layer;
        },
        makeUnselectable: function (element){
            if (browser.opera || (browser.ie && browser.version < 9)) {
                element.unselectable = 'on';
                if (element.hasChildNodes()) {
                    for (var i=0; i<element.childNodes.length; i++) {
                        if (element.childNodes[i].nodeType == 1) {
                            uiUtils.makeUnselectable(element.childNodes[i]);
                        }
                    }
                }
            } else {
                if (element.style.MozUserSelect !== undefined) {
                    element.style.MozUserSelect = 'none';
                } else if (element.style.WebkitUserSelect !== undefined) {
                    element.style.WebkitUserSelect = 'none';
                } else if (element.style.KhtmlUserSelect !== undefined) {
                    element.style.KhtmlUserSelect = 'none';
                }
            }
        }
    };
    function updateFixedOffset(){
        var layer = document.getElementById('edui_fixedlayer');
        uiUtils.setViewportOffset(layer, {
            left: 0,
            top: 0
        });
//        layer.style.display = 'none';
//        layer.style.display = 'block';

        //#trace: 1354
//        setTimeout(updateFixedOffset);
    }
    function bindFixedLayer(adjOffset){
        domUtils.on(window, 'scroll', updateFixedOffset);
        domUtils.on(window, 'resize', baidu.editor.utils.defer(updateFixedOffset, 0, true));
    }
})();


// ui/uibase.js
(function () {
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        EventBase = baidu.editor.EventBase,
        UIBase = baidu.editor.ui.UIBase = function () {
        };

    UIBase.prototype = {
        className:'',
        uiName:'',
        initOptions:function (options) {
            var me = this;
            for (var k in options) {
                me[k] = options[k];
            }
            this.id = this.id || 'edui' + uiUtils.uid();
        },
        initUIBase:function () {
            this._globalKey = utils.unhtml(uiUtils.setGlobal(this.id, this));
        },
        render:function (holder) {
            var html = this.renderHtml();
            var el = uiUtils.createElementByHtml(html);

            //by xuheng 给每个node添加class
            var list = domUtils.getElementsByTagName(el, "*");
            var theme = "edui-" + (this.theme || this.editor.options.theme);
            var layer = document.getElementById('edui_fixedlayer');
            for (var i = 0, node; node = list[i++];) {
                domUtils.addClass(node, theme);
            }
            domUtils.addClass(el, theme);
            if(layer){
                layer.className="";
                domUtils.addClass(layer,theme);
            }

            var seatEl = this.getDom();
            if (seatEl != null) {
                seatEl.parentNode.replaceChild(el, seatEl);
                uiUtils.copyAttributes(el, seatEl);
            } else {
                if (typeof holder == 'string') {
                    holder = document.getElementById(holder);
                }
                holder = holder || uiUtils.getFixedLayer();
                domUtils.addClass(holder, theme);
                holder.appendChild(el);
            }
            this.postRender();
        },
        getDom:function (name) {
            if (!name) {
                return document.getElementById(this.id);
            } else {
                return document.getElementById(this.id + '_' + name);
            }
        },
        postRender:function () {
            this.fireEvent('postrender');
        },
        getHtmlTpl:function () {
            return '';
        },
        formatHtml:function (tpl) {
            var prefix = 'edui-' + this.uiName;
            return (tpl
                .replace(/##/g, this.id)
                .replace(/%%-/g, this.uiName ? prefix + '-' : '')
                .replace(/%%/g, (this.uiName ? prefix : '') + ' ' + this.className)
                .replace(/\$\$/g, this._globalKey));
        },
        renderHtml:function () {
            return this.formatHtml(this.getHtmlTpl());
        },
        dispose:function () {
            var box = this.getDom();
            if (box) baidu.editor.dom.domUtils.remove(box);
            uiUtils.unsetGlobal(this.id);
        }
    };
    utils.inherits(UIBase, EventBase);
})();


// ui/separator.js
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Separator = baidu.editor.ui.Separator = function (options){
            this.initOptions(options);
            this.initSeparator();
        };
    Separator.prototype = {
        uiName: 'separator',
        initSeparator: function (){
            this.initUIBase();
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%"></div>';
        }
    };
    utils.inherits(Separator, UIBase);

})();


// ui/mask.js
///import core
///import uicore
(function (){
    var utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils,
        UIBase = baidu.editor.ui.UIBase,
        uiUtils = baidu.editor.ui.uiUtils;
    
    var Mask = baidu.editor.ui.Mask = function (options){
        this.initOptions(options);
        this.initUIBase();
    };
    Mask.prototype = {
        getHtmlTpl: function (){
            return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>';
        },
        postRender: function (){
            var me = this;
            domUtils.on(window, 'resize', function (){
                setTimeout(function (){
                    if (!me.isHidden()) {
                        me._fill();
                    }
                });
            });
        },
        show: function (zIndex){
            this._fill();
            this.getDom().style.display = '';
            this.getDom().style.zIndex = zIndex;
        },
        hide: function (){
            this.getDom().style.display = 'none';
            this.getDom().style.zIndex = '';
        },
        isHidden: function (){
            return this.getDom().style.display == 'none';
        },
        _onMouseDown: function (){
            return false;
        },
        _onClick: function (e, target){
            this.fireEvent('click', e, target);
        },
        _fill: function (){
            var el = this.getDom();
            var vpRect = uiUtils.getViewportRect();
            el.style.width = vpRect.width + 'px';
            el.style.height = vpRect.height + 'px';
        }
    };
    utils.inherits(Mask, UIBase);
})();


// ui/popup.js
///import core
///import uicore
(function () {
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        domUtils = baidu.editor.dom.domUtils,
        UIBase = baidu.editor.ui.UIBase,
        Popup = baidu.editor.ui.Popup = function (options){
            this.initOptions(options);
            this.initPopup();
        };

    var allPopups = [];
    function closeAllPopup( evt,el ){
        for ( var i = 0; i < allPopups.length; i++ ) {
            var pop = allPopups[i];
            if (!pop.isHidden()) {
                if (pop.queryAutoHide(el) !== false) {
                    if(evt&&/scroll/ig.test(evt.type)&&pop.className=="edui-wordpastepop")   return;
                    pop.hide();
                }
            }
        }

        if(allPopups.length)
            pop.editor.fireEvent("afterhidepop");
    }

    Popup.postHide = closeAllPopup;

    var ANCHOR_CLASSES = ['edui-anchor-topleft','edui-anchor-topright',
        'edui-anchor-bottomleft','edui-anchor-bottomright'];
    Popup.prototype = {
        SHADOW_RADIUS: 5,
        content: null,
        _hidden: false,
        autoRender: true,
        canSideLeft: true,
        canSideUp: true,
        initPopup: function (){
            this.initUIBase();
            allPopups.push( this );
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-popup %%" onmousedown="return false;">' +
                ' <div id="##_body" class="edui-popup-body">' +
                ' <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe>' +
                ' <div class="edui-shadow"></div>' +
                ' <div id="##_content" class="edui-popup-content">' +
                this.getContentHtmlTpl() +
                '  </div>' +
                ' </div>' +
                '</div>';
        },
        getContentHtmlTpl: function (){
            if(this.content){
                if (typeof this.content == 'string') {
                    return this.content;
                }
                return this.content.renderHtml();
            }else{
                return ''
            }

        },
        _UIBase_postRender: UIBase.prototype.postRender,
        postRender: function (){


            if (this.content instanceof UIBase) {
                this.content.postRender();
            }

            //捕获鼠标滚轮
            if( this.captureWheel && !this.captured ) {

                this.captured = true;

                var winHeight = ( document.documentElement.clientHeight || document.body.clientHeight )  - 80,
                    _height = this.getDom().offsetHeight,
                    _top = uiUtils.getClientRect( this.combox.getDom() ).top,
                    content = this.getDom('content'),
                    ifr = this.getDom('body').getElementsByTagName('iframe'),
                    me = this;

                ifr.length && ( ifr = ifr[0] );

                while( _top + _height > winHeight ) {
                    _height -= 30;
                }
                content.style.height = _height + 'px';
                //同步更改iframe高度
                ifr && ( ifr.style.height = _height + 'px' );

                //阻止在combox上的鼠标滚轮事件, 防止用户的正常操作被误解
                if( window.XMLHttpRequest ) {

                    domUtils.on( content, ( 'onmousewheel' in document.body ) ? 'mousewheel' :'DOMMouseScroll' , function(e){

                        if(e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }

                        if( e.wheelDelta ) {

                            content.scrollTop -= ( e.wheelDelta / 120 )*60;

                        } else {

                            content.scrollTop -= ( e.detail / -3 )*60;

                        }

                    });

                } else {

                    //ie6
                    domUtils.on( this.getDom(), 'mousewheel' , function(e){

                        e.returnValue = false;

                        me.getDom('content').scrollTop -= ( e.wheelDelta / 120 )*60;

                    });

                }

            }
            this.fireEvent('postRenderAfter');
            this.hide(true);
            this._UIBase_postRender();
        },
        _doAutoRender: function (){
            if (!this.getDom() && this.autoRender) {
                this.render();
            }
        },
        mesureSize: function (){
            var box = this.getDom('content');
            return uiUtils.getClientRect(box);
        },
        fitSize: function (){
            if( this.captureWheel && this.sized ) {
                return this.__size;
            }
            this.sized = true;
            var popBodyEl = this.getDom('body');
            popBodyEl.style.width = '';
            popBodyEl.style.height = '';
            var size = this.mesureSize();
            if( this.captureWheel ) {
                popBodyEl.style.width =  -(-20 -size.width) + 'px';
                var height = parseInt( this.getDom('content').style.height, 10 );
                !window.isNaN( height ) && ( size.height = height );
            } else {
                popBodyEl.style.width =  size.width + 'px';
            }
            popBodyEl.style.height = size.height + 'px';
            this.__size = size;
            this.captureWheel && (this.getDom('content').style.overflow = 'auto');
            return size;
        },
        showAnchor: function ( element, hoz ){
            this.showAnchorRect( uiUtils.getClientRect( element ), hoz );
        },
        showAnchorRect: function ( rect, hoz, adj ){
            this._doAutoRender();
            var vpRect = uiUtils.getViewportRect();
            this.getDom().style.visibility = 'hidden';
            this._show();
            var popSize = this.fitSize();

            var sideLeft, sideUp, left, top;
            if (hoz) {
                sideLeft = this.canSideLeft && (rect.right + popSize.width > vpRect.right && rect.left > popSize.width);
                sideUp = this.canSideUp && (rect.top + popSize.height > vpRect.bottom && rect.bottom > popSize.height);
                left = (sideLeft ? rect.left - popSize.width : rect.right);
                top = (sideUp ? rect.bottom - popSize.height : rect.top);
            } else {
                sideLeft = this.canSideLeft && (rect.right + popSize.width > vpRect.right && rect.left > popSize.width);
                sideUp = this.canSideUp && (rect.top + popSize.height > vpRect.bottom && rect.bottom > popSize.height);
                left = (sideLeft ? rect.right - popSize.width : rect.left);
                top = (sideUp ? rect.top - popSize.height : rect.bottom);
            }

            var popEl = this.getDom();
            uiUtils.setViewportOffset(popEl, {
                left: left,
                top: top
            });
            domUtils.removeClasses(popEl, ANCHOR_CLASSES);
            popEl.className += ' ' + ANCHOR_CLASSES[(sideUp ? 1 : 0) * 2 + (sideLeft ? 1 : 0)];
            if(this.editor){
                popEl.style.zIndex = this.editor.container.style.zIndex * 1 + 10;
                baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = popEl.style.zIndex - 1;
            }
            this.getDom().style.visibility = 'visible';

        },
        showAt: function (offset) {
            var left = offset.left;
            var top = offset.top;
            var rect = {
                left: left,
                top: top,
                right: left,
                bottom: top,
                height: 0,
                width: 0
            };
            this.showAnchorRect(rect, false, true);
        },
        _show: function (){
            if (this._hidden) {
                var box = this.getDom();
                box.style.display = '';
                this._hidden = false;
//                if (box.setActive) {
//                    box.setActive();
//                }
                this.fireEvent('show');
            }
        },
        isHidden: function (){
            return this._hidden;
        },
        show: function (){
            this._doAutoRender();
            this._show();
        },
        hide: function (notNofity){
            if (!this._hidden && this.getDom()) {
                this.getDom().style.display = 'none';
                this._hidden = true;
                if (!notNofity) {
                    this.fireEvent('hide');
                }
            }
        },
        queryAutoHide: function (el){
            return !el || !uiUtils.contains(this.getDom(), el);
        }
    };
    utils.inherits(Popup, UIBase);
    
    domUtils.on( document, 'mousedown', function ( evt ) {
        var el = evt.target || evt.srcElement;
        closeAllPopup( evt,el );
    } );
    domUtils.on( window, 'scroll', function (evt,el) {
        closeAllPopup( evt,el );
    } );

})();


// ui/colorpicker.js
///import core
///import uicore
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        ColorPicker = baidu.editor.ui.ColorPicker = function (options){
            this.initOptions(options);
            this.noColorText = this.noColorText || this.editor.getLang("clearColor");
            this.initUIBase();
        };

    ColorPicker.prototype = {
        getHtmlTpl: function (){
            return genColorPicker(this.noColorText,this.editor);
        },
        _onTableClick: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.fireEvent('pickcolor', color);
            }
        },
        _onTableOver: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.getDom('preview').style.backgroundColor = color;
            }
        },
        _onTableOut: function (){
            this.getDom('preview').style.backgroundColor = '';
        },
        _onPickNoColor: function (){
            this.fireEvent('picknocolor');
        }
    };
    utils.inherits(ColorPicker, UIBase);

    var COLORS = (
        'ffffff,000000,eeece1,1f497d,4f81bd,c0504d,9bbb59,8064a2,4bacc6,f79646,' +
            'f2f2f2,7f7f7f,ddd9c3,c6d9f0,dbe5f1,f2dcdb,ebf1dd,e5e0ec,dbeef3,fdeada,' +
            'd8d8d8,595959,c4bd97,8db3e2,b8cce4,e5b9b7,d7e3bc,ccc1d9,b7dde8,fbd5b5,' +
            'bfbfbf,3f3f3f,938953,548dd4,95b3d7,d99694,c3d69b,b2a2c7,92cddc,fac08f,' +
            'a5a5a5,262626,494429,17365d,366092,953734,76923c,5f497a,31859b,e36c09,' +
            '7f7f7f,0c0c0c,1d1b10,0f243e,244061,632423,4f6128,3f3151,205867,974806,' +
            'c00000,ff0000,ffc000,ffff00,92d050,00b050,00b0f0,0070c0,002060,7030a0,').split(',');

    function genColorPicker(noColorText,editor){
        var html = '<div id="##" class="edui-colorpicker %%">' +
            '<div class="edui-colorpicker-topbar edui-clearfix">' +
            '<div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div>' +
            '<div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">'+ noColorText +'</div>' +
            '</div>' +
            '<table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0">' +
            '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;padding-top: 2px"><td colspan="10">'+editor.getLang("themeColor")+'</td> </tr>'+
            '<tr class="edui-colorpicker-tablefirstrow" >';
        for (var i=0; i<COLORS.length; i++) {
            if (i && i%10 === 0) {
                html += '</tr>'+(i==60?'<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;"><td colspan="10">'+editor.getLang("standardColor")+'</td></tr>':'')+'<tr'+(i==60?' class="edui-colorpicker-tablefirstrow"':'')+'>';
            }
            html += i<70 ? '<td style="padding: 0 2px;"><a hidefocus title="'+COLORS[i]+'" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell"' +
                ' data-color="#'+ COLORS[i] +'"'+
                ' style="background-color:#'+ COLORS[i] +';border:solid #ccc;'+
                (i<10 || i>=60?'border-width:1px;':
                    i>=10&&i<20?'border-width:1px 1px 0 1px;':

                        'border-width:0 1px 0 1px;')+
                '"' +
                '></a></td>':'';
        }
        html += '</tr></table></div>';
        return html;
    }
})();


// ui/tablepicker.js
///import core
///import uicore
(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase;
    
    var TablePicker = baidu.editor.ui.TablePicker = function (options){
        this.initOptions(options);
        this.initTablePicker();
    };
    TablePicker.prototype = {
        defaultNumRows: 10,
        defaultNumCols: 10,
        maxNumRows: 20,
        maxNumCols: 20,
        numRows: 10,
        numCols: 10,
        lengthOfCellSide: 22,
        initTablePicker: function (){
            this.initUIBase();
        },
        getHtmlTpl: function (){
            var me = this;
            return '<div id="##" class="edui-tablepicker %%">' +
                 '<div class="edui-tablepicker-body">' +
                  '<div class="edui-infoarea">' +
                   '<span id="##_label" class="edui-label"></span>' +
                  '</div>' +
                  '<div class="edui-pickarea"' +
                   ' onmousemove="$$._onMouseMove(event, this);"' +
                   ' onmouseover="$$._onMouseOver(event, this);"' +
                   ' onmouseout="$$._onMouseOut(event, this);"' +
                   ' onclick="$$._onClick(event, this);"' +
                  '>' +
                    '<div id="##_overlay" class="edui-overlay"></div>' +
                  '</div>' +
                 '</div>' +
                '</div>';
        },
        _UIBase_render: UIBase.prototype.render,
        render: function (holder){
            this._UIBase_render(holder);
            this.getDom('label').innerHTML = '0'+this.editor.getLang("t_row")+' x 0'+this.editor.getLang("t_col");
        },
        _track: function (numCols, numRows){
            var style = this.getDom('overlay').style;
            var sideLen = this.lengthOfCellSide;
            style.width = numCols * sideLen + 'px';
            style.height = numRows * sideLen + 'px';
            var label = this.getDom('label');
            label.innerHTML = numCols +this.editor.getLang("t_col")+' x ' + numRows + this.editor.getLang("t_row");
            this.numCols = numCols;
            this.numRows = numRows;
        },
        _onMouseOver: function (evt, el){
            var rel = evt.relatedTarget || evt.fromElement;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.getDom('label').innerHTML = '0'+this.editor.getLang("t_col")+' x 0'+this.editor.getLang("t_row");
                this.getDom('overlay').style.visibility = '';
            }
        },
        _onMouseOut: function (evt, el){
            var rel = evt.relatedTarget || evt.toElement;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.getDom('label').innerHTML = '0'+this.editor.getLang("t_col")+' x 0'+this.editor.getLang("t_row");
                this.getDom('overlay').style.visibility = 'hidden';
            }
        },
        _onMouseMove: function (evt, el){
            var style = this.getDom('overlay').style;
            var offset = uiUtils.getEventOffset(evt);
            var sideLen = this.lengthOfCellSide;
            var numCols = Math.ceil(offset.left / sideLen);
            var numRows = Math.ceil(offset.top / sideLen);
            this._track(numCols, numRows);
        },
        _onClick: function (){
            this.fireEvent('picktable', this.numCols, this.numRows);
        }
    };
    utils.inherits(TablePicker, UIBase);
})();


// ui/stateful.js
(function (){
    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils;
    
    var TPL_STATEFUL = 'onmousedown="$$.Stateful_onMouseDown(event, this);"' +
        ' onmouseup="$$.Stateful_onMouseUp(event, this);"' +
        ( browser.ie ? (
        ' onmouseenter="$$.Stateful_onMouseEnter(event, this);"' +
        ' onmouseleave="$$.Stateful_onMouseLeave(event, this);"' )
        : (
        ' onmouseover="$$.Stateful_onMouseOver(event, this);"' +
        ' onmouseout="$$.Stateful_onMouseOut(event, this);"' ));
    
    baidu.editor.ui.Stateful = {
        alwalysHoverable: false,
        target:null,//目标元素和this指向dom不一样
        Stateful_init: function (){
            this._Stateful_dGetHtmlTpl = this.getHtmlTpl;
            this.getHtmlTpl = this.Stateful_getHtmlTpl;
        },
        Stateful_getHtmlTpl: function (){
            var tpl = this._Stateful_dGetHtmlTpl();
            // 使用function避免$转义
            return tpl.replace(/stateful/g, function (){ return TPL_STATEFUL; });
        },
        Stateful_onMouseEnter: function (evt, el){
            this.target=el;
            if (!this.isDisabled() || this.alwalysHoverable) {
                this.addState('hover');
                this.fireEvent('over');
            }
        },
        Stateful_onMouseLeave: function (evt, el){
            if (!this.isDisabled() || this.alwalysHoverable) {
                this.removeState('hover');
                this.removeState('active');
                this.fireEvent('out');
            }
        },
        Stateful_onMouseOver: function (evt, el){
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseEnter(evt, el);
            }
        },
        Stateful_onMouseOut: function (evt, el){
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseLeave(evt, el);
            }
        },
        Stateful_onMouseDown: function (evt, el){
            if (!this.isDisabled()) {
                this.addState('active');
            }
        },
        Stateful_onMouseUp: function (evt, el){
            if (!this.isDisabled()) {
                this.removeState('active');
            }
        },
        Stateful_postRender: function (){
            if (this.disabled && !this.hasState('disabled')) {
                this.addState('disabled');
            }
        },
        hasState: function (state){
            return domUtils.hasClass(this.getStateDom(), 'edui-state-' + state);
        },
        addState: function (state){
            if (!this.hasState(state)) {
                this.getStateDom().className += ' edui-state-' + state;
            }
        },
        removeState: function (state){
            if (this.hasState(state)) {
                domUtils.removeClasses(this.getStateDom(), ['edui-state-' + state]);
            }
        },
        getStateDom: function (){
            return this.getDom('state');
        },
        isChecked: function (){
            return this.hasState('checked');
        },
        setChecked: function (checked){
            if (!this.isDisabled() && checked) {
                this.addState('checked');
            } else {
                this.removeState('checked');
            }
        },
        isDisabled: function (){
            return this.hasState('disabled');
        },
        setDisabled: function (disabled){
            if (disabled) {
                this.removeState('hover');
                this.removeState('checked');
                this.removeState('active');
                this.addState('disabled');
            } else {
                this.removeState('disabled');
            }
        }
    };
})();


// ui/button.js
///import core
///import uicore
///import ui/stateful.js
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Stateful = baidu.editor.ui.Stateful,
        Button = baidu.editor.ui.Button = function (options){
            if(options.name){
                var btnName = options.name;
                var cssRules = options.cssRules;
                if(!options.className){
                    options.className =  'edui-for-' + btnName;
                }
                options.cssRules = '.edui-default  .edui-for-'+ btnName +' .edui-icon {'+ cssRules +'}'
            }
            this.initOptions(options);
            this.initButton();
        };
    Button.prototype = {
        uiName: 'button',
        label: '',
        title: '',
        showIcon: true,
        showText: true,
        cssRules:'',
        initButton: function (){
            this.initUIBase();
            this.Stateful_init();
            if(this.cssRules){
                utils.cssRule('edui-customize-'+this.name+'-style',this.cssRules);
            }
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%">' +
                '<div id="##_state" stateful>' +
                 '<div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : '') +
                 ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' +
                  (this.showIcon ? '<div class="edui-box edui-icon"></div>' : '') +
                  (this.showText ? '<div class="edui-box edui-label">' + this.label + '</div>' : '') +
                 '</div>' +
                '</div>' +
                '</div></div>';
        },
        postRender: function (){
            this.Stateful_postRender();
            this.setDisabled(this.disabled)
        },
        _onMouseDown: function (e){
            var target = e.target || e.srcElement,
                tagName = target && target.tagName && target.tagName.toLowerCase();
            if (tagName == 'input' || tagName == 'object' || tagName == 'object') {
                return false;
            }
        },
        _onClick: function (){
            if (!this.isDisabled()) {
                this.fireEvent('click');
            }
        },
        setTitle: function(text){
            var label = this.getDom('label');
            label.innerHTML = text;
        }
    };
    utils.inherits(Button, UIBase);
    utils.extend(Button.prototype, Stateful);

})();


// ui/splitbutton.js
///import core
///import uicore
///import ui/stateful.js
(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        domUtils = baidu.editor.dom.domUtils,
        UIBase = baidu.editor.ui.UIBase,
        Stateful = baidu.editor.ui.Stateful,
        SplitButton = baidu.editor.ui.SplitButton = function (options){
            this.initOptions(options);
            this.initSplitButton();
        };
    SplitButton.prototype = {
        popup: null,
        uiName: 'splitbutton',
        title: '',
        initSplitButton: function (){
            this.initUIBase();
            this.Stateful_init();
            var me = this;
            if (this.popup != null) {
                var popup = this.popup;
                this.popup = null;
                this.setPopup(popup);
            }
        },
        _UIBase_postRender: UIBase.prototype.postRender,
        postRender: function (){
            this.Stateful_postRender();
            this._UIBase_postRender();
        },
        setPopup: function (popup){
            if (this.popup === popup) return;
            if (this.popup != null) {
                this.popup.dispose();
            }
            popup.addListener('show', utils.bind(this._onPopupShow, this));
            popup.addListener('hide', utils.bind(this._onPopupHide, this));
            popup.addListener('postrender', utils.bind(function (){
                popup.getDom('body').appendChild(
                    uiUtils.createElementByHtml('<div id="' +
                        this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' +
                        (uiUtils.getClientRect(this.getDom()).width + 20) + 'px"></div>')
                    );
                popup.getDom().className += ' ' + this.className;
            }, this));
            this.popup = popup;
        },
        _onPopupShow: function (){
            this.addState('opened');
        },
        _onPopupHide: function (){
            this.removeState('opened');
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%">' +
                '<div '+ (this.title ? 'title="' + this.title + '"' : '') +' id="##_state" stateful><div class="%%-body">' +
                '<div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);">' +
                '<div class="edui-box edui-icon"></div>' +
                '</div>' +
                '<div class="edui-box edui-splitborder"></div>' +
                '<div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div>' +
                '</div></div></div>';
        },
        showPopup: function (){
            // 当popup往上弹出的时候，做特殊处理
            var rect = uiUtils.getClientRect(this.getDom());
            rect.top -= this.popup.SHADOW_RADIUS;
            rect.height += this.popup.SHADOW_RADIUS;
            this.popup.showAnchorRect(rect);
        },
        _onArrowClick: function (event, el){
            if (!this.isDisabled()) {
                this.showPopup();
            }
        },
        _onButtonClick: function (){
            if (!this.isDisabled()) {
                this.fireEvent('buttonclick');
            }
        }
    };
    utils.inherits(SplitButton, UIBase);
    utils.extend(SplitButton.prototype, Stateful, true);

})();


// ui/colorbutton.js
///import core
///import uicore
///import ui/colorpicker.js
///import ui/popup.js
///import ui/splitbutton.js
(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        ColorPicker = baidu.editor.ui.ColorPicker,
        Popup = baidu.editor.ui.Popup,
        SplitButton = baidu.editor.ui.SplitButton,
        ColorButton = baidu.editor.ui.ColorButton = function (options){
            this.initOptions(options);
            this.initColorButton();
        };
    ColorButton.prototype = {
        initColorButton: function (){
            var me = this;
            this.popup = new Popup({
                content: new ColorPicker({
                    noColorText: me.editor.getLang("clearColor"),
                    editor:me.editor,
                    onpickcolor: function (t, color){
                        me._onPickColor(color);
                    },
                    onpicknocolor: function (t, color){
                        me._onPickNoColor(color);
                    }
                }),
                editor:me.editor
            });
            this.initSplitButton();
        },
        _SplitButton_postRender: SplitButton.prototype.postRender,
        postRender: function (){
            this._SplitButton_postRender();
            this.getDom('button_body').appendChild(
                uiUtils.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>')
            );
            this.getDom().className += ' edui-colorbutton';
        },
        setColor: function (color){
            this.getDom('colorlump').style.backgroundColor = color;
            this.color = color;
        },
        _onPickColor: function (color){
            if (this.fireEvent('pickcolor', color) !== false) {
                this.setColor(color);
                this.popup.hide();
            }
        },
        _onPickNoColor: function (color){
            if (this.fireEvent('picknocolor') !== false) {
                this.popup.hide();
            }
        }
    };
    utils.inherits(ColorButton, SplitButton);

})();


// ui/tablebutton.js
///import core
///import uicore
///import ui/popup.js
///import ui/tablepicker.js
///import ui/splitbutton.js
(function (){
    var utils = baidu.editor.utils,
        Popup = baidu.editor.ui.Popup,
        TablePicker = baidu.editor.ui.TablePicker,
        SplitButton = baidu.editor.ui.SplitButton,
        TableButton = baidu.editor.ui.TableButton = function (options){
            this.initOptions(options);
            this.initTableButton();
        };
    TableButton.prototype = {
        initTableButton: function (){
            var me = this;
            this.popup = new Popup({
                content: new TablePicker({
                    editor:me.editor,
                    onpicktable: function (t, numCols, numRows){
                        me._onPickTable(numCols, numRows);
                    }
                }),
                'editor':me.editor
            });
            this.initSplitButton();
        },
        _onPickTable: function (numCols, numRows){
            if (this.fireEvent('picktable', numCols, numRows) !== false) {
                this.popup.hide();
            }
        }
    };
    utils.inherits(TableButton, SplitButton);

})();


// ui/autotypesetpicker.js
///import core
///import uicore
(function () {
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase;

    var AutoTypeSetPicker = baidu.editor.ui.AutoTypeSetPicker = function (options) {
        this.initOptions(options);
        this.initAutoTypeSetPicker();
    };
    AutoTypeSetPicker.prototype = {
        initAutoTypeSetPicker:function () {
            this.initUIBase();
        },
        getHtmlTpl:function () {
            var me = this.editor,
                opt = me.options.autotypeset,
                lang = me.getLang("autoTypeSet");

            var textAlignInputName = 'textAlignValue' + me.uid,
                imageBlockInputName = 'imageBlockLineValue' + me.uid,
                symbolConverInputName = 'symbolConverValue' + me.uid;

            return '<div id="##" class="edui-autotypesetpicker %%">' +
                '<div class="edui-autotypesetpicker-body">' +
                '<table >' +
                '<tr><td nowrap><input type="checkbox" name="mergeEmptyline" ' + (opt["mergeEmptyline"] ? "checked" : "" ) + '>' + lang.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (opt["removeEmptyline"] ? "checked" : "" ) + '>' + lang.delLine + '</td></tr>' +
                '<tr><td nowrap><input type="checkbox" name="removeClass" ' + (opt["removeClass"] ? "checked" : "" ) + '>' + lang.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (opt["indent"] ? "checked" : "" ) + '>' + lang.indent + '</td></tr>' +
                '<tr>' +
                '<td nowrap><input type="checkbox" name="textAlign" ' + (opt["textAlign"] ? "checked" : "" ) + '>' + lang.alignment + '</td>' +
                '<td colspan="2" id="' + textAlignInputName + '">' +
                '<input type="radio" name="'+ textAlignInputName +'" value="left" ' + ((opt["textAlign"] && opt["textAlign"] == "left") ? "checked" : "") + '>' + me.getLang("justifyleft") +
                '<input type="radio" name="'+ textAlignInputName +'" value="center" ' + ((opt["textAlign"] && opt["textAlign"] == "center") ? "checked" : "") + '>' + me.getLang("justifycenter") +
                '<input type="radio" name="'+ textAlignInputName +'" value="right" ' + ((opt["textAlign"] && opt["textAlign"] == "right") ? "checked" : "") + '>' + me.getLang("justifyright") +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td nowrap><input type="checkbox" name="imageBlockLine" ' + (opt["imageBlockLine"] ? "checked" : "" ) + '>' + lang.imageFloat + '</td>' +
                '<td nowrap id="'+ imageBlockInputName +'">' +
                '<input type="radio" name="'+ imageBlockInputName +'" value="none" ' + ((opt["imageBlockLine"] && opt["imageBlockLine"] == "none") ? "checked" : "") + '>' + me.getLang("default") +
                '<input type="radio" name="'+ imageBlockInputName +'" value="left" ' + ((opt["imageBlockLine"] && opt["imageBlockLine"] == "left") ? "checked" : "") + '>' + me.getLang("justifyleft") +
                '<input type="radio" name="'+ imageBlockInputName +'" value="center" ' + ((opt["imageBlockLine"] && opt["imageBlockLine"] == "center") ? "checked" : "") + '>' + me.getLang("justifycenter") +
                '<input type="radio" name="'+ imageBlockInputName +'" value="right" ' + ((opt["imageBlockLine"] && opt["imageBlockLine"] == "right") ? "checked" : "") + '>' + me.getLang("justifyright") +
                '</td>' +
                '</tr>' +
                '<tr><td nowrap><input type="checkbox" name="clearFontSize" ' + (opt["clearFontSize"] ? "checked" : "" ) + '>' + lang.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (opt["clearFontFamily"] ? "checked" : "" ) + '>' + lang.removeFontFamily + '</td></tr>' +
                '<tr><td nowrap colspan="3"><input type="checkbox" name="removeEmptyNode" ' + (opt["removeEmptyNode"] ? "checked" : "" ) + '>' + lang.removeHtml + '</td></tr>' +
                '<tr><td nowrap colspan="3"><input type="checkbox" name="pasteFilter" ' + (opt["pasteFilter"] ? "checked" : "" ) + '>' + lang.pasteFilter + '</td></tr>' +
                '<tr>' +
                '<td nowrap><input type="checkbox" name="symbolConver" ' + (opt["bdc2sb"] || opt["tobdc"] ? "checked" : "" ) + '>' + lang.symbol + '</td>' +
                '<td id="' + symbolConverInputName + '">' +
                '<input type="radio" name="bdc" value="bdc2sb" ' + (opt["bdc2sb"] ? "checked" : "" ) + '>' + lang.bdc2sb +
                '<input type="radio" name="bdc" value="tobdc" ' + (opt["tobdc"] ? "checked" : "" ) + '>' + lang.tobdc + '' +
                '</td>' +
                '<td nowrap align="right"><button >' + lang.run + '</button></td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '</div>';


        },
        _UIBase_render:UIBase.prototype.render
    };
    utils.inherits(AutoTypeSetPicker, UIBase);
})();


// ui/autotypesetbutton.js
///import core
///import uicore
///import ui/popup.js
///import ui/autotypesetpicker.js
///import ui/splitbutton.js
(function (){
    var utils = baidu.editor.utils,
        Popup = baidu.editor.ui.Popup,
        AutoTypeSetPicker = baidu.editor.ui.AutoTypeSetPicker,
        SplitButton = baidu.editor.ui.SplitButton,
        AutoTypeSetButton = baidu.editor.ui.AutoTypeSetButton = function (options){
            this.initOptions(options);
            this.initAutoTypeSetButton();
        };
    function getPara(me){

        var opt = {},
            cont = me.getDom(),
            editorId = me.editor.uid,
            inputType = null,
            attrName = null,
            ipts = domUtils.getElementsByTagName(cont,"input");
        for(var i=ipts.length-1,ipt;ipt=ipts[i--];){
            inputType = ipt.getAttribute("type");
            if(inputType=="checkbox"){
                attrName = ipt.getAttribute("name");
                opt[attrName] && delete opt[attrName];
                if(ipt.checked){
                    var attrValue = document.getElementById( attrName + "Value" + editorId );
                    if(attrValue){
                        if(/input/ig.test(attrValue.tagName)){
                            opt[attrName] = attrValue.value;
                        } else {
                            var iptChilds = attrValue.getElementsByTagName("input");
                            for(var j=iptChilds.length-1,iptchild;iptchild=iptChilds[j--];){
                                if(iptchild.checked){
                                    opt[attrName] = iptchild.value;
                                    break;
                                }
                            }
                        }
                    } else {
                        opt[attrName] = true;
                    }
                } else {
                    opt[attrName] = false;
                }
            } else {
                opt[ipt.getAttribute("value")] = ipt.checked;
            }

        }

        var selects = domUtils.getElementsByTagName(cont,"select");
        for(var i=0,si;si=selects[i++];){
            var attr = si.getAttribute('name');
            opt[attr] = opt[attr] ? si.value : '';
        }

        utils.extend(me.editor.options.autotypeset,opt);

        me.editor.setPreferences('autotypeset', opt);
    }

    AutoTypeSetButton.prototype = {
        initAutoTypeSetButton: function (){

            var me = this;
            this.popup = new Popup({
                //传入配置参数
                content: new AutoTypeSetPicker({editor:me.editor}),
                'editor':me.editor,
                hide : function(){
                    if (!this._hidden && this.getDom()) {
                        getPara(this);
                        this.getDom().style.display = 'none';
                        this._hidden = true;
                        this.fireEvent('hide');
                    }
                }
            });
            var flag = 0;
            this.popup.addListener('postRenderAfter',function(){
                var popupUI = this;
                if(flag)return;
                var cont = this.getDom(),
                    btn = cont.getElementsByTagName('button')[0];

                btn.onclick = function(){
                    getPara(popupUI);
                    me.editor.execCommand('autotypeset');
                    popupUI.hide()
                };

                domUtils.on(cont, 'click', function(e) {
                    var target = e.target || e.srcElement,
                        editorId = me.editor.uid;
                    if (target && target.tagName == 'INPUT') {

                        // 点击图片浮动的checkbox,去除对应的radio
                        if (target.name == 'imageBlockLine' || target.name == 'textAlign' || target.name == 'symbolConver') {
                            var checked = target.checked,
                                radioTd = document.getElementById( target.name + 'Value' + editorId),
                                radios = radioTd.getElementsByTagName('input'),
                                defalutSelect = {
                                    'imageBlockLine': 'none',
                                    'textAlign': 'left',
                                    'symbolConver': 'tobdc'
                                };

                            for (var i = 0; i < radios.length; i++) {
                                if (checked) {
                                    if (radios[i].value == defalutSelect[target.name]) {
                                        radios[i].checked = 'checked';
                                    }
                                } else {
                                    radios[i].checked = false;
                                }
                            }
                        }
                        // 点击radio,选中对应的checkbox
                        if (target.name == ('imageBlockLineValue' + editorId) || target.name == ('textAlignValue' + editorId) || target.name == 'bdc') {
                            var checkboxs = target.parentNode.previousSibling.getElementsByTagName('input');
                            checkboxs && (checkboxs[0].checked = true);
                        }

                        getPara(popupUI);
                    }
                });

                flag = 1;
            });
            this.initSplitButton();
        }
    };
    utils.inherits(AutoTypeSetButton, SplitButton);

})();


// ui/cellalignpicker.js
///import core
///import uicore
(function () {
    var utils = baidu.editor.utils,
        Popup = baidu.editor.ui.Popup,
        Stateful = baidu.editor.ui.Stateful,
        UIBase = baidu.editor.ui.UIBase;

    /**
     * 该参数将新增一个参数： selected， 参数类型为一个Object， 形如{ 'align': 'center', 'valign': 'top' }， 表示单元格的初始
     * 对齐状态为： 竖直居上，水平居中; 其中 align的取值为：'center', 'left', 'right'; valign的取值为: 'top', 'middle', 'bottom'
     * @update 2013/4/2 hancong03@baidu.com
     */
    var CellAlignPicker = baidu.editor.ui.CellAlignPicker = function (options) {
        this.initOptions(options);
        this.initSelected();
        this.initCellAlignPicker();
    };
    CellAlignPicker.prototype = {
        //初始化选中状态， 该方法将根据传递进来的参数获取到应该选中的对齐方式图标的索引
        initSelected: function(){

            var status = {

                valign: {
                    top: 0,
                    middle: 1,
                    bottom: 2
                },
                align: {
                    left: 0,
                    center: 1,
                    right: 2
                },
                count: 3

                },
                result = -1;

            if( this.selected ) {
                this.selectedIndex = status.valign[ this.selected.valign ] * status.count + status.align[ this.selected.align ];
            }

        },
        initCellAlignPicker:function () {
            this.initUIBase();
            this.Stateful_init();
        },
        getHtmlTpl:function () {

            var alignType = [ 'left', 'center', 'right' ],
                COUNT = 9,
                tempClassName = null,
                tempIndex = -1,
                tmpl = [];


            for( var i= 0; i<COUNT; i++ ) {

                tempClassName = this.selectedIndex === i ? ' class="edui-cellalign-selected" ' : '';
                tempIndex = i % 3;

                tempIndex === 0 && tmpl.push('<tr>');

                tmpl.push( '<td index="'+ i +'" ' + tempClassName + ' stateful><div class="edui-icon edui-'+ alignType[ tempIndex ] +'"></div></td>' );

                tempIndex === 2 && tmpl.push('</tr>');

            }

            return '<div id="##" class="edui-cellalignpicker %%">' +
                '<div class="edui-cellalignpicker-body">' +
                '<table onclick="$$._onClick(event);">' +
                tmpl.join('') +
                '</table>' +
                '</div>' +
                '</div>';
        },
        getStateDom: function (){
            return this.target;
        },
        _onClick: function (evt){
            var target= evt.target || evt.srcElement;
            if(/icon/.test(target.className)){
                this.items[target.parentNode.getAttribute("index")].onclick();
                Popup.postHide(evt);
            }
        },
        _UIBase_render:UIBase.prototype.render
    };
    utils.inherits(CellAlignPicker, UIBase);
    utils.extend(CellAlignPicker.prototype, Stateful,true);
})();





// ui/pastepicker.js
///import core
///import uicore
(function () {
    var utils = baidu.editor.utils,
        Stateful = baidu.editor.ui.Stateful,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase;

    var PastePicker = baidu.editor.ui.PastePicker = function (options) {
        this.initOptions(options);
        this.initPastePicker();
    };
    PastePicker.prototype = {
        initPastePicker:function () {
            this.initUIBase();
            this.Stateful_init();
        },
        getHtmlTpl:function () {
            return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div>' +
                '<div class="edui-pastecontainer">' +
                '<div class="edui-title">' + this.editor.getLang("pasteOpt") + '</div>' +
                '<div class="edui-button">' +
                '<div title="' + this.editor.getLang("pasteSourceFormat") + '" onclick="$$.format(false)" stateful>' +
                '<div class="edui-richtxticon"></div></div>' +
                '<div title="' + this.editor.getLang("tagFormat") + '" onclick="$$.format(2)" stateful>' +
                '<div class="edui-tagicon"></div></div>' +
                '<div title="' + this.editor.getLang("pasteTextFormat") + '" onclick="$$.format(true)" stateful>' +
                '<div class="edui-plaintxticon"></div></div>' +
                '</div>' +
                '</div>' +
                '</div>'
        },
        getStateDom:function () {
            return this.target;
        },
        format:function (param) {
            this.editor.ui._isTransfer = true;
            this.editor.fireEvent('pasteTransfer', param);
        },
        _onClick:function (cur) {
            var node = domUtils.getNextDomNode(cur),
                screenHt = uiUtils.getViewportRect().height,
                subPop = uiUtils.getClientRect(node);

            if ((subPop.top + subPop.height) > screenHt)
                node.style.top = (-subPop.height - cur.offsetHeight) + "px";
            else
                node.style.top = "";

            if (/hidden/ig.test(domUtils.getComputedStyle(node, "visibility"))) {
                node.style.visibility = "visible";
                domUtils.addClass(cur, "edui-state-opened");
            } else {
                node.style.visibility = "hidden";
                domUtils.removeClasses(cur, "edui-state-opened")
            }
        },
        _UIBase_render:UIBase.prototype.render
    };
    utils.inherits(PastePicker, UIBase);
    utils.extend(PastePicker.prototype, Stateful, true);
})();






// ui/toolbar.js
(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        Toolbar = baidu.editor.ui.Toolbar = function (options){
            this.initOptions(options);
            this.initToolbar();
        };
    Toolbar.prototype = {
        items: null,
        initToolbar: function (){
            this.items = this.items || [];
            this.initUIBase();
        },
        add: function (item,index){
            if(index === undefined){
                this.items.push(item);
            }else{
                this.items.splice(index,0,item)
            }

        },
        getHtmlTpl: function (){
            var buff = [];
            for (var i=0; i<this.items.length; i++) {
                buff[i] = this.items[i].renderHtml();
            }
            return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' +
                buff.join('') +
                '</div>'
        },
        postRender: function (){
            var box = this.getDom();
            for (var i=0; i<this.items.length; i++) {
                this.items[i].postRender();
            }
            uiUtils.makeUnselectable(box);
        },
        _onMouseDown: function (e){
            var target = e.target || e.srcElement,
                tagName = target && target.tagName && target.tagName.toLowerCase();
            if (tagName == 'input' || tagName == 'object' || tagName == 'object') {
                return false;
            }
        }
    };
    utils.inherits(Toolbar, UIBase);

})();


// ui/menu.js
///import core
///import uicore
///import ui\popup.js
///import ui\stateful.js
(function () {
    var utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        Popup = baidu.editor.ui.Popup,
        Stateful = baidu.editor.ui.Stateful,
        CellAlignPicker = baidu.editor.ui.CellAlignPicker,

        Menu = baidu.editor.ui.Menu = function (options) {
            this.initOptions(options);
            this.initMenu();
        };

    var menuSeparator = {
        renderHtml:function () {
            return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>';
        },
        postRender:function () {
        },
        queryAutoHide:function () {
            return true;
        }
    };
    Menu.prototype = {
        items:null,
        uiName:'menu',
        initMenu:function () {
            this.items = this.items || [];
            this.initPopup();
            this.initItems();
        },
        initItems:function () {
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (item == '-') {
                    this.items[i] = this.getSeparator();
                } else if (!(item instanceof MenuItem)) {
                    item.editor = this.editor;
                    item.theme = this.editor.options.theme;
                    this.items[i] = this.createItem(item);
                }
            }
        },
        getSeparator:function () {
            return menuSeparator;
        },
        createItem:function (item) {
            //新增一个参数menu, 该参数存储了menuItem所对应的menu引用
            item.menu = this;
            return new MenuItem(item);
        },
        _Popup_getContentHtmlTpl:Popup.prototype.getContentHtmlTpl,
        getContentHtmlTpl:function () {
            if (this.items.length == 0) {
                return this._Popup_getContentHtmlTpl();
            }
            var buff = [];
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                buff[i] = item.renderHtml();
            }
            return ('<div class="%%-body">' + buff.join('') + '</div>');
        },
        _Popup_postRender:Popup.prototype.postRender,
        postRender:function () {
            var me = this;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                item.ownerMenu = this;
                item.postRender();
            }
            domUtils.on(this.getDom(), 'mouseover', function (evt) {
                evt = evt || event;
                var rel = evt.relatedTarget || evt.fromElement;
                var el = me.getDom();
                if (!uiUtils.contains(el, rel) && el !== rel) {
                    me.fireEvent('over');
                }
            });
            this._Popup_postRender();
        },
        queryAutoHide:function (el) {
            if (el) {
                if (uiUtils.contains(this.getDom(), el)) {
                    return false;
                }
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.queryAutoHide(el) === false) {
                        return false;
                    }
                }
            }
        },
        clearItems:function () {
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                clearTimeout(item._showingTimer);
                clearTimeout(item._closingTimer);
                if (item.subMenu) {
                    item.subMenu.destroy();
                }
            }
            this.items = [];
        },
        destroy:function () {
            if (this.getDom()) {
                domUtils.remove(this.getDom());
            }
            this.clearItems();
        },
        dispose:function () {
            this.destroy();
        }
    };
    utils.inherits(Menu, Popup);

    /**
     * @update 2013/04/03 hancong03 新增一个参数menu, 该参数存储了menuItem所对应的menu引用
     * @type {Function}
     */
    var MenuItem = baidu.editor.ui.MenuItem = function (options) {
        this.initOptions(options);
        this.initUIBase();
        this.Stateful_init();
        if (this.subMenu && !(this.subMenu instanceof Menu)) {
            if (options.className && options.className.indexOf("aligntd") != -1) {
                var me = this;

                //获取单元格对齐初始状态
                this.subMenu.selected = this.editor.queryCommandValue( 'cellalignment' );

                this.subMenu = new Popup({
                    content:new CellAlignPicker(this.subMenu),
                    parentMenu:me,
                    editor:me.editor,
                    destroy:function () {
                        if (this.getDom()) {
                            domUtils.remove(this.getDom());
                        }
                    }
                });
                this.subMenu.addListener("postRenderAfter", function () {
                    domUtils.on(this.getDom(), "mouseover", function () {
                        me.addState('opened');
                    });
                });
            } else {
                this.subMenu = new Menu(this.subMenu);
            }
        }
    };
    MenuItem.prototype = {
        label:'',
        subMenu:null,
        ownerMenu:null,
        uiName:'menuitem',
        alwalysHoverable:true,
        getHtmlTpl:function () {
            return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);">' +
                '<div class="%%-body">' +
                this.renderLabelHtml() +
                '</div>' +
                '</div>';
        },
        postRender:function () {
            var me = this;
            this.addListener('over', function () {
                me.ownerMenu.fireEvent('submenuover', me);
                if (me.subMenu) {
                    me.delayShowSubMenu();
                }
            });
            if (this.subMenu) {
                this.getDom().className += ' edui-hassubmenu';
                this.subMenu.render();
                this.addListener('out', function () {
                    me.delayHideSubMenu();
                });
                this.subMenu.addListener('over', function () {
                    clearTimeout(me._closingTimer);
                    me._closingTimer = null;
                    me.addState('opened');
                });
                this.ownerMenu.addListener('hide', function () {
                    me.hideSubMenu();
                });
                this.ownerMenu.addListener('submenuover', function (t, subMenu) {
                    if (subMenu !== me) {
                        me.delayHideSubMenu();
                    }
                });
                this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide;
                this.subMenu.queryAutoHide = function (el) {
                    if (el && uiUtils.contains(me.getDom(), el)) {
                        return false;
                    }
                    return this._bakQueryAutoHide(el);
                };
            }
            this.getDom().style.tabIndex = '-1';
            uiUtils.makeUnselectable(this.getDom());
            this.Stateful_postRender();
        },
        delayShowSubMenu:function () {
            var me = this;
            if (!me.isDisabled()) {
                me.addState('opened');
                clearTimeout(me._showingTimer);
                clearTimeout(me._closingTimer);
                me._closingTimer = null;
                me._showingTimer = setTimeout(function () {
                    me.showSubMenu();
                }, 250);
            }
        },
        delayHideSubMenu:function () {
            var me = this;
            if (!me.isDisabled()) {
                me.removeState('opened');
                clearTimeout(me._showingTimer);
                if (!me._closingTimer) {
                    me._closingTimer = setTimeout(function () {
                        if (!me.hasState('opened')) {
                            me.hideSubMenu();
                        }
                        me._closingTimer = null;
                    }, 400);
                }
            }
        },
        renderLabelHtml:function () {
            return '<div class="edui-arrow"></div>' +
                '<div class="edui-box edui-icon"></div>' +
                '<div class="edui-box edui-label %%-label">' + (this.label || '') + '</div>';
        },
        getStateDom:function () {
            return this.getDom();
        },
        queryAutoHide:function (el) {
            if (this.subMenu && this.hasState('opened')) {
                return this.subMenu.queryAutoHide(el);
            }
        },
        _onClick:function (event, this_) {
            if (this.hasState('disabled')) return;
            if (this.fireEvent('click', event, this_) !== false) {
                if (this.subMenu) {
                    this.showSubMenu();
                } else {
                    Popup.postHide(event);
                }
            }
        },
        showSubMenu:function () {
            var rect = uiUtils.getClientRect(this.getDom());
            rect.right -= 5;
            rect.left += 2;
            rect.width -= 7;
            rect.top -= 4;
            rect.bottom += 4;
            rect.height += 8;
            this.subMenu.showAnchorRect(rect, true, true);
        },
        hideSubMenu:function () {
            this.subMenu.hide();
        }
    };
    utils.inherits(MenuItem, UIBase);
    utils.extend(MenuItem.prototype, Stateful, true);
})();


// ui/combox.js
///import core
///import uicore
///import ui/menu.js
///import ui/splitbutton.js
(function (){
    // todo: menu和item提成通用list
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        Menu = baidu.editor.ui.Menu,
        SplitButton = baidu.editor.ui.SplitButton,
        Combox = baidu.editor.ui.Combox = function (options){
            this.initOptions(options);
            this.initCombox();
        };
    Combox.prototype = {
        uiName: 'combox',
        onbuttonclick:function () {
            this.showPopup();
        },
        initCombox: function (){
            var me = this;
            this.items = this.items || [];
            for (var i=0; i<this.items.length; i++) {
                var item = this.items[i];
                item.uiName = 'listitem';
                item.index = i;
                item.onclick = function (){
                    me.selectByIndex(this.index);
                };
            }
            this.popup = new Menu({
                items: this.items,
                uiName: 'list',
                editor:this.editor,
                captureWheel: true,
                combox: this
            });

            this.initSplitButton();
        },
        _SplitButton_postRender: SplitButton.prototype.postRender,
        postRender: function (){
            this._SplitButton_postRender();
            this.setLabel(this.label || '');
            this.setValue(this.initValue || '');
        },
        showPopup: function (){
            var rect = uiUtils.getClientRect(this.getDom());
            rect.top += 1;
            rect.bottom -= 1;
            rect.height -= 2;
            this.popup.showAnchorRect(rect);
        },
        getValue: function (){
            return this.value;
        },
        setValue: function (value){
            var index = this.indexByValue(value);
            if (index != -1) {
                this.selectedIndex = index;
                this.setLabel(this.items[index].label);
                this.value = this.items[index].value;
            } else {
                this.selectedIndex = -1;
                this.setLabel(this.getLabelForUnknowValue(value));
                this.value = value;
            }
        },
        setLabel: function (label){
            this.getDom('button_body').innerHTML = label;
            this.label = label;
        },
        getLabelForUnknowValue: function (value){
            return value;
        },
        indexByValue: function (value){
            for (var i=0; i<this.items.length; i++) {
                if (value == this.items[i].value) {
                    return i;
                }
            }
            return -1;
        },
        getItem: function (index){
            return this.items[index];
        },
        selectByIndex: function (index){
            if (index < this.items.length && this.fireEvent('select', index) !== false) {
                this.selectedIndex = index;
                this.value = this.items[index].value;
                this.setLabel(this.items[index].label);
            }
        }
    };
    utils.inherits(Combox, SplitButton);
})();


// ui/dialog.js
///import core
///import uicore
///import ui/mask.js
///import ui/button.js
(function (){
    var utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils,
        Mask = baidu.editor.ui.Mask,
        UIBase = baidu.editor.ui.UIBase,
        Button = baidu.editor.ui.Button,
        Dialog = baidu.editor.ui.Dialog = function (options){
            if(options.name){
                var name = options.name;
                var cssRules = options.cssRules;
                if(!options.className){
                    options.className =  'edui-for-' + name;
                }
                if(cssRules){
                    options.cssRules = '.edui-default .edui-for-'+ name +' .edui-dialog-content  {'+ cssRules +'}'
                }
            }
            this.initOptions(utils.extend({
                autoReset: true,
                draggable: true,
                onok: function (){},
                oncancel: function (){},
                onclose: function (t, ok){
                    return ok ? this.onok() : this.oncancel();
                },
                //是否控制dialog中的scroll事件， 默认为不阻止
                holdScroll: false
            },options));
            this.initDialog();
        };
    var modalMask;
    var dragMask;
    var activeDialog;
    Dialog.prototype = {
        draggable: false,
        uiName: 'dialog',
        initDialog: function (){
            var me = this,
                theme=this.editor.options.theme;
            if(this.cssRules){
                utils.cssRule('edui-customize-'+this.name+'-style',this.cssRules);
            }
            this.initUIBase();
            this.modalMask = (modalMask || (modalMask = new Mask({
                className: 'edui-dialog-modalmask',
                theme:theme,
                onclick: function (){
                    activeDialog && activeDialog.close(false);
                }
            })));
            this.dragMask = (dragMask || (dragMask = new Mask({
                className: 'edui-dialog-dragmask',
                theme:theme
            })));
            this.closeButton = new Button({
                className: 'edui-dialog-closebutton',
                title: me.closeDialog,
                theme:theme,
                onclick: function (){
                    me.close(false);
                }
            });

            this.fullscreen && this.initResizeEvent();

            if (this.buttons) {
                for (var i=0; i<this.buttons.length; i++) {
                    if (!(this.buttons[i] instanceof Button)) {
                        this.buttons[i] = new Button(utils.extend(this.buttons[i],{
                            editor : this.editor
                        },true));
                    }
                }
            }
        },
        initResizeEvent: function () {

            var me = this;

            domUtils.on( window, "resize", function () {

                if ( me._hidden || me._hidden === undefined ) {
                    return;
                }

                if ( me.__resizeTimer ) {
                    window.clearTimeout( me.__resizeTimer );
                }

                me.__resizeTimer = window.setTimeout( function () {

                    me.__resizeTimer = null;

                    var dialogWrapNode = me.getDom(),
                        contentNode = me.getDom('content'),
                        wrapRect = UE.ui.uiUtils.getClientRect( dialogWrapNode ),
                        contentRect = UE.ui.uiUtils.getClientRect( contentNode ),
                        vpRect = uiUtils.getViewportRect();

                    contentNode.style.width = ( vpRect.width - wrapRect.width + contentRect.width ) + "px";
                    contentNode.style.height = ( vpRect.height - wrapRect.height + contentRect.height ) + "px";

                    dialogWrapNode.style.width = vpRect.width + "px";
                    dialogWrapNode.style.height = vpRect.height + "px";

                    me.fireEvent( "resize" );

                }, 100 );

            } );

        },
        fitSize: function (){
            var popBodyEl = this.getDom('body');
//            if (!(baidu.editor.browser.ie && baidu.editor.browser.version == 7)) {
//                uiUtils.removeStyle(popBodyEl, 'width');
//                uiUtils.removeStyle(popBodyEl, 'height');
//            }
            var size = this.mesureSize();
            popBodyEl.style.width = size.width + 'px';
            popBodyEl.style.height = size.height + 'px';
            return size;
        },
        safeSetOffset: function (offset){
            var me = this;
            var el = me.getDom();
            var vpRect = uiUtils.getViewportRect();
            var rect = uiUtils.getClientRect(el);
            var left = offset.left;
            if (left + rect.width > vpRect.right) {
                left = vpRect.right - rect.width;
            }
            var top = offset.top;
            if (top + rect.height > vpRect.bottom) {
                top = vpRect.bottom - rect.height;
            }
            el.style.left = Math.max(left, 0) + 'px';
            el.style.top = Math.max(top, 0) + 'px';
        },
        showAtCenter: function (){

            var vpRect = uiUtils.getViewportRect();

            if ( !this.fullscreen ) {
                this.getDom().style.display = '';
                var popSize = this.fitSize();
                var titleHeight = this.getDom('titlebar').offsetHeight | 0;
                var left = vpRect.width / 2 - popSize.width / 2;
                var top = vpRect.height / 2 - (popSize.height - titleHeight) / 2 - titleHeight;
                var popEl = this.getDom();
                this.safeSetOffset({
                    left: Math.max(left | 0, 0),
                    top: Math.max(top | 0, 0)
                });
                if (!domUtils.hasClass(popEl, 'edui-state-centered')) {
                    popEl.className += ' edui-state-centered';
                }
            } else {
                var dialogWrapNode = this.getDom(),
                    contentNode = this.getDom('content');

                dialogWrapNode.style.display = "block";

                var wrapRect = UE.ui.uiUtils.getClientRect( dialogWrapNode ),
                    contentRect = UE.ui.uiUtils.getClientRect( contentNode );
                dialogWrapNode.style.left = "-100000px";

                contentNode.style.width = ( vpRect.width - wrapRect.width + contentRect.width ) + "px";
                contentNode.style.height = ( vpRect.height - wrapRect.height + contentRect.height ) + "px";

                dialogWrapNode.style.width = vpRect.width + "px";
                dialogWrapNode.style.height = vpRect.height + "px";
                dialogWrapNode.style.left = 0;

                //保存环境的overflow值
                this._originalContext = {
                    html: {
                        overflowX: document.documentElement.style.overflowX,
                        overflowY: document.documentElement.style.overflowY
                    },
                    body: {
                        overflowX: document.body.style.overflowX,
                        overflowY: document.body.style.overflowY
                    }
                };

                document.documentElement.style.overflowX = 'hidden';
                document.documentElement.style.overflowY = 'hidden';
                document.body.style.overflowX = 'hidden';
                document.body.style.overflowY = 'hidden';

            }

            this._show();
        },
        getContentHtml: function (){
            var contentHtml = '';
            if (typeof this.content == 'string') {
                contentHtml = this.content;
            } else if (this.iframeUrl) {
                contentHtml = '<span id="'+ this.id +'_contmask" class="dialogcontmask"></span><iframe id="'+ this.id +
                    '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="'+ this.iframeUrl +'"></iframe>';
            }
            return contentHtml;
        },
        getHtmlTpl: function (){
            var footHtml = '';

            if (this.buttons) {
                var buff = [];
                for (var i=0; i<this.buttons.length; i++) {
                    buff[i] = this.buttons[i].renderHtml();
                }
                footHtml = '<div class="%%-foot">' +
                     '<div id="##_buttons" class="%%-buttons">' + buff.join('') + '</div>' +
                    '</div>';
            }

            return '<div id="##" class="%%"><div '+ ( !this.fullscreen ? 'class="%%"' : 'class="%%-wrap edui-dialog-fullscreen-flag"' ) +'><div id="##_body" class="%%-body">' +
                '<div class="%%-shadow"></div>' +
                '<div id="##_titlebar" class="%%-titlebar">' +
                '<div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);">' +
                 '<span class="%%-caption">' + (this.title || '') + '</span>' +
                '</div>' +
                this.closeButton.renderHtml() +
                '</div>' +
                '<div id="##_content" class="%%-content">'+ ( this.autoReset ? '' : this.getContentHtml()) +'</div>' +
                footHtml +
                '</div></div></div>';
        },
        postRender: function (){
            // todo: 保持居中/记住上次关闭位置选项
            if (!this.modalMask.getDom()) {
                this.modalMask.render();
                this.modalMask.hide();
            }
            if (!this.dragMask.getDom()) {
                this.dragMask.render();
                this.dragMask.hide();
            }
            var me = this;
            this.addListener('show', function (){
                me.modalMask.show(this.getDom().style.zIndex - 2);
            });
            this.addListener('hide', function (){
                me.modalMask.hide();
            });
            if (this.buttons) {
                for (var i=0; i<this.buttons.length; i++) {
                    this.buttons[i].postRender();
                }
            }
            domUtils.on(window, 'resize', function (){
                setTimeout(function (){
                    if (!me.isHidden()) {
                        me.safeSetOffset(uiUtils.getClientRect(me.getDom()));
                    }
                });
            });

            //hold住scroll事件，防止dialog的滚动影响页面
//            if( this.holdScroll ) {
//
//                if( !me.iframeUrl ) {
//                    domUtils.on( document.getElementById( me.id + "_iframe"), !browser.gecko ? "mousewheel" : "DOMMouseScroll", function(e){
//                        domUtils.preventDefault(e);
//                    } );
//                } else {
//                    me.addListener('dialogafterreset', function(){
//                        window.setTimeout(function(){
//                            var iframeWindow = document.getElementById( me.id + "_iframe").contentWindow;
//
//                            if( browser.ie ) {
//
//                                var timer = window.setInterval(function(){
//
//                                    if( iframeWindow.document && iframeWindow.document.body ) {
//                                        window.clearInterval( timer );
//                                        timer = null;
//                                        domUtils.on( iframeWindow.document.body, !browser.gecko ? "mousewheel" : "DOMMouseScroll", function(e){
//                                            domUtils.preventDefault(e);
//                                        } );
//                                    }
//
//                                }, 100);
//
//                            } else {
//                                domUtils.on( iframeWindow, !browser.gecko ? "mousewheel" : "DOMMouseScroll", function(e){
//                                    domUtils.preventDefault(e);
//                                } );
//                            }
//
//                        }, 1);
//                    });
//                }
//
//            }
            this._hide();
        },
        mesureSize: function (){
            var body = this.getDom('body');
            var width = uiUtils.getClientRect(this.getDom('content')).width;
            var dialogBodyStyle = body.style;
            dialogBodyStyle.width = width;
            return uiUtils.getClientRect(body);
        },
        _onTitlebarMouseDown: function (evt, el){
            if (this.draggable) {
                var rect;
                var vpRect = uiUtils.getViewportRect();
                var me = this;
                uiUtils.startDrag(evt, {
                    ondragstart: function (){
                        rect = uiUtils.getClientRect(me.getDom());
                        me.getDom('contmask').style.visibility = 'visible';
                        me.dragMask.show(me.getDom().style.zIndex - 1);
                    },
                    ondragmove: function (x, y){
                        var left = rect.left + x;
                        var top = rect.top + y;
                        me.safeSetOffset({
                            left: left,
                            top: top
                        });
                    },
                    ondragstop: function (){
                        me.getDom('contmask').style.visibility = 'hidden';
                        domUtils.removeClasses(me.getDom(), ['edui-state-centered']);
                        me.dragMask.hide();
                    }
                });
            }
        },
        reset: function (){
            this.getDom('content').innerHTML = this.getContentHtml();
            this.fireEvent('dialogafterreset');
        },
        _show: function (){
            if (this._hidden) {
                this.getDom().style.display = '';

                //要高过编辑器的zindxe
                this.editor.container.style.zIndex && (this.getDom().style.zIndex = this.editor.container.style.zIndex * 1 + 10);
                this._hidden = false;
                this.fireEvent('show');
                baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4;
            }
        },
        isHidden: function (){
            return this._hidden;
        },
        _hide: function (){
            if (!this._hidden) {
                var wrapNode = this.getDom();
                wrapNode.style.display = 'none';
                wrapNode.style.zIndex = '';
                wrapNode.style.width = '';
                wrapNode.style.height = '';
                this._hidden = true;
                this.fireEvent('hide');
            }
        },
        open: function (){
            if (this.autoReset) {
                //有可能还没有渲染
                try{
                    this.reset();
                }catch(e){
                    this.render();
                    this.open()
                }
            }
            this.showAtCenter();
            if (this.iframeUrl) {
                try {
                    this.getDom('iframe').focus();
                } catch(ex){}
            }
            activeDialog = this;
        },
        _onCloseButtonClick: function (evt, el){
            this.close(false);
        },
        close: function (ok){
            if (this.fireEvent('close', ok) !== false) {
                //还原环境
                if ( this.fullscreen ) {

                    document.documentElement.style.overflowX = this._originalContext.html.overflowX;
                    document.documentElement.style.overflowY = this._originalContext.html.overflowY;
                    document.body.style.overflowX = this._originalContext.body.overflowX;
                    document.body.style.overflowY = this._originalContext.body.overflowY;
                    delete this._originalContext;

                }
                this._hide();

                //销毁content
                var content = this.getDom('content');
                var iframe = this.getDom('iframe');
                if (content && iframe) {
                    var doc = iframe.contentDocument || iframe.contentWindow.document;
                    doc && (doc.body.innerHTML = '');
                    domUtils.remove(content);
                }
            }
        }
    };
    utils.inherits(Dialog, UIBase);
})();


// ui/menubutton.js
///import core
///import uicore
///import ui/menu.js
///import ui/splitbutton.js
(function (){
    var utils = baidu.editor.utils,
        Menu = baidu.editor.ui.Menu,
        SplitButton = baidu.editor.ui.SplitButton,
        MenuButton = baidu.editor.ui.MenuButton = function (options){
            this.initOptions(options);
            this.initMenuButton();
        };
    MenuButton.prototype = {
        initMenuButton: function (){
            var me = this;
            this.uiName = "menubutton";
            this.popup = new Menu({
                items: me.items,
                className: me.className,
                editor:me.editor
            });
            this.popup.addListener('show', function (){
                var list = this;
                for (var i=0; i<list.items.length; i++) {
                    list.items[i].removeState('checked');
                    if (list.items[i].value == me._value) {
                        list.items[i].addState('checked');
                        this.value = me._value;
                    }
                }
            });
            this.initSplitButton();
        },
        setValue : function(value){
            this._value = value;
        }
        
    };
    utils.inherits(MenuButton, SplitButton);
})();

// ui/multiMenu.js
///import core
///import uicore
 ///commands 表情
(function(){
    var utils = baidu.editor.utils,
        Popup = baidu.editor.ui.Popup,
        SplitButton = baidu.editor.ui.SplitButton,
        MultiMenuPop = baidu.editor.ui.MultiMenuPop = function(options){
            this.initOptions(options);
            this.initMultiMenu();
        };

    MultiMenuPop.prototype = {
        initMultiMenu: function (){
            var me = this;
            this.popup = new Popup({
                content: '',
                editor : me.editor,
                iframe_rendered: false,
                onshow: function (){
                    if (!this.iframe_rendered) {
                        this.iframe_rendered = true;
                        this.getDom('content').innerHTML = '<iframe id="'+me.id+'_iframe" src="'+ me.iframeUrl +'" frameborder="0"></iframe>';
                        me.editor.container.style.zIndex && (this.getDom().style.zIndex = me.editor.container.style.zIndex * 1 + 1);
                    }
                }
               // canSideUp:false,
               // canSideLeft:false
            });
            this.onbuttonclick = function(){
                this.showPopup();
            };
            this.initSplitButton();
        }

    };

    utils.inherits(MultiMenuPop, SplitButton);
})();


// ui/shortcutmenu.js
(function () {
    var UI = baidu.editor.ui,
        UIBase = UI.UIBase,
        uiUtils = UI.uiUtils,
        utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils;

    var allMenus = [],//存储所有快捷菜单
        timeID,
        isSubMenuShow = false;//是否有子pop显示

    var ShortCutMenu = UI.ShortCutMenu = function (options) {
        this.initOptions (options);
        this.initShortCutMenu ();
    };

    ShortCutMenu.postHide = hideAllMenu;

    ShortCutMenu.prototype = {
        isHidden : true ,
        SPACE : 5 ,
        initShortCutMenu : function () {
            this.items = this.items || [];
            this.initUIBase ();
            this.initItems ();
            this.initEvent ();
            allMenus.push (this);
        } ,
        initEvent : function () {
            var me = this,
                doc = me.editor.document;

            domUtils.on (doc , "mousemove" , function (e) {
                if (me.isHidden === false) {
                    //有pop显示就不隐藏快捷菜单
                    if (me.getSubMenuMark () || me.eventType == "contextmenu")   return;


                    var flag = true,
                        el = me.getDom (),
                        wt = el.offsetWidth,
                        ht = el.offsetHeight,
                        distanceX = wt / 2 + me.SPACE,//距离中心X标准
                        distanceY = ht / 2,//距离中心Y标准
                        x = Math.abs (e.screenX - me.left),//离中心距离横坐标
                        y = Math.abs (e.screenY - me.top);//离中心距离纵坐标

                    clearTimeout (timeID);
                    timeID = setTimeout (function () {
                        if (y > 0 && y < distanceY) {
                            me.setOpacity (el , "1");
                        } else if (y > distanceY && y < distanceY + 70) {
                            me.setOpacity (el , "0.5");
                            flag = false;
                        } else if (y > distanceY + 70 && y < distanceY + 140) {
                            me.hide ();
                        }

                        if (flag && x > 0 && x < distanceX) {
                            me.setOpacity (el , "1")
                        } else if (x > distanceX && x < distanceX + 70) {
                            me.setOpacity (el , "0.5")
                        } else if (x > distanceX + 70 && x < distanceX + 140) {
                            me.hide ();
                        }
                    });
                }
            });

            //ie\ff下 mouseout不准
            if (browser.chrome) {
                domUtils.on (doc , "mouseout" , function (e) {
                    var relatedTgt = e.relatedTarget || e.toElement;

                    if (relatedTgt == null || relatedTgt.tagName == "HTML") {
                        me.hide ();
                    }
                });
            }

            me.editor.addListener ("afterhidepop" , function () {
                if (!me.isHidden) {
                    isSubMenuShow = true;
                }
            });

        } ,
        initItems : function () {
            if (utils.isArray (this.items)) {
                for (var i = 0, len = this.items.length ; i < len ; i++) {
                    var item = this.items[i].toLowerCase ();

                    if (UI[item]) {
                        this.items[i] = new UI[item] (this.editor);
                        this.items[i].className += " edui-shortcutsubmenu ";
                    }
                }
            }
        } ,
        setOpacity : function (el , value) {
            if (browser.ie && browser.version < 9) {
                el.style.filter = "alpha(opacity = " + parseFloat (value) * 100 + ");"
            } else {
                el.style.opacity = value;
            }
        } ,
        getSubMenuMark : function () {
            isSubMenuShow = false;
            var layerEle = uiUtils.getFixedLayer ();
            var list = domUtils.getElementsByTagName (layerEle , "div" , function (node) {
                return domUtils.hasClass (node , "edui-shortcutsubmenu edui-popup")
            });

            for (var i = 0, node ; node = list[i++] ;) {
                if (node.style.display != "none") {
                    isSubMenuShow = true;
                }
            }
            return isSubMenuShow;
        } ,
        show : function (e , hasContextmenu) {
            var me = this,
                offset = {},
                el = this.getDom (),
                fixedlayer = uiUtils.getFixedLayer ();

            function setPos (offset) {
                if (offset.left < 0) {
                    offset.left = 0;
                }
                if (offset.top < 0) {
                    offset.top = 0;
                }
                el.style.cssText = "position:absolute;left:" + offset.left + "px;top:" + offset.top + "px;";
            }

            function setPosByCxtMenu (menu) {
                if (!menu.tagName) {
                    menu = menu.getDom ();
                }
                offset.left = parseInt (menu.style.left);
                offset.top = parseInt (menu.style.top);
                offset.top -= el.offsetHeight + 15;
                setPos (offset);
            }


            me.eventType = e.type;
            el.style.cssText = "display:block;left:-9999px";

            if (e.type == "contextmenu" && hasContextmenu) {
                var menu = domUtils.getElementsByTagName (fixedlayer , "div" , "edui-contextmenu")[0];
                if (menu) {
                    setPosByCxtMenu (menu)
                } else {
                    me.editor.addListener ("aftershowcontextmenu" , function (type , menu) {
                        setPosByCxtMenu (menu);
                    });
                }
            } else {
                offset = uiUtils.getViewportOffsetByEvent (e);
                offset.top -= el.offsetHeight + me.SPACE;
                offset.left += me.SPACE + 20;
                setPos (offset);
                me.setOpacity (el , 0.2);
            }


            me.isHidden = false;
            me.left = e.screenX + el.offsetWidth / 2 - me.SPACE;
            me.top = e.screenY - (el.offsetHeight / 2) - me.SPACE;

            if (me.editor) {
                el.style.zIndex = me.editor.container.style.zIndex * 1 + 10;
                fixedlayer.style.zIndex = el.style.zIndex - 1;
            }
        } ,
        hide : function () {
            if (this.getDom ()) {
                this.getDom ().style.display = "none";
            }
            this.isHidden = true;
        } ,
        postRender : function () {
            if (utils.isArray (this.items)) {
                for (var i = 0, item ; item = this.items[i++] ;) {
                    item.postRender ();
                }
            }
        } ,
        getHtmlTpl : function () {
            var buff;
            if (utils.isArray (this.items)) {
                buff = [];
                for (var i = 0 ; i < this.items.length ; i++) {
                    buff[i] = this.items[i].renderHtml ();
                }
                buff = buff.join ("");
            } else {
                buff = this.items;
            }

            return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' +
                buff +
                '</div>';
        }
    };

    utils.inherits (ShortCutMenu , UIBase);

    function hideAllMenu (e) {
        var tgt = e.target || e.srcElement,
            cur = domUtils.findParent (tgt , function (node) {
                return domUtils.hasClass (node , "edui-shortcutmenu") || domUtils.hasClass (node , "edui-popup");
            } , true);

        if (!cur) {
            for (var i = 0, menu ; menu = allMenus[i++] ;) {
                menu.hide ()
            }
        }
    }

    domUtils.on (document , 'mousedown' , function (e) {
        hideAllMenu (e);
    });

    domUtils.on (window , 'scroll' , function (e) {
        hideAllMenu (e);
    });

}) ();


// ui/breakline.js
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Breakline = baidu.editor.ui.Breakline = function (options){
            this.initOptions(options);
            this.initSeparator();
        };
    Breakline.prototype = {
        uiName: 'Breakline',
        initSeparator: function (){
            this.initUIBase();
        },
        getHtmlTpl: function (){
            return '<br/>';
        }
    };
    utils.inherits(Breakline, UIBase);

})();


// ui/message.js
///import core
///import uicore
(function () {
    var utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils,
        UIBase = baidu.editor.ui.UIBase,
        Message = baidu.editor.ui.Message = function (options){
            this.initOptions(options);
            this.initMessage();
        };

    Message.prototype = {
        initMessage: function (){
            this.initUIBase();
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-message %%">' +
            ' <div id="##_closer" class="edui-message-closer">×</div>' +
            ' <div id="##_body" class="edui-message-body edui-message-type-info">' +
            ' <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe>' +
            ' <div class="edui-shadow"></div>' +
            ' <div id="##_content" class="edui-message-content">' +
            '  </div>' +
            ' </div>' +
            '</div>';
        },
        reset: function(opt){
            var me = this;
            if (!opt.keepshow) {
                clearTimeout(this.timer);
                me.timer = setTimeout(function(){
                    me.hide();
                }, opt.timeout || 4000);
            }

            opt.content !== undefined && me.setContent(opt.content);
            opt.type !== undefined && me.setType(opt.type);

            me.show();
        },
        postRender: function(){
            var me = this,
                closer = this.getDom('closer');
            closer && domUtils.on(closer, 'click', function(){
                me.hide();
            });
        },
        setContent: function(content){
            this.getDom('content').innerHTML = content;
        },
        setType: function(type){
            type = type || 'info';
            var body = this.getDom('body');
            body.className = body.className.replace(/edui-message-type-[\w-]+/, 'edui-message-type-' + type);
        },
        getContent: function(){
            return this.getDom('content').innerHTML;
        },
        getType: function(){
            var arr = this.getDom('body').match(/edui-message-type-([\w-]+)/);
            return arr ? arr[1]:'';
        },
        show: function (){
            this.getDom().style.display = 'block';
        },
        hide: function (){
            var dom = this.getDom();
            if (dom) {
                dom.style.display = 'none';
                dom.parentNode && dom.parentNode.removeChild(dom);
            }
        }
    };

    utils.inherits(Message, UIBase);

})();


// adapter/editorui.js
//ui跟编辑器的适配層
//那个按钮弹出是dialog，是下拉筐等都是在这个js中配置
//自己写的ui也要在这里配置，放到baidu.editor.ui下边，当编辑器实例化的时候会根据ueditor.config中的toolbars找到相应的进行实例化
(function () {
    var utils = baidu.editor.utils;
    var editorui = baidu.editor.ui;
    var _Dialog = editorui.Dialog;
    editorui.buttons = {};

    editorui.Dialog = function (options) {
        var dialog = new _Dialog(options);
        dialog.addListener('hide', function () {

            if (dialog.editor) {
                var editor = dialog.editor;
                try {
                    if (browser.gecko) {
                        var y = editor.window.scrollY,
                            x = editor.window.scrollX;
                        editor.body.focus();
                        editor.window.scrollTo(x, y);
                    } else {
                        editor.focus();
                    }


                } catch (ex) {
                }
            }
        });
        return dialog;
    };

    var iframeUrlMap = {
        'anchor':'~/dialogs/anchor/anchor.html',
        'insertimage':'~/dialogs/image/image.html',
        'link':'~/dialogs/link/link.html',
        'spechars':'~/dialogs/spechars/spechars.html',
        'searchreplace':'~/dialogs/searchreplace/searchreplace.html',
        'map':'~/dialogs/map/map.html',
        'gmap':'~/dialogs/gmap/gmap.html',
        'insertvideo':'~/dialogs/video/video.html',
        'help':'~/dialogs/help/help.html',
        'preview':'~/dialogs/preview/preview.html',
        'emotion':'~/dialogs/emotion/emotion.html',
        'wordimage':'~/dialogs/wordimage/wordimage.html',
        'attachment':'~/dialogs/attachment/attachment.html',
        'insertframe':'~/dialogs/insertframe/insertframe.html',
        'edittip':'~/dialogs/table/edittip.html',
        'edittable':'~/dialogs/table/edittable.html',
        'edittd':'~/dialogs/table/edittd.html',
        'webapp':'~/dialogs/webapp/webapp.html',
        'snapscreen':'~/dialogs/snapscreen/snapscreen.html',
        'scrawl':'~/dialogs/scrawl/scrawl.html',
        'music':'~/dialogs/music/music.html',
        'template':'~/dialogs/template/template.html',
        'background':'~/dialogs/background/background.html',
        'charts': '~/dialogs/charts/charts.html'
    };
    //为工具栏添加按钮，以下都是统一的按钮触发命令，所以写在一起
    var btnCmds = ['undo', 'redo', 'formatmatch',
        'bold', 'italic', 'underline', 'fontborder', 'touppercase', 'tolowercase',
        'strikethrough', 'subscript', 'superscript', 'source', 'indent', 'outdent',
        'blockquote', 'pasteplain', 'pagebreak',
        'selectall', 'print','horizontal', 'removeformat', 'time', 'date', 'unlink',
        'insertparagraphbeforetable', 'insertrow', 'insertcol', 'mergeright', 'mergedown', 'deleterow',
        'deletecol', 'splittorows', 'splittocols', 'splittocells', 'mergecells', 'deletetable', 'drafts'];

    for (var i = 0, ci; ci = btnCmds[i++];) {
        ci = ci.toLowerCase();
        editorui[ci] = function (cmd) {
            return function (editor) {
                var ui = new editorui.Button({
                    className:'edui-for-' + cmd,
                    title:editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd) || '',
                    onclick:function () {
                        editor.execCommand(cmd);
                    },
                    theme:editor.options.theme,
                    showText:false
                });
                editorui.buttons[cmd] = ui;
                editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
                    var state = editor.queryCommandState(cmd);
                    if (state == -1) {
                        ui.setDisabled(true);
                        ui.setChecked(false);
                    } else {
                        if (!uiReady) {
                            ui.setDisabled(false);
                            ui.setChecked(state);
                        }
                    }
                });
                return ui;
            };
        }(ci);
    }

    //清除文档
    editorui.cleardoc = function (editor) {
        var ui = new editorui.Button({
            className:'edui-for-cleardoc',
            title:editor.options.labelMap.cleardoc || editor.getLang("labelMap.cleardoc") || '',
            theme:editor.options.theme,
            onclick:function () {
                if (confirm(editor.getLang("confirmClear"))) {
                    editor.execCommand('cleardoc');
                }
            }
        });
        editorui.buttons["cleardoc"] = ui;
        editor.addListener('selectionchange', function () {
            ui.setDisabled(editor.queryCommandState('cleardoc') == -1);
        });
        return ui;
    };

    //排版，图片排版，文字方向
    var typeset = {
        'justify':['left', 'right', 'center', 'justify'],
        'imagefloat':['none', 'left', 'center', 'right'],
        'directionality':['ltr', 'rtl']
    };

    for (var p in typeset) {

        (function (cmd, val) {
            for (var i = 0, ci; ci = val[i++];) {
                (function (cmd2) {
                    editorui[cmd.replace('float', '') + cmd2] = function (editor) {
                        var ui = new editorui.Button({
                            className:'edui-for-' + cmd.replace('float', '') + cmd2,
                            title:editor.options.labelMap[cmd.replace('float', '') + cmd2] || editor.getLang("labelMap." + cmd.replace('float', '') + cmd2) || '',
                            theme:editor.options.theme,
                            onclick:function () {
                                editor.execCommand(cmd, cmd2);
                            }
                        });
                        editorui.buttons[cmd] = ui;
                        editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
                            ui.setDisabled(editor.queryCommandState(cmd) == -1);
                            ui.setChecked(editor.queryCommandValue(cmd) == cmd2 && !uiReady);
                        });
                        return ui;
                    };
                })(ci)
            }
        })(p, typeset[p])
    }

    //字体颜色和背景颜色
    for (var i = 0, ci; ci = ['backcolor', 'forecolor'][i++];) {
        editorui[ci] = function (cmd) {
            return function (editor) {
                var ui = new editorui.ColorButton({
                    className:'edui-for-' + cmd,
                    color:'default',
                    title:editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd) || '',
                    editor:editor,
                    onpickcolor:function (t, color) {
                        editor.execCommand(cmd, color);
                    },
                    onpicknocolor:function () {
                        editor.execCommand(cmd, 'default');
                        this.setColor('transparent');
                        this.color = 'default';
                    },
                    onbuttonclick:function () {
                        editor.execCommand(cmd, this.color);
                    }
                });
                editorui.buttons[cmd] = ui;
                editor.addListener('selectionchange', function () {
                    ui.setDisabled(editor.queryCommandState(cmd) == -1);
                });
                return ui;
            };
        }(ci);
    }


    var dialogBtns = {
        noOk:['searchreplace', 'help', 'spechars', 'webapp','preview'],
        ok:['attachment', 'anchor', 'link', 'insertimage', 'map', 'gmap', 'insertframe', 'wordimage',
            'insertvideo', 'insertframe', 'edittip', 'edittable', 'edittd', 'scrawl', 'template', 'music', 'background', 'charts']
    };

    for (var p in dialogBtns) {
        (function (type, vals) {
            for (var i = 0, ci; ci = vals[i++];) {
                //todo opera下存在问题
                if (browser.opera && ci === "searchreplace") {
                    continue;
                }
                (function (cmd) {
                    editorui[cmd] = function (editor, iframeUrl, title) {
                        iframeUrl = iframeUrl || (editor.options.iframeUrlMap || {})[cmd] || iframeUrlMap[cmd];
                        title = editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd) || '';

                        var dialog;
                        //没有iframeUrl不创建dialog
                        if (iframeUrl) {
                            dialog = new editorui.Dialog(utils.extend({
                                iframeUrl:editor.ui.mapUrl(iframeUrl),
                                editor:editor,
                                className:'edui-for-' + cmd,
                                title:title,
                                holdScroll: cmd === 'insertimage',
                                fullscreen: /charts|preview/.test(cmd),
                                closeDialog:editor.getLang("closeDialog")
                            }, type == 'ok' ? {
                                buttons:[
                                    {
                                        className:'edui-okbutton',
                                        label:editor.getLang("ok"),
                                        editor:editor,
                                        onclick:function () {
                                            dialog.close(true);
                                        }
                                    },
                                    {
                                        className:'edui-cancelbutton',
                                        label:editor.getLang("cancel"),
                                        editor:editor,
                                        onclick:function () {
                                            dialog.close(false);
                                        }
                                    }
                                ]
                            } : {}));

                            editor.ui._dialogs[cmd + "Dialog"] = dialog;
                        }

                        var ui = new editorui.Button({
                            className:'edui-for-' + cmd,
                            title:title,
                            onclick:function () {
                                if (dialog) {
                                    switch (cmd) {
                                        case "wordimage":
                                            var images = editor.execCommand("wordimage");
                                            if (images && images.length) {
                                                dialog.render();
                                                dialog.open();
                                            }
                                            break;
                                        case "scrawl":
                                            if (editor.queryCommandState("scrawl") != -1) {
                                                dialog.render();
                                                dialog.open();
                                            }

                                            break;
                                        default:
                                            dialog.render();
                                            dialog.open();
                                    }
                                }
                            },
                            theme:editor.options.theme,
                            disabled:(cmd == 'scrawl' && editor.queryCommandState("scrawl") == -1) || ( cmd == 'charts' )
                        });
                        editorui.buttons[cmd] = ui;
                        editor.addListener('selectionchange', function () {
                            //只存在于右键菜单而无工具栏按钮的ui不需要检测状态
                            var unNeedCheckState = {'edittable':1};
                            if (cmd in unNeedCheckState)return;

                            var state = editor.queryCommandState(cmd);
                            if (ui.getDom()) {
                                ui.setDisabled(state == -1);
                                ui.setChecked(state);
                            }

                        });

                        return ui;
                    };
                })(ci.toLowerCase())
            }
        })(p, dialogBtns[p]);
    }

    editorui.snapscreen = function (editor, iframeUrl, title) {
        title = editor.options.labelMap['snapscreen'] || editor.getLang("labelMap.snapscreen") || '';
        var ui = new editorui.Button({
            className:'edui-for-snapscreen',
            title:title,
            onclick:function () {
                editor.execCommand("snapscreen");
            },
            theme:editor.options.theme

        });
        editorui.buttons['snapscreen'] = ui;
        iframeUrl = iframeUrl || (editor.options.iframeUrlMap || {})["snapscreen"] || iframeUrlMap["snapscreen"];
        if (iframeUrl) {
            var dialog = new editorui.Dialog({
                iframeUrl:editor.ui.mapUrl(iframeUrl),
                editor:editor,
                className:'edui-for-snapscreen',
                title:title,
                buttons:[
                    {
                        className:'edui-okbutton',
                        label:editor.getLang("ok"),
                        editor:editor,
                        onclick:function () {
                            dialog.close(true);
                        }
                    },
                    {
                        className:'edui-cancelbutton',
                        label:editor.getLang("cancel"),
                        editor:editor,
                        onclick:function () {
                            dialog.close(false);
                        }
                    }
                ]

            });
            dialog.render();
            editor.ui._dialogs["snapscreenDialog"] = dialog;
        }
        editor.addListener('selectionchange', function () {
            ui.setDisabled(editor.queryCommandState('snapscreen') == -1);
        });
        return ui;
    };

    editorui.insertcode = function (editor, list, title) {
        list = editor.options['insertcode'] || [];
        title = editor.options.labelMap['insertcode'] || editor.getLang("labelMap.insertcode") || '';
       // if (!list.length) return;
        var items = [];
        utils.each(list,function(key,val){
            items.push({
                label:key,
                value:val,
                theme:editor.options.theme,
                renderLabelHtml:function () {
                    return '<div class="edui-label %%-label" >' + (this.label || '') + '</div>';
                }
            });
        });

        var ui = new editorui.Combox({
            editor:editor,
            items:items,
            onselect:function (t, index) {
                editor.execCommand('insertcode', this.items[index].value);
            },
            onbuttonclick:function () {
                this.showPopup();
            },
            title:title,
            initValue:title,
            className:'edui-for-insertcode',
            indexByValue:function (value) {
                if (value) {
                    for (var i = 0, ci; ci = this.items[i]; i++) {
                        if (ci.value.indexOf(value) != -1)
                            return i;
                    }
                }

                return -1;
            }
        });
        editorui.buttons['insertcode'] = ui;
        editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
            if (!uiReady) {
                var state = editor.queryCommandState('insertcode');
                if (state == -1) {
                    ui.setDisabled(true);
                } else {
                    ui.setDisabled(false);
                    var value = editor.queryCommandValue('insertcode');
                    if(!value){
                        ui.setValue(title);
                        return;
                    }
                    //trace:1871 ie下从源码模式切换回来时，字体会带单引号，而且会有逗号
                    value && (value = value.replace(/['"]/g, '').split(',')[0]);
                    ui.setValue(value);

                }
            }

        });
        return ui;
    };
    editorui.fontfamily = function (editor, list, title) {

        list = editor.options['fontfamily'] || [];
        title = editor.options.labelMap['fontfamily'] || editor.getLang("labelMap.fontfamily") || '';
        if (!list.length) return;
        for (var i = 0, ci, items = []; ci = list[i]; i++) {
            var langLabel = editor.getLang('fontfamily')[ci.name] || "";
            (function (key, val) {
                items.push({
                    label:key,
                    value:val,
                    theme:editor.options.theme,
                    renderLabelHtml:function () {
                        return '<div class="edui-label %%-label" style="font-family:' +
                            utils.unhtml(this.value) + '">' + (this.label || '') + '</div>';
                    }
                });
            })(ci.label || langLabel, ci.val)
        }
        var ui = new editorui.Combox({
            editor:editor,
            items:items,
            onselect:function (t, index) {
                editor.execCommand('FontFamily', this.items[index].value);
            },
            onbuttonclick:function () {
                this.showPopup();
            },
            title:title,
            initValue:title,
            className:'edui-for-fontfamily',
            indexByValue:function (value) {
                if (value) {
                    for (var i = 0, ci; ci = this.items[i]; i++) {
                        if (ci.value.indexOf(value) != -1)
                            return i;
                    }
                }

                return -1;
            }
        });
        editorui.buttons['fontfamily'] = ui;
        editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
            if (!uiReady) {
                var state = editor.queryCommandState('FontFamily');
                if (state == -1) {
                    ui.setDisabled(true);
                } else {
                    ui.setDisabled(false);
                    var value = editor.queryCommandValue('FontFamily');
                    //trace:1871 ie下从源码模式切换回来时，字体会带单引号，而且会有逗号
                    value && (value = value.replace(/['"]/g, '').split(',')[0]);
                    ui.setValue(value);

                }
            }

        });
        return ui;
    };

    editorui.fontsize = function (editor, list, title) {
        title = editor.options.labelMap['fontsize'] || editor.getLang("labelMap.fontsize") || '';
        list = list || editor.options['fontsize'] || [];
        if (!list.length) return;
        var items = [];
        for (var i = 0; i < list.length; i++) {
            var size = list[i] + 'px';
            items.push({
                label:size,
                value:size,
                theme:editor.options.theme,
                renderLabelHtml:function () {
                    return '<div class="edui-label %%-label" style="line-height:1;font-size:' +
                        this.value + '">' + (this.label || '') + '</div>';
                }
            });
        }
        var ui = new editorui.Combox({
            editor:editor,
            items:items,
            title:title,
            initValue:title,
            onselect:function (t, index) {
                editor.execCommand('FontSize', this.items[index].value);
            },
            onbuttonclick:function () {
                this.showPopup();
            },
            className:'edui-for-fontsize'
        });
        editorui.buttons['fontsize'] = ui;
        editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
            if (!uiReady) {
                var state = editor.queryCommandState('FontSize');
                if (state == -1) {
                    ui.setDisabled(true);
                } else {
                    ui.setDisabled(false);
                    ui.setValue(editor.queryCommandValue('FontSize'));
                }
            }

        });
        return ui;
    };

    editorui.paragraph = function (editor, list, title) {
        title = editor.options.labelMap['paragraph'] || editor.getLang("labelMap.paragraph") || '';
        list = editor.options['paragraph'] || [];
        if (utils.isEmptyObject(list)) return;
        var items = [];
        for (var i in list) {
            items.push({
                value:i,
                label:list[i] || editor.getLang("paragraph")[i],
                theme:editor.options.theme,
                renderLabelHtml:function () {
                    return '<div class="edui-label %%-label"><span class="edui-for-' + this.value + '">' + (this.label || '') + '</span></div>';
                }
            })
        }
        var ui = new editorui.Combox({
            editor:editor,
            items:items,
            title:title,
            initValue:title,
            className:'edui-for-paragraph',
            onselect:function (t, index) {
                editor.execCommand('Paragraph', this.items[index].value);
            },
            onbuttonclick:function () {
                this.showPopup();
            }
        });
        editorui.buttons['paragraph'] = ui;
        editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
            if (!uiReady) {
                var state = editor.queryCommandState('Paragraph');
                if (state == -1) {
                    ui.setDisabled(true);
                } else {
                    ui.setDisabled(false);
                    var value = editor.queryCommandValue('Paragraph');
                    var index = ui.indexByValue(value);
                    if (index != -1) {
                        ui.setValue(value);
                    } else {
                        ui.setValue(ui.initValue);
                    }
                }
            }

        });
        return ui;
    };


    //自定义标题
    editorui.customstyle = function (editor) {
        var list = editor.options['customstyle'] || [],
            title = editor.options.labelMap['customstyle'] || editor.getLang("labelMap.customstyle") || '';
        if (!list.length)return;
        var langCs = editor.getLang('customstyle');
        for (var i = 0, items = [], t; t = list[i++];) {
            (function (t) {
                var ck = {};
                ck.label = t.label ? t.label : langCs[t.name];
                ck.style = t.style;
                ck.className = t.className;
                ck.tag = t.tag;
                items.push({
                    label:ck.label,
                    value:ck,
                    theme:editor.options.theme,
                    renderLabelHtml:function () {
                        return '<div class="edui-label %%-label">' + '<' + ck.tag + ' ' + (ck.className ? ' class="' + ck.className + '"' : "")
                            + (ck.style ? ' style="' + ck.style + '"' : "") + '>' + ck.label + "<\/" + ck.tag + ">"
                            + '</div>';
                    }
                });
            })(t);
        }

        var ui = new editorui.Combox({
            editor:editor,
            items:items,
            title:title,
            initValue:title,
            className:'edui-for-customstyle',
            onselect:function (t, index) {
                editor.execCommand('customstyle', this.items[index].value);
            },
            onbuttonclick:function () {
                this.showPopup();
            },
            indexByValue:function (value) {
                for (var i = 0, ti; ti = this.items[i++];) {
                    if (ti.label == value) {
                        return i - 1
                    }
                }
                return -1;
            }
        });
        editorui.buttons['customstyle'] = ui;
        editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
            if (!uiReady) {
                var state = editor.queryCommandState('customstyle');
                if (state == -1) {
                    ui.setDisabled(true);
                } else {
                    ui.setDisabled(false);
                    var value = editor.queryCommandValue('customstyle');
                    var index = ui.indexByValue(value);
                    if (index != -1) {
                        ui.setValue(value);
                    } else {
                        ui.setValue(ui.initValue);
                    }
                }
            }

        });
        return ui;
    };
    editorui.inserttable = function (editor, iframeUrl, title) {
        title = editor.options.labelMap['inserttable'] || editor.getLang("labelMap.inserttable") || '';
        var ui = new editorui.TableButton({
            editor:editor,
            title:title,
            className:'edui-for-inserttable',
            onpicktable:function (t, numCols, numRows) {
                editor.execCommand('InsertTable', {numRows:numRows, numCols:numCols, border:1});
            },
            onbuttonclick:function () {
                this.showPopup();
            }
        });
        editorui.buttons['inserttable'] = ui;
        editor.addListener('selectionchange', function () {
            ui.setDisabled(editor.queryCommandState('inserttable') == -1);
        });
        return ui;
    };

    editorui.lineheight = function (editor) {
        var val = editor.options.lineheight || [];
        if (!val.length)return;
        for (var i = 0, ci, items = []; ci = val[i++];) {
            items.push({
                //todo:写死了
                label:ci,
                value:ci,
                theme:editor.options.theme,
                onclick:function () {
                    editor.execCommand("lineheight", this.value);
                }
            })
        }
        var ui = new editorui.MenuButton({
            editor:editor,
            className:'edui-for-lineheight',
            title:editor.options.labelMap['lineheight'] || editor.getLang("labelMap.lineheight") || '',
            items:items,
            onbuttonclick:function () {
                var value = editor.queryCommandValue('LineHeight') || this.value;
                editor.execCommand("LineHeight", value);
            }
        });
        editorui.buttons['lineheight'] = ui;
        editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState('LineHeight');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
                var value = editor.queryCommandValue('LineHeight');
                value && ui.setValue((value + '').replace(/cm/, ''));
                ui.setChecked(state)
            }
        });
        return ui;
    };

    var rowspacings = ['top', 'bottom'];
    for (var r = 0, ri; ri = rowspacings[r++];) {
        (function (cmd) {
            editorui['rowspacing' + cmd] = function (editor) {
                var val = editor.options['rowspacing' + cmd] || [];
                if (!val.length) return null;
                for (var i = 0, ci, items = []; ci = val[i++];) {
                    items.push({
                        label:ci,
                        value:ci,
                        theme:editor.options.theme,
                        onclick:function () {
                            editor.execCommand("rowspacing", this.value, cmd);
                        }
                    })
                }
                var ui = new editorui.MenuButton({
                    editor:editor,
                    className:'edui-for-rowspacing' + cmd,
                    title:editor.options.labelMap['rowspacing' + cmd] || editor.getLang("labelMap.rowspacing" + cmd) || '',
                    items:items,
                    onbuttonclick:function () {
                        var value = editor.queryCommandValue('rowspacing', cmd) || this.value;
                        editor.execCommand("rowspacing", value, cmd);
                    }
                });
                editorui.buttons[cmd] = ui;
                editor.addListener('selectionchange', function () {
                    var state = editor.queryCommandState('rowspacing', cmd);
                    if (state == -1) {
                        ui.setDisabled(true);
                    } else {
                        ui.setDisabled(false);
                        var value = editor.queryCommandValue('rowspacing', cmd);
                        value && ui.setValue((value + '').replace(/%/, ''));
                        ui.setChecked(state)
                    }
                });
                return ui;
            }
        })(ri)
    }
    //有序，无序列表
    var lists = ['insertorderedlist', 'insertunorderedlist'];
    for (var l = 0, cl; cl = lists[l++];) {
        (function (cmd) {
            editorui[cmd] = function (editor) {
                var vals = editor.options[cmd],
                    _onMenuClick = function () {
                        editor.execCommand(cmd, this.value);
                    }, items = [];
                for (var i in vals) {
                    items.push({
                        label:vals[i] || editor.getLang()[cmd][i] || "",
                        value:i,
                        theme:editor.options.theme,
                        onclick:_onMenuClick
                    })
                }
                var ui = new editorui.MenuButton({
                    editor:editor,
                    className:'edui-for-' + cmd,
                    title:editor.getLang("labelMap." + cmd) || '',
                    'items':items,
                    onbuttonclick:function () {
                        var value = editor.queryCommandValue(cmd) || this.value;
                        editor.execCommand(cmd, value);
                    }
                });
                editorui.buttons[cmd] = ui;
                editor.addListener('selectionchange', function () {
                    var state = editor.queryCommandState(cmd);
                    if (state == -1) {
                        ui.setDisabled(true);
                    } else {
                        ui.setDisabled(false);
                        var value = editor.queryCommandValue(cmd);
                        ui.setValue(value);
                        ui.setChecked(state)
                    }
                });
                return ui;
            };
        })(cl)
    }

    editorui.fullscreen = function (editor, title) {
        title = editor.options.labelMap['fullscreen'] || editor.getLang("labelMap.fullscreen") || '';
        var ui = new editorui.Button({
            className:'edui-for-fullscreen',
            title:title,
            theme:editor.options.theme,
            onclick:function () {
                if (editor.ui) {
                    editor.ui.setFullScreen(!editor.ui.isFullScreen());
                }
                this.setChecked(editor.ui.isFullScreen());
            }
        });
        editorui.buttons['fullscreen'] = ui;
        editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState('fullscreen');
            ui.setDisabled(state == -1);
            ui.setChecked(editor.ui.isFullScreen());
        });
        return ui;
    };

    // 表情
    editorui["emotion"] = function (editor, iframeUrl) {
        var cmd = "emotion";
        var ui = new editorui.MultiMenuPop({
            title:editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd + "") || '',
            editor:editor,
            className:'edui-for-' + cmd,
            iframeUrl:editor.ui.mapUrl(iframeUrl || (editor.options.iframeUrlMap || {})[cmd] || iframeUrlMap[cmd])
        });
        editorui.buttons[cmd] = ui;

        editor.addListener('selectionchange', function () {
            ui.setDisabled(editor.queryCommandState(cmd) == -1)
        });
        return ui;
    };

    editorui.autotypeset = function (editor) {
        var ui = new editorui.AutoTypeSetButton({
            editor:editor,
            title:editor.options.labelMap['autotypeset'] || editor.getLang("labelMap.autotypeset") || '',
            className:'edui-for-autotypeset',
            onbuttonclick:function () {
                editor.execCommand('autotypeset')
            }
        });
        editorui.buttons['autotypeset'] = ui;
        editor.addListener('selectionchange', function () {
            ui.setDisabled(editor.queryCommandState('autotypeset') == -1);
        });
        return ui;
    };

    /* 简单上传插件 */
    editorui["simpleupload"] = function (editor) {
        var name = 'simpleupload',
            ui = new editorui.Button({
                className:'edui-for-' + name,
                title:editor.options.labelMap[name] || editor.getLang("labelMap." + name) || '',
                onclick:function () {},
                theme:editor.options.theme,
                showText:false
            });
        editorui.buttons[name] = ui;
        editor.addListener('ready', function() {
            var b = ui.getDom('body'),
                iconSpan = b.children[0];
            editor.fireEvent('simpleuploadbtnready', iconSpan);
        });
        editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
            var state = editor.queryCommandState(name);
            if (state == -1) {
                ui.setDisabled(true);
                ui.setChecked(false);
            } else {
                if (!uiReady) {
                    ui.setDisabled(false);
                    ui.setChecked(state);
                }
            }
        });
        return ui;
    };

})();


// adapter/editor.js
///import core
///commands 全屏
///commandsName FullScreen
///commandsTitle  全屏
(function () {
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        domUtils = baidu.editor.dom.domUtils;
    var nodeStack = [];

    function EditorUI(options) {
        this.initOptions(options);
        this.initEditorUI();
    }

    EditorUI.prototype = {
        uiName:'editor',
        initEditorUI:function () {
            this.editor.ui = this;
            this._dialogs = {};
            this.initUIBase();
            this._initToolbars();
            var editor = this.editor,
                me = this;

            editor.addListener('ready', function () {
                //提供getDialog方法
                editor.getDialog = function (name) {
                    return editor.ui._dialogs[name + "Dialog"];
                };
                domUtils.on(editor.window, 'scroll', function (evt) {
                    baidu.editor.ui.Popup.postHide(evt);
                });
                //提供编辑器实时宽高(全屏时宽高不变化)
                editor.ui._actualFrameWidth = editor.options.initialFrameWidth;

                UE.browser.ie && UE.browser.version === 6 && editor.container.ownerDocument.execCommand("BackgroundImageCache", false, true);

                //display bottom-bar label based on config
                if (editor.options.elementPathEnabled) {
                    editor.ui.getDom('elementpath').innerHTML = '<div class="edui-editor-breadcrumb">' + editor.getLang("elementPathTip") + ':</div>';
                }
                if (editor.options.wordCount) {
                    function countFn() {
                        setCount(editor,me);
                        domUtils.un(editor.document, "click", arguments.callee);
                    }
                    domUtils.on(editor.document, "click", countFn);
                    editor.ui.getDom('wordcount').innerHTML = editor.getLang("wordCountTip");
                }
                editor.ui._scale();
                if (editor.options.scaleEnabled) {
                    if (editor.autoHeightEnabled) {
                        editor.disableAutoHeight();
                    }
                    me.enableScale();
                } else {
                    me.disableScale();
                }
                if (!editor.options.elementPathEnabled && !editor.options.wordCount && !editor.options.scaleEnabled) {
                    editor.ui.getDom('elementpath').style.display = "none";
                    editor.ui.getDom('wordcount').style.display = "none";
                    editor.ui.getDom('scale').style.display = "none";
                }

                if (!editor.selection.isFocus())return;
                editor.fireEvent('selectionchange', false, true);


            });

            editor.addListener('mousedown', function (t, evt) {
                var el = evt.target || evt.srcElement;
                baidu.editor.ui.Popup.postHide(evt, el);
                baidu.editor.ui.ShortCutMenu.postHide(evt);

            });
            editor.addListener("delcells", function () {
                if (UE.ui['edittip']) {
                    new UE.ui['edittip'](editor);
                }
                editor.getDialog('edittip').open();
            });

            var pastePop, isPaste = false, timer;
            editor.addListener("afterpaste", function () {
                if(editor.queryCommandState('pasteplain'))
                    return;
                if(baidu.editor.ui.PastePicker){
                    pastePop = new baidu.editor.ui.Popup({
                        content:new baidu.editor.ui.PastePicker({editor:editor}),
                        editor:editor,
                        className:'edui-wordpastepop'
                    });
                    pastePop.render();
                }
                isPaste = true;
            });

            editor.addListener("afterinserthtml", function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    if (pastePop && (isPaste || editor.ui._isTransfer)) {
                        if(pastePop.isHidden()){
                            var span = domUtils.createElement(editor.document, 'span', {
                                    'style':"line-height:0px;",
                                    'innerHTML':'\ufeff'
                                }),
                                range = editor.selection.getRange();
                            range.insertNode(span);
                            var tmp= getDomNode(span, 'firstChild', 'previousSibling');
                            tmp && pastePop.showAnchor(tmp.nodeType == 3 ? tmp.parentNode : tmp);
                            domUtils.remove(span);
                        }else{
                            pastePop.show();
                        }
                        delete editor.ui._isTransfer;
                        isPaste = false;
                    }
                }, 200)
            });
            editor.addListener('contextmenu', function (t, evt) {
                baidu.editor.ui.Popup.postHide(evt);
            });
            editor.addListener('keydown', function (t, evt) {
                if (pastePop)    pastePop.dispose(evt);
                var keyCode = evt.keyCode || evt.which;
                if(evt.altKey&&keyCode==90){
                    UE.ui.buttons['fullscreen'].onclick();
                }
            });
            editor.addListener('wordcount', function (type) {
                setCount(this,me);
            });
            function setCount(editor,ui) {
                editor.setOpt({
                    wordCount:true,
                    maximumWords:10000,
                    wordCountMsg:editor.options.wordCountMsg || editor.getLang("wordCountMsg"),
                    wordOverFlowMsg:editor.options.wordOverFlowMsg || editor.getLang("wordOverFlowMsg")
                });
                var opt = editor.options,
                    max = opt.maximumWords,
                    msg = opt.wordCountMsg ,
                    errMsg = opt.wordOverFlowMsg,
                    countDom = ui.getDom('wordcount');
                if (!opt.wordCount) {
                    return;
                }
                var count = editor.getContentLength(true);
                if (count > max) {
                    countDom.innerHTML = errMsg;
                    editor.fireEvent("wordcountoverflow");
                } else {
                    countDom.innerHTML = msg.replace("{#leave}", max - count).replace("{#count}", count);
                }
            }

            editor.addListener('selectionchange', function () {
                if (editor.options.elementPathEnabled) {
                    me[(editor.queryCommandState('elementpath') == -1 ? 'dis' : 'en') + 'ableElementPath']()
                }
                if (editor.options.scaleEnabled) {
                    me[(editor.queryCommandState('scale') == -1 ? 'dis' : 'en') + 'ableScale']();

                }
            });
            var popup = new baidu.editor.ui.Popup({
                editor:editor,
                content:'',
                className:'edui-bubble',
                _onEditButtonClick:function () {
                    this.hide();
                    editor.ui._dialogs.linkDialog.open();
                },
                _onImgEditButtonClick:function (name) {
                    this.hide();
                    editor.ui._dialogs[name] && editor.ui._dialogs[name].open();

                },
                _onImgSetFloat:function (value) {
                    this.hide();
                    editor.execCommand("imagefloat", value);

                },
                _setIframeAlign:function (value) {
                    var frame = popup.anchorEl;
                    var newFrame = frame.cloneNode(true);
                    switch (value) {
                        case -2:
                            newFrame.setAttribute("align", "");
                            break;
                        case -1:
                            newFrame.setAttribute("align", "left");
                            break;
                        case 1:
                            newFrame.setAttribute("align", "right");
                            break;
                    }
                    frame.parentNode.insertBefore(newFrame, frame);
                    domUtils.remove(frame);
                    popup.anchorEl = newFrame;
                    popup.showAnchor(popup.anchorEl);
                },
                _updateIframe:function () {
                    var frame = editor._iframe = popup.anchorEl;
                    if(domUtils.hasClass(frame, 'ueditor_baidumap')) {
                        editor.selection.getRange().selectNode(frame).select();
                        editor.ui._dialogs.mapDialog.open();
                        popup.hide();
                    } else {
                        editor.ui._dialogs.insertframeDialog.open();
                        popup.hide();
                    }
                },
                _onRemoveButtonClick:function (cmdName) {
                    editor.execCommand(cmdName);
                    this.hide();
                },
                queryAutoHide:function (el) {
                    if (el && el.ownerDocument == editor.document) {
                        if (el.tagName.toLowerCase() == 'img' || domUtils.findParentByTagName(el, 'a', true)) {
                            return el !== popup.anchorEl;
                        }
                    }
                    return baidu.editor.ui.Popup.prototype.queryAutoHide.call(this, el);
                }
            });
            popup.render();
            if (editor.options.imagePopup) {
                editor.addListener('mouseover', function (t, evt) {
                    evt = evt || window.event;
                    var el = evt.target || evt.srcElement;
                    if (editor.ui._dialogs.insertframeDialog && /iframe/ig.test(el.tagName)) {
                        var html = popup.formatHtml(
                            '<nobr>' + editor.getLang("property") + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + editor.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + editor.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + editor.getLang("justifyright") + '</span>&nbsp;&nbsp;' +
                                ' <span onclick="$$._updateIframe( this);" class="edui-clickable">' + editor.getLang("modify") + '</span></nobr>');
                        if (html) {
                            popup.getDom('content').innerHTML = html;
                            popup.anchorEl = el;
                            popup.showAnchor(popup.anchorEl);
                        } else {
                            popup.hide();
                        }
                    }
                });
                editor.addListener('selectionchange', function (t, causeByUi) {
                    if (!causeByUi) return;
                    var html = '', str = "",
                        img = editor.selection.getRange().getClosedNode(),
                        dialogs = editor.ui._dialogs;
                    if (img && img.tagName == 'IMG') {
                        var dialogName = 'insertimageDialog';
                        if (img.className.indexOf("edui-faked-video") != -1 || img.className.indexOf("edui-upload-video") != -1) {
                            dialogName = "insertvideoDialog"
                        }
                        if (img.className.indexOf("edui-faked-webapp") != -1) {
                            dialogName = "webappDialog"
                        }
                        if (img.src.indexOf("http://api.map.baidu.com") != -1) {
                            dialogName = "mapDialog"
                        }
                        if (img.className.indexOf("edui-faked-music") != -1) {
                            dialogName = "musicDialog"
                        }
                        if (img.src.indexOf("http://maps.google.com/maps/api/staticmap") != -1) {
                            dialogName = "gmapDialog"
                        }
                        if (img.getAttribute("anchorname")) {
                            dialogName = "anchorDialog";
                            html = popup.formatHtml(
                                '<nobr>' + editor.getLang("property") + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + editor.getLang("modify") + '</span>&nbsp;&nbsp;' +
                                    '<span onclick=$$._onRemoveButtonClick(\'anchor\') class="edui-clickable">' + editor.getLang("delete") + '</span></nobr>');
                        }
                        if (img.getAttribute("word_img")) {
                            //todo 放到dialog去做查询
                            editor.word_img = [img.getAttribute("word_img")];
                            dialogName = "wordimageDialog"
                        }
                        if(domUtils.hasClass(img, 'loadingclass') || domUtils.hasClass(img, 'loaderrorclass')) {
                            dialogName = "";
                        }
                        if (!dialogs[dialogName]) {
                            return;
                        }
                        str = '<nobr>' + editor.getLang("property") + ': '+
                            '<span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + editor.getLang("default") + '</span>&nbsp;&nbsp;' +
                            '<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + editor.getLang("justifyleft") + '</span>&nbsp;&nbsp;' +
                            '<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + editor.getLang("justifyright") + '</span>&nbsp;&nbsp;' +
                            '<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' + editor.getLang("justifycenter") + '</span>&nbsp;&nbsp;'+
                            '<span onclick="$$._onImgEditButtonClick(\'' + dialogName + '\');" class="edui-clickable">' + editor.getLang("modify") + '</span></nobr>';

                        !html && (html = popup.formatHtml(str))

                    }
                    if (editor.ui._dialogs.linkDialog) {
                        var link = editor.queryCommandValue('link');
                        var url;
                        if (link && (url = (link.getAttribute('_href') || link.getAttribute('href', 2)))) {
                            var txt = url;
                            if (url.length > 30) {
                                txt = url.substring(0, 20) + "...";
                            }
                            if (html) {
                                html += '<div style="height:5px;"></div>'
                            }
                            html += popup.formatHtml(
                                '<nobr>' + editor.getLang("anthorMsg") + ': <a target="_blank" href="' + url + '" title="' + url + '" >' + txt + '</a>' +
                                    ' <span class="edui-clickable" onclick="$$._onEditButtonClick();">' + editor.getLang("modify") + '</span>' +
                                    ' <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + editor.getLang("clear") + '</span></nobr>');
                            popup.showAnchor(link);
                        }
                    }

                    if (html) {
                        popup.getDom('content').innerHTML = html;
                        popup.anchorEl = img || link;
                        popup.showAnchor(popup.anchorEl);
                    } else {
                        popup.hide();
                    }
                });
            }

        },
        _initToolbars:function () {
            var editor = this.editor;
            var toolbars = this.toolbars || [];
            var toolbarUis = [];
            for (var i = 0; i < toolbars.length; i++) {
                var toolbar = toolbars[i];
                var toolbarUi = new baidu.editor.ui.Toolbar({theme:editor.options.theme});
                for (var j = 0; j < toolbar.length; j++) {
                    var toolbarItem = toolbar[j];
                    var toolbarItemUi = null;
                    if (typeof toolbarItem == 'string') {
                        toolbarItem = toolbarItem.toLowerCase();
                        if (toolbarItem == '|') {
                            toolbarItem = 'Separator';
                        }
                        if(toolbarItem == '||'){
                            toolbarItem = 'Breakline';
                        }
                        if (baidu.editor.ui[toolbarItem]) {
                            toolbarItemUi = new baidu.editor.ui[toolbarItem](editor);
                        }

                        //fullscreen这里单独处理一下，放到首行去
                        if (toolbarItem == 'fullscreen') {
                            if (toolbarUis && toolbarUis[0]) {
                                toolbarUis[0].items.splice(0, 0, toolbarItemUi);
                            } else {
                                toolbarItemUi && toolbarUi.items.splice(0, 0, toolbarItemUi);
                            }

                            continue;


                        }
                    } else {
                        toolbarItemUi = toolbarItem;
                    }
                    if (toolbarItemUi && toolbarItemUi.id) {

                        toolbarUi.add(toolbarItemUi);
                    }
                }
                toolbarUis[i] = toolbarUi;
            }

            //接受外部定制的UI

            utils.each(UE._customizeUI,function(obj,key){
                var itemUI,index;
                if(obj.id && obj.id != editor.key){
                   return false;
                }
                itemUI = obj.execFn.call(editor,editor,key);
                if(itemUI){
                    index = obj.index;
                    if(index === undefined){
                        index = toolbarUi.items.length;
                    }
                    toolbarUi.add(itemUI,index)
                }
            });

            this.toolbars = toolbarUis;
        },
        getHtmlTpl:function () {
            return '<div id="##" class="%%">' +
                '<div id="##_toolbarbox" class="%%-toolbarbox">' +
                (this.toolbars.length ?
                    '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' +
                        this.renderToolbarBoxHtml() +
                        '</div></div>' : '') +
                '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;">' +
                '<div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang("clickToUpload") + '</div>' +
                '<div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div>' +
                '<div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div>' +
                '<div style="height:0;overflow:hidden;clear:both;"></div>' +
                '</div>' +
                '<div id="##_message_holder" class="%%-messageholder"></div>' +
                '</div>' +
                '<div id="##_iframeholder" class="%%-iframeholder">' +
                '</div>' +
                //modify wdcount by matao
                '<div id="##_bottombar" class="%%-bottomContainer"><table><tr>' +
                '<td id="##_elementpath" class="%%-bottombar"></td>' +
                '<td id="##_wordcount" class="%%-wordcount"></td>' +
                '<td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td>' +
                '</tr></table></div>' +
                '<div id="##_scalelayer"></div>' +
                '</div>';
        },
        showWordImageDialog:function () {
            this._dialogs['wordimageDialog'].open();
        },
        renderToolbarBoxHtml:function () {
            var buff = [];
            for (var i = 0; i < this.toolbars.length; i++) {
                buff.push(this.toolbars[i].renderHtml());
            }
            return buff.join('');
        },
        setFullScreen:function (fullscreen) {

            var editor = this.editor,
                container = editor.container.parentNode.parentNode;
            if (this._fullscreen != fullscreen) {
                this._fullscreen = fullscreen;
                this.editor.fireEvent('beforefullscreenchange', fullscreen);
                if (baidu.editor.browser.gecko) {
                    var bk = editor.selection.getRange().createBookmark();
                }
                if (fullscreen) {
                    while (container.tagName != "BODY") {
                        var position = baidu.editor.dom.domUtils.getComputedStyle(container, "position");
                        nodeStack.push(position);
                        container.style.position = "static";
                        container = container.parentNode;
                    }
                    this._bakHtmlOverflow = document.documentElement.style.overflow;
                    this._bakBodyOverflow = document.body.style.overflow;
                    this._bakAutoHeight = this.editor.autoHeightEnabled;
                    this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

                    this._bakEditorContaninerWidth = editor.iframe.parentNode.offsetWidth;
                    if (this._bakAutoHeight) {
                        //当全屏时不能执行自动长高
                        editor.autoHeightEnabled = false;
                        this.editor.disableAutoHeight();
                    }

                    document.documentElement.style.overflow = 'hidden';
                    //修复，滚动条不收起的问题

                    window.scrollTo(0,window.scrollY);
                    this._bakCssText = this.getDom().style.cssText;
                    this._bakCssText1 = this.getDom('iframeholder').style.cssText;
                    editor.iframe.parentNode.style.width = '';
                    this._updateFullScreen();
                } else {
                    while (container.tagName != "BODY") {
                        container.style.position = nodeStack.shift();
                        container = container.parentNode;
                    }
                    this.getDom().style.cssText = this._bakCssText;
                    this.getDom('iframeholder').style.cssText = this._bakCssText1;
                    if (this._bakAutoHeight) {
                        editor.autoHeightEnabled = true;
                        this.editor.enableAutoHeight();
                    }

                    document.documentElement.style.overflow = this._bakHtmlOverflow;
                    document.body.style.overflow = this._bakBodyOverflow;
                    editor.iframe.parentNode.style.width = this._bakEditorContaninerWidth + 'px';
                    window.scrollTo(0, this._bakScrollTop);
                }
                if (browser.gecko && editor.body.contentEditable === 'true') {
                    var input = document.createElement('input');
                    document.body.appendChild(input);
                    editor.body.contentEditable = false;
                    setTimeout(function () {
                        input.focus();
                        setTimeout(function () {
                            editor.body.contentEditable = true;
                            editor.fireEvent('fullscreenchanged', fullscreen);
                            editor.selection.getRange().moveToBookmark(bk).select(true);
                            baidu.editor.dom.domUtils.remove(input);
                            fullscreen && window.scroll(0, 0);
                        }, 0)
                    }, 0)
                }

                if(editor.body.contentEditable === 'true'){
                    this.editor.fireEvent('fullscreenchanged', fullscreen);
                    this.triggerLayout();
                }

            }
        },
        _updateFullScreen:function () {
            if (this._fullscreen) {
                var vpRect = uiUtils.getViewportRect();
                this.getDom().style.cssText = 'border:0;position:absolute;left:0;top:' + (this.editor.options.topOffset || 0) + 'px;width:' + vpRect.width + 'px;height:' + vpRect.height + 'px;z-index:' + (this.getDom().style.zIndex * 1 + 100);
                uiUtils.setViewportOffset(this.getDom(), { left:0, top:this.editor.options.topOffset || 0 });
                this.editor.setHeight(vpRect.height - this.getDom('toolbarbox').offsetHeight - this.getDom('bottombar').offsetHeight - (this.editor.options.topOffset || 0),true);
                //不手动调一下，会导致全屏失效
                if(browser.gecko){
                    try{
                        window.onresize();
                    }catch(e){

                    }

                }
            }
        },
        _updateElementPath:function () {
            var bottom = this.getDom('elementpath'), list;
            if (this.elementPathEnabled && (list = this.editor.queryCommandValue('elementpath'))) {

                var buff = [];
                for (var i = 0, ci; ci = list[i]; i++) {
                    buff[i] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + i + '&quot;);">' + ci + '</span>');
                }
                bottom.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' + this.editor.getLang("elementPathTip") + ': ' + buff.join(' &gt; ') + '</div>';

            } else {
                bottom.style.display = 'none'
            }
        },
        disableElementPath:function () {
            var bottom = this.getDom('elementpath');
            bottom.innerHTML = '';
            bottom.style.display = 'none';
            this.elementPathEnabled = false;

        },
        enableElementPath:function () {
            var bottom = this.getDom('elementpath');
            bottom.style.display = '';
            this.elementPathEnabled = true;
            this._updateElementPath();
        },
        _scale:function () {
            var doc = document,
                editor = this.editor,
                editorHolder = editor.container,
                editorDocument = editor.document,
                toolbarBox = this.getDom("toolbarbox"),
                bottombar = this.getDom("bottombar"),
                scale = this.getDom("scale"),
                scalelayer = this.getDom("scalelayer");

            var isMouseMove = false,
                position = null,
                minEditorHeight = 0,
                minEditorWidth = editor.options.minFrameWidth,
                pageX = 0,
                pageY = 0,
                scaleWidth = 0,
                scaleHeight = 0;

            function down() {
                position = domUtils.getXY(editorHolder);

                if (!minEditorHeight) {
                    minEditorHeight = editor.options.minFrameHeight + toolbarBox.offsetHeight + bottombar.offsetHeight;
                }

                scalelayer.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" + editorHolder.offsetWidth + "px;height:"
                    + editorHolder.offsetHeight + "px;z-index:" + (editor.options.zIndex + 1);

                domUtils.on(doc, "mousemove", move);
                domUtils.on(editorDocument, "mouseup", up);
                domUtils.on(doc, "mouseup", up);
            }

            var me = this;
            //by xuheng 全屏时关掉缩放
            this.editor.addListener('fullscreenchanged', function (e, fullScreen) {
                if (fullScreen) {
                    me.disableScale();

                } else {
                    if (me.editor.options.scaleEnabled) {
                        me.enableScale();
                        var tmpNode = me.editor.document.createElement('span');
                        me.editor.body.appendChild(tmpNode);
                        me.editor.body.style.height = Math.max(domUtils.getXY(tmpNode).y, me.editor.iframe.offsetHeight - 20) + 'px';
                        domUtils.remove(tmpNode)
                    }
                }
            });
            function move(event) {
                clearSelection();
                var e = event || window.event;
                pageX = e.pageX || (doc.documentElement.scrollLeft + e.clientX);
                pageY = e.pageY || (doc.documentElement.scrollTop + e.clientY);
                scaleWidth = pageX - position.x;
                scaleHeight = pageY - position.y;

                if (scaleWidth >= minEditorWidth) {
                    isMouseMove = true;
                    scalelayer.style.width = scaleWidth + 'px';
                }
                if (scaleHeight >= minEditorHeight) {
                    isMouseMove = true;
                    scalelayer.style.height = scaleHeight + "px";
                }
            }

            function up() {
                if (isMouseMove) {
                    isMouseMove = false;
                    editor.ui._actualFrameWidth = scalelayer.offsetWidth - 2;
                    editorHolder.style.width = editor.ui._actualFrameWidth + 'px';

                    editor.setHeight(scalelayer.offsetHeight - bottombar.offsetHeight - toolbarBox.offsetHeight - 2,true);
                }
                if (scalelayer) {
                    scalelayer.style.display = "none";
                }
                clearSelection();
                domUtils.un(doc, "mousemove", move);
                domUtils.un(editorDocument, "mouseup", up);
                domUtils.un(doc, "mouseup", up);
            }

            function clearSelection() {
                if (browser.ie)
                    doc.selection.clear();
                else
                    window.getSelection().removeAllRanges();
            }

            this.enableScale = function () {
                //trace:2868
                if (editor.queryCommandState("source") == 1)    return;
                scale.style.display = "";
                this.scaleEnabled = true;
                domUtils.on(scale, "mousedown", down);
            };
            this.disableScale = function () {
                scale.style.display = "none";
                this.scaleEnabled = false;
                domUtils.un(scale, "mousedown", down);
            };
        },
        isFullScreen:function () {
            return this._fullscreen;
        },
        postRender:function () {
            UIBase.prototype.postRender.call(this);
            for (var i = 0; i < this.toolbars.length; i++) {
                this.toolbars[i].postRender();
            }
            var me = this;
            var timerId,
                domUtils = baidu.editor.dom.domUtils,
                updateFullScreenTime = function () {
                    clearTimeout(timerId);
                    timerId = setTimeout(function () {
                        me._updateFullScreen();
                    });
                };
            domUtils.on(window, 'resize', updateFullScreenTime);

            me.addListener('destroy', function () {
                domUtils.un(window, 'resize', updateFullScreenTime);
                clearTimeout(timerId);
            })
        },
        showToolbarMsg:function (msg, flag) {
            this.getDom('toolbarmsg_label').innerHTML = msg;
            this.getDom('toolbarmsg').style.display = '';
            //
            if (!flag) {
                var w = this.getDom('upload_dialog');
                w.style.display = 'none';
            }
        },
        hideToolbarMsg:function () {
            this.getDom('toolbarmsg').style.display = 'none';
        },
        mapUrl:function (url) {
            return url ? url.replace('~/', this.editor.options.UEDITOR_HOME_URL || '') : ''
        },
        triggerLayout:function () {
            var dom = this.getDom();
            if (dom.style.zoom == '1') {
                dom.style.zoom = '100%';
            } else {
                dom.style.zoom = '1';
            }
        }
    };
    utils.inherits(EditorUI, baidu.editor.ui.UIBase);


    var instances = {};


    UE.ui.Editor = function (options) {
        var editor = new UE.Editor(options);
        editor.options.editor = editor;
        utils.loadFile(document, {
            href:editor.options.themePath + editor.options.theme + "/css/ueditor.css",
            tag:"link",
            type:"text/css",
            rel:"stylesheet"
        });

        var oldRender = editor.render;
        editor.render = function (holder) {
            if (holder.constructor === String) {
                editor.key = holder;
                instances[holder] = editor;
            }
            utils.domReady(function () {
                editor.langIsReady ? renderUI() : editor.addListener("langReady", renderUI);
                function renderUI() {
                    editor.setOpt({
                        labelMap:editor.options.labelMap || editor.getLang('labelMap')
                    });
                    new EditorUI(editor.options);
                    if (holder) {
                        if (holder.constructor === String) {
                            holder = document.getElementById(holder);
                        }
                        holder && holder.getAttribute('name') && ( editor.options.textarea = holder.getAttribute('name'));
                        if (holder && /script|textarea/ig.test(holder.tagName)) {
                            var newDiv = document.createElement('div');
                            holder.parentNode.insertBefore(newDiv, holder);
                            var cont = holder.value || holder.innerHTML;
                            editor.options.initialContent = /^[\t\r\n ]*$/.test(cont) ? editor.options.initialContent :
                                cont.replace(/>[\n\r\t]+([ ]{4})+/g, '>')
                                    .replace(/[\n\r\t]+([ ]{4})+</g, '<')
                                    .replace(/>[\n\r\t]+</g, '><');
                            holder.className && (newDiv.className = holder.className);
                            holder.style.cssText && (newDiv.style.cssText = holder.style.cssText);
                            if (/textarea/i.test(holder.tagName)) {
                                editor.textarea = holder;
                                editor.textarea.style.display = 'none';


                            } else {
                                holder.parentNode.removeChild(holder);


                            }
                            if(holder.id){
                                newDiv.id = holder.id;
                                domUtils.removeAttributes(holder,'id');
                            }
                            holder = newDiv;
                            holder.innerHTML = '';
                        }

                    }
                    domUtils.addClass(holder, "edui-" + editor.options.theme);
                    editor.ui.render(holder);
                    var opt = editor.options;
                    //给实例添加一个编辑器的容器引用
                    editor.container = editor.ui.getDom();
                    var parents = domUtils.findParents(holder,true);
                    var displays = [];
                    for(var i = 0 ,ci;ci=parents[i];i++){
                        displays[i] = ci.style.display;
                        ci.style.display = 'block'
                    }
                    if (opt.initialFrameWidth) {
                        opt.minFrameWidth = opt.initialFrameWidth;
                    } else {
                        opt.minFrameWidth = opt.initialFrameWidth = holder.offsetWidth;
                        var styleWidth = holder.style.width;
                        if(/%$/.test(styleWidth)) {
                            opt.initialFrameWidth = styleWidth;
                        }
                    }
                    if (opt.initialFrameHeight) {
                        opt.minFrameHeight = opt.initialFrameHeight;
                    } else {
                        opt.initialFrameHeight = opt.minFrameHeight = holder.offsetHeight;
                    }
                    for(var i = 0 ,ci;ci=parents[i];i++){
                        ci.style.display =  displays[i]
                    }
                    //编辑器最外容器设置了高度，会导致，编辑器不占位
                    //todo 先去掉，没有找到原因
                    if(holder.style.height){
                        holder.style.height = ''
                    }
                    editor.container.style.width = opt.initialFrameWidth + (/%$/.test(opt.initialFrameWidth) ? '' : 'px');
                    editor.container.style.zIndex = opt.zIndex;
                    oldRender.call(editor, editor.ui.getDom('iframeholder'));
                    editor.fireEvent("afteruiready");
                }
            })
        };
        return editor;
    };


    /**
     * @file
     * @name UE
     * @short UE
     * @desc UEditor的顶部命名空间
     */
    /**
     * @name getEditor
     * @since 1.2.4+
     * @grammar UE.getEditor(id,[opt])  =>  Editor实例
     * @desc 提供一个全局的方法得到编辑器实例
     *
     * * ''id''  放置编辑器的容器id, 如果容器下的编辑器已经存在，就直接返回
     * * ''opt'' 编辑器的可选参数
     * @example
     *  UE.getEditor('containerId',{onready:function(){//创建一个编辑器实例
     *      this.setContent('hello')
     *  }});
     *  UE.getEditor('containerId'); //返回刚创建的实例
     *
     */
    UE.getEditor = function (id, opt) {
        var editor = instances[id];
        if (!editor) {
            editor = instances[id] = new UE.ui.Editor(opt);
            editor.render(id);
        }
        return editor;
    };


    UE.delEditor = function (id) {
        var editor;
        if (editor = instances[id]) {
            editor.key && editor.destroy();
            delete instances[id]
        }
    };

    UE.registerUI = function(uiName,fn,index,editorId){
        utils.each(uiName.split(/\s+/), function (name) {
            UE._customizeUI[name] = {
                id : editorId,
                execFn:fn,
                index:index
            };
        })

    }

})();

// adapter/message.js
UE.registerUI('message', function(editor) {

    var editorui = baidu.editor.ui;
    var Message = editorui.Message;
    var holder;
    var _messageItems = [];
    var me = editor;

    me.addListener('ready', function(){
        holder = document.getElementById(me.ui.id + '_message_holder');
        updateHolderPos();
        setTimeout(function(){
            updateHolderPos();
        }, 500);
    });

    me.addListener('showmessage', function(type, opt){
        opt = utils.isString(opt) ? {
            'content': opt
        } : opt;
        var message = new Message({
                'timeout': opt.timeout,
                'type': opt.type,
                'content': opt.content,
                'keepshow': opt.keepshow,
                'editor': me
            }),
            mid = opt.id || ('msg_' + (+new Date()).toString(36));
        message.render(holder);
        _messageItems[mid] = message;
        message.reset(opt);
        updateHolderPos();
        return mid;
    });

    me.addListener('updatemessage',function(type, id, opt){
        opt = utils.isString(opt) ? {
            'content': opt
        } : opt;
        var message = _messageItems[id];
        message.render(holder);
        message && message.reset(opt);
    });

    me.addListener('hidemessage',function(type, id){
        var message = _messageItems[id];
        message && message.hide();
    });

    function updateHolderPos(){
        var toolbarbox = me.ui.getDom('toolbarbox');
        if (toolbarbox) {
            holder.style.top = toolbarbox.offsetHeight + 3 + 'px';
        }
        holder.style.zIndex = Math.max(me.options.zIndex, me.iframe.style.zIndex) + 1;
    }

});


// adapter/autosave.js
UE.registerUI('autosave', function(editor) {
    var timer = null,uid = null;
    editor.on('afterautosave',function(){
        clearTimeout(timer);

        timer = setTimeout(function(){
            if(uid){
                editor.trigger('hidemessage',uid);
            }
            uid = editor.trigger('showmessage',{
                content : editor.getLang('autosave.success'),
                timeout : 2000
            });

        },2000)
    })

});




})();