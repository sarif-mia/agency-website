import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0a0a0a',
      borderRadius: '20px',
      padding: '40px 60px',
      color: '#fff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '1200px',
      margin: '40px auto',
      boxSizing: 'border-box'
    }}>
      {/* Newsletter Subscription Bar */}
      <div style={{
        backgroundColor: '#121212',
        borderRadius: '12px',
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        boxShadow: '0 4px 20px rgba(255, 87, 34, 0.3)'
      }}>
        <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>
          Join to get free updates <span style={{ color: '#ff5722' }}>every week.</span>
        </div>
        <form style={{ display: 'flex', gap: '10px' }} onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email address"
            required
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              width: '250px',
              backgroundColor: '#222',
              color: '#fff'
            }}
          />
          <button type="submit" style={{
            backgroundColor: '#ff5722',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '700',
            padding: '10px 25px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#e64a19'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#ff5722'}
          >
            Join Now
          </button>
        </form>
      </div>

      {/* Footer Links Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        {/* Brand Info */}
        <div style={{ flex: '1 1 250px', minWidth: '250px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ position: 'relative', width: '40px', height: '40px' }}>
            <span style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #00f5ff, #0066ff)',
              boxShadow: '0 0 15px rgba(0,245,255,0.6)',
              top: 0,
              left: 0,
              transition: 'all 0.3s ease'
            }} />
            <span style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #0066ff, #9966ff)',
              boxShadow: '0 0 15px rgba(153,102,255,0.6)',
              top: '12px',
              left: '18px',
              animation: 'float 4s ease-in-out infinite'
            }} />
            <span style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #9966ff, #ff0080)',
              boxShadow: '0 0 15px rgba(255,0,128,0.6)',
              bottom: 0,
              left: '6px',
              animation: 'rotate 5s linear infinite'
            }} />
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
              }
              @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
          <div>
            <h2 style={{ color: '#00f5ff', margin: 0, fontWeight: '700', fontSize: '1.5rem' }}>SiteGenIT</h2>
            <p style={{ margin: 0, color: '#ccc', fontSize: '0.9rem' }}>Crafting modern web solutions & communities.</p>
          </div>
        </div>

        {/* Product Links */}
        <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
          <h3 style={{ color: '#fff', marginBottom: '15px' }}>Product</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#ccc' }}>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/services" style={{ color: '#ccc', textDecoration: 'none' }}>Features</a>
            </li>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/services" style={{ color: '#ccc', textDecoration: 'none' }}>Pricing</a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
          <h3 style={{ color: '#fff', marginBottom: '15px' }}>Company</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#ccc' }}>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/about-us" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a>
            </li>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/quote" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</a>
            </li>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/blog" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</a>
            </li>
          </ul>
        </div>

        {/* Pages Links */}
        <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
          <h3 style={{ color: '#fff', marginBottom: '15px' }}>Pages</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#ccc' }}>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/terms-conditions" style={{ color: '#ccc', textDecoration: 'none' }}>Terms & Conditions</a>
            </li>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/privacy-policy" style={{ color: '#ccc', textDecoration: 'none' }}>Privacy Policy</a>
            </li>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/resources" style={{ color: '#ccc', textDecoration: 'none' }}>Free Resources</a>
            </li>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/portfolio-download" style={{ color: '#ccc', textDecoration: 'none' }}>Portfolio Download</a>
            </li>
            <li style={{ marginBottom: '10px', cursor: 'pointer' }}>
              <a href="/client-portal" style={{ color: '#ccc', textDecoration: 'none' }}>Client Portal</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
