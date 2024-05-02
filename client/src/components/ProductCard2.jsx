import React from 'react';

const ProductCard2 = ({ product, onClick }) => {
  const handleClick = () => {
    onClick(product);
  };

  return (
    <div
      className="product-card"
      onClick={handleClick}
      style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        width: '200px',
        height: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        height={200}
        width={150}
        style={{ marginBottom: '10px', borderRadius: '10px' }}
      />
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{product.name}</h3>
      <p style={{ fontSize: '14px', marginBottom: '5px' }}>Price: ${product.price}</p>
    </div>
  );
};

export default ProductCard2;
