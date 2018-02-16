const REDISPATTERN = /^redis[s]{0,1}:\/\/([a-z]{0,}:[a-zA-z0-9\-_\.!@£$%^&*\(\)\{\}\[\]]{1,}@){0,1}.{1,}:[0-9]{1,5}(\/[0-9]{1}){0,1}/;

module.exports = {
  REDISPATTERN,
};