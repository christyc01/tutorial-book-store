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
    <div className="p-4">
      <BackButton />
      {loading ? <Spinner /> : ''}
      <h1 className="text-3xl my-4">Create Book</h1>
      <form
        onSubmit={createBook}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto"
      >
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 text-gray-500">
            Title:
          </label>
          <input
            id="title"
            placeholder="Enter title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 text-gray-500">
            Author:
          </label>
          <input
            id="author"
            placeholder="Enter author"
            type="text"
            value={formValues.author}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">
            Publish year:
          </label>
          <input
            id="publishYear"
            placeholder="Enter publish year"
            type="number"
            value={formValues.publishYear}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="p-2 bg-sky-300 m-8">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
