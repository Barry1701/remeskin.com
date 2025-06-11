import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes, Navigate } from "react-router-dom";
import "./api/axiosDefaults";

import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ProductsPage from "./pages/products/ProductsPage";
import ProductCreateForm from "./pages/products/ProductCreateForm";
import ProductEditForm from "./pages/products/ProductEditForm";
import ProductPage from "./pages/products/ProductPage";
import NotFound from "./components/NotFound";
// === Importy do wiadomości ===
import InboxList from "./pages/inbox/InboxList";
import OutboxList from "./pages/inbox/OutboxList";
import DirectMessageDetail from "./pages/inbox/DirectMessageDetail";
import DirectMessageForm from "./pages/inbox/DirectMessageForm";
// =============================

import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();
  const profileId = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          {/* Default route for logged-in and logged-out users */}
          <Route
            path="/"
            element={
              currentUser ? (
                <PostsPage message="Sorry, no posts to display here. Try searching with different keywords." />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          {/* Route for logged-in users */}
          <Route
            path="/feed"
            element={
              currentUser ? (
                <PostsPage
                  message="No new updates in your feed. Follow more users to see their latest posts here."
                  filter={`owner__followed__owner__profile=${profileId}&`}
                />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/liked"
            element={
              currentUser ? (
                <PostsPage
                  message="You haven’t liked any posts yet. Start exploring and like posts to see them here."
                  filter={`likes__owner__profile=${profileId}&ordering=-likes__created_at&`}
                />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          {/* Routes for sign-in and sign-up */}
          <Route
            path="/signin"
            element={currentUser ? <Navigate to="/" /> : <SignInForm />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/" /> : <SignUpForm />}
          />

          {/* Routes for posts */}
          <Route
            path="/posts/create"
            element={currentUser ? <PostCreateForm /> : <Navigate to="/signin" />}
          />
          <Route
            path="/posts/:id"
            element={currentUser ? <PostPage /> : <Navigate to="/signin" />}
          />
          <Route
            path="/posts/:id/edit"
            element={currentUser ? <PostEditForm /> : <Navigate to="/signin" />}
          />

          {/* Routes for profiles */}
          <Route
            path="/profiles/:id"
            element={currentUser ? <ProfilePage /> : <Navigate to="/signin" />}
          />
          <Route
            path="/profiles/:id/edit/username"
            element={currentUser ? <UsernameForm /> : <Navigate to="/signin" />}
          />
          <Route
            path="/profiles/:id/edit/password"
            element={currentUser ? <UserPasswordForm /> : <Navigate to="/signin" />}
          />
          <Route
            path="/profiles/:id/edit"
            element={currentUser ? <ProfileEditForm /> : <Navigate to="/signin" />}
          />

          {/* Routes for products */}
          <Route
            path="/products"
            element={<ProductsPage message="Sorry, no products found. Check back later!" />}
          />
          <Route
            path="/products/create"
            element={currentUser ? <ProductCreateForm /> : <Navigate to="/signin" />}
          />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route
            path="/products/:id/edit"
            element={currentUser ? <ProductEditForm /> : <Navigate to="/signin" />}
          />
          {/* === ROUTES DLA WIADOMOŚCI === */}
          <Route
            path="/inbox"
            element={currentUser ? <InboxList /> : <Navigate to="/signin" />}
          />
          <Route
            path="/outbox"
            element={currentUser ? <OutboxList /> : <Navigate to="/signin" />}
          />
          <Route
            path="/messages/new"
            element={currentUser ? <DirectMessageForm /> : <Navigate to="/signin" />}
          />
          <Route
            path="/messages/:id/"
            element={currentUser ? <DirectMessageDetail /> : <Navigate to="/signin" />}
          />
          {/* === KONIEC ROUTES DLA WIADOMOŚCI === */}
          {/* Default route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
