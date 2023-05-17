import React, { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import axios from 'axios';
import { IProduct } from '../model/IProduct';
import { Button, Stack } from 'react-bootstrap';
import { formatCurrency } from '../util/formatCurrency';

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const [product, setProduct] = useState<IProduct>();

  React.useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`http://localhost:4000/products`);
        const products = response.data;
        setProduct((item) => products.find((item: IProduct) => item.id === id));
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);

  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={product?.image}
          alt={product?.alt}
          style={{ width: '100px', height: '145px', objectFit: 'cover' }}
        />
        <div className="me-auto">
          <div>
            <span style={{ fontSize: '.75rem' }}>{product?.title} </span>
            {quantity > 0 && (
              <span className="text-muted" style={{ fontSize: '.65rem' }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: '.75rem' }}>
            {formatCurrency(Number(product?.price))}
          </div>
        </div>
        <div>{formatCurrency(Number(product?.price) * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(Number(product?.id))}
        >
          &times;
        </Button>
      </Stack>
    </>
  );
};

export default CartItem;
