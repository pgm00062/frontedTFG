import WelcomeGrid from '../../client_components/WelcomeUI/Delivery/Grid'
import WelcomeHeader from '../../client_components/WelcomeUI/Delivery/Header'

export default async function WelcomeServer() {
  return (
    <main className="welcome-page-full">
      <WelcomeHeader />
      <WelcomeGrid full />
    </main>
  )
}

