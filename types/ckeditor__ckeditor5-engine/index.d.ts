// Type definitions for @ckeditor/ckeditor5-engine 10.1
// Project: https://github.com/ckeditor/ckeditor5
// Definitions by: Kostiantyn Dyha <https://github.com/digitclue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module '@ckeditor/ckeditor5-engine/src/view/text' {
  export class Text {
  }

  export default Text;
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/downcastdispatcher' {
  export class DowncastDispatcher {
  }

  export default DowncastDispatcher;
}

declare module '@ckeditor/ckeditor5-engine/src/view/uielement' {
  export class UIElement {
  }

  export default UIElement;
}

declare module '@ckeditor/ckeditor5-engine/src/view/editableelement' {
  export class EditableElement {
  }

  export default EditableElement;
}


declare module '@ckeditor/ckeditor5-engine/src/conversion/mapper' {
  export class Mapper {
  }

  export default Mapper;
}

declare module '@ckeditor/ckeditor5-engine/src/view/rooteditableelement' {
  export class RootEditableElement {
  }

  export default RootEditableElement;
}

declare module '@ckeditor/ckeditor5-engine/src/view/domconverter' {
  import ViewDocumentFragment from '@ckeditor/ckeditor5-engine/src/model/documentfragment';
  import ViewDocumentSelection from '@ckeditor/ckeditor5-engine/src/model/documentselection';
  import ViewElement from '@ckeditor/ckeditor5-engine/src/model/element';
  import ViewNode from '@ckeditor/ckeditor5-engine/src/model/node';
  import ViewPosition from '@ckeditor/ckeditor5-engine/src/model/position';
  import ViewRange from '@ckeditor/ckeditor5-engine/src/model/range';
  import ViewSelection from '@ckeditor/ckeditor5-engine/src/model/selection';
  import ViewEditableElement from '@ckeditor/ckeditor5-engine/src/view/editableelement';
  import ViewText from '@ckeditor/ckeditor5-engine/src/view/text';
  import ViewUIElement from '@ckeditor/ckeditor5-engine/src/view/uielement';

  export class DomConverter {
    readonly blockElements: string[];
    readonly blockFiller: any;
    readonly preElements: string[];

    constructor(options: { blockFiller?: any; });

    _checkShouldLeftTrimDomText(prevNode: Node): void;

    _checkShouldRightTrimDomText(node: Node, prevNode: Node): void;

    _getTouchingViewTextNode(node: ViewText, getNext: boolean): ViewText;

    bindDocumentFragments(domFragment: DocumentFragment, viewFragment: ViewDocumentFragment): void;

    bindElements(domElement: HTMLElement, viewElement: ViewElement): void;

    bindFakeSelection(domElement: HTMLElement, viewDocumentSelection: ViewDocumentSelection): void

    domChildrenToView(domElement: HTMLElement, options: object): Iterator<ViewNode>;

    domPositionToView(domParent: Node, domOffset: number): ViewPosition;

    domRangeToView(domRange: Range): ViewRange;

    domSelectionToView(domSelection: Selection): ViewSelection;

    domToView(domNode: Node | DocumentFragment, options ?: {
      bind?: boolean,
      withChildren?: boolean,
      keepOriginalCase?: boolean
    }): ViewNode | ViewDocumentFragment;

    fakeSelectionToView(domElement: HTMLElement): ViewSelection;

    findCorrespondingDomText(viewText: ViewText): Text;

    findCorrespondingViewText(domText: Text): ViewText;

    focus(viewEditable: ViewEditableElement): void;

    getParentUIElement(domNode: Node): ViewUIElement;

    isComment(node: Node): boolean;

    isDocumentFragment(node: Node): boolean;

    isDomSelectionBackward(DOM: Selection): boolean;

    isDomSelectionCorrect(domSelection: Selection): boolean;

    isElement(node: Node): boolean;

    mapDomToView(domElementOrDocumentFragment: DocumentFragment | Element): ViewElement | ViewDocumentFragment;

    mapViewToDom(viewNode: ViewElement | ViewDocumentFragment): Node | DocumentFragment;

    unbindDomElement(domElement: HTMLElement): void;

