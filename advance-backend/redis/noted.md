### Redis Notes

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports various data structures such as strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, and geospatial indexes.

---

## **1. Installation Using Docker**

To install Redis using Docker, follow these steps:

### ** Pull the Redis Image**
Run the following command to pull the official Redis image from Docker Hub:
```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
docker ps
docker exec -it docker_id" bash
redis-cli ping

```


---

## **2. Redis Data Structures**

Redis supports several data structures, including:
1. **Strings**
2. **Lists**
3. **Sets**
4. **Sorted Sets**
5. **Hashes**
6. **Bitmaps**
7. **HyperLogLogs**
8. **Geospatial Indexes**
9. **Streams**

Below, we will cover **Strings** and **Lists** in detail.

---

## **3. Strings**

Strings are the most basic data type in Redis. They can store text, integers, or binary data.

### **Basic Commands for Strings**

#### **SET and GET**
- **SET**: Stores a value in a key.
  ```bash
  SET key:id value
  ```
  Example:
  ```bash
  SET name "John"
  ```

- **GET**: Retrieves the value of a key.
  ```bash
  GET key
  ```
  Example:
  ```bash
  GET name
  ```

#### **INCR and DECR**
- **INCR**: Increments the integer value of a key by 1.
  ```bash
  INCR key
  ```
  Example:
  ```bash
  SET counter 10
  INCR counter
  ```

- **DECR**: Decrements the integer value of a key by 1.
  ```bash
  DECR key
  ```
  Example:
  ```bash
  DECR counter
  ```

#### **INCRBY and DECRBY**
- **INCRBY**: Increments the integer value of a key by a specified amount.
  ```bash
  INCRBY key increment
  ```
  Example:
  ```bash
  INCRBY counter 5
  ```

- **DECRBY**: Decrements the integer value of a key by a specified amount.
  ```bash
  DECRBY key decrement
  ```
  Example:
  ```bash
  DECRBY counter 3
  ```

#### **APPEND**
- **APPEND**: Appends a value to the string stored at a key.
  ```bash
  APPEND key value
  ```
  Example:
  ```bash
  SET greeting "Hello"
  APPEND greeting " World"
  ```

#### **STRLEN**
- **STRLEN**: Returns the length of the string stored at a key.
  ```bash
  STRLEN key
  ```
  Example:
  ```bash
  STRLEN greeting
  ```

---

## **4. Lists**

Lists in Redis are ordered collections of strings, implemented as linked lists. They allow push and pop operations from both ends.

### **Basic Commands for Lists**

#### **LPUSH and RPUSH**
- **LPUSH**: Adds one or more elements to the head (left) of a list.
  ```bash
  LPUSH key value [value ...]
  ```
  Example:
  ```bash
  LPUSH tasks "Task1"
  LPUSH tasks "Task2"
  ```

- **RPUSH**: Adds one or more elements to the tail (right) of a list.
  ```bash
  RPUSH key value [value ...]
  ```
  Example:
  ```bash
  RPUSH tasks "Task3"
  ```

#### **LPOP and RPOP**
- **LPOP**: Removes and returns the first element (leftmost) of a list.
  ```bash
  LPOP key
  ```
  Example:
  ```bash
  LPOP tasks
  ```

- **RPOP**: Removes and returns the last element (rightmost) of a list.
  ```bash
  RPOP key
  ```
  Example:
  ```bash
  RPOP tasks
  ```

#### **LRANGE**
- **LRANGE**: Retrieves a range of elements from a list.
  ```bash
  LRANGE key start stop
  ```
  Example:
  ```bash
  LRANGE tasks 0 -1
  ```
  - `0` refers to the first element.
  - `-1` refers to the last element.

#### **LLEN**
- **LLEN**: Returns the length of a list.
  ```bash
  LLEN key
  ```
  Example:
  ```bash
  LLEN tasks
  ```

