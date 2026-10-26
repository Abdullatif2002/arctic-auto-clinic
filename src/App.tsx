
import './App.css'

function App() {
  return (
    <div className="website">
      <header className="navbar">
        <a href="#" className="logo">
          Arctic<span>Auto</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#booking" className="nav-button">
          Book a Service
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">YOUR TRUSTED LOCAL GARAGE</p>

            <h1>
              Reliable Car Care.
              <br />
              <span>Every Journey.</span>
            </h1>

            <p className="hero-description">
              From seasonal tire changes to vehicle maintenance,
              we help keep your car safe and ready for the road.
            </p>

            <div className="hero-actions">
              <a href="#booking" className="primary-button">
                Book Your Service →
              </a>
              <a href="#services" className="secondary-button">
                Explore Services
              </a>
            </div>

            <div className="trust-note">
              <span>✓</span> Professional care for your vehicle
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-top">
              <span>ARCTIC AUTO CLINIC</span>
              <span className="status-dot">●</span>
            </div>

            <div className="car-illustration">🚘</div>

            <div className="hero-card-bottom">
              <div>
                <strong>Drive with confidence.</strong>
                <p>We take care of your car.</p>
              </div>
              <span className="arrow-circle">↗</span>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-heading">
            <p className="eyebrow">WHAT WE DO</p>
            <h2>Complete care for your car.</h2>
            <p>Practical automotive services to keep you moving.</p>
          </div>

          <div className="service-grid">
            <article className="service-card">
              <span className="service-icon">❄️</span>
              <h3>Tire Change</h3>
              <p>Seasonal tire changes to prepare your car for Finnish roads.</p>
              <a href="#booking">Book service ↗</a>
            </article>

            <article className="service-card">
              <span className="service-icon">🔧</span>
              <h3>Car Maintenance</h3>
              <p>Routine maintenance to help keep your vehicle in good condition.</p>
              <a href="#booking">Book service ↗</a>
            </article>

            <article className="service-card">
              <span className="service-icon">⚙️</span>
              <h3>Mechanical Repairs</h3>
              <p>Get help with vehicle problems and necessary repairs.</p>
              <a href="#booking">Book service ↗</a>
            </article>
          </div>
        </section>

        <section className="booking-banner" id="booking">
          <div>
            <p className="eyebrow">READY TO GET STARTED?</p>
            <h2>Your car deserves the right care.</h2>
            <p>Contact our team to discuss your vehicle's service needs.</p>
          </div>
          <a href="#contact" className="primary-button">
            Contact Us →
          </a>
        </section>

        <section className="contact" id="contact">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>We're here to help.</h2>
          <p>Contact Arctic Auto Clinic for service information and bookings.</p>
          <p className="contact-note">
            Contact details and opening hours will be added after confirmation
            with the company.
          </p>
        </section>
      </main>

      <footer>
        <a href="#home" className="logo">
          Arctic<span>Auto</span>
        </a>
        <p>© {new Date().getFullYear()} Arctic Auto Clinic</p>
      </footer>
    </div>
  )
}

export default App
