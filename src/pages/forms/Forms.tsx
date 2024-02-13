import { Delete, Edit, NewReleases } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";

export default function Forms() {
  const mockForms: FormObject[] = [
    {
      id: 1,
      name: "Form 1",
      description: "Form sesc",
      data: {
        action: "https://google.com/dd3",
        fields: [
          {
            
            type: "text",
            title: "",
            validation: {
              required: false,
            },
          },
        ],
      },
      created_at: "",
      updated_at: "",
    },
  ];
  return (
    <>
      <Stack direction="row" justifyContent="flex-end">
        <Link to="/form-editor/1">
          <Button startIcon={<NewReleases />} size="large" variant="contained">
            New Form
          </Button>
        </Link>
      </Stack>
      <Grid mt={2} container spacing={2}>
        {mockForms.map((mf) => {
          return (
            <Grid xs={12} sm={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {mf.name}
                  </Typography>

                  <Typography variant="subtitle2">{mf.description}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton color="primary">
                    <Edit></Edit>
                  </IconButton>
                  <IconButton color="error">
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
