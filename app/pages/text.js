// pages/api-test.js
import { useState, useEffect } from 'react';

export default function ApiTest() {
  const [status, setStatus] = useState('Not tested');
  const [response, setResponse] = useState(null);

  const testEndpoint = async () => {
    try {
      // Simple GET request first
      const getResponse = await fetch('https://dec-azure.vercel.app/auth_api.php', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!getResponse.ok) {
        throw new Error(`GET Status: ${getResponse.status}`);
      }

      // Test POST request
      const postResponse = await fetch('https://dec-azure.vercel.app/auth_api.php?action=register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@gmail.com',
          password: 'Test@123',
          name: 'Test User'
        })
      });

      const data = await postResponse.json();
      setResponse(data);
      setStatus('Success');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
      console.error('Test failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">API Test Page</h1>
      <button 
        onClick={testEndpoint}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test API
      </button>
      <div className="mt-4">
        <p>Status: {status}</p>
        {response && (
          <pre className="mt-2 p-2 bg-gray-100 rounded">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}