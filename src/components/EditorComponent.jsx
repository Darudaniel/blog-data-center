import React from 'react';
import ReactQuill from 'react-quill';
import '../styles/EditorComponent.css'
import 'react-quill/dist/quill.snow.css'; 
import TurndownService from 'turndown';

const EditorComponent = ({ onInputChange }) => {

  const modules = {
    toolbar: [['bold', 'italic'], ['link']],
  };

  const formats = ['bold', 'italic', 'link'];

  const handleEditorChange = (content) => {
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(content);
    onInputChange(markdownContent);
  };

  return (
    <div className='editor-component-container'>
      <ReactQuill
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </div>
  );
};

export default EditorComponent;