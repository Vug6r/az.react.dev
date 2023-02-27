---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

<<<<<<< HEAD
Bu arayış React-in Hadisə Sisteminin bir hissəsini yaradan `SyntheticEvent`-i əhatə edir. Əlavə məlumat üçün [Hadisələrin Emal Edilməsi](/docs/handling-events.html) sənədinə baxın.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Common components (e.g. `<div>`)](https://beta.reactjs.org/reference/react-dom/components/common)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

This reference guide documents the `SyntheticEvent` wrapper that forms part of React's Event System. See the [Handling Events](/docs/handling-events.html) guide to learn more.
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c

## İcmal {#overview}

Hadisə işləyiciləri React-ə `SyntheticEvent`-in instansiyaları kimi ötürüləcək. `SyntheticEvent` bütün brauzerlərdə eyni olan brauzerin nativ hadisəsini əhatə edən obyektdir. Bunun interfeysi `stopPropagation()` və `preventDefault()` daxil olmaqla brauzerin nativ hadisəsi interfeysi ilə eynidir. Brauzerlərin Hadisələrinin özünəməxsus tətbiqindən fərqli olaraq `SyntecticEvent` bütün brauzerlərdə eyni formada işləmir.

Əgər sizə hər hansı səbəbə görə brauzerin nativ hadisəsi lazımdırsa, `nativeEvent` atributundan istifadə edin. Sintetik hadisələr brauzerin nativ hadisələri ilə tam qarşılaşmırlar. Məsələn, `onMouseLeave` hadisəsinin `event.nativeEvent` obyekti `mouseout` hadisəsinə istinad edir. Hər bir `SyntheticEvent` obyektinin aşağıda göstərilən atributları var:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```

> Qeyd:
>
> v17-dən başlayaraq `SyntheticEvent` [hadisə pulinqi etmədiyindən](/docs/legacy-event-pooling.html) `e.persist()` funksiyası heç nə etmir.

> Qeyd:
>
> v0.14-cü versiyadan başlayaraq, hadisə işləyicilərindən `false` qaytardıqda hadisə  yayılması dayandırılmayacaq. Bunun əvəzinə `e.stopPropagation()` və ya `e.preventDefault()` çağrılmalıdır.

## Dəstəklənən Hadisələr {#supported-events}

Bütün brauzerlərdə eyni parametrlərinin olması üçün, React hadisələri normallaşdırır.

Hadisə işləyiciləri hadisə tərəfindən bubbling fazasında çağrılır. Hadisə işləyicisini Capture fazasında qeyd etmək üçün hadisə adının sonuna `Capture` mətnini əlavə edin. Məsələn, Capture fazasında tıklama hadisəsini qeyd etmək üçün `onClick` əvəzinə `onClickCapture` işlətməlisiniz.

- [Clipboard Hadisələri](#clipboard-events)
- [Kompozisiya Hadisələri](#composition-events)
- [Klaviatur Hadisələri](#keyboard-events)
- [Fokus Hadisələri](#focus-events)
- [Anket Hadisələri](#form-events)
- [Ümumi Hadisələr](#generic-events)
- [Maus Hadisələri](#mouse-events)
- [Pointer Hadisələri](#pointer-events)
- [Seleksiya Hadisələri](#selection-events)
- [Toxunuş Hadisələri](#touch-events)
- [UI Hadisələri](#ui-events)
- [Wheel Hadisələri](#wheel-events)
- [Media Hadisələri](#media-events)
- [Şəkil Hadisələri](#image-events)
- [Animasiya Hadisələri](#animation-events)
- [Keçid Hadisələri](#transition-events)
- [Digər Hadisələr](#other-events)

* * *

## Arayış {#reference}

### Clipboard Hadisələri {#clipboard-events}

Hadisə adları:

```
onCopy onCut onPaste
```

Parametrlər:

```javascript
DOMDataTransfer clipboardData
```

* * *

### Kompozisiya Hadisələri {#composition-events}

Hadisə adları:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Parametrlər:

```javascript
string data

```

* * *

### Klaviatur Hadisələri {#keyboard-events}

Hadisə adları:

```
onKeyDown onKeyPress onKeyUp
```

Parametrlər:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

`key` parametri [DOM-un 3-cü səviyyəli Hadisələr spesifikasiyasında](https://www.w3.org/TR/uievents-key/#named-key-attribute-values) olan bütün dəyərləri qəbul edə bilər.

* * *

### Fokus Hadisələri {#focus-events}

Hadisə adları:

```
onFocus onBlur
```

Fokus hadisələri yalnız anketlərdə yox, React DOM-da olan bütün elementlərdə də işləyirlər.

Parametrlər:

```js
DOMEventTarget relatedTarget
```

#### onFocus {#onfocus}

The `onFocus` event is called when the element (or some element inside of it) receives focus. For example, it's called when the user clicks on a text input.

```javascript
function Example() {
  return (
    <input
      onFocus={(e) => {
        console.log('Focused on input');
      }}
      placeholder="onFocus is triggered when you click this input."
    />
  )
}
```

#### onBlur {#onblur}

The `onBlur` event handler is called when focus has left the element (or left some element inside of it). For example, it's called when the user clicks outside of a focused text input.

```javascript
function Example() {
  return (
    <input
      onBlur={(e) => {
        console.log('Triggered because this input lost focus');
      }}
      placeholder="onBlur is triggered when you click this input and then you click outside of it."
    />
  )
}
```

#### Detecting Focus Entering and Leaving {#detecting-focus-entering-and-leaving}

You can use the `currentTarget` and `relatedTarget` to differentiate if the focusing or blurring events originated from _outside_ of the parent element. Here is a demo you can copy and paste that shows how to detect focusing a child, focusing the element itself, and focus entering or leaving the whole subtree.

```javascript
function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('focused self');
        } else {
          console.log('focused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus entered self');
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('unfocused self');
        } else {
          console.log('unfocused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus left self');
        }
      }}
    >
      <input id="1" />
      <input id="2" />
    </div>
  );
}
```

* * *

### Anket Hadisələri {#form-events}

Hadisə adları:

```
onChange onInput onInvalid onReset onSubmit 
```

onChange hadisəsi haqqında əlavə məlumat üçün [Anketlər](/docs/forms.html) sənədinə baxın.

* * *

### Ümumi Hadisələr {#generic-events}

Hadisə adları names:

```
onError onLoad
```

* * *

### Maus Hadisələri {#mouse-events}

Hadisə adları:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

`onMouseEnter` və `onMouseLeave` hadisələri siravi bubbling əvəzinə çıxan elementdən daxil olan elementə yayılırlar. Əlavə olaraq bu hadisələrin capture fazası yoxdur.

Parametrlər:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### Pointer Hadisələri {#pointer-events}

Hadisə adları:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

`onPointerEnter` və `onPointerLeave` hadisələri siravi bubbling əvəzinə çıxan elementdən daxil olan elementə yayılırlar. Əlavə olaraq bu hadisələrin capture fazası yoxdur.


Parametrlər:

[W3 spesifikasiyasında](https://www.w3.org/TR/pointerevents/) müəyyənləşdirildiyi kimi, pointer hadisələri [Maus Hadisələrini](#mouse-events) aşağıdakı parametrlər ilə genişləndirirlər:

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

Brauzer dəstəyi haqqında qeyd:

Pointer hadisələri bütün brauzerlər tərəfindən dəstəklənmirlər (bu sənədin yazıldığı zamanda yalnız Chrome, Firefox, Edge, və Internet Explorer bu hadisələri dəstəkləyir). React bilərəkdən digər brauzerlər üçün polifil dəstəkləmir. Bunun səbəni polifilin `react-dom` paketini ölçüsünü çox böyütməsidir.

Əgər sizin applikasiyanıza pointer hadisələri lazımdırsa biz 3-cü tərəfli pointer hadisəsi polifili işlətməyi tövsiyə edirik.

* * *

### Seleksiya Hadisələri {#selection-events}

Hadisə adları:

```
onSelect
```

* * *

### Toxunuş Hadisələri {#touch-events}

Hadisə adları:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Parametrlər:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### UI Hadisələri {#ui-events}

Hadisə adları:

```
onScroll
```

>Qeyd
>
>React 17-dən başlayaraq `onScroll` hadisəsi React-də **bubble etməyəcək**. Bu, brauzerin davranışına uyğundur və iç-içə skroll olunan elementlərin uzaq valideynə hadisə göndərməsi qarışıqlığı aradan qaldırır.

Parametrlər:

```javascript
number detail
DOMAbstractView view
```

* * *

### Wheel Hadisələri {#wheel-events}

Hadisə adları:

```
onWheel
```

Parametrlər:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Media Hadisələri {#media-events}

Hadisə adları:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Şəkil Hadisələri {#image-events}

Hadisə adları:

```
onLoad onError
```

* * *

### Animasiya Hadisələri {#animation-events}

Hadisə adları:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Parametrlər:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Keçid Hadisələri {#transition-events}

Hadisə adları:

```
onTransitionEnd
```

Parametrlər:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Digər Hadisələr {#other-events}

Hadisə adları:

```
onToggle
```
