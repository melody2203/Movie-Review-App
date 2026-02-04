import { Info, Target, Users, Award } from 'lucide-react';

const About = () => {
    return (
        <div style={{ padding: '8rem 10% 6rem', color: 'var(--text-main)', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    About Movie Review
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                    We are a community of cinephiles dedicated to the art of storytelling. Our mission is to provide a platform where every frame is analyzed and every dialogue is discussed.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                <div style={{ backgroundColor: 'var(--bg-surface)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(139, 90, 43, 0.1)' }}>
                    <Target size={40} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Goal</h3>
                    <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>To curate the world's most meaningful cinematic experiences and foster deep discussions about the impact of film on culture.</p>
                </div>
                <div style={{ backgroundColor: 'var(--bg-surface)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(139, 90, 43, 0.1)' }}>
                    <Users size={40} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Community First</h3>
                    <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>Every review on our platform is written by enthusiasts like you. We believe in the power of shared perspectives.</p>
                </div>
                <div style={{ backgroundColor: 'var(--bg-surface)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(139, 90, 43, 0.1)' }}>
                    <Award size={40} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Excellence</h3>
                    <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>From indie darlings to blockbuster hits, we celebrate technical brilliance and emotional resonance in all its forms.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
