import { ReactElement, memo } from 'react'
import Image from 'next/image'

interface MenuItemProps {
  title: string
  imgSrc: string
  height?: number
  width?: number
}

const MenuItem = ({ title, imgSrc, height = 400, width = 200, ...rest }: MenuItemProps): ReactElement => (
  <a {...rest} className="p-4">
    <h1 className="text-2xl mb-4">{title}</h1>
    <Image className="rounded-md" src={imgSrc} width={height} height={width} alt={title} />
  </a>
)

export default memo(MenuItem)
