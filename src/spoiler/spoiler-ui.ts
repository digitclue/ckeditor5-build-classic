import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Locale from '@ckeditor/ckeditor5-utils/src/locale';

import spoilerIcon from './theme/icons/spoiler.svg';
import './theme/spoiler.css';

export class SpoilerUi extends Plugin<EditorWithUI> {
  init() {
    const editor = this.editor;
    const { t } = editor;

    editor.ui.componentFactory.add('spoiler', (locale: Locale) => {
      const command = editor.commands.get('spoiler');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Spoiler'),
        icon: spoilerIcon,
        tooltip: true,
      });

      // Bind button model to command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute command.
      this.listenTo(buttonView, 'execute', () => editor.execute('spoiler'));

      return buttonView;
    });
  }
}
