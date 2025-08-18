import React from 'react';
import { FaSearch, FaCommentAlt, FaGift, FaDownload, FaCog } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  LogoSection,
  LogoText,
  Nav,
  SidebarFooter
} from '../styles//DashboardStyles';
import logo from '../sk.png';

const SidebarNav = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <div>
        <LogoSection>
          <img src={logo} width="40" height="40" />
          <LogoText>
            <h1>Skonnect</h1>
            <p>Admin Dashboard</p>
          </LogoText>
        </LogoSection>

        <Nav>
          <a href="/" className={location.pathname === '/' ? 'active' : ''}><FaSearch /> Dashboard</a>
          <a href="/youths" className={location.pathname === '/youths' ? 'active' : ''}><FaCommentAlt /> Youths</a>
          <a href="/events" className={location.pathname === '/events' ? 'active' : ''}><FaGift /> Events</a>
          <a href="/analytics" className={location.pathname === '/analytics' ? 'active' : ''}><FaDownload /> Analytics</a>
          <a href="/comments" className={location.pathname === '/comments' ? 'active' : ''}><FaCommentAlt /> Comments</a>
          <a href="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}><FaCog /> Calendar</a>
        </Nav>
      </div>

      <SidebarFooter>
        <p>Sedap Restaurant Admin Dashboard</p>
        <p>© 2020 All Rights Reserved</p>
        <p style={{ marginTop: '0.5rem' }}>Made with ❤️ by Peterdraw</p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;