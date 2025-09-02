Research Log Homepage Customization Guide
This guide will help you customize and expand the research_log_homepage.html file. The page is built with a modular design to make it easy to add new content.

1. Customizing the Navigation Bar
The navigation bar at the top of the page links to the different sections of your research logs.

Changing the Site Title: To change the main title "Research Logs," edit the text inside the <a> tag with the font-bold text-xl classes.

<a href="#" class="font-bold text-xl text-gray-900">Your New Title Here</a>

Adding or Editing Navigation Links: To add or change links, edit the href and the text of the existing <a> tags within the flex space-x-4 div.

<a href="#new-section" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium">New Section</a>

2. Cloning Gallery Modules
Each square thumbnail in the galleries is a "gallery module." To add a new one, simply copy and paste the following <a> tag block within the <div class="gallery-container"> of the section you want to add it to.

<a href="new_page.html" class="gallery-item bg-gray-200 shadow-lg relative">
    <div class="gallery-item-frame">
        <img src="[https://placehold.co/150x150/your_color/ffffff?text=Your+Title](https://placehold.co/150x150/your_color/ffffff?text=Your+Title)" alt="Thumbnail description">
    </div>
    <div class="gallery-item-title">Your Module Title</div>
</a>

href="new_page.html": This is the link to your new research log page. Change new_page.html to the name of your file.

img src="...": Change the placeholder URL to a link to your thumbnail image. You can also customize the placeholder text and color.

div class="gallery-item-title": Change "Your Module Title" to the title of your log.

3. Creating New Galleries
If you want to create a new category for your research, you can clone an entire gallery section.

Copy the Section: Copy the entire <section> tag block, including its <h2> and <p> tags.

Change the ID: Update the id of the new section (e.g., from id="projects" to id="new-category"). This is important for navigation links to work.

Update Text: Change the text in the <h2> and <p> tags to describe your new gallery.

Update Navigation Bar: Remember to go back to the navigation bar and add a new link that points to the new section's id.

<section id="new-category" class="mb-12">
    <h2 class="text-3xl font-bold text-gray-800 mb-2">New Gallery Title</h2>
    <p class="text-gray-600 mb-6">A new description for this category.</p>
    
    <div class="gallery-container flex flex-wrap gap-4">
        <!-- Add your cloned gallery modules here -->
    </div>
</section>

4. Customizing Aesthetics
The current styling is minimal to make it easy for you to customize later.

The Frame: The white border around the thumbnail is controlled by the .gallery-item-frame CSS class. You can change the border properties in the <style> section of the HTML file.

Colors: The background color of the modules (bg-gray-200) and other elements are controlled by Tailwind CSS classes. You can replace them with your own hex codes or Tailwind classes.

Fonts: The font is set to 'Inter' in the <link> tag and CSS. You can replace this with any other Google Font you prefer.

Feel free to experiment with the styles to match your personal aesthetic.
