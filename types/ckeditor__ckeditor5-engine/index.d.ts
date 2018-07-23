// Type definitions for @ckeditor/ckeditor5-engine 10.1
// Project: https://github.com/ckeditor/ckeditor5
// Definitions by: Kostiantyn Dyha <https://github.com/digitclue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module '@ckeditor/ckeditor5-engine/src/controller/editingcontroller' {
  export class EditingController {
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

declare module '@ckeditor/ckeditor5-engine/src/model/delta/delta' {
  export class Delta {
  }

  export default Delta;
}

declare module '@ckeditor/ckeditor5-engine/src/model/node' {
  export class Node {
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
  export class Element {
  }

  export default Element;
}

declare module '@ckeditor/ckeditor5-engine/src/model/documentfragment' {
  export class DocumentFragment {
  }

  export default DocumentFragment;
}

declare module '@ckeditor/ckeditor5-engine/src/model/schema' {
  export class Schema {
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
  export class DocumentSelection {
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
  import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

  export class Model extends ObservableMixin {
    readonly document: Document;
    readonly markers: MarkerCollection;
    readonly schema: Schema;

    applyOperation(operation: Operation): void;

    change<T>(callback: (...args: any[]) => T): T;

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