    viewChildrenToDom(
      viewElement: ViewElement | ViewDocumentFragment,
      domDocument: Document,
      options: {
        bind: boolean,
        withChildren: boolean,
      },
    ): Iterator<Node>;

    viewPositionToDom(viewPosition: ViewPosition): object;

    viewRangeToDom(viewRange: ViewRange): Range;

    viewToDom(
      viewNode: ViewNode | ViewDocumentFragment,
      domDocument: Document,
      options?: {
        bind?: boolean,
        withChildren?: boolean,
      },
    ): Node | DocumentFragment;
  }

  export default DomConverter;
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/observer' {
  export class Observer {
  }

  export default Observer;
}

declare module '@ckeditor/ckeditor5-engine/src/view/document' {
  import DocumentSelection from '@ckeditor/ckeditor5-engine/src/model/documentselection';
  import Writer from '@ckeditor/ckeditor5-engine/src/model/writer';
  import RootEditableElement from '@ckeditor/ckeditor5-engine/src/view/rooteditableelement';
  import Collection from '@ckeditor/ckeditor5-utils/src/collection';
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export class Document extends ObservableMixin {
    readonly isComposing: boolean;
    readonly isFocused: boolean;
    readonly isReadOnly: boolean;
    readonly roots: Collection<any>;
    readonly selection: DocumentSelection;

    constructor();

    getRoot(name?: string): RootEditableElement;

    registerPostFixer(postFixer: (writer: Writer) => boolean): void;

  }

  export default Document;
}

declare module '@ckeditor/ckeditor5-engine/src/view/view' {
  import Document from '@ckeditor/ckeditor5-engine/src/view/document';
  import DomConverter from '@ckeditor/ckeditor5-engine/src/view/domconverter';
  import Observer from '@ckeditor/ckeditor5-engine/src/view/observer/observer';
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export class View extends ObservableMixin {
    readonly document: Document;
    readonly domConverter: DomConverter;
    readonly domRoots: Map<string, HTMLElement>;

    addObserver(Observer: any): Observer;

    attachDomRoot(domRoot: Element, name?: string): void;

    destroy(): void;

    disableObservers(): void;

    enableObservers(): void;

    focus(): void;

    getDomRoot(name?: string): Element;

    getObserver(Observer: any): Observer;

    render(): void;

    scrollToTheSelection(): void;
  }

  export default View;
}

declare module '@ckeditor/ckeditor5-engine/src/controller/editingcontroller' {
  import DowncastDispatcher from '@ckeditor/ckeditor5-engine/src/conversion/downcastdispatcher';
  import Mapper from '@ckeditor/ckeditor5-engine/src/conversion/mapper';
  import Model from '@ckeditor/ckeditor5-engine/src/model/model';
  import View from '@ckeditor/ckeditor5-engine/src/view/view';
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export class EditingController extends ObservableMixin {
    readonly downcastDispatcher: DowncastDispatcher;
    readonly mapper: Mapper;
    readonly model: Model;
    readonly view: View;

    constructor(model: Model);

    destroy(): void;
  }

  export default EditingController;
}

declare module '@ckeditor/ckeditor5-engine/src/controller/datacontroller' {
  export class DataController {
  }

  export default DataController;
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/conversion' {
  export class Conversion {
  }

  export default Conversion;
}

declare module '@ckeditor/ckeditor5-engine/src/model/writer' {
  import Batch from '@ckeditor/ckeditor5-engine/src/model/batch';
  import DocumentFragment from '@ckeditor/ckeditor5-engine/src/model/documentfragment';
  import DocumentSelection from '@ckeditor/ckeditor5-engine/src/model/documentselection';
  import Element from '@ckeditor/ckeditor5-engine/src/model/element';
  import Item from '@ckeditor/ckeditor5-engine/src/model/item';
  import { Marker } from '@ckeditor/ckeditor5-engine/src/model/markercollection';
  import Model from '@ckeditor/ckeditor5-engine/src/model/model';
  import Node from '@ckeditor/ckeditor5-engine/src/model/node';
  import Position from '@ckeditor/ckeditor5-engine/src/model/position';
  import Range from '@ckeditor/ckeditor5-engine/src/model/range';
  import Selection from '@ckeditor/ckeditor5-engine/src/model/selection';
  import Text from '@ckeditor/ckeditor5-engine/src/view/text';

