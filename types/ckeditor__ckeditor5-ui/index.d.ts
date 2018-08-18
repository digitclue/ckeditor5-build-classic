// Type definitions for @ckeditor/ckeditor5-ui 10.1
// Project: https://github.com/ckeditor/ckeditor5
// Definitions by: Kostiantyn Dyha <https://github.com/digitclue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare namespace ckeditor {

  namespace ui {

    namespace bindings {
      export function clickOutsideHandler(options: {
        emitter: utils.dom.Emitter,
        activator: () => boolean,
        contextElements: HTMLElement[],
        callback: () => any,
      });

      export function preventDefault(view: View): TemplateToBinding;

      export function submitHandler(options?: { view: View });
    }

    namespace button {
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

      export class ButtonView extends View implements Button {
        readonly children: ViewCollection;
        icon?: string;
        iconView: icon.IconView;
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

      export class SwitchButtonView extends ButtonView {
        readonly toggleSwitchView: View;
      }
    }

    namespace dropdown {

    }

    namespace editableui {

    }

    namespace editorui {
      export class EditorUIView extends View {
        readonly body: ViewCollection;
      }
    }

    namespace icon {
      export class IconView extends View {
      }
    }

    namespace iframe {

    }

    namespace inputtext {
      export class InputTextView extends View {
        id: string;
        isReadOnly: boolean;
        placeholder: string;
        value: string;
        element: HTMLInputElement;

        constructor(locale: utils.Locale);

        focus(): void;

        select(): void;
      }
    }

    namespace label {
      export class LabelView extends View {
        for: string;
        text: string;
      }
    }

    namespace labeledinput {
      export class LabeledInputView<T extends View> extends View {
        inputView: T;
        isReadOnly: boolean;
        label: string;
        labelView: label.LabelView;
        value: string;

        constructor(locale: utils.Locale, InputView: typeof View);

        focus(): void;

        select(): void;
      }
    }

    namespace list {

    }

    namespace notification {
      export class Notification extends core.Plugin {
        showInfo(
          message: string,
          data?: {
            namespace?: string,
            title?: string,
          },
        ): void;

        showSuccess(
          message: string,
          data?: {
            namespace?: string,
            title?: string,
          },
        ): void;

        showWarning(
          message: string,
          data?: {
            namespace?: string,
            title?: string,
          },
        ): void;
      }
    }

    namespace panel {

      namespace baloon {
        export class BalloonPanelView extends View {
          static arrowHorizontalOffset: number;
          static arrowVerticalOffset: number;
          static defaultPositions: {
            northArrowSouth: (targetRect, balloonRect) => utils.dom.Position,

            northArrowSouthEast: (targetRect, balloonRect) => utils.dom.Position,

            northArrowSouthWest: (targetRect, balloonRect) => utils.dom.Position,

            // ------- North west

            northWestArrowSouth: (targetRect, balloonRect) => utils.dom.Position,

            northWestArrowSouthWest: (targetRect, balloonRect) => utils.dom.Position,

            northWestArrowSouthEast: (targetRect, balloonRect) => utils.dom.Position,

            // ------- North east

            northEastArrowSouth: (targetRect, balloonRect) => utils.dom.Position,

            northEastArrowSouthEast: (targetRect, balloonRect) => utils.dom.Position,

            northEastArrowSouthWest: (targetRect, balloonRect) => utils.dom.Position,

            // ------- South

            southArrowNorth: (targetRect, balloonRect) => utils.dom.Position,

            southArrowNorthEast: (targetRect, balloonRect) => utils.dom.Position,

            southArrowNorthWest: (targetRect, balloonRect) => utils.dom.Position,

            // ------- South west

            southWestArrowNorth: (targetRect, balloonRect) => utils.dom.Position,

            southWestArrowNorthWest: (targetRect, balloonRect) => utils.dom.Position,

            southWestArrowNorthEast: (targetRect, balloonRect) => utils.dom.Position,

            // ------- South east

            southEastArrowNorth: (targetRect, balloonRect) => utils.dom.Position,

            southEastArrowNorthEast: (targetRect, balloonRect) => utils.dom.Position,

            southEastArrowNorthWest: (targetRect, balloonRect) => utils.dom.Position,
          };
          readonly content: ViewCollection;
          className: string;
          isVisible: boolean;
          left: number;
          position: 'arrow_nw' | 'arrow_ne' | 'arrow_sw' | 'arrow_se';
          top: number;
          withArrow: boolean;

          attachTo(options: utils.dom.Options): void;

          hide(): void;

          pin(options: utils.dom.Options): void;

          show(): void;

          unpin(): void;
        }

        export class ContextualBalloon extends core.Plugin<core.editor.EditorWithUI> {
          readonly view: BalloonPanelView;
          positionLimiter: HTMLElement | Range | ClientRect | DOMRect | (() => any);
          visibleView: View;

          add(data: {
            view?: View,
            position?: utils.dom.Options,
            balloonClassName?: string,
          }): void;

          hasView(view: View): boolean;

          remove(view: View): void;

          updatePosition(position?: utils.dom.Options): void;
        }
      }

    }

    namespace toolbar {

    }

    namespace tooltip {

    }

    export class ComponentFactory {
      readonly editor: core.editor.EditorWithUI;

      constructor(editor: core.editor.EditorWithUI);

      add(name: string, callback: (locale: utils.Locale) => View): void;

      create(name: string): View;

      has(name: string): boolean;

      names(): Iterable<string>;
    }

    export class FocusCycler {
      readonly actions: { [action: string]: string | string[] };
      readonly current: number;
      readonly first: View;
      readonly focusTracker: utils.FocusTracker;
      readonly focusables: ViewCollection;
      readonly keystrokeHandler: utils.KeystrokeHandler;
      readonly last: View;
      readonly next: View;
      readonly previous: View;

      constructor(options: {
        focusables: ViewCollection,
        focusTracker: utils.FocusTracker,
        keystrokeHandler?: utils.KeystrokeHandler,
        actions?: { [action: string]: string | string[] },
      });

      focusFirst(): void;

      focusLast(): void;

      focusNext(): void;

      focusPrevious(): void;
    }

    export class Template extends utils.EmitterMixin {
      attributes: { [attribute: string]: any };
      children: Array<Template | Node>;
      eventListeners: object;
      tag: string;
      text: Array<string | TemplateValueSchema>;

      constructor(def: TemplateDefinition);

      static bind(observable: utils.Observable, emitter: utils.Emitter): BindChain;

      static extend(template: Template, def: TemplateDefinition): void;

      apply(node: Node): void;

      getViews(): Iterable<View>;

      render(): HTMLElement | Text;

      revert(node: Node): void;
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
      children?: Array<Template | TemplateDefinition | View | string | Node>;
      on?: { [event: string]: TemplateListenerSchema };
      tag?: string;
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

    export class TemplateBinding {
      attribute: string;
      callback: (...args: any[]) => any;
      emitter: utils.EmitterMixin;
      observable: utils.ObservableMixin;

      constructor(def: TemplateDefinition);

      activateAttributeListener(schema: TemplateValueSchema, updater: (...args: any[]) => any, data: RenderData);

      getValue(node: Node): any;
    }

    export interface RenderData {
      intoFragment: boolean;
      isApplying: boolean;
      node: HTMLElement | Text;
      revertData: object;
    }

    export class TemplateToBinding {
      activateDomEventListener(
        domEvtName: string,
        domSelector: string,
        data: RenderData,
      ): (...args: any[]) => any;
    }

    export class View extends utils.ObservableMixin {
      readonly isRendered: boolean;
      readonly locale: utils.Locale;
      element: HTMLElement | null;
      template: Template;
      bindTemplate: BindChain;

      constructor(locale?: utils.Locale);

      createCollection(): ViewCollection;

      deregisterChild(children: View | Iterable<View>): void;

      destroy(): void;

      extendTemplate(definition: TemplateDefinition): void;

      registerChild(children: View | Iterable<View>): void;

      render(): void;

      setTemplate(definition: TemplateDefinition): void;

      t(str: string, values?: string[]): string;
    }

    export class ViewCollection extends utils.Collection<View> {
      locale: utils.Locale;

      constructor(locale?: utils.Locale);

      destroy(): void;
    }

  }

}

declare module '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler' {
  export default ckeditor.ui.bindings.clickOutsideHandler;
}

declare module '@ckeditor/ckeditor5-ui/src/bindings/preventdefault' {
  export default ckeditor.ui.bindings.preventDefault;
}

declare module '@ckeditor/ckeditor5-ui/src/bindings/submithandler' {
  export default ckeditor.ui.bindings.submitHandler;
}

declare module '@ckeditor/ckeditor5-ui/src/button/button' {
  export interface Button extends ckeditor.ui.button.Button {
  }
}

declare module '@ckeditor/ckeditor5-ui/src/button/buttonview' {
  export default ckeditor.ui.button.ButtonView;
}

declare module '@ckeditor/ckeditor5-ui/src/button/switchbuttonview' {
  export default ckeditor.ui.button.SwitchButtonView;
}

declare module '@ckeditor/ckeditor5-ui/src/editorui/editoruiview' {
  export default ckeditor.ui.editorui.EditorUIView;
}

declare module '@ckeditor/ckeditor5-ui/src/icon/iconview' {
  export default ckeditor.ui.icon.IconView;
}

declare module '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview' {
  export default ckeditor.ui.inputtext.InputTextView;
}

declare module '@ckeditor/ckeditor5-ui/src/label/labelview' {
  export default ckeditor.ui.label.LabelView;
}

declare module '@ckeditor/ckeditor5-ui/src/labeledinput/labeledinputview' {
  export default ckeditor.ui.labeledinput.LabeledInputView;
}

declare module '@ckeditor/ckeditor5-ui/src/notification/notification' {
  export default ckeditor.ui.notification.Notification;
}

declare module '@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview' {
  export default ckeditor.ui.panel.baloon.BalloonPanelView;
}

declare module '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon' {
  export default ckeditor.ui.panel.baloon.ContextualBalloon;
}

declare module '@ckeditor/ckeditor5-ui/src/componentfactory' {
  export default ckeditor.ui.ComponentFactory;
}

declare module '@ckeditor/ckeditor5-ui/src/focuscycler' {
  export default ckeditor.ui.FocusCycler;
}

declare module '@ckeditor/ckeditor5-ui/src/template' {
  export default ckeditor.ui.Template;
}

declare module '@ckeditor/ckeditor5-ui/src/view' {
  export default ckeditor.ui.View;
}

declare module '@ckeditor/ckeditor5-ui/src/viewcollection' {
  export default ckeditor.ui.ViewCollection;
}
