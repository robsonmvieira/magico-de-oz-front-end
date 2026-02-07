interface SectionTitleProps {
	children: React.ReactNode
}

export function SectionTitle({ children }: Readonly<SectionTitleProps>) {
	return (
		<h3 className='body-small-semibold text-greyscale-900 mb-3'>{children}</h3>
	)
}
