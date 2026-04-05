// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import ChefList from "./components/ChefList";
import ScrollToTop from "./components/ScrollToTop";
import { NavHashLink } from "react-router-hash-link";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <header className="site-header">
          <div className="container header-inner">
            <h1>Ресторан «Veselka»</h1>
            <nav aria-label="Головна навігація">
              <ul className="nav-list">
                <li>
                  <Link to="/">Головна</Link>
                </li>
                <li>
                  <Link to="/menu">Меню</Link>
                </li>
                <li>
                  <Link to="/chefs">Наші кухарі</Link>
                </li>
                <li>
                  <NavHashLink smooth to="/#about" activeClassName="active">
                    Про нас
                  </NavHashLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            {/* Головна сторінка зі всім контентом з вашого index.html */}
            <Route
              path="/"
              element={
                <>
                  <section className="hero">
                    <div className="container">
                      <h2>Ласкаво просимо до ресторану «Veselka»</h2>
                      <p>
                        Авторська кухня, тепла атмосфера та якісні інгредієнти —
                        усе для вашого ідеального відпочинку.
                      </p>
                    </div>
                  </section>

                  <section className="container section-block">
                    <div className="main-photo-wrapper">
                      <article className="static-card">
                        <img
                          src="images/veselka.jpg"
                          alt="Інтер'єр ресторану Veselka"
                        />
                        <div className="card-body">
                          <h3>Наш ресторан</h3>
                          <p>Місце, де затишок зустрічається зі смаком.</p>
                        </div>
                      </article>
                    </div>
                  </section>

                  <section id="about" className="container section-block">
                    <article className="static-card">
                      <div className="card-content">
                        <h2>Про наш ресторан</h2>
                        <div className="about-grid">
                          <div>
                            <p>
                              «Veselka» — це ресторан сімейного формату в центрі
                              міста. Ми готуємо зі свіжих інгредієнтів,
                              дотримуємось високих стандартів якості та
                              створюємо теплу атмосферу для зустрічей із рідними
                              та друзями.
                            </p>

                            <h3>Наші переваги</h3>
                            <ul>
                              <li>Сезонне меню та авторські страви</li>
                              <li>Жива музика щоп'ятниці</li>
                              <li>Окрема дитяча зона</li>
                            </ul>

                            <div className="work-schedule">
                              <h3>Графік роботи</h3>
                              <ul
                                className="schedule-list"
                                style={{ listStyle: "none", padding: 0 }}
                              >
                                <li>
                                  <strong>Понеділок — П'ятниця:</strong> 10:00 -
                                  22:00
                                </li>
                                <li>
                                  <strong>Субота — Неділя:</strong> 09:00 -
                                  23:00
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="map-wrapper">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.238804561066!2d-73.9912061!3d40.730336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25999013c79c5%3A0xc3b83216892306f6!2sVeselka!5e0!3m2!1suk!2sua!4v1711111111111"
                              width="100%"
                              height="350"
                              style={{ border: 0, borderRadius: "12px" }}
                              allowFullScreen=""
                              loading="lazy"
                            ></iframe>
                          </div>
                        </div>

                        {/* Відгуки інтегровані в секцію контенту, як було в HTML */}
                        <Reviews />
                      </div>
                    </article>
                  </section>
                </>
              }
            />

            <Route path="/menu" element={<Menu />} />
            <Route path="/chefs" element={<ChefList />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="container footer-content">
            <div className="footer-left">
              <p>
                <strong>Контакти:</strong> 144 2nd Ave, New York, NY 10003,
                Сполучені Штати
              </p>
              <p>
                <strong>Телефон:</strong> +1 256-854-6556
              </p>
              <p>
                <strong>Email:</strong> info@smakota.ua
              </p>
            </div>

            <div className="footer-right">
              <p>
                <strong>Ми у соцмережах:</strong>
              </p>
              <ul className="social-links">
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="container copyright">
            <p>© 2026 Ресторан «Veselka». Усі права захищено.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
