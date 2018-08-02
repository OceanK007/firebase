import { homeComponent, homeViewHolderId } from '../home/home-view';
import { dashboardComponent, dashboardViewHolderId } from '../dashboard/dashboard-view';

export function homeView() {
  const hView = homeComponent();
  // $(`#${homeViewHolderId}`).empty().append(hView);
  document.getElementById(homeViewHolderId).innerHTML = '';
  document.getElementById(homeViewHolderId).appendChild(hView);
  // hView.querySelector('#git-login').addEventListener('click', () => { gitLogin(); });
  return hView;
}

export function dashView() {
  const dView = dashboardComponent();
  $(`#${dashboardViewHolderId}`).empty().append(dView);
  // dView.querySelector('#git-signout').addEventListener('click', () => { gitLogout(); });
  return dView;
}

// export function createComponents(url) {
//   switch (url) {
//     case 'home':
//       createHomeView();
//       break;
//     case 'dashboard':
//       createDashboardView();
//       break;
//   }
// }

// function init() {
//   createComponents('home');
// }

// window.onload = init;
