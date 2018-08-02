import Plugin from '@ckeditor/ckeditor5-image/src/image';
import { ChangeImageEditing } from './changeimage/changeimage-editing';
import { ChangeImageUi } from './changeimage/changeimage-ui';

export class ChangeImage extends Plugin {
  static get pluginName() {
    return 'ChangeImage';
  }

  static get requires() {
    return [
      ChangeImageEditing,
      ChangeImageUi,
    ];
  }
}
