import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            console.error("Login Error:", error);
            setError(error.response?.data?.non_field_errors?.[0] || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <h1>Login</h1>
            {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', border: '1px solid red' }}>{error}</div>}
            <div>
                <label>Username (not email):</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
        </form>
    );
};

export default Login;
