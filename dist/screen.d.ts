import { SyncOptions } from './model/sync-options.model';
export declare class Screen {
    private elements;
    private current;
    /**
     * Available size list.
     */
    sizes: string[];
    /**
     * Current screen width.
     */
    get size(): string;
    /**
     * Reference CSS as text.
     */
    styles: string;
    constructor();
    init(): void;
    private initializeSizing;
    private getSizeFromCss;
    private trackWidth;
    private trackOrientation;
    /**
     * Return true if the current width matches the size.
     * @param size
     * @returns
     */
    isSize(size: string): boolean;
    /**
     * Registers the element to receive descriptor updates.
     * @param element
     * @param options {
     *   width: adds the screen width descriptors,
     *   orientation: adds the screen orientation
     * }
     */
    sync(element: HTMLElement, options?: SyncOptions): void;
    /**
     * Removes descriptors updates.
     * @param element
     */
    unsync(element: HTMLElement): void;
    /**
     * Removes the descriptors on all elements.
     */
    clear(): void;
    /**
     * Removes the descriptors on an element.
     * @param element
     */
    clearElement(element: HTMLElement): void;
    /**
     * Updates the descriptors on all elements.
     */
    update(): void;
    /**
     * Updates the descriptors on an element.
     * @param element
     */
    updateElement(element: HTMLElement): void;
    /**
     * Stops the element and children from scrolling.
     * @param element
     * @returns
     */
    lockScroll(element?: HTMLElement): () => void;
    /**
     * Adds a descriptor to an element.
     * @param element
     * @param attribute
     * @param value
     */
    addAttribute(element: HTMLElement, attribute: string, value?: string): void;
    /**
     * Removes a descriptor from an element.
     * @param element
     * @param attribute
     */
    removeAttribute(element: HTMLElement, attribute: string): void;
    /**
     * Adds or removes a descriptor from an element.
     * @param element
     * @param attribute
     * @param visible
     * @param value
     */
    toggleAttribute(element: HTMLElement, attribute: string, visible?: boolean, value?: string): void;
    /**
     * Adds a CSS class to the element.
     * @param element
     * @param className
     */
    addClass(element: HTMLElement, className: string): void;
    /**
     * Removes all instances of the CSS class on the element.
     * @param element
     * @param className
     */
    removeClass(element: HTMLElement, className: string): void;
    /**
     * Resolves after the specified time.
     * @param time
     * @returns
     */
    wait(time?: number): Promise<unknown>;
}
declare let screen: Screen;
export { screen };
//# sourceMappingURL=screen.d.ts.map