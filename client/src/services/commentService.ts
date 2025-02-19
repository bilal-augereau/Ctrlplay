import type { Comment } from "../types/comment.type";

const API_URL = `${import.meta.env.VITE_API_URL}/api/comments`;
const commentService = {
	getComments: async (gameId: number, token: string): Promise<Comment[]> => {
		try {
			const response = await fetch(`${API_URL}/${gameId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				console.error("Comments fetch failed:", {
					status: response.status,
					statusText: response.statusText,
				});
				throw new Error("Unauthorized");
			}

			const data = await response.json();
			if (!Array.isArray(data)) {
				throw new Error("Invalid response format");
			}

			return data;
		} catch (error) {
			console.error("GetComments error:", error);
			throw error;
		}
	},

	addComment: async (
		userId: number,
		gameId: number,
		content: string,
		token: string,
		rating: number,
	): Promise<Comment> => {
		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					user_id: userId,
					game_id: gameId,
					content: content.trim(),
					rating,
				}),
			});

			if (!response.ok) {
				console.error("Add comment failed:", {
					status: response.status,
					statusText: response.statusText,
				});
				throw new Error("Failed to add comment");
			}

			return await response.json();
		} catch (error) {
			console.error("AddComment error:", error);
			throw error;
		}
	},

	deleteComment: async (commentId: number, token: string): Promise<void> => {
		try {
			const response = await fetch(`${API_URL}/${commentId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				console.error("Delete comment failed:", {
					status: response.status,
					statusText: response.statusText,
				});
				throw new Error("Failed to delete comment");
			}
		} catch (error) {
			console.error("DeleteComment error:", error);
			throw error;
		}
	},
	getAverageRating: async (
		gameId: number,
	): Promise<{ averageRating: number }> => {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/comments/average-rating/${gameId}`,
		);

		if (!response.ok) {
			throw new Error("Failed to fetch user average rating");
		}

		return await response.json();
	},
};

export default commentService;
