import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Form, useNavigate, useParams } from "react-router-dom";

import React, { useMemo, useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from "mui-datatables";
import { Formik } from "formik";
import { Delete, Edit, Share } from "@mui/icons-material";
import moment from "moment";
import ResponseModal from "./ResponseModal";
import { queryClient } from "../../components/reactQuery";

export default function FormInstances() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery({
    retry: false,
    queryKey: ["forms_instances"],

    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/forms/${id}/instances`
      );
      return response.data;
    },
  }) as UseQueryResult;

  const instances: FormInstance[] | null = useMemo(
    function () {
      if (!data) {
        return null;
      }

      return (
        data as {
          data: {
            form_instances: FormInstance[];
          };
        }
      ).data.form_instances;
    },
    [data]
  );

  const columns: MUIDataTableColumn[] = [
    {
      name: "",
      label: "No",
      options: {
        customBodyRenderLite(dataIndex) {
          return dataIndex + 1;
        },
      },
    },

    {
      name: "name",
      label: "Name",
    },

    {
      name: "",
      label: "Responses",
      options: {
        customBodyRender(_value, tableMeta) {
          if (!instances) return;
          const row: FormInstance = instances[tableMeta.rowIndex];
          return (
            <Button
              onClick={() => {
                setResponseFormInstance(row);
                setOpenResponsesModal(true);
              }}
              variant="outlined"
            >
              32, Responses
            </Button>
          );
        },
      },
    },

    {
      name: "created_at",
      label: "Created At",
      options: {
        customBodyRender(value) {
          return moment(value).calendar();
        },
      },
    },

    {
      name: "updated_at",
      label: "Updated At",
      options: {
        customBodyRender(value) {
          return moment(value).calendar();
        },
      },
    },

    {
      name: "",
      label: "Actions",
      options: {
        customBodyRender(_value, tableMeta) {
          if (!instances) return;
          const row: FormInstance = instances[tableMeta.rowIndex];
          return (
            <ButtonGroup>
              <IconButton
                onClick={() => {
                  navigate(`/form-response/${row.form.id}/${row.id}`);
                }}
              >
                <Share />
              </IconButton>

              <IconButton color="error">
                <Delete />
              </IconButton>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </ButtonGroup>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    customToolbar() {
      return (
        <Button
          variant="contained"
          onClick={() => {
            setOpenNewDialogInstance(true);
          }}
        >
          {" "}
          New Instance{" "}
        </Button>
      );
    },
    download: false,
    print: false,
    responsive: "standard",
  };

  const [openNewDialogInstance, setOpenNewDialogInstance] = useState(false);
  const [openResponsesModal, setOpenResponsesModal] = useState(false);

  const [responseFormInstance, setResponseFormInstance] =
    useState<FormInstance>();
  
  return (
    <>
      {isLoading && <LinearProgress />}

      {isError && !isLoading && (
        <Typography variant="h1" color="error">
          Error Loading Form
        </Typography>
      )}

      {instances && (
        <MUIDataTable
          title="Form Instances"
          columns={columns}
          options={options}
          data={instances}
        />
      )}

      {openNewDialogInstance && (
        <NewInstanceDialog
          onClose={() => {
            setOpenNewDialogInstance(false);
          }}
          onNew={async (name) => {
            await axios.post(
              `${import.meta.env.VITE_APP_BACKEND_URL}/forms/${id}/instances`,
              {
                name,
              }
            );

            queryClient.invalidateQueries();
            setOpenNewDialogInstance(false);
          }}
        />
      )}

      {openResponsesModal && responseFormInstance && (
        <ResponseModal
          onClose={() => {
            setOpenResponsesModal(false);
          }}
          formInstance={responseFormInstance}
        />
      )}
    </>
  );
}

function NewInstanceDialog(props: {
  onNew: (name: string) => void;
  onClose: () => void;
}) {
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={async (values) => {
          props.onNew(values.name);
        }}
      >
        {function (formik) {
          const { handleBlur, handleChange, values, errors } = formik;
          return (
            <Form>
              <Dialog open={true} onClose={props.onClose}>
                <DialogTitle>Instance Name</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    What shall be name of the form instance?
                  </DialogContentText>
                  <FormControl fullWidth>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      name="name"
                      label="Instance Name"
                      type="email"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />

                    <FormHelperText error>{errors.name}</FormHelperText>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={props.onClose}>Cancel</Button>
                  <Button onClick={formik.submitForm} type="submit">
                    Create Form Instance
                  </Button>
                </DialogActions>
              </Dialog>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}
