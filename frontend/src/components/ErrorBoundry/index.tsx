/* eslint-disable class-methods-use-this */
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Button, Stack, Typography } from '@mui/material';
import { Component } from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode
};

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  // eslint-disable-next-line react/state-in-constructor
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  reloadPage () {
    window.location.reload();
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Stack alignItems="center" mt={12} spacing={3}>
          <ReportProblemIcon fontSize="large" color="error" />
          <Typography variant="h4">Something went wrong</Typography>

          <Button onClick={this.reloadPage} variant="contained">
            Reload
          </Button>
        </Stack>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
