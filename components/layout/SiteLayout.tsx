import SiteHeaderSwitcher from '@/components/layout/SiteHeaderSwitcher'
import Footer from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeaderSwitcher />
      <main>{children}</main>
      <Footer />
    </>
  )
}
