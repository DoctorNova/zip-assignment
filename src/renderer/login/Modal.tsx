import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReplayIcon from '@mui/icons-material/Replay';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ErrorModal({
  show,
  msg,
  tryAgain,
}: {
  show: boolean;
  msg: string | Error;
  tryAgain: () => void;
}) {
  const [open, setOpen] = React.useState(show);
  const handleClose = () => setOpen(false);

  let description;
  if (typeof msg === 'string') {
    description = msg;
  }

  if (msg instanceof Error) {
    description = msg.message;
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" variant="h6" component="h6">
            {description}
          </Typography>
          <Button
            onClick={tryAgain}
            size="large"
            startIcon={<ReplayIcon />}
            sx={{ mt: 4 }}
          >
            Try Again
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
