import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const { user, updateUser } = useAuth();

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/stories?limit=30');
      setStories(response.data);
    } catch (error) {
      console.error("Failed to fetch stories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleScrape = async () => {
    try {
      setScraping(true);
      await api.post('/scrape');
      await fetchStories();
    } catch (error) {
      console.error("Scraping failed", error);
    } finally {
      setScraping(false);
    }
  };

  const onBookmarkToggle = (updatedBookmarks) => {
    if (user) {
      updateUser({ ...user, bookmarks: updatedBookmarks });
    }
  };

  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="hero-title">Top Hacker News Stories</h1>
        <p className="hero-subtitle">Discover trending developer news updated in real time.</p>
        <button 
          className="btn btn-primary" 
          onClick={handleScrape} 
          disabled={scraping}
        >
          {scraping ? 'Scraping...' : 'Scrape Latest'}
        </button>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="stories-grid">
          {stories.map(story => (
            <StoryCard 
              key={story._id} 
              story={story} 
              user={user}
              isBookmarked={user?.bookmarks?.includes(story._id)}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </div>
      )}
      
      {!loading && stories.length === 0 && (
        <div className="text-center mt-4">
          <p>No stories found. Try scraping some!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
