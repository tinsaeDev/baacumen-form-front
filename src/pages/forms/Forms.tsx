import { Delete, Edit, NewReleases } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MUIDataTable from "mui-datatables";

export default function Forms() {
  const mockForms = [
    {
      id: 1,
      name: "Form 1",
      data: {},
      created_at: "",
      updated_at: "",
    },
    {
      id: 1,
      name: "Form 1",
      data: {},
      created_at: "",
      updated_at: "",
    },
    {
      id: 1,
      name: "Form 1",
      data: {},
      created_at: "",
      updated_at: "",
    },
    {
      id: 1,
      name: "Form 1",
      data: {},
      created_at: "",
      updated_at: "",
    },
    {
      id: 1,
      name: "Form 1",
      data: {},
      created_at: "",
      updated_at: "",
    },
  ];
  return (
    <>
      <Stack direction="row" justifyContent="flex-end">
        <Button startIcon={<NewReleases />} size="large" variant="contained">
          
          New Form{" "}
        </Button>
      </Stack>
      <Grid mt={2} container spacing={2}>
        {mockForms.map((mf) => {
          return (
            <Grid xs={12} sm={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Title
                  </Typography>

                  <Typography variant="subtitle2">Title</Typography>
                </CardContent>
                <CardActions>
                  <IconButton>
                    <Edit></Edit>
                  </IconButton>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
