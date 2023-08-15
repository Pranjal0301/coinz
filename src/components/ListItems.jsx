import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls

export default function ListItems({ coin }) {
  const [priceChange24h, setPriceChange24h] = useState(null);

  useEffect(() => {
    // Fetch 24-hour price change data
    const fetchPriceChange24h = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}`);
        const priceChangeData = response.data.market_data.price_change_percentage_24h;
        setPriceChange24h(priceChangeData);
      } catch (error) {
        console.error('Error fetching price change data:', error);
      }
    };

    fetchPriceChange24h();
  }, [coin.id]);

  return (
    <div className='home-crypto'>
      <Link to={`/${coin.id}`}>
        <span className='home-crypto-image'><img src={coin.image} alt={coin.name} /></span>
        <span className='home-crypto-name'>{coin.name}</span>
       
        <span
             className={
                        "home-crypto-price-change " +
                        (priceChange24h >= 0
                          ? "green-text"
                          : "red-text")
                      }
                    >
                      {priceChange24h?.toFixed(2) + " %"}
                    </span>
          {coin.priceBtc && (<span  className='home-crypto-prices'>
            <span className='home-crypto-btc'>
                <img src='/bitcoin.webp'/>
                {coin.priceBtc} BTC</span>
            <span className='home-crypto-usd'>${coin.priceUsd} USD</span>
        </span>)}
      </Link>
    </div>
  );
}
