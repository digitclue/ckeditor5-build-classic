// Type definitions for @ckeditor/ckeditor5-engine 10.1
// Project: https://github.com/ckeditor/ckeditor5
// Definitions by: Kostiantyn Dyha <https://github.com/digitclue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare namespace ckeditor {

  namespace engine {

    namespace controller {

      export class DataController {
      }

      export class EditingController extends utils.ObservableMixin {
        readonly downcastDispatcher: conversion.DowncastDispatcher;
        readonly mapper: conversion.Mapper;
        readonly model: model.Model;
        readonly view: view.View;

        constructor(model: model.Model);

        destroy(): void;
      }

    }

    namespace conversion {

      export class Conversion {
        constructor();

        attributeToAttribute(definition: {
          model: string | {
            key: string,
            values?: string[],
            name?: string,
          },
          view: string | {
            [key: string]: string | {
              key: string,
              value: string | string[] | { [key: string]: string },
              name?: string,
            },
          },
          upcastAlso?: view.MatcherPattern | view.MatcherPattern[],
        }): void;

        attributeToElement(definition: ConverterDefinition): void;

        elementToElement(definition: ConverterDefinition): void;

        for(groupName: string): AddRecursive;

        register(groupName: string, dispatchers: Array<DowncastDispatcher | UpcastDispatcher>): void;
      }

      export interface ConverterDefinition {
        converterPriority?: ckeditor.utils.PriorityString;
        model: any;
        upcastAlso?: view.MatcherPattern | view.MatcherPattern[];
        view: view.ElementDefinition
      }

      interface AddRecursive {
        add(converter: (...args: any[]) => void): AddRecursive;
      }

      export interface HighlightDescriptor {
        attributes?: { [key: string]: string };
        classes?: string | string[];
        id?: string;
        priority?: number;
      }

      export function changeAttribute(
        attributeCreator: (value: any, data: any) => { key: string, value: any },
      ): (evt: ckeditor.utils.EventInfo, data: object, conversionApi: any) => void;

      export function createViewElementFromHighlightDescriptor(descriptor: HighlightDescriptor): view.AttributeElement;

      export function downcastAttributeToAttribute(config: {
        model: string | {
          key: string,
          values: string[],
          name?: string,
        },
        view: string | {
          key: string,
          value: any;
        } | {
          [key: string]: {
            key: string,
            value: any;
          }
        } | ((modelAttributeValue: any) => {
          key: string,
          value: any;
        }),
        converterPriority?: ckeditor.utils.PriorityString,
      }): () => void;

      export function downcastAttributeToElement(config: {
        model: any,
        view: any,
        converterPriority?: ckeditor.utils.PriorityString,
      }): () => void ;

      export function downcastElementToElement(config: {
        model: string,
        view: view.ElementDefinition | ((
          modelElement: model.Element,
          viewWriter: view.Writer,
        ) => view.ContainerElement),
      }): () => void ;

      export function downcastMarkerToElement(config: {
        model,
        view,
        converterPriority?,
      }): () => void ;

      export function downcastMarkerToHighlight(config: {
        model,
        view,
        converterPriority?,
      }): () => void ;

      export function highlightElement(highlightDescriptor: HighlightDescriptor | (() => void)): () => void;

      export function highlightText(highlightDescriptor: HighlightDescriptor | (() => void)): () => void;

      export function insertElement(elementCreator: () => void): () => void;

      export function insertText(): () => void;

      export function insertUIElement(elementCreator: view.UIElement | (() => void)): () => void;

      export function remove(): () => void;

      export function removeHighlight(highlightDescriptor: HighlightDescriptor | (() => void)): () => void;

      export function removeUIElement(): () => void;

      export function wrap(elementCreator: () => void): () => void;


      export class DowncastDispatcher {
      }

      export class Mapper {
      }

      export class ModelConsumable {

      }

      export function convertText(): () => void;

      export function convertToModelFragment(): () => void;

      export function upcastAttributeToAttribute(config: {
        view,
        model,
        converterPriority?,
      }): () => void;

      export function upcastElementToAttribute(config: {
        view,
        model,
        converterPriority?,
      }): () => void;

      export function upcastElementToElement(config: {
        view: view.MatcherPattern,
        model: string | model.Element | ((viewElement: view.Element, modelWriter: model.Writer) => model.Element),
        converterPriority?: ckeditor.utils.PriorityString,
      }): () => void;

      export function upcastElementToMarker(config: {
        view,
        model,
        converterPriority?,
      }): () => void;


      export class UpcastDispatcher {

      }

      export interface ViewConversionApi {

      }

      export class ViewConsumable {

      }

    }

    namespace dataprocessor {

    }

    namespace devutils {

    }

    namespace model {

      namespace delta {
        export class Delta {
        }
      }

      namespace operation {
        export class Operation {
        }
      }

      namespace utils {

      }

      export class Batch {
      }

      export class Differ {
        readonly isEmpty: boolean;

        constructor(markerCollection: MarkerCollection);

        bufferMarkerChange(
          markerName: string,
          oldRange: Range | null,
          newRange: Range | null,
          affectsData: boolean,
        ): void;

        bufferOperation(operation: model.operation.Operation): void;

        getChanges(options: { includeChangesInGraveyard?: boolean }): object[];

        getMarkersToAdd(): object[];

        getMarkersToRemove(): object[];

        hasDataChanges(): boolean;

        reset(): void;
      }

      export class Document extends ckeditor.utils.EmitterMixin {
        readonly differ: Differ;
        readonly graveyard: RootElement;
        readonly history: History;
        readonly model: Model;
        readonly roots: ckeditor.utils.Collection<RootElement>;
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

      export class DocumentFragment {
      }

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

        getSelectedBlocks(): Iterable<Element>;

        getSelectedElement(): Element;

        hasAttribute(key: string): boolean;
      }

      export class Element extends Node {
        readonly childCount: number;
        readonly isEmpty: boolean;
        readonly maxOffset: number;
        readonly name: string;

        static fromJSON(json: object): Element;

        getChild(index: number): Node;

        getChildIndex(node: Node): number;

        getChildStartOffset(node: Node): number;

        getChildren(): Iterable<Node>;

        getNodeByPath(relativePath: number[]): Node;

        is(type: string, name?: string): boolean;

        offsetToIndex(offset: number): number;

        toJSON(): object;
      }

      export class History {
      }

      export type Item =
        Node
        | TextProxy;

      export class LiveRange extends Range {
      }

      export class Marker {
        affectsData: boolean;
        managedUsingOperations: boolean;
        name: string;

        constructor(name: string, liveRange, managedUsingOperations, affectsData);
      }

      export class MarkerCollection {
      }

      export class Model extends ckeditor.utils.ObservableMixin {
        readonly document: Document;
        readonly markers: MarkerCollection;
        readonly schema: Schema;

        applyOperation(operation: model.operation.Operation): void;

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
          deltasA: delta.Delta[],
          deltasB: delta.Delta[],
          useContext: boolean,
        ): { deltasA: delta.Delta[], deltasB: delta.Delta[] };
      }

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

        constructor(attrs?: object | string | Iterable<any>);

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

      export type PositionRelation = string;

      export class Position {
        readonly index: number;
        readonly isAtEnd: boolean;
        readonly isAtStart: boolean;
        readonly nodeAfter: Node;
        readonly nodeBefore: Node;
        offset: number;
        readonly parent: Element;
        readonly path: number[];
        readonly root: Element | DocumentFragment;
        readonly textNode: Text;

        static createAfter(item: Item): Position;

        static createAt(itemOrPosition: Item | Position, offset?: number | 'end' | 'before' | 'after'): Position;

        static createBefore(item: Item): Position;

        static createFromParentAndOffset(parent: Element | DocumentFragment, offset: number): Position;

        static createFromPosition(position: Position): Position;

        static fromJSON(json: object): Position;

        constructor(root: Element | DocumentFragment, path: number[]);

        compareWith(otherPosition: Position): PositionRelation;

        getAncestors(): Item[];

        getCommonAncestor(position: Position): Element | DocumentFragment;

        getCommonPath(position: Position): number[];

        getLastMatchingPosition(
          skip: (value: TreeWalkerValue) => boolean,
          options: {
            direction?: 'forward' | 'backward',
            boundaries?: Range,
            startPosition?: Position,
            singleCharacters?: boolean,
            shallow?: boolean,
            ignoreElementEnd?: boolean
          },
        ): Position;

        getParentPath(): number[];

        getShiftedBy(shift: number): Position;

        isAfter(otherPosition: Position): boolean;

        isBefore(otherPosition: Position): boolean;

        isEqual(otherPosition: Position): boolean;

        isTouching(otherPosition: Position): boolean;
      }

      export class Range {
        readonly end: Position;
        isCollapsed: boolean;
        isFlat: boolean;
        root: Element | DocumentFragment;
        start: Position;

        static createCollapsedAt(itemOrPosition: Item | Position, offset?: number | 'end' | 'before' | 'after'): Range;

        static createFromParentsAndOffsets(
          startElement: Element,
          startOffset: number,
          endElement: Element,
          endOffset: number,
        ): Range;

        static createFromPositionAndShift(position: Position, shift: number): Range;

        static createFromRange(range: Range): Range;

        static createFromRanges(ranges: Range[]): Range;

        static createIn(element: Element): Range;

        static createOn(item: Item): Range;

        static fromJSON(json: object, doc: Document): Range;

        constructor(start: Position, end?: Position);

        [Symbol.iterator]: Iterable<TreeWalkerValue>;

        containsItem(item: Item): boolean;

        containsPosition(position: Position): boolean;

        containsRange(otherRange: Range, loose?: boolean): boolean;

        getCommonAncestor(): Element | DocumentFragment;

        getDifference(otherRange: Range): Range[];

        getIntersection(otherRange: Range): Range;

        getMinimalFlatRanges(): Range[];

        getPositions(options: {
          direction?: 'forward' | 'backward',
          boundaries?: Range,
          startPosition?: Position,
          singleCharacters?: boolean,
          shallow?: boolean,
          ignoreElementEnd?: boolean
        }): Iterable<Position>;

        getTransformedByDelta(delta: delta.Delta): Range[];

        getTransformedByDeltas(deltas: Iterable<delta.Delta>): Range[];

        getWalker(options: {
          direction?: 'forward' | 'backward',
          startPosition?: Position,
          singleCharacters?: boolean,
          shallow?: boolean,
          ignoreElementEnd?: boolean
        }): TreeWalker;

        isEqual(otherRange: Range): boolean;

        isIntersecting(otherRange: Range): boolean;
      }

      export class RootElement {
      }

      export class Schema extends ckeditor.utils.ObservableMixin {
        constructor();

        addAttributeCheck(callback: (context: SchemaContext, attributeName: string) => boolean): void;

        addChildCheck(callback: (
          context: SchemaContext,
          childDefinition: SchemaCompiledItemDefinition,
        ) => boolean): void;

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

      export class SchemaContext {

      }

      export interface SchemaCompiledItemDefinition {
        name: string;
        isBlock: boolean;
        isLimit: boolean;
        isObject: boolean;
        allowIn: string[];
        allowAttributes: string[];
      }

      export type SchemaContextDefinition =
        Node
        | Position
        | SchemaContext
        | string
        | Array<string | Node>;

      export interface SchemaContextItem {
        name: string;

        getAttributeKeys(): Iterator<string>;

        getAttribute(keyName: string): any;
      }

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

      export class Selection {
      }

      export class Text {
      }

      export class TextProxy {
      }

      export class TreeWalker {

      }

      export interface TreeWalkerValue {
        item: Item;
        length: number;
        nextPosition: Position;
        previousPosition: Position;
        type: TreeWalkerValueType;
      }

      export type TreeWalkerValueType =
        'elementStart'
        | 'elementEnd'
        | 'character'
        | 'text';

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

        setSelectionAttribute(
          keyOrObjectOrIterable: string | { [key: string]: any } | Iterator<any>,
          value?: any,
        ): void;

        setSelectionFocus(itemOrPosition: Item | Position, offset?: number | 'end' | 'before' | 'after'): void;

        split(position: Position, limitElement?: Node): { position: Position, range: Range };

        unwrap(element: Element): void;

        updateMarker(
          markerOrName: string,
          options: { range?: Range, usingOperation?: boolean, affectsData?: boolean },
        ): void;

        wrap(range: Range, elementOrString: Element | string): void;
      }

    }

    namespace utils {

    }

    namespace view {

      namespace observer {
        export class Observer {
        }
      }

      export class AttributeElement extends Element {
        static DEFAULT_PRIORITY: number;

        readonly id: string | number;
        readonly priority: number;

        getElementsWithSameId(): Set<AttributeElement>;

        getFillerOffset(): number;

        isSimilar(otherElement: Element): boolean;
      }

      export class ContainerElement extends Element {
        getFillerOffset(): number;
      }

      export class Document extends ckeditor.utils.ObservableMixin {
        readonly isComposing: boolean;
        readonly isFocused: boolean;
        readonly isReadOnly: boolean;
        readonly roots: ckeditor.utils.Collection<any>;
        readonly selection: DocumentSelection;

        constructor();

        getRoot(name?: string): RootEditableElement;

        registerPostFixer(postFixer: (writer: Writer) => boolean): void;

      }

      export class DocumentFragment {

      }

      export class DocumentSelection {
        anchor: Position;
        editableElement: EditableElement;
        fakeSelectionLabel: any;
        focus: Position;
        isBackward: boolean;
        isCollapsed: boolean;
        isFake: boolean;
        rangeCount: number;

        constructor(
          selectable?: Selection | Position | Iterable<Range> | Range | Item,
          placeOrOffset?: number | 'before' | 'end' | 'after' | 'on' | 'in',
          options?: {
            backward?: boolean,
            fake?: boolean,
            label?: string,
          },
        );

        getFirstPosition(): Position;

        getFirstRange(): Range;

        getLastPosition(): Position;

        getLastRange(): Range;

        getRanges(): Iterable<Range>;

        getSelectedElement(): Element;

        isEqual(otherSelection: Selection | DocumentSelection): boolean;

        isSimilar(otherSelection: Selection | DocumentSelection): boolean;
      }

      export class DomConverter {
        readonly blockElements: string[];
        readonly blockFiller: any;
        readonly preElements: string[];

        constructor(options: { blockFiller?: any; });

        _checkShouldLeftTrimDomText(prevNode: any): void;

        _checkShouldRightTrimDomText(node: any, prevNode: any): void;

        _getTouchingViewTextNode(node: Text, getNext: boolean): Text;

        bindDocumentFragments(domFragment: any, viewFragment: DocumentFragment): void;

        bindElements(domElement: HTMLElement, viewElement: Element): void;

        bindFakeSelection(domElement: HTMLElement, viewDocumentSelection: DocumentSelection): void

        domChildrenToView(domElement: HTMLElement, options: object): Iterator<Node>;

        domPositionToView(domParent: any, domOffset: number): Position;

        domRangeToView(domRange: any): Range;

        domSelectionToView(domSelection: any): Selection;

        domToView(domNode: any, options ?: {
          bind?: boolean,
          withChildren?: boolean,
          keepOriginalCase?: boolean
        }): Node | DocumentFragment;

        fakeSelectionToView(domElement: HTMLElement): Selection;

        findCorrespondingDomText(viewText: Text): any;

        findCorrespondingViewText(domText: any): Text;

        focus(viewEditable: EditableElement): void;

        getParentUIElement(domNode: any): UIElement;

        isComment(node: any): boolean;

        isDocumentFragment(node: any): boolean;

        isDomSelectionBackward(DOM: any): boolean;

        isDomSelectionCorrect(domSelection: any): boolean;

        isElement(node: any): boolean;

        mapDomToView(domElementOrDocumentFragment: any): Element | DocumentFragment;

        mapViewToDom(viewNode: Element | DocumentFragment): any;

        unbindDomElement(domElement: HTMLElement): void;

        viewChildrenToDom(
          viewElement: Element | DocumentFragment,
          domDocument: any,
          options: {
            bind: boolean,
            withChildren: boolean,
          },
        ): Iterator<any>;

        viewPositionToDom(viewPosition: Position): object;

        viewRangeToDom(viewRange: Range): Range;

        viewToDom(
          viewNode: Node | DocumentFragment,
          domDocument: Document,
          options?: {
            bind?: boolean,
            withChildren?: boolean,
          },
        ): any;
      }

      export class EditableElement {
      }

      export class Element extends Node {
        readonly childCount: number;
        readonly isEmpty: boolean;
        readonly name: string;

        findAncestor(patterns: { [key: string]: any } | string | RegExp | ((...args) => any)): Element;

        getAttribute(key: string): string;

        getAttributeKeys(): Iterable<string>;

        getAttributes(): Iterable<any>;

        getChild(index: number): Node;

        getChildIndex(node: Node): number;

        getChildren(): Iterable<Node>;

        getClassNames(): Iterable<string>;

        getCustomProperties(): Iterable<any>;

        getCustomProperty(key: string | Symbol): Iterable<any>;

        getFillerOffset();

        getIdentity(): string;

        getStyle(property: string): string;

        getStyleNames(): Iterable<string>;

        hasAttribute(key: string): boolean;

        hasClass(...className: string[]): boolean;

        hasStyle(...property: string[]): boolean;

        is(type: string, name?: string): boolean;

        isAfter(node: Node): boolean;

        isSimilar(otherElement: Element): boolean;
      }

      export type ElementDefinition =
        string
        | {
        attributes?: { [key: string]: string },
        classes?: string | string[],
        name?: string,
        priority?: number,
        styles?: { [key: string]: string },
      };

      export class EmptyElement {

      }

      export type Item =
        Node
        | TextProxy;

      export type MatcherPattern =
        string
        | RegExp
        | {
        attributes?: { [key: string]: string | RegExp },
        classes?: string | RegExp | Array<string | RegExp>,
        name?: string | RegExp,
        styles?: { [key: string]: string | RegExp },
      }
        | ((element: Element) => {
        name?: boolean,
        attributes?: string[],
        classes?: string[],
        styles?: string[]
      });

      export class Node {
        readonly document: Document;
        readonly index: number;
        readonly nextSibling: Node;
        readonly parent: Element | DocumentFragment;
      }

      export class Position {
        editableElement: EditableElement;
        readonly isAtEnd: boolean;
        readonly isAtStart: boolean;
        readonly nodeAfter: Node;
        readonly nodeBefore: Node;
        readonly offset: number;
        readonly parent: Node | DocumentFragment;
        readonly root: Node | DocumentFragment;

        static createAfter(item: Item): Position;

        static createAt(
          itemOrPosition: Item | Position,
          offset?: number | 'end' | 'before' | 'after',
        ): Position;

        static createBefore(item: Item): Position;

        static createFromPosition(position: Position): Position;

        constructor(parent: Node | DocumentFragment, offset: number);

        compareWith(otherPosition: Position): PositionRelation;

        getAncestors(): any[];

        getCommonAncestor(position: Position): Node | DocumentFragment;

        getLastMatchingPosition(
          skip: (value: TreeWalkerValue) => boolean,
          options?: {
            boundaries?: Range,
            startPosition?: Position,
            direction?: 'backward' | 'forward',
            singleCharacters?: boolean,
            shallow?: boolean,
            ignoreElementEnd?: boolean,
          },
        ): Position;

        getShiftedBy(shift: number): Position;

        isAfter(otherPosition: Position): boolean;

        isBefore(otherPosition: Position): boolean;

        isEqual(otherPosition: Position): boolean;
      }

      export type PositionRelation =
        'before'
        | 'after'
        | 'same'
        | 'different';

      export class Range {

      }

      export class RootEditableElement {
      }

      export class Selection {

      }

      export class Text {
      }

      export class TextProxy {

      }

      export class TreeWalker {
        readonly boundaries: Range;
        readonly direction: 'backward' | 'forward';
        readonly ignoreElementEnd: boolean;
        readonly position: Position;
        readonly shallow: boolean;
        readonly singleCharacters: boolean;

        constructor(options?: {
          boundaries?: Range,
          startPosition?: Position,
          direction?: 'backward' | 'forward',
          singleCharacters?: boolean,
          shallow?: boolean,
          ignoreElementEnd?: boolean,
        });

        [Symbol.iterator](): Iterable<TreeWalkerValue>;

        next(): TreeWalkerValue;

        skip(skip: (value: TreeWalkerValue) => boolean): void;
      }

      export interface TreeWalkerValue {
        item: Item;
        length: number;
        nextPosition: Position;
        previousPosition: Position;
        type: TreeWalkerValueType;
      }

      export type TreeWalkerValueType =
        'elementStart'
        | 'elementEnd'
        | 'text';

      export class UIElement {
      }

      export class View extends ckeditor.utils.ObservableMixin {
        readonly document: Document;
        readonly domConverter: DomConverter;
        readonly domRoots: Map<string, HTMLElement>;

        addObserver(Observer: any): observer.Observer;

        attachDomRoot(domRoot: any, name?: string): void;

        destroy(): void;

        disableObservers(): void;

        enableObservers(): void;

        focus(): void;

        getDomRoot(name?: string): any;

        getObserver(Observer: any): observer.Observer;

        render(): void;

        scrollToTheSelection(): void;
      }

      export class Writer {
        readonly document: Document;

        addClass(className: string | string[], element: Element): void;

        breakAttributes(positionOrRange: Position | Range): Position | Range;

        breakContainer(position: Position): Position;

        clear(range: Range, element: Element): void;

        createAttributeElement(
          name: string,
          attributes?: { [key: string]: any },
          options?: { priority?: number, id?: number | string },
        ): AttributeElement;

        createContainerElement(name: string, attributes?: { [key: string]: any }): ContainerElement;

        createEditableElement(name: string, attributes?: { [key: string]: any }): EditableElement;

        createEmptyElement(name: string, attributes?: { [key: string]: any }): EmptyElement;

        createText(data: string): Text;

        createUIElement(
          name: string,
          attributes?: { [key: string]: any },
          renderFunction?: (domDocument) => any,
        ): UIElement;

        insert(
          position: Position,
          nodes: Text | AttributeElement | ContainerElement | EmptyElement | UIElement | Iterable<Text | AttributeElement | ContainerElement | EmptyElement | UIElement>,
        ): Range;

        mergeAttributes(position: Position): Position;

        mergeContainers(position: Position): Position;

        move(sourceRange: Range, targetPosition: Position): Range;

        remove(range: Range): DocumentFragment;

        removeAttribute(key: string, element: Element): void;

        removeClass(className: string | string[], element: Element): void;

        removeCustomProperty(key: string | Symbol, element: Element): boolean;

        removeStyle(property: string | string[], element: Element): void;

        rename(viewElement: ContainerElement, newName: string): void;

        setAttribute(key: string, value: string, element: Element): void;

        setCustomProperty(key: string | Symbol, value: any, element: Element): void;

        setSelection(
          selectable: Selection | Position | Iterable<Range> | Range | Item,
          placeOrOffset?: number | 'before' | 'end' | 'after' | 'on' | 'in',
          options?: {
            backward?: boolean,
            fake?: boolean,
            label?: string,
          },
        ): void;

        setSelectionFocus(itemOrPosition: Item | Position, offset?: number | 'end' | 'before' | 'after'): void;

        setStyle(
          property: string,
          value: string,
          element: Element,
        ): void;

        setStyle(
          property: { [key: string]: string },
          element: Element,
        ): void;

        unwrap(range: Range, attribute: AttributeElement): void;

        wrap(range: Range, attribute: AttributeElement): void;
      }

    }

  }
}

