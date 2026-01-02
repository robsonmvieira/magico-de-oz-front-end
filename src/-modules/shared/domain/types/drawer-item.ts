/**
 * Interface base para itens que podem ser exibidos em um drawer
 * Módulos específicos (Assets, VSL, etc) devem estender esta interface
 */
export interface DrawerItem {
	id: string
	title: string
	created_at: string
	is_favorite?: boolean
}

/**
 * Configuração de preview de arquivo para o drawer
 */
export interface FilePreviewConfig {
	url: string | null
	type: 'pdf' | 'video' | 'image' | 'other'
	loading?: boolean
	error?: boolean
}
