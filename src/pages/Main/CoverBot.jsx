import { useState, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";

import TextInput from "../../components/UI/TextInput";
import TitleText from "../../components/UI/TitleText";
import SelectInput from "../../components/UI/SelectInput";
import FormWrapper from "../../components/UI/FormWrapper";
import AppButton from "../../components/UI/AppButton";
import axiosInstance from "../../api/axiosInstance";
import { showToast } from "../../components/Utils/sweetToast";
import Swal from "sweetalert2";
import { supabase } from "../../api/supabaseClient";
import { toSnakeCase } from "../../components/Utils/formatters";
import { downloadDocx } from "../../components/Utils/downloadDocx";
import TextArea from "../../components/UI/TextArea";
import CheckboxLabel from "../../components/UI/CheckBoxLabel";

const CoverBot = () => {
  const [isFreshGrad, setIsFreshGrad] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Cover Bot";
  }, []);

  // ✅ Dynamic validation schema based on isFreshGrad
  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      jobTitle: Yup.string().required("Job Title is required"),
      companyName: Yup.string().required("Company Name is required"),
      skills: Yup.string().required("Skills is required"),
      experience: isFreshGrad
        ? Yup.string().notRequired()
        : Yup.string().required("Experience is required"),
      freshGraduate: Yup.boolean(),
      tone: Yup.string().required("Tone is required"),
    });
  }, [isFreshGrad]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isFreshGrad) {
      setValue("experience", ""); // ✅ Clear it if hidden
    }
  }, [isFreshGrad, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = toSnakeCase(data);
      const response = await axiosInstance.post(
        "/webhook-test/convert",
        payload
      );
      console.log("Server response:", response.data.message.content);

      const coverLetter = response.data.message.content;
      console.log("Generated Cover Letter:", payload);

      // Download Word file
      await downloadDocx(coverLetter);

      showToast("success", "Your cover letter has been generated!");

      reset();
      setIsFreshGrad(false); // Optional: reset checkbox
    } catch (error) {
      console.error("Error generating the cover letter:", error);
      // ❌ Show error toast
      showToast("error", "Failed to generate cover letter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-12 mb-12">
      <FormWrapper
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col text-gray-700 bg-white shadow-md w-[32rem] rounded-xl bg-clip-border"
      >
        <div className="flex items-center gap-8 my-8 ml-10">
          <img
            className="h-20 w-20 object-cover object-center rounded-full"
            src="https://picsum.photos/100"
            alt="Sample"
          />
          <div>
            <TitleText
              variant="h3"
              color="blue-gray"
              className="block font-sans text-4xl antialiased font-semibold leading-tight tracking-normal text-blue-gray-900"
            >
              Cover Bot
            </TitleText>
            <TitleText
              variant="small"
              color="blue-gray"
              className="block font-sans text-base antialiased leading-tight tracking-normal text-blue-gray-700 mt-2"
            >
              Your personal assistant for job-winning cover letters.
            </TitleText>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="relative h-11 w-full min-w-[200px] mb-5">
            <TextInput
              label="Your Name"
              name="name"
              type="text"
              {...register("name")}
              error={!!errors.name}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="relative h-11 w-full min-w-[200px] mb-5">
            <TextInput
              label="Job Title"
              name="jobTitle"
              {...register("jobTitle")}
              error={!!errors.jobTitle}
              errorMessage={errors.jobTitle?.message}
            />
          </div>

          <div className="relative h-11 w-full min-w-[200px] mb-5">
            <TextInput
              label="Company Name"
              name="companyName"
              type="text"
              {...register("companyName")}
              error={!!errors.companyName}
              errorMessage={errors.companyName?.message}
            />
          </div>
          <div className="relative h-11 w-full min-w-[200px] mb-5">
            <TextInput
              label="Skills"
              name="skills"
              type="text"
              {...register("skills")}
              error={!!errors.skills}
              errorMessage={errors.skills?.message}
            />
          </div>
          {!isFreshGrad && (
            <div className="relative w-full min-w-[200px] mb-5">
              <TextArea
                name="experience"
                label="Experience"
                {...register("experience")}
                error={errors.experience}
              />
            </div>
          )}

          <div className="mb-5 -mt-2">
            <Controller
              name="freshGraduate"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CheckboxLabel
                  label="I am a fresh graduate with no work experience"
                  name="freshGraduate"
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked); // register with react-hook-form
                    setIsFreshGrad(e.target.checked); // update local state for Yup schema
                  }}
                  color="blue"
                />
              )}
            />
          </div>

          <div className="relative h-11 w-full min-w-[200px] mb-5">
            <Controller
              name="tone"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label="Tone"
                  options={[
                    { label: "Formal", value: "formal" },
                    { label: "Friendly", value: "friendly" },
                    { label: "Persuasive", value: "persuasive" },
                    { label: "Professional", value: "professional" },
                  ]}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  error={!!errors.tone}
                  errorMessage={errors.tone?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="p-6 pt-3">
          <AppButton
            className="bg-blue-800 hover:bg-blue-900 text-white"
            type="submit"
            loading={loading} // Pass loading state
          >
            Submit
          </AppButton>
        </div>
      </FormWrapper>
    </div>
  );
};

export default CoverBot;
