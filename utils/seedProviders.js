const { Provider } = require('../db/db');

const main = async () => {
  const count = await Provider.count();

  if (count === 0) {
    await Provider.insert({ url: 'github.com', name: 'github', order: 0 });
    await Provider.insert({ url: 'figma.com', name: 'figma', order: 1 });
  }
};

main().then();
