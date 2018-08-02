import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ChangeImageCommand from './changeimage-command';

export class ChangeImageEditing extends Plugin {
  init() {
    this.editor.commands.add('changeImage', new ChangeImageCommand(this.editor));
  }
}
