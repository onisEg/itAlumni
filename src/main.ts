import './style.css'

import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 <h1 class="text-3xl font-display">Tailwind works ✅</h1>
 
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
