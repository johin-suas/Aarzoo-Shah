import { Suspense, lazy, useState } from "react";
import Hero from "@/components/Free-FB/Hero";
import img1 from "@/assets/working.avif"
import img2 from "@/assets/img4.jpg"
import img3 from "@/assets/img5.jpg"
import { useFacebookFreePixel } from "@/hooks/useFreePixel";
import LoveFromInstagram from "@/components/Free-FB/LoveFromInstagram";
const LearningSection = lazy(() => import("@/components/Free-FB/LearningSection"));
const DayOneSection  = lazy(() => import("@/components/Free-FB/DayOneSection"));
const DayTwoSection  = lazy(() => import("@/components/Free-FB/DayTwoSection"));
const ComparisonSection = lazy(() => import("@/components/Free-FB/ComparisonSection"));
const AboutAarzoo    = lazy(() => import("@/components/Free-FB/AboutAarzoo"));
const WhyMasterclassSection = lazy(() => import("@/components/Free-FB/WhyWorkshopSection"));
const PainPointsSection  = lazy(() => import("@/components/Free-FB/PainPointsSection"));
const AudienceFitSection = lazy(() => import("@/components/Free-FB/AudienceFitSection"));
const TestimonialsSection = lazy(() => import("@/components/Free-FB/TestimonialsSection"));
const FAQ            = lazy(() => import("@/components/Free-FB/FAQ"));
const Footer         = lazy(() => import("@/components/Free-FB/Footer"));
const StickyFooter   = lazy(() => import("@/components/Free-FB/StickyFooter"));

const Fallback = <div style={{ height: 1 }} />;

export default function FbFree() {
  
  useFacebookFreePixel();

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
      <Suspense fallback={Fallback}><WhyMasterclassSection /></Suspense>
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

