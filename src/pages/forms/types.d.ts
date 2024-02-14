type FormObject = {
  id: number;
  name: string;
  description: string;
  fields: FormField[];

  created_at: string;
  updated_at: string;
};

type FormField = {
  id?: number;
  type: "text" | "number" | "textarea" | "checkbox" | "radio" | "date";
  title: string;

  validation: {
    min?: number;
    max?: number;
    required_field: boolean;
    regex?: string;
  };
  options?: {
    label: string;
  }[];
};

type FormInstance = {
  id: number;
  name: string;
  form: FormObject;
  response: FormResponse[];
};

type FormResponse = {
  id: number;
  label: string;
  answer: string;
};
