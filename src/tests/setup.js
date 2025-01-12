// setup.js
import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';

before(async () => {
  // Setup code
});

after(async () => {
  await mongoose.disconnect();
});