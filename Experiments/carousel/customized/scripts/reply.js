/**
 * This object represents a reply to a post on the forum. 
Replies have postId (number), content (string), userId (number), postDate (Date object)
 */

class Reply {
	constructor(postId, content, userId, postDate) {
		// Two immutable properties
		Object.defineProperty(this, "content", {value: content, writable: false});
		Object.defineProperty(this, "postId", {value: postId, writable: false});
		Object.defineProperty(this, "postDate", {value: postDate, writable: false});
	}
}
