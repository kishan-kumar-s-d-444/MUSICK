import React from 'react';
import '../styles/about.css';

const AboutUs = () => {
    return (
        <div>
            <header className="hero-section">
                <div className="hero-text">
                    <h1>About Us</h1>
                    <p>Discover our story, our mission, and the team that makes it all happen.</p>
                </div>
            </header>

            <section className="about-description">
                <h2>Our Mission</h2>
                <p>
                    At MUSICK, our mission is to bring music and joy to everyone around the world. We believe in the power of music to inspire, unite, and transform lives. From global hits to hidden gems, we’re here to help you find the sound that speaks to you.
                </p>
            </section>

            <section className="team">
                <h2>Meet Our Team</h2>
                <div className="team-members">
                    <div className="member">
                        <img src="/images/ceo.jpeg" alt="Team Member 1"/>
                        <h3>ಕಿಶನ್</h3>
                        <p>CEO & Founder</p>
                    </div>
                    <div className="member">
                        <img src="/images/ceo.jpeg" alt="Team Member 2"/>
                        <h3>ಕಿಶನ್</h3>
                        <p>Chief Technology Officer</p>
                    </div>
                    <div className="member">
                        <img src="/images/ceo.jpeg" alt="Team Member 3"/>
                        <h3>ಕಿಶನ್</h3>
                        <p>Head of Design</p>
                    </div>
                </div>
            </section>

            <section className="contact">
                <h2>Contact Us</h2>
                <p>If you’d like to reach out, feel free to email us at <a href="mailto:kshnkmr4444@gmail.com">kshnkmr4444@gmail.com</a></p>
            </section>

            <footer className="footer">
                <p>&copy; 2024 MUSICK. All rights reserved.</p>
            </footer>

            <script src="https://kit.fontawesome.com/65ad08472d.js" crossorigin="anonymous"></script>
            <script src="script.js"></script>
        </div>
    );
};

export default AboutUs;
