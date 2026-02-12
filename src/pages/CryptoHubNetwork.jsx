import React, { useMemo, useState, useRef, useEffect } from "react";

export default function CryptoHubNetwork() {
  const USD_AMOUNT = 66;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    network: "MTN MoMo",
    email: "",
    country: "Ghana",
    crypto: "USDT",
    walletAddress: "",
  });

  const [status, setStatus] = useState("idle"); // idle | paying | success
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const isValid = useMemo(() => {
    const phoneOk = /^[0-9+\s-]{9,16}$/.test(form.phone.trim());
    const nameOk = form.fullName.trim().length >= 2;
    const walletOk = form.walletAddress.trim().length >= 12;
    return phoneOk && nameOk && walletOk;
  }, [form]);

  // Audio control functions
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Create audio context for ambient crypto sounds
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 30%
      audioRef.current.loop = true;
    }
  }, []);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function makeRef() {
    const now = Date.now().toString(36).toUpperCase();
    const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `CHN-${now}-${rnd}`;
  }

  async function handlePayNow() {
    setError("");

    if (!isValid) {
      setError("Please enter your full name, a valid phone number, and wallet address.");
      return;
    }

    setStatus("paying");
    const ref = makeRef();
    setReference(ref);

    // Demo delay
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  function reset() {
    setStatus("idle");
    setReference("");
    setError("");
  }

  return (
    <div style={styles.page}>
      {/* Background Audio */}
      <audio ref={audioRef} preload="none">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdBSSByPDYjToIGGS57OqhUQwOUajk8LliHgg2jdXzzn0vBSJ+ye/eizEIHWq+8+qeUAwLTKXh8bllHgU4ldfx2YgyBRh2ye/Zkyoz" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* Crypto Logo Watermarks */}
      <div style={styles.watermarks}>
        <div style={{...styles.watermark, ...styles.bitcoin}}>₿</div>
        <div style={{...styles.watermark, ...styles.ethereum}}>Ξ</div>
        <div style={{...styles.watermark, ...styles.bnb}}>🅱</div>
        <div style={{...styles.watermark, ...styles.solana}}>◎</div>
      </div>

      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.h1}>🚀 Crypto Hub Network</h1>
            <p style={styles.sub}>
              Buy crypto access for <b>${USD_AMOUNT}</b> using Mobile Money.
            </p>
          </div>

          <div style={styles.headerControls}>
            {/* Audio Control Button */}
            <button onClick={toggleAudio} style={styles.audioButton}>
              {isPlaying ? "🔊 Pause" : "🎵 Play"}
            </button>
            
            <div style={styles.badgeBox}>
              <div style={styles.badgeTitle}>Secure Checkout</div>
              <div style={styles.badgeSub}>MoMo • Quick confirmation</div>
            </div>
          </div>
        </header>

        {/* Main grid wrapper (for divider) */}
        <div style={styles.gridWrap}>
          <div style={styles.divider} />

          <div style={styles.grid}>
            {/* LEFT: Checkout */}
            <section style={styles.card}>
              <h2 style={styles.h2}>💳 Buyer Details</h2>

              {status !== "success" ? (
                <>
                  <div style={styles.field}>
                    <label style={styles.label}>Full Name</label>
                    <input
                      style={styles.input}
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Ephraim Kponyo"
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Phone Number (MoMo)</label>
                    <input
                      style={styles.input}
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="e.g. 0241234567"
                      inputMode="tel"
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Mobile Money Network</label>
                    <select
                      style={styles.input}
                      value={form.network}
                      onChange={(e) => updateField("network", e.target.value)}
                    >
                      <option>MTN MoMo</option>
                      <option>Telecel Cash</option>
                      <option>AirtelTigo Money</option>
                    </select>
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Email (optional)</label>
                    <input
                      style={styles.input}
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@email.com"
                      inputMode="email"
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Crypto to Receive</label>
                    <select
                      style={styles.input}
                      value={form.crypto}
                      onChange={(e) => updateField("crypto", e.target.value)}
                    >
                      <option>USDT 💰</option>
                      <option>BTC ₿</option>
                      <option>ETH Ξ</option>
                      <option>SOL ◎</option>
                    </select>
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Country</label>
                    <input
                      style={styles.input}
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      placeholder="Ghana"
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Wallet Address (where you want to receive)</label>
                    <input
                      style={styles.input}
                      value={form.walletAddress}
                      onChange={(e) => updateField("walletAddress", e.target.value)}
                      placeholder="Paste your wallet address"
                    />
                    <div style={styles.helper}>
                      💡 Tip: Double-check your address. Payments are non-refundable.
                    </div>
                  </div>

                  {error ? <div style={styles.error}>⚠️ {error}</div> : null}

                  {/* Buttons aligned nicely */}
                  <div style={styles.buttonRow}>
                    <button
                      onClick={handlePayNow}
                      disabled={status === "paying"}
                      style={{
                        ...styles.primaryBtn,
                        opacity: status === "paying" ? 0.7 : 1,
                        cursor: status === "paying" ? "not-allowed" : "pointer",
                      }}
                    >
                      {status === "paying" ? "Processing..." : `💳 Pay $${USD_AMOUNT} with MoMo`}
                    </button>

                    <button onClick={reset} type="button" style={styles.secondaryBtn}>
                      🔄 Reset
                    </button>
                  </div>

                  <div style={styles.terms}>
                    🔒 By paying, you agree to our terms. This is a demo checkout UI—connect your payment provider to go
                    live.
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={styles.successIcon}>✅</div>
                  <h3 style={styles.h3}>🎉 Payment Initiated</h3>
                  <p style={styles.successText}>When live, you'd receive a MoMo prompt now.</p>

                  <div style={styles.receipt}>
                    <div style={styles.receiptRow}>
                      <span style={styles.receiptLabel}>Reference</span>
                      <b>{reference}</b>
                    </div>
                    <div style={styles.receiptRow}>
                      <span style={styles.receiptLabel}>Amount</span>
                      <b>${USD_AMOUNT}.00</b>
                    </div>
                    <div style={styles.receiptRow}>
                      <span style={styles.receiptLabel}>Network</span>
                      <b>{form.network}</b>
                    </div>
                    <div style={styles.receiptRow}>
                      <span style={styles.receiptLabel}>Deliver to</span>
                      <b style={styles.ellipsis}>{form.walletAddress}</b>
                    </div>
                  </div>

                  <div style={styles.buttonRowCenter}>
                    <button onClick={reset} style={styles.secondaryBtn}>
                      🆕 New Payment
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* RIGHT: Learn */}
            <aside style={styles.card}>
              <h2 style={styles.h2}>📚 Learn Crypto Trading</h2>
              <p style={styles.p}>
                Build skills the right way: price action, risk management, and technical analysis.
              </p>

              <div style={styles.list}>
                <div style={styles.listItem}>
                  <div style={styles.listTitle}>📈 Technical Analysis (TA)</div>
                  <div style={styles.listText}>
                    Support/Resistance, Trendlines, Market Structure, Candlesticks, Volume basics.
                  </div>
                </div>

                <div style={styles.listItem}>
                  <div style={styles.listTitle}>🧠 Trading Psychology</div>
                  <div style={styles.listText}>
                    Discipline, avoiding revenge trades, managing emotions, following a plan.
                  </div>
                </div>

                <div style={styles.listItem}>
                  <div style={styles.listTitle}>🛡️ Risk Management</div>
                  <div style={styles.listText}>
                    Position sizing, stop-loss, risk-reward ratio, never over-leverage.
                  </div>
                </div>

                <div style={styles.listItem}>
                  <div style={styles.listTitle}>🧰 Tools & Setup</div>
                  <div style={styles.listText}>
                    TradingView charts, watchlists, journaling trades, basic market news checks.
                  </div>
                </div>
              </div>

              <div style={styles.miniCard}>
                <div style={styles.miniTitle}>🗺️ Beginner Roadmap</div>
                <ol style={styles.ol}>
                  <li>📊 Learn candles + support/resistance</li>
                  <li>📈 Master trend & structure</li>
                  <li>💡 Practice on demo/small size</li>
                  <li>📝 Journal every trade</li>
                </ol>
              </div>

              <div style={styles.note}>
                💡 Want a "Learn" page next? We can add routing (Home / Learn / Buy) using React Router.
              </div>
            </aside>
          </div>
        </div>

        <footer style={styles.footer}>
          © {new Date().getFullYear()} Crypto Hub Network — Demo UI. Connect a payment provider to go live. 🚀
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(900px 500px at 20% 10%, rgba(0, 123, 255, 0.25), transparent 60%), radial-gradient(900px 500px at 90% 40%, rgba(255, 193, 7, 0.20), transparent 60%), linear-gradient(180deg, #0B1426, #050B1A)",
    color: "#ffffff",
    padding: "28px 16px",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    position: "relative",
    overflow: "hidden",
  },
  
  // Watermark styles
  watermarks: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 1,
  },
  watermark: {
    position: "absolute",
    fontSize: "120px",
    fontWeight: "bold",
    opacity: 0.03,
    userSelect: "none",
    animation: "float 8s ease-in-out infinite",
  },
  bitcoin: {
    top: "10%",
    left: "5%",
    color: "#f7931a",
    animationDelay: "0s",
  },
  ethereum: {
    top: "20%",
    right: "10%",
    color: "#627eea",
    animationDelay: "2s",
  },
  bnb: {
    bottom: "25%",
    left: "8%",
    color: "#f0b90b",
    animationDelay: "4s",
  },
  solana: {
    bottom: "15%",
    right: "5%",
    color: "#9945ff",
    animationDelay: "6s",
  },

  container: { 
    maxWidth: 1100, 
    margin: "0 auto", 
    position: "relative", 
    zIndex: 2 
  },

  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 18,
  },
  headerControls: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  audioButton: {
    padding: "8px 16px",
    borderRadius: 12,
    border: "1px solid rgba(0, 123, 255, 0.3)",
    background: "rgba(0, 123, 255, 0.1)",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  h1: { 
    margin: 0, 
    fontSize: 34, 
    letterSpacing: 0.2,
    background: "linear-gradient(135deg, #00ff88, #007bff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  sub: { margin: "10px 0 0", opacity: 0.9, lineHeight: 1.4, color: "#e8f4fd" },

  badgeBox: {
    textAlign: "right",
    opacity: 0.95,
    border: "1px solid rgba(0, 123, 255, 0.2)",
    background: "rgba(0, 123, 255, 0.08)",
    padding: "10px 12px",
    borderRadius: 14,
    backdropFilter: "blur(10px)",
  },
  badgeTitle: { fontWeight: 700, fontSize: 12, color: "#00ff88" },
  badgeSub: { fontSize: 12, opacity: 0.8, marginTop: 3, color: "#b8e6ff" },

  gridWrap: { position: "relative" },
  divider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 1,
    background: "linear-gradient(to bottom, transparent, rgba(0, 123, 255, 0.3), transparent)",
    pointerEvents: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: 20,
    alignItems: "stretch",
  },

  card: {
    borderRadius: 18,
    border: "1px solid rgba(0, 123, 255, 0.2)",
    background: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    backdropFilter: "blur(15px)",
    boxShadow: "0 10px 30px rgba(0, 123, 255, 0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  h2: { margin: "0 0 12px", fontSize: 18, color: "#00ff88" },
  h3: { margin: "8px 0 0", color: "#00ff88" },
  p: { margin: "0 0 12px", opacity: 0.9, lineHeight: 1.5, color: "#e8f4fd" },

  field: { marginBottom: 16 },
  label: { 
    display: "block", 
    fontSize: 12, 
    opacity: 0.9, 
    marginBottom: 6, 
    color: "#b8e6ff",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0, 123, 255, 0.2)",
    background: "rgba(0, 123, 255, 0.05)",
    color: "white",
    outline: "none",
    fontSize: 14,
    transition: "all 0.3s ease",
  },
  helper: { 
    marginTop: 6, 
    fontSize: 12, 
    opacity: 0.8, 
    color: "#ffc107",
    fontStyle: "italic",
  },

  error: {
    marginTop: 0,
    marginBottom: 12,
    padding: "10px 12px",
    borderRadius: 12,
    background: "rgba(220, 53, 69, 0.15)",
    border: "1px solid rgba(220, 53, 69, 0.3)",
    fontSize: 13,
    color: "#ff6b6b",
  },

  buttonRow: {
    display: "grid",
    gridTemplateColumns: "1fr 140px",
    gap: 10,
    marginTop: 4,
    alignItems: "stretch",
  },
  buttonRowCenter: { display: "flex", justifyContent: "center", marginTop: 12 },

  primaryBtn: {
    height: 46,
    borderRadius: 12,
    border: "none",
    fontWeight: 800,
    color: "#0B1426",
    background: "linear-gradient(135deg, #00ff88, #007bff)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: 14,
  },
  secondaryBtn: {
    height: 46,
    borderRadius: 12,
    border: "1px solid rgba(0, 123, 255, 0.3)",
    background: "transparent",
    color: "#00ff88",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  terms: { 
    marginTop: 10, 
    fontSize: 12, 
    opacity: 0.8, 
    color: "#b8e6ff",
    lineHeight: 1.4,
  },

  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 999,
    margin: "0 auto 10px",
    display: "grid",
    placeItems: "center",
    background: "rgba(0, 255, 136, 0.15)",
    border: "1px solid rgba(0, 255, 136, 0.3)",
    fontSize: 34,
  },
  successText: { opacity: 0.9, marginTop: 6, color: "#e8f4fd" },

  receipt: {
    marginTop: 14,
    padding: 12,
    borderRadius: 16,
    border: "1px solid rgba(0, 123, 255, 0.2)",
    background: "rgba(0, 0, 0, 0.3)",
    textAlign: "left",
  },
  receiptRow: { display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8 },
  receiptLabel: { opacity: 0.8, color: "#b8e6ff" },
  ellipsis: { maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },

  list: { display: "grid", gap: 10, marginTop: 10 },
  listItem: {
    borderRadius: 14,
    border: "1px solid rgba(0, 123, 255, 0.15)",
    background: "rgba(0, 123, 255, 0.05)",
    padding: 12,
    transition: "all 0.3s ease",
  },
  listTitle: { fontWeight: 800, marginBottom: 4, color: "#00ff88" },
  listText: { opacity: 0.9, lineHeight: 1.45, fontSize: 13, color: "#e8f4fd" },

  miniCard: {
    marginTop: 12,
    borderRadius: 14,
    border: "1px solid rgba(255, 193, 7, 0.2)",
    background: "rgba(255, 193, 7, 0.05)",
    padding: 12,
  },
  miniTitle: { fontWeight: 800, marginBottom: 6, color: "#ffc107" },
  ol: { margin: 0, paddingLeft: 18, opacity: 0.9, lineHeight: 1.55, color: "#e8f4fd" },

  note: { 
    marginTop: 12, 
    fontSize: 12, 
    opacity: 0.8, 
    color: "#b8e6ff",
    fontStyle: "italic",
  },

  footer: { 
    marginTop: 18, 
    opacity: 0.8, 
    fontSize: 12, 
    textAlign: "center", 
    color: "#b8e6ff" 
  },
};

// Add keyframe animation for floating effect (you'll need to add this to your CSS file)
const floatAnimation = `
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(-5px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(0.5deg); }
}
`;

// You can add this to your index.css or create a separate CSS file