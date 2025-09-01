
export interface State {
    name: string;
    lgas: string[];
    shippingRate: number; // as a percentage, e.g., 0.2 for 20%
}
  
export const NIGERIA_STATES: State[] = [
    // Tier 1: Base Location
    { name: "Rivers", lgas: ["Port Harcourt", "Obio-Akpor", "Eleme", "Ikwerre", "Oyigbo", "Etche"], shippingRate: 0.20 },
    
    // Tier 2: Neighboring States (Previously 35%, now 40%)
    { name: "Abia", lgas: ["Aba North", "Aba South", "Umuahia North", "Osisioma Ngwa", "Obingwa"], shippingRate: 0.40 },
    { name: "Akwa Ibom", lgas: ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak"], shippingRate: 0.40 },
    { name: "Bayelsa", lgas: ["Yenagoa", "Sagbama", "Ogbia", "Nembe"], shippingRate: 0.40 },
    { name: "Delta", lgas: ["Warri South", "Asaba (Oshimili South)", "Uvwie", "Sapele", "Ughelli North"], shippingRate: 0.40 },
    { name: "Imo", lgas: ["Owerri Municipal", "Orlu", "Okigwe", "Nkwerre"], shippingRate: 0.40 },
    { name: "Anambra", lgas: ["Awka South", "Onitsha North", "Onitsha South", "Nnewi North"], shippingRate: 0.40 },
    { name: "Enugu", lgas: ["Enugu East", "Enugu North", "Nsukka", "Udi"], shippingRate: 0.40 },
    { name: "Edo", lgas: ["Benin City (Oredo)", "Egor", "Ikpoba-Okha"], shippingRate: 0.40 },

    // Tier 3: Mid-distance States (Previously 40%, now 45%)
    { name: "Lagos", lgas: ["Ikeja", "Lagos Island", "Lagos Mainland", "Lekki", "Surulere", "Apapa", "Victoria Island"], shippingRate: 0.45 },
    { name: "FCT - Abuja", lgas: ["Abuja Municipal Area Council (AMAC)", "Gwagwalada", "Kuje"], shippingRate: 0.45 },
    { name: "Oyo", lgas: ["Ibadan North", "Ibadan South-West", "Ogbomosho North", "Oyo East"], shippingRate: 0.45 },
    { name: "Ogun", lgas: ["Abeokuta South", "Ifo", "Ado-Odo/Ota", "Sagamu"], shippingRate: 0.45 },
    { name: "Ondo", lgas: ["Akure South", "Ondo West", "Owo"], shippingRate: 0.45 },
    
    // Tier 4: Far States (Previously 45%, now 50%)
    { name: "Kano", lgas: ["Kano Municipal", "Fagge", "Tarauni", "Nasarawa", "Gwale"], shippingRate: 0.50 },
    { name: "Kaduna", lgas: ["Kaduna North", "Kaduna South", "Zaria", "Chikun"], shippingRate: 0.50 },
    { name: "Plateau", lgas: ["Jos North", "Jos South", "Barkin Ladi"], shippingRate: 0.50 },
    { name: "Borno", lgas: ["Maiduguri"], shippingRate: 0.55 },
    { name: "Sokoto", lgas: ["Sokoto North", "Sokoto South"], shippingRate: 0.55 }
];
