/********************************************************************************************
 * Librería de todos los errores, queries y métodos de gestión de datos de las llamadas a API
 * *****************************************************************************************/

import { EXAMPLE_METHODS } from "./methods/example-methods";
import { USER_METHODS } from "./methods/user-methods";
import { TIME_METHODS } from "./methods/time-methods";
import { EXAMPLE_ERROR_MESSAGES, EXAMPLE_QUERIES } from "./queries/example-queries";
import { USER_ERROR_MESSAGES, USER_QUERIES } from "./queries/user-queries";
import { TIME_ERROR_MESSAGES, TIME_QUERIES } from "./queries/time-queries";

export const ERROR_MESSAGES = {
  ...EXAMPLE_ERROR_MESSAGES,
  ...USER_ERROR_MESSAGES,
  ...TIME_ERROR_MESSAGES,
};

export const QUERIES = {
  ...EXAMPLE_QUERIES,
  ...USER_QUERIES,
  ...TIME_QUERIES,
};

export const METHODS = {
  ...EXAMPLE_METHODS,
  ...USER_METHODS,
  ...TIME_METHODS,
};
