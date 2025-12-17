import "@hotwired/turbo-rails"
import React from "react"
import { createRoot } from "react-dom/client"
import componentRegistry from "./componentRegistry"

const mountedRoots = new Map()

function mountComponents() {
  document.querySelectorAll("[data-react-class]").forEach((node) => {
    const componentName = node.dataset.reactClass
    const Component = componentRegistry[componentName]

    if (!Component) {
      console.warn(`React component "${componentName}" is not registered`)
      return
    }

    const props = node.dataset.reactProps ? JSON.parse(node.dataset.reactProps) : {}
    let root = mountedRoots.get(node)

    if (!root) {
      root = createRoot(node)
      mountedRoots.set(node, root)
    }

    root.render(<Component {...props} />)
  })
}

function cleanupRoots() {
  mountedRoots.forEach((root, node) => {
    root.unmount()
    mountedRoots.delete(node)
  })
}

document.addEventListener("turbo:load", mountComponents)
document.addEventListener("DOMContentLoaded", mountComponents)
document.addEventListener("turbo:before-cache", cleanupRoots)
