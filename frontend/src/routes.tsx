import type { RouteObject } from 'react-router';
import { MainLayout } from '@app/layout';
import Transaction from './pages/transactions/main';
import TransactionDetails from './pages/transaction-details/main';
import Error from './pages/error/main';



//  * PAGES

const routes: RouteObject[] = [
 

  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Transaction />
        ),
      },

      {
        path: 'transaction-details/:id',
        element: (
          <TransactionDetails />
        ),
      },
     
     
      {
        path: '*',
        element: (
          <Error />
        ),
      },
    
    ],
  },
];

export default routes; 
