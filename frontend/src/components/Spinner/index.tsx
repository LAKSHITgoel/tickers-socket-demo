import { Box, CircularProgress, SxProps } from '@mui/material';
import { ThemeColors } from 'global/colors';

type Props = {
  sx?: SxProps;
  size?: number;
  color?: ThemeColors | 'inherit';
};

const style: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  marginTop: '40px'
};

const Spinner = ({
  size = 40,
  sx,
  color = 'primary'
}: Props) => (
  <Box sx={{ ...style, ...sx }}>
    <CircularProgress size={size} color={color} />
  </Box>
);

export default Spinner;