  export class Writer {
    readonly batch: Batch;
    readonly model: Model;

    addMarker(
      name: string,
      options: {
        usingOperation: boolean,
        range: Range,
        affectsData?: boolean,
      },
    ): Marker;

    append(item: Item | DocumentFragment, parent: Element | DocumentFragment): void;

    appendElement(name: string, parent: Element | DocumentFragment): void;
    appendElement(name: string, attributes: object, parent: Element | DocumentFragment): void;

    appendText(text: string, parent: Element | DocumentFragment): void;
    appendText(text: string, attributes: object, parent: Element | DocumentFragment): void;

    clearAttributes(itemOrRange: Item | Range): void;

    createDocumentFragment(): DocumentFragment;

    createElement(name: string, attributes?: object): Element;

    createText(data: string, attributes?: object): Text;

    insert(
      item: Item | DocumentFragment,
      itemOrPosition: Item | Position,
      offset?: number | 'end' | 'before' | 'after',
    ): void;

    insertElement(
      name: string,
      itemOrPosition: Item | Position,
      offset?: number | 'end' | 'before' | 'after',
    ): void;
    insertElement(
      name: string,
      attributes: object,
      itemOrPosition: Item | Position,
      offset?: number | 'end' | 'before' | 'after',
    ): void;

    insertText(
      data: string,
      itemOrPosition: Item | Position,
      offset?: number | 'end' | 'before' | 'after',
    ): void;
    insertText(
      data: string,
      attributes: object,
      itemOrPosition: Item | Position,
      offset?: number | 'end' | 'before' | 'after',
    ): void;

    merge(position: Position): void;

    move(range: Range, itemOrPosition: Item | Position, offset?: number | 'end' | 'before' | 'after'): void;

    overrideSelectionGravity(): string;

    remove(itemOrRange: Item | Range): void;

    removeAttribute(key: string, itemOrRange: Item | Range): void;

    removeMarker(markerOrName: Marker | string): void;

    removeSelectionAttribute(keyOrIterableOfKeys: string | Iterator<string>): void;

    rename(element: Element, newName: string): void;

    restoreSelectionGravity(uid: string): void;

    setAttribute(key: string, value: any, itemOrRange: Item | Range): void;

    setAttributes(attributes: { [key: string]: any }, itemOrRange: Item | Range): void;

    setSelection(
      selectable: Selection | DocumentSelection | Position | Node | Iterator<Range> | Range,
      placeOrOffset?,
      options?: { backward: boolean },
    ): void;

    setSelectionAttribute(keyOrObjectOrIterable: string | { [key: string]: any } | Iterator<any>, value?: any): void;

    setSelectionFocus(itemOrPosition: Item | Position, offset?: number | 'end' | 'before' | 'after'): void;

    split(position: Position, limitElement?: Node): { position: Position, range: Range };

    unwrap(element: Element): void;

    updateMarker(
      markerOrName: string,
      options: { range?: Range, usingOperation?: boolean, affectsData?: boolean },
    ): void;

    wrap(range: Range, elementOrString: Element | string): void;
  }

  export default Writer;
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/delta' {
  export class Delta {
  }

  export default Delta;
}

declare module '@ckeditor/ckeditor5-engine/src/model/node' {
  import Document from '@ckeditor/ckeditor5-engine/src/model/document';
  import DocumentFragment from '@ckeditor/ckeditor5-engine/src/model/documentfragment';
  import Element from '@ckeditor/ckeditor5-engine/src/model/element';

  export class Node {
    readonly document: Document;
    readonly endOffset: number;
    readonly index: number;
    readonly nextSibling: Node;
    readonly offsetSize: number;
    readonly parent: Element | DocumentFragment;
    readonly previousSibling: Node;
    readonly root: Node;
    readonly startOffset: number;

    constructor(attrs?: object);

    getAncestors(options?: { includeSelf: boolean, parentFirst: boolean }): any[];

    getAttribute(key: string): any;

