/* eslint-disable react/prop-types */

import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const BooksCard = ({ data }) => {
  return (
    <div>
      {data.map((book) => (
        <div key={book._id} className="border-2 rounded-sm">
          <p>id: {book._id}</p>
          <p>title: {book.title}</p>
          <p>author: {book.author}</p>
          <p>year: {book.publishYear}</p>
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className="text-2xl text-green-800" />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600" />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete className="text-2xl text-red-600" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
