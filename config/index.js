const dev = process.env.NODE_ENV !== 'production';

// export const server = dev
//   ? 'http://localhost:5003'
//   : 'https://secure-mountain-41419.herokuapp.com';

export const web = dev ? 'http://localhost:3000' : 'https://yourwebsite.com';

export const server = 'https://secure-mountain-41419.herokuapp.com';
  
// export const web = dev ? 'https://yourwebsite.com' : 'http://localhost:3000';
