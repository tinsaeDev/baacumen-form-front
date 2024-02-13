import {
  AddBox,
  CheckBoxOutlineBlank,
  CopyAll,
  Delete,
  RadioButtonUnchecked,
  Remove,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";

import { FormikProps } from "formik";

export default function FormField(props: {
  formik: FormikProps<FormObject>;
  i: number;
  onNew: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) {
  const { formik, i } = props;
  const { values, handleBlur, handleChange } = formik;

  function FieldType() {
    return (
      <Select
        fullWidth
        label="Field Type"
        value={values.data.fields[i].type}
        name={`data.fields[${i}].type`}
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
  const type = values.data.fields[i].type;
  const title = values.data.fields[i].title;
  const name = values.data.fields[i].name;
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
                  name={`data.fields[${i}].title`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    minWidth: "200PX",
                  }}
                />
              </FormControl>

              <FormControl fullWidth size="small">
                {/* <FormLabel> Field Type </FormLabel> */}
                <FieldType />
              </FormControl>
            </Stack>
            <Stack mt={1}>
              {/* Text Field */}
              {type == "text" && (
                <TextField label={title} size="small" name={name} disabled />
              )}

              {/* Text Field */}
              {type == "number" && (
                <TextField
                  label={title}
                  type="number"
                  size="small"
                  name={name}
                />
              )}

              {/* Text Field */}
              {type == "textarea" && (
                <TextField
                  multiline
                  rows={4}
                  label={title}
                  size="small"
                  name={name}
                  disabled
                />
              )}

              {/* Text Field */}
              {type == "date" && (
                <TextField
                  rows={4}
                  placeholder={title}
                  size="small"
                  name={name}
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
                      {values.data.fields[i].options?.map((op, oi) => {
                        return (
                          <FormControl>
                            <TextField
                              size="small"
                              value={op.label}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name={`data.fields[${i}].options[${oi}].label`}
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
                                        values.data.fields[i].options?.splice(
                                          oi,
                                          1
                                        );

                                        formik.setFieldValue(
                                          `values.data`,
                                          values.data
                                        );
                                      }}
                                    >
                                      <Remove />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        );
                      })}
                    </Stack>

                    <Button
                      size="small"
                      onClick={() => {
                        values.data.fields[i].options?.push({
                          label: "Option",
                          value: "",
                        });

                        formik.setFieldValue(`values.data`, values.data);
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
                      {values.data.fields[i].options?.map((op, oi) => {
                        return (
                          <TextField
                            size="small"
                            value={op.label}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={`data.fields[${i}].options[${oi}].label`}
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
                                      values.data.fields[i].options?.splice(
                                        oi,
                                        1
                                      );

                                      formik.setFieldValue(
                                        `values.data`,
                                        values.data
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
                        values.data.fields[i].options?.push({
                          label: "Option",
                          value: "",
                        });

                        formik.setFieldValue(`values.data`, values.data);
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
            <IconButton onClick={props.onCopy}>
              <CopyAll />
            </IconButton>
            <IconButton onClick={props.onDelete}>
              <Delete />
            </IconButton>
            <IconButton onClick={props.onNew}>
              <AddBox />
            </IconButton>
            <Divider orientation="vertical" />
            <Switch />
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}
