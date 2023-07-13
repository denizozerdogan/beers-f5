import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Beers F5!</h1>
      <Link to="/beers">
        <h2>All Beers</h2>
        <img src="/all-beers.jpg" alt="All Beers" />
      </Link>
      <Link to="/random-beer">
        <h2>Random Beer</h2>
        <img src="/random-beer.jpg" alt="Random Beer" />
      </Link>
      <Link to="/new-beer">
        <h2>New Beer</h2>
        <img src="/new-beer.jpg" alt="New Beer" />
      </Link>
    </div>
  );
};