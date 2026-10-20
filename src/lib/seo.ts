import { personal, experiences, projects, skills, openSource } from "@/data/portfolio";

export const siteUrl = personal.siteUrl;

export const seoTitle = `${personal.fullName} — Software Engineer (Spring Boot, Node.js, Flutter)`;

export const seoDescription =
  "Returaj Proshad Shornocar is a Software Engineer in Dhaka, Bangladesh building Java/Spring Boot and Node.js backends, PostgreSQL data layers and cross-platform Flutter apps. Creator of the open-source rj_form_engine package and CodeHorse (50K+ Play Store downloads).";

export const seoKeywords = [
  "Returaj Proshad Shornocar",
  "Returaj Proshad",
  "Software Engineer",
  "Software Engineer Bangladesh",
  "Software Engineer Dhaka",
  "Backend Engineer",
  "Java Developer",
  "Spring Boot Developer",
  "Node.js Developer",
  "Flutter Developer",
  "Full-Stack Developer",
  "PostgreSQL",
  "System Design",
  "Clean Architecture",
  "rj_form_engine",
  "Open Source",
];

const current = experiences.find((e) => e.current) ?? experiences[0];

/** schema.org structured data so search engines understand who this page is about. */
export function buildJsonLd(imageUrl: string) {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: personal.fullName,
    alternateName: personal.name,
    jobTitle: personal.role,
    description: seoDescription,
    url: siteUrl,
    image: imageUrl,
    email: `mailto:${personal.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    worksFor: {
      "@type": "Organization",
      name: current.company,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: personal.university,
    },
    knowsAbout: Array.from(
      new Set([
        ...skills.Languages,
        ...skills["Backend & APIs"],
        ...skills.Databases,
        ...skills["Architecture & Systems"],
        "Flutter",
      ]),
    ),
    knowsLanguage: personal.languages,
    sameAs: [personal.linkedin, personal.github, personal.codeforces, personal.leetcode],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${personal.fullName} — Portfolio`,
    inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#person` },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    url: siteUrl,
    name: seoTitle,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { "@id": `${siteUrl}/#person` },
    about: { "@id": `${siteUrl}/#person` },
  };

  const software = {
    "@type": "SoftwareSourceCode",
    name: openSource.name,
    description: openSource.tagline,
    codeRepository: openSource.github,
    url: openSource.pubdev,
    programmingLanguage: "Dart",
    license: "https://opensource.org/licenses/MIT",
    author: { "@id": `${siteUrl}/#person` },
  };

  const apps = projects
    .filter((p) => "playstore" in p.links && p.links.playstore)
    .map((p) => ({
      "@type": "MobileApplication",
      name: p.title,
      description: p.description,
      operatingSystem: "Android",
      applicationCategory: p.id === "amar-babu" ? "HealthApplication" : "EducationalApplication",
      installUrl: p.links.playstore,
      author: { "@id": `${siteUrl}/#person` },
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, software, ...apps],
  };
}
