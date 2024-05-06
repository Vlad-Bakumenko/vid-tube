import "./Feed.css";
import { Link } from 'react-router-dom'
import { value_converter } from "../../data";
import { useState, useEffect } from "react";
import moment from 'moment'


const Feed = ({category}) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(videoListUrl);
      const result = await response.json();
      setData(result.items);
    }
    fetchData();
  }, [category])
  

  return (
    <div className="feed">
      {data.map((item,index)=>{
        return (
      <Link to={`video/${item.id}`} className="card" key={index} onClick={()=>window.scrollTo(0, 0)}>
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <h2>{item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
      </Link>
        )
      })}
    </div>
  );
};

export default Feed;
