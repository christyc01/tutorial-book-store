import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../components/Spinner';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('table');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      // Example using try/catch
      // try {
      //   const response = await fetch('http://localhost:5555/books');
      //   const parsedResponse = await response.json();
      //   setData(parsedResponse);
      // } catch (error) {
      //   console.error('Failed to fetch:', error);
      // }

      // Example using .then()
      // fetch('http://localhost:5555/books')
      //   .then((res) => res.json())
      //   .then((parsedRes) => setData(parsedRes));

      // Example using Axios
      axios
        .get('http://localhost:5555/books')
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setView('table')}
            className="p-6 bg-red-300 rounded-lg"
          >
            Table
          </button>
          <button
            onClick={() => setView('card')}
            className="p-6 bg-blue-300 rounded-lg"
          >
            Card
          </button>
        </div>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : ''}
      {view === 'card' ? <BooksCard /> : <BooksTable data={data} />}
    </div>
  );
};

export default Home;
