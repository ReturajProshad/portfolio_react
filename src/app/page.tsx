import Desktop from "@/components/os/Desktop";
import SeoContent from "@/components/SeoContent";
import profilePic from "@/assets/Returaj_Proshad.png";
import { buildJsonLd, siteUrl } from "@/lib/seo";

export default function Home() {
  const jsonLd = buildJsonLd(new URL(profilePic.src, siteUrl).toString());

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe here: all values come from our own data file.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SeoContent />
      <Desktop />
    </>
  );
}
