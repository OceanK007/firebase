import createHTMLElement from '../js/common-service';

export const dashboardViewHolderId = 'container';

export function dashboardComponent() {
  const dashboardElement = createHTMLElement(
    `<div>
        <div>
            <span>Welcome to dashboard</span>
        </div>
        <div>
            <button id="git-signout" class="btn btn-success">Sign out</button>
        </div>        
    </div>`,
  );

  return dashboardElement;
}
