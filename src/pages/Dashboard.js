import React, { useEffect, useState, useRef } from 'react';
import { FaBell, FaCommentAlt, FaGift, FaCog, FaSearch, FaDownload, FaEllipsisV, FaArrowUp, FaArrowDown, FaPaperPlane, FaRobot } from 'react-icons/fa';
import {
  Container,
  Main,
  Topbar,
  SearchForm,
  SearchInput,
  TopIcons,
  IconBtn,
  Profile,
  DashboardTitle,
  Grid,
  Card,
  PlaceholderBox
} from '../styles//DashboardStyles';
import Sidebar from '../components/Sidebar';
import styled, { createGlobalStyle } from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

// --- Chatbot Styles ---
const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2.5rem;
  z-index: 999;
  width: 350px;
  max-width: 95vw;
  background: ${({ dark }) => (dark ? '#23232b' : '#fff')};
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(30,41,59,0.18);
  border: 1.5px solid #c7d2fe;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatbotHeader = styled.div`
  background: ${({ dark }) => (dark ? '#18181b' : '#2563eb')};
  color: #fff;
  padding: 1rem 1.25rem;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ChatbotBody = styled.div`
  padding: 1.25rem;
  background: ${({ dark }) => (dark ? '#23232b' : '#f8fafc')};
  flex: 1;
  min-height: 220px;
  max-height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const ChatbotMsg = styled.div`
  align-self: ${({ user }) => (user ? 'flex-end' : 'flex-start')};
  background: ${({ user, dark }) =>
    user ? (dark ? '#6366f1' : '#2563eb') : (dark ? '#27272a' : '#e0e7ff')};
  color: ${({ user, dark }) =>
    user ? '#fff' : (dark ? '#f3f5f9' : '#18181b')};
  padding: 0.7rem 1.1rem;
  border-radius: 1.1rem;
  max-width: 80%;
  font-size: 1rem;
  box-shadow: 0 2px 8px #6366f122;
`;

const ChatbotForm = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  background: ${({ dark }) => (dark ? '#23232b' : '#fff')};
  border-top: 1px solid #e5e7eb;
`;

const ChatbotInput = styled.input`
  flex: 1;
  padding: 0.7rem 1rem;
  border-radius: 0.75rem;
  border: 1.5px solid #c7d2fe;
  font-size: 1rem;
  background: ${({ dark }) => (dark ? '#18181b' : '#f8fafc')};
  color: ${({ dark }) => (dark ? '#fff' : '#18181b')};
  &:focus { border-color: #6366f1; outline: none; }
`;

