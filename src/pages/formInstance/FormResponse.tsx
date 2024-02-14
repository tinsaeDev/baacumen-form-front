import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  LinearProgress,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Form, useParams } from "react-router-dom";

import { useMemo, useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Formik } from "formik";

export default function FormResponse() {
  const { formId } = useParams();
  const { instanceId } = useParams();
  const { isLoading, isError, data } = useQuery({
    retry: false,
    queryKey: ["forms_instances"],

    queryFn: async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/forms/${formId}/instances/${instanceId}`
      );
      return response.data;
    },
  }) as UseQueryResult;

  const instance: FormInstance | null = useMemo(
    function () {
      if (!data) {
        return null;
      }

      return (
        data as {
          data: {
            form_instance: FormInstance;
          };
        }
      ).data.form_instance;
    },
    [data]
  );

  const initialValues: { [key: string]: string | string[] } | undefined =
    useMemo(
      function () {
        if (!instance) return;

        const result: { [key: string]: string | string[] } = {};
        instance.form.fields.forEach((fld) => {
          if (!fld.id) return;
          if (fld.type == "checkbox") {
            result[`${fld.id} `] = [];
          } else {
            result[`${fld.id} `] = "";
          }
        });

        return result;
      },

      [instance]
    );

  const [showThankYou, setShowThankYou] = useState(false);
  return (
    <>
      {isLoading && <LinearProgress />}

      {isError && !isLoading && (
        <Typography variant="h1" color="error">
          Error Loading Form
        </Typography>
      )}

      {instance && initialValues && (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            await axios.post(
              `${
                import.meta.env.VITE_APP_BACKEND_URL
              }/form_response/${instanceId}`,
              {
                ...values,
              }
            );
            setShowThankYou(true);
          }}
        >
          {function (formik) {
            const { handleChange, handleBlur, values, errors } = formik;

            console.log("iii", values);
            console.log(errors);
            return (
              <Form>
                <Stack spacing={2}>
                  <Typography variant="h3"> {instance.form.name} </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {instance.form.description}{" "}
                  </Typography>
                  <Stack spacing={2}>
                    {instance.form.fields.map((fld) => {
                      const normalFieldNames: FormField["type"][] = [
                        "date",
                        "number",
                        "textarea",
                        "text",
                      ];
                      if (normalFieldNames.includes(fld.type)) {
                        return (
                          <FormControl>
                            <TextField
                              size="small"
                              multiline={fld.type == "textarea"}
                              rows={4}
                              name={`${fld.id}`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values[`${fld.id}`]}
                              label={fld.title}
                              type={fld.type}
                            />
                          </FormControl>
                        );
                      } else {
                        if (fld.type == "radio") {
                          return (
                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                {fld.title}
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name={`${fld.id}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                {fld.options?.map((opt) => {
                                  return (
                                    <FormControlLabel
                                      value={opt.label}
                                      control={<Radio />}
                                      label={opt.label}
                                    />
                                  );
                                })}
                              </RadioGroup>
                            </FormControl>
                          );
                        }

                        if (fld.type == "checkbox") {
                          return (
                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                {fld.title}
                              </FormLabel>
                              <FormGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                onChange={handleChange}
                              >
                                {fld.options?.map((opt) => {
                                  return (
                                    <FormControlLabel
                                      value={opt.label}
                                      name={`${fld.id}`}
                                      control={<Switch />}
                                      onChange={handleChange}
                                      checked={values[`${fld.id}`][opt.label]}
                                      label={opt.label}
                                    />
                                  );
                                })}
                              </FormGroup>
                            </FormControl>
                          );
                        }
                      }
                    })}
                  </Stack>
                  <Stack>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={formik.submitForm}
                    >
                      Respond
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      )}

      {showThankYou && (
        <Modal
          open={showThankYou}
          onClose={() => {}}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              height: "90%",
              width: "90%",
            }}
          >
            <Stack
              sx={{ height: "100%" }}
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h3"> Thank You </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  window.location.reload();
                }}
              >
                {" "}
                Submit Again{" "}
              </Button>
            </Stack>
          </Paper>
        </Modal>
      )}
    </>
  );
}
