import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../components/products/ProductCard';

// Wrapper for Hero section to contain background elements
const HeroWrapper = styled.div`
  position: relative;
  overflow: hidden; /* Restore overflow hidden */
  padding: 4rem 0; /* Keep or adjust padding */
  margin: -2rem 0; /* Keep or adjust margin */
  border-radius: 16px; /* Optional */

  /* Add these background properties */
  background-color: #EDF2F7; /* Example: Very Light Gray */
  background-image:
    repeating-linear-gradient(
      -30deg, /* Angle 1 */
      rgba(154, 230, 180, 0.3), /* Mint Green, HIGHER opacity */
      rgba(154, 230, 180, 0.3) 15px,
      transparent 15px,
      transparent 30px
    ),
    repeating-linear-gradient(
      30deg, /* Angle 2 */
      rgba(154, 230, 180, 0.3),
      rgba(154, 230, 180, 0.3) 15px,
      transparent 15px,
      transparent 30px
    );

  /* Remove the entire &::before block */
  /* Remove the entire &::after block */
`;

const HeroSection = styled.section`
  text-align: center;
  /* Remove margin: 2rem 0; as wrapper handles spacing */
  max-width: 70%; /* Limit width */
  margin: auto; /* Center the section horizontally */
  padding: 3rem;
  background: rgba(255, 255, 255, 0.2); /* Increased opacity further */
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2); /* Softened shadow - Kept */
  backdrop-filter: blur(18px); /* Increased blur further */
  -webkit-backdrop-filter: blur(18px); /* Increased blur further */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Increased border opacity */
  position: relative; /* Ensure it stays above pseudo-elements */
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2D3748; /* Charcoal */
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  color: #4A5568; /* Slightly lighter Charcoal for body text */
  margin-bottom: 1.5rem;
`;

const ShopButton = styled(Link)`
  background-color: #ED64A6; /* Accent Pink */
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: none; 
  
  &:hover {
    background-color: #D53F8C; /* Darker Pink */
    color: white;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin: 2rem 0;
  text-align: center;
  color: #2D3748; 
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem; 
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 1.2rem;
  color: #4A5568;
`;

const ErrorMessage = styled.div`
  color: #C53030; 
  background-color: #FED7D7; 
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  margin: 1rem 0;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #4A5568;
`;

// New Styled Components for Promo Banner
const PromoBannerContainer = styled.section`
  background-color: #ED64A6; /* Accent Pink */
  color: white;
  padding: 2rem 1.5rem;
  margin: 2rem 0;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const PromoBannerTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: white; /* Ensure title color is white */
`;

const PromoBannerText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const PromoBannerButton = styled(Link)`
  background-color: white;
  color: #ED64A6; /* Accent Pink */
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  border: 1px solid transparent;

  &:hover {
    background-color: #FFF5F7; /* Lighter pink background on hover */
    color: #D53F8C; /* Darker Pink text on hover */
  }
`;

// New Styled Components for Newsletter Signup
const NewsletterSection = styled.section`
  background-color: #E2E8F0; /* Light Gray background */
  padding: 3rem 1.5rem; /* Increased padding */
  margin: 4rem 0 1rem; /* Increased top margin */
  border-radius: 8px;
  text-align: center;
`;

const NewsletterTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.25rem; /* Increased bottom margin */
  color: #2D3748; /* Charcoal */
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 400px;
  margin: 1.5rem auto 0; /* Added top margin, kept auto horizontal */

  @media (min-width: 500px) {
    flex-direction: row; /* Row layout on larger screens */
  }
`;

const NewsletterInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #CBD5E0; /* Medium Gray border */
  border-radius: 4px;
  font-size: 1rem;
  flex-grow: 1; /* Allow input to take available space */
  width: 100%; /* Full width on small screens */
  transition: border-color 0.2s, box-shadow 0.2s; /* Added transition */

  &:focus {
    outline: none;
    border-color: #9AE6B4; /* Mint Green focus */
    box-shadow: 0 0 0 2px rgba(154, 230, 180, 0.3);
  }
`;

