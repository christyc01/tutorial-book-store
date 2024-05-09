import axios from 'axios';
import { useState } from 'react';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState(null);

  const createBook = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:5555/books', {
      title: title,
      author: author,
      publishYear: publishYear,
    });
  };

  return (
    <div>
      <h1>Create Book</h1>
      <form onSubmit={createBook}>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          placeholder="Enter title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="author">Author: </label>
        <input
          id="author"
          placeholder="Enter author"
          type="text"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <label htmlFor="publishYear">Publish year: </label>
        <input
          id="publishYear"
          placeholder="Enter publish year"
          type="number"
          value={publishYear}
          onChange={(e) => {
            setPublishYear(e.target.value);
          }}
        />
        <button type="submit">Submit Me!</button>
      </form>
    </div>
  );
};

export default CreateBook;
