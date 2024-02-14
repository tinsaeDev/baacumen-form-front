import { Add, Preview, Save } from "@mui/icons-material";
import {
  Box,
  Container,
  Fab,
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormField from "./FormField";

export default function FormEditor() {
  const { id } = useParams();
  console.log(id);

  const mockLoadedData: FormObject = {
    name: "Survey 1",
    description: "Survey 1",
    created_at: "Last Week",
    updated_at: "Morning",
    data: {
      action: "https://localhost:8000/api/form",
      fields: [
        {
          title: "What is your full name",

          type: "text",
          validation: {
            required: false,
          },
          options: [],
        },
      ],
    },
    id: 1,
  };

  return (
    <>
      <Formik
        initialValues={mockLoadedData}
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
                      label: yup.string().required("Please enter option label"),
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
          const { values, errors, touched, handleBlur, handleChange } = formik;
          console.log(formik.errors);
          function onNewField(i: number) {
            {
              values.data.fields.splice(i + 1, 0, {
                title: "",
                type: "text",
                validation: {
                  regex: "",
                  required: false,
                },
                options: [],
              });

              formik.setFieldValue("data.fields", values.data.fields);
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

                      {values.data.fields.map((f, i) => {
                        return (
                          <FormField
                            formik={formik}
                            i={i}
                            onNew={() => {
                              onNewField(i);
                            }}
                            onDelete={() => {
                              values.data.fields.splice(i, 1);
                              formik.setFieldValue(
                                "data.fields",
                                values.data.fields
                              );
                            }}
                            onCopy={() => {
                              values.data.fields.splice(i + 1, 0, f);

                              formik.setFieldValue(
                                "data.fields",
                                values.data.fields
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
    </>
  );
}
