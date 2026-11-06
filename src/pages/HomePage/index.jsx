import Rodape from "../../components/Rodape";
import garchomp from "../../assets/garchomp1.png";
import hydragon from "../../assets/hydragon.png";
import wobuffet from "../../assets/wobuffet.png";
import meowstic from "../../assets/meowstic.png";
import chewtle from "../../assets/chewtle.png";
import mudkip from "../../assets/mudkip.png";

export default function HomePage() {
  return (
    <>
      <h1>Pagina inicial</h1>
      <div
        className="galeria"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          columnGap: "20px",
          rowGap: "20px",
          justifyContent: "start",
        }}
      >
        <div style={{ textAlign: "center", width: "100px" }}>
          <img src={garchomp} alt="Garchomp" width="90" />
          <p style={{ margin: "8px 0 0", fontWeight: "bold" }}>Jeferson</p>
        </div>

        <div style={{ textAlign: "center", width: "100px" }}>
          <img src={hydragon} alt="Hydreigon" width="90" />
          <p style={{ margin: "8px 0 0", fontWeight: "bold" }}>Vank</p>
        </div>

        <div style={{ textAlign: "center", width: "100px" }}>
          <img src={wobuffet} alt="Wobbuffet" width="90" />
          <p style={{ margin: "8px 0 0", fontWeight: "bold" }}>Dawid</p>
        </div>

        <div style={{ textAlign: "center", width: "100px" }}>
          <img src={meowstic} alt="meowstic" width="90" />
          <p style={{ margin: "8px 0 0", fontWeight: "bold" }}>Kauan</p>
        </div>

        <div style={{ textAlign: "center", width: "100px" }}>
          <img src={chewtle} alt="Chewtle" width="90" />
          <p style={{ margin: "8px 0 0", fontWeight: "bold" }}>Rayanne</p>
        </div>

        <div style={{ textAlign: "center", width: "100px" }}>
          <img src={mudkip} alt="Mudkip" width="90" />
          <p style={{ margin: "8px 0 0", fontWeight: "bold" }}>Eduarda</p>
        </div>
      </div>

      <section>
        <h2>Sobre Nós</h2>
        <p>Alunos do 3° ano do IFCE cursando informatica para internet.</p>
      </section>

      <section>
        <h2>Nossos Serviços</h2>
        <p>Projeto que acelera o processo de liberação dos alunos.</p>
      </section>

      <Rodape />
    </>
  );
}
