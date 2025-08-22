import styled from 'styled-components';

// === Layout ===
export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
`;

export const Container = styled.div`
  flex: 1;
  padding: 2rem 3vw;
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 2.5rem;
  font-family: 'Inter', sans-serif;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

// === Title ===
export const Title = styled.h2`
  grid-column: span 2;
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: #0f172a;
  letter-spacing: -1px;
`;

// === Form Panel ===
export const FormPanel = styled.div`
  position: sticky;
  top: 2rem;
  background: white;
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 6px 24px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: fit-content;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
`;

// Inputs
export const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.6rem;
  font-size: 1rem;
  background: #f8fafc;
  transition: border 0.2s;
  &:focus { border-color: #6366f1; outline: none; }
`;

export const Select = styled.select`
  padding: 0.8rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.6rem;
  font-size: 1rem;
  background: #f8fafc;
  &:focus { border-color: #6366f1; outline: none; }
`;

export const Checkbox = styled.input`
  margin-right: 0.5rem;
  accent-color: #6366f1;
`;

export const TextArea = styled.textarea`
  padding: 0.9rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.6rem;
  font-size: 1rem;
  background: #f8fafc;
  resize: vertical;
  &:focus { border-color: #6366f1; outline: none; }
`;

// Buttons
export const Button = styled.button`
  background: linear-gradient(90deg, #6366f1 0%, #2563eb 100%);
  color: white;
  padding: 0.9rem 1.8rem;
  border: none;
  border-radius: 0.6rem;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  align-self: flex-start;
  box-shadow: 0 3px 12px rgba(99,102,241,0.25);
  transition: all 0.2s;
  &:hover { background: #2563eb; transform: translateY(-2px);}
`;

export const DangerButton = styled(Button)`
  background: linear-gradient(90deg, #ef4444 0%, #b91c1c 100%);
  &:hover { background: #b91c1c; }
`;

// Custom fields (chip-like)
export const FieldGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const FieldChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  background: #e0e7ff;
  color: #3730a3;
  font-size: 0.9rem;
  font-weight: 600;
`;

// === Event List ===
export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const EventCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  border: 1px solid #e2e8f0;
  transition: transform 0.15s, box-shadow 0.15s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 24px rgba(99,102,241,0.25);
  }
`;

export const EventImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.8rem;
  border: 2px solid #e2e8f0;
  background: #f1f5f9;
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.95rem;
  color: #475569;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25em 0.9em;
  border-radius: 1em;
  font-size: 0.8rem;
  font-weight: 700;
  background: ${props => props.status === 'upcoming' ? '#dbeafe' : '#fee2e2'};
  color: ${props => props.status === 'upcoming' ? '#2563eb' : '#b91c1c'};
  margin-left: 0.75em;
`;

// === Modal ===
export const ParticipantModal = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-height: 80vh;
  overflow-y: auto;
  width: 520px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.25);
`;

export const ParticipantCard = styled.div`
  margin-bottom: 1rem;
  padding: 1rem 1.25rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
`;

export const ModalTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
`;
