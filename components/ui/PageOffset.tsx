/** Espacio superior para el HeaderNavbar fijo en páginas internas */
export default function PageOffset({ children }: { children: React.ReactNode }) {
  return <div className="pt-20 sm:pt-24 lg:pt-28">{children}</div>
}
