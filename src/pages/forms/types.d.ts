type Form = {
  id: number;
  name: string;
  data: {
    fields: [
      {
        type: "text" | "number" | "textarea";
        name: string;
        options?: {
          label: string;
          value: string;
        }[];
      }
    ];
    action: string;
  };
  created_at: string;
  updated_at: string;
};
