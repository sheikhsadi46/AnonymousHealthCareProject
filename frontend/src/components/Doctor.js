import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Doctor(props) {
  const { doctor } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === doctor._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/doctors/${item._id}`);
    if (data.availabilityStatus === false) {
      window.alert('Sorry. Doctor is not available');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/doctor/${doctor.slug}`}>
        <img src={doctor.image} className="card-img-top" alt={doctor.name} />
      </Link>
      <Card.Body>
        <Link to={`/doctor/${doctor.slug}`}>
          <Card.Title>{doctor.name}</Card.Title>
        </Link>
        <Rating rating={doctor.rating} numReviews={doctor.numReviews} />
        <Card.Text>Fee: {doctor.price} TK</Card.Text>
        {doctor.availabilityStatus === false ? (
          <Button variant="light" disabled>
            Unavailable
          </Button>
        ) : (
          <Link to={`/doctor/${doctor.slug}`}><Button>SELECT</Button></Link>
        )}
      </Card.Body>
    </Card>
  );
}
export default Doctor;
