/**
 * This object represents a discussion forum. Forum contains a list of posts.
 */


class Forum {
	constructor() {
		// Mutable properties
		this.posts = [];
		this.maxpostId = 0;
	}

	//possibly pass in id instead?
	// content, userId are strings
	// postDate is Date object
	// filters is list of strings
	addPost(content, userId, postDate, filters) {
		//creates post event and assigns it a unique id
        let postId = this.maxpostId +1 ;
        this.maxpostId += 1;

        let post = new Post(postId, content, userId, postDate, filters);
        this.posts.add(post);

        //dispatch event add post

	}


	// returns posts with filter. Helper function.
	getPostWithFilters(filters) {

	    let returnArray = [];

	    this.posts.forEach(function(post){
	        filters.forEach(function(filter){
	            if (post.hasFilter(filter)){
	                returnArray.add(post);
                }
            });
        });

        return returnArray;

	}

	// Dispatches filter event with details {posts:list of posts}
	applyFilterToPosts(filters) {
		//use helper function getPostWithFilters

        let postList = this.getPostWithFilters(filters);
        let detail = {filter:filters,
                      posts: postList
        }
        let event = new CustomEvent("filter", {detail: detail});
        event.dispatch();

	}


	// returns list of posts from a long string such as "here are some words"
	getPostsWithKeyWord(searchTerm) {
        let returnArray = [];

        this.posts.forEach(function(post){
           if(post.contains(searchTerm)){
               returnArray.add(post);
           }
        });

        return returnArray;
	}

	// Dispatches filter event with details {posts:list of posts}
	applySearchToPosts(searchTerm) {
		//use helper function getPostWithFilters

        let postList = this.getPostsWithKeyWord(searchTerm);

        let detail = {searchterm: searchTerm,
                      post:postList};

        let event = new CustomEvent("filter", {detail:detail});

        event.dispatch();

	}

}