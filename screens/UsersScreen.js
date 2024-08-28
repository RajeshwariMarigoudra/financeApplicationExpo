import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native'; // Import Text component
import { Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get the authentication token from AsyncStorage
        const token = await AsyncStorage.getItem('token');

        // Include the token in the headers of the fetch request
        const response = await fetch('https://financeapp-ejy2.onrender.com/api/bank/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          // Handle unauthorized or other errors
          console.error(`Error fetching users: ${response.status}`);
          setError(`Error fetching users: ${data.message || response.status }`);
          return;
        }

        if (data.error) {
          setError(data.error); // Set the error state
        } else {
          setUsers(data.users); // Set the users state
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('An error occurred while fetching users.'); // Set a generic error message
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <ScrollView>
      {error ? (
        <View>
          <Text>Error: {error}</Text>
        </View>
      ) : (
        users.map((user) => (
          <Card key={user._id} style={{ margin: 16 }}>
            <Card.Content>
              <Title>{user.username}</Title>
              {/* Add more user details as needed */}
              <Paragraph>PhNO: {user.phonenumber}</Paragraph>
              {/* Add additional information based on your User model */}
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

export default UsersScreen;
