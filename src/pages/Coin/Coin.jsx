import React, { useContext, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {

  const {coinId} = useParams();
  const[coindata, setCoinData] = useState();
  const[historicalData, setHistoricalData] = useState();
  const {currency} = useContext(CoinContext);

  const fetchCoinData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-qbYQCG71peDza7xd3ZUqT87U'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData= async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-qbYQCG71peDza7xd3ZUqT87U'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[currency])


  //  xx----fetch coinData with delay----xx

  // useEffect(() => {
  //   fetchCoinData();
  //   const fetchHistoricalDataWithDelay = async () => {
  //     await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
  //     fetchHistoricalData();
  //   };
  //   fetchHistoricalDataWithDelay();
  // }, [currency]);




if(coindata && historicalData){
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coindata.image.large} alt="" />
        <p><b>{coindata.name} ({coindata.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData}/>
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coindata.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol}{coindata.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market cap</li>
          <li>{currency.symbol}{coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour high</li>
          <li>{currency.symbol}{coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour low</li>
          <li>{currency.symbol}{coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>

    </div>
  )
}else{
  <div className='spinner'>
    <div className="spin"> </div>
  </div>
}
}
export default Coin
