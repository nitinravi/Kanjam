// ProductCard.jsx
import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      <div className="w-full h-32 overflow-hidden">
        <img src={product.product_photo} alt={product.product_title} className="w-full h-full object-contain" />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.product_title}</h2>
        <p className="text-gray-600">{product.product_price}</p>
        <p className="text-sm text-gray-500 mt-1">{product.product_star_rating} ({product.product_num_ratings} ratings)</p>
      </div>
      <div className="px-4 py-2 bg-gray-100">
        <a href={product.product_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 font-semibold transition duration-300 ease-in-out transform hover:scale-110">View on Amazon</a>
        {product.is_prime && <span className="text-sm text-gray-600 ml-2">Amazon Prime</span>}
      </div>
    </div>
  );
}

export default ProductCard;
