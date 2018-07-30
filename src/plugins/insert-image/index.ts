import Plugin from '@ckeditor/ckeditor5-image/src/image';
import { ChangeImageEditing } from './change-image-editing';
import { ChangeImageUi } from './change-image-ui';
import { InsertImageEditing } from './insert-image-editing';
import { InsertImageUi } from './insert-image-ui';

export class InsertImage extends Plugin {
  static get pluginName() {
    return 'InsertImage';
  }

  static get requires() {
    return [
      InsertImageEditing,
      InsertImageUi,
      ChangeImageEditing,
      ChangeImageUi,
    ];
  }
}
