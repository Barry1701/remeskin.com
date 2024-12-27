import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch, Redirect } from "react-router-dom";
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

import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();
  const profileId = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* Default route for logged-in and logged-out users */}
          <Route
            exact
            path="/"
            render={() =>
              currentUser ? (
                <PostsPage message="Sorry, no posts to display here. Try searching with different keywords." />
              ) : (
                <Redirect to="/signin" />
              )
            }
          />

          {/* Route for logged-in users */}
          <Route
            exact
            path="/feed"
            render={() =>
              currentUser ? (
                <PostsPage
                  message="No new updates in your feed. Follow more users to see their latest posts here."
                  filter={`owner__followed__owner__profile=${profileId}&`}
                />
              ) : (
                <Redirect to="/signin" />
              )
            }
          />
          <Route
            exact
            path="/liked"
            render={() =>
              currentUser ? (
                <PostsPage
                  message="You haven’t liked any posts yet. Start exploring and like posts to see them here."
                  filter={`likes__owner__profile=${profileId}&ordering=-likes__created_at&`}
                />
              ) : (
                <Redirect to="/signin" />
              )
            }
          />

          {/* Routes for sign-in and sign-up */}
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInForm />
            }
          />
          <Route
            exact
            path="/signup"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignUpForm />
            }
          />

          {/* Routes for posts */}
          <Route
            exact
            path="/posts/create"
            render={() =>
              currentUser ? <PostCreateForm /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/posts/:id"
            render={() =>
              currentUser ? <PostPage /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/posts/:id/edit"
            render={() =>
              currentUser ? <PostEditForm /> : <Redirect to="/signin" />
            }
          />

          {/* Routes for profiles */}
          <Route
            exact
            path="/profiles/:id"
            render={() =>
              currentUser ? <ProfilePage /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() =>
              currentUser ? <UsernameForm /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() =>
              currentUser ? <UserPasswordForm /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() =>
              currentUser ? <ProfileEditForm /> : <Redirect to="/signin" />
            }
          />

          {/* Routes for products */}
          <Route
            exact
            path="/products"
            render={() => (
              <ProductsPage message="Sorry, no products found. Check back later!" />
            )}
          />
          <Route
            exact
            path="/products/create"
            render={() =>
              currentUser ? <ProductCreateForm /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/products/:id"
            render={() => <ProductPage />}
          />
          <Route
            exact
            path="/products/:id/edit"
            render={() =>
              currentUser ? <ProductEditForm /> : <Redirect to="/signin" />
            }
          />

          {/* Default route */}
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
