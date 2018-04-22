var forum = new Forum();
forum.addPost("Hi! As it's approaching the end of freshman year I'm worried I might have depression. "
	+ "I feel constantly drained and don't want to hang out with my friends like before. " +
	"I'm afraid to tell my friends because they'll probably just tell me I'm overworked. Is it depression?", 
	1, new Date(), ["depression"], "Is it Depression??");

forum.addPost("I think my friend is depressed, but I don't know how to talk about it with her. "
	+ " She's stopped being excited about her classes, activities, or even just social events." +
	"I know she recently suffered a loss in her family, but it seems like the gloominess is lingering concerningly long. Suggestions?", 
	2, new Date(), ["depression"], "Depressed friend");

forum.addPost("Shout out to everyone else suffering from anxiety! "
	+ "Just wanted to let y'all know there is someone out there who understands what you're going through. "+
	"Stay strong!", 
	3, new Date(), ["anxiety"], "A little Encouragement!");

forum.addPost("Hi! I've been suffering from anxiety for a while now, but I'm new to the MIT community. "+
	"What have been your experiences with MIT Mental Health? Do you have any other resources you've found helpful? Thanks!!", 
	4, new Date(), ["anxiety"], "Best resources for anxiety?");

forum.addPost("I'm afraid my friend is in an abusive relationship. What are the best ways to bring up the subject "+
	"and help him get help. I don't want to ruin our friendship over this. ",
	5, new Date(), ["relationships"], "Relationship trouble?");

forum.addPost("Depression is often accompanied by a critical, self-destructive mentality that interferes with and distracts us " +
	"from our daily lives. When depressed, people tend to accept this negative identity as a true representation of who they are." + 
	"Many people fail to recognise that this sadistic point of view is actually the voice of a well-hidden enemy within. " + 
	"To begin this process, it is helpful to think of", 
	6, new Date(), ["depression"], "What are some of the most effective ways to fight depression?"
	);

forum.addPost("Social Anxiety is the worst nightmare for any person having it." +
"1. You get a phone call, you panic." + 
"2. Somebody knocks on the door, you panic." + 
"3. The teacher asks a question in class",
	7, new Date(), ["anxiety"], "What's it like to have social anxiety disorder?");

var userDictionary = {
  0: "You",
  1: "peri",
  2: "anon18",
  3: "CuriousChamelon",
  4: "theMagician",
  5: "ThoughtfulTiger",
  6: "User_34",
  7: "Anonymous"
};

forum.getPostById(1).setLikes(14);
forum.getPostById(2).setLikes(5);
forum.getPostById(3).setLikes(12);
forum.getPostById(4).setLikes(2);
forum.getPostById(5).setLikes(31);

/*********************************** CHANGE VIEW *************************************/
// Display the post beneath the other posts if below = true, above other posts if below = false
function displayPost(post, below) {
	var htmlString = "<div id = \"yourPost" + post.id + "\" class=\"card\" >" +
	"<div class=\"card-body\">" +
	"<h5 class=\"card-title\"><a href=\"#\" class=\"card-link\">"+  post.title + "</a></h5>" +
	"<h6 class=\"card-subtitle mb-2 text-muted\">" + userDictionary[post.userId] + "</h6>" +
	"<p class=\"card-text\">" + post.content + "<a href=\"https://www.w3schools.com\">... (more)</a></p>" +
	"<div>" +
	"<a href=\"#\" style=\"float:right\" class=\"btn btn-default btn-sm\" data-toggle=\"modal\" data-target=\"#replyPopUp\"><i class=\"fa fa-reply\"></i> Reply</a>" +
	"<a href=\"#\" style=\"float:left\" class=\"card-link likeBox\" id=\"likeBox" + post.id + "\">" + post.likes + "  <img src=\"http://www.qygjxz.com/data/out/108/5399295-heart-images.png\" width=\"20\" /></a>" +
	"</div>" +
	"</div>" +
	"</div>";

	var postContainer = document.getElementById("otherPosts");
	var where = "afterbegin";
	if (below) {
		where = "beforeend";
	}
	postContainer.insertAdjacentHTML(where, htmlString);

	document.getElementById("likeBox"+post.id).addEventListener("click", function(){
    		var postId = parseInt(this.id.substring(7)); //when id is likeBox#

    		//back end like
    		var post = forum.getPostById(postId);
    		post.likePost();

    		//front end like
    		this.innerHTML = post.likes + "  <img src=\"http://www.qygjxz.com/data/out/108/5399295-heart-images.png\" width=\"20\" />";
    });

}

