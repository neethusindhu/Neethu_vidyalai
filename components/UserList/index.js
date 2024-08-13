
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const Table = styled.table(() => ({
  width: '100%',
  borderCollapse: 'collapse',
  th: { border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2', cursor: 'pointer' },
  td: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' },
  '.sort-icon': { verticalAlign: 'middle', marginLeft: '5px' },
}));

const columnFields = [
  { value: 'id', label: 'Id' },
  { value: 'name', label: 'Name', enableSearch: true },
  { value: 'email', label: 'Email', enableSearch: true },
  { value: 'username', label: 'Username' },
  { value: 'phone', label: 'Phone' },
  { value: 'website', label: 'Website' },
];

function useUserData() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [sortColumn, setSortColumn] = useState(columnFields[0].value);
  const [sortDirection, setSortDirection] = useState('asc');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data: users } = await axios.get('/api/v1/users');
        setUsers(users);
      } catch (error) {
        setError('Failed to load users.. Please try again later.');
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter(
      user =>
        (user.name || '').toLowerCase().includes(searchName.toLowerCase()) &&
        (user.email || '').toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchName, searchEmail, users]);

  useEffect(() => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const fieldA = (a[sortColumn] || '').toString().toLowerCase();
      const fieldB = (b[sortColumn] || '').toString().toLowerCase();
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sortedUsers);
  }, [sortColumn, sortDirection]);

  return {
    filteredUsers,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    setSearchName,
    setSearchEmail,
    error,
  };
}

export default function UserList() {
  const {
    filteredUsers,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    setSearchName,
    setSearchEmail,
    error,
  } = useUserData();

  const handleSort = column => {
    if (sortColumn === column) {
      setSortDirection(prevDirection =>
        prevDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <input
          type={"text"}
          placeholder={"Search by name"}
          onChange={e => setSearchName(e.target.value)}
        />
        <input
          type={"text"}
          placeholder={"Search by email"}
          onChange={e => setSearchEmail(e.target.value)}
        />
      </div>

      <Table>
        <thead>
          <tr>
            {columnFields.map(column => (
              <th
                key={column.value}
                onClick={() => handleSort(column.value)}
              >
                {column.label}
                {sortColumn === column.value && (
                  <span className={"sort-icon"}>
                    {sortDirection === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name || 'N/A'}</td>
              <td>{user.email || 'N/A'}</td>
              <td>{user.username || 'N/A'}</td>
              <td>{user.phone || 'N/A'}</td>
              <td>{user.website || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
