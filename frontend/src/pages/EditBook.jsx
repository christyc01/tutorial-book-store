import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditBook = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    publishYear: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditBook = (e) => {
    e.preventDefault();

    const data = {
      title: formValues.title,
      author: formValues.author,
      publishYear: formValues.publishYear,
    };

    setLoading(true);

    axios
      .put(`http://localhost:5555/books/${id}`, data)
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

  useEffect(() => {
    const fetchData = async () => {
      const bookData = await axios.get(`http://localhost:5555/books/${id}`);
      setFormValues(bookData.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <BackButton />
      {loading ? <Spinner /> : ''}
      <h1>Edit Book</h1>
      <form onSubmit={handleEditBook}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={formValues.title}
          onChange={handleChange}
        />

        <label htmlFor="author">Author: </label>
        <input
          type="text"
          id="author"
          value={formValues.author}
          onChange={handleChange}
        />

        <label htmlFor="publishYear">Publish year: </label>
        <input
          type="number"
          id="publishYear"
          value={formValues.publishYear}
          onChange={handleChange}
        />

        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditBook;
