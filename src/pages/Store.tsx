import React from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { IProduct } from '../model/IProduct';
import StoreItem from '../components/StoreItem';

const Store = () => {
  const [products, setProducts] = React.useState([]);

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

  return (
    <>
      <h1>Livraria Autbank</h1>
      <Row md={2} xs={1} lg={4} className="g-4">
        {products &&
          products.map((product: IProduct) => (
            <Col key={product.id}>
              <StoreItem {...product} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Store;