const ChatbotSend = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
  &:hover { background: #1e40af; }
`;

// --- End Chatbot Styles ---

const GlobalStyle = createGlobalStyle`
  body, #root {
    background: ${({ dark }) => (dark ? '#18181b' : '#f3f5f9')};
    color: ${({ dark }) => (dark ? '#f3f5f9' : '#18181b')};
    transition: background 0.3s, color 0.3s;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 2.5rem;
  background: ${({ dark }) => (dark ? '#27272a' : '#fff')};
  color: ${({ dark }) => (dark ? '#f3f5f9' : '#18181b')};
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  min-width: 160px;
  z-index: 100;
  padding: 0.5rem 0;
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  &:hover {
    background: ${({ dark }) => (dark ? '#18181b' : '#f3f4f6')};
  }
`;

const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function PieChartYouthPerMonth() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost/skonnect-api/youth_per_month.php')
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  const chartData = {
    labels: data.map(d => monthLabels[d.month - 1]),
    datasets: [{
      data: data.map(d => d.count),
      backgroundColor: [
        '#2563eb', '#6366f1', '#f59e42', '#10b981', '#f43f5e', '#eab308',
        '#14b8a6', '#a21caf', '#f472b6', '#64748b', '#22d3ee', '#f87171'
      ],
    }]
  };

  return (
    <div style={{ maxWidth: 220, margin: '0 auto' }}>
      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: { position: 'bottom' },
            tooltip: { enabled: true }
          }
        }}
      />
    </div>
  );
}

const Dashboard = () => {
  const [youthCount, setYouthCount] = useState(0);
  const [youthIncrease, setYouthIncrease] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [eventIncrease, setEventIncrease] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Persist dark mode in localStorage
    const saved = localStorage.getItem('skonnect_dark_mode');
    return saved === 'true';
  });

  // --- Chatbot State ---
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { user: false, text: "Hi! I'm Skonnect Bot. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false); // Loading state for bot response
  const chatBodyRef = useRef(null);

  // Load chat history from XAMPP database (only admin responses)
  useEffect(() => {
    fetch('http://localhost/skonnect-api/chatbot_messages.php')
      .then(res => res.json())
      .then(data => {
        setChatMessages(
          data.length
            ? data.map(msg => ({
                user: msg.sender === 'user',
                text: msg.message
              }))
            : [{ user: false, text: "Hi! I'm Skonnect Bot. How can I help you today?" }]
        );
      })
      .catch(() => {
        setChatMessages([
          { user: false, text: "Hi! I'm Skonnect Bot. How can I help you today?" }
        ]);
      });
  }, []);

  // --- Chatbot Logic ---
  async function sendChatMessage(e) {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;
    const userMsg = chatInput;

    // Add user message to UI
    setChatMessages(msgs => [...msgs, { user: true, text: userMsg }]);
    setChatInput('');
    setLoading(true);

    // Save user message to DB
    fetch('http://localhost/skonnect-api/chatbot_messages.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: 'user',
        message: userMsg
      })
    });

    // Show loading animation for bot response
    setChatMessages(msgs => [...msgs, { user: false, text: "__loading__" }]);

    try {
      // Get bot response from Railway chatbot API
      const response = await fetch('https://skonnect-ai-production.up.railway.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await response.json();
      const botMsg = data.response || "No response from chatbot.";

      // Remove loading animation and add bot response
      setChatMessages(msgs => {
        // Remove the last "__loading__" message
        const filtered = msgs.filter((msg, idx) => !(msg.text === "__loading__" && idx === msgs.length - 1));
        return [...filtered, { user: false, text: botMsg }];
      });

      // Save bot message to DB
      fetch('http://localhost/skonnect-api/chatbot_messages.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'bot',
          message: botMsg
        })
      });
    } catch (err) {
      setChatMessages(msgs => {
        const filtered = msgs.filter((msg, idx) => !(msg.text === "__loading__" && idx === msgs.length - 1));
        return [
          ...filtered,
          { user: false, text: "Sorry, I couldn't connect to the chatbot." }
        ];
      });
      fetch('http://localhost/skonnect-api/chatbot_messages.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'bot',
          message: "Sorry, I couldn't connect to the chatbot."
        })
      });
    }
    setLoading(false);
  }

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, chatOpen]);

  useEffect(() => {
    fetch('http://localhost/skonnect-api/youth_count.php')
      .then(res => res.json())
      .then(data => {
        setYouthCount(data.count);
        setYouthIncrease(data.increase_percent);
      })
      .catch(err => {
        setYouthCount(0);
        setYouthIncrease(0);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost/skonnect-api/event_count.php')
      .then(res => res.json())
      .then(data => {
        setEventCount(data.count);
        setEventIncrease(data.increase_percent);
      })
      .catch(err => {
        setEventCount(0);
        setEventIncrease(0);
      });
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('skonnect_dark_mode', darkMode);
  }, [darkMode]);

  // Close dropdown on outside click
  useEffect(() => {
    const close = (e) => setShowSettings(false);
    if (showSettings) {
      window.addEventListener('click', close);
      return () => window.removeEventListener('click', close);
    }
  }, [showSettings]);

  return (
    <>
      <GlobalStyle dark={darkMode} />
      <Container style={darkMode ? { background: '#18181b', color: '#f3f5f9' } : {}}>
        <Sidebar darkMode={darkMode} />
        <Main>
          {/* Topbar */}
          <Topbar>
            <SearchForm>
              <SearchInput type="text" placeholder="Search here" />
              <button><FaSearch color="#9ca3af" /></button>
            </SearchForm>

            <TopIcons>
              <IconBtn><FaBell /><span>21</span></IconBtn>
              <IconBtn><FaCommentAlt /><span>53</span></IconBtn>
              <IconBtn><FaGift /><span>15</span></IconBtn>
              {/* Settings IconBtn without number, with dropdown */}
              <div style={{ position: 'relative' }}>
                <IconBtn
                  bg="#fecaca"
                  color="#dc2626"
                  hover="#fca5a5"
                  badge="#dc2626"
                  onClick={e => {
                    e.stopPropagation();
                    setShowSettings(s => !s);
                  }}
                  style={{ position: 'relative' }}
                >
                  <FaCog />
                </IconBtn>
                {showSettings && (
                  <Dropdown dark={darkMode} onClick={e => e.stopPropagation()}>
                    <DropdownItem
                      dark={darkMode}
                      onClick={() => setDarkMode(d => !d)}
                    >
                      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </DropdownItem>
                  </Dropdown>
                )}
              </div>
              <Profile>
                <span style={{ fontSize: '0.75rem', color: darkMode ? '#d1d5db' : '#4b5563' }}>Hello, Admin</span>
                <img src="https://storage.googleapis.com/a1aa/image/08ad2863-a8aa-478a-1d80-1614995153a2.jpg" width="32" height="32" style={{ borderRadius: '9999px', objectFit: 'cover' }} />
              </Profile>
            </TopIcons>
          </Topbar>

          {/* Dashboard Header */}
          <DashboardTitle>
            <h2>Dashboard</h2>
            <p>Hi, Samantha. Welcome back to Sedap Admin!</p>
          </DashboardTitle>
          <Grid>
            <Card>
              <img src="https://storage.googleapis.com/a1aa/image/72c4f6ff-caa7-4f9c-ab73-c75d2f54e4e1.jpg" 
              draggable={false}/>
              <div className="details">
                <h4>{youthCount}</h4>
                <p>Total Youths</p>
                <div className={`change ${youthIncrease >= 0 ? 'up' : 'down'}`}>
                  {youthIncrease >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(youthIncrease)}% (30 days)
                </div>
              </div>
            </Card>
            <Card>
              <img src="https://storage.googleapis.com/a1aa/image/282ff782-9f98-47d7-2574-67d99fc6b86f.jpg"
              draggable={false} />
              <div className="details">
                <h4>{eventCount}</h4>
                <p>Total Events</p>
                <div className={`change ${eventIncrease >= 0 ? 'up' : 'down'}`}>
                  {eventIncrease >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(eventIncrease)}% (30 days)
                </div>
              </div>
            </Card>
            <Card>
              <img src="https://storage.googleapis.com/a1aa/image/b95652c1-8356-4413-cad5-414bca08473e.jpg"
              draggable={false} />
              <div className="details">
                <h4>65</h4>
                <p>Total Engagements</p>
                <div className="change down"><FaArrowDown /> 25% (30 days)</div>
              </div>
            </Card>
            <Card>
              <img src="https://storage.googleapis.com/a1aa/image/0d919072-76a0-40e9-61aa-743627f34186.jpg" 
              draggable={false}/>
              <div className="details">
                <h4>₱40,000</h4>
                <p>Total Budget</p>
                <div className="change down"><FaArrowDown /> 12% (30 days)</div>
              </div>
            </Card>
          </Grid>

          {/* Placeholder Sections */}
          <Grid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <PlaceholderBox>
              <h3>📈 Youth Registered Per Month</h3>
              <PieChartYouthPerMonth />
            </PlaceholderBox>
            <PlaceholderBox>
              <h3>📉 Youth Order</h3>
              <p>[Youth engagement graph goes here]</p>
            </PlaceholderBox>
          </Grid>

          <Grid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <PlaceholderBox>
              <h3>💰 Total Budget</h3>
              <p>[Budget line chart visualization goes here]</p>
            </PlaceholderBox>
            <PlaceholderBox>
              <h3>🗺️ Youth Map</h3>
              <p>[Youth data per location]</p>
            </PlaceholderBox>
          </Grid>

          <PlaceholderBox>
            <h3>📝 Youth Review</h3>
            <p>Eum fuga consequuntur utadsjn et.</p>
          </PlaceholderBox>

          {/* --- Chatbot Floating Button & Window --- */}
          <div style={{ position: 'fixed', bottom: '2rem', right: '2.5rem', zIndex: 998 }}>
            {!chatOpen && (
              <IconBtn
                style={{
                  borderRadius: '50%',
                  width: 60,
                  height: 60,
                  background: '#2563eb',
                  color: '#fff',
                  boxShadow: '0 4px 16px #2563eb44',
                  fontSize: 28,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex'
                }}
                onClick={() => setChatOpen(true)}
                title="Open Chatbot"
              >
                <FaRobot />
              </IconBtn>
            )}
          </div>
          {chatOpen && (
            <ChatbotWrapper dark={darkMode}>
              <ChatbotHeader dark={darkMode}>
                <FaRobot /> Skonnect Chatbot
                <span style={{ flex: 1 }} />
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: 20,
                    cursor: 'pointer'
                  }}
                  onClick={() => setChatOpen(false)}
                  title="Close"
                >×</button>
              </ChatbotHeader>
              <ChatbotBody ref={chatBodyRef} dark={darkMode}>
                {chatMessages.map((msg, i) => (
                  <ChatbotMsg key={i} user={msg.user} dark={darkMode}>
                    {msg.text === "__loading__" ? (
                      <span>
                        <span className="dot-typing" style={{
                          display: 'inline-block',
                          width: 40,
                          height: 20,
                          verticalAlign: 'middle'
                        }}>
                          <span style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            margin: '0 2px',
                            background: darkMode ? '#6366f1' : '#2563eb',
                            borderRadius: '50%',
                            animation: 'dotTyping 1.2s infinite'
                          }}></span>
                          <span style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            margin: '0 2px',
                            background: darkMode ? '#6366f1' : '#2563eb',
                            borderRadius: '50%',
                            animation: 'dotTyping 1.2s infinite 0.2s'
                          }}></span>
                          <span style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            margin: '0 2px',
                            background: darkMode ? '#6366f1' : '#2563eb',
                            borderRadius: '50%',
                            animation: 'dotTyping 1.2s infinite 0.4s'
                          }}></span>
                          <style>
                            {`
                              @keyframes dotTyping {
                                0% { opacity: 0.2; }
                                20% { opacity: 1; }
                                100% { opacity: 0.2; }
                              }
                            `}
                          </style>
                        </span>
                      </span>
                    ) : msg.text}
                  </ChatbotMsg>
                ))}
              </ChatbotBody>
              <ChatbotForm dark={darkMode} onSubmit={sendChatMessage}>
                <ChatbotInput
                  dark={darkMode}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  autoFocus
                />
                <ChatbotSend type="submit" title="Send">
                  <FaPaperPlane />
                </ChatbotSend>
              </ChatbotForm>
            </ChatbotWrapper>
          )}
          {/* --- End Chatbot --- */}
        </Main>
      </Container>
    </>
  );
};

export default Dashboard;