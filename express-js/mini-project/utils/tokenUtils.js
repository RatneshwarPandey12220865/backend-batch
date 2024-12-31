import crypto from 'crypto';

// Generate a secure random token
export const generateToken = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Validate token (simple mock validation for this example)
export const validateToken = (token) => {
  // Mock validation: Accept tokens with even-length hex
  return token.length === 32;
};
