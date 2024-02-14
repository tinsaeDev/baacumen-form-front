import { Add, Preview, Save } from "@mui/icons-material";
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
import { useMemo } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";

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

  const form: FormObject | null = useMemo(
    function () {
      if (!data) {
        return null;
      }

      return (
        data as {
          data: {
            form: FormObject;
          };
        }
      ).data.form;
    },
    [data]
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
          onSubmit={(values) => {
            console.log("VVVVVVVVVVV", values);
          }}
        >
          {function (formik) {
            const { values, errors, touched, handleBlur, handleChange } =
              formik;
            console.log(formik.errors);
            function onNewField(i: number) {
              {
                values.fields.splice(i + 1, 0, {
                  title: "",
                  type: "text",
                  validation: {
                    regex: "",
                    required: false,
                  },
                  options: [],
                });

                formik.setFieldValue("data.fields", values.fields);
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
                        <IconButton type="submit">
                          <Save />
                        </IconButton>
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
                              formik={formik}
                              i={i}
                              onNew={() => {
                                onNewField(i);
                              }}
                              onDelete={() => {
                                values.fields.splice(i, 1);
                                formik.setFieldValue(
                                  "data.fields",
                                  values.fields
                                );
                              }}
                              onCopy={() => {
                                values.fields.splice(i + 1, 0, f);

                                formik.setFieldValue(
                                  "data.fields",
                                  values.fields
                                );
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
    </>
  );
}
