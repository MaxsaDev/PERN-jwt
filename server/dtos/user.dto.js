//dto - Data Transfer Object
module.exports = class UserDto {
  id;
  email;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
  }
}