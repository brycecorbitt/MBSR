class DropDownHolder {
  static dropDown;
  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }
  static getDropDown() {
    return this.dropDown;
  }

  static throwError(msg) {
    msg = msg ||  "unknown error";
    this.dropDown.alertWithType('error', 'Error', msg);
  }

  static throwSuccess(msg) {
    msg = msg ||  "success";
    this.dropDown.alertWithType('success', 'Success', msg);
  }
}

export default DropDownHolder;