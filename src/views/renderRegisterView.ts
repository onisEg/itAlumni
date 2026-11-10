export function renderRegisterView(container: HTMLElement): void {
  container.innerHTML = `
   <div class="fixed inset-0 z-20 overflow-y-auto bg-slate-50 md:bg-cover md:bg-center md:[background-image:var(--img)] flex items-center justify-center px-4 py-8"   style="--img:url('https://picsum.photos/seed/campus/1600/1000')">
      <!-- Register Card -->
      <button data-route="home" class="nav-link absolute top-5 left-5 text-sm text-slate hover:text-primary">← Back</button>
      <section class="w-full max-w-[720px] bg-white rounded-2xl shadow-sm sm:shadow-xl px-5 py-8 sm:px-12 sm:py-10">

        <!-- Header -->
        <header class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl font-semibold text-ink mb-3">
            Create an account
          </h1>

          <p class="text-slate text-sm sm:text-base">
            Join us to connect and share opportunities!
          </p>
        </header>

        <!-- Form -->
        <form id="register-form" class="flex flex-col gap-5">

          <!-- First Name -->
          <div class="relative">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              required
              class="w-full bg-gray-100 rounded-lg py-3 px-4 pl-12 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-ink">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
          </div>

          <!-- Last Name -->
          <div class="relative">
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              required
              class="w-full bg-gray-100 rounded-lg py-3 px-4 pl-12 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-ink">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
          </div>

          <!-- Email -->
          <div class="relative">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              class="w-full bg-gray-100 rounded-lg py-3 px-4 pl-12 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-ink">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="m3 7 9 6 9-6"/>
              </svg>
            </span>
          </div>

          <!-- Password -->
          <div class="relative">
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              minlength="8"
              class="w-full bg-gray-100 rounded-lg py-3 px-4 pl-12 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-ink">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="11" width="16" height="11" rx="2"/>
                <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
              </svg>
            </span>
          </div>

          <!-- Terms -->
          <label class="flex items-start gap-2 text-xs sm:text-sm text-ink cursor-pointer">
            <input
              type="checkbox"
              name="terms"
              required
              class="accent-primary w-4 h-4 mt-0.5 shrink-0"
            />
            <span>
              I accept the
              <a href="#terms" class="text-primary hover:underline font-medium">Terms and Conditions</a>
            </span>
          </label>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full bg-(image:--color-gradient) text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
          >
            Create account
          </button>

        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-7">
          <div class="h-px bg-gray-200 flex-1"></div>
          <span class="text-slate text-xs">OR</span>
          <div class="h-px bg-gray-200 flex-1"></div>
        </div>

        <!-- Social Login -->
        <div class="flex flex-col gap-3">
          <button type="button" disabled class="w-full bg-pink-50 text-pink-600 py-3 rounded-lg text-sm font-medium opacity-60 cursor-not-allowed flex items-center justify-center gap-2">
              <i class="fa-brands fa-apple"></i> Continue with Apple
          </button>
          <button type="button" class="w-full bg-red-50 text-red-600 py-3 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center justify-center gap-2">
              <i class="fa-brands fa-google"></i> Continue with Google
          </button>
          <button type="button" class="w-full bg-blue-50 text-blue-600 py-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition flex items-center justify-center gap-2">
              <i class="fa-brands fa-facebook-f"></i> Continue with Facebook
          </button>
        </div>

        <!-- Login Link -->
        <footer class="text-center mt-9 text-sm">
          <span class="text-slate">Already registered?</span>
          <a href="#login" class="text-primary font-semibold ml-2 hover:underline">
            Sign in
          </a>
        </footer>

      </section>
    </div>
  `;
}
