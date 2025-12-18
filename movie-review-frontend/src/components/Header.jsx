import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const headerStyle = {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'var(--glass)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(139, 90, 43, 0.2)',
        padding: '1rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.6)'
    };

    const logoStyle = {
        fontSize: '1.8rem',
        fontWeight: '900',
        textDecoration: 'none',
        background: 'linear-gradient(45deg, var(--primary), var(--accent))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-1px'
    };

    const navLinkStyle = {
        color: 'var(--text-main)',
        textDecoration: 'none',
        marginLeft: '2rem',
        fontSize: '0.95rem',
        fontWeight: '500',
        transition: 'color 0.3s ease'
    };

    const buttonStyle = {
        padding: '0.6rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: 'var(--primary)',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.95rem',
        transition: 'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease'
    };

    return (
        <header style={headerStyle}>
            <Link to="/" style={logoStyle}>
                M<span style={{ color: '#fff', WebkitTextFillColor: '#fff' }}>R</span>
            </Link>

            <nav style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={navLinkStyle}>Explore</Link>

                {!token ? (
                    <>
                        <Link to="/login" style={navLinkStyle}>Sign In</Link>
                        <Link to="/register" style={{ ...navLinkStyle, ...buttonStyle, marginLeft: '1.5rem' }}>
                            Get Started
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        style={{ ...buttonStyle, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', marginLeft: '1.5rem' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        Logout
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;
