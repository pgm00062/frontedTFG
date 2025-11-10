import exampleUseCases from './lib/example'
import userUseCases from './lib/user'
import timeUseCases from './lib/time'
import InvoiceUseCases from './lib/invoice'
import statisticsUseCases from './lib/statistics'

const queries = {
  ...exampleUseCases,
  ...userUseCases,
  ...timeUseCases,
  ...InvoiceUseCases,
  ...statisticsUseCases
  // ...ComerciosUseCases,
  // ...ClientUseCases
};

export default queries;
