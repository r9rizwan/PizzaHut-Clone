import { useNavigate } from "react-router-dom";
import { useAlert } from "@/utils/hooks/use-alert";
import { CrustForm } from "../components/crusts";
import { createCrust } from "@/api/crusts";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/buttons";
import { FORM_MODE } from "@/utils/form-mode";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  name: "",
  nutritionFacts: "",
  description: "",
  addonPrice: "",
  image: null,
};

const schema = yup.object().shape({
  name: yup.string().required("Crust name is required"),
  nutritionFacts: yup.string().required("Nutrition facts are required"),
  description: yup.string().required("Description is required"),
  addonPrice: yup.number().required("Addon price must be a positive number"),
  image: yup.mixed().required("Image is required"),
});

const AddCrusts = () => {
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
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("nutritionFacts", data.nutritionFacts);
      formData.append("description", data.description);
      formData.append("addonPrice", data.addonPrice);
      formData.append("image", data.image);
      formData.append("sizes", JSON.stringify(data.sizes));

      const res = await createCrust(formData);
      successAlert(res?.message ?? "Crust created successfully!");
      navigate("/home/crusts");
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
        className="flex flex-col gap-4 m-5">
        <CrustForm
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
export default AddCrusts;
