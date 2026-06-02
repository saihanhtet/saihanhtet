import { MongoClient } from "mongodb";
import { readFileSync } from "fs";

for (const envFile of [".env.local", ".env"]) {
  try {
    const lines = readFileSync(envFile, "utf-8").split("\n");
    for (const line of lines) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) process.env[match[1].trim()] ??= match[2].trim();
    }
  } catch {}
}

if (!process.env.MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}

const uri = process.env.MONGODB_URI;

const works = [
  {
    title: "InkLearn-Hub",
    content: "Student management system written in Electron-vite plus Django.",
    image: "/assets/inkdrop.jpg",
    link: "https://github.com/saihanhtet/InkLearn-Hub",
  },
  {
    title: "Dlentron",
    content: "Tutorial project for others to write both Django and Electron.",
    image: "/assets/work1.jpg",
    link: "https://github.com/saihanhtet/Dlentron",
  },
  {
    title: "Offline Speech Recognition",
    content: "Speech to text offline package written in Python.",
    image: "/assets/work2.jpg",
    link: "https://github.com/saihanhtet/offlineSpeechRecognition",
  },
  {
    title: "MathMasters",
    content: "Math Quiz application for children below 12.",
    image: "/assets/work3.jpg",
    link: "https://github.com/saihanhtet/MathMasters",
  },
  {
    title: "Deep Learning Classifier",
    content: "Written in Python to classify gender based on name.",
    image: "/assets/work4.jpg",
    link: "https://github.com/saihanhtet/Classifier-with-deep-learning",
  },
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("portfolio");
    const collection = db.collection("works");
    await collection.deleteMany({});
    await collection.insertMany(works);
    console.log(`Seeded ${works.length} works`);
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
