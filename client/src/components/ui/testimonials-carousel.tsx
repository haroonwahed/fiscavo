import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Marco van der Berg",
    role: "ZZP'er Webdesign",
    content: "Dankzij Fiscavo bespaar ik €3.200 per jaar. De AI-assistent helpt me uitgaven te categoriseren die ik anders zou vergeten af te trekken.",
    rating: 5,
    avatar: "MB"
  },
  {
    id: 2,
    name: "Lisa Hendriksen",
    role: "Freelance Consultant",
    content: "Eindelijk een tool die begrijpt hoe Nederlandse belastingen werken. Mijn BTW-aangiften zijn nu in 10 minuten klaar in plaats van uren.",
    rating: 5,
    avatar: "LH"
  },
  {
    id: 3,
    name: "Tom Jansen",
    role: "BV Eigenaar",
    content: "De kilometerregistratie en automatische uitgaven tracking bespaart me 5 uur per maand. Mijn boekhouder is ook onder de indruk.",
    rating: 5,
    avatar: "TJ"
  },
  {
    id: 4,
    name: "Sarah de Wit",
    role: "ZZP'er Marketing",
    content: "Ik had geen idee hoeveel ik kon aftrekken. Fiscavo toonde me €1.800 aan gemiste aftrekposten in mijn eerste maand.",
    rating: 5,
    avatar: "SW"
  }
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Wat klanten zeggen</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTestimonial}
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTestimonial}
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-lg leading-relaxed mb-6">
            "{currentTestimonial.content}"
          </blockquote>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-semibold">
            {currentTestimonial.avatar}
          </div>
          <div>
            <div className="font-semibold">{currentTestimonial.name}</div>
            <div className="text-blue-100 text-sm">{currentTestimonial.role}</div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}