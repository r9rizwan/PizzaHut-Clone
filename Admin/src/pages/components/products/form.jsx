import { getSizesOptionsApi } from "@/api/sizes";
import { Button } from "@/components/ui/buttons";
import { useQuery } from "@/utils/hooks";
import Select from "react-select";
import { Controller, useFieldArray } from "react-hook-form";
import { cn } from "@/utils/cn";
import { IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/ui/error";
import { useDropzone } from "react-dropzone";

export const ProductsForm = ({
  control,
  register,
  errors,
  isSubmitting,
  setValue,
  image = null,
}) => {
  const { data, isLoading } = useQuery({ queryFn: getSizesOptionsApi });
  const [imagePreview, setImagePreview] = useState(null);

  // useFieldArray for managing dynamic fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizesAndPrices",
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
      <div className="w-full">
        <label>Title</label>
        <input
          {...register("title")}
          className="p-2 w-full rounded-lg border-2 bg-card"
          placeholder="Pizza title"
        />
        {errors.title && <p className="text-error">{errors.title.message}</p>}
      </div>

      {/* Dynamic Fields: Price and Size */}
      {fields.map((item, index) => {
        const errorOnInput = Object.values(
          errors.sizesAndPrices?.[index] ?? {}
        ).some((value) => value);
        return (
          <div key={item.id} className="flex items-start gap-5 relative">
            {/* Price */}
            <div className="w-full">
              <label>Price</label>
              <input
                type="number"
                step="0.01"
                {...register(`sizesAndPrices.${index}.price`, {
                  valueAsNumber: true,
                })}
                className="p-2 w-full border-2 rounded-lg bg-card"
                placeholder="Enter Price"
                defaultValue={item.price ?? ""}
              />
              {errors.sizesAndPrices?.[index]?.price && (
                <p className="text-error">
                  {errors.sizesAndPrices[index].price.message}
                </p>
              )}
            </div>

            {/* Sizes - Adjusting to use sizeId for name */}
            <div className="w-full">
              <label>Size</label>
              <Controller
                name={`sizesAndPrices.${index}.size`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={data}
                    isLoading={isLoading}
                    placeholder="Select size"
                    className="bg-card border-2"
                  />
                )}
              />
              {errors.sizesAndPrices?.[index]?.size && (
                <p className="text-error">
                  {errors.sizesAndPrices[index].size.message}
                </p>
              )}
            </div>

            {/* Delete button for rows other than the first */}
            {fields.length > 1 && (
              <Button
                type="button"
                color="error"
                disabled={isSubmitting}
                onClick={() => remove(index)}
                className={cn(
                  "bg-background text-error hover:bg-red-300 px-1.5 rounded-lg",
                  errorOnInput ? "self-center" : "self-end"
                )}>
                <IconTrash />
              </Button>
            )}
          </div>
        );
      })}

      {/* Add More button */}
      {fields.length < 5 && (
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => append({ price: "", size: null })}
          className="self-end text-sm bg-primary text-wrap">
          Add More
        </Button>
      )}

      {/* Description */}
      <div className=" mt-4">
        <label>Description</label>
        <textarea
          {...register("description")}
          className="p-2 rounded-lg border-2 w-full bg-card"
          placeholder="Pizza description"
        />
        {errors.description && (
          <p className="text-error">{errors.description.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block mb-2">Image Upload</label>
        <div
          {...getRootProps()}
          className="border p-2 w-full bg-card cursor-pointer flex flex-col items-center justify-center">
          <input {...getInputProps()} />
          <p className="text-card-foreground p-12">
            Drag and drop an image here, or click to select one
          </p>
          {imagePreview && (
            <img
              src={
                typeof imagePreview === "string"
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
