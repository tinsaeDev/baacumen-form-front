import { Close } from "@mui/icons-material";
import { IconButton, Modal, Paper, Stack, Typography } from "@mui/material";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";

export default function ResponseModal(props: {
  onClose: () => void;
  formInstance: FormInstance;
}) {
  let columns: MUIDataTableColumn[] = [
    {
      name: "",
      label: "No",
    },
  ];

  props.formInstance.form.fields.forEach((fld) => {
    columns.push({
      name: "",
      label: fld.title,
    });
  });

  columns = [
    ...columns,
    ...[
      {
        name: "",
        label: "Created at",
      },
      {
        name: "",
        label: "Updated at",
      },
    ],
  ];

  return (
    <Modal
      open={true}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          {/* Header */}
          <Stack
            p={2}
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="subtitle1" fontWeight="bold"></Typography>
            <IconButton onClick={props.onClose} color="error">
              <Close />
            </IconButton>
          </Stack>
          {/* Body */}

          <Stack sx={{}} flexGrow={1} p={2}>
            <Stack>
              <MUIDataTable
                title={`Responses - ${props.formInstance.name} - ${props.formInstance.form.name} `}
                columns={columns}
                options={{}}
                data={[]}
              />
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
}
