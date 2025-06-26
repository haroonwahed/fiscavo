export default function Landing() {
  const handleGetStarted = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Fiscatax</h1>
          <p>Simpel. Accuraat. Veilig. Jouw Nederlandse belastingbuddy.</p>
          <a className="btn-primary" href="#" onClick={handleGetStarted}>
            Start nu met je aangifte
          </a>
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