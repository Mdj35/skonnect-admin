import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SidebarNav from '../components/Sidebar';
import { FaBullhorn, FaCalendarAlt, FaExclamationTriangle, FaBell } from 'react-icons/fa'; // Add icons

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
  max-width: 1000px;
  width: 100%;
`;

const AnnouncementForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const InputBase = styled.input`
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

const TextArea = styled.textarea`
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

const SelectBox = styled.select`
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

const Button = styled.button`
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

const AnnouncementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
`;

const AnnouncementCard = styled.div`
  background: ${({ dark }) => (dark ? '#18181b' : '#f3f5f9')};
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const AnnouncementTitle = styled.b`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const AnnouncementMessage = styled.div`
  margin: 0.5rem 0;
  font-size: 0.95rem;
`;

const AnnouncementDate = styled.div`
  font-size: 0.8rem;
  color: ${({ dark }) => (dark ? '#a1a1aa' : '#6b7280')};
`;

const AnnouncementTypeIcon = ({ type }) => {
  switch (type) {
    case 'General':
      return <FaBullhorn title="General" style={{ color: '#2563eb', marginRight: 6 }} />;
    case 'Event':
      return <FaCalendarAlt title="Event" style={{ color: '#10b981', marginRight: 6 }} />;
    case 'Alert':
      return <FaExclamationTriangle title="Alert" style={{ color: '#f43f5e', marginRight: 6 }} />;
    case 'Reminder':
      return <FaBell title="Reminder" style={{ color: '#eab308', marginRight: 6 }} />;
    default:
      return null;
  }
};

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
            <InputBase
              dark={darkMode}
              value={announcementTitle}
              onChange={e => setAnnouncementTitle(e.target.value)}
              placeholder="Title"
              disabled={announcementLoading}
            />
            <SelectBox
              dark={darkMode}
              value={announcementType}
              onChange={e => setAnnouncementType(e.target.value)}
              disabled={announcementLoading}
            >
              <option value="General">General</option>
              <option value="Event">Event</option>
              <option value="Alert">Alert</option>
              <option value="Reminder">Reminder</option>
            </SelectBox>
            <TextArea
              dark={darkMode}
              value={announcementInput}
              onChange={e => setAnnouncementInput(e.target.value)}
              placeholder="Type announcement message..."
              disabled={announcementLoading}
            />
            <Button type="submit" disabled={announcementLoading}>
              Post
            </Button>
          </AnnouncementForm>

          <AnnouncementsGrid>
            {announcements.length === 0 && <p>No announcements yet.</p>}
            {announcements.map((a, i) => (
              <AnnouncementCard key={i} dark={darkMode}>
                <AnnouncementTitle>
                  <AnnouncementTypeIcon type={a.type} />
                  [{a.type}] {a.title}
                </AnnouncementTitle>
                <AnnouncementMessage>{a.message}</AnnouncementMessage>
                <AnnouncementDate dark={darkMode}>{a.created_at}</AnnouncementDate>
              </AnnouncementCard>
            ))}
          </AnnouncementsGrid>
        </AnnouncementBox>
      </ContentContainer>
    </PageContainer>
  );
};

export default Announcements;
