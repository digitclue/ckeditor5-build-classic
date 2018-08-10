import Command from '@ckeditor/ckeditor5-core/src/command';
import Element from '@ckeditor/ckeditor5-engine/src/model/element';
import Position from '@ckeditor/ckeditor5-engine/src/model/position';
import Range from '@ckeditor/ckeditor5-engine/src/model/range';
import Writer from '@ckeditor/ckeditor5-engine/src/model/writer';
import first from '@ckeditor/ckeditor5-utils/src/first';

const findSpoiler = (elementOrPosition: Element | Position): Element => {
  if (elementOrPosition.parent instanceof Element) {
    return elementOrPosition.parent.name == 'spoiler' ? elementOrPosition.parent : null;
  }

  return null;
};

export class SpoilerCommand extends Command {
  value: boolean;

  refresh() {
    this.value = this._getValue();
    this.isEnabled = this._checkEnabled();
  }

  execute() {
    const { model } = this.editor;
    const {
      document,
      schema,
    } = model;
    const blocks = Array.from(document.selection.getSelectedBlocks());

    console.log('insert spoiler', blocks);

    model.change((writer) => {
      this._applySpoiler(writer, blocks);
    });

    // const blocksToSpoiler =
  }

  private _getValue(): boolean {
    const firstBlock = first(this.editor.model.document.selection.getSelectedBlocks());

    // In the current implementation, the block quote must be an immediate parent of a block element.
    return !!(firstBlock && findSpoiler(firstBlock));
  }

  private _checkEnabled(): boolean {
    return true;
  }

  /*private _applySpoiler(writer: Writer, blocks: Element[]) {
    const spoiler = writer.createElement('spoiler');

    this.editor.model.insertContent(spoiler, this.editor.model.document.selection);
  }*/

  private _applySpoiler(writer: Writer, blocks: Element[]) {
    const spoilersToMerge = [];

    // Quote all groups of block. Iterate in the reverse order to not break following ranges.
    getRangesOfBlockGroups(blocks)
      .reverse()
      .forEach(groupRange => {
        let spoiler = findSpoiler(groupRange.start);

        if (!spoiler) {
          spoiler = new Element('spoiler');

          writer.wrap(groupRange, spoiler);
        }

        spoilersToMerge.push(spoiler);
      });

    // Merge subsequent <bQ> elements. Reverse the order again because this time we want to go through
    // the <bQ> elements in the source order (due to how merge works – it moves the right element's content
    // to the first element and removes the right one. Since we may need to merge a couple of subsequent `<bQ>` elements
    // we want to keep the reference to the first (furthest left) one.
    spoilersToMerge
      .reverse()
      .reduce((currentSpoiler, nextQuote) => {
        if (currentSpoiler.nextSibling === nextQuote) {
          writer.merge(Position.createAfter(currentSpoiler));

          return currentSpoiler;
        }

        return nextQuote;
      });
  }
}

// Returns a minimal array of ranges containing groups of subsequent blocks.
//
// content:         abcdefgh
// blocks:          [ a, b, d , f, g, h ]
// output ranges:   [ab]c[d]e[fgh]
//
// @param {Array.<module:engine/model/element~Element>} blocks
// @returns {Array.<module:engine/model/range~Range>}


function getRangesOfBlockGroups(blocks: Element[]): Range[] {
  let startPosition;
  let i = 0;
  const ranges = [];

  while (i < blocks.length) {
    const block = blocks[i];
    const nextBlock = blocks[i + 1];

    if (!startPosition) {
      startPosition = Position.createBefore(block);
    }

    if (!nextBlock || block.nextSibling !== nextBlock) {
      ranges.push(new Range(startPosition, Position.createAfter(block)));
      startPosition = null;
    }

    i++;
  }

  return ranges;
}