declare module '@ckeditor/ckeditor5-engine/src/controller/datacontroller' {
  export default ckeditor.engine.controller.DataController;
}

declare module '@ckeditor/ckeditor5-engine/src/controller/editingcontroller' {
  export default ckeditor.engine.controller.EditingController;
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/conversion' {
  export interface ConverterDefinition extends ckeditor.engine.conversion.ConverterDefinition {
  }

  export default ckeditor.engine.conversion.Conversion;
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters' {
  export const changeAttribute: typeof ckeditor.engine.conversion.changeAttribute;
  export const createViewElementFromHighlightDescriptor: typeof ckeditor.engine.conversion.createViewElementFromHighlightDescriptor;
  export const downcastAttributeToAttribute: typeof ckeditor.engine.conversion.downcastAttributeToAttribute;
  export const downcastAttributeToElement: typeof ckeditor.engine.conversion.downcastAttributeToElement;
  export const downcastElementToElement: typeof ckeditor.engine.conversion.downcastElementToElement;
  export const downcastMarkerToElement: typeof ckeditor.engine.conversion.downcastMarkerToElement;
  export const downcastMarkerToHighlight: typeof ckeditor.engine.conversion.downcastMarkerToHighlight;
  export const highlightElement: typeof ckeditor.engine.conversion.highlightElement;
  export const highlightText: typeof ckeditor.engine.conversion.highlightText;
  export const insertElement: typeof ckeditor.engine.conversion.insertElement;
  export const insertText: typeof ckeditor.engine.conversion.insertText;
  export const insertUIElement: typeof ckeditor.engine.conversion.insertUIElement;
  export const remove: typeof ckeditor.engine.conversion.remove;
  export const removeHighlight: typeof ckeditor.engine.conversion.removeHighlight;
  export const removeUIElement: typeof ckeditor.engine.conversion.removeUIElement;
  export const wrap: typeof ckeditor.engine.conversion.wrap;

