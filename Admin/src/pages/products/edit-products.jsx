import { getProductByIdApi, updateProductApi } from "@/api/products";
import { FORM_MODE } from "@/utils/form-mode";
import { useQuery } from "@/utils/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ProductsForm } from "../components/products";
import * as yup from "yup";
import { Button } from "@/components/ui/buttons";
import { useAlert } from "@/utils/hooks/use-alert";
import { useNavigate } from "react-router-dom";

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

function EditProducts() {
  const { id } = useParams();
  const { errorAlert, successAlert } = useAlert();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getProductByIdApi(id),
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
        title: data.title,
        description: data.description,
        sizesAndPrices: data.sizes.map((size) => ({
          price: size.price,
          size: {
            value: size.sizeId._id,
            label: size.sizeId.name,
          },
        })),
        image: data.image,
      });
    }
  }, [data]);

  const onSubmitHandler = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("sizesAndPrices", JSON.stringify(values.sizesAndPrices));
      if (values.image instanceof File) formData.append("image", values.image);

      const res = await updateProductApi(values.id, formData);
      successAlert(res?.message ?? "Updated!");
      navigate("/home/products");
    } catch (error) {
      errorAlert(error ?? "Runtime error!");
    }
  };

  const image = watch("image");

  return (
    <div className="flex flex-col gap-4 py-5">
      <h3 className="text-2xl font-semibold">Edit Product</h3>
      <form
        className="flex flex-col gap-4 bg-card p-5 shadow rounded-lg"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <ProductsForm
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
          className="self-center"
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditProducts;
