import { getSizesByIdApi } from "@/api/sizes";
import { Button } from "@/components/ui/buttons";
import { useQuery } from "@/utils/hooks";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/ui/error";
import { useDropzone } from "react-dropzone";

export const SizesForm = ({
  control,

  errors,
  isSubmitting,
}) => {
  const { data, isLoading } = useQuery({
    queryFn: getSizesByIdApi,
  });

  return (
    <>
      {" "}
      {/* Sizes Name */}
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full bg-card"
              placeholder="Size name"
            />
          )}
        />
        <ErrorMessage message={errors.name?.message} />
      </div>
      {/* Description */}
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full bg-card"
              placeholder="Description"
            />
          )}
        />
        <ErrorMessage message={errors.description?.message} />
      </div>
    </>
  );
};
