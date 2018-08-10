import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DowncastDispatcher from '@ckeditor/ckeditor5-engine/src/conversion/downcastdispatcher';
import Mapper from '@ckeditor/ckeditor5-engine/src/conversion/mapper';
import ModelConsumable from '@ckeditor/ckeditor5-engine/src/conversion/modelconsumable';
import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';
import DocumentFragment from '@ckeditor/ckeditor5-engine/src/model/documentfragment';
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';
import Node from '@ckeditor/ckeditor5-engine/src/model/node';
import Range from '@ckeditor/ckeditor5-engine/src/model/range';
import EditableElement from '@ckeditor/ckeditor5-engine/src/view/editableelement';
import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element';
import ViewPosition from '@ckeditor/ckeditor5-engine/src/view/position';
import Writer from '@ckeditor/ckeditor5-engine/src/view/writer';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import { SpoilerCommand } from './spoiler-command';
import {
  getSpoilerChild,
  insertSpoiler,
  insertSpoilerContent,
  insertSpoilerHeader,
  isSpoilerContent,
  isSpoilerHeader,
  spoilerContentElementCreator,
  spoilerHeaderElementCreator,
} from './utils';

export class SpoilerEditing extends Plugin<EditorWithUI> {
  init() {
    const editor = this.editor;
    const {
      conversion,
      commands,
      editing,
    } = editor;
    const { schema } = editor.model;
    const {
      mapper,
      view,
    } = editor.editing;

    commands.add('spoiler', new SpoilerCommand(editor));

    schema.register('spoiler', {
      allowWhere: '$block',
      allowContentOf: '$root',
      isObject: true,
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

    editor.model.document.registerPostFixer(writer => {
      const model = this.editor.model;
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
      const model = this.editor.model;
      const changes = model.document.differ.getChanges();
      let hasChanges = false;

      for (const entry of changes) {
        if (entry.type == 'insert' && entry.name == 'spoiler') {
          const spoiler = entry.position.nodeAfter as ModelElement;
          const content = [...spoiler.getChildren()]
            .filter((node: ModelElement) => !isSpoilerHeader(node) && !isSpoilerContent(node))
            .map(node => Range.createOn(node));

          if (content.length) {
            writer.move(Range.createFromRanges(content), getSpoilerChild(spoiler, 'spoilerContent'));
          }
        }
      }

      return hasChanges;
    });

    conversion
      .for('editingDowncast')
      .add((dispatcher: DowncastDispatcher) => {
        dispatcher
          .on('insert:spoiler', insertSpoiler());
      })
      .add((dispatcher: DowncastDispatcher) => {
        const createSpoilerHeaderForEditing = spoilerHeaderElementCreator(view);
        dispatcher
          .on('insert:spoilerHeader', insertSpoilerHeader(createSpoilerHeaderForEditing));
      })
      .add((dispatcher: DowncastDispatcher) => {
        const createSpoilerContentForEditing = spoilerContentElementCreator(view);
        dispatcher
          .on('insert:spoilerContent', insertSpoilerContent(createSpoilerContentForEditing));
      });

    conversion
      .for('upcast')
      .add(upcastElementToElement({
        model: 'spoiler',
        view: {
          name: 'div',
          classes: 'acore-spoiler',
        },
      }))
      .add(upcastElementToElement({
        model: 'spoilerHeader',
        view: {
          name: 'div',
          classes: 'acore-spoiler__header',
        },
      }))
      .add(upcastElementToElement({
        model: 'spoilerContent',
        view: {
          name: 'div',
          classes: 'acore-spoiler__content',
        },
      }));
  }
}
