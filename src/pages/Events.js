import React, { useEffect, useState } from 'react';
import SidebarNav from '../components/Sidebar';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTrash, FaUsers } from 'react-icons/fa';
import {
  Layout,
  Container,
  Title,
  Form,
  InputGroup,
  Input,
  Select,
  Checkbox,
  TextArea,
  Button,
  DangerButton,
  FieldGroup,
  EventList,
  EventCard,
  EventImage,
  EventInfo,
  IconText,
  StatusBadge,
  ParticipantModal,
  ModalContent,
  ParticipantCard,
  ModalTitle
} from '../styles/EventsStyles';
import styled from 'styled-components';

const MessageModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #0008;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const MessageModalBox = styled.div`
  background: #fff;
  color: #18181b;
  border-radius: 1rem;
  padding: 2rem 2.5rem;
  box-shadow: 0 4px 24px #0003;
  text-align: center;
  min-width: 320px;
  font-weight: 600;
  border: 2px solid ${({ type }) => (type === 'error' ? '#f43f5e' : '#10b981')};
`;

const MessageModalButton = styled.button`
  margin-top: 1.5rem;
  background: ${({ type }) => (type === 'error' ? '#f43f5e' : '#2563eb')};
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: ${({ type }) => (type === 'error' ? '#dc2626' : '#1e40af')}; }
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', date: '', time: '', location: '', image: null, status: 'upcoming'
  });
  const [customFields, setCustomFields] = useState([]);
  const [fieldInput, setFieldInput] = useState({ label: '', type: 'text', required: true });

  const [participantsModal, setParticipantsModal] = useState(false);
  const [selectedEventParticipants, setSelectedEventParticipants] = useState([]);
  const [selectedEventTitle, setSelectedEventTitle] = useState('');
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [selectedEventAttendance, setSelectedEventAttendance] = useState([]);
  const [selectedAttendanceTitle, setSelectedAttendanceTitle] = useState('');

  // ✅ Add this
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost/skonnect-api/events.php');
      let data = await res.json();
      // Remove the filter so ALL events are shown
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const handleAddCustomField = () => {
    if (!fieldInput.label) return;
    setCustomFields(prev => [...prev, { ...fieldInput }]);
    setFieldInput({ label: '', type: 'text', required: true });
  };

  const removeCustomField = (index) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (form.image) formData.append('image', form.image);

    try {
      const res = await fetch('http://localhost/skonnect-api/events.php', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();

      if (result.success && result.event_id) {
        await fetch('http://localhost/skonnect-api/event_fields.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_id: result.event_id,
            fields: customFields
          })
        });

        setForm({ title: '', description: '', date: '', time: '', location: '', image: null, status: 'upcoming' });
        setCustomFields([]);
        fetchEvents();

        // ✅ show success message
        setMessage({ type: 'success', text: result.message || 'Event added successfully.' });
      } else {
        // ✅ show error message (duplicate title, etc.)
        setMessage({ type: 'error', text: result.message || 'Failed to add event.' });
      }
    } catch (err) {
      console.error("Error saving event", err);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
  };

  // Fetch participants and show modal
  const fetchParticipants = async (event_id, title) => {
    try {
      const res = await fetch(`http://localhost/skonnect-api/fetch_event_responses.php?event_id=${event_id}`);
      const data = await res.json();
      setSelectedEventParticipants(data.participants || []);
      setSelectedEventTitle(title);
      setParticipantsModal(true);
    } catch (err) {
      console.error('Failed to fetch participants', err);
    }
  };

  // Fetch attendance and show modal
  const fetchAttendance = async (event_id, title) => {
    try {
      const res = await fetch(`http://localhost/skonnect-api/fetch_attendance.php?event_id=${event_id}`);
      const data = await res.json();
      setSelectedEventAttendance(data.attendance || []);
      setSelectedAttendanceTitle(title);
      setAttendanceModal(true);
    } catch (err) {
      console.error('Failed to fetch attendance', err);
    }
  };

  return (
    <Layout>
      <SidebarNav />
      <Container>
        <Title>📅 Create Event & Custom Form</Title>
        {/* ✅ Show message modal if exists */}
        {message && (
          <MessageModalOverlay>
            <MessageModalBox type={message.type}>
              {message.text}
              <MessageModalButton
                type={message.type}
                onClick={() => setMessage(null)}
              >
                OK
              </MessageModalButton>
            </MessageModalBox>
          </MessageModalOverlay>
        )}
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input type="text" placeholder="Event Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </InputGroup>
          <InputGroup>
            <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
          </InputGroup>
          <InputGroup>
            <Input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
          </InputGroup>
          <InputGroup>
            <Input type="text" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
          </InputGroup>
          <InputGroup style={{ flexBasis: '100%' }}>
            <TextArea rows="3" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          </InputGroup>
          <InputGroup style={{ flexBasis: '100%' }}>
            <Input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
          </InputGroup>

          <h4 style={{ margin: '1.5rem 0 0.5rem', color: '#2563eb', fontWeight: 700, flexBasis: '100%' }}>📝 Custom Form Fields</h4>
          <FieldGroup>
            <Input placeholder="Field Label" value={fieldInput.label} onChange={e => setFieldInput({ ...fieldInput, label: e.target.value })} />
            <Select value={fieldInput.type} onChange={e => setFieldInput({ ...fieldInput, type: e.target.value })}>
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </Select>
            <label>
              <Checkbox type="checkbox" checked={fieldInput.required} onChange={e => setFieldInput({ ...fieldInput, required: e.target.checked })} />
              Required
            </label>
            <Button type="button" onClick={handleAddCustomField}>➕ Add</Button>
          </FieldGroup>

          {customFields.map((f, idx) => (
            <FieldGroup key={idx}>
              <span>{f.label} ({f.type}) {f.required ? '*' : ''}</span>
              <DangerButton type="button" onClick={() => removeCustomField(idx)}>
                <FaTrash />
              </DangerButton>
            </FieldGroup>
          ))}

          <Button type="submit">📌 Save Event</Button>
        </Form>

        <EventList>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb', marginBottom: '1.5rem' }}>
            📋 Upcoming Events
          </h3>
          {events.map(ev => (
            <EventCard key={ev.id}>
              {ev.image && <EventImage src={ev.image} alt="Event" draggable={false}/>}
              <EventInfo>
                <h4 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#1e293b', marginBottom: 2 }}>
                  {ev.title}
                  <StatusBadge status={ev.status}>{ev.status === 'upcoming' ? 'Upcoming' : 'Done'}</StatusBadge>
                </h4>
                <p style={{ color: '#475569', margin: '0.25rem 0 0.5rem' }}>{ev.description}</p>
                <IconText><FaCalendarAlt /> {ev.date}</IconText>
                <IconText><FaClock /> {ev.time}</IconText>
                <IconText><FaMapMarkerAlt /> {ev.location}</IconText>
              </EventInfo>
              <Button onClick={() => fetchParticipants(ev.id, ev.title)}>
                <FaUsers /> See Participants
              </Button>
              <Button onClick={() => fetchAttendance(ev.id, ev.title)} style={{ marginLeft: 8 }}>
                📝 Show Attendance
              </Button>
            </EventCard>
          ))}
        </EventList>

        {/* Attendance Modal */}
        {attendanceModal && (
          <ParticipantModal onClick={() => setAttendanceModal(false)}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <ModalTitle>📝 Attendance - {selectedAttendanceTitle}</ModalTitle>
              {selectedEventAttendance.length === 0 ? (
                <p style={{ color: '#64748b', textAlign: 'center', margin: '2rem 0' }}>No attendance found.</p>
              ) : (
                selectedEventAttendance.map((a, idx) => (
                  <ParticipantCard key={idx}>
                    <p style={{ marginBottom: 8, color: '#2563eb', fontWeight: 600 }}>
                      <span style={{ color: '#334155' }}><strong>Name:</strong></span> {a.full_name}
                    </p>
                    <p style={{ margin: 0, color: '#334155' }}>
                      <strong>User ID:</strong> {a.user_id}
                    </p>
                    <p style={{ margin: 0, color: '#334155' }}>
                      <strong>Date:</strong> {a.timestamp}
                    </p>
                  </ParticipantCard>
                ))
              )}
              <Button onClick={() => setAttendanceModal(false)} style={{ marginTop: '1.5rem', width: '100%' }}>
                Close
              </Button>
            </ModalContent>
          </ParticipantModal>
        )}

        {/* Modal shows responses when button is pressed */}
        {participantsModal && (
          <ParticipantModal onClick={() => setParticipantsModal(false)}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <ModalTitle>👥 Participants - {selectedEventTitle}</ModalTitle>
              {selectedEventParticipants.length === 0 ? (
                <p style={{ color: '#64748b', textAlign: 'center', margin: '2rem 0' }}>No participants found.</p>
              ) : (
                selectedEventParticipants.map((p, idx) => (
                  <ParticipantCard key={idx}>
                    <p style={{ marginBottom: 8, color: '#2563eb', fontWeight: 600 }}>
                      <span style={{ color: '#334155' }}><strong>Email:</strong></span> {p.email}
                    </p>
                    {Object.entries(p.responses || {}).map(([label, value]) => (
                      <p key={label} style={{ margin: 0, color: '#334155' }}>
                        <strong>{label}:</strong> {value}
                      </p>
                    ))}
                  </ParticipantCard>
                ))
              )}
              <Button onClick={() => setParticipantsModal(false)} style={{ marginTop: '1.5rem', width: '100%' }}>
                Close
              </Button>
            </ModalContent>
          </ParticipantModal>
        )}
      </Container>
    </Layout>
  );
};

export default Events;