import { ChevronLeft, ChevronRight } from "lucide";
import { icon } from "../utils/icon";

const testimonials = (): string => {
    const stars = `<span class="text-star text-sm">★★★★★</span>`;
    const testimonials = [
        { name: "Mikel", avatar: "https://i.pravatar.cc/80?img=12", quote: "Thanks to ITAlumni I landed my dream job in tech through their mentoring program." },
        { name: "Emma", avatar: "https://i.pravatar.cc/80?img=5", quote: "This community was key — it revolutionized my career and showed me new paths." },
        { name: "Laia", avatar: "https://i.pravatar.cc/80?img=9", quote: "ITAlumni gave me the tools and the confidence to start my own business." },
    ];
    return `
    <section class="py-10">
      <h2 class="text-xl font-bold text-ink text-center mb-8">"See what our super-users think!"</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${testimonials.map((t) => `
          <figure class="border border-border rounded-2xl p-5 flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <figcaption class="font-semibold text-ink">${t.name}</figcaption>
                ${stars}
              </div>
            </div>
            <blockquote class="text-sm text-slate">"${t.quote}"</blockquote>
          </figure>`).join("")}
      </div>
      <!-- Carousel arrows (decorative for now) -->
      <div class="flex justify-center gap-3 mt-6 text-muted">
        <button class="w-8 h-8 rounded-full border border-border flex items-center justify-center" aria-label="Previous">${icon(ChevronLeft, "w-4 h-4")}</button>
        <button class="w-8 h-8 rounded-full border border-border flex items-center justify-center" aria-label="Next">${icon(ChevronRight, "w-4 h-4")}</button>
      </div>
    </section>
    `
}

export default testimonials;
