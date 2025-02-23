import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAlert } from "@/utils/hooks/use-alert";
import { getSizesByIdApi, updateSizesApi } from "@/api/sizes";
import { Button } from "@/components/ui/buttons";
import { useNavigate } from "react-router-dom";
import { FORM_MODE } from "@/utils/form-mode";
import { useQuery } from "@/utils/hooks";
import { SizesForm } from "../components/sizes/sizesForm";

const defaultValues = {
  name: "",
  description: "",
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

function EditSizes() {
  const { id } = useParams();
  const { errorAlert, successAlert } = useAlert();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryFn: () => getSizesByIdApi(id),
    enabled: Boolean(id), // if id exists it gives a true value else it gives a false value,
  });

  const {
    control,
    reset,
    handleSubmit,
    register,
    setValue,
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
      });
    }
  }, [data]);

  const onSubmitHandler = async (values) => {
    try {
      const res = await updateSizesApi(id, values);
      successAlert(res?.message ?? "Size updated successfully!");
      navigate("/home/sizes");
    } catch (error) {
      errorAlert(error ?? "Runtime error!");
    }
  };

  return (
    <div className="flex flex-col gap-4 py-5">
      <h3 className="text-2xl font-semibold">Edit Crust</h3>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="bg-card p-5 shadow rounded-lg"
      >
        <SizesForm
          control={control}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          setValue={setValue}
        />
        <div className="flex justify-center items-center pt-6">
          <Button
            disabled={isSubmitting}
            type="submit"
            color="outline-primary"
            className="self-center flex items-center"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditSizes;
