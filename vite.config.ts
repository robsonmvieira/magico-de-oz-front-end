import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
		css: true
	},
	plugins: [
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true,
			routesDirectory: './src/pages',
			semicolons: false,
			quoteStyle: 'single'
		}),
		react(),
		tailwindcss()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@modules': path.resolve(__dirname, './src/modules'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@types': path.resolve(__dirname, './src/types'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@contexts': path.resolve(__dirname, './src/contexts'),
			'@ui': path.resolve(__dirname, './src/components/ui')
		}
	},
	server: {
		port: 3000,
		host: true,
		hmr: {
			overlay: true
		},
		watch: {
			usePolling: false,
			ignored: ['**/node_modules/**', '**/.git/**']
		}
	},
	optimizeDeps: {
		include: ['react', 'react-dom']
	}
})
