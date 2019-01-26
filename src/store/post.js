import { observable, action, computed } from 'mobx'

class Post {
  @observable
  id = null
  @observable
  userId = null
  @observable
  content = ''
  @observable
  like = ''
}

export default Post
