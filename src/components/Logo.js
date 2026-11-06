import logo from "../assets/logo_ifce.png";

export default function Logo() {
  return (
    <div className="logo">
      <img
        src={logo}
        alt="Instituto Federal do Ceará - Campus Jaguaribe"
        style={{
          width: "100%",
          maxWidth: "350px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
