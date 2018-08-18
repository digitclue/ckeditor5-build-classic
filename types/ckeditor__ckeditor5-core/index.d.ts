// Type definitions for @ckeditor/ckeditor5-core 10.1
// Project: https://github.com/ckeditor/ckeditor5
// Definitions by: Kostiantyn Dyha <https://github.com/digitclue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare namespace ckeditor {
  namespace core {
    namespace editor {
      export class Editor extends utils.ObservableMixin {
        static builtinPlugins: any[];
        static defaultConfig: object;

        readonly commands: CommandCollection;
        readonly config: utils.Config;
        readonly conversion: engine.conversion.Conversion;
        readonly data: engine.controller.DataController;
        readonly editing: engine.controller.EditingController;
        isReadOnly: boolean;
        readonly keystrokes: EditingKeystrokeHandler;
        locale: utils.Locale;
        model: engine.model.Model;
        plugins: PluginCollection;
        state: 'initializing' | 'ready' | 'destroyed';

        static create(element: Element, config?: object): Promise<any>;

        constructor(config: object);

        destroy(): Promise<any>;

        execute(commandName: string, ...commandParams: any[]): void;

        initPlugins(): Promise<any>;

        t(str: string, values?: string[]): string;
      }

      export class EditorUI extends utils.EmitterMixin {
        readonly componentFactory: ui.ComponentFactory;
        readonly editor: Editor;
        readonly focusTracker: utils.FocusTracker;
        readonly view: ui.editorui.EditorUIView;

        constructor(editor: Editor | EditorWithUI, view: ui.editorui.EditorUIView);
      }

      export class EditorWithUI extends Editor {
        readonly element: HTMLElement;
        readonly ui: EditorUI;
      }
    }

    export class Command extends utils.ObservableMixin {
      readonly editor: editor.Editor;
      isEnabled: boolean;
      value: any;

      constructor(editor: editor.Editor);

      destroy(): void;

      execute(...args: any[]): void;

      refresh(): void;

    }

    export class CommandCollection {
      constructor();

      [Symbol.iterator](): Iterator<[string, Command]>;

      add(commandName: string, command: Command);

      commands(): Iterator<Command>;

      destroy();

      execute(commandName: string): void;

      get(commandName: string): Command;

      names(): Iterator<string>;
    }

    export class EditingKeystrokeHandler {
    }

    export class Plugin<T extends editor.Editor = editor.Editor> extends utils.ObservableMixin implements PluginInterface {
      static readonly pluginName: string;
      static readonly requires: any[];
      readonly editor: T;

      constructor(editor: T);

      afterInit(): Promise<any> | void;

      destroy(): Promise<any> | void;

      init(): Promise<any> | void;
    }

    export interface PluginInterface {
      afterInit(): Promise<any> | void;

      destroy(): Promise<any> | void;

      init(): Promise<any> | void;
    }

    export class PluginCollection {
      constructor(editor: editor.Editor, availablePlugins?: any[]);

      [Symbol.iterator](): Iterator<[any, Plugin]>;

      destroy(): Promise<any>;

      get<P extends Plugin>(key: any): P;

      load(plugins: Array<any>, removePlugins?: Array<any>): Promise<any[]>;
    }
  }
}

declare module '@ckeditor/ckeditor5-core/src/editor/editor' {
  export default ckeditor.core.editor.Editor;
}

declare module '@ckeditor/ckeditor5-core/src/editor/editorui' {
  export default ckeditor.core.editor.EditorUI;
}

declare module '@ckeditor/ckeditor5-core/src/editor/editorwithui' {
  class EditorWithUI extends ckeditor.core.editor.EditorWithUI {
  }

  export { EditorWithUI };
}

declare module '@ckeditor/ckeditor5-core/src/command' {
  export default ckeditor.core.Command;
}

declare module '@ckeditor/ckeditor5-core/src/commandcollection' {
  export default ckeditor.core.CommandCollection;
}

declare module '@ckeditor/ckeditor5-core/src/editingkeystrokehandler' {
  export default ckeditor.core.EditingKeystrokeHandler;
}


declare module '@ckeditor/ckeditor5-core/src/plugin' {
  export const PluginInterface: ckeditor.core.PluginInterface;
  export default ckeditor.core.Plugin;
}

declare module '@ckeditor/ckeditor5-core/src/plugincollection' {
  export default ckeditor.core.PluginCollection;
}
