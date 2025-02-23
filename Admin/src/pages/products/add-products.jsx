import Dropzone from "react-dropzone";
import Select from "react-select";
import * as yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/buttons";
import { FORM_MODE } from "@/utils/form-mode";
import { useQuery } from "@/utils/hooks";
import { getSizesOptionsApi } from "@/api/sizes";
import { createProduct } from "@/api/products";
import { useAlert } from "@/utils/hooks/use-alert";
import { useNavigate } from "react-router-dom";
import { ProductsForm } from "../components/products";

const defaultValues = {
  title: "",
  description: "",
  sizesAndPrices: [
    {
      price: "",
      size: null,
    },
  ],
  image: null,
};

// Pizza Form Schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  sizesAndPrices: yup.array().of(
    yup.object().shape({
      price: yup
        .number()
        .required("Price is required")
        .positive()
        .typeError("Price is required!"),
      size: yup.object().required("Size is required").nullable(),
    })
  ),
  image: yup.mixed().required("Image is required"),
});

const AddProductsPage = () => {
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

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("sizesAndPrices", JSON.stringify(data.sizesAndPrices));
      formData.append("image", data.image);

      const res = await createProduct(formData);
      successAlert(res?.message ?? "Created!");
      navigate("/home/products");
    } catch (error) {
      errorAlert(error ?? "Runtime error!");
    }
  };
  return (
    <div>
      <h2 className="text-xl mb-4">Add New Pizza</h2>
      {/* Title */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 m-5"
      >
        <ProductsForm
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

export default AddProductsPage;
