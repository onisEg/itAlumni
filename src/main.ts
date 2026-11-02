import './style.css'

import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
 
 </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