#### **LREM**
- **LREM**: Removes elements from a list.
  ```bash
  LREM key count value
  ```
  - `count > 0`: Removes up to `count` occurrences from the head.
  - `count < 0`: Removes up to `count` occurrences from the tail.
  - `count = 0`: Removes all occurrences.
  Example:
  ```bash
  LREM tasks 1 "Task1"
  ```

#### **LTRIM**
- **LTRIM**: Trims a list to the specified range.
  ```bash
  LTRIM key start stop
  ```
  Example:
  ```bash
  LTRIM tasks 0 2
  ```

---


### Redis with Node.js Using `ioredis`

`ioredis` is a popular Redis client for Node.js. Below, we will provide examples of how to interact with Redis **Strings** and **Lists** using `ioredis`. Each example will include the necessary setup and usage.

---

## **1. Setup**

### **Install `ioredis`**
To use `ioredis`, install it via npm:
```bash
npm install ioredis
```

### **Create a Redis Client**
In both `string.js` and `list.js`, you'll need to create a Redis client. Here's how:

```javascript
const Redis = require("ioredis");
const redis = new Redis(); // Connects to localhost:6379 by default
```

---

## **2. Strings Example (`string.js`)**

Below is an example of interacting with Redis Strings using `ioredis`.

### **Code: `string.js`**
```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runStringExamples() {
  try {
    // SET a key-value pair
    await redis.set("name", "Alice");
    console.log('SET name = "Alice"');

    // GET the value of a key
    const name = await redis.get("name");
    console.log(`GET name: ${name}`);

    // INCR: Increment a numeric value
    await redis.set("counter", 10);
    console.log('SET counter = 10');
    await redis.incr("counter");
    const incrementedCounter = await redis.get("counter");
    console.log(`INCR counter: ${incrementedCounter}`);

    // DECR: Decrement a numeric value
    await redis.decr("counter");
    const decrementedCounter = await redis.get("counter");
    console.log(`DECR counter: ${decrementedCounter}`);

    // APPEND: Append to a string
    await redis.set("greeting", "Hello");
    console.log('SET greeting = "Hello"');
    await redis.append("greeting", " World");
    const greeting = await redis.get("greeting");
    console.log(`APPEND greeting: ${greeting}`);

    // STRLEN: Get the length of a string
    const length = await redis.strlen("greeting");
    console.log(`STRLEN greeting: ${length}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Disconnect from Redis
    redis.disconnect();
  }
}

