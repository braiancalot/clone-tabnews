import useSwr from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <br />
      <Status />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSwr("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Ultima atualização: {updatedAtText}</div>;
}

function Status() {
  const { isLoading, data } = useSwr("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatus;

  if (isLoading) return <div>Carregando...</div>;

  if (!data?.dependencies?.database)
    return <div>Não foi possível obter as informações.</div>;

  databaseStatus = data.dependencies.database;

  return (
    <>
      <div>Versão do Banco de Dados: {databaseStatus.version}</div>
      <div>Número máximo de conexões: {databaseStatus.max_connections}</div>
      <div>Conexões abertas: {databaseStatus.opened_connections}</div>
    </>
  );
}