  export interface HighlightDescriptor extends ckeditor.engine.conversion.HighlightDescriptor {
  }
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/downcast-selection-converters' {
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/downcastdispatcher' {
  export default ckeditor.engine.conversion.DowncastDispatcher;
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/mapper' {
  export default ckeditor.engine.conversion.Mapper;
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/modelconsumable' {
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters' {
  export const convertText: typeof ckeditor.engine.conversion.convertText;
  export const convertToModelFragment: typeof ckeditor.engine.conversion.convertToModelFragment;
  export const upcastAttributeToAttribute: typeof ckeditor.engine.conversion.upcastAttributeToAttribute;
  export const upcastElementToAttribute: typeof ckeditor.engine.conversion.upcastElementToAttribute;
  export const upcastElementToElement: typeof ckeditor.engine.conversion.upcastElementToElement;
  export const upcastElementToMarker: typeof ckeditor.engine.conversion.upcastElementToMarker;
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/upcast-selection-converters' {
}

declare module '@ckeditor/ckeditor5-engine/src/conversion/upcastdispatcher' {

}

declare module '@ckeditor/ckeditor5-engine/src/conversion/viewconsumable' {
}

declare module '@ckeditor/ckeditor5-engine/src/dataprocessor/basichtmlwriter' {
}

