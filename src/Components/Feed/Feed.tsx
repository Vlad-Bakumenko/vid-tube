import './Feed.css';
import { Link } from 'react-router-dom';
import { value_converter, time_ago } from '../../data';
import { useState, useEffect } from 'react';
import { getPopularVideos } from '../../api';
import { VideoItem } from '../../types';

interface FeedProps {
  category: number;
}

const Feed = ({ category }: FeedProps) => {
  const [data, setData] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getPopularVideos(category, controller.signal);
        setData(result.items);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError')
          setError('Failed to load videos. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [category]);

  if (loading) return <div className='spinner' />;
  if (error) return <div className='error-message'><span>⚠️</span><span>{error}</span></div>;

  return (
    <div className='feed'>
      {data.map((item, index) => (
        <Link to={`video/${item.id}`} className='card' key={index} onClick={() => window.scrollTo(0, 0)}>
          <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>{value_converter(item.statistics.viewCount)} views &bull; {time_ago(item.snippet.publishedAt)}</p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
