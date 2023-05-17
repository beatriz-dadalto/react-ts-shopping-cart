import React from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import { formatCurrency } from '../util/formatCurrency';
import axios from 'axios';
import { IProduct } from '../model/IProduct';
import { discountForDifferentProducts } from '../util/discounts';

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`http://localhost:4000/products`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);

  const total = cartItems.reduce((total, cartItem) => {
    const product = products.find(
      (product: IProduct) => product.id === cartItem.id,
    );

    return total + (product?.price || 0) * cartItem.quantity;
  }, 0);

  return (
    <>
      <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total{' '}
              {formatCurrency(
                total - total * discountForDifferentProducts(cartItems.length),
              )}
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ShoppingCart;
