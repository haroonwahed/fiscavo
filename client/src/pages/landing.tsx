import { useAuth } from "../App";

export default function Landing() {
  const { setIsAuthenticated } = useAuth();
  
  const handleGetStarted = () => {
    console.log("Button clicked - logging in user");
    console.log("setIsAuthenticated function:", setIsAuthenticated);
    setIsAuthenticated(true);
    console.log("Authentication set to true");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Fiscatax</h1>
          <p>Simpel. Accuraat. Veilig. Jouw Nederlandse belastingbuddy.</p>
          <button 
            className="btn-primary" 
            onClick={handleGetStarted}
            style={{ 
              backgroundColor: 'white', 
              color: '#368DD9', 
              padding: '12px 24px', 
              border: 'none', 
              borderRadius: '12px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: '16px',
              zIndex: 10,
              position: 'relative'
            }}
          >
            Start nu met je aangifte
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="card">
          <h2>✔ Automatische BTW-berekening</h2>
          <p>Vul je gegevens in en laat de rest over aan Fiscatax.</p>
        </div>
        <div className="card">
          <h2>✔ Veilig & AVG-proof</h2>
          <p>Jouw data blijft 100% in Nederland opgeslagen, veilig en versleuteld.</p>
        </div>
        <div className="card">
          <h2>✔ Ondersteuning van experts</h2>
          <p>Vragen? Ons team van fiscale experts staat voor je klaar.</p>
        </div>
      </section>
    </div>
  );
}