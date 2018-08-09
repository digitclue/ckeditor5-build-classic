import Plugin from '@ckeditor/ckeditor5-image/src/image';
import { SpoilerEditing } from './spoiler-editing';
import { SpoilerUi } from './spoiler-ui';

export class Spoiler extends Plugin {
  static get pluginName() {
    return 'Spoiler';
  }

  static get requires() {
    return [
      SpoilerEditing,
      SpoilerUi,
    ];
  }
}
