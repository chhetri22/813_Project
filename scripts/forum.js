/**
 * This object represents a discussion forum. Forum contains a list of posts.
 */

class Forum extends EventTarget{
	constructor() {

		super();

		// Mutable properties
		this.posts = [];
		this.maxpostId = 0;
	}

	//possibly pass in id instead?
	// content, userId are strings
	// postDate is Date object
	// filters is list of strings
	addPost(content, userId, postDate, filters, title) {
		//creates post event and assigns it a unique id
        let postId = this.maxpostId +1 ;
        this.maxpostId += 1;

        let post = new Post(postId, content, userId, postDate, filters, title);
        this.posts.push(post);

        //dispatch event add post
        var detail = {post: post};
        var event = new CustomEvent("addPost", {detail: detail});
        this.dispatchEvent(event);

	}


	// returns posts with filter. Helper function.
	// when there are no filters, return all posts
	getPostWithFilters(filters) {

	    let returnArray = [];

	    if (filters.length ==0){
	    	return this.posts;
	    }

	    this.posts.forEach(function(post){
	        filters.forEach(function(filter){
	            if (post.hasFilter(filter)){
	                returnArray.push(post);
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
        this.dispatchEvent(event);

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

        this.dispatchEvent();

	}

	// get a post by id (returns null if none)
	getPostById(postId) {
		for (var i = 0, l = this.posts.length; i < l; i++) {
    		if (this.posts[i].id == postId){
    			return this.posts[i];
    		}
		}
		return null;
	}

}