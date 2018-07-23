// Type definitions for @ckeditor/ckeditor5-ui 10.1
// Project: https://github.com/ckeditor/ckeditor5
// Definitions by: Kostiantyn Dyha <https://github.com/digitclue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module '@ckeditor/ckeditor5-ui/src/componentfactory' {
  import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
  import View from '@ckeditor/ckeditor5-ui/src/view';
  import Locale from '@ckeditor/ckeditor5-utils/src/locale';

  export class ComponentFactory {
    readonly editor: EditorWithUI;

    constructor(editor: EditorWithUI);

    add(name: string, callback: (locale: Locale) => View): void;

    create(name: string): View;

    has(name: string): boolean;

    names(): Iterable<string>;
  }

  export default ComponentFactory;
}

declare module '@ckeditor/ckeditor5-ui/src/viewcollection' {
  import View from '@ckeditor/ckeditor5-ui/src/view';
  import Collection from '@ckeditor/ckeditor5-utils/src/collection';
  import Locale from '@ckeditor/ckeditor5-utils/src/locale';

  export class ViewCollection extends Collection<View> {
    locale: Locale;

    constructor(locale: Locale);

    destroy(): void;
  }

  export default ViewCollection;
}

declare module '@ckeditor/ckeditor5-ui/src/template' {
  import View from '@ckeditor/ckeditor5-ui/src/view';
  import EmitterMixin, { Emitter } from '@ckeditor/ckeditor5-utils/src/emittermixin';
  import ObservableMixin, { Observable } from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export class Template extends EmitterMixin {
    attributes: { [attribute: string]: any };
    children: Array<Template | Node>;
    eventListeners: object;
    tag: string;
    text: Array<string | TemplateValueSchema>;

    constructor(def: TemplateDefinition);

    static bind(observable: Observable, emitter: Emitter): BindChain;

    static extend(template: Template, def: TemplateDefinition): void;

    apply(node: Node): void;

    getViews(): Iterable<View>;

    render(): HTMLElement | Text;

    revert(node: Node): void;
  }

  class TemplateBinding {
    attribute: string;
    callback: (...args: any[]) => any;
    emitter: EmitterMixin;
    observable: ObservableMixin;

    constructor(def: TemplateDefinition);

    activateAttributeListener(schema: TemplateValueSchema, updater: (...args: any[]) => any, data: RenderData);

    getValue(node: Node): any;
  }

  interface RenderData {
    intoFragment: boolean;
    isApplying: boolean;
    node: HTMLElement | Text;
    revertData: object;
  }

  export interface BindChain {
    if(
      attribute: string,
      valueIfTrue?: string,
      callback?: (value: any, node: Node) => boolean,
    ): TemplateBinding;

    to(
      eventNameOrFunctionOrAttribute: string | ((...args: any[]) => any),
      callback?: (value: any, node: Node) => any,
    ): TemplateBinding;
  }

  export interface TemplateDefinition {
    attributes?: { [key: string]: TemplateValueSchema };
    children?: Array<TemplateDefinition | string | Node>;
    on?: { [event: string]: TemplateListenerSchema };
    tag: string;
    text?: string | TemplateValueSchema | Array<string | TemplateValueSchema>;
  }

  export type TemplateListenerSchema =
    object
    | string
    | any[];

  export type TemplateValueSchema =
    object
    | string
    | any[];

  export default Template;
}

declare module '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler' {
  import { Emitter } from '@ckeditor/ckeditor5-utils/src/emittermixin';

  export function clickOutsideHandler(options: {
    emitter: Emitter,
    activator: () => boolean,
    contextElements: HTMLElement[],
    callback: () => any,
  });

  export default clickOutsideHandler;
}

declare module '@ckeditor/ckeditor5-ui/src/view' {
  import Template, {
    BindChain,
    TemplateDefinition,
  } from '@ckeditor/ckeditor5-ui/src/template';
  import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';
  import Locale from '@ckeditor/ckeditor5-utils/src/locale';
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export class View extends ObservableMixin {
    readonly isRendered: boolean;
    readonly locale: Locale;
    element: HTMLElement | null;
    template: Template;
    bindTemplate: BindChain;

    constructor(locale?: Locale);

    createCollection(): ViewCollection;

    deregisterChild(children: View | Iterable<View>): void;

    destroy(): void;

    extendTemplate(definition: TemplateDefinition): void;

    registerChild(children: View | Iterable<View>): void;

    render(): void;

    setTemplate(definition: TemplateDefinition): void;

    t(str: string, values?: string[]): string;
  }

  export default View;
}

declare module '@ckeditor/ckeditor5-ui/src/icon/iconview' {
  import View from '@ckeditor/ckeditor5-ui/src/view';

  export class IconView extends View {
  }

  export default IconView;
}

declare module '@ckeditor/ckeditor5-ui/src/button/button' {
  export interface Button {
    icon?: string;
    isEnabled: boolean;
    isOn: boolean;
    isVisible: boolean;
    keystroke?: string;
    label: string;
    tabindex?: string;
    tooltip?: boolean | string | ((label: string, keystroke: string) => string);
    tooltipPosition?: 's' | 'n';
    type: 'button' | 'submit' | 'reset' | 'menu';
    withText?: boolean;
  }
}

declare module '@ckeditor/ckeditor5-ui/src/button/buttonview' {
  import { Button } from '@ckeditor/ckeditor5-ui/src/button/button';
  import IconView from '@ckeditor/ckeditor5-ui/src/icon/iconview';
  import View from '@ckeditor/ckeditor5-ui/src/view';
  import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';

  export class ButtonView extends View implements Button {
    readonly children: ViewCollection;
    icon?: string;
    iconView: IconView;
    isEnabled: boolean;
    isOn: boolean;
    isVisible: boolean;
    keystroke?: string;
    label: string;
    labelView: View;
    tabindex?: string;
    tooltip?: boolean | string | ((label: string, keystroke: string) => string);
    tooltipPosition?: 's' | 'n';
    type: 'button' | 'submit' | 'reset' | 'menu';
    withText?: boolean;

    focus(): void;
  }

  export default ButtonView;
}

declare module '@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview' {
  import View from '@ckeditor/ckeditor5-ui/src/view';
  import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';
  import { Options } from '@ckeditor/ckeditor5-utils/src/dom/position';

  export class BalloonPanelView extends View {
    static arrowHorizontalOffset: number;
    static arrowVerticalOffset: number;
    static defaultPositions: object;
    readonly content: ViewCollection;
    className: string;
    isVisible: boolean;
    left: number;
    position: 'arrow_nw' | 'arrow_ne' | 'arrow_sw' | 'arrow_se';
    top: number;
    withArrow: boolean;

    attachTo(options: Options): void;

    hide(): void;

    pin(options: Options): void;

    show(): void;

    unpin(): void;
  }

  export default BalloonPanelView;
}

declare module '@ckeditor/ckeditor5-ui/src/editorui/editoruiview' {
  import View from '@ckeditor/ckeditor5-ui/src/view';
  import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';

  export class EditorUIView extends View {
    readonly body: ViewCollection;
  }

  export default EditorUIView;
}
