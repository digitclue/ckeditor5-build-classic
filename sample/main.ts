import AcoreEditor from '../src/ckeditor';
import { InsertImage } from '../src/plugins/insert-image';
import { TestPlugin } from '../src/plugins/test';

AcoreEditor
  .create(document.querySelector('#editor'), {
    plugins: [
      ...AcoreEditor.builtinPlugins.map(plugin => plugin.pluginName),
      InsertImage,
      TestPlugin,
    ],

    toolbar: [
      'bold',
      'italic',
      'underline',
      '|',
      'blockquote',
      '|',
      'insertImage',
      '|',
      'test',
    ],
  })
  .catch(err => {
    console.error(err.stack);
  });
