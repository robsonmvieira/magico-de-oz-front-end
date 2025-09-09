import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/clients')({
	component: Clients
})
function Clients() {
	return <div>Clients</div>
}
