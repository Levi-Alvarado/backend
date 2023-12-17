import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      all: true,
      directory: 'coverage',
      reporters: ['text', 'html']
    },
    root: 'tests'
  }
})
