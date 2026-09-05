import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-center px-5 py-32 text-center font-mono">
      <p className="text-[12.5px] text-muted-dark">error 404</p>
      <h1 className="mt-3 text-[22px] font-bold text-fg">page not found</h1>
      <p className="mt-2 text-[13px] text-muted-dark">
        the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-6 text-amber underline underline-offset-4">
        [ back to overview ]
      </Link>
    </div>
  )
}
