import { defineShikiSetup } from '@slidev/types'

// Code panels are dark in both colour schemes, so both use the dark theme.
export default defineShikiSetup(() => ({
  themes: { dark: 'vitesse-dark', light: 'vitesse-dark' },
}))
