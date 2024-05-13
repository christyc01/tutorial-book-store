/* eslint-disable react/prop-types */

import BookSingleCard from './BookSingleCard';

const BooksCard = ({ data }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((book) => (
        <BookSingleCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BooksCard;