    getAttributeKeys(): Iterator<string>;

    getAttributes(): Iterator<any>;

    getCommonAncestor(node: Node, options?: { includeSelf: boolean }): Element | DocumentFragment;

    getPath(): number[];

    hasAttribute(key: string): boolean;

    is(type: 'element' | 'rootElement' | 'text' | 'textProxy' | 'documentFragment'): boolean;

    isAfter(node: Node): boolean;

    isBefore(node: Node): boolean;

    toJSON(): object;
  }

  export default Node;
}

declare module '@ckeditor/ckeditor5-engine/src/model/textproxy' {
  export class TextProxy {
  }

  export default TextProxy;
}

declare module '@ckeditor/ckeditor5-engine/src/model/item' {
  import Node from '@ckeditor/ckeditor5-engine/src/model/node';
  import TextProxy from '@ckeditor/ckeditor5-engine/src/model/textproxy';

  type Item =
    Node
    | TextProxy;
  export default Item;
}

declare module '@ckeditor/ckeditor5-engine/src/model/element' {
  import Node from '@ckeditor/ckeditor5-engine/src/model/node';

  export class Element extends Node {
    readonly childCount: number;
    readonly isEmpty: boolean;
    readonly maxOffset: number;
    readonly name: string;

    static fromJSON(json: object): Element;

    getChild(index: number): Node;

    getChildIndex(node: Node): number;

    getChildStartOffset(node: Node): number;

    getChildren(): Iterator<Node>;

    getNodeByPath(relativePath: number[]): Node;

    is(type: string, name?: string): boolean;

    offsetToIndex(offset: number): number;

    toJSON(): object;
  }

  export default Element;
}

declare module '@ckeditor/ckeditor5-engine/src/model/documentfragment' {
  export class DocumentFragment {
  }

  export default DocumentFragment;
}

declare module '@ckeditor/ckeditor5-engine/src/model/schema' {
  import DocumentSelection from '@ckeditor/ckeditor5-engine/src/model/documentselection';
  import Element from '@ckeditor/ckeditor5-engine/src/model/element';
  import Item from '@ckeditor/ckeditor5-engine/src/model/item';
  import Node from '@ckeditor/ckeditor5-engine/src/model/node';
  import Position from '@ckeditor/ckeditor5-engine/src/model/position';
  import Range from '@ckeditor/ckeditor5-engine/src/model/range';
  import Selection from '@ckeditor/ckeditor5-engine/src/model/selection';
  import Writer from '@ckeditor/ckeditor5-engine/src/model/writer';
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export interface SchemaItemDefinition {
    allowIn?: string | string[];
    allowAttributes?: string | string[];
    allowContentOf?: string | string[];
    allowWhere?: string | string[];
    allowAttributesOf?: string | string[];
    inheritTypesFrom?: string | string[];
    inheritAllFrom?: string;
    isBlock?: boolean;
    isLimit?: boolean;
    isObject?: boolean;
  }

  export interface SchemaCompiledItemDefinition {
    name: string;
    isBlock: boolean;
    isLimit: boolean;
    isObject: boolean;
    allowIn: string[];
    allowAttributes: string[];
  }

  export interface SchemaContextItem {
    name: string;

    getAttributeKeys(): Iterator<string>;

    getAttribute(keyName: string): any;
  }

  export type SchemaContextDefinition =
    Node
    | Position
    | SchemaContext
    | string
    | Array<string | Node>;

  export class SchemaContext {

  }

  export class Schema extends ObservableMixin {
    constructor();

    addAttributeCheck(callback: (context: SchemaContext, attributeName: string) => boolean): void;

    addChildCheck(callback: (context: SchemaContext, childDefinition: SchemaCompiledItemDefinition) => boolean): void;

    checkAttribute(context: SchemaContextDefinition, attributeName: string): boolean;

    checkAttributeInSelection(selection: Selection | DocumentSelection, attribute: string): boolean;

    checkChild(context: SchemaContextDefinition, def: Node | string): boolean;

    checkMerge(positionOrBaseElement: Position | Element, elementToMerge: Element): boolean;

    extend(itemName: string, definition: SchemaItemDefinition): void;

