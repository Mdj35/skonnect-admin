import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SidebarNav from '../components/Sidebar';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ dark }) => (dark ? '#18181b' : '#f3f5f9')};
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const AnnouncementBox = styled.div`
  background: ${({ dark }) => (dark ? '#23232b' : '#fff')};
  border-radius: 1rem;
  box-shadow: 0 2px 8px #2563eb22;
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 600px;
  width: 100%;
`;

const AnnouncementForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const AnnouncementTitleInput = styled.input`
  flex: 1;
  min-width: 160px;
  padding: 0.7rem 1rem;
  border-radius: 0.75rem;
  border: 1.5px solid #c7d2fe;
  font-size: 1rem;
  background: ${({ dark }) => (dark ? '#18181b' : '#f8fafc')};
  color: ${({ dark }) => (dark ? '#fff' : '#18181b')};
  &:focus { border-color: #6366f1; outline: none; }
`;

const AnnouncementMessageInput = styled.textarea`
  flex: 2;
  min-width: 200px;
  padding: 0.7rem 1rem;
  border-radius: 0.75rem;
  border: 1.5px solid #c7d2fe;
  font-size: 1rem;
  background: ${({ dark }) => (dark ? '#18181b' : '#f8fafc')};
  color: ${({ dark }) => (dark ? '#fff' : '#18181b')};
  resize: vertical;
  min-height: 60px;
  &:focus { border-color: #6366f1; outline: none; }
`;

const AnnouncementTypeSelect = styled.select`
  flex: 1;
  min-width: 120px;
  padding: 0.7rem 1rem;
  border-radius: 0.75rem;
  border: 1.5px solid #c7d2fe;
  font-size: 1rem;
  background: ${({ dark }) => (dark ? '#18181b' : '#f8fafc')};
  color: ${({ dark }) => (dark ? '#fff' : '#18181b')};
  &:focus { border-color: #6366f1; outline: none; }
`;

const AnnouncementSend = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #1e40af; }
`;

const Announcements = ({ darkMode = false }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementInput, setAnnouncementInput] = useState('');
  const [announcementType, setAnnouncementType] = useState('General');
  const [announcementLoading, setAnnouncementLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost/skonnect-api/announcements.php')
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(() => setAnnouncements([]));
  }, []);

  async function postAnnouncement(e) {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementInput.trim() || announcementLoading) return;
    setAnnouncementLoading(true);

    await fetch('http://localhost/skonnect-api/announcements.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: announcementTitle,
        message: announcementInput,
        type: announcementType
      })
    });

    setAnnouncementTitle('');
    setAnnouncementInput('');
    setAnnouncementType('General');
    // Reload announcements
    fetch('http://localhost/skonnect-api/announcements.php')
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(() => setAnnouncements([]));
    setAnnouncementLoading(false);
  }

  return (
    <PageContainer dark={darkMode}>
      <SidebarNav />
      <ContentContainer>
        <AnnouncementBox dark={darkMode}>
          <h3>📢 Announcements</h3>
          <AnnouncementForm dark={darkMode} onSubmit={postAnnouncement}>
            <AnnouncementTitleInput
              dark={darkMode}
              value={announcementTitle}
              onChange={e => setAnnouncementTitle(e.target.value)}
              placeholder="Title"
              disabled={announcementLoading}
            />
            <AnnouncementTypeSelect
              dark={darkMode}
              value={announcementType}
              onChange={e => setAnnouncementType(e.target.value)}
              disabled={announcementLoading}
            >
              <option value="General">General</option>
              <option value="Event">Event</option>
              <option value="Alert">Alert</option>
              <option value="Reminder">Reminder</option>
            </AnnouncementTypeSelect>
            <AnnouncementMessageInput
              dark={darkMode}
              value={announcementInput}
              onChange={e => setAnnouncementInput(e.target.value)}
              placeholder="Type announcement message..."
              disabled={announcementLoading}
            />
            <AnnouncementSend type="submit" disabled={announcementLoading}>
              Post
            </AnnouncementSend>
          </AnnouncementForm>
          <div>
            {announcements.length === 0 && <p>No announcements yet.</p>}
            {announcements.map((a, i) => (
              <div key={i} style={{
                background: darkMode ? '#18181b' : '#f3f5f9',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                <b>[{a.type}] {a.title}</b>
                <div style={{ margin: '0.5rem 0' }}>{a.message}</div>
                <div style={{ fontSize: '0.85rem', color: darkMode ? '#a1a1aa' : '#6b7280' }}>
                  {a.created_at}
                </div>
              </div>
            ))}
          </div>
        </AnnouncementBox>
      </ContentContainer>
    </PageContainer>
  );
};

export default Announcements;