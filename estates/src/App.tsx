import { totalEstates, useEstates } from "./api/useEstates";
import { Container } from "./components/Container";
import { EstateGrid } from "./components/EstateGrid";
import { Pagination } from "./components/Pagination";
import { Title } from "./components/Title";

function App() {
  const { estates, page, pageSize, selectPage } = useEstates();

  return (
    <Container>
      <Title />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={totalEstates(estates)}
        onPageSelect={selectPage}
      />
      <EstateGrid estates={estates} pageSize={pageSize} />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={totalEstates(estates)}
        onPageSelect={selectPage}
      />
    </Container>
  );
}

export default App;