    findAllowedParent(): Element;

    getDefinition(item: Item | SchemaContextItem | string): SchemaCompiledItemDefinition;

    getDefinitions(): { [key: string]: SchemaCompiledItemDefinition };

    getLimitElement(selectionOrRangeOrPosition: Selection | DocumentSelection | Range | Position): Element;

    getNearestSelectionRange(position: Position, direction?: 'both' | 'forward' | 'backward'): Range;

    getValidRanges(ranges: Range[], attribute: string): Range[];

    isBlock(item: Item | SchemaContextItem | string): boolean;

    isLimit(item: Item | SchemaContextItem | string): boolean;

    isObject(item: Item | SchemaContextItem | string): boolean;

    isRegistered(item: Item | SchemaContextItem | string): boolean;

    register(itemName: string, definition: SchemaItemDefinition): void;

    removeDisallowedAttributes(nodes: Iterator<Node>, writer: Writer): void;
  }

  export default Schema;
}

declare module '@ckeditor/ckeditor5-engine/src/model/batch' {
  export class Batch {
  }

  export default Batch;
}

declare module '@ckeditor/ckeditor5-engine/src/model/selection' {
  export class Selection {
  }

  export default Selection;
}

declare module '@ckeditor/ckeditor5-engine/src/model/documentselection' {
  import Document from '@ckeditor/ckeditor5-engine/src/model/document';
  import Element from '@ckeditor/ckeditor5-engine/src/model/element';
  import Position from '@ckeditor/ckeditor5-engine/src/model/position';
  import Range from '@ckeditor/ckeditor5-engine/src/model/range';

  export class DocumentSelection {
    readonly anchor: Position;
    readonly focus: Position;
    readonly hasOwnRange: boolean;
    readonly isBackward: boolean;
    readonly isCollapsed: boolean;
    readonly isGravityOverridden: boolean;
    readonly rangeCount: number;

    constructor(doc: Document);

    containsEntireContent(element?: Element): boolean;

    destroy(): void;

    getAttribute(key: string): any[];

    getAttributeKeys(): Iterator<string>;

    getAttributes(): Iterator<any>;

    getFirstPosition(): Position;

    getFirstRange(): Range;

    getLastPosition(): Position;

    getLastRange(): Range;

    getRanges(): Iterator<Range>;

    getSelectedBlocks(): Iterator<Element>;

    getSelectedElement(): Element;

    hasAttribute(key: string): boolean;
  }

  export default DocumentSelection;
}

declare module '@ckeditor/ckeditor5-engine/src/model/history' {
  export class History {
  }

  export default History;
}

declare module '@ckeditor/ckeditor5-engine/src/model/rootelement' {
  export class RootElement {
  }

  export default RootElement;
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/operation' {
  export class Operation {
  }

  export default Operation;
}

declare module '@ckeditor/ckeditor5-engine/src/model/document' {
  import Differ from '@ckeditor/ckeditor5-engine/src/model/differ';
  import DocumentSelection from '@ckeditor/ckeditor5-engine/src/model/documentselection';
  import History from '@ckeditor/ckeditor5-engine/src/model/history';
  import Model from '@ckeditor/ckeditor5-engine/src/model/model';
  import RootElement from '@ckeditor/ckeditor5-engine/src/model/rootelement';
  import Collection from '@ckeditor/ckeditor5-utils/src/collection';
  import EmitterMixin from '@ckeditor/ckeditor5-utils/src/emittermixin';

  export class Document extends EmitterMixin {
    readonly differ: Differ;
    readonly graveyard: RootElement;
    readonly history: History;
    readonly model: Model;
    readonly roots: Collection<RootElement>;
    readonly selection: DocumentSelection;
    readonly version: number;

    constructor();

    createRoot(elementName?: string, rootName?: string): RootElement;

    destroy(): void;

    getRoot(name?: string): RootElement;

    getRootNames(): string[];

    registerPostFixer(postFixer: (...args: any[]) => any): void;

    toJSON(): object;
  }

  export default Document;
}

