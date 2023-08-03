---
title: JSX ilə İşarələmə (Markup) Yazmaq
---

<Intro>

*JSX*, JavaScript faylı içində HTML oxşarı işarələmə (markup) yazmağınıza imkan tanıyan bir JavaScript sintaksis uzantısıdır. Komponentləri yazmağın başqa yolları olsa da əksər React tərtibatçıları, JSX-in yığcamlığına üstünlük verir və əksər kod bazaları (codebase) bundan istifadə edir.

</Intro>

<YouWillLearn>

* React niyə işarələməni göstərmə məntiqi ilə birləşdirir?
* JSX-in HTML-dən fərqi nədir?
* JSX ilə məlumatı necə göstərmək olar?

</YouWillLearn>

## JSX: Putting markup into JavaScript {/*jsx-putting-markup-into-javascript*/}

Veb HTML, CSS və JavaScript üzərində qurulub. Uzun illər veb tərtibatçılar məzmunu HTML-də, dizaynı CSS-də və məntiqi JavaScript-də - çox vaxt ayrı-ayrı fayllarda saxlayırdılar! Səhifənin məntiqi JavaScript-də ayrıca olarkən məzmun HTML daxilində qeyd edildi:

<DiagramGroup>

<Diagram name="writing_jsx_html" height={237} width={325} alt="HTML markup with purple background and a div with two child tags: p and form. ">

HTML

</Diagram>

<Diagram name="writing_jsx_js" height={237} width={325} alt="Three JavaScript handlers with yellow background: onSubmit, onLogin, and onClick.">

JavaScript

</Diagram>

</DiagramGroup>

Lakin Veb daha interaktivləşdikcə məntiq məzmundan üstün oldu. JavaScript HTML üçün məsuliyyət daşıyırdı! Buna görə də **React-da, render məntiqi və formatlaşdırma eyni yerdə (komponentlərdə) birlikdə yerləşir.**

<DiagramGroup>

<Diagram name="writing_jsx_sidebar" height={330} width={325} alt="Əvvəlki HTML və JavaScript nümunələrini birləşdirən reaksiya komponenti. isLoggedIn funksiyasını çağıran sarı vurğulanmış bölmə Sidebar funksiyasıdır. Bənövşəyi rənglə vurğulanan funksiyanın içərisində əvvəlki p teqi və növbəti diaqramda göstərilən komponentə istinad edən Form teqi var.">

`Sidebar.js` React komponenti

</Diagram>

<Diagram name="writing_jsx_form" height={330} width={325} alt="Əvvəlki HTML və JavaScript nümunələrininin birlikdə işlədildiyi Reaksiya komponenti. Sarı rənglə vurğulanmış, onClick və onSubmit idarə edicilərinin olduğu bölmə Form funksiyasıdır. Bu funksiyadan sonra bənövşəyi rənglə vurğulanmış HTML gəlir. HTML, hər birində onClick rekvizitinə malik daxiletmələr olan forma elementi var.">

`Form.js` React komponenti

</Diagram>

</DiagramGroup>

Düymənin göstərilməsi məntiqi və formatlaşdırmanın bir yerdə saxlanması onların hər dəyişikliklə sinxron qalmasını təmin edir. Əksinə, düymənin formatlanması və yan panelin formatlanması kimi bir-biri ilə əlaqəsiz detallar bir-birindən təcrid olunur. Bu, onlardan hər hansı birini təkbaşına əvəz edilməsini daha təhlükəsiz edir.

Hər bir Reaksiya komponenti; React-in brauzerdə göstərdiyi bəzi işarələmələrin içində ola bilən JavaScript funksiyasıdır. React komponentləri bu işarələməni təmsil etmək üçün JSX adlı sintaksis genişlənməsindən istifadə edir. JSX HTML-ə çox bənzəyir, lakin bir qədər sərt qaydalara malikdir və dinamik məlumatları göstərə bilir. Bu mövzunu başa düşməyin ən təsirli yolu bir neçə HTML-i JSX-ə çevirmək üçün praktiki təcrübə əldə etməkdir.

<Note>

JSX və React iki ayrı anlayışdır. Bunlar tez-tez birlikdə istifadə olunur. Bununla belə, siz onlardan [müstəqil olaraq da istifadə edə bilərsiniz](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform)*. JSX sintaksis uzantısıdır, React isə JavaScript kitabxanasıdır.

</Note>

## HTML-i JSX-ə çevirmək {/*converting-html-to-jsx*/}

Tutaq ki, sizdə (tamamilə etibarlı) HTML var:

```html
<h1>Hedy Lamarr's Todos</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
```

Və bunu komponentinizə qoymaq istəyirsiniz:

```js
export default function TodoList() {
  return (
    // ???
  )
}
```

Olduğu kimi kopyalayıb yapışdırsanız, işləməyəcək:

<Sandpack>

```js
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Hedy Lamarr's Todos</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve the spectrum technology
    </ul>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

Bunun səbəbi JSX HTML-dən daha qəti və çox qanunlara sahib olmasıdır ! Yuxarıdakı xəta mesajları formatlaşdırmanı düzəltməyə kömək edəcək. Siz həmçinin xətanı həll etmək üçün aşağıdakı təlimatı izləyə bilərsiniz.

<Note>

Çox vaxt, React-in ekran xəta mesajları sizə problemin harada olduğunu tapmağa köməklik göstərəcək. Tapa bilmədiyinizdə onları oxuyun!

</Note>

## JSX qanunları {/*the-rules-of-jsx*/}

### 1. Tək kök elementini qaytarır {/*1-return-a-single-root-element*/}

Komponentdən çoxlu elementləri qaytarmaq üçün **onları bir ana teq ilə sarıyın**

Məsələn, `<div>` istifadə edə bilərsiniz:

```js {1,11}
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```


Artıq `<div>` əlavə etmək istəmirsinizsə, `<>` və `</>` istifadə edə bilərsiniz:

```js {1,11}
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

