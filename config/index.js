const dev = process.env.NODE_ENV !== 'production';

<<<<<<< HEAD
export const server = dev
  ? 'http://localhost:5003'
  : 'https://secure-mountain-41419.herokuapp.com/';
=======
export const server = dev ? 'http://localhost:5003' : 'https://secure-mountain-41419.herokuapp.com';
>>>>>>> 93cee0c982e1340159c1f6937fa403bce5d55436

export const web = dev ? 'http://localhost:3000' : 'https://yourwebsite.com';
