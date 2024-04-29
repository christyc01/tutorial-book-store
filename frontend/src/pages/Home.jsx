import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
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
      fetch('http://localhost:5555/books')
        .then((res) => res.json())
        .then((parsedRes) => setData(parsedRes));
    };
    fetchData();
  }, []);

  return (
    <div>
      {!data.length ? (
        <Spinner />
      ) : (
        <div>
          <h1>Home</h1>
          <p>Books list</p>
          {data?.data?.map((item) => (
            <p key={item._id}>{item.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
