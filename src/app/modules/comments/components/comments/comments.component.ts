// import { Component, Input, OnInit } from '@angular/core';
// import { CommentsService } from '../../services/comments.service';
// import { ActiveComment} from '../../models/activeComment.model';
// import { Comment } from '../../models/comment.model';

// @Component({
//   	selector: 'comments',
//   	templateUrl: './comments.component.html',
// })
// export class CommentsComponent implements OnInit {

// 	@Input() currentUserId!: string;

// 	comments: Comment[] = [];
// 	activeComment: ActiveComment | null = null;

// 	constructor(private commentsService: CommentsService) {}

//   	ngOnInit(): void {
// 		this.commentsService.getComments().subscribe(
// 			(comments) => {
// 				this.comments = comments;
// 			}
// 		);
//   	}

// 	getRootComments(): Comment[] {
// 		return this.comments.filter((comment) => comment.parentId === null);
// 	}

// 	updateComment({text, commentId,}: {text: string; commentId: string;}): void {

// 		this.commentsService.updateComment(commentId, text).subscribe((updatedComment) => {
// 			this.comments = this.comments.map((comment) => {
// 				if (comment.id === commentId) {
// 					return updatedComment;
// 				}
// 				return comment;
// 			});

// 			this.activeComment = null;
// 		});
// 	}

// 	deleteComment(commentId: string): void {
// 		this.commentsService.deleteComment(commentId).subscribe(() => {
// 		this.comments = this.comments.filter(
// 			(comment) => comment.id !== commentId
// 		);
// 		});
// 	}

// 	setActiveComment(activeComment: ActiveComment | null): void {
// 		this.activeComment = activeComment;
// 	}

// 	addComment({text, parentId}: {text: string; parentId: string | null;}): void {
		
// 		this.commentsService.createComment(text, parentId).subscribe((createdComment) => {
// 			this.comments = [...this.comments, createdComment];
// 			this.activeComment = null;
// 		});
// 	}

// 	getReplies(commentId: string): Comment[] {
// 		return this.comments
// 		.filter((comment) => comment.parentId === commentId)
// 		.sort(
// 			(a, b) =>
// 			new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
// 		);
// 	}
// }