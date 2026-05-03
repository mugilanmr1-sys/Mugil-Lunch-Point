import React, { useState, useMemo } from "react";

const menuData = {
  meals: [
    {
      id: "m1", name: "Chicken Kushka", category: "meals", veg: false, price: 50,
      desc: "Fragrant spiced rice cooked with chicken neck pieces and bones",
      taste: "Mildly Spicy, Aromatic", emoji: "🍗",
      ingredients: ["Basmati Rice", "Chicken", "Onion", "Tomato", "Ginger-Garlic Paste", "Kushka Masala", "Mint Leaves", "Ghee", "Bay Leaf"],
      allergens: "null",
      special: true,
    },
    {
      id: "m2", name: "Vegetable Rice", category: "meals", veg: true, price: 50,
      desc: "Mixed vegetables cooked with aromatic rice",
      taste: "Mild, Flavourful", emoji: "🥗",
      ingredients: ["Basmati Rice", "Mixed Vegetables", "Onion", "Tomato", "Cumin Seeds", "Bay Leaf", "Ghee", "Coriander"],
      allergens: "null",
      special: true,
    },
    {
      id: "m3", name: "Curd Rice", category: "meals", veg: true, price: 40,
      desc: "Soft cooked rice mixed with fresh curd and tempered spices",
      taste: "Cooling, Mild", emoji: "🍚",
      ingredients: ["Rice", "Fresh Curd", "Milk", "Mustard Seeds", "Curry Leaves", "Dry Red Chilli", "Ginger", "Pomegranate (optional)"],
      allergens: "null",
      special: true,
    },
    {
      id: "m4", name: "Mint Rice", category: "meals", veg: true, price: 40,
      desc: "Fresh mint blended into perfectly cooked fluffy rice",
      taste: "Fresh, Minty, Mild spicy", emoji: "🌿",
      ingredients: ["Rice", "Fresh Mint", "Coconut", "Green Chilli", "Onion", "Cashew", "Ghee", "Lemon"],
      allergens: "null",
      special: true,
    },
    {
      id: "m5", name: "Tomato Rice", category: "meals", veg: true, price: 40,
      desc: "Tangy tomato-infused rice with aromatic South Indian spices",
      taste: "Tangy, Spicy", emoji: "🍅",
      ingredients: ["Rice", "Tomato", "Onion", "Mustard Seeds", "Curry Leaves", "Sambar Powder", "Turmeric", "Oil", "Coriander"],
      allergens: "null",
      special: "null",
    },
    {
      id: "m6", name: "Sambar Satham", category: "meals", veg: true, price: 40,
      desc: "Classic South Indian comfort — rice simmered with lentil sambar",
      taste: "Tangy, Mildly Spicy", emoji: "🥘",
      ingredients: ["Rice", "Toor Dal", "Tamarind", "Sambar Powder", "Vegetables", "Mustard Seeds", "Curry Leaves", "Ghee", "Asafoetida"],
      allergens: null, special: true,
    },
  ],
  tiffin: [
    {
      id: "t1", name: "Idli", category: "tiffin", veg: true, price: 10,
      desc: "Soft idili with tasty chutney & sambar",
      taste: "Soft, Neutral — pairs with chutney", emoji: "🫓",
      ingredients: ["Idli Rice", "Urad Dal", "Fenugreek Seeds", "Salt", "Water"],
      allergens: "null", special: true,
    },
    {
      id: "t2", name: "Kal Dosa", category: "tiffin", veg: true, price: 20,
      desc: "Thick stone-cooked dosa, crispy outside, soft inside",
      taste: "Crispy, Slightly Sour", emoji: "🥞",
      ingredients: ["Rice", "Urad Dal", "Fenugreek", "Salt", "Oil"],
      allergens: null, special: false,
    },
    {
      id: "t3", name: "Nice Dosa", category: "tiffin", veg: true, price: 35,
      desc: "Paper-thin golden crispy dosa made from fermented batter",
      taste: "Crispy, Light", emoji: "🫔",
      ingredients: ["Rice", "Urad Dal", "Chana Dal", "Salt", "Oil", "Fenugreek"],
      allergens: null, special: false,
    },
    {
      id: "t4", name: "Egg Dosa", category: "tiffin", veg: false, price: 40,
      desc: "Classic dosa topped with a fresh cracked egg, cooked to perfection",
      taste: "Rich, Slightly Spicy", emoji: "🍳",
      ingredients: ["Dosa Batter", "Egg", "Onion", "Green Chilli", "Coriander", "Oil", "Pepper"],
      allergens: "Contains Egg", special: false,
    },
    {
      id: "t5", name: "Onion Dosa", category: "tiffin", veg: true, price: 35,
      desc: "Crispy dosa generously topped with caramelised onion & spices",
      taste: "Crispy, Sweet-Savoury", emoji: "🧅",
      ingredients: ["Dosa Batter", "Onion", "Green Chilli", "Coriander", "Mustard Seeds", "Oil", "Curry Leaves"],
      allergens: "null", special: "null",
    },
    {
      id: "t6", name: "Podi Dosa", category: "tiffin", veg: true, price: 35,
      desc: "Dosa smeared with spicy idilypowder podi and ghee",
      taste: "Spicy, Nutty, Bold", emoji: "🌶️",
      ingredients: ["Dosa Batter", "Idli Podi", "Ghee", "Oil", "Curry Leaves"],
      allergens: "Contains Groundnuts", special: true,
    },
  ],
  sidedish: [
    {
      id: "s1", name: "Boiled Egg", category: "sidedish", veg: false, price: 15,
      desc: "Simple perfectly boiled egg — a protein-rich side",
      taste: "Neutral, Protein-packed", emoji: "🥚",
      ingredients: ["Egg", "Water", "Salt"],
      allergens: "Contains Egg", special: false,
    },
    {
      id: "s2", name: "Omelette", category: "sidedish", veg: false, price: 15,
      desc: "Fluffy egg omelette with onion, chilli and spices",
      taste: "Savoury, Mildly Spicy", emoji: "🍳",
      ingredients: ["Egg", "Onion", "Green Chilli", "Coriander", "Salt", "Pepper", "Oil"],
      allergens: "Contains Egg", special: false,
    },
    {
      id: "s3", name: "Kalakki", category: "sidedish", veg: false, price: 15,
      desc: "Soft scrambled egg cooked in South Indian style with masala",
      taste: "Soft, Spicy, Rich", emoji: "🥣",
      ingredients: ["Egg", "Onion", "Tomato", "Green Chilli", "Turmeric", "Pepper", "Coriander", "Oil"],
      allergens: "Contains Egg", special: true,
    },
    {
      id: "s4", name: "Egg Podimass", category: "sidedish", veg: false, price: 20,
      desc: "Crumbled egg stir-fried with spices and aromatics",
      taste: "Dry, Spicy, Bold", emoji: "🍛",
      ingredients: ["Egg", "Onion", "Tomato", "Chilli Powder", "Turmeric", "Mustard Seeds", "Curry Leaves", "Oil"],
      allergens: "Contains Egg", special: false,
    },
  ],

};

