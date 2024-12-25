import { resumeSchemaValues } from "./schema";

export interface EditorFormProps {
  resumeData: resumeSchemaValues;
  setResumeData: (data: resumeSchemaValues) => void;
}
