import { EditorWithUI } from '@ckeditor/ckeditor5-core/src/editor/editorwithui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DowncastDispatcher from '@ckeditor/ckeditor5-engine/src/conversion/downcastdispatcher';
import Mapper from '@ckeditor/ckeditor5-engine/src/conversion/mapper';
import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';
import Element from '@ckeditor/ckeditor5-engine/src/model/element';
import Range from '@ckeditor/ckeditor5-engine/src/model/range';
import ViewPosition from '@ckeditor/ckeditor5-engine/src/view/position';
import Writer from '@ckeditor/ckeditor5-engine/src/view/writer';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import { SpoilerCommand } from './spoiler-command';
import ModelConsumable = ckeditor.engine.conversion.ModelConsumable;

const insertSpoiler = () =>
  (
    e: EventInfo,
    data: { item: Element, range: Range },
    conversionApi: {
      writer: Writer,
      mapper: Mapper,
      consumable: ModelConsumable,
    },
  ) => {
    const {
      writer,
      mapper,
      consumable,
    } = conversionApi;

    const spoiler = writer.createContainerElement('div', { classes: 'acore-spoiler' });
    const header = writer.createContainerElement('div', { classes: 'acore-spoiler__header' });
    const content = writer.createContainerElement('div', { classes: 'acore-spoiler__content' });

    writer.insert(ViewPosition.createAt(spoiler), [header, content]);

    if (!consumable.consume(data.item, 'insert')) {
      return;
    }

    const viewPosition = mapper.toViewPosition(data.range.start);

    mapper.bindElements(data.item, header);
    writer.insert(viewPosition, spoiler);
  };

export class SpoilerEditing extends Plugin<EditorWithUI> {
  init() {
    const editor = this.editor;
    const {
      conversion,
      commands,
    } = editor;
    const { schema } = editor.model;
    const { mapper } = editor.editing;

    commands.add('spoiler', new SpoilerCommand(editor));

    schema.register('spoiler', {
      allowWhere: '$block',
      allowContentOf: '$root',
    });

    schema.register('spoilerContent', {
      allowWhere: 'spoiler',
      allowContentOf: 'spoiler',
    });

    conversion.elementToElement({
      model: 'spoilerContent',
      view: {
        name: 'div',
        classes: 'acore-spoiler__content',
      },
    });

    conversion
      .for('downcast')
      /*.add(downcastElementToElement({
        model: 'spoiler',
        view: (modelElement, viewWriter) => {
          const spoiler = viewWriter.createContainerElement('div', { classes: 'acore-spoiler' });
          const header = viewWriter.createContainerElement('div', { classes: 'acore-spoiler__header' });
          const content = viewWriter.createContainerElement('div', { classes: 'acore-spoiler__content' });

          viewWriter.insert(ViewPosition.createAt(spoiler), [header, content]);

          return spoiler;
        },
      }))*/
      .add((dispatcher: DowncastDispatcher) => {
        dispatcher
          .on('insert:spoiler', insertSpoiler());
      });

    conversion
      .for('upcast')
      .add(upcastElementToElement({
        view: {
          name: 'div',
          classes: ['acore-spoiler'],
        },
        model: 'spoiler',
      }));

    // editor.conversion.elementToElement({
    //   model: 'spoiler',
    //   view: 'pre',
    // });
  }
}
