---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<<<<<<< HEAD
Əgər siz React-i `<script>` təqi ilə yükləyirsinizsə, yüksək dərəcəli API-lar 
üçün `ReactDOM` qlobal dəyişənindən istifadə edilə bilərsiniz. Əgər siz NPM ilə ES6 işlədirsinizsə, siz `import ReactDOM from 'react-dom'` yaza bilərsiniz. Əgər siz NPM ilə ES5 işlədirsinizsə, siz `var ReactDOM = require('react-dom')` yaza bilərsiniz.
=======
The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

The `react-dom` package also provides modules specific to client and server apps:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

## İcmal {#overview}

<<<<<<< HEAD
`react-dom` paketi applikasiyanızın ən yüksək dərəcəsində DOMa-a aid olan metodlar ilə və React modelindən kanara çıxmaq üçün metodlar ilə təmin edir. Sizin komponentlərinizin əksəriyyəti bu modulu işlətməməlidir.
=======
The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### Brauzer Dəstəyi {#browser-support}

<<<<<<< HEAD
React bütün populyar brauzerləri (Internet Explorer 9 və yuxarı daxil olmaqla) dəstəkləyir. IE 9 və IE 10 kimi köhnə brauzerlər üçün [bəzi polifillər lazım ola bilər.](/docs/javascript-environment-requirements.html)
=======
React supports all modern browsers, although [some polyfills are required](/docs/javascript-environment-requirements.html) for older versions.
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

> Qeyd
>
<<<<<<< HEAD
> Biz ES5 metodları dəstəkləməyən köhnə brauzerləri dəstəkləmirik. Amma bir çox applikasiyalar [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) kimi polifillər səhifəyə yüklənəndə köhnə brauzerlərdə işləyirlər. Siz bu yolu seçirsinizsə biz sizə kömək edə bilmərik.

* * *
=======
> We do not support older browsers that don't support ES5 methods or microtasks such as Internet Explorer. You may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page, but you're on your own if you choose to take this path.
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

## Arayış {#reference}

### `createPortal()` {#createportal}

```javascript
createPortal(child, container)
```

