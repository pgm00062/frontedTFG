import exampleUseCases from './lib/example'
import userUseCases from './lib/user'
import timeUseCases from './lib/time'

const queries = {
  ...exampleUseCases,
  ...userUseCases,
  ...timeUseCases,
  // ...ComerciosUseCases,
  // ...ClientUseCases
};

export default queries;
