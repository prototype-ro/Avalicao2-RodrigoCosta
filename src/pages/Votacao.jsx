import { useState } from 'react';
import { Link } from 'react-router-dom';
import { listarPorSituacao, obterSuspenso, registrarVoto } from '../services/votacaoService';
import JogadorCard from '../components/JogadorCard';

function Votacao() {
  const indicados = listarPorSituacao('indicado');
  const elenco = listarPorSituacao('elenco');
  const suspenso = obterSuspenso();

  const [selecionado, setSelecionado] = useState(null);
  const [historico, setHistorico] = useState([]);

  function handleConfirmar() {
    registrarVoto(selecionado.id);
    setHistorico([...historico, selecionado.nome]);
    setSelecionado(null);
  }

  return (
    <main className="votacao">
      <h1>Vote no craque do jogo</h1>

      <div className="grade-indicados">
        {indicados.map((j) => (
          <JogadorCard
            key={j.id}
            jogador={j}
            selecionado={selecionado?.id === j.id}
            onSelecionar={setSelecionado}
          />
        ))}
      </div>

      <div className="confirmacao">
        <p>
          {selecionado
            ? `Seu voto vai para ${selecionado.nome}.`
            : 'Nenhum jogador selecionado.'}
        </p>
        <button type="button" disabled={!selecionado} onClick={handleConfirmar}>
          Confirmar voto
        </button>
      </div>

      {historico.length > 0 && (
        <section className="historico">
          <h2>{historico.length} {historico.length === 1 ? 'voto' : 'votos'} nesta sessão</h2>
          <ol>
            {historico.map((nome, indice) => (
              <li key={indice}>{nome}</li>
            ))}
          </ol>
          <Link to="/resultado" className="botao botao-principal">Ver resultado</Link>
        </section>
      )}

      {suspenso && (
        <section className="suspenso">
          <h2>Suspenso</h2>
          <div className="grade-elenco">
            <JogadorCard jogador={suspenso} />
          </div>
        </section>
      )}

      <section className="elenco">
        <h2>Demais jogadores do elenco</h2>
        <div className="grade-elenco">
          {elenco.map((j) => (
            <JogadorCard key={j.id} jogador={j} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
