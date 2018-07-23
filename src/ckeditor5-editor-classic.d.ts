declare module '@ckeditor/ckeditor5-editor-classic/src/classiceditor' {
  class Editor {
    static builtinPlugins: any[];
    static defaultConfig: object;

    static create(element: Element, config: any): Promise<any>;
  }

  export default Editor;
}
