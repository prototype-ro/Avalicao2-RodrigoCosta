import { useState } from 'react';
import { Link } from 'react-router-dom';
import { obterVotos, calcularResultado, desfazerUltimoVoto, zerarVotos } from '../services/votacaoService';

const SELOS_RESULTADO = {
  0: { classe: 'placar-craque', texto: 'Craque do jogo' },
  1: { classe: 'placar-vice', texto: 'Vice' },
};

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());
  const total = votos.length;
  const resultado = calcularResultado(votos);

  function handleDesfazer() {
    setVotos(desfazerUltimoVoto());
  }

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos([]);
    }
  }

  const craque = resultado[0];
  const vice = resultado[1];
  const vantagem = total > 0 ? craque.votos - vice.votos : 0;

  return (
    <main className="resultado">
      <h1>Resultado da votação</h1>
      <p className="resultado-total">
        <strong>{total}</strong> {total === 1 ? 'voto' : 'votos'} computados.
      </p>

      {total > 0 && (
        <p className="disputa">
          {vantagem === 0
            ? `Empate na liderança entre ${craque.nome} e ${vice.nome}!`
            : `${craque.nome} lidera com ${vantagem} ${vantagem === 1 ? 'voto' : 'votos'} de vantagem sobre ${vice.nome}.`}
        </p>
      )}

      {total === 0 ? (
        <p className="sem-votos">
          Ainda não há votos. <Link to="/votacao">Vote agora</Link>.
        </p>
      ) : (
        <div className="placar">
          {resultado.map((j, indice) => {
            const selo = SELOS_RESULTADO[indice];
            return (
              <div key={j.id} className={`placar-item${selo ? ' ' + selo.classe : ''}`}>
                <span className="placar-posicao">{indice + 1}º</span>
                <img src={j.foto} alt={j.nome} className="placar-foto" />
                <div className="placar-info">
                  <h3>
                    {j.nome}
                    {selo && <span className="selo-placar">{selo.texto}</span>}
                  </h3>
                  <div className="barra">
                    <div className="barra-preenchida" style={{ width: `${j.percentual}%` }} />
                  </div>
                  <p className="placar-detalhe">
                    {j.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% - {j.votos} {j.votos === 1 ? 'voto' : 'votos'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="acoes-resultado">
        <button type="button" onClick={handleDesfazer} disabled={total === 0}>Desfazer último voto</button>
        <button type="button" onClick={handleZerar} disabled={total === 0}>Zerar votação</button>
      </div>
    </main>
  );
}

export default Resultado;
