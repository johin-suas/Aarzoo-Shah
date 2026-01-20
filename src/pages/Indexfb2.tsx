import { Suspense, lazy, useState } from "react";
import Hero from "@/components/fb2/Hero";
import img1 from "@/assets/working.avif"
import img2 from "@/assets/img4.jpg"
import img3 from "@/assets/img5.jpg"
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import LoveFromInstagram from "@/components/fb2/LoveFromInstagram";
const LearningSection = lazy(() => import("@/components/fb2/LearningSection"));
const DayOneSection  = lazy(() => import("@/components/fb2/DayOneSection"));
const DayTwoSection  = lazy(() => import("@/components/fb2/DayTwoSection"));
const ComparisonSection = lazy(() => import("@/components/fb2/ComparisonSection"));
const AboutAarzoo    = lazy(() => import("@/components/fb2/AboutAarzoo"));
const WhyWorkshopSection = lazy(() => import("@/components/fb2/WhyWorkshopSection"));
const PainPointsSection  = lazy(() => import("@/components/fb2/PainPointsSection"));
const AudienceFitSection = lazy(() => import("@/components/fb2/AudienceFitSection"));
const TestimonialsSection = lazy(() => import("@/components/fb2/TestimonialsSection"));
const FAQ            = lazy(() => import("@/components/fb2/FAQ"));
const Footer         = lazy(() => import("@/components/fb2/Footer"));
const StickyFooter   = lazy(() => import("@/components/fb2/StickyFooter"));

const Fallback = <div style={{ height: 1 }} />;

export default function Indexfb2() {
  
  useFacebookPixel();

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main>
      <Hero />
      <Suspense fallback={Fallback}><TestimonialsSection /></Suspense>
      <Suspense fallback={Fallback}><LoveFromInstagram /></Suspense>
      <Suspense fallback={Fallback}><DayOneSection /></Suspense>
      <Suspense fallback={Fallback}><DayTwoSection /></Suspense>
      <Suspense fallback={Fallback}><ComparisonSection /></Suspense>
      <Suspense fallback={Fallback}><AboutAarzoo /></Suspense>
      <Suspense fallback={Fallback}><WhyWorkshopSection /></Suspense>
      <Suspense fallback={Fallback}><PainPointsSection /></Suspense>
      <Suspense fallback={Fallback}>
        <AudienceFitSection cards={[
          { image: img1, caption: "Working professionals with savings or ongoing plans." },
          { image: img2, caption: "Entrepreneurs seeking structured financial planning." },
          { image: img3, caption: "Individuals wanting jargon-free understanding." },
        ]}/>
      </Suspense>
      <Suspense fallback={Fallback}><LearningSection /></Suspense>
      <Suspense fallback={Fallback}><FAQ  /></Suspense>
      <Suspense fallback={Fallback}><Footer /></Suspense>
      <Suspense fallback={Fallback}><StickyFooter  /></Suspense>
      {/* RegisterPopup… keep as is */}
    </main>
  );
}

