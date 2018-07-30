import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ChangeImageCommand from './change-image-command';

export class ChangeImageEditing extends Plugin {
  init() {
    this.editor.commands.add('changeImage', new ChangeImageCommand(this.editor));
  }
}
