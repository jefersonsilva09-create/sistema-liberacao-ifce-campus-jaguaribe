import logo from "../assets/logo_ifce.png";

export default function Rodape() {
  return (
    <footer
      style={{
        borderTop: "1px solid #ddd",
        marginTop: "40px",
        padding: "25px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
        color: "#666",
        fontSize: "13px",
      }}
    >
      <span>© 2026</span>

      <img
        src={logo}
        alt="Instituto Federal do Ceará - Campus Jaguaribe"
        style={{
          width: "130px",
          height: "auto",
          objectFit: "contain",
        }}
      />

      <span>Todos os direitos reservados.</span>
    </footer>
  );
}
