import { useRouteError } from 'react-router'

export default () => {
	const error = useRouteError()
	console.error( "Fallback:", error)

	return <p>Something went wrong</p>
}