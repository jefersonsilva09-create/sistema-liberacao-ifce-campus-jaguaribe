import { useState } from "react";

export default function LoginForm({ handleLogar }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (login == "admin" && senha == "123") {
      handleLogar();
    } else {
      alert("Login ou senha errados")
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>
          Login
          <input onChange={(e) => setLogin(e.target.value)} />
        </label>
      </div>

      <div className="form-field">
        <label>
          Senha
          <input type="password" onChange={(e) => setSenha(e.target.value)} />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Entrar
      </button>
    </form>
  );
}
