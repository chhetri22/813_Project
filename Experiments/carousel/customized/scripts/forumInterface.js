
/*********************************** CHANGE VIEW *************************************/
// Display the post beneath the other posts
function displayPost(post) {

}

// Displays only the list of posts
function displayPosts(posts) {
	// use helper function displayPost

}

/*********************************** EVENTS *************************************/
Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {
		// Code here
	},

	// Keyboard events arrive here
	"keydown": function(evt) {
		// Your code here
	},

	// Click events arrive here
	"click": function(evt) {
	}

	// Special Listeners
	"filter": function(e) {
		var detail = e.detail;
		var posts = detail.posts;
	},
});