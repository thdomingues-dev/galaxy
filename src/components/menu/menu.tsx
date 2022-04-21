import { ReactElement } from 'react'

interface MenuProps {
  children: Array<ReactElement>
}

const Menu = ({ children }: MenuProps): ReactElement => (
  <section className="mx-auto py-40">
    <div className="grid grid-cols-3">{children}</div>
  </section>
)

export default Menu
