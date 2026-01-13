import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Mantenha o plugin aqui para o processo principal
  plugins: [tsconfigPaths()],
  test: {
    projects: [
      {
        // IMPORTANTE: Adicione os plugins em cada projeto
        plugins: [tsconfigPaths()],
        test: {
          name: 'unit',
          include: ['src/use-cases/**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      {
        plugins: [tsconfigPaths()],
        test: {
          name: 'e2e',
          include: ['src/http/controllers/**/*.{test,spec}.ts'],
          environment: 'node', // em vez de apontar para prisma-test-environment.ts
        },
      },
    ],
  },
})
