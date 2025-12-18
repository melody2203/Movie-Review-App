const Footer = () => {
    const footerStyle = {
        backgroundColor: 'var(--bg-deep)',
        padding: '4rem 2rem',
        marginTop: 'auto',
        borderTop: '1px solid rgba(139, 90, 43, 0.2)',
        color: 'var(--text-dim)',
        textAlign: 'center'
    };

    const containerStyle = {
        maxWidth: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const sloganStyle = {
        fontSize: '1.4rem',
        fontWeight: '700',
        color: 'var(--text-main)',
        marginBottom: '1.5rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
    };

    const brandStyle = {
        fontSize: '1.8rem',
        fontWeight: '900',
        background: 'linear-gradient(45deg, var(--primary), var(--accent))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1rem',
        letterSpacing: '-1px'
    };

    const linkContainerStyle = {
        display: 'flex',
        gap: '2.5rem',
        marginBottom: '2rem'
    };

    const linkStyle = {
        color: 'var(--text-dim)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'color 0.3s ease, transform 0.2s ease'
    };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={brandStyle}>Cinematic Excellence</div>
                <div style={sloganStyle}>Movie Reviews Redefined</div>

                <div style={linkContainerStyle}>
                    <a
                        href="https://github.com/melody2203"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle}
                        onMouseEnter={(e) => { e.target.style.color = 'var(--accent)'; e.target.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.target.style.color = 'var(--text-dim)'; e.target.style.transform = 'translateY(0)'; }}
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/merertu-philipose-631594307/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle}
                        onMouseEnter={(e) => { e.target.style.color = 'var(--accent)'; e.target.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.target.style.color = 'var(--text-dim)'; e.target.style.transform = 'translateY(0)'; }}
                    >
                        LinkedIn
                    </a>
                    <a
                        href="mailto:merertuphilip@gmail.com"
                        style={linkStyle}
                        onMouseEnter={(e) => { e.target.style.color = 'var(--accent)'; e.target.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.target.style.color = 'var(--text-dim)'; e.target.style.transform = 'translateY(0)'; }}
                    >
                        Email Me
                    </a>
                </div>

                <p style={{ fontSize: '0.8rem', opacity: 0.8, maxWidth: '600px', marginBottom: '1rem' }}>
                    Elevating the art of cinema. Discover, review, and discuss the greatest stories ever told.
                </p>

                <p style={{ fontSize: '0.75rem', margin: 0 }}>
                    &copy; {new Date().getFullYear()} Merertu Philipose. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
