import React from 'react';
import { Outlet } from 'react-router-dom';

export const Authlayout = () => {
  return (
        <div>
          <Outlet />
        </div>
  );
}
