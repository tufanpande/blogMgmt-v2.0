import Swal from "sweetalert2";

export const ConfirmDelete = async ({
  title,
  text,
  icon = "warning",
  dispatch,
  fn,
  slug,
}) => {
  const result = await Swal.fire({
    title: title || "Are you sure?",
    text: text || "You won't be able to revert this!",
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  if (result?.isConfirmed) {
    dispatch(fn(slug));
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
    });
  }
  return result;
};
