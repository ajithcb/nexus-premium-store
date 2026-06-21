import {
  useState,
  useEffect
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { styles } from "./styles";

const IMGS = {
  p: "https://unsplash.com" +
    "photo-1588444837495-" +
    "c6cfeb53f32d?w=400",
  k: "https://unsplash.com" +
    "photo-1618384887929-" +
    "16ec33fab9ef?w=400",
  w: "https://unsplash.com" +
    "photo-1523275335684-" +
    "37898b6baf30?w=400",
  m: "https://unsplash.com" +
    "photo-1615663245857-" +
    "ac93bb7c39e7?w=400",
  s: "https://unsplash.com" +
    "photo-1542291026-" +
    "7eec264c27ff?w=400"
};

const getD = (n) => {
  const t = n ? n.toLowerCase() : "";
  if (t.includes("airpod"))
    return "ANC, 30h, v5.3.";
  if (t.includes("keyboard"))
    return "Blue Sw, RGB Backlit.";
  if (t.includes("watch"))
    return "AMOLED Display, BT Call.";
  if (t.includes("mouse"))
    return "Wireless, 3200 DPI Sync.";
  return "Breathable Mesh Sole.";
};

export default function App() {
  const [products, setProducts] =
    useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage
      .getItem("nexusUser");
    if (saved) setUser(JSON.parse(saved));

    const env = import.meta.env
      .VITE_BACKEND_URL;
    const fall = "https://" +
      "://onrender.com";
    const URL = env || fall;

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

  if (loading)
    return <div style={styles.center}>
      <h2>⏳</h2>
    </div>;
  if (error)
    return <div style={styles.center}>
      <h2>❌</h2>
    </div>;

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
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const count = cart.reduce(
    (a, c) => a + c.qty,
    0
  );

  const logout = () => {
    localStorage
      .removeItem("nexusUser");
    setUser(null);
    setDrop(false);
    alert("Logged out.");
    navigate("/");
  };

  const addToCart = (p) => {
    const ex = cart.find(
      (x) => x._id === p._id
    );
    if (ex) {
      setCart(
        cart.map((x) =>
          x._id === p._id
            ? { ...ex, qty: ex.qty + 1 }
            : x
        )
      );
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
  };

  const removeFromCart = (p) => {
    const ex = cart.find(
      (x) => x._id === p._id
    );
    if (ex.qty === 1) {
      setCart(
        cart.filter(
          (x) => x._id !== p._id
        )
      );
    } else {
      setCart(
        cart.map((x) =>
          x._id === p._id
            ? { ...ex, qty: ex.qty - 1 }
            : x
        )
      );
    }
  };

  return (
    <div style={styles.appWrapper}>
      <nav style={styles.navbar}>
        <div style={styles.brandLogo}>
          <Link
            to="/"
            style={styles.navLinkBrand}
            onClick={() => setDrop(false)}
          >
            🏬 NEXUS
          </Link>
        </div>
        {user && (
          <div style={styles.linkGroup}>
            <Link
              to="/products"
              style={styles.linkItem}
              onClick={() =>
                setDrop(false)
              }
            >
              Products
            </Link>
            <Link
              to="/cart"
              style={styles.linkItem}
              onClick={() =>
                setDrop(false)
              }
            >
              Cart ({count})
            </Link>
            <div
              style={
                styles
                  .profileBadgeIconCircle
              }
              onClick={() =>
                setDrop(!drop)
              }
            >
              {user.name
                .charAt(0)
                .toUpperCase()}
            </div>
            {drop && (
              <div
                style={
                  styles
                    .profileDropdownContainerBox
                }
              >
                <div
                  style={{
                    borderBottom:
                      "1px solid #334"
                  }}
                >
                  <p>{user.name}</p>
                </div>
                <Link
                  to="/history"
                  style={{
                    display: "block",
                    margin: "5px 0"
                  }}
                  onClick={() =>
                    setDrop(false)
                  }
                >
                  📋 Purchase History
                </Link>
                <button
                  onClick={logout}
                  style={{
                    width: "100%",
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px"
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <div style={styles.pageBodyContent}>
        <Routes>
          <Route
            path="/"
            element={
              <HomeView user={user} />
            }
          />
          <Route
            path="/products"
            element={
              user ? (
                <ProductsView
                  products={products}
                  add={addToCart}
                />
              ) : (
                <LoginView
                  setUser={setUser}
                />
              )
            }
          />
          <Route
            path="/cart"
            element={
              user ? (
                <CartView
                  cart={cart}
                  add={addToCart}
                  rem={removeFromCart}
                />
              ) : (
                <LoginView
                  setUser={setUser}
                />
              )
            }
          />
          <Route
            path="/buy"
            element={
              <CheckoutView
                cart={cart}
                clear={() => setCart([])}
                setOrders={setOrders}
                orders={orders}
                user={user}
              />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryView
                orders={orders}
                user={user}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginView
                setUser={setUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterView
                setUser={setUser}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
  function HomeView({ user }) {
  return (
    <div style={styles.heroLayout}>
      <h1
        style={styles.heroHeadingTitle}
      >
        Flipkart / Nexus India
      </h1>
      <p
        style={styles.heroTextSubtitle}
      >
        India's Ultimate Online Store.
        Explore mobile phones, gadgets,
        and tech accessories with real
        unbeatable prices and rapid delivery.
      </p>
      {user ? (
        <Link
          to="/products"
          style={styles.actionBtnHero}
        >
          Explore Store →
        </Link>
      ) : (
        <Link
          to="/login"
          style={styles.actionBtnHero}
        >
          Sign In to Explore →
        </Link>
      )}
    </div>
  );
}

function ProductsView({
  products,
  add
}) {
  const [term, setTerm] = useState("");
  const filtered = products.filter(
    (p) =>
      p.name
        .toLowerCase()
        .includes(
          term.toLowerCase()
        ) ||
      p.description
        .toLowerCase()
        .includes(term.toLowerCase())
  );
  const getImg = (name) => {
    const t = name
      ? name.toLowerCase()
      : "";
    if (t.includes("airpod"))
      return IMGS.p;
    if (t.includes("keyboard"))
      return IMGS.k;
    if (t.includes("watch"))
      return IMGS.w;
    if (t.includes("mouse"))
      return IMGS.m;
    return IMGS.s;
  };
  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "40px" }}>
        <input
          type="text"
          placeholder="🔍 Search..."
          value={term}
          onChange={(e) =>
            setTerm(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            background: "#1f293b",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "10px"
          }}
        />
      </div>
      <h2
        style={
          styles.viewSectionHeadingTitle
        }
      >
        Catalog ({filtered.length})
      </h2>
      <div style={styles.productGridResponsiveLayout}>
        {filtered.map((p) => (
          <div
            key={p._id}
            style={styles.productDisplayCardContainer}
          >
            <div style={styles.cardImageHolderFrame}>
              <img
                src={getImg(p.name)}
                alt={p.name}
                style={styles.assetImageTagStyle}
              />
            </div>
            <div
              style={styles.cardInformationContentWrapper}
            >
              <h3>{p.name}</h3>
              <p style={styles.productDescriptionParagraphBlock}>
                {getD(p.name)}
              </p>
              <div style={styles.cardActionFooterDataRow}>
                <span style={styles.currencyPriceValueStyleTag}>
                  ₹{p.price.toLocaleString("en-IN")}
                </span>
                <button
                  onClick={() => add(p)}
                  style={styles.interactionPurchaseBtnStyle}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartView({ cart, add, rem }) {
  const total = cart.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );
  const navigate = useNavigate();
  const getImg = (name) => {
    const t = name ? name.toLowerCase() : "";
    if (t.includes("airpod")) return IMGS.p;
    if (t.includes("keyboard")) return IMGS.k;
    if (t.includes("watch")) return IMGS.w;
    if (t.includes("mouse")) return IMGS.m;
    return IMGS.s;
  };
  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2>Your Basket</h2>
      {cart.length === 0 ? (
        <p>Empty cart.</p>
      ) : (
        <div style={styles.cardFormWhiteSurfaceBoxBackground}>
          {cart.map((i) => (
            <div key={i._id} style={styles.basketRecordRowFlexBorder}>
              <img
                src={getImg(i.name)}
                alt={i.name}
                style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
              />
              <div style={{ flex: "1" }}>
                <h4>{i.name}</h4>
                <span>{i.qty} x ₹{i.price.toLocaleString("en-IN")}</span>
              </div>
              <div>
                <button onClick={() => rem(i)}>-</button>
                <button onClick={() => add(i)}>+</button>
              </div>
            </div>
          ))}
          <div style={styles.subtotalSummaryRowLabelFlex}>
            <span>Total:</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <button onClick={() => navigate("/buy")} style={styles.navigationForwardTerminalSubmitBtn}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

function CheckoutView({ cart, clear, setOrders, orders, user }) {
  const navigate = useNavigate();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const handlePayment = (e) => {
    e.preventDefault();
    if (!user) return alert("Login!");
    if (cart.length === 0) return alert("Empty!");
    const receipt = {
      orderId: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      items: [...cart],
      totalAmount: total,
      shippingInfo: { name: user.name, address: addr, phone }
    };
    setOrders([receipt, ...orders]);
    clear();
    alert("🎉 Ordered!");
    navigate("/history");
  };
  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2>🔒 Checkout</h2>
      <div style={styles.cardFormWhiteSurfaceBoxBackground}>
        {!user ? (
          <Link to="/login">Sign In</Link>
        ) : (
          <form onSubmit={handlePayment}>
            <input type="text" placeholder="Address" value={addr} onChange={(e) => setAddr(e.target.value)} required style={styles.formInputFieldBoxStyle} />
            <input type="tel" placeholder="Phone" pattern="[0-9]{10}" value={phone} onChange={(e) => setPhone(e.target.value)} required style={styles.formInputFieldBoxStyle} />
            <button type="submit" style={styles.financialTransactionApprovalBtn}>
              Pay ₹{total.toLocaleString("en-IN")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function HistoryView({ orders, user }) {
  const getImg = (name) => {
    const t = name ? name.toLowerCase() : "";
    if (t.includes("airpod")) return IMGS.p;
    if (t.includes("keyboard")) return IMGS.k;
    if (t.includes("watch")) return IMGS.w;
    if (t.includes("mouse")) return IMGS.m;
    return IMGS.s;
  };
  return (
    <div style={styles.centeredFormWrapperWidthLimit}>
      <h2>📋 Purchase History</h2>
      {!user ? (
        <p>Login to view.</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((o) => (
          <div key={o.orderId} style={styles.cardFormWhiteSurfaceBoxBackground}>
            <h4>Order #{o.orderId}</h4>
            {o.items.map((i) => (
              <div key={i._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={getImg(i.name)} alt={i.name} style={{ width: "30px", height: "30px" }} />
                <p>{i.name}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

}

