const SELOS = {
  indicado: 'Indicado',
  suspenso: 'Suspenso',
};

function JogadorCard({ jogador, selecionado = false, onSelecionar }) {
  const { nome, numero, posicao, foto, situacao } = jogador;
  const selo = SELOS[situacao];

  return (
    <article className={`card card-${situacao}${selecionado ? ' card-selecionado' : ''}`}>
      {selo && <span className={`selo selo-${situacao}`}>{selo}</span>}
      <img src={foto} alt={nome} className="card-foto" />
      <span className="card-numero">{numero}</span>
      <h3 className="card-nome">{nome}</h3>
      <p className="card-posicao">{posicao}</p>
      {onSelecionar && (
        <button type="button" onClick={() => onSelecionar(jogador)}>
          {selecionado ? '✓ Selecionado' : 'Selecionar'}
        </button>
      )}
    </article>
  );
}

export default JogadorCard;
