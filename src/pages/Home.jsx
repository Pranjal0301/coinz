import React from 'react'
import homeStore from '../stores/homeStore'
import Header from '../components/Header';
import ListItems from '../components/ListItems';
import classNames from 'classnames';
import Hero from '../components/Hero';
import Footer from '../components/Footer';


export default function Home() {
  const store = homeStore()
 
  

  React.useEffect(()=>{
    
    store.fetchCoins()
  }, []) 
  return (
    <div>
      
      <Header/>
      <Hero/>
      <header className='home-search'>
        <div className='width'>
        <h2>
          Search for a Coin
        </h2>
        <div className={classNames("home-search-input", {searching: store.searching})}>
          
<svg className='svg-icon' xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="20"><path fill='currentColor' d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/></svg>
        <input type ="text" value={store.query} onChange={store.setQuery}/>
<svg className='svg-load' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20"><path fill='currentColor' d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
        </div>
        </div>
    </header> 
      <div className='home-cryptos'>
        <div className='width'>
        <h2>{store.searched ? 'Search Results' : 'Trending Coins'}</h2>
        <div className='home-cryptos-list'>
        {store.coins.map(coin => {
        return(
          <ListItems key={coin.id} coin = {coin}/>

        )
      })}
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
