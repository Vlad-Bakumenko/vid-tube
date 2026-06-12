import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { time_ago } from '../../data';
import Sidebar from '../Sidebar/Sidebar';
import { searchVideos } from '../../api';
import { SearchResultItem } from '../../types';
import { useApp } from '../../context/AppContext';
import './Search.css';

const Search = () => {
  const { input, sidebar, category, setCategory } = useApp();
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchVideos(input, controller.signal);
        setSearchResults(data.items);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError')
          setError('Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
    return () => controller.abort();
  }, [input]);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
        <div className='search'>
          {loading && <div className='spinner' />}
          {error && <div className='error-message'><span>⚠️</span><span>{error}</span></div>}
          {!loading && !error && searchResults.map((item, index) => (
            <Link to={`../video/${item.id.videoId}`} className='card' key={index}>
              <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>{time_ago(item.snippet.publishedAt)}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
