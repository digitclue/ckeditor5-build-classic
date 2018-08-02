import AcoreEditor from '../src/ckeditor';

AcoreEditor
  .create(document.querySelector('#editor'))
  .catch(err => {
    console.error(err.stack);
  });
