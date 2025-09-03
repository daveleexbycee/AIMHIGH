
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Instagram } from 'lucide-react';
import { Button } from './ui/button';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M11.97 8.16a2.5 2.5 0 0 1-2.5-2.5V3h3.5v5.16a2.5 2.5 0 0 1-1 2.34Z"/>
        <path d="M15.5 8.16a2.5 2.5 0 0 1-2.5-2.5V3h3.5v5.16a2.5 2.5 0 0 1-1 2.34Z" opacity="0"/>
        <path d="M11.97 8.16a2.5 2.5 0 0 1-2.5-2.5V3h3.5v5.16a2.5 2.5 0 0 1-1 2.34Z" transform="rotate(90 12 12)"/>
        <path d="M15.5 8.16a2.5 2.5 0 0 1-2.5-2.5V3h3.5v5.16a2.5 2.5 0 0 1-1 2.34Z" opacity="0" transform="rotate(90 12 12)"/>
        <path d="M11.97 8.16a2.5 2.5 0 0 1-2.5-2.5V3h3.5v5.16a2.5 2.5 0 0 1-1 2.34Z" transform="rotate(180 12 12)"/>
        <path d="M15.5 8.16a2.5 2.5 0 0 1-2.5-2.5V3h3.5v5.16a2.5 2.5 0 0 1-1 2.34Z" opacity="0" transform="rotate(180 12 12)"/>
        <path d="M11.97 8.16a2.5 2.5 0 0 1-2.5-2.5V3h3.5v5.16a2.5 2.5 0 0 1-1 2.34Z" transform="rotate(270 12 12)"/>
        <path d="M15.5 8.16a2.5 2.5 0 0 1-2.5-2.5V3h3.5v5.16a2.5 2.5 0 0 1-1 2.34Z" opacity="0" transform="rotate(270 12 12)"/>
        <path d="M16 8.1v7.8a2.1 2.1 0 0 1-2.1 2.1H8.1A2.1 2.1 0 0 1 6 15.9V12a6 6 0 0 1 6-6h4Z"/>
    </svg>
);


export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold text-lg font-headline">Aimhigh</span>
            </Link>
            <p className="text-sm">Modern furniture for modern living.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://wa.me/2348136523066" target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.instagram.com/aimhigh_furnitures_ahf?utm_source=qr&igsh=cjNsMW5tcmJ3NmVp" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></a>
              </Button>
               <Button variant="ghost" size="icon" asChild>
                <a href="https://www.tiktok.com/@osivwi8?_t=ZS-8zNGnQyVhJ3&_r=1" target="_blank" rel="noopener noreferrer"><TikTokIcon className="h-5 w-5" /></a>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-primary">All Products</Link></li>
              <li><Link href="/shop?tag=New" className="hover:text-primary">New Arrivals</Link></li>
              <li><Link href="/shop?tag=Hot" className="hover:text-primary">Best Sellers</Link></li>
              <li><Link href="/shop?tag=Sale" className="hover:text-primary">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link href="/press" className="hover:text-primary">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="/track-order" className="hover:text-primary">Track Order</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-muted mt-8 pt-6 text-center text-sm">
          <p>&copy; 2015 Aimhigh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