declare module '@ckeditor/ckeditor5-engine/src/dataprocessor/dataprocessor' {
}

declare module '@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor' {
}

declare module '@ckeditor/ckeditor5-engine/src/dataprocessor/htmlwriter' {
}

declare module '@ckeditor/ckeditor5-engine/src/dataprocessor/xmldataprocessor' {
}

declare module '@ckeditor/ckeditor5-engine/src/dev-utils/deltareplayer' {
}

declare module '@ckeditor/ckeditor5-engine/src/dev-utils/enableenginedebug' {
}

declare module '@ckeditor/ckeditor5-engine/src/dev-utils/model' {
}

declare module '@ckeditor/ckeditor5-engine/src/dev-utils/view' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/attributedelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/basic-deltas' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/basic-transformations' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/delta' {
  export default ckeditor.engine.model.delta.Delta;
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/deltafactory' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/insertdelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/markerdelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/mergedelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/movedelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/removedelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/renamedelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/rootattributedelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/splitdelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/unwrapdelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/weakinsertdelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/delta/wrapdelta' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/attributeoperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/detachoperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/insertoperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/markeroperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/moveoperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/nooperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/operation' {
  export default ckeditor.engine.model.operation.Operation;
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/operationfactory' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/reinsertoperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/removeoperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/renameoperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/rootattributeoperation' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/transform' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/operation/utils' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/utils/deletecontent' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/utils/getselectedcontent' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/utils/insertcontent' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/utils/modifyselection' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/utils/selection-post-fixer' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/batch' {
  export default ckeditor.engine.model.Batch;
}

