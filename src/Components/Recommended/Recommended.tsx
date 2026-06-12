import { useState, useEffect } from 'react';
import './Recommended.css';
import { value_converter } from '../../data';
import { Link } from 'react-router-dom';
import { getPopularVideos } from '../../api';
import { VideoItem } from '../../types';

interface RecommendedProps {
  categoryId: number;
}

const Recommended = ({ categoryId }: RecommendedProps) => {
  const [recommendedData, setRecommendedData] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchRecommendedData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPopularVideos(categoryId, controller.signal);
        setRecommendedData(data.items);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError')
          setError('Failed to load recommendations.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendedData();
    return () => controller.abort();
  }, [categoryId]);

  if (loading) return <div className='spinner' />;
  if (error) return <div className='error-message'><span>⚠️</span><span>{error}</span></div>;

  return (
    <div className='recommended'>
      {recommendedData.map((item, index) => (
        <Link to={`/video/${item.id}`} key={index} className='side-video-list'>
          <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
          <div className='vid-info'>
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
