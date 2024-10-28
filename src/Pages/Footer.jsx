import React from 'react';
import { GithubOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons'; // Correct imports
import './Footer.css'; // Assuming you have a separate CSS file for styles

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'none',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'grey', // Default text color
      position:"relative",bottom:"0",width:'100%'
    }}>
      
      <div style={{ marginBottom: '10px',}}>
        <h4 style={{textAlign:"center",marginBottom:'0.4rem'}}>Socials</h4>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a className='anchor' href="https://github.com/mayankrawat99" target="_blank" rel="noopener noreferrer">
            <GithubOutlined style={{ fontSize: '24px', color: 'grey', cursor: 'pointer' }} />
          </a>
          <a className='anchor' href="https://www.linkedin.com/in/mayank-rawat-b39678209" target="_blank" rel="noopener noreferrer">
            <LinkedinOutlined style={{ fontSize: '24px', color: 'grey', cursor: 'pointer' }} />
          </a>
          <a  className='anchor' href="https://instagram.com/mayannkk_xd" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined style={{ fontSize: '24px', color: 'grey', cursor: 'pointer' }} />
          </a>
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <p>© {new Date().getFullYear()} FinTracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
