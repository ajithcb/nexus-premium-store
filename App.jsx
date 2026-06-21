import {
  useState,
  useEffect
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { styles } from "./styles";
import Nav from "./Nav";
import Catalog from "./Catalog";
import CartView from "./CartView";
import {
  CheckoutView,
  HistoryView
} from "./CheckoutView";
import LoginView from "./LoginView";
import RegisterView from "./RegisterView";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nexusUser");
    if (saved) setUser(JSON.parse(saved));

    const fallbackUrl = "https://onrender.com";
    const URL = import.meta.env.VITE_BACKEND_URL || fallbackUrl;

    fetch(`${URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("nexusUser");
    setUser(null);
    setDrop(false);
    window.location.href = "/";
  };

  const addToCart = (p) => {
    const ex = cart.find((x) => x._id === p._id);
    if (ex) {
      setCart(
        cart.map((x) =>
          x._id === p._id ? { ...ex, qty: ex.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
  };

  const removeFromCart = (p) => {
    const ex = cart.find((x) => x._id === p._id);
    if (ex.qty === 1) {
      setCart(cart.filter((x) => x._id !== p._id));
    } else {
      setCart(
        cart.map((x) =>
          x._id === p._id ? { ...ex, qty: ex.qty - 1 } : x
        )
      );
    }
  };

  if (loading) return <div>⏳</div>;
  if (error) return <div>❌</div>;

  return (
    <Router>
      <div style={styles.appWrapper}>
        <Nav user={user} cart={cart} setDrop={setDrop} drop={drop} logout={logout} />
        <div style={styles.pageBodyContent}>
          <Routes>
            <Route path="/" element={<Catalog products={products} addToCart={addToCart} />} />
            <Route path="/products" element={user ? <Catalog products={products} addToCart={addToCart} /> : <LoginView setUser={setUser} />} />
            <Route path="/cart" element={user ? <CartView cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} /> : <LoginView setUser={setUser} />} />
            <Route path="/buy" element={<CheckoutView cart={cart} clearCart={() => setCart([])} setOrders={setOrders} orders={orders} user={user} />} />
            <Route path="/history" element={<HistoryView orders={orders} user={user} />} />
            <Route path="/login" element={<LoginView setUser={setUser} />} />
            <Route path="/register" element={<RegisterView setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

