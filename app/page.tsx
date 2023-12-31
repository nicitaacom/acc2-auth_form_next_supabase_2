import Navbar from "./components/Navbar/Navbar"
import { AuthModal } from "./(auth)/auth/AuthModal/AuthModal"
import { AuthModalContainer } from "./components/ui/Modals/ModalContainers/AuthModalContainer"

export default function Home() {
  return (
    <>
      <Navbar />
      <AuthModalContainer>
        <AuthModal label="Auth" />
      </AuthModalContainer>
    </>
  )
}
