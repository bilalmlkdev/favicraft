import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center px-5 py-32 text-center">
      <p className="font-display text-[13px] font-medium text-amber">404</p>
      <h1 className="mt-2 font-display text-[26px] font-semibold text-[#F2F0EA]">
        Page not found
      </h1>
      <p className="mt-2 text-[14px] text-muted-dark">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-md bg-amber px-4 py-2.5 text-[13.5px] font-medium text-ink"
      >
        Back to overview
      </Link>
    </div>
  )
}
