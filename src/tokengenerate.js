function randomStringGenerator(size) {
    let randomString = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i += 1) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
  }

  module.exports = randomStringGenerator;