import React, { useState } from 'react';
import axios from 'axios';

const Price = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const fetchResults = async (jobId) => {
    try {
      const response = await axios.get(`https://api.priceapi.com/v2/jobs/${jobId}/download?token=SJRECMEVHMEFIJBHCQJDAIFWFROPJDRLTCIHUMVLGGMHCNFIQPCZKLRUALDASVZF`);
      setSearchResults(response.data.results);
    } catch (error) {
      setError('Error fetching results');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.priceapi.com/v2/jobs?token=SJRECMEVHMEFIJBHCQJDAIFWFROPJDRLTCIHUMVLGGMHCNFIQPCZKLRUALDASVZF&values=${searchTerm}`);
      const jobId = response.data.data[0].job_id; // Assuming the first job in the array
      await fetchResults(jobId);
    } catch (error) {
      setError('Error fetching results');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 mr-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
      </form>
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((result, index) => (
            <div key={index} className="border border-gray-300 p-4 mb-4">
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
                <ul>
                  {result.content.search_results.map((item, idx) => (
                    <li key={idx} className="mb-4">
                      <div className="flex items-center">
                        <img src={item.img_url} alt={item.name} className="w-24 h-24 mr-4" />
                        <div>
                          <p className="text-gray-800">{item.name}</p>
                          <p className="text-gray-600">Price: {item.min_price} {item.currency}</p>
                          <p className="text-gray-600">Review Count: {item.review_count}</p>
                          <p className="text-gray-600">Review Rating: {item.review_rating}</p>
                          <p className="text-gray-600">Product Link: <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Product</a></p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Price;
