import cancelIcon from '@ckeditor/ckeditor5-core/theme/icons/cancel.svg';
import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';
import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';
import InputTextView from '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview';
import LabeledInputView from '@ckeditor/ckeditor5-ui/src/labeledinput/labeledinputview';
import View from '@ckeditor/ckeditor5-ui/src/view';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';
import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';

import './insert-image.css';

export class InsertImageFormView extends View {
  private readonly labeledInput: LabeledInputView;
  private readonly saveButtonView: ButtonView;
  private readonly cancelButtonView: ButtonView;
  private readonly focusTracker: FocusTracker;
  private readonly keystrokes: KeystrokeHandler;
  private readonly _focusables: ViewCollection;
  private _focusCycler: FocusCycler;

  constructor(locale) {
    super(locale);

    this.labeledInput = this._createLabeledInputView();
    this.saveButtonView = this._createButton(this.t('Save'), checkIcon, 'ck-button-save');
    this.saveButtonView.type = 'submit';
    this.cancelButtonView = this._createButton(this.t('Cancel'), cancelIcon, 'ck-button-cancel', 'cancel');

    this.focusTracker = new FocusTracker();
    this.keystrokes = new KeystrokeHandler();
    this._focusables = new ViewCollection();
    this._focusCycler = new FocusCycler({
      focusables: this._focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        // Navigate form fields backwards using the Shift + Tab keystroke.
        focusPrevious: 'shift + tab',

        // Navigate form fields forwards using the Tab key.
        focusNext: 'tab',
      },
    });

    this.setTemplate({
      tag: 'form',
      attributes: {
        class: [
          'ck',
          'ck-insert-image-form',
        ],
      },

      children: [
        this.labeledInput,
        this.saveButtonView,
        this.cancelButtonView,
      ],
    });
  }

  render() {
    super.render();

    this.keystrokes.listenTo(this.element);

    submitHandler({ view: this });

    [
      this.labeledInput,
      this.saveButtonView,
      this.cancelButtonView,
    ]
      .forEach(v => {
        // Register the view as focusable.
        this._focusables.add(v);

        // Register the view in the focus tracker.
        this.focusTracker.add(v.element);
      });
  }

  private _createButton(label: string, icon: string, className: string, eventName?: string): ButtonView {
    const button = new ButtonView(this.locale);

    button.set({
      label,
      icon,
      tooltip: true,
    });

    button.extendTemplate({
      attributes: {
        class: className,
      },
    });

    if (eventName) {
      button
        .delegate('execute')
        .to(this, eventName);
    }

    return button;
  }

  private _createLabeledInputView(): LabeledInputView {
    const labeledInput = new LabeledInputView<InputTextView>(this.locale, InputTextView);

    labeledInput.label = this.t('Insert image url');
    labeledInput.inputView.placeholder = this.t('Insert image url');

    return labeledInput;
  }
}
