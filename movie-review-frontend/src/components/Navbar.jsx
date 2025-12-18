import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);

    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Link to="/" style={{ marginRight: '1rem' }}>Movie Reviews</Link>
            </div>
            <div>
                {!token ? (
                    <>
                        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button onClick={logout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
