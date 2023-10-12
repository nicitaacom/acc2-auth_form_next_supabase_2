import Navbar from "./components/Navbar/Navbar"
import { AuthModal } from "./components/ui/Modals/AuthModal"
import { AuthModalContainer } from "./components/ui/Modals/ModalContainers/AuthModalContainer"

//originally without async
export default async function Home() {
  return (
    <>
      <Navbar />
      <AuthModalContainer>
        <AuthModal label="Auth" />
      </AuthModalContainer>
    </>
  )
}