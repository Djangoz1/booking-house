import { IAccomodation, TAccomodation } from "@/interfaces/data";
import { icfy } from "./icon";

let commoditie = {
  voyager: { icon: icfy.person.friend, title: "voyageur(s)" },
  bedroom: { icon: icfy.commodities.bedroom, title: "chambre(s)" },
  bathroom: { icon: icfy.commodities.bathroom, title: "salle de bain" },
  pool: { icon: icfy.commodities.pool, title: "Accès piscine" },
  jacuzzi: { icon: icfy.commodities.jacuzzi, title: "Accès jacuzzi" },
  wifi: { icon: icfy.commodities.wifi, title: "Wifi" },
  fitness: { icon: icfy.commodities.fitness, title: "Accès Salle de sport" },
  tv: { icon: icfy.commodities.tv, title: "Télévision" },
};

let oliviers = {
  images: [
    {
      title: "Chambre principale",
      description: null,
      image: "/appartements/oliviers/_2.jpeg",
    },
    {
      title: "Terrasses",
      description: null,
      image: "/appartements/oliviers/_1.jpeg",
    },
    {
      title: "Terrasses",

      description: null,
      image: "/appartements/oliviers/_3.jpeg",
    },
    {
      title: "Chambre principale",
      description: null,
      image: "/appartements/oliviers/_4.jpg",
    },
    {
      title: "Terrasses",
      description: null,
      image: "/appartements/oliviers/_5.jpg",
    },
    {
      title: "Salon",
      description: null,
      image: "/appartements/oliviers/_6.jpg",
    },

    {
      title: "Salon",
      description: null,
      image: "/appartements/oliviers/_8.jpg",
    },

    {
      title: "Salle de bain",
      description: null,
      image: "/appartements/oliviers/_10.jpg",
    },
  ],
  title: "Les Oliviers",
  plans: [
    {
      name: "Formule complète",
      price: 100,
      arr: [
        {
          ...commoditie.bedroom,
          done: true,
          title: <>2 {commoditie.bedroom.title}</>,
        },
        {
          ...commoditie.voyager,
          done: true,
          title: <>6 {commoditie.voyager.title} max</>,
        },
        {
          ...commoditie.bedroom,
          done: true,
          title: "3 lits doubles",
        },
        { ...commoditie.tv, done: true, title: "Télévision" },
        { ...commoditie.wifi, done: true, title: "Wifi" },
        { ...commoditie.pool, done: true, title: "Accès piscine" },
        { ...commoditie.jacuzzi, done: true, title: "Accès sauna" },
        {
          ...commoditie.fitness,
          done: true,
          title: "Accès Salle de sport",
        },
      ],
    },
    {
      name: "Formule simple",

      price: 80,

      arr: [
        { ...commoditie.bedroom, done: true, title: "2 chambres" },
        {
          ...commoditie.voyager,
          done: true,
          title: <>6 {commoditie.voyager.title} max</>,
        },
        {
          ...commoditie.bedroom,
          done: true,
          title: "3 lits doubles",
        },
        { ...commoditie.tv, done: true, title: "Télévision" },
        { ...commoditie.wifi, done: true, title: "Wifi" },
        { ...commoditie.pool, done: true, title: "Accès piscine" },
      ],
    },
  ],
};
let lavandes = {
  images: [
    {
      title: "Chambre",
      description: null,
      image: "/appartements/lavandes/_1.jpeg",
    },
    {
      title: "Salon",
      description: null,
      image: "/appartements/lavandes/_2.webp",
    },
    {
      title: "Terrasses",

      description: null,
      image: "/appartements/lavandes/_3.jpg",
    },
    {
      title: "Chambre principale",
      description: null,
      image: "/appartements/lavandes/_4.jpg",
    },
    {
      title: "Salon",
      description: null,
      image: "/appartements/lavandes/_5.jpg",
    },
    {
      title: "Salon",
      description: null,
      image: "/appartements/lavandes/_6.jpg",
    },

    {
      title: "Terrasses",
      description: null,
      image: "/appartements/lavandes/_8.jpg",
    },

    {
      title: "Cuisine",
      description: null,
      image: "/appartements/lavandes/_9.jpg",
    },
  ],
  title: "Les Lavandes",
  plans: [
    {
      name: "Formule complète",
      price: 100,
      arr: [
        {
          ...commoditie.bedroom,
          done: true,
          title: <>1 {commoditie.bedroom.title}</>,
        },
        {
          ...commoditie.voyager,
          done: true,
          title: <>4 {commoditie.voyager.title} max</>,
        },
        {
          ...commoditie.bedroom,
          done: true,
          title: "2 lits doubles",
        },
        { ...commoditie.tv, done: true, title: "Télévision" },
        { ...commoditie.wifi, done: true, title: "Wifi" },
        { ...commoditie.pool, done: true, title: "Accès piscine" },
        { ...commoditie.jacuzzi, done: true, title: "Accès sauna" },
        {
          ...commoditie.fitness,
          done: true,
          title: "Accès Salle de sport",
        },
      ],
    },
    {
      name: "Formule simple",

      price: 60,

      arr: [
        { ...commoditie.bedroom, done: true, title: "1 chambre" },
        {
          ...commoditie.voyager,
          done: true,
          title: <>4 {commoditie.voyager.title} max</>,
        },
        {
          ...commoditie.bedroom,
          done: true,
          title: "2 lits doubles",
        },
        { ...commoditie.tv, done: true, title: "Télévision" },
        { ...commoditie.wifi, done: true, title: "Wifi" },
        { ...commoditie.pool, done: true, title: "Accès piscine" },
      ],
    },
  ],
};

