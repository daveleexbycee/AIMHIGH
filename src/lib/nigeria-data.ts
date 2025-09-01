
export interface State {
    name: string;
    lgas: string[];
    shippingRate: number; // as a percentage, e.g., 0.2 for 20%
}
  
export const NIGERIA_STATES: State[] = [
    { name: "Rivers", lgas: ["Port Harcourt", "Obio-Akpor", "Eleme", "Ikwerre"], shippingRate: 0.20 },
    { name: "Abia", lgas: ["Aba North", "Aba South", "Umuahia North"], shippingRate: 0.35 },
    { name: "Akwa Ibom", lgas: ["Uyo", "Eket", "Ikot Ekpene"], shippingRate: 0.35 },
    { name: "Bayelsa", lgas: ["Yenagoa", "Sagbama", "Ogbia"], shippingRate: 0.35 },
    { name: "Delta", lgas: ["Warri South", "Asaba", "Uvwie"], shippingRate: 0.35 },
    { name: "Imo", lgas: ["Owerri Municipal", "Orlu", "Okigwe"], shippingRate: 0.35 },
    { name: "Lagos", lgas: ["Ikeja", "Lagos Island", "Lagos Mainland", "Lekki"], shippingRate: 0.40 },
    { name: "FCT - Abuja", lgas: ["Abuja Municipal Area Council (AMAC)"], shippingRate: 0.40 },
    { name: "Kano", lgas: ["Kano Municipal", "Fagge", "Tarauni"], shippingRate: 0.45 },
    { name: "Oyo", lgas: ["Ibadan North", "Ibadan South-West", "Ogbomosho North"], shippingRate: 0.40 },
];
