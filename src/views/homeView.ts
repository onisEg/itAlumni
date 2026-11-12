
import { renderFooter } from "../components/footer";
import testimonials from "../components/testimonials";
import { icon } from "../utils/icon";
import { GraduationCap, MessagesSquare, UserPlus, Play } from "lucide";
import heroImg from "../assets/heroImg.jpg"

// Home / landing view (static content — no data fetch)
export function renderHomeView(container: HTMLElement): void {
  const features = [
    { icon: GraduationCap, title: "Share & stay in touch", text: "Post your milestones and keep in contact with your classmates — a network to stay close." },
    { icon: MessagesSquare, title: "Join the discussion", text: "Exchange knowledge, points of view and opinions on the topics that interest you." },
    { icon: UserPlus, title: "Grow your network", text: "Connect with fellow graduates, make new friends and build memories that last." },
  ];



  container.innerHTML = `
    <!-- ===== HERO ===== -->
    <section class="text-center py-10 flex flex-col items-center gap-6">
      <h1 class="text-4xl md:text-5xl font-bold text-ink">Welcome, Alumni</h1>
      <p class="text-slate max-w-md">Connecting and empowering our global community of graduates.</p>
      <div class="flex flex-wrap justify-center gap-3">
        <button class="bg-(image:--color-gradient) text-white font-semibold px-6 py-2.5 rounded-full">Join us</button>
        <button class="border border-primary text-primary font-semibold px-6 py-2.5 rounded-full hover:bg-primary hover:text-white transition">See what we do</button>
      </div>
      <!-- Hero image + play overlay. Replace the src with your own image in public/ -->
      <div class="relative w-full max-w-3xl mt-4">
        <img src="${heroImg}" alt="Alumni community" class="w-full rounded-2xl object-cover" />        
        <button class="absolute inset-0 m-auto w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-ink shadow-lg" aria-label="Play video">
          ${icon(Play, "w-6 h-6")}
        </button>
      </div>
    </section>

    <!-- ===== FEATURES ===== -->
    <section class="py-10">
      <h2 class="text-2xl font-bold text-ink text-center mb-8">What you gain by joining?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${features.map((f) => `
          <div class="flex flex-col items-center text-center gap-3 px-2">
            <span class="text-primary">${icon(f.icon, "w-8 h-8")}</span>
            <p class="text-sm text-muted">${f.text}</p>
            <button class="bg-(image:--color-gradient) text-white text-sm font-semibold px-5 py-2 rounded-full">Sign up</button>
          </div>`).join("")}
      </div>
    </section>
    ${testimonials()}   
    ${renderFooter()}
  `;
}