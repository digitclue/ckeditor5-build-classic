import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import BalloonPanelView from '@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';
import { Options } from '@ckeditor/ckeditor5-utils/src/dom/position';
import { InsertImageFormView } from '../ui/insertimage-form-view';

export class ChangeImageUi extends Plugin<EditorWithUI> {
  private button: ButtonView;
  private form: InsertImageFormView;
  private balloon: ContextualBalloon;

  init() {
    this.balloon = this.editor.plugins.get<ContextualBalloon>(ContextualBalloon);
    this.button = this._createButton();
    this.form = this._createForm();

    this.attachEvents();
  }

  private get _isVisible(): boolean {
    return this.balloon.visibleView === this.form;
  }

  private attachEvents() {
    const command = this.editor.commands.get('changeImage');

    this.listenTo(
      command,
      'change:isEnabled',
      (e, eventName, isEnabled: boolean) => {
        if (!isEnabled) {
          this._hideForm();
        }
      },
    );

    this.listenTo(
      this.button,
      'execute',
      () => this._showForm(),
    );

    this.listenTo(
      this.form,
      'cancel',
      () => {
        this._hideForm();
        this.editor.editing.view.focus();
      },
    );

    this.listenTo(
      this.form,
      'submit',
      () => {
        command.execute(this.form.labeledInput.inputView.element.value);
        this._hideForm();
        this.editor.editing.view.focus();
      },
    );

    clickOutsideHandler({
      emitter: this.form,
      activator: () => this._isVisible,
      contextElements: [this.form.element],
      callback: () => this._hideForm(),
    });
  }

  private _createButton(): ButtonView {
    const editor = this.editor;
    const command = editor.commands.get('changeImage');
    const button = new ButtonView(editor.locale);

    button.set({
      label: editor.t('Change image'),
      icon: imageIcon,
      tooltip: true,
    });

    button
      .bind('isEnabled')
      .to(command, 'isEnabled');

    button.render();

    editor
      .ui
      .componentFactory
      .add('changeImage', () => this.button);

    return button;
  }

  private _createForm(): InsertImageFormView {
    const form = new InsertImageFormView(this.editor.locale);

    // Render the form so its #element is available for clickOutsideHandler.
    form.render();

    return form;
  }

  private _showForm() {
    if (this._isVisible) {
      return;
    }

    const editor = this.editor;
    const command = editor.commands.get( 'changeImage' );
    const labeledInput = this.form.labeledInput;

    if (!this.balloon.hasView(this.form)) {
      this.balloon.add({
        view: this.form,
        position: this._getBalloonPositionData(),
      });
    }

    labeledInput.value = labeledInput.inputView.element.value = command.value || '';

    labeledInput.select();
  }

  private _hideForm() {
    if (!this._isVisible) {
      return;
    }

    this.form.labeledInput.inputView.element.value = '';
    this.balloon.remove(this.form);
  }

  private _getBalloonPositionData(): Options {
    const editingView = this.editor.editing.view;
    const defaultPositions = BalloonPanelView.defaultPositions;

    return {
      target: editingView.domConverter.viewToDom(editingView.document.selection.getSelectedElement(), null),
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
