import { Mail } from "lucide";
import { icon } from "../utils/icon";

export function renderFooter(): string{
    return `
    <!-- ===== FOOTER ===== -->
    <footer class="bg-ink text-white rounded-2xl mt-8 px-6 py-10 flex flex-col items-center gap-6 text-center">
      <p class="font-semibold">"Don't miss a thing — subscribe!"</p>
      <form class="flex w-full max-w-md" onsubmit="return false">
        <span class="flex items-center gap-2 flex-1 bg-white text-ink rounded-l-full px-4 py-2 text-sm">
          ${icon(Mail, "w-4 h-4")}
          <input type="email" placeholder="Your email" aria-label="Your email" class="flex-1 bg-transparent outline-none" />
        </span>
        <button class="bg-(image:--color-gradient) px-5 py-2 rounded-r-full text-sm font-semibold">Subscribe</button>
      </form>
      <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
        <a href="#" class="hover:text-white">About us</a>
        <a href="#" class="hover:text-white">Features</a>
        <a href="#" class="hover:text-white">Help center</a>
        <a href="#" class="hover:text-white">Contact</a>
        <a href="#" class="hover:text-white">FAQs</a>
      </nav>
      <div class="flex gap-4 text-white/80">
        <a href="#" aria-label="Facebook" class="hover:text-white"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" aria-label="LinkedIn" class="hover:text-white"><i class="fa-brands fa-linkedin-in"></i></a>
        <a href="#" aria-label="YouTube" class="hover:text-white"><i class="fa-brands fa-youtube"></i></a>
      </div>
      <p class="text-xs text-white/60">© 2026 ITAlumni · Privacy · Terms of use</p>
    </footer>
    `
}