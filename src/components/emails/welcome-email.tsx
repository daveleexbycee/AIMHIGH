
import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Row,
    Column,
    Link,
  } from '@react-email/components';
  import { Product, Review } from '@/hooks/use-cart';
  import * as React from 'react';
  
  interface WelcomeEmailProps {
    name: string;
    products: Product[];
    reviews: Review[];
  }
  
  const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:9002';
  
  export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({ name, products, reviews }) => (
    <Html>
      <Head />
      <Preview>Welcome to Aimhigh - Where Style Meets Comfort.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
             <Img
              src="https://i.postimg.cc/zX8sZ7Vn/aimhigh-logo.png"
              width="120"
              height="26"
              alt="Aimhigh"
              style={{ margin: 'auto' }}
            />
          </Section>
          <Section style={heroSection}>
            <Img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop"
              width="600"
              height="400"
              alt="Stylish armchair in a room"
              style={heroImage}
            />
            <Text style={heroTextAbove}>WELCOME TO THE FAMILY</Text>
            <Text style={heroTitle}>Aimhigh Furnitures</Text>
            <Text style={heroSubtitle}>
              New Member Offer • Get <span style={{color: '#E5C100'}}>20% OFF</span> your first order
            </Text>
            <Button style={button} href={`${baseUrl}/shop`}>
              Shop Now
            </Button>
          </Section>
  
          <Section style={{ padding: '40px 20px' }}>
            <Text style={exploreTitle}>Explore Our Collections</Text>
  
            <Row style={{ marginBottom: '20px' }}>
              {products.slice(0, 3).map((product) => (
                 <Column key={product.id} align="center" style={{ width: '32%', padding: '0 10px' }}>
                    <Link href={`${baseUrl}/product/${product.id}`}>
                        <Img
                        src={product.image}
                        alt={product.name}
                        style={featureImage}
                        />
                        <Text style={productTitle}>{product.name}</Text>
                        <Text style={productPrice}>₦{product.price.toLocaleString()}</Text>
                    </Link>
                </Column>
              ))}
            </Row>
          </Section>
  
          <Section style={{ padding: '20px', backgroundColor: '#111111' }}>
            <Text style={testimonialTitle}>Hear from our customers</Text>
            {reviews.slice(0,2).map((review, index) => (
                <React.Fragment key={review.id}>
                    <Text style={testimonialText}>"{review.comment}"</Text>
                    <Text style={testimonialRating}>★★★★★</Text>
                    {index < reviews.length - 1 && <Hr style={{borderColor: '#333333'}}/>}
                </React.Fragment>
            ))}
          </Section>
  
          <Section style={footer}>
            <Text style={footerText}>Follow us on</Text>
            <Row>
                <Column align="center" style={{ width: '33%' }}>
                    <Link href="https://www.instagram.com/aimhigh_furnitures_ahf?utm_source=qr&igsh=cjNsMW5tcmJ3NmVp">
                        <Img src="https://i.postimg.cc/pT3gVf2k/instagram-icon.png" width="24" height="24" alt="Instagram"/>
                    </Link>
                </Column>
                <Column align="center" style={{ width: '33%' }}>
                     <Link href="https://www.tiktok.com/@osivwi8?_t=ZS-8zNGnQyVhJ3&_r=1">
                        <Img src="https://i.postimg.cc/mD3px1dD/tiktok-icon.png" width="24" height="24" alt="TikTok"/>
                    </Link>
                </Column>
                <Column align="center" style={{ width: '33%' }}>
                    <Link href="https://wa.me/2348136523066">
                        <Img src="https://i.postimg.cc/L8gP44s5/whatsapp-icon.png" width="24" height="24" alt="WhatsApp"/>
                    </Link>
                </Column>
            </Row>
            <Text style={footerLinks}>
              © 2015 Aimhigh Furnitures, Port Harcourt, Nigeria <br />
              If you have any questions, contact us at support@aimhigh.store
            </Text>
            <Text style={footerLinks}>
              You received this email because you signed up on our website.
              <Link href={`${baseUrl}/unsubscribe`} style={unsubscribeLink}> Unsubscribe</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  

  const main = {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    width: '600px',
    maxWidth: '100%',
  };

  const header = {
    padding: '20px 0',
    textAlign: 'center' as const,
  };
  
  const headerText = {
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '2px',
  };

  const heroSection = {
      position: 'relative' as const,
      textAlign: 'center' as const,
      padding: '40px 20px',
      backgroundColor: '#1a1a1a',
  };
  
  const heroImage = {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      opacity: 0.15,
  }

  const heroTextAbove = {
    fontSize: '14px',
    letterSpacing: '1px',
    color: '#999999',
    margin: '0 0 10px 0',
  }
  
  const heroTitle = {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '0',
    lineHeight: '1.2',
  };
  
  const heroSubtitle = {
    fontSize: '16px',
    color: '#aaaaaa',
    margin: '10px 0 20px 0',
  };
  
  const button = {
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '12px 30px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  };
  
  const exploreTitle = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    marginBottom: '30px',
  };
  
  const featureImage = {
    width: '100%',
    borderRadius: '5px',
    height: '150px',
    objectFit: 'cover' as const,
  };

  const productTitle = {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
    textAlign: 'center' as const
  }

  const productPrice = {
    color: '#E5C100',
    fontSize: '14px',
    textAlign: 'center' as const
  }
  
  const testimonialTitle = {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    marginBottom: '20px'
  }
  
  const testimonialText = {
    color: '#aaaaaa',
    fontSize: '14px',
    lineHeight: '1.6',
    textAlign: 'center' as const,
    fontStyle: 'italic',
    padding: '0 20px'
  }

  const testimonialRating = {
      textAlign: 'center' as const,
      color: '#E5C100',
      fontSize: '20px',
      marginBottom: '20px'
  }
  
  const footer = {
    padding: '40px 20px',
    textAlign: 'center' as const,
  };

  const footerText = {
      fontSize: '14px',
      color: '#999999',
      marginBottom: '20px',
  }
  
  const footerLinks = {
    color: '#666666',
    fontSize: '12px',
    lineHeight: '1.5',
    marginTop: '20px',
  };

  const unsubscribeLink = {
      color: '#888888',
      textDecoration: 'underline'
  }
  

    