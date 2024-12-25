import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./GeneralInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";
import WorkExperiencesForm from "./WorkExperiencesForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "General info",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personal info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Work Experiences",
    component: WorkExperiencesForm,
    key: "work-experience",
  },
];
