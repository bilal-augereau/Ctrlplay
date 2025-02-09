interface Comment {
	id: number;
	user_id: number;
	pseudo: string;
	avatar: string;
	content: string;
	created_at: string;
}

const API_URL = "http://localhost:3310/api/comments";
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
};

export default commentService;
