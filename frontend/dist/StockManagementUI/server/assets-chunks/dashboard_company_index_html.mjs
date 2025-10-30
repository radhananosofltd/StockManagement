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

.company-page[_ngcontent-ng-c3073882785] {
  max-width: 1200px;
  margin: 0 auto;
}
.page-header[_ngcontent-ng-c3073882785] {
  margin-bottom: 2rem;
}
.page-header[_ngcontent-ng-c3073882785]   h2[_ngcontent-ng-c3073882785] {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}
.page-header[_ngcontent-ng-c3073882785]   p[_ngcontent-ng-c3073882785] {
  color: #64748b;
  margin: 0;
  font-size: 1.1rem;
}
.company-form-container[_ngcontent-ng-c3073882785] {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
}
.company-form[_ngcontent-ng-c3073882785] {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.form-row[_ngcontent-ng-c3073882785] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.form-group[_ngcontent-ng-c3073882785] {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.form-group[_ngcontent-ng-c3073882785]   label[_ngcontent-ng-c3073882785] {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
}
.form-group[_ngcontent-ng-c3073882785]   input[_ngcontent-ng-c3073882785] {
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f8fafc;
  color: #1a202c;
}
.form-group[_ngcontent-ng-c3073882785]   input[type=number][_ngcontent-ng-c3073882785] {
  -moz-appearance: textfield;
}
.form-group[_ngcontent-ng-c3073882785]   input[type=number][_ngcontent-ng-c3073882785]::-webkit-outer-spin-button, 
.form-group[_ngcontent-ng-c3073882785]   input[type=number][_ngcontent-ng-c3073882785]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.form-group[_ngcontent-ng-c3073882785]   input[_ngcontent-ng-c3073882785]::placeholder {
  color: #94a3b8;
}
.form-group[_ngcontent-ng-c3073882785]   input[_ngcontent-ng-c3073882785]:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  background: white;
}
.form-group[_ngcontent-ng-c3073882785]   input.error[_ngcontent-ng-c3073882785] {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
  background: #fef2f2;
}
.error-message[_ngcontent-ng-c3073882785] {
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.25rem;
}
.form-actions[_ngcontent-ng-c3073882785] {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
}
.submit-btn[_ngcontent-ng-c3073882785], 
.reset-btn[_ngcontent-ng-c3073882785] {
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  min-width: 140px;
}
.submit-btn[_ngcontent-ng-c3073882785] {
  background:
    linear-gradient(
      135deg,
      #3b82f6 0%,
      #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.4);
}
.submit-btn[_ngcontent-ng-c3073882785]:hover:not(:disabled) {
  background:
    linear-gradient(
      135deg,
      #2563eb 0%,
      #1e40af 100%);
  box-shadow: 0 6px 20px 0 rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
}
.submit-btn[_ngcontent-ng-c3073882785]:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}
.reset-btn[_ngcontent-ng-c3073882785] {
  background: #f1f5f9;
  color: #475569;
  border: 2px solid #e2e8f0;
}
.reset-btn[_ngcontent-ng-c3073882785]:hover:not(:disabled) {
  background: #e2e8f0;
  transform: translateY(-1px);
}
.reset-btn[_ngcontent-ng-c3073882785]:disabled {
  background: #f8fafc;
  color: #94a3b8;
  cursor: not-allowed;
  transform: none;
}
.btn-icon[_ngcontent-ng-c3073882785] {
  width: 1.25rem;
  height: 1.25rem;
}
.spinner[_ngcontent-ng-c3073882785] {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: _ngcontent-ng-c3073882785_spin 1s linear infinite;
}
@keyframes _ngcontent-ng-c3073882785_spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.success-message[_ngcontent-ng-c3073882785], 
.error-message-box[_ngcontent-ng-c3073882785] {
  margin-top: 2rem;
  padding: 1.25rem;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
}
.success-message[_ngcontent-ng-c3073882785] {
  background:
    linear-gradient(
      135deg,
      #ecfdf5 0%,
      #f0fdf4 100%);
  border: 2px solid #bbf7d0;
  color: #065f46;
}
.error-message-box[_ngcontent-ng-c3073882785] {
  background:
    linear-gradient(
      135deg,
      #fef2f2 0%,
      #fef7f7 100%);
  border: 2px solid #fecaca;
  color: #991b1b;
}
.message-content[_ngcontent-ng-c3073882785] {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
}
.success-icon[_ngcontent-ng-c3073882785], 
.error-icon[_ngcontent-ng-c3073882785] {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}
.quick-actions-card[_ngcontent-ng-c3073882785] {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}
.quick-actions-card[_ngcontent-ng-c3073882785]   h3[_ngcontent-ng-c3073882785] {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
}
.actions-grid[_ngcontent-ng-c3073882785] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.action-btn[_ngcontent-ng-c3073882785] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  color: #475569;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.action-btn[_ngcontent-ng-c3073882785]:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}
.action-btn[_ngcontent-ng-c3073882785]   svg[_ngcontent-ng-c3073882785] {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
}
@media (max-width: 768px) {
  .company-form-container[_ngcontent-ng-c3073882785] {
    padding: 2rem;
  }
  .form-row[_ngcontent-ng-c3073882785] {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .form-actions[_ngcontent-ng-c3073882785] {
    flex-direction: column;
    align-items: stretch;
  }
  .submit-btn[_ngcontent-ng-c3073882785], 
   .reset-btn[_ngcontent-ng-c3073882785] {
    min-width: auto;
  }
}
@media (max-width: 640px) {
  .company-form-container[_ngcontent-ng-c3073882785] {
    padding: 1.5rem;
  }
  .quick-actions-card[_ngcontent-ng-c3073882785] {
    padding: 1.5rem;
  }
  .actions-grid[_ngcontent-ng-c3073882785] {
    grid-template-columns: 1fr;
  }
}
/*# sourceMappingURL=/company-page.component.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click","submit","input","compositionstart","compositionend","keypress"],["blur"]);</script>
  <app-root ng-version="20.3.9" _nghost-ng-c3984273398="" ngh="3" ng-server-context="ssg"><router-outlet _ngcontent-ng-c3984273398=""></router-outlet><app-dashboard _nghost-ng-c2393321974="" ngh="2"><div _ngcontent-ng-c2393321974="" class="dashboard-container"><app-sidebar _ngcontent-ng-c2393321974="" _nghost-ng-c3240811650="" ngh="0"><aside _ngcontent-ng-c3240811650="" class="sidebar"><div _ngcontent-ng-c3240811650="" class="sidebar-header"><div _ngcontent-ng-c3240811650="" class="logo"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="logo-icon"><path _ngcontent-ng-c3240811650="" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></svg><span _ngcontent-ng-c3240811650="" class="logo-text">StockMgmt</span></div></div><nav _ngcontent-ng-c3240811650="" class="sidebar-nav"><div _ngcontent-ng-c3240811650="" class="nav-section"><h3 _ngcontent-ng-c3240811650="" class="nav-section-title">Menu</h3><ul _ngcontent-ng-c3240811650="" class="nav-list"><li _ngcontent-ng-c3240811650="" class="nav-item"><a _ngcontent-ng-c3240811650="" routerlink="/dashboard/home" routerlinkactive="active" class="nav-link" href="/dashboard/home" jsaction="click:;"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path _ngcontent-ng-c3240811650="" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg><span _ngcontent-ng-c3240811650="" class="nav-text">Dashboard</span></a></li><li _ngcontent-ng-c3240811650="" class="nav-item"><a _ngcontent-ng-c3240811650="" routerlink="/dashboard/company" routerlinkactive="active" class="nav-link active" href="/dashboard/company" jsaction="click:;"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path _ngcontent-ng-c3240811650="" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg><span _ngcontent-ng-c3240811650="" class="nav-text">Company</span></a></li><li _ngcontent-ng-c3240811650="" class="nav-item"><a _ngcontent-ng-c3240811650="" routerlink="/dashboard/stocks" routerlinkactive="active" class="nav-link" href="/dashboard/stocks" jsaction="click:;"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path _ngcontent-ng-c3240811650="" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg><span _ngcontent-ng-c3240811650="" class="nav-text">Stocks</span></a></li><li _ngcontent-ng-c3240811650="" class="nav-item"><a _ngcontent-ng-c3240811650="" routerlink="/dashboard/reports" routerlinkactive="active" class="nav-link" href="/dashboard/reports" jsaction="click:;"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path _ngcontent-ng-c3240811650="" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></svg><span _ngcontent-ng-c3240811650="" class="nav-text">Reports</span></a></li></ul></div></nav><div _ngcontent-ng-c3240811650="" class="sidebar-footer"><div _ngcontent-ng-c3240811650="" class="user-info"><div _ngcontent-ng-c3240811650="" class="user-avatar"><svg _ngcontent-ng-c3240811650="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c3240811650="" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg></div><div _ngcontent-ng-c3240811650="" class="user-details"><span _ngcontent-ng-c3240811650="" class="user-name">Admin User</span><span _ngcontent-ng-c3240811650="" class="user-role">Administrator</span></div></div></div></aside></app-sidebar><main _ngcontent-ng-c2393321974="" class="main-content"><div _ngcontent-ng-c2393321974="" class="content-header"><h1 _ngcontent-ng-c2393321974="">Stock Management System</h1><p _ngcontent-ng-c2393321974="">Welcome to your stock management dashboard</p></div><div _ngcontent-ng-c2393321974="" class="content-body"><router-outlet _ngcontent-ng-c2393321974=""></router-outlet><app-company-page _nghost-ng-c3073882785="" ngh="1"><div _ngcontent-ng-c3073882785="" class="company-page"><div _ngcontent-ng-c3073882785="" class="page-header"><h2 _ngcontent-ng-c3073882785="">Company Management</h2><p _ngcontent-ng-c3073882785="">Add and manage companies in your stock portfolio</p></div><div _ngcontent-ng-c3073882785="" class="company-form-container"><form _ngcontent-ng-c3073882785="" novalidate="" class="company-form ng-untouched ng-pristine ng-invalid" jsaction="submit:;"><div _ngcontent-ng-c3073882785="" class="form-row"><div _ngcontent-ng-c3073882785="" class="form-group"><label _ngcontent-ng-c3073882785="" for="companyId">Company ID</label><input _ngcontent-ng-c3073882785="" id="companyId" type="number" min="1" step="1" formcontrolname="id" placeholder="Enter company ID (e.g., 1001, 2500, 9999)" class="ng-untouched ng-pristine ng-invalid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;keypress:;"><!--container--></div><div _ngcontent-ng-c3073882785="" class="form-group"><label _ngcontent-ng-c3073882785="" for="companyName">Company Name</label><input _ngcontent-ng-c3073882785="" id="companyName" type="text" formcontrolname="name" placeholder="Enter company name (e.g., Apple Inc.)" class="ng-untouched ng-pristine ng-invalid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;"><!--container--></div></div><div _ngcontent-ng-c3073882785="" class="form-actions"><button _ngcontent-ng-c3073882785="" type="submit" class="submit-btn" disabled=""><!--container--><svg _ngcontent-ng-c3073882785="" viewBox="0 0 24 24" fill="currentColor" class="btn-icon"><path _ngcontent-ng-c3073882785="" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg> Add Company <!--container--></button><button _ngcontent-ng-c3073882785="" type="button" class="reset-btn" jsaction="click:;"><svg _ngcontent-ng-c3073882785="" viewBox="0 0 24 24" fill="currentColor" class="btn-icon"><path _ngcontent-ng-c3073882785="" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></svg> Reset </button></div></form><!--container--><!--container--></div><div _ngcontent-ng-c3073882785="" class="quick-actions-card"><h3 _ngcontent-ng-c3073882785="">Quick Actions</h3><div _ngcontent-ng-c3073882785="" class="actions-grid"><button _ngcontent-ng-c3073882785="" class="action-btn" jsaction="click:;"><svg _ngcontent-ng-c3073882785="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c3073882785="" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg><span _ngcontent-ng-c3073882785="">View All Companies</span></button><button _ngcontent-ng-c3073882785="" class="action-btn" jsaction="click:;"><svg _ngcontent-ng-c3073882785="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c3073882785="" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></svg><span _ngcontent-ng-c3073882785="">Import Companies</span></button><button _ngcontent-ng-c3073882785="" class="action-btn" jsaction="click:;"><svg _ngcontent-ng-c3073882785="" viewBox="0 0 24 24" fill="currentColor"><path _ngcontent-ng-c3073882785="" d="M9 10h6v6h4l-7 7-7-7h4zm-4-4h14v2H5z"></path></svg><span _ngcontent-ng-c3073882785="">Export Data</span></button></div></div></div></app-company-page><!--container--></div></main></div></app-dashboard><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{},{"t":{"13":"t0","18":"t1","21":"t2","22":"t3","27":"t4","28":"t5"},"c":{"13":[],"18":[],"21":[],"22":[{"i":"t3","r":2}],"27":[],"28":[]}},{"c":{"9":[{"i":"c3073882785","r":1}]}},{"c":{"0":[{"i":"c2393321974","r":1}]}}]}</script></body></html>`;