import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await register({ username, email, password, password2: confirmPassword });
            navigate('/login');
        } catch (error) {
            console.error("Registration failed", error);
            let errorMessage = "Registration failed";
            if (error.message === "Network Error") {
                errorMessage = "Network Error: Unable to reach the server. Is the backend running on port 8000?";
            } else if (error.response?.data) {
                errorMessage = JSON.stringify(error.response.data);
            }
            alert(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <h1>Register</h1>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem' }}>Register</button>
        </form>
    );
};

export default Register;
