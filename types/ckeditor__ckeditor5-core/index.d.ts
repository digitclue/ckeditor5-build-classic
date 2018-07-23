// Type definitions for @ckeditor/ckeditor5-core 10.1
// Project: https://github.com/ckeditor/ckeditor5
// Definitions by: Kostiantyn Dyha <https://github.com/digitclue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module '@ckeditor/ckeditor5-core/src/plugincollection' {
  export class PluginCollection {
  }

  export default PluginCollection;
}

declare module '@ckeditor/ckeditor5-core/src/editingkeystrokehandler' {
  export class EditingKeystrokeHandler {
  }

  export default EditingKeystrokeHandler;
}

declare module '@ckeditor/ckeditor5-core/src/commandcollection' {
  export class CommandCollection {
  }

  export default CommandCollection;
}

declare module '@ckeditor/ckeditor5-core/src/editor/editor' {
  import CommandCollection from '@ckeditor/ckeditor5-core/src/commandcollection';
  import EditingKeystrokeHandler from '@ckeditor/ckeditor5-core/src/editingkeystrokehandler';
  import PluginCollection from '@ckeditor/ckeditor5-core/src/plugincollection';
  import DataController from '@ckeditor/ckeditor5-engine/src/controller/datacontroller';
  import EditingController from '@ckeditor/ckeditor5-engine/src/controller/editingcontroller';
  import Conversion from '@ckeditor/ckeditor5-engine/src/conversion/conversion';
  import Model from '@ckeditor/ckeditor5-engine/src/model/model';
  import Config from '@ckeditor/ckeditor5-utils/src/config';
  import Locale from '@ckeditor/ckeditor5-utils/src/locale';
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export class Editor extends ObservableMixin {
    static build: {
      plugins: any[];
      config: object;
    };
    readonly commands: CommandCollection;
    readonly config: Config;
    readonly conversion: Conversion;
    readonly data: DataController;
    readonly editing: EditingController;
    isReadOnly: boolean;
    readonly keystrokes: EditingKeystrokeHandler;
    locale: Locale;
    model: Model;
    plugins: PluginCollection;

    constructor(config: object);

    destroy(): Promise<any>;

    execute(commandName: string, ...commandParams: any[]): void;

    initPlugins(): Promise<any>;

    t(str: string, values?: string[]): string;
  }

  export default Editor;
}

declare module '@ckeditor/ckeditor5-core/src/editor/editorui' {
  import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
  import ComponentFactory from '@ckeditor/ckeditor5-ui/src/componentfactory';
  import EditorUIView from '@ckeditor/ckeditor5-ui/src/editorui/editoruiview';
  import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';

  export interface EditorUI {
    readonly componentFactory: ComponentFactory;
    readonly editor: Editor;
    readonly focusTracker: FocusTracker;
    readonly view: EditorUIView;
  }
}

declare module '@ckeditor/ckeditor5-core/src/editor/editorwithui' {
  import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
  import { EditorUI } from '@ckeditor/ckeditor5-core/src/editor/editorui';

  export interface EditorWithUI extends Editor {
    readonly ui: EditorUI;
  }
}

declare module '@ckeditor/ckeditor5-core/src/plugin' {
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export interface PluginInterface {
    afterInit(): Promise<any> | void;

    destroy(): Promise<any> | void;

    init(): Promise<any> | void;
  }

  export class Plugin<T> extends ObservableMixin implements PluginInterface {
    static readonly pluginName?: string;
    static readonly requires?: any[];
    readonly editor: T;

    constructor(editor: T);

    afterInit(): Promise<any> | void;

    destroy(): Promise<any> | void;

    init(): Promise<any> | void;
  }

  export default Plugin;
}
