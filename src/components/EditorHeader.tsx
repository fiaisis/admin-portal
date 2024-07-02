import ButtonAlert from './ButtonAlert';
import { Box } from '@mui/material';

interface EditorHeaderProps {
  title: string;
  specification: string;
  handleSubmit: () => Promise<string>;
}

export default function EditorHeader(props: EditorHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          textAlign: 'center',
        }}
      >
        <h1> {props.title} </h1>
      </Box>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <ButtonAlert instrument={props.title} specification={props.specification} handleSubmit={props.handleSubmit} />
      </Box>
    </Box>
  );
}
