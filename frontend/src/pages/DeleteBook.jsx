import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log('deleting', id);
    axios.delete(`http://localhost:5555/books/${id}`).then(() => {
      navigate('/').catch((error) => {
        alert('An error occurred - check the console.');
        console.log(error);
      });
    });
  };

  return (
    <div>
      <h1>Delete Book</h1>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteBook;
