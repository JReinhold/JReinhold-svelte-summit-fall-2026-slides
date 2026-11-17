import { defineShikiSetup } from '@slidev/types'

// One light and one dark theme, to match the deck's colour scheme.
export default defineShikiSetup(() => ({
  themes: { dark: 'vitesse-dark', light: 'github-light' },
}))
