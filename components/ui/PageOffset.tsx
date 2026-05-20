/** Espacio superior para el HeaderNavbar fijo en páginas internas */
export default function PageOffset({ children }: { children: React.ReactNode }) {
  return <div className="pt-28 md:pt-32">{children}</div>
}
