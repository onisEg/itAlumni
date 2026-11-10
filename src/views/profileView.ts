
export function renderProfileView(container: HTMLElement): void {
    container.querySelector("#create-account")?.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("navigate", {
            detail: "register"
        }));
    });
    const userData = localStorage.getItem("user");
    if (!userData) {
        container.innerHTML = `
            <section class="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12 gap-5">
                <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl">
                    👤
                </div>
                <div class="space-y-2">
                    <h1 class="text-3xl font-bold text-ink">
                    Welcome, Alumni!
                    </h1>

                    <p class="text-slate max-w-sm leading-relaxed">
                    Join our community to connect with alumni, discover opportunities
                    and stay updated.
                    </p>
                </div>

                <button  data-route="register" class="bg-(image:--color-gradient) text-white font-semibold px-8 py-3 rounded-full">
                    Create an account
                </button>

                <p class="text-sm text-slate">
                    Already a member?
                    <a href="#login" class="text-primary font-semibold">Log in</a>
                </p>

            </section>`;

       
        container
            .querySelector('[data-route="create-account"]')
            ?.addEventListener("click", () => {
                window.dispatchEvent(new CustomEvent("navigate", { detail: "register" }));
            });
        return;
    }

 
}