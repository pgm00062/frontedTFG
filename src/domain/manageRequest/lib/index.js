/********************************************************************************************
 * Librería de todos los errores, queries y métodos de gestión de datos de las llamadas a API
 * *****************************************************************************************/

import { EXAMPLE_METHODS } from "./methods/example-methods";
import { USER_METHODS } from "./methods/user-methods";
import { EXAMPLE_ERROR_MESSAGES, EXAMPLE_QUERIES } from "./queries/example-queries";
import { USER_ERROR_MESSAGES, USER_QUERIES } from "./queries/user-queries";

export const ERROR_MESSAGES = {
  ...EXAMPLE_ERROR_MESSAGES,
  ...USER_ERROR_MESSAGES,
};

export const QUERIES = {
  ...EXAMPLE_QUERIES,
  ...USER_QUERIES,
};

export const METHODS = {
  ...EXAMPLE_METHODS,
  ...USER_METHODS,
};
