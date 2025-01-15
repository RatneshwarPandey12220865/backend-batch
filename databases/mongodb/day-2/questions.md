### **Practice Questions for `$expr`, `$exists`, and `$type`**

---

### **1. Using `$expr`**
#### **Question:**
Find documents where the `quantity` field is at least double the value of the `threshold` field.

#### **Answer:**
```javascript
db.collectionName.find({
  $expr: { $gte: ["$quantity", { $multiply: ["$threshold", 2] }] }
});
```
- **Explanation**:
  - `$gte`: Checks if `quantity` is greater than or equal to double the `threshold`.
  - `$multiply`: Multiplies the `threshold` value by 2.

---

### **2. Using `$exists`**
#### **Question:**
Find documents where the `rating` field does not exist or is missing.

#### **Answer:**
```javascript
db.collectionName.find({
  rating: { $exists: false }
});
```
- **Explanation**:
  - `$exists: false`: Matches documents where the `rating` field is absent.

---

### **3. Using `$type`**
#### **Question:**
Find documents where the `price` field is either a `decimal` or an `integer`.

#### **Answer:**
```javascript
db.collectionName.find({
  price: { $type: ["decimal", "int"] }
});
```
- **Explanation**:
  - `$type`: Matches the field's BSON type. In this case, both `decimal` (type 19) and `int` (type 16) are specified.

---

### **Bonus Question (Combination):**
#### **Question:**
Find documents where the `discount` field exists, is of type `double`, and the value of the `discount` is less than the `price`.

#### **Answer:**
```javascript
db.collectionName.find({
  discount: { $exists: true, $type: "double" },
  $expr: { $lt: ["$discount", "$price"] }
});
```
- **Explanation**:
  - `$exists: true`: Ensures the `discount` field exists.
  - `$type: "double"`: Ensures the `discount` field is of type `double`.
  - `$expr`: Compares the `discount` and `price` fields using `$lt` (less than).

---
