import { toast } from "react-toastify";

const AddToLibraryButton = ({
  userId,
  gameId,
}: {
  userId: number;
  gameId: number;
}) => {
  const addToLibrary = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/games/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, gameId }),
      });

      if (response.ok) {
        toast.success("Game added to user library successfully.", {
          theme: "dark",
        });
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message}` || "Something went wrong.", {
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("Error: Unable to connect to the server.", { theme: "dark" });
    }
  };

  return (
    <button
      type="button"
      onClick={addToLibrary}
      className="beautiful-buttonadd"
    >
      +
    </button>
  );
};

export default AddToLibraryButton;