const NewsletterButton = styled.button`
  background-color: #9AE6B4; /* Mint Green */
  color: #2D3748; /* Charcoal */
  font-weight: 600; /* Increased font weight */
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%; /* Full width on small screens */

  @media (min-width: 500px) {
    width: auto; /* Auto width on larger screens */
  }

  &:hover {
    background-color: #68D391; /* Darker Mint Green */
  }

  &:disabled {
    background-color: #A0AEC0; /* Gray out when disabled */
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p`
  margin-top: 1rem;
  font-weight: 600; /* Increased font weight */
  color: ${props => props.type === 'success' ? '#38A169' : '#C53030'}; /* Green for success, Red for error */
`;

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Newsletter Signup
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null); // null | 'SUCCESS' | 'ERROR'
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during "submission"

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Localhost Development  
        // const response = await fetch('http://localhost:8000/api/products/featured/');
        // PythonAnywhere Production
        const response = await fetch('http://syncwivan.pythonanywhere.com/api/products/featured/'); 
       if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (!data || !Array.isArray(data.results)) {
          throw new Error('Invalid API response format');
        }
        
        const validatedProducts = data.results.map(product => ({
          ...product,
          price: typeof product.price === 'number' ? product.price : 0
        }));
        
        setFeaturedProducts(validatedProducts);
      } catch (e) {
        console.error("Error fetching featured products:", e);
        setError('Failed to load featured products.');
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Handle Newsletter Submission
  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setNewsletterStatus(null); // Reset status

    // Basic validation
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterStatus('ERROR');
      setError('Please enter a valid email address.'); // You might want a different error state/message area
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    console.log("Submitting newsletter email:", newsletterEmail);
    // Replace with actual API call to your backend or a service like ConvertKit
    // const SUBSCRIBE_URL = `https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe`;
    // const API_KEY = 'YOUR_CONVERTKIT_PUBLIC_API_KEY';
    try {
      // const payload = JSON.stringify({ email: newsletterEmail, api_key: API_KEY });
      // const response = await fetch(SUBSCRIBE_URL, { /* ... fetch options ... */ });
      // const json = await response.json();
      // if (response.ok && json?.subscription?.id) {
      //   setNewsletterStatus('SUCCESS');
      //   setNewsletterEmail(''); // Clear input on success
      // } else {
      //   setNewsletterStatus('ERROR');
      //   console.error("Newsletter subscription failed:", json);
      // }

      // --- Mock Success ---
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setNewsletterStatus('SUCCESS');
      setNewsletterEmail(''); // Clear input
      // --- End Mock Success ---

      // --- To Mock Error ---
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // throw new Error("Simulated network error");
      // --- End Mock Error ---

    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setNewsletterStatus('ERROR');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Wrap HeroSection with the new HeroWrapper */}
      <HeroWrapper>
        <HeroSection>
          <HeroTitle>Shop Sustainably, Live Beautifully.</HeroTitle>
          <HeroText>Discover curated, eco-friendly products that align with your values and lifestyle.</HeroText>
          <ShopButton to="/products">Shop Now</ShopButton>
        </HeroSection>
      </HeroWrapper>

      {/* Promotional Banner Section */}
      <PromoBannerContainer>
        <PromoBannerTitle>🎉 Summer Sale Happening Now! 🎉</PromoBannerTitle>
        <PromoBannerText>Get up to 30% off on selected summer items. Don't miss out!</PromoBannerText>
        <PromoBannerButton to="/products?category=summer-specials">Shop the Sale</PromoBannerButton>
      </PromoBannerContainer>

      {/* Featured Products Section */}
      <section>
        <SectionTitle>Featured Products</SectionTitle>
        {loading && <LoadingSpinner>Loading featured products...</LoadingSpinner>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && (
          <ProductsGrid>
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <EmptyMessage>No featured products available right now.</EmptyMessage>
            )}
          </ProductsGrid>
        )}
      </section>

      {/* Newsletter Signup Section */}
      <NewsletterSection>
        <NewsletterTitle>Stay Updated!</NewsletterTitle>
        <p>Subscribe to our newsletter for the latest deals and product updates.</p>

        {newsletterStatus === null && (
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <NewsletterButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </NewsletterButton>
          </NewsletterForm>
        )}

        {newsletterStatus === 'SUCCESS' && (
          <StatusMessage type="success">
            Thanks for subscribing! Please check your inbox to confirm. 📬
          </StatusMessage>
        )}
        {newsletterStatus === 'ERROR' && (
          <StatusMessage type="error">
            Oops! Something went wrong. Please try again later.
          </StatusMessage>
        )}
      </NewsletterSection>

    </div>
  );
};

export default HomePage;