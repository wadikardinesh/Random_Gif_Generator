import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios';
import Spinner from './Spinner';
import LoadingBar from 'react-top-loading-bar'


const Tag = () => {
  const[progress, setProgress]= useState(0)
    const API_KEY = process.env.REACT_APP_GIPHY_APP_KEY;
    const [tag,setTag]= useState('');
    const[gif,setGif] = useState('');
    const[loading,setLoading]=useState('false');

  async  function fetchData(){
    setProgress(40)
        setLoading(true)
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`
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

      function ClickHandler(){
          fetchData();
      }
      function ChangeHandler(event){
        setTag(event.target.value)
      }

  return (
    <div className='tag'>
      <div className='container'>
        <h2> Random {tag} Gif</h2>
  
       {
       loading ? (<Spinner/>) : (<img src={gif} style={{borderRadius:"10px"}}></img>)
       }
     
       <div className='buttons'>
        <input placeholder='Enter The Name' onChange={ChangeHandler} value={tag}></input>
        <button className='btn' onClick={ClickHandler}>Generator</button>
       </div>
       <LoadingBar
        color="red"
        progress={progress}
        height={3}/>
      
      </div>
    </div>
  )
}

export default Tag
