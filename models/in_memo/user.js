// const users = [];

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  //解构传参
  // static get['users']() {
  //   return users;
  // }

  static list(){
    return User.users;
  }

  static insert(username,password){
    const user = new User(username,password);
    User.users.push(user);
    return user;
  }

  static getOneByName(username){   
    return User.users.find(u=>u.username == username);
  }
  getName() {
    return this.username;
  }

  static setUsername(username) {
    this.username = username;
  }
  static setPassword(password) {
    this.password = password;
  }
}

User.users = [];

module.exports = User;