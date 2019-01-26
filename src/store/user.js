import { observable, action, computed } from 'mobx'

class User {
  @observable
  id = null
  @observable
  name = ''
  @observable
  email = ''
  @observable
  picture = ''
  @observable
  socialId = ''
  @observable
  status = ''
  @observable
  following = []

  @action
  setUser(data) {
    if (data) {
      this.id = data.id
      this.name = data.name
      this.email = data.email
      this.picture = data.picture
      this.status = data.status
      this.following = this.getFollowingIds(data.following)
    }
  }

  getFollowingIds(users) {
    const ids = []
    users.forEach(user => {
      ids.push(user.follow_id)
    })
    ids.push(this.id)
    return ids
  }
}

export default User
