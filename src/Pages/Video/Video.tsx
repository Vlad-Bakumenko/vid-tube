import { useState, useEffect } from 'react';
import './Video.css';
import PlayVideo from '../../Components/PlayVideo/PlayVideo';
import Recommended from '../../Components/Recommended/Recommended';
import { useParams } from 'react-router-dom';
import { getVideoById } from '../../api';

const Video = () => {
  const [categoryId, setCategoryId] = useState(0);
  const { videoId } = useParams<{ videoId: string }>();

  useEffect(() => {
    const controller = new AbortController();
    const fetchCategoryId = async () => {
      const result = await getVideoById(videoId!, controller.signal);
      setCategoryId(Number(result.items[0].snippet.categoryId));
    };
    fetchCategoryId();
    return () => controller.abort();
  }, [videoId]);

  return (
    <div className='play-container'>
      <PlayVideo />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
