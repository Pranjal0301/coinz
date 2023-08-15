import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios'; // Import axios for making API calls
import { Link } from "react-router-dom";


function Hero() {

  const [herodata, setHerodata] = useState(null)
  useEffect( ()=>{

    const fetchData = async()=>{
      try{
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false&locale=en')
    const finalData = response.data    
    setHerodata(finalData)
    
      }catch(error){
        console.log("opppsiee errrorrr")
      }
    }
    
    fetchData();
    
  },[])

  console.log(herodata)
    return (
    <>
    <section>
        <div className='hero-title'>
            <h1>
                Track and Analyze
                <br/> 
                <span>Crypto Currencies</span>
            </h1>

            {herodata && (
          <div className="hero-coins">
            {herodata.map((coin) => (
              <div key={coin.id} className="hero-coin">
                <img className='hero_coin_img' src={coin.image} alt={coin.name} />
                <div className="hero_coin_name">{coin.id}</div>
                <div className="hero_coin_name">${coin.current_price}</div>
                
                <div
             className={
                        "hero_coin_name " +
                        (coin.price_change_percentage_24h >= 0
                          ? "green-text"
                          : "red-text")
                      }
                    >
                      {coin.price_change_percentage_24h?.toFixed(2) + " %"}
                    </div>
                  </div>
            ))}
          </div>
        )}

        <div class="container-footer">
            <svg class="arrow-circle-down bounce" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="48"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg>
        </div>
        </div>
    </section>
    </>
  )
}

export default Hero
