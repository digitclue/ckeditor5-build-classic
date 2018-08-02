import Plugin from '@ckeditor/ckeditor5-image/src/image';
import { InsertImageEditing } from './insertimage/insertimage-editing';
import { InsertImageUi } from './insertimage/insertimage-ui';

export class InsertImage extends Plugin {
  static get pluginName() {
    return 'InsertImage';
  }

  static get requires() {
    return [
      InsertImageEditing,
      InsertImageUi,
    ];
  }
}
