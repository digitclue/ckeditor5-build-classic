// Type definitions for @ckeditor/ckeditor5-utils 10.1
// Project: https://github.com/ckeditor/ckeditor5
// Definitions by: Kostiantyn Dyha <https://github.com/digitclue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module '@ckeditor/ckeditor5-utils/src/dom/position' {
  export interface Options {
    element?: HTMLElement;
    fitInViewport?: boolean;
    limiter?: HTMLElement | Range | ClientRect | DOMRect | (() => any);
    positions?: () => any;
    target?: HTMLElement | Range | ClientRect | DOMRect | (() => any);
  }
}

declare module '@ckeditor/ckeditor5-utils/src/focustracker' {
  export class FocusTracker {
  }

  export default FocusTracker;
}

declare module '@ckeditor/ckeditor5-utils/src/config' {
  export class Config {
  }

  export default Config;
}

declare module '@ckeditor/ckeditor5-utils/src/collection' {
  import EmitterMixin from '@ckeditor/ckeditor5-utils/src/emittermixin';

  export class Collection<T> extends EmitterMixin {
    first: T;
    last: T;
    length: number;

    constructor(options?: { idProperty?: string });

    [Symbol.iterator](): Iterator<T>;

    add(item: T, index?: number): void;

    bindTo<U>(externalCollection: Collection<U>): {
      as: (classFactory: any) => void,
      using: (callbackOrProperty: string | ((item: T) => any)) => void,
    };

    clear(): void;

    filter(callback: (item: T, index: number, array: T[]) => boolean): T[];

    find(callback: (item: T, index: number, array: T[]) => boolean): T;

    get(idOrIndex: string | number): T | null;

    getIndex(idOrItem: string | T): number;

    map<U>(callback: (item: T, index: number, array: T[]) => U): U;

    remove(subject: T | number | string): T;
  }

  export default Collection;
}

declare module '@ckeditor/ckeditor5-utils/src/locale' {
  export class Locale {
    /**
     * The language code in [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format.
     *
     * @readonly
     * @member {String}
     */
    language: string;

    /**
     * Creates a new instance of the Locale class.
     *
     * @param {String} [language='en'] The language code in [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format.
     */
    constructor(language?: string);

    /**
     * Translates the given string to the {@link #language}. This method is also available in {@link module:core/editor/editor~Editor#t}
     * and {@link module:ui/view~View#t}.
     *
     * The strings may contain placeholders (`%<index>`) for values which are passed as the second argument.
     * `<index>` is the index in the `values` array.
     *
     *    editor.t( 'Created file "%0" in %1ms.', [ fileName, timeTaken ] );
     *
     * This method's context is statically bound to Locale instance,
     * so it can be called as a function:
     *
     *    const t = this.t;
     *    t( 'Label' );
     *
     * @method #t
     * @param {String} str The string to translate.
     * @param {String[]} values Values that should be used to interpolate the string.
     */
    t(str: string, values?: string[]): string;
  }

  export default Locale;
}

declare module '@ckeditor/ckeditor5-utils/src/priorities' {
  export type PriorityString =
    'highest'
    | 'high'
    | 'normal'
    | 'low'
    | 'lowest';
}

declare module '@ckeditor/ckeditor5-utils/src/eventinfo' {
  export class EventInfo {
    readonly name: string;
    readonly path: object[];
    readonly source: object;
    return: any;

    constructor(source: object, name: string);

    off(): void;

    stop(): void;
  }

  export default EventInfo;
}

declare module '@ckeditor/ckeditor5-utils/src/emittermixin' {
  import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
  import { PriorityString } from '@ckeditor/ckeditor5-utils/src/priorities';

  export interface Emitter {
    delegate(events: string): EmitterMixinDelegateChain;

    fire(eventOrInfo: string | EventInfo, ...args: any[]): any;

    listenTo(
      emitter: Emitter,
      event: string,
      callback: () => any,
      options?: { priority: PriorityString | number },
    ): void;

    off(event: string, callback: () => void): void;

    on(
      event: string,
      callback: () => void,
      options?: { priority: PriorityString | number },
    ): void;

    once(
      event: string,
      callback: () => void,
      options?: { priority: PriorityString | number },
    ): void;

    stopDelegating(event?: string, emitter?: Emitter): void;

    stopListening(
      emitter?: Emitter,
      event?: string,
      callback?: () => void,
    ): void;
  }

  export abstract class EmitterMixin implements Emitter {
    delegate(events: string): EmitterMixinDelegateChain;

    fire(eventOrInfo: string | EventInfo, ...args: any[]): any;

    listenTo(
      emitter: Emitter,
      event: string,
      callback: () => any,
      options?: { priority: PriorityString | number },
    ): void;

    off(event: string, callback: () => void): void;

    on(
      event: string,
      callback: () => void,
      options?: { priority: PriorityString | number },
    ): void;

    once(
      event: string,
      callback: () => void,
      options?: { priority: PriorityString | number },
    ): void;

    stopDelegating(event?: string, emitter?: Emitter): void;

    stopListening(
      emitter?: Emitter,
      event?: string,
      callback?: () => void,
    ): void;
  }

  export interface EmitterMixinDelegateChain {
    to(emitter: Emitter, nameOrFunction: string | (() => void)): void;
  }

  export default EmitterMixin;
}

declare module '@ckeditor/ckeditor5-utils/src/observablemixin' {
  import Emitter, { EmitterMixinDelegateChain } from '@ckeditor/ckeditor5-utils/src/emittermixin';
  import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
  import { PriorityString } from '@ckeditor/ckeditor5-utils/src/priorities';

  export interface Observable {
    bind(bindProperties: string): { to: (...args: any[]) => any, toMany: (...args: any[]) => any };

    decorate(methodName: string): void;

    delegate(events: string): EmitterMixinDelegateChain;

    fire(eventOrInfo: string | EventInfo, ...args: any[]): any;

    listenTo(
      emitter: Emitter,
      event: string,
      callback: () => any,
      options?: { priority: PriorityString | number },
    ): void;

    off(event: string, callback: () => void): void;

    on(
      event: string,
      callback: () => void,
      options?: { priority: PriorityString | number },
    ): void;

    once(
      event: string,
      callback: () => void,
      options?: { priority: PriorityString | number },
    ): void;

    set(name: string | { [name: string]: any }, value?: any): void;

    stopDelegating(event?: string, emitter?: Emitter): void;

    stopListening(
      emitter?: Emitter,
      event?: string,
      callback?: () => void,
    ): void;

    unbind(unbindProperties?: string): void;
  }

  export abstract class ObservableMixin extends Emitter implements Observable {
    bind(bindProperties: string): { to: (...args: any[]) => any, toMany: (...args: any[]) => any };

    decorate(methodName: string): void;

    set(name: string | { [name: string]: any }, value?: any): void;

    unbind(unbindProperties?: string): void;
  }

  export default ObservableMixin;
}