declare module '@ckeditor/ckeditor5-engine/src/model/differ' {
  import MarkerCollection from '@ckeditor/ckeditor5-engine/src/model/markercollection';
  import Operation from '@ckeditor/ckeditor5-engine/src/model/operation/operation';
  import Range from '@ckeditor/ckeditor5-engine/src/model/range';

  export class Differ {
    readonly isEmpty: boolean;

    constructor(markerCollection: MarkerCollection);

    bufferMarkerChange(
      markerName: string,
      oldRange: Range | null,
      newRange: Range | null,
      affectsData: boolean,
    ): void;

    bufferOperation(operation: Operation): void;

    getChanges(options: { includeChangesInGraveyard?: boolean }): object[];

    getMarkersToAdd(): object[];

    getMarkersToRemove(): object[];

    hasDataChanges(): boolean;

    reset(): void;
  }

  export default Differ;
}

declare module '@ckeditor/ckeditor5-engine/src/model/position' {
  import Node from '@ckeditor/ckeditor5-engine/src/model/node';

  export class Position {
    readonly index: number;
    readonly isAtEnd: boolean;
    readonly isAtStart: boolean;
    readonly nodeAfter: Node | null;
  }

  export default Position;
}

declare module '@ckeditor/ckeditor5-engine/src/model/range' {
  export class Range {
  }

  export default Range;
}

declare module '@ckeditor/ckeditor5-engine/src/model/liverange' {
  import Range from '@ckeditor/ckeditor5-engine/src/model/range';

  export class LiveRange extends Range {
  }

  export default LiveRange;
}

declare module '@ckeditor/ckeditor5-engine/src/model/markercollection' {
  export class Marker {
    affectsData: boolean;
    managedUsingOperations: boolean;
    name: string;

    constructor(name: string, liveRange, managedUsingOperations, affectsData);
  }

  export class MarkerCollection {
  }

  export default MarkerCollection;
}

declare module '@ckeditor/ckeditor5-engine/src/model/model' {
  import Batch from '@ckeditor/ckeditor5-engine/src/model/batch';
  import Delta from '@ckeditor/ckeditor5-engine/src/model/delta/delta';
  import Document from '@ckeditor/ckeditor5-engine/src/model/document';
  import DocumentFragment from '@ckeditor/ckeditor5-engine/src/model/documentfragment';
  import DocumentSelection from '@ckeditor/ckeditor5-engine/src/model/documentselection';
  import Element from '@ckeditor/ckeditor5-engine/src/model/element';
  import Item from '@ckeditor/ckeditor5-engine/src/model/item';
  import MarkerCollection from '@ckeditor/ckeditor5-engine/src/model/markercollection';
  import Operation from '@ckeditor/ckeditor5-engine/src/model/operation/operation';
  import Range from '@ckeditor/ckeditor5-engine/src/model/range';
  import Schema from '@ckeditor/ckeditor5-engine/src/model/schema';
  import Selection from '@ckeditor/ckeditor5-engine/src/model/selection';
  import Writer from '@ckeditor/ckeditor5-engine/src/model/writer';
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export class Model extends ObservableMixin {
    readonly document: Document;
    readonly markers: MarkerCollection;
    readonly schema: Schema;

    applyOperation(operation: Operation): void;

    change<T>(callback: (writer: Writer) => T): T;

    deleteContent(
      selection: Selection | DocumentSelection,
      batch: Batch,
      options?: {
        leaveUnmerged?: boolean,
        doNotResetEntireContent?: boolean,
      },
    ): void;

    destroy(): void;

    enqueueChange(batchOrType: Batch | 'transparent' | 'default', callback: (...args: any[]) => any): void;

    getSelectedContent(selection: Selection | DocumentSelection): DocumentFragment;

    hasContent(rangeOrElement: Range | Element): boolean;

    insertContent(content: DocumentFragment | Item, selection: Selection | DocumentSelection): void;

    modifySelection(
      selection: Selection | DocumentSelection,
      options?: {
        direction: 'forward' | 'backward',
        unit: 'character' | 'codePoint' | 'word',
      },
    ): void;

    transformDeltas(
      deltasA: Delta[],
      deltasB: Delta[],
      useContext: boolean,
    ): { deltasA: Delta[], deltasB: Delta[] };
  }

  export default Model;
}
