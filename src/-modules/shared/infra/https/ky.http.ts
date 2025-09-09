import ky from 'ky'

export const http = ky.create({
	prefixUrl: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

