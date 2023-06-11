const EMAIL_REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEXP = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
);
const URL_REGEXP = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
const OBJECT_ID = /^([0-9a-fA-F]{24})|([0-9a-fA-F]{24})$/;
const SORT_BY =
  /^asc\(title\)|desc\(title\)|asc\(_id\)|desc\(_id\)|asc\(viewsCount\)|desc\(viewsCount\)|asc\(date\)|desc\(date\)$/m;
const DATE =
  /^\d{4}-\d{2}-\d{2}|\d{4}-\d{2}-\d{2} \d{2}:\d{2}|^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

export { EMAIL_REGEXP, PASSWORD_REGEXP, URL_REGEXP, OBJECT_ID, SORT_BY, DATE };
