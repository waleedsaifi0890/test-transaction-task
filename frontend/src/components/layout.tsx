import React, { useState } from 'react';
import { Sidebar, Header } from '@app/components';
import Drawer from './drawer';

const Layout = ({
  children,
  record,
  pageTitle,
  simpleHeading,
  back,
  selectClass,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);



 

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <div className="flex">
        {isOpen ? <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} /> : ''}

        <Sidebar />

        <div className="w-[100%]">
          <div className="grid grid-cols-12">
            <div className="col-span-12 w-[100%] bg-white">
              <Header
                record={record}
                pageTitle={pageTitle}
                simpleHeading={simpleHeading}
                back={back}
                selectClass={selectClass}
                toggleDrawer={toggleDrawer}
                isOpen={isOpen}
              />
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
