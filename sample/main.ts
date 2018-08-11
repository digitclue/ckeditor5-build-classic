import AcoreEditor from '../src/ckeditor';

AcoreEditor
  .create(document.querySelector('#editor'))
  .then((editor) => {
    const container = document.getElementById('result');
    document.getElementById('button')
      .addEventListener('click', () => {
        container.innerHTML = editor.getData();
        // console.log(editor.getData());
      });
  })
  .catch(err => {
    console.error(err.stack);
  });
