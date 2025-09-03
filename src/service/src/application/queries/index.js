import exampleUseCases from './lib/example'
import userUseCases from './lib/user'
import timeUseCases from './lib/time'
import InvoiceUseCases from './lib/invoice'

const queries = {
  ...exampleUseCases,
  ...userUseCases,
  ...timeUseCases,
  ...InvoiceUseCases
  // ...ComerciosUseCases,
  // ...ClientUseCases
};

export default queries;
