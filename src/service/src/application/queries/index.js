import exampleUseCases from './lib/example'
import userUseCases from './lib/user'

const queries = {
  ...exampleUseCases,
  ...userUseCases,
  // ...ComerciosUseCases,
  // ...ClientUseCases
};

export default queries;
