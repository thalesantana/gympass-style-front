import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div>
      <header>Cabeçalho</header>
      
      <div>
        <Outlet />
      </div>
    </div>
  )
}