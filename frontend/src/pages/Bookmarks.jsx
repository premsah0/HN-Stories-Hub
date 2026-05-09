import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';

const Bookmarks = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        // Fetch all stories and filter client-side since we didn't add a specific backend route
        // This is fine for small scale, or backend could be updated to return specific IDs.
        const response = await api.get('/stories?limit=100');
        const bookmarkedIds = user?.bookmarks || [];
        const filtered = response.data.filter(story => bookmarkedIds.includes(story._id));
        setStories(filtered);
      } catch (error) {
        console.error("Failed to fetch stories", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStories();
    } else {
      setLoading(false);
    }
  }, [user]);

  const onBookmarkToggle = (updatedBookmarks) => {
    if (user) {
      updateUser({ ...user, bookmarks: updatedBookmarks });
      // Remove from view if unbookmarked
      setStories(prev => prev.filter(story => updatedBookmarks.includes(story._id)));
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="stories-header">
        <h2>Your Bookmarked Stories</h2>
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
              isBookmarked={true}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </div>
      )}
      
      {!loading && stories.length === 0 && (
        <div className="text-center mt-4">
          <p>You haven't bookmarked any stories yet.</p>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