declare module '@ckeditor/ckeditor5-engine/src/model/differ' {
  export default ckeditor.engine.model.Differ;
}

declare module '@ckeditor/ckeditor5-engine/src/model/document' {
  export default ckeditor.engine.model.Document;
}

declare module '@ckeditor/ckeditor5-engine/src/model/documentfragment' {
  export default ckeditor.engine.model.DocumentFragment;
}

declare module '@ckeditor/ckeditor5-engine/src/model/documentselection' {
  export default ckeditor.engine.model.DocumentSelection;
}

declare module '@ckeditor/ckeditor5-engine/src/model/element' {
  export default ckeditor.engine.model.Element;
}

declare module '@ckeditor/ckeditor5-engine/src/model/history' {
  export default ckeditor.engine.model.History;
}

declare module '@ckeditor/ckeditor5-engine/src/model/item' {
  export type Item = ckeditor.engine.model.Item;
}

declare module '@ckeditor/ckeditor5-engine/src/model/liveposition' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/liverange' {
  export default ckeditor.engine.model.LiveRange;
}

declare module '@ckeditor/ckeditor5-engine/src/model/markercollection' {
  export default ckeditor.engine.model.MarkerCollection;
}

declare module '@ckeditor/ckeditor5-engine/src/model/model' {
  export default ckeditor.engine.model.Model;
}

