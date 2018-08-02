import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InsertImageCommand from './insertimage-command';

export class InsertImageEditing extends Plugin {
  init() {
    this.editor.commands.add('insertImage', new InsertImageCommand(this.editor));
  }
}
