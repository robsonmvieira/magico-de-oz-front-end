import { z } from 'zod'

export const languages = [
	{ label: 'English', value: 'en' },
	{ label: 'French', value: 'fr' },
	{ label: 'German', value: 'de' },
	{ label: 'Spanish', value: 'es' },
	{ label: 'Portuguese', value: 'pt' },
	{ label: 'Russian', value: 'ru' },
	{ label: 'Japanese', value: 'ja' },
	{ label: 'Korean', value: 'ko' },
	{ label: 'Chinese', value: 'zh' }
] as const

export const languagesOptions = [
	{ label: 'Espanhol - Colombia', value: 'es-CO' },
	{ label: 'Espanhol - México', value: 'es-MX' },
	{ label: 'Espanhol - España', value: 'es-ES' },
	{ label: 'Espanhol - América Latina', value: 'es-419' }
] as const

export const vslFormSchema = z
	.object({
		owner_name: z.string().min(2, {
			message: 'Owner name must be at least 2 characters.'
		}),
		ad_url: z.string().min(2, {
			message: 'Ad URL must be at least 2 characters.'
		}),
		product_name: z.string().min(2, {
			message: 'Product name must be at least 2 characters.'
		}),
		inlead_url: z.string().min(2, {
			message: 'Inlead URL must be at least 2 characters.'
		}),
		is_root_vsl: z.number().optional(),
		language_option: z.string(),
		root_vsl_id: z.string().optional(),
		video_file: z
			.instanceof(File, {
				message: 'Please upload a video file.'
			})
			.refine(file => file.type === 'video/mp4', {
				message: 'File must be an MP4 video.'
			})
			.optional()
	})
	.refine(
		data => {
			// Se não for root VSL (is_root_vsl !== 1), root_vsl_id é obrigatório
			if (
				data.is_root_vsl !== 1 &&
				(!data.root_vsl_id || data.root_vsl_id.length < 2)
			) {
				return false
			}
			return true
		},
		{
			message: 'Root VSL ID must be at least 2 characters when not a root VSL.',
			path: ['root_vsl_id']
		}
	)

export type VslFormData = z.infer<typeof vslFormSchema>

export const defaultVslFormValues: Partial<VslFormData> = {
	owner_name: '',
	ad_url: '',
	product_name: '',
	inlead_url: '',
	video_file: undefined,
	is_root_vsl: 0,
	root_vsl_id: '',
	language_option: 'es-CO'
}
