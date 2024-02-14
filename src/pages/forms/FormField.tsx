import {
  AddBox,
  ArrowDownward,
  CheckBoxOutlineBlank,
  CopyAll,
  Delete,
  RadioButtonUnchecked,
  Remove,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { FormikProps, getIn } from "formik";
import { FormRequest } from "./FormEditor";

export default function FormField(props: {
  formik: FormikProps<FormRequest>;
  i: number;
  onNew: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) {
  const { formik, i } = props;
  const { values, errors, handleBlur, handleChange } = formik;

  function FieldType() {
    return (
      <Select
        fullWidth
        label="Field Type"
        value={values.fields[i].type}
        name={`fields[${i}].type`}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <MenuItem value="number">Number</MenuItem>
        <MenuItem value="text">Short Answer</MenuItem>
        <MenuItem value="textarea">Paragraph</MenuItem>
        <MenuItem value="checkbox">Multiple Choice</MenuItem>
        <MenuItem value="radio">Single Choice</MenuItem>
        <MenuItem value="date">Date</MenuItem>
      </Select>
    );
  }
  const type = values.fields[i].type;
  const title = values.fields[i].title;

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Card
        sx={{
          minWidth: "500px",
          maxWidth: "600px",
        }}
      >
        <CardContent>
          <Stack>
            <Stack spacing={2} direction="row" justifyContent="space-between">
              <FormControl fullWidth size="small">
                <TextField
                  size="small"
                  label="Question"
                  value={title}
                  name={`fields[${i}].title`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    minWidth: "200PX",
                  }}
                />
                <FormHelperText error>
                  {getIn(errors, `fields[${i}].title`)}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth size="small">
                <FieldType />
              </FormControl>
            </Stack>
            <Stack mt={1}>
              {/* Text Field */}
              {type == "text" && (
                <TextField label={title} size="small" disabled />
              )}

              {/* Text Field */}
              {type == "number" && (
                <TextField label={title} type="number" size="small" />
              )}

              {/* Text Field */}
              {type == "textarea" && (
                <TextField
                  multiline
                  rows={4}
                  label={title}
                  size="small"
                  disabled
                />
              )}

              {/* Text Field */}
              {type == "date" && (
                <TextField
                  rows={4}
                  placeholder={title}
                  size="small"
                  type="date"
                />
              )}

              {/* Text Field */}
              {type == "radio" && (
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    {title}
                  </FormLabel>
                  <Stack mt={2} spacing={2}>
                    <Stack spacing={2}>
                      {values.fields[i].options?.map((op, oi) => {
                        return (
                          <FormControl key={oi}>
                            <TextField
                              size="small"
                              value={op.label}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name={`fields[${i}].options[${oi}].label`}
                              variant="standard"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <RadioButtonUnchecked />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      color="warning"
                                      onClick={() => {
                                        values.fields[i].options?.splice(oi, 1);

                                        formik.setFieldValue(
                                          `values.fields`,
                                          values.fields
                                        );
                                      }}
                                    >
                                      <Remove />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <FormHelperText error>
                              {getIn(
                                errors,
                                `fields[${i}].options[${oi}].label`
                              )}
                            </FormHelperText>
                          </FormControl>
                        );
                      })}
                    </Stack>

                    <Button
                      size="small"
                      onClick={() => {
                        values.fields[i].options?.push({
                          label: "Option",
                        });

                        formik.setFieldValue(`values.fields`, values.fields);
                      }}
                    >
                      Add Option
                    </Button>
                  </Stack>
                </FormControl>
              )}

              {/* Text Field */}
              {type == "checkbox" && (
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    {title}
                  </FormLabel>
                  <Stack mt={2} spacing={2}>
                    <Stack spacing={2}>
                      {values.fields[i].options?.map((op, oi) => {
                        return (
                          <TextField
                            key={oi}
                            size="small"
                            value={op.label}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={`fields[${i}].options[${oi}].label`}
                            variant="standard"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CheckBoxOutlineBlank />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    color="warning"
                                    onClick={() => {
                                      values.fields[i].options?.splice(oi, 1);

                                      formik.setFieldValue(
                                        `values.fields`,
                                        values.fields
                                      );
                                    }}
                                  >
                                    <Remove />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        );
                      })}
                    </Stack>

                    <Button
                      size="small"
                      onClick={() => {
                        values.fields[i].options?.push({
                          label: "Option",
                        });

                        formik.setFieldValue(`values.fields`, values.fields);
                      }}
                    >
                      Add Option
                    </Button>
                  </Stack>
                </FormControl>
              )}
            </Stack>
          </Stack>
        </CardContent>

        <CardActions>
          <Stack flexGrow={1} direction="row" justifyContent="flex-end">
            <IconButton size="small" onClick={props.onCopy}>
              <CopyAll />
            </IconButton>
            <IconButton size="small" onClick={props.onDelete}>
              <Delete />
            </IconButton>
            <IconButton size="small" onClick={props.onNew}>
              <AddBox />
            </IconButton>
          </Stack>
        </CardActions>

        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownward />}>
            <Typography>Validations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              <Stack spacing={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  {values.fields[i].validation.required_field}
                  <FormControl fullWidth>
                    <FormControlLabel
                      label="Required Field"
                      control={
                        <Switch
                          name={`fields[${i}].validation.required_field`}
                          checked={values.fields[i].validation.required_field}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      }
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                      multiline
                      size="small"
                      label="Regex"
                      name={`fields[${i}].validation.regex`}
                      value={values.fields[i].validation.regex}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {values.fields[0].validation.regex}
                    <FormHelperText error>
                      {getIn(errors, `fields[${i}].validation.regex`)}
                    </FormHelperText>
                  </FormControl>
                </Stack>
              </Stack>

              {props.formik.values.fields[i].type == "number" && (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Minimum"
                      type="number"
                      name={`fields[${i}].validation.min`}
                      value={values.fields[i].validation.min}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Maximum"
                      type="number"
                      name={`fields[${i}].validation.max`}
                      value={values.fields[i].validation.max}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                </Stack>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Card>
    </div>
  );
}
