import { useState, useEffect } from 'react';
import './Video.css';
import PlayVideo from '../../Components/PlayVideo/PlayVideo';
import Recommended from '../../Components/Recommended/Recommended';
import {useParams} from 'react-router-dom';

const Video = () => {
  const [categoryId, setCategoryId] = useState(0);
  const {videoId} = useParams();
  useEffect(() => {
    const fetchCategoryId = async () => {
      // Fetching Videos Data
      const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(videoDetailsUrl);
      const result = await response.json();
      setCategoryId(result.snippet.categoryId);
    };
    fetchCategoryId();
  }, []);
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId}></PlayVideo>
      <Recommended categoryId={categoryId}></Recommended>
    </div>
  )
}

export default Video