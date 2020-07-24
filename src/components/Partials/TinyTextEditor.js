import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class TinyTextEditor extends React.Component {
  handleEditorChange = (content, editor) => {
      const {onContentChange} = this.props;
      onContentChange(content)
    console.log('Content was updated:', content);
  }

  render() {
    const content = this.props;

    return (
      <Editor
        initialValue={content.content[0]}
        init={{
          height: 300,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic underline backcolor link | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | image media removeformat table | wordcount | fullscreen | help'
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default TinyTextEditor;