/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

// @ts-ignore
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// @ts-ignore
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
// @ts-ignore
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// @ts-ignore
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// @ts-ignore
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
// @ts-ignore
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
// @ts-ignore
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// @ts-ignore
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
// @ts-ignore
import Image from '@ckeditor/ckeditor5-image/src/image';
// @ts-ignore
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
// @ts-ignore
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
// @ts-ignore
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// @ts-ignore
import Link from '@ckeditor/ckeditor5-link/src/link';
// @ts-ignore
import List from '@ckeditor/ckeditor5-list/src/list';
// @ts-ignore
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

export default class AcoreEditor extends ClassicEditorBase {
}

// Plugins to include in the build.
AcoreEditor.builtinPlugins = [
  Essentials,
  Autoformat,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  EasyImage,
  Heading,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  Link,
  List,
  Paragraph,
];

// Editor configuration.
AcoreEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'undo',
      'redo',
    ],
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative',
    ],
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en',
};
