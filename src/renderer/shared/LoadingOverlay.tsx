import { Box, CircularProgress } from '@mui/material';

export function LoadingOverlay(): JSX.Element {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(2px)',
        zIndex: 9999,
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Box
          sx={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    </Box>
  );
}
