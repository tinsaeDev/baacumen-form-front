import { Delete, Edit, List, NewReleases } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Link, useNavigate } from "react-router-dom";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import axios from "axios";
import { queryClient } from "../../components/reactQuery";

export default function Forms() {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery({
    retry: false,
    queryKey: ["forms"],

    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/forms`
      );
      return response.data;
    },
  }) as UseQueryResult;

  const forms: FormObject[] = useMemo(
    function () {
      if (!data) {
        return [];
      }

      return (
        data as {
          data: {
            forms: FormObject[];
          };
        }
      ).data.forms;
    },
    [data]
  );

  return (
    <>
      <Stack direction="row" justifyContent="flex-end">
        <Button
          startIcon={<NewReleases />}
          size="large"
          variant="contained"
          onClick={async () => {
            const { data } = await axios.post(
              `${import.meta.env.VITE_APP_BACKEND_URL}/forms`
            );

            const form: FormObject = data.data.form;
            navigate(`/form-editor/${form.id}`);
          }}
        >
          New Form
        </Button>
      </Stack>

      {isLoading && <LinearProgress />}
      {!isLoading && isError && <Typography> Error Loading Forms </Typography>}
      {forms && (
        <Grid mt={2} container spacing={2}>
          {forms.map((mf) => {
            return (
              <Grid key={mf.id} xs={12} sm={6} lg={4} xl={3}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {mf.name}
                    </Typography>

                    <Typography variant="subtitle2">
                      {mf.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Stack
                      flexGrow={1}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" alignItems="center">
                        <Link to={`/form-editor/${mf.id}`}>
                          <IconButton color="primary">
                            <Edit></Edit>
                          </IconButton>
                        </Link>

                        <IconButton
                          color="error"
                          onClick={async () => {
                            await axios.delete(
                              `${import.meta.env.VITE_APP_BACKEND_URL}/forms/${
                                mf.id
                              }`
                            );
                            queryClient.invalidateQueries();
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>

                      <Link to={`/forms/${mf.id}/instances`}>
                        <Button
                          color="primary"
                          startIcon={<List />}
                          variant="contained"
                        >
                          Instances
                        </Button>
                      </Link>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}
