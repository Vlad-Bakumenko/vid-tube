import { useState, useEffect } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { value_converter, time_ago } from '../../data';
import { useParams } from 'react-router-dom';
import { getVideoById, getChannelById, getComments } from '../../api';
import { VideoItem, ChannelItem, CommentThread } from '../../types';

const PlayVideo = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [apiData, setApiData] = useState<VideoItem | null>(null);
  const [channelData, setChannelData] = useState<ChannelItem | null>(null);
  const [commentData, setCommentData] = useState<CommentThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchVideoData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getVideoById(videoId!, controller.signal);
        if (!result.items?.length) throw new Error('Video not found');
        setApiData(result.items[0]);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError')
          setError(err.message || 'Failed to load video.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();
    return () => controller.abort();
  }, [videoId]);

  useEffect(() => {
    if (!apiData) return;
    const controller = new AbortController();
    const fetchChannelAndComments = async () => {
      try {
        const [channelJson, commentJson] = await Promise.all([
          getChannelById(apiData.snippet.channelId, controller.signal),
          getComments(videoId!, controller.signal),
        ]);
        setChannelData(channelJson.items[0]);
        setCommentData(commentJson.items);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError')
          console.error('Failed to load channel/comments:', err);
      }
    };
    fetchChannelAndComments();
    return () => controller.abort();
  }, [apiData, videoId]);

  if (loading) return <div className='spinner' />;
  if (error) return <div className='error-message'><span>⚠️</span><span>{error}</span></div>;

  return (
    <div className='play-video'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>
      <div className='play-video-info'>
        <p>
          {apiData ? `${value_converter(apiData.statistics.viewCount)} Views` : ''}
          &bull;
          {apiData ? time_ago(apiData.snippet.publishedAt) : ''}
        </p>
        <div>
          <span>
            <img src={like} alt='Like' />
            {apiData ? value_converter(apiData.statistics.likeCount) : ''}
          </span>
          <span><img src={dislike} alt='Dislike' /></span>
          <span><img src={share} alt='Share' />Share</span>
          <span><img src={save} alt='Save' />Save</span>
        </div>
      </div>
      <hr />
      <div className='publisher'>
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ''}
          alt={apiData ? apiData.snippet.channelTitle : 'Channel thumbnail'}
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
          <span>
            {channelData ? value_converter(channelData.statistics.subscriberCount) : ''} Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className='vid-description'>
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : ''}</p>
        <hr />
        <h4>{apiData ? apiData.statistics.commentCount : ''} Comments</h4>
        {commentData.map((item, index) => (
          <div key={index} className='comment'>
            <img
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt={item.snippet.topLevelComment.snippet.authorDisplayName}
            />
            <div>
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName}
                <span>{time_ago(item.snippet.topLevelComment.snippet.publishedAt)}</span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className='comment-action'>
                <img src={like} alt='Like comment' />
                <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                <img src={dislike} alt='Dislike comment' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
