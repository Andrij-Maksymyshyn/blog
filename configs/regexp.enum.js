module.exports = {
  EMAIL_REGEXP:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD_REGEXP: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"),
  URL_REGEXP: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
  OBJECT_ID: /^[0-9a-fA-F]{24}$/,
  SORT_BY:
    /^asc\(title\)|desc\(title\)|asc\(_id\)|desc\(_id\)|asc\(text\)|desc\(text\)|asc\(viewsCount\)|desc\(viewsCount\)|asc\(date\)|desc\(date\)|asc\(user\)|desc\(user\)$/m
};
