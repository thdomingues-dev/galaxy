// Packages
import { ReactElement, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Models
import { Resource } from '../models/resources'

interface ListItemProps {
  link: string
  altMessage: string
  referece: Resource
  referenceId: string
  title: string
}

const ListItem = ({ link, altMessage, title, referece, referenceId }: ListItemProps): ReactElement => (
  <Link href={`/${referece.substring(0, referece.length - 1)}/${link}`}>
    <a className="flex flex-col rounded-lg hover:shadow-xl hover:text-purple-700 hover:tracking-wide">
      <Image
        className="rounded-t-lg"
        src={`https://starwars-visualguide.com/assets/img/${referece}/${referenceId}.jpg`}
        height={300}
        width={200}
        alt={`image ${altMessage}`}
      />
      <span className="bg-white rounded-b-lg border-b-2 ">{title}</span>
    </a>
  </Link>
)

export default memo(ListItem)
