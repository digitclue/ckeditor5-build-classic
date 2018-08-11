import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { downcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters';
import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';
import Range from '@ckeditor/ckeditor5-engine/src/model/range';
import { attachPlaceholder } from '@ckeditor/ckeditor5-engine/src/view/placeholder';
import {
  toWidget,
  toWidgetEditable,
} from '@ckeditor/ckeditor5-widget/src/utils';
import { SpoilerCommand } from './spoiler-command';
import {
  createSpoilerContentViewElement,
  createSpoilerHeaderViewElement,
  createSpoilerViewElement,
  getSpoilerChild,
  isSpoilerContent,
  isSpoilerHeader,
} from './utils';

export class SpoilerEditing extends Plugin<EditorWithUI> {
  init() {
    const editor = this.editor;
    const {
      conversion,
      commands,
      model,
    } = editor;
    const { schema } = model;
    const {
      view,
    } = editor.editing;

    commands.add('spoiler', new SpoilerCommand(editor));

    schema.register('spoiler', {
      allowWhere: '$block',
      allowContentOf: '$root',
      // isObject: true,
    });

    schema.register('spoilerHeader', {
      allowIn: 'spoiler',
      allowContentOf: '$block',
      isLimit: true,
    });

    schema.register('spoilerContent', {
      allowIn: 'spoiler',
      allowContentOf: '$root',
      isLimit: true,
      isObject: true,
    });

    editor.conversion.elementToElement({ model: 'spoiler', view: { name: 'div', classes: 'acore-spoiler' } });
    editor.conversion.elementToElement({
      model: 'spoilerContent',
      view: { name: 'div', classes: 'acore-spoiler__content' },
    });

    editor.model.change((writer) => {
      const changes = model.document.differ.getChanges();

      console.log([...changes]);
    });

    editor.model.document.registerPostFixer(writer => {
      const changes = model.document.differ.getChanges();
      let hasChanges = false;

      for (const entry of changes) {
        if (entry.type == 'insert' && entry.name == 'spoiler') {
          const spoiler = entry.position.nodeAfter as ModelElement;

          if (!getSpoilerChild(spoiler, 'spoilerHeader')) {
            writer.appendElement('spoilerHeader', spoiler);

            hasChanges = true;
          }

          if (!getSpoilerChild(spoiler, 'spoilerContent')) {
            writer.appendElement('spoilerContent', spoiler);

            hasChanges = true;
          }
        }
      }

      return hasChanges;
    });

    editor.model.document.registerPostFixer(writer => {
      const changes = model.document.differ.getChanges();
      let hasChanges = false;

      for (const entry of changes) {
        if (entry.type == 'insert' && entry.name == 'spoiler') {
          const spoiler = entry.position.nodeAfter as ModelElement;
          const spoilerContent = getSpoilerChild(spoiler, 'spoilerContent');

          Array.from(spoiler.getChildren())
            .filter((node: ModelElement) => !isSpoilerHeader(node) && !isSpoilerContent(node))
            .forEach((node) => writer.insert(node, spoilerContent));
        }
      }

      return hasChanges;
    });

    conversion
      .for('editingDowncast')
      //   .add(downcastElementToElement({
      //     model: 'spoiler',
      //     view: (modelElement, viewWriter) => createSpoilerViewElement(viewWriter),
      //   }));
      .add(downcastElementToElement({
        model: 'spoilerHeader',
        view: (
          modelElement,
          viewWriter,
        ) => {
          const viewElement = createSpoilerHeaderViewElement(viewWriter);

          attachPlaceholder(view, viewElement, editor.t('Spoiler'));

          return toWidgetEditable(viewElement, viewWriter);
        },
      }));
    // .add(downcastElementToElement({
    //   model: 'spoilerContent',
    //   view: (
    //     modelElement,
    //     viewWriter,
    //   ) => {
    //     const viewElement = createSpoilerContentViewElement(viewWriter);
    //
    //     // attachPlaceholder(view, viewElement, editor.t('Spoiler'));
    //     return viewElement;
    //     return toWidgetEditable(viewElement, viewWriter);
    //   },
    // }));

    conversion
      .for('dataDowncast')
      //   .add(downcastElementToElement({
      //     model: 'spoiler',
      //     view: (modelElement, viewWriter) => createSpoilerViewElement(viewWriter),
      //   }));
      .add(downcastElementToElement({
        model: 'spoilerHeader',
        view: (
          modelElement,
          viewWriter,
        ) => createSpoilerHeaderViewElement(viewWriter),
      }));
    // .add(downcastElementToElement({
    //   model: 'spoilerContent',
    //   view: (
    //     modelElement,
    //     viewWriter,
    //   ) => createSpoilerContentViewElement(viewWriter),
    // }));

    conversion
      .for('upcast')
      //   .add(upcastElementToElement({
      //     model: 'spoiler',
      //     view: {
      //       name: 'div',
      //       classes: 'acore-spoiler',
      //     },
      //   }));
      .add(upcastElementToElement({
        model: 'spoilerHeader',
        view: {
          name: 'div',
          classes: 'acore-spoiler__header',
        },
      }));
    // .add(upcastElementToElement({
    //   model: 'spoilerContent',
    //   view: {
    //     name: 'div',
    //     classes: 'acore-spoiler__content',
    //   },
    // }));
  }
}
