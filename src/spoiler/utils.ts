import DocumentFragment from '@ckeditor/ckeditor5-engine/src/model/documentfragment';
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';
import Position from '@ckeditor/ckeditor5-engine/src/view/position';
import UIElement from '@ckeditor/ckeditor5-engine/src/view/uielement';
import Writer from '@ckeditor/ckeditor5-engine/src/view/writer';
import {
  toWidget,
  toWidgetEditable,
} from '@ckeditor/ckeditor5-widget/src/utils';

const spoilerSymbol = Symbol('spoiller');
const spoilerHeaderSymbol = Symbol('spoillerHeader');
const spoilerContentSymbol = Symbol('spoillerContent');

export const isSpoiler = (modelElement: ModelElement | DocumentFragment): boolean => modelElement instanceof ModelElement && modelElement.name == 'spoiler';
export const isSpoilerHeader = (modelElement: ModelElement | DocumentFragment): boolean => modelElement instanceof ModelElement && modelElement.name == 'spoilerHeader';
export const isSpoilerContent = (modelElement: ModelElement | DocumentFragment): boolean => modelElement instanceof ModelElement && modelElement.name == 'spoilerContent';

export const createSpoilerViewElement = (writer: Writer) => {
  const spoilerView = writer.createEditableElement('div', { class: 'acore-spoiler' });

  writer.setCustomProperty(spoilerSymbol, true, spoilerView);

  return spoilerView;
};

export const createSpoilerHeaderViewElement = (writer: Writer) => {
  const headerView = writer.createEditableElement('div', {
    class: ['acore-spoiler__header'],
    onclick: 'var a= this.nextElementSibling.classList;var b = \'ck-hidden\'; a[a.contains(b) ? \'remove\' : \'add\'](b);'
  });

  writer.setCustomProperty(spoilerHeaderSymbol, true, headerView);

  return headerView;
};

export const createSpoilerContentViewElement = (writer: Writer) => {
  const contentView = writer.createContainerElement('div', {
    class: 'acore-spoiler__content',
  });

  writer.setCustomProperty(spoilerContentSymbol, true, contentView);

  return contentView;
};

export const getSpoilerChild = (spoilerModelElement: ModelElement, childName: string): ModelElement => {
  for (const node of spoilerModelElement.getChildren()) {
    if (node instanceof ModelElement && node.name == childName) {
      return node;
    }
  }

  return null;
};

export const checkCanBeSpoilered = (schema, block) => {
  const isSpoilerAllowed = schema.checkChild(block.parent, 'spoiler');
  const isBlockAllowedInSpoiler = schema.checkChild(['$root', 'spoiler'], block);

  return isSpoilerAllowed && isBlockAllowedInSpoiler;
};
