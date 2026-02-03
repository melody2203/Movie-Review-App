import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.85rem 1rem 0.85rem 2.8rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(139, 90, 43, 0.3)',
        borderRadius: '12px',
        color: 'var(--text-main)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s ease',
        marginTop: '0.5rem'
    };

    const labelStyle = {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: 'var(--text-dim)',
        display: 'block',
        textAlign: 'left',
        marginBottom: '0.2rem'
    };

    const iconStyle = {
        position: 'absolute',
        left: '1rem',
        bottom: '0.9rem',
        color: 'var(--accent)',
        opacity: 0.7
    };

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '480px',
                backgroundColor: 'var(--bg-surface)',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                border: '1px solid rgba(139, 90, 43, 0.1)',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'rgba(139, 90, 43, 0.1)',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'var(--accent)'
                }}>
                    <UserPlus size={32} />
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, var(--text-main), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Join the Community</h1>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Create your account to start reviewing</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
                        <label style={labelStyle}>Username</label>
                        <User size={18} style={iconStyle} />
                        <input
                            type="text"
                            placeholder="Choose a unique username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(139, 90, 43, 0.3)'}
                        />
                    </div>
                    <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
                        <label style={labelStyle}>Email Address</label>
                        <Mail size={18} style={iconStyle} />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(139, 90, 43, 0.3)'}
                        />
                    </div>
                    <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
                        <label style={labelStyle}>Password</label>
                        <Lock size={18} style={iconStyle} />
                        <input
                            type="password"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(139, 90, 43, 0.3)'}
                        />
                    </div>
                    <div style={{ marginBottom: '2rem', position: 'relative' }}>
                        <label style={labelStyle}>Confirm Password</label>
                        <Lock size={18} style={iconStyle} />
                        <input
                            type="password"
                            placeholder="Repeat your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(139, 90, 43, 0.3)'}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 10px 20px rgba(139, 90, 43, 0.2)',
                            transition: 'all 0.3s ease',
                            opacity: loading ? 0.7 : 1
                        }}
                        onMouseEnter={(e) => { if (!loading) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 15px 25px rgba(139, 90, 43, 0.3)'; } }}
                        onMouseLeave={(e) => { if (!loading) { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 10px 20px rgba(139, 90, 43, 0.2)'; } }}
                    >
                        {loading ? 'Creating Account...' : 'Get Started'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
