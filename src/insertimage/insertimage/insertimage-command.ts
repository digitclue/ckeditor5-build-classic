import Command from '@ckeditor/ckeditor5-core/src/command';
import { isImage } from '@ckeditor/ckeditor5-image/src/image/utils';
import Notification from '@ckeditor/ckeditor5-ui/src/notification/notification';
import {
  getUrlWithoutQuery,
  isImageUrl,
} from '../utils';

export default class InsertImageCommand extends Command {
  value: string;

  refresh() {
    this.value = this._getValue();
    this.isEnabled = this._checkEnabled();
  }

  execute(imageUrl: string) {
    const urlWithoutQuery = getUrlWithoutQuery(imageUrl);

    console.log(this.editor.plugins.get<Notification>('Notification'));

    if (isImageUrl(urlWithoutQuery)) {
      this._insertImage(urlWithoutQuery);
    } else {
      const editor = this.editor;
      const notification = editor.plugins.get<Notification>('Notification');

      if (notification) {
        notification.showWarning(editor.t('Provided url is not an image'));
      } else {
        alert('Don`t do that!');
      }
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
