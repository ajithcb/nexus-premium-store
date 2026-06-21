import { useState } from 'react';
import { styles } from './styles';

export default function ProductsView({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FETCHES STABLE UNBLOCKED REQUISITE PHOTOS BASED ON BRAND KEYWORDS
  const getProductImage = (name) => {
    const title = name ? name.toLowerCase() : '';
    if (title.includes("airpod") || title.includes("buds")) {
      return "https://unsplash.com";
    } else if (title.includes("keyboard")) {
      return "https://unsplash.com";
    } else if (title.includes("watch")) {
      return "https://unsplash.com";
    } else if (title.includes("mouse")) {
      return "https://unsplash.com";
    }
    return "https://unsplash.com";
  };

  // GENERATES REALISTIC TECHNICAL SPECIFICATIONS FOR EACH E-COM ITEM
  const getRealDescription = (name) => {
    const title = name ? name.toLowerCase() : '';
    if (title.includes("airpod") || title.includes("buds")) {
      return "Active Noise Cancellation (ANC), 30 Hrs Playtime, Bluetooth v5.3, Touch Controls.";
    }
    if (title.includes("keyboard")) {
      return "Mechanical Blue Switches, Rainbow Backlit, Anti-ghosting Keys, Wired USB Type-C.";
    }
    if (title.includes("watch")) {
      return "1.85\" AMOLED Display, BT Calling, SpO2 & Heart Rate Monitor, IP68 Waterproof.";
    }
    if (title.includes("mouse")) {
      return "Wireless Gaming Mouse, 2.4GHz Ultra-Fast Sync, Adjustable 3200 DPI, Rechargeable.";
    }
    return "Premium Quality Sports Footwear, Breathable Mesh Upper, Shock-Absorbing Sole.";
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '40px', width: '100%', maxWidth: '500px' }}>
        <input 
          type="text" 
          placeholder="🔍 Search products (e.g., airpod, keyboard, watch)..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{
            width: '100%', padding: '14px 20px', borderRadius: '10px',
            border: '1px solid #374151', backgroundColor: '#1f293b',
            color: '#ffffff', fontSize: '16px', outline: 'none',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }} 
        />
      </div>

      <h2 style={styles.viewSectionHeadingTitle}>
        Showing {filteredProducts.length} Premium Electronics
      </h2>

      <div style={styles.productGridResponsiveLayout}>
        {filteredProducts.map((p) => (
          <div key={p._id} style={styles.productDisplayCardContainer}>
            <div style={styles.cardImageHolderFrame}>
              <img 
                src={getProductImage(p.name)} 
                alt={p.name} 
                style={styles.assetImageTagStyle} 
              />
            </div>
            
            <div style={styles.cardInformationContentWrapper}>
              <h3 style={styles.productLabelNameTextTitle}>{p.name}</h3>
              
              {/* DISPLAY THE REWRITE DETAILED SPECIFICATIONS TEXT */}
              <p style={styles.productDescriptionParagraphBlock}>
                {getRealDescription(p.name)}
              </p>
              
              <div style={styles.cardActionFooterDataRow}>
                <span style={styles.currencyPriceValueStyleTag}>
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
                <button onClick={() => addToCart(p)} style={styles.interactionPurchaseBtnStyle}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
