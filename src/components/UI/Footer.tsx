import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '24px 16px 80px 16px',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.65)',
        lineHeight: 1.6,
      }}
    >
      <div>
        Weather data by{' '}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#60cdff',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          Open-Meteo.com
        </a>
      </div>
      <div style={{ marginTop: '4px', fontSize: '11px', opacity: 0.8 }}>
        Hush &bull; Inspired by Apple iOS Weather
      </div>
    </footer>
  );
};
