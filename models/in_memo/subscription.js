class Subscription{
  constructor(userId,url){
    this.userId = userId;
    this.url = url;
  }
  static list(){
    return Subscription.sbscriptions;
  }
  static insert(userId,url){
    const sub = new Subscription(userId,url);
    Subscription.sbscriptions.push(sub);
    return sub;
  }

  static findByUserId(userId){
    return Subscription.sbscriptions.map(function(sub) {
      sub.userId === userId;
      return sub;
    })
  }
}

Subscription.sbscriptions = [];

module.exports = Subscription;