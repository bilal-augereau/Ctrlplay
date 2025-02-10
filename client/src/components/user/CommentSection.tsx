import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UserContext";
import type { Comment, CommentSectionProps } from "../../types/comment.type";
import "./CommentSection.css";

const CommentSection = ({ gameId }: CommentSectionProps) => {
	const { user } = useAuth();
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [rating, setRating] = useState<number>(3);

	const fetchComments = useCallback(async () => {
		if (!user?.token) return;

		try {
			setIsLoading(true);
			const fetchedComments = await fetch(
				`http://localhost:3310/api/comments/${gameId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${user.token}`,
					},
				},
			).then((res) => {
				if (!res.ok) throw new Error("Failed to fetch comments");
				return res.json();
			});

			if (Array.isArray(fetchedComments)) {
				setComments(fetchedComments);
			}
		} catch (err) {
			console.error("Error loading comments:", err);
		} finally {
			setIsLoading(false);
		}
	}, [gameId, user?.token]);

	useEffect(() => {
		if (user) {
			fetchComments();
		}
	}, [fetchComments, user]);

	const handleCommentSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newComment.trim() || !user || isSubmitting) return;

		try {
			setIsSubmitting(true);
			const response = await fetch("http://localhost:3310/api/comments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${user.token}`,
				},
				body: JSON.stringify({
					user_id: user.id,
					game_id: gameId,
					content: newComment.trim(),
					rating,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to add comment");
			}

			const addedComment = await response.json();
			setComments((prevComments) => [
				{ ...addedComment, isNew: true },
				...prevComments,
			]);
			setNewComment("");
			setRating(3);
			toast.success("Comment added successfully!", { theme: "dark" });

			setTimeout(() => {
				setComments((prevComments) =>
					prevComments.map((comment) =>
						comment.id === addedComment.id
							? { ...comment, isNew: false }
							: comment,
					),
				);
			}, 300);
			fetchComments();
		} catch (err) {
			toast.error("Failed to add comment", { theme: "dark" });
			console.error("Error adding comment:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteComment = async (commentId: number) => {
		if (!user) return;

		try {
			await fetch(`http://localhost:3310/api/comments/${commentId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${user.token}`,
				},
			});

			setComments((prevComments) =>
				prevComments.filter((comment) => comment.id !== commentId),
			);
			toast.success("Comment deleted successfully!", { theme: "dark" });
			fetchComments();
		} catch (err) {
			toast.error("Failed to delete comment", { theme: "dark" });
			console.error("Error deleting comment:", err);
			fetchComments();
		}
	};

	const ratingComments: { [key: number]: string } = {
		1: "Very bad",
		2: "Bad",
		3: "Average",
		4: "Good",
		5: "Very good",
	};

	if (isLoading && user) {
		return <div className="content-box">Loading comments...</div>;
	}

	return (
		<section className="content-box" id="comments-box">
			<h2 className="title" id="commenttitle">
				Comments
			</h2>

			{user ? (
				<form onSubmit={handleCommentSubmit} className="comment-form">
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="Write a comment..."
						required
						disabled={isSubmitting}
						className="textarea"
					/>
					<div id="rating">
						<label htmlFor="rating">Rating:</label>
					</div>
					<select
						id="rating"
						value={rating}
						onChange={(e) => setRating(Number(e.target.value))}
						disabled={isSubmitting}
					>
						{[1, 2, 3, 4, 5].map((num) => (
							<option key={num} value={num}>
								{"⭐".repeat(num)} - {ratingComments[num]}
							</option>
						))}
					</select>
					<button
						type="submit"
						className="beautiful-button"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Sending..." : "Post"}
					</button>
				</form>
			) : (
				<p className="login-message">Please log in to see or add comments</p>
			)}

			{comments.length === 0 && user ? (
				<p className="no-comments">No comments yet</p>
			) : (
				<ul className="comments-list">
					{comments.map((comment) => (
						<li
							key={comment.id}
							className={`comment ${comment.isNew ? "comment-new" : ""}`}
						>
							<div className="comment-header">
								<div className="comment-content">
									<strong className="comment-user">{comment.pseudo}</strong>
									<p className="comment-text">{comment.content}</p>
									<p className="comment-rating">
										Rating: {"⭐".repeat(comment.rating)}
									</p>
								</div>
								{user && user.id === comment.user_id && (
									<button
										type="button"
										onClick={() => handleDeleteComment(comment.id)}
										className="beautiful-buttonadd"
										id="delete-comment"
										aria-label="Delete comment"
									>
										❌
									</button>
								)}
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

export default CommentSection;
