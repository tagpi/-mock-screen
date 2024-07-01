# @mock/screen

Browser utility that adds screen descriptors on elements.


## Primary Descriptors 

Attribute | Description
--- | ---
screen-xs | Extra small screen width
screen-sm | Small screen width
screen-md | Medium screen width
screen-lg | Large screen width
screen-xl | Extra large screen width


## Optional Descriptors
landscape | Horizontal screen 
portrait | Vertical screen
mobile | Phone
desktop | Not mobile


##  Install

CDN
```html

```

npm 
```

```


## Quickstart


```html
<div class="my-element" hidden-xs>
  Hide on small screens.
</div>
```

```html
<div class="my-element" hidden-xs>
  Hide on small screens.
</div>
```


## Screen

Property | Description
--- | ---
addAttribute | Adds an attribute to an element.
addClass | Adds a CSS class to the element.
clear | Removes all descriptors on all elements.
clearElement | Removes all descriptors on an element.
isSize | Return true if the current width matches the size.
lockScroll | Stops the element and children from scrolling.
removeAttribute | Removes an attribute from an element.
removeClass | Removes all instances of the CSS class on the element.
size | Current screen width.
sizes | Available size list.
styles | Reference CSS as text.
sync | Registers the element to receive descriptor updates.
toggle | Adds or removes a descriptor from an element.
unsync | Removes descriptors updates.
update | Updates the descriptors on all elements.
updateElement | Updates the descriptors on one element.
wait | Resolves after the specified time.


## CSS Reference

```css

:root {
  --screen-xs: 576px;
  --screen-sm: 768px;
  --screen-md: 992px;
  --screen-lg: 1140px;
  --screen-xl: 99999px;
}

[hidden] { display: none !important }
.screen-xs [hidden-xs], .screen-xs[hidden-xs] { display: none !important }
.screen-sm [hidden-sm], .screen-sm[hidden-sm] { display: none !important }
.screen-md [hidden-md], .screen-md[hidden-md] { display: none !important }
.screen-lg [hidden-lg], .screen-lg[hidden-lg] { display: none !important }
.screen-xl [hidden-xl], .screen-xl[hidden-xl] { display: none !important }

.no-pad { padding: 0 }
.no-margin { margin: 0 }
.no-border { border: 0 }
.no-scroll, .no-scroll *:not(.yes-scroll) {
  overscroll-behavior: none;
  overflow: hidden !important;
}

```

