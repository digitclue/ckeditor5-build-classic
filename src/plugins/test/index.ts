import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/pilcrow.svg';
import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import BalloonPanelView from '@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview';
import View from '@ckeditor/ckeditor5-ui/src/view';

export class TestPlugin extends Plugin<EditorWithUI> {
  panelView: BalloonPanelView;
  buttonView: ButtonView;

  init() {
    const editor = this.editor;

    this.panelView = this._createBaloonPanel();
    this.buttonView = this._createButtonView();

    editor.ui
      .componentFactory
      .add('test', () => this.buttonView);

    this.buttonView
      .on('render', () => {
        clickOutsideHandler({
          emitter: this.panelView,
          contextElements: [
            this.panelView.element,
            this.buttonView.element,
          ],
          activator: () => this.panelView.isVisible,
          callback: () => this._hidePanel(),
        });
      });

    this.test();
  }

  private test() {
    /*const template = new Template({
      tag: 'p',
      attributes: {
        class: 'foo',
        style: {
          backgroundColor: 'yellow',
        },
      },
      children: [
        'A paragraph.',
      ],
    }).render();*/

    class SampleView extends View {
      constructor(locale) {
        super(locale);

        const bind = this.bindTemplate;

        // Views define their interface (state) using observable attributes.
        this.set('elementClass', 'bar');

        this.setTemplate({
          tag: 'p',

          // The element of the view can be defined with its children.
          children: [
            'Hello',
            {
              tag: 'b',
              children: ['world!'],
            },
          ],
          attributes: {
            class: [
              'foo',

              // Observable attributes control the state of the view in DOM.
              bind.to('elementClass'),
            ],
          },
          on: {
            // Views listen to DOM events and propagate them.
            click: bind.to('clicked'),
          },
        });
      }
    }

    const child = new SampleView(this.editor.locale);

    this.panelView
      .content
      .add(child);
  }

  private _createBaloonPanel() {
    const editor = this.editor;
    const panelView = new BalloonPanelView(editor.locale);
    panelView.render();
    document.body.appendChild(panelView.element);

    return panelView;
  }

  private _createButtonView() {
    const editor = this.editor;
    const buttonView = new ButtonView(editor.locale);

    buttonView.set({
      label: editor.t('Insert image'),
      icon: imageIcon,
      tooltip: true,
    });

    buttonView.bind('isOn').to(this.panelView, 'isVisible');
    buttonView.bind('tooltip').to(this.panelView, 'isVisible', isVisible => !isVisible);

    buttonView.on('execute', () => {
      console.log(this.panelView.isVisible);
      if (!this.panelView.isVisible) {
        this._showPanel();
      } else {
        this._hidePanel();
      }
    });

    return buttonView;
  }

  private _showPanel() {
    this.panelView.pin({
      target: this.buttonView.element,
      limiter: this.editor.ui.view.element,
    });
  }

  private _hidePanel() {
    this.panelView.isVisible = false;
  }
}
