import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
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
    ];
  }
}
