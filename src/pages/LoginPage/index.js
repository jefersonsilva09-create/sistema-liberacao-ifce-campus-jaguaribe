import Logo from "../../components/Logo";
import Rodape from "../../components/Rodape";
import LoginForm from "./components/LoginForm";

export default function LoginPage({ handleLogar }) {
  return (
    <div className="container">
      <Logo />
      <h1>Bem vindo(a)</h1>

      <LoginForm handleLogar={handleLogar} />

      <Rodape />
    </div>
  );
}
