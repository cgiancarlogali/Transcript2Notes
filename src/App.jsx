import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Handler for Phase 2: Will trigger the API call later
  const handleGenerateNotes = () => {
    if (!transcript.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing for MVP visual feedback (Phase 1)
    setTimeout(() => {
      setIsProcessing(false);
      alert('Phase 1: Note generation logic is a placeholder. Check back in Phase 2!');
    }, 1500);
  };

  const handleClear = () => {
    setTranscript('');
  };

  return (
    <div className="app-container">
      <div className="theme-switch-wrapper">
        <span>☀️</span>
        <label className="theme-switch" htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <div className="slider round"></div>
        </label>
        <span>🌙</span>
      </div>
      
      <header className="header">
        <h1>Transcript2Notes</h1>
        <p>Transform your meetings and classes into structured, actionable guides.</p>
      </header>

      <main className="main-content">
        <section className="glass-panel input-section">
          <div>
            <label htmlFor="transcript">Paste your transcript here</label>
            <p className="helper-text" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
              Copy text from Zoom, Google Meet, or your class recordings.
            </p>
            <textarea
              id="transcript"
              rows={12}
              placeholder="e.g. 'Welcome everyone to today\'s meeting. We\'re going to discuss...'"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              disabled={isProcessing}
            ></textarea>
          </div>

          <div className="button-group">
            {transcript && (
              <button 
                className="btn-secondary" 
                onClick={handleClear}
                disabled={isProcessing}
              >
                Clear
              </button>
            )}
            <button 
              className="btn-primary" 
              onClick={handleGenerateNotes}
              disabled={isProcessing || !transcript.trim()}
            >
              {isProcessing ? 'Processing AI...' : 'Generate Notes'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
