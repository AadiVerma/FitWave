// import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import TopBar from './TopBar';
import PropTypes from 'prop-types';
import { useRef,useState } from 'react';
function Layout({ topbar }) {
  const refdropdown = useRef();
  const [showDropDown, setshowdropdown] = useState(false);
return (
  <div className="bg-black min-h-screen overflow-hidden flex">
    <SideBar />
    <div className="w-full flex flex-col">
      {topbar && <TopBar showDropDown={showDropDown} refdropdown={refdropdown} setshowdropdown={setshowdropdown}/>}
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
);
  }
Layout.propTypes = {
  topbar: PropTypes.bool,
};

export default Layout;

