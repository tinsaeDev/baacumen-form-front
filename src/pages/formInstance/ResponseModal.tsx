import { Close } from "@mui/icons-material";
import {
  IconButton,
  LinearProgress,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { useMemo } from "react";

export default function ResponseModal(props: {
  onClose: () => void;
  formInstance: FormInstance;
}) {
  let columns: MUIDataTableColumn[] = [
    {
      name: "",
      label: "No",
      options: {
        customBodyRenderLite(dataIndex) {
          return dataIndex + 1;
        },
      },
    },
  ];

  props.formInstance.form.fields.forEach((fld) => {
    columns.push({
      name: `${fld.id}`,
      label: fld.title,
      options: {
        customBodyRender(_value, tableMeta) {
          if (!values) return;
          const row = values[tableMeta.rowIndex];
          const res = row[`${fld.id}`];

          if (Array.isArray(res)) {
            return res.join(",");
          }

          return res || "no val";
        },
      },
    });
  });

  columns = [
    ...columns,
    ...[
      {
        name: "",
        label: "Created at",
        options: {
          customBodyRender(value: string) {
            return moment(value).calendar();
          },
        },
      },
      {
        name: "",
        label: "Updated at",
        options: {
          customBodyRender(value: string) {
            return moment(value).calendar();
          },
        },
      },
    ],
  ];

  const { isLoading, isError, data } = useQuery({
    retry: false,
    queryKey: ["forms"],

    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/form_response/${
          props.formInstance.id
        }`
      );
      return response.data;
    },
  }) as UseQueryResult;

  const values: InstanceValue["values"][] | null = useMemo(
    function () {
      if (!data) {
        return null;
      }

      const t: InstanceValue[] = (
        data as {
          data: {
            values: InstanceValue[];
          };
        }
      ).data.values;

      return t.map((r) => r.values);
    },
    [data]
  );

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
              {isLoading && <LinearProgress />}

              {isError && (
                <Typography variant="h4"> Error LOading Responses </Typography>
              )}
              {values && (
                <MUIDataTable
                  title={`Responses - ${props.formInstance.name} - ${props.formInstance.form.name} `}
                  columns={columns}
                  options={{}}
                  data={values}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
}
