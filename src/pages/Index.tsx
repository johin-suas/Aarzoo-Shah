import { Suspense, lazy, useState } from "react";
import Hero from "@/components/Hero";
import img1 from "@/assets/working.avif"
import img2 from "@/assets/img4.jpg"
import img3 from "@/assets/img5.jpg"
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
const LearningSection = lazy(() => import("@/components/LearningSection"));
const DayOneSection  = lazy(() => import("@/components/DayOneSection"));
const DayTwoSection  = lazy(() => import("@/components/DayTwoSection"));
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));
const AboutAarzoo    = lazy(() => import("@/components/AboutAarzoo"));
const WhyMasterclassSection = lazy(() => import("@/components/WhyWorkshopSection"));
const PainPointsSection  = lazy(() => import("@/components/PainPointsSection"));
const AudienceFitSection = lazy(() => import("@/components/AudienceFitSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQ            = lazy(() => import("@/components/FAQ"));
const Footer         = lazy(() => import("@/components/Footer"));
const StickyFooter   = lazy(() => import("@/components/StickyFooter"));

const Fallback = <div style={{ height: 1 }} />;

export default function Index() {
  
  useFacebookPixel();

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main>
     <Hero />
      <Suspense fallback={Fallback}><LearningSection /></Suspense>
      <Suspense fallback={Fallback}><DayOneSection /></Suspense>
      <Suspense fallback={Fallback}><DayTwoSection /></Suspense>
      <Suspense fallback={Fallback}><ComparisonSection /></Suspense>
      <Suspense fallback={Fallback}><AboutAarzoo /></Suspense>
      <Suspense fallback={Fallback}><WhyMasterclassSection /></Suspense>
      <Suspense fallback={Fallback}><PainPointsSection /></Suspense>
      <Suspense fallback={Fallback}>
        <AudienceFitSection cards={[
          { image: img1, caption: "Working professionals with savings or ongoing plans." },
          { image: img2, caption: "Entrepreneurs seeking structured financial planning." },
          { image: img3, caption: "Individuals wanting jargon-free understanding." },
        ]}/>
      </Suspense>
      <Suspense fallback={Fallback}><TestimonialsSection /></Suspense>
      <Suspense fallback={Fallback}><FAQ onCTAClick={() => setIsFormOpen(true)} /></Suspense>
      <Suspense fallback={Fallback}><Footer /></Suspense>
      <Suspense fallback={Fallback}><StickyFooter onCTAClick={() => setIsFormOpen(true)} /></Suspense>
      {/* RegisterPopup… keep as is */}
    </main>
  );
}
