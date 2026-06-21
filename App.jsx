import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import { styles } from './styles';
import ProductsView from './ProductsView';
import CartView from './CartView';
import {
  CheckoutView,
  HistoryView
} from './CheckoutView';
import LoginView from './LoginView';
import RegisterView from './RegisterView';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('nexusUser');
    if (saved) setUser(JSON.parse(saved));

    const env = import.meta.env.VITE_BACKEND_URL;
    const fall = 'https://onrender.com';
    const API_URL = env || fall;

    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error('API down!');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div style={styles.center}>
      <h2>⏳ Loading...</h2>
    </div>
  );
  if (error) return (
    <div style={styles.center}>
      <h2 style={{ color: 'red' }}>❌ Error</h2>
    </div>
  );

  return (
    <Router>
      <AppContent 
        products={products}
        cart={cart}
        setCart={setCart}
        orders={orders}
        setOrders={setOrders}
        user={user}
        setUser={setUser}
      />
    </Router>
  );
}
function AppContent({
  products,
  cart,
  setCart,
  orders,
  setOrders,
  user,
  setUser
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('nexusUser');
    setUser(null);
    setShowDropdown(false);
    alert('Logged out safely.');
    navigate('/'); 
  };

  const addToCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist) {
      setCart(cart.map((x) => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x._id !== product._id));
    } else {
      setCart(cart.map((x) => x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x));
    }
  };

  return (
    <div style={styles.appWrapper}>
      <nav style={styles.navbar}>
        <div style={styles.brandLogo}>
          <Link to="/" style={styles.navLinkBrand} onClick={() => setShowDropdown(false)}>
            🏬 NEXUS PREMIUM
          </Link>
        </div>
        
        {user && (
          <div style={styles.linkGroup}>
            <Link to="/products" style={styles.linkItem} onClick={() => setShowDropdown(false)}>Products</Link>
            <Link to="/cart" style={styles.linkItem} onClick={() => setShowDropdown(false)}>Cart ({cart.reduce((a, c) => a + c.qty, 0)})</Link>
            
            <div style={styles.profileBadgeIconCircle} onClick={() => setShowDropdown(!showDropdown)}>
              {user.name.charAt(0).toUpperCase()}
            </div>

            {showDropdown && (
              <div style={styles.profileDropdownContainerBox}>
                <div style={{ borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
                  <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{user.name}</p>
                  <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>{user.email}</p>
                </div>
                
                <Link to="/history" style={{ ...styles.linkItem, display: 'block', padding: '4px 0' }} onClick={() => setShowDropdown(false)}>
                  📋 View Purchase History
                </Link>
                
                <button onClick={handleLogout} style={{ width: '100%', backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
                  Logout Session
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <div style={styles.pageBodyContent}>
        <Routes>
          <Route path="/" element={<HomeView user={user} />} />
          <Route path="/products" element={user ? <ProductsView products={products} addToCart={addToCart} /> : <LoginView setUser={setUser} />} />
          <Route path="/cart" element={user ? <CartView cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} /> : <LoginView setUser={setUser} />} />
          <Route path="/buy" element={<CheckoutView cart={cart} clearCart={() => setCart([])} setOrders={setOrders} orders={orders} user={user} />} />
          <Route path="/history" element={<HistoryView orders={orders} user={user} />} />
          <Route path="/login" element={<LoginView setUser={setUser} />} />
          <Route path="/register" element={<RegisterView setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}
function HomeView({ user }) {
  const navigate = useNavigate();

  return (
    <div style={styles.heroLayout}>
      <h1 style={styles.heroHeadingTitle}>
        Nexus Premium India
      </h1>
      <p style={styles.heroTextSubtitle}>
        India's Ultimate Premium Online Shopping Store.
        Explore our responsive catalog of authentic high-performance
        electronics, mobile phones, gadgets, and tech accessories.
        Experience secure checkout transactions, unbeatable value, 
        and fast delivery configurations across India.
      </p>
      
      {user ? (
        <Link to="/products" style={styles.actionBtnHero}>
          Explore Live Store →
        </Link>
      ) : (
        <button 
          style={styles.actionBtnHero} 
          onClick={() => navigate('/login')}
        >
          Explore Live Store →
        </button>
      )}
    </div>
  );
}
