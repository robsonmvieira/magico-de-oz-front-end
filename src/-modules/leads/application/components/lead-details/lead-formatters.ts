export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
}

export function formatCurrency(value: number) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	}).format(value)
}
