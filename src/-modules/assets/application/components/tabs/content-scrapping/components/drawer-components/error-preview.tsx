import { FileText } from 'lucide-react'

export function ErrorPreview() {
	return (
		<div className='flex items-center justify-center h-full border rounded-lg bg-gray-50'>
			<div className='text-center p-6'>
				<FileText className='w-12 h-12 text-gray-400 mx-auto mb-4' />
				<h3 className='font-medium text-gray-900 mb-2'>
					Nenhum arquivo disponível
				</h3>
				<p className='text-sm text-gray-600'>
					O arquivo PDF não está disponível para visualização.
				</p>
			</div>
		</div>
	)
}
ErrorPreview.displayName = 'ErrorPreview'
