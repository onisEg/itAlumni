import { BriefcaseBusiness, Home, User, Users } from "lucide";
import { icon } from "../utils/icon";

export function renderBottomNav(): string{
    return `
    <!-- Mobile bottom tab bar (hidden on desktop) -->
        <nav class="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-border-light flex justify-around py-4 z-10">
          <button data-route="home" class="tab flex flex-col items-center gap-1 text-xs">
            ${icon(Home, "w-6 h-6")}<span>Home</span>
          </button>
          <button data-route="alumni" class="tab flex flex-col items-center gap-1 text-xs">
            ${icon(Users, "w-6 h-6")}<span>Network</span>
          </button>
          <button data-route="jobs" class="tab flex flex-col items-center gap-1 text-xs">
            ${icon(BriefcaseBusiness, "w-6 h-6")}<span>Jobs</span>
          </button>
          <button data-route="events" class="tab flex flex-col items-center gap-1 text-xs">
            ${icon(Users, "w-6 h-6")}<span>Events</span>
          </button>
          <button data-route="profile" class="tab flex flex-col items-center gap-1 text-xs">
            ${icon(User, "w-6 h-6")}<span>Profile</span>
          </button>      
        </nav>
    `
}