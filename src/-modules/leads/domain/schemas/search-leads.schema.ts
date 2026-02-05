import { z } from 'zod'

const CNPJ_LENGTH = 18 // 00.000.000/0000-00

function isValidCnpj(cnpj: string): boolean {
	const numbers = cnpj.replaceAll(/\D/g, '')

	if (numbers.length !== 14) return false

	// Verifica se todos os dígitos são iguais
	if (/^(\d)\1+$/.test(numbers)) return false

	// Validação dos dígitos verificadores
	const calcDigit = (base: string, weights: number[]): number => {
		const sum = base
			.split('')
			.reduce((acc, digit, i) => acc + Number(digit) * weights[i], 0)
		const remainder = sum % 11
		return remainder < 2 ? 0 : 11 - remainder
	}

	const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
	const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

	const digit1 = calcDigit(numbers.slice(0, 12), weights1)
	const digit2 = calcDigit(numbers.slice(0, 12) + digit1, weights2)

	return numbers.endsWith(`${digit1}${digit2}`)
}

export const nameCnpjSchema = z.object({
	companyName: z.string().optional(),
	cnpj: z
		.string()
		.optional()
		.refine(
			value => {
				if (!value || value.length === 0) return true
				if (value.length < CNPJ_LENGTH) return false
				return isValidCnpj(value)
			},
			{ message: 'CNPJ inválido. Informe um CNPJ válido com 14 dígitos.' }
		)
})

export const sectorRegionSizeSchema = z.object({
	sector: z.string().optional(),
	region: z.string().optional(),
	size: z.string().optional()
})

export const advancedSearchSchema = z.object({
	term: z.string().optional(),
	foundationYear: z.string().optional(),
	keywords: z.string().optional()
})

export const locationSearchSchema = z.object({
	placeId: z.string().optional(),
	placeName: z.string().optional()
})

export type NameCnpjFormData = z.infer<typeof nameCnpjSchema>
export type SectorRegionSizeFormData = z.infer<typeof sectorRegionSizeSchema>
export type AdvancedSearchFormData = z.infer<typeof advancedSearchSchema>
export type LocationSearchFormData = z.infer<typeof locationSearchSchema>

export const defaultNameCnpjValues: NameCnpjFormData = {
	companyName: '',
	cnpj: ''
}

export const defaultSectorRegionSizeValues: SectorRegionSizeFormData = {
	sector: '',
	region: '',
	size: ''
}

export const defaultAdvancedSearchValues: AdvancedSearchFormData = {
	term: '',
	foundationYear: '',
	keywords: ''
}

export const defaultLocationSearchValues: LocationSearchFormData = {
	placeId: '',
	placeName: ''
}
