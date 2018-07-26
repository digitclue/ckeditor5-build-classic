import Command from '@ckeditor/ckeditor5-core/src/command';
import { isImage } from '@ckeditor/ckeditor5-image/src/image/utils';

export default class InsertImageCommand extends Command {
  value: string;

  refresh() {
    this.value = this._getValue();
    this.isEnabled = this._checkEnabled();
  }

  execute() {
    console.log('execute');

    const imageUrl = prompt('Image URL');

    if (imageUrl) {
      this._insertImage(imageUrl);
    }
  }

  private _getValue(): string {
    const selectedElement = this.editor.model.document.selection.getSelectedElement();

    if (isImage(selectedElement)) {
      return selectedElement.getAttribute('src');
    }

    return '';
  }

  private _checkEnabled(): boolean {
    const element = this.editor.model.document.selection.getSelectedElement();

    return !isImage(element);
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
