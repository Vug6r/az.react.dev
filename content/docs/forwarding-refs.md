---
id: forwarding-refs
title: Ref-lərin Yönləndirilməsi
permalink: docs/forwarding-refs.html
---

<<<<<<< HEAD
Ref-in yönləndirilməsi - avtomatik [ref](/docs/refs-and-the-dom.html) komponentinin içindən onun bir uşağına ötürülməsi texnikasıdır. Bu texnika çox vaxt applikasiyadakı komponentlər üçün vacib deyil. Lakin, bəzi növ komponentlər üçün, xüsusilə yenidən istifadə olunan komponent kitabxanalarında, faydalı ola bilər. Çox vaxt rast gəlinən ssenarilər aşağıda qeyd olunub.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Manipulating the DOM with Refs](https://beta.reactjs.org/learn/manipulating-the-dom-with-refs)
> - [`forwardRef`](https://beta.reactjs.org/reference/react/forwardRef)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Ref forwarding is a technique for automatically passing a [ref](/docs/refs-and-the-dom.html) through a component to one of its children. This is typically not necessary for most components in the application. However, it can be useful for some kinds of components, especially in reusable component libraries. The most common scenarios are described below.
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c

## DOM komponentlərinə ref-lərin yönləndirilməsi {#forwarding-refs-to-dom-components}

Nativ `button` DOM elementini render edən `FancyButton` komponentinə nəzər salın:
`embed:forwarding-refs/fancy-button-simple.js`

React komponentləri tətbiq detallarını, eləcə də onların render edilmiş nəticələrini gizlədir. Adətən `FancyButton` istifadə edən digər komponenlər `FancyButton`-ın daxili `button` DOM elementində olan [ref-i əldə etmək üçün](/docs/refs-and-the-dom.html) **lazım deyil**. Bu yaxşıdır, çünki bu elementlərin bir-birinin DOM strukturlarından çox arxayın olmağının qarşısını alır.

Buna baxmayaraq, belə inkapsulyasiyalar `FeedStory` və ya `Comment` kimi applikasiya-səviyyəli komponentlər üçün arzu olunandır. Bu `FancyButton` və ya `MyTextInput` kimi yüksək dərəcəli yenidən istifadə edilə bilən "leaf" komponentləri üçün əlverişsiz ola bilər. Bu komponentlər applikasiya boyunca bənzər bir şəkildə müntəzən DOM `button` və `input` kimi istifadə edilməyə meyillidir və onların DOM nodlarına fokus, seçmə və ya animasiyalar üçün girişi qaçılmazdır.

**Ref-in yönləndirilməsi, komponentlərin qəbul etdikləri `ref`-i daha aşağı uşağa göndərməsi (başqa sözlə "yönləndirməsi") xüsusiyyətidir.**

Aşağıdakı nümunədə `FancyButton`, ona ötürülmüş `ref`-i əldə etmək üçün `React.forwardRef` istifadə edir və sonra onu render edən DOM `button`-a yönləndirir:

`embed:forwarding-refs/fancy-button-simple-ref.js`

Bu yolla `FancyButton` istifadə edən komponentlər, `FancyButton`-da yerləşən `button` DOM nodunun ref-ini əldə edə bilər və bu `ref` ilə DOM `button`-dan birbaşa istifadə etdiyimiz kimi, `FancyButton`-dakı `button` DOM nodundan istifadə edə bilərik.

Yuxarıdakı misalın addım-addım izahatına aşağıda baxa bilərsiniz:

1. Biz `React.createRef` çağıraraq [React ref](/docs/refs-and-the-dom.html) yaradırıq və onu `ref` dəyişəninə təyin edirik.
2. Biz `ref`-imizi JSX atributu kimi təyin edərək `<FancyButton ref={ref}>` komponentinə ötürürük.
3. React `ref`-i `forwardRef` funksiyasının içində olan `(props, ref) => ...` funksiyasının ikinci arqumentinə ötürür.
4. Biz bu `ref` arqumentini JSX atributu kimi təyin edərək `<button ref={ref}>` komponentinə yönləndiririk.
5. ref qoşulduğu zaman, `ref.current`-i `<button>` DOM nodu göstərəcək. 

>Qeyd
>
>Siz yalnız komponenti `React.forwardRef` ilə çağırışı ilə təyin etdikdə, ikinci `ref` arqumenti mövcud olacaqdır. Müntəzəm funksiya və ya sinif komponentləri `ref` arqumentini qəbul etmir və ref proplarda da əlçatan deyil. 
>
>Ref-in yönləndirilməsi DOM komponentləri ilə limitli deyil. Siz həmçinin ref-ləri sinif komponentlərinin nümunələrinə yönləndirə bilərsiniz. 

## Komponent Kitabxana saxlayıcıları üçün qeyd {#note-for-component-library-maintainers}

**Komponent kitabxanasında `forwardRef` istifadə etdikdə, siz onu sına bilən dəyişən kimi saxlamalı və öz kitabxananızın yeni böyük versiyasını yayımlamalısınız.** Bu çox gümanki sizin kitabxananızın gözlənilən fərqli davranışı olduğu üçündür (məsələn, hansı ref-lərin təyin edildiyi, hansı növlərin ixrac edildiyi) və bu keçmiş davranışdan asılı olan applikasiyaları və digər kitabxanaları sındıra bilər. 

Şərti şəkildə mövcud olduğu zaman `React.forwardRef`-i tətbiq etmək bəzi səbəblərə görə məsləhət görülmür: bu sizin kitabxananızın davranışını dəyişir və React-in özünü yenilədikdə etdikdə sizin istifadəçilərinizin applikasiyaları sınmasına səbəb ola bilər.

## Yüksək qaydada komponentlərdə ref-lərin yönləndirilməsi {#forwarding-refs-in-higher-order-components}

Bu metod [yüksək qaydada komponentlər](/docs/higher-order-components.html) (higher-order components və ya HOCs) ilə xüsusilə faydalı ola bilər. Gəlin konsola komponent proplarının qeydiyyatını edən HOC-un misalı ilə başlayaq:
`embed:forwarding-refs/log-props-before.js`

"logProps" HOC-i, bütün `propları` onu əhatə edən komponentdən keçirir, beləliklə render edilmiş nəticə eyni olur. Misal üçün, biz bu HOC-ni bizim "fancy button" komponentimizə ötən bütün propları qeydiyyata almaq üçün istifadə edə bilərik:
`embed:forwarding-refs/fancy-button.js`

Yuxarıdakı nümunədə bir xəbərdarlıq var: ref-lər ötməyəcəklər. Bunun səbəbi `ref`-in prop olmamağıdır. `key` kimi bu React-də fərqli işlənir. Əgər siz HOC-aəref əlavə etsəniz, ref əhatə olunmuş komponentə deyil, ən xarici konteyner komponentinə müraciət edəcək.

Bu deməkdir ki, `FancyButton`-da komponentimiz üçün nəzərdə tutulmuş ref-lər faktiki olaraq `LogProps` komponentinə qoşulacaq:
`embed:forwarding-refs/fancy-button-ref.js`

Xoşbəxtlikdən, biz  `React.forwardRef` API istifadə edərək açıq şəkildə ref-ləri `FancyButton` daxili komponentinə yönləndirə bilərik. `React.forwardRef`, `props` və `ref` parametrlərini qəbul edən və React nodu qaytaran render funksiyasını qəbul edir. Məsələn:
`embed:forwarding-refs/log-props-after.js`

## DevTools-da xüsusi adların göstərilməsi {#displaying-a-custom-name-in-devtools}

`React.forwardRef` render funksiyasını qəbul edir. React DevTools, bu funksiyanı ref-in yönləndirilməsi komponentinin nə göstərəcəyini müəyyən etməsi üçün istifadə edir.

Misal üçün, növbəti komponent DevTools-da "*ForwardRef*" kimi görünəcək:

`embed:forwarding-refs/wrapped-component.js`

Əgər siz render funksiyasını adlandırsanız, DevTools da onun adını əlavə edəcək (məsələn: "*ForwardRef(myFunction)*"):

`embed:forwarding-refs/wrapped-component-with-function-name.js`

Siz hətta funksiyanın `displayName` parametrini əhatə etdiyiniz komponentin adını daxil etmək üçün də quraşdıra bilərsiniz:

`embed:forwarding-refs/customized-display-name.js`
