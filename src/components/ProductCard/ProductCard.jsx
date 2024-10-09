/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import styles from "./ProductCard.module.css";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import MyContext from "./../../contexts/mycontexts";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const { isLoggedIn, setIsLoggedIn, activeCart, setActiveCart } = useContext(MyContext);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    let temp = activeCart;
    let productIndex = temp.products.findIndex((productInCart) => productInCart.productId === product.id);
    if (productIndex === -1) {
      temp.products.push({ productId: product.id, quantity: 1 });
    } else {
      temp.products[productIndex].quantity++;
    }
    setActiveCart(temp);
  };

  return (
    <>
      <Card className={styles.cardContainer}>
        <Card.Img variant="top" src={product.image} className={styles.cardImage} />
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>{product.title}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          <Card.Text className={styles.ratingContainer}>
            {product.rating.rate}{" "}
            <img id={styles.ratingStarIcon} src="src\assets\Navbar\StarRating.svg" alt="star ratings" />
            {`(${product.rating.count})`}
          </Card.Text>

          {isLoggedIn ? (
            <Button className={styles.cardButton} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          ) : (
            <Button className={styles.cardButton} onClick={() => navigate("/login")}>
              Add to Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
