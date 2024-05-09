import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const CreateBook = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    publishYear: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createBook = (e) => {
    e.preventDefault();

    const data = {
      title: formValues.title,
      author: formValues.author,
      publishYear: formValues.publishYear,
    };

    setLoading(true);

    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred - check the console.');
        console.log(error);
      });
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
      {loading ? <Spinner /> : ''}
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
