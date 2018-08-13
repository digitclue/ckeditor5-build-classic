import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { downcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters';
import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';
import ModelPosition from '@ckeditor/ckeditor5-engine/src/model/position';
import ModelRange from '@ckeditor/ckeditor5-engine/src/model/range';
import Element from '@ckeditor/ckeditor5-engine/src/view/element';
import { attachPlaceholder } from '@ckeditor/ckeditor5-engine/src/view/placeholder';
import ViewPosition from '@ckeditor/ckeditor5-engine/src/view/position';
import ViewRange from '@ckeditor/ckeditor5-engine/src/view/range';
import Text from '@ckeditor/ckeditor5-engine/src/view/text';
import ViewWriter from '@ckeditor/ckeditor5-engine/src/view/writer';
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
      editing,
      t,
    } = editor;
    const { schema } = model;
    const {
      view,
    } = editor.editing;

    commands.add('spoiler', new SpoilerCommand(editor));

    schema.register('spoiler', {
      allowWhere: '$block',
      allowContentOf: '$root',
    });

    schema.register('spoilerHeader', {
      allowIn: 'spoiler',
      allowContentOf: '$block',
      isLimit: true,
    });

    schema.register('spoilerContent', {
      allowIn: 'spoiler',
      allowContentOf: '$root',
    });

    conversion.elementToElement({ model: 'spoiler', view: { name: 'div', classes: 'acore-spoiler' } });
    conversion.elementToElement({
      model: 'spoilerContent',
      view: {
        name: 'div',
        classes: 'acore-spoiler__content',
      },
    });

    /*schema.addChildCheck( ( ctx: any, childDef ) => {
      console.log(ctx.endsWith( 'spoilerContent' ), childDef.name == 'spoiler');
      if ( ctx.endsWith( 'spoilerContent' ) && childDef.name == 'spoilerContent' ) {
        return false;
      }
    } );*/

    /*model.document.registerPostFixer(writer => {
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
    });*/

    // model.document.registerPostFixer(writer => {
    //   const changes = model.document.differ.getChanges();
    //
    //   for (const entry of changes) {
    //     if (entry.type == 'remove' && entry.name == 'spoiler') {
    //       const spoilerContent = entry.position.nodeBefore as ModelElement;
    //       const spoilerHeader = spoilerContent.previousSibling;
    //
    //       writer.remove(spoilerHeader);
    //       writer.unwrap(spoilerContent);
    //     }
    //   }
    //
    //   return false;
    // });

    // model.document.registerPostFixer(writer => {
    //   const changes = model.document.differ.getChanges();
    //
    //   for (const entry of changes) {
    //     if (entry.type == 'insert' && entry.name == 'spoiler') {
    //       const spoiler = entry.position.nodeAfter as ModelElement;
    //       const spoilerHeader = getSpoilerChild(spoiler, 'spoilerHeader');
    //       const spoilerContent = getSpoilerChild(spoiler, 'spoilerContent');
    //       const contentRange = new ModelRange(ModelPosition.createAt(spoiler), ModelPosition.createAt(spoilerHeader, 'before'));
    //
    //       writer.move(contentRange, spoilerContent);
    //     }
    //   }
    //
    //   return false;
    // });

    conversion
      .for('editingDowncast')
      .add(downcastElementToElement({
        model: 'spoilerHeader',
        view: (
          modelElement,
          viewWriter,
        ) => {
          const viewElement = createSpoilerHeaderViewElement(viewWriter);

          attachPlaceholder(view, viewElement, t('Spoiler'));

          return toWidgetEditable(viewElement, viewWriter);
        },
      }));

    conversion
      .for('dataDowncast')
      .add(downcastElementToElement({
        model: 'spoilerHeader',
        view: (
          modelElement,
          viewWriter,
        ) => {
          const viewElement = createSpoilerHeaderViewElement(viewWriter);

          if (modelElement.isEmpty) {
            viewWriter.insert(ViewPosition.createAt(viewElement), viewWriter.createText(t('Spoiler')));
          }

          return viewElement;
        },
      }));

    conversion
      .for('upcast')
      .add(upcastElementToElement({
        model: 'spoilerHeader',
        view: {
          name: 'div',
          classes: 'acore-spoiler__header',
        },
      }));
  }
}
