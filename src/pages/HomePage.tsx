import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const HomePage = () => {
  return (
    <Container fluid="md">
      <h1>Welcome to Beers F5!</h1>
      <Link to="/beers">
        <h2>All Beers</h2>
        <img src="/all-beers.jpg" alt="All Beers" className="img-fluid img-thumbnail" style={{ maxWidth: '300px' }} />
      </Link>
      <Link to="/random-beer">
        <h2>Random Beer</h2>
        <img src="/random-beer.jpg" alt="Random Beer" className="img-fluid img-thumbnail" style={{ maxWidth: '300px' }} />
      </Link>
      <Link to="/new-beer">
        <h2>New Beer</h2>
        <img src="/new-beer.jpg" alt="New Beer" className="img-fluid img-thumbnail" style={{ maxWidth: '300px' }} />
      </Link>
    </Container>
  );
};
