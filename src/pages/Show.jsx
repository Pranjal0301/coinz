import React from 'react'
import showStore from '../stores/showStore'
import { Link, useParams } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';



export default function Show() {
  const store = showStore()
  const params = useParams()

  
    
  React.useEffect(()=>{ 
    
    store.fetchData(params.id)
    return () => {
      store.reset()
    }
  }, [])

  

  
  return (
    <div>
      <Header back/>
      {store.dataRes && <>
      <header className='show-header'>
        <img src={store.dataRes.data.image.small} loading={"Lazy"} alt={store.dataRes.data.name}/>
        <h2>{store.dataRes.data.name}({store.dataRes.data.symbol})</h2>
      </header>
      <div className='width'>
      <div className='show-graph'>
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart

          data={store.graphData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis  unit="$"/>
          <Tooltip />
          <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
      </div>
      </div>

      <div className='show-details'>
  <div className='width'>
    <h2 className='details-title'>Details</h2>
    <div className='details-grid'>
      <div className='show-details-row'>
        <h4>Market cap rank</h4>
        <span>#{store.dataRes.data.market_data.market_cap_rank}</span>
      </div>
      <div className='show-details-row'>
        <h4>Total Supply</h4>
        <span>{store.dataRes.data.market_data.total_supply}</span>
      </div>
      
      <div className='show-details-row'>
        <h4>Circulating supply</h4>
        <span>{store.dataRes.data.market_data.circulating_supply}</span>
      </div>
      <div className='show-details-row'>
        <h4>Current Price</h4>
        <span>${store.dataRes.data.market_data.current_price.usd}</span>
      </div>
      <div className='show-details-row'>
        <h4>24h high</h4>
        <span className='green-text'>${store.dataRes.data.market_data.high_24h.usd}</span>
      </div>
      <div className='show-details-row'>
        <h4>24h low</h4>
        <span className='red-text'>${store.dataRes.data.market_data.low_24h.usd}</span>
      </div>
      <div className='show-details-row'>
        <h4>1y Change</h4>
        <span
             className={
                        "slider-coin__price " +
                        (store.dataRes.data.market_data.price_change_percentage_1y >= 0
                          ? "green-text"
                          : "red-text")
                      }
                    >
                      {store.dataRes.data.market_data.price_change_percentage_1y?.toFixed(2) + " %"}
                    </span>
      </div>
      <div className='show-details-row'>
        <h4>Liquidity score</h4>
        <span>{store.dataRes.data.liquidity_score}</span>
      </div>
    </div>

    <h2 className='details-title'>Coin Description :</h2>
      <div className='disc-info'>
        {store.dataRes.data.description.en}
      </div>
      
    <h2 className='details-title'>Coin Links:</h2>
    <div className='details-grid'>
      <div className='show-details-row'>
        <h4>Website</h4>
        <a target='black' href={store.dataRes.data.links.homepage[0]}><img src={store.dataRes.data.image.thumb}/></a>
      </div>
      <div className='show-details-row'>
        <h4>Twitter</h4>
        <a target='black' href={`https://twitter.com/${store.dataRes.data.links.twitter_screen_name}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
        </a>
      </div>
      <br></br>
      <br></br>
      </div>
      
  </div>
</div>

      </>}
    </div>
  )
}
