import { neon } from "@neondatabase/serverless";
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

if (!process.env.NEON_URL) {
  console.error("Missing NEON_URL in .env.local");
  process.exit(1);
}

const sql = neon(process.env.NEON_URL);

const works = [
  { title: "InkLearn-Hub",    content: "Student management system written in Electron-vite plus Django.", image: "/assets/inkdrop.jpg", link: "https://github.com/saihanhtet/InkLearn-Hub" },
  { title: "Dlentron",         content: "Tutorial project for others to write both Django and Electron.",  image: "/assets/work1.jpg",   link: "https://github.com/saihanhtet/Dlentron" },
  { title: "Offline Speech Recognition", content: "Speech to text offline package written in Python.",    image: "/assets/work2.jpg",   link: "https://github.com/saihanhtet/offlineSpeechRecognition" },
  { title: "MathMasters",      content: "Math Quiz application for children below 12.",                   image: "/assets/work3.jpg",   link: "https://github.com/saihanhtet/MathMasters" },
  { title: "Deep Learning Classifier", content: "Written in Python to classify gender based on name.",    image: "/assets/work4.jpg",   link: "https://github.com/saihanhtet/Classifier-with-deep-learning" },
];

const education = [
  { title: "Software Engineering",                                                    subtitle: "Lithan Academy / Educlaas",          start_year: "2024", end_year: "Present", ord: 4 },
  { title: "International Level 3 Foundation Diploma in Information Technology",      subtitle: "Pearson BTEC",                       start_year: "2023", end_year: "2024",    ord: 3 },
  { title: "ITPEC Fundamental Information Technology Engineer",                       subtitle: "ITPEC FE Exam",                      start_year: "2022", end_year: "2023",    ord: 2 },
  { title: "High School / IGCSE",                                                     subtitle: "Light English Class For All",         start_year: "2021", end_year: "2022",    ord: 1 },
];

const experience: { title: string; company: string; start_year: string; end_year: string; description: string; ord: number }[] = [
  // Add experience here
];

const skills = [
  { name: "Python",     percent: 100, icon: "Python",     ord: 6 },
  { name: "HTML / CSS", percent: 100, icon: "HtmlFive",   ord: 5 },
  { name: "SQL",        percent: 85,  icon: "Database",   ord: 4 },
  { name: "JavaScript", percent: 75,  icon: "JavaScript", ord: 3 },
  { name: "React",      percent: 70,  icon: "React",      ord: 2 },
  { name: "Java",       percent: 60,  icon: "Java",       ord: 1 },
];

const settings = {
  name:        "S. Han Htet San",
  role:        "Junior Software Developer",
  bio:         "Building cool things with code — from desktop apps to web platforms. Passionate about learning and creating software that makes a difference.",
  profile_pic: "/assets/MyProfile.jpg",
  email:       "sai.hanhtetsan@gmail.com",
  phone:       "+66 84 205 4515",
  github:      "https://github.com/saihanhtet",
  instagram:   "https://www.instagram.com/hanhtet.ivan/",
  facebook:    "https://www.facebook.com/hanhtet.ivan",
  discord:     "https://discordapp.com/users/1019565322681974806",
  tools:       JSON.stringify(["Django", "Electron", "Next.js", "Git", "Node.js", "TypeScript", "Neon", "Linux"]),
};

async function seed() {
  // Works
  await sql`TRUNCATE works RESTART IDENTITY`;
  for (const w of works) {
    await sql`INSERT INTO works (title, content, image, link) VALUES (${w.title}, ${w.content}, ${w.image}, ${w.link})`;
  }
  console.log(`✓ Seeded ${works.length} works`);

  // Education
  await sql`TRUNCATE education RESTART IDENTITY`;
  for (const e of education) {
    await sql`INSERT INTO education (title, subtitle, start_year, end_year, ord) VALUES (${e.title}, ${e.subtitle}, ${e.start_year}, ${e.end_year}, ${e.ord})`;
  }
  console.log(`✓ Seeded ${education.length} education items`);

  // Experience
  await sql`TRUNCATE experience RESTART IDENTITY`;
  for (const e of experience) {
    await sql`INSERT INTO experience (title, company, start_year, end_year, description, ord) VALUES (${e.title}, ${e.company}, ${e.start_year}, ${e.end_year}, ${e.description}, ${e.ord})`;
  }
  console.log(`✓ Seeded ${experience.length} experience items`);

  // Skills
  await sql`TRUNCATE skills RESTART IDENTITY`;
  for (const s of skills) {
    await sql`INSERT INTO skills (name, percent, icon, ord) VALUES (${s.name}, ${s.percent}, ${s.icon}, ${s.ord})`;
  }
  console.log(`✓ Seeded ${skills.length} skills`);

  // Settings (upsert)
  await sql`
    INSERT INTO settings (id, name, role, bio, profile_pic, email, phone, github, instagram, facebook, discord, tools)
    VALUES ('main', ${settings.name}, ${settings.role}, ${settings.bio}, ${settings.profile_pic},
            ${settings.email}, ${settings.phone}, ${settings.github}, ${settings.instagram},
            ${settings.facebook}, ${settings.discord}, ${settings.tools}::jsonb)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name, role = EXCLUDED.role, bio = EXCLUDED.bio,
      profile_pic = EXCLUDED.profile_pic, email = EXCLUDED.email, phone = EXCLUDED.phone,
      github = EXCLUDED.github, instagram = EXCLUDED.instagram, facebook = EXCLUDED.facebook,
      discord = EXCLUDED.discord, tools = EXCLUDED.tools
  `;
  console.log("✓ Seeded settings");
}

seed().catch((e) => { console.error(e); process.exit(1); });
