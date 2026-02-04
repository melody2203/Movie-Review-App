import { Github, Globe, Mail, Film, Info, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerStyle = {
        backgroundColor: 'var(--bg-deep)',
        padding: '4rem 2rem 3rem',
        marginTop: 'auto',
        borderTop: '1px solid rgba(139, 90, 43, 0.1)',
        color: 'var(--text-dim)',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem',
        maxWidth: '100%',
        margin: '0 auto 3rem'
    };

    const sectionTitleStyle = {
        color: 'var(--accent)',
        fontSize: '0.9rem',
        fontWeight: '700',
        marginBottom: '1.2rem',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        textAlign: 'left'
    };

    const listStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        textAlign: 'left'
    };

    const listItemStyle = {
        marginBottom: '0.75rem'
    };

    const linkStyle = {
        color: 'var(--text-dim)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        opacity: 0.8
    };

    const handleMouseEnter = (e) => {
        e.target.style.color = 'var(--text-main)';
        e.target.style.opacity = '1';
    };

    const handleMouseLeave = (e) => {
        e.target.style.color = 'var(--text-dim)';
        e.target.style.opacity = '0.8';
    };

    return (
        <footer style={footerStyle}>
            <div style={gridStyle}>
                {/* Brand Section */}
                <div style={{ textAlign: 'left' }}>
                    <div style={{
                        fontSize: '1.8rem',
                        fontWeight: '900',
                        background: 'linear-gradient(45deg, var(--primary), var(--accent))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1.2rem',
                        letterSpacing: '-1.5px'
                    }}>
                        M<span style={{ color: 'var(--text-main)', opacity: 0.8 }}>R</span>
                    </div>
                    <p style={{ lineHeight: '1.7', fontSize: '0.9rem', opacity: 0.7, marginBottom: '2rem', maxWidth: '350px' }}>
                        Movie Review is a premiere destination for discovering curated cinematic masterpieces.
                        We bring together community-driven reviews and a passion for storytelling that
                        transcends the screen.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: 'var(--accent)', opacity: 0.6 }} title="GitHub"><Github size={20} /></a>
                        <a href="#" style={{ color: 'var(--accent)', opacity: 0.6 }} title="Website"><Globe size={20} /></a>
                        <a href="#" style={{ color: 'var(--accent)', opacity: 0.6 }} title="Contact"><Mail size={20} /></a>
                    </div>
                </div>

                {/* Discover Section */}
                <div>
                    <h3 style={sectionTitleStyle}>Discover</h3>
                    <ul style={listStyle}>
                        <li style={listItemStyle}><Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><Film size={14} /> Latest Releases</Link></li>
                        <li style={listItemStyle}><Link to="/genre/Action" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><Film size={14} /> Action Classics</Link></li>
                        <li style={listItemStyle}><Link to="/genre/Sci-Fi" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><Film size={14} /> Sci-Fi Wonders</Link></li>
                    </ul>
                </div>

                {/* Platform Section */}
                <div>
                    <h3 style={sectionTitleStyle}>Platform</h3>
                    <ul style={listStyle}>
                        <li style={listItemStyle}><Link to="/about" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><Info size={14} /> About Us</Link></li>
                        <li style={listItemStyle}><Link to="/privacy" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><ShieldCheck size={14} /> Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div style={{ textAlign: 'left' }}>
                    <h3 style={sectionTitleStyle}>Connect</h3>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.75rem' }}>Have inquiries or feedback?</p>
                    <a href="mailto:hello@moviereview.com" style={{
                        color: 'var(--text-main)',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        fontWeight: '700',
                        borderBottom: '1.5px solid var(--primary)',
                        paddingBottom: '2px'
                    }}>hello@moviereview.com</a>
                </div>
            </div>

            <div style={{
                borderTop: '1px solid rgba(139, 90, 43, 0.08)',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                maxWidth: '100%',
                margin: '0 auto',
                flexWrap: 'wrap',
                gap: '1.5rem',
                opacity: 0.8
            }}>
                <p>&copy; {new Date().getFullYear()} Movie Review Platform. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '2.5rem' }}>
                    <Link to="/terms" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Terms of Service</Link>
                    <Link to="/privacy" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