// Displays only the list of posts
function displayPosts(posts) {
	// clear area
	document.getElementById("otherPosts").innerHTML = "";
	// use helper function displayPost
	for (var i = 0, l = posts.length; i < l; i++) {
    	displayPost(posts[i], true);
	}

}
/*********************************** EVENTS *************************************/
document.addEventListener(
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded", function() {
		//add posts into the forum.html
		displayPosts(forum.posts);



		// Add event listeners
        $("#exampleFormControlTextarea3").click(function () {
            $("#postPopUp").modal("show");
        });

		document.getElementById("replyPopUpButton").addEventListener("click", function(){
			var post = new Post(100, "test", 12, new Date(), []); // TODO reply is for arbitrary post. Need to figure out which post it belongs to.
			var reply = document.getElementById("replyTextArea").value; 
			if (reply.trim()!="") { //if there is a reply
				post.addReply(reply, 12, new Date());
				document.getElementById("replyTextArea").value = ""; // clear text
				console.log("reply: ", reply); 
			}else {
				console.log("alert the user they didn't enter enough information, so a reply cannot be made.");
			}
		});

		document.getElementById("postPopUpButton").addEventListener("click", function(){
			var postContent = document.getElementById("postTextArea").value; 
			var postTitle = document.getElementById("chosePostTitle").value;

			var filters = [];
			$('#chosePostFilters input:checked').each(function() {
    			filters.push($(this).attr('name'));
			});


			if (postContent.trim()!="" && postTitle.trim()!="") { //if there is a post
				// make post!
				forum.addPost(postContent, 0, new Date(), filters, postTitle); 
				// clear popup input text
				
			} else {
				console.log("alert the user they didn't enter enough information, so a post cannot be made.");
			}
			// Clear all user inputs in pop up
			document.getElementById("postTextArea").value = ""; 
			document.getElementById("chosePostTitle").value = "";
			// TODO uncheck all checkboxes
		});

		// Respond to changed filters
		$('.filters input[type=checkbox]').change(function() {
			var filters = [];
			$('.filters input:checked').each(function() {
    			filters.push($(this).attr('name'));
			});
			forum.applyFilterToPosts(filters);
		});

		// TODO: Respond to search changes. 
		// Call forum.applySearchToPosts(searchTerm) for text in search bar. 


		// Below code didn't work on Janelle's computer :(
		// Get the link element that references the templates.html file.
        var templatesImport = document.getElementById('nav_templates');

        // Retrieve the loaded templates.
        var templates = templatesImport.import;

        // Get the template.
        var template = templates.getElementById('nav_template_id');

        var clone = document.importNode(template.content, true);
        var nav_div = document.getElementById("nav_bar_div");
        nav_div.appendChild(clone);

	});

// Keyboard events arrive here
document.addEventListener("keydown", function(evt) {
	// Your code here
});

// Click events arrive here
document.addEventListener("click", function(evt) {

});

// Special Listeners
forum.addEventListener("filter", function(e) {
	var detail = e.detail;
	var posts = detail.posts;
	displayPosts(posts);
});

forum.addEventListener("addPost", function(e) {
	var detail = e.detail;
	var post = detail.post;
	displayPost(post, false);
});
