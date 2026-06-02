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
  { title: "InkLearn-Hub", content: "Student management system written in Electron-vite plus Django.", image: "/assets/inkdrop.jpg", link: "https://github.com/saihanhtet/InkLearn-Hub" },
  { title: "Dlentron", content: "Tutorial project for others to write both Django and Electron.", image: "/assets/work1.jpg", link: "https://github.com/saihanhtet/Dlentron" },
  { title: "Offline Speech Recognition", content: "Speech to text offline package written in Python.", image: "/assets/work2.jpg", link: "https://github.com/saihanhtet/offlineSpeechRecognition" },
  { title: "MathMasters", content: "Math Quiz application for children below 12.", image: "/assets/work3.jpg", link: "https://github.com/saihanhtet/MathMasters" },
  { title: "Deep Learning Classifier", content: "Written in Python to classify gender based on name.", image: "/assets/work4.jpg", link: "https://github.com/saihanhtet/Classifier-with-deep-learning" },
];

const education = [
  { title: "Software Engineering", subtitle: "Lithan Academy / Educlaas", start: "2024", end: "Present", order: 4 },
  { title: "International Level 3 Foundation Diploma in Information Technology", subtitle: "Pearson BTEC", start: "2023", end: "2024", order: 3 },
  { title: "ITPEC Fundamental Information Technology Engineer", subtitle: "ITPEC FE Exam", start: "2022", end: "2023", order: 2 },
  { title: "High School / IGCSE", subtitle: "Light English Class For All", start: "2021", end: "2022", order: 1 },
];

const experience: Array<{ title: string; company: string; start: string; end: string; description: string; order: number }> = [
  // Add your work experience here, e.g.:
  // { title: "Software Developer Intern", company: "Acme Corp", start: "2024", end: "Present", description: "Developed web apps using React and Node.js.", order: 1 },
];

const skills = [
  { name: "Python", percent: 100, icon: "Python", order: 6 },
  { name: "HTML / CSS", percent: 100, icon: "HtmlFive", order: 5 },
  { name: "SQL", percent: 85, icon: "Database", order: 4 },
  { name: "JavaScript", percent: 75, icon: "JavaScript", order: 3 },
  { name: "React", percent: 70, icon: "React", order: 2 },
  { name: "Java", percent: 60, icon: "Java", order: 1 },
];

const settings = {
  _id: "main",
  name: "S. Han Htet San",
  role: "Junior Software Developer",
  bio: "Building cool things with code — from desktop apps to web platforms. Passionate about learning and creating software that makes a difference.",
  profilePic: "/assets/MyProfile.jpg",
  email: "sai.hanhtetsan@gmail.com",
  phone: "+66 84 205 4515",
  github: "https://github.com/saihanhtet",
  instagram: "https://www.instagram.com/hanhtet.ivan/",
  facebook: "https://www.facebook.com/hanhtet.ivan",
  discord: "https://discordapp.com/users/1019565322681974806",
  tools: ["Django", "Electron", "Next.js", "Git", "Node.js", "TypeScript", "MongoDB", "Linux"],
};

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("portfolio");

    await db.collection("works").deleteMany({});
    await db.collection("works").insertMany(works);
    console.log(`✓ Seeded ${works.length} works`);

    await db.collection("education").deleteMany({});
    await db.collection("education").insertMany(education);
    console.log(`✓ Seeded ${education.length} education items`);

    if (experience.length > 0) {
      await db.collection("experience").deleteMany({});
      await db.collection("experience").insertMany(experience);
      console.log(`✓ Seeded ${experience.length} experience items`);
    } else {
      console.log("  Skipped experience (empty — add entries in seed.ts)");
    }

    await db.collection("skills").deleteMany({});
    await db.collection("skills").insertMany(skills);
    console.log(`✓ Seeded ${skills.length} skills`);

    await db.collection("settings").replaceOne({ _id: "main" as never }, settings, { upsert: true });
    console.log("✓ Seeded settings (with tools)");
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
