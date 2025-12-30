import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion';
import {
  LinkIcon,
  ClipboardDocumentIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// ✅ API BASE URL (LOCAL + PROD SAFE)
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Define CSS styles as JavaScript objects
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    color: '#212529',
    lineHeight: 1.6,
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  headerTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #4361ee, #f72585)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto',
  },
  urlForm: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  },
  formGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  formInput: {
    flex: 1,
    padding: '0.8rem 1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  btn: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#4361ee',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  btnSecondary: {
    backgroundColor: '#f72585',
  },
  resultContainer: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  },
  resultTitle: {
    fontSize: '1.2rem',
    color: '#3a0ca3',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  resultUrl: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  urlLink: {
    color: '#4361ee',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
  urlList: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableCell: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    fontWeight: 600,
    color: '#3a0ca3',
  },
  errorMessage: {
    color: '#ff3333',
    backgroundColor: '#ffebee',
    padding: '0.8rem',
    borderRadius: '8px',
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  icon: {
    width: '1.25rem',
    height: '1.25rem',
  },
};

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/urls`);
      setUrls(response.data);
    } catch {
      setError('Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    try {
      setLoading(true);
      setError('');
      const response = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl,
      });
      setShortUrl(`${API_BASE_URL}/${response.data.shortCode}`);
      fetchUrls();
    } catch {
      setError('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.headerTitle}>URL Shortener</h1>

      <form onSubmit={handleSubmit} style={styles.urlForm}>
        <div style={styles.formGroup}>
          <input
            type="url"
            style={styles.formInput}
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            required
          />
          <button style={styles.btn} disabled={loading}>
            {loading ? 'Processing...' : 'Shorten'}
          </button>
        </div>
      </form>

      {error && (
        <div style={styles.errorMessage}>
          <ExclamationTriangleIcon style={styles.icon} />
          {error}
        </div>
      )}

      {shortUrl && (
        <div style={styles.resultContainer}>
          <h3 style={styles.resultTitle}>
            <LinkIcon style={styles.icon} />
            Your Short URL
          </h3>
          <div style={styles.resultUrl}>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={styles.urlLink}>
              {shortUrl}
            </a>
            <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
              <button style={{ ...styles.btn, ...styles.btnSecondary }}>
                <ClipboardDocumentIcon style={styles.icon} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      )}

      <div style={styles.urlList}>
        <h2 style={styles.resultTitle}>
          <ChartBarIcon style={styles.icon} />
          Recently Shortened URLs
        </h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Original URL</th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Short URL</th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td style={styles.tableCell}>{url.originalUrl}</td>
                <td style={styles.tableCell}>
                  <a
                    href={`${API_BASE_URL}/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.urlLink}
                  >
                    {`${API_BASE_URL}/${url.shortCode}`}
                  </a>
                </td>
                <td style={styles.tableCell}>{url.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
