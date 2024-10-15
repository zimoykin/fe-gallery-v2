import { IProfile } from "../interfaces/profile.interface";

export const MockUsers: IProfile[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@me.com",
    location: {
      distance: 25,
      lat: 46.227638,
      long: 12.567381,
      title: "Regensburg, Germany",
    },
    website: "https://github.com/zimoykin",
    url: "/avatar.jpg",
    privateAccess: false,
    userId: "1",
  },
  {
    id: "2",
    name: "Alessandra Bohne",
    email: "jane.bohne@me.com",
    location: {
      distance: 25,
      lat: 46.227638,
      long: 12.567381,
      title: "Regensburg, Germany",
    },
    website: "https://github.com/zimoykin",
    url: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue02&eyeType=Happy&eyebrowType=AngryNatural&mouthType=Default&skinColor=Brown",
    privateAccess: false,
    userId: "2",
  },
  {
    id: "3",
    name: "Alberta De Nou",
    email: "albert.nou@me.com",
    location: {
      distance: 25,
      lat: 46.227638,
      long: 12.567381,
      title: "Regensburg, Germany",
    },
    website: "https://github.com/zimoykin",
    url: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Sunglasses&hairColor=BrownDark&facialHairType=Blank&facialHairColor=Brown&clotheType=ShirtScoopNeck&clotheColor=Blue02&eyeType=Default&eyebrowType=Angry&mouthType=Sad&skinColor=Yellow",
    privateAccess: false,
    userId: "3",
  },
  {
    id: "4",
    name: "Freddy Kowalski",
    email: "fred.kowalski@me.com",
    location: {
      distance: 25,
      lat: 46.227638,
      long: 12.567381,
      title: "Regensburg, Germany",
    },
    website: "https://github.com/zimoykin",
    url: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=Black&facialHairType=MoustacheFancy&facialHairColor=Red&clotheType=CollarSweater&clotheColor=PastelYellow&eyeType=Cry&eyebrowType=Angry&mouthType=Serious&skinColor=Tanned",
    privateAccess: false,
    userId: "4",
  },
  {
    id: "5",
    name: "Mary Smith",
    email: "mary.smith@me.com",
    location: {
      distance: 25,
      lat: 46.227638,
      long: 12.567381,
      title: "Regensburg, Germany",
    },
    website: "https://avatar.iran.liara.run/public/24",
    url: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
    privateAccess: false,
    userId: "5",
  },
  {
    id: "6",
    name: "Marty Brodkowski",
    email: "marty.smith@me.com",
    location: {
      distance: 25,
      lat: 46.227638,
      long: 12.567381,
      title: "Regensburg, Germany",
    },
    website: "https://github.com/zimoykin",
    url: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Blank&hairColor=SilverGray&facialHairType=Blank&facialHairColor=Blonde&clotheType=Hoodie&clotheColor=Heather&graphicType=Hola&eyeType=Squint&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Light",
    privateAccess: false,
    userId: "6",
  },
];
