interface InfoRowProps {
	icon: React.ComponentType<{ className?: string }>
	label: string
	value: React.ReactNode
}

export function InfoRow({
	icon: Icon,
	label,
	value
}: Readonly<InfoRowProps>) {
	if (!value) return null
	return (
		<div className='flex items-start gap-3'>
			<Icon className='size-4 text-greyscale-400 mt-0.5 shrink-0' />
			<div className='flex flex-col'>
				<span className='body-xsmall-regular text-greyscale-500'>{label}</span>
				<span className='body-small-regular text-greyscale-900'>{value}</span>
			</div>
		</div>
	)
}
