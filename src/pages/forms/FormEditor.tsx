import {
  Add,
  Check,
  HourglassBottom,
  Preview,
  Save,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Fab,
  FormControl,
  FormHelperText,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormField from "./FormField";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { green } from "@mui/material/colors";
import SnackbarAlert, { SnackbarMessage } from "../../components/SnackbarAlert";

export type FormRequest = FormObject & {
  deleted_fields: number[];
};
export default function FormEditor() {
  const { id } = useParams();
  const { isLoading, isError, data } = useQuery({
    retry: false,
    queryKey: ["forms"],

    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/forms/${id}`
      );
      return response.data;
    },
  }) as UseQueryResult;

  const form: FormRequest | null = useMemo(
    function () {
      if (!data) {
        return null;
      }

      const form = (
        data as {
          data: {
            form: FormObject;
          };
        }
      ).data.form;

      return {
        ...form,
        deleted_fields: [],
      };
    },
    [data]
  );

  const [savingOrderForm, setSavingOrderForm] = useState(false);
  const [showSuccessfulySaved, setShowSuccessfulySaved] = useState(false);

  // Snackbar
  const snackbarMessage = useRef<SnackbarMessage>();
  const [showSnackbarAlert, setShowSnackbarAlert] = useState<boolean>(false);

  const saveButtonSx = {
    ...(showSuccessfulySaved && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(
    function () {
      if (!showSuccessfulySaved) {
        return;
      }

      setTimeout(function () {
        setShowSuccessfulySaved(false);
      }, 1500);
    },
    [showSuccessfulySaved, setShowSuccessfulySaved]
  );

  const saveProgress = useCallback(
    async (values: FormRequest): Promise<AxiosResponse> => {
      setSavingOrderForm(true);
      setShowSuccessfulySaved(false);
      return axios.put(
        `${import.meta.env.VITE_APP_BACKEND_URL}/forms/${values.id}`,
        {
          action: "SAVE",
          ...values,
        }
      );
    },
    []
  );

  return (
    <>
      {isLoading && <LinearProgress />}

      {isError && !isLoading && (
        <Typography variant="h1" color="error">
          Error Loading Form
        </Typography>
      )}

      {form && (
        <Formik
          initialValues={form}
          validationSchema={yup.object().shape({
            name: yup.string().required("Enter Form Name"),
            description: yup.string().required("Enter Form Description"),
            data: yup.object().shape({
              fields: yup
                .array()
                .min(1)
                .of(
                  yup.object().shape({
                    title: yup.string().required(),
                    type: yup.string().required(),
                    validation: yup.object().shape({
                      regex: yup.string(),
                      required: yup.boolean().required(),
                    }),
                    options: yup.array().of(
                      yup.object().shape({
                        label: yup
                          .string()
                          .required("Please enter option label"),
                      })
                    ),
                  })
                ),
            }),
          })}
          onSubmit={(values, formik) => {
            saveProgress(values)
              .then((result: AxiosResponse) => {
                const form = result.data.data.form;

                formik.setValues({ ...form, deleted_fields: [] });

                setShowSuccessfulySaved(true);
              })
              .catch(() => {
                snackbarMessage.current = {
                  message: "Faild save!",
                  success: false,
                };
                setShowSnackbarAlert(true);
              })
              .finally(() => {
                setSavingOrderForm(false);
              });
          }}
        >
          {function (formik) {
            const { values, errors, touched, handleBlur, handleChange } =
              formik;

            console.log(errors);

            function onNewField(i: number) {
              {
                values.fields.splice(i + 1, 0, {
                  title: "",
                  type: "text",
                  validation: {
                    regex: "",
                    required_field: false,
                  },
                  options: [],
                });

                formik.setFieldValue("fields", values.fields);
              }
            }
            return (
              <>
                <Form>
                  <Container maxWidth="lg">
                    <Toolbar variant="dense">
                      <Stack
                        flexGrow={1}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                      >
                        <IconButton>
                          <Preview />
                        </IconButton>

                        <Box sx={{ m: 1, position: "relative" }}>
                          <IconButton
                            disabled={savingOrderForm}
                            size="small"
                            aria-label="save"
                            color="primary"
                            sx={saveButtonSx}
                            type="submit"
                          >
                            {showSuccessfulySaved ? (
                              <Check />
                            ) : savingOrderForm ? (
                              <HourglassBottom />
                            ) : (
                              <Save />
                            )}
                          </IconButton>
                        </Box>
                      </Stack>
                    </Toolbar>
                    <Stack spacing={2} sx={{}}>
                      <Stack
                        sx={{
                          p: 2,
                          minWidth: "max-content",
                        }}
                        alignItems="center"
                        spacing={2}
                      >
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="name"
                            variant="standard"
                            size="medium"
                            label="Form Name"
                          />

                          {errors.name && touched.name && (
                            <FormHelperText error>{errors.name}</FormHelperText>
                          )}
                        </FormControl>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="description"
                            variant="standard"
                            size="medium"
                            label="Form Description"
                          />
                          {errors.description && touched.description && (
                            <FormHelperText error>
                              {errors.description}
                            </FormHelperText>
                          )}
                        </FormControl>

                        {values.fields.map((f, i) => {
                          return (
                            <FormField
                              key={i}
                              formik={formik}
                              i={i}
                              onNew={() => {
                                onNewField(i);
                              }}
                              onDelete={() => {
                                if (f.id) {
                                  values.deleted_fields.push(f.id);
                                  formik.setFieldValue(
                                    "deleted_fields",
                                    values.deleted_fields
                                  );
                                }
                                values.fields.splice(i, 1);
                                formik.setFieldValue("fields", values.fields);
                              }}
                              onCopy={() => {
                                const clone = structuredClone(f);
                                delete clone.id;
                                values.fields.splice(i + 1, 0, clone);

                                formik.setFieldValue("fields", values.fields);
                              }}
                            />
                          );
                        })}

                        <Box
                          sx={{
                            position: "fixed",
                            bottom: "1rem",
                            right: "1rem",
                          }}
                        >
                          <Fab
                            color="primary"
                            onClick={() => {
                              onNewField(0);
                            }}
                          >
                            <Add />
                          </Fab>
                        </Box>
                      </Stack>
                    </Stack>
                  </Container>
                </Form>
              </>
            );
          }}
        </Formik>
      )}

      {showSnackbarAlert && snackbarMessage.current && (
        <SnackbarAlert
          onClose={() => {
            setShowSnackbarAlert(false);
          }}
          message={snackbarMessage.current}
          open={true}
        />
      )}
    </>
  );
}
