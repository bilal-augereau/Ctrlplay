export interface Comment {
	id: number;
	user_id: number;
	pseudo: string;
	avatar: string;
	content: string;
	created_at: string;
	isNew?: boolean;
	rating: number;
}

export interface CommentSectionProps {
	gameId: number;
	commentService: {
		getComments: (gameId: number, token: string) => Promise<Comment[]>;
		addComment: (
			userId: number,
			gameId: number,
			content: string,
			token: string,
			rating: number,
		) => Promise<Comment>;
		deleteComment: (commentId: number, token: string) => Promise<void>;
	};
}
