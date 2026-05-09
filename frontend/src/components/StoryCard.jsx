import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ExternalLink } from 'lucide-react';
import api from '../services/api';

const StoryCard = ({ story, isBookmarked, onBookmarkToggle, user }) => {

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to bookmark stories");
      return;
    }
    
    try {
      const response = await api.post(`/stories/${story._id}/bookmark`);
      onBookmarkToggle(response.data.bookmarks);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <div className="story-card">
      <h3 className="story-title">
        <a href={story.url} target="_blank" rel="noopener noreferrer">
          {story.title} <ExternalLink size={14} style={{ display: 'inline', marginLeft: '4px' }} />
        </a>
      </h3>
      
      <div className="story-meta">
        <div className="story-points">
          <span style={{ color: 'var(--accent-color)' }}>▲</span> {story.points} points
        </div>
        <div>
          by {story.author} • {story.postedAt}
        </div>
        <button 
          className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={handleBookmark}
          title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
