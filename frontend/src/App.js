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

// ✅ API BASE URL (local + production)
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// ================= STYLES =================
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
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
  },

  urlForm: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },

  formGroup: {
    display: 'flex',
    gap: '1rem',
  },

  formInput: {
    flex: 1,
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '2px solid #ddd',
    fontSize: '1rem',
  },

  btn: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#4361ee',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  btnSecondary: {
    backgroundColor: '#f72585',
  },

  resultContainer: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },

  resultTitle: {
    fontSize: '1.2rem',
    color: '#3a0ca3',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
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
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  tableCell: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    verticalAlign: 'top',
  },

  // ✅ FIX FOR LONG URL OVERFLOW
  truncatedCell: {
    maxWidth: '400px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  tableHeader: {
    backgroundColor: '#f8f9fa',
    fontWeight: 600,
    color: '#3a0ca3',
  },

  errorMessage: {
    marginTop: '1rem',
    padding: '0.8rem',
    borderRadius: '8px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  icon: {
    width: '1.25rem',
    height: '1.25rem',
  },
};

// ================= APP =================
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
      const res = await axios.get(`${API_BASE_URL}/api/urls`);
      setUrls(res.data);
    } catch {
      setError('Failed to fetch URLs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    try {
      setLoading(true);
      setError('');
      const res = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl,
      });
      setShortUrl(`${API_BASE_URL}/${res.data.shortCode}`);
      fetchUrls();
    } catch {
      setError('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <motion.header style={styles.header}>
        <h1 style={styles.headerTitle}>URL Shortener</h1>
        <p style={styles.headerSubtitle}>
          Create short, memorable links and track their performance
        </p>
      </motion.header>

      <div style={styles.urlForm}>
        <form onSubmit={handleSubmit}>
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
              {loading ? (
                <>
                  <ArrowPathIcon style={styles.icon} />
                  Processing
                </>
              ) : (
                <>
                  <LinkIcon style={styles.icon} />
                  Shorten
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div style={styles.errorMessage}>
            <ExclamationTriangleIcon style={styles.icon} />
            {error}
          </div>
        )}
      </div>

      {shortUrl && (
        <div style={styles.resultContainer}>
          <h3 style={styles.resultTitle}>
            <LinkIcon style={styles.icon} />
            Your Short URL
          </h3>
          <div style={styles.resultUrl}>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.urlLink}
            >
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
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                Original URL
              </th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                Short URL
              </th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                Clicks
              </th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                {/* ✅ FIXED LONG URL COLUMN */}
                <td style={{ ...styles.tableCell, ...styles.truncatedCell }}>
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.urlLink}
                    title={url.originalUrl}
                  >
                    {url.originalUrl}
                  </a>
                </td>

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
