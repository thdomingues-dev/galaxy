// Packages
import { ReactElement, memo } from 'react'
import Link from 'next/link'

interface DetailFieldProps {
  label: string
  value: string
  link?: string
}

const DetailtField = ({ label, value, link }: DetailFieldProps): ReactElement => {
  return !link ? (
    <p className="flex">
      <h6 className="mr-1">{label}:</h6>
      <span className="text-gray-600">{value}</span>
    </p>
  ) : (
    <p className="flex">
      <h6 className="mr-1">{label}:</h6>
      <Link href={link}>
        <a className="text-purple-700">{value}</a>
      </Link>
    </p>
  )
}

export default memo(DetailtField)
