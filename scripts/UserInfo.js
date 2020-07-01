class UserInfo {
  constructor(userName, userAbout){
    this.userName = userName;
    this.userAbout = userAbout;
  }

  setUserInfo(name, about) {
    this.name = name;
    this.about = about;
  };

  upDateUserInfo() { // updateUserInfo
    this.userName.textContent = this.name;
    this.userAbout.textContent= this.about;
  };
}