<<<<<<< HEAD
DOM-da göstərilən `container`-ə React elementini render edərək komponent [referansı](/docs/more-about-refs.html) qaytar ([state-siz komponentlər](/docs/components-and-props.html#function-and-class-components) üçün `null` qaytarır).
=======
Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

```javascript
// Force this state update to be synchronous.
flushSync(() => {
  setCount(count + 1);
});
// By this point, DOM is updated.
```

> Note:
> 
> `flushSync` can significantly hurt performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}
```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Render a React element into the DOM in the supplied `container` and return a [reference](/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/docs/components-and-props.html#function-and-class-components)).
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

Əgər `container`-ə əvvəl başqa React elementi render edilmişdirsə, bu funksiya olan `container`-i yalnız yeniləyəcək və DOM-u yeni React elementini göstərmək üçün dəyişəcək.

Əgər vacib olmayan callback arqumenti təmin edilibsə, təmin edilən funksiya komponent render edildikdən və ya yeniləndikdən sonra çağrılacaq.

> Qeyd:
>
<<<<<<< HEAD
> `ReactDOM.render()` təmin edilən konteynerin daxilini kontrol edir. İlk çağırışda, konteynerin içində olan bütün DOM elementlər silinir. Sonrakı dəyişikliklər isə React-in DOM müqayisə edən alqoritmi ilə səmərəli formada yenilənir.
>
> `ReactDOM.render()` konteyner nodunu dəyişmir (yalnız konteynerin uşaqlarını dəyişir). Mövcud olan uşaqları silmədən yeni komponenti mövcud olan DOM noduna əlavə etmək mümkündür.
>
> Hal hazırda `ReactDOM.render()` ana  `ReactComponent` instansiyasına referansı qaytarır. Amma bu dəyərin istifadəsi köhnəlib və bu dəyərdən istifadə etməyin.
> Çünki React gələcəkdə bəzi hallarda komponentləri asinxron formada render edə bilər. Əgər sizə ana `ReactComponent` instansiyasına referans lazımdırsa, tövsiyə olunan həll ana elementə
> [callback ref-i](/docs/more-about-refs.html#the-ref-callback-attribute) qoşmaqdır.
>
> `ReactDOM.render()` ilə server-də render edilən komponenti hidrat (hydrate) etmək köhnəlib və React 17-də silinəcək. Bunun yerinə [`hydrate()`-dən](#hydrate) istifadə edin.
=======
> `render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](#hydrateroot) instead.
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

* * *

### `hydrate()` {#hydrate}

```javascript
hydrate(element, container[, callback])
```

<<<<<<< HEAD
[`render()`](#render)-dən fərqli olaraq bu funksiya [`ReactDOMServer`](/docs/react-dom-server.html) tərəfindən render edilən HTML kontenti olan konteyneri hidrat etmək üçün işlədilir. React mövcud markapa hadisə işləyicilərini qoşmağa çalışacaq.
=======
> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

React render edilən kontentin server və klientdə eyni olmasını umur. Bu, mətnlərdə olan fərqlilikləri düzəldə bilir amma siz bütün uyğunsuzlara baq kimi davranıb düzəltməyə çalışın. Təkmilləşmə modunda, React hidrasiya zamanı baş verən bütün uyğunsuzluqlar haqqında xəbərdarlıq edir. Uyğunsuzluqlar zamanı attribut fərqlərinin düzəlməsinə heç bir qarantiya yoxdur. Bunun səbəbi performan ilə bağlıdır. Bir çox applikasiyalarda uyğunsuzluqlar nadir olduğundan bütün markapları validasiya etmək çox bahalıdır.

Əgər elementin atributu və ya mətn kontenti server və klientdə qaçılmaz şəkildə fərqlənirsə (məsələn tarix), siz elementə `suppressHydrationWarning={true}` əlavə etməklə xəbərdarlığı söndürə bilərsiniz. Bu yalnız bir dərəcə dərinlikdə işləyir və yalnız çıxış yolu kimi işlətmək üçün nəzərdə tutulub. Bunu çox işlətməyin. Mətn kontenti olmadıqda, React yenə də uyğunsuzluqları düzəltməyə bilər və bu gələcək yeniliklərə kimi eyni qala bilər.

Əgər sizə server və klientdə bilərəkdən fərqli render etmək lazımdırsa siz iki-keçidli render etmədən istifadə edə bilərsiniz. Klientdə fərqli render edilməli komponentlər `this.state.isClient` state (`componentDidMount`-da bunu `true` ilə təyin edə bilərsiniz) dəyərini oxuya bilərlər. Bu səbəbdən ilkin render keçidində klient server ilə eyni kontenti render edəcək və uyğunsuzluq olmayacaq. Amma hidrasiyadan sonra sinxron formada ikinci keçid baş verəcək. Nəzərə alın ki, bu yanaşmada komponentlər iki dəfə render edildiyindən komponentləriniz yavaş işləyə bilərlər. Bu səbəbdən bu yolu diqqət ilə işlədin.

Yavaş internet sürətlədində istifadəçi təcrübəsindən zehinli olun. Javascript kodu ilkin HTML renderindən çox gec sonra yüklənə bilər. Bu səbəbdən klient keçidində fərqli bir şey render edildikdə, keçid çox xoşagəlməz ola bilər. Amma yaxşı icra edildikdə, applikasiyanın "qabığını" serverdə render etmək faydalı ola bilər. Bunu markap uyğunsuzluqları olmadan edə bilmək üçün, əvvəlki paraqrafda olan izahata baxın.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
unmountComponentAtNode(container)
```

<<<<<<< HEAD
Mount olunmuş React komponenti DOM-dan silir və bütün aid olan hadisə işləyicilərini və state-i təmizləyir. Əgər konteynerə heç bir komponent mount edilməyibsə bu funksiyanı çağırdıqda heç nə baş vermir. Bu funksiya komponent unmount edildikdə `true`, unmount edilməyə komponent olmadıqda isə `false` qaytarır.
=======
> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

* * *

### `findDOMNode()` {#finddomnode}

> Qeyd:
>
> `findDOMNode` DOM noduna daxil olmaq üçün bir üsuldur. Bu üsulun komponent abstraksiyasını sındırdığına görə bir çox hallarda bu üsuldan istifadə etməyi tövsiyə etmirik. [`StrictMode`-da bu üsul köhnəlib.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
findDOMNode(component)
```
Əgər komponent DOM-a mount edilibsə bu funksiya brauzerdə komponentə müvafiq nativ DOM elementini qaytarır. Bu metod anket sahələrinin dəyərlərini oxumaq və DOM ölçmələri aparmaq kimi əməliyyatlar üçün DOM-dan dəyərləri oxumaq üçün faydalıdır. **Bir çox hallarda, siz DOM noduna ref qoşub `findDOMNode`-dan istifadə etməyə bilərsiniz.**

Komponent `null` və ya `false` render etdikdə `findDOMNode` `null` qaytarır. Komponent mətn render etdikdə, `findDOMNode` dəyəri saxlayan mətn DOM nodu qaytarır. React 16-dan başlayaraq komponent fraqment ilə bir neçə uşaq qaytara bilər. Bu halda `findDOMNode` ilk boş olmayan uşağın DOM nodunu qaytaracaq.

> Qeyd:
>
> `findDOMNode` yalnız mount olunmuş komponentlər ilə işləyir (yəni DOM-da yerləşən komponentlər ilə). Əgər siz bu funksiyanı mount olunmamış komponentdə çağırsanız (məsələn `findDOMNode()` funksiyasını hələ yaranmamış komponentin `render()`-ində çağırsanız) xəta atılacaq.
>
> `findDOMNode` funksiya komponentlərində işlənə bilməz.

* * *
<<<<<<< HEAD

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Portal yaradır. Portallar [DOM komponenti iyerarxiyası kənarında olan DOM noduna uşaqları render etmək üçün](/docs/portals.html) yol təmin edir.
=======
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f
