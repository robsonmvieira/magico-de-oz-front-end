import { Upload } from 'lucide-react'
import type { Control } from 'react-hook-form'
import type { VslFormData } from '@/-modules/tanos/domain/schemas/vsl-form.schema'
import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface VideoUploadProps {
	control: Control<VslFormData>
}

export function VideoUpload({ control }: VideoUploadProps) {
	return (
		<FormField
			control={control}
			name='video_file'
			render={({ field: { onChange, onBlur, name, ref, value } }) => (
				<FormItem className='w-full'>
					<FormLabel>Video File (MP4)</FormLabel>
					<FormControl>
						<div className='relative'>
							<Input
								type='file'
								accept='video/mp4'
								onChange={e => onChange(e.target.files?.[0])}
								onBlur={onBlur}
								name={name}
								ref={ref}
								className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
							/>
							<Button
								type='button'
								variant='outline'
								className='w-full h-12 flex items-center justify-center gap-2 border-dashed'
							>
								<Upload className='w-4 h-4' />
								{value ? value.name : 'Upload MP4 Video'}
							</Button>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

VideoUpload.displayName = 'VideoUpload'
