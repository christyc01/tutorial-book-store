import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log('deleting', id);
    axios.delete(`http://localhost:5555/books/${id}`);
    navigate('/');
  };

  return (
    <div>
      <h1>Delete Book</h1>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteBook;
