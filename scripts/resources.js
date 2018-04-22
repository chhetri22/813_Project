document.addEventListener(
    // Final initalization entry point: the Javascript code inside this block
    // runs at the end of start-up when the DOM is ready
    "DOMContentLoaded", function() {
        // Code here

        //add posts into the forum.html

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