runStringExamples();
```

### **Output**
When you run `node string.js`, the output will look like this:
```
SET name = "Alice"
GET name: Alice
SET counter = 10
INCR counter: 11
DECR counter: 10
SET greeting = "Hello"
APPEND greeting: Hello World
STRLEN greeting: 11
```

---

## **3. Lists Example (`list.js`)**

Below is an example of interacting with Redis Lists using `ioredis`.

### **Code: `list.js`**
```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runListExamples() {
  try {
    // LPUSH: Add elements to the head of the list
    await redis.lpush("tasks", "Task3");
    await redis.lpush("tasks", "Task2");
    await redis.lpush("tasks", "Task1");
    console.log('LPUSH tasks: ["Task1", "Task2", "Task3"]');

    // RPUSH: Add elements to the tail of the list
    await redis.rpush("tasks", "Task4");
    console.log('RPUSH tasks: ["Task1", "Task2", "Task3", "Task4"]');

    // LRANGE: Retrieve all elements in the list
    const tasks = await redis.lrange("tasks", 0, -1);
    console.log(`LRANGE tasks: ${tasks}`);

    // LPOP: Remove and return the first element
    const firstTask = await redis.lpop("tasks");
    console.log(`LPOP tasks: ${firstTask}`);

    // RPOP: Remove and return the last element
    const lastTask = await redis.rpop("tasks");
    console.log(`RPOP tasks: ${lastTask}`);

    // LLEN: Get the length of the list
    const length = await redis.llen("tasks");
    console.log(`LLEN tasks: ${length}`);

    // LREM: Remove occurrences of a value
    await redis.lpush("tasks", "Task2");
    await redis.lrem("tasks", 1, "Task2"); // Remove 1 occurrence of "Task2"
    console.log('LREM tasks: Removed 1 occurrence of "Task2"');

    // LTRIM: Trim the list to a specific range
    await redis.ltrim("tasks", 0, 1); // Keep only the first two elements
    console.log("LTRIM tasks: Kept only the first two elements");

    // Final list after operations
    const finalTasks = await redis.lrange("tasks", 0, -1);
    console.log(`Final LRANGE tasks: ${finalTasks}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Disconnect from Redis
    redis.disconnect();
  }
}

runListExamples();
```

### **Output**
When you run `node list.js`, the output will look like this:
```
LPUSH tasks: ["Task1", "Task2", "Task3"]
RPUSH tasks: ["Task1", "Task2", "Task3", "Task4"]
LRANGE tasks: Task1,Task2,Task3,Task4
LPOP tasks: Task1
RPOP tasks: Task4
LLEN tasks: 2
LREM tasks: Removed 1 occurrence of "Task2"
LTRIM tasks: Kept only the first two elements
Final LRANGE tasks: Task3,Task2
```

---

## **4. Explanation of Key Concepts**

### **Redis Strings**
- **SET/GET**: Store and retrieve simple key-value pairs.
- **INCR/DECR**: Perform atomic increments and decrements on numeric values.
- **APPEND**: Concatenate strings efficiently.
- **STRLEN**: Measure the size of stored strings.

### **Redis Lists**
- **LPUSH/RPUSH**: Add elements to the head or tail of a list.
- **LPOP/RPOP**: Remove elements from the head or tail.
- **LRANGE**: Retrieve a subset of elements from a list.
- **LLEN**: Get the total number of elements in a list.
- **LREM**: Remove specific occurrences of a value.
- **LTRIM**: Trim the list to a specified range.

---

## **5. Running the Examples**

1. Start your Redis server (e.g., using Docker as shown earlier).
2. Save the code for `string.js` and `list.js` in separate files.
3. Run the scripts:
   ```bash
   node string.js
   node list.js
   ```

---

## **Conclusion**

Using `ioredis`, you can easily interact with Redis data structures like Strings and Lists in Node.js. The examples provided demonstrate common operations and their outputs. You can extend these examples to work with other Redis data structures such as Sets, Sorted Sets, Hashes, and more.

## **5. Other Redis Data Structures**

### **Sets**
- Unordered collections of unique strings.
- Common commands: `SADD`, `SMEMBERS`, `SREM`, `SINTER`, `SUNION`.

### **Sorted Sets**
- Similar to sets but with scores associated with each member.
- Common commands: `ZADD`, `ZRANGE`, `ZREM`, `ZSCORE`.

### **Hashes**
- Maps between string fields and string values.
- Common commands: `HSET`, `HGET`, `HDEL`, `HGETALL`.

### **Bitmaps**
- Bit-level operations on strings.
- Common commands: `SETBIT`, `GETBIT`, `BITCOUNT`.

### **HyperLogLogs**
- Probabilistic data structure for estimating the cardinality of a set.
- Common commands: `PFADD`, `PFCOUNT`, `PFMERGE`.

### **Geospatial Indexes**
- Store and query geospatial data.
- Common commands: `GEOADD`, `GEODIST`, `GEORADIUS`.

### **Streams**
- Append-only logs for messaging and event sourcing.
- Common commands: `XADD`, `XRANGE`, `XREAD`.

---

## **Conclusion**

Redis is a versatile and powerful tool for managing in-memory data structures. By using Docker, you can quickly set up a Redis instance and experiment with its rich set of commands. This guide covered installation, strings, lists, and an overview of other data structures. For further exploration, refer to the official Redis documentation. 

**Final Note:** Always ensure proper persistence and backup strategies when using Redis in production environments.





https://docs.docker.com/desktop/setup/install/windows-install/
https://docs.docker.com/desktop/setup/install/mac-install/