import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:3001/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    // Basic form validation
    if (!name || !age) {
      setError('Please fill out both fields.');
      return;
    }

    // Send the new user data to the backend
    axios
      .post('http://localhost:3001/createUser', { name, age })
      .then((response) => {
        console.log(response);
        setName(''); // Clear the name input
        setAge(''); // Clear the age input
        setError(''); // Clear any error messages

        // Fetch the updated list of users after submission
        fetchUsers();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Getting Data from Database
      </h2>

      {/* Display the list of users */}
      <div className="space-y-4 mb-6">
        {users.map((user) => (
          <div
            key={user.name}
            className="flex justify-between items-center p-4 bg-white rounded-md shadow-sm mx-auto max-w-md"
          >
            <div className="flex space-x-4">
              <div>
                <h3 className="text-lg text-gray-600">Name: {user.name}</h3>
              </div>
              <div>
                <h3 className="text-lg text-gray-600">Age: {user.age}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User input form */}
      <div className="space-y-4 max-w-md mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create User
        </button>
      </div>
    </div>
  );
}

export default App;
