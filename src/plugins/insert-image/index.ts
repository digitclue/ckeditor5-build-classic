import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import InsertImageCommand from './insert-image-command';

export class InsertImage extends Plugin<EditorWithUI> {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'InsertImage';
  }

  init() {
    this.editor
      .commands
      .add('insertImage', new InsertImageCommand(this.editor));
    this._createToolbarButton();
  }

  private _createToolbarButton() {
    const editor = this.editor;

    editor.ui.componentFactory.add('insertImage', locale => {
      const view = new ButtonView(locale);
      const insertImageCommand = editor.commands.get('insertImage');

      view.set({
        label: 'Insert image',
        icon: imageIcon,
        tooltip: true,
      });

      view
        .bind('isEnabled')
        .to(insertImageCommand);

      // Callback executed once the image is clicked.
      view.on('execute', () => {
        const imageUrl = prompt('Image URL');

        this._insertImage(imageUrl);
      });

      return view;
    });
  }

  private _insertImage(imageUrl: string): void {
    const { model } = this.editor;

    model
      .change(writer => {
        const imageElement = writer.createElement('image', {
          src: imageUrl,
        });

        // Insert the image in the current selection location.
        model.insertContent(imageElement, model.document.selection);
      });
  }
}
