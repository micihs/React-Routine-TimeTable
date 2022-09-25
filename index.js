import { iconsLoaded } from './src/lib/iconSources';

iconsLoaded.then(() => {
  require('./src/app');
});
