import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../Predictor.css';


const Predictor = () => {
    const [priceHistoryData, setPriceHistoryData] = useState([]);
    const [linearFuturePrices, setLinearFuturePrices] = useState([]);
    const [nextDayPrediction, setNextDayPrediction] = useState(0);
    const [nextWeekPrediction, setNextWeekPrediction] = useState(0);
    const [nextMonthPrediction, setNextMonthPrediction] = useState(0);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [suggestion, setSuggestion] = useState('');


    useEffect(() => {
        const priceData = [
            { date: '2024-05-01', price: 21800 },
            { date: '2024-05-02', price: 21750 },
            { date: '2024-05-03', price: 21700 },
            { date: '2024-05-04', price: 21650 },
            { date: '2024-05-05', price: 21700 },
            { date: '2024-05-06', price: 21750 },
            { date: '2024-05-07', price: 21800 },
            { date: '2024-05-08', price: 21750 },
            { date: '2024-05-09', price: 21700 },
            { date: '2024-05-10', price: 21650 },
            { date: '2024-05-11', price: 21600 },
            { date: '2024-05-12', price: 21650 },
            { date: '2024-05-13', price: 21700 },
            { date: '2024-05-14', price: 21750 },
            { date: '2024-05-15', price: 21800 },
            { date: '2024-05-16', price: 21850 },
            { date: '2024-05-17', price: 21900 },
            { date: '2024-05-18', price: 21950 },
            { date: '2024-05-19', price: 22000 },
            { date: '2024-05-20', price: 21950 },
            { date: '2024-05-21', price: 21900 },
            { date: '2024-05-22', price: 21850 },
            { date: '2024-05-23', price: 21800 },
            { date: '2024-05-24', price: 21750 },
            { date: '2024-05-25', price: 21700 },
            { date: '2024-05-26', price: 21650 },
            { date: '2024-05-27', price: 21600 },
            { date: '2024-05-28', price: 21650 },
            { date: '2024-05-29', price: 21700 },
            { date: '2024-05-30', price: 21750 },
          ];

          setPriceHistoryData(priceData);

          // Perform linear regression
          const linearCoefficients = linearRegression(priceData);
          const futureDates = generateFutureDates(30);
          const futurePrices = predictLinearRegression(linearCoefficients, futureDates);
          setLinearFuturePrices(futurePrices);
  
          // Sample predictions
          const lastPrice = priceData[priceData.length - 1].price;
          setNextDayPrediction(lastPrice + linearCoefficients[1] * 1);
          setNextWeekPrediction(lastPrice + linearCoefficients[1] * 7);
          setNextMonthPrediction(lastPrice + linearCoefficients[1] * 30);
      }, []);
  
      // Linear Regression function
      const linearRegression = (data) => {
          const n = data.length;
          let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  
          for (let i = 0; i < n; i++) {
              sumX += i;
              sumY += data[i].price;
              sumXY += i * data[i].price;
              sumXX += i * i;
          }
  
          const b = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
          const a = (sumY - b * sumX) / n;
  
          return [a, b];
      };
  
      // Generate future dates
      const generateFutureDates = (days) => {
          const currentDate = priceHistoryData.length > 0 ? new Date(priceHistoryData[priceHistoryData.length - 1].date) : new Date();
          const futureDates = [];
          for (let i = 1; i <= days; i++) {
              const nextDate = new Date(currentDate);
              nextDate.setDate(nextDate.getDate() + i);
              futureDates.push({ date: nextDate.toISOString(), price: null }); // Assuming price for future dates is null
          }
          return futureDates;
      };
  
      // Predict future prices using linear regression
      const predictLinearRegression = (coefficients, futureDates) => {
          const futurePrices = [];
          for (let i = 0; i < futureDates.length; i++) {
              const prediction = coefficients[0] + coefficients[1] * (priceHistoryData.length + i);
              futurePrices.push({ date: futureDates[i].date, linearPrediction: prediction });
          }
          return futurePrices;
      };
  
      const updateSuggestion = (selectedValue) => {
        let suggestion = '';
        if (selectedValue === '1') {
            suggestion = nextDayPrediction < priceHistoryData[priceHistoryData.length - 1].price ? 'Wait more for price drop' : 'Buy now';
        } else if (selectedValue === '7') {
            suggestion = nextWeekPrediction < priceHistoryData[priceHistoryData.length - 1].price ? 'Wait more for price drop' : 'Buy now';
        } else if (selectedValue === '30') {
            suggestion = nextMonthPrediction < priceHistoryData[priceHistoryData.length - 1].price ? 'Wait more for price drop' : 'Buy now';
        }
        setShowSuggestion(true);
        setSuggestion(suggestion);
    };

    const hideSuggestion = () => {
        setShowSuggestion(false);
    };
  
    return (
        <div className="containerr">
            <h2>Price Prediction Chart</h2>
            <div className="chart-container">
                <LineChart width={800} height={400} data={priceHistoryData.concat(linearFuturePrices)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" name="Actual Price" />
                    <Line type="monotone" dataKey="linearPrediction" stroke="#82ca9d" name="Predicted Price" />
                </LineChart>
            </div>

            <div className="prediction-info">
                <div className="prediction-item">
                    <span>Next Day Prediction:</span>
                    <span>{nextDayPrediction}</span>
                </div>
                <div className="prediction-item">
                    <span>Next Week Prediction:</span>
                    <span>{nextWeekPrediction}</span>
                </div>
                <div className="prediction-item">
                    <span>Next Month Prediction:</span>
                    <span>{nextMonthPrediction}</span>
                </div>
            </div>

            <div className="dropdown-container">
                <label>Select Prediction Period:</label>
                <select className="dropdown" onChange={(e) => updateSuggestion(e.target.value)}>
                    <option value="1">Next Day</option>
                    <option value="7">Next Week</option>
                    <option value="30">Next Month</option>
                </select>
            </div>

            {showSuggestion && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={hideSuggestion}>&times;</span>
                        <p className="pt-10 font-medium text-xl">We suggest you to</p>
                        <p className='pb-10 font-bold text-6xl'>{suggestion}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Predictor;