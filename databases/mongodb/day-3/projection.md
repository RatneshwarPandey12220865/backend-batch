### MongoDB Notes with Examples and Coding Questions

#### **Projections in MongoDB**
- **Purpose:** Control the fields returned in a query.
- To include specific fields, use a projection value of `1` for the desired fields.
- To exclude fields, use a projection value of `0`.
- **Note:** You cannot include and exclude fields simultaneously in the same query projection.

**Example:**
```javascript
db.collection.find({}, { title: 1, author: 1 });
```
Returns only the `title` and `author` fields from each document.

---

#### **Embedded Documents in MongoDB**
- Used to store nested data structures.
- Access nested fields directly by specifying their paths.

**Operators for Embedded Documents:**
1. **$all**  
   Selects documents where an array field contains all specified elements.
2. **$elemMatch**  
   Matches documents containing an array field with at least one element that matches all specified query criteria.

---

#### **Update Operations**
- Modify documents in the collection.

**Key Methods:**
1. **updateOne**: Updates the first document that matches the filter.
2. **updateMany**: Updates all documents that match the filter.

**Example for `updateOne` and `updateMany`:**
```javascript
// Increment the 'likes' for a specific title
db.collection.updateOne(
  { title: "Understanding JavaScript Closures" },
  { $inc: { "metadata.likes": 1 } }
);

// Increment 'views' for all documents with 'likes' greater than 50
db.collection.updateMany(
  { "metadata.likes": { $gt: 50 } },
  { $inc: { "metadata.views": 100 } }
);
```

---

#### **Coding Questions**

1. **Find all videos where at least two specific users commented.**
   ```javascript
   db.collection.find(
     { "comments.user": { $all: ["user1", "user2"] } }
   );
   ```
   **Explanation:** `$all` ensures both users have commented on the same document.

2. **Find videos where a specific user commented with a specific text.**
   ```javascript
   db.collection.find(
     { comments: { $elemMatch: { user: "user13", text: "Love this guide on Express APIs!" } } }
   );
   ```
   **Explanation:** `$elemMatch` ensures both `user` and `text` criteria are met for at least one comment.

3. **Find videos with views over 2000 and specific users in comments.**
   ```javascript
   db.collection.find(
     { 
       "metadata.views": { $gt: 2000 },
       "comments.user": { $all: ["user29", "user30"] }
     }
   );
   ```
   **Explanation:** Combines `$all` and field-level filtering.

4. **Find videos where a comment contains both a user and a text pattern.**
   ```javascript
   db.collection.find(
     { comments: { $elemMatch: { user: "user6", text: /stages/i } } }
   );
   ```
   **Explanation:** `$elemMatch` is used for nested field matching, with regex for text.

