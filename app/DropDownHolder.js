class DropDownHolder {
  static dropDown;
  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }
  static getDropDown() {
    return this.dropDown;
  }

  static throwError(msg) {
    this.dropDown.alertWithType('error', 'Error', msg);
  }

  static throwSuccess(msg) {
    this.dropDown.alertWithType('success', 'Success', msg);
  }
}

export default DropDownHolder;