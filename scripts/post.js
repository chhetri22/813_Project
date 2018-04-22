/**
 * This object represents a post on the forum. Posts have content, date, author, 
 likes, replies, list of filters
 */

// id= number, content = string, userId = number, postDate = Date, filters = list of strings (lowercase)
class Post {
	constructor(id, content, userId, postDate, filters, title) {
		// Two immutable properties
		Object.defineProperty(this, "content", {value: content, writable: false});
		Object.defineProperty(this, "userId", {value: userId, writable: false});
		Object.defineProperty(this, "postDate", {value: postDate, writable: false});
		Object.defineProperty(this, "filters", {value: filters, writable: false});
		Object.defineProperty(this, "id", {value: id, writable: false});
		Object.defineProperty(this,"title", {value: title, writable: false})


		// Two mutable properties
		this.likes = 0;
		this.replies = []; // TODO make reply object
	}

	likePost() {
		this.likes +=1; 
	}

	setLikes(likes){
		this.likes = likes;
	}

	addReply(content, userId, postDate){
		var reply = new Reply(this.id, content, userId, postDate);
		this.replies.push(reply);
	}

	// checks if post has filter, returns true if yes, otherwise false
	hasFilter(filter) {
		if (this.filters.indexOf(filter.trim().toLowerCase())!= -1){
			return true
		}
		return false;
	}

	containsKeyWord(searchTerm) {
		var lowerContent = this.content.toLowerCase();
		var modifiedSearchTerm = searchTerm.trim().toLowerCase();
		if (lowerContent.indexOf(modifiedSearchTerm) != -1 || this.title.indexOf(modifiedSearchTerm)!= -1) {
			return true;
		}
		return false;
	}
}