declare module '@ckeditor/ckeditor5-engine/src/model/node' {
  export default ckeditor.engine.model.Node;
}

declare module '@ckeditor/ckeditor5-engine/src/model/nodelist' {
}

declare module '@ckeditor/ckeditor5-engine/src/model/position' {
  export default ckeditor.engine.model.Position;
}

declare module '@ckeditor/ckeditor5-engine/src/model/range' {
  export default ckeditor.engine.model.Range;
}

declare module '@ckeditor/ckeditor5-engine/src/model/rootelement' {
  export default ckeditor.engine.model.RootElement;
}

declare module '@ckeditor/ckeditor5-engine/src/model/schema' {
  export default ckeditor.engine.model.Schema;
}

declare module '@ckeditor/ckeditor5-engine/src/model/selection' {
  export default ckeditor.engine.model.Selection;
}

declare module '@ckeditor/ckeditor5-engine/src/model/text' {
  export default ckeditor.engine.model.Text;
}

declare module '@ckeditor/ckeditor5-engine/src/model/textproxy' {
  export default ckeditor.engine.model.TextProxy;
}

declare module '@ckeditor/ckeditor5-engine/src/model/treewalker' {
  export default ckeditor.engine.model.TreeWalker;
}

declare module '@ckeditor/ckeditor5-engine/src/model/writer' {
  export default ckeditor.engine.model.Writer;
}

