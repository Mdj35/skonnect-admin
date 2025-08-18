import styled from 'styled-components';

// Layout and Container
export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f3f5f9;
`;

export const Container = styled.div`
  flex: 1;
  padding: 3rem 4vw;
  font-family: 'Inter', sans-serif;
  background: transparent;
`;

// Title
export const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 900;
  margin-bottom: 2.5rem;
  color: #0f172a;
  letter-spacing: -1.5px;
  text-shadow: 0 2px 8px #c7d2fe44;
`;

// Form (side by side layout)
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 3%;
  margin-bottom: 3rem;
  max-width: 900px;
  background: rgba(255,255,255,0.95);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 6px 32px rgba(59,130,246,0.08);
  border: 1.5px solid #c7d2fe;
`;

// Each input group will take about 48% width for two columns
export const InputGroup = styled.div`
  flex: 1 1 45%;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Inputs
export const Input = styled.input`
  padding: 1rem 1.25rem;
  border: 1.5px solid #c7d2fe;
  border-radius: 0.75rem;
  font-size: 1.05rem;
  background: #f1f5f9;
  transition: border 0.2s;
  &:focus { border-color: #6366f1; outline: none; }
`;

export const Select = styled.select`
  padding: 1rem 1.25rem;
  border: 1.5px solid #c7d2fe;
  border-radius: 0.75rem;
  font-size: 1.05rem;
  background: #f1f5f9;
  transition: border 0.2s;
  &:focus { border-color: #6366f1; outline: none; }
`;

export const Checkbox = styled.input`
  margin-right: 0.5rem;
  accent-color: #6366f1;
`;

export const TextArea = styled.textarea`
  padding: 1rem 1.25rem;
  border: 1.5px solid #c7d2fe;
  border-radius: 0.75rem;
  font-size: 1.05rem;
  background: #f1f5f9;
  transition: border 0.2s;
  &:focus { border-color: #6366f1; outline: none; }
`;

// Buttons
export const Button = styled.button`
  background: linear-gradient(90deg, #6366f1 0%, #2563eb 100%);
  color: white;
  padding: 1rem 2.25rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 800;
  cursor: pointer;
  font-size: 1.05rem;
  box-shadow: 0 2px 8px #6366f122;
  transition: background 0.2s, transform 0.1s;
  &:hover { background: #2563eb; transform: translateY(-2px) scale(1.03);}
`;

export const DangerButton = styled(Button)`
  background: linear-gradient(90deg, #ef4444 0%, #b91c1c 100%);
  &:hover { background: #b91c1c; }
`;

// Field Group
export const FieldGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

// Event List & Card
export const EventList = styled.div`
  margin-top: 3rem;
`;

export const EventCard = styled.div`
  background: linear-gradient(100deg, #f1f5f9 60%, #e0e7ff 100%);
  border-radius: 1.25rem;
  box-shadow: 0 6px 32px rgba(59,130,246,0.10);
  padding: 2rem 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  flex-direction: row;
  border: 1.5px solid #c7d2fe;
  transition: box-shadow 0.2s, border 0.2s;
  &:hover {
    box-shadow: 0 12px 48px #6366f133;
    border-color: #6366f1;
    background: linear-gradient(100deg, #e0e7ff 60%, #f1f5f9 100%);
  }
`;

export const EventImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 1rem;
  border: 2px solid #c7d2fe;
  background: #e0e7ff;
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.05rem;
  color: #6366f1;
  font-weight: 600;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3em 1.1em;
  border-radius: 1em;
  font-size: 0.95em;
  font-weight: 800;
  background: ${props => props.status === 'upcoming' ? '#dbeafe' : '#fee2e2'};
  color: ${props => props.status === 'upcoming' ? '#2563eb' : '#b91c1c'};
  margin-left: 1em;
  letter-spacing: 0.5px;
`;

// Modal
export const ParticipantModal = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(99,102,241,0.18);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 1.5rem;
  max-height: 80vh;
  overflow-y: auto;
  width: 600px;
  box-shadow: 0 10px 32px #6366f144;
  border: 1.5px solid #c7d2fe;
`;

export const ParticipantCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.1rem 1.5rem;
  background: #f1f5f9;
  border-radius: 1rem;
  border: 1.5px solid #c7d2fe;
`;

export const ModalTitle = styled.h3`
  font-size: 1.45rem;
  font-weight: 900;
  color: #6366f1;
  margin-bottom: 2rem;
  letter-spacing: -0.5px;
`;