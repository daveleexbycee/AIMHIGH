
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
  <svg id='Tiktok_1_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' {...props}>
    <g transform="matrix(0.83 0 0 0.83 12 12)" >
      <path style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: 'currentColor', fillRule: 'nonzero', opacity: 1 }} transform="translate(-12, -12)" d="M 12 0 C 5.372583002030479 0 0 5.372583002030479 0 12 C 0 18.627416997969522 5.372583002030479 24 12 24 C 18.627416997969522 24 24 18.627416997969522 24 12 C 24 5.372583002030479 18.627416997969522 0 12 0 Z M 19.06 10.35 C 17.26343468656882 10.338935518489722 15.55424895387316 9.57324934099761 14.35 8.240000000000002 L 14.349999999999998 15.24 C 14.354044194198266 17.146831136041353 13.207974459736734 18.867966076703674 11.447063053035114 19.59954816685596 C 9.686151646333494 20.331130257008244 7.657873913266213 19.92879860555526 6.309537653855477 18.58046234614453 C 4.961201394444741 17.232126086733796 4.558869742991751 15.203848353666515 5.290451833144033 13.442936946964894 C 6.0220339232963145 11.682025540263272 7.743168863958637 10.535955805801734 9.649999999999988 10.54 C 9.807562187339338 10.546767086061736 9.964540578514713 10.563466914910181 10.120000000000001 10.59 L 10.12 13 C 9.965340129790556 12.968037264289967 9.807922847950373 12.951290744945267 9.649999999999997 12.95 C 8.692756416230237 12.945978150546246 7.827903769566197 13.520584804208745 7.460664454978295 14.404590878714126 C 7.0934251403903925 15.288596953219507 7.296553400422157 16.30687089320397 7.9748745017432965 16.982305521753528 C 8.653195603064436 17.657740150303088 9.67232649906871 17.856524263563017 10.554758490372299 17.485518556510705 C 11.437190481675888 17.114512849458393 12.008103856518051 16.247217729386023 12 15.29 L 12 4 L 14.82 4 L 14.97 4.57 C 15.438634394789155 6.446643411362506 17.125729474972907 7.762495075368902 19.060000000000006 7.759999999999999 Z" strokeLinecap="round" />
    </g>
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
