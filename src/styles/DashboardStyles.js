// DashboardStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: #f3f5f9;
`;

export const Sidebar = styled.aside`
  width: 16rem;
  border-right: 3px solid #3b82f6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const LogoText = styled.div`
  h1 {
    font-weight: 800;
    font-size: 1.125rem;
    color: #111827;
  }
  p {
    font-size: 0.75rem;
    color: #9ca3af;
    font-weight: 300;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.875rem;
  color: #374151;

  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #111827;
      background: #e5e7eb;
    }

    &.active {
      background: #d1fae5;
      color: #047857;
    }
  }
`;

export const SidebarFooter = styled.div`
  font-size: 0.5625rem;
  color: #9ca3af;
  font-weight: 300;
  line-height: 1.25;
`;

export const Main = styled.main`
  flex: 1;
  padding: 1.5rem;
`;

export const Topbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  background: white;
  border: 1px solid #d1d5db;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  width: 100%;
  max-width: 32rem;
`;

export const SearchInput = styled.input`
  flex: 1;
  font-size: 0.75rem;
  border: none;
  outline: none;
  color: #6b7280;
`;

export const TopIcons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const IconBtn = styled.button`
  background: ${({ bg }) => bg || '#dbeafe'};
  color: ${({ color }) => color || '#2563eb'};
  padding: 0.5rem;
  border-radius: 0.375rem;
  position: relative;
  border: none;

  &:hover {
    background: ${({ hover }) => hover || '#bfdbfe'};
  }

  span {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    background: ${({ badge }) => badge || '#3b82f6'};
    color: white;
    font-size: 0.625rem;
    font-weight: 600;
    border-radius: 9999px;
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Profile = styled.div`
  background: white;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
`;

export const DashboardTitle = styled.div`
  margin-bottom: 1.5rem;

  h2 {
    font-weight: 700;
    color: #1f2937;
    font-size: 1.125rem;
  }

  p {
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 300;
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

export const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    width: 3rem;
    height: 3rem;
  }

  .details {
    p {
      font-size: 0.75rem;
      color: #6b7280;
      font-weight: 300;
    }

    h4 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
    }

    .change {
      font-size: 0.625rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.25rem;

      &.up {
        color: #10b981;
      }

      &.down {
        color: #ef4444;
      }
    }
  }
`;

export const PlaceholderBox = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  min-height: 12rem;

  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.75rem;
    color: #9ca3af;
    font-weight: 300;
  }
`;
