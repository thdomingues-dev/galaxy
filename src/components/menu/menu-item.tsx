import { ReactElement, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface MenuItemProps {
  title: string
  imgSrc: string
  height?: number
  width?: number
  linkPath: string
}

const MenuItem = ({ title, imgSrc, height = 400, width = 200, linkPath }: MenuItemProps): ReactElement => (
  <Link href={linkPath}>
    <a className="p-4 hover:shadow-lg hover:rounded-md hover:font-bold">
      <h1 className="text-2xl mb-4">{title}</h1>
      <Image className="rounded-md" src={imgSrc} width={height} height={width} alt={title} />
    </a>
  </Link>
)

export default memo(MenuItem)
