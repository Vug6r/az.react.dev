---
id: hooks-state
title: State Hookunun İstifadəsi
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

<<<<<<< HEAD
*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə sinif yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [State: A Component's Memory](https://beta.reactjs.org/learn/state-a-components-memory)
> - [`useState`](https://beta.reactjs.org/reference/react/useState)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

*Hooks* are a new addition in React 16.8. They let you use state and other React features without writing a class.
>>>>>>> d4e42ab21f0cc7d8b79d1a619654e27c79e10af6

Hooklar ilə tanış olmaq üçün [giriş səhifəsində](/docs/hooks-intro.html) aşağıdakı nümunədən istifadə edilir:

```js{4-5}
import React, { useState } from 'react';

function Example() {
  // "count" adlı state dəyişəni yaradın
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count} dəfə tıklandı</p>
      <button onClick={() => setCount(count + 1)}>
        Tıkla
      </button>
    </div>
  );
}
```

Biz yuxarıdakı nümunəni sinif nümunəsi ilə müqayisə edərək Hookları öyrənəcəyik.

## Ekvivalent Sinif Nümunəsi {#equivalent-class-example}

React ilə siniflərdən istifadə etmisinizsə, aşağıdakı kod sizə tanış gələcək:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.count} dəfə tıklandı</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Tıkla
        </button>
      </div>
    );
  }
}
```

State `{ count: 0 }` ilə başlayır. İstifadəçi düyməni tıkladıqda `this.setState()`-dən istifadə edərək `state.count`-un dəyərini artırırıq. Biz bu sinifdə olan kod parçalarını bu səhifənin sonuna kimi işlədəyəcik.

>Qeyd
>
>Daha realistik nümunə əvəzinə sayğac nümunəsindən niyə istifadə etdiyimiz sizi maraqlandıra bilər. Biz Hooklar ilə ilk addımlar atdığımız üçün bu nümunə ilə daha çox API-a fokuslana bilərik.

## Hooklar və Funksiya Komponentləri {#hooks-and-function-components}

React-də funksiya komponentləri aşağıdakı formada yazılır:

```js
const Example = (props) => {
  // Burada Hooklardan istifadə edə bilərsiniz!
  return <div />;
}
```

və ya:

```js
function Example(props) {
  // Burada Hooklardan istifadə edə bilərsiniz!
  return <div />;
}
```

Siz bu komponentləri "state-siz komponentlər" kimi tanıyırdınız. Biz, indi bu komponentlərdən React state-ini işlədilməsinə imkan yaratdığımızdan bu komponentləri  "funksiya komponentləri" kimi adlandırmağı üstün tuturuq.

Hookları siniflər ilə işlətmək **mümkün deyil**. Lakin, funksiya komponentlərini siniflər ilə əvəz etmək mümkündür.

## Hook nədir? {#whats-a-hook}

Aşağıdakı nümunədə React-dən `useState` hookunu idxal edirik:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Hook nədir?** React xüsusiyyətlərindən istifadə edə bilmək üçün (hook into) təmin olunan xüsusi funksiyalar Hooklar adlanırlar. Məsələn, `useState` funksiyası React state-ini funksiya komponentlərinə əlavə etmək üçün istifadə edilən Hookdur. Digər Hooklar haqqında sonrakı bölmələrdə danışacağıq.

**Nə zaman Hook-dan istifadə edim?** Əvəllər funksiya komponenti yazdıqda bu komponentə state əlavə etmək üçün ilk öncə komponenti sinfə çevirmək lazım idi. İndi isə, funksiya komponenti daxilindən Hook istifadə etmək mümkündür. Biz indi bunu edəcəyik!

>Qeyd:
>
>Komponent daxilində Hookların harada işlədilməsi haqqında bəzi qaydalar var. Bu qaydaları öyrənmək üçün [Hookların Qaydaları](/docs/hooks-rules.html) bölməsinə baxa bilərsiniz.

## State Dəyişəninin Təyin Edilməsi {#declaring-a-state-variable}

Sinif istifadə etdikdə `count` state-inə `0` təyin etmək üçün konstruktorda `this.state` dəyişənini `{ count: 0 }` dəyərinə təyin etmək lazımdır:

```js{4-6}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

Funksiya komponentində isə `this` dəyişənini olmadığından `this.state` dəyərindən istifadə edə bilmirik. Əvəzinə, komponentin daxilindən birbaşa `useState` Hookunu çağıracağıq:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // "count" adlı state dəyişəni yaradın
  const [count, setCount] = useState(0);
