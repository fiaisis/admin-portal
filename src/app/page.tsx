import { Button, Container } from '@mui/material';
const DEFAULT_INSTRUMENT = 'MARI';

export default function Home() {
  return (
    <Container sx={{ display: 'flex', gap: 1, mt: 1, mx: 0 }}>
      <Button variant="contained" size="large" href={`/specification/${DEFAULT_INSTRUMENT}`}>
        Specifications
      </Button>
      <Button disabled variant="contained" size="large">
        fileshare
      </Button>
    </Container>
  );
}
