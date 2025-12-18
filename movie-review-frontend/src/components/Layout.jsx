import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: 'var(--bg-deep)',
            color: 'var(--text-main)',
            width: '100%'
        }}>
            <Header />
            <main style={{ flexGrow: 1, width: '100%' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
