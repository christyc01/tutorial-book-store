/* eslint-disable react/prop-types */

const BooksCard = ({ data }) => {
  return (
    <div>
      {data.data.map((book) => (
        <div key={book._id} className="border-2 rounded-sm">
          <p>id: {book._id}</p>
          <p>title: {book.title}</p>
          <p>author: {book.author}</p>
          <p>year: {book.publishYear}</p>
        </div>
      ))}
      <p>details</p>
      <p>edit</p>
      <p>delete</p>
    </div>
  );
};

export default BooksCard;
