/// <reference types="vite/client" />

// CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// Regular CSS/SCSS
declare module '*.css' {
  const css: string
  export default css
}

declare module '*.scss' {
  const css: string
  export default css
}

declare module '*.sass' {
  const css: string
  export default css
}

