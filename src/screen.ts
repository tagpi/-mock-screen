import { Orientation } from './model/orientation.model';
import { SyncOptions } from './model/sync-options.model';


export class Screen { 

  private elements = new Map<HTMLElement, SyncOptions>();
  private current = {
    width: document.body.clientWidth,
    orientation: Orientation.landscape as Orientation | undefined,
    size: 'md',
    sizing: { } as { [size: string]: number },
  };

  /**
   * Available size list.
   */
  sizes: string[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  /**
   * Current screen width.
   */
  get size() { 
    return this.current.size;
  }

  /**
   * Reference CSS as text.
   */
  styles = `
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
      overscroll-behavior: none !important;
      overflow: hidden !important;
    }
  `;


  constructor() {

    window.addEventListener('resize', () => {
      this.trackWidth();
      this.update();
    });

    window.screen.orientation.addEventListener('change', () => {
      this.trackOrientation();
      this.update();
    });

  }

  init() { 
    this.initializeSizing();
    this.trackWidth();
    this.trackOrientation();
  }

  private initializeSizing(): void { 
    for (const size of this.sizes) {
      this.current.sizing[size] = this.getSizeFromCss(size);
    }
  }

  private getSizeFromCss(size: string): number { 
    return parseInt(getComputedStyle(document.body).getPropertyValue(`--screen-${size}`).replace('px', ''));
  }

  private trackWidth() { 
    this.current.width = document.body.clientWidth;
    for (const size of this.sizes) { 
      if (this.current.width < this.current.sizing[size]) {
        this.current.size = size;
        break;
      }
    }
  }

  private trackOrientation() { 

    const landscape = ['landscape', 'landscape-primary', 'landscape-secondary'];
    if (landscape.indexOf(window.screen.orientation.type) > -1) { 
      this.current.orientation = Orientation.landscape;
      return
    }

    const portrait = ['portrait', 'portrait-primary', 'portrait-secondary'];
    if (portrait.indexOf(window.screen.orientation.type) > -1) { 
      this.current.orientation = Orientation.portrait;
      return;
    }

    this.current.orientation = undefined;

  }

  /**
   * Return true if the current width matches the size.
   * @param size 
   * @returns 
   */
  isSize(size: string) { 
    return this.current.size === size;
  }

  /**
   * Registers the element to receive descriptor updates.
   * @param element 
   * @param options {
   *   width: adds the screen width descriptors,
   *   orientation: adds the screen orientation
   * }
   */
  sync(element: HTMLElement, options: SyncOptions = { width: true }) { 
    if (!this.elements.has(element)) { 
      this.elements.set(element, options);
      this.updateElement(element);
    }
  }
  
  /**
   * Removes descriptors updates.
   * @param element 
   */
  unsync(element: HTMLElement) {
    this.elements.delete(element);
    this.clearElement(element);
  }

  /**
   * Removes the descriptors on all elements.
   */
  clear() { 
    for (const item of this.elements.keys()) { 
      this.updateElement(item);
    }
  }

  /**
   * Removes the descriptors on an element.
   * @param element 
   */
  clearElement(element: HTMLElement) { 

    // remove sizes
    for (const size of this.sizes) {
      this.removeClass(element, `screen-${size}`);
    }

    // remove orientation
    this.removeClass(element, Orientation.landscape);
    this.removeClass(element, Orientation.portrait);

  }

  /**
   * Updates the descriptors on all elements.
   */
  update() {
    for (const item of this.elements.keys()) { 
      this.updateElement(item);
    }
  }

  /**
   * Updates the descriptors on an element.
   * @param element 
   */
  updateElement(element: HTMLElement) { 

    const options = this.elements.get(element);

    // update the screen width when it changes
    if (options?.width) {
      for (const size of this.sizes) {
        if (this.current.size === size) {
          this.addClass(element, `screen-${size}`);
        } else {
          this.removeClass(element, `screen-${size}`);
        }
      }
    }

    // update orientation
    if (options?.orientation) {
      switch(this.current.orientation) { 
        case Orientation.landscape: 
          this.addClass(element, Orientation.landscape);
          this.removeClass(element, Orientation.portrait);
          break;
        case Orientation.portrait: 
          this.addClass(element, Orientation.portrait);
          this.removeClass(element, Orientation.landscape);
          break;
        default: 
          this.removeClass(element, Orientation.portrait);
          this.removeClass(element, Orientation.landscape);
          break;
      }
    }
    
  }

  /**
   * Stops the element and children from scrolling.
   * @param element 
   * @returns 
   */
  lockScroll(element?: HTMLElement) { 

    element = element || document.body as any;
    
    if (element) {
      this.addClass(element, 'no-scroll');
    }

    return () => { 
      this.removeClass(document.body, 'no-scroll');
      if (element) {
        this.removeClass(element, 'no-scroll');
      }
    }
    
  }

  /**
   * Adds a descriptor to an element.
   * @param element 
   * @param attribute 
   * @param value 
   */
  addAttribute(element: HTMLElement, attribute: string, value = '') {
    element.setAttribute(attribute, value);
  }

  /**
   * Removes a descriptor from an element.
   * @param element 
   * @param attribute 
   */
  removeAttribute(element: HTMLElement, attribute: string) { 
    element.removeAttribute(attribute);
  }

  /**
   * Adds or removes a descriptor from an element.
   * @param element 
   * @param attribute 
   * @param visible 
   * @param value 
   */
  toggleAttribute(element: HTMLElement, attribute: string, visible?: boolean, value = '') { 
    if (visible === undefined) { 
      visible = element.hasAttribute(attribute);
    }
    if (visible) { 
      this.addAttribute(element, attribute, value);
    } else { 
      this.removeAttribute(element, attribute);
    }
  }

  /**
   * Adds a CSS class to the element.
   * @param element 
   * @param className 
   */
  addClass(element: HTMLElement, className: string) { 
    if (!element.classList.contains(className)) {
      element.classList.add(className);
    }
  }

  /**
   * Removes all instances of the CSS class on the element.
   * @param element 
   * @param className 
   */
  removeClass(element: HTMLElement, className: string) { 
    while(element.classList.contains(className)) {
      element.classList.remove(className);
    }
  }

  /**
   * Resolves after the specified time.
   * @param time
   * @returns 
   */
  async wait(time = 1) { 
    return await new Promise(y => setTimeout(() => y(undefined), time));
  }

}


// global reference
let screen: Screen = (window as any)?.$screen;

if (!screen) { 
  screen = new Screen();
  (window as any).$screen = screen;

  // create style
  const style = document.createElement('style');
  style.setAttribute('mo-screen', '');
  style.innerHTML = screen.styles;
  document.head.appendChild(style);

  screen.init();

}

export { screen }
