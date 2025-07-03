import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate as useReactRouterNavigate } from 'react-router-dom';
import './App.css';
import RestaurantRegistration from './components/RestaurantRegistration';
import RestaurantDashboard from './components/RestaurantDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/restaurant-registration" element={<RestaurantRegistration />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
      </Routes>
    </Router>
  );
}

function MainContent() {
  const [slideIndex, setSlideIndex] = useState(1);

  const showSlides = (n) => {
    if (typeof document === 'undefined') return;
    const slides = document.getElementsByClassName("mySlides");
    if (!slides || slides.length === 0) return;
    
    let newIndex = slideIndex; // Use current slideIndex from state to calculate next
    if (n !== undefined) { // if n is passed, it's a direct navigation
        newIndex = n;
    } else { // if n is undefined, it's auto-slide, so increment
        newIndex++;
    }

    if (newIndex > slides.length) newIndex = 1;
    if (newIndex < 1) newIndex = slides.length;
    
    for (let i = 0; i < slides.length; i++) {
      if (slides[i] && slides[i].style) {
         slides[i].style.display = "none";
      }
    }
    
    if (slides[newIndex - 1] && slides[newIndex - 1].style) {
        slides[newIndex - 1].style.display = "block";
    }
    setSlideIndex(newIndex); // Update state
  };

  const plusSlides = (n) => {
    showSlides(slideIndex + n); // Calculate new index based on current and navigate
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      showSlides(slideIndex); // Initial slide show based on current slideIndex
      
      const interval = setInterval(() => {
        showSlides(); // Call without 'n' to auto-increment
      }, 5000);
      
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount to initialize slider and set interval

   // Effect to handle manual navigation updating the display
   useEffect(() => {
    if (typeof document !== 'undefined') {
        showSlides(slideIndex);
    }
   }, [slideIndex]);


  return (
    <div className="App">
      <Header />
      <SliderSection plusSlides={plusSlides} />
      <WelcomeSection />
      <MissionSection />
      <TestimonialsSection />
      <ContributeSection />
      <VolunteerSection />
      <HowItWorksSection />
      <TeamSection />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      {/* Header content... (no changes here unless specifically for reducing its own bottom margin via CSS) */}
      <div className="header-content">
        <div className="logo">
          <img src="Logo.png" alt="Ann Daan Logo" />
          <h1>Ann Daan</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#one">Home</a></li>
            <li><a href="#contribute">Contribute</a></li>
            <li><a href="#get-help">Get Help</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function SliderSection({ plusSlides }) {
  // SliderSection content... (no changes here unless specifically for reducing its own top margin via CSS)
  return (
    <section className="slider-container">
      <div className="slider">
        <div className="mySlides fade">
          <div className="numbertext">1 / 4</div>
          <div className="img-container">
            <img src="img1.jpg" alt="Slide 1: People receiving food" />
          </div>
        </div>
        <div className="mySlides fade">
          <div className="numbertext">2 / 4</div>
          <div className="img-container">
            <img src="img2.jpg" alt="Slide 2: Food donation drive" />
          </div>
        </div>
        <div className="mySlides fade">
          <div className="numbertext">3 / 4</div>
          <div className="img-container">
            <img src="img3.jpg" alt="Slide 3: Volunteers at work" />
          </div>
        </div>
        <div className="mySlides fade">
          <div className="numbertext">4 / 4</div>
          <div className="img-container">
            <img src="img4.jpg" alt="Slide 4: Community meal" />
          </div>
        </div>
        <a className="prev" onClick={() => plusSlides(-1)} role="button" tabIndex="0" onKeyPress={(e) => e.key === 'Enter' && plusSlides(-1)}>❮</a>
        <a className="next" onClick={() => plusSlides(1)} role="button" tabIndex="0" onKeyPress={(e) => e.key === 'Enter' && plusSlides(1)}>❯</a>
      </div>
    </section>
  );
}

function WelcomeSection() {
  return (
    // Reduced marginTop significantly. Adjust as needed or remove if no gap is desired here.
    // This section is AFTER the slider.
    <div id="one" style={{ marginTop: "5%", textAlign: 'center', padding: '20px 0' }}> 
      <h1>Welcome to Ann Daan</h1>
    </div>
  );
}

function MissionSection() {
  return (
    <section id="mission" className="section">
      <div className="container">
        <h2>Our Mission</h2>
        <div className="mission-content">
          <div className="mission-text" id="min">
            <p>At Ann Daan, we believe that no one should go hungry while good food goes to waste. Our mission is to create a sustainable and efficient food donation ecosystem that connects surplus food with those in need, fostering a sense of community and social responsibility.</p>
          </div>
          <div className="mission-stats">
            <div className="stat-item">
              <span className="number">1M+</span>
              <span className="label">Meals Served</span>
            </div>
            <div className="stat-item">
              <span className="number">50K+</span>
              <span className="label">Lives Impacted</span>
            </div>
            <div className="stat-item">
              <span className="number">69+</span>
              <span className="label">Cities Covered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <h2>What People Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial fade-in">
            <blockquote className="testimonial-content">"Ann Daan has made a huge difference in our community. Their dedication to fighting hunger is inspiring."</blockquote>
            <p className="testimonial-author">- Varun Shinde, Local Resident</p>
          </div>
          <div className="testimonial fade-in">
            <blockquote className="testimonial-content">"As a restaurant owner, I'm grateful for the opportunity to donate our surplus food and make a positive impact."</blockquote>
            <p className="testimonial-author">- Virat Sharma, Restaurant Owner</p>
          </div>
          <div className="testimonial fade-in">
            <blockquote className="testimonial-content">"The volunteers at Ann Daan are amazing. Their kindness and hard work truly make a difference."</blockquote>
            <p className="testimonial-author">- John Doe, Volunteer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContributeSection() {
  const handleDonateClick = () => {
    window.location.href = 'https://food-don.vercel.app/donate'; 
  };
  const handleGetHelpClick = () => {
    window.location.href = 'https://food-don.vercel.app/get-food';
  };
  return (
    <section className="contribute" id="contribute">
      <div className="container2">
        <h2 id="animationid">Contribute</h2>
        <div className="content-box">
          <img src="i1.jpeg" id="imgid1" alt="Donate Food" />
        </div>
        <button onClick={handleDonateClick} className="btn">Donate</button>
      </div>
      <div className="container1">
        <h2 id="animationid-gethelp">Get Help!</h2> {/* Unique ID */}
        <div className="content-box">
          <img src="i2.jpeg" id="imgid2" alt="Get Food Help" />
        </div>
        <button onClick={handleGetHelpClick} className="btn">Get Help</button>
      </div>
    </section>
  );
}

function VolunteerSection() {
  const navigate = useReactRouterNavigate();
  const handleRestaurantClick = (e) => {
    e.preventDefault();
    navigate('/restaurant-registration');
  };
  const handleVolunteerClick = () => {
    window.location.href = 'https://food-don.vercel.app/volunteer';
  };
  return (
    <section className="contribute">
      <div className="container2">
        <h2 id="animationid-restaurant">Restaurants</h2>
        <div className="content-box">
          <img src="i3.jpeg" id="imgid3" alt="Restaurant Registration" />
        </div>
        <button onClick={handleRestaurantClick} className="btn">Register Your Restaurant</button>
      </div>
      <div className="container2">
        <h2 id="animationid-volunteer">Volunteer!</h2>
        <div className="content-box">
          <img src="i4.jpg" id="imgid4" alt="Volunteer Registration" />
        </div>
        <button onClick={handleVolunteerClick} className="btn">Register as Volunteer</button>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <h2>How It Works</h2>
        <div style={{ margin: "50px auto", gap: "30px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "0 15px" }} className="how-it-works-grid">
          <div className="step slide-in-left">
            <img src="Donate.png" alt="Icon representing food donation" />
            <h3>Food is Donated</h3>
            <p>Generous donations of surplus and fresh food from local businesses, farmers, and community members.</p>
          </div>
          <div className="step fade-in">
            <img src="Secure.png" alt="Icon representing food security" />
            <h3>Food is Secured</h3>
            <p>Food is secured through our network of generous donors and partners, ensuring it reaches those in need.</p>
          </div>
          <div className="step slide-in-right">
            <img src="Pick.png" alt="Icon representing food pickup" />
            <h3>Food is Picked Up</h3>
            <p>Our team ensures that every donation is picked up promptly and delivered safely to those who need it most.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// function TeamSection() { 
//   const teamMembers = [
//     { name: "Vaidik Saxena", id: "LCS2024016", image: "/src/assets/img/1.jpeg" },
//     { name: "Sumanth V U", id: "LIT2024058", image: "/src/assets/img/2.jpeg" },
//     { name: "Mozammil Ali", id: "LCS2024035", image: "/src/assets/img/3.jpeg" },
//     { name: "Chowdam Tanmai", id: "LCS2024016-2", image: "/src/assets/img/4.jpeg" }, // Made ID unique for key
//     { name: "Sandesh Raj", id: "LCS2024004", image: "/src/assets/img/5.jpeg" },
//     { name: "Vansh Tomar", id: "LCS2024043", image: "/src/assets/img/6.jpeg" },
//     { name: "Gubba Pavani", id: "LIT2024035-2", image: "/src/assets/img/7.jpeg" }, // Made ID unique for key
//     { name: "Shaik Meer G S", id: "LCS2024025", image: "/src/assets/img/8.jpeg" }
//   ];

//   /*
//   CSS Suggestions for App.css (or your relevant stylesheet) for the TeamSection:

//   .section.about-us .container { // Or just .about-us .container
//     max-width: 1200px; // Or your preferred max width
//     margin-left: auto;
//     margin-right: auto;
//     padding: 20px;
//   }

//   .team-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); // Responsive grid
//     gap: 20px; // Space between cards
//     justify-content: center; // Center grid items if they don't fill the row
//   }

//   .team-member-card {
//     background-color: #f9f9f9; // Optional: card background
//     border-radius: 8px;
//     box-shadow: 0 2px 4px rgba(0,0,0,0.1); // Optional: card shadow
//     text-align: center;
//     padding: 15px;
//     overflow: hidden; // Ensures content doesn't spill if not handled well
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }

//   .team-member-image-container {
//     width: 150px; // Fixed width for the image container
//     height: 150px; // Fixed height
//     border-radius: 50%; // Circular images
//     overflow: hidden; // Important for circular mask
//     margin-bottom: 10px;
//     border: 3px solid #ddd; // Optional: border around image
//   }

//   .team-member-image {
//     width: 100%;
//     height: 100%;
//     object-fit: cover; // Ensures image covers the area, might crop
//     object-position: center; // Centers the image within the crop
//   }

//   .team-member-name {
//     font-weight: bold;
//     margin-top: 8px;
//     margin-bottom: 4px;
//     color: #333;
//   }

//   .team-member-id {
//     font-size: 0.9em;
//     color: #666;
//   }
//   */

//   return (
//     <section id="about-us" className="section about-us">
//       <div className="container">
//         <h2><strong>Our Team</strong></h2>
//         <div className="team-grid">
//           {teamMembers.map((member) => ( // Removed index from key if member.id is unique enough after adjustment
//             <div className="team-member-card" key={member.id}> 
//               <div className="team-member-image-container">
//                 <img src={member.image} alt={`Team Member ${member.name}`} className="team-member-image"/>
//               </div>
//               <p className="team-member-name">{member.name}</p>
//               <p className="team-member-id">{member.id.replace('-2', '')}</p> {/* Display original ID if modified for key */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function TeamSection() { 
  const teamMembers = [
    { name: "Vaidik Saxena", id: "LCS2024016", image: "1.jpeg" },
    { name: "Sumanth V U", id: "LIT2024058", image: "2.jpeg" },
    { name: "Mozammil Ali", id: "LCS2024035", image: "3.jpeg" },
    { name: "Chowdam Tanmai", id: "LCS2024016", image: "4.jpeg" },
    { name: "Sandesh Raj", id: "LCS2024004", image: "5.jpeg" },
    { name: "Vansh Tomar", id: "LCS2024043", image: "6.jpeg" },
    { name: "Gubba Pavani", id: "LIT2024035", image: "7.jpeg" },
    { name: "Shaik Meer G S", id: "LCS2024025", image: "8.jpeg" }
  ];


  return (
    <section id="about-us" className="section about-us">
      <div className="container">
        <h2><strong>Our Team</strong></h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div id="check" key={index}>
              <div className="team-member">
                <img src={member.image} alt={`Team Member ${index + 1}`} />
              </div>
              <p id="pid" style={{ color: "black" }}><strong>{member.name}</strong></p>
              <p id="pid">{member.id}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-content">
        <div className="footer-main">
          <div className="footer-section branding">
            <div className="footer-logo-container">
              <img src="Logo.png" alt="Ann Daan Logo" className="footer-logo" />
              <h3>Ann Daan</h3>
            </div>
            <p>Fighting hunger, reducing waste, building community.</p>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#one">Home</a></li>
              <li><a href="#about-us">About Us</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#contribute">Contribute</a></li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <address>
              <p><i className="fa-solid fa-location-dot" aria-hidden="true"></i> IIITL, Chakganjaraia,<br />C.G. City Lucknow, 226002</p>
              <p><i className="fa-solid fa-phone" aria-hidden="true"></i> +91123467899</p>
              <p><i className="fa-solid fa-envelope" aria-hidden="true"></i> <a href="mailto:annadaan@gmail.com">annadaan@gmail.com</a></p>
            </address>
          </div>
          <div className="footer-section newsletter">
            <h3>Join Our Newsletter</h3>
            <form className="newsletter-form">
              <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
              <input type="email" id="newsletter-email" placeholder="Your email address" required />
              <button type="submit" className="btn-subscribe">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="donate-banner">
        <p>Help us make a difference today</p>
        <a href="#contribute" className="btn-donate">DONATE NOW</a>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Ann Daan. All rights reserved.</p>
          <ul className="footer-policies">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default App;