```

**`useState` çağırdıqda nə baş verir?** Bu funksiya "state dəyişəni" yaradır. Bizim dəyişənimiz `count` adlanır. Lakin, siz dəyişəni istədiyiniz kimi adlandıra bilərsiniz (məsələn "banan"). Bu bizə funksiya çağırışları arasında bəzi dəyərlərin "saxlanmasına" imkan yaradır. `this.state`-in sinfə təmin etdiyi imkanların hamısı `useState` Hookunda var. Normalda, dəyişənlər hər funksiya çağırışı zamanı sıfırlanır. Lakin, state dəyərləri React tərəfindən saxlanılır.

**`useState`-ə arqument kimi nə göndərilir?** `useState()` Hookunun tək arqumenti ilkin state-dir. Siniflərdən fərqli olaraq, state dəyəri obyekt olmamalıdır. State rəqəm və ya mətn kimi tiplərdə ola bilər. Nümunəmizdə, istifadəçinin nə qədər tıkladığını bilmək üçün rəqəm lazımdır. Bu səbəbdən, ilkin state kimi `0` dəyərini göndəririk. (Bir neçə state dəyəri lazım olduqda `useState()` funksiyasını bir neçə dəfə çağıra bilərik.)

**`useState` nə qaytarır?** Bu funksiya dəyərlər cütü qaytarır: cari dəyər və dəyəri yeniləyən funksiya. Bu səbəbdən State Hooku `const [count, setCount] = useState()` formada yazılır. Bu funksiya, sinifdə olan `this.state.count` və `this.setState` dəyərlərinə bərabərdir. Əgər işlədilən sintaksis sizə tanış gəlmirsə, bu haqqda [səhifənin sonunda](/docs/hooks-state.html#tip-what-do-square-brackets-mean) danışacağıq.

`useState` Hookunun nə etdiyini bildikdən sonra bizim nümunəmiz daha məntiqli olur:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // "count" adlı state dəyişəni yaradın
  const [count, setCount] = useState(0);
```

`count` adlı və `0` dəyərli dəyişən yaradırıq. React, render etmələr zamanı cari dəyəri yadda saxlayaraq ən yeni versiyanı funksiyaya göndərir. Cari `count` dəyərini yeniləmək üçün `setCount` funksiyasını çağırırıq.

>Qeyd
>
>Niyə `useState` funksiyası `createState` kimi adlanmayıb?
>
>"Create" sözünün düzgün olmamasının səbəbi state-in yalnız komponentin ilk render edildiyi zaman yaranmasıdır. Sonrakı render etmələr zamanı `useState` sadəcə cari state-i qaytarır (yeni state yaratmır). Əks halda, bu, state olmazdı! Hook adlarının *həmişə* `use` ilə başlamasının səbəbi var. Biz bunun səbəbini [Hookların Qaydaları](/docs/hooks-rules.html) bölməsindən öyrənəcəyik.

## State-in Oxunması {#reading-state}

Sinifdə cari state-i göstərmək üçün `this.state.count` dəyərini oxuyuruq:

```js
  <p>{this.state.count} dəfə tıklandı</p>
```

Funksiyada isə `count` dəyərini birbaşa oxuyuruq:


```js
  <p>{count} dəfə tıklandı</p>
```

## State-in Yenilənməsi {#updating-state}

Sinifdə `count` state-ini yeniləmək üçün `this.setState()` funksiyasını çağırırıq:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Tıkla
  </button>
```

Funksiyada isə, `setCount` və `count` dəyərlərinin dəyişən kimi mövcud olduğundan `this` dəyişəni lazım deyil:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Tıkla
  </button>
```

## Təkrar {#recap}

Gəlin **nə öyrəndiyimizi sətir-sətir təkrarlayıb** Hooklar haqqında anlayışımızı yoxlayaq.

<!--
  I'm not proud of this line markup. Please somebody fix this.
  But if GitHub got away with it for years we can cheat.
-->
```js{1,4,9}
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>{count} dəfə tıklandı</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Tıkla
11:        </button>
12:      </div>
13:    );
14:  }
```

* **Sətir 1:** `useState` Hookunu React-dən idxal edirik. Bu lokal state-in funksiyada saxlanmasına imkan yaradır.
* **Sətir 4:** `Example` komponentində `useState` Hookunu çağıraraq yeni state dəyəri yaradırıq. Bu funksiya dəyərlər cütü qaytarır. Tıklama sayını saxlamaq üçün dəyişəni `count` adlandırırıq. Bu dəyəri sıfır ilə inisializasiya etmək üçün `useState`-in arqumentinə `0` göndəririk. Qaytarılan ikinci dəyər funksiyadır. Bu funksiya ilə `count` dəyərini yeniləmək mümkündür. Bu səbəbdən, funksiyanı `setCount` adlandırırıq.
* **Sətir 9:** İstifadəçi düyməni tıkladıqda `setCount` funksiyasını yeni dəyər ilə çağırırıq. Funksiya çağrıldıqdan sonra `Example` komponenti yenidən render edilərək yeni `count` dəyəri Hooka göndərilir.

