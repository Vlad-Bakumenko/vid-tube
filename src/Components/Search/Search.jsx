import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { value_converter } from '../../data';
import moment from 'moment';
import PlayVideo from '../PlayVideo/PlayVideo';
import {Navigate} from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Search.css'
 
const Search = ({input, sidebar, category,setCategory}) => {
  const [searchResults,setSearchResults] = useState([]); 
  const fetchSearchResults = async () => {
    const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${import.meta.env.VITE_API_KEY}`
    await fetch(searchUrl).then(res=>res.json()).then(data=>setSearchResults(data.items));
  }
  useEffect(() => {
    fetchSearchResults();
  }, [])

  return (
    <>
    <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
    <div className={`container ${sidebar?"":'large-container'}`}>
    <div className='search'>
      {searchResults.map((item,index)=>{
          return (
        <Link to={`../video/${item.id.videoId}`} className="card" key={index}>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>{moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>)})}
    </div>
    </div>
    </>
  )
}

export default Search