import React, { useState } from 'react';
import { getMoodMovie } from '../api/openai';

export default function MoodMatcher({ onFound }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const title = await getMoodMovie(prompt);
      if (title) {
        onFound(title);
      } else {
        setError('No title returned');
      }
    } catch (e) {
      console.error('Full error:', e);
      setError(e.message || 'AI service error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mood-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="I am feeling ..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Thinking...' : 'Get a movie'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
