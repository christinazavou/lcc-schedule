import { WebsiteHeader } from 'components/header/WebsiteHeader';
import WebsiteFooter from 'components/footer/WebsiteFooter';
import { Outlet } from 'react-router-dom';
import './WebsiteLayout.css';

export const WebsiteLayout = () => (
  <div className="web-container">
    <WebsiteHeader />
    <main>
      <Outlet /> {/* Child components will be injected here */}
    </main>
    <WebsiteFooter />
  </div>
);
