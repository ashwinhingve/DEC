 import axios from 'axios';

export default async function handler(req, res) {
  const { method, body, query } = req;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_URL:', API_URL);
  try {
    switch (method) {
      case 'POST':
        // Dynamically handle login or register based on query
        const authType = query.auth[0]; // 'login' or 'register'

        const response = await axios.post(
          `${API_URL}/auth/${authType}`,
          body,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );

        res.status(200).json(response.data);
        break;

      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Server error';

    res.status(status).json({
      success: false,
      message
    });
  }
}





 