// {
//   "id": "a76833ac-4c89-4af0-886a-8f570004c5f8",
//   "title": "7 CHAVES DO CORACAO.mp4",
//   "status": "COMPLETED",
//   "url": "local",
//   "type": "vsl",
//   "portuguese_pdf_url": "https://tanos-crm-e-marketing-robrobot-bucket.s3.amazonaws.com/vsl-pdfs/2025-10-a76833ac-4c89-4af0-886a-8f570004c5f8_pt-development.pdf?AWSAccessKeyId=AKIAVLH5GGYPNZO32YGQ&Signature=pudxTAViHKiNLSleS6wB0cEnHnM%3D&Expires=1775074919",
//   "spanish_pdf_url": "https://tanos-crm-e-marketing-robrobot-bucket.s3.amazonaws.com/vsl-pdfs/2025-10-a76833ac-4c89-4af0-886a-8f570004c5f8_es-development.pdf?AWSAccessKeyId=AKIAVLH5GGYPNZO32YGQ&Signature=uk9tJ567Ue6BloGiI66thMvyZtY%3D&Expires=1775074919",
//   "error_message": null,
//   "created_at": "2025-10-03T20:17:12.074021",
//   "updated_at": "2025-10-03T20:21:59.463020",
//   "has_pdfs": true,
//   "processing_complete": true,
//   "has_error": false,
//   "files": {
//     "portuguese_analysis": "https://tanos-crm-e-marketing-robrobot-bucket.s3.amazonaws.com/vsl-pdfs/2025-10-a76833ac-4c89-4af0-886a-8f570004c5f8_pt-development.pdf?AWSAccessKeyId=AKIAVLH5GGYPNZO32YGQ&Signature=pudxTAViHKiNLSleS6wB0cEnHnM%3D&Expires=1775074919",
//     "spanish_translation": "https://tanos-crm-e-marketing-robrobot-bucket.s3.amazonaws.com/vsl-pdfs/2025-10-a76833ac-4c89-4af0-886a-8f570004c5f8_es-development.pdf?AWSAccessKeyId=AKIAVLH5GGYPNZO32YGQ&Signature=uk9tJ567Ue6BloGiI66thMvyZtY%3D&Expires=1775074919"
//   },
//   "error_summary": null,
//   "language_option": "es-CO",
//   "owner_name": "Arapiraca Mariana",
//   "product_name": "Neuro sedução",
//   "root_vsl_id": null,
//   "is_root_vsl": 1,
//   "ad_url": "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&is_targeted_country=false&media_type=all&search_type=page&view_all_page_id=107893402273012",
//   "inlead_url": "https://inlead.digital/neuroseducao/?utm_source=FB&utm_campaign=%7B%7Bcampaign.name%7D%7D%7C%7B%7Bcampaign.id%7D%7D&utm_medium=%7B%7Badset.name%7D%7D%7C%7B%7Badset.id%7D%7D&utm_content=%7B%7Bad.name%7D%7D%7C%7B%7Bad.id%7D%7D&utm_term=%7B%7Bplacement%7D%7D&xcod=FBhQwK21wXxR%7B%7Bcampaign.name%7D%7D%7C%7B%7Bcampaign.id%7D%7DhQwK21wXxR%7B%7Badset.name%7D%7D%7C%7B%7Badset.id%7D%7DhQwK21wXxR%7B%7Bad.name%7D%7D%7C%7B%7Bad.id%7D%7DhQwK21wXxR%7B%7Bplacement%7D%7D"
// },
type createVSLInput = {
	id: string
	title: string
	status: string
	url: string
	type: string
	portuguese_pdf_url: string
	spanish_pdf_url: string
	error_message: string | null
	created_at: string
	updated_at: string | null
	has_pdfs: boolean
	processing_complete: boolean
	has_error: boolean
	files: {
		portuguese_analysis: string
		spanish_translation: string
	}
	error_summary: string | null
	language_option: string
	owner_name: string
	product_name: string
	root_vsl_id: string | null
	is_root_vsl: number
	ad_url: string
	inlead_url: string
	is_favorite: boolean
	has_video: boolean
	mp4_url: string
}
export class VSL {
	id: string
	title: string
	status: string
	url: string
	type: string
	is_favorite: boolean
	has_video: boolean
	mp4_url: string
	portuguese_pdf_url: string
	spanish_pdf_url: string
	error_message: string | null
	created_at: string
	updated_at: string | null
	has_pdfs: boolean
	processing_complete: boolean
	has_error: boolean
	files: {
		portuguese_analysis: string
		spanish_translation: string
	}
	error_summary: string | null
	language_option: string
	owner_name: string
	product_name: string
	root_vsl_id: string | null
	is_root_vsl: number
	ad_url: string
	inlead_url: string

	constructor(data: createVSLInput) {
		this.id = data.id
		this.title = data.title
		this.status = data.status
		this.url = data.url
		this.type = data.type
		this.portuguese_pdf_url = data.portuguese_pdf_url
		this.spanish_pdf_url = data.spanish_pdf_url
		this.error_message = data.error_message
		this.created_at = data.created_at
		this.updated_at = data.updated_at
		this.has_pdfs = data.has_pdfs
		this.processing_complete = data.processing_complete
		this.has_error = data.has_error
		this.files = data.files
		this.error_summary = data.error_summary
		this.language_option = data.language_option
		this.owner_name = data.owner_name
		this.product_name = data.product_name
		this.root_vsl_id = data.root_vsl_id
		this.is_root_vsl = data.is_root_vsl
		this.ad_url = data.ad_url
		this.inlead_url = data.inlead_url
		this.is_favorite = data.is_favorite ?? false
		this.has_video = data.has_video ?? false
		this.mp4_url = data.mp4_url ?? ''
	}
}
