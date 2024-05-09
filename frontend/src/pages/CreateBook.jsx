import axios from 'axios';
import { useState } from 'react';

const CreateBook = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    publishYear: 0,
  });

  const createBook = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:5555/books', {
      title: formValues.title,
      author: formValues.author,
      publishYear: formValues.publishYear,
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
          value={formValues.title}
          onChange={(e) => {
            const updatedValues = {
              ...formValues,
              [e.target.id]: e.target.value,
            };
            setFormValues(updatedValues);
          }}
        />
        <label htmlFor="author">Author: </label>
        <input
          id="author"
          placeholder="Enter author"
          type="text"
          value={formValues.author}
          onChange={(e) => {
            const updatedValues = {
              ...formValues,
              [e.target.id]: e.target.value,
            };
            setFormValues(updatedValues);
          }}
        />
        <label htmlFor="publishYear">Publish year: </label>
        <input
          id="publishYear"
          placeholder="Enter publish year"
          type="number"
          value={formValues.publishYear}
          onChange={(e) => {
            const updatedValues = {
              ...formValues,
              [e.target.id]: e.target.value,
            };
            setFormValues(updatedValues);
          }}
        />
        <button type="submit">Submit Me!</button>
      </form>
    </div>
  );
};

export default CreateBook;