let reception = {
  images: [
    {
      title: "Terrasses de salle de réception",
      description: null,
      image: "/terrasses/reception/_2.jpg",
    },
    {
      title: "Terrasses de salle de réception",
      description: null,
      image: "/terrasses/reception/_3.jpg",
    },
    {
      title: "Terrasses de salle de réception",
      description: null,
      image: "/terrasses/reception/_4.jpeg",
    },
    {
      title: "Terrasses de salle de réception",
      description: null,
      image: "/terrasses/reception/_5.jpeg",
    },
    {
      title: "Terrasses de salle de réception",
      description: null,
      image: "/terrasses/reception/_6.jpeg",
    },
    {
      title: "Terrasses de salle de réception",
      description: null,
      image: "/terrasses/reception/_7.jpeg",
    },
    {
      title: "Terrasses de salle de réception",
      description: null,
      image: "/terrasses/reception/_8.jpeg",
    },
    {
      title: "Terrasses de salle de réception",
      description: null,
      image: "/terrasses/reception/_9.jpeg",
    },
  ],
  title: "Salle de réception",
  plans: [
    {
      name: "Formule simple",
      price: 400,
      arr: [
        {
          icon: icfy.person.friend,
          title: <>50 invités max</>,
        },
        {
          ...commoditie.bedroom,
          done: true,
          title: <>3 appartements</>,
        },
        {
          ...commoditie.voyager,
          done: true,
          title: <>14 {commoditie.voyager.title} max</>,
        },

        { ...commoditie.tv, done: true, title: "Vidéo projecteur" },
        { ...commoditie.wifi, done: true, title: "Wifi" },
      ],
    },
    {
      name: "Formule Complète",
      price: 1000,
      arr: [
        {
          icon: icfy.person.friend,
          title: <>50 invités max</>,
        },
        {
          ...commoditie.bedroom,
          done: true,
          title: <>3 appartements</>,
        },
        {
          ...commoditie.voyager,
          done: true,
          title: <>14 {commoditie.voyager.title} max</>,
        },

        { ...commoditie.tv, done: true, title: "Vidéo projecteur" },
        { ...commoditie.wifi, done: true, title: "Wifi" },
        { ...commoditie.pool, done: true, title: "Accès piscine" },
        { ...commoditie.jacuzzi, done: true, title: "Accès sauna" },
        {
          ...commoditie.fitness,
          done: true,
          title: "Accès Salle de sport",
        },
      ],
    },
  ],
};
let spa = {
  images: [
    { title: "Jacuzzi", description: null, image: "/spa/_1.jpeg" },
    { title: "Sport", description: null, image: "/sport.png" },
    { title: "Salle de réception", description: null, image: "/image5.jpeg" },
    { title: "Salle de réception", description: null, image: "/image6.jpeg" },
    { title: "Salle de réception", description: null, image: "/image7.jpeg" },
    { title: "Salle de réception", description: null, image: "/image8.jpeg" },
    { title: "Salle de réception", description: null, image: "/image9.jpeg" },
  ],
  title: "Parcours spas",
  plans: [
    {
      name: "Sport & Relax",
      price: 30,
      arr: [
        {
          ...commoditie.fitness,

          title: "Accessoire de musculation",
        },
        {
          ...commoditie.jacuzzi,
          title: "Jacuzzi pour 6 personnes",
        },
        {
          ...commoditie.jacuzzi,
          title: "Sauna",
        },
        {
          ...commoditie.bathroom,

          title: "Salle de bain",
        },
      ],
    },
  ],
};

export const ITEMS: IAccomodation[] = [spa, oliviers, lavandes, reception];
