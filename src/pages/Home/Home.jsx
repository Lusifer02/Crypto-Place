import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const {allCoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event)=>{
    setInput(event.target.value);
    if(event.target.value===""){
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler = async (event)=>{
    event.preventDefault();
    const coins = await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  }


  //   xx----Alternate method to use for setDisplayCoin----xx

  // useEffect(() => {
  //   // Fetch your data and update displayCoin
  //   fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setDisplayCoin(data); // Assuming your API returns an array
  //     });
  // }, [allCoin]);

  useEffect(()=>{
    setDisplayCoin(allCoin);
  },[allCoin]);

  return (
    <div className='home'>
    <div className='hero'>
    <h1>Largest <br /> Crypto Marketplace</h1>
      <p>Welcome to the world's lagest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
      <form onSubmit={searchHandler}>

        <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto..' required />
        <button type='submit'>Search</button>

        {/*Search suggestion function aternate code */}

        {allCoin && allCoin.length > 0 && (
     <datalist id="coinlist">
       {allCoin.map((item, index) => (
         <option key={index} value={item.name}></option>
        ))}
          </datalist>
        )}


        {/* <datalist id="coinlist">
          {allCoin.map((item, index)=>(<option key={index} value={item.name}></option>))}
        </datalist> */}

      </form>  
    </div>
    <div className="crypto-table">
      <div className="table-layout">
        <p>#</p>
        <p>Coins</p>
        <p>Price</p>
        <p style={{textAlign:"center"}}>24H Change</p>
        <p className='market-cap'>Market Cap</p>
      </div>
      
      
      {displayCoin && Array.isArray(displayCoin) && displayCoin.length > 0 ? (
  displayCoin.slice(0,10).map((item, index)=>(
    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
            {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_percentage_24h>0?"green":"red"}>
            {Math.floor(item.price_change_percentage_24h*100)/100}
            </p>
            <p className="market-cap">
            {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
  ))
) : (
  // Handle the case where displayCoin is not an array or is empty
  <p>No coins to display</p> 
)}


      {/* {
        displayCoin.slice(0,10).map((item, index)=>(
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
            {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_percentage_24h>0?"green":"red"}>
            {Math.floor(item.price_change_percentage_24h*100)/100}
            </p>
            <p className="market-cap">
            {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))
      } */}


      
    </div>
    </div>
  )
}

export default Home
