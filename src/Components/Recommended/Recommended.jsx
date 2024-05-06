import { useState, useEffect } from "react";
import "./Recommended.css";
import { value_converter } from "../../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [recommendedData, setRecommendedData] = useState([]);
  const fetchRecommendedData = async () => {
    const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${import.meta.env.VITE_API_KEY}`;
    await fetch(relatedVideoUrl)
      .then((res) => res.json())
      .then((data) => setRecommendedData(data.items));
  };

  useEffect(() => {
    fetchRecommendedData();
  }, []);

  return (
    <div className="recommended">
      {recommendedData.map((item, index) => {
        return (
          <Link to={`/video/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
