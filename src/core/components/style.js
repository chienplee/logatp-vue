import app from '../../config/configApp';
import { UserCard } from '@/view/pages/style.js';

[
  {
    name: 'UserCard',
    ...UserCard,
  }  
].map((c) => {
  app.component(`sd${c.name}`, c);
});
