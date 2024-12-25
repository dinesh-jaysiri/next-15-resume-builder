import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./GeneralInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";
import WorkExperiencesForm from "./WorkExperiencesForm";
import EducationForm from "./EducationForm";

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

  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
];
