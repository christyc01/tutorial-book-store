import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../components/Spinner';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    console.log('deleting', id);
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        navigate('/');
        setLoading(false);
      })
      .catch((error) => {
        alert('An error occurred - check the console.');
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? <Spinner /> : ''}
      <h1>Delete Book</h1>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteBook;
