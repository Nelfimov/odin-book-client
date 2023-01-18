import { Home } from './Home'

/**
 * Discover page - all recent posts.
 */
export function Discover (): JSX.Element {
  return <Home friends={false} />
}
