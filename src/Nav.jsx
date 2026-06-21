import { Link } from "react-router-dom";
import { styles } from "./styles";

export default function Nav({
  user,
  cart,
  setDrop,
  drop,
  logout
}) {
  const count = cart.reduce(
    (a, c) => a + c.qty,
    0
  );
  return (
    <nav style={styles.navbar}>
      <div>
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
            onClick={() => setDrop(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            style={styles.linkItem}
            onClick={() => setDrop(false)}
          >
            Cart ({count})
          </Link>
          <div
            style={
              styles.profileBadgeIconCircle
            }
            onClick={() => setDrop(!drop)}
          >
            {user.name
              .charAt(0)
              .toUpperCase()}
          </div>
          {drop && (
            <div
              style={
                styles.profileDropdownContainerBox
              }
            >
              <h4>{user.name}</h4>
              <Link
                to="/history"
                onClick={() =>
                  setDrop(false)
                }
              >
                📋 History
              </Link>
              <button onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
