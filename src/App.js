import './App.css';
import React ,{UseState,UsEffect, useEffect, useState} from "react";
import axios from "axios";
import Coin from "./Coin";

function App() {
  const [coins,setcoins]=useState([])
  const [search,setsearch]=useState('')

  useEffect(()=>{
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&sparkline=false")
    .then(res=>{
      setcoins(res.data)
      console.log(res.data);
    }).catch(err=>{
      console.log('its an error')
    })
  },[])

  const handlechange=e=>{
    setsearch(e.target.value)
  }

  const filteredcoins=coins.filter(coin=>{
    return coin.name.toLowerCase().includes (search.toLowerCase())
})
    
  return (
    <div className="crypto-app">
      <div className="coin-search">
      <h1 className="coin-text">Search a currency</h1>
      <form>
        <input type="text"  placeholder="Search"className="coin-input" onChange={handlechange} />
      </form>
      </div>
      {filteredcoins.map(coin=>{
        return (
          <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} marketcap={coin.market_cap} price={coin.current_price}
          priceChange={coin.price_change_percentage_24h} 
          volume={coin.total_volume}/>
        )
      })}
    </div>
  );
}

export default App;
