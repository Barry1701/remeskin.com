# 🌿 Remeskin - Social Media Platform for Skin Issues and Allergies

[⬆️ Back to Top](#top)

## Table of Contents

- [📘 Introduction](#-introduction)
- [📱 Fully Responsive Design](#-fully-responsive-design)
- [🌟 Features](#-features)
- [🛠️ Technologies](#️-technologies)
- [📱 PWA Support](#-pwa-support)
- [⚙️ Installation and Setup](#️-installation-and-setup)
- [📁 Project Structure](#-project-structure)
- [📋 Project Management](#-project-management)
- [🎨 Design](#-design)
- [🖼️ Screenshots](#️-screenshots)
- [✅ Testing](#-testing)
- [🚀 Frontend Deployment](#-frontend-deployment)
- [🌍 Live Demo](#-live-demo)
- [🔮 Future Plans](#-future-plans)
- [🤝 Contributing](#-contributing)
- [👤 Author](#-author)

## 📘 Introduction
[Remeskin](https://remeskin-00de58d1deef.herokuapp.com/) is a social media platform designed to support individuals dealing with skin conditions like eczema and allergies, including nut allergies. The goal is to create a community where users can share experiences, seek advice, post images of symptoms, and discuss products that help them manage these conditions. Remeskin aims to reduce isolation and helplessness by providing a supportive space for people facing similar challenges.

[⬆️ Back to Top](#top)

## 📱 Fully Responsive Design
Remeskin is designed with a fully responsive layout, ensuring an optimal user experience across various devices and screen sizes, including desktops, tablets, and smartphones.

Below is a visual representation of the platform's responsiveness:

![Responsive Design](documentation/responsive.png)

[⬆️ Back to Top](#top)

## 🌟 Features
- **User Registration and Authentication**  
  Users can sign up, log in, and manage their accounts securely.

- **Post Creation and Browsing**  
  Users can create posts, upload photos, and share their experiences. All posts can be liked or followed.

- **Profile Management**  
  Edit profile information, view popular profiles, and manage personal posts.

- **Product Recommendations**  
  Users can recommend products and share experiences with specific skincare and allergy-related products. Each product belongs to a **category** that helps users select appropriate products for their needs.

- **Search and Filter**  
  A powerful search tool with filters to find posts and products.

- **Responsive Design**  
  Optimized for both desktop and mobile devices.

[⬆️ Back to Top](#top)


## 🛠️ Technologies
This project uses the following technologies:

- **React** - JavaScript library for building user interfaces.
- **REST API** - Backend API to manage data interactions.
- **Bootstrap 4.6** - Responsive design and prebuilt styling components.
- **Google Fonts (Lato)** - Clean and modern typography.
- **Font Awesome** - Icons throughout the application.
- **CSS Modules** - Scoped styles for each component.
- **Axios** - For making API requests.
- **SweetAlert2** - For stylish and customizable alert popups.

[⬆️ Back to Top](#top)

## 📱 PWA Support
Remeskin is configured to support installation as a Progressive Web App (PWA). This allows users to install the application on their mobile devices or desktops for a more native app experience. The `manifest.json` file provides metadata for the PWA setup.

[⬆️ Back to Top](#top)

## ⚙️ Installation and Setup
### Prerequisites
- Node.js (v16.0 or later)
- npm (v8.0 or later)
- A modern browser (Chrome, Firefox, Edge)

### Steps to Run Locally
1. Clone the repository:
    ```bash
    git clone https://github.com/Barry1701/remeskin.com.git
    ```

2. Navigate to the project directory:
    ```bash
    cd remeskin.com
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Visit the application at [http://localhost:3000](http://localhost:3000).

[⬆️ Back to Top](#top)

## 📁 Project Structure
- `src/api` - Axios configuration for API calls.
- `src/assets` - Images and static assets.
- `src/components` - Reusable UI components.
- `src/pages` - Feature-specific pages (e.g., auth, posts, profiles).
- `src/styles` - CSS Modules for scoped styling.
- `src/utils` - Helper functions used throughout the app.

[⬆️ Back to Top](#top)

## 📋 Project Management

### Milestones

| Milestone                   | Description                                     | Related User Stories      |
|-----------------------------|-------------------------------------------------|-------------------------  |
| **Core Functionality Implementation**| Implement user registration, login, and logout | #1, #2, #3, #4, #5|
| **Post Features**           | Create, like, and comment on posts             | #11, #12, #14, #15, #16    |
| **Commenting System**       | Add, edit, delete, and view comments           | #19, #20, #21, #22, #23    |
| **User Profile Management** | Manage profile details, posts, and followers   | #24, #25, #26,#27, #28, #29|
| **Product and Category Management**| Add and view product recommendations    | #33, #34, #35, #36         |
| **UX/UI Enhancements**      | Improve design and user experience             | #6, #7, #8, #9, #10        |
| **Final Testing & Deployment** | Ensure full functionality and deployment    | #39, General               |

### MoSCoW Prioritization

#### MUST:
- **Core Functionality Implementation** 
- **Post Features** 
- **User Profile Management**   
- **Comment System**   

#### SHOULD:
- **Product and Category Management** 
- **Search & Filter Features**  
- **Follow User System**   

#### COULD:
- **Improved UX/UI Enhancements** 
- **Final Testing & Deployment** 

>###  **Full List of User Stories**  
>For the complete breakdown of user stories, visit the **[User Stories Board](https://github.com/users/Barry1701/projects/11)**.

[⬆️ Back to Top](#top)

## 🎨 Design

This document outlines the key visual and UX design decisions for **Remeskin**, including color palette, typography, layout structure, and commonly used UI components.

---

### 1. Color Palette

In the CSS files, several repeated color patterns and gradients are used. Below is a consolidated palette:

- **Gradient (Navbar)**  
  - `#6dd5ed` → `#2193b0` (linear gradient)
- **Gradient (Category Labels / “Wow Effect”)**  
  - `#ff7e5f` → `#feb47b`
- **Accent Colors**  
  - **Buttons & Background Variation**: `#242a3d` (dark blue-gray) or `#2142b2` (deep blue)  
  - **Hearts (Liked Posts)**: `#f85032`
- **Base Background** (in `index.css`)  
  - A repeated texture plus a light linear gradient (`#e6e9f0` → `#eef1f5`)
- **Text**  
  - Default: `#333`  
  - Lighter text (e.g., dates): `#c1c1c5` or `#555555`

> **Tip:** If you want to standardize these colors further, consider defining them as CSS variables or SCSS variables.

---

### 2. Typography

- **Primary Font**: [Poppins](https://fonts.google.com/specimen/Poppins) (imported in `index.html`).  
  - Fallback stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`
- **Code Snippets**  
  - `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`
- **Font Sizes**  
  - Forms, buttons, and general text: typically `14px–16px`  
  - `.Header` class: `16px`, uppercase, letter-spacing  
  - Icons: `i { font-size: 1.6rem }`

Since Bootstrap 4.6 is included, I also inherit its default font sizing (e.g., `<h1>` through `<h6>`).

---

### 3. Icons

- **Font Awesome** is used via a `<script>` in `index.html`.
- Common icons:  
  - Sign-in/out (`fa-sign-in-alt`, `fa-sign-out-alt`), user (`fa-user`, `fa-user-plus`), heart (`fa-heart`), comments (`fa-comments`), etc.
- Additional usage:  
  - **3-dot menu**: `fa-ellipsis-v` (for `<MoreDropdown>`).

---

### 4. Layout & Responsiveness

#### 4.1 Overall Structure

- **Navbar** (fixed, gradient background)  
  - Uses `<Navbar>` from `react-bootstrap` and custom CSS in `NavBar.module.css`.
  - Collapses on mobile, toggled with a custom hook (`useClickOutsideToggle.js`).
- **Main Content**  
  - Wrapped in a `<Container>` with `.Main { padding-top: 81px }` to account for navbar height.
- **Background**  
  - A repeated dark texture plus a linear gradient, set in `body` (see `index.css`).

#### 4.2 CSS Modules & Media Queries

- Each component (e.g., `NavBar`, `Post`, `Comment`) often has its own `.module.css`.
- **Responsive breakpoints** leverage Bootstrap’s defaults (sm, md, lg, xl).
  - For instance, `.d-none d-lg-block` to hide/show elements depending on screen size.

#### 4.3 Common Layout Patterns

- **Two-column layout** on wider screens: main feed (`lg=8`) + sidebar (`lg=4`).
- On smaller viewports, the sidebar is hidden or moved below the main feed.

---

### 5. Core UI Components

1. **Navbar** (`NavBar.js`)
   - Gradient background, sign-in / sign-up links for guests, or user profile links if logged in.
   - `.NavLink` classes control text color, hover transitions, and icons.

2. **Buttons** (various styles in `Button.module.css`)
   - Classes like `.Blue`, `.BlueOutline`, `.Black`, `.BlackOutline`, `.Bright`.
   - Rounded corners (`border-radius: 100px`), hover states that invert colors, etc.

3. **Cards / Posts**
   - Implemented via `<Card>` from `react-bootstrap` + additional styles in `Post.module.css`.
   - Category labels (like “General”, “Eczema”, “Allergy”) have bright gradient backgrounds with hover scaling.

4. **Forms** (Sign in/up, PostCreateForm, ProductCreateForm, etc.)
   - Typically use `<Form>` from `react-bootstrap` plus modular CSS (`SignInUpForm.module.css`, `PostCreateEditForm.module.css`).
   - Validation errors displayed with `<Alert>`.

5. **Alerts / Modals**
   - [SweetAlert2](https://sweetalert2.github.io/) for success/error confirmations.
   - `<Alert>` from `react-bootstrap` for inline messages (e.g., form validation).

6. **Avatars**
   - `Avatar.js` uses `.Avatar` from `Avatar.module.css` to present user images in circular form.

---

### 6. Highlights & Visual Effects

- **Hover States**
  - Navbar: slightly darker gradient on hover.
  - Category chips: color gradient flips, scale effect (`transform: scale(1.05)`).
  - Buttons: background color toggles or inverts.
- **Shadows**
  - Subtle box-shadows on `.Post`, `.ProductCard`, and category labels.

---

### 7. Wireframes

Below are **text-based wireframes** for Remeskin’s main pages, illustrating layout and core elements. Although simplified, they show how content is arranged and where key features appear. 

---

**1. Home Page**

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                               NavBar (fixed)                              │
│  [ Remeskin Logo ] [Add Post] [Home] [Products] [Add Product] [Feed]      │
│        [Liked] [Profile] [Sign Out]   (if logged in)                      │
│        [Sign In] [Sign Up]          (if logged out)                       │
└───────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┬──────────────┐
│ [ Search Bar ] [ Category Filter Dropdown ]               │              │
├───────────────────────────────────────────────────────────┤  Most        │
│  [ PostCard - Title, Content, Image, Category Label ]     │ Followed     │
│  [ Like / Comment icons & counts ]                        │ Profiles     │
│  [ Edit/Delete if owner ]                                 │ (Sidebar)    │
├───────────────────────────────────────────────────────────┤              │
│  [ Another PostCard ... ]                                 │              │
└───────────────────────────────────────────────────────────┴──────────────┘

```

**Description**:

- The NavBar at the top has a gradient background, showing logo and navigation links.  
- The main area (left column) contains a feed of user posts with search and category filters.  
- The right column lists **Most Followed Profiles**.  

---

**2. Sign up Page**

```text
┌───────────────────────────────┐   ┌─────────────────────────────────────┐
│          Sign-Up Form         │   │   Motivational / Personal Image     │
│  [Username]                   │   │   (e.g., child with eczema)         │
│  [Password]                   │   │                                     │
│  [Confirm Password]           │   └─────────────────────────────────────┘
│  [Sign Up Button]             │
│  [Link to Sign In]            │
└───────────────────────────────┘
```

**Description**:

- On the left: a form asking for username, password, and password confirmation.  
- On the right: an image or illustration.  
- After submission, SweetAlert2 shows success/failure.  

---

**3. Sign In Page**

```text
┌───────────────────────────────┐   ┌─────────────────────────────────────┐
│           Sign-In Form        │   │     AI-generated / Artistic Image   │
│  [Username]                   │   │     related to skin/allergies       │
│  [Password]                   │   │                                     │
│  [Sign In Button]             │   └─────────────────────────────────────┘
│  [Link to Sign Up]            │
└───────────────────────────────┘

```

**Description**:

- Similar layout to Sign Up: form on the left, image on the right.  
- Successful login redirects the user to the home/feed page.

---

**4. Profile Page**

```text
┌─────────────────────────────────────────────────────┐
│ [Avatar]   Username                                 │
│  Followers: X   Following: Y    Posts: Z            │
│  [Follow/Unfollow Button] (if not owner)            │
│  [ProfileEditDropdown if owner]                     │
│  Bio: "User’s personal info or description"         │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│           [User’s Posts with InfiniteScroll]        │
│  [Post 1]                                           │
│  [Post 2]                                           │
│  ...                                                │
└─────────────────────────────────────────────────────┘

```

**Description**:

- Shows user’s avatar, bio, and stats (number of followers/following/posts).  
- If the profile is owned by the logged-in user, there’s an edit dropdown (to change image, username, password).  
- User’s posts load in an infinite scroll below.  

---

**5. Add Post Page**

```text
┌───────────────────────────────────────────────────────┐
│  [Image Upload Preview or Placeholder]                │
│                                                       │
│  [Title]                                              │
│  [Content (textarea)]                                 │
│  [Category Dropdown: General / Eczema / Allergy ]     │
│                                                       │
│  [Create Button] [Cancel Button]                      │
└───────────────────────────────────────────────────────┘

```

**Description**:

- Form includes fields for a post’s title, content, category, and an optional image.  
- On submit, a SweetAlert2 message confirms success or shows errors.  

---

**6. Product Page**

```text
┌─────────────────────────────────────────────────────────────────┬──────────┐
│ [Search Field] [Category Filter for Products]                   │          │
│-----------------------------------------------------------------│ Popular  │
│ [ProductCard: Title, Description, Image, Category Label]        │Profiles  │
│ [ Edit/Delete if owner ]                                        │(Sidebar) │
│-----------------------------------------------------------------│          │
│ [ Another ProductCard ... ]                                     │          │
└─────────────────────────────────────────────────────────────────┴──────────┘

```

**Description**:

- Shows a list of community-recommended products, each with a category label.  
- Users can search products by name and filter by category.  
- Owners can edit or delete their own product entries.  



---




[⬆️ Back to Top](#top)

## 🖼️ Screenshots
Below are screenshots showcasing key features and elements of the Remeskin platform. Each screenshot includes a detailed description to help users understand the functionality and design of the application.

### 🖼️ Navigation Bar (Logged-Out View)
This screenshot displays the navigation bar visible to users who are not logged in or registered.

- On the left side, the **Remeskin logo** is displayed for branding purposes. The logo was designed and generated using Canva.
- On the right side, there are two main options:
  - **Sign In** button, represented by a login icon, allowing existing users to log into their accounts.
  - **Sign Up** button, represented by a user icon, enabling new users to register for the platform.

The navigation bar features a clean and minimalist design with a blue gradient background, ensuring good contrast and readability.

![Navigation Bar](documentation/nav.png)

### 🖼️ Sign-Up Page
This screenshot displays the **Sign-Up Page** of the Remeskin platform, where new users can create an account.

- On the **left side**, there is a registration form that includes fields for:
  - **Username**
  - **Password**
  - **Confirm Password**
  - A "Sign Up" button to submit the form.
  - A link at the bottom of the form for users who already have an account to navigate to the **Sign-In Page**.

- On the **right side**, there is a photo of the author's son, who has been managing eczema and a nut allergy since birth. This personal element highlights the inspiration and motivation behind creating the platform.

![Sign-Up Page](documentation/signup.png)

### 🖼️ Sign-In Page
This screenshot displays the **Sign-In Page** of the Remeskin platform, allowing existing users to access their accounts.

- On the **left side**, there is a login form that includes fields for:
  - **Username**
  - **Password**
  - A "Sign In" button to submit the form.
  - A link at the bottom of the form for users who don't have an account to navigate to the **Sign-Up Page**.

- On the **right side**, there is an artistic image of a profile with intricate, nature-inspired patterns. This image was designed by author and generated using AI tools, adding a modern and creative touch to the page while aligning with the theme of individuality and natural solutions.

![Sign-In Page](documentation/signin.png)

### 🖼️ Navigation Bar (Logged-In View)
This screenshot displays the **Navigation Bar** visible to logged-in users on the Remeskin platform.

- **Left side**:
  - The **Remeskin logo**, is displayed on the left side and is linked to the homepage, allowing users to quickly return to the main feed.

- **Center section**:
  - **Add Post** button: Allows users to create a new post.
  - **Home** button: Navigates users to the main feed.
  - **Products** button: Directs users to browse or view product recommendations.
  - **Add Product** button: Provides an option for users to recommend a product.
  - **Feed** button: Links to the personalized feed of posts.
  - **Liked** button: Displays posts the user has liked.

- **Right side**:
  - **Profile** button: Navigates to the user's profile page.
  - **Sign Out** button: Logs the user out of the platform.

The navigation bar maintains a clean design with a blue gradient background, ensuring usability and readability for users.

![Navigation Bar](documentation/nav_user.png)

### 🖼️ Home Page
This screenshot displays the **Home Page** of the Remeskin platform, where users can browse posts and interact with the community.

- **Search Bar**: Positioned at the top, allowing users to search for specific posts by keywords.
- **Category Filter**: Located below the search bar, providing a dropdown menu to filter posts by specific categories.
- **Post Section**:
  - Displays a post by the user **Nikodem** with the title **"Nuts and Peanuts"**.
  - The post describes a personal experience about nut allergies, highlighting the user's ability to eat peanuts despite a tree nut allergy. This encourages engagement with others who may relate.
  - Includes a **category label** ("Allergy") displayed below the content, making it easy to identify the post's context.
  - Interaction options include **like** and **comment** buttons, showing engagement metrics (e.g., 4 likes and 3 comments).
  - A **three dots menu** next to the post date provides options to update or delete the post (visible to the post owner only).
- **Most Followed Profiles**: Displayed on the right side, showcasing a list of the most followed profiles on the platform. Each profile card includes:
  - **Username** and profile icon.
  - A button to either **follow** or **unfollow** the user.

This page provides a user-friendly interface for discovering posts, interacting with the community, and managing connections on the platform.


![Home Page](documentation/home.png)


### 🖼️ Add Post Page with Category Dropdown
This screenshot displays the **Add Post Page** of the Remeskin platform, where users can create and upload new posts. It highlights the **Category Dropdown** functionality.

- **Image Upload Section**:
  - A clickable area to upload an image. The placeholder includes an upload icon and a label: **"Click or tap to upload an image"**.

- **Form Fields**:
  - **Title**: A text input field for adding a title to the post.
  - **Content**: A larger text area for entering the content of the post, such as a description or details about the shared experience.
  - **Category Dropdown**: A dropdown menu allowing users to select a category for the post. Available categories include:
    - **General**
    - **Eczema**
    - **Allergy**

- **Buttons**:
  - **Cancel**: Allows users to discard the post creation process.
  - **Create**: Submits the post to the platform.

This page provides an intuitive interface for users to categorize their posts effectively, improving organization and discoverability within the community.

![Add Post Page](documentation/add_post.png)

### 🖼️ Comments Section with Categories
This screenshot showcases the **Comments Section** on the Remeskin platform, allowing users to interact and categorize their comments for better context and readability.

- **Comment Input**:
  - A text input field where users can type their comments.
  - **Category Dropdown**: Allows users to assign a category to their comment. Available options include:
    - **General**
    - **Question**
    - **Tip**
  - **Post Button**: Submits the comment to the discussion.

- **Example Comments**:
  - **Nikodem** (Category: Tip): Offers advice to see a doctor as soon as possible.
  - **Olga** (Category: Question): Asks a question about nut allergies and whether to consult a doctor.
  - **Hira_Singh** (Category: General): Shares that they have experienced something similar.
  - **Caoimhin** (Category: General): Discusses their child's similar experience with nuts and mentions peanut butter.

This section enhances engagement by allowing users to categorize their contributions, making discussions more organized and valuable to the community.

![Comment](documentation/comment.png)


### 🖼️ Product Page Example
This screenshot displays an example from the **Product Page** of the Remeskin platform, where users can explore recommended products shared by the community.

- **Search and Filter**:
  - **Search Bar**: Located at the top, allowing users to search for specific products.
  - **Category Filter**: Below the search bar, providing a dropdown menu to filter products by categories.

- **Product Section**:
  - **Product Title**: The featured product is **"Vesgantti Single Mattress"**.
  - **Product Content**:
    - A testimonial from the user highlights the product's effectiveness in improving comfort and sleep quality for their child with sensitive skin. The description emphasizes the product's ability to reduce scratching and promote peaceful sleep.
    - The **category label** ("Hypoallergenic Clothing and Bedding") is prominently displayed below the description for clarity.
  - **Default Product Image**:
    - The image shown is the default product representation, designed by the author and generated using AI tools, maintaining a clean and professional aesthetic.

- **Most Followed Profiles**:
  - Displayed on the right side, showcasing a list of the most followed profiles on the platform. Each profile includes:
    - **Username** and profile picture.
    - A **follow/unfollow button** to manage connections.

This page provides users with a well-organized and user-friendly interface to explore and share product recommendations for skin and allergy-related challenges.


![Products Page](documentation/product.png)

### 🖼️ Add Product Page
This screenshot displays the **Add Product Page** of the Remeskin platform, where users can recommend and share skincare or allergy-related products.

- **Image Upload Section**:
  - A clickable area to upload an image of the product. .
  
- **Form Fields**:
  - **Name**: A text input field for entering the name of the product.
  - **Description**: A larger text area for adding details about the product, such as its benefits or usage.
  - **Category Dropdown**: A dropdown menu to select a category that best describes the product.

- **Buttons**:
  - **Cancel**: Allows users to discard the current product submission process.
  - **Create**: Submits the new product to the platform.

This page is designed to provide an intuitive interface for users to add detailed and categorized product recommendations.

![Add Product Page](documentation/add_product.png)

### 🖼️ Feed Page Example
This screenshot displays a **Feed Page** example from the Remeskin platform, where users can view posts shared by the profiles they follow.

- **Search and Filter**:
  - **Search Bar**: Positioned at the top, allowing users to search for posts using keywords.
  - **Category Filter**: Below the search bar, providing a dropdown menu to filter posts by categories.

- **Post Section**:
  - **Post Author**: The post is created by **Bartosz**, with the posting date displayed (**27 Dec 2024**).
  - **Post Content**:
    - A featured image showcasing skincare products and natural elements, emphasizing the platform's focus on holistic skin health and natural remedies.
    - Text content encouraging community members to share tips, habits, or products that have helped them with skin issues and allergies. Examples include:
      - A soothing cream.
      - An allergen-free snack.
      - A daily routine to prevent flare-ups.
    - The post motivates users to provide advice and foster community support.
    - A **category label** ("General") is prominently displayed below the text to identify the context of the post.
  - **Engagement Options**:
    - Users can interact with the post using **like** and **comment** buttons. Engagement metrics (4 likes, 6 comments) are displayed below the post.

This page fosters a personalized and engaging space for users to connect with posts from their network and gain valuable insights shared by the community.


![Feed Page](documentation/feed.png)

### 🖼️ Liked Posts Page Example
This screenshot displays an example of the **Liked Posts Page** on the Remeskin platform, showcasing posts that the user has liked.

- **Search and Filter**:
  - **Search Bar**: Positioned at the top, allowing users to search through liked posts using keywords.
  - **Category Filter**: Below the search bar, providing a dropdown menu to filter liked posts by categories.

- **Post Section**:
  - **Post Author**: The post is created by **Saoirse28**, with the posting date displayed (**27 Dec 2024**).
  - **Post Content**:
    - A captivating featured image of a serene sunset over a reflective body of water, symbolizing tranquility and hope.
    - Text content titled **"Strength in Every Step"**, emphasizing perseverance and shared experiences. The message inspires users with motivational words:
      - "Healing is a journey, not a race. Every small step forward is progress."
      - Encourages users to find strength in community and shared stories.
    - A **category label** ("General") is prominently displayed below the text, making it easy to identify the post's context.
  - **Engagement Metrics**:
    - Displays **1 like** (liked by the user) and **0 comments**.

This page provides users with a personalized and uplifting space to revisit posts they have liked, helping them reconnect with inspiring and valuable content shared by the community.

![Liked Posts Page](documentation/like.png)

### 🖼️ Profile Page
This screenshot displays the **Profile Page** of the Remeskin platform, where users can view and manage their profile information and posts.

- **Profile Information**:
  - Shows the user's profile picture, username (**"Katarzyna"**), and statistics:
    - **0 posts**
    - **10 followers**
    - **4 following**
  - A **three dots menu** provides options to:
    - **Edit Profile**: Allows the user to update their profile information.
    - **Change Username**: Enables the user to update their username.
    - **Change Password**: Provides a secure way to update the account password.

- **User's Posts Section**:
  - Displays the posts created by the user.
  - If no posts are found, as in this case, it shows the message: **"No results found, Katarzyna hasn't posted yet."**
  - The **"No results found" image** was conceptualized by the author and generated using AI tools to enhance the user experience with a visually appealing placeholder.

This page offers a clean and organized interface for users to manage their profiles and review their contributions to the community.

![Profile Page](documentation/profile.png)

### 🖼️ SweetAlert Notifications

This screenshot showcases a **SweetAlert notification** that appears when a user successfully logs out of the Remeskin platform.

- **Message**: "Logged Out - You have been successfully logged out."
- **Icon**: A green checkmark indicating a successful action.
- **Button**: A single **OK** button to close the notification.

This alert provides clear feedback to the user about the success of their logout action.

![Logged Out Notification](documentation/sweet_alert.png)

This screenshot displays a **SweetAlert confirmation modal** that appears when a user attempts to delete a post.

- **Message**: "Are you sure? - You won't be able to undo this!"
- **Icon**: A warning icon (yellow exclamation mark) indicating a potentially irreversible action.
- **Buttons**:
  - **Yes, delete it!**: Proceeds with deleting the post.
  - **Cancel**: Cancels the deletion process.

This alert ensures that users are aware of the consequences before performing a critical action.

![Delete Confirmation](documentation/sweet_alert1.png)

This screenshot shows a **SweetAlert error notification** that appears when an action fails (e.g., updating a password).

- **Message**: "Error! - Failed to update the password. Please try again."
- **Icon**: A red cross indicating an error.
- **Button**: A single **OK** button to close the notification.

This alert provides immediate feedback about an issue, guiding the user to retry or address the problem.

![Error Notification](documentation/sweet_error1.png)

[⬆️ Back to Top](#top)

## ✅ Testing

#### 🛠️ Manual Testing
- The application was manually tested to ensure all core functionalities work as expected across different devices and screen sizes.
- Key manual test cases included:
  - User registration and login flows.
  - Adding, editing, and deleting posts.
  - Searching and filtering posts and products.
  - Responsiveness on desktop, tablet, and mobile devices.
  - Interaction with SweetAlert notifications for success, error, and confirmation messages.

#### 🌟 Lighthouse Report
The application was tested using **Lighthouse** to evaluate its performance, accessibility, best practices, and SEO. Below are the results:

| Metric             | Score |
|--------------------|-------|
| **Performance**    | 91    |
| **Accessibility**  | 88    |
| **Best Practices** | 96    |
| **SEO**            | 92    |

**Performance Breakdown**:
- **First Contentful Paint**: 0.7s
- **Largest Contentful Paint**: 2.0s
- **Total Blocking Time**: 0ms
- **Cumulative Layout Shift**: 0.001

![Lighthouse Report](documentation/lighthouse.png)

These scores reflect a well-optimized and user-friendly application, ensuring a seamless experience for users.


#### 🌐 Browser Compatibility
- The application was tested on the following browsers:
  - Google Chrome
  - Mozilla Firefox
  - Microsoft Edge

[⬆️ Back to Top](#top)

## 🚀 Frontend Deployment

### Hosting Platform
- The frontend of the **Remeskin** platform is hosted on **Heroku**.

### Deployment Process
To deploy the frontend, follow these steps:

1. **Build the Application**:
   - Ensure all dependencies are installed by running:
     ```bash
     npm install
     ```
   - Create a production-ready build using:
     ```bash
     npm run build
     ```
   - This command generates an optimized build in the `build/` folder.

2. **Create a Heroku App**:
   - Log in to Heroku using:
     ```bash
     heroku login
     ```
   - Create a new Heroku application:
     ```bash
     heroku create remeskin-frontend
     ```

3. **Configure Heroku for Static File Hosting**:
   - Add a `static.json` file in the root directory with the following content:
     ```json
     {
       "root": "build/"
     }
     ```
   - This tells Heroku to serve static files from the `build/` folder.

4. **Add Buildpacks**:
   - Configure Heroku buildpacks for React apps:
     ```bash
     heroku buildpacks:set mars/create-react-app
     ```

5. **Deploy to Heroku**:
   - Initialize a Git repository (if not already initialized):
     ```bash
     git init
     ```
   - Add all files and commit:
     ```bash
     git add .
     git commit -m "Deploy frontend to Heroku"
     ```
   - Push the code to Heroku:
     ```bash
     git push heroku main
     ```

6. **Set Environment Variables**:
   - Set the environment variable for the backend API URL:
     ```bash
     heroku config:set REACT_APP_API_URL=<your-backend-api-url>
     ```

7. **Verify Deployment**:
   - Visit the live frontend application at the URL provided by Heroku.

### Environment Variables
- **REACT_APP_API_URL**: URL for the backend API (e.g., `https://drestf-api-8914bba56128.herokuapp.com/`).

### Continuous Deployment
- **GitHub Integration**:
  - Connect the Heroku app to the GitHub repository for automatic deployment whenever changes are pushed to the main branch.
  - Set up the deployment pipeline in the **Heroku Dashboard** under the "Deploy" tab.

[⬆️ Back to Top](#top)

## 🌍 Live Demo
 - Check out the live version of Remeskin: [https://remeskin-00de58d1deef.herokuapp.com/](https://remeskin-00de58d1deef.herokuapp.com/).

[⬆️ Back to Top](#top)

## 🔮 Future Plans
- **Resources from dermatologists and allergy specialists**  
  Provide curated content and professional advice to help users manage their skin conditions and allergies more effectively.

- **Group discussions and expert Q&A forums**  
  Enable community members to connect, share experiences, and ask questions in real-time discussions or through sessions with specialists.

- **Multilingual support**  
  Make the platform accessible to a global audience by supporting multiple languages, ensuring inclusivity and wider reach.

- **Short video uploads**  
  Users can share short videos (e.g., 30 seconds) to better illustrate their symptoms, experiences, or product reviews, fostering a more engaging and informative community.

[⬆️ Back to Top](#top)

## 🤝 Contributing
We welcome contributions! To get started:

1. Fork the repository.

2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

[⬆️ Back to Top](#top)

## 👤 Author
**Bartosz Stanczuk** - Developer and creator of Remeskin.

[⬆️ Back to Top](#top)



















