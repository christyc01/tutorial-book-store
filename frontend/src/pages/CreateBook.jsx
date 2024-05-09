import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const CreateBook = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    publishYear: 0,
  });

  const navigate = useNavigate();

  const createBook = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:5555/books', {
      title: formValues.title,
      author: formValues.author,
      publishYear: formValues.publishYear,
    });

    navigate('/');
  };

  const handleChange = (e) => {
    const updatedValues = {
      ...formValues,
      [e.target.id]: e.target.value,
    };
    setFormValues(updatedValues);
  };

  return (
    <div>
      <BackButton />
      <h1>Create Book</h1>
      <form onSubmit={createBook}>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          placeholder="Enter title"
          type="text"
          value={formValues.title}
          onChange={handleChange}
        />
        <label htmlFor="author">Author: </label>
        <input
          id="author"
          placeholder="Enter author"
          type="text"
          value={formValues.author}
          onChange={handleChange}
        />
        <label htmlFor="publishYear">Publish year: </label>
        <input
          id="publishYear"
          placeholder="Enter publish year"
          type="number"
          value={formValues.publishYear}
          onChange={handleChange}
        />
        <button type="submit">Submit Me!</button>
      </form>
    </div>
  );
};

export default CreateBook;
