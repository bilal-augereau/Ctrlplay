import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import unmarked from "../../assets/images/button_icons/wishempty.png";
import marked from "../../assets/images/button_icons/wishfull.png";
import { useAuth } from "../../context/UserContext";

const WishlistButton = ({ gameId }: { gameId: number }) => {
	const [isInWishlist, setIsInWishlist] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		if (isInWishlist) setIsInWishlist(true);
	}, [isInWishlist]);

	useEffect(() => {
		const checkWishlist = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/wishlist/${userId}/${gameId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `${user?.token}`,
						},
					},
				);
				const { exists } = await response.json();
				setIsInWishlist(exists);
			} catch (err) {
				toast.error("Erreur:  Unable to check game status.", {
					theme: "dark",
				});
			}
		};

		checkWishlist();
	}, [gameId, user]);

	const userId = user?.id;

	const handleToggleWishlist = async () => {
		try {
			let response: Response;
			if (isInWishlist) {
				response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/wishlist/${userId}/${gameId}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `${user?.token}`,
						},
					},
				);
			} else {
				response = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${user?.token}`,
					},
					body: JSON.stringify({ userId, gameId }),
				});
			}

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update wishlist.");
			}

			setIsInWishlist(!isInWishlist);
			toast.success(
				`Game ${isInWishlist ? "removed from" : "added to"} your wishlist successfully.`,
				{ theme: "dark" },
			);
		} catch (err) {
			toast.error("This is not working", { theme: "dark" });
		}
	};

	return (
		<button
			type="button"
			onClick={handleToggleWishlist}
			className="beautiful-buttonadd mobile-none"
			title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
		>
			<img
				src={isInWishlist ? marked : unmarked}
				alt={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
			/>
		</button>
	);
};

export default WishlistButton;
