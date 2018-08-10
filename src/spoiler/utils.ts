import Mapper from '@ckeditor/ckeditor5-engine/src/conversion/mapper';
import ModelConsumable from '@ckeditor/ckeditor5-engine/src/conversion/modelconsumable';
import DocumentFragment from '@ckeditor/ckeditor5-engine/src/model/documentfragment';
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';
import Range from '@ckeditor/ckeditor5-engine/src/model/range';
import EditableElement from '@ckeditor/ckeditor5-engine/src/view/editableelement';
import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element';
import { attachPlaceholder } from '@ckeditor/ckeditor5-engine/src/view/placeholder';
import ViewPosition from '@ckeditor/ckeditor5-engine/src/view/position';
import View from '@ckeditor/ckeditor5-engine/src/view/view';
import Writer from '@ckeditor/ckeditor5-engine/src/view/writer';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import {
  toWidgetEditable,
  toWidget,
} from '@ckeditor/ckeditor5-widget/src/utils';

const spoilerHeaderSymbol = Symbol('spoillerHeader');
const spoilerContentSymbol = Symbol('spoillerContent');

export const isSpoiler = (modelElement: ModelElement | DocumentFragment): boolean => modelElement instanceof ModelElement && modelElement.name == 'spoiler';
export const isSpoilerHeader = (modelElement: ModelElement | DocumentFragment): boolean => modelElement instanceof ModelElement && modelElement.name == 'spoilerHeader';
export const isSpoilerContent = (modelElement: ModelElement | DocumentFragment): boolean => modelElement instanceof ModelElement && modelElement.name == 'spoilerContent';

export const spoilerHeaderElementCreator = (view: View) =>
  (writer: Writer): EditableElement => {
    const editable = writer.createEditableElement('div', {
      classes: 'acore-spoiler__header',
    });
    writer.setCustomProperty(spoilerHeaderSymbol, true, editable);
    attachPlaceholder(view, editable, 'Header');

    return toWidgetEditable(editable, writer);
  };

export const spoilerContentElementCreator = (view: View) =>
  (writer: Writer): EditableElement => {
    const editable = writer.createEditableElement('div', {
      classes: 'acore-spoiler__content',
    });
    writer.setCustomProperty(spoilerContentSymbol, true, editable);
    attachPlaceholder(view, editable, 'Content');

    return toWidgetEditable(editable, writer);
  };

export const insertSpoiler = () =>
  (
    e: EventInfo,
    data: { item: ModelElement, range: Range },
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

    const spoiler = toWidget(writer.createEditableElement('div', { classes: 'acore-spoiler' }), writer);
    // const header = writer.createContainerElement('div', { classes: 'acore-spoiler__header' });
    // const content = toWidgetEditable(writer.createContainerElement('div', { classes: 'acore-spoiler__content' }), writer);

    // writer.insert(ViewPosition.createAt(spoiler), [/*header,*/ content]);


    if (!consumable.consume(data.item, 'insert')) {
      return;
    }

    const viewPosition = mapper.toViewPosition(data.range.start);

    mapper.bindElements(data.item, spoiler);
    writer.insert(viewPosition, spoiler);
  };

export const insertSpoilerHeader = (elementCreator: (writer: Writer) => ViewElement) =>
  (
    e: EventInfo,
    data: { item: ModelElement, range: Range },
    conversionApi: {
      writer: Writer,
      mapper: Mapper,
      consumable: ModelConsumable,
    },
  ) => {
    const { item } = data;
    const {
      writer,
      mapper,
      consumable,
    } = conversionApi;

    if (isSpoiler(item.parent)) {
      if (!consumable.consume(item, 'insert')) {
        return;
      }

      const viewSpoiler = mapper.toViewElement(data.range.start.parent);
      const viewSpoilerHeader = elementCreator(writer);
      const viewPosition = ViewPosition.createAt(viewSpoiler, 'end');

      writer.insert(viewPosition, viewSpoilerHeader);
      mapper.bindElements(item, viewSpoilerHeader);
    }
  };

export const insertSpoilerContent = (elementCreator: (writer: Writer) => ViewElement) =>
  (
    e: EventInfo,
    data: { item: ModelElement, range: Range },
    conversionApi: {
      writer: Writer,
      mapper: Mapper,
      consumable: ModelConsumable,
    },
  ) => {
    const { item } = data;
    const {
      writer,
      mapper,
      consumable,
    } = conversionApi;

    if (isSpoiler(item.parent)) {
      if (!consumable.consume(item, 'insert')) {
        return;
      }

      const viewSpoiler = mapper.toViewElement(data.range.start.parent);
      const viewSpoilerHeader = elementCreator(writer);
      const viewPosition = ViewPosition.createAt(viewSpoiler, 'end');

      writer.insert(viewPosition, viewSpoilerHeader);
      mapper.bindElements(item, viewSpoilerHeader);
    }
  };

export const getSpoilerChild = (spoilerModelElement: ModelElement, childName: string): ModelElement => {
  for (const node of spoilerModelElement.getChildren()) {
    if (node instanceof ModelElement && node.name == childName) {
      return node;
    }
  }

  return null;
};
