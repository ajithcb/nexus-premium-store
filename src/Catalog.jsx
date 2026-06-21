import { useState } from "react";
import { styles } from "./styles";
import { IMGS, getD } from "./img";

export default function Catalog({
  products,
  addToCart
}) {
  const [term, setTerm] = useState("");
  const filtered = products.filter(
    (p) =>
      p.name
        .toLowerCase()
        .includes(
          term.toLowerCase()
        )
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
      <input
        type="text"
        placeholder="🔍 Search..."
        value={term}
        onChange={(e) =>
          setTerm(e.target.value)
        }
        style={
          styles.formInputFieldBoxStyle
        }
      />
      <h2>Catalog ({filtered.length})</h2>
      <div
        style={
          styles.productGridResponsiveLayout
        }
      >
        {filtered.map((p) => (
          <div
            key={p._id}
            style={
              styles.productDisplayCardContainer
            }
          >
            <img
              src={getImg(p.name)}
              alt={p.name}
              style={
                styles.assetImageTagStyle
              }
            />
            <h3>{p.name}</h3>
            <p>{getD(p.name)}</p>
            <span>
              ₹
              {p.price.toLocaleString(
                "en-IN"
              )}
            </span>
            <button
              onClick={() =>
                addToCart(p)
              }
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
