export const checkExpiration = (expireTime: string): boolean => {
  try {
    const currentTime = new Date();
    const expirationTime = new Date(expireTime);

    if (expirationTime <= currentTime) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Error checking expiration time:', error);
    return false;
  }
};
