import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SidebarNav from '../components/Sidebar'; // Import SidebarNav

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f3f5f9;
`;

const PageWrapper = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const SearchBar = styled.input`
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 100%;
  max-width: 350px;
  display: block;
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-collapse: collapse;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Thead = styled.thead`
  background: #3b82f6;
  color: white;

  th {
    padding: 0.75rem;
    font-size: 0.875rem;
    text-align: left;
    font-weight: 600;
  }
`;

const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid #e5e7eb;

    &:hover {
      background: #f9fafb;
    }
  }

  td {
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #374151;
  }
`;

const YouthPage = () => {
  const [youths, setYouths] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch("http://localhost/skonnect-api/youths.php")
      .then(res => res.json())
      .then(data => setYouths(data))
      .catch(err => console.error("Error loading youth data", err));
  }, []);

  // Filter youths based on search input (case-insensitive, checks all fields)
  const filteredYouths = youths.filter(youth =>
    Object.values(youth)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <SidebarNav />
      <PageWrapper>
        <Title>Youth Directory</Title>
        <SearchBar
          type="text"
          placeholder="Search youths..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Table>
          <Thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Birthdate</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Interests</th>
              <th>Email</th>
            </tr>
          </Thead>
          <Tbody>
            {filteredYouths.map(youth => (
              <tr key={youth.id}>
                <td>{youth.id}</td>
                <td>{youth.full_name}</td>
                <td>{youth.birthdate}</td>
                <td>{youth.gender}</td>
                <td>{youth.contact}</td>
                <td>{youth.interests}</td>
                <td>{youth.email}</td>
              </tr>
            ))}
          </Tbody>
        </Table>
      </PageWrapper>
    </Layout>
  );
};

export default YouthPage;
