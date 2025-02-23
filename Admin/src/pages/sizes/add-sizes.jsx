import { useNavigate } from "react-router-dom";
import { useAlert } from "@/utils/hooks/use-alert";
import { SizesForm } from "../components/sizes/sizesForm";
import { createSizes } from "@/api/sizes";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/buttons";
import { FORM_MODE } from "@/utils/form-mode";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  name: "",
  description: "",
};

const schema = yup.object().shape({
  name: yup.string().required("Crust name is required"),
  description: yup.string().required("Description is required"),
});

const AddSizes = () => {
  const { successAlert, errorAlert } = useAlert();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    mode: FORM_MODE,
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await createSizes(data);
      successAlert(res?.message ?? "Size Data created successfully!");
      navigate("/home/sizes");
    } catch (error) {
      errorAlert(error ?? "Runtime error!");
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Add New Crust Here</h2>
      {/* Title */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 m-5"
      >
        <SizesForm
          control={control}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          setValue={setValue}
        />
        <Button disabled={isSubmitting} type="submit" className="bg-primary">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default AddSizes;
