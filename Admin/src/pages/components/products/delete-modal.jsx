import { deleteProductApi, getProducts } from "@/api/products";
import { Button, DeleteActionButton } from "@/components/ui/buttons";
import { Dialog } from "@/components/ui/dialog";
import { useAlert } from "@/utils/hooks/use-alert";
import { useState } from "react";

export const DeleteProductsModal = ({ id, getProducts, setProducts }) => {
  const [toggleDialog, setToggleDialog] = useState(false);
  const { errorAlert, successAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleDialog = () => setToggleDialog(!toggleDialog);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProductApi(id);
      const products = await getProducts();
      setProducts(products);
      handleToggleDialog();
      successAlert("Product Deleted successfully!");
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
        title="Delete Product ?"
        closeable={isLoading}
      >
        <p>
          Are you sure to delete this product? Press Delete to confirm your
          action.
        </p>
        <div className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            onClick={handleToggleDialog}
            disabled={isLoading}
            color="outline-primary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={handleDelete}
            color="error"
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
};
