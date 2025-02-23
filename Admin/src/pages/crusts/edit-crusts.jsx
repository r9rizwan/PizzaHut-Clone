import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAlert } from "@/utils/hooks/use-alert";
import { getCrustByIdApi, updateCrustApi } from "@/api/crusts";
import { CrustForm } from "../components/crusts";
import { Button } from "@/components/ui/buttons";
import { useNavigate } from "react-router-dom";
import { FORM_MODE } from "@/utils/form-mode";
import { useQuery } from "@/utils/hooks";

const defaultValues = {
  name: "",
  description: "",
  sizes: [],
  addonPrice: "",
  image: null,
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  sizes: yup.array().min(1, "Minimum 1 option is required!"),
  addonPrice: yup
    .number()
    .required("Addon Price is required")

    .typeError("Addon Price is required"),
  image: yup.mixed().required("Image is required"),
});

function EditCrust() {
  const { id } = useParams();
  const { errorAlert, successAlert } = useAlert();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getCrustByIdApi(id),
    enabled: Boolean(id), // if id exists it gives a true value else it gives a false value,
  });

  const {
    control,
    reset,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: FORM_MODE,
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      reset({
        id: data._id,
        name: data.name,
        description: data.description,
        sizes: data.sizes,
        addonPrice: data.addonPrice,
        image: data.image,
        nutritionFacts: data.nutritionFacts,
      });
    }
  }, [data]);

  const onSubmitHandler = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("nutritionFacts", values.nutritionFacts);
      formData.append("sizes", JSON.stringify(values.sizes));
      formData.append("addonPrice", values.addonPrice);
      if (values.image instanceof File) formData.append("image", values.image);

      const res = await updateCrustApi(id, formData);
      successAlert(res?.message ?? "Crust updated successfully!");
      navigate("/home/crusts");
    } catch (error) {
      errorAlert(error ?? "Runtime error!");
    }
  };

  const image = watch("image");

  return (
    <div className="flex flex-col gap-4 py-5">
      <h3 className="text-2xl font-semibold">Edit Crust</h3>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="bg-card p-5 shadow rounded-lg">
        <CrustForm
          control={control}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          setValue={setValue}
          image={image}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          color="outline-primary"
          className="self-center flex items-center">
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditCrust;
