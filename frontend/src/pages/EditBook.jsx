import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar('Successfully edited the book!', {
          variant: 'success',
        });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred - check the console.', {
          variant: 'error',
        });
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
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5555/books/${id}`)
        .then((response) => {
          setFormValues(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          alert('An error happened. Please Chack console');
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <form
        onSubmit={handleEditBook}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto"
      >
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 text-gray-500">
            Title:{' '}
          </label>
          <input
            type="text"
            id="title"
            value={formValues.title}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 text-gray-500">
            Author:{' '}
          </label>
          <input
            type="text"
            id="author"
            value={formValues.author}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">
            Publish year:{' '}
          </label>
          <input
            type="number"
            id="publishYear"
            value={formValues.publishYear}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button type="submit" className="p-2 bg-sky-300 m-8">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditBook;
