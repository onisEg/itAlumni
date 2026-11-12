import { User } from "lucide";
import logoUrl from "../assets/Logo.svg"
import { icon } from "../utils/icon";

export function renderHeader(): string {
    return `
    <header class="sticky top-0 z-10 bg-white border-b border-border">
      <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span class="text-xl font-bold text-primary"><img src="${logoUrl}" alt="ITAlumni"/></span>
        <nav class="hidden md:flex gap-6 text-sm font-medium">
          <button data-route="home" class="nav-link">Home</button>
          <button data-route="alumni" class="nav-link">Networking</button>
          <button data-route="jobs" class="nav-link">Job Opportunities</button>
          <button data-route="events" class="nav-link">Events</button>
        </nav>
        <button data-route="profile" class="nav-link hidden md:flex items-center gap-2 text-sm font-medium">
          ${icon(User, "w-5 h-5")}<span>Account</span>
        </button>
      </div>
    </header>
  `;
}