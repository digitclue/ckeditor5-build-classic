import AcoreEditor from '../src/ckeditor';

AcoreEditor
  .create(document.querySelector('#editor'), {
    plugins: [
      ...AcoreEditor.builtinPlugins.map(plugin => plugin.pluginName),
    ],

    toolbar: [
      'bold',
      'italic',
      'underline',
      '|',
      'blockquote',
    ],
  })
  .catch(err => {
    console.error(err.stack);
  });
