### Summary of JSON Web Tokens (JWT):

1. **Definition**: 
   - JWT is an open standard (RFC 7519) for securely transmitting information as a JSON object between parties. It is compact and self-contained, and the information can be verified and trusted because it is digitally signed.

2. **Structure**:
   - JWTs consist of three parts: Header, Payload, and Signature, separated by dots (`.`).
   - **Header**: Contains the type of token (JWT) and the signing algorithm (e.g., HMAC SHA256, RSA).
   - **Payload**: Contains claims about an entity (e.g., user) and additional data. Claims can be registered, public, or private.
   - **Signature**: Created by encoding the header and payload, then signing them with a secret or private key.

3. **Use Cases**:
   - **Authorization**: Commonly used for authorization, allowing users to access resources with a token after logging in.
   - **Information Exchange**: Securely transmits information between parties, ensuring the sender's identity and data integrity.

4. **How JWT Works**:
   - Upon successful login, a JWT is returned and used in subsequent requests, typically in the Authorization header as a Bearer token.
   - JWTs are stateless, reducing the need for server-side session storage.

5. **Benefits**:
   - More compact than XML-based standards like SAML, making it suitable for HTML and HTTP environments.
   - Supports both symmetric (HMAC) and asymmetric (RSA, ECDSA) signing.
   - Easier to work with due to JSON's natural mapping to objects in most programming languages.

### Notes:

- **Security**: JWTs should not contain sensitive information unless encrypted, as the payload is readable by anyone.
- **Size Limitation**: Be cautious of the token size, especially when sending through HTTP headers, as some servers have size limits.
- **Cross-Origin Resource Sharing (CORS)**: JWTs in the Authorization header do not face CORS issues as cookies do.
- **Statelessness**: JWTs enable stateless authentication, reducing server-side session management.
- **Common Use**: Widely used for Single Sign-On (SSO) due to its efficiency and ease of use across different domains.

For more detailed information, you can visit the [JWT Introduction page on jwt.io](https://jwt.io/introduction).