import { Alert, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export interface SnackbarMessage {
  message: string;
  success: boolean;
}
interface SnackbarAlertProps {
  open: boolean;
  message: SnackbarMessage;
  onClose: () => void;
}
export default function SnackbarAlert(props: SnackbarAlertProps) {
  const theme = useTheme();
  const message = props.message;
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={props.onClose}
      sx={{
        zIndex: theme.zIndex.appBar + 99,
      }}
    >
      <Alert variant="filled" severity={message?.success ? "success" : "error"}>
        {message?.message}
      </Alert>
    </Snackbar>
  );
}
