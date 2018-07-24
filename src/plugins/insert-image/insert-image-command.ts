import Command from '@ckeditor/ckeditor5-core/src/command';
import Element from '@ckeditor/ckeditor5-engine/src/model/element';
import first from '@ckeditor/ckeditor5-utils/src/first';

export default class InsertImageCommand extends Command {
  refresh(...args) {
    const editor = this.editor;
    const { model } = this.editor;
    const { schema } = model;

    console.log(first(this.editor.model.document.selection.getSelectedBlocks()));
    // console.log(schema.getDefinitions());

    console.log('refresh', first<Element>(this.editor.model.document.selection.getSelectedBlocks()).is('image'));

    this.isEnabled = this._checkEnabled();
  }

  private _checkEnabled() {
    return !first<Element>(this.editor.model.document.selection.getSelectedBlocks()).is('image');
  }
}
