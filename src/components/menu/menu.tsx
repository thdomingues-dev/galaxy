import { ReactElement } from 'react'

interface MenuProps {
  children: Array<ReactElement>
}

const Menu = ({ children }: MenuProps): ReactElement => (
  <section className="mx-auto md:py-20 2xl:py-40">
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1">{children}</div>
  </section>
)

export default Menu
