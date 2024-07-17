import { Button, Container } from '@mui/material';
import Link from 'next/link';
const DEFAULT_INSTRUMENT = 'MARI';

export default function Home() {
  return (
    <Container sx={{ display: 'flex', gap: 1, mt: 1, mx: 0 }}>
      <Button variant="contained" size="large" href={`/specification/${DEFAULT_INSTRUMENT}`} LinkComponent={Link}>
        Specifications
      </Button>
      <Button disabled variant="contained" size="large">
        Fileshare
      </Button>
    </Container>
  );
}
