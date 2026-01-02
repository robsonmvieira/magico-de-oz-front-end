interface DateInfoProps {
	date: string | undefined
}

export function DateInfo({ date }: Readonly<DateInfoProps>) {
	if (!date) return null

	return (
		<div className='text-center py-2 border-t border-gray-200'>
			<span className='text-sm text-gray-500'>Criado em: </span>
			<span className='font-medium text-gray-700'>
				{new Date(date)
					.toLocaleString('pt-BR', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					})
					.replace(',', ' às')}
			</span>
		</div>
	)
}

DateInfo.displayName = 'DateInfo'