declare module '@ckeditor/ckeditor5-engine/src/utils/bindtwostepcarettoattribute' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/compositionobserver' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/domeventdata' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/domeventobserver' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/fakeselectionobserver' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/focusobserver' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/keyobserver' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/mouseobserver' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/mutationobserver' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/observer' {
  export default ckeditor.engine.view.observer.Observer;
}

declare module '@ckeditor/ckeditor5-engine/src/view/observer/selectionobserver' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/attributeelement' {
  export default ckeditor.engine.view.AttributeElement;
}

declare module '@ckeditor/ckeditor5-engine/src/view/containerelement' {
  export default ckeditor.engine.view.ContainerElement;
}

declare module '@ckeditor/ckeditor5-engine/src/view/document' {
  export default ckeditor.engine.view.Document;
}

declare module '@ckeditor/ckeditor5-engine/src/view/documentfragment' {
  export default ckeditor.engine.view.DocumentFragment;
}

declare module '@ckeditor/ckeditor5-engine/src/view/documentselection' {
  export default ckeditor.engine.view.DocumentSelection;
}

declare module '@ckeditor/ckeditor5-engine/src/view/domconverter' {
  export default ckeditor.engine.view.DomConverter;
}

declare module '@ckeditor/ckeditor5-engine/src/view/editableelement' {
  export default ckeditor.engine.view.EditableElement;
}

