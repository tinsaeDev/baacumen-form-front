import { Add, CopyAll, Delete, Preview, Save } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Fab,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Toolbar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Form, Formik, FormikProps } from "formik";

export default function FormEditor() {
  const { id } = useParams();

  const mockLoadedData: FormObject = {
    name: "Survey 1",
    description: "Survey 1",
    created_at: "Last Week",
    updated_at: "Morning",
    data: {
      action: "https://localhost:8000/api/form",
      fields: [
        {
          name: "What is your full name",
          type: "text",
        },
      ],
    },
    id: 1,
  };

  return (
    <>
      <Formik
        initialValues={mockLoadedData}
        onSubmit={(values) => {
          console.log("VVVVVVVVVVV", values);
        }}
      >
        {function (formik) {
          const { values, errors, touched, handleBlur, handleChange } = formik;
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
                      <IconButton>
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

                      {values.data.fields.map((_f, i) => {
                        return <FormField formik={formik} i={i} />;
                      })}
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

function FormField(props: { formik: FormikProps<FormObject>; i: number }) {
  const { formik, i } = props;
  const { values, errors, touched, handleBlur, handleChange } = formik;

  function FieldType() {
    const type = values.data.fields[i].type;

    if (type == "text")
      return (
        <Select
          fullWidth
          label="Field Type"
          name={`values.data.fields[${i}].type`}
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
                  value={values.data.fields[i].name}
                  name={`data.fields[${i}].name`}
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
            <Stack>


                  

            </Stack>
          </Stack>
        </CardContent>

        <CardActions>
          <Stack flexGrow={1} direction="row" justifyContent="flex-end">
            <IconButton>
              <CopyAll />
            </IconButton>
            <IconButton>
              <Delete />
            </IconButton>
            <Divider orientation="vertical" />
            <Switch />
          </Stack>
        </CardActions>
      </Card>
      <Stack
        sx={{
          // background:"red",
          position: "absolute",
          bottom: "-1rem",
          right: "-2rem",
        }}
      >
        <Fab size="small" color="info">
          <IconButton>
            <Add />
          </IconButton>
        </Fab>
      </Stack>
    </div>
  );
}
