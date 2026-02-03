import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
    const sectionStyle = { marginBottom: '3rem' };
    const titleStyle = { fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' };

    return (
        <div style={{ padding: '8rem 15% 6rem', color: 'var(--text-main)', minHeight: '80vh' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '3rem', textAlign: 'center' }}>Privacy Policy</h1>

            <div style={sectionStyle}>
                <h2 style={titleStyle}><ShieldCheck size={24} /> Data Protection</h2>
                <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
                    Your privacy is our priority. We implement state-of-the-art security measures to protect your personal information and ensure that your data remains confidential.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={titleStyle}><Lock size={24} /> Information Collection</h2>
                <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
                    We only collect data that is necessary for the core functionality of the platform, such as account details and your movie reviews. We never sell your data to third parties.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={titleStyle}><Eye size={24} /> Transparency</h2>
                <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
                    We are committed to being transparent about how we use your information. You can request a copy of your data or ask for its deletion at any time through our support channels.
                </p>
            </div>
        </div>
    );
};

export default Privacy;
