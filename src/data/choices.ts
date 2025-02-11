import whiteTexture from "../assets/outfits/whiteTexture.jpg";
import blackTexture from "../assets/outfits/blackTexture.jpg";
import beakjeong from "../assets/dinner/beakjeong.jpg";
import dinTaiFung from "../assets/dinner/dinTaiFung.webp";
import romance from "../assets/movie/romance.webp";
import horror from "../assets/movie/horror.jpg";
import clawMeee from "../assets/activities/clawMeee.jpg";
import petroglyph from "../assets/activities/petroglyph.jpg";

export interface Choice {
  id: number;
  title: string;
  imageUrl: string;
}

export interface Category {
  id: number;
  name: string;
  emoji: string;
  choices: [Choice, Choice]; // Exactly two choices per category
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Outfit",
    emoji: "👗",
    choices: [
      {
        id: 1,
        title: "White",
        imageUrl: whiteTexture,
      },
      {
        id: 2,
        title: "Black",
        imageUrl: blackTexture,
      },
    ],
  },
  {
    id: 2,
    name: "Activities",
    emoji: "🎨",
    choices: [
      {
        id: 3,
        title: "Claw Meee",
        imageUrl: clawMeee,
      },
      {
        id: 4,
        title: "Petroglyph Ceramic Lounge",
        imageUrl: petroglyph,
      },
    ],
  },
  {
    id: 3,
    name: "Dinner",
    emoji: "🍽️",
    choices: [
      {
        id: 5,
        title: "Beakjeong",
        imageUrl: beakjeong,
      },
      {
        id: 6,
        title: "Din Tai Fung",
        imageUrl: dinTaiFung,
      },
    ],
  },
  {
    id: 4,
    name: "Movie",
    emoji: "🎬",
    choices: [
      {
        id: 7,
        title: "Romance",
        imageUrl: romance,
      },
      {
        id: 8,
        title: "Horror",
        imageUrl: horror,
      },
    ],
  },
];
