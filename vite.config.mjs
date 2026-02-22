import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    projects: [
      {
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
          environment:
            './prisma/vitest-environment-prisma/prisma-test-environment.ts',
          // MUDANÇA AQUI: Remova o server.deps.inline e use poolOptions
          poolOptions: {
            forks: {
              execArgv: ['--no-warnings'],
            },
          },
          deps: {
            optimizer: {
              web: { enabled: false },
              ssr: { enabled: false },
            },
          },
        },
      },
    ],
  },
})
