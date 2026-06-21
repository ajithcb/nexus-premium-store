import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import { styles } from './styles';

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
        Nexus Premium
      </h1>
      <p style={styles.heroTextSubtitle}>
        Welcome to India's ultimate premium e-commerce destination. Discover our
        curated catalog of authentic high-performance gadgets, sleek electronics,
        and daily tech essentials. Enjoy unbeatable values, verified checkout
        settlements, and secure door-to-door delivery setups across the nation.
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
function ProductsView({ products, addToCart }) {
  const [term, setTerm] = useState('');
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(term.toLowerCase())
  );

  // REPLACES THE ICONS WITH STABLE, ACTUAL E-COMMERCE STOCK IMAGES
  const getProductPhoto = (name) => {
    const t = name ? name.toLowerCase() : '';
    if (t.includes("airpod") || t.includes("buds")) {
      return "https://pexels.com";
    }
    if (t.includes("keyboard")) {
      return "https://pexels.com";
    }
    if (t.includes("watch")) {
      return "https://pexels.com";
    }
    if (t.includes("mouse")) {
      return "https://pexels.com";
    }
    return "https://pexels.com";
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '40px' }}>
        <input 
          type="text" 
          placeholder="🔍 Search products..." 
          value={term} 
          onChange={(e) => setTerm(e.target.value)} 
          style={styles.formInputFieldBoxStyle} 
        />
      </div>
      <h2 style={styles.viewSectionHeadingTitle}>Collection ({filtered.length})</h2>
      <div style={styles.productGridResponsiveLayout}>
        {filtered.map((p) => (
          <div key={p._id} style={styles.productDisplayCardContainer}>
            <div style={styles.cardImageHolderFrame}>
              {/* LOADS ACTUAL REAL-WORLD PHOTOGRAPHY FOR EVERY CARD FRAME */}
              <img 
                src={getProductPhoto(p.name)} 
                alt={p.name} 
                style={styles.assetImageTagStyle} 
              />
            </div>
            <div style={styles.cardInformationContentWrapper}>
              <h3 style={styles.productLabelNameTextTitle}>{p.name}</h3>
              <p style={styles.productDescriptionParagraphBlock}>{p.description}</p>
              <div style={styles.cardActionFooterDataRow}>
                <span style={styles.currencyPriceValueStyleTag}>₹{p.price.toLocaleString('en-IN')}</span>
                <button onClick={() => addToCart(p)} style={styles.interactionPurchaseBtnStyle}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartView({ cart, addToCart, removeFromCart }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const navigate = useNavigate();
  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2 style={styles.viewSectionHeadingTitle}>Basket</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div style={styles.cardFormWhiteSurfaceBoxBackground}>
          {cart.map((i) => (
            <div key={i._id} style={styles.basketRecordRowFlexBorder}>
              <div style={{ flex: '1' }}><h4>{i.name}</h4><span>{i.qty} x ₹{i.price.toLocaleString('en-IN')}</span></div>
              <div><button onClick={() => removeFromCart(i)}>-</button><button onClick={() => addToCart(i)}>+</button></div>
            </div>
          ))}
          <div style={styles.subtotalSummaryRowLabelFlex}><span>Total:</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          <button onClick={() => navigate('/buy')} style={styles.navigationForwardTerminalSubmitBtn}>Checkout</button>
        </div>
      )}
    </div>
  );
}

function CheckoutView({ cart, clearCart, setOrders, orders, user }) {
  const navigate = useNavigate();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const handlePayment = (e) => {
    e.preventDefault();
    const receipt = {
      orderId: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      items: [...cart],
      totalAmount: total,
      shippingInfo: { name: user?.name || "Guest", address, phone }
    };
    setOrders([receipt, ...orders]);
    clearCart();
    alert("🎉 Order Placed!");
    navigate('/history');
  };
  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2>🔒 Checkout</h2>
      <div style={styles.cardFormWhiteSurfaceBoxBackground}>
        <form onSubmit={handlePayment}>
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <input type="tel" placeholder="Phone" pattern="[0-9]{10}" value={phone} onChange={(e) => setPhone(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <button type="submit" style={styles.financialTransactionApprovalBtn}>Pay ₹{total.toLocaleString('en-IN')}</button>
        </form>
      </div>
    </div>
  );
}

function HistoryView({ orders, user }) {
  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2>📋 History</h2>
      {orders.length === 0 ? <p>No orders logged.</p> : orders.map((o) => (
        <div key={o.orderId} style={styles.cardFormWhiteSurfaceBoxBackground}>
          <h4>Order #{o.orderId}</h4>
          <p>Destination: {o.shippingInfo.address}</p>
          {o.items.map((i) => <p key={i._id}>• {i.name} (x{i.qty})</p>)}
        </div>
      ))}
    </div>
  );
}

function LoginView({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://onrender.com';
      const response = await fetch(`${API_URL}/api/users/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error');
      localStorage.setItem('nexusUser', JSON.stringify(data));
      setUser(data); alert(`Welcome, ${data.name}!`); navigate('/products');
    } catch (err) { alert(`Login Failed: ${err.message}`); }
  };
  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2 style={styles.viewSectionHeadingTitle}>Sign In</h2>
      <div style={styles.cardFormWhiteSurfaceBoxBackground}>
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <button type="submit" style={styles.financialTransactionApprovalBtn}>Login</button>
          <p style={{ fontSize: '13px', marginTop: '15px', textAlign: 'center', color: '#94a3b8' }}>New? <Link to="/register" style={{ color: '#3182ce' }}>Create account</Link></p>
        </form>
      </div>
    </div>
  );
}

function RegisterView({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://onrender.com';
      const response = await fetch(`${API_URL}/api/users/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error');
      localStorage.setItem('nexusUser', JSON.stringify(data));
      setUser(data); alert('Registration successful!'); navigate('/products');
    } catch (err) { alert(`Registration Error: ${err.message}`); }
  };
  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2 style={styles.viewSectionHeadingTitle}>Create Profile</h2>
      <div style={styles.cardFormWhiteSurfaceBoxBackground}>
        <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.formInputFieldBoxStyle} />
          <button type="submit" style={styles.financialTransactionApprovalBtn}>Register</button>
          <p style={{ fontSize: '13px', marginTop: '15px', textAlign: 'center', color: '#94a3b8' }}>Have an account? <Link to="/login" style={{ color: '#3182ce' }}>Sign In</Link></p>
        </form>
      </div>
    </div>
  );
}
