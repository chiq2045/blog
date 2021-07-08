import { User } from './user.model';

class UserDAO {
  private USER_DB: Collection<{}>;

  configure = (DB: Loki) => {
    let instance = this;
    DB.loadDatabase({}, () => {
      instance.USER_DB = DB.getCollection('user');
      if (!instance.USER_DB) {
        instance.USER_DB = DB.addCollection('user');
      }
    });
  };

  insertUser = (user: User) => {
    this.USER_DB.insert(user);
  };

  findByEmail = (email: string): any => {
    return this.USER_DB.find({ '$loki': { '$eq': email } });
  };

  update = (user: User) => {
    let persistedUser = this.findByEmail(user.email);
    persistedUser.items = user.items;
    this.USER_DB.update(persistedUser);
  };
}

export const SINGLETON: UserDAO = new UserDAO;
