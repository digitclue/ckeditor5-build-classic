declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '@ckeditor/ckeditor5-editor-classic/src/classiceditor' {
  import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
  export default Editor;
}
