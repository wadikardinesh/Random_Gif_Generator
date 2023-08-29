import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios';
import Spinner from './Spinner';
import LoadingBar from 'react-top-loading-bar';

const Random = () => {

  const[progress, setProgress] = useState(0)
    const API_KEY = process.env.REACT_APP_GIPHY_APP_KEY;
    const[gif,setGif] = useState('');
    const[loading,setLoading]=useState('false');

  async  function fetchData(){
        setLoading(true)
        setProgress(40)
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
        const {data} = await axios.get(url);
       const imageSource = data.data.images.downsized_large.url ;
       setProgress(70)
       setGif(imageSource)
        setLoading(false)
        setProgress(100)
      }
      useEffect(()=>{
        fetchData();
      },[])

      function changeHandler(){
          fetchData();
      }

  return (
    <div className='random'>
      <div className='container'>
        <h2>A Random Gif</h2>
  
       {
       loading ? (<Spinner/>) : (<img src={gif} style={{borderRadius:"10px"}}></img>)
       }
        <button className='btn' onClick={changeHandler}>Generator</button>
        <LoadingBar
        color='red'
        progress={progress}
        height={3}/>

      </div>
    </div>
  )
}

export default Random