İlk baxışda bu addımlar çox görünə bilər. Bu səbəbdən, tələsməyin! Əgər izahatda itirsinizsə, koda yenidən baxıb bölməni yenidən oxuyun. Siniflərdə state-in necə işlədiyini "unutmağa" çalışıb bu koda yeni gözlə baxdıqda hər şey anlaşılacaq.

### Məsləhət: Kvadrat Mötərizələr Nə Deməkdir? {#tip-what-do-square-brackets-mean}

State dəyəri yaratdıqda kvadrat mötərizədən istifadə edildiyinə fikir verə bilərsiniz:

```js
  const [count, setCount] = useState(0);
```

Solda olan adlar React API-ının bir hissəsi deyil. State dəyişənləri istənilən adda ola bilər:

```js
  const [fruit, setFruit] = useState('banan');
```

Bu JavaScript sintaksisi ["massiv destrukturlaşdırılması"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) adlanır. Bu deməkdir ki, iki dəyişən yaranır: `fruit` və `setFruit`. Bu kod, aşağıdakı koda bərabərdir:

```js
  var fruitStateVariable = useState('banana'); // Cüt qaytarılır
  var fruit = fruitStateVariable[0]; // Massivinin ilk elementi
  var setFruit = fruitStateVariable[1]; // Masivinin ikinci elementi
```

`useState` ilə state dəyişəni yaratdıqda iki elementli massiv qaytarılır. Massivin ilk elementi cari dəyər, ikinci elementi isə bu dəyəri yeniləyən funksiyadır. Massiv elementlərini `[0]` və `[1]` kimi istifadə etmək sizi çaşdıra bilər. Çünki, bu dəyərlərin xüsusi mənaları var. Bu səbəbdən, biz massiv destrukturlaşdırılmasından istifadə edirik.

>Qeyd
>
>React-in `useState`-in hansı komponentə aid olduğunu necə bildiyi sizi maraqlandıra bilər. Bu suala FAQ bölməsinin [bu cavabından](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) baxa bilərsiniz.

### Məsləhət: Bir Neçə State Dəyişəninin İstifadəsi {#tip-using-multiple-state-variables}

State dəyişənlərinin `[something, setSomething]` cütü ilə təyin edilməsindən istifadə edərək fərqli state dəyişənlərini **fərqli** adlar ilə işlədə bilərik:

```js
function ExampleWithManyStates() {
  // Bir neçə state dəyişənindən istifadə et!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banan');
  const [todos, setTodos] = useState([{ text: 'Hookları Öyrən' }]);
```

Yuxarıdakı komponentdə, `age`, `fruit` və `todos` lokal dəyişənləri və bu dəyişənləri yeniləyən funksiyalar var:

```js
  function handleOrangeClick() {
    // this.setState({ fruit: 'orange' }) ilə eynidir
    setFruit('portağal');
  }
```

Çoxlu state dəyişənləri işlətmək **vacib deyil**. State dəyişənləri obyekt və massiv saxlaya bilərlər. Siz bu formada bir birinə bağlı məlumatları qruplaşdıra bilərsiniz. Lakin, sinifdəki `this.setState` funksiyasından fərqli olaraq state dəyişənini yenilədikdə dəyərlər birləşmək əvəzinə *əvəz olunur*.

Müstəqil state dəyişənlərini ayırmaq üçün [FAQ-da olan](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables) tövsiyələrə baxın.

## Sonrakı Addımlar {#next-steps}

Bu səhifədə, React-in təmin etdiyi `useState` adlı Hooka baxdıq. Biz bu hooku "State Hook" kimi adlandırırıq. Bu hook ilə React funksiya komponentinə lokal state əlavə etmək mümkündür!

Biz həmçinin Hookların nə olduğunu anladıq. Funksiya komponentlərindən React xüsusiyyətlərinin işlənməsi üçün təmin olunan funksiyalar Hooklar adlanır. Hookların adları həmişə `use` ilə başlayır.

**Gəlin sonrakı bölmədə [yeni Hook haqqında öyrənək: `useEffect`.](/docs/hooks-effect.html)** Siniflərdə olan lifecycle metodları kimi bu Hook ilə funksiya komponentlərindən yan effektləri icra etmək mümkündür.
