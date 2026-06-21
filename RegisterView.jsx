import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';

export default function RegisterView({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error');
      localStorage.setItem('nexusUser', JSON.stringify(data));
      setUser(data);
      alert('Registered successfully!');
      navigate('/products');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2 style={styles.viewSectionHeadingTitle}>Create Profile</h2>
      <div style={styles.cardFormWhiteSurfaceBoxBackground}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <button type="submit" style={styles.financialTransactionApprovalBtn}>Register</button>
          <p style={{ fontSize: '13px', marginTop: '15px', textAlign: 'center', color: '#94a3b8' }}>
            Have an account? <Link to="/login" style={{ color: '#3182ce' }}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

