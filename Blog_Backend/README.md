# Blog Backend API Documentation

## Base URL

```
http://localhost:3000
```

## Endpoints

### Create a New Blog Post

- **Description:** Create a new blog post.
- **URL:** `/blogs/post`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "Sample Title",
    "content": "Sample content of the blog post.",
    "summary": "Short summary of the blog post."
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "blogPost": {
        "_id": "unique_id",
        "title": "Sample Title",
        "content": "Sample content of the blog post.",
        "summary": "Short summary of the blog post.",
        "date": "2023-10-10T00:00:00.000Z"
      }
    }
    ```
  - **Error (400):**
    ```json
    {
      "errors": [
        {
          "msg": "Title should be atleast 3 characters long",
          "param": "title",
          "location": "body"
        }
      ]
    }
    ```

### Get All Blog Posts

- **Description:** Retrieve all blog posts.
- **URL:** `/blogs/post`
- **Method:** `GET`
- **Response:**
  - **Success (200):**
    ```json
    {
      "allBlogPosts": [
        {
          "_id": "unique_id",
          "title": "Sample Title",
          "content": "Sample content of the blog post.",
          "summary": "Short summary of the blog post.",
          "date": "2023-10-10T00:00:00.000Z"
        }
      ]
    }
    ```
  - **Error (500):**
    ```json
    {
      "error": "Internal server error"
    }
    ```

### Get a Specific Blog Post

- **Description:** Retrieve a specific blog post by ID.
- **URL:** `/blogs/post/:id`
- **Method:** `GET`
- **Response:**
  - **Success (200):**
    ```json
    {
      "oneBlogPost": {
        "_id": "unique_id",
        "title": "Sample Title",
        "content": "Sample content of the blog post.",
        "summary": "Short summary of the blog post.",
        "date": "2023-10-10T00:00:00.000Z"
      }
    }
    ```
  - **Error (404):**
    ```json
    {
      "error": "Post not found"
    }
    ```

### Edit a Specific Blog Post

- **Description:** Edit a specific blog post by ID.
- **URL:** `/blogs/post/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content of the blog post.",
    "summary": "Updated summary of the blog post."
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "updatedBlogPost": {
        "_id": "unique_id",
        "title": "Updated Title",
        "content": "Updated content of the blog post.",
        "summary": "Updated summary of the blog post.",
        "date": "2023-10-10T00:00:00.000Z"
      }
    }
    ```
  - **Error (400):**
    ```json
    {
      "errors": [
        {
          "msg": "Title should be atleast 3 characters long",
          "param": "title",
          "location": "body"
        }
      ]
    }
    ```

### Delete a Specific Blog Post

- **Description:** Delete a specific blog post by ID.
- **URL:** `/blogs/post/:id`
- **Method:** `DELETE`
- **Response:**
  - **Success (200):**
    ```json
    {
      "message": "Post deleted Successfully"
    }
    ```
  - **Error (404):**
    ```json
    {
      "error": "Post not found"
    }
    ```

## Error Codes

- **400:** Bad Request
- **404:** Not Found
- **500:** Internal Server Error
