---
id: rendering-elements
title: Elementlərin Render Edilməsi
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

<div class="scary">

>
> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
>
> These new documentation pages teach how to write JSX and show it on an HTML page:
>
> - [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
> - [Add React to an Existing Project](https://react.dev/learn/add-react-to-an-existing-project#step-2-render-react-components-anywhere-on-the-page)

</div>

React applikasiyalarının ən kiçik blokları elementlərdir.

Elementlər ekranda nə görmək istədiyinizi təsvir edir:

```js
const element = <h1>Salam Dünya</h1>;
```

Brauzerin DOM elementlərindən fərqli olaraq React elementləri ucuz qiymətə başa gələn sadə JavaScript obyektləridir. Brauzer DOM-unu React elementləri ilə uyğunlaşdırmaq üçün React DOM paketi DOM-u yeniləyir.

>**Qeyd:** 
>
>Elementləri daha çox tanınan "komponentlər" konsepsiyası ilə çaşdırmaq olar. [Gələcək bölmədə](/docs/components-and-props.html) biz komponentlər ilə tanış olacağıq. Komponentlərin elementlərdən düzəldiyindən biz qabağa atlamadan öncə bu bölməni oxumağı tövsiyə edirik.

## Elementləri DOM-a Render Edin {#rendering-an-element-into-the-dom}

Fərz edək ki, HTML faylında `<div>` elementi var:

```html
<div id="root"></div>
```

Biz bu nodu "ana" DOM nodu sayırıq. Çünki bu nodun içərisində baş verən bütün dəyişikliklər React DOM tərəfindən idarə olunacaq.

Adətən, React-də düzəldilmiş applikasiyaların tək ana DOM nodu var. Əgər siz React-i mövcud applikasiyanıza inteqrasiya edirsinizsə, sizdə istədiyiniz qədər ana DOM nodları ola bilər.

React elementini ana DOM noduna render etmək üçün həm elementi həm də ana nodu [`ReactDOM.createRoot()`](/docs/react-dom-client.html#createroot) funksiyasına göndərin:

`embed:rendering-elements/render-an-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)**

Bu səhifə "Salam Dünya" göstərəcək.

## Render Edilmiş Elementi Yeniləyin {#updating-the-rendered-element}

React elementləri [dəyişilməzdir](https://en.wikipedia.org/wiki/Immutable_object). Element yarandıqdan sonra bu elementin uşaqlarını və ya atributlarını dəyişmək olmaz. Element filmdə bir kadr kimidir: hər hansı bir zamanda UI-ı təsvir edir.

Bizim indiki biliyimiz ilə UI-ı yeniləmək üçün yalnız yeni element yaradıb `render()` funksiyasına göndərməliyik.

Aşağıda olan saat misalına baxaq:

`embed:rendering-elements/update-rendered-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)**

Bu kod hər saniyə [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback-indən [`ReactDOM.render()`](/docs/react-dom.html#render) funksiyasını çağırır.

>**Qeyd:**
>
>Praktikada, React applikasiyalarında [`root.render()`](/docs/react-dom.html#render) funksiyası yalnız bir dəfə çağrılır. Gələcək bölmələrdə belə kodun [state-li komponetlərə](/docs/state-and-lifecycle.html) necə inkapsulyasiya etdiyini oyrənəcəyik.
>
>Biz mövzuları ötürməyi tövsiyə etmirik. Çünki bu mövzular bir-birilərindən asılıdırlar.

## React Yalnız Lazım Olanları Yeniləyir {#react-only-updates-whats-necessary}

React DOM, DOM-u istənilən vəziyyətə gətirmək üçün elementləri və uşaqları keçmiş versiyaları ilə müqayisə edərək yalnız lazımi DOM yeniliklərini tətbiq edir.

Siz bunu təsqid etmək üçün [sonuncu misalımızı](https://codepen.io/gaearon/pen/gwoJZk?editors=1010) brauzer alətləri ilə yoxlaya bilərsiniz:

![DOM yoxlayanının yenilikləri göstərməsi](../images/docs/granular-dom-updates.gif)

Bizim hər anda bütün UI ağacını təsvir edən elementi yaratmağımıza baxmayaraq React DOM yalnız dəyişiklik baş verən mətn nodlarını yeniləyir.

Bizim təcrübəmiz göstərir ki, UI-ı zaman ilə necə dəyişmək əvəzinə hər hansı bir anda necə görünəcəyi haqqda fikirləşmək bir çox baqların qarşısını alır.
