import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { Mail, ArrowLeft, Loader } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await api.post('/users/forgot-password/', { email });
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/reset-password', { state: { email } });
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.email?.[0] || 'Failed to send code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ maxWidth: '500px', width: '100%', backgroundColor: 'var(--bg-surface)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(139, 90, 43, 0.2)' }}>
                <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', marginBottom: '2rem', fontWeight: '600', textDecoration: 'none' }}>
                    <ArrowLeft size={20} /> Back to Login
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Mail size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Forgot Password?</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Enter your email to receive a 6-digit verification code</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your.email@example.com"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(139, 90, 43, 0.3)',
                                backgroundColor: 'var(--bg-deep)',
                                color: 'var(--text-main)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    {error && <div style={{ padding: '1rem', backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', borderRadius: '12px', marginBottom: '1rem' }}>{error}</div>}
                    {message && <div style={{ padding: '1rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '12px', marginBottom: '1rem' }}>{message}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: loading ? 'var(--text-dim)' : 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {loading ? <><Loader size={20} className="spin" /> Sending...</> : 'Send Verification Code'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
