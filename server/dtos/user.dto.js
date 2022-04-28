//dto - Data Transfer Object
module.exports = class UserDto {
  id;
  email;
  isActivated;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.isActivated = model.is_activated;
  }
}