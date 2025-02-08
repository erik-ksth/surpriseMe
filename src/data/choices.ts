import whiteTexture from "../assets/outfits/whiteTexture.jpg";
import blackTexture from "../assets/outfits/blackTexture.jpg";
import yardHouse from "../assets/dinner/yardHouse.jpg";
import beakjeong from "../assets/dinner/beakjeong.jpg";
import romance from "../assets/movie/romance.webp";
import action from "../assets/movie/action.jpeg";

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
        title: "White Classy",
        imageUrl: whiteTexture,
      },
      {
        id: 2,
        title: "Black Classy",
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
        title: "Adventure Time",
        imageUrl: "/images/hiking.jpg",
      },
      {
        id: 4,
        title: "Urban Explorer",
        imageUrl: "/images/gallery.jpg",
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
        title: "Yard House",
        imageUrl: yardHouse,
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
        title: "Action",
        imageUrl: action,
      },
    ],
  },
];
