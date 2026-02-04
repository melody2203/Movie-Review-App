import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

const Terms = () => {
    return (
        <div style={{ padding: '8rem 15% 6rem', color: 'var(--text-main)', minHeight: '80vh' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '3rem', textAlign: 'center' }}>Terms of Service</h1>

            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(139, 90, 43, 0.1)' }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--accent)', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
                    <p style={{ color: 'var(--text-dim)', lineHeight: '1.7' }}>By accessing and using Movie Review, you agree to comply with and be bound by these terms. If you do not agree, please refrain from using the platform.</p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--accent)', marginBottom: '1rem' }}>2. User Content</h2>
                    <p style={{ color: 'var(--text-dim)', lineHeight: '1.7' }}>You are responsible for the reviews you post. We reserve the right to remove content that is offensive, promotional, or violates our community standards.</p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--accent)', marginBottom: '1rem' }}>3. Limitation of Liability</h2>
                    <p style={{ color: 'var(--text-dim)', lineHeight: '1.7' }}>Movie Review provides reviews for informational purposes. we are not liable for any decisions made based on the content provided on our platform.</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
