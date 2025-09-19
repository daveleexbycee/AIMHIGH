
import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  import { CartItem } from '@/hooks/use-cart';
  import * as React from 'react';
  
  const baseUrl = 'https://aimhigh.store';
  
  export interface OrderConfirmationEmailProps {
    orderId: string;
    email: string;
    name: string;
    total: number;
    shippingAddress: string;
    items: CartItem[];
    date: string;
  }
  
  export const OrderConfirmationEmail: React.FC<Readonly<OrderConfirmationEmailProps>> = ({
    orderId,
    name,
    email,
    shippingAddress,
    date,
    items,
    total,
  }) => (
    <Html>
      <Head />
      <Preview>Your Aimhigh Furniture Order Confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={track.container}>
            <Row>
              <Column>
                <Text style={global.paragraphWithBold}>Tracking Number</Text>
                <Text style={track.number}>{orderId}</Text>
              </Column>
              <Column align="right">
                <Link href={`${baseUrl}/track-order?id=${orderId}`} style={global.button}>
                  Track Order
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={message}>
            <Img
              src={`https://i.postimg.cc/zX8sZ7Vn/aimhigh-logo.png`}
              width="120"
              height="26"
              alt="Aimhigh"
              style={{ margin: 'auto' }}
            />
            <Heading style={global.heading}>Your order is confirmed.</Heading>
            <Text style={global.text}>
              We've received it and we're getting it ready for shipment. We'll
              notify you once it's on its way.
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
              While you wait, you can arrange payment for your order by
              replying to the WhatsApp chat we've redirected you to, or by
              contacting us with your order ID.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>Shipping to: {name}</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              {shippingAddress}
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={{ ...global.defaultPadding, paddingTop: '40px' }}>
            <Text style={global.heading}>Order Summary</Text>
            {items.map((item) => (
              <Row key={item.id} style={{ ...itemSection, borderBottom: '1px solid rgb(238,238,238)' }}>
                <Column>
                  <Img
                    src={item.image}
                    alt={item.name}
                    style={{ float: 'left', borderRadius: '4px' }}
                    width="60"
                    height="60"
                  />
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemDetails}>Qty: {item.quantity}</Text>
                </Column>
                <Column align="right">
                  <Text style={itemPrice}>₦{(item.price * item.quantity).toLocaleString()}</Text>
                </Column>
              </Row>
            ))}
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row>
              <Column style={global.text} align="right">
                <Text>Subtotal</Text>
                <Text>Shipping</Text>
                <Text style={global.paragraphWithBold}>Total</Text>
              </Column>
              <Column style={global.text} align="right">
                <Text>₦{items.reduce((acc, i) => acc + i.price * i.quantity, 0).toLocaleString()}</Text>
                <Text>Calculated at checkout</Text>
                <Text style={global.paragraphWithBold}>₦{total.toLocaleString()}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row>
              <Column align="center" style={global.buttonContainer}>
                <Button href={`${baseUrl}/shop`} style={global.button}>Continue Shopping</Button>
              </Column>
            </Row>
          </Section>
          <Section style={footer.container}>
             <Row style={{ marginBottom: '20px' }}>
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
            <Text style={footer.text}>
              © 2015 Aimhigh Furnitures, Port Harcourt, Nigeria. If you have any
              questions, contact us at support@aimhigh.store
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  const main = {
    backgroundColor: '#ffffff',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '660px',
  };
  
  const global = {
    text: {
      color: '#444',
      fontSize: '15px',
      lineHeight: '24px',
    },
    heading: {
        fontSize: '32px',
        lineHeight: '1.3',
        fontWeight: '700',
        color: '#484848',
        textAlign: 'center' as const,
    },
    button: {
      border: '1px solid #999',
      fontSize: '14px',
      textDecoration: 'none',
      padding: '10px 20px',
      color: '#484848',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonContainer: {
      padding: '12px 0 0',
    },
    hr: {
      borderColor: '#E5E5E5',
      margin: '0 0 26px',
    },
    paragraphWithBold: {
      color: '#484848',
      fontSize: '15px',
      lineHeight: '1.4',
      fontWeight: 'bold',
    },
  };
  
  const track = {
    container: {
      padding: '22px 40px',
      backgroundColor: '#F7F7F7',
    },
    number: {
      margin: '12px 0 0 0',
      fontWeight: 500,
      lineHeight: '1.4',
      color: '#6F6F6F',
    },
  };
  
  const message = {
    padding: '40px 74px',
    textAlign: 'center',
  } as React.CSSProperties;
  
  const adressTitle = {
    ...global.text,
    fontSize: '15px',
    fontWeight: 'bold',
  };
  
  const itemSection = {
      padding: '10px 0',
  }
  
  const itemName = {
      ...global.text,
      fontWeight: 'bold',
      paddingLeft: '70px',
      paddingTop: '10px',
      display: 'block'
  }
  
  const itemDetails = {
      ...global.text,
      fontSize: '12px',
      color: '#6F6F6F',
      paddingLeft: '70px',
      display: 'block'
  }
  
  const itemPrice = {
      ...global.text,
      fontWeight: 'bold'
  }
  
  const footer = {
    container: {
      padding: '40px 40px 0 40px',
    },
    text: {
      ...global.text,
      color: '#A8A8A8',
      textAlign: 'center' as const,
      fontSize: '12px',
    },
  };
  

    
