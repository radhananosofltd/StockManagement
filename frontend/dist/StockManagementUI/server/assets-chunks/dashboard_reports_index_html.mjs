export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>StockManagementUI</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">

[_nghost-ng-c3984273398] {
  display: block;
  width: 100%;
  height: 100vh;
}
/*# sourceMappingURL=/app.css.map */</style><style ng-app-id="ng">

.dashboard-container[_ngcontent-ng-c2393321974] {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}
.main-content[_ngcontent-ng-c2393321974] {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content-header[_ngcontent-ng-c2393321974] {
  background: white;
  padding: 2rem 3rem;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
.content-header[_ngcontent-ng-c2393321974]   h1[_ngcontent-ng-c2393321974] {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.content-header[_ngcontent-ng-c2393321974]   p[_ngcontent-ng-c2393321974] {
  color: #64748b;
  margin: 0;
  font-size: 1.1rem;
}
.content-body[_ngcontent-ng-c2393321974] {
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
}
@media (max-width: 768px) {
  .content-header[_ngcontent-ng-c2393321974] {
    padding: 1.5rem 2rem;
  }
  .content-header[_ngcontent-ng-c2393321974]   h1[_ngcontent-ng-c2393321974] {
    font-size: 1.75rem;
  }
  .content-body[_ngcontent-ng-c2393321974] {
    padding: 1.5rem 2rem;
  }
}
@media (max-width: 640px) {
  .content-header[_ngcontent-ng-c2393321974] {
    padding: 1rem 1.5rem;
  }
  .content-header[_ngcontent-ng-c2393321974]   h1[_ngcontent-ng-c2393321974] {
    font-size: 1.5rem;
  }
  .content-body[_ngcontent-ng-c2393321974] {
    padding: 1rem 1.5rem;
  }
}
/*# sourceMappingURL=/dashboard.component.css.map */</style><style ng-app-id="ng">

.sidebar[_ngcontent-ng-c3240811650] {
  width: 280px;
  background:
    linear-gradient(
      180deg,
      #1e293b 0%,
      #334155 100%);
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}
.sidebar-header[_ngcontent-ng-c3240811650] {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.logo[_ngcontent-ng-c3240811650] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.logo-icon[_ngcontent-ng-c3240811650] {
  width: 2rem;
  height: 2rem;
  color: #60a5fa;
}
.logo-text[_ngcontent-ng-c3240811650] {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}
.sidebar-nav[_ngcontent-ng-c3240811650] {
  flex: 1;
  padding: 1.5rem 0;
}
.nav-section[_ngcontent-ng-c3240811650] {
  margin-bottom: 2rem;
}
.nav-section-title[_ngcontent-ng-c3240811650] {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0 0 1rem 1.5rem;
}
.nav-list[_ngcontent-ng-c3240811650] {
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-item[_ngcontent-ng-c3240811650] {
  margin-bottom: 0.25rem;
}
.nav-link[_ngcontent-ng-c3240811650] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  position: relative;
}
.nav-link[_ngcontent-ng-c3240811650]:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-left-color: #60a5fa;
}
.nav-link.active[_ngcontent-ng-c3240811650] {
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
  border-left-color: #60a5fa;
  font-weight: 600;
}
.nav-link.active[_ngcontent-ng-c3240811650]::before {
  content: "";
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: #60a5fa;
  border-radius: 50%;
}
.nav-icon[_ngcontent-ng-c3240811650] {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}
.nav-text[_ngcontent-ng-c3240811650] {
  font-size: 0.95rem;
}
.sidebar-footer[_ngcontent-ng-c3240811650] {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
}
.user-info[_ngcontent-ng-c3240811650] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.user-avatar[_ngcontent-ng-c3240811650] {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(96, 165, 250, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-avatar[_ngcontent-ng-c3240811650]   svg[_ngcontent-ng-c3240811650] {
  width: 1.5rem;
  height: 1.5rem;
  color: #60a5fa;
}
.user-details[_ngcontent-ng-c3240811650] {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}
.user-name[_ngcontent-ng-c3240811650] {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
}
.user-role[_ngcontent-ng-c3240811650] {
  font-size: 0.75rem;
  color: #94a3b8;
}
@media (max-width: 768px) {
  .sidebar[_ngcontent-ng-c3240811650] {
    width: 240px;
  }
  .logo-text[_ngcontent-ng-c3240811650] {
    font-size: 1.25rem;
  }
  .nav-link[_ngcontent-ng-c3240811650] {
    padding: 0.75rem 1rem;
  }
  .sidebar-header[_ngcontent-ng-c3240811650], 
   .sidebar-footer[_ngcontent-ng-c3240811650] {
    padding: 1.5rem 1rem;
  }
}
@media (max-width: 640px) {
  .sidebar[_ngcontent-ng-c3240811650] {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .sidebar.open[_ngcontent-ng-c3240811650] {
    transform: translateX(0);
  }
}
/*# sourceMappingURL=/sidebar.component.css.map */</style><style ng-app-id="ng">

.home-page[_ngcontent-ng-c1990559582] {
  max-width: 1200px;
  margin: 0 auto;
}
.welcome-section[_ngcontent-ng-c1990559582] {
  margin-bottom: 3rem;
}
.welcome-section[_ngcontent-ng-c1990559582]   h2[_ngcontent-ng-c1990559582] {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.75rem 0;
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.welcome-section[_ngcontent-ng-c1990559582]   p[_ngcontent-ng-c1990559582] {
  color: #64748b;
  font-size: 1.2rem;
  margin: 0;
}
.stats-grid[_ngcontent-ng-c1990559582] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}
.stat-card[_ngcontent-ng-c1990559582] {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.stat-card[_ngcontent-ng-c1990559582]:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}
.stat-icon[_ngcontent-ng-c1990559582] {
  width: 4rem;
  height: 4rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon[_ngcontent-ng-c1990559582]   svg[_ngcontent-ng-c1990559582] {
  width: 2rem;
  height: 2rem;
}
.stat-icon.companies[_ngcontent-ng-c1990559582] {
  background:
    linear-gradient(
      135deg,
      #3b82f6 0%,
      #1d4ed8 100%);
  color: white;
}
.stat-icon.stocks[_ngcontent-ng-c1990559582] {
  background:
    linear-gradient(
      135deg,
      #10b981 0%,
      #059669 100%);
  color: white;
}
.stat-icon.portfolio[_ngcontent-ng-c1990559582] {
  background:
    linear-gradient(
      135deg,
      #f59e0b 0%,
      #d97706 100%);
  color: white;
}
.stat-icon.reports[_ngcontent-ng-c1990559582] {
  background:
    linear-gradient(
      135deg,
      #8b5cf6 0%,
      #7c3aed 100%);
  color: white;
}
.stat-content[_ngcontent-ng-c1990559582]   h3[_ngcontent-ng-c1990559582] {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}
.stat-content[_ngcontent-ng-c1990559582]   p[_ngcontent-ng-c1990559582] {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}
.actions-section[_ngcontent-ng-c1990559582] {
  margin-bottom: 3rem;
}
.actions-section[_ngcontent-ng-c1990559582]   h3[_ngcontent-ng-c1990559582] {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
}
.actions-grid[_ngcontent-ng-c1990559582] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.action-card[_ngcontent-ng-c1990559582] {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
.action-card[_ngcontent-ng-c1990559582]:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
}
.action-icon[_ngcontent-ng-c1990559582] {
  width: 3rem;
  height: 3rem;
  background:
    linear-gradient(
      135deg,
      #f1f5f9 0%,
      #e2e8f0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.action-icon[_ngcontent-ng-c1990559582]   svg[_ngcontent-ng-c1990559582] {
  width: 1.5rem;
  height: 1.5rem;
  color: #475569;
}
.action-content[_ngcontent-ng-c1990559582]   h4[_ngcontent-ng-c1990559582] {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}
.action-content[_ngcontent-ng-c1990559582]   p[_ngcontent-ng-c1990559582] {
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}
.recent-activity[_ngcontent-ng-c1990559582]   h3[_ngcontent-ng-c1990559582] {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
}
.activity-list[_ngcontent-ng-c1990559582] {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.activity-item[_ngcontent-ng-c1990559582] {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f1f5f9;
}
.activity-item[_ngcontent-ng-c1990559582]:last-child {
  border-bottom: none;
}
.activity-icon[_ngcontent-ng-c1990559582] {
  width: 2.5rem;
  height: 2.5rem;
  background:
    linear-gradient(
      135deg,
      #ecfdf5 0%,
      #f0fdf4 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.activity-icon[_ngcontent-ng-c1990559582]   svg[_ngcontent-ng-c1990559582] {
  width: 1.25rem;
  height: 1.25rem;
  color: #10b981;
}
.activity-content[_ngcontent-ng-c1990559582] {
  flex: 1;
}
.activity-content[_ngcontent-ng-c1990559582]   p[_ngcontent-ng-c1990559582] {
  margin: 0 0 0.25rem 0;
  color: #1a202c;
}
.activity-content[_ngcontent-ng-c1990559582]   span[_ngcontent-ng-c1990559582] {
  color: #64748b;
  font-size: 0.875rem;
}
.activity-time[_ngcontent-ng-c1990559582] {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
}
@media (max-width: 768px) {
  .welcome-section[_ngcontent-ng-c1990559582]   h2[_ngcontent-ng-c1990559582] {
    font-size: 1.875rem;
  }
  .stats-grid[_ngcontent-ng-c1990559582] {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  .stat-card[_ngcontent-ng-c1990559582] {
    padding: 1.5rem;
  }
  .actions-grid[_ngcontent-ng-c1990559582] {
    grid-template-columns: 1fr;
  }
  .action-card[_ngcontent-ng-c1990559582] {
    padding: 1.5rem;
  }
  .activity-item[_ngcontent-ng-c1990559582] {
    padding: 1.25rem 1.5rem;
  }
}
/*# sourceMappingURL=/home-page.component.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click"],[]);</script>
  <app-root ng-version="20.3.9" _nghost-ng-c3984273398="" ngh="2" ng-server-context="ssg"><router-outlet _ngcontent-ng-c3984273398=""></router-outlet><app-dashboard _nghost-ng-c2393321974="" ngh="1"><div _ngcontent-ng-c2393321974="" class="dashboard-container"><app-sidebar _ngcontent-ng-c2393321974="" _nghost-ng-c3240811650="" ngh="0"><aside _ngcontent-ng-c3240811650="" class="sidebar"><div _ngcontent-ng-c3240811650="" class="sidebar-header"><div _ngcontent-ng-c3240811650="" class="logo"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="logo-icon"><path _ngcontent-ng-c3240811650="" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></svg><span _ngcontent-ng-c3240811650="" class="logo-text">StockMgmt</span></div></div><nav _ngcontent-ng-c3240811650="" class="sidebar-nav"><div _ngcontent-ng-c3240811650="" class="nav-section"><h3 _ngcontent-ng-c3240811650="" class="nav-section-title">Menu</h3><ul _ngcontent-ng-c3240811650="" class="nav-list"><li _ngcontent-ng-c3240811650="" class="nav-item"><a _ngcontent-ng-c3240811650="" routerlink="/dashboard/home" routerlinkactive="active" class="nav-link" href="/dashboard/home" jsaction="click:;"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path _ngcontent-ng-c3240811650="" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg><span _ngcontent-ng-c3240811650="" class="nav-text">Dashboard</span></a></li><li _ngcontent-ng-c3240811650="" class="nav-item"><a _ngcontent-ng-c3240811650="" routerlink="/dashboard/company" routerlinkactive="active" class="nav-link" href="/dashboard/company" jsaction="click:;"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path _ngcontent-ng-c3240811650="" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg><span _ngcontent-ng-c3240811650="" class="nav-text">Company</span></a></li><li _ngcontent-ng-c3240811650="" class="nav-item"><a _ngcontent-ng-c3240811650="" routerlink="/dashboard/stocks" routerlinkactive="active" class="nav-link" href="/dashboard/stocks" jsaction="click:;"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path _ngcontent-ng-c3240811650="" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg><span _ngcontent-ng-c3240811650="" class="nav-text">Stocks</span></a></li><li _ngcontent-ng-c3240811650="" class="nav-item"><a _ngcontent-ng-c3240811650="" routerlink="/dashboard/reports" routerlinkactive="active" class="nav-link active" href="/dashboard/reports" jsaction="click:;"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path _ngcontent-ng-c3240811650="" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></svg><span _ngcontent-ng-c3240811650="" class="nav-text">Reports</span></a></li></ul></div></nav><div _ngcontent-ng-c3240811650="" class="sidebar-footer"><div _ngcontent-ng-c3240811650="" class="user-info"><div _ngcontent-ng-c3240811650="" class="user-avatar"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c3240811650="" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg></div><div _ngcontent-ng-c3240811650="" class="user-details"><span _ngcontent-ng-c3240811650="" class="user-name">Admin User</span><span _ngcontent-ng-c3240811650="" class="user-role">Administrator</span></div></div></div></aside></app-sidebar><main _ngcontent-ng-c2393321974="" class="main-content"><div _ngcontent-ng-c2393321974="" class="content-header"><h1 _ngcontent-ng-c2393321974="">Stock Management System</h1><p _ngcontent-ng-c2393321974="">Welcome to your stock management dashboard</p></div><div _ngcontent-ng-c2393321974="" class="content-body"><router-outlet _ngcontent-ng-c2393321974=""></router-outlet><app-home-page _nghost-ng-c1990559582="" ngh="0"><div _ngcontent-ng-c1990559582="" class="home-page"><div _ngcontent-ng-c1990559582="" class="welcome-section"><h2 _ngcontent-ng-c1990559582="">Welcome to Stock Management System</h2><p _ngcontent-ng-c1990559582="">Manage your stock portfolio with ease and efficiency</p></div><div _ngcontent-ng-c1990559582="" class="stats-grid"><div _ngcontent-ng-c1990559582="" class="stat-card"><div _ngcontent-ng-c1990559582="" class="stat-icon companies"><svg _ngcontent-ng-c1990559582="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c1990559582="" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg></div><div _ngcontent-ng-c1990559582="" class="stat-content"><h3 _ngcontent-ng-c1990559582="">0</h3><p _ngcontent-ng-c1990559582="">Companies</p></div></div><div _ngcontent-ng-c1990559582="" class="stat-card"><div _ngcontent-ng-c1990559582="" class="stat-icon stocks"><svg _ngcontent-ng-c1990559582="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c1990559582="" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg></div><div _ngcontent-ng-c1990559582="" class="stat-content"><h3 _ngcontent-ng-c1990559582="">0</h3><p _ngcontent-ng-c1990559582="">Active Stocks</p></div></div><div _ngcontent-ng-c1990559582="" class="stat-card"><div _ngcontent-ng-c1990559582="" class="stat-icon portfolio"><svg _ngcontent-ng-c1990559582="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c1990559582="" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg></div><div _ngcontent-ng-c1990559582="" class="stat-content"><h3 _ngcontent-ng-c1990559582="">\$0</h3><p _ngcontent-ng-c1990559582="">Portfolio Value</p></div></div><div _ngcontent-ng-c1990559582="" class="stat-card"><div _ngcontent-ng-c1990559582="" class="stat-icon reports"><svg _ngcontent-ng-c1990559582="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c1990559582="" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></svg></div><div _ngcontent-ng-c1990559582="" class="stat-content"><h3 _ngcontent-ng-c1990559582="">0</h3><p _ngcontent-ng-c1990559582="">Reports Generated</p></div></div></div><div _ngcontent-ng-c1990559582="" class="actions-section"><h3 _ngcontent-ng-c1990559582="">Quick Actions</h3><div _ngcontent-ng-c1990559582="" class="actions-grid"><a _ngcontent-ng-c1990559582="" routerlink="/dashboard/company" class="action-card" href="/dashboard/company" jsaction="click:;"><div _ngcontent-ng-c1990559582="" class="action-icon"><svg _ngcontent-ng-c1990559582="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c1990559582="" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg></div><div _ngcontent-ng-c1990559582="" class="action-content"><h4 _ngcontent-ng-c1990559582="">Add Company</h4><p _ngcontent-ng-c1990559582="">Register a new company in your portfolio</p></div></a><div _ngcontent-ng-c1990559582="" class="action-card"><div _ngcontent-ng-c1990559582="" class="action-icon"><svg _ngcontent-ng-c1990559582="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c1990559582="" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg></div><div _ngcontent-ng-c1990559582="" class="action-content"><h4 _ngcontent-ng-c1990559582="">Track Stocks</h4><p _ngcontent-ng-c1990559582="">Monitor stock performance and trends</p></div></div><div _ngcontent-ng-c1990559582="" class="action-card"><div _ngcontent-ng-c1990559582="" class="action-icon"><svg _ngcontent-ng-c1990559582="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c1990559582="" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></svg></div><div _ngcontent-ng-c1990559582="" class="action-content"><h4 _ngcontent-ng-c1990559582="">View Reports</h4><p _ngcontent-ng-c1990559582="">Generate detailed portfolio reports</p></div></div></div></div><div _ngcontent-ng-c1990559582="" class="recent-activity"><h3 _ngcontent-ng-c1990559582="">Recent Activity</h3><div _ngcontent-ng-c1990559582="" class="activity-list"><div _ngcontent-ng-c1990559582="" class="activity-item"><div _ngcontent-ng-c1990559582="" class="activity-icon"><svg _ngcontent-ng-c1990559582="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c1990559582="" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg></div><div _ngcontent-ng-c1990559582="" class="activity-content"><p _ngcontent-ng-c1990559582=""><strong _ngcontent-ng-c1990559582="">System Initialized</strong></p><span _ngcontent-ng-c1990559582="">Welcome to your new Stock Management System</span></div><div _ngcontent-ng-c1990559582="" class="activity-time"> Just now </div></div></div></div></div></app-home-page><!--container--></div></main></div></app-dashboard><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{},{"c":{"9":[{"i":"c1990559582","r":1}]}},{"c":{"0":[{"i":"c2393321974","r":1}]}}]}</script></body></html>`;