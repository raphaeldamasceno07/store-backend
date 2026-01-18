import path from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const isE2E = process.env.VITEST_PROJECT === 'e2e'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    reporters: ['default'],
    include: isE2E
      ? ['src/http/controllers/**/*.{test,spec}.ts']
      : ['src/use-cases/**/*.{test,spec}.ts'],
    environment: 'node',
    ...(isE2E && { setupFiles: ['./src/test/setup-e2e.ts'] }),
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
