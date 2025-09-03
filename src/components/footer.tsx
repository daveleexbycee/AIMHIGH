
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Instagram } from 'lucide-react';
import { Button } from './ui/button';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg id='WhatsApp_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' {...props}>
        <g transform="matrix(0.5 0 0 0.5 12 12)" >
            <path style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: 'currentColor', fillRule: 'nonzero', opacity: 1 }} transform=" translate(-24, -24)" d="M 24 4 C 12.97 4 4 12.97 4 24 C 4 27.19 4.77 30.34 6.23 33.17 L 4.09 40.83 C 3.8499999999999996 41.699999999999996 4.1 42.629999999999995 4.7299999999999995 43.269999999999996 C 5.21 43.74 5.85 44 6.5 44 C 6.73 44 6.95 43.97 7.17 43.91 L 14.83 41.769999999999996 C 17.66 43.23 20.82 44 24 44 C 35.03 44 44 35.03 44 24 C 44 12.97 35.03 4 24 4 z M 34.36 31.37 C 33.92 32.6 31.759999999999998 33.79 30.79 33.88 C 29.82 33.970000000000006 28.91 34.32 24.45 32.56 C 19.07 30.44 15.67 24.930000000000003 15.41 24.57 C 15.14 24.22 13.25 21.71 13.25 19.1 C 13.25 16.5 14.620000000000001 15.220000000000002 15.1 14.690000000000001 C 15.59 14.160000000000002 16.16 14.030000000000001 16.509999999999998 14.030000000000001 C 16.869999999999997 14.030000000000001 17.22 14.030000000000001 17.529999999999998 14.040000000000001 C 17.9 14.06 18.319999999999997 14.08 18.72 14.96 C 19.189999999999998 16 20.22 18.62 20.349999999999998 18.89 C 20.479999999999997 19.150000000000002 20.569999999999997 19.46 20.389999999999997 19.810000000000002 C 20.219999999999995 20.160000000000004 20.129999999999995 20.380000000000003 19.859999999999996 20.69 C 19.599999999999994 21 19.309999999999995 21.380000000000003 19.069999999999997 21.62 C 18.809999999999995 21.880000000000003 18.529999999999998 22.17 18.839999999999996 22.700000000000003 C 19.149999999999995 23.230000000000004 20.209999999999997 24.96 21.779999999999998 26.360000000000003 C 23.799999999999997 28.160000000000004 25.499999999999996 28.720000000000002 26.029999999999998 28.990000000000002 C 26.56 29.250000000000004 26.869999999999997 29.21 27.179999999999996 28.85 C 27.489999999999995 28.5 28.499999999999996 27.310000000000002 28.859999999999996 26.78 C 29.209999999999997 26.25 29.559999999999995 26.34 30.049999999999997 26.52 C 30.529999999999998 26.69 33.129999999999995 27.97 33.66 28.24 C 34.19 28.5 34.54 28.63 34.669999999999995 28.849999999999998 C 34.8 29.07 34.8 30.13 34.36 31.37 z" strokeLinecap="round" /> </g>
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
