import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';

export default function LoginView({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error');
      localStorage.setItem('nexusUser', JSON.stringify(data));
      setUser(data);
      alert(`Welcome, ${data.name}!`);
      navigate('/products');
    } catch (err) {
      alert(`Failed: ${err.message}`);
    }
  };

  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2 style={styles.viewSectionHeadingTitle}>Sign In</h2>
      <div style={styles.cardFormWhiteSurfaceBoxBackground}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <button type="submit" style={styles.financialTransactionApprovalBtn}>Login</button>
          <p style={{ fontSize: '13px', marginTop: '15px', textAlign: 'center', color: '#94a3b8' }}>
            New? <Link to="/register" style={{ color: '#3182ce' }}>Create account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
