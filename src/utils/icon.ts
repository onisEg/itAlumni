
import { createElement, type IconNode } from "lucide";
export function icon(node: IconNode, classes = "w-5 h-5"): string {
    const el = createElement(node);     
    el.setAttribute("class", classes);  
    return el.outerHTML;               
}