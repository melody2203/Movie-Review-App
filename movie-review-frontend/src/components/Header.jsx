import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Search, User, LogOut, Menu } from 'lucide-react';

const Header = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const query = searchParams.get('search') || '';
        setSearchTerm(query);
    }, [searchParams]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length > 1) {
                try {
                    const data = await getMovies({ search: searchTerm });
                    setSuggestions((data.results || data).slice(0, 5));
                } catch (error) {
                    console.error("Error fetching suggestions", error);
                }
            } else {
                setSuggestions([]);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        if (searchTerm.trim()) {
            setSearchParams({ search: searchTerm });
            navigate(`/?search=${encodeURIComponent(searchTerm)}`);
        } else {
            setSearchParams({});
            navigate('/');
        }
    };

    const handleSuggestionClick = (movie) => {
        setShowSuggestions(false);
        setSearchTerm(movie.title);
        navigate(`/movies/${movie.id}`);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const headerStyle = {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(15, 10, 6, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139, 90, 43, 0.15)',
        padding: '0.75rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
    };

    const logoStyle = {
        fontSize: '1.6rem',
        fontWeight: '900',
        textDecoration: 'none',
        background: 'linear-gradient(45deg, var(--primary), var(--accent))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-1.5px'
    };

    const navLinkStyle = {
        color: 'var(--text-main)',
        textDecoration: 'none',
        marginLeft: '2rem',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        opacity: 0.8
    };

    const searchContainerStyle = {
        position: 'relative',
        marginLeft: '2rem',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 0.4,
        maxWidth: '400px'
    };

    const searchInputStyle = {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(139, 90, 43, 0.2)',
        borderRadius: '12px',
        padding: '0.6rem 1rem 0.6rem 2.5rem',
        color: 'white',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'all 0.3s ease'
    };

    const buttonStyle = {
        padding: '0.6rem 1.4rem',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: 'var(--primary)',
        color: 'white',
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        marginLeft: '1.5rem',
        boxShadow: '0 4px 15px rgba(139, 90, 43, 0.3)'
    };

    return (
        <header style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={logoStyle}>
                    MOVIE<span style={{ color: 'var(--text-main)', WebkitTextFillColor: 'var(--text-main)' }}>REVIEW</span>
                </Link>

                <form onSubmit={handleSearch} style={searchContainerStyle}>
                    <Search
                        size={18}
                        style={{ position: 'absolute', left: '0.8rem', color: 'var(--text-dim)', pointerEvents: 'none', zIndex: 10 }}
                    />
                    <input
                        type="text"
                        placeholder="Search for masterpieces..."
                        style={searchInputStyle}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={(e) => {
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.08)';
                            e.target.style.borderColor = 'var(--primary)';
                            if (suggestions.length > 0) setShowSuggestions(true);
                        }}
                        onBlur={(e) => {
                            setTimeout(() => {
                                e.target.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                e.target.style.borderColor = 'rgba(139, 90, 43, 0.2)';
                                setShowSuggestions(false);
                            }, 200);
                        }}
                    />

                    {showSuggestions && suggestions.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            backgroundColor: 'var(--bg-surface)',
                            borderRadius: '12px',
                            marginTop: '0.5rem',
                            border: '1px solid rgba(139, 90, 43, 0.2)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            overflow: 'hidden',
                            zIndex: 1001
                        }}>
                            {suggestions.map(movie => (
                                <div
                                    key={movie.id}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        transition: 'background 0.2s',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(139, 90, 43, 0.1)'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    onClick={() => handleSuggestionClick(movie)}
                                >
                                    <div style={{ width: '30px', height: '45px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                                        <img src={movie.poster} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ overflow: 'hidden' }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{movie.type}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            </div>

            <nav style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={navLinkStyle} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.8'}>Explore</Link>
                <Link to="/about" style={navLinkStyle} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.8'}>About</Link>

                {!token ? (
                    <>
                        <Link to="/login" style={navLinkStyle} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.8'}>Sign In</Link>
                        <Link to="/register" style={buttonStyle} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                            Get Started
                        </Link>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: '2rem' }}>
                        <User size={20} style={{ color: 'var(--accent)', cursor: 'pointer', opacity: 0.8 }} />
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-dim)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
