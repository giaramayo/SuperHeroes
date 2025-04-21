export interface SuperHero {
  id: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
  };
  biography: {
    fullName: string;
    placeOfBirth: string;
    publisher: string;
  };
  images: {
    sm: string;
    md: string;
    lg: string;
  };
}
