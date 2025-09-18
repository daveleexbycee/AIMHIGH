
import * as React from 'react';

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({ name }) => (
  <div>
    <h1>Welcome to Aimhigh Furniture, {name}!</h1>
    <p>We are so excited to have you on board.</p>
    <p>
      At Aimhigh, we believe in providing modern furniture for modern living. 
      Feel free to browse our collection and find the perfect pieces for your home.
    </p>
    <a href="https://www.aimhigh.store/shop">Start Shopping</a>
    <br />
    <p>Best, </p>
    <p>The Aimhigh Team</p>
  </div>
);
