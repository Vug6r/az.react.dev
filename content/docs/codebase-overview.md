---
id: codebase-overview
title: Kodun Icmalı
layout: contributing
permalink: docs/codebase-overview.html
prev: how-to-contribute.html
next: implementation-notes.html
redirect_from:
  - "contributing/codebase-overview.html"
---

Bu bölmədə React kodunun orqanizasiyası, konvensiyaları və tətbiqinin icmalı göstərilir.

Əgər [React-ə töhvə vermək istəyirsinizsə](/docs/how-to-contribute.html), buradakı təlimatların sizə dəyişiklik etməkdən qorxmayacağınıza imkan yaradacağına ümid edirik.

Burada göstərilən konvensiyaların React applikasiyalarında işlədilməsini tövsiyyə etmirik. Bu konvensiyaların çoxu tarixi səbəblərə görə mövcuddur və zaman keçdikcə bu konvensiyalar dəyişə bilər.

### Ana Direktoriyalar {#top-level-folders}

[React repo-sunu](https://github.com/facebook/react) klon etdikdə aşağıdakı direktoriyaları görəcəksiniz:

* [`packages`](https://github.com/facebook/react/tree/main/packages) direktoriyasında React reposunda olan bütün paketlərin metadata-ları (`package.json` kimi) və mənbə kodları (`src` alt direktoriyalarında) saxlanılır. **Əgər etdiyiniz dəyişiklik kod ilə əlaqəlidirsə, siz vaxtınızın çoxunu hər paketin `src` alt direktoriyasında keçirəcəksiniz.**
* [`fixtures`](https://github.com/facebook/react/tree/main/fixtures) direktoriyasında iştirakçılar üçün test React applikasiyaları saxlanılır.
* `build` direktoriyasında React-in qurulma nəticəsini saxlanılır. Bu direktoriya repo-da yoxdur, amma bu direktoriyanı React-i ilk dəfə [quraşdırdıqda](/docs/how-to-contribute.html#development-workflow) görəcəksiniz.

Sənədlər [React-dən kənar repo-da](https://github.com/reactjs/reactjs.org) saxlanılır.

Bu repo-da digər ana direktoriyalar da var. Lakin, bu direktoriyalarda alətlər saxlanılır və adətən iştirak etdiyiniz zaman bu direktoriyalarda dəyişiklik etməyəcəksiniz.

### Testlərin Yerləşdirilməsi {#colocated-tests}

Bizdə vahid testləri üçün ana direktoriya yoxdur. Əvəzinə, testlər test olunan faylların olduğu direktoriyada olan `__tests__` direktoriyasında saxlanılır.

Məsələn, [`setInnerHTML.js`](https://github.com/facebook/react/blob/87724bd87506325fcaf2648c70fc1f43411a87be/src/renderers/dom/client/utils/setInnerHTML.js) faylı üçün testlər [`__tests__/setInnerHTML-test.js`](https://github.com/facebook/react/blob/87724bd87506325fcaf2648c70fc1f43411a87be/src/renderers/dom/client/utils/__tests__/setInnerHTML-test.js) faylında yerləşir.

### Xəbərdarlıq və İnvariantlar {#warnings-and-invariants}

React kodu xəbərdarlıqlar göstərmək üçün `console.error` funksiyasından istifadə edir:

```js
if (__DEV__) {
  console.error('Something is wrong.');
}
```

Xəbərdarlıqlar yalnız təkmilləşmə zamanı aktivdirlər. Produksiya zamanı xəbərdarlıqlar qurulan paketdən silinir. Əgər hər hansı kodun icrasını saxlamaq istəyirsinizsə, `invariant` modulundan istifadə edin:

```js
var invariant = require('invariant');

invariant(
  2 + 2 === 4,
  'Giriş qadağandır!'
);
```

**İnvariant `invariant` şərti `false` olduqda göstərilir.**

"Invariant", "bu şərtin həmişə true olması" deməkdir. Bunun iddia etməyə (assertion) bənzədiyini fikirləşə bilərsiniz.

Təkmilləşmə və produksiya davranışlarının eyni saxlanması vacibdir. Bu səbəbdən, `invariant`-lar hər iki mühitdə göstərilir. Produksiya zamanı paket ölçüsünü azaltmaq üçün xəta mesajları avtomatik olaraq xəta kodları ilə əvəz edilir.

### Təkmilləşmə və Produksiya {#development-and-production}

Kod bloklarının yalnız təkmilləşmə zamanı mövcud olması üçün `__DEV__` pseudo-qlobal dəyişənindən istifadə edin.

Bu dəyişən, kompilyasiya zamanı eyni-sətrə keçirilir və CommonJS qurulması zamanı `process.env.NODE_ENV !== 'production'` formalı kod ilə əvəz olunur.

Bu dəyişən, bağımsız qurulmalar üçün minifikasiya olunmamış qurulmalarda `true`-a çevrilir. Minifikasiya olunmuş qurulmalarda isə dəyişəni saxlayan `if` bloku ilə birlikdə tam silinir.

```js
if (__DEV__) {
  // Bu blokdakı kod yalnız təkmilləşmə zamanı mövcud olacaq.
}
```

### Flow {#flow}

Bu yaxınlarda biz koda [Flow](https://flow.org/) yoxlamalarını əlavə etdik. Lisenziya başlıq kommentində `@flow` ilə işarələnən fayllarda tip yoxlamaları baş verəcək.

Biz [mövcud koda Flow işarələrinin əlavə edilmələrinin](https://github.com/facebook/react/pull/7600/files) PR-larını qəbul edirik. Flow işarələri aşağıdakı formada olur:

```js
ReactRef.detachRefs = function(
  instance: ReactInstance,
  element: ReactElement | string | number | null | false,
): void {
  // ...
}
```

Mümkün olduğu zaman yeni kodlarda Flow işarələri olmalıdır.
Kodunuzu lokal mühitdə Flow ilə yoxlamaq üçün `yarn flow` əmrini icra edə bilərsiniz.

### Çoxlu Paketlər {#multiple-packages}

React, [monorepo](https://danluu.com/monorepo/)-dur. Bu repo bir neçə paketdən ibarətdir. Bu paketlər eyni zamanda koordinasiya oluna bilir və bütün paketlərin issue-ları bir yerdə saxlanılır.

### React Core {#react-core}

React-in "core"-unda bütün [yuxarı səviyyəli `React` API-ları](/docs/react-api.html#react) saxlanılır. Məsələn:

* `React.createElement()`
* `React.Component`
* `React.Children`

**React core-da yalnız komponentləri təyin etmək üçün lazım olan API-lar saxlanılır.** Burada [rekonsilyasiya](/docs/reconciliation.html) alqoritmi və ya digər platformaya xas olan kodlar mövcud deyil. Buradakı kodlar həm React DOM, həm də React Native komponentləri tərəfindən istifadə edilir.

React core-un kodu [`packages/react`](https://github.com/facebook/react/tree/main/packages/react) direktoriyasında saxlanılır. React core, NPM-də [`react`](https://www.npmjs.com/package/react) paketi adı altında mövcuddur. Bağımsız brauzer qurulmaları isə `react.js` adlanır. Bu qurulmalarda ixrac edilən qlobal dəyişənin adı `React`-dir.

### Render Edici Qurğular {#renderers}

Başlanğıcda React yalnız DOM üçün yaradılmışdı, amma bir zaman sonra [React Native](https://reactnative.dev/) ilə nativ platformalar da dəstəklənməyə başlandı. Bu adaptasiya nəticəsində React-in daxilinə "render edici qurğular" konsepsiyası təqdim olundu.

**Render edici qurğular React ağacını platformaya xas olan çağırışlara çevirmək üçündür.**

Render edici qurğular [`packages/`](https://github.com/facebook/react/tree/main/packages/) direktoriyasında yerləşir:

* [React DOM Renderer](https://github.com/facebook/react/tree/main/packages/react-dom) qurğusu React komponentlərini DOM-a render edir. Bu qurğu [yuxarı səviyyəli `ReactDOM` API-larını](/docs/react-dom.html) tətbiq edir. Bu qurğu NPM-də [`react-dom`](https://www.npmjs.com/package/react-dom) paketi adı ilə mövcuddur. Əlavə olaraq siz bu qurğunu `react-dom.js` adlı bağımsız brauzer paketi ilə də işlədə bilərsiniz. Bu paket, `ReactDOM` qlobal obyektini ixrac edir.
* [React Native Renderer](https://github.com/facebook/react/tree/main/packages/react-native-renderer) qurğusu React komponentlərini nativ görünüşlərə render edir. Bu qurğu React Native tərəfindən işlədilir.
* [React Test Renderer](https://github.com/facebook/react/tree/main/packages/react-test-renderer) qurğusu React komponentlərini JSON ağaclarına çevirir. Bu qurğu [Jest](https://facebook.github.io/jest)-in [Snəpşot Test Etmə](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html) xüsusiyyətindən istifadə edir. Bu qurğu NPM-də [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) paketi adı ilə mövcuddur.

Rəsmi dəstəklənən render edici qurğularından biri də [`react-art`](https://github.com/facebook/react/tree/main/packages/react-art)-dır. Əvvəllər bu qurğu ayrı [GitHub repo-sunda idi](https://github.com/reactjs/react-art), amma hələlik biz bu qurğunu əsas kod repo-suna əlavə etmişik.

>**Qeyd:**
>
>Texniki olaraq [`react-native-renderer`](https://github.com/facebook/react/tree/main/packages/react-native-renderer) qurğusu React-in React Native tətbiqi ilə işləməsi üçün çox nazik bir təbəqədir. Nativ görünüşləri idarə edən, platformaya xas olan kodlar və bu kodların işləməsi üçün lazım olan komponentlər [React Native repo-sunda](https://github.com/facebook/react-native) saxlanılır.

### Rekonsilyatorlar {#reconcilers}

React DOM və React Native kimi çox fərqlənən render edici qurğular belə öz aralarında məntiqlər paylaşırlar. Xüsusilə, deklarativ render etmə, xüsusi komponentlər, state, lifecycle metodları və ref-lərin bütün platformalarda düzgün və stabil işləməsi üçün [rekonsilyasiya](/docs/reconciliation.html) alqoritmi eyni qalmalıdır.

Bunu həll etmək üçün fərqli render edici qurğular öz aralarında bəzi kodları paylaşırlar. Biz React-in bu hissəsini "rekonsilyator" və "rekonsilyasiya edici qurğu" adlandırırıq. `setState` kimi yenilik planlaşdırıldıqda rekonsilyator ağacda olan komponentlərin `render()` funksiyalarını çağıraraq bu komponentləri mount edir, yeniləyir və unmount edir.

Rekonsilyatorların açıq API-ları olmadığından bu qurğular üçün paketlər mövcud deyil. Əvəzinə, bu qurğular yalnız React DOM və React Native kimi render edici qurğular tərəfindən istifadə edilir.

### Stack Rekonsilyatoru {#stack-reconciler}

React 15 və əvvəlki buraxılışlarda "stack" rekonsilyatoru işlədilirdi. Biz bu qurğudan istifadə etməyi dayandırmışıq. Lakin, bu qurğu haqqında detallı məlumat almaq üçün [sonrakı bölməyə baxın](/docs/implementation-notes.html).

### Fiber Rekonsilyatoru {#fiber-reconciler}

Stack rekonsilyatorunda olan problemləri və ümumilikdə uzun müddət mövcud olan problemləri həll etmək üçün göstərdiyimiz cəhdlərdən biri "fiber" rekonsilyatorudur. Bu qurğu React 16-dan başlayaraq standart rekonsilyator kimi işlədilir.

Bu qurğunun əsas məqsədləri aşağıda göstərilib:

* Kəsilə bilən işlərin kiçik hissələrə parçalanması.
* Proqresdə olan işlərin prioritetləşdirilməsi, rebeyzi və yenidən istifadə edilə bilməsi.
* React-də şablonu dəstəkləmək üçün valideyn və uşaqlar arasında istehsalın növbələnməsi.
* `render()`-dən bir neçə elementin qaytarılması.
* Xəta sərhədləri üçün daha yaxşı dəstək.

React-in Fiber Arxitekturası haqqında əlavə məlumat almaq üçün [bura](https://github.com/acdlite/react-fiber-architecture) və [bura](https://blog.ag-grid.com/inside-fiber-an-in-depth-overview-of-the-new-reconciliation-algorithm-in-react) baxın. Bu rekonsilyatorun React 16-da olmasına baxmayaraq hələki asinxron xüsusiyyətlər standart şəkildə aktivləşməyib.

React rekonsilyatoru [`packages/react-reconciler`](https://github.com/facebook/react/tree/main/packages/react-reconciler) direktoriyasında saxlanılır.

### Hadisə Sistemi {#event-system}

React, brauzerlər arası dəyişiklikləri eyniləşdirmək nativ hadisələr üzərindən abstrakt təbəqə tətbiq edir. Bu abstraksiyanın kodu [`packages/react-dom/src/events`](https://github.com/facebook/react/tree/main/packages/react-dom/src/events) direktoriyasındadır.

### Sonrakı Addımlar {#what-next}

React 16-dan öncə mövcud olan rekonsilyasiya edici qurğunun tətbiqi haqqında dərindən məlumat almaq üçün [sonrakı bölməyə](/docs/implementation-notes.html) baxın. Biz hələki, yeni rekonsilyasiya edici qurğunun daxilini sənədləşdirməmişik.
