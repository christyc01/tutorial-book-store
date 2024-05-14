import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    console.log('deleting', id);
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        enqueueSnackbar('Successfully deleted', { variant: 'success' });
        navigate('/');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('An error occurred - check the console.', {
          variant: 'error',
        });
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDelete}
        >
          Yep, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
