import { create } from 'zustand'
import axios from 'axios'
import debounce from '../helpers/debounce'

const showStore = create((set) => ({
    graphData: [],
    data:null,

    reset: ()=> {
        set({graphData:[], dataRes:null})
    },
    fetchData: debounce (async(id)=>{
        const [graphRes, dataRes] = await Promise.all([
            axios.get(`https://thingproxy.freeboard.io/fetch/https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=100`),
            axios.get(`https://thingproxy.freeboard.io/fetch/https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`)])
         
        
        const graphData = graphRes.data.prices.map(price => {
            const[timestamp, p] = price;
            const options = {  day: 'numeric', month: 'long' }
            const date = new Date(timestamp).toLocaleDateString("en-us", options)
            return{
                
                    Date : date,
                    Price: p,
                  
            }
        })
        
        set({dataRes})
        set({graphData})
        
    },300),
}));

export default showStore