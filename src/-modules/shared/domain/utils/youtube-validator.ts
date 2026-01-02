/**
 * Regex para validar se é uma URL do YouTube (qualquer página do YouTube)
 */
export const YOUTUBE_DOMAIN_REGEX = /^(https?:\/\/)?(www\.)?youtube\.com/

/**
 * Regex para validar URLs do YouTube com ID de vídeo
 * Suporta os seguintes formatos:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - https://youtube.com/v/VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - http:// (versões sem HTTPS)
 * - www. (versões sem www)
 */
export const YOUTUBE_VIDEO_URL_REGEX =
	/^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+([?&][\w=&-]*)?$/

/**
 * Valida se uma string é uma URL do YouTube (qualquer página)
 * @param url - URL para validar
 * @returns true se for uma URL do YouTube, false caso contrário
 */
export function isYouTubeDomain(url: string): boolean {
	if (!url || typeof url !== 'string') {
		return false
	}

	const trimmedUrl = url.trim()
	return YOUTUBE_DOMAIN_REGEX.test(trimmedUrl)
}

/**
 * Valida se uma string é uma URL válida do YouTube com ID de vídeo
 * @param url - URL para validar
 * @returns true se a URL for válida com ID de vídeo, false caso contrário
 */
export function isValidYouTubeVideoUrl(url: string): boolean {
	if (!url || typeof url !== 'string') {
		return false
	}

	const trimmedUrl = url.trim()
	return YOUTUBE_VIDEO_URL_REGEX.test(trimmedUrl)
}

/**
 * @deprecated Use isValidYouTubeVideoUrl() instead
 * Valida se uma string é uma URL válida do YouTube
 */
export function isValidYouTubeUrl(url: string): boolean {
	return isValidYouTubeVideoUrl(url)
}

/**
 * Extrai o ID do vídeo de uma URL do YouTube
 * @param url - URL do YouTube
 * @returns ID do vídeo ou null se não conseguir extrair
 */
export function extractYouTubeVideoId(url: string): string | null {
	if (!isValidYouTubeVideoUrl(url)) {
		return null
	}

	const trimmedUrl = url.trim()

	// Para youtu.be/VIDEO_ID
	const youtuBeMatch = trimmedUrl.match(/youtu\.be\/([\w-]+)/)
	if (youtuBeMatch) {
		return youtuBeMatch[1]
	}

	// Para youtube.com/watch?v=VIDEO_ID
	const watchMatch = trimmedUrl.match(/[?&]v=([\w-]+)/)
	if (watchMatch) {
		return watchMatch[1]
	}

	// Para youtube.com/embed/VIDEO_ID
	const embedMatch = trimmedUrl.match(/\/embed\/([\w-]+)/)
	if (embedMatch) {
		return embedMatch[1]
	}

	// Para youtube.com/v/VIDEO_ID
	const vMatch = trimmedUrl.match(/\/v\/([\w-]+)/)
	if (vMatch) {
		return vMatch[1]
	}

	return null
}

/**
 * Exemplos de URLs válidas para teste
 */
export const VALID_YOUTUBE_URLS = [
	'https://www.youtube.com/watch?v=m5QHYUt5Gd0',
	'https://youtube.com/watch?v=m5QHYUt5Gd0',
	'http://www.youtube.com/watch?v=m5QHYUt5Gd0',
	'https://www.youtube.com/embed/m5QHYUt5Gd0',
	'https://youtube.com/embed/m5QHYUt5Gd0',
	'https://www.youtube.com/v/m5QHYUt5Gd0',
	'https://youtu.be/m5QHYUt5Gd0',
	'https://youtu.be/m5QHYUt5Gd0?t=30',
	'https://www.youtube.com/watch?v=m5QHYUt5Gd0&t=30s',
	'https://www.youtube.com/watch?v=m5QHYUt5Gd0&list=PLrAXtmRdnEQy6nuLMOVa8s',
	'https://www.youtube.com/watch?v=_fnAO06RGVY&list=PLjflPnnP2Li9p1VoGd78ikOlLXb_kNYMu&index=1'
]

/**
 * Exemplos de URLs do YouTube sem ID de vídeo (válidas como domínio, inválidas como vídeo)
 */
export const YOUTUBE_DOMAIN_URLS_WITHOUT_VIDEO = [
	'https://www.youtube.com/',
	'https://www.youtube.com/?themeRefresh=1',
	'https://www.youtube.com/user/username',
	'https://www.youtube.com/channel/UC123456',
	'https://www.youtube.com/playlist?list=PL123456',
	'https://www.youtube.com/watch',
	'https://www.youtube.com/watch?v=',
	'https://youtu.be/'
]

/**
 * Exemplos de URLs completamente inválidas para teste
 */
export const INVALID_URLS = [
	'https://www.google.com',
	'https://vimeo.com/123456',
	'not-a-url',
	'',
	'https://www.facebook.com',
	'https://www.instagram.com'
]
