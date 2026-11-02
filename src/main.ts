import './style.css'

import { renderAlumniView } from './views/alumniView.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

   <header class="border-b border-border">
    <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
      <h1 class="text-xl font-bold text-primary">ITAlumni</h1>
      <nav class="text-sm"><a href="#" class="text-primary font-semibold">Networking</a></nav>
    </div>
  </header>
  <main class="max-w-5xl mx-auto px-4 py-6">
    <h2 class="text-lg font-semibold text-ink mb-4">Alumni Network</h2>
    <div id="alumni-view"></div>
  </main>
`

renderAlumniView(document.querySelector<HTMLButtonElement>('#alumni-view')!)    
