import path from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    reporters: ['default'],
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/use-cases/**/*.{test,spec}.ts'],
          environment: 'node',
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
      },
      {
        test: {
          name: 'e2e',
          include: ['src/http/controllers/**/*.{test,spec}.ts'],
          environment: 'node',
          setupFiles: ['./src/test/setup-e2e.ts'],
        },
      },
    ],
  },
})
