import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function FormEditor() {
  const { id } = useParams();

  return (
    <>
      <Typography variant="h1"> FOrm Editor {id} </Typography>
    </>
  );
}
