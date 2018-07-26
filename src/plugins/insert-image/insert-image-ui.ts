import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import BalloonPanelView from '@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';
import { Options } from '@ckeditor/ckeditor5-utils/src/dom/position';
import { InsertImageFormView } from './insert-image-form-view';

export class InsertImageUi extends Plugin<EditorWithUI> {
  private button: ButtonView;
  private form: InsertImageFormView;
  private balloon: ContextualBalloon;

  init() {
    this.balloon = this.editor.plugins.get<ContextualBalloon>(ContextualBalloon);
    this.button = this._createButton();
    this.form = this._createForm();

    console.log(this.balloon);
  }

  private get _isVisible(): boolean {
    return this.balloon.visibleView === this.form;
  }

  private _createButton(): ButtonView {
    const editor = this.editor;
    const command = editor.commands.get('insertImage');
    const button = new ButtonView(editor.locale);

    button.set({
      label: 'Insert image',
      icon: imageIcon,
      tooltip: true,
    });

    button
      .bind('isEnabled')
      .to(command, 'isEnabled');

    button
      .bind('isOn')
      .to(this.balloon.view, 'isVisible');

    button
      .bind('tooltip')
      .to(button, 'isOn', (isOn: boolean) => !isOn);

    button
      .on('execute', () => this._showForm());

    editor
      .ui
      .componentFactory
      .add('insertImage', () => this.button);

    return button;
  }

  private _createForm(): InsertImageFormView {
    const editor = this.editor;
    const form = new InsertImageFormView(editor.locale);

    // Render the form so its #element is available for clickOutsideHandler.
    form.render();

    clickOutsideHandler({
      emitter: form,
      activator: () => this._isVisible,
      contextElements: [form.element],
      callback: () => this._hideForm(),
    });

    this.listenTo(editor.ui, 'update', () => {
      console.log('update');
    });

    return form;
  }

  private _showForm() {
    if (!this.balloon.hasView(this.form)) {
      this.balloon.add({
        view: this.form,
        position: this._getBalloonPositionData(),
      });
    }
  }

  private _hideForm() {
    if (!this._isVisible) {
      return;
    }

    this.balloon.remove(this.form);
  }

  private _getBalloonPositionData(): Options {
    const { defaultPositions } = BalloonPanelView;

    return {
      target: this.button.element,
      positions: [
        defaultPositions.northArrowSouth,
        defaultPositions.northArrowSouthWest,
        defaultPositions.northArrowSouthEast,
        defaultPositions.southArrowNorth,
        defaultPositions.southArrowNorthWest,
        defaultPositions.southArrowNorthEast,
      ],
    };
  }
}