const allItems = Object.values(menuData).flat();

const categoryMeta = {
  meals: { label: "Meals", emoji: "🍽️", color: "#e07b39" },
  tiffin: { label: "Tiffin", emoji: "🥞", color: "#c0882f" },
  sidedish: { label: "Side Dish", emoji: "🍳", color: "#a0522d" },

};

// ==========================================
// 🛠️ ADMIN SETTINGS 🛠️
// Change this to manually open or close the shop.
// To apply changes to Vercel, save and commit to GitHub!
// ==========================================
const ADMIN_SETTINGS = {
  // If true, the shop is completely CLOSED all day (ignores the time).
  forceShopClosedToday: true,

  // If true, the shop is OPEN all day (ignores the time).
  forceShopOpenToday: false,

  // Add the IDs of the items you want to show for Afternoon
  afternoonMenuIds: ["m1", "m3", "s1"],

  // Add the IDs of the items you want to show for Evening/Night
  nightMenuIds: ["t1", "t2", "t4", "s2"],
};

const afternoonSpecials = allItems.filter(i => ADMIN_SETTINGS.afternoonMenuIds.includes(i.id));
const nightSpecials = allItems.filter(i => ADMIN_SETTINGS.nightMenuIds.includes(i.id));

export default function App() {
  const [screen, setScreen] = useState("home"); // home | menu | detail
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [search, setSearch] = useState("");
  const [vegFilter, setVegFilter] = useState("all"); // all | veg | nonveg
  const [isShopOpen, setIsShopOpen] = useState(true);

  const checkShopStatus = () => {
    // 1. Check Admin Overrides First
    if (ADMIN_SETTINGS.forceShopClosedToday) return false;
    if (ADMIN_SETTINGS.forceShopOpenToday) return true;

    // 2. Otherwise, check the regular time schedule
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    // Morning: 12:30 - 14:30 (750-870 mins), Night: 19:00 - 22:00 (1140-1320 mins)
    const isMorningOpen = timeInMinutes >= 750 && timeInMinutes < 870;
    const isNightOpen = timeInMinutes >= 1140 && timeInMinutes < 1320;

    return isMorningOpen || isNightOpen;
  };

  useMemo(() => {
    setIsShopOpen(checkShopStatus());
    const interval = setInterval(() => setIsShopOpen(checkShopStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = useMemo(() => {
    let items = activeCategory ? menuData[activeCategory] : [];
    if (search.trim()) {
      const q = search.toLowerCase();
      items = allItems.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.ingredients.some(ing => ing.toLowerCase().includes(q))
      );
    }
    if (vegFilter === "veg") items = items.filter(i => i.veg);
    if (vegFilter === "nonveg") items = items.filter(i => !i.veg);
    return items;
  }, [activeCategory, search, vegFilter]);

  const openCategory = (cat) => {
    setActiveCategory(cat);
    setSearch("");
    setScreen("menu");
  };

  const openItem = (item) => {
    setActiveItem(item);
    setScreen("detail");
  };

  const goHome = () => { setScreen("home"); setSearch(""); setActiveCategory(null); };
  const goBack = () => { setScreen("menu"); setActiveItem(null); };

  return (
    <div style={styles.shell}>
      <div style={styles.phone}>
        {/* STATUS BAR */}
        <div style={styles.statusBar}>
          <span style={{ fontSize: 11, color: "#fff8f0", opacity: .7 }}>9:41</span>
          <span style={{ fontSize: 11, color: "#fff8f0", opacity: .7 }}>●●●</span>
        </div>

        {/* SCREENS */}
        <div style={styles.screen}>
          {screen === "home" && <HomeScreen afternoonSpecials={afternoonSpecials} nightSpecials={nightSpecials} openCategory={openCategory} search={search} setSearch={setSearch} vegFilter={vegFilter} setVegFilter={setVegFilter} menuItems={menuItems} openItem={openItem} isShopOpen={isShopOpen} />}
          {screen === "menu" && <MenuScreen cat={activeCategory} items={menuItems} search={search} setSearch={setSearch} vegFilter={vegFilter} setVegFilter={setVegFilter} goHome={goHome} openItem={openItem} />}
          {screen === "detail" && activeItem && <DetailScreen item={activeItem} goBack={goBack} goHome={goHome} />}
          {screen === "about" && <AboutScreen goHome={goHome} />}
        </div>

        {/* BOTTOM NAV */}
        {screen !== "detail" && (
          <div style={styles.bottomNav}>
            {[
              { id: "home", emoji: "🏠", label: "Home" },
              { id: "meals", emoji: "🍽️", label: "Meals" },
              { id: "tiffin", emoji: "🥞", label: "Tiffin" },
              { id: "sidedish", emoji: "🍳", label: "Sides" },
              { id: "about", emoji: "ℹ️", label: "About" },
            ].map(tab => {
              const active = screen === tab.id ? true : (screen === "menu" && activeCategory === tab.id);
              return (
                <button key={tab.id} style={{ ...styles.navTab, ...(active ? styles.navTabActive : {}) }} onClick={() => {
                  if (tab.id === "home") goHome();
                  else if (tab.id === "about") { setScreen("about"); setActiveCategory(null); setActiveItem(null); }
                  else openCategory(tab.id);
                }}>
                  <span style={{ fontSize: 18 }}>{tab.emoji}</span>
                  <span style={{ ...styles.navLabel, ...(active ? { color: "#e07b39", fontWeight: 700 } : {}) }}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function HomeScreen({ afternoonSpecials, nightSpecials, openCategory, search, setSearch, vegFilter, setVegFilter, menuItems, openItem, isShopOpen }) {
  const isSearching = search.trim().length > 0;

  const filterByVeg = (items) => items.filter(item => {
    if (vegFilter === "veg") return item.veg;
    if (vegFilter === "nonveg") return !item.veg;
    return true;
  });

  const filteredAfternoon = filterByVeg(afternoonSpecials);
  const filteredNight = filterByVeg(nightSpecials);

  return (
    <div style={styles.scrollArea}>
      {/* HEADER */}
      <div style={{ ...styles.header, position: "relative" }}>
        <div>
          <div style={styles.headerSub}>Welcome to</div>
          <div style={styles.headerTitle}>Mugil Lunch Point</div>
          <div style={styles.headerTagline}>Fresh • Homely • Tasty</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ background: isShopOpen ? "#3d9c3d" : "#c0392b", color: "#fff", padding: "4px 10px", borderRadius: 12, fontSize: 10, fontWeight: 700 }}>
            {isShopOpen ? "🟢 OPEN" : "🔴 CLOSED"}
          </div>
          <div style={{ fontSize: 36 }}>🍱</div>
        </div>
      </div>

      {/* SEARCH */}
      <SearchBar search={search} setSearch={setSearch} vegFilter={vegFilter} setVegFilter={setVegFilter} />

      {isSearching ? (
        <SearchResults items={menuItems} openItem={openItem} />
      ) : (
        <>
          {/* BANNER */}
          <div style={styles.banner}>
            <div style={styles.bannerText}>
              <div style={styles.bannerTitle}>Today's Menu</div>
              <div style={styles.bannerSub}>Hot & Fresh — Ready to Serve 🔥</div>
            </div>
            <div style={{ fontSize: 52, filter: "drop-shadow(0 2px 6px #00000033)" }}>🍛</div>
          </div>

          {/* AFTERNOON MENU */}
          {filteredAfternoon.length > 0 && (
            <>
              <Section title="⭐ Afternoon Menu" />
              <div style={styles.specialsRow}>
                {filteredAfternoon.map(item => (
                  <button key={`afternoon-${item.id}`} style={styles.specialCard} onClick={() => openItem(item)}>
                    <div style={styles.specialEmoji}>{item.emoji}</div>
                    <div style={styles.specialName}>{item.name}</div>
                    <div style={{ ...styles.vegDot, background: item.veg ? "#3d9c3d" : "#c0392b", marginTop: 4 }} />
                    <div style={styles.specialPrice}>₹{item.price}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* NIGHT MENU */}
          {filteredNight.length > 0 && (
            <>
              <Section title="🌙 Evening/Night Menu" />
              <div style={styles.specialsRow}>
                {filteredNight.map(item => (
                  <button key={`night-${item.id}`} style={styles.specialCard} onClick={() => openItem(item)}>
                    <div style={styles.specialEmoji}>{item.emoji}</div>
                    <div style={styles.specialName}>{item.name}</div>
                    <div style={{ ...styles.vegDot, background: item.veg ? "#3d9c3d" : "#c0392b", marginTop: 4 }} />
                    <div style={styles.specialPrice}>₹{item.price}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* CATEGORIES */}
          <Section title="🗂 Browse Menu" />
          <div style={styles.catGrid}>
            {Object.entries(categoryMeta).map(([key, meta]) => (
              <button key={key} style={{ ...styles.catCard, background: `linear-gradient(135deg, ${meta.color}ee, ${meta.color}99)` }}
                onClick={() => openCategory(key)}>
                <div style={{ fontSize: 30 }}>{meta.emoji}</div>
                <div style={styles.catLabel}>{meta.label}</div>
                <div style={styles.catCount}>{menuData[key].length} items</div>
              </button>
            ))}
          </div>

          {/* FOOTER NOTE */}
          <div style={styles.footerNote}>
            <span>🕐</span> Morning: 12:30–2:30 &nbsp;|&nbsp; Night: 7:00–10:00
          </div>
        </>
      )}
    </div>
  );
}

function MenuScreen({ cat, items, search, setSearch, vegFilter, setVegFilter, goHome, openItem }) {
  const meta = categoryMeta[cat] || {};
  return (
    <div style={styles.scrollArea}>
      <div style={{ ...styles.menuHeader, background: `linear-gradient(135deg, ${meta.color || "#e07b39"}, #7b4f2e)` }}>
        <button style={styles.backBtn} onClick={goHome}>‹</button>
        <div>
          <div style={styles.menuHeaderEmoji}>{meta.emoji}</div>
          <div style={styles.menuHeaderTitle}>{meta.label}</div>
        </div>
        {cat === "tiffin" && (
          <div style={{ fontSize: 10, color: "#fff8f0", opacity: 0.8, textAlign: "right", paddingRight: 8 }}>
            Available at night<br />7pm to 10pm
          </div>
        )}
        {cat === "meals" && (
          <div style={{ fontSize: 10, color: "#fff8f0", opacity: 0.8, textAlign: "right", paddingRight: 8 }}>
            Available from<br />12:30pm to 3:00pm
          </div>
        )}
      </div>
      <SearchBar search={search} setSearch={setSearch} vegFilter={vegFilter} setVegFilter={setVegFilter} />
      {items.length === 0 ? (
        <div style={styles.empty}>No items found 🍽️</div>
      ) : (
        <div style={{ padding: "0 12px 80px" }}>
          {items.map(item => <FoodCard key={item.id} item={item} openItem={openItem} />)}
        </div>
      )}
    </div>
  );
}

function DetailScreen({ item, goBack, goHome }) {
  return (
    <div style={styles.scrollArea}>
      {/* BIG HERO */}
      <div style={styles.detailHero}>
        <button style={styles.backBtn} onClick={goBack}>‹</button>
        <div style={styles.detailEmojiBig}>{item.emoji}</div>
        <button style={{ ...styles.backBtn, fontSize: 18 }} onClick={goHome}>🏠</button>
      </div>

      <div style={styles.detailBody}>
        {/* TITLE ROW */}
        <div style={styles.detailTitleRow}>
          <div>
            <div style={styles.detailName}>{item.name}</div>
            <div style={styles.detailTaste}>{item.taste}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={styles.detailPrice}>₹{item.price}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
              <div style={{ ...styles.vegDot, background: item.veg ? "#3d9c3d" : "#c0392b" }} />
              <span style={{ fontSize: 11, color: "#7a5c3a", fontWeight: 600 }}>{item.veg ? "VEG" : "NON-VEG"}</span>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div style={styles.detailDesc}>{item.desc}</div>

        {/* INGREDIENTS */}
        <div style={styles.sectionLabel}>🧂 Ingredients</div>
        <div style={styles.ingredientsList}>
          {item.ingredients.map((ing, i) => (
            <div key={i} style={styles.ingredientItem}>
              <span style={styles.bulletDot}>•</span>
              <span style={styles.ingredientText}>{ing}</span>
            </div>
          ))}
        </div>

        {/* ALLERGEN */}
        {item.allergens && (
          <div style={styles.allergenBox}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <span style={styles.allergenText}><b>Allergen Note:</b> {item.allergens}</span>
          </div>
        )}

        {/* SPECIAL BADGE */}
        {item.special && (
          <div style={styles.specialBadge}>⭐ Today's Special</div>
        )}
      </div>
    </div>
  );
}

function SearchBar({ search, setSearch, vegFilter, setVegFilter }) {
  return (
    <div style={styles.searchWrap}>
      <div style={styles.searchBox}>
        <span style={{ fontSize: 16, opacity: .5 }}>🔍</span>
        <input
          style={styles.searchInput}
          placeholder="Search food or ingredients..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && <button style={styles.clearBtn} onClick={() => setSearch("")}>✕</button>}
      </div>
      <div style={styles.filterRow}>
        {["all", "veg", "nonveg"].map(f => (
          <button key={f} style={{ ...styles.filterBtn, ...(vegFilter === f ? styles.filterBtnActive : {}) }}
            onClick={() => setVegFilter(f)}>
            {f === "all" ? "All" : f === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchResults({ items, openItem }) {
  if (!items.length) return <div style={styles.empty}>No results found 🍽️</div>;
  return (
    <div style={{ padding: "0 12px 80px" }}>
      <div style={{ fontSize: 12, color: "#a07850", marginBottom: 8, marginTop: 4, fontWeight: 600 }}>{items.length} result{items.length > 1 ? "s" : ""} found</div>
      {items.map(item => <FoodCard key={item.id} item={item} openItem={openItem} />)}
    </div>
  );
}

function FoodCard({ item, openItem }) {
  return (
    <button style={styles.foodCard} onClick={() => openItem(item)}>
      <div style={styles.foodCardEmoji}>{item.emoji}</div>
      <div style={styles.foodCardBody}>
        <div style={styles.foodCardTitleRow}>
          <span style={styles.foodCardName}>{item.name}</span>
          <div style={{ ...styles.vegDot, background: item.veg ? "#3d9c3d" : "#c0392b" }} />
        </div>
        <div style={styles.foodCardDesc}>{item.desc}</div>
        <div style={styles.foodCardFooter}>
          <span style={styles.foodCardPrice}>₹{item.price}</span>
          {item.special && <span style={styles.specialTag}>⭐ Special</span>}
        </div>
      </div>
    </button>
  );
}

function Section({ title }) {
  return <div style={styles.sectionTitle}>{title}</div>;
}

function AboutScreen({ goHome }) {
  return (
    <div style={styles.scrollArea}>
      <div style={{ ...styles.header, position: "relative" }}>
        <div>
          <div style={styles.headerSub}>About Us</div>
          <div style={styles.headerTitle}>Mugil Lunch Point</div>
          <div style={styles.headerTagline}>Fresh • Homely • Tasty</div>
        </div>
        <div style={{ fontSize: 36 }}>👨‍🍳</div>
      </div>
      
      <div style={{ padding: "0 20px" }}>
        <Section title="Our Story" />
        <p style={{ color: "#4a2810", opacity: 0.9, lineHeight: 1.6, fontSize: 14 }}>
          Welcome to Mugil Lunch Point! We serve authentic, home-style South Indian food cooked with love and fresh ingredients every day. Whether you're craving a spicy Chicken Kushka or a comforting Curd Rice, we've got you covered.
        </p>

        <Section title="🕒 Timings" />
        <div style={styles.ingredientItem}>
          <div style={styles.ingredientText}><strong>Morning:</strong> 12:30 PM - 2:30 PM</div>
        </div>
        <div style={styles.ingredientItem}>
          <div style={styles.ingredientText}><strong>Night:</strong> 7:00 PM - 10:00 PM</div>
        </div>

        <Section title="📍 Location & Contact" />
        <div style={styles.ingredientItem}>
          <div style={styles.ingredientText}><strong>Address:</strong> https://maps.app.goo.gl/SNs4EKj89bz2S9uc9?g_st=ac</div>
        </div>
        <div style={styles.ingredientItem}>
          <div style={styles.ingredientText}><strong>Phone:</strong> +91 8608650016</div>
        </div>
      </div>

      {/* LOGO */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 30, marginBottom: 20 }}>
        <img 
          src="/logo.jpg" 
          alt="Mugil Lunch Point Logo" 
          style={{ 
            width: 220, 
            height: 220, 
            borderRadius: "50%", 
            objectFit: "cover",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)" 
          }} 
        />
      </div>

      <div style={{ height: 100 }} />
    </div>
  );
}

const styles = {
  shell: {
    minHeight: "100vh", background: "#1a0f07",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    padding: "20px 0",
  },
  phone: {
    width: 390, maxWidth: "100vw",
    background: "#fff8f0",
    borderRadius: 40, overflow: "hidden",
    boxShadow: "0 30px 80px #00000066, 0 0 0 1px #3a2210",
    display: "flex", flexDirection: "column",
    minHeight: 780, maxHeight: 900,
    position: "relative",
  },
  statusBar: {
    background: "#c0682a", padding: "8px 24px 6px",
    display: "flex", justifyContent: "space-between",
    flexShrink: 0,
  },
  screen: { flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" },
  scrollArea: { flex: 1, overflowY: "auto", background: "#fff8f0" },

  // HEADER
  header: {
    background: "linear-gradient(135deg, #c0682a, #7b3a1e)",
    padding: "20px 20px 16px", display: "flex",
    justifyContent: "space-between", alignItems: "center",
    borderBottom: "3px solid #e07b39",
  },
  headerSub: { fontSize: 11, color: "#ffd6a5", fontStyle: "italic", letterSpacing: 1 },
  headerTitle: { fontSize: 22, fontWeight: 700, color: "#fff8f0", letterSpacing: .5 },
  headerTagline: { fontSize: 11, color: "#ffd6a5", marginTop: 2, letterSpacing: 2 },

  // BANNER
  banner: {
    margin: "12px 12px 0", borderRadius: 16,
    background: "linear-gradient(120deg, #e07b39, #c05a20)",
    padding: "16px 18px", display: "flex",
    alignItems: "center", justifyContent: "space-between",
    boxShadow: "0 4px 16px #e07b3944",
  },
  bannerText: {},
  bannerTitle: { fontSize: 18, fontWeight: 700, color: "#fff" },
  bannerSub: { fontSize: 12, color: "#ffe0c0", marginTop: 4 },

  // SECTIONS
  sectionTitle: {
    fontSize: 14, fontWeight: 700, color: "#5a3010",
    padding: "14px 16px 4px", letterSpacing: .5,
  },

  // SPECIALS
  specialsRow: {
    display: "flex", gap: 10, padding: "6px 12px 12px",
    overflowX: "auto", scrollbarWidth: "none",
  },
  specialCard: {
    background: "#fff", border: "2px solid #f5d5b0",
    borderRadius: 14, padding: "12px 14px",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 4,
    minWidth: 90, cursor: "pointer",
    boxShadow: "0 2px 8px #e07b3920",
    flexShrink: 0,
  },
  specialEmoji: { fontSize: 28 },
  specialName: { fontSize: 11, fontWeight: 700, color: "#5a3010", textAlign: "center", lineHeight: 1.2 },
  specialPrice: { fontSize: 12, color: "#e07b39", fontWeight: 700, marginTop: 2 },

  // CATEGORIES
  catGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 10, padding: "6px 12px 12px",
  },
  catCard: {
    borderRadius: 16, padding: "16px 12px",
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 6, cursor: "pointer", border: "none",
    boxShadow: "0 3px 12px #00000022",
    transition: "transform .15s",
  },
  catLabel: { fontSize: 14, fontWeight: 700, color: "#fff" },
  catCount: { fontSize: 11, color: "#ffe0c0" },

  // FOOTER
  footerNote: {
    textAlign: "center", fontSize: 12, color: "#a07850",
    padding: "12px 16px 80px", fontStyle: "italic",
  },

  // MENU HEADER
  menuHeader: {
    padding: "14px 16px", display: "flex",
    alignItems: "center", justifyContent: "space-between",
    flexShrink: 0,
  },
  menuHeaderEmoji: { fontSize: 22, textAlign: "center" },
  menuHeaderTitle: { fontSize: 18, fontWeight: 700, color: "#fff", textAlign: "center" },

  // SEARCH
  searchWrap: { padding: "10px 12px 4px", background: "#fff8f0", flexShrink: 0 },
  searchBox: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#fff", borderRadius: 12, padding: "8px 12px",
    border: "1.5px solid #f0d0b0",
    boxShadow: "0 1px 6px #e07b3912",
  },
  searchInput: {
    flex: 1, border: "none", outline: "none",
    fontSize: 13, color: "#4a2810", background: "transparent",
    fontFamily: "inherit",
  },
  clearBtn: {
    background: "none", border: "none", cursor: "pointer",
    color: "#a07850", fontSize: 13, padding: 0,
  },
  filterRow: { display: "flex", gap: 6, marginTop: 8 },
  filterBtn: {
    flex: 1, padding: "5px 0", borderRadius: 20,
    border: "1.5px solid #e0c090", background: "#fff8f0",
    fontSize: 11, fontWeight: 600, color: "#8a5a30", cursor: "pointer",
  },
  filterBtnActive: {
    background: "#e07b39", border: "1.5px solid #e07b39", color: "#fff",
  },

  // FOOD CARD
  foodCard: {
    display: "flex", gap: 12, background: "#fff",
    borderRadius: 14, padding: "12px", marginBottom: 10,
    border: "1.5px solid #f0d8c0", cursor: "pointer",
    boxShadow: "0 2px 8px #e07b3912",
    width: "100%", textAlign: "left",
    alignItems: "flex-start",
  },
  foodCardEmoji: {
    fontSize: 38, background: "#fff4e8",
    borderRadius: 12, padding: "6px 10px",
    flexShrink: 0,
  },
  foodCardBody: { flex: 1 },
  foodCardTitleRow: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  foodCardName: { fontSize: 14, fontWeight: 700, color: "#3a1e06" },
  foodCardDesc: { fontSize: 12, color: "#8a6040", marginTop: 3, lineHeight: 1.4 },
  foodCardFooter: { display: "flex", alignItems: "center", gap: 8, marginTop: 6 },
  foodCardPrice: { fontSize: 13, fontWeight: 700, color: "#e07b39" },
  specialTag: {
    fontSize: 10, background: "#fff3e0", color: "#c05a10",
    borderRadius: 8, padding: "2px 7px", fontWeight: 700,
  },

  // VEG DOT
  vegDot: {
    width: 10, height: 10, borderRadius: 3,
    border: "1.5px solid #00000022", flexShrink: 0,
  },

  // DETAIL
  detailHero: {
    background: "linear-gradient(160deg, #c0682a, #7b3a1e)",
    padding: "14px 16px 0",
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    minHeight: 140,
  },
  detailEmojiBig: {
    fontSize: 80, textAlign: "center", flex: 1,
    marginTop: -10,
    filter: "drop-shadow(0 4px 12px #00000055)",
  },
  detailBody: { padding: "16px 16px 80px" },
  detailTitleRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", marginBottom: 8,
  },
  detailName: { fontSize: 20, fontWeight: 700, color: "#3a1e06", lineHeight: 1.2 },
  detailTaste: { fontSize: 12, color: "#a07850", marginTop: 3, fontStyle: "italic" },
  detailPrice: { fontSize: 22, fontWeight: 700, color: "#e07b39" },
  detailDesc: {
    fontSize: 13, color: "#6a4020", lineHeight: 1.6,
    background: "#fff4e8", borderRadius: 10,
    padding: "10px 12px", marginBottom: 14,
    border: "1px solid #f0d0a0",
  },
  sectionLabel: {
    fontSize: 13, fontWeight: 700, color: "#5a3010",
    marginBottom: 8, letterSpacing: .5,
  },
  ingredientsList: {
    background: "#fff", borderRadius: 12,
    padding: "10px 14px", border: "1.5px solid #f0d0b0",
    marginBottom: 12,
  },
  ingredientItem: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "5px 0", borderBottom: "1px solid #f8ece0",
  },
  bulletDot: { color: "#e07b39", fontWeight: 700, fontSize: 18, lineHeight: 1 },
  ingredientText: { fontSize: 13, color: "#4a2810" },
  allergenBox: {
    display: "flex", gap: 8, alignItems: "flex-start",
    background: "#fff9e6", borderRadius: 10,
    padding: "10px 12px", border: "1.5px solid #f0d080",
    marginBottom: 12,
  },
  allergenText: { fontSize: 12, color: "#7a5a10", lineHeight: 1.5 },
  specialBadge: {
    textAlign: "center", background: "linear-gradient(90deg,#ffd700,#f5a623)",
    borderRadius: 20, padding: "8px", fontSize: 13, fontWeight: 700,
    color: "#4a2800", boxShadow: "0 2px 8px #ffd70044",
  },

  // BACK BUTTON
  backBtn: {
    fontSize: 26, fontWeight: 700, color: "#fff8f0",
    background: "rgba(255,255,255,.2)", border: "none",
    borderRadius: 10, width: 36, height: 36,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", flexShrink: 0, lineHeight: 1,
  },

  // BOTTOM NAV
  bottomNav: {
    display: "flex", background: "#fff",
    borderTop: "1.5px solid #f0d0b0",
    padding: "6px 0 10px", flexShrink: 0,
    boxShadow: "0 -2px 12px #e07b3918",
  },
  navTab: {
    flex: 1, display: "flex", flexDirection: "column",
    alignItems: "center", gap: 2, background: "none",
    border: "none", cursor: "pointer", padding: "4px 0",
  },
  navTabActive: {},
  navLabel: { fontSize: 9, color: "#a08060", fontWeight: 600, letterSpacing: .3 },

  empty: { textAlign: "center", color: "#a07850", padding: "40px 20px", fontSize: 15 },
};