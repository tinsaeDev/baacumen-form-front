type FormObject = {
  id: number;
  name: string;
  description: string;
  data: {
    fields: FormField[];
    action: string;
  };
  created_at: string;
  updated_at: string;
};

type FormField = {
  type: "text" | "number" | "textarea" | "checkbox" | "radio" | "date";
  title: string;

  validation: {
    min?: number;
    max?: number;
    required: boolean;
    regex?: string;
  };
  options?: {
    label: string;
  }[];
};