declare module '@ckeditor/ckeditor5-engine/src/view/element' {
  export default ckeditor.engine.view.Element;
}

declare module '@ckeditor/ckeditor5-engine/src/view/elementdefinition' {
  export type ElementDefinition = ckeditor.engine.view.ElementDefinition;
}

declare module '@ckeditor/ckeditor5-engine/src/view/emptyelement' {
  export default ckeditor.engine.view.EmptyElement;
}

declare module '@ckeditor/ckeditor5-engine/src/view/filler' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/item' {
  export type Item = ckeditor.engine.view.Item;
}

declare module '@ckeditor/ckeditor5-engine/src/view/matcher' {

}

declare module '@ckeditor/ckeditor5-engine/src/view/node' {
  export default ckeditor.engine.view.Node;
}

declare module '@ckeditor/ckeditor5-engine/src/view/placeholder' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/position' {
  export default ckeditor.engine.view.Position;
}

declare module '@ckeditor/ckeditor5-engine/src/view/range' {
  export default ckeditor.engine.view.Range;
}

declare module '@ckeditor/ckeditor5-engine/src/view/renderer' {
}

declare module '@ckeditor/ckeditor5-engine/src/view/rooteditableelement' {
  export default ckeditor.engine.view.RootEditableElement;
}

declare module '@ckeditor/ckeditor5-engine/src/view/selection' {
  export default ckeditor.engine.view.Selection;
}

declare module '@ckeditor/ckeditor5-engine/src/view/text' {
  export default ckeditor.engine.view.Text;
}

declare module '@ckeditor/ckeditor5-engine/src/view/textproxy' {
  export default ckeditor.engine.view.TextProxy;
}

declare module '@ckeditor/ckeditor5-engine/src/view/treewalker' {
  export default ckeditor.engine.view.TreeWalker;
}

declare module '@ckeditor/ckeditor5-engine/src/view/uielement' {
  export default ckeditor.engine.view.UIElement;
}

declare module '@ckeditor/ckeditor5-engine/src/view/view' {
  export default ckeditor.engine.view.View;
}

declare module '@ckeditor/ckeditor5-engine/src/view/writer' {
  export default ckeditor.engine.view.Writer;
}
