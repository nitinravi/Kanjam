import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://real-time-amazon-data.p.rapidapi.com/search', {
        params: {
          query: searchQuery,
          page: '1',
          country: 'IN',
          category_id: 'aps'
        },
        headers: {
          'X-RapidAPI-Key': 'd521be44c3msh7a62eb5bfbd0bcdp1926bejsn153858407988',
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
      });
      setProducts(response.data.data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Search</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchSubmit}
          placeholder="Search for products..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          products.map(product => (
            <ProductCard key={product.asin} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
