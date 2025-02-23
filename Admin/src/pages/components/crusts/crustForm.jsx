import { Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/ui/error";
import { useDropzone } from "react-dropzone";
import ReactSelect from "react-select";
import { useQuery } from "@/utils/hooks";
import { getSizesOptionsApi } from "@/api/sizes";

export const CrustForm = ({
  control,
  register,
  errors,
  isSubmitting,
  setValue,
  image = null,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const { data: sizesOptions = [], isLoading } = useQuery({
    queryFn: getSizesOptionsApi,
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  function onDrop(acceptedFiles) {
    const file = acceptedFiles[0];
    setImagePreview(file);
    setValue("image", file);
  }

  useEffect(() => {
    if (image && !imagePreview) {
      setImagePreview(`http://localhost:5000/uploads/${image}`);
    }
  }, [image]);

  return (
    <>
      {" "}
      {/* Crust Name */}
      <div className="mb-4">
        <label className="block mb-2">Crust Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full bg-card"
              placeholder="Crust name"
            />
          )}
        />
        <ErrorMessage message={errors.name?.message} />
      </div>
      {/* Nutrition Facts */}
      <div className="mb-4">
        <label className="block mb-2">Nutrition Facts</label>
        <Controller
          name="nutritionFacts"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full bg-card"
              placeholder="Nutrition facts"
            />
          )}
        />
        <ErrorMessage message={errors.nutritionFacts?.message} />
      </div>
      {/* Description */}
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="border p-2 w-full bg-card"
              placeholder="Description"
            />
          )}
        />
        <ErrorMessage message={errors.description?.message} />
      </div>
      <div className="mb-4">
        <label>Sizes</label>
        <Controller
          name="sizes"
          control={control}
          render={({ field }) => (
            <ReactSelect
              isMulti
              {...field}
              options={sizesOptions}
              isLoading={isLoading}
              placeholder="Select multiple sizes ..."
            />
          )}
        />
        <ErrorMessage message={errors.sizes?.message} />
      </div>
      {/* Addon Price */}
      <div className="mb-4">
        <label className="block mb-2">Addon Price</label>
        <Controller
          name="addonPrice"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="border p-2 w-full bg-card"
              placeholder="Addon price"
            />
          )}
        />
        <ErrorMessage message={errors.addonPrice?.message} />
      </div>
      {/* Image Upload */}
      <div className="mb-4">
        <label className="block mb-2">Image Upload</label>
        <div
          {...getRootProps()}
          className="border p-2 w-full bg-card cursor-pointer flex flex-col items-center justify-center"
        >
          <input {...getInputProps()} />
          <p className="text-card-foreground p-12">
            Drag and drop an image here, or click to select one
          </p>
          {imagePreview && (
            <img
              src={
                typeof imagePreview == "string"
                  ? imagePreview
                  : URL.createObjectURL(imagePreview)
              }
              onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover"
            />
          )}
        </div>
        <ErrorMessage message={errors.image?.message} />
      </div>
    </>
  );
};