Bu boş teq *[Fragment](/reference/react/Fragment)* adlanır. Fragments heç bir iz qoymadan brauzer HTML-dəki elementləri qruplaşdırmağa imkan verir.

<DeepDive>

#### Niyə çoxsaylı JSX teqlərini bükmək lazımdır? {/*why-do-multiple-jsx-tags-need-to-be-wrapped*/}

JSX HTML kimi görünür, lakin fonda JavaScript obyektlərinə çevrilir. Funksiyadan iki obyekti massivdə bükmədən qaytara bilməzsiniz. Bu həm də iki JSX teqini başqa teq və ya Fraqmentə bükmədən niyə qaytara bilməyəcəyinizi izah edir.

</DeepDive>

### 2. Bütün teqləri bağla {/*2-close-all-the-tags*/}

JSX teqlərin açıq şəkildə bağlanmasını tələb edir: `<img>` kimi öz-özünə bağlanan teqlər belə `<img />` bağlanmalıdır.`<li>oranges` gibi etiketler`<li>oranges</li>` ilə bükülməlidir.

Hedy Lamarrın fotoşəkili və siyahı maddələri belə bağlanmışdır:

```js {2-6,8-10}
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

### 3. camelCase <s>hər şey</s> çox şey! {/*3-camelcase-salls-most-of-the-things*/}

JSX JavaScript olur və JSX-də yazılmış xüsusiyyətlər JavaScript obyektlərinin açarlarına çevrilir. Öz komponentlərinizdə siz tez-tez bu xassələri dəyişənlər kimi oxumaq istəyəcəksiniz. Bununla belə, JavaScript-in dəyişən adları ilə bağlı məhdudiyyətləri var. Məsələn, onların adlarında tire və ya `class` kimi ayrılmış sözlər ola bilməz.

Buna görə də, React-də bir çox HTML və SVG xüsusiyyətləri camelCase ilə yazılır. Məsələn, `stroke-width` əvəzinə `strokeWidth`. React-də, `class` qorunan söz olduğundan, siz [əlaqədar DOM xüsusiyyətindən](https://developer.mozilla.org/en-US/docs/Web/API/Element/className ) sonra `className` yazacaqsınız:

```js {4}
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  className="photo"
/>
```

You can [find all these attributes in the list of DOM component props.](/reference/react-dom/components/common) If you get one wrong, don't worry—React will print a message with a possible correction to the [browser console.](https://developer.mozilla.org/docs/Tools/Browser_Console)

[Bütün bu atributları DOM komponent rekvizitləri siyahısında](/reference/react-dom/components/common) tapa bilərsiniz. Əgər səhv etsəniz narahat olmayın -React [brauzer](https://developer.mozilla.org/docs/Tools/Browser_Console), səhvinizi düzəltmək üçün bir mesaj yazdıracaq.

<Pitfall>

Tarixi səbəblərə görə, [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) və [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) atributları HTML-də olduğu kimi tire ilə yazılır.

</Pitfall>

### Ekspert Məsləhəti: JSX dönüşdürücü istifadə edin {/*pro-tip-use-a-jsx-converter*/}

Formatlaşdırmada bütün bu funksiyaları çevirmək bezdirici ola bilər! Mövcud HTML və SVG-nizi JSX-ə çevirmək üçün [çeviricidən](https://transform.tools/html-to-jsx) istifadə etməyinizi tövsiyə edirik. Çeviricilər praktikada çox faydalıdır. Yenə də JSX-i rahatlıqla yaza bilmək üçün nə baş verdiyini başa düşmək faydalıdır.


Son nəticəniz:

<Sandpack>

```js
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

<Recap>

Artıq JSX-in niyə var olduğunu və komponentlərinin necə istifadə etməli olduğunuzu bilirsiniz

* React komponentləri qrupu bir-biri ilə əlaqəli olduğu üçün formatlaşdırma ilə birlikdə məntiqi göstərir.
* JSX bir neçə fərqi ilə HTML-yə bənzəyir. Lazım gələrsə, [dönüşdürücü](https://transform.tools/html-to-jsx) istifadə edə bilərsiniz.
* Xəta mesajları adətən formatlaşdırmanızı düzəltməyin düzgün yolunu göstərəcək.

</Recap>



<Challenges>

#### Aşağıdakı HTML-i JSX-ə dönüşdürün. {/*convert-some-html-to-jsx*/}

Bu HTML komponentə əlavə olunub, lakin keçərli JSX deyil. Düzəldin:

<Sandpack>

```js
export default function Bio() {
  return (
    <div class="intro">
      <h1>Welcome to my website!</h1>
    </div>
    <p class="summary">
      You can find my thoughts here.
      <br><br>
      <b>And <i>pictures</b></i> of scientists!
    </p>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

Əllə yoxsa dönüşdürücü istifadə edərək, o sizə qalıb!

<Solution>

<Sandpack>

```js
export default function Bio() {
  return (
    <div>
      <div className="intro">
        <h1>Welcome to my website!</h1>
      </div>
      <p className="summary">
        You can find my thoughts here.
        <br /><br />
        <b>And <i>pictures</i></b> of scientists!
      </p>
    </div>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

</Solution>

</Challenges>
