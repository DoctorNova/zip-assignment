import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { LoadingOverlay } from 'renderer/shared/LoadingOverlay';
import { MoodleInstance } from '../../../release/app/MoodleService/types';
import ErrorModal from './Modal';

export function Login(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ msg: string; tryAgain: () => void }>();
  const [moodleInstances, setMoodleInstances] = useState<MoodleInstance[]>([]);
  const [moodleInstanceEndpoint, setMoodleInstanceEndpoint] = useState<string>(
    moodleInstances[0]?.link
  );
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      setLoading(true);
      window.MoodleService.init(moodleInstanceEndpoint, username, password)
        .finally(() => setLoading(false))
        .catch((reason: string) =>
          setError({
            msg: reason,
            tryAgain: () => {
              setError(undefined);
            },
          })
        );
      event.preventDefault();
    },
    [moodleInstanceEndpoint, password, username]
  );
  const loadInstances = useCallback(() => {
    window.MoodleService.getInstances()
      .then(setMoodleInstances)
      .catch((reason: string) =>
        setError({
          msg: reason,
          tryAgain: () => {
            setError(undefined);
            loadInstances();
          },
        })
      );
  }, []);

  useEffect(() => {
    setLoading(!moodleInstances.length);
  }, [moodleInstances.length]);

  useEffect(() => {
    loadInstances();
  }, [loadInstances]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', position: 'relative' }}
    >
      {loading && <LoadingOverlay />}
      {error && (
        <ErrorModal
          msg={error.msg}
          show={Boolean(error)}
          tryAgain={error.tryAgain}
        />
      )}
      <Grid item>
        <Card>
          <CardContent>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{ minWidth: 120, width: 500 }}
            >
              <Box>
                <div>
                  <h2>Select Moodle</h2>
                </div>
                <FormControl fullWidth required variant="standard">
                  <InputLabel id="moodle.instance">Semester</InputLabel>
                  <Select
                    disabled={!moodleInstances.length}
                    label="Semester"
                    defaultValue=""
                    onChange={(event) => {
                      setMoodleInstanceEndpoint(event.target.value as string);
                    }}
                  >
                    {moodleInstances.map(({ label, link }) => (
                      <MenuItem key={label} value={link}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ pt: 3 }}>
                <div>
                  <h2>Login to Moodle</h2>
                </div>
                <TextField
                  variant="standard"
                  sx={{ pb: 1 }}
                  fullWidth
                  required
                  label="Username"
                  disabled={!moodleInstanceEndpoint}
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value as string)
                  }
                />
                <TextField
                  variant="standard"
                  type="password"
                  fullWidth
                  required
                  label="Password"
                  disabled={!moodleInstanceEndpoint}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value as string)
                  }
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  startIcon={<LoginIcon />}
                  disabled={!(username && password)}
                  size="large"
                  sx={{
                    width: '160px',
                    backgroundColor: '#BB1F2A',
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
