// Type definitions for @ckeditor/ckeditor5-core 10.1
// Project: https://github.com/ckeditor/ckeditor5
// Definitions by: Kostiantyn Dyha <https://github.com/digitclue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module '@ckeditor/ckeditor5-core/src/plugincollection' {
  import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
  import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

  export class PluginCollection {
    constructor(editor: Editor, availablePlugins?: any[]);

    [Symbol.iterator](): Iterator<[any, Plugin]>;

    destroy(): Promise<any>;

    get<P extends Plugin>(key: any): P;

    load(plugins: Array<any>, removePlugins?: Array<any>): Promise<any[]>;
  }

  export default PluginCollection;
}

declare module '@ckeditor/ckeditor5-core/src/editingkeystrokehandler' {
  export class EditingKeystrokeHandler {
  }

  export default EditingKeystrokeHandler;
}

declare module '@ckeditor/ckeditor5-core/src/command' {
  import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export class Command extends ObservableMixin {
    readonly editor: Editor;
    isEnabled: boolean;
    value: any;

    constructor(editor: Editor);

    destroy(): void;

    execute(...args: any[]): void;

    refresh(): void;

  }

  export default Command;
}

declare module '@ckeditor/ckeditor5-core/src/commandcollection' {
  import Command from '@ckeditor/ckeditor5-core/src/command';

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
    static builtinPlugins: any[];
    static defaultConfig: object;

    static create(element: Element, config: object): Promise<any>;

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
    state: 'initializing' | 'ready' | 'destroyed';

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
  import EmitterMixin from '@ckeditor/ckeditor5-utils/src/emittermixin';
  import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';

  export interface EditorUI extends EmitterMixin {
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
    readonly element: HTMLElement;
    readonly ui: EditorUI;
  }
}

declare module '@ckeditor/ckeditor5-core/src/plugin' {
  import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export interface PluginInterface {
    afterInit(): Promise<any> | void;

    destroy(): Promise<any> | void;

    init(): Promise<any> | void;
  }

  export class Plugin<T extends Editor = Editor> extends ObservableMixin implements PluginInterface {
    static readonly pluginName: string;
    static readonly requires: any[];
    readonly editor: T;

    constructor(editor: T);

    afterInit(): Promise<any> | void;

    destroy(): Promise<any> | void;

    init(): Promise<any> | void;
  }

  export default Plugin;
}
