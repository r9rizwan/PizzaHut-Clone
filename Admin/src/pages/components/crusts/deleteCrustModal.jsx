import { deleteCrustApi, getCrusts } from "@/api/crusts";
import { Button, DeleteActionButton } from "@/components/ui/buttons";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { useAlert } from "@/utils/hooks/use-alert";

export const DeleteCrustModal = ({ id, setCrusts, getCrusts }) => {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { errorAlert, successAlert } = useAlert();

  const handleToggleDialog = () => setToggleDialog(!toggleDialog);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCrustApi(id);
      const crusts = await getCrusts();
      setCrusts(crusts);
      handleToggleDialog();
      successAlert("Crust deleted successfully!");
    } catch (error) {
      errorAlert(error ?? "Runtime Error!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DeleteActionButton onClick={handleToggleDialog} />
      <Dialog
        isOpen={toggleDialog}
        toggle={handleToggleDialog}
        title="Delete Crust?"
        closeable={isLoading}>
        <p>
          Are you sure you want to delete this crust? Press Delete to confirm
          your action.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={handleToggleDialog}
            disabled={isLoading}
            color="outline-primary">
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={handleDelete}
            color="error">
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
};
