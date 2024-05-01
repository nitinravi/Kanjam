import React, { useState } from 'react';
import axios from 'axios';

const Price = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading animation
  const [error, setError] = useState('');

  const fetchResults = async (jobId) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    };
  
    try {
      setLoading(true); // Set loading state to true
      const response = await fetch(`https://api.priceapi.com/v2/jobs/${jobId}/download?token=SJRECMEVHMEFIJBHCQJDAIFWFROPJDRLTCIHUMVLGGMHCNFIQPCZKLRUALDASVZF`, options);
      
      if (!response.ok) {
        throw new Error('Error fetching job results');
      }
  
      const data = await response.json();
      console.log("Job Results:", data); // Log the fetched job results
  
      // Now handle the fetched job results as needed
      setSearchResults(data.results); // Example: set search results state
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching job results:", error);
      setError('Error fetching results');
      setLoading(false); // Set loading state to false
    }
  };
  
  const checkJobStatus = async (jobId) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    };
  
    try {
      let response = await fetch(`https://api.priceapi.com/v2/jobs/${jobId}?token=SJRECMEVHMEFIJBHCQJDAIFWFROPJDRLTCIHUMVLGGMHCNFIQPCZKLRUALDASVZF`, options);
      let data = await response.json();
  
      while (data.status !== 'finished') {
        // Job is still in progress, wait for some time before checking again
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
  
        // Fetch job status again
        response = await fetch(`https://api.priceapi.com/v2/jobs/${jobId}?token=SJRECMEVHMEFIJBHCQJDAIFWFROPJDRLTCIHUMVLGGMHCNFIQPCZKLRUALDASVZF`, options);
        data = await response.json();
      }
  
      // Job is finished, fetch the results
      await fetchResults(jobId);
    } catch (error) {
      console.error("Error checking job status:", error);
      setError('Error fetching job results');
    }
  };
  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("Search term:", searchTerm);
  
      setLoading(true); // Set loading state to true
  
      const response = await fetch(`https://api.priceapi.com/v2/jobs?token=SJRECMEVHMEFIJBHCQJDAIFWFROPJDRLTCIHUMVLGGMHCNFIQPCZKLRUALDASVZF&values=${searchTerm}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source: 'google_shopping',
          country: 'in',
          topic: 'search_results',
          key: 'term',
          values: searchTerm,
          token: 'SJRECMEVHMEFIJBHCQJDAIFWFROPJDRLTCIHUMVLGGMHCNFIQPCZKLRUALDASVZF'
        })
      });
  
      if (!response.ok) {
        console.error("Error response:", response);
        throw new Error('Error fetching results');
      }
  
      const data = await response.json();
      console.log("Search API Response:", data);
  
      const jobId = data.job_id;
      console.log("Job ID:", jobId);
  
      // Check job status and fetch results when finished
      await checkJobStatus(jobId);
    } catch (error) {
      console.error("Error:", error);
      setError('Error fetching results');
    }
  };
  
  const goToHomePage = () => {
    window.location.href = '/home';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8">Search for a Product across platforms</h1>
        <button onClick={goToHomePage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mb-4">
          Search in Amazon
        </button>
      </div>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 mr-2 w-1/2 align-middle"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
      </form>
      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
          {/* You can add a loading animation here */}
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default Price;
