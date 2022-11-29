module.exports = class Review {
  id;
  userID;
  detail;

  constructor(row) {
    this.id = row.id;
    this.userID = row.user_id;
    this.detail = row.detail;
  }
};
