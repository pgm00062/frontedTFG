/********************************************************************************************
 * Librería de todos los errores, queries y métodos de gestión de datos de las llamadas a API
 * *****************************************************************************************/

import { EXAMPLE_METHODS } from "./methods/example-methods";
import { USER_METHODS } from "./methods/user-methods";
import { TIME_METHODS } from "./methods/time-methods";
import { INVOICE_METHODS } from "./methods/invoice-methods";
import { EXAMPLE_ERROR_MESSAGES, EXAMPLE_QUERIES } from "./queries/example-queries";
import { USER_ERROR_MESSAGES, USER_QUERIES } from "./queries/user-queries";
import { TIME_ERROR_MESSAGES, TIME_QUERIES } from "./queries/time-queries";
import { INVOICE_ERROR_QUERIES, INVOICE_QUERIES } from "./queries/invoice-queries";

export const ERROR_MESSAGES = {
  ...EXAMPLE_ERROR_MESSAGES,
  ...USER_ERROR_MESSAGES,
  ...TIME_ERROR_MESSAGES,
  ...INVOICE_ERROR_QUERIES,
};

export const QUERIES = {
  ...EXAMPLE_QUERIES,
  ...USER_QUERIES,
  ...TIME_QUERIES,
  ...INVOICE_QUERIES,
};

export const METHODS = {
  ...EXAMPLE_METHODS,
  ...USER_METHODS,
  ...TIME_METHODS,
  ...INVOICE_METHODS,
};
