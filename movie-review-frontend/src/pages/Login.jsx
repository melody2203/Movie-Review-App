import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            console.error("Login Error:", error);
            setError(error.response?.data?.error || error.response?.data?.non_field_errors?.[0] || 'Login failed. Please check your credentials.');
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
        textAlign: 'left'
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
                maxWidth: '440px',
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
                    <LogIn size={32} />
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, var(--text-main), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome Back</h1>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Login to your account to continue</p>

                {error && (
                    <div style={{
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        color: '#ff6b6b',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        border: '1px solid rgba(255, 0, 0, 0.2)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                        <label style={labelStyle}>Username</label>
                        <User size={18} style={iconStyle} />
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(139, 90, 43, 0.3)'}
                        />
                    </div>
                    <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
                        <label style={labelStyle}>Password</label>
                        <Lock size={18} style={iconStyle} />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(139, 90, 43, 0.3)'}
                        />
                        <Link to="/forgot-password" style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none', textAlign: 'right' }}>
                            Forgot Password?
                        </Link>
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
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'none' }}>